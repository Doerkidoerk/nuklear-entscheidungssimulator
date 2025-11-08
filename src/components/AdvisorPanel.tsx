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

export default function AdvisorPanel({ advisors, elapsedTime }: AdvisorPanelProps) {
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">👥</span> BERATER
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4">
        {advisors.map((advisor) => {
          // Nur Statements anzeigen, die bereits passiert sind
          const visibleStatements = advisor.statements.filter(s => s.timestamp <= elapsedTime)
          const latestStatement = visibleStatements[visibleStatements.length - 1]

          if (!latestStatement) return null

          return (
            <div
              key={advisor.id}
              className="bg-gray-800/50 border border-gray-600 p-3"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="text-3xl">
                  {getPersonalityIcon(advisor.personality)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{advisor.name}</h3>
                  <p className="text-xs text-gray-400">{advisor.title}</p>
                </div>
                <div className={`text-xs ${getConfidenceColor(latestStatement.confidence)}`}>
                  Sicherheit: {latestStatement.confidence.toUpperCase()}
                </div>
              </div>

              <div className="bg-black/30 p-2 rounded">
                <p className="text-sm text-gray-200 italic">
                  "{latestStatement.content}"
                </p>
              </div>

              {latestStatement.recommendation && (
                <div className="mt-2 text-xs text-blue-400">
                  → Empfiehlt: {latestStatement.recommendation}
                </div>
              )}

              {visibleStatements.length > 1 && (
                <div className="mt-2 text-xs text-gray-500">
                  ({visibleStatements.length} Statements insgesamt)
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
