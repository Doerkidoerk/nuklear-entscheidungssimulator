import { Decision, DecisionHistoryEntry, PendingUnlock } from '../types'
import { useState } from 'react'
import { getDecisionById } from '../data/decisions'
import { STANDING_OPTIONS } from '../engine/simulation'
import { getDecisionEffect } from '../engine/effects'

interface DecisionPanelProps {
  availableDecisionIds: string[]
  onDecisionMade: (decisionId: string) => void
  disabled: boolean
  decisionHistory: DecisionHistoryEntry[]
  currentPhase: number
  statusMessage?: string
  pendingUnlocks?: PendingUnlock[]
  elapsedTime?: number
}

export default function DecisionPanel({
  availableDecisionIds,
  onDecisionMade,
  disabled,
  decisionHistory,
  currentPhase,
  statusMessage,
  pendingUnlocks = [],
  elapsedTime = 0
}: DecisionPanelProps) {
  const decisions = availableDecisionIds.map(id => getDecisionById(id)).filter((d): d is Decision => d !== undefined)
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDecisionClick = (decision: Decision) => {
    setSelectedDecision(decision)
    // Alles, was Atomwaffen einsetzt oder das Spiel beendet, muss bestätigt werden
    const effect = getDecisionEffect(decision.id)
    if (decision.requiresConfirmation || effect.nuclearUse || effect.posture) {
      setShowConfirmation(true)
    } else {
      onDecisionMade(decision.id)
    }
  }

  const confirmDecision = () => {
    if (selectedDecision) {
      onDecisionMade(selectedDecision.id)
      setShowConfirmation(false)
    }
  }

  const cancelDecision = () => {
    setShowConfirmation(false)
    setSelectedDecision(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'immediate-retaliation': return 'border-threat-red hover:bg-threat-red/10'
      case 'delayed-response': return 'border-orange-500 hover:bg-orange-500/10'
      case 'defensive-only': return 'border-blue-500 hover:bg-blue-500/10'
      case 'diplomatic': return 'border-green-500 hover:bg-green-500/10'
      case 'wait-and-see': return 'border-yellow-500 hover:bg-yellow-500/10'
      case 'evacuation': return 'border-purple-500 hover:bg-purple-500/10'
      default: return 'border-gray-600 hover:bg-gray-700/10'
    }
  }

  if (showConfirmation && selectedDecision) {
    return (
      <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">⚠️</span> BESTÄTIGUNG ERFORDERLICH
        </h2>

        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-threat-red/20 border-2 border-threat-red p-6 mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {selectedDecision.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {selectedDecision.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Militärische Eskalation:</span>
                <span className="text-threat-red font-bold">
                  {selectedDecision.militaryEscalation}/10
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Zivile Opfer:</span>
                <span className="text-threat-red font-bold uppercase">
                  {selectedDecision.civilianCasualties}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700 p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              Diese Entscheidung ist <strong>IRREVERSIBEL</strong>. Sind Sie absolut sicher?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={cancelDecision}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 border border-gray-500 transition-colors"
            >
              ← ABBRECHEN
            </button>
            <button
              onClick={confirmDecision}
              className="bg-threat-red hover:bg-red-700 text-white font-bold py-3 px-6 border border-red-500 transition-colors"
            >
              BESTÄTIGEN →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const situational = decisions.filter(d => !STANDING_OPTIONS.includes(d.id))
  const standing = decisions.filter(d => STANDING_OPTIONS.includes(d.id))

  const renderCard = (decision: Decision, compact: boolean) => (
    <button
      key={decision.id}
      onClick={() => handleDecisionClick(decision)}
      disabled={disabled}
      title={decision.description}
      className={`w-full text-left bg-gray-800/50 border ${compact ? 'p-2' : 'p-4'} transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : getCategoryColor(decision.category)
      }`}
    >
      <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'mb-2'}`}>
        {getDecisionEffect(decision.id).nuclearUse && <span className="text-threat-red mr-1">☢</span>}
        {decision.title}
      </h3>
      <p className={`text-gray-300 ${compact ? 'text-xs line-clamp-2' : 'text-sm mb-3'}`}>{decision.description}</p>

      {!compact && (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-gray-500">Eskalation:</span>
            <div className="font-bold text-orange-400">{decision.militaryEscalation}/10</div>
          </div>
          <div>
            <span className="text-gray-500">Diplomatie:</span>
            <div className={`font-bold ${decision.diplomaticImpact > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {decision.diplomaticImpact > 0 ? '+' : ''}{decision.diplomaticImpact}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Opfer:</span>
            <div className="font-bold text-red-400 uppercase text-xs">
              {decision.civilianCasualties}
            </div>
          </div>
        </div>
      )}
    </button>
  )

  return (
    <div className="bg-dark-panel border border-gray-700 p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-2 flex items-center justify-between flex-shrink-0">
        <span className="flex items-center">
          <span className="mr-2">⚡</span> HANDLUNGSOPTIONEN
        </span>
        {currentPhase > 0 && (
          <span className="text-sm text-gray-400">Phase {currentPhase + 1}</span>
        )}
      </h2>

      {/* Entscheidungshistorie */}
      {decisionHistory.length > 0 && (
        <div className="mb-3 p-2 bg-gray-800/50 border border-gray-600 rounded flex-shrink-0">
          <div className="text-xs text-gray-400 mb-1">Vorherige Entscheidungen:</div>
          <div className="space-y-1">
            {decisionHistory.slice(-3).map((entry, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-start">
                <span className="text-blue-400 mr-2">{decisionHistory.length - Math.min(3, decisionHistory.length) + index + 1}.</span>
                <span className="flex-1">{entry.decisionTitle}</span>
                <span className="text-gray-500 ml-2">({Math.floor(entry.timestamp / 60)}:{(entry.timestamp % 60).toString().padStart(2, '0')})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
        {decisions.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="mb-2">Keine weiteren Befehle möglich</p>
            <p className="text-sm">Die Ereignisse nehmen ihren Lauf...</p>
          </div>
        )}
        {pendingUnlocks.map((u, i) => (
          <div key={i} className="text-xs text-gray-400 border border-dashed border-gray-600 p-2">
            ⏳ Lagebericht ausstehend: <span className="text-gray-200">{u.sourceTitle}</span>
            <span className="float-right font-mono">~{Math.max(0, u.at - elapsedTime)}s</span>
          </div>
        ))}
        {situational.length > 0 && (
          <div className="text-xs uppercase tracking-widest text-blue-400">Aktuelle Lage</div>
        )}
        {situational.map(decision => renderCard(decision, false))}
        {standing.length > 0 && (
          <div className="text-xs uppercase tracking-widest text-gray-500 pt-2">
            Stehende Optionen
          </div>
        )}
        {standing.map(decision => renderCard(decision, situational.length > 0))}
      </div>

      {disabled && (
        <div className="mt-4 bg-gray-800 border border-gray-600 p-3 text-center flex-shrink-0">
          <p className="text-gray-400 text-sm">
            {statusMessage || 'Simulation beendet'}
          </p>
        </div>
      )}
    </div>
  )
}
