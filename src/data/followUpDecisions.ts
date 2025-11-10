import { Decision } from '../types'

// ============================================
// FOLLOW-UP DECISIONS
// ============================================
// Jede initiale Entscheidung führt zu 3-5 neuen Optionen
// Mehrere Phasen tief bevor das Spiel endet

// ===========================================
// NACH: VERIFY INTELLIGENCE
// ===========================================
// Nach 4 Minuten Verifikation - Ergebnis: Unklar (55% echt, 45% Fehlalarm)
export const verifyIntelligenceFollowUps: Decision[] = [
  {
    id: 'after-verify-still-wait',
    title: 'Weiter warten auf definitive Beweise',
    description: 'Datenlage bleibt widersprüchlich. Weiter abwarten und auf klarere Signale hoffen. Risiko: Zeitverlust bei echtem Angriff. Vorteil: Fehlalarm-Schutz.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 1,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    followUpDecisions: ['final-wait-impact', 'final-limited-strike'],
    consequences: [
      {
        type: 'military',
        description: 'Weitere 3-4 Minuten verstreichen. Launch on Warning Window schließt sich.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-verify-trust-intel',
    title: 'Den 55% vertrauen - Counterforce Strike',
    description: 'Confidence Level 55% für echten Angriff. Militär rät: "Besser safe als sorry." Begrenzter Gegenschlag NUR auf russische Militärziele.',
    category: 'immediate-retaliation',
    militaryEscalation: 7,
    diplomaticImpact: -5,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'military',
        description: 'Handeln auf unsicherer Datenbasis. 45% Chance dass dies ein katastrophaler Fehler ist.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'after-verify-communicate',
    title: 'Verifikation gescheitert - MOLINK nutzen',
    description: 'Technik kann nicht entscheiden. Menschen müssen reden. Moskau jetzt kontaktieren und Daten austauschen.',
    category: 'diplomatic',
    militaryEscalation: 2,
    diplomaticImpact: 6,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-comm-accept-data-exchange', 'after-comm-reject-russian-data'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Technologie versagt - Menschlichkeit als letzte Hoffnung.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-verify-escalate-defcon',
    title: 'DEFCON 1 trotz Unsicherheit',
    description: 'Auch wenn unklar: Maximale Bereitschaft. Signal an Russland. Alle Optionen offen halten.',
    category: 'wait-and-see',
    militaryEscalation: 6,
    diplomaticImpact: -3,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-defcon1-launch', 'after-defcon1-wait', 'after-defcon1-communicate'],
    consequences: [
      {
        type: 'military',
        description: 'Bereitschaft ohne Eskalation. Aber nationale Panik wahrscheinlich.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// NACH: SCRAMBLE BOMBERS
// ===========================================
// Nach 4 Minuten: Russland hat AUCH Bomber gestartet - Eskalationsspirale!
export const scrambleBombersFollowUps: Decision[] = [
  {
    id: 'after-scramble-recall-all',
    title: 'ALLE Bomber zurückrufen - Deeskalieren',
    description: 'Wir haben eine Spirale ausgelöst. Fehler korrigieren. Bomber landen lassen und Moskau informieren: "War defensive Maßnahme, keine Aggression."',
    category: 'diplomatic',
    militaryEscalation: 2,
    diplomaticImpact: 5,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpDecisions: ['final-complete-deescalation'],
    consequences: [
      {
        type: 'military',
        description: 'Deeskalation. ABER: Falls echter Angriff, haben wir Bomber unnötig zurückgeholt.',
        severity: 'moderate'
      },
      {
        type: 'diplomatic',
        description: 'Signal der Zurückhaltung. Könnte Russland beruhigen.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-scramble-hold-pattern',
    title: 'Holding Pattern beibehalten',
    description: 'Bomber bleiben airborne, aber nicht näher an russische Grenze. Neutraler Raum. Weder Eskalation noch Rückzug.',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: 0,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-scramble-arm-bombers', 'after-scramble-recall-all'],
    consequences: [
      {
        type: 'military',
        description: 'Status Quo. Aber Treibstoff wird knapp. Max 6-8 Stunden haltbar.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-scramble-arm-bombers',
    title: 'Bomber bewaffnen - Nukleare Bereitschaft',
    description: 'B-2 und B-52 erhalten nukleare Bewaffnung. AGM-129 ACM und B83-Bomben aktivieren. Maximale Abschreckung. ABER: Russland wird dies sehen.',
    category: 'immediate-retaliation',
    militaryEscalation: 8,
    diplomaticImpact: -6,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'military',
        description: 'Russland wird Bewaffnung als finale Vorbereitung zum Angriff sehen. Weitere Eskalation wahrscheinlich.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-scramble-communicate',
    title: 'Moskau kontaktieren - Bomber-Spirale stoppen',
    description: 'Hot Line: "Wir haben Bomber gestartet aus Vorsicht. Sie auch. Beide sollten zurückrufen. Gemeinsam deeskalieren."',
    category: 'diplomatic',
    militaryEscalation: 3,
    diplomaticImpact: 7,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpDecisions: ['after-comm-mutual-recall', 'after-comm-no-response'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Versuch die Eskalationsspirale zu durchbrechen.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// NACH: EMERGENCY COMMUNICATION (MOLINK)
// ===========================================
// Nach 3 Minuten: Shoigu sagt "Wir haben NICHTS gestartet!" + bietet Datenaustausch
export const emergencyCommunicationFollowUps: Decision[] = [
  {
    id: 'after-comm-accept-data-exchange',
    title: 'Datenaustausch AKZEPTIEREN',
    description: 'Russische Satelliten-Rohdaten mit unseren vergleichen. Risiko: Falls sie manipuliert sind, könnten wir getäuscht werden. Chance: Echte Klarheit.',
    category: 'wait-and-see',
    militaryEscalation: 2,
    diplomaticImpact: 6,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    followUpDecisions: ['after-data-confirms-false', 'after-data-still-unclear'],
    consequences: [
      {
        type: 'intelligence',
        description: 'Gemeinsame Analyse könnte Wahrheit offenbaren. Oder uns in Falle locken.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-comm-reject-russian-data',
    title: 'Russische Daten ABLEHNEN - Vertrauen fehlt',
    description: 'Zu riskant. Ihre Daten könnten manipuliert sein. Wir verlassen uns NUR auf eigene Systeme.',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: -2,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['realign-satellites', 'wait-for-impact'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Signal des Misstrauens. Moskau könnte beleidigt reagieren.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-comm-demand-proof',
    title: 'Ultimatum: Moskau muss BEWEISEN keine Starts',
    description: 'Hot Line: "Wenn Sie WIRKLICH nichts gestartet haben, dann öffnen Sie Ihre Silos für unsere Satelliten. Live-Feed. Jetzt."',
    category: 'diplomatic',
    militaryEscalation: 5,
    diplomaticImpact: 2,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'diplomatic',
        description: 'Aggressive Forderung. Könnte funktionieren ODER Russland provozieren.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-comm-trust-shoigu',
    title: 'Shoigu VERTRAUEN - Entwarnung geben',
    description: 'Voice Stress Analysis zeigt 73% echte Überraschung. Wir glauben ihm. DEFCON zurück auf 3. Krise beendet.',
    category: 'diplomatic',
    militaryEscalation: 0,
    diplomaticImpact: 8,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Mut zum Vertrauen. Falls richtig: Sie haben die Welt gerettet. Falls falsch: Katastrophe.',
        severity: 'minor'
      }
    ]
  },
]

// ===========================================
// NACH: DEFCON 1
// ===========================================
// Nach 4 Minuten: Fast-Launch Incident, Russland ebenfalls DEFCON 1, nationale Panik
export const defcon1FollowUps: Decision[] = [
  {
    id: 'after-defcon1-launch',
    title: 'Launch on Warning JETZT',
    description: 'Beide Seiten auf DEFCON 1. Unfälle möglich jeden Moment. Feuern BEVOR sie feuern. Gold Codes übermitteln.',
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
        description: 'Präventivschlag bei DEFCON 1. Maximale Eskalation. Kein Zurück.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'after-defcon1-wait',
    title: 'Auf DEFCON 1 bleiben - Noch nicht feuern',
    description: 'Bereitschaft aufrechterhalten. Aber NOCH nicht feuern. Warten auf klarere Beweise.',
    category: 'wait-and-see',
    militaryEscalation: 6,
    diplomaticImpact: 0,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    followUpDecisions: ['final-wait-impact', 'final-limited-strike'],
    consequences: [
      {
        type: 'military',
        description: 'Unfallrisiko steigt jede Sekunde. Fast-Launch Incidents möglich.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-defcon1-communicate',
    title: 'DEFCON 1 + Hot Line - Paradoxe Strategie',
    description: 'Maximale militärische Bereitschaft UND maximale diplomatische Anstrengung. Moskau: "Wir sind bereit, aber wir WOLLEN reden."',
    category: 'diplomatic',
    militaryEscalation: 5,
    diplomaticImpact: 7,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['after-comm-mutual-stand-down', 'after-comm-no-response'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Zeigt Stärke UND Gesprächsbereitschaft. "Peace through Strength".',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-defcon1-downgrade',
    title: 'DEFCON 1 war Fehler - Zurück auf DEFCON 2',
    description: 'Fast-Launch Incident zeigt: DEFCON 1 ist zu gefährlich. Downgrade auf DEFCON 2. Reduziert Unfallrisiko.',
    category: 'diplomatic',
    militaryEscalation: 4,
    diplomaticImpact: 3,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'military',
        description: 'Sicherer, aber langsamer. Reaktionszeit steigt von 5 Min auf 15 Min.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// NACH: CONTACT ALLIES (NATO)
// ===========================================
// Nach 3 Minuten: UK teilt Daten (40% echt, 60% Fehlalarm), NATO gespalten
export const contactAlliesFollowUps: Decision[] = [
  {
    id: 'after-allies-trust-uk',
    title: 'UK-Daten vertrauen: 60% Fehlalarm',
    description: 'UK hat beste Satelliten außer uns. Ihre Analyse: 60% Fehlalarm. Wir deeskalieren basierend auf ihren Daten.',
    category: 'diplomatic',
    militaryEscalation: 2,
    diplomaticImpact: 5,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'international',
        description: 'Vertrauen in Allianz. Falls UK richtig liegt: Welt gerettet.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-allies-use-french-nukes',
    title: 'Frankreich bietet ihre Atomwaffen an',
    description: 'Französischer Président: "Unsere Force de Frappe steht bereit. Sie kommandieren." Symbolische Einheit + mehr Feuerkraft.',
    category: 'immediate-retaliation',
    militaryEscalation: 8,
    diplomaticImpact: 4,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    consequences: [
      {
        type: 'international',
        description: 'NATO-nukleare Einheit. Aber: Mehr Waffen = mehr Risiko.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-allies-ignore-germany',
    title: 'Deutschland ignorieren - Allein handeln',
    description: 'Deutschland will "Beweise". Wir haben keine Zeit. USA handelt allein ohne europäische Zustimmung.',
    category: 'wait-and-see',
    militaryEscalation: 5,
    diplomaticImpact: -4,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    consequences: [
      {
        type: 'international',
        description: 'NATO-Spaltung. Langfristige Allianz-Schäden möglich.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// NACH: REALIGN SATELLITES
// ===========================================
// Nach 4 Minuten: KH-11 findet 12 Starts visuell bestätigt, aber Diskrepanz zu 18-20
export const realignSatellitesFollowUps: Decision[] = [
  {
    id: 'after-satellite-trust-visual',
    title: '12 Starts = begrenzte Bedrohung',
    description: 'Visuelle Bestätigung: Nur 12 echte Starts. NICHT die 40+ die initial gemeldet wurden. Begrenzter Angriff. Counterforce-Response möglich.',
    category: 'immediate-retaliation',
    militaryEscalation: 6,
    diplomaticImpact: -3,
    civilianCasualties: 'medium',
    requiresConfirmation: true,
    followUpDecisions: ['final-limited-strike'],
    consequences: [
      {
        type: 'military',
        description: 'Angemessene Response auf begrenzten Angriff. Aber: Wo sind die anderen 6-8?',
        severity: 'major'
      }
    ]
  },
  {
    id: 'after-satellite-suspicion',
    title: 'Misstrauen: Wo sind die anderen Raketen?',
    description: '12 sichtbar, aber Sensoren meldeten mehr. THEORIE: Stealth-Raketen? U-Boot-Starts? Weitere Verifikation nötig.',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: 0,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['launch-recon-aircraft', 'emergency-communication'],
    consequences: [
      {
        type: 'intelligence',
        description: 'Gesunde Skepsis. Aber Zeit läuft ab.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// NACH: COUNTERFORCE RETALIATION
// ===========================================
// Nach 3,5 Minuten: Putin auf MOLINK: "STOP! Oder alle sterben!"
export const counterforceRetaliationFollowUps: Decision[] = [
  {
    id: 'after-cf-accept-putin-deal',
    title: 'Putins Angebot AKZEPTIEREN - Beidseitiger Stop',
    description: 'Hunderte Raketen in der Luft, aber Städte noch sicher. Beide Seiten stoppen weitere Starts. Nehmen Treffer hin, beenden es hier.',
    category: 'diplomatic',
    militaryEscalation: 5,
    diplomaticImpact: 8,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'military',
        description: 'Begrenzter nuklearer Krieg. 5-20 Mio Tote. Aber NICHT die totale Apokalypse.',
        severity: 'major'
      },
      {
        type: 'diplomatic',
        description: 'Historisches Abkommen mitten im Krieg. Beide Seiten zeigen Vernunft.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-cf-reject-escalate',
    title: 'Putin-Angebot ABLEHNEN - Alles feuern',
    description: 'Wir können nicht mehr zurück. Wenn wir stoppen, haben SIE militärischen Vorteil. ALLES feuern. Totale Eskalation.',
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
        description: 'Totale Vernichtung. Beide Seiten feuern alles. MAD vollendet.',
        severity: 'catastrophic'
      }
    ]
  },
]

// ===========================================
// NACH: LAUNCH RECON AIRCRAFT (RC-135)
// ===========================================
// Nach 4 Minuten: SIGINT zeigt russisches Militär verwirrt, kein Evakuierungs-Traffic
export const launchReconFollowUps: Decision[] = [
  {
    id: 'after-recon-trust-sigint',
    title: 'SIGINT vertrauen - Fehlalarm wahrscheinlich',
    description: 'Russisches Militär klingt verwirrt, nicht aggressiv. Keine Zivilschutz-Maßnahmen. Dies passt NICHT zu geplantem Angriff. Entwarnung.',
    category: 'diplomatic',
    militaryEscalation: 1,
    diplomaticImpact: 6,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'intelligence',
        description: 'SIGINT hat oft recht. Menschliche Stimmen lügen seltener als Maschinen.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-recon-still-suspicious',
    title: 'SIGINT könnte Täuschung sein',
    description: 'Clevere Täuschung würde GENAU so klingen. Professionelle Schauspieler auf Funkkanälen. Wir brauchen härtere Beweise.',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: 0,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['realign-satellites', 'emergency-communication'],
    consequences: [
      {
        type: 'intelligence',
        description: 'Paranoia oder Vorsicht? Schwer zu sagen.',
        severity: 'moderate'
      }
    ]
  },
]

// ===========================================
// FINALE ENTSCHEIDUNGEN (Multi-Path Endings)
// ===========================================
export const finalDecisions: Decision[] = [
  {
    id: 'final-massive-retaliation',
    title: 'FINALE: Vollständiger SIOP',
    description: 'Alle Zweifel beiseite. SIOP aktivieren. 1.200+ Sprengköpfe. Russland wird ausgelöscht. Wir auch.',
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
        description: 'MAD. Ende der Zivilisation. 2-3 Milliarden Tote.',
        severity: 'catastrophic'
      }
    ]
  },
  {
    id: 'final-wait-impact',
    title: 'FINALE: Bis zum Ende warten',
    description: 'Kein Launch on Warning. Warten bis Impact. Falls Fehlalarm: Welt gerettet. Falls echt: 40-60 Mio Tote, aber Zweitschlag mit U-Booten möglich.',
    category: 'wait-and-see',
    militaryEscalation: 5,
    diplomaticImpact: 0,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Mut wie Stanislaw Petrow 1983. Oder historischer Fehler.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'final-limited-strike',
    title: 'FINALE: Begrenzter Counterforce',
    description: 'NUR Militärziele. Städte verschonen. Hoffnung auf Deeskalation.',
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
        description: 'Kontrollierte Eskalation. Risiko: Gegner eskaliert trotzdem zu Städten.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'final-defensive-only',
    title: 'FINALE: Rein defensiv - Kein Nuklear-Einsatz',
    description: 'Moralische Entscheidung: Wir brechen den Kreislauf. Nur Raketenabwehr, keine Vergeltung.',
    category: 'defensive-only',
    militaryEscalation: 2,
    diplomaticImpact: 8,
    civilianCasualties: 'high',
    requiresConfirmation: true,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Beispiellose moralische Führung. Oder tragischer Fehler.',
        severity: 'major'
      }
    ]
  },
  {
    id: 'final-complete-deescalation',
    title: 'FINALE: Vollständige Deeskalation',
    description: 'Alle militärischen Maßnahmen zurücknehmen. DEFCON 3. Krise für beendet erklären.',
    category: 'diplomatic',
    militaryEscalation: 0,
    diplomaticImpact: 10,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'political',
        description: 'Totales Vertrauen. Falls richtig: Sie haben die Welt gerettet.',
        severity: 'minor'
      }
    ]
  },
  // Zusätzliche Endungen
  {
    id: 'after-data-confirms-false',
    title: 'Datenaustausch bestätigt: FEHLALARM',
    description: 'Russische und US-Daten combined: Definitiv Fehlalarm. Gemeinsame Entwarnung.',
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
        description: 'Kooperation rettet die Welt. Historischer Moment.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-data-still-unclear',
    title: 'Datenaustausch bringt keine Klarheit',
    description: 'Auch russische Daten sind widersprüchlich. Beide Seiten verwirrt. Sie müssen trotzdem entscheiden.',
    category: 'wait-and-see',
    militaryEscalation: 3,
    diplomaticImpact: 2,
    civilianCasualties: 'low',
    requiresConfirmation: false,
    followUpDecisions: ['final-wait-impact', 'final-limited-strike', 'final-defensive-only'],
    consequences: [
      {
        type: 'intelligence',
        description: 'Selbst Kooperation bringt keine Gewissheit. Fog of War bleibt.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 'after-comm-mutual-stand-down',
    title: 'Beidseitiger Stand-Down vereinbart',
    description: 'Putin stimmt zu: Beide von DEFCON 1 zurück. Schrittweise Deeskalation. Diplomatischer Sieg.',
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
        description: 'Verhandlungserfolg auf DEFCON 1. Beispiellos.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-comm-mutual-recall',
    title: 'Beidseitiger Bomber-Rückruf',
    description: 'USA und Russland rufen beide Bomber zurück. Eskalationsspirale gestoppt.',
    category: 'diplomatic',
    militaryEscalation: 2,
    diplomaticImpact: 8,
    civilianCasualties: 'none',
    requiresConfirmation: false,
    endsGame: true,
    gameEndingType: 'immediate',
    consequences: [
      {
        type: 'diplomatic',
        description: 'Symmetrische Deeskalation. Beide Seiten zeigen Vernunft.',
        severity: 'minor'
      }
    ]
  },
  {
    id: 'after-comm-no-response',
    title: 'Keine Antwort von Moskau - Weiter warten',
    description: 'Hot Line bleibt still. Entweder technisches Problem oder Moskau antwortet bewusst nicht. Warten oder handeln?',
    category: 'wait-and-see',
    militaryEscalation: 4,
    diplomaticImpact: -2,
    civilianCasualties: 'medium',
    requiresConfirmation: false,
    followUpDecisions: ['final-wait-impact', 'final-limited-strike'],
    consequences: [
      {
        type: 'diplomatic',
        description: 'Stille kann viele Bedeutungen haben. Alle schlecht.',
        severity: 'moderate'
      }
    ]
  },
]

// Alle Folge-Entscheidungen kombiniert
export const allFollowUpDecisions: Decision[] = [
  ...verifyIntelligenceFollowUps,
  ...scrambleBombersFollowUps,
  ...emergencyCommunicationFollowUps,
  ...defcon1FollowUps,
  ...contactAlliesFollowUps,
  ...realignSatellitesFollowUps,
  ...counterforceRetaliationFollowUps,
  ...launchReconFollowUps,
  ...finalDecisions,
]
