import { Advisor } from '../types'
import { getDecisionById } from '../data/decisions'

interface AdvisorPanelProps {
  advisors: Advisor[]
  elapsedTime: number
  trust?: Record<string, number>
  broken?: string[]
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

const trustColor = (t: number) => (t >= 50 ? 'bg-safe-green' : t >= 35 ? 'bg-warning-yellow' : 'bg-threat-red')

export default function AdvisorPanel({ advisors, elapsedTime, trust = {}, broken = [] }: AdvisorPanelProps) {
  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
        <span className="mr-2">👥</span> BERATER
      </h2>

      {/* Kabinett: Vertrauen in Ihre Führung */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-3 flex-shrink-0">
        {advisors.map(advisor => {
          const t = Math.round(trust[advisor.id] ?? 70)
          const isBroken = broken.includes(advisor.id)
          return (
            <div
              key={advisor.id}
              className="text-[11px]"
              title={`${advisor.title}: Vertrauen in Ihre Führung ${t}/100${isBroken ? ' - Bruch' : ''}`}
            >
              <div className="flex justify-between">
                <span className={isBroken ? 'text-threat-red line-through' : 'text-gray-300'}>
                  {getPersonalityIcon(advisor.personality)} {advisor.name.split(' ').slice(-1)[0]}
                </span>
                <span className="font-mono text-gray-400">{isBroken ? 'BRUCH' : t}</span>
              </div>
              <div className="h-1 bg-gray-800">
                <div className={`h-full transition-all duration-500 ${trustColor(t)}`} style={{ width: `${t}%` }} />
              </div>
            </div>
          )
        })}
      </div>

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
              className={`bg-gray-800/50 border p-3 ${broken.includes(advisor.id) ? 'border-threat-red/60 opacity-60' : 'border-gray-600'}`}
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
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Gewissheit</div>
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
                        → Empfehlung: {getDecisionById(statement.recommendation)?.title ?? statement.recommendation}
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
