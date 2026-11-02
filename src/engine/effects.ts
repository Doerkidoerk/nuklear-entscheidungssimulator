import { NuclearUse, Posture, ScenarioTruth, WorldEffects } from '../types'

// ============================================
// WIRKUNG DER BEFEHLE AUF DEN WELTZUSTAND
// ============================================
// escalation: Wie der Gegner Ihren Befehl liest (Sicherheitsdilemma!)
// deterrence: Wie viel Vergeltungsfähigkeit einen echten Angriff überlebt
// clarity: Lagebild - wird vor allem über wahrheitsabhängige Hinweise gewonnen

export interface DecisionEffect extends WorldEffects {
  nuclearUse?: NuclearUse
  posture?: Posture // Setzt die endgültige Haltung (Spielende)
  endDelay?: number // Sekunden, bis das Spiel nach diesem Befehl endet
}

export const decisionEffects: Record<string, DecisionEffect> = {
  // --- Verifikation ---
  'verify-intelligence': { escalation: 2 },
  'realign-satellites': {},
  'launch-recon-aircraft': { escalation: 4 },

  // --- Kommunikation ---
  'emergency-communication': { escalation: -10, flags: { hotline: true } },
  'backchannels-activate': { escalation: -5, flags: { backchannel: true } },
  'contact-allies': { escalation: 3 },

  // --- Militärische Bereitschaft ---
  'alert-defcon1': { escalation: 20, deterrence: 10, flags: { defcon1: true } },
  'scramble-bombers': { escalation: 12, deterrence: 20, flags: { bombersAirborne: true } },
  'ssbn-deep-dive': { escalation: 5, deterrence: 15, flags: { ssbnSecured: true } },
  'activate-missile-defense': { escalation: 3, deterrence: 5, flags: { missileDefense: true } },
  'delegate-authority': { escalation: 8, deterrence: 20, flags: { delegated: true } },
  // Evakuierungen sehen für den Gegner aus wie die Vorbereitung eines Erstschlags
  'evacuation-only': { escalation: 10, deterrence: -5, flags: { evacuation: true } },

  // --- Reaktion ---
  'wait-for-impact': { escalation: 0 },
  'counterforce-retaliation': { escalation: 40, nuclearUse: 'limited', posture: 'limited-strike' },
  'demonstration-strike': { escalation: 30, nuclearUse: 'demonstration', posture: 'demonstration', endDelay: 60 },
  'immediate-full-retaliation': { escalation: 60, nuclearUse: 'massive', posture: 'massive-strike', endDelay: 35 },

  // --- Folge-Entscheidungen ---
  'after-verify-still-wait': { escalation: -3 },
  'after-verify-trust-intel': { escalation: 40, nuclearUse: 'limited', posture: 'limited-strike', endDelay: 30 },
  'after-verify-communicate': { escalation: -10, flags: { hotline: true } },
  'after-verify-escalate-defcon': { escalation: 20, deterrence: 10, flags: { defcon1: true } },

  'after-scramble-recall-all': { escalation: -15, deterrence: -20, flags: { bombersAirborne: false } },
  'after-scramble-hold-pattern': { escalation: 3 },
  'after-scramble-arm-bombers': { escalation: 18, deterrence: 10 },
  'after-scramble-communicate': { escalation: -8, flags: { hotline: true } },

  'after-comm-accept-data-exchange': { escalation: -5 },
  'after-comm-reject-russian-data': { escalation: 5 },
  'after-comm-demand-proof': { escalation: 6 },
  'after-comm-trust-shoigu': { escalation: -25, posture: 'stand-down', endDelay: 25 },
  'after-comm-mutual-stand-down': { escalation: -30, posture: 'stand-down', endDelay: 20 },
  'after-comm-mutual-recall': { escalation: -25, deterrence: -10, posture: 'stand-down', endDelay: 20 },
  'after-comm-no-response': { escalation: 3 },

  'after-defcon1-launch': { escalation: 60, nuclearUse: 'massive', posture: 'massive-strike', endDelay: 35 },
  'after-defcon1-wait': { escalation: 2 },
  'after-defcon1-communicate': { escalation: -8, flags: { hotline: true } },
  'after-defcon1-downgrade': { escalation: -12, flags: { defcon1: false } },

  'after-allies-trust-uk': { escalation: -20, posture: 'stand-down', endDelay: 20 },
  'after-allies-use-french-nukes': { escalation: 20, deterrence: 10 },
  'after-allies-ignore-germany': { escalation: 8 },

  'after-satellite-trust-visual': {},
  'after-satellite-suspicion': {},
  'after-satellite-no-launches': { escalation: -5 },

  'after-cf-accept-putin-deal': { escalation: -20, posture: 'ceasefire', endDelay: 20 },
  'after-cf-reject-escalate': { escalation: 60, nuclearUse: 'massive', posture: 'massive-strike', endDelay: 30 },

  'after-recon-trust-sigint': { escalation: -20, posture: 'stand-down', endDelay: 20 },
  'after-recon-still-suspicious': {},

  'after-data-confirms-false': { escalation: -30, posture: 'stand-down', endDelay: 20 },
  'after-data-still-unclear': {},

  'final-massive-retaliation': { escalation: 60, nuclearUse: 'massive', posture: 'massive-strike', endDelay: 30 },
  'final-wait-impact': { posture: 'ride-out', endDelay: 20 },
  'final-limited-strike': { escalation: 40, nuclearUse: 'limited', posture: 'limited-strike', endDelay: 30 },
  'final-defensive-only': { escalation: -10, posture: 'no-retaliation', endDelay: 20 },
  'final-complete-deescalation': { escalation: -30, posture: 'stand-down', endDelay: 20 },
}

export const getDecisionEffect = (decisionId: string): DecisionEffect => decisionEffects[decisionId] || {}

// ============================================
// PRÄMISSEN: Optionen, die eine Tatsache über die Welt voraussetzen
// ============================================
// Vorher konnte der Spieler "Datenaustausch bestätigt: FEHLALARM" auch dann wählen,
// wenn der Angriff echt war - er durfte sich das Ergebnis aussuchen.
// Jetzt erscheinen solche Optionen nur, wenn die Welt sie hergibt.
const moscowCooperates = (t: ScenarioTruth) => t.kind !== 'counterforce'

export const decisionPremises: Record<string, (t: ScenarioTruth) => boolean> = {
  'after-data-confirms-false': t => !t.attackReal && t.kind !== 'ambiguous-test',
  'after-data-still-unclear': t => t.attackReal || t.kind === 'ambiguous-test',
  'after-comm-mutual-stand-down': moscowCooperates,
  'after-comm-mutual-recall': moscowCooperates,
  'after-comm-no-response': t => !moscowCooperates(t),
  'after-comm-accept-data-exchange': moscowCooperates,
  'after-comm-trust-shoigu': moscowCooperates,
  'after-satellite-trust-visual': t => t.kind === 'counterforce',
  'after-satellite-suspicion': t => t.attackReal,
  'after-satellite-no-launches': t => (!t.attackReal && t.kind !== 'ambiguous-test') || t.kind === 'decapitation',
  'after-allies-trust-uk': t => !t.attackReal,
  'after-recon-trust-sigint': t => moscowCooperates(t) && t.kind !== 'ambiguous-test',
}

export const isDecisionPossible = (decisionId: string, truth: ScenarioTruth): boolean => {
  const premise = decisionPremises[decisionId]
  return premise ? premise(truth) : true
}
