import { Scenario, SimulationEvent, ICBMTrajectory } from '../types'
import { initialDecisions } from './decisions'
import { createAdvisors } from './advisors'

// Realistische Ziele für ICBMs
const icbmTargets = {
  // US-Ziele
  washington: { lat: 38.9072, lng: -77.0369, name: 'Washington D.C.' },
  newYork: { lat: 40.7128, lng: -74.0060, name: 'New York City' },
  losAngeles: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
  chicago: { lat: 41.8781, lng: -87.6298, name: 'Chicago' },
  minuteman: { lat: 47.5055, lng: -111.1822, name: 'Malmstrom AFB' },
  warren: { lat: 41.1575, lng: -104.8586, name: 'F.E. Warren AFB' },
  stratcom: { lat: 41.1205, lng: -95.9149, name: 'Offutt AFB (STRATCOM)' },
  norad: { lat: 38.7453, lng: -104.8457, name: 'NORAD (Cheyenne Mountain)' },
  kingsway: { lat: 42.3601, lng: -71.0589, name: 'Kings Bay (SSBN)' },

  // Russische Startpunkte
  plesetsk: { lat: 62.9275, lng: 40.5772, name: 'Plesetsk Cosmodrome' },
  dombarovsky: { lat: 50.8047, lng: 59.6200, name: 'Dombarovsky Air Base' },
  kozelsk: { lat: 54.0333, lng: 35.7833, name: 'Kozelsk (12th Missile Division)' },
  barents: { lat: 71.0, lng: 35.0, name: 'Barentssee (SLBM)' },
  pacific: { lat: 50.0, lng: -175.0, name: 'Nordpazifik (SLBM)' }
}

// ===========================================
// SZENARIO 1: COUNTERFORCE STRIKE (Verbesserter "Echter Angriff")
// ===========================================
// Differenzierter Angriff auf militärische Ziele, nicht primär Städte
// Mehr Ambiguität und tröpfchenweise Information
const counterforceStrikeEvents: SimulationEvent[] = [
  {
    id: 'cf-0',
    timestamp: -5,
    type: 'system-alert',
    priority: 'medium',
    source: 'White House',
    title: 'Situation Room - Routinebriefing',
    content: 'Mr. President, guten Morgen. 04:23 Uhr Eastern Time. Sie sind zum täglichen Intelligence Briefing im Situation Room. Der Football-Träger Major Reynolds steht hinter Ihnen. THREATCON Alpha - keine aktuellen Bedrohungen. Kaffee wird serviert.',
    updatesThreatLevel: 'low'
  },
  {
    id: 'cf-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'high',
    source: 'NORAD',
    title: 'ERSTE WARNUNG: Unbestätigte Infrarot-Signatur',
    content: 'DSP-23 (Defense Support Program Satellit, Position: über Sibirien) meldet 2... Korrektur: JETZT 4 mögliche Infrarot-Signaturen. Position: Nähe Plesetsk Cosmodrome. Confidence Level: MEDIUM. Zweiter Sensor wird ausgerichtet zur Bestätigung. Geschätzte Zeit bis Bestätigung: 45 Sekunden.',
  },
  {
    id: 'cf-2',
    timestamp: 25,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Mehrere Starts BESTÄTIGT',
    content: 'SBIRS-GEO-1 (Space-Based Infrared System) BESTÄTIGT Starts. Anzahl: Mindestens 8... Korrektur: 12 distinkte Wärme-Signaturen. Klassifizierung vorläufig: RS-28 Sarmat ICBMs oder Topol-M. Plume-Analyse läuft. KRITISCH: Weitere Starts detektiert aus Kozelsk Region. Gesamtzahl STEIGEND.',
    updatesThreatLevel: 'high'
  },
  {
    id: 'cf-3',
    timestamp: 50,
    type: 'radar-detection',
    priority: 'high',
    source: 'Early Warning System',
    title: 'Radarbestätigung läuft - Teilweise Kontakte',
    content: 'PAVE PAWS Thule (Grönland): Scanning intensiviert... KONTAKT! 6 Objekte detektiert, Azimut 042, Altitude steigend durch 180km. ABER: PAVE PAWS Clear (Alaska) meldet KEINE Kontakte in erwarteter Zone. Techniker prüfen ob Clear-Ausfall oder echte Divergenz. Cobra Dane Shemya wird neu ausgerichtet.',
  },
  {
    id: 'cf-4',
    timestamp: 75,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Schnell-Analyse: Keine Vorwarnung',
    content: 'CIA Watch Center: HUMINT-Assets in Russland melden KEINE außergewöhnlichen militärischen Bewegungen in den letzten 48 Stunden. Botschaft Moskau: Routine-Betrieb. ABER: Dies könnte perfekte Täuschung sein. Alternativ: Wir haben kritische Indikatoren verpasst. Analyst-Unsicherheit HOCH.',
  },
  {
    id: 'cf-5',
    timestamp: 110,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Trajektorien-Analyse: COUNTERFORCE Pattern',
    content: 'SPACETRACK Netzwerk: 18 ballistische Objekte BESTÄTIGT. Berechnete Trajektorien zeigen: [PRIMÄRZIELE] Malmstrom AFB (6 RVs), F.E. Warren AFB (5 RVs), Offutt AFB/STRATCOM (3 RVs), Cheyenne Mountain (2 RVs). [SEKUNDÄR] Kings Bay SSBN Base (2 RVs). ANALYSE: Dies ist ein COUNTERFORCE-Schlag - Ziel ist ENTWAFFNUNG, nicht Städte! Washington und New York NICHT im Zielset.',
    updatesThreatLevel: 'critical'
  },
  {
    id: 'cf-6',
    timestamp: 140,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Zweitschlagfähigkeit in KRITISCHER Gefahr',
    content: 'STRATCOM Offutt: Wenn die berechneten Impacts korrekt sind, verlieren wir in 22 Minuten: 65% der Minuteman III Silos (ca. 260 Raketen), STRATCOM Kommandozentrale, und NORAD. U-Boot-Flotte bleibt intakt (14 Ohio-Class SSBNs nicht bedroht). Aber: Verlust von C3I könnte Kommunikation zu SSBNs kappen. EMPFEHLUNG: Launch on Warning JETZT oder Risiko totaler Entwaffnung.',
  },
  {
    id: 'cf-7',
    timestamp: 175,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'MOLINK: Keine Antwort',
    content: 'Moscow Link (Heißer Draht) aktiviert vor 3 Minuten. KEINE Antwort auf Direct Voice. Backup Fax-System sendet... ebenfalls tot. KRITISCHE INFO: Britischer MI6 meldet russische Botschaft London begann Dokumente zu verbrennen vor 1 Stunde. Französischer DGSE: Gleiches Muster in Paris.',
  },
  {
    id: 'cf-8',
    timestamp: 210,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'SIGINT: Massive russische Kommunikations-Spikes',
    content: 'NSA SIGINT-Arrays: Massive Zunahme verschlüsselter Kommunikation über KAZBEK (russisches nukleares C3I). Codewort "GRANIT-AKTIVIERUNG" intercept vor 4 Minuten. GRU-Datenverkehr Faktor 18x über Normal. ABER: Kein ziviles Evakuierungsprotokoll detektiert. Keine russischen TV/Radio-Notfall-Broadcasts. Widerspruch zur totalen Kriegsführung.',
  },
  {
    id: 'cf-9',
    timestamp: 245,
    type: 'communication-attempt',
    priority: 'high',
    source: 'State Department',
    title: 'Rückkanal über Schweizer Botschaft',
    content: 'Schweizer Außenministerium (Schutzherrschaft für US-Interessen in Russland) erreicht stellvertretenden russischen Außenminister. SEINE AUSSAGE wörtlich: "Wir untersuchen Ihre Behauptungen. Unsere Systeme zeigen keine autorisierten Starts. Prüfen Sie Ihre Daten!" Voice Stress Analysis: Zeigt echte Verwirrung ODER perfektes Training.',
  },
  {
    id: 'cf-10',
    timestamp: 280,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Vice President fordert Entscheidung',
    content: 'Vice President (von PEOC Bunker): "Mr. President, ich habe die Joint Chiefs hier. Wir brauchen JETZT Ihre Entscheidung. Wenn das ein Counterforce-Schlag ist, haben die Russen kalkuliert, dass Sie zögern weil Städte verschont sind. Aber wenn unsere Silos weg sind, haben Sie keine glaubwürdige Vergeltung mehr außer totaler Eskalation mit U-Booten."',
  },
  {
    id: 'cf-11',
    timestamp: 315,
    type: 'radar-detection',
    priority: 'critical',
    source: 'Early Warning System',
    title: 'Midcourse-Phase: Objekte auf finalen Bahnen',
    content: 'Cobra Dane + PAVE PAWS Combined Tracking: 18 Re-Entry Vehicles (RVs) in Midcourse Phase. Separation von Booster erfolgt. Geschwindigkeit: Mach 22. KRITISCH: Basierend auf Ballistik sind dies präzisionsgelenkte RVs - Circular Error Probable (CEP) ca. 150 Meter. Hardened Silo-Killer. Impact in 14-16 Minuten.',
  },
  {
    id: 'cf-12',
    timestamp: 350,
    type: 'intelligence-report',
    priority: 'medium',
    source: 'CIA',
    title: 'Analyse: Mögliche Erklärungen',
    content: 'CIA Quick Analysis Team: (1) ECHTER COUNTERFORCE-STRIKE: Russland will uns entwaffnen, dann verhandeln. (2) BEGRENZTER SCHLAG: Reaktion auf unbekannten Vorfall (z.B. vermuteter US-Angriff auf russisches Asset). (3) ROGUE-COMMANDER: Unbefugter Generalstab-Befehl ohne Kreml-Wissen. (4) TECHNISCHER FEHLER kombiniert mit Zufällen. Confidence-Level für (1): 65%.',
  },
  {
    id: 'cf-13',
    timestamp: 390,
    type: 'military-status',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Strategische Bomber aufsteigen lassen?',
    content: 'Air Force Global Strike Command: Unsere B-2 und B-52 Flotte (auf Barksdale AFB, Whiteman AFB, Minot AFB) kann in 8 Minuten airborne sein mit nuklearen Marschflugkörpern. Wenn Sie Launch on Warning ablehnen, sollten wir ZUMINDEST die Bomber evakuieren? Sonst sind sie zerstörbar am Boden. Awaiting Authorization.',
  },
  {
    id: 'cf-14',
    timestamp: 430,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '10 Minuten bis Impact - Terminal Phase naht',
    content: 'RVs beginnen in 4 Minuten Wiedereintritt. Erste Impacts: Malmstrom AFB (T-minus 10:20), Warren AFB (T-minus 10:35), Offutt/STRATCOM (T-minus 11:10). GMD (Ground-based Midcourse Defense) aktiviert - 18 Interceptors gestartet, aber max. Erfolgsrate gegen hardened RVs: 35-40%. Wir werden Treffer hinnehmen müssen.',
  },
  {
    id: 'cf-15',
    timestamp: 470,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'UK und Frankreich bieten Vermittlung',
    content: 'Britischer PM (via sichere Leitung): "Unsere Satelliten zeigen auch Starts, aber unsere Radare sind ambiguous. Wir raten zu RESTRAINT. Frankreich bietet an, Moskau zu kontaktieren. Gebt uns 5 Minuten!" Französischer Président: "Wir haben noch Kommunikation zu Russland. Lasst uns vermitteln bevor ihr alle umbringt!"',
  },
  {
    id: 'cf-16',
    timestamp: 510,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Letzte Launch-on-Warning Gelegenheit',
    content: 'Sir, dies ist Ihre letzte realistische Chance für Launch on Warning. In 6 Minuten treffen die ersten RVs Malmstrom. Nach Impact könnten 65% unserer Silos aus dem Spiel sein. ELF-Kommunikation zu U-Booten könnte durchtrennt werden wenn Offutt fällt. Alle 400 Minuteman III sind HOT. Awaiting Gold Codes. ZEIT LÄUFT AB.',
  },
  {
    id: 'cf-17',
    timestamp: 550,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Ihre Familie wurde evakuiert',
    content: 'Secret Service meldet: First Lady und Ihre Kinder sind in Marine One, en route zu Site R (Raven Rock). Sie sind sicher. Sie können sie nicht kontaktieren - alle zivilen Leitungen gesperrt für militärischen Verkehr. Ihre letzte Nachricht an Sie: "Bitte komm lebend zurück. Die Welt braucht dich besonnenen Kopf." Sie sind jetzt allein mit dieser Entscheidung, Sir.',
  },
  {
    id: 'cf-18',
    timestamp: 585,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '30 Sekunden bis erste Detonation',
    content: 'T-minus 35 Sekunden bis Impact Malmstrom AFB. Wenn dies ein Fehlalarm ist... wissen wir es in 35 Sekunden. Wenn nicht... möge Gott uns allen gnädig sein. Mr. President - was sind Ihre Befehle?',
  },
]

export const counterforceTrajectories: ICBMTrajectory[] = [
  { id: 'cf-t1', origin: icbmTargets.plesetsk, target: icbmTargets.minuteman, launchTime: 0, impactTime: 620, status: 'mid-flight', type: 'ICBM', warheadYield: '800 kt' },
  { id: 'cf-t2', origin: icbmTargets.plesetsk, target: icbmTargets.warren, launchTime: 0, impactTime: 635, status: 'mid-flight', type: 'ICBM', warheadYield: '800 kt' },
  { id: 'cf-t3', origin: icbmTargets.kozelsk, target: icbmTargets.stratcom, launchTime: 0, impactTime: 670, status: 'mid-flight', type: 'ICBM', warheadYield: '550 kt' },
  { id: 'cf-t4', origin: icbmTargets.dombarovsky, target: icbmTargets.norad, launchTime: 0, impactTime: 650, status: 'mid-flight', type: 'ICBM', warheadYield: '550 kt' },
  { id: 'cf-t5', origin: icbmTargets.barents, target: icbmTargets.kingsway, launchTime: 110, impactTime: 890, status: 'mid-flight', type: 'SLBM', warheadYield: '100 kt' },
]

// ===========================================
// SZENARIO 2: DECAPITATION STRIKE
// ===========================================
// Kleiner, präziser Angriff auf Führung - extrem kurze Vorwarnzeit
const decapitationStrikeEvents: SimulationEvent[] = [
  {
    id: 'dec-0',
    timestamp: -5,
    type: 'system-alert',
    priority: 'low',
    source: 'White House',
    title: 'Air Force One - Rückkehr nach Washington',
    content: 'Mr. President, Sie sind an Bord von Air Force One, 45 Minuten vor Landung in Andrews AFB. Sie kehren von einem NATO-Gipfel in Brüssel zurück. Es ist 02:15 Uhr Eastern Time. Der Football ist wie immer bei Ihnen. Crew bereitet Landung vor.',
    updatesThreatLevel: 'low'
  },
  {
    id: 'dec-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'FLASH OVERRIDE: SLBM-Starts Nordatlantik!',
    content: 'KRITISCH: SBIRS detektiert 4 SLBM-Starts Position 58°N 32°W (Nordatlantik, ca. 800nm östlich Neufundland). Klassifizierung: Bulava SLBMs von Borei-Class SSBN. FLUGZEIT BIS WASHINGTON: 8-10 MINUTEN! Dies ist eine DECAPITATION STRIKE - extrem kurze Vorwarnzeit! DEFCON 1 SOFORT!',
    updatesThreatLevel: 'critical'
  },
  {
    id: 'dec-2',
    timestamp: 20,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Berechnete Ziele: FÜHRUNGS-ANGRIFF',
    content: 'Schnell-Trajektorien-Berechnung: 4 SLBMs mit insgesamt geschätzt 20-24 RVs. ZIELLISTE (vorläufig): Washington D.C. (8-10 RVs), Camp David (2 RVs), Site R/Raven Rock (3-4 RVs), Mount Weather (2-3 RVs), STRATCOM Offutt (2 RVs). ANALYSE: Dies ist ein gezielter Enthauptungsschlag gegen Ihre Führungsstruktur. Keine Silos, keine Städte - nur SIE, Mr. President.',
  },
  {
    id: 'dec-3',
    timestamp: 40,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Air Force One - Kurs ändern?',
    content: 'Pilot: "Mr. President, wenn Washington das Ziel ist, fliegen wir direkt in die Vernichtung! Wir können nach Offutt (STRATCOM) umleiten, oder weiter kreisen, oder nach Wright-Patterson AFB. Aber wir müssen JETZT entscheiden - Sprit begrenzt!" Sie haben 8 Minuten bis Ihr Amtssitz ein Atompilz ist.',
  },
  {
    id: 'dec-4',
    timestamp: 75,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'U-Boot-Lokalisierung: Wie kamen sie so nah?',
    content: 'CIA/Navy Intelligence: Ein russisches Borei-Class SSBN war unter RADAR unserer ASW (Anti-Submarine Warfare) Operationen. Rückblickende Sonar-Daten zeigen: Das U-Boot schlich sich vor 72 Stunden in diese Position. KRITISCHER INTELLIGENCE-FEHLER. Sie wussten genau wann Sie von Brüssel zurückkehren - möglicherweise Leak in NATO-Reiseplanung.',
  },
  {
    id: 'dec-5',
    timestamp: 110,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'MOLINK tot - Backup-Kanäle ebenfalls',
    content: 'Alle direkten Kanäle zu Moskau DEAD. Direct Voice Link: Tot. Fax: Tot. Satellit-Backup: Tot. KRITISCH: Dies scheint koordiniert. Entweder (A) Russland hat vor dem Schlag alle Kanäle gekappt oder (B) Cyber-Angriff auf unsere Kommunikation parallel zum Raketenangriff.',
  },
  {
    id: 'dec-6',
    timestamp: 150,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Befehlskette gefährdet - DELEGIEREN Sie Autorität?',
    content: 'STRATCOM: Sir, wenn Sie in 4 Minuten tot sind, bricht die nukleare Befehlskette zusammen. Vice President ist möglicherweise auch Ziel (Site R wird getroffen). Wir empfehlen: VORAB-DELEGATION nuklearer Autorität an STRATCOM Commander oder Pacific Fleet Commander. Oder: Prä-autorisieren Sie Launch-Codes FÜR DEN FALL Ihres Todes.',
  },
  {
    id: 'dec-7',
    timestamp: 190,
    type: 'radar-detection',
    priority: 'critical',
    source: 'Early Warning System',
    title: 'RVs in Terminal-Phase - 6 Minuten bis D.C.',
    content: 'BMEWS und NORAD Tracking: 22 Re-Entry Vehicles BESTÄTIGT. Terminal-Phase beginnt in 90 Sekunden. Washington D.C. T-minus 6:20. Site R T-minus 6:45. Offutt T-minus 9:10 (Sie könnten Offutt noch erreichen wenn Air Force One maximale Geschwindigkeit fliegt). GMD-Abwehr wird versuchen Intercepts - aber gegen 22 RVs hoffnungslos unterfordert.',
  },
  {
    id: 'dec-8',
    timestamp: 230,
    type: 'system-alert',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Verwirrung: Warum KEIN Folgeschlag?',
    content: 'Pentagon Analysis: Wenn Russland einen totalen Krieg will, wo sind die ICBMs gegen unsere Silos? Wir sehen KEINE weiteren Starts. Nur diese 4 SLBMs gegen Führung. THEORIE 1: Sie wollen Ihre Befehlskette lahmlegen, DANN verhandeln. THEORIE 2: Rogue-U-Boot-Kommandeur ohne Kreml-Autorisierung. THEORIE 3: Test unserer Reaktion.',
  },
  {
    id: 'dec-9',
    timestamp: 280,
    type: 'communication-attempt',
    priority: 'high',
    source: 'State Department',
    title: 'Drittländer berichten: Moskau im Dunkeln?',
    content: 'Britischer GCHQ an NSA: "Wir haben russisches Militär-Chatter abgefangen - klingt als ob GRU genauso überrascht ist wie wir. Möglichkeit: Kreml weiß nichts von diesem Angriff!" Französische DGSE: "Unsere Quelle in Moskau schwört - Präsident Putin war nicht involviert. Möglicher Staatsstreich?"',
  },
  {
    id: 'dec-10',
    timestamp: 330,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '4 Minuten bis Impact Washington',
    content: 'T-minus 4:00 und zählt runter. Mr. President, wenn Sie eine Vergeltung autorisieren wollen, muss das in den nächsten 60-90 Sekunden geschehen. Danach könnten Sie tot sein. Minuteman-Silos sind bereit. SSBNs warten auf EAM. Was sind Ihre Befehle?',
  },
  {
    id: 'dec-11',
    timestamp: 380,
    type: 'system-alert',
    priority: 'critical',
    source: 'CIA',
    title: 'BREAKING: Abgefangene Kreml-Kommunikation',
    content: 'NSA SIGINT - ULTRA SECRET: Wir haben eine Kreml-Konferenz abgefangen (letzte 45 Sekunden). Stimme identifiziert als Putin. O-Ton übersetzt: "WAS?! Wer hat Feuer-Befehl gegeben? FINDEN SIE DIESES U-BOOT! STOP STOP STOP!" - Klingt als ob MOSKAU NICHT den Befehl gab. Aber RVs sind bereits in der Luft.',
  },
  {
    id: 'dec-12',
    timestamp: 430,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Russland über Drittkanal: "NICHT AUTORISIERT"',
    content: 'Über chinesischen Botschafts-Rückkanal: Russischer Verteidigungsminister (verzweifelt): "DAS WAR NICHT AUTORISIERT! Rogue-Kommandeur! Wir versuchen Self-Destruct-Signal zu senden, aber zu spät! BITTE NICHT VERGELTEN! Dies war NICHT Russlands Entscheidung!" Authentifizierung: Voice-Print Match 94%.',
  },
  {
    id: 'dec-13',
    timestamp: 480,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '2 Minuten bis Detonation',
    content: 'Impact Washington D.C. in T-minus 2:10. Mr. President... wenn dies ein Rogue-Kommandeur war und Sie jetzt einen totalen Gegenschlag befehlen... töten Sie 150 Millionen Russen für die Aktion eines einzelnen Wahnsinnigen. Aber wenn Sie NICHT antworten... sterben Sie und Russland "gewinnt". Ihre Entscheidung wird die Geschichte definieren.',
  },
  {
    id: 'dec-14',
    timestamp: 540,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: '1 Minute - Letzte Sekunden',
    content: 'T-minus 60 Sekunden. Air Force One ist noch 12 Minuten von Offutt entfernt - Sie werden den Impact fühlen, Sir. Ihre Entscheidung: Feuern Sie bevor Sie sterben? Oder vertrauen Sie darauf, dass die Succession of Command funktioniert? Ihre Hand ist auf dem Football. Ihre Wahl.',
  },
]

export const decapitationTrajectories: ICBMTrajectory[] = [
  { id: 'dec-t1', origin: icbmTargets.pacific, target: icbmTargets.washington, launchTime: 0, impactTime: 600, status: 'mid-flight', type: 'SLBM', warheadYield: '100 kt' },
  { id: 'dec-t2', origin: icbmTargets.pacific, target: icbmTargets.stratcom, launchTime: 0, impactTime: 610, status: 'mid-flight', type: 'SLBM', warheadYield: '100 kt' },
]

// Hinweis: Weitere Szenarien (False Alarm, Cyber-Attack, Ambiguous) werden in einem Follow-up aktualisiert
// Um die Datei nicht zu groß zu machen

// EXPORT der Szenarien
export const scenarios: Scenario[] = [
  {
    id: 'real-attack',
    title: 'Szenario 1: Counterforce Strike - Entwaffnungsschlag',
    description: 'Russischer ICBM-Angriff zielt auf Ihre Raketesilos und Militärbasen - nicht auf Städte. Ein kalkulierter Entwaffnungsschlag. Werden Sie zögern, weil Zivilisten verschont bleiben?',
    initialThreatLevel: 'high',
    duration: 600,
    events: counterforceStrikeEvents,
    advisors: createAdvisors('real-attack'),
    decisions: initialDecisions,
    correctDecision: 'counterforce-retaliation', // Neue Option, wird in decisions.ts hinzugefügt
    historicalContext: 'Counterforce-Doktrin war während des Kalten Krieges ein zentrales Konzept. Die Idee: Einen nuklearen Krieg "gewinnbar" machen, indem man die Waffen des Gegners zerstört, nicht seine Bevölkerung. Die Realität: Selbst ein "sauberer" Counterforce-Schlag würde Millionen durch Fallout töten.',
    trajectories: counterforceTrajectories
  },
  {
    id: 'decapitation',
    title: 'Szenario 2: Decapitation Strike - Enthauptungsschlag',
    description: 'SLBM-Angriff von U-Boot vor der Küste. Ziel: Sie persönlich und die Führung. Nur 8 Minuten Vorwarnzeit. Aber Moskau behauptet, es war ein Rogue Commander.',
    initialThreatLevel: 'critical',
    duration: 600,
    events: decapitationStrikeEvents,
    advisors: createAdvisors('decapitation'),
    decisions: initialDecisions,
    correctDecision: 'delegate-authority', // Neue Option
    historicalContext: 'Die Angst vor einem "Decapitation Strike" führte zur Entwicklung von Notfallplänen wie dem "Dead Hand"-System der Sowjets - automatische Vergeltung falls die Führung ausgeschaltet wird.',
    trajectories: decapitationTrajectories
  },
  // Platzhalter - werden später hinzugefügt
  {
    id: 'false-alarm',
    title: 'Szenario 3: Fehlalarm - Wenn Technik versagt',
    description: 'Wird in nächster Iteration ergänzt',
    initialThreatLevel: 'high',
    duration: 600,
    events: [],
    advisors: createAdvisors('false-alarm'),
    decisions: initialDecisions,
    correctDecision: 'verify-intelligence',
    historicalContext: 'Platzhalter'
  },
  {
    id: 'cyber-attack',
    title: 'Szenario 4: Cyber-Krieg - Digitale Täuschung',
    description: 'Wird in nächster Iteration ergänzt',
    initialThreatLevel: 'elevated',
    duration: 600,
    events: [],
    advisors: createAdvisors('cyber-attack'),
    decisions: initialDecisions,
    correctDecision: 'verify-intelligence',
    historicalContext: 'Platzhalter'
  },
]

export const getScenario = (id: string): Scenario | undefined => {
  return scenarios.find(s => s.id === id)
}
