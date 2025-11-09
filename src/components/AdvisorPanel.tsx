import { Advisor } from '../types'

interface AdvisorPanelProps {
  advisors: Advisor[]
  elapsedTime: number
}

const getPersonalityIcon = (personality: string) => {
  switch (personality) {
    case 'hawkish': return '🦅'
    case 'dovish': return '🕊️'
    case 'pragmatic': return '⚖️'
    case 'cautious': return '🛡️'
    default: return '👤'
  }
}

const getConfidenceColor = (confidence: string) => {
  switch (confidence) {
    case 'high': return 'text-green-400'
    case 'medium': return 'text-yellow-400'
    case 'low': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const formatTimestamp = (seconds: number): string => {
  if (seconds < 0) {
    const absSeconds = Math.abs(seconds)
    return `T-${Math.floor(absSeconds / 60).toString().padStart(2, '0')}:${(absSeconds % 60).toString().padStart(2, '0')}`
  }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `T+${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function AdvisorPanel({ advisors, elapsedTime }: AdvisorPanelProps) {
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">👥</span> BERATER
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4">
        {advisors.map((advisor) => {
          const visibleStatements = advisor.statements
            .filter(s => s.timestamp <= elapsedTime)
            .sort((a, b) => b.timestamp - a.timestamp)

          if (visibleStatements.length === 0) {
            return null
          }

          const latestStatement = visibleStatements[0]

          return (
            <div
              key={advisor.id}
              className="bg-gray-800/50 border border-gray-600 p-3"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">
                  {getPersonalityIcon(advisor.personality)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{advisor.name}</h3>
                  <p className="text-xs text-gray-400">{advisor.title}</p>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold ${getConfidenceColor(latestStatement.confidence)}`}>
                    Aktuell: {latestStatement.confidence.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Vertrauen</div>
                </div>
              </div>

              <div className="space-y-2">
                {visibleStatements.map((statement, index) => (
                  <div
                    key={`${advisor.id}-${statement.timestamp}-${index}`}
                    className="bg-black/30 rounded p-2 border border-gray-700/60"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span className="font-mono font-semibold text-gray-300">
                        {formatTimestamp(statement.timestamp)}
                      </span>
                      <span className={`font-semibold ${getConfidenceColor(statement.confidence)}`}>
                        {statement.confidence.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200 italic">"{statement.content}"</p>
                    {statement.recommendation && (
                      <div className="mt-1 text-xs text-blue-400">
                        → Empfehlung: {statement.recommendation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
