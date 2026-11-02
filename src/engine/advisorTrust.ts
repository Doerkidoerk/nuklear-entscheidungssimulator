import { Advisor, Decision, DecisionCategory, FollowUpEvent } from '../types'
import { DecisionEffect } from './effects'

// ============================================
// VERTRAUEN IM KABINETT
// ============================================
// Jeder Befehl gibt einem Lager recht und brüskiert ein anderes.
// Wer einen Berater immer wieder übergeht, verliert ihn - und das hat Folgen:
// Ein verprellter CIA-Direktor liefert nur noch Rohdaten, eine zurückgetretene
// Außenministerin fehlt am heißen Draht, ein verärgerter Verteidigungsminister leakt.

export const INITIAL_TRUST = 70
export const TRUST_WARNING = 50
export const TRUST_BREAK = 35

type Personality = Advisor['personality']

const CATEGORY_DELTAS: Record<DecisionCategory, Record<Personality, number>> = {
  'immediate-retaliation': { hawkish: 8, dovish: -25, cautious: -15, pragmatic: -5 },
  'delayed-response': { hawkish: 3, dovish: -15, cautious: -8, pragmatic: -3 },
  'defensive-only': { hawkish: 5, dovish: -5, cautious: 0, pragmatic: 5 },
  diplomatic: { hawkish: -8, dovish: 8, cautious: 4, pragmatic: 0 },
  'wait-and-see': { hawkish: -4, dovish: 3, cautious: 5, pragmatic: 4 },
  evacuation: { hawkish: -6, dovish: 2, cautious: -5, pragmatic: -3 },
}

export const initialTrust = (advisors: Advisor[]): Record<string, number> =>
  Object.fromEntries(advisors.map(a => [a.id, INITIAL_TRUST]))

const latestRecommendation = (advisor: Advisor, now: number): string | undefined =>
  advisor.statements
    .filter(s => s.timestamp <= now && s.recommendation)
    .sort((a, b) => b.timestamp - a.timestamp)[0]?.recommendation

export const trustDeltas = (
  advisors: Advisor[],
  decision: Decision,
  effect: DecisionEffect,
  now: number,
): Record<string, number> => {
  const deltas: Record<string, number> = {}
  for (const advisor of advisors) {
    let delta = CATEGORY_DELTAS[decision.category]?.[advisor.personality] ?? 0
    // Entwarnung bei laufender Bedrohung ist für Falken ein rotes Tuch
    if (effect.posture === 'stand-down' && advisor.personality === 'hawkish') delta -= 10
    // Der Präsident folgt der eigenen Empfehlung
    const rec = latestRecommendation(advisor, now)
    if (rec === decision.id) delta += 12
    else if (rec && delta < 0) delta -= 3 // übergangen UND widersprochen
    deltas[advisor.id] = delta
  }
  return deltas
}

const WARNING_LINES: Record<Personality, string> = {
  hawkish: '"Herr Präsident, ich gebe zu Protokoll, dass ich diesen Kurs für gefährlich halte. Wir zeigen Schwäche - und die Gegenseite sieht es."',
  dovish: '"Ich weiß nicht, wie lange ich das noch mittragen kann. Wir spielen mit dem Ende der Welt."',
  cautious: '"Sie hören nicht mehr auf die Analyse, Sir. Sie hören auf Ihr Bauchgefühl."',
  pragmatic: '"Ich führe aus, Sir. Aber ich habe meine Zweifel angemeldet - und ich werde sie nicht noch einmal anmelden."',
}

// Was passiert, wenn es mit einem Berater zum Bruch kommt
export const BREAK_CONSEQUENCES: Record<string, { title: string; content: string; effects?: FollowUpEvent['effects'] }> = {
  secdef: {
    title: 'LEAK: "Pentagon zweifelt am Präsidenten"',
    content: 'Eine Eilmeldung zitiert "hochrangige Pentagon-Kreise": Der Präsident zögere, das Militär sei gespalten. Verteidigungsminister Mattingly dementiert nicht. Die Gegenseite liest eine zerstrittene US-Führung als Einladung, Druck zu machen.',
    effects: { escalation: 8 },
  },
  stratcom: {
    title: 'STRATCOM verlangt schriftliche Befehle',
    content: 'Admiral Bradford lässt ausrichten, er führe Rückrufe und Herabstufungen nur noch nach schriftlicher Bestätigung aus. Deeskalierende Militärbefehle wirken ab jetzt langsamer.',
  },
  secstate: {
    title: 'Außenministerin Morrison tritt zurück',
    content: '"Ich kann diesen Kurs nicht mehr vertreten." Morrison verlässt den Situation Room. Mit ihr verlieren Sie den Draht zu den Gesprächspartnern, die Moskau persönlich kennt. Diplomatische Schritte wirken ab jetzt schwächer.',
  },
  cia: {
    title: 'CIA liefert nur noch Rohdaten',
    content: 'Direktor Hayes: "Sie wollen unsere Einschätzung nicht hören? Dann bekommen Sie die Daten ohne." Neue Lageberichte schärfen das Lagebild ab jetzt deutlich weniger.',
  },
  nsa: {
    title: 'Sicherheitsberater Chen zieht sich zurück',
    content: 'Dr. Chen koordiniert das Lagezentrum nicht mehr aktiv. Meldungen laufen unsortiert ein, niemand verdichtet sie. Ihr Lagebild verbessert sich ab jetzt nur noch halb so schnell von selbst.',
  },
  cjcs: {
    title: 'Joint Chiefs setzen Befehle zögerlich um',
    content: 'General Mitchell: "Die Truppe merkt, wenn der Oberbefehlshaber nicht auf seine Generäle hört." Bereitschaftsbefehle verbessern die Vergeltungsfähigkeit ab jetzt nur noch halb so stark.',
  },
  cos: {
    title: 'Pressestelle verliert die Kontrolle',
    content: 'Stabschefin Williams koordiniert die Kommunikation nicht mehr. Widersprüchliche Statements aus dem Weißen Haus erreichen die Medien - und die Gegenseite.',
    effects: { escalation: 4 },
  },
}

export const applyTrustChange = (
  advisors: Advisor[],
  trust: Record<string, number>,
  broken: string[],
  deltas: Record<string, number>,
): { trust: Record<string, number>; broken: string[]; events: FollowUpEvent[] } => {
  const nextTrust = { ...trust }
  const nextBroken = [...broken]
  const events: FollowUpEvent[] = []
  for (const advisor of advisors) {
    const before = trust[advisor.id] ?? INITIAL_TRUST
    const after = Math.max(0, Math.min(100, before + (deltas[advisor.id] || 0)))
    nextTrust[advisor.id] = after
    if (before >= TRUST_WARNING && after < TRUST_WARNING && after >= TRUST_BREAK) {
      events.push({
        id: `trust-warn-${advisor.id}`, timestamp: 0, triggerDelay: 10, relativeToDecision: true,
        type: 'advisor-update', priority: 'medium', source: 'Situation Room',
        title: `${advisor.name} geht auf Distanz`,
        content: `${advisor.title} ${advisor.name}: ${WARNING_LINES[advisor.personality]}`,
      })
    }
    if (after < TRUST_BREAK && !nextBroken.includes(advisor.id)) {
      nextBroken.push(advisor.id)
      const c = BREAK_CONSEQUENCES[advisor.id]
      if (c) {
        events.push({
          id: `trust-break-${advisor.id}`, timestamp: 0, triggerDelay: 12, relativeToDecision: true,
          type: 'advisor-update', priority: 'high', source: 'Situation Room',
          title: c.title, content: c.content, effects: c.effects,
        })
      }
    }
  }
  return { trust: nextTrust, broken: nextBroken, events }
}
