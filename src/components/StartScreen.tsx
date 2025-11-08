import { useNavigate } from 'react-router-dom'
import { scenarios } from '../data/scenarios'

export default function StartScreen() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
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

        <div className="bg-dark-panel border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">SZENARIO AUSWÄHLEN</h2>
          <p className="text-gray-300 mb-6">
            Jedes Szenario basiert auf realen historischen Ereignissen oder realistischen Bedrohungsszenarien.
            Sie haben 10 Minuten Zeit, um Ihre Entscheidung zu treffen.
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
