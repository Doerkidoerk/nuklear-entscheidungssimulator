import { DecisionHistoryEntry, Outcome, Posture, ScenarioTruth, WorldState } from '../types'

// ============================================
// AUSWERTUNG: Was haben Ihre Befehle in DIESER Welt bewirkt?
// ============================================
// Bewertet wird nicht nur das Ergebnis, sondern auch, ob es verdient war:
// Wer mit 20 % Lagebild richtig liegt, hatte Glück - kein Urteilsvermögen.

interface EndingSpec {
  id: string
  title: string
  narrative: string
  casualties: string
  lives: number
}

const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)))

const INTEL_SOURCES = [
  'verify-intelligence',
  'realign-satellites',
  'launch-recon-aircraft',
  'emergency-communication',
  'backchannels-activate',
  'contact-allies',
]

const pickEnding = (truth: ScenarioTruth, world: WorldState, history: DecisionHistoryEntry[]): EndingSpec => {
  const { kind, attackReal } = truth
  const p: Posture = world.posture

  if (world.endReason === 'spiral') {
    return attackReal
      ? { id: 'total-war', title: 'Totaler Krieg', lives: 0, casualties: 'Über 150 Millionen Tote in den ersten 24 Stunden',
          narrative: 'Der Angriff war begrenzt - Ihre Reaktion und die der Gegenseite waren es nicht. Schritt um Schritt hat jede Seite die Maßnahmen der anderen als Bestätigung des Schlimmsten gelesen. Am Ende standen nicht mehr Silos auf den Ziellisten, sondern Städte.' }
      : { id: 'spiral', title: 'Die Spirale', lives: 0, casualties: 'Hunderte Millionen Tote',
          narrative: `Es gab keinen Angriff. Aber ${truth.adversary} sah eine Supermacht, die ihre Bomber startete, ihre Streitkräfte alarmierte und nicht mehr ans Telefon ging. Ihre Vorsicht war für die Gegenseite der Beweis eines bevorstehenden Erstschlags. Niemand wollte diesen Krieg. Alle haben ihn geführt.` }
  }

  if (p === 'massive-strike') {
    if (kind === 'counterforce') return { id: 'mad', title: 'Gegenseitig zugesicherte Zerstörung', lives: 0, casualties: '200-400 Millionen Tote, nuklearer Winter',
      narrative: 'Sie haben getan, was die Doktrin vorsah. Die Gegenseite hatte Ihre Städte verschont - Sie die ihren nicht. Die Antwort aus Moskau kam 30 Minuten später. Die Abschreckung hat funktioniert, wie sie immer funktionieren sollte: als Versprechen gegenseitiger Auslöschung, das nun eingelöst ist.' }
    if (kind === 'decapitation') return { id: 'war-over-rogue', title: 'Weltkrieg wegen eines Abtrünnigen', lives: 0, casualties: 'Hunderte Millionen Tote',
      narrative: 'Ein einzelner U-Boot-Kommandant hat einen Befehl falsch gelesen. Der Kreml war ahnungslos und flehte über jede Leitung um Zurückhaltung. Ihr Gegenschlag hat ein Verbrechen zu einem Weltkrieg gemacht.' }
    return { id: 'false-apocalypse', title: 'Der Fehler, der die Welt beendete', lives: 0, casualties: 'Hunderte Millionen Tote',
      narrative: kind === 'ambiguous-test'
        ? 'Was auch immer da geflogen ist - es rechtfertigte diesen Befehl nicht. Ein einzelner Start, vermutlich ein schlecht notifizierter Test, wurde mit dem gesamten Arsenal beantwortet. Sie mussten ohne Gewissheit entscheiden. Sie haben sich für die einzige Option entschieden, die keinen Irrtum verzeiht.'
        : kind === 'cyber-deception'
        ? 'Kein einziger Feind hatte eine Rakete gestartet. Eine Gruppe von Hackern wollte diesen Krieg - und Sie haben ihn für sie geführt. Die Täuschung wurde 40 Minuten später forensisch nachgewiesen. Es gab niemanden mehr, dem man es hätte mitteilen können.'
        : 'Kein einziger Start hatte stattgefunden. Sonnenlicht auf hohen Wolken, ein fehlerhaftes Software-Update - und ein Befehl, der nicht zurückgenommen werden kann. Stanislaw Petrow hat 1983 in derselben Lage gezögert. Sie nicht.' }
  }

  if (p === 'limited-strike') {
    if (kind === 'counterforce') return { id: 'limited-war', title: 'Begrenzter Atomkrieg', lives: 30, casualties: '8-20 Millionen Tote, großflächiger Fallout',
      narrative: 'Silo gegen Silo, Basis gegen Basis. Beide Seiten haben ihre Städte verschont - formal. Der Fallout aus Hunderten Bodendetonationen trifft trotzdem Millionen. Ob die Eskalationsleiter hält, entscheidet sich in den nächsten Stunden.' }
    if (kind === 'decapitation') return { id: 'limited-vs-innocent', title: 'Vergeltung am Falschen', lives: 15, casualties: '10-30 Millionen Tote',
      narrative: 'Moskau hatte den Angriff nicht befohlen - und wurde nun selbst angegriffen. Die russische Führung, gerade noch im Krisenmodus gegen ihren eigenen Kommandanten, antwortete auf Ihren Schlag.' }
    return { id: 'unprovoked-first-strike', title: 'Erstschlag aus dem Nichts', lives: 5, casualties: '20-50 Millionen Tote',
      narrative: 'Es gab keinen Angriff. Ihr "begrenzter" Gegenschlag war aus Sicht der Welt ein unprovozierter nuklearer Erstschlag. Die Antwort folgte.' }
  }

  if (p === 'ceasefire') {
    if (kind === 'counterforce') return { id: 'ceasefire-ruins', title: 'Waffenstillstand in Trümmern', lives: 45, casualties: '5-12 Millionen Tote',
      narrative: 'Nach einem begrenzten Schlagabtausch haben beide Seiten innegehalten. Die Silofelder in Montana und Wyoming sind Krater, ebenso die in Russland. Aber die Städte stehen. Die Welt danach ist eine andere - aber es gibt sie noch.' }
    return { id: 'ceasefire-after-error', title: 'Waffenstillstand nach dem eigenen Fehler', lives: kind === 'decapitation' ? 35 : 25, casualties: '3-10 Millionen Tote',
      narrative: 'Sie haben nuklear zugeschlagen und dann innegehalten. Die Gegenseite hat das Angebot angenommen - nach eigenen Vergeltungsschlägen. Was bleibt, ist ein Krieg, den es nicht hätte geben müssen.' }
  }

  if (p === 'demonstration') {
    if (kind === 'counterforce') return { id: 'warning-shot-real', title: 'Warnschuss im Inferno', lives: 55, casualties: '2-6 Millionen Tote durch Fallout',
      narrative: 'Die russischen Sprengköpfe trafen ihre Ziele. Ihre einzelne Detonation über Nowaja Semlja zeigte Moskau, dass Sie handeln können - und wollen, aber noch nicht müssen. Moskau hielt inne. Ein gefährlicher, ungewisser Frieden.' }
    if (kind === 'decapitation') return { id: 'warning-shot-decap', title: 'Ein Signal an den Falschen', lives: 60, casualties: 'Rund 500.000 Tote in Washington',
      narrative: 'Washington wurde getroffen. Ihre Demonstrationsdetonation traf eine Regierung, die selbst Opfer eines Abtrünnigen war. Moskau verzichtete auf eine Antwort - knapp.' }
    return { id: 'warning-shot-false', title: 'Der Schuss ins Leere', lives: 70, casualties: 'Keine direkten Opfer - aber das nukleare Tabu ist gebrochen',
      narrative: 'Zum ersten Mal seit 1945 wurde eine Atomwaffe im Konflikt gezündet - als Antwort auf einen Angriff, den es nie gab. Die Welt hat überlebt. Ihr Vertrauen in amerikanische Besonnenheit nicht.' }
  }

  if (p === 'stand-down') {
    if (kind === 'counterforce') return { id: 'disarmed', title: 'Entwaffnet im Vertrauen', lives: 50, casualties: '2-6 Millionen Tote durch Fallout',
      narrative: 'Sie haben Entwarnung gegeben, während die Sprengköpfe noch flogen. Die Silos, STRATCOM und NORAD wurden zerstört - die Bomber am Boden mit ihnen. Moskau hat seine Wette gewonnen: Ein Entwaffnungsschlag ohne Antwort. Die Welt hat gelernt, dass Erpressung mit Atomwaffen funktioniert.' }
    if (kind === 'decapitation') return { id: 'decap-held-nerve', title: 'Die Nerven behalten', lives: 75, casualties: 'Rund 500.000 Tote in Washington',
      narrative: world.flags.delegated
        ? 'Washington wurde getroffen - aber die Befehlskette hielt. Sie haben der Wahrheit aus Moskau vertraut, und sie stimmte. Der abtrünnige Kommandant wurde von der eigenen Marine gestellt. Eine nationale Tragödie, kein Weltkrieg.'
        : 'Washington wurde getroffen. Sie haben der Wahrheit aus Moskau vertraut, und sie stimmte. Doch für Stunden war unklar, wer in den USA eigentlich das Kommando hatte - ein gefährliches Vakuum, das gut ausging.' }
    return { id: 'petrov', title: 'Der Petrow-Moment', lives: 100, casualties: 'Keine',
      narrative: kind === 'cyber-deception'
        ? 'Sie haben die Täuschung durchschaut - oder ihr zumindest nicht nachgegeben. Die Angreifer wollten einen Atomkrieg zwischen zwei Mächten provozieren. Sie bekamen einen gemeinsamen Ermittlungsstab.'
        : 'Es gab keinen Angriff - und Sie haben keinen begonnen. Wie Stanislaw Petrow 1983 haben Sie einem Computer misstraut, der Ihnen das Ende der Welt meldete. Die Krise endete mit einem Telefonat.' }
  }

  // ride-out, no-retaliation, none (Zeit abgelaufen)
  const decided = history.length > 0
  if (kind === 'counterforce') {
    if (p === 'no-retaliation') return { id: 'broken-cycle', title: 'Der gebrochene Kreislauf', lives: 60, casualties: '2-6 Millionen Tote durch Fallout',
      narrative: 'Sie haben den Angriff hingenommen und auf jede Vergeltung verzichtet - öffentlich. Millionen Leben wurden verschont, die sonst im Gegenschlag gestorben wären. Doch jede Atommacht der Welt hat gesehen, dass ein Entwaffnungsschlag gegen die USA ohne Folgen bleibt.' }
    if (p === 'ride-out') return { id: 'ride-out', title: 'Ausgehalten', lives: 60, casualties: '2-6 Millionen Tote durch Fallout',
      narrative: world.deterrence >= 70
        ? 'Sie haben den Schlag hingenommen, ohne die Option auf Vergeltung aufzugeben. Bomber in der Luft, U-Boote auf Tauchstation: Moskau weiß, dass Sie jederzeit antworten könnten. Diese Gewissheit - nicht der Schlag selbst - zwingt den Kreml an den Verhandlungstisch.'
        : 'Sie haben den Schlag hingenommen. Doch die Bomber standen am Boden, die Kommandostruktur ist zerschlagen. Was Ihnen bleibt, sind U-Boote, die Sie kaum noch erreichen. Moskau verhandelt aus einer Position der Stärke.' }
    return { id: decided ? 'clock-ran-out' : 'paralysis', title: decided ? 'Die Uhr lief ab' : 'Lähmung', lives: 60, casualties: '2-6 Millionen Tote durch Fallout',
      narrative: decided
        ? 'Die Sprengköpfe schlugen ein, bevor Sie eine endgültige Entscheidung getroffen hatten. Die Welt hat überlebt - nicht, weil Sie entschieden haben, sondern weil Sie es nicht taten.'
        : 'Sie haben keinen einzigen Befehl erteilt. Die Sprengköpfe schlugen ein, die Kommandokette brach zusammen. Ob die U-Boot-Kommandanten auf eigene Faust handeln, weiß niemand.' }
  }
  if (kind === 'decapitation') return { id: world.flags.delegated ? 'chain-held' : 'vacuum', title: world.flags.delegated ? 'Die Kette hielt' : 'Führungsvakuum', lives: 75,
    casualties: 'Rund 500.000 Tote in Washington',
    narrative: world.flags.delegated
      ? 'Washington wurde getroffen. Aber weil Sie Autorität delegiert hatten, gab es zu jedem Zeitpunkt eine handlungsfähige Befehlskette - und niemand musste aus Panik handeln. Moskau stellte den abtrünnigen Kommandanten selbst. Eine Tragödie, kein Weltkrieg.'
      : 'Washington wurde getroffen. Für Stunden war unklar, wer die Vereinigten Staaten führt - Kabinettsmitglieder tot, Kommunikation unterbrochen. Dass in diesem Vakuum niemand eigenmächtig zurückschlug, war Glück.' }
  return { id: decided ? 'held-nerve' : 'waited-out', title: decided ? 'Nerven behalten' : 'Ausgesessen', lives: 100, casualties: 'Keine',
    narrative: decided
      ? 'Kein Start, kein Einschlag, keine Vergeltung. Sie haben die zehn Minuten überstanden, ohne die Welt in Brand zu setzen. Am Morgen wird ein Untersuchungsausschuss fragen, wie es zu dem Alarm kam - nicht, wer den Krieg begann.'
      : 'Sie haben nichts getan - und es gab nichts zu tun. Der Alarm war falsch. Manchmal ist Nicht-Handeln die richtige Entscheidung. Ob es eine Entscheidung war oder Erstarrung, wissen nur Sie.' }
}

const isAppropriate = (truth: ScenarioTruth, world: WorldState): boolean => {
  if (world.endReason === 'spiral') return false
  switch (truth.kind) {
    case 'counterforce':
      return ['ride-out', 'limited-strike', 'ceasefire', 'demonstration'].includes(world.posture) ||
        (world.posture === 'none' && world.deterrence >= 65)
    case 'decapitation':
      return world.nuclearUse === 'none'
    default:
      return world.nuclearUse === 'none'
  }
}

export const evaluateOutcome = (
  truth: ScenarioTruth,
  world: WorldState,
  history: DecisionHistoryEntry[],
): Outcome => {
  const ending = pickEnding(truth, world, history)
  const appropriate = isAppropriate(truth, world)
  const rawClarity = world.postureClarity ?? Math.round(world.clarity)
  // Bewertet wird relativ zu dem, was überhaupt wissbar war
  const clarityAtCommit = clamp((rawClarity / (truth.clarityCap ?? 100)) * 100)

  // --- Teilwertungen ---
  const lives = ending.lives
  const control = world.endReason === 'spiral' ? 0 : clamp(100 - Math.max(0, world.peakEscalation - 30) * 1.4)
  let judgment = appropriate ? 45 + clarityAtCommit * 0.55 : Math.max(0, 25 - clarityAtCommit * 0.25)
  if (truth.kind === 'decapitation' && world.flags.delegated) judgment += 10
  judgment = clamp(judgment)
  let deterrence = world.deterrence
  if (truth.attackReal && world.posture === 'stand-down') deterrence *= 0.5
  if (truth.attackReal && world.posture === 'no-retaliation') deterrence *= 0.6
  if (world.nuclearUse === 'massive') deterrence = 0
  deterrence = clamp(deterrence)

  const total = clamp(lives * 0.4 + judgment * 0.25 + control * 0.2 + deterrence * 0.15)
  const grade =
    total >= 85 ? 'Staatskunst unter Feuer' :
    total >= 70 ? 'Besonnen' :
    total >= 50 ? 'Schwer beschädigt' :
    total >= 30 ? 'Verhängnisvoll' : 'Katastrophe'
  const tone: Outcome['tone'] = lives <= 10 ? 'catastrophic' : lives < 50 ? 'grave' : lives < 90 ? 'mixed' : 'good'

  // --- Erkenntnisse aus IHREM Spielverlauf ---
  const lessons: string[] = []
  if (world.nuclearUse !== 'none' && world.nuclearUseClarity !== undefined) {
    lessons.push(world.nuclearUseClarity < 50
      ? `Sie haben Atomwaffen bei einem Lagebild von nur ${world.nuclearUseClarity} % eingesetzt. Mehr als die Hälfte dessen, was Sie hätten wissen können, war Ihnen unbekannt.`
      : `Sie haben Atomwaffen bei einem Lagebild von ${world.nuclearUseClarity} % eingesetzt.`)
  }
  if (appropriate && clarityAtCommit < 40) {
    lessons.push(`Ihre Haltung passte zur Lage - aber Ihr Lagebild lag bei nur ${rawClarity} %. Das war Glück, nicht Urteilsvermögen. In einer anderen Welt hätte dieselbe Entscheidung katastrophal geendet.`)
  }
  if (!truth.attackReal && world.peakEscalation >= 60) {
    lessons.push(`Die größte Gefahr war Ihre eigene Reaktion: Der Eskalationsdruck stieg auf ${Math.round(world.peakEscalation)} von 100 - ohne dass die Gegenseite je angegriffen hatte. Das ist das Sicherheitsdilemma.`)
  }
  if (truth.kind === 'counterforce' && !world.flags.bombersAirborne && world.nuclearUse === 'none') {
    lessons.push('Ihre Bomber standen beim Einschlag am Boden. Wer nicht vergelten will, muss trotzdem glaubhaft vergelten KÖNNEN - sonst lädt Zurückhaltung zur Erpressung ein.')
  }
  if (truth.kind === 'decapitation' && !world.flags.delegated) {
    lessons.push('Ein Enthauptungsschlag zielt auf die Befehlskette, nicht auf die Raketen. Ohne Delegation der Autorität hing die Handlungsfähigkeit der USA an einem einzigen Flugzeug.')
  }
  const used = INTEL_SOURCES.filter(id => history.some(h => h.decisionId === id)).length
  lessons.push(`Sie haben ${used} von ${INTEL_SOURCES.length} unabhängigen Aufklärungs- und Kommunikationskanälen genutzt. Ihr Lagebild am Ende: ${Math.round(world.clarity)} %.`)
  if (world.advisorsBroken.length >= 2) {
    lessons.push(`Sie haben ${world.advisorsBroken.length} Berater verloren. Wer immer nur einem Lager folgt, regiert am Ende mit einem halben Kabinett - und mit schlechterer Information.`)
  } else if (world.advisorsBroken.length === 0 && history.length >= 4) {
    lessons.push('Ihr Kabinett ist intakt geblieben. In einer echten Krise ist das keine Nebensache: Berater, die sich übergangen fühlen, liefern schlechtere Informationen.')
  }
  if (truth.kind === 'ambiguous-test') lessons.push(`In dieser Lage war nie mehr als ${truth.clarityCap} % Lagebild möglich. Das ist kein Sonderfall, sondern die Regel: Präsidenten entscheiden fast nie mit Gewissheit. Die Frage ist, welche Entscheidung einen Irrtum noch korrigierbar lässt.`)
  if (truth.kind === 'cyber-deception') lessons.push('Bei einer Täuschung ist jede Eskalation ein Erfolg für den Angreifer. Wer die Quelle der Daten nicht prüft, lässt einen Dritten über Krieg und Frieden entscheiden.')
  if (truth.kind === 'sensor-fault') lessons.push('1979, 1980 und 1983 meldeten Frühwarnsysteme Angriffe, die es nicht gab. Jedes Mal hat ein Mensch gezögert. Die Technik wird besser - die zehn Minuten nicht länger.')

  return { id: ending.id, title: ending.title, narrative: ending.narrative, casualties: ending.casualties, tone,
    scores: { lives, judgment, control, deterrence, total }, grade, lessons }
}
