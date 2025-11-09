import { FollowUpEvent } from '../types'

// ============================================
// FOLGE-EVENTS nach "verify-intelligence"
// ============================================
export const verifyIntelligenceFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'verify-evt-1',
    timestamp: 0, // wird zur Entscheidungszeit gesetzt
    triggerDelay: 10,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'Verifikation läuft - Erste Ergebnisse',
    content: 'Redundante Systeme werden abgefragt. CIA, NSA, NRO arbeiten parallel. Erste Daten in 30 Sekunden erwartet.',
  },
  {
    id: 'verify-evt-2',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Sensor-Analyse abgeschlossen',
    content: 'KRITISCHE ERKENNTNISSE: Primärsatellit DSP-23 zeigt Anomalien. Sekundärsatelliten zeigen KEINE Starts. Radar-Netzwerk zeigt KEINE Objekte. Hohe Wahrscheinlichkeit: FEHLALARM.',
    updatesThreatLevel: 'elevated',
  },
  {
    id: 'verify-evt-3',
    timestamp: 0,
    triggerDelay: 45,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau reagiert verwirrt',
    content: 'MOLINK-Kommunikation: Russischer Verteidigungsminister kategorisch: "Wir haben NICHTS gestartet. Prüfen Sie Ihre Systeme!" Voice Stress Analysis zeigt: Hohe Wahrscheinlichkeit, dass er die Wahrheit sagt.',
  },
]

// ============================================
// FOLGE-EVENTS nach "emergency-communication"
// ============================================
export const emergencyCommunicationFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-1',
    timestamp: 0,
    triggerDelay: 5,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Hot Line aktiviert',
    content: 'MOLINK Direct Voice Link zu Moskau wird hergestellt. Verbindung in Aufbau...',
  },
  {
    id: 'comm-evt-2',
    timestamp: 0,
    triggerDelay: 15,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Moskau antwortet',
    content: 'Russischer Verteidigungsminister am Apparat. Stimme zeigt Stress. "Was geht da vor? Unsere Systeme zeigen amerikanische Raketenstarts! Haben SIE angegriffen?" - KRITISCH: Auch Russland sieht "Angriff"!',
  },
  {
    id: 'comm-evt-3',
    timestamp: 0,
    triggerDelay: 35,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'CIA',
    title: 'Möglicher Drittpartei-Angriff',
    content: 'CIA Counterintelligence: BEIDE Seiten sehen "Angriffe". Hohe Wahrscheinlichkeit: Cyber-Manipulation oder technischer Fehler auf beiden Seiten. Jemand oder etwas will uns gegeneinander ausspielen!',
    updatesThreatLevel: 'high',
  },
]

// ============================================
// FOLGE-EVENTS nach "alert-defcon1"
// ============================================
export const defcon1FollowUpEvents: FollowUpEvent[] = [
  {
    id: 'defcon1-evt-1',
    timestamp: 0,
    triggerDelay: 5,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'DEFCON 1 AKTIVIERT',
    content: 'Alle Streitkräfte auf höchster Alarmbereitschaft. 400 Minuteman III ICBMs HOT. 14 Ohio-Class SSBNs bereit. Strategische Bomber airborne. Warten auf Ihre Autorisierung zum Abschuss.',
  },
  {
    id: 'defcon1-evt-2',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'White House',
    title: 'Nationale Notlage - Zivilbevölkerung',
    content: 'Emergency Alert System (EAS) aktiviert. Bevölkerung erhält Warnungen. Massenpanik in allen Großstädten. Straßen verstopft. Krankenhäuser überfüllt. Soziale Ordnung gefährdet.',
  },
  {
    id: 'defcon1-evt-3',
    timestamp: 0,
    triggerDelay: 40,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'Russland auf DEFCON 1-Äquivalent',
    content: 'SIGINT bestätigt: Russland hat ihre höchste Alarmstufe aktiviert. Ihre Raketen sind ebenfalls scharf. Beide Seiten am Abgrund. Ein Fehler jetzt = Weltuntergang.',
  },
]

// ============================================
// FOLGE-EVENTS nach "wait-for-impact"
// ============================================
export const waitForImpactFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'wait-evt-1',
    timestamp: 0,
    triggerDelay: 10,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Auf Impact wartend - 2 Minuten',
    content: 'RVs in Terminal-Phase. Impact in ca. 2 Minuten. Falls dies ein echter Angriff ist, haben Sie noch Zeit für Launch on Warning. Falls Fehlalarm: Sie haben die Welt gerettet.',
  },
  {
    id: 'wait-evt-2',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '1 Minute bis erwarteter Impact',
    content: 'T-minus 60 Sekunden. Wenn nichts passiert, war es ein Fehlalarm. Wenn doch... möge Gott uns allen gnädig sein.',
  },
]

// ============================================
// FOLGE-EVENTS nach "immediate-full-retaliation"
// ============================================
export const fullRetaliationFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'retaliation-evt-1',
    timestamp: 0,
    triggerDelay: 3,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'GOLD CODES ÜBERMITTELT',
    content: 'Emergency Action Messages gesendet. Alle Systeme feuern. Minuteman III Silos öffnen sich. U-Boote starten SLBMs. B-2 Bomber lösen Cruise Missiles. Es gibt kein Zurück mehr.',
  },
  {
    id: 'retaliation-evt-2',
    timestamp: 0,
    triggerDelay: 15,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Russischer Gegenschlag detektiert',
    content: 'FLASH TRAFFIC: Russland feuert ALLES. Ihre Frühwarnung zeigt unsere Starts. Automatischer Gegenschlag läuft. Dead Hand System aktiviert. Totale gegenseitige Vernichtung in Gang.',
  },
  {
    id: 'retaliation-evt-3',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Das Ende',
    content: 'Tausende Nuklearsprengköpfe in der Luft. Beiderseits. In 20 Minuten enden Russland und Amerika. In 2 Jahren: Nuklearer Winter beendet die menschliche Zivilisation. Sie haben die Apokalypse autorisiert.',
    updatesThreatLevel: 'critical',
  },
]

// Alle Follow-Up Events kombiniert für einfachen Zugriff
export const followUpEventsByDecision: Record<string, FollowUpEvent[]> = {
  'verify-intelligence': verifyIntelligenceFollowUpEvents,
  'emergency-communication': emergencyCommunicationFollowUpEvents,
  'alert-defcon1': defcon1FollowUpEvents,
  'wait-for-impact': waitForImpactFollowUpEvents,
  'immediate-full-retaliation': fullRetaliationFollowUpEvents,
}
