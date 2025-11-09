import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getScenario } from '../data/scenarios'
import { useSimulation } from '../hooks/useSimulation'
import CountdownTimer from './CountdownTimer'
import IntelligencePanel from './IntelligencePanel'
import AdvisorPanel from './AdvisorPanel'
import MapView from './MapView'
import DecisionPanel from './DecisionPanel'
import { DebriefingData } from '../types'

export default function SimulationContainer() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()
  const [showIntro, setShowIntro] = useState(true)

  const scenario = getScenario(scenarioId || '')

  if (!scenario) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Szenario nicht gefunden</div>
      </div>
    )
  }

  const { state, start, pause, resume, makeDecision } = useSimulation(scenario)

  useEffect(() => {
    // Nur zum Debriefing navigieren, wenn das Spiel wirklich beendet ist
    if (state.gameEnded && !state.isRunning) {
      // Kurze Verzögerung vor dem Debriefing
      const timer = setTimeout(() => {
        // Die letzte Entscheidung aus der Historie holen
        const lastDecision = state.decisionHistory[state.decisionHistory.length - 1]
        if (lastDecision) {
          const debriefing: DebriefingData = {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title,
            playerDecision: {
              id: lastDecision.decisionId,
              title: lastDecision.decisionTitle,
              description: '',
              category: 'wait-and-see',
              consequences: [],
              requiresConfirmation: false,
              militaryEscalation: 0,
              diplomaticImpact: 0,
              civilianCasualties: 'none'
            },
            decisionTime: lastDecision.timestamp,
            wasCorrect: true, // TODO: Implement proper logic
            consequences: [],
            historicalComparison: scenario.historicalContext,
            whatReallyHappened: getWhatReallyHappened(scenario.id),
            lessonsLearned: getLessonsLearned(scenario.id, lastDecision.decisionId),
            score: calculateScore(lastDecision.timestamp, true)
          }
          navigate('/debriefing', { state: { debriefing } })
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state.gameEnded, state.isRunning, navigate, scenario, state.decisionHistory])

  const handleStartSimulation = () => {
    setShowIntro(false)
    start()
  }

  if (showIntro) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-dark-panel border border-gray-700 p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{scenario.title}</h1>
            <p className="text-gray-300 mb-6">{scenario.description}</p>

            <div className="bg-threat-red/20 border border-threat-red p-4 mb-6">
              <p className="text-threat-red font-bold mb-2">BRIEFING:</p>
              <p className="text-gray-200 text-sm">
                Sie befinden sich im Situation Room des Weißen Hauses. Ihre Berater werden Sie kontinuierlich
                mit Informationen versorgen. Sie haben exakt 10 Minuten Zeit, um eine Entscheidung zu treffen.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Ihre Aufgabe:</p>
              <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                <li>Analysieren Sie alle eingehenden Nachrichten sorgfältig</li>
                <li>Hören Sie auf die Empfehlungen Ihrer Berater</li>
                <li>Treffen Sie eine informierte Entscheidung</li>
                <li>Bedenken Sie: Es gibt keine perfekte Lösung</li>
              </ul>
            </div>

            <button
              onClick={handleStartSimulation}
              className="w-full bg-military-blue hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue-500 transition-colors"
            >
              SIMULATION STARTEN
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-black p-4">
      <div className="h-full grid grid-cols-12 grid-rows-12 gap-4">
        {/* Header mit Timer */}
        <div className="col-span-12 row-span-2">
          <CountdownTimer
            remainingTime={state.remainingTime}
            threatLevel={state.currentThreatLevel}
            isRunning={state.isRunning}
            isPaused={state.isPaused}
          />
        </div>

        {/* Linke Spalte: Nachrichten + Karte */}
        <div className="col-span-4 row-span-10 flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <IntelligencePanel events={state.receivedEvents} />
          </div>
        </div>

        {/* Mittlere Spalte: Karte */}
        <div className="col-span-4 row-span-10">
          <MapView trajectories={scenario.events[0]?.type === 'system-alert' ? [] : []} elapsedTime={state.elapsedTime} />
        </div>

        {/* Rechte Spalte: Berater + Entscheidungen */}
        <div className="col-span-4 row-span-10 flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <AdvisorPanel advisors={scenario.advisors} elapsedTime={state.elapsedTime} />
          </div>
          <div className="flex-1 min-h-0">
            <DecisionPanel
              availableDecisionIds={state.availableDecisions}
              onDecisionMade={makeDecision}
              disabled={!!state.selectedDecision || state.remainingTime === 0}
              decisionHistory={state.decisionHistory}
              currentPhase={state.currentPhase}
            />
          </div>
        </div>
      </div>

      {/* Pause/Resume Controls */}
      {state.isRunning && !state.selectedDecision && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={state.isPaused ? resume : pause}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 border border-gray-500"
          >
            {state.isPaused ? '▶ FORTSETZEN' : '⏸ PAUSIEREN'}
          </button>
        </div>
      )}

      {/* Entscheidung getroffen */}
      {state.selectedDecision && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-dark-panel border border-gray-700 p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Entscheidung getroffen</h2>
            <p className="text-gray-300 mb-4">
              Ihre Entscheidung wurde dokumentiert und wird ausgeführt.
            </p>
            <p className="text-gray-400 text-sm">
              Weiterleitung zum Debriefing...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Hilfsfunktionen
function getWhatReallyHappened(scenarioId: string): string {
  switch (scenarioId) {
    case 'real-attack':
      return 'In diesem hypothetischen Szenario war es tatsächlich ein echter Angriff. Die besten verfügbaren Informationen deuteten auf einen massiven Erstschlag hin.'
    case 'false-alarm':
      return 'Es war ein Fehlalarm. Ein Softwarefehler im DSP-Satelliten hatte Sonnenlicht-Reflektionen auf Wolken als Raketenstarts fehlinterpretiert. Kein einziger tatsächlicher Start fand statt.'
    case 'cyber-attack':
      return 'Es war ein koordinierter Cyber-Angriff auf die Frühwarnsysteme mehrerer Nationen. Eine unbekannte Gruppierung hatte gefälschte Telemetrie-Daten injiziert, um einen Nuklearkrieg zu provozieren.'
    case 'ambiguous':
      return 'Die Wahrheit blieb unklar. Möglicherweise war es ein Teststart, der durch atmosphärische Bedingungen und technische Fehler zu widersprüchlichen Sensordaten führte. Die genaue Ursache wurde nie vollständig geklärt.'
    default:
      return 'Unbekanntes Szenario.'
  }
}

function getLessonsLearned(scenarioId: string, decision: string): string[] {
  const lessons = [
    'Nukleare Entscheidungen müssen unter extremem Zeitdruck mit unvollständigen Informationen getroffen werden.',
    'Die "Fog of War" ist real - selbst mit modernster Technologie bleiben Unsicherheiten.',
    'Menschliches Urteilsvermögen bleibt trotz technischer Systeme entscheidend.',
  ]

  if (scenarioId === 'false-alarm' && decision.includes('retaliation')) {
    lessons.push('Launch on Warning birgt das Risiko, auf einen Fehlalarm mit einem echten Atomkrieg zu reagieren.')
  }

  if (scenarioId === 'real-attack' && decision.includes('wait')) {
    lessons.push('Zurückhaltung kann Leben retten, aber auch militärische Nachteile bedeuten.')
  }

  return lessons
}

function calculateScore(decisionTime: number, wasCorrect: boolean): number {
  let score = 50 // Basis-Score

  if (wasCorrect) {
    score += 30
  }

  // Bonus für durchdachte Entscheidung (nicht zu schnell, nicht zu spät)
  if (decisionTime > 180 && decisionTime < 480) {
    score += 20
  }

  return Math.min(100, score)
}
