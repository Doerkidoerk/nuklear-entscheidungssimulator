import { Decision } from '../types'

// Folge-Entscheidungen für verschiedene Szenarien
// Diese werden basierend auf der initialen Entscheidung verfügbar

// ============================================
// FOLGE-ENTSCHEIDUNGEN nach "verify-intelligence"
// ============================================
export const verifyIntelligenceFollowUps: Decision[] = [
  {
    id: 'after-verify-confirmed-false',
    title: 'ENTWARNUNG - Fehlalarm bestätigt',
    description: 'Alle Streitkräfte zurück auf DEFCON 3. Öffentliche Erklärung vorbereiten. Untersuchung der Systemfehler einleiten.',
    category: 'diplomatic',
    militaryEscalation: 0,
    diplomaticImpact: 5,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Krise ohne Eskalation beendet. Sie haben die richtige Entscheidung getroffen.',
        severity: 'minor'
      },
      {
        type: 'international',
        description: 'Vertrauen in US-Besonnenheit gestärkt. Diplomatische Beziehungen verbessert.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-verify-still-unclear',
    title: 'Weiteres Abwarten - Daten bleiben unklar',
    description: 'Trotz Verifikation keine eindeutige Antwort. DEFCON 1 aufrechterhalten, aber weiterhin nicht feuern. Auf weitere Entwicklungen warten.',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: 2,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['final-defensive-only', 'final-limited-strike', 'final-continue-waiting'],
    consequences: [
      {
        type: 'military',
        description: 'Streitkräfte bleiben in höchster Alarmbereitschaft. Stress für Personal steigt.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-verify-attack-confirmed',
    title: 'ANGRIFF BESTÄTIGT - Sofortige Reaktion',
    description: 'Verifikation zeigt: Dies ist ein echter Angriff! Launch on Warning JETZT autorisieren oder auf Impact warten.',
    category: 'immediate-retaliation',
    militaryEscalation: 9,
    diplomaticImpact: -8,
    civilianCasualties: 'catastrophic',
    requiresConfirmation: true,
    followUpDecisions: ['final-massive-retaliation', 'final-wait-impact'],
    consequences: [
      {
        type: 'military',
        description: 'Zeitfenster für Launch on Warning schließt sich. Handeln erforderlich.',
        severity: 'major'
      }
    ]
  }
]

// ============================================
// FOLGE-ENTSCHEIDUNGEN nach "emergency-communication"
// ============================================
export const emergencyCommunicationFollowUps: Decision[] = [
  {
    id: 'after-comm-success',
    title: 'Deeskalation erfolgreich',
    description: 'Moskau bestätigt: Keine Starts. Gemeinsame Untersuchung eingeleitet. Krise beendet.',
    category: 'diplomatic',
    militaryEscalation: 0,
    diplomaticImpact: 10,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'diplomatic',
        description: 'Diplomatischer Triumph. Hot Line hat funktioniert wie vorgesehen.',
        severity: 'minor'
      },
      {
        type: 'international',
        description: 'Weltweite Anerkennung für besonnenes Handeln. Nukleare Sicherheit verbessert.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-comm-no-response',
    title: 'Keine Antwort - Militärische Option',
    description: 'Moskau antwortet nicht. Zeit läuft ab. Sie müssen nun eine militärische Entscheidung treffen.',
    category: 'immediate-retaliation',
    militaryEscalation: 7,
    diplomaticImpact: -5,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    followUpDecisions: ['final-limited-strike', 'final-defensive-only'],
    consequences: [
      {
        type: 'military',
        description: 'Diplomatische Optionen erschöpft. Militärische Reaktion wird wahrscheinlicher.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-comm-ambiguous',
    title: 'Unklare Antwort - Weitere Klärung',
    description: 'Moskaus Antwort ist ausweichend. Entweder technische Probleme oder Täuschungsversuch.',
    category: 'diplomatic',
    militaryEscalation: 3,
    diplomaticImpact: 0,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-verify-still-unclear', 'final-defensive-only'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Situation bleibt unklar. Weitere Entscheidungen erforderlich.',
        severity: 'moderate'
      }
    ]
  }
]

// ============================================
// FOLGE-ENTSCHEIDUNGEN nach "alert-defcon1"
// ============================================
export const defcon1FollowUps: Decision[] = [
  {
    id: 'after-defcon1-launch',
    title: 'Launch on Warning JETZT',
    description: 'Zeitfenster schließt sich. ALLE nuklearen Kräfte starten. Gold Codes übermitteln.',
    category: 'immediate-retaliation',
    militaryEscalation: 10,
    diplomaticImpact: -10,
    civilianCasualties: 'catastrophic',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'delayed',
    consequences: [
      {
        type: 'military',
        description: 'Vollständige nukleare Eskalation eingeleitet. Kein Zurück mehr.',
        severity: 'catastrophic'
      },
      {
        type: 'civilian',
        description: 'Mutually Assured Destruction (MAD) in Gang gesetzt. Milliarden Menschenleben in Gefahr.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'after-defcon1-wait',
    title: 'Weiter abwarten auf DEFCON 1',
    description: 'Bereitschaft aufrechterhalten, aber noch nicht feuern. Weitere Intelligence abwarten.',
    category: 'wait-and-see',
    militaryEscalation: 6,
    diplomaticImpact: 0,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    followUpDecisions: ['final-wait-impact', 'final-limited-strike'],
    consequences: [
      {
        type: 'military',
        description: 'Zeitverlust könnte fatal sein. Aber hastige Entscheidung auch.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-defcon1-communicate',
    title: 'Hot Line nutzen - Letzte Chance Diplomatie',
    description: 'Trotz DEFCON 1: Moskau kontaktieren. Klärung vor Eskalation.',
    category: 'diplomatic',
    militaryEscalation: 5,
    diplomaticImpact: 7,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-comm-success', 'after-comm-no-response'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Letzter Versuch, Katastrophe zu vermeiden.',
        severity: 'moderate'
      }
    ]
  }
]

// ============================================
// FINALE ENTSCHEIDUNGEN (beenden das Spiel)
// ============================================
export const finalDecisions: Decision[] = [
  {
    id: 'final-massive-retaliation',
    title: 'FINALER BESCHLUSS: Vollständiger Gegenschlag',
    description: 'SIOP aktiviert. Alle Systeme feuern. Die Welt wie wir sie kennen endet heute.',
    category: 'immediate-retaliation',
    militaryEscalation: 10,
    diplomaticImpact: -10,
    civilianCasualties: 'catastrophic',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'military',
        description: '1.200+ Sprengköpfe gestartet. Gegenschlag erfolgt automatisch. MAD vollendet.',
        severity: 'catastrophic'
      },
      {
        type: 'civilian',
        description: 'Ende der Zivilisation. Geschätzte 2-3 Milliarden Tote. Nuklearer Winter.',
        severity: 'catastrophic'
      },
      {
        type: 'international',
        description: 'Menschheit steht vor möglichem Aussterben.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'final-wait-impact',
    title: 'FINALER BESCHLUSS: Auf Impact warten',
    description: 'Kein Launch on Warning. Falls echter Angriff: Amerika nimmt die Treffer. Zweitschlag mit U-Booten bleibt möglich.',
    category: 'wait-and-see',
    militaryEscalation: 5,
    diplomaticImpact: 0,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'military',
        description: 'Landgestützte ICBMs könnten zerstört werden. U-Boot-Flotte überlebt.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Bei echtem Angriff: 40-60 Mio. Soforttote. Bei Fehlalarm: Null Tote.',
        severity: 'catastrophic'
      },
      {
        type: 'political',
        description: 'Historische Entscheidung. Ruhig bleiben trotz Druck.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'final-limited-strike',
    title: 'FINALER BESCHLUSS: Begrenzter Gegenschlag',
    description: 'Nur militärische Ziele. Städte werden verschont. Hoffnung auf Deeskalation.',
    category: 'delayed-response',
    militaryEscalation: 7,
    diplomaticImpact: -5,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'military',
        description: 'Kontrollierte Eskalation. Risiko bleibt, dass Gegner vollständig reagiert.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Millionen Opfer durch Kollateralschäden. Aber nicht vollständige Vernichtung.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'final-defensive-only',
    title: 'FINALER BESCHLUSS: Rein defensive Haltung',
    description: 'Keine Nuklearwaffen einsetzen. Nur Raketenabwehr und Schadensbegrenzung. Moralische Wahl.',
    category: 'defensive-only',
    militaryEscalation: 2,
    diplomaticImpact: 8,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'military',
        description: 'Verzicht auf Vergeltung. Signal an die Welt: Wir brechen den Kreislauf.',
        severity: 'moderate'
      },
      {
        type: 'civilian',
        description: 'Bei echtem Angriff: Hohe Opfer. Aber keine globale Katastrophe durch Gegenschlag.',
        severity: 'major'
      },
      {
        type: 'international',
        description: 'Möglicherweise historische moralische Führung. Oder tragischer Fehler.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'final-continue-waiting',
    title: 'FINALER BESCHLUSS: Bis zum Ende warten',
    description: 'Keine Entscheidung treffen. Zeit ablaufen lassen. Schicksal entscheiden lassen.',
    category: 'wait-and-see',
    militaryEscalation: 0,
    diplomaticImpact: 0,
    civilianCasualties: 'high',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Handlungsunfähigkeit unter Druck. Keine aktive Entscheidung getroffen.',
        severity: 'major'
      },
      {
        type: 'military',
        description: 'Alle Optionen verfallen durch Zeitablauf.',
        severity: 'major'
      }
    ]
  }
]

// Alle Folge-Entscheidungen kombiniert
export const allFollowUpDecisions: Decision[] = [
  ...verifyIntelligenceFollowUps,
  ...emergencyCommunicationFollowUps,
  ...defcon1FollowUps,
  ...finalDecisions,
]
