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
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `T+${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function IntelligencePanel({ events }: IntelligencePanelProps) {
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">📡</span> NACHRICHTENPROTOKOLL
      </h2>

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
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono opacity-70">
                    {formatTimestamp(event.timestamp)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-black/30 rounded">
                    {event.source}
                  </span>
                </div>
                <span className="text-xs uppercase font-bold">
                  {event.priority}
                </span>
              </div>
              <h3 className="font-bold mb-1">{event.title}</h3>
              <p className="text-sm opacity-90">{event.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
