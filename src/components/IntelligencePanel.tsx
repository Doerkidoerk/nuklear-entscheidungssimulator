import { SimulationEvent } from '../types'

interface IntelligencePanelProps {
  events: SimulationEvent[]
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-threat-red/20 border-threat-red text-threat-red'
    case 'high': return 'bg-orange-500/20 border-orange-500 text-orange-400'
    case 'medium': return 'bg-warning-yellow/20 border-warning-yellow text-warning-yellow'
    case 'low': return 'bg-blue-500/20 border-blue-500 text-blue-400'
    default: return 'bg-gray-700/20 border-gray-600 text-gray-400'
  }
}

const formatTimestamp = (seconds: number): string => {
  // Negative Zeitstempel bedeuten "vor Simulationsbeginn"
  if (seconds < 0) {
    return `T-${Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0')}:${(Math.abs(seconds) % 60).toString().padStart(2, '0')}`
  }
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `T+${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function IntelligencePanel({ events }: IntelligencePanelProps) {
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white flex items-center justify-between">
          <span className="flex items-center">
            <span className="mr-2">📡</span> NACHRICHTENPROTOKOLL
          </span>
          <span className="text-xs text-gray-400 font-normal">
            {events.length > 0 && `${events.length} Nachrichten • Neueste zuerst`}
          </span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {events.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Warte auf Nachrichten...
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`border p-3 ${getPriorityColor(event.priority)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-mono font-bold bg-black/40 px-2 py-1 rounded border border-current">
                    {formatTimestamp(event.timestamp)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-black/30 rounded uppercase">
                    {event.source}
                  </span>
                </div>
                <span className="text-xs uppercase font-bold px-2 py-1 bg-black/30 rounded">
                  {event.priority}
                </span>
              </div>
              <h3 className="font-bold mb-1 text-base">{event.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{event.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
