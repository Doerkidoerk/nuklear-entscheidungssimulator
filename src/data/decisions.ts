import { Decision } from '../types'

export const decisions: Decision[] = [
  {
    id: 'immediate-full-retaliation',
    title: 'Sofortiger vollständiger Gegenschlag',
    description: 'Alle nuklearen Streitkräfte aktivieren und umgehend auf vorprogrammierte Ziele feuern (Launch on Warning). Komplette nukleare Vergeltung.',
    category: 'immediate-retaliation',
    militaryEscalation: 10,
    diplomaticImpact: -10,
    civilianCasualties: 'catastrophic',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'military',
        description: 'Vollständige nukleare Eskalation. Mutually Assured Destruction (MAD) wird ausgelöst.',
        severity: 'catastrophic'
      },
      {
        type: 'civilian',
        description: 'Hunderte Millionen Tote auf beiden Seiten. Nuklearer Winter wahrscheinlich.',
        severity: 'catastrophic'
      },
      {
        type: 'international',
        description: 'Ende der menschlichen Zivilisation wie wir sie kennen.',
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
    title: 'Abwarten auf Impact-Bestätigung',
    description: 'Nicht sofort feuern. Warten bis die Raketen tatsächlich einschlagen, um Fehlalarme auszuschließen. Dann entscheiden.',
    category: 'wait-and-see',
    militaryEscalation: 5,
    diplomaticImpact: 0,
    civilianCasualties: 'high',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Falls echter Angriff: Verlust von Erstschlag-Kapazitäten. Teile der Kommandostruktur könnten zerstört werden.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Falls echter Angriff: Millionen amerikanische Opfer durch den Erstschlag.',
        severity: 'catastrophic'
      },
      {
        type: 'political',
        description: 'Falls Fehlalarm: Nuklearkrieg wurde vermieden. Präsident als besonnen wahrgenommen.',
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
    title: 'Nachrichtenüberprüfung anordnen',
    description: 'Alle Intelligence-Quellen nochmals überprüfen. Sensordaten validieren. Nach Hinweisen auf Fehler oder Manipulation suchen.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 2,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Verzögerung bei der Reaktion. Könnte bei echtem Angriff fatal sein.',
        severity: 'moderate'
      },
      {
        type: 'political',
        description: 'Verantwortungsvolle Entscheidung. Vermeidet voreiliges Handeln.',
        severity: 'minor'
      },
      {
        type: 'international',
        description: 'Zeigt Besonnenheit statt Hysterie.',
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
