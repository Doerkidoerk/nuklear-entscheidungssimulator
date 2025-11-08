import { Scenario, SimulationEvent, ICBMTrajectory } from '../types'
import { decisions } from './decisions'
import { createAdvisors } from './advisors'

// Realistische Ziele für ICBMs
const icbmTargets = {
  // US-Ziele
  washington: { lat: 38.9072, lng: -77.0369, name: 'Washington D.C.' },
  newYork: { lat: 40.7128, lng: -74.0060, name: 'New York City' },
  losAngeles: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
  chicago: { lat: 41.8781, lng: -87.6298, name: 'Chicago' },
  minuteman: { lat: 47.5055, lng: -111.1822, name: 'Malmstrom AFB' },
  stratcom: { lat: 41.1205, lng: -95.9149, name: 'Offutt AFB (STRATCOM)' },
  norad: { lat: 38.7453, lng: -104.8457, name: 'NORAD (Cheyenne Mountain)' },

  // Russische Startpunkte
  plesetsk: { lat: 62.9275, lng: 40.5772, name: 'Plesetsk Cosmodrome' },
  dombarovsky: { lat: 50.8047, lng: 59.6200, name: 'Dombarovsky Air Base' },
  barents: { lat: 71.0, lng: 35.0, name: 'Barentssee (SLBM)' }
}

// Echter Angriff Szenario
const realAttackEvents: SimulationEvent[] = [
  {
    id: 'evt-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'KRITISCHE WARNUNG: Raketenstarts erkannt',
    content: 'DSP-Satelliten haben multiple Infrarot-Signaturen über russischem Territorium erfasst. Vorläufige Analyse: 40+ ICBM-Starts. Dies ist KEIN Drill.',
    updatesThreatLevel: 'critical'
  },
  {
    id: 'evt-2',
    timestamp: 15,
    type: 'radar-detection',
    priority: 'critical',
    source: 'Early Warning System',
    title: 'Radar-Bestätigung',
    content: 'Langstrecken-Radar in Thule (Grönland) und Clear (Alaska) bestätigen mehrere Objekte auf ballistischer Flugbahn. Geschätzte Flugzeit: 25-30 Minuten.',
  },
  {
    id: 'evt-3',
    timestamp: 30,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'SIGINT-Analyse',
    content: 'Erhöhte militärische Kommunikation in russischen Befehlsstrukturen in den letzten 90 Minuten festgestellt. Codewörter deuten auf "Großoperation" hin.',
  },
  {
    id: 'evt-4',
    timestamp: 60,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Trajektorien-Update',
    content: 'SPACETRACK hat 47 ballistische Objekte identifiziert. Geschätzte Ziele: Washington D.C., New York, Los Angeles, Chicago, Malmstrom AFB, Offutt AFB, NORAD. Zusätzliche Starts aus U-Booten im Nordatlantik möglich.',
    updatesThreatLevel: 'critical'
  },
  {
    id: 'evt-5',
    timestamp: 90,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Hot Line Moskau',
    content: 'Keine Antwort über die Hot Line. Russische Botschaft in Washington wurde evakuiert (bestätigt durch CIA Assets vor Ort).',
  },
  {
    id: 'evt-6',
    timestamp: 120,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Vorwarnung verpasst?',
    content: 'Rückblickende Analyse: Ungewöhnliche Bewegungen russischer strategischer Streitkräfte in den letzten 48h. Diese Muster wurden nicht als unmittelbare Bedrohung eingestuft. Möglicherweise haben wir die Vorbereitungen übersehen.',
  },
  {
    id: 'evt-7',
    timestamp: 180,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Zweitschlagfähigkeit gefährdet',
    content: 'Wenn feindliche Raketen ihre Ziele erreichen, werden geschätzte 60% unserer landgestützten ICBMs zerstört. Empfehle dringend Launch on Warning.',
  },
  {
    id: 'evt-8',
    timestamp: 240,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Weitere Starts detektiert',
    content: 'Zusätzliche SLBM-Starts von U-Booten in der Barentssee identifiziert. Gesamtzahl feindlicher Raketen: 68. Dies entspricht einem vollständigen Erstschlag.',
  },
  {
    id: 'evt-9',
    timestamp: 300,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Keine diplomatische Lösung',
    content: 'Alle Versuche, russische Führung zu erreichen, gescheitert. Regierungs-Bunker in Ural-Region zeigen erhöhte Aktivität. Sie haben sich auf Vergeltung vorbereitet.',
  },
  {
    id: 'evt-10',
    timestamp: 360,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '4 Minuten bis Impact',
    content: 'Erste Raketen werden in 240 Sekunden amerikanisches Territorium erreichen. Prioritätsziele: NORAD, Offutt AFB.',
  },
  {
    id: 'evt-11',
    timestamp: 420,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '3 Minuten bis Impact',
    content: 'Raketen in Terminal-Phase. Evakuierung der wichtigsten Ziele ist nicht mehr möglich. Mr. President, wir brauchen Ihre Entscheidung JETZT.',
  },
  {
    id: 'evt-12',
    timestamp: 480,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '2 Minuten bis Impact',
    content: 'Letzte Gelegenheit für Launch on Warning. Nach Impact könnten Kommunikationssysteme zerstört sein.',
  },
  {
    id: 'evt-13',
    timestamp: 540,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '1 Minute bis Impact',
    content: 'Impact unmittelbar bevorstehend. Gott stehe uns bei.',
  }
]

export const realAttackTrajectories: ICBMTrajectory[] = [
  { id: 't1', origin: icbmTargets.plesetsk, target: icbmTargets.washington, launchTime: 0, impactTime: 1620, status: 'mid-flight', type: 'ICBM', warheadYield: '800 kt' },
  { id: 't2', origin: icbmTargets.plesetsk, target: icbmTargets.newYork, launchTime: 0, impactTime: 1680, status: 'mid-flight', type: 'ICBM', warheadYield: '800 kt' },
  { id: 't3', origin: icbmTargets.dombarovsky, target: icbmTargets.losAngeles, launchTime: 0, impactTime: 1800, status: 'mid-flight', type: 'ICBM', warheadYield: '550 kt' },
  { id: 't4', origin: icbmTargets.dombarovsky, target: icbmTargets.chicago, launchTime: 0, impactTime: 1740, status: 'mid-flight', type: 'ICBM', warheadYield: '550 kt' },
  { id: 't5', origin: icbmTargets.plesetsk, target: icbmTargets.minuteman, launchTime: 0, impactTime: 1620, status: 'mid-flight', type: 'ICBM', warheadYield: '800 kt' },
  { id: 't6', origin: icbmTargets.barents, target: icbmTargets.stratcom, launchTime: 240, impactTime: 1440, status: 'mid-flight', type: 'SLBM', warheadYield: '100 kt' },
  { id: 't7', origin: icbmTargets.barents, target: icbmTargets.norad, launchTime: 240, impactTime: 1500, status: 'mid-flight', type: 'SLBM', warheadYield: '100 kt' },
]

// False Alarm Szenario
const falseAlarmEvents: SimulationEvent[] = [
  {
    id: 'fa-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'WARNUNG: Mögliche Raketenstarts',
    content: 'DSP-Satellit 23 meldet Infrarot-Signaturen über Sibirien. Anzahl unklar. Verifizierung läuft.',
    updatesThreatLevel: 'high'
  },
  {
    id: 'fa-2',
    timestamp: 30,
    type: 'system-alert',
    priority: 'high',
    source: 'Early Warning System',
    title: 'Radarbestätigung ausstehend',
    content: 'Langstreckenradar hat Schwierigkeiten, die gemeldeten Objekte zu erfassen. Atmosphärische Störungen möglich.',
  },
  {
    id: 'fa-3',
    timestamp: 60,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Keine ungewöhnlichen Aktivitäten',
    content: 'Unsere Assets in Russland melden keine erhöhte militärische Alarmbereitschaft. Business as usual in Moskau.',
  },
  {
    id: 'fa-4',
    timestamp: 90,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau verwirrt',
    content: 'Russischer Außenminister auf Hot Line: "Wir haben keine Raketen gestartet. Was geht da vor sich?" Klingt authentisch überrascht.',
  },
  {
    id: 'fa-5',
    timestamp: 120,
    type: 'satellite-data',
    priority: 'medium',
    source: 'Satellite Network',
    title: 'Datenfehler möglich',
    content: 'Techniker melden: DSP-Satellit 23 hatte in den letzten 72h mehrere kleinere Fehlfunktionen. Sensor-Kalibrierung könnte fehlerhaft sein.',
  },
  {
    id: 'fa-6',
    timestamp: 180,
    type: 'radar-detection',
    priority: 'medium',
    source: 'Early Warning System',
    title: 'Keine Radar-Bestätigung',
    content: 'Keines unserer Radarsysteme kann die gemeldeten Objekte erfassen. Entweder sind sie nicht da, oder unsere Radare versagen komplett - was höchst unwahrscheinlich ist.',
  },
  {
    id: 'fa-7',
    timestamp: 240,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'Keine feindlichen Kommunikationen',
    content: 'SIGINT zeigt keine erhöhte militärische Kommunikation in Russland. Bei einem echten Start würden wir massive Funkaktivität sehen.',
  },
  {
    id: 'fa-8',
    timestamp: 300,
    type: 'system-alert',
    priority: 'high',
    source: 'NORAD',
    title: 'System-Diagnose',
    content: 'Technische Teams führen Notfall-Diagnose durch. Vorläufige Ergebnisse: Softwarefehler in Satelliten-Telemetrie wahrscheinlich.',
  },
  {
    id: 'fa-9',
    timestamp: 350,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'FEHLALARM BESTÄTIGT',
    content: 'Softwarefehler in DSP-Satellit 23 identifiziert und bestätigt. Sonnenlicht-Reflektion auf Wolkenformationen wurde als Raketenstarts fehlinterpretiert. DIES IST EIN FEHLALARM.',
    updatesThreatLevel: 'low'
  },
  {
    id: 'fa-10',
    timestamp: 380,
    type: 'system-alert',
    priority: 'medium',
    source: 'NORAD',
    title: 'Entwarnung',
    content: 'Bestätigung: Kein tatsächlicher Angriff. Satellit wird vom Netz genommen. Untersuchung eingeleitet.',
  }
]

// Cyber-Angriff Szenario
const cyberAttackEvents: SimulationEvent[] = [
  {
    id: 'ca-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'WARNUNG: Multiple Raketenstarts',
    content: 'Frühwarnsysteme melden koordinierte ICBM-Starts von mehreren Standorten. Daten werden verifiziert.',
    updatesThreatLevel: 'critical'
  },
  {
    id: 'ca-2',
    timestamp: 20,
    type: 'system-alert',
    priority: 'high',
    source: 'Pentagon',
    title: 'Cyber-Intrusion detektiert',
    content: 'CYBERCOM meldet unautorisierte Zugriffe auf Verteidigungs-Netzwerke in den letzten 6 Stunden. Möglicher Zusammenhang mit aktueller Warnung wird untersucht.',
  },
  {
    id: 'ca-3',
    timestamp: 45,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Fortgeschrittener Persistent Threat',
    content: 'Advanced Persistent Threat (APT) in unserem Satelliten-Netzwerk entdeckt. Schadsoftware war mindestens 14 Tage aktiv.',
  },
  {
    id: 'ca-4',
    timestamp: 80,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Russland warnt vor False Flag',
    content: 'Moskau über Hot Line: "Wir haben NICHT gestartet. Unsere Systeme wurden ebenfalls angegriffen. Jemand will uns gegeneinander ausspielen."',
  },
  {
    id: 'ca-5',
    timestamp: 120,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'CIA',
    title: 'Drittpartei-Angriff',
    content: 'Intelligence deutet auf koordinierten Cyber-Angriff auf BEIDE Supermächte hin. Ziel: Nuklearkrieg provozieren.',
  },
  {
    id: 'ca-6',
    timestamp: 160,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'China bestätigt Angriff',
    content: 'Peking meldet über diplomatische Kanäle: Auch ihre Early-Warning-Systeme wurden kompromittiert. Sie melden "falsche" US-Raketenstarts.',
  },
  {
    id: 'ca-7',
    timestamp: 200,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Angriffssignatur identifiziert',
    content: 'Malware-Analyse zeigt Ähnlichkeit zu Lazarus Group (Nordkorea) und APT28 (russischer Ursprung). Aber Code ist zu perfekt - möglicherweise False Flag.',
  },
  {
    id: 'ca-8',
    timestamp: 260,
    type: 'system-alert',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Telemetrie-Manipulation',
    content: 'CYBERCOM bestätigt: Falsche Telemetrie-Daten wurden in unsere Satelliten-Feeds injiziert. Die "Starts" existieren nur in unseren kompromittierten Systemen.',
  },
  {
    id: 'ca-9',
    timestamp: 320,
    type: 'radar-detection',
    priority: 'high',
    source: 'Early Warning System',
    title: 'Radar zeigt nichts',
    content: 'Unabhängige Radarsysteme (nicht vernetzt) können KEINE Raketen bestätigen. Nur kompromittierte Satelliten-Systeme zeigen Starts.',
  },
  {
    id: 'ca-10',
    timestamp: 380,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'CYBER-ANGRIFF BESTÄTIGT',
    content: 'Schadsoftware isoliert. Keine echten Raketenstarts. Dies war ein koordinierter Cyber-Angriff auf nukleare Kommando-und-Kontroll-Systeme der USA, Russlands und Chinas.',
    updatesThreatLevel: 'low'
  }
]

// Mehrdeutiges Szenario
const ambiguousEvents: SimulationEvent[] = [
  {
    id: 'am-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'high',
    source: 'NORAD',
    title: 'Unklare Warnung',
    content: 'Widersprüchliche Berichte von verschiedenen Sensoren. Einige melden Starts, andere nicht. Analysieren...',
    updatesThreatLevel: 'elevated'
  },
  {
    id: 'am-2',
    timestamp: 40,
    type: 'radar-detection',
    priority: 'medium',
    source: 'Early Warning System',
    title: 'Teilweise Bestätigung',
    content: 'Radar-Station Alaska: Ja, wir sehen etwas. Radar-Station Thule: Negativ, keine Kontakte. Sehr ungewöhnlich.',
  },
  {
    id: 'am-3',
    timestamp: 90,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Gemischte Signale',
    content: 'Einige russische Militäreinheiten auf erhöhter Alarmbereitschaft. Andere nicht. Zivile Regierung scheint nicht involviert.',
  },
  {
    id: 'am-4',
    timestamp: 130,
    type: 'diplomatic-message',
    priority: 'medium',
    source: 'State Department',
    title: 'Moskau antwortet ausweichend',
    content: 'Russischer Außenminister: "Wir können weder bestätigen noch dementieren. Überprüfen interne Situation." Sehr ungewöhnlich.',
  },
  {
    id: 'am-5',
    timestamp: 180,
    type: 'satellite-data',
    priority: 'medium',
    source: 'Satellite Network',
    title: 'Inkonsistente Daten',
    content: 'Satellit A: Klare Starts. Satellit B: Nichts. Satellit C: Mögliche Starts, unsicher. Techniker sind ratlos.',
  },
  {
    id: 'am-6',
    timestamp: 240,
    type: 'intelligence-report',
    priority: 'low',
    source: 'NSA',
    title: 'SIGINT uneindeutig',
    content: 'Erhöhte Kommunikation in einigen russischen Militärbereichen. Aber nicht das Muster, das wir bei einem echten Angriff erwarten würden.',
  },
  {
    id: 'am-7',
    timestamp: 300,
    type: 'system-alert',
    priority: 'medium',
    source: 'NORAD',
    title: 'Keine Klärung',
    content: 'Nach 5 Minuten Analyse: Wir können weder einen Angriff bestätigen noch ausschließen. Die Datenlage bleibt widersprüchlich.',
  },
  {
    id: 'am-8',
    timestamp: 360,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Mögliche Erklärung',
    content: 'Theorie: Teilweiser technischer Fehler ODER begrenzter Test ODER tatsächlicher Angriff mit Gegenmaßnahmen. Wir wissen es nicht.',
  },
  {
    id: 'am-9',
    timestamp: 450,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Moskau bleibt unklar',
    content: 'Russland weigert sich, klare Aussage zu treffen. "Interne Angelegenheit" ist alles, was wir bekommen.',
  },
  {
    id: 'am-10',
    timestamp: 540,
    type: 'system-alert',
    priority: 'high',
    source: 'NORAD',
    title: 'Entscheidung erforderlich',
    content: 'Mr. President, wir haben keine klare Antwort. Sie müssen trotz Unsicherheit entscheiden.',
  }
]

export const scenarios: Scenario[] = [
  {
    id: 'real-attack',
    title: 'Szenario 1: Echter Angriff',
    description: 'Massiver russischer ICBM-Erstschlag auf amerikanische Städte und militärische Einrichtungen.',
    initialThreatLevel: 'critical',
    duration: 600,
    events: realAttackEvents,
    advisors: createAdvisors('real-attack'),
    decisions: decisions,
    correctDecision: 'wait-for-impact',
    historicalContext: 'Dieses Szenario entspricht der größten Angst des Kalten Krieges: Ein bolt-from-the-blue Erstschlag ohne Vorwarnung. Trotz der Eindeutigkeit der Daten zeigt die Geschichte (Stanislaw Petrow 1983), dass auch scheinbar klare Angriffe Fehlalarme sein können.'
  },
  {
    id: 'false-alarm',
    title: 'Szenario 2: Fehlalarm',
    description: 'Technischer Fehler im Satelliten-Frühwarnsystem suggeriert Raketenangriff.',
    initialThreatLevel: 'high',
    duration: 600,
    events: falseAlarmEvents,
    advisors: createAdvisors('false-alarm'),
    decisions: decisions,
    correctDecision: 'verify-intelligence',
    historicalContext: 'Basiert auf realen Vorfällen: 1979 NORAD-Computerfehler, 1983 sowjetisches Satellitenwarnsystem (Stanislaw Petrow). In beiden Fällen verhinderte menschliches Urteilsvermögen trotz scheinbar eindeutiger technischer Daten einen Nuklearkrieg.'
  },
  {
    id: 'cyber-attack',
    title: 'Szenario 3: Cyber-Angriff',
    description: 'Fortgeschrittener Cyber-Angriff manipuliert Frühwarnsysteme um nuklearen Konflikt zu provozieren.',
    initialThreatLevel: 'critical',
    duration: 600,
    events: cyberAttackEvents,
    advisors: createAdvisors('cyber-attack'),
    decisions: decisions,
    correctDecision: 'verify-intelligence',
    historicalContext: 'Hypothetisches, aber zunehmend realistisches Szenario. Cyber-Sicherheitsexperten warnen seit Jahren vor der Möglichkeit, dass Hacker nukleare Kommando-und-Kontroll-Systeme kompromittieren könnten. Die "False Flag" Provokation ist eine bekannte Taktik.'
  },
  {
    id: 'ambiguous',
    title: 'Szenario 4: Mehrdeutige Situation',
    description: 'Widersprüchliche Intelligence und unklare Datenlage. Keine eindeutige Antwort möglich.',
    initialThreatLevel: 'elevated',
    duration: 600,
    events: ambiguousEvents,
    advisors: createAdvisors('ambiguous'),
    decisions: decisions,
    correctDecision: 'wait-for-impact',
    historicalContext: 'Realistische Darstellung der "fog of war". In echten Krisensituationen sind Informationen selten perfekt. Dieses Szenario testet Entscheidungsfindung unter maximaler Unsicherheit - die vielleicht schwierigste Situation für einen Präsidenten.'
  }
]

export const getScenario = (id: string): Scenario | undefined => {
  return scenarios.find(s => s.id === id)
}
