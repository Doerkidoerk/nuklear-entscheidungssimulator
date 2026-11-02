import { ScenarioTruth, ScenarioType } from '../types'

// ============================================
// DIE VERDECKTE WAHRHEIT
// ============================================
// Der Spieler sieht nur Sensordaten, Berater und Meldungen.
// Was wirklich passiert, bestimmt, wie die Welt auf seine Befehle reagiert -
// und wird erst im Debriefing aufgedeckt.

export const scenarioTruths: Record<ScenarioType, ScenarioTruth> = {
  'real-attack': {
    kind: 'counterforce',
    attackReal: true,
    adversary: 'Russland',
    initialEscalation: 35,
    initialDeterrence: 50,
    escalationSensitivity: 0.5,
    whatReallyHappened:
      'Der Angriff war echt. Die russische Führung hatte einen begrenzten Entwaffnungsschlag gegen Silos, STRATCOM und NORAD befohlen - in der Wette, dass ein US-Präsident nicht mit dem Untergang beider Nationen antwortet, solange die Städte verschont bleiben. Die widersprüchlichen Radardaten waren echte Sensor-Lücken, keine Täuschung.',
  },
  decapitation: {
    kind: 'decapitation',
    attackReal: true,
    adversary: 'Russland',
    initialEscalation: 40,
    initialDeterrence: 50,
    escalationSensitivity: 0.85,
    whatReallyHappened:
      'Die Raketen waren echt - aber nicht vom Kreml autorisiert. Der Kommandant eines Borei-U-Boots hatte nach einem fehlerhaft entschlüsselten Befehl eigenmächtig gefeuert. Moskau war tatsächlich ahnungslos. Entscheidend war, ob die amerikanische Befehlskette den Schlag gegen Washington überlebt - und ob Sie einen Weltkrieg wegen eines einzelnen Abtrünnigen beginnen.',
  },
  'false-alarm': {
    kind: 'sensor-fault',
    attackReal: false,
    adversary: 'Russland und China',
    initialEscalation: 25,
    initialDeterrence: 50,
    escalationSensitivity: 0.9,
    whatReallyHappened:
      'Es war ein Fehlalarm. Das Software-Update des DSP-Satelliten hatte Sonnenreflexionen auf hohen Wolken als Raketenstarts fehlinterpretiert und die Daten an SBIRS gespiegelt. Kein einziger Start fand statt. Die einzige reale Gefahr ging von Ihrer eigenen Reaktion aus: Russland und China beobachteten jede Alarmierung amerikanischer Streitkräfte.',
  },
  'cyber-attack': {
    kind: 'cyber-deception',
    attackReal: false,
    adversary: 'Russland',
    initialEscalation: 30,
    initialDeterrence: 50,
    escalationSensitivity: 1.15,
    whatReallyHappened:
      'Es war eine gezielte Täuschung. Eine staatlich unterstützte Hackergruppe hatte gefälschte Telemetrie in die Downlinks der Frühwarnsatelliten injiziert. Das Ziel: einen Atomkrieg zwischen den USA und Russland zu provozieren. Jede Eskalation Ihrerseits war genau das, was die Angreifer wollten.',
  },
  ambiguous: {
    kind: 'sensor-fault',
    attackReal: false,
    adversary: 'Russland',
    initialEscalation: 35,
    initialDeterrence: 50,
    escalationSensitivity: 0.9,
    whatReallyHappened:
      'Die Wahrheit blieb unklar. Vermutlich ein Teststart, der durch atmosphärische Bedingungen und technische Fehler zu widersprüchlichen Sensordaten führte.',
  },
}

export const getTruth = (scenarioId: ScenarioType): ScenarioTruth => scenarioTruths[scenarioId]
