/**
 * arena.ts — tournaments and ladders.
 *
 * EMPTY pending REGISTRY R-18 (legal review of contest rules).
 *
 * The legal shape worth understanding before adding anything: a promotion generally becomes a
 * lottery when consideration, chance and prize all coincide, and state rules on skill-based
 * contests vary widely. Removing any one of the three usually resolves it — which is why
 * practice ladders and play-for-fun events, with no prize of value, can ship before the
 * championship does.
 *
 * Do not add an entry with a prize until R-18 is signed off by a person, not a code review.
 */

export interface Tournament {
  slug: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  online?: boolean;
  locationName?: string;
  free?: boolean;
}

export const TOURNAMENTS: Tournament[] = [];

/**
 * Game concepts, in build order. Identification first: it is the highest-frequency real skill,
 * it produces a clean score, and it is the one a technician will replay on a lunch break.
 *
 * Prototype ONE of these before committing to an engine — the answer to "does Next.js suffice
 * or does this need a separate app surface" changes the architecture, and it is cheaper to
 * learn now than after the Arena has content in it.
 */
export const GAME_BACKLOG = [
  { slug: 'id-run', name: 'Identification speed run', note: 'Timed species ID from photographs.' },
  { slug: 'inspection', name: 'Inspection challenge', note: 'Find the conducive conditions in a scene.' },
  { slug: 'label-check', name: 'Label check', note: 'Is this application legal? Read fast, answer faster.' },
  { slug: 'callback', name: 'Callback', note: 'Diagnose from the customer description alone.' },
] as const;
