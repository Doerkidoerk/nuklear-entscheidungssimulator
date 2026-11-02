import { EventSource, EventType, FollowUpEvent, ScenarioTruth, TruthKind, WorldEffects } from '../types'

// ============================================
// WAHRHEITSABHÄNGIGE HINWEISE
// ============================================
// Aufklärung lohnt sich nur, wenn sie etwas über die Welt verrät.
// Jede Aufklärungs- oder Kommunikationsmaßnahme liefert einen Hinweis,
// dessen Inhalt von der verdeckten Wahrheit abhängt - und das Lagebild schärft.
// Kein Hinweis ist ein Beweis: Jeder lässt sich auch anders lesen.

const ev = (
  id: string,
  triggerDelay: number,
  source: EventSource,
  type: EventType,
  priority: FollowUpEvent['priority'],
  title: string,
  content: string,
  effects?: WorldEffects,
): FollowUpEvent => ({
  id,
  timestamp: 0,
  triggerDelay,
  relativeToDecision: true,
  type,
  priority,
  source,
  title,
  content,
  effects,
})

type ByTruth = Partial<Record<TruthKind, FollowUpEvent[]>>

// Ersetzt generische Folge-Events, die der Wahrheit widersprechen würden
const overrides: Record<string, ByTruth> = {
  'emergency-communication': {
    counterforce: [
      ev('comm-cf-1', 15, 'State Department', 'diplomatic-message', 'high', 'MOLINK: Leitung steht - niemand hebt ab',
        'Direct Voice klingelt in Moskau. 30 Sekunden. 60 Sekunden. Das Text-Terminal bestätigt den Empfang unserer Nachricht technisch - aber es kommt keine Antwort. Die Leitung funktioniert. Moskau schweigt.'),
      ev('comm-cf-2', 110, 'State Department', 'diplomatic-message', 'critical', 'MOLINK: Eine einzige Zeile',
        'Text-Terminal, 23 Sekunden lang aktiv: "DIE RUSSISCHE FÖDERATION HANDELT IN AUSÜBUNG IHRES RECHTS AUF SELBSTVERTEIDIGUNG. STÄDTE SIND NICHT BETROFFEN. JEDE AMERIKANISCHE VERGELTUNG GEGEN STÄDTE WIRD ERWIDERT." Dann Stille. Linguisten: Formulierung wirkt vorbereitet, nicht spontan.',
        { clarity: 30, escalation: 5 }),
    ],
  },
  'backchannels-activate': {
    counterforce: [
      ev('bc-cf-1', 60, 'State Department', 'diplomatic-message', 'high', 'Schweizer Botschafter erreicht niemanden',
        'Das russische Außenministerium nimmt keine Anrufe an. Der Schweizer Botschafter wurde am Eingang abgewiesen: "Keine Termine heute Nacht." Ungewöhnlich - selbst in Krisen gab es bisher immer einen diensthabenden Beamten.'),
      ev('bc-cf-2', 150, 'State Department', 'diplomatic-message', 'critical', 'Beijing: "Moskau hat uns vorgewarnt"',
        'Der chinesische Außenminister über Rückkanal, sichtlich angespannt: "Wir wurden vor zwei Stunden informiert, dass es eine begrenzte Operation geben würde. Wir haben davon abgeraten. Wir bitten Sie dringend, keine Städte anzugreifen." China wusste es. Das war kein Unfall.',
        { clarity: 30 }),
    ],
  },
  'launch-recon-aircraft': {
    counterforce: [
      ev('recon-cf-1', 90, 'Pentagon', 'military-status', 'high', 'RC-135 airborne - SIGINT-Sammlung beginnt',
        'RC-135V "Rivet Joint" aus RAF Mildenhall airborne über dem Nordmeer, RC-135W aus Kadena über dem Japanischen Meer. Die elektronischen Ohren der USA hören zu.'),
      ev('recon-cf-2', 180, 'NSA', 'intelligence-report', 'critical', 'SIGINT: Disziplinierter Kriegsfunk',
        'Russische Militärkommunikation ist knapp, codiert, routiniert. Keine Rückfragen, keine Verwirrung. Strategische Bomber in Engels melden "Bereitschaft Stufe 2". Mehrere Codewörter aus dem Übungsszenario "GROM" - aber diesmal ohne Übungskennung. Das ist kein Chaos. Das ist ein Plan.',
        { clarity: 30, escalation: 3 }),
    ],
  },
  'contact-allies': {
    counterforce: [
      ev('allies-cf-1', 30, 'State Department', 'diplomatic-message', 'high', 'UK und Frankreich auf sicherer Leitung',
        'Britischer Premier: "Fylingdales hat Kontakte, Herr Präsident. Mehrere. Sie steigen." Französischer Präsident: "Unsere Systeme sehen dasselbe. Was werden Sie tun?" Deutschland bittet um 5 Minuten für eine eigene Bewertung.'),
      ev('allies-cf-2', 140, 'CIA', 'intelligence-report', 'critical', 'GCHQ: Unabhängige Bestätigung',
        'GCHQ übermittelt Rohdaten: RAF Fylingdales verfolgt 14 Objekte auf ballistischen Bahnen Richtung Nordamerika. Unabhängig von unseren Satelliten, unabhängig von unserer Software. Bewertung London: "Mit hoher Wahrscheinlichkeit ein realer Angriff." Paris fordert, Städte nicht anzugreifen.',
        { clarity: 25 }),
    ],
    decapitation: [
      ev('allies-dec-1', 30, 'State Department', 'diplomatic-message', 'high', 'UK und Frankreich auf sicherer Leitung',
        'Britischer Premier: "Wir sehen die Starts im Nordatlantik ebenfalls. Vier Objekte. Aber nichts aus Russland selbst." Frankreich: "Ein einzelnes Boot? Das ergibt keinen Sinn als Erstschlag."'),
      ev('allies-dec-2', 120, 'CIA', 'intelligence-report', 'critical', 'NATO: Nur ein Startort',
        'Britische, französische und norwegische Sensoren übereinstimmend: Alle Starts stammen von EINER Position im Nordatlantik. Keine Starts von russischem Boden, keine Bomberbewegungen. Ein geplanter Erstschlag sähe anders aus.',
        { clarity: 25 }),
    ],
  },
  'realign-satellites': {
    decapitation: [
      ev('sat-dec-1', 45, 'Satellite Network', 'satellite-data', 'high', 'KH-11 Neuausrichtung läuft',
        'NRO richtet Keyhole-Satelliten auf russische Silofelder und Marinestützpunkte aus. 2-3 Minuten bis zu hochauflösenden Bildern.'),
      ev('sat-dec-2', 160, 'Satellite Network', 'satellite-data', 'critical', 'Silos geschlossen - ein Boot fehlt',
        'KH-11: Alle Silofelder in Kozelsk, Dombarovsky, Tatischtschewo GESCHLOSSEN. Bomber in Engels am Boden. Gadschijewo: Ein Borei-Boot fehlt am Liegeplatz - seit 11 Tagen auf Patrouille. Die Starts kamen von See. Russlands landgestützte Streitkräfte haben sich nicht bewegt.',
        { clarity: 30 }),
    ],
    'sensor-fault': [
      ev('sat-fa-1', 45, 'Satellite Network', 'satellite-data', 'high', 'KH-11 Neuausrichtung läuft',
        'NRO richtet Keyhole-Satelliten auf die gemeldeten Startgebiete aus. 2-3 Minuten bis zu hochauflösenden Bildern.'),
      ev('sat-fa-2', 160, 'Satellite Network', 'satellite-data', 'critical', 'Startgebiete: Keine Spuren',
        'KH-11 Imagery (0,1m): Keine offenen Silos, keine Rauchfahnen, keine Brandspuren an Startrampen. Mobile Werfer stehen in ihren Hallen. Auffällig: Über den gemeldeten Koordinaten liegt eine geschlossene Wolkendecke in großer Höhe - bei tiefstehender Sonne.',
        { clarity: 30 }),
    ],
    'cyber-deception': [
      ev('sat-cy-1', 45, 'Satellite Network', 'satellite-data', 'high', 'KH-11 Neuausrichtung läuft',
        'NRO richtet Keyhole-Satelliten auf die gemeldeten Startorte aus. 2-3 Minuten bis zu hochauflösenden Bildern.'),
      ev('sat-cy-2', 160, 'Satellite Network', 'satellite-data', 'critical', 'Bilder und Telemetrie widersprechen sich',
        'KH-11: Alle Silos GESCHLOSSEN. Keine Rauchspuren. Gleichzeitig meldet der Telemetrie-Strom desselben Bodensegments weiterhin "Starts". Zwei Datenquellen, ein Downlink - nur eine davon kann echt sein. NRO-Techniker prüfen, ob der Datenstrom manipuliert wurde.',
        { clarity: 30 }),
    ],
  },
}

// Zusätzliche Hinweise (werden an die Folge-Events angehängt)
const clues: Record<string, ByTruth> = {
  'verify-intelligence': {
    counterforce: [ev('clue-verify-cf', 110, 'NSA', 'intelligence-report', 'critical', 'Verifikation: Sensoren unabhängig voneinander',
      'Forensik der Rohdaten: DSP, SBIRS und Thule-Radar nutzen unterschiedliche Hardware, unterschiedliche Software, unterschiedliche Bodenstationen - und zeigen konsistente, leicht abweichende Werte. So sehen echte Messungen aus. Die Lücke bei Clear (Alaska) ist ein bekannter Wartungsausfall.',
      { clarity: 25 })],
    decapitation: [ev('clue-verify-dec', 90, 'NSA', 'intelligence-report', 'critical', 'Verifikation: Echte Starts, falsches Muster',
      'Die Starts sind real - drei Sensortypen bestätigen unabhängig. Aber: Nur EIN Startort, keine Folgewelle, kein begleitender Funkverkehr der russischen Strategischen Raketentruppen. Für einen staatlich befohlenen Erstschlag ist das bemerkenswert klein.',
      { clarity: 25 })],
    'sensor-fault': [ev('clue-verify-fa', 110, 'NSA', 'intelligence-report', 'critical', 'Verifikation: Identische Datensätze',
      'Forensik: Die "Bestätigung" durch SBIRS ist bitgleich mit den DSP-Daten - inklusive derselben Rauschmuster. Zwei unabhängige Sensoren erzeugen niemals identisches Rauschen. Der Fehler sitzt im Update von DSP-23, das die Daten an SBIRS gespiegelt hat.',
      { clarity: 30 })],
    'cyber-deception': [ev('clue-verify-cy', 110, 'USCYBERCOM', 'intelligence-report', 'critical', 'Verifikation: Fremder Code im Bodensegment',
      'USCYBERCOM findet nicht autorisierte Prozesse auf zwei Bodenstationen in Buckley und Pine Gap. Sie schreiben Datenpakete in den Frühwarn-Downlink - mit gültigen Signaturen. Jemand hat sich Zugang verschafft. Ob ALLE Startmeldungen gefälscht sind, ist noch offen.',
      { clarity: 30 })],
  },
  'launch-recon-aircraft': {
    decapitation: [ev('clue-recon-dec', 200, 'NSA', 'intelligence-report', 'critical', 'SIGINT: Russische Marine sucht ihr eigenes Boot',
      'Intercepts der russischen Nordflotte: Wiederholte Rufe an ein bestimmtes Borei-Boot, keine Antwort. Der Generalstab befiehlt anderen Einheiten, "Kontakt um jeden Preis herzustellen". Das klingt nicht nach Angriff. Das klingt nach Kontrollverlust.',
      { clarity: 30 })],
    'sensor-fault': [ev('clue-recon-fa', 200, 'NSA', 'intelligence-report', 'high', 'SIGINT: Gegenseite bemerkt unsere Alarmierung',
      'Russische und chinesische Frühwarnzentren melden einander "ungewöhnliche amerikanische Flugbewegungen". Kein Hinweis auf eigene Starts. Die einzige ungewöhnliche Aktivität, die sie sehen, ist unsere.',
      { clarity: 20 })],
    'cyber-deception': [ev('clue-recon-cy', 200, 'NSA', 'intelligence-report', 'high', 'SIGINT: Moskau glaubt an einen US-Angriff auf seine Netze',
      'Russische Militärkommunikation: Verwirrung über "amerikanische Vorwürfe" und gleichzeitig Meldungen über Störungen IHRER Frühwarnsysteme. Jemand scheint beide Seiten zu manipulieren.',
      { clarity: 25 })],
  },
  'emergency-communication': {
    decapitation: [ev('clue-comm-dec', 100, 'State Department', 'diplomatic-message', 'critical', 'Moskau: "Ein Boot - nicht autorisiert"',
      'Der russische Präsident persönlich, hörbar erschüttert: "Ein U-Boot-Kommandant hat ohne Befehl gehandelt. Wir versuchen, das Boot zu erreichen. Ich biete Ihnen die Position aller unserer anderen Boote an. Bitte - antworten Sie nicht auf Moskau." Stimmanalyse: hohe Belastung, keine Täuschungsmerkmale.',
      { clarity: 25 })],
    'sensor-fault': [ev('clue-comm-fa', 100, 'State Department', 'diplomatic-message', 'high', 'Moskau: "Wir sehen nichts - aber wir sehen IHRE Bomber"',
      'Russische Seite: "Unsere Frühwarnung zeigt keine Starts aus Nordkorea, nicht aus China, nicht von uns. Wir sehen nur eines: amerikanische Streitkräfte in Alarmbereitschaft. Erklären Sie uns das." Die Gegenseite hat keinen Grund, über Nordkorea zu lügen.',
      { clarity: 20 })],
    'cyber-deception': [ev('clue-comm-cy', 100, 'State Department', 'diplomatic-message', 'high', 'Moskau: "Auch unsere Systeme spielen verrückt"',
      'Russische Seite: "Unser Frühwarnsystem hat in der letzten Stunde zweimal amerikanische Starts gemeldet, die es nicht gab. Wir haben nicht reagiert. Wir glauben, jemand will, dass wir uns gegenseitig vernichten."',
      { clarity: 25 })],
  },
  'backchannels-activate': {
    decapitation: [ev('clue-bc-dec', 150, 'State Department', 'diplomatic-message', 'high', 'Rückkanal: Kreml in Panik',
      'Schweizer Botschafter: Im russischen Außenministerium herrscht offenes Chaos. Ein Beamter flüsterte: "Wir haben ein Boot verloren." Der Kreml bittet um sofortigen Direktkontakt.',
      { clarity: 20 })],
    'sensor-fault': [ev('clue-bc-fa', 150, 'State Department', 'diplomatic-message', 'high', 'Rückkanal: Pjöngjang schläft',
      'Beijing über Rückkanal: "Wir haben Kontakt nach Pjöngjang. Dort ist niemand wach, der einen Krieg führt. Keine Starts. Was sehen Sie da?"',
      { clarity: 20 })],
    'cyber-deception': [ev('clue-bc-cy', 150, 'State Department', 'diplomatic-message', 'high', 'Rückkanal: Cyber-Warnung aus Europa',
      'Schweizer und estnische Behörden melden unabhängig: Eine bekannte APT-Gruppe hat in den letzten 48 Stunden Zugangsdaten zu Satelliten-Bodenstationen in mehreren Ländern verkauft bekommen.',
      { clarity: 20 })],
  },
  'contact-allies': {
    'sensor-fault': [ev('clue-allies-fa', 140, 'CIA', 'intelligence-report', 'high', 'Verbündete sehen nichts',
      'Japanische Aegis-Zerstörer, südkoreanische Radare und RAF Fylingdales: KEINE Kontakte. Nicht ein einziger. Nur die amerikanischen Satelliten melden Starts.',
      { clarity: 25 })],
    'cyber-deception': [ev('clue-allies-cy', 140, 'CIA', 'intelligence-report', 'high', 'Verbündete: Radare leer, Netze angegriffen',
      'UK und Frankreich: Keine Radarkontakte. Frankreich meldet zudem einen Einbruch in die eigene Satelliten-Bodenstation in Toulouse vor zwei Tagen - mit identischer Schadsoftware.',
      { clarity: 25 })],
  },
  'after-comm-demand-proof': {
    counterforce: [ev('clue-proof-cf', 60, 'State Department', 'diplomatic-message', 'critical', 'Moskau lehnt ab',
      'Antwort über MOLINK: "Die Russische Föderation lässt sich keine Bedingungen diktieren." Keine Silo-Öffnung, keine Live-Daten. Sie haben auch nichts dementiert.',
      { clarity: 20 })],
    decapitation: [ev('clue-proof-dec', 60, 'State Department', 'diplomatic-message', 'critical', 'Moskau öffnet die Karten',
      'Moskau übermittelt Live-Satellitenbilder aller Silofelder und die Positionen von 9 der 10 aktiven U-Booten. Das zehnte: "Kein Kontakt. Wir suchen es." Russland liefert mehr, als wir verlangt haben.',
      { clarity: 30, escalation: -10 })],
    'sensor-fault': [ev('clue-proof-fa', 60, 'State Department', 'diplomatic-message', 'high', 'Moskau: "Kommen Sie und schauen Sie"',
      'Russland übermittelt Live-Bilder seiner Silofelder und schlägt vor, dass US-Inspektoren innerhalb von 6 Stunden einfliegen. Alle Silos geschlossen. Über Nordkorea habe man "nicht das Geringste" gesehen.',
      { clarity: 25, escalation: -5 })],
    'cyber-deception': [ev('clue-proof-cy', 60, 'State Department', 'diplomatic-message', 'high', 'Moskau liefert Beweise - und eine Warnung',
      'Live-Bilder aller Silofelder: geschlossen. Dazu: "Unsere eigenen Frühwarndaten wurden heute Nacht ebenfalls manipuliert. Wir können Ihnen die Schadsoftware schicken."',
      { clarity: 30, escalation: -5 })],
  },
  'after-comm-accept-data-exchange': {
    decapitation: [ev('clue-data-dec', 70, 'NSA', 'intelligence-report', 'high', 'Datenabgleich: Ein einzelnes Boot',
      'Russische und amerikanische Daten decken sich: vier Starts von einer Position, sonst nichts. Russische Daten zeigen zusätzlich die Funkrufe der Nordflotte an das vermisste Boot.',
      { clarity: 25 })],
    'sensor-fault': [ev('clue-data-fa', 70, 'NSA', 'intelligence-report', 'high', 'Datenabgleich: Nur wir sehen Starts',
      'Russische Rohdaten: Keine Infrarot-Ereignisse über Nordkorea. Die Wetterdaten zeigen hohe Eiswolken genau dort, wo DSP-23 "Starts" meldet.',
      { clarity: 30 })],
    'cyber-deception': [ev('clue-data-cy', 70, 'NSA', 'intelligence-report', 'high', 'Datenabgleich: Zwei manipulierte Systeme',
      'Russische Rohdaten zeigen keine Starts - aber dieselbe Art Datenpakete mit falschen Zeitstempeln wie bei uns. Beide Frühwarnsysteme wurden infiltriert.',
      { clarity: 30 })],
  },
}

// Generische Hinweis-Kopie für Befehle, die inhaltlich dasselbe auslösen
const aliases: Record<string, string> = {
  'after-verify-communicate': 'emergency-communication',
  'after-scramble-communicate': 'emergency-communication',
  'after-defcon1-communicate': 'emergency-communication',
}

export const getTruthDependentEvents = (
  decisionId: string,
  truth: ScenarioTruth,
): { replace?: FollowUpEvent[]; extra: FollowUpEvent[] } => {
  const id = aliases[decisionId] && !overrides[decisionId] && !clues[decisionId] ? aliases[decisionId] : decisionId
  const replace = overrides[id]?.[truth.kind]
  const extra = clues[id]?.[truth.kind] || []
  return { replace, extra }
}
