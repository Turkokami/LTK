/**
 * Agent progression: ranks, XP rules and achievements. Pure data, safe on server and client.
 *
 * Every visitor is an Agent (the community's own word, from the LTK tournament streams). XP is
 * earned for learning on the site — exams, games, field guides, the Daily Drop — never for
 * handing over data. Play-for-fun: no XP total is ever tied to a prize (REGISTRY R-18).
 */

export interface Rank {
  id: string;
  name: string;
  minXp: number;
  blurb: string;
}

export const RANKS: Rank[] = [
  { id: 'recruit', name: 'Recruit', minXp: 0, blurb: 'Fresh off the truck. Every Agent starts here.' },
  { id: 'field-agent', name: 'Field Agent', minXp: 500, blurb: 'You know your way around a route.' },
  { id: 'specialist', name: 'Specialist', minXp: 1500, blurb: 'The tech others call with the weird ones.' },
  { id: 'senior-agent', name: 'Senior Agent', minXp: 4000, blurb: 'Trains the new hires. Catches what they miss.' },
  { id: 'master', name: 'Master Exterminator', minXp: 9000, blurb: 'Knows the label, the biology and the building.' },
  { id: 'ltk', name: 'Licensed to Kill', minXp: 18000, blurb: 'The top of the board. Earned, not given.' },
];

export function rankFor(xp: number): { rank: Rank; index: number; next: Rank | null; progress: number } {
  let index = 0;
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i]!.minXp) index = i;
  const rank = RANKS[index]!;
  const next = RANKS[index + 1] ?? null;
  const progress = next ? (xp - rank.minXp) / (next.minXp - rank.minXp) : 1;
  return { rank, index, next, progress: Math.max(0, Math.min(1, progress)) };
}

/** XP table. Keep the numbers honest: reading a full field guide is worth more than a click. */
export const XP = {
  dailyComplete: 25,
  dailyCorrect: 50,
  dailyStreakPerDay: 10,
  dailyStreakCap: 100,
  examPerCorrect: { recall: 5, id: 8, applied: 12 } as Record<string, number>,
  examTimerMultiplier: { off: 1, standard: 1.25, fast: 1.5 } as Record<string, number>,
  gameScoreDivisor: 10,
  gameCap: 300,
  fieldGuideRead: 100,
  stateViewed: 10,
  glossaryKnown: 5,
  deckFinished: 50,
  vote: 5,
  videoPlayed: 25,
} as const;

/** Counters the achievements read. Keys are stable — they live in people's browsers. */
export type StatKey =
  | 'dailyDone'
  | 'dailyBestStreak'
  | 'examsDone'
  | 'fieldGuides'
  | 'states'
  | 'glossaryKnown'
  | 'decks'
  | 'votes'
  | 'videos'
  | 'bestSprint'
  | 'bestSpeed';

export interface Achievement {
  id: string;
  name: string;
  how: string;
  /** Unlocked when this returns true for the current stats and the triggering event. */
  test: (s: Record<StatKey, number>, e?: AgentEvent) => boolean;
}

/** What just happened, for achievements that look at a single result. */
export interface AgentEvent {
  kind: 'daily' | 'exam' | 'speed-round' | 'photo-id-sprint' | 'field' | 'state' | 'glossary' | 'deck' | 'vote' | 'video';
  score?: number;
  total?: number;
  correct?: number;
  level?: 'easy' | 'medium' | 'hard' | 'mixed';
  timer?: 'off' | 'standard' | 'fast';
  localHour?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-drop', name: 'First Drop', how: 'Finish your first Daily Drop.', test: (s) => s.dailyDone >= 1 },
  { id: 'streak-3', name: 'On a Roll', how: 'Hit a 3-day Daily Drop streak.', test: (s) => s.dailyBestStreak >= 3 },
  { id: 'streak-7', name: 'Week on the Route', how: 'Hit a 7-day Daily Drop streak.', test: (s) => s.dailyBestStreak >= 7 },
  { id: 'streak-30', name: 'Thirty Straight', how: 'Hit a 30-day Daily Drop streak.', test: (s) => s.dailyBestStreak >= 30 },
  { id: 'night-shift', name: 'Night Shift', how: 'Finish a Daily Drop between midnight and 4 a.m.', test: (_s, e) => e?.kind === 'daily' && (e.localHour ?? 12) < 4 },
  { id: 'first-exam', name: 'Sat the Exam', how: 'Finish any ACE practice exam.', test: (s) => s.examsDone >= 1 },
  { id: 'clean-sweep', name: 'Clean Sweep', how: 'Score 100% on a hard exam of 10 or more questions.', test: (_s, e) => e?.kind === 'exam' && e.level === 'hard' && (e.total ?? 0) >= 10 && e.correct === e.total },
  { id: 'beat-the-clock', name: 'Beat the Clock', how: 'Score 80% or better on a Pressure-timed exam.', test: (_s, e) => e?.kind === 'exam' && e.timer === 'fast' && (e.total ?? 0) >= 10 && (e.correct ?? 0) / (e.total ?? 1) >= 0.8 },
  { id: 'full-load', name: 'Full Load', how: 'Finish a 100-question exam.', test: (_s, e) => e?.kind === 'exam' && (e.total ?? 0) >= 100 },
  { id: 'lookalike-slayer', name: 'Lookalike Slayer', how: 'Score 90% or better on a 25-question medium exam.', test: (_s, e) => e?.kind === 'exam' && e.level === 'medium' && (e.total ?? 0) >= 25 && (e.correct ?? 0) / (e.total ?? 1) >= 0.9 },
  { id: 'sharp-eye', name: 'Sharp Eye', how: 'Score 1,000 or more in the Photo ID Sprint.', test: (s) => s.bestSprint >= 1000 },
  { id: 'speed-demon', name: 'Speed Demon', how: 'Score 1,500 or more in the ACE Speed Round.', test: (s) => s.bestSpeed >= 1500 },
  { id: 'field-scholar', name: 'Field Scholar', how: 'Read five field guides to the end.', test: (s) => s.fieldGuides >= 5 },
  { id: 'every-lane', name: 'Every Lane', how: 'Read all sixteen field guides to the end.', test: (s) => s.fieldGuides >= 16 },
  { id: 'glossary-50', name: 'Walking Glossary', how: 'Mark 50 glossary cards as known.', test: (s) => s.glossaryKnown >= 50 },
  { id: 'all-50', name: 'All 50', how: 'Open the licensing page for all 50 states.', test: (s) => s.states >= 50 },
  { id: 'deck-diver', name: 'Deck Diver', how: 'Finish three ACE slide decks.', test: (s) => s.decks >= 3 },
  { id: 'crowd-voice', name: 'Crowd Voice', how: 'Vote on ten pieces of gear.', test: (s) => s.votes >= 10 },
  { id: 'tuned-in', name: 'Tuned In', how: 'Play five podcast episodes or videos.', test: (s) => s.videos >= 5 },
];

/** Daily Drop numbering starts the day it launched. */
export const DAILY_EPOCH = '2026-10-03';
/** One drop per day, everywhere, on US Central time — the trade's working day. */
export const DAILY_TZ = 'America/Chicago';
