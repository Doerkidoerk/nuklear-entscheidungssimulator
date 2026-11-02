import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { SimulationState, Scenario } from '../types'
import { getTruth } from '../engine/truth'
import { applyDecision, createInitialState, tick } from '../engine/simulation'

export const useSimulation = (scenario: Scenario) => {
  const truth = useMemo(() => getTruth(scenario.id), [scenario.id])
  const [state, setState] = useState<SimulationState>(() => createInitialState(scenario, truth))

  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)

  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }))
  }, [])

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }))
  }, [])

  const resume = useCallback(() => {
    startTimeRef.current = Date.now() - elapsedRef.current * 1000
    setState(prev => ({ ...prev, isPaused: false }))
  }, [])

  const makeDecision = useCallback((decisionId: string) => {
    setState(prev => applyDecision(prev, scenario, truth, decisionId))
    // Kurze Ausführungszeit: Befehle brauchen Zeit, bis sie bestätigt sind
    setTimeout(() => {
      setState(prev => (prev.selectedDecision === decisionId ? { ...prev, selectedDecision: undefined } : prev))
    }, 2000)
  }, [scenario, truth])

  // Hauptschleife
  useEffect(() => {
    if (!state.isRunning || state.isPaused || state.gameEnded) return
    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      elapsedRef.current = elapsed
      setState(prev =>
        elapsed === prev.elapsedTime && prev.receivedEvents.length > 0 ? prev : tick(prev, scenario, truth, elapsed))
    }, 100)
    return () => clearInterval(interval)
  }, [state.isRunning, state.isPaused, state.gameEnded, scenario, truth])

  return { state, truth, start, pause, resume, makeDecision }
}
