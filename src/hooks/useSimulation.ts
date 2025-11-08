import { useState, useEffect, useCallback, useRef } from 'react'
import { SimulationState, Scenario } from '../types'

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
    setState(prev => ({
      ...prev,
      selectedDecision: decisionId,
      decisionMadeAt: prev.elapsedTime,
      isRunning: false,
    }))
  }, [])

  // Main simulation loop
  useEffect(() => {
    if (!state.isRunning || state.isPaused) {
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

      // Check for new events
      const newEvents = scenario.events.filter(
        event => event.timestamp <= elapsed && !state.receivedEvents.find(e => e.id === event.id)
      )

      // Update threat level based on events
      let newThreatLevel = state.currentThreatLevel
      newEvents.forEach(event => {
        if (event.updatesThreatLevel) {
          newThreatLevel = event.updatesThreatLevel
        }
      })

      setState(prev => ({
        ...prev,
        elapsedTime: elapsed,
        remainingTime: remaining,
        receivedEvents: [...prev.receivedEvents, ...newEvents].sort((a, b) => b.timestamp - a.timestamp),
        currentThreatLevel: newThreatLevel,
        isRunning: remaining > 0,
      }))

      // Stop when time runs out
      if (remaining === 0) {
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
  }, [state.isRunning, state.isPaused, state.currentThreatLevel, state.receivedEvents, scenario])

  return {
    state,
    start,
    pause,
    resume,
    makeDecision,
  }
}
