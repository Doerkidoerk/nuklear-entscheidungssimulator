import { useNavigate } from 'react-router-dom'
import { scenarios } from '../data/scenarios'

export default function StartScreen() {
  const navigate = useNavigate()

  const startBlind = () => {
    const pick = scenarios[Math.floor(Math.random() * scenarios.length)]
    navigate('/simulation/lage', { state: { scenarioId: pick.id, blind: true } })
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            NUKLEAR-ENTSCHEIDUNGSSIMULATOR
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Sie sind der Präsident der Vereinigten Staaten
          </p>
          <p className="text-gray-400">
            Ihre Entscheidung könnte über das Schicksal der Menschheit bestimmen
          </p>
        </div>

        <button
          onClick={startBlind}
          className="w-full bg-threat-red/20 hover:bg-threat-red/30 border-2 border-threat-red p-6 mb-8 text-left transition-colors"
        >
          <div className="text-2xl font-bold text-white mb-2">⚠ ERNSTFALL - VERDECKTE LAGE</div>
          <p className="text-gray-200 text-sm">
            Empfohlen. Ein zufälliges Szenario, ohne dass Sie wissen, welches. Echter Angriff, Fehlalarm, Täuschung
            oder Enthauptungsschlag? Das erfahren Sie erst im Debriefing - wie ein echter Präsident.
          </p>
        </button>

        <div className="bg-dark-panel border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">TRAININGSMODUS - SZENARIO AUSWÄHLEN</h2>
          <p className="text-gray-300 mb-6">
            Hier kennen Sie die Auflösung schon vorher - gut, um einzelne Situationen zu studieren.
            Für echte Spannung spielen Sie die verdeckte Lage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => navigate(`/simulation/${scenario.id}`)}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-6 text-left transition-all duration-200 transform hover:scale-105"
              >
                <h3 className="text-lg font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Dauer: {scenario.duration / 60} Minuten
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scenario.initialThreatLevel === 'critical' ? 'bg-threat-red/20 text-threat-red' :
                    scenario.initialThreatLevel === 'high' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-warning-yellow/20 text-warning-yellow'
                  }`}>
                    {scenario.initialThreatLevel.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 p-4">
          <p className="text-yellow-200 text-sm">
            <strong>⚠ WARNUNG:</strong> Diese Simulation behandelt ein ernstes Thema. Sie dient ausschließlich Bildungszwecken
            und soll die Komplexität nuklearer Entscheidungsfindung verdeutlichen.
          </p>
        </div>
      </div>
    </div>
  )
}
