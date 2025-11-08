import { ThreatLevel } from '../types'

interface CountdownTimerProps {
  remainingTime: number
  threatLevel: ThreatLevel
  isRunning: boolean
  isPaused: boolean
}

const getThreatColor = (level: ThreatLevel): string => {
  switch (level) {
    case 'low': return 'text-safe-green'
    case 'elevated': return 'text-warning-yellow'
    case 'high': return 'text-orange-500'
    case 'severe': return 'text-threat-red'
    case 'critical': return 'text-threat-red alert-pulse'
    default: return 'text-white'
  }
}

const getThreatLabel = (level: ThreatLevel): string => {
  switch (level) {
    case 'low': return 'NIEDRIG'
    case 'elevated': return 'ERHÖHT'
    case 'high': return 'HOCH'
    case 'severe': return 'SCHWER'
    case 'critical': return 'KRITISCH'
    default: return 'UNBEKANNT'
  }
}

export default function CountdownTimer({ remainingTime, threatLevel, isRunning, isPaused }: CountdownTimerProps) {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  const formatTime = (val: number) => val.toString().padStart(2, '0')

  return (
    <div className="bg-dark-panel border border-gray-700 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-gray-400 text-sm mb-1">VERBLEIBENDE ZEIT</div>
          <div className={`text-6xl font-mono font-bold ${remainingTime < 120 ? 'text-threat-red alert-pulse' : 'text-white'}`}>
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          {isPaused && (
            <div className="text-warning-yellow mt-2 text-sm">
              [PAUSIERT]
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="text-gray-400 text-sm mb-1">BEDROHUNGSSTUFE</div>
          <div className={`text-2xl font-bold ${getThreatColor(threatLevel)}`}>
            {getThreatLabel(threatLevel)}
          </div>
          {threatLevel === 'critical' && (
            <div className="mt-2 text-xs text-threat-red">
              ⚠ MAXIMALE GEFAHR
            </div>
          )}
        </div>
      </div>

      {remainingTime < 60 && isRunning && (
        <div className="mt-4 bg-threat-red/20 border border-threat-red p-3 alert-pulse">
          <div className="text-threat-red font-bold text-center">
            KRITISCH: WENIGER ALS 1 MINUTE VERBLEIBEND
          </div>
        </div>
      )}

      {remainingTime === 0 && (
        <div className="mt-4 bg-red-900/50 border border-red-500 p-3">
          <div className="text-red-200 font-bold text-center">
            ZEIT ABGELAUFEN
          </div>
        </div>
      )}
    </div>
  )
}
