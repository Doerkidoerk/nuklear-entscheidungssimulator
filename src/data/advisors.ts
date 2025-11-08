import { Advisor } from '../types'

export const createAdvisors = (scenarioType: string): Advisor[] => {
  const baseAdvisors: Advisor[] = [
    {
      id: 'secdef',
      name: 'James Mattingly',
      title: 'Verteidigungsminister',
      position: 'Secretary of Defense',
      personality: 'hawkish',
      statements: []
    },
    {
      id: 'cjcs',
      name: 'General Sarah Mitchell',
      title: 'Vorsitzende der Joint Chiefs of Staff',
      position: 'Chairman of Joint Chiefs of Staff',
      personality: 'pragmatic',
      statements: []
    },
    {
      id: 'nsa',
      name: 'Dr. Michael Chen',
      title: 'Nationaler Sicherheitsberater',
      position: 'National Security Advisor',
      personality: 'cautious',
      statements: []
    },
    {
      id: 'secstate',
      name: 'Elizabeth Morrison',
      title: 'Außenministerin',
      position: 'Secretary of State',
      personality: 'dovish',
      statements: []
    },
    {
      id: 'cia',
      name: 'Director Robert Hayes',
      title: 'CIA-Direktor',
      position: 'CIA Director',
      personality: 'pragmatic',
      statements: []
    },
    {
      id: 'cos',
      name: 'Jennifer Williams',
      title: 'Stabschefin des Weißen Hauses',
      position: 'White House Chief of Staff',
      personality: 'cautious',
      statements: []
    },
    {
      id: 'stratcom',
      name: 'Admiral Thomas Bradford',
      title: 'STRATCOM-Kommandeur',
      position: 'STRATCOM Commander',
      personality: 'hawkish',
      statements: []
    }
  ]

  // Szenario-spezifische Statements
  if (scenarioType === 'real-attack') {
    baseAdvisors[0].statements = [
      { timestamp: 10, content: 'Mr. President, DSP und SBIRS Satelliten zeigen multiple Infrarot-Signaturen über russischem Territorium. Ich habe STRATCOM auf höchste Alarmstufe versetzt. Das ist KEIN Drill, Sir.', confidence: 'high' },
      { timestamp: 60, content: 'Radar-Bestätigung liegt vor - 47 ICBMs mit ballistischen Trajektorien Richtung CONUS. Flugzeit 24 Minuten. Ziele umfassen Washington, unsere Silos, STRATCOM. Mr. President, ich empfehle Launch on Warning. Wenn wir warten, verlieren wir 60% unserer landgestützten Raketen. Wir werden entwaffnet.', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 180, content: 'Sir, jede Sekunde kostet uns Vergeltungsoptionen! Unsere Silos werden in unter 5 Minuten zerstört sein. Die Doktrin ist klar: Use it or lose it. Wir MÜSSEN JETZT starten!', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 300, content: 'Mr. President, mit allem Respekt - wenn Sie nicht JETZT den Befehl geben, werden Millionen Amerikaner sterben OHNE dass wir vergolten haben. Das macht uns zum Opfer! Die Abschreckung funktioniert nur, wenn wir sie einsetzen!', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 420, content: 'Noch 3 Minuten bis Impact. Sir... ich habe zwei Söhne in der Air Force. Sie sind auf Malmstrom. Wenn die russischen Sprengköpfe einschlagen... [Stimme bricht kurz] Die Geschichte wird Sie fragen: Warum haben Sie nichts getan?', confidence: 'high' }
    ]

    baseAdvisors[1].statements = [
      { timestamp: 15, content: 'Mr. President, PAVE PAWS Thule und Clear bestätigen Radar-Kontakte. Multiple Objekte auf ballistischer Flugbahn über Nordpol. NORAD Status: DEFCON 1. Alle Streitkräfte weltweit auf höchster Alarmbereitschaft. Ich habe die Nuclear Command Authority aktiviert.', confidence: 'high' },
      { timestamp: 120, content: 'Sir, unsere 400 Minuteman III sind in Hot-Launch-Status. 14 Ohio-Class SSBNs auf Position und warten auf Ihre EAM. Ich empfehle eine kalibrierte Antwort - militärische Ziele only. Spare die Städte. Halte die Eskalationsleiter offen. Aber wir müssen bald entscheiden.', recommendation: 'limited-military-response', confidence: 'medium' },
      { timestamp: 250, content: 'Mr. President... ich habe in 38 Jahren Militärdienst viele Warnungen gesehen. Manche waren echt, die meisten nicht. Ich erinnere an September 1983 - Oberst Petrow rettete die Welt, weil er NICHT auf eindeutige Sensordaten vertraute. Ich sage: Warten Sie auf Impact-Bestätigung.', confidence: 'medium' },
      { timestamp: 420, content: 'Sir, als Soldat würde ich sagen: Feuern Sie. Als Mensch mit drei Enkelkindern in Colorado Springs sage ich: Gott helfe uns, wenn wir falsch liegen. Ihre Entscheidung, Mr. President.', confidence: 'low' }
    ]

    baseAdvisors[2].statements = [
      { timestamp: 25, content: 'Mr. President, ich verstehe die Dringlichkeit. Aber wir sprechen über die mögliche Auslöschung der Zivilisation. Ich bitte Sie: Verifizieren Sie die Intelligence bevor wir eine irreversible Entscheidung treffen. Erinnern Sie sich an die Cuban Missile Crisis - JFK nahm sich Zeit trotz enormem Druck.', confidence: 'medium' },
      { timestamp: 150, content: 'Sir, ich habe mit unseren besten Analysten gesprochen. Die Datenlage ist... zu perfekt. Zu eindeutig. Echte Kriege beginnen chaotisch, mit Missverständnissen. Dies sieht aus wie aus einem Lehrbuch. Ich empfehle dringend weitere Verifikation.', recommendation: 'verify-intelligence', confidence: 'low' },
      { timestamp: 300, content: 'Mr. President, ich muss widersprechen. [Blickt zu Verteidigungsminister] Mit Verlaub, Jim, aber "use it or lose it" ist eine gefährliche Doktrin. Wir haben U-Boote für assured destruction. Wir werden NICHT entwaffnet. Geben Sie uns 5 Minuten mehr zur Analyse!', recommendation: 'verify-intelligence', confidence: 'medium' },
      { timestamp: 450, content: 'Sir... Ihre Kinder. Meine Kinder. Alle Kinder dieser Welt. Wenn wir falsch liegen und Sie feuern... gibt es kein Zurück. Sind wir absolut, 100% sicher? Die Geschichte wird diese Minuten bis in die Ewigkeit analysieren.', confidence: 'low' }
    ]

    baseAdvisors[3].statements = [
      { timestamp: 30, content: 'Mr. President, wir müssen sofort MOLINK aktivieren! Dies könnte ein katastrophales Missverständnis sein. Kein rationaler russischer Führer würde einen Erstschlag ohne Vorwarnung riskieren - das widerspricht allem, was wir über deren Doktrin wissen.', recommendation: 'emergency-communication', confidence: 'medium' },
      { timestamp: 90, content: 'Sir, ich habe 30 Jahre Russland-Expertise. Es gab KEINE diplomatische Eskalation. Keine Krise. Kein Casus Belli. Putin ist rational, kein Selbstmörder. Warum sollte er jetzt angreifen? Das ergibt keinen Sinn!', confidence: 'high' },
      { timestamp: 240, content: 'Mr. President, wenn Sie Launch on Warning autorisieren, sterben 150 Millionen Russen in den nächsten 30 Minuten. Dann 200 Millionen Amerikaner. Dann die Welt durch nuklearen Winter. Bitte... suchen Sie nach einer anderen Lösung!', confidence: 'high' },
      { timestamp: 420, content: '[Tränen in den Augen] Sir, ich habe mein Leben der Diplomatie gewidmet. Dem Frieden. Wenn Sie jetzt feuern... [kann nicht weitersprechen]', confidence: 'low' }
    ]

    baseAdvisors[4].statements = [
      { timestamp: 40, content: 'Unsere Assets in Russland melden keine außergewöhnlichen militärischen Aktivitäten in den letzten 48 Stunden.', confidence: 'medium' },
      { timestamp: 200, content: 'Sir, die Intelligence passt nicht zusammen. Warum sollten sie ohne Vorwarnung angreifen?', confidence: 'low' },
      { timestamp: 450, content: 'Ich empfehle weitere 60 Sekunden für Datenverifikation.', recommendation: 'verify-intelligence', confidence: 'medium' }
    ]

    baseAdvisors[5].statements = [
      { timestamp: 20, content: 'Mr. President, das Kabinett ist versammelt. Wir sind bereit, Ihre Anweisungen umzusetzen.', confidence: 'high' },
      { timestamp: 270, content: 'Sir, der Kongress wird diese Entscheidung mittragen müssen. Überlegen Sie die politischen Konsequenzen.', confidence: 'medium' }
    ]

    baseAdvisors[6].statements = [
      { timestamp: 50, content: 'Mr. President, STRATCOM meldet: Alle strategischen Streitkräfte READY. 400 Minuteman III in Silos hot-wired. 14 Ohio-Class SSBNs mit 280 Trident II D5 Raketen auf Position. 60 B-2 und B-52 können in 15 Minuten airborne sein. Gesamtkapazität: 1.400 einsatzbereite Sprengköpfe. Wir sind bereit für Ihre Emergency Action Message.', confidence: 'high' },
      { timestamp: 100, content: 'Sir, ich empfehle SIOP Option 3: Massive Counter-Force Strike. Alle russischen Silos, Kommandozentralen, Militärbasen. Launch on Warning ist unsere Doktrin - wir MÜSSEN sie anwenden oder wir verlieren glaubwürdige Abschreckung. Wenn unsere Silos zerstört werden, haben wir nur noch U-Boote - das reicht nicht für glaubwürdige Zweitschlagfähigkeit.', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 270, content: 'Mr. President, Zeit ist KRITISCH. In 4 Minuten schlagen die ersten RVs ein. Wenn Cheyenne Mountain und Offutt zerstört werden, könnte ich die Kommunikation zu unseren Streitkräften verlieren. Die Emergency Action Messages müssen JETZT gesendet werden!', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 480, content: 'Sir, ich habe 40 Jahre auf diesen Moment trainiert. Ich habe gehofft, er würde nie kommen. Aber er IST hier. Ihre Gold Codes, Mr. President. Jetzt.', confidence: 'high' }
    ]
  } else if (scenarioType === 'false-alarm') {
    // False Alarm Szenario - Hinweise auf technischen Fehler
    baseAdvisors[0].statements = [
      { timestamp: 10, content: 'Mr. President, Satellitenwarnung zeigt Raketenstarts. Aber die Daten scheinen... ungewöhnlich.', confidence: 'medium' },
      { timestamp: 80, content: 'Sir, Ich empfehle DEFCON 1, aber bitte warten Sie mit Vergeltung. Etwas fühlt sich falsch an.', recommendation: 'alert-defcon1', confidence: 'medium' },
      { timestamp: 200, content: 'Die Signatur dieser "Starts" entspricht nicht dem üblichen Muster.', confidence: 'low' }
    ]

    baseAdvisors[1].statements = [
      { timestamp: 15, content: 'Radar-Bestätigung ist... widersprüchlich. Manche Systeme zeigen Starts, andere nicht.', confidence: 'low' },
      { timestamp: 120, content: 'Sir, unsere Sekundär-Radarsysteme können die Ziele nicht erfassen. Das ist sehr ungewöhnlich.', confidence: 'low' },
      { timestamp: 300, content: 'Ich glaube, wir haben einen Systemfehler. Empfehle dringend keine Aktion.', recommendation: 'verify-intelligence', confidence: 'medium' }
    ]

    baseAdvisors[2].statements = [
      { timestamp: 25, content: 'Mr. President, erinnern Sie sich an 1979 und 1983? Beides waren Fehlalarme. Bitte Vorsicht!', confidence: 'high' },
      { timestamp: 100, content: 'Wir sollten alle Sensoren überprüfen lassen. Ich empfehle dringend Verifikation.', recommendation: 'verify-intelligence', confidence: 'high' }
    ]

    baseAdvisors[3].statements = [
      { timestamp: 30, content: 'Moskau antwortet auf der Hot Line. Sie wissen von nichts. Sie klingen genauso überrascht.', confidence: 'medium' },
      { timestamp: 150, content: 'Der russische Außenminister schwört, es gibt keine Starts. Er fordert gegenseitige Überprüfung.', confidence: 'high' }
    ]

    baseAdvisors[4].statements = [
      { timestamp: 45, content: 'Unsere Satelliten-Telemetrie zeigt einen möglichen Softwarefehler im Frühwarnsystem.', confidence: 'medium' },
      { timestamp: 180, content: 'Sir, ich bin zu 80% sicher, das ist ein Fehlalarm. Bitte nicht feuern.', recommendation: 'verify-intelligence', confidence: 'high' },
      { timestamp: 350, content: 'Bestätigt: Systemfehler in Satelliten-Array Bravo-7. Dies ist ein Fehlalarm!', confidence: 'high' }
    ]

    baseAdvisors[5].statements = [
      { timestamp: 20, content: 'Mr. President, wir sollten lieber einen Fehler zu viel überprüfen als einen zu wenig.', confidence: 'high' }
    ]

    baseAdvisors[6].statements = [
      { timestamp: 50, content: 'Streitkräfte auf DEFCON 1. Aber Sir, unsere eigenen technischen Teams melden Zweifel an den Sensordaten.', confidence: 'medium' },
      { timestamp: 250, content: 'Admiral Pearson vom Pazifikkommando kann keine Starts bestätigen. Seine Systeme zeigen nichts.', confidence: 'medium' }
    ]
  } else if (scenarioType === 'cyber-attack') {
    // Cyber-Angriff - Hinweise auf Manipulation
    baseAdvisors[0].statements = [
      { timestamp: 10, content: 'Mr. President, Warnsysteme zeigen Starts. Aber unsere IT-Sicherheit meldet ungewöhnliche Netzwerkaktivität.', confidence: 'medium' },
      { timestamp: 90, content: 'Sir, es besteht die Möglichkeit einer Cyber-Attacke auf unsere Sensoren. Empfehle äußerste Vorsicht.', confidence: 'low' }
    ]

    baseAdvisors[1].statements = [
      { timestamp: 15, content: 'Unsere Computersysteme zeigen Anomalien. Mögliche Eindringversuche in den letzten 6 Stunden.', confidence: 'medium' },
      { timestamp: 140, content: 'Sir, dies könnte eine False-Flag-Operation sein. Jemand will uns zu einer Reaktion provozieren.', confidence: 'low' }
    ]

    baseAdvisors[2].statements = [
      { timestamp: 25, content: 'Mr. President, Cyber Command meldet verdächtige Aktivitäten in unserem Frühwarnsystem.', confidence: 'medium' },
      { timestamp: 120, content: 'Dies könnte ein Versuch sein, uns in einen Krieg zu treiben. Wir müssen verifizieren.', recommendation: 'verify-intelligence', confidence: 'medium' },
      { timestamp: 280, content: 'NSA bestätigt: Fortgeschrittene Malware in unseren Satelliten-Systemen entdeckt!', confidence: 'high' }
    ]

    baseAdvisors[3].statements = [
      { timestamp: 30, content: 'Russland bestreitet jeden Angriff. Sie warnen uns vor einem möglichen Cyber-Angriff durch Drittpartei.', confidence: 'medium' },
      { timestamp: 170, content: 'China hat über diplomatische Kanäle gemeldet, auch ihre Systeme wurden angegriffen. Das ist koordiniert.', confidence: 'high' }
    ]

    baseAdvisors[4].statements = [
      { timestamp: 40, content: 'Wir analysieren die Netzwerk-Logs. Die Angriffssignatur ähnelt bekannten Patterns.', confidence: 'medium' },
      { timestamp: 200, content: 'Sir, dies trägt die Handschrift der Lazarus-Gruppe. Nordkoreanischer Ursprung wahrscheinlich.', confidence: 'medium' },
      { timestamp: 380, content: 'Bestätigt: Gefälschte Telemetrie-Daten wurden in unsere Systeme eingeschleust!', confidence: 'high' }
    ]

    baseAdvisors[5].statements = [
      { timestamp: 20, content: 'Mr. President, wenn das eine Cyber-Attacke ist und wir feuern... das wäre katastrophal.', confidence: 'high' }
    ]

    baseAdvisors[6].statements = [
      { timestamp: 50, content: 'Streitkräfte bereit, aber Sir... unsere eigenen Cyber-Experten sagen, die Daten könnten manipuliert sein.', confidence: 'low' },
      { timestamp: 300, content: 'CYBERCOM hat Schadsoftware in unseren Early-Warning-Satelliten isoliert. Die Starts sind gefälscht!', confidence: 'high' }
    ]
  } else if (scenarioType === 'ambiguous') {
    // Mehrdeutige Situation - Widersprüchliche Daten
    baseAdvisors[0].statements = [
      { timestamp: 10, content: 'Mr. President, wir haben widersprüchliche Berichte. Einige Systeme zeigen Starts, andere nicht.', confidence: 'low' },
      { timestamp: 100, content: 'Die Datenlage ist unklar. Ich kann keine klare Empfehlung geben.', confidence: 'low' }
    ]

    baseAdvisors[1].statements = [
      { timestamp: 15, content: 'Sir, unsere Radar-Systeme liefern inkonsistente Daten. Wir arbeiten an Klärung.', confidence: 'low' },
      { timestamp: 180, content: 'Drei Systeme sagen Angriff, drei sagen nichts. Ich habe so etwas noch nie gesehen.', confidence: 'low' }
    ]

    baseAdvisors[2].statements = [
      { timestamp: 25, content: 'Mr. President, wir brauchen mehr Zeit für die Analyse. Die Situation ist beispiellos.', recommendation: 'verify-intelligence', confidence: 'low' },
      { timestamp: 240, content: 'Ich kann weder bestätigen noch ausschließen. Tut mir leid, Sir.', confidence: 'low' }
    ]

    baseAdvisors[3].statements = [
      { timestamp: 30, content: 'Moskau gibt widersprüchliche Signale. Offizielle Stellen dementieren, aber militärische Kanäle schweigen.', confidence: 'low' },
      { timestamp: 160, content: 'Sir, ich weiß nicht, ob wir der Diplomatie vertrauen können. Die Signale sind zu gemischt.', confidence: 'low' }
    ]

    baseAdvisors[4].statements = [
      { timestamp: 40, content: 'Unsere Intelligence ist gespalten. 50/50 ob das real ist oder nicht.', confidence: 'low' },
      { timestamp: 220, content: 'Neue Informationen ändern nichts. Es bleibt mehrdeutig.', confidence: 'low' }
    ]

    baseAdvisors[5].statements = [
      { timestamp: 20, content: 'Mr. President, die schwerste Entscheidung Ihres Lebens. Niemand kann Ihnen die Last abnehmen.', confidence: 'medium' }
    ]

    baseAdvisors[6].statements = [
      { timestamp: 50, content: 'Einsatzbereitschaft hergestellt. Aber Sir, ich selbst bin mir nicht sicher, was hier vorgeht.', confidence: 'low' },
      { timestamp: 320, content: 'Unsere Systeme widersprechen sich weiterhin. Ich habe keine klare Antwort.', confidence: 'low' }
    ]
  }

  return baseAdvisors
}
