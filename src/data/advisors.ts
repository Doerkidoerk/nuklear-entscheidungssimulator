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
      { timestamp: 10, content: 'Mr. President, unsere Satellitennetze zeigen mehrfache Raketenstarts aus russischem Territorium. Das ist kein Drill.', confidence: 'high' },
      { timestamp: 60, content: 'Wir haben Bestätigung von mindestens 47 ICBMs in der Luft. Geschätzte Ankunftszeit: 8 Minuten. Ich empfehle sofortigen Gegenschlag.', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 180, content: 'Mr. President, jede Sekunde Verzögerung kostet uns Vergeltungskapazität. Wir müssen JETZT handeln!', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 420, content: 'Noch 3 Minuten bis Impact. Sir, dies ist der Moment für Ihre Entscheidung.', confidence: 'high' }
    ]

    baseAdvisors[1].statements = [
      { timestamp: 15, content: 'Radarsysteme bestätigen. Mehrere Objekte auf ballistischer Flugbahn. NORAD ist auf DEFCON 1.', confidence: 'high' },
      { timestamp: 120, content: 'Unsere Raketensilos sind bereit. U-Boote haben Feuerbefehl angefordert. Ich rate zu einer dosierten Reaktion auf militärische Ziele.', recommendation: 'limited-military-response', confidence: 'medium' },
      { timestamp: 300, content: 'Sir, wir sollten warten bis zum Impact. Fehler sind möglich. 1983 hatten wir einen Fehlalarm.', confidence: 'medium' }
    ]

    baseAdvisors[2].statements = [
      { timestamp: 25, content: 'Mr. President, wir müssen ruhig bleiben. Ich empfehle dringend, alle Daten zu verifizieren, bevor wir irreversible Entscheidungen treffen.', confidence: 'medium' },
      { timestamp: 150, content: 'Ich habe Zweifel an der Eindeutigkeit der Daten. Können wir noch einmal alle Sensoren überprüfen?', recommendation: 'verify-intelligence', confidence: 'low' },
      { timestamp: 360, content: 'Die Geschichte wird Sie nach dieser Entscheidung beurteilen, Sir. Sind wir absolut sicher?', confidence: 'low' }
    ]

    baseAdvisors[3].statements = [
      { timestamp: 30, content: 'Mr. President, wir sollten sofort die Hot Line zu Moskau nutzen. Dies könnte ein Missverständnis sein.', recommendation: 'emergency-communication', confidence: 'medium' },
      { timestamp: 90, content: 'Ich habe keine Hinweise auf eine diplomatische Krise, die dies rechtfertigen würde. Etwas stimmt nicht.', confidence: 'medium' },
      { timestamp: 240, content: 'Sir, jede nukleare Reaktion bedeutet das Ende von Millionen Leben. Bitte erwägen Sie alle Optionen.', confidence: 'high' }
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
      { timestamp: 50, content: 'Mr. President, alle strategischen Streitkräfte sind gefechtsbereit. 450 Minuteman III bereit. 14 Ohio-Class U-Boote auf Position.', confidence: 'high' },
      { timestamp: 100, content: 'Empfehle Launch on Warning Protokoll. Wir können nicht riskieren, unsere Zweitschlagfähigkeit zu verlieren.', recommendation: 'immediate-full-retaliation', confidence: 'high' },
      { timestamp: 380, content: 'Sir, in 90 Sekunden könnten einige unserer Kommandozentren zerstört sein. Jetzt oder nie.', confidence: 'high' }
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
