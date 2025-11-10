import { FollowUpEvent, ScenarioType } from '../types'

// ============================================
// FOLLOW-UP EVENTS - Jede Entscheidung triggert neue Events
// ============================================
// Prinzip: Jede Entscheidung führt zu 3-5 Events über 2-4 Minuten
// Diese Events führen dann zu neuen Entscheidungsoptionen
// Das Spiel hat mindestens 2-3 Phasen bevor es endet

// ===========================================
// 1. VERIFY INTELLIGENCE
// ===========================================
const verifyIntelligenceEvents: FollowUpEvent[] = [
  {
    id: 'verify-evt-1',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'Verifikation läuft - Cross-Check initiiert',
    content: 'NSA, CIA, NRO arbeiten parallel. Sekundärsysteme werden abgefragt. Alle verfügbaren Sensoren cross-checken die primären Daten. Erste Ergebnisse in 60-90 Sekunden erwartet.',
  },
  {
    id: 'verify-evt-2',
    timestamp: 0,
    triggerDelay: 70,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Sekundärsatelliten liefern Daten',
    content: 'NRO-Analyse: Von 6 Satelliten zeigen 4 Starts, 2 zeigen NICHTS. Radar-Netzwerk zeigt partielle Korrelation - einige Stationen bestätigen, andere nicht. KRITISCH: Datenlage bleibt WIDERSPRÜCHLICH. Weitere 90 Sekunden für finale Analyse benötigt.',
    updatesThreatLevel: 'high',
  },
  {
    id: 'verify-evt-3',
    timestamp: 0,
    triggerDelay: 130,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'HUMINT Update - Keine russische Kriegsvorbereitung',
    content: 'CIA Assets in Moskau, St. Petersburg, Militärbasen: Keine Anzeichen für Kriegsbereitschaft. Botschaftspersonal NICHT evakuiert. TV-Stationen normal. Kreml unbeleuchtet (normal für Nachtbetrieb). ABER: Bei perfekter Täuschung würden wir genau DAS erwarten.',
  },
  {
    id: 'verify-evt-4',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'KOMPLIKATION: Primärradar offline',
    content: 'PAVE PAWS Clear (Alaska) meldet jetzt KOMPLETTEN Ausfall - möglicherweise Cyber-Angriff auf Radar? Oder Zufall? Thule funktioniert weiter, aber allein nicht ausreichend für definitive Bestätigung. Backup-Systeme hochfahren - weitere 2 Minuten.',
  },
  {
    id: 'verify-evt-5',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Verifikation UNSCHLÜSSIG - Sie müssen entscheiden',
    content: 'Nach 4 Minuten Analyse: Wir können WEDER definitiv bestätigen NOCH ausschließen. Confidence Level: 55% für echten Angriff, 45% für Fehlalarm/Täuschung. Radar-Ausfälle machen Bestätigung unmöglich. Mr. President - Sie müssen jetzt mit Unsicherheit entscheiden.',
  },
]

// ===========================================
// 2. SCRAMBLE BOMBERS
// ===========================================
const scrambleBombersEvents: FollowUpEvent[] = [
  {
    id: 'scramble-evt-1',
    timestamp: 0,
    triggerDelay: 45,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'Pentagon',
    title: 'Bomber starten - 68 Flugzeuge airborne',
    content: 'Barksdale AFB: 18 B-52 airborne. Whiteman AFB: 12 B-2 airborne. Minot AFB: 24 B-52 starten jetzt. Dyess AFB: 14 B-1 ebenfalls gestartet. Gesamt: 68 strategische Bomber in der Luft. Holding Pattern über CONUS. Keine nukleare Bewaffnung aktiviert - noch.',
  },
  {
    id: 'scramble-evt-2',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'WARNUNG: Russland sieht Bomber als Eskalation',
    content: 'SIGINT intercept: Russischer Generalstab-Chatter hochaggressiv. Übersetzung: "Amerikaner haben alle Bomber gestartet - das ist Vorbereitung zum Angriff!" Russische Führung könnte dies als Beweis für US-Erstschlag interpretieren. Gefahr: Wir provozieren was wir verhindern wollen!',
  },
  {
    id: 'scramble-evt-3',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Russland aktiviert EIGENE Bomber',
    content: 'SBIRS detektiert: Engels Airbase aktiviert Tu-95 und Tu-160 Bomber. Geschätzt 40+ Flugzeuge starten. Ukrainka Air Base ebenfalls. KRITISCH: Wir haben eine Bomber-Eskalationsspirale ausgelöst. Beide Seiten haben jetzt hunderte atomare Bomber in der Luft - Haarauslöser-Situation!',
    updatesThreatLevel: 'critical',
  },
  {
    id: 'scramble-evt-4',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Piloten fragen nach Befehlen',
    content: 'Bomber-Kommandeure fordern Klarheit: "Sind wir im Krieg oder nicht?" Piloten unter extremem Stress. Treibstoff wird knapp (max. 8-12 Stunden airborne möglich). Sie müssen BALD entscheiden: Zurückrufen? Bewaffnen? Oder in DMZ-Pattern weiter kreisen?',
  },
]

// ===========================================
// 3. EMERGENCY COMMUNICATION (MOLINK)
// ===========================================
const emergencyCommunicationEvents: FollowUpEvent[] = [
  {
    id: 'comm-evt-1',
    timestamp: 0,
    triggerDelay: 15,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'MOLINK verbindet... Verzögerung',
    content: 'Moscow Link wird aufgebaut. Direct Voice Line klingelt... 10 Sekunden... 20 Sekunden... KEINE Antwort auf Voice. Backup Text-Terminal wird versucht. KRITISCH: Entweder (A) sie ignorieren uns absichtlich, (B) ihre Systeme sind überlastet, oder (C) Kommunikation sabotiert.',
  },
  {
    id: 'comm-evt-2',
    timestamp: 0,
    triggerDelay: 75,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Moskau antwortet - VERWIRRUNG',
    content: 'TEXT über MOLINK empfangen (kyrillisch, maschinell übersetzt): "WAS MEINEN SIE MIT STARTS? UNSERE SYSTEME ZEIGEN KEINE AUTORISIERTEN STARTS. ÜBERPRÜFEN SIE IHRE DATEN. IST DAS EINE PROVOKATION?" Ton: Verwirrt, nicht aggressiv. Voice Stress Analysis: 73% Wahrscheinlichkeit ECHTE Überraschung.',
  },
  {
    id: 'comm-evt-3',
    timestamp: 0,
    triggerDelay: 140,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Russischer Verteidigungsminister auf Voice',
    content: 'Shoigu auf Direct Voice (hörbar aus dem Schlaf gerissen): "Mr. President, ich schwöre bei allem was heilig ist - wir haben NICHTS gestartet. Schauen Sie auf unsere Städte - keine Evakuierung! Schauen Sie auf unsere Botschaften - normale Betrieb! Wer auch immer Ihnen das erzählt, lügt oder Ihre Systeme sind kompromittiert!"',
  },
  {
    id: 'comm-evt-4',
    timestamp: 0,
    triggerDelay: 200,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Gegenseitige Datenübermittlung angeboten',
    content: 'Russland bietet an, ihre Satelliten-Rohdaten mit uns zu teilen in Echtzeit. Sie fordern gleichzeitig unsere Daten. CIA empfiehlt: "Das könnte Klarheit schaffen ODER uns in false security wiegen wenn sie bereits kompromittiert haben." Akzeptieren Sie Datenaustausch?',
  },
]

// ===========================================
// 4. ALERT DEFCON 1
// ===========================================
export const defcon1FollowUpEvents: FollowUpEvent[] = [
  {
    id: 'defcon1-evt-1',
    timestamp: 0,
    triggerDelay: 15,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'DEFCON 1 AKTIVIERT - Maximum Readiness',
    content: 'Alle 400 Minuteman III ICBMs HOT. 14 Ohio-Class SSBNs auf Feuern-Position. Strategische Bomber auf Rollbahn, Piloten an Bord. GMD Raketenabwehr aktiv. 1,2 Millionen US-Soldaten weltweit auf höchster Alarmstufe. Wir sind bereit für Weltkrieg III.',
  },
  {
    id: 'defcon1-evt-2',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Emergency Alert System - Nationale Panik',
    content: 'EAS (Emergency Alert System) aktiviert auf allen Kanälen. TV, Radio, Smartphones: "NUCLEAR THREAT IMMINENT. SEEK SHELTER IMMEDIATELY." 330 Millionen Amerikaner in Panik. Straßen verstopft. Krankenhäuser überrannt. Supermärkte geplündert. Soziale Ordnung kollabiert in Echtzeit.',
  },
  {
    id: 'defcon1-evt-3',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Russland auf DEFCON 1-Äquivalent',
    content: 'SIGINT bestätigt: Russland hat ГРОЗНЫЙ (GROZNY - ihr DEFCON 1) aktiviert. Ihre gesamten strategischen Kräfte sind scharf. BEIDE Supermächte am absoluten Abgrund. Eine falsche Bewegung, ein Missverständnis, ein technischer Fehler - und die Welt endet. Hair-Trigger.',
  },
  {
    id: 'defcon1-evt-4',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Militär fordert Entscheidung',
    content: 'Joint Chiefs (kollektiv): "Mr. President, wir können DEFCON 1 nicht ewig halten. Personal unter extremem Stress. Risiko von Unfällen oder unauthorisierten Starts steigt jede Minute. Sie MÜSSEN entweder deeskalieren oder Feuer-Befehl geben. Status Quo ist unhaltbar."',
  },
  {
    id: 'defcon1-evt-5',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'INCIDENT: Fast-Launch in Wyoming',
    content: 'NORAD: "INCIDENT bei Warren AFB! Ein Minuteman-III Silo meldete fast-launch sequence - Fehlalarm, abgebrochen nach 12 Sekunden. Ursache: Überlastung der Systeme unter DEFCON 1. Sir, je länger wir so bleiben, desto höher das Risiko dass jemand versehentlich den Krieg startet!"',
  },
]

// ===========================================
// 5. CONTACT ALLIES (NATO)
// ===========================================
const contactAlliesEvents: FollowUpEvent[] = [
  {
    id: 'allies-evt-1',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'UK und Frankreich auf sicherer Leitung',
    content: 'Britischer PM und französischer Président auf NATO Secure Conference. UK: "Unsere Satelliten zeigen... etwas. Nicht eindeutig." Frankreich: "Wir sehen partielle Signaturen, aber unsere Radare korrelieren NICHT. Wir raten zu extremer Vorsicht." Deutschland (Scholz): "Was auch immer geschieht, wir stehen an Ihrer Seite."',
  },
  {
    id: 'allies-evt-2',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'NATO aktiviert Artikel 5 - Aber gespalten',
    content: 'NATO-Generalsekretär: "Artikel 5 kollektive Verteidigung ist aktiviert. ABER: Deutschland, Italien, Spanien fordern Beweis bevor Eskalation. UK und Frankreich bieten volle nukleare Unterstützung an (ihre eigenen Waffen). Polen fordert sofortige Antwort. NATO ist GESPALTEN."',
  },
  {
    id: 'allies-evt-3',
    timestamp: 0,
    triggerDelay: 200,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'UK teilt ihre Satelliten-Daten',
    content: 'GCHQ übermittelt Rohdaten ihrer Skynet-Satelliten. IHRE Analyse: "Wahrscheinlich 40% echter Angriff, 60% technischer Fehler oder Täuschung. Unsere Systeme sind nicht schlüssig. Aber wenn Sie launch on warning machen, werden wir folgen - Artikel 5." Enormer Druck.',
  },
]

// ===========================================
// 6. REALIGN SATELLITES
// ===========================================
const realignSatellitesEvents: FollowUpEvent[] = [
  {
    id: 'satellite-evt-1',
    timestamp: 0,
    triggerDelay: 45,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'high',
    source: 'Satellite Network',
    title: 'KH-11 Neuausrichtung läuft',
    content: 'NRO: Keyhole-11 Spionagesatellit wird auf Plesetsk und Dombarovsky neu ausgerichtet. Gyroscope-Drehung 23 Grad erforderlich. Geschätzte Zeit bis High-Resolution Imagery verfügbar: 2-3 Minuten. Dies wird definitive visuelle Beweise liefern - Silos offen oder geschlossen.',
  },
  {
    id: 'satellite-evt-2',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'satellite-data',
    priority: 'critical',
    source: 'Satellite Network',
    title: 'Hochauflösende Bilder empfangen',
    content: 'KH-11 Imagery (0,1m Auflösung): Plesetsk Cosmodrome - 8 Silos zeigen OFFENE Luken, Rauchspuren sichtbar, kürzlich erfolgte Starts BESTÄTIGT. Dombarovsky - 4 Silos ebenfalls offen. ABER: Nur 12 Starts visuell bestätigt - wo sind die anderen 6-8 die Infrarot-Satelliten meldeten? Diskrepanz bleibt.',
  },
  {
    id: 'satellite-evt-3',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Analyse: Teilweise echter Angriff?',
    content: 'CIA Photo Analysis: 12 echte Starts definitiv bestätigt. Aber primäre Sensoren meldeten 18-20. THEORIE: Teilweise echter Angriff + teilweise Sensor-Fehler? Oder: 12 sind testbar, weitere 6-8 sind Täuschungsraketen die wir nicht visuell sehen? Unclear.',
  },
]

// ===========================================
// 7. WAIT FOR IMPACT
// ===========================================
export const waitForImpactFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'wait-evt-1',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'RVs in Terminal-Phase - 4 Minuten bis Impact',
    content: 'Re-Entry Vehicles beginnen Atmosphären-Wiedereintritt. Geschwindigkeit: Mach 23. Plasma-Trail sichtbar auf Radar. Wenn dies echt ist - in 4 Minuten wissen wir es definitiv. Wenn Fehlalarm - ebenfalls in 4 Minuten bestätigt. Sie haben die mutigste ODER dümmste Entscheidung Ihrer Präsidentschaft getroffen.',
  },
  {
    id: 'wait-evt-2',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: '2 Minuten bis Impact - Letzte Chance Launch',
    content: 'Sir, in 2 Minuten ist es definitiv zu spät für Launch on Warning. Nach Impact unserer Kommandozentralen könnten wir Kommunikation zu Silos verlieren. ABER: U-Boot-Flotte bleibt unberührt. Zweitschlag ist möglich - nur nicht so schnell. Dies ist Ihre LETZTE Chance den Gegner auch zu entwaffnen.',
  },
  {
    id: 'wait-evt-3',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: '1 Minute - Die Wahrheit kommt',
    content: 'T-minus 60 Sekunden bis erwarteter Impact Malmstrom AFB. Alle Augen auf Seismometer, Infrarot-Sensoren, Kommunikationslinks. In einer Minute wissen wir: Sind Sie ein Held wie Petrow 1983... oder haben Sie gerade Amerika sterben lassen. Stille im Situation Room. Countdown läuft.',
  },
]

// ===========================================
// 8. COUNTERFORCE RETALIATION
// ===========================================
const counterforceRetaliationEvents: FollowUpEvent[] = [
  {
    id: 'cf-ret-evt-1',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Gold Codes übermittelt - Counterforce Strike',
    content: 'Emergency Action Messages gesendet. SIOP Option 3 "Major Attack Limited" aktiviert. Ziele: NUR militärische Infrastruktur. 243 Minuteman III aus Warren/Malmstrom feuern. 8 Ohio-Class SSBNs feuern je 12 Trident II (96 SLBMs = 768 Sprengköpfe). Keine Städte als Primärziele. Geschätzte russische Militärverluste: 500.000-800.000.',
  },
  {
    id: 'cf-ret-evt-2',
    timestamp: 0,
    triggerDelay: 90,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Russland detektiert unsere Starts',
    content: 'SIGINT: Russische Frühwarnung hat unsere Starts registriert. Generalstab-Kommunikation (intercept): "AMERIKANISCHER GEGENSCHLAG BESTÄTIGT! PRÄSIDENT - WAS SIND IHRE BEFEHLE?!" Wir haben den Ball ins Spiel gebracht. Was auch immer deren ursprüngliche Intention war - jetzt sind wir im Krieg.',
  },
  {
    id: 'cf-ret-evt-3',
    timestamp: 0,
    triggerDelay: 150,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'ESKALATION: Russischer Gegenschlag',
    content: 'FLASH OVERRIDE: Russland feuert ZURÜCK. 180+ neue ICBM Starts detektiert. Aber: Trajektorien zeigen primär militärische Ziele (unsere Silos, Basen). Sie antworten spiegelbildlich - Counterforce gegen Counterforce. NOCH keine Städte. Aber die Eskalationsleiter ist aktiviert.',
    updatesThreatLevel: 'critical',
  },
  {
    id: 'cf-ret-evt-4',
    timestamp: 0,
    triggerDelay: 210,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'MOLINK: Putin will verhandeln',
    content: 'Direct Voice Link (plötzlich aktiv): Putin persönlich: "Mr. President, wir haben beide gerade einen schrecklichen Fehler gemacht. Hunderte Raketen sind in der Luft. Aber Städte leben noch. Ich biete Ihnen an: STOP. Jetzt. Keine weiteren Starts. Wir nehmen die Treffer, Sie nehmen die Treffer. Aber wir beenden es HIER. Oder... alle sterben."',
  },
]

// ===========================================
// 9. LAUNCH RECON AIRCRAFT (RC-135)
// ===========================================
const launchReconAircraftEvents: FollowUpEvent[] = [
  {
    id: 'recon-evt-1',
    timestamp: 0,
    triggerDelay: 90,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'Pentagon',
    title: 'RC-135 airborne - SIGINT-Sammlung beginnt',
    content: 'RC-135V "Rivet Joint" aus RAF Mildenhall (UK) airborne, Position über Nordmeer. SIGINT-Arrays auf russische Militärfrequenzen gerichtet. RC-135W aus Kadena (Japan) ebenfalls airborne. Elektronische Ohren der USA hören jetzt zu.',
  },
  {
    id: 'recon-evt-2',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'SIGINT-Analyse: Russisches Militär verwirrt',
    content: 'RC-135 SIGINT intercepts: Russische Militär-Kommunikation klingt NICHT wie Kriegsführung. Sample-Intercepts übersetzt: "Was passiert?", "Haben WIR gestartet?", "Generalstab fordert Klärung". Tonlage: Verwirrung, nicht Aggression. MÖGLICHKEIT: Ihr Militär weiß ebensowenig wie wir.',
  },
  {
    id: 'recon-evt-3',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'KRITISCH: Kein Evakuierungs-Traffic',
    content: 'SIGINT zeigt: Keine russischen Zivilschutz-Broadcasts. Keine Evakuierungsbefehle. Metro Moskau fährt normal. TV-Stationen normales Programm. Bei echtem US-Erstschlag würden wir massive zivile Mobilisierung sehen. Wir sehen: NICHTS. Das passt NICHT zu einem geplanten Angriff auf uns.',
  },
]

// ===========================================
// 10. FULL RETALIATION (SIOP)
// ===========================================
export const fullRetaliationFollowUpEvents: FollowUpEvent[] = [
  {
    id: 'full-ret-evt-1',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'APOKALYPSE EINGELEITET',
    content: 'Gold Codes authentifiziert. Emergency Action Messages zu ALLEN Systemen: 400 Minuteman III LAUNCH. 14 SSBNs LAUNCH ALL MISSILES. Bomber RELEASE NUCLEAR WEAPONS. 1.200+ Sprengköpfe zu russischen Zielen: Moskau, St. Petersburg, alle Großstädte, alle Militärbasen. Es gibt kein Zurück.',
  },
  {
    id: 'full-ret-evt-2',
    timestamp: 0,
    triggerDelay: 90,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Russland startet ALLES',
    content: 'FLASH TRAFFIC: Russland hat unsere Starts gesehen. Ihre Antwort: TOTALE VERGELTUNG. 500+ ICBM/SLBM Starts detektiert. Ziele: ALLE US-Städte. New York, LA, Chicago, Houston, Phoenix, Philadelphia... alles. Dead Hand System aktiviert - selbst wenn Kreml zerstört wird, feuern ihre U-Boote automatisch.',
  },
  {
    id: 'full-ret-evt-3',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Das Ende der Welt',
    content: 'Über 2.000 Atomsprengköpfe in der Luft. Beide Richtungen. In 18 Minuten: Moskau brennt. In 22 Minuten: Washington brennt. In 2 Stunden: 400 Millionen Tote (USA + Russland). In 1 Woche: Nuklearer Winter beginnt. In 2 Jahren: Menschheit wahrscheinlich ausgestorben. Sie haben die Apokalypse autorisiert.',
    updatesThreatLevel: 'critical',
  },
]

// ===========================================
// 11. BACKCHANNELS ACTIVATE
// ===========================================
const backchannelsActivateEvents: FollowUpEvent[] = [
  {
    id: 'backchannel-evt-1',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Schweizer Botschafter kontaktiert Moskau',
    content: 'Schweizer Außenministerium (als neutraler Vermittler) kontaktiert russisches Außenministerium über sichere Linien. Nachricht übermittelt: "USA meldet nukleare Starts aus Ihrem Territorium. Können Sie dies bestätigen oder dementieren? Dringende Antwort erforderlich zur Verhinderung von Eskalation."',
  },
  {
    id: 'backchannel-evt-2',
    timestamp: 0,
    triggerDelay: 150,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Chinesischer Außenminister berichtet',
    content: 'Beijing meldet zurück über Backchannel: "Wir haben mit Kreml gesprochen. Ihre Reaktion: TOTALE ÜBERRASCHUNG. Außenminister Lawrow persönlich sagt, er hat keine Kenntnis von militärischen Operationen. Putin wurde aus Bett geholt. Aber: Militär könnte ohne zivile Autorisierung gehandelt haben."',
  },
  {
    id: 'backchannel-evt-3',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Backchannel bestätigt: Kreml dementiert',
    content: 'Schweiz meldet Antwort aus Moskau: "Russische Regierung dementiert kategorisch jeden nuklearen Start. Bieten sofortige Joint-Verification mit internationalem Team an. Fordern Gegendaten von USA. Aber WARNUNG: Wenn Sie feuern basierend auf Fehlalarm, werden wir zurückfeuern müssen." Keine offizielle MOLINK-Bestätigung.',
  },
  {
    id: 'backchannel-evt-4',
    timestamp: 0,
    triggerDelay: 300,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'CIA',
    title: 'Backchannel-Einschätzung',
    content: 'CIA-Analyse der Backchannel-Kommunikation: "Ton und Inhalt wirken authentisch überrascht. ABER: Backchannels können manipuliert sein. Wenn Russian GRU/FSB unsere Kommunikationslinien kompromittiert hat, könnten sie fake responses senden. Confidence: 65% echte Verwirrung, 35% Täuschung möglich."',
  },
]

// ===========================================
// 12. SSBN DEEP DIVE
// ===========================================
const ssbnDeepDiveEvents: FollowUpEvent[] = [
  {
    id: 'ssbn-evt-1',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'STRATCOM',
    title: 'U-Boot-Flotte taucht ab',
    content: '14 Ohio-Class SSBNs erhalten Emergency Deep Dive Order. Ziel: Maximale operative Tiefe (600+ Meter). Kommunikation wird reduziert auf ELF (Extremely Low Frequency) - nur noch Empfang von wenigen Zeichen pro Minute. Sie werden nahezu unlokalisierbar. Second-Strike capability 100% gesichert.',
  },
  {
    id: 'ssbn-evt-2',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'Pentagon',
    title: 'Zweitschlagfähigkeit gesichert',
    content: 'Alle 14 SSBNs auf Tiefe, Position optimal verteilt: Pazifik (6), Atlantik (5), Arktis (3). Insgesamt 1.120 Sprengköpfe auf Trident-II-Raketen. Selbst wenn alle Landsilos, alle Bomber, alle Kommandozentralen zerstört werden - diese U-Boote überleben und können vergolten. MAD (Mutually Assured Destruction) ist garantiert.',
  },
  {
    id: 'ssbn-evt-3',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Russland erhöht ASW-Aktivität',
    content: 'SIGINT: Russische Navy aktiviert alle ASW (Anti-Submarine Warfare) Assets. Tu-142 U-Boot-Jäger starten von Kola-Peninsula. Sonar-Bojen werden massiv ausgebracht im Nordatlantik. Sie WISSEN dass unsere SSBNs auf Tiefe sind und versuchen sie zu lokalisieren. Aber unsere Boote sind extrem leise - Lokalisierung nahezu unmöglich.',
  },
]

// ===========================================
// 13. ACTIVATE MISSILE DEFENSE
// ===========================================
const activateMissileDefenseEvents: FollowUpEvent[] = [
  {
    id: 'defense-evt-1',
    timestamp: 0,
    triggerDelay: 20,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'Pentagon',
    title: 'GMD System auf Maximum',
    content: 'Ground-based Midcourse Defense aktiviert: Fort Greely (Alaska): 40 GBI ready. Vandenberg SFB (Kalifornien): 4 GBI ready. Alle 44 Interceptors scharf. X-Band Radars in Beobachtungsposition. AN/TPY-2 Radars optimal ausgerichtet. System bereit für Abfangversuche.',
  },
  {
    id: 'defense-evt-2',
    timestamp: 0,
    triggerDelay: 90,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'high',
    source: 'Pentagon',
    title: 'Aegis und THAAD aktiviert',
    content: 'AEGIS-Schiffe mit SM-3 Interceptors positioniert: 12 Zerstörer im Pazifik, 8 im Atlantik. THAAD-Batterien auf Guam, Japan, Europa aktiviert. Terminal-Phase Abwehr bereit. Patriot PAC-3 weltweit auf Maximum. Mehrschichtiges Abwehrsystem operational.',
  },
  {
    id: 'defense-evt-3',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'Pentagon',
    title: 'Realistische Erfolgsrate-Modellierung',
    content: 'Simulationen gegen 20 RVs (Reentry Vehicles) mit Decoys: GMD Abfangrate: 30-40% (optimistisch). Bei massivem Angriff (100+ RVs): 12-18% realistisch. KRITISCH: System ist gegen begrenzten Angriff (Nordkorea-Szenario) konzipiert, NICHT gegen russische Salve. Kann einige Städte retten, aber nicht alle.',
  },
  {
    id: 'defense-evt-4',
    timestamp: 0,
    triggerDelay: 240,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'high',
    source: 'NSA',
    title: 'Russland erhöht Decoy-Produktion',
    content: 'SIGINT: Russisches Militär aktiviert zusätzliche Täuschkörper (Decoys) und Penetrationshilfen. Jede ICBM wird nun begleitet von 3-5 Ballons und Chaffs die identisch aussehen auf Radar. Unser Abwehrsystem muss echte RVs von Fakes unterscheiden - extrem schwierig. Erfolgsrate sinkt auf geschätzt 8-12%.',
  },
]

// ===========================================
// 14. DEMONSTRATION STRIKE
// ===========================================
const demonstrationStrikeEvents: FollowUpEvent[] = [
  {
    id: 'demo-evt-1',
    timestamp: 0,
    triggerDelay: 45,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Gold Codes übermittelt - EINZELNER Sprengkopf',
    content: 'Emergency Action Message für Warren AFB, Wyoming. EINE Minuteman III wird vorbereitet. Payload: EINZELNER W87 Sprengkopf (475 Kilotonnen). Ziel: Novaya Zemlya, russische Testinsel in Arktis - unbewohnt seit 1950er Jahren. Koordinaten: 73°N, 55°E. Dies ist beispiellos - atomarer Warnschuss.',
  },
  {
    id: 'demo-evt-2',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Minuteman III gestartet',
    content: 'LAUNCH BESTÄTIGT: Eine ICBM aus Warren AFB airborne. Flugzeit bis Novaya Zemlya: ~18 Minuten. Russische Frühwarnung wird dies SOFORT detektieren. Sie werden einen einzigen Start sehen - aber NICHT wissen wohin er zielt. Kritische Minuten bis sie die Trajectory berechnen können.',
  },
  {
    id: 'demo-evt-3',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Moskau auf MOLINK - PANIK',
    content: 'Direct Voice Link (Putin persönlich, schreiend): "Was zum TEUFEL machen Sie?! Sie haben gefeuert! EIN Start - ist das Demonstration? Täuschung? ERSTE WELLE?! Unsere Systeme zeigen Trajectory zu arktischem Sektor aber... ERKLÄREN SIE SICH SOFORT oder wir müssen als Angriff behandeln!"',
  },
  {
    id: 'demo-evt-4',
    timestamp: 0,
    triggerDelay: 300,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Detonation bestätigt - Novaya Zemlya',
    content: 'Satelliten bestätigen: 475kt Luftdetonation über Novaya Zemlya, 2km Höhe. Keine Opfer (Insel unbewohnt). Seismometer registrieren Magnitude 5.4. Radioaktiver Fallout wird über Arktis abgeweht. ABER: Russland hat ersten atomaren Waffeneinsatz seit 1945 erlebt. Ihre Reaktion: Völlig unvorhersehbar.',
  },
  {
    id: 'demo-evt-5',
    timestamp: 0,
    triggerDelay: 360,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'critical',
    source: 'State Department',
    title: 'Putins Reaktion',
    content: 'MOLINK (Putin, jetzt kalt und kalkuliert): "Sie haben einen atomaren Präzedenzfall gesetzt. Wir verstehen die Botschaft: Sie KÖNNEN und WERDEN feuern. Aber: Sie haben UNSERE Territorium getroffen - auch wenn unbewohnt. Das verlangt Antwort. Wir müssen über einen Deal sprechen. JETZT."',
  },
]

// ===========================================
// 15. EVACUATION ONLY
// ===========================================
const evacuationOnlyEvents: FollowUpEvent[] = [
  {
    id: 'evac-evt-1',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Emergency Broadcast - Evakuierung',
    content: 'Nationale Ansprache: "Dies ist kein Test. Evakuieren Sie sofort alle Großstädte. Begeben Sie sich in Richtung ländliche Gebiete. KEINE Panik - geordnete Evakuierung. Die USA werden NICHT militärisch reagieren. Wir brechen den Cycle of Violence. Gott schütze Amerika." - 330 Mio. Menschen bekommen diese Nachricht.',
  },
  {
    id: 'evac-evt-2',
    timestamp: 0,
    triggerDelay: 180,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'White House',
    title: 'Massenpanik in Großstädten',
    content: 'NYC: 8 Millionen Menschen versuchen Manhattan zu verlassen. Alle Brücken und Tunnel verstopft. LA: I-5 und I-10 Parkplätze. Chicago, Houston, Phoenix - überall Chaos. Krankenhäuser überrannt. Tausende Autounfälle. Geschätzt: 50.000-100.000 Tote durch Evakuierungs-Panik selbst - BEVOR ein Sprengkopf landet.',
  },
  {
    id: 'evac-evt-3',
    timestamp: 0,
    triggerDelay: 360,
    relativeToDecision: true,
    type: 'intelligence-report',
    priority: 'critical',
    source: 'NSA',
    title: 'Russland beobachtet - Verwirrt',
    content: 'SIGINT: Russische Militärkommunikation zeigt totale Verwirrung. Übersetzt: "USA evakuiert Städte aber KEINE militärische Reaktion?", "Ist das Kapitulation?", "Falle? Warten sie auf unsere Starts zum Lokalisieren?". Kreml offenbar überrascht von dieser beispiellosen Strategie. Keine klare russische Reaktion erkennbar.',
  },
  {
    id: 'evac-evt-4',
    timestamp: 0,
    triggerDelay: 480,
    relativeToDecision: true,
    type: 'diplomatic-message',
    priority: 'high',
    source: 'State Department',
    title: 'Internationale Reaktion',
    content: 'UN-Generalsekretär: "Präsident hat außergewöhnlichen Mut gezeigt." China: "Respektvoller Akt." EU: "Moralische Führung." ABER: Pentagon-Interna (leaked): "Wir haben gerade die USA wehrlos gemacht. Wenn das echt ist: 40-60M Tote ohne Vergeltung. Historisch beispiellos - als Heldentat ODER als größter Fehler aller Zeiten."',
  },
]

// ===========================================
// 16. DELEGATE AUTHORITY
// ===========================================
const delegateAuthorityEvents: FollowUpEvent[] = [
  {
    id: 'delegate-evt-1',
    timestamp: 0,
    triggerDelay: 30,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'critical',
    source: 'White House',
    title: 'Nukleare Autorität übertragen',
    content: 'NORAD/STRATCOM: Nukleare Launch-Autorität wird übertragen an: (1) General Harrison (STRATCOM Commander), (2) Admiral Chen (PACOM Commander), (3) Secretary of Defense als Backup. "Dead Hand"-ähnliches Protokoll aktiviert. Falls Präsident/VP/Cabinet ausgelöscht werden: Militär kann autonom vergolten.',
  },
  {
    id: 'delegate-evt-2',
    timestamp: 0,
    triggerDelay: 60,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'General Harrison akzeptiert Autorität',
    content: 'General Harrison (STRATCOM): "Mr. President, ich verstehe die Verantwortung. Falls Sie... nicht überleben: Ich werde im Namen der Vereinigten Staaten handeln. Mein Eid auf die Verfassung bleibt. Aber wissen Sie: Sobald Militär die Codes hat ohne zivile Aufsicht... Geschichte zeigt, wir tendieren zu härteren Optionen."',
  },
  {
    id: 'delegate-evt-3',
    timestamp: 0,
    triggerDelay: 90,
    relativeToDecision: true,
    type: 'system-alert',
    priority: 'high',
    source: 'White House',
    title: 'Sie evakuieren zu E-4B Nightwatch',
    content: 'Secret Service evakuiert Sie zum "Doomsday Plane" - E-4B National Airborne Operations Center. Gepanzerte Boeing 747, fliegende Kommandozentrale. Kann 1 Woche airborne bleiben, überleben atomaren EMP. Von hier können Sie weiter befehligen - falls Sie überleben. Start in 2 Minuten.',
  },
  {
    id: 'delegate-evt-4',
    timestamp: 0,
    triggerDelay: 120,
    relativeToDecision: true,
    type: 'military-status',
    priority: 'critical',
    source: 'STRATCOM',
    title: 'Harrison fragt nach Strategie',
    content: 'General Harrison über sichere Leitung: "Sir, Sie sind airborne. Ich habe die Codes falls Sie getötet werden. FRAGE: Wollen Sie dass ich Launch on Warning autorisiere (sofort feuern bei Impact), oder Ride-Out (warten mit U-Boot-Vergeltung)? Ich brauche PRE-DELEGATION Ihrer Intent - falls Kommunikation abbricht."',
  },
]

// ===========================================
// BASE MAPPING - Welche Events für welche Entscheidung
// ===========================================
const baseFollowUpEventsByDecision: Record<string, FollowUpEvent[]> = {
  'verify-intelligence': verifyIntelligenceEvents,
  'scramble-bombers': scrambleBombersEvents,
  'emergency-communication': emergencyCommunicationEvents,
  'alert-defcon1': defcon1FollowUpEvents,
  'contact-allies': contactAlliesEvents,
  'realign-satellites': realignSatellitesEvents,
  'wait-for-impact': waitForImpactFollowUpEvents,
  'counterforce-retaliation': counterforceRetaliationEvents,
  'launch-recon-aircraft': launchReconAircraftEvents,
  'immediate-full-retaliation': fullRetaliationFollowUpEvents,
  'backchannels-activate': backchannelsActivateEvents,
  'ssbn-deep-dive': ssbnDeepDiveEvents,
  'activate-missile-defense': activateMissileDefenseEvents,
  'demonstration-strike': demonstrationStrikeEvents,
  'evacuation-only': evacuationOnlyEvents,
  'delegate-authority': delegateAuthorityEvents,
}

export const followUpEventsByDecision = baseFollowUpEventsByDecision

export const getFollowUpEventsForDecision = (
  _scenarioId: ScenarioType,
  decisionId: string
): FollowUpEvent[] => {
  // TODO: Später szenario-spezifische Varianten hinzufügen
  return baseFollowUpEventsByDecision[decisionId] || []
}
