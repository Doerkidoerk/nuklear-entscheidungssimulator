import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getScenario } from '../data/scenarios'
import { useSimulation } from '../hooks/useSimulation'
import { evaluateOutcome } from '../engine/outcome'
import CountdownTimer from './CountdownTimer'
import IntelligencePanel from './IntelligencePanel'
import AdvisorPanel from './AdvisorPanel'
import MapView from './MapView'
import DecisionPanel from './DecisionPanel'
import WorldStatusPanel from './WorldStatusPanel'
import { DebriefingData, Scenario } from '../types'

interface LocationState {
  scenarioId?: string
  blind?: boolean
}

export default function SimulationContainer() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const location = useLocation()
  const locState = (location.state || {}) as LocationState
  const blind = scenarioId === 'lage' && !!locState.blind
  const scenario = getScenario(blind ? locState.scenarioId || '' : scenarioId || '')

  if (!scenario) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Szenario nicht gefunden</div>
      </div>
    )
  }

  // key erzwingt einen frischen Zustand bei jedem neuen Durchlauf
  return <Simulation key={`${scenario.id}-${location.key}`} scenario={scenario} blind={blind} />
}

function Simulation({ scenario, blind }: { scenario: Scenario; blind: boolean }) {
  const navigate = useNavigate()
  const [showIntro, setShowIntro] = useState(true)
  const { state, truth, start, pause, resume, makeDecision } = useSimulation(scenario)

  const displayTitle = blind ? 'LAGE UNBEKANNT - Frühwarnalarm' : scenario.title

  useEffect(() => {
    if (!state.gameEnded) return
    const timer = setTimeout(() => {
      const outcome = evaluateOutcome(truth, state.world, state.decisionHistory)
      const debriefing: DebriefingData = {
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        blind,
        outcome,
        whatReallyHappened: truth.whatReallyHappened,
        historicalComparison: scenario.historicalContext,
        decisionLog: state.decisionHistory,
        peakEscalation: Math.round(state.world.peakEscalation),
        finalClarity: Math.round(state.world.clarity),
        finalDeterrence: Math.round(state.world.deterrence),
        endTime: state.elapsedTime,
        cabinet: scenario.advisors.map(a => ({
          id: a.id,
          name: a.name,
          title: a.title,
          trust: Math.round(state.world.advisorTrust[a.id] ?? 0),
          broken: state.world.advisorsBroken.includes(a.id),
        })),
      }
      navigate('/debriefing', { state: { debriefing } })
    }, 3000)
    return () => clearTimeout(timer)
  }, [state.gameEnded])

  if (showIntro) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-dark-panel border border-gray-700 p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{displayTitle}</h1>
            <p className="text-gray-300 mb-6">
              {blind
                ? 'Das Frühwarnsystem meldet eine mögliche nukleare Bedrohung. Was wirklich geschieht, weiß niemand im Raum - auch Sie nicht. Es könnte ein Angriff sein. Ein Fehler. Eine Täuschung.'
                : scenario.description}
            </p>

            <div className="bg-threat-red/20 border border-threat-red p-4 mb-6">
              <p className="text-threat-red font-bold mb-2">BRIEFING:</p>
              <p className="text-gray-200 text-sm">
                Ihre Berater versorgen Sie kontinuierlich mit Informationen - und widersprechen einander.
                Sie haben 10 Minuten. Jeder Befehl verändert die Welt: Er kann Klarheit schaffen, Ihre
                Streitkräfte schützen - oder die Gegenseite in Panik versetzen.
              </p>
            </div>

            <div className="mb-6 grid gap-3 text-sm">
              <div className="border border-gray-700 p-3">
                <span className="text-orange-400 font-bold">Eskalationsdruck</span>
                <span className="text-gray-300"> - Die Gegenseite beobachtet jede Ihrer Maßnahmen. Über 50 verstärkt sich der Druck von selbst. Bei 100 gibt es kein Zurück mehr - auch ohne dass jemand angegriffen hat.</span>
              </div>
              <div className="border border-gray-700 p-3">
                <span className="text-blue-400 font-bold">Lagebild</span>
                <span className="text-gray-300"> - Aufklärung und Kommunikation liefern Hinweise darauf, was wirklich passiert. Aber sie kosten Zeit.</span>
              </div>
              <div className="border border-gray-700 p-3">
                <span className="text-green-400 font-bold">Vergeltungsfähigkeit</span>
                <span className="text-gray-300"> - Was einen echten Angriff überleben würde. Wer nichts schützt, lädt zur Erpressung ein. Wer alles alarmiert, treibt die Eskalation.</span>
              </div>
            </div>

            <p className="text-gray-500 text-xs mb-6">
              Bewertet werden nicht nur die Folgen, sondern auch, ob Ihre Entscheidung auf einem tragfähigen Lagebild beruhte.
            </p>

            <button
              onClick={() => { setShowIntro(false); start() }}
              className="w-full bg-military-blue hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue-500 transition-colors"
            >
              SIMULATION STARTEN
            </button>
          </div>
        </div>
      </div>
    )
  }

  const awaitingEnd = state.endAt !== undefined && !state.gameEnded

  return (
    <div className="w-full h-full bg-black p-4">
      <div className="h-full grid grid-cols-12 grid-rows-12 gap-4">
        <div className="col-span-8 row-span-2">
          <CountdownTimer
            remainingTime={state.remainingTime}
            threatLevel={state.currentThreatLevel}
            isRunning={state.isRunning}
            isPaused={state.isPaused}
          />
        </div>
        <div className="col-span-4 row-span-2">
          <WorldStatusPanel world={state.world} />
        </div>

        <div className="col-span-4 row-span-10 flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <IntelligencePanel events={state.receivedEvents} />
          </div>
        </div>

        <div className="col-span-4 row-span-10">
          <MapView
            trajectories={scenario.trajectories || []}
            elapsedTime={state.elapsedTime}
            flags={state.world.flags}
          />
        </div>

        <div className="col-span-4 row-span-10 flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <AdvisorPanel
              advisors={scenario.advisors}
              elapsedTime={state.elapsedTime}
              trust={state.world.advisorTrust}
              broken={state.world.advisorsBroken}
            />
          </div>
          <div className="flex-1 min-h-0">
            <DecisionPanel
              availableDecisionIds={state.availableDecisions}
              onDecisionMade={makeDecision}
              disabled={!!state.selectedDecision || state.gameEnded || awaitingEnd}
              decisionHistory={state.decisionHistory}
              currentPhase={state.currentPhase}
              pendingUnlocks={state.pendingUnlocks}
              elapsedTime={state.elapsedTime}
              statusMessage={
                awaitingEnd ? 'Endgültiger Befehl erteilt. Die Ereignisse nehmen ihren Lauf...' :
                state.selectedDecision ? 'Befehl wird übermittelt und bestätigt...' : undefined
              }
            />
          </div>
        </div>
      </div>

      {state.isRunning && !state.gameEnded && (
        <div className="fixed bottom-6 left-6">
          <button
            onClick={state.isPaused ? resume : pause}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 border border-gray-500"
          >
            {state.isPaused ? '▶ FORTSETZEN' : '⏸ PAUSIEREN'}
          </button>
        </div>
      )}

      {state.lastOrder && state.elapsedTime - state.lastOrder.at < 4 && !state.gameEnded && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-dark-panel border border-blue-500 px-6 py-3 shadow-lg">
          <span className="text-blue-400 font-bold mr-2">BEFEHL ERTEILT:</span>
          <span className="text-white">{state.lastOrder.title}</span>
        </div>
      )}

      {state.isPaused && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-none">
          <div className="text-warning-yellow text-3xl font-bold">PAUSIERT</div>
        </div>
      )}

      {state.gameEnded && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center">
          <div className="bg-dark-panel border border-gray-700 p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {state.world.endReason === 'timeout' ? 'ZEIT ABGELAUFEN' :
                state.world.endReason === 'spiral' ? 'DIE SPIRALE IST AUSSER KONTROLLE' : 'DIE WÜRFEL SIND GEFALLEN'}
            </h2>
            <p className="text-gray-400 text-sm">Weiterleitung zum Debriefing...</p>
          </div>
        </div>
      )}
    </div>
  )
}
