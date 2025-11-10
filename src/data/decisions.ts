import { Decision } from '../types'
import { followUpEventsByDecision } from './followUpEvents'
import { allFollowUpDecisions } from './followUpDecisions'

// ============================================
// INITIALE HANDLUNGSOPTIONEN
// ============================================
// Basierend auf realistischen Krisenmanagement-Protokollen
// Gruppiert nach: Überleben, Verifikation, Militär, Kommunikation, Reaktion

export const initialDecisions: Decision[] = [
  // === KATEGORIE: VERIFIKATION & ANALYSE ===
  {
    id: 'verify-intelligence',
    title: 'Emergency Intelligence-Verifikation',
    description: 'SOFORTIGE Überprüfung aller Sensordaten durch redundante Systeme. NSA, CIA, NRO führen unabhängige Verifikation durch. Alle Satelliten, Radare, SIGINT cross-checken. Nach Sensor-Fehlfunktionen, Cyber-Manipulation oder technischen Anomalien suchen. Zeit: 2-4 Minuten. DEFCON 1 wird aufrechterhalten während Analyse.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 2,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['verify-intelligence'],
    followUpDecisions: ['after-verify-still-wait', 'after-verify-trust-intel', 'after-verify-communicate', 'after-verify-escalate-defcon'],
    consequences: [
      {
        type: 'military',
        description: 'Zeitverlust von 2-4 kritischen Minuten. Reduziert Launch on Warning Window. ABER: Bei Fehlalarm rettet diese Verzögerung die Welt.',
        severity: 'moderate'
      },
      {
        type: 'political',
        description: 'Verantwortungsvolle Entscheidung. Lehre aus Cuban Missile Crisis: Kennedy kaufte Zeit und rettete die Welt.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'realign-satellites',
    title: 'Spionagesatelliten neu ausrichten',
    description: 'NRO (National Reconnaissance Office) soll Keyhole/Lacrosse-Satelliten auf vermutete Startorte ausrichten für visuelle/radar Bestätigung. Benötigt 3-5 Minuten für Neuausrichtung und High-Res Imagery. Liefert definitive Beweise für echte Starts (Silo-Öffnungen, Rauchspuren, Krater). Zeitintensiv aber hochpräzise.',
    category: 'wait-and-see',
    militaryEscalation: 2,
    diplomaticImpact: 0,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['realign-satellites'],
    followUpDecisions: ['after-satellite-trust-visual', 'after-satellite-suspicion'],
    consequences: [
      {
        type: 'intelligence',
        description: 'Definitive visuelle Beweise in 3-5 Minuten. Aber Zeit könnte fehlen wenn echter Angriff.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'launch-recon-aircraft',
    title: 'Aufklärungsflugzeuge starten (RC-135)',
    description: 'RC-135 "Rivet Joint" SIGINT-Flugzeuge sofort starten für Echtzeit-Abhörung russischer Militärkommunikation. Können feindliche Radar-Aktivität, verschlüsselte Kommandos und Funkverkehr analysieren. Zeigt ob russisches Militär tatsächlich im Kriegsmodus ist oder ebenso überrascht. Start-Zeit: 4-6 Minuten bis operational.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 1,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['launch-recon-aircraft'],
    followUpDecisions: ['after-recon-trust-sigint', 'after-recon-still-suspicious'],
    consequences: [
      {
        type: 'intelligence',
        description: 'SIGINT-Daten können Absichten des Feindes offenbaren. Aber nicht instant verfügbar.',
        severity: 'minor'
      }
    ]
  },

  // === KATEGORIE: KOMMUNIKATION & DIPLOMATIE ===
  {
    id: 'emergency-communication',
    title: 'MOLINK - Heißer Draht zu Moskau',
    description: 'Moscow-Washington Direct Communications Link sofort aktivieren. Direkte Sprachverbindung + Backup Fax/Text. Fragen: "Was geschieht? Sind das Ihre Starts? Wie können wir deeskalieren?" Kann nuklearen Holocaust verhindern wenn Missverständnis. ABER: Zeitverlust könnte fatal sein bei echtem Angriff.',
    category: 'diplomatic',
    militaryEscalation: 1,
    diplomaticImpact: 8,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['emergency-communication'],
    followUpDecisions: ['after-comm-accept-data-exchange', 'after-comm-reject-russian-data', 'after-comm-demand-proof', 'after-comm-trust-shoigu', 'after-comm-mutual-recall', 'after-comm-mutual-stand-down'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Falls Missverständnis: Kann nuklearen Holocaust verhindern. Falls echter Angriff: Wertvoll Zeit verloren.',
        severity: 'minor'
      },
      {
        type: 'political',
        description: 'Zeigt Besonnenheit. Aber könnte als Schwäche ausgelegt werden.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'backchannels-activate',
    title: 'Rückkanäle über Drittstaaten',
    description: 'Schweiz, China oder andere neutrale Staaten nutzen um geheime Nachricht an Moskau zu übermitteln. Umgeht offizielle Kanäle die möglicherweise kompromittiert sind. Kann ehrliche Antwort liefern wenn regulärer MOLINK versagt. Benötigt 2-3 Minuten Setup.',
    category: 'diplomatic',
    militaryEscalation: 1,
    diplomaticImpact: 6,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'diplomatic',
        description: 'Alternative Kommunikationslinie falls Primärkanäle tot oder unglaubwürdig.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'contact-allies',
    title: 'NATO-Verbündete informieren',
    description: 'UK, Frankreich, Deutschland sofort informieren über die Lage. Fragen ob ihre Sensoren dasselbe zeigen. Koordinieren gemeinsame Reaktion. Möglicherweise haben britische/französische Systeme andere Daten. Benötigt 1-2 Minuten für verschlüsselte Konferenz.',
    category: 'diplomatic',
    militaryEscalation: 2,
    diplomaticImpact: 5,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['contact-allies'],
    followUpDecisions: ['after-allies-trust-uk', 'after-allies-use-french-nukes', 'after-allies-ignore-germany'],
    consequences: [
      {
        type: 'international',
        description: 'Allianz-Koordination. UK/Frankreich haben eigene Satelliten - unabhängige Datenquelle.',
        severity: 'minor'
      }
    ]
  },

  // === KATEGORIE: MILITÄRISCHE BEREITSCHAFT (Nicht-Nuklear) ===
  {
    id: 'alert-defcon1',
    title: 'DEFCON 1 - Maximale Alarmbereitschaft',
    description: 'Höchste Alarmstufe ausrufen. Alle Streitkräfte weltweit in Bereitschaft. Alle 400 Minuteman III HOT, 14 SSBNs bereit, Bomber auf Rollbahn. ABER: NOCH NICHT FEUERN. Alle Optionen offen halten. Signal an Gegner: Wir sind bereit. Kann abschreckend ODER eskalierend wirken.',
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
        description: 'Maximale Bereitschaft. Schnelle Reaktionsfähigkeit gesichert. Aber massiver Druck auf Personal.',
        severity: 'moderate'
      },
      {
        type: 'diplomatic',
        description: 'Signal an Gegner: USA sind handlungsbereit. Könnte Gegner abschrecken ODER provozieren.',
        severity: 'moderate'
      },
      {
        type: 'civilian',
        description: 'Emergency Alert System aktiviert. Massenpanik in der Bevölkerung wahrscheinlich.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'scramble-bombers',
    title: 'Bomber-Evakuierung (Scramble)',
    description: 'B-2 und B-52 Flotte SOFORT starten und zu sicheren Luftraum-Positionen fliegen. KEIN Angriffsbefehl - reine Überlebensmaßnahme. Verhindert Zerstörung am Boden. Bomber bleiben airborne, warten auf weitere Befehle. Kann später für Angriff OR friedliche Landung genutzt werden. Start-Zeit: 6-8 Minuten.',
    category: 'defensive-only',
    militaryEscalation: 4,
    diplomaticImpact: -2,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpEvents: followUpEventsByDecision['scramble-bombers'],
    followUpDecisions: ['after-scramble-recall-all', 'after-scramble-hold-pattern', 'after-scramble-arm-bombers', 'after-scramble-communicate'],
    consequences: [
      {
        type: 'military',
        description: 'Bomber überleben Erstschlag. Optionen bleiben offen. Aber: Gegner könnte es als Vorbereitung zum Angriff sehen.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'ssbn-deep-dive',
    title: 'U-Boot-Flotte auf maximale Tiefe',
    description: '14 Ohio-Class SSBNs gehen auf maximale operative Tiefe, reduzieren Kommunikation auf ELF (Extremely Low Frequency) Minimum, volle Angriffsbereitschaft. Macht sie nahezu unlokalisierbar. Sichert die ultimative Zweitschlagfähigkeit. Selbst wenn alles andere zerstört wird - U-Boote überleben.',
    category: 'defensive-only',
    militaryEscalation: 5,
    diplomaticImpact: 0,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Sicherung der assured destruction capability. U-Boote sind ultimative Lebensversicherung.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'activate-missile-defense',
    title: 'Raketenabwehr maximieren (GMD)',
    description: 'Ground-based Midcourse Defense auf Maximum. Alle 44 GBI (Ground-Based Interceptors) in Alaska/Kalifornien scharf machen. AEGIS-Schiffe mit SM-3 positionieren. THAAD-Batterien aktivieren. REALISTISCH: Max 30-40% Erfolgsrate gegen ICBMs. Aber besser als nichts. Kann einige Städte retten.',
    category: 'defensive-only',
    militaryEscalation: 2,
    diplomaticImpact: 0,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Begrenzte Abwehrfähigkeit. Gegen massive Salve fast nutzlos, aber kann einzelne RVs abfangen.',
        severity: 'moderate'
      },
      {
        type: 'civilian',
        description: 'Könnte einige Städte retten wenn Abwehr funktioniert. Keine Garantien.',
        severity: 'moderate'
      }
    ]
  },

  // === KATEGORIE: NUKLEARE REAKTION (Differenziert!) ===
  {
    id: 'wait-for-impact',
    title: 'Ride Out the Attack - Auf Impact warten',
    description: 'NICHT Launch on Warning autorisieren. Abwarten bis tatsächlicher Impact bestätigt ist, um Fehlalarme 100% auszuschließen. Alle Streitkräfte auf höchster Alarmbereitschaft, aber KEIN Abschuss. Falls echter Angriff: Zweitschlag mit überlebenden U-Booten möglich. Risiko: Verlust von Silos und C3I. Aber: Falls Fehlalarm: Welt gerettet.',
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
        description: 'Bei echtem Angriff: 60-70% der Minuteman III zerstört. ABER: 14 SSBNs überleben (1.120 Sprengköpfe) - ausreichend für glaubwürdigen Zweitschlag.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: 'Bei echtem Angriff: 40-60 Mio. Soforttote. Bei Fehlalarm: NULL Tote. Das ist die Wette.',
        severity: 'catastrophic'
      },
      {
        type: 'political',
        description: 'Historische Entscheidung wie Petrow 1983. Ruhig bleiben trotz Druck.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'counterforce-retaliation',
    title: 'Begrenzter Counterforce-Gegenschlag',
    description: 'NUR militärische Ziele: Russische ICBM-Silos, Bomber-Basen, U-Boot-Häfen, Kommandozentralen. Städte werden BEWUSST ausgespart. Ziel: Entwaffnung des Gegners, nicht Massenmord. Hält Eskalationsleiter offen für Verhandlungen. Geschätzt 200-300 Sprengköpfe gegen militärische Infrastruktur. Kollateralschäden: 5-15 Mio. Russen (Fallout von Militärbasen).',
    category: 'immediate-retaliation',
    militaryEscalation: 7,
    diplomaticImpact: -5,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    followUpEvents: followUpEventsByDecision['counterforce-retaliation'],
    followUpDecisions: ['after-cf-accept-putin-deal', 'after-cf-reject-escalate'],
    consequences: [
      {
        type: 'military',
        description: 'Gegner wird teilweise entwaffnet. ABER: Seine U-Boote und mobile Raketen überleben. Kann weiter eskalieren.',
        severity: 'major'
      },
      {
        type: 'civilian',
        description: '5-15 Mio. Tote durch direkte Treffer nahe Basen + Fallout. NICHT die totale Apokalypse, aber immer noch Massenmord.',
        severity: 'major'
      },
      {
        type: 'diplomatic',
        description: 'Signal: Wir reagieren kalkuliert, nicht mit totaler Vernichtung. Fenster für Deeskalation bleibt theoretisch offen.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'demonstration-strike',
    title: 'Demonstrativer Warnschlag',
    description: 'EINE einzelne Atomwaffe auf unbewohntes Gebiet. Optionen: (A) Novaya Zemlya (russische Testinsel, unbewohnt), (B) Sibirische Tundra 200km von nächster Stadt, (C) Arktischer Ozean. Ziel: Zeigen dass wir KÖNNEN und WERDEN - ohne Massenmord. Letzte Warnung vor totaler Eskalation. Technisch schwierig, politisch extrem riskant.',
    category: 'delayed-response',
    militaryEscalation: 6,
    diplomaticImpact: 3,
    civilianCasualties: 'none',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'military',
        description: 'Zeigt Entschlossenheit ohne Massenmord. Aber: Gegner könnte es als Schwäche sehen.',
        severity: 'moderate'
      },
      {
        type: 'diplomatic',
        description: 'Beispiellos. Könnte Gegner schockieren und zur Vernunft bringen. ODER ihn zur Eskalation provozieren.',
        severity: 'moderate'
      },
      {
        type: 'international',
        description: 'Erstmaliger Einsatz von Atomwaffen seit 1945. Globale Reaktion unvorhersehbar.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'immediate-full-retaliation',
    title: 'Launch on Warning - SIOP Vollständig',
    description: 'Aktivierung des vollen SIOP (Single Integrated Operational Plan). Übermittlung der Gold Codes. ALLE 400 Minuteman III, ALLE 14 SSBNs (280 Trident II), ALLE Bomber. Ziele: Russische Silos, Städte, Infrastruktur, Regierung. Geschätzt 1.200+ Sprengköpfe. Mutually Assured Destruction. Ende der menschlichen Zivilisation wahrscheinlich. DIES IST DIE APOKALYPSE-OPTION.',
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
        description: 'Vollständige nukleare Eskalation. Russische Zweitschlag-Fähigkeit feuert automatisch zurück. Komplette gegenseitige Vernichtung.',
        severity: 'catastrophic'
      },
      {
        type: 'civilian',
        description: 'Soforttote: 150 Mio. Russland, 200 Mio. USA/Europa. Langzeit: Nuklearer Winter. Geschätzte Gesamttote: 2-3 Milliarden (50% der Menschheit).',
        severity: 'catastrophic'
      },
      {
        type: 'international',
        description: 'Ende der modernen Zivilisation. Mögliches Aussterben der Menschheit.',
        severity: 'catastrophic'
      }
    ]
  },

  // === KATEGORIE: SPEZIAL-OPTIONEN ===
  {
    id: 'delegate-authority',
    title: 'Autorität delegieren (Decapitation-Szenario)',
    description: 'NUR bei drohender eigener Auslöschung: Vorab-Delegation nuklearer Autorität an STRATCOM Commander, Pacific Fleet Commander oder designated survivors. Ermöglicht Vergeltung NACH Ihrem Tod. Aktiviert "Dead Hand"-ähnliches Protokoll. Extrem gefährlich: Entscheidungsgewalt geht an Militär über.',
    category: 'wait-and-see',
    militaryEscalation: 8,
    diplomaticImpact: -4,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'political',
        description: 'Sichert Handlungsfähigkeit falls Sie getötet werden. Aber: Militär bekommt nukleare Entscheidungsgewalt ohne zivile Kontrolle.',
        severity: 'major'
      },
      {
        type: 'military',
        description: 'Garantiert Vergeltung auch nach Enthauptungsschlag. "You kill us, you die too."',
        severity: 'major'
      }
    ]
  },
  {
    id: 'evacuation-only',
    title: 'Zivile Evakuierung - Keine militärische Reaktion',
    description: 'Sofortige Evakuierung aller großen Städte und militärischen Einrichtungen anordnen. Emergency Alert System auf Maximum. KEINE militärische Aktion. Kompletter Verzicht auf Vergeltung. Moralische Entscheidung: Cycle of Violence beenden. Historisch beispiellos.',
    category: 'evacuation',
    militaryEscalation: 0,
    diplomaticImpact: 3,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'civilian',
        description: 'Kann Tausende bis Millionen Leben retten bei rechtzeitiger Evakuierung. Aber chaotisch und unvollständig.',
        severity: 'moderate'
      },
      {
        type: 'military',
        description: 'Keine militärische Eskalation. Aber kompletter Verzicht auf Abschreckung.',
        severity: 'major'
      },
      {
        type: 'political',
        description: 'Wird als Kapitulation wahrgenommen. Beispiellose moralische Führung ODER historische Schwäche.',
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
