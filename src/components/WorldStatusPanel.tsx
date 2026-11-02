import { WorldState } from '../types'

interface WorldStatusPanelProps {
  world: WorldState
}

const Meter = ({ label, value, hint, color, trend }: { label: string; value: number; hint: string; color: string; trend?: number }) => (
  <div title={hint}>
    <div className="flex justify-between items-baseline text-xs mb-1">
      <span className="text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="font-mono text-white">
        {Math.round(value)}
        {trend !== undefined && Math.abs(trend) >= 0.5 && (
          <span className={trend > 0 ? 'text-threat-red ml-1' : 'text-safe-green ml-1'}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}/min
          </span>
        )}
      </span>
    </div>
    <div className="h-2 bg-gray-800 border border-gray-700">
      <div className={`h-full transition-all duration-500 ${color}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  </div>
)

export default function WorldStatusPanel({ world }: WorldStatusPanelProps) {
  const esc = world.escalation
  const escColor = esc >= 85 ? 'bg-threat-red alert-pulse' : esc >= 70 ? 'bg-threat-red' : esc >= 55 ? 'bg-orange-500' : 'bg-warning-yellow'
  return (
    <div className="bg-dark-panel border border-gray-700 px-4 py-3 h-full flex flex-col justify-around gap-1">
      <Meter
        label="Eskalationsdruck"
        value={esc}
        trend={world.escalationTrend}
        color={escColor}
        hint="Wie die Gegenseite Ihre Maßnahmen liest. Bei 100 gerät die Spirale außer Kontrolle."
      />
      <Meter
        label="Lagebild"
        value={world.clarity}
        color="bg-blue-500"
        hint="Wie sicher wissen Sie, was wirklich geschieht?"
      />
      <Meter
        label="Vergeltungsfähigkeit"
        value={world.deterrence}
        color="bg-safe-green"
        hint="Was einen echten Angriff überleben würde."
      />
    </div>
  )
}
