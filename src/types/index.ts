// Szenario-Typen
export type ScenarioType = 'real-attack' | 'false-alarm' | 'cyber-attack' | 'ambiguous' | 'decapitation'

export interface Scenario {
  id: ScenarioType
  title: string
  description: string
  initialThreatLevel: ThreatLevel
  duration: number // in Sekunden (600 = 10 Minuten)
  events: SimulationEvent[]
  advisors: Advisor[]
  decisions: Decision[]
  correctDecision?: string // ID der historisch "richtigen" Entscheidung
  historicalContext: string
  trajectories?: ICBMTrajectory[] // Optional: ICBM-Flugbahnen für die Bedrohungskarte
}

// Bedrohungslevel
export type ThreatLevel = 'low' | 'elevated' | 'high' | 'severe' | 'critical'

// Simulation Events (zeitgesteuerte Ereignisse)
export interface SimulationEvent {
  id: string
  timestamp: number // Sekunden seit Simulationsbeginn
  type: EventType
  priority: 'low' | 'medium' | 'high' | 'critical'
  source: EventSource
  title: string
  content: string
  data?: Record<string, unknown>
  updatesThreatLevel?: ThreatLevel
  effects?: WorldEffects // Wirkung auf den Weltzustand, sobald das Event eintrifft
}

export type EventType =
  | 'intelligence-report'
  | 'satellite-data'
  | 'radar-detection'
  | 'diplomatic-message'
  | 'advisor-update'
  | 'system-alert'
  | 'communication-attempt'
  | 'military-status'

export type EventSource =
  | 'NORAD'
  | 'NSA'
  | 'CIA'
  | 'STRATCOM'
  | 'State Department'
  | 'White House'
  | 'Pentagon'
  | 'Satellite Network'
  | 'Early Warning System'
  | 'USCYBERCOM'
  | 'Situation Room'

// Berater
export interface Advisor {
  id: string
  name: string
  title: string
  avatar?: string
  position: AdvisorPosition
  statements: AdvisorStatement[]
  personality: 'hawkish' | 'dovish' | 'pragmatic' | 'cautious'
}

export type AdvisorPosition =
  | 'Secretary of Defense'
  | 'Chairman of Joint Chiefs of Staff'
  | 'National Security Advisor'
  | 'Secretary of State'
  | 'CIA Director'
  | 'White House Chief of Staff'
  | 'STRATCOM Commander'
  | 'Vice President'

export interface AdvisorStatement {
  timestamp: number // Wann diese Aussage erscheint
  content: string
  recommendation?: string // ID der empfohlenen Entscheidung
  confidence: 'low' | 'medium' | 'high'
}

// Entscheidungen
export interface Decision {
  id: string
  title: string
  description: string
  category: DecisionCategory
  consequences: Consequence[]
  requiresConfirmation: boolean
  militaryEscalation: number // 0-10 Skala
  diplomaticImpact: number // -10 bis +10
  civilianCasualties: 'none' | 'low' | 'medium' | 'high' | 'catastrophic'
  followUpEvents?: FollowUpEvent[] // Ereignisse, die durch diese Entscheidung ausgelöst werden
  followUpDecisions?: string[] // IDs der Folge-Entscheidungen
  endsGame?: boolean // Beendet diese Entscheidung das Spiel?
  gameEndingType?: 'immediate' | 'delayed' // Sofortiges Ende oder nach Folge-Events?
}

export type DecisionCategory =
  | 'immediate-retaliation'
  | 'delayed-response'
  | 'defensive-only'
  | 'diplomatic'
  | 'wait-and-see'
  | 'evacuation'

export interface Consequence {
  type: 'military' | 'diplomatic' | 'civilian' | 'political' | 'international' | 'intelligence'
  description: string
  severity: 'minor' | 'moderate' | 'major' | 'catastrophic'
}

// ICBM-Daten für die Karte
export interface ICBMTrajectory {
  id: string
  origin: Coordinates
  target: Coordinates
  launchTime: number
  impactTime: number
  status: 'launched' | 'mid-flight' | 'terminal-phase' | 'impacted' | 'intercepted'
  warheadYield?: string // z.B. "500 kt"
  type: 'ICBM' | 'SLBM' | 'IRBM'
}

export interface Coordinates {
  lat: number
  lng: number
  name?: string
}

export interface Target {
  id: string
  name: string
  type: 'city' | 'military-base' | 'strategic-asset'
  coordinates: Coordinates
  population?: number
  threatLevel: ThreatLevel
}

// Follow-Up Events (werden durch Entscheidungen ausgelöst)
export interface FollowUpEvent extends SimulationEvent {
  triggerDelay: number // Sekunden nach der Entscheidung
  relativeToDecision: boolean // true = relativ zur Entscheidungszeit, false = absolut
}

// Entscheidungshistorie
export interface DecisionHistoryEntry {
  decisionId: string
  decisionTitle: string
  timestamp: number
  phase: number
  clarityAtDecision?: number
  escalationAtDecision?: number
}

// ============================================
// WELTZUSTAND (verdeckte Spielmechanik)
// ============================================

// Was tatsächlich passiert - dem Spieler bis zum Debriefing unbekannt
export type TruthKind = 'counterforce' | 'decapitation' | 'sensor-fault' | 'cyber-deception'

export interface ScenarioTruth {
  kind: TruthKind
  attackReal: boolean
  adversary: string // Wer reagiert auf unsere Alarmierung (für Eskalations-Events)
  initialEscalation: number
  initialDeterrence: number
  escalationSensitivity: number // Wie nervös reagiert die Gegenseite auf unsere Alarmierung?
  whatReallyHappened: string
}

// Endgültige Haltung des Präsidenten
export type Posture =
  | 'massive-strike'
  | 'limited-strike'
  | 'demonstration'
  | 'ceasefire'
  | 'stand-down'
  | 'ride-out'
  | 'no-retaliation'
  | 'none'

export type NuclearUse = 'none' | 'demonstration' | 'limited' | 'massive'

export interface WorldFlags {
  hotline: boolean
  backchannel: boolean
  defcon1: boolean
  bombersAirborne: boolean
  ssbnSecured: boolean
  delegated: boolean
  missileDefense: boolean
  evacuation: boolean
}

export interface WorldEffects {
  escalation?: number
  clarity?: number
  deterrence?: number
  flags?: Partial<WorldFlags>
}

export interface WorldState {
  escalation: number // 0-100: Eskalationsdruck zwischen den Mächten. 100 = Spirale außer Kontrolle
  clarity: number // 0-100: Wie gut ist Ihr Lagebild?
  deterrence: number // 0-100: Überlebens-/Vergeltungsfähigkeit, falls der Angriff echt ist
  escalationTrend: number // Veränderung pro Minute (für die Anzeige)
  peakEscalation: number
  flags: WorldFlags
  nuclearUse: NuclearUse
  nuclearUseAt?: number
  nuclearUseClarity?: number
  posture: Posture
  postureAt?: number
  postureClarity?: number
  thresholdsFired: string[]
  endReason?: 'decision' | 'timeout' | 'spiral'
}

export interface OutcomeScores {
  lives: number
  judgment: number
  control: number
  deterrence: number
  total: number
}

export interface Outcome {
  id: string
  title: string
  narrative: string
  casualties: string
  tone: 'catastrophic' | 'grave' | 'mixed' | 'good'
  scores: OutcomeScores
  grade: string
  lessons: string[]
}

// Simulation State
export interface SimulationState {
  scenarioId: ScenarioType
  isRunning: boolean
  isPaused: boolean
  elapsedTime: number // Sekunden
  remainingTime: number // Sekunden
  currentThreatLevel: ThreatLevel
  receivedEvents: SimulationEvent[]
  trajectories: ICBMTrajectory[]
  selectedDecision?: string
  decisionMadeAt?: number
  decisionHistory: DecisionHistoryEntry[] // Historie aller getroffenen Entscheidungen
  currentPhase: number // Aktuelle Entscheidungsphase (0 = initial, 1 = nach erster Entscheidung, etc.)
  availableDecisions: string[] // IDs der aktuell verfügbaren Entscheidungen
  gameEnded: boolean // Ist das Spiel beendet?
  pendingFollowUpEvents: FollowUpEvent[] // Wartende Folge-Events
  world: WorldState
  endAt?: number // Verzögertes Spielende (Sekunden), damit Folge-Events noch ablaufen
  lastOrder?: { title: string; at: number } // Zuletzt erteilter Befehl (für Rückmeldung im UI)
  pendingUnlocks: PendingUnlock[] // Folgeoptionen, die erst mit dem Lagebericht verfügbar werden
}

export interface PendingUnlock {
  sourceTitle: string
  ids: string[]
  at: number
}

// Debriefing nach der Simulation
export interface DebriefingData {
  scenarioId: ScenarioType
  scenarioTitle: string
  blind: boolean
  outcome: Outcome
  whatReallyHappened: string
  historicalComparison: string
  decisionLog: DecisionHistoryEntry[]
  peakEscalation: number
  finalClarity: number
  finalDeterrence: number
  endTime: number
}
