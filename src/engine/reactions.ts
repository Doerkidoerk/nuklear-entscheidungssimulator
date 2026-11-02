import { DecisionCategory, FollowUpEvent } from '../types'

// ============================================
// BERATER REAGIEREN AUF IHRE BEFEHLE
// ============================================
// Jeder Befehl hat Gegner im eigenen Raum. Die Stimmen widersprechen sich -
// es gibt niemanden, der Ihnen die Verantwortung abnimmt.

const lines: Record<DecisionCategory, string[]> = {
  diplomatic: [
    'Verteidigungsminister Mattingly, leise aber scharf: "Jede Minute am Telefon ist eine Minute, in der unsere Silos auf dem Präsentierteller stehen. Wenn die lügen, haben wir gerade unser Startfenster verplaudert."',
    'Admiral Bradford (STRATCOM): "Sir, ich respektiere die Diplomatie. Aber meine Uhren laufen weiter. Ich brauche bald eine Entscheidung, keine Gesprächsprotokolle."',
  ],
  'wait-and-see': [
    'Admiral Bradford (STRATCOM): "Verstanden, Sir. Ich weise darauf hin, dass sich das Launch-on-Warning-Fenster mit jeder Analyse-Minute schließt. Danach bleiben nur die U-Boote."',
    'Außenministerin Morrison: "Richtig so. Kennedy hat 1962 Zeit gekauft, nicht Raketen gestartet. Zeit ist das Einzige, was wir nicht zurückholen können - aber auch das Einzige, was Fehler verhindert."',
  ],
  'defensive-only': [
    'Außenministerin Morrison: "Herr Präsident, Moskau sieht startende Bomber - nicht unsere Absichten. Für deren Radar sieht Verteidigung exakt aus wie Angriffsvorbereitung."',
    'General Mitchell (Joint Chiefs): "Militärisch richtig, Sir. Was in der Luft ist, kann nicht am Boden zerstört werden. Aber die Gegenseite wird nachziehen."',
  ],
  'immediate-retaliation': [
    'Dr. Chen (Sicherheitsberater), blass: "Sir... wenn wir uns irren, gibt es niemanden mehr, der das korrigieren kann. Es gibt keinen Rückruf-Code für Interkontinentalraketen."',
    'Außenministerin Morrison steht auf: "Ich will zu Protokoll geben, dass ich widersprochen habe."',
  ],
  'delayed-response': [
    'Verteidigungsminister Mattingly: "Ein Warnschuss? Die werden das als Beginn lesen, nicht als Warnung."',
    'Dr. Chen: "Eine einzelne Detonation kann eine Botschaft sein - wenn der Empfänger noch zuhört."',
  ],
  evacuation: [
    'Stabschefin Williams: "Sir, 40 Millionen Menschen auf den Straßen, Panik, Unfälle. Und Moskau sieht eine Nation, die sich auf den Krieg vorbereitet. Das ist genau, was ein Erstschlag-Planer tun würde."',
  ],
}

export const getAdvisorReaction = (category: DecisionCategory, phase: number): FollowUpEvent | null => {
  const options = lines[category]
  if (!options || options.length === 0) return null
  const content = options[phase % options.length]
  return {
    id: `reaction-${category}`,
    timestamp: 0,
    triggerDelay: 6,
    relativeToDecision: true,
    type: 'advisor-update',
    priority: 'medium',
    source: 'Situation Room',
    title: 'Reaktion im Situation Room',
    content,
  }
}
