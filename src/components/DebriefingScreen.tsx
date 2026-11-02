import { useLocation, useNavigate } from 'react-router-dom'
import { DebriefingData } from '../types'
import { scenarios } from '../data/scenarios'

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const toneStyles = {
  catastrophic: 'bg-threat-red/20 border-threat-red text-threat-red',
  grave: 'bg-orange-500/20 border-orange-500 text-orange-400',
  mixed: 'bg-warning-yellow/10 border-warning-yellow text-warning-yellow',
  good: 'bg-green-900/20 border-green-500 text-green-400',
}

const ScoreBar = ({ label, value, hint }: { label: string; value: number; hint: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{label}</span>
      <span className="font-mono text-white font-bold">{value}</span>
    </div>
    <div className="h-2 bg-gray-800 border border-gray-700">
      <div
        className={`h-full ${value >= 70 ? 'bg-safe-green' : value >= 40 ? 'bg-warning-yellow' : 'bg-threat-red'}`}
        style={{ width: `${value}%` }}
      />
    </div>
    <div className="text-xs text-gray-500 mt-1">{hint}</div>
  </div>
)

export default function DebriefingScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const debriefing = location.state?.debriefing as DebriefingData | undefined

  if (!debriefing) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-white text-xl">Keine Debriefing-Daten verfügbar</div>
      </div>
    )
  }

  const { outcome } = debriefing

  const newBlindRun = () => {
    const pick = scenarios[Math.floor(Math.random() * scenarios.length)]
    navigate('/simulation/lage', { state: { scenarioId: pick.id, blind: true } })
  }

  return (
    <div className="w-full h-full bg-black overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Ausgang */}
        <div className={`border-2 p-8 mb-6 ${toneStyles[outcome.tone]}`}>
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Debriefing - Ausgang</div>
          <h1 className="text-4xl font-bold mb-3">{outcome.title}</h1>
          <p className="text-gray-200 mb-4">{outcome.narrative}</p>
          <div className="text-sm text-gray-300">
            <span className="text-gray-500">Opfer: </span>{outcome.casualties}
          </div>
        </div>

        {/* Die Wahrheit */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Was wirklich geschah</h2>
          <p className="text-sm text-gray-500 mb-4">
            {debriefing.blind ? `Die verdeckte Lage war: ${debriefing.scenarioTitle}` : debriefing.scenarioTitle}
          </p>
          <div className="bg-blue-900/20 border border-blue-500 p-4">
            <p className="text-gray-200">{debriefing.whatReallyHappened}</p>
          </div>
        </div>

        {/* Bewertung */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Bewertung</h2>
            <div className="text-right">
              <div className="text-4xl font-bold text-white font-mono">{outcome.scores.total}<span className="text-lg text-gray-500">/100</span></div>
              <div className="text-sm text-gray-400">{outcome.grade}</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <ScoreBar label="Menschenleben" value={outcome.scores.lives} hint="Wie viele Menschen haben überlebt?" />
            <ScoreBar label="Urteilsvermögen" value={outcome.scores.judgment} hint="Passte Ihre Haltung zur Wahrheit - und wussten Sie genug, um so zu entscheiden?" />
            <ScoreBar label="Eskalationskontrolle" value={outcome.scores.control} hint={`Höchster Eskalationsdruck: ${debriefing.peakEscalation}/100`} />
            <ScoreBar label="Abschreckung" value={outcome.scores.deterrence} hint={`Vergeltungsfähigkeit am Ende: ${debriefing.finalDeterrence}/100`} />
          </div>
        </div>

        {/* Verlauf */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Ihre Befehle</h2>
          {debriefing.decisionLog.length === 0 ? (
            <p className="text-gray-400">Sie haben keinen einzigen Befehl erteilt.</p>
          ) : (
            <div className="space-y-2">
              {debriefing.decisionLog.map((entry, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-800/50 border border-gray-700 p-3 text-sm">
                  <span className="font-mono text-gray-400 w-12">{formatTime(Math.max(0, entry.timestamp))}</span>
                  <span className="flex-1 text-white">{entry.decisionTitle}</span>
                  <span className="text-blue-400 text-xs whitespace-nowrap">Lagebild {entry.clarityAtDecision ?? '-'} %</span>
                  <span className="text-orange-400 text-xs whitespace-nowrap">Eskalation {entry.escalationAtDecision ?? '-'}</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-3">
            Simulation beendet nach {formatTime(debriefing.endTime)} · Lagebild am Ende: {debriefing.finalClarity} %
          </p>
        </div>

        {/* Erkenntnisse */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Erkenntnisse aus Ihrem Durchlauf</h2>
          <ul className="space-y-3">
            {outcome.lessons.map((lesson, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">→</span>
                <p className="text-gray-200 flex-1">{lesson}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Historischer Kontext */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Historischer Kontext</h2>
          <div className="bg-gray-800/50 border border-gray-600 p-4">
            <p className="text-gray-200">{debriefing.historicalComparison}</p>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 p-6 mb-6">
          <h3 className="text-yellow-200 font-bold mb-2">Reale historische Beispiele:</h3>
          <ul className="text-yellow-100 text-sm space-y-2 list-disc list-inside">
            <li>
              <strong>26. September 1983:</strong> Stanislaw Petrow, ein sowjetischer Offizier, ignorierte
              Computerberichte über einen amerikanischen Raketenangriff und verhinderte so möglicherweise
              einen Nuklearkrieg. Es war ein Fehlalarm.
            </li>
            <li>
              <strong>9. November 1979:</strong> NORAD-Computer zeigten einen massiven sowjetischen Angriff.
              Nach 6 Minuten wurde erkannt: Ein Trainingsband war versehentlich ins Live-System eingespielt worden.
            </li>
            <li>
              <strong>25. Januar 1995:</strong> Russische Radare erfassten eine norwegische Forschungsrakete.
              Präsident Jelzin hatte den nuklearen Koffer geöffnet, bevor Entwarnung gegeben wurde.
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 border border-gray-500 transition-colors"
          >
            ← ZUM START
          </button>
          <button
            onClick={() => navigate(`/simulation/${debriefing.scenarioId}`)}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 border border-gray-500 transition-colors"
          >
            DIESES SZENARIO WIEDERHOLEN
          </button>
          <button
            onClick={newBlindRun}
            className="bg-threat-red/80 hover:bg-threat-red text-white font-bold py-4 px-6 border border-red-500 transition-colors"
          >
            NEUE VERDECKTE LAGE →
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Diese Simulation dient ausschließlich Bildungszwecken und soll das Verständnis für die
            Komplexität nuklearer Entscheidungsfindung fördern.
          </p>
        </div>
      </div>
    </div>
  )
}
