import { useLocation, useNavigate } from 'react-router-dom'
import { DebriefingData } from '../types'

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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full h-full bg-black overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="bg-dark-panel border border-gray-700 p-8 mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">DEBRIEFING</h1>
          <p className="text-gray-300">{debriefing.scenarioTitle}</p>
        </div>

        {/* Entscheidung */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Ihre Entscheidung</h2>
          <div className="bg-gray-800 border border-gray-600 p-4 mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {debriefing.playerDecision.title}
            </h3>
            <p className="text-gray-300 mb-3">
              {debriefing.playerDecision.description}
            </p>
            <div className="text-sm text-gray-400">
              Entscheidung getroffen nach: <span className="text-white font-bold">{formatTime(debriefing.decisionTime)}</span>
            </div>
          </div>

          {/* Bewertung */}
          <div className={`border p-4 ${
            debriefing.wasCorrect
              ? 'bg-green-900/20 border-green-500'
              : 'bg-orange-900/20 border-orange-500'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white">Bewertung:</span>
              <span className={`text-2xl font-bold ${
                debriefing.wasCorrect ? 'text-green-400' : 'text-orange-400'
              }`}>
                {debriefing.score}/100
              </span>
            </div>
            <p className={debriefing.wasCorrect ? 'text-green-200' : 'text-orange-200'}>
              {debriefing.wasCorrect
                ? 'Ihre Entscheidung war unter den gegebenen Umständen angemessen.'
                : 'Es gab möglicherweise bessere Optionen, aber die Situation war komplex.'}
            </p>
          </div>
        </div>

        {/* Was wirklich passiert ist */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Was wirklich geschah</h2>
          <div className="bg-blue-900/20 border border-blue-500 p-4">
            <p className="text-gray-200">{debriefing.whatReallyHappened}</p>
          </div>
        </div>

        {/* Konsequenzen */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Konsequenzen Ihrer Entscheidung</h2>
          <div className="space-y-3">
            {debriefing.consequences.map((consequence, index) => (
              <div
                key={index}
                className={`border p-4 ${
                  consequence.severity === 'catastrophic' ? 'bg-threat-red/20 border-threat-red' :
                  consequence.severity === 'major' ? 'bg-orange-500/20 border-orange-500' :
                  consequence.severity === 'moderate' ? 'bg-warning-yellow/20 border-warning-yellow' :
                  'bg-blue-500/20 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                    consequence.severity === 'catastrophic' ? 'bg-threat-red text-white' :
                    consequence.severity === 'major' ? 'bg-orange-500 text-white' :
                    consequence.severity === 'moderate' ? 'bg-warning-yellow text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {consequence.type}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm">{consequence.description}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      Schweregrad: {consequence.severity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historischer Kontext */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Historischer Kontext</h2>
          <div className="bg-gray-800/50 border border-gray-600 p-4">
            <p className="text-gray-200">{debriefing.historicalComparison}</p>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-dark-panel border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Erkenntnisse</h2>
          <ul className="space-y-3">
            {debriefing.lessonsLearned.map((lesson, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">→</span>
                <p className="text-gray-200 flex-1">{lesson}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Zusätzliche Informationen */}
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
              Nach 6 Minuten wurde erkannt: Ein Trainingsband wurde versehentlich ins Live-System eingespielt.
            </li>
            <li>
              <strong>25. Januar 1995:</strong> Russische Radare erfassten eine norwegische Forschungsrakete.
              Präsident Jelzin hatte den nuklearen Koffer geöffnet, bevor Entwarnung gegeben wurde.
            </li>
          </ul>
        </div>

        {/* Aktionen */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 border border-gray-500 transition-colors"
          >
            ← ZURÜCK ZUM START
          </button>
          <button
            onClick={() => navigate(`/simulation/${debriefing.scenarioId}`)}
            className="bg-military-blue hover:bg-blue-700 text-white font-bold py-4 px-6 border border-blue-500 transition-colors"
          >
            SZENARIO WIEDERHOLEN →
          </button>
        </div>

        {/* Schlussbemerkung */}
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
