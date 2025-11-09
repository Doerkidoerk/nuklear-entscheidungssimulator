import { FollowUpEvent, ScenarioType } from '../types'

// ============================================
// FOLGE-EVENTS nach "verify-intelligence"
// ============================================
const verifyIntelligenceFalseAlarmEvents: FollowUpEvent[] = [
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

const verifyIntelligenceRealAttackEvents: FollowUpEvent[] = [
  {
    id: 'verify-evt-real-1',
    timestamp: 0,
    triggerDelay: 10,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Sekundärsysteme bestätigen Starts',
    content:
      'NRO bestätigt: Mehrere DSP-Satelliten registrieren gleichzeitige Hitze-Signaturen aus bekannten russischen Silos. Kein Hinweis auf Sensorfehler.',
    updatesThreatLevel: 'critical',
  },
  {
    id: 'verify-evt-real-2',
    timestamp: 0,
    triggerDelay: 25,
    relativeToDecision: true,
    type: 'radar-detection',
    priority: 'critical',
    source: 'NORAD',
    title: 'Bodenradare erfassen Wiedereintrittskörper',
    content:
      'BMEWS-Clear und Thule melden >40 bestätigte Objekte in Flugbahnen Richtung CONUS. Re-entry Vehicles in Midcourse Phase. Impact-Fenster: 10-12 Minuten.',
  },
  {
    id: 'verify-evt-real-3',
    timestamp: 0,
    triggerDelay: 40,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Angriff bestätigt',
    content:
      'Alle redundanten Sensoren korrelieren. Keine Cyber-Anomalien gefunden. STRATCOM empfiehlt sofortige Gegenmaßnahmen. Dies ist ein echter Erstschlag.',
    updatesThreatLevel: 'critical',
  },
]

const verifyIntelligenceCyberAttackEvents: FollowUpEvent[] = [
  {
    id: 'verify-evt-cyber-1',
    timestamp: 0,
    triggerDelay: 12,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'USCYBERCOM',
    title: 'Forensik entdeckt manipulierte Telemetrie',
    content:
      'Live-Analyse der Datenleitungen deckt Inserts in den SBIRS-Streams auf. Schadcode überschreibt Rohdaten bevor sie NORAD erreichen. Live-Spektralanalyse zeigt Diskrepanzen zwischen Rohsignal und angezeigten Tracks.',
    updatesThreatLevel: 'high',
  },
  {
    id: 'verify-evt-cyber-2',
    timestamp: 0,
    triggerDelay: 28,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Gegenseitige Kompromittierung bestätigt',
    content:
      'SIGINT bestätigt identische Malware-Signaturen in russischen und chinesischen Frühwarnnetzen. Beide Staaten melden über sichere Kanäle Phantom-Starts der USA. Angreifer versucht offensichtlich, alle Seiten in Alarm zu halten.',
  },
  {
    id: 'verify-evt-cyber-3',
    timestamp: 0,
    triggerDelay: 45,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'USCYBERCOM',
    title: 'Echte Bedrohung: Cyber-Angriff, keine Raketen',
    content:
      'Schadcode isoliert und blockiert. Keine physischen Launch-Signaturen nachweisbar. Empfehlung: Offensive Cyber-Gegenmaßnahmen vorbereiten, nukleare Response NICHT autorisieren. Fokus auf Attribution.',
    updatesThreatLevel: 'elevated',
  },
]

const verifyIntelligenceAmbiguousEvents: FollowUpEvent[] = [
  {
    id: 'verify-evt-amb-1',
    timestamp: 0,
    triggerDelay: 12,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Analyse ergibt widersprüchliche Signale',
    content:
      'Analystenteams prüfen alle Sensorlinien. Hälfte der Datensätze zeigt Angriff, andere Hälfte nichts. Kein klarer technischer Fehler gefunden. Empfehlung: weitere Beobachtung und parallele Kommunikation mit Verbündeten.',
  },
  {
    id: 'verify-evt-amb-2',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'NORAD',
    title: 'Radare liefern uneinheitliche Resultate',
    content:
      'BMEWS Thule meldet schwache Kontakte, Cobra Dane negativ, Fylingdales unsicher. Software-Diagnostik ohne Befund. Techniker können weder Angriff bestätigen noch ausschließen.',
  },
  {
    id: 'verify-evt-amb-3',
    timestamp: 0,
    triggerDelay: 48,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau bleibt nebulös',
    content:
      'Hotline: Russischer Außenminister spricht von „interner Überprüfung“ und bittet um Geduld. Kein Dementi, keine Bestätigung. Lage bleibt unklar – Entscheidung weiterhin unter Unsicherheit.',
  },
]

// ============================================
// FOLGE-EVENTS nach "emergency-communication"
// ============================================
const emergencyCommunicationAmbiguousEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-amb-1',
    timestamp: 0,
    triggerDelay: 5,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Hot Line aufgebaut – zögerliche Antwort',
    content:
      'MOLINK wird verbunden, aber russischer Diensthabender bittet um Aufschub: "Wir prüfen gerade selbst. Bitte warten Sie." Keine klare Aussage, Gesprächspartner klingt nervös aber nicht alarmiert.',
  },
  {
    id: 'comm-evt-amb-2',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau bleibt vage',
    content:
      'Außenminister erklärt, interne Sensoren seien „inkonsistent“ und bittet um Übermittlung unserer Daten. Keine Beschuldigungen, aber auch kein klares Dementi. Tonlage: vorsichtige Distanz.',
  },
  {
    id: 'comm-evt-amb-3',
    timestamp: 0,
    triggerDelay: 38,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Gemeinsame Lage weiter ungeklärt',
    content:
      'CIA berichtet: Russische Kontakte liefern keine belastbaren Daten. Verbündete NATO-Staaten sehen ebenfalls divergente Sensorwerte. Diplomatie schafft Zeit, aber keine Klarheit. Entscheidung bleibt beim Präsidenten.',
  },
]

const emergencyCommunicationRealAttackEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-real-1',
    timestamp: 0,
    triggerDelay: 6,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Hot Line stößt auf blockierte Leitungen',
    content:
      'MOLINK versucht Aufbau, aber russische Seite routet auf automatisierte Kriegskanal-Sequenz um. Nur harte militärische Codes – kein menschlicher Ansprechpartner. Dies entspricht Protokoll während aktiver Startphase.',
  },
  {
    id: 'comm-evt-real-2',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'CIA',
    title: 'Abgehörtes Kreml-Briefing',
    content:
      'SIGINT fängt Konferenzcall zwischen Generalstab und Präsident ein: „Phase Zwei freigeben, Ziele bestätigen.“ Stimme Putins eindeutig identifiziert. Kein Hinweis auf Missverständnis.',
  },
  {
    id: 'comm-evt-real-3',
    timestamp: 0,
    triggerDelay: 36,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Gegenseite bestätigt Kriegslage',
    content:
      'STRATCOM wertet neue russische EAMs aus: Befehle an strategische Bomber zum Start, Luftabwehr auf Maximalstatus. Russland verhält sich exakt so wie bei echtem Erstschlag. Diplomatie liefert keine Deeskalation.',
    updatesThreatLevel: 'critical',
  },
]

const emergencyCommunicationFalseAlarmEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-false-1',
    timestamp: 0,
    triggerDelay: 6,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau bestreitet Starts',
    content:
      'Verbindung steht. Verteidigungsminister Shoigu halb wach, fordert gemeinsame Überprüfung. Er schwört, dass russische Sensoren nichts zeigen und bittet um unsere Rohdaten.',
  },
  {
    id: 'comm-evt-false-2',
    timestamp: 0,
    triggerDelay: 18,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Gemeinsame Verifikationszelle gebildet',
    content:
      'USA/Russland richten ad-hoc Taskforce ein. Austausch von Telemetrie in Echtzeit beginnt. Erste russische Radardaten zeigen keine Objekte. Unsere Teams sehen dieselben Anomalien wie sie.',
  },
  {
    id: 'comm-evt-false-3',
    timestamp: 0,
    triggerDelay: 36,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'CIA',
    title: 'Russland bestätigt Fehlalarm',
    content:
      'MOLINK: „Wir sehen eine Reflexion in Ihrem DSP-Netz. Kein Angriff.“ Sie übermitteln ihre Analyse, die unsere Diagnostik bestätigt. Vorschlag: Gemeinsame Presseerklärung sobald Entwarnung offiziell.',
    updatesThreatLevel: 'elevated',
  },
]

const emergencyCommunicationCyberAttackEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-cyber-1',
    timestamp: 0,
    triggerDelay: 6,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Beide Seiten sehen Phantom-Angriff',
    content:
      'Russische Außenministerin meldet identische Warnungen über US-Starts. Sie berichtet, dass ihr Cyberabwehrteam fremde Signaturen in den Daten findet. Drängt auf sofortige Kooperation gegen Dritteinwirkung.',
  },
  {
    id: 'comm-evt-cyber-2',
    timestamp: 0,
    triggerDelay: 22,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'NSA',
    title: 'Gemeinsamer technischer Austausch',
    content:
      'USA, Russland und China tauschen Hash-Werte der Malware aus. Alle drei sehen dieselben Angriffstools. Verdacht richtet sich auf hochentwickelte Proxy-Operation – Täter weiterhin unbekannt.',
  },
  {
    id: 'comm-evt-cyber-3',
    timestamp: 0,
    triggerDelay: 40,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'USCYBERCOM',
    title: 'Multinationale Response aktiviert',
    content:
      'Trinationales Krisenzentrum nimmt Arbeit auf, Fokus auf Eindämmung der Cyber-Bedrohung. Alle Parteien stoppen nukleare Alarmierungsprotokolle, behalten aber DEFCON 1 als Vorsichtsmaßnahme.',
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
const baseFollowUpEventsByDecision: Record<string, FollowUpEvent[]> = {
  'verify-intelligence': verifyIntelligenceAmbiguousEvents,
  'emergency-communication': emergencyCommunicationAmbiguousEvents,
  'alert-defcon1': defcon1FollowUpEvents,
  'wait-for-impact': waitForImpactFollowUpEvents,
  'immediate-full-retaliation': fullRetaliationFollowUpEvents,
}

const scenarioSpecificFollowUpEvents: Partial<
  Record<ScenarioType, Partial<Record<string, FollowUpEvent[]>>>
> = {
  'real-attack': {
    'verify-intelligence': verifyIntelligenceRealAttackEvents,
    'emergency-communication': emergencyCommunicationRealAttackEvents,
  },
  'false-alarm': {
    'verify-intelligence': verifyIntelligenceFalseAlarmEvents,
    'emergency-communication': emergencyCommunicationFalseAlarmEvents,
  },
  'cyber-attack': {
    'verify-intelligence': verifyIntelligenceCyberAttackEvents,
    'emergency-communication': emergencyCommunicationCyberAttackEvents,
  },
  'ambiguous': {
    'verify-intelligence': verifyIntelligenceAmbiguousEvents,
    'emergency-communication': emergencyCommunicationAmbiguousEvents,
  },
}

export const followUpEventsByDecision = baseFollowUpEventsByDecision

export const getFollowUpEventsForDecision = (
  scenarioId: ScenarioType,
  decisionId: string
): FollowUpEvent[] => {
  const scenarioEvents = scenarioSpecificFollowUpEvents[scenarioId]?.[decisionId]
  if (scenarioEvents) {
    return scenarioEvents
  }

  return baseFollowUpEventsByDecision[decisionId] || []
}
