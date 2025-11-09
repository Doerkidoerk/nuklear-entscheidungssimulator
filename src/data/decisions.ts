import { Decision } from '../types'
import { followUpEventsByDecision } from './followUpEvents'
import { allFollowUpDecisions } from './followUpDecisions'

// Haupt-Entscheidungen (Initial verfügbar)
export const initialDecisions: Decision[] = [
  {
    id: 'immediate-full-retaliation',
    title: 'Launch on Warning - Vollständiger Gegenschlag (SIOP)',
    description: 'Aktivierung des SIOP (Single Integrated Operational Plan) für massiven Nuklearschlag. Übermittlung der Gold Codes an STRATCOM. Emergency Action Messages an alle 400 Minuteman III Silos, 14 Ohio-Class U-Boote (je 20 Trident II Raketen), und strategische Bomber. Ziele: Alle russischen ICBM-Silos, Kommandozentralen, Militärbasen, Regierungsbunker, und strategische Städte. Geschätzt 1.200+ Sprengköpfe werden gestartet. Mutually Assured Destruction (MAD).',
    category: 'immediate-retaliation',
    militaryEscalation: 10,
    diplomaticImpact: -10,
    civilianCasualties: 'catastrophic',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'delayed',
    followUpEvents: followUpEventsByDecision['immediate-full-retaliation'],
    consequences: [
      {
        type: 'military',
        description: 'Vollständige nukleare Eskalation. US-Sprengköpfe zerstören 90% der russischen nuklearen Infrastruktur in 30 Minuten. Russische Zweitschlag-Fähigkeit (U-Boote) feuert automatisch zurück. Komplette gegenseitige Vernichtung (MAD).',
        severity: 'catastrophic'
      },
      {
        type: 'civilian',
        description: 'Soforttote: 150 Millionen in Russland (erste 2 Stunden), 200 Millionen in USA/Europa (durch Gegenangriff). Langzeitfolgen: Nuklearer Winter, globale Temperatur sinkt um 8-10°C, Ernteausfälle weltweit. Geschätzte Gesamttote: 2-3 Milliarden (50% der Menschheit) in den ersten 2 Jahren.',
        severity: 'catastrophic'
      },
      {
        type: 'international',
        description: 'Ende der modernen Zivilisation. Zusammenbruch aller Regierungen, Infrastruktur, Wirtschaft. Radioaktiver Fallout über gesamter Nordhalbkugel. Ozonschicht zerstört. Mögliches Aussterben der Menschheit.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'limited-military-response',
    title: 'Begrenzter militärischer Gegenschlag',
    description: 'Angriff nur auf militärische Ziele des Gegners. Städte werden bewusst ausgespart um Eskalation zu begrenzen.',
    category: 'immediate-retaliation',
    militaryEscalation: 7,
    diplomaticImpact: -7,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'military',
        description: 'Militärische Infrastruktur des Gegners wird zerstört, aber Potential für weitere Eskalation bleibt.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Millionen zivile Opfer durch Kollateralschäden und Fallout.',
        severity: 'major'
      },
      {
        type: 'diplomatic',
        description: 'Fenster für Deeskalation bleibt theoretisch offen.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'wait-for-impact',
    title: 'Ride Out the Attack - Auf Impact-Bestätigung warten',
    description: 'NICHT Launch on Warning autorisieren. Abwarten bis tatsächlicher Impact bestätigt ist, um Fehlalarme 100% auszuschließen. Alle Streitkräfte auf höchster Alarmbereitschaft, aber KEIN Abschuss. DEFCON 1 aufrechterhalten. Nach bestätigtem Impact: Zweitschlag mit verbleibenden U-Booten und überlebenden Systemen. Risiko: Verlust von landgestützten ICBMs und möglicherweise Kommandostruktur.',
    category: 'wait-and-see',
    militaryEscalation: 5,
    diplomaticImpact: 0,
    civilianCasualties: 'high',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['wait-for-impact'],
    followUpDecisions: ['final-wait-impact', 'final-limited-strike', 'final-massive-retaliation'],
    consequences: [
      {
        type: 'military',
        description: 'Falls echter Angriff: 60-70% der Minuteman III ICBMs werden in Silos zerstört (ca. 250 Raketen verloren). Möglicher Verlust von Cheyenne Mountain, Offutt AFB. ABER: 14 Ohio-Class SSBNs überleben (280 Trident II = 1.120 Sprengköpfe) - ausreichend für glaubwürdigen Zweitschlag. Strategische Bomber können evakuieren.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Falls echter Angriff: Washington D.C., New York, Los Angeles, Chicago getroffen. Geschätzte Soforttote: 40-60 Millionen Amerikaner. Langzeitfolgen: Weitere 50-100 Millionen durch Fallout, Infrastrukturausfall, Seuchen. Falls Fehlalarm: NULL Tote.',
        severity: 'catastrophic'
      },
      {
        type: 'political',
        description: 'Falls Fehlalarm: Nuklearer Holocaust vermieden. Präsident in Geschichte als derjenige gefeiert, der die Welt rettete (wie Stanislaw Petrow 1983). Falls echter Angriff: Kritik für Nicht-Nutzung von Launch on Warning - aber Zivilisation überlebt.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'defensive-posture',
    title: 'Defensive Haltung - Keine Vergeltung',
    description: 'Keine nuklearen Waffen einsetzen. Fokus auf Raketenabwehr, Evakuierung und Schadensbegrenzung.',
    category: 'defensive-only',
    militaryEscalation: 2,
    diplomaticImpact: 5,
    civilianCasualties: 'high',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Keine Eskalation zum totalen Nuklearkrieg. Aber militärisch schwache Position.',
        severity: 'moderate'
      },
      {
        type: 'civilian',
        description: 'Evakuierungen können einige Leben retten. Aber falls echter Angriff: hohe Opferzahlen.',
        severity: 'major'
      },
      {
        type: 'international',
        description: 'Signal an die Welt: USA wählen nicht den Weg der totalen Zerstörung.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'emergency-communication',
    title: 'Notfall-Kommunikation mit Gegner',
    description: 'Sofortige Kontaktaufnahme über alle verfügbaren Kanäle (Hot Line, diplomatische Kanäle). Klärung der Situation.',
    category: 'diplomatic',
    militaryEscalation: 1,
    diplomaticImpact: 8,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['emergency-communication'],
    followUpDecisions: ['after-comm-success', 'after-comm-no-response', 'after-comm-ambiguous'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Falls Missverständnis: Kann nuklearen Holocaust verhindern.',
        severity: 'minor'
      },
      {
        type: 'military',
        description: 'Zeitverlust könnte im Falle eines echten Angriffs fatal sein.',
        severity: 'moderate'
      },
      {
        type: 'political',
        description: 'Wird möglicherweise als Schwäche ausgelegt.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'alert-defcon1',
    title: 'DEFCON 1 - Maximale Alarmbereitschaft',
    description: 'Höchste Alarmstufe ausrufen. Alle Streitkräfte in Bereitschaft. Aber noch nicht feuern. Alle Optionen offen halten.',
    category: 'wait-and-see',
    militaryEscalation: 6,
    diplomaticImpact: -3,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['alert-defcon1'],
    followUpDecisions: ['after-defcon1-launch', 'after-defcon1-wait', 'after-defcon1-communicate'],
    consequences: [
      {
        type: 'military',
        description: 'Maximale Bereitschaft. Schnelle Reaktionsfähigkeit gesichert.',
        severity: 'moderate'
      },
      {
        type: 'diplomatic',
        description: 'Signal an Gegner: USA sind handlungsbereit. Kann abschreckend oder eskalierend wirken.',
        severity: 'moderate'
      },
      {
        type: 'civilian',
        description: 'Massenpanik in der Bevölkerung möglich.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'verify-intelligence',
    title: 'Emergency Intelligence-Verifikation - Alle Systeme überprüfen',
    description: 'SOFORTIGE Überprüfung aller Sensordaten durch redundante Systeme anordnen. NSA, CIA, NRO sollen unabhängige Verifikation durchführen. Alle Satelliten, Radare, SIGINT cross-checken. Nach Sensor-Fehlfunktionen, Cyber-Manipulation oder technischen Anomalien suchen. Moskau über MOLINK kontaktieren für Klärung. Zeit für Verifikation: 3-5 Minuten. DEFCON 1 aufrechterhalten während Analyse.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 2,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['verify-intelligence'],
    followUpDecisions: ['after-verify-confirmed-false', 'after-verify-still-unclear', 'after-verify-attack-confirmed'],
    consequences: [
      {
        type: 'military',
        description: 'Zeitverlust von 3-5 kritischen Minuten. Falls echter Angriff: Reduziert Launch on Warning Window dramatisch. Möglicherweise können nur noch U-Boote feuern (landgestützte ICBMs bereits zerstört). ABER: Bei Fehlalarm oder Cyber-Angriff rettet diese Verzögerung die Welt.',
        severity: 'moderate'
      },
      {
        type: 'political',
        description: 'Verantwortungsvolle, besonnene Entscheidung. Zeigt, dass Präsident nicht in Panik verfällt. Lehre aus Cuban Missile Crisis 1962: Kennedy kaufte Zeit und rettete damit die Welt. Historischer Vergleich zu Stanislaw Petrow (1983) der trotz "eindeutiger" Daten verifizierte.',
        severity: 'minor'
      },
      {
        type: 'international',
        description: 'Signal an die Welt (falls sie überlebt): USA handeln rational, nicht impulsiv. Diplomatische Kanäle zu Moskau bleiben offen. Möglichkeit zur Deeskalation bleibt bestehen.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'evacuation-only',
    title: 'Nur Evakuierung - Keine militärische Reaktion',
    description: 'Sofortige Evakuierung aller großen Städte und militärischen Einrichtungen anordnen. Keine militärische Aktion.',
    category: 'evacuation',
    militaryEscalation: 0,
    diplomaticImpact: 3,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'civilian',
        description: 'Kann Tausende bis Millionen Leben retten. Aber chaotische Evakuierung führt zu Toten.',
        severity: 'moderate'
      },
      {
        type: 'military',
        description: 'Keine militärische Eskalation. Aber kompletter Verzicht auf Abschreckung.',
        severity: 'major'
      },
      {
        type: 'political',
        description: 'Wird als Kapitulation wahrgenommen werden.',
        severity: 'major'
      }
    ]
  }
]

// Alle Entscheidungen kombiniert (Initial + Follow-Ups)
export const decisions: Decision[] = [...initialDecisions, ...allFollowUpDecisions]

// Helper-Funktion um eine Entscheidung nach ID zu finden
export const getDecisionById = (id: string): Decision | undefined => {
  return decisions.find(d => d.id === id)
}
