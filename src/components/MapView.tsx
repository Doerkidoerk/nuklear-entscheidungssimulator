import { ICBMTrajectory } from '../types'

interface MapViewProps {
  trajectories: ICBMTrajectory[]
  elapsedTime: number
}

export default function MapView({ trajectories, elapsedTime }: MapViewProps) {
  // Vereinfachte Weltkarte mit SVG
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">🌍</span> BEDROHUNGSKARTE
      </h2>

      <div className="flex-1 bg-gray-900 rounded relative overflow-hidden">
        {/* Vereinfachte Weltkarte als Platzhalter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-gray-400 mb-6">
              Globale Übersicht
            </div>

            {trajectories.length > 0 ? (
              <div className="space-y-2 text-left max-w-md mx-auto">
                <div className="bg-threat-red/20 border border-threat-red p-3">
                  <div className="text-threat-red font-bold mb-2">
                    ⚠ {trajectories.length} RAKETEN ERFASST
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    {trajectories.slice(0, 5).map((traj, idx) => (
                      <div key={traj.id} className="flex justify-between">
                        <span>Rakete #{idx + 1}:</span>
                        <span className="text-threat-red">{traj.target.name}</span>
                      </div>
                    ))}
                    {trajectories.length > 5 && (
                      <div className="text-xs text-gray-500 mt-2">
                        ... und {trajectories.length - 5} weitere
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-600 p-3">
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between mb-1">
                      <span>Typ:</span>
                      <span>ICBM / SLBM</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Status:</span>
                      <span className="text-orange-400">IN FLUG</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Geschätzte Ankunft:</span>
                      <span className="text-threat-red font-bold">
                        {Math.max(0, Math.floor((trajectories[0]?.impactTime || 600) - elapsedTime))}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">
                Keine Bedrohungen erfasst
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
