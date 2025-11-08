// Szenario-Typen
export type ScenarioType = 'real-attack' | 'false-alarm' | 'cyber-attack' | 'ambiguous'

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
}

export type DecisionCategory =
  | 'immediate-retaliation'
  | 'delayed-response'
  | 'defensive-only'
  | 'diplomatic'
  | 'wait-and-see'
  | 'evacuation'

export interface Consequence {
  type: 'military' | 'diplomatic' | 'civilian' | 'political' | 'international'
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
}

// Debriefing nach der Simulation
export interface DebriefingData {
  scenarioId: ScenarioType
  scenarioTitle: string
  playerDecision: Decision
  decisionTime: number
  wasCorrect: boolean
  consequences: Consequence[]
  historicalComparison: string
  whatReallyHappened: string
  lessonsLearned: string[]
  score: number
}
