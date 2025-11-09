import { useState, useEffect, useCallback, useRef } from 'react'
import { SimulationState, Scenario } from '../types'
import { getDecisionById } from '../data/decisions'

export const useSimulation = (scenario: Scenario) => {
  const [state, setState] = useState<SimulationState>({
    scenarioId: scenario.id,
    isRunning: false,
    isPaused: false,
    elapsedTime: 0,
    remainingTime: scenario.duration,
    currentThreatLevel: scenario.initialThreatLevel,
    receivedEvents: [],
    trajectories: [],
    selectedDecision: undefined,
    decisionMadeAt: undefined,
    decisionHistory: [],
    currentPhase: 0,
    availableDecisions: scenario.decisions.map(d => d.id),
    gameEnded: false,
    pendingFollowUpEvents: [],
  })

  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)

  // Start simulation
  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }))
  }, [])

  // Pause simulation
  const pause = useCallback(() => {
    pausedTimeRef.current = state.elapsedTime
    setState(prev => ({ ...prev, isPaused: true }))
  }, [state.elapsedTime])

  // Resume simulation
  const resume = useCallback(() => {
    startTimeRef.current = Date.now() - pausedTimeRef.current * 1000
    setState(prev => ({ ...prev, isPaused: false }))
  }, [])

  // Make decision
  const makeDecision = useCallback((decisionId: string) => {
    setState(prev => {
      const decision = getDecisionById(decisionId)
      if (!decision) return prev

      // Entscheidung zur Historie hinzufügen
      const historyEntry = {
        decisionId: decision.id,
        decisionTitle: decision.title,
        timestamp: prev.elapsedTime,
        phase: prev.currentPhase,
      }

      // Folge-Events vorbereiten
      const followUpEvents = (decision.followUpEvents || []).map(event => ({
        ...event,
        // Wenn relativ zur Entscheidung, füge die aktuelle Zeit hinzu
        timestamp: event.relativeToDecision
          ? prev.elapsedTime + event.triggerDelay
          : event.timestamp,
      }))

      // Neue verfügbare Entscheidungen basierend auf der Folge-Entscheidungen
      const newAvailableDecisions = decision.followUpDecisions || []

      // Prüfe, ob das Spiel endet
      const shouldEndGame = decision.endsGame || false
      const endsImmediately = decision.gameEndingType === 'immediate'

      return {
        ...prev,
        selectedDecision: decisionId,
        decisionMadeAt: prev.elapsedTime,
        decisionHistory: [...prev.decisionHistory, historyEntry],
        currentPhase: prev.currentPhase + 1,
        availableDecisions: newAvailableDecisions,
        pendingFollowUpEvents: [...prev.pendingFollowUpEvents, ...followUpEvents],
        gameEnded: shouldEndGame && endsImmediately,
        isRunning: !(shouldEndGame && endsImmediately), // Spiel läuft weiter, außer bei sofortigem Ende
      }
    })

    // Kurze Verzögerung, dann selectedDecision zurücksetzen (außer bei Spielende)
    setTimeout(() => {
      setState(prev => {
        // Wenn das Spiel sofort endet, nicht zurücksetzen
        if (prev.gameEnded) return prev

        return {
          ...prev,
          selectedDecision: undefined,
        }
      })
    }, 2000) // 2 Sekunden Verzögerung, um die Entscheidung anzuzeigen
  }, [])

  // Main simulation loop
  useEffect(() => {
    if (!state.isRunning || state.isPaused || state.gameEnded) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - startTimeRef.current) / 1000)
      const remaining = Math.max(0, scenario.duration - elapsed)

      // Check for new scenario events
      const newScenarioEvents = scenario.events.filter(
        event => event.timestamp <= elapsed && !state.receivedEvents.find(e => e.id === event.id)
      )

      // Check for pending follow-up events that should trigger now
      const triggeredFollowUpEvents = state.pendingFollowUpEvents.filter(
        event => event.timestamp <= elapsed && !state.receivedEvents.find(e => e.id === event.id)
      )

      // Combine all new events
      const newEvents = [...newScenarioEvents, ...triggeredFollowUpEvents]

      // Remove triggered events from pending
      const remainingPendingEvents = state.pendingFollowUpEvents.filter(
        event => !triggeredFollowUpEvents.find(e => e.id === event.id)
      )

      // Update threat level based on events
      let newThreatLevel = state.currentThreatLevel
      newEvents.forEach(event => {
        if (event.updatesThreatLevel) {
          newThreatLevel = event.updatesThreatLevel
        }
      })

      // Check if game should end (delayed ending)
      const shouldEndNow = state.gameEnded || (remaining === 0 && state.availableDecisions.length === 0)

      setState(prev => ({
        ...prev,
        elapsedTime: elapsed,
        remainingTime: remaining,
        receivedEvents: [...prev.receivedEvents, ...newEvents].sort((a, b) => b.timestamp - a.timestamp),
        currentThreatLevel: newThreatLevel,
        pendingFollowUpEvents: remainingPendingEvents,
        isRunning: !shouldEndNow && remaining > 0,
        gameEnded: shouldEndNow,
      }))

      // Stop when game ends
      if (shouldEndNow) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, 100) // Update every 100ms for smooth countdown

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [state.isRunning, state.isPaused, state.gameEnded, state.currentThreatLevel, state.receivedEvents, state.pendingFollowUpEvents, state.availableDecisions, scenario])

  return {
    state,
    start,
    pause,
    resume,
    makeDecision,
  }
}
