import {
  FollowUpEvent,
  NuclearUse,
  Scenario,
  ScenarioTruth,
  SimulationEvent,
  SimulationState,
  ThreatLevel,
  WorldEffects,
  WorldState,
} from '../types'
import { getDecisionById } from '../data/decisions'
import { getFollowUpEventsForDecision } from '../data/followUpEvents'
import { getDecisionEffect, isDecisionPossible } from './effects'
import { getTruthDependentEvents } from './clues'
import { getAdvisorReaction } from './reactions'

// ============================================
// SIMULATIONSKERN (reine Funktionen, ohne React)
// ============================================

const clamp = (v: number) => Math.max(0, Math.min(100, v))

export const SPIRAL_THRESHOLD = 50

// Maßnahmen, die dem Präsidenten jederzeit offenstehen - auch neben Folgeentscheidungen.
// Der Kern des Spiels: Schützen Sie Ihre Streitkräfte, provozieren Sie die Gegenseite.
// Reden Sie, verlieren Sie Zeit. Und der Knopf ist immer da.
export const STANDING_OPTIONS = [
  'verify-intelligence',
  'realign-satellites',
  'launch-recon-aircraft',
  'emergency-communication',
  'backchannels-activate',
  'contact-allies',
  'alert-defcon1',
  'scramble-bombers',
  'ssbn-deep-dive',
  'activate-missile-defense',
  'delegate-authority',
  'evacuation-only',
  'wait-for-impact',
  'demonstration-strike',
  'counterforce-retaliation',
  'immediate-full-retaliation',
]

// Längste Wartezeit, bis Folgeoptionen eines Befehls freigeschaltet werden
const UNLOCK_DELAY_CAP = 200

const standingOptions = (world: WorldState, usable: (ids: string[]) => string[]): string[] => {
  const conditional = [
    ...(world.flags.defcon1 ? ['after-defcon1-downgrade'] : []),
    ...(world.flags.bombersAirborne ? ['after-scramble-recall-all'] : []),
  ]
  return usable([...conditional, ...STANDING_OPTIONS])
}

const FINAL_FALLBACK = ['final-wait-impact', 'final-limited-strike', 'final-defensive-only', 'final-complete-deescalation']

const NUCLEAR_RANK: Record<NuclearUse, number> = { none: 0, demonstration: 1, limited: 2, massive: 3 }

export const createInitialWorld = (truth: ScenarioTruth): WorldState => ({
  escalation: truth.initialEscalation,
  clarity: 10,
  deterrence: truth.initialDeterrence,
  escalationTrend: 0,
  peakEscalation: truth.initialEscalation,
  flags: {
    hotline: false,
    backchannel: false,
    defcon1: false,
    bombersAirborne: false,
    ssbnSecured: false,
    delegated: false,
    missileDefense: false,
    evacuation: false,
  },
  nuclearUse: 'none',
  posture: 'none',
  thresholdsFired: [],
})

export const createInitialState = (scenario: Scenario, truth: ScenarioTruth): SimulationState => ({
  scenarioId: scenario.id,
  isRunning: false,
  isPaused: false,
  elapsedTime: 0,
  remainingTime: scenario.duration,
  currentThreatLevel: scenario.initialThreatLevel,
  receivedEvents: [],
  trajectories: [],
  selectedDecision: undefined,
  decisionMadeAt: undefined,
  decisionHistory: [],
  currentPhase: 0,
  availableDecisions: scenario.decisions.map(d => d.id).filter(id => isDecisionPossible(id, truth)),
  gameEnded: false,
  pendingFollowUpEvents: [],
  world: createInitialWorld(truth),
  pendingUnlocks: [],
})

const applyEffects = (world: WorldState, effects: WorldEffects | undefined): WorldState => {
  if (!effects) return world
  const escalation = clamp(world.escalation + (effects.escalation || 0))
  return {
    ...world,
    escalation,
    peakEscalation: Math.max(world.peakEscalation, escalation),
    clarity: clamp(world.clarity + (effects.clarity || 0)),
    deterrence: clamp(world.deterrence + (effects.deterrence || 0)),
    flags: { ...world.flags, ...(effects.flags || {}) },
  }
}

const schedule = (events: FollowUpEvent[], now: number, tag: string): FollowUpEvent[] =>
  events.map((event, index) => ({
    ...event,
    id: `${event.id}::${tag}-${index}`,
    timestamp: event.relativeToDecision ? now + event.triggerDelay : event.timestamp,
  }))

// --------------------------------------------
// Befehl erteilen
// --------------------------------------------
export const applyDecision = (
  prev: SimulationState,
  scenario: Scenario,
  truth: ScenarioTruth,
  decisionId: string,
): SimulationState => {
  if (prev.gameEnded || prev.endAt !== undefined) return prev
  if (!prev.availableDecisions.includes(decisionId)) return prev
  const decision = getDecisionById(decisionId)
  if (!decision) return prev

  const now = prev.elapsedTime
  const effect = getDecisionEffect(decisionId)

  // --- Folge-Events: generisch, aber ersetzt/ergänzt durch die verdeckte Wahrheit ---
  const truthEvents = getTruthDependentEvents(decisionId, truth)
  const base = truthEvents.replace ?? getFollowUpEventsForDecision(scenario.id, decisionId)
  const extra = truthEvents.extra.filter(e => !prev.world.thresholdsFired.includes(`clue:${e.id}`))
  const reaction = getAdvisorReaction(decision.category, prev.currentPhase)
  const newEvents = schedule([...base, ...extra, ...(reaction ? [reaction] : [])], now, `${decisionId}-${prev.currentPhase}`)

  // --- Weltzustand ---
  let world = applyEffects(prev.world, effect)
  world = { ...world, thresholdsFired: [...world.thresholdsFired, ...extra.map(e => `clue:${e.id}`)] }
  if (effect.nuclearUse && NUCLEAR_RANK[effect.nuclearUse] > NUCLEAR_RANK[world.nuclearUse]) {
    world = {
      ...world,
      nuclearUse: effect.nuclearUse,
      nuclearUseAt: world.nuclearUseAt ?? now,
      nuclearUseClarity: world.nuclearUseClarity ?? Math.round(world.clarity),
    }
  }
  if (effect.posture) {
    world = { ...world, posture: effect.posture, postureAt: now, postureClarity: Math.round(prev.world.clarity) }
  }

  // --- Neue Optionen ---
  const taken = new Set([...prev.decisionHistory.map(h => h.decisionId), decisionId])
  const usable = (ids: string[]) => ids.filter(id => !taken.has(id) && isDecisionPossible(id, truth) && getDecisionById(id))
  let available: string[] = []
  let pendingUnlocks = prev.pendingUnlocks
  const endsNow = effect.endDelay !== undefined || decision.endsGame
  if (!endsNow) {
    // Folgeoptionen werden erst verfügbar, wenn der zugehörige Lagebericht eintrifft -
    // sonst verrät die Option selbst, was die Aufklärung ergeben wird.
    const followUps = usable(decision.followUpDecisions || [])
    const infoDelays = [...base, ...extra].map(e => e.triggerDelay)
    const unlockDelay = Math.min(UNLOCK_DELAY_CAP, infoDelays.length ? Math.max(...infoDelays) : 0)
    let immediate: string[] = followUps
    if (unlockDelay > 0 && followUps.length > 0) {
      pendingUnlocks = [...pendingUnlocks, { sourceTitle: decision.title, ids: followUps, at: now + unlockDelay }]
      immediate = []
    }
    available = [...immediate, ...standingOptions(world, usable).filter(id => !immediate.includes(id))]
    if (available.length === 0) available = usable(FINAL_FALLBACK)
  } else {
    pendingUnlocks = []
  }

  return {
    ...prev,
    selectedDecision: decisionId,
    decisionMadeAt: now,
    decisionHistory: [
      ...prev.decisionHistory,
      {
        decisionId,
        decisionTitle: decision.title,
        timestamp: now,
        phase: prev.currentPhase,
        clarityAtDecision: Math.round(prev.world.clarity),
        escalationAtDecision: Math.round(prev.world.escalation),
      },
    ],
    currentPhase: prev.currentPhase + 1,
    availableDecisions: available,
    pendingFollowUpEvents: [...prev.pendingFollowUpEvents, ...newEvents],
    world: { ...world, endReason: endsNow ? 'decision' : world.endReason },
    endAt: endsNow ? now + (effect.endDelay ?? 20) : prev.endAt,
    lastOrder: { title: decision.title, at: now },
    pendingUnlocks,
  }
}

// --------------------------------------------
// Eskalationsdynamik: das Sicherheitsdilemma
// --------------------------------------------
// Oberhalb von 50 verstärkt sich Eskalation selbst: Die Gegenseite reagiert auf
// Ihre Alarmierung, Sie reagieren auf deren Reaktion. Ein offener heißer Draht bremst.
const escalationDriftPerSecond = (world: WorldState, truth: ScenarioTruth): number => {
  const { escalation, flags } = world
  const damping = flags.hotline ? 0.45 : flags.backchannel ? 0.7 : 1
  if (escalation > SPIRAL_THRESHOLD) {
    let drift = (escalation - SPIRAL_THRESHOLD) * 0.0035 * damping * truth.escalationSensitivity
    if (flags.defcon1 && flags.bombersAirborne) drift += 0.02 * damping // Unfallrisiko bei beidseitiger Maximalbereitschaft
    return drift
  }
  if (escalation <= 25) return 0
  return flags.hotline || flags.backchannel ? -0.04 : -0.02
}

const thresholdEvent = (
  key: string,
  now: number,
  truth: ScenarioTruth,
): SimulationEvent | null => {
  const adv = truth.adversary
  const base = { timestamp: now, source: 'Situation Room' as const }
  switch (key) {
    case 'esc-55':
      return { ...base, id: `esc-55-${now}`, type: 'military-status', priority: 'high', source: 'NSA',
        title: `${adv} erhöht die Alarmbereitschaft`,
        content: `Die Gegenseite reagiert auf UNSERE Maßnahmen: ${adv} versetzt strategische Bomber in Bereitschaft, Frühwarnzentren melden "amerikanische Kriegsvorbereitungen". Jeder weitere Schritt von uns wird dort als Bestätigung gelesen.` }
    case 'esc-70':
      return { ...base, id: `esc-70-${now}`, type: 'military-status', priority: 'critical', source: 'NSA',
        title: `${adv}: Strategische Kräfte gefechtsbereit`,
        content: `Mobile Werfer verlassen ihre Garnisonen, U-Boote laufen aus. Außenministerin Morrison: "Wir sind in der Spirale, Herr Präsident. Die reagieren auf uns, wir reagieren auf die. Irgendwer muss zuerst einen Schritt zurück machen."`,
        updatesThreatLevel: 'severe' }
    case 'esc-85':
      return { ...base, id: `esc-85-${now}`, type: 'system-alert', priority: 'critical', source: 'STRATCOM',
        title: `WARNUNG: ${adv} bereitet Launch on Warning vor`,
        content: `SIGINT: Vorbefehle an die Raketentruppen der Gegenseite. Dr. Chen: "Wenn die glauben, dass wir gleich feuern, feuern sie zuerst. Wir haben vielleicht noch zwei, drei Minuten, um das zu stoppen - mit dem Telefon, nicht mit Raketen."`,
        updatesThreatLevel: 'critical' }
    case 'esc-calm':
      return { ...base, id: `esc-calm-${now}`, type: 'diplomatic-message', priority: 'medium', source: 'State Department',
        title: `${adv} senkt die Alarmstufe`,
        content: `Erste Entspannungssignale: Bomber der Gegenseite kehren auf ihre Basen zurück. Die Spirale ist gebremst - vorerst.` }
    case 'esc-100':
      return { ...base, id: `esc-100-${now}`, type: 'system-alert', priority: 'critical', source: 'NORAD',
        title: truth.attackReal ? 'Gegner eskaliert: Angriff auf Städte' : `${adv} STARTET - als Reaktion auf uns`,
        content: truth.attackReal
          ? 'Die Gegenseite hat den begrenzten Charakter des Angriffs aufgegeben. Neue Startwelle, Ziele: Ballungszentren. Die Eskalationsspirale ist außer Kontrolle.'
          : `Massive Startwelle aus ${adv}. Ihre Frühwarnung hatte unsere Alarmierung als Angriffsvorbereitung gedeutet. Niemand hat zuerst geschossen - bis jetzt. Die Spirale hat sich selbst vollendet.`,
        updatesThreatLevel: 'critical' }
    default:
      return null
  }
}

// --------------------------------------------
// Zeitschritt
// --------------------------------------------
export const tick = (
  prev: SimulationState,
  scenario: Scenario,
  truth: ScenarioTruth,
  elapsed: number,
): SimulationState => {
  if (prev.gameEnded) return prev
  const dt = Math.max(0, elapsed - prev.elapsedTime)
  const remaining = Math.max(0, scenario.duration - elapsed)
  const received = new Set(prev.receivedEvents.map(e => e.id))

  const newScenarioEvents = scenario.events.filter(e => e.timestamp <= elapsed && !received.has(e.id))
  const triggered = prev.pendingFollowUpEvents.filter(e => e.timestamp <= elapsed && !received.has(e.id))
  const pending = prev.pendingFollowUpEvents.filter(e => !triggered.includes(e))

  let world = prev.world
  // Lagebild verbessert sich langsam von allein und durch jede eingehende Meldung
  world = applyEffects(world, { clarity: dt * 0.03 + newScenarioEvents.length * 2 })
  for (const e of triggered) world = applyEffects(world, e.effects)

  // Eskalationsdrift
  const drift = world.nuclearUse === 'massive' ? 0 : escalationDriftPerSecond(world, truth)
  world = applyEffects(world, { escalation: drift * dt })
  world = { ...world, escalationTrend: Math.round(drift * 60 * 10) / 10 }

  // Schwellen-Events
  const systemEvents: SimulationEvent[] = []
  const fired = new Set(world.thresholdsFired)
  const fire = (key: string) => {
    fired.add(key)
    const ev = thresholdEvent(key, elapsed, truth)
    if (ev) systemEvents.push(ev)
  }
  for (const level of [55, 70, 85]) {
    if (world.escalation >= level && !fired.has(`esc-${level}`)) fire(`esc-${level}`)
  }
  if (world.escalation < 40 && fired.has('esc-55') && !fired.has('esc-calm')) fire('esc-calm')

  let endAt = prev.endAt
  // Die Spirale entscheidet nur, solange kein endgültiger Befehl erteilt wurde
  if (world.escalation >= 100 && !fired.has('esc-100') && endAt === undefined) {
    fire('esc-100')
    world = { ...world, endReason: 'spiral' }
    endAt = Math.min(endAt ?? Infinity, elapsed + 12)
  }
  world = { ...world, thresholdsFired: [...fired] }

  // Freigeschaltete Folgeoptionen (Lagebericht ist eingetroffen)
  let availableDecisions = prev.availableDecisions
  const due = prev.pendingUnlocks.filter(u => u.at <= elapsed)
  const pendingUnlocks = due.length ? prev.pendingUnlocks.filter(u => u.at > elapsed) : prev.pendingUnlocks
  if (due.length && endAt === undefined) {
    const taken = new Set(prev.decisionHistory.map(h => h.decisionId))
    const unlocked = due.flatMap(u => u.ids).filter(id => !taken.has(id) && !availableDecisions.includes(id) && isDecisionPossible(id, truth))
    availableDecisions = [...unlocked, ...availableDecisions]
  }

  const newEvents = [...newScenarioEvents, ...triggered, ...systemEvents]
  let threat: ThreatLevel = prev.currentThreatLevel
  for (const e of newEvents) if (e.updatesThreatLevel) threat = e.updatesThreatLevel

  // Spielende
  let gameEnded = false
  if (endAt !== undefined && elapsed >= endAt) gameEnded = true
  if (endAt === undefined && remaining === 0) {
    gameEnded = true
    world = { ...world, endReason: 'timeout' }
  }

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  return {
    ...prev,
    elapsedTime: elapsed,
    remainingTime: remaining,
    receivedEvents: newEvents.length
      ? [...prev.receivedEvents, ...newEvents].sort((a, b) =>
          b.timestamp !== a.timestamp ? b.timestamp - a.timestamp : priorityOrder[a.priority] - priorityOrder[b.priority])
      : prev.receivedEvents,
    pendingFollowUpEvents: pending,
    currentThreatLevel: threat,
    world,
    endAt,
    availableDecisions: endAt !== undefined ? [] : availableDecisions,
    pendingUnlocks: endAt !== undefined ? [] : pendingUnlocks,
    gameEnded,
    isRunning: !gameEnded,
  }
}
