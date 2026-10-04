import { DAILY_TZ, type AgentEvent } from './config';

/**
 * Weekly missions: three goals a week, the same for every Agent, reset Monday 00:00 US Central.
 * One from each lane (daily habit, study, games) so a week rewards a bit of everything.
 * Pure data and pure functions — used by the engine on both the browser and the server.
 */

export interface Mission {
  id: string;
  lane: 'daily' | 'study' | 'game';
  title: string;
  /** Counter the mission reads (see missionKeys). */
  key: string;
  target: number;
  xp: number;
}

export const MISSION_POOL: Mission[] = [
  { id: 'daily-3', lane: 'daily', title: 'Play 3 Daily Drops', key: 'daily', target: 3, xp: 100 },
  { id: 'daily-5', lane: 'daily', title: 'Play 5 Daily Drops', key: 'daily', target: 5, xp: 175 },
  { id: 'daily-perfect-2', lane: 'daily', title: 'Get 2 Daily Drops fully right', key: 'daily-perfect', target: 2, xp: 150 },
  { id: 'exam-2', lane: 'study', title: 'Finish 2 ACE practice exams', key: 'exam', target: 2, xp: 100 },
  { id: 'exam-hard', lane: 'study', title: 'Finish a hard ACE exam', key: 'exam-hard', target: 1, xp: 125 },
  { id: 'exam-timed', lane: 'study', title: 'Finish a timed ACE exam', key: 'exam-timed', target: 1, xp: 100 },
  { id: 'field-1', lane: 'study', title: 'Read a field guide to the end', key: 'field', target: 1, xp: 75 },
  { id: 'glossary-10', lane: 'study', title: 'Mark 10 glossary cards as known', key: 'glossary', target: 10, xp: 75 },
  { id: 'deck-1', lane: 'study', title: 'Finish an ACE slide deck', key: 'deck', target: 1, xp: 75 },
  { id: 'game-3', lane: 'game', title: 'Play 3 Arena games', key: 'game', target: 3, xp: 100 },
  { id: 'sprint-800', lane: 'game', title: 'Score 800+ in Photo ID Sprint', key: 'sprint-800', target: 1, xp: 125 },
  { id: 'hunt-clean', lane: 'game', title: 'Find every problem in an Inspection Hunt', key: 'hunt-clean', target: 1, xp: 125 },
  { id: 'lookalike-8', lane: 'game', title: 'Get 8+ right in Lookalike Showdown', key: 'lookalike-8', target: 1, xp: 125 },
  { id: 'speed-1000', lane: 'game', title: 'Score 1,000+ in the ACE Speed Round', key: 'speed-1000', target: 1, xp: 125 },
];

/** Counters an event moves. */
export function missionKeys(e?: AgentEvent): string[] {
  if (!e) return [];
  const k: string[] = [e.kind];
  const games = ['speed-round', 'photo-id-sprint', 'inspection-hunt', 'lookalike'];
  if (games.includes(e.kind)) k.push('game');
  if (e.kind === 'daily' && e.total && e.correct === e.total) k.push('daily-perfect');
  if (e.kind === 'exam' && e.level === 'hard') k.push('exam-hard');
  if (e.kind === 'exam' && e.timer && e.timer !== 'off') k.push('exam-timed');
  if (e.kind === 'photo-id-sprint' && (e.score ?? 0) >= 800) k.push('sprint-800');
  if (e.kind === 'speed-round' && (e.score ?? 0) >= 1000) k.push('speed-1000');
  if (e.kind === 'inspection-hunt' && e.total && e.correct === e.total) k.push('hunt-clean');
  if (e.kind === 'lookalike' && (e.correct ?? 0) >= 8) k.push('lookalike-8');
  return k;
}

/** YYYY-MM-DD for `date` in the drop's time zone. */
export function dayIn(date: Date, tz = DAILY_TZ): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

/** The Monday that starts the mission week containing `now` (US Central), as YYYY-MM-DD. */
export function weekKey(now = new Date()): string {
  const day = dayIn(now);
  const d = new Date(`${day}T12:00:00Z`);
  const back = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - back);
  return d.toISOString().slice(0, 10);
}

/** This week's three missions: one per lane, rotating by week. */
export function missionsFor(week: string): Mission[] {
  const n = Math.round(Date.parse(`${week}T12:00:00Z`) / (7 * 86_400_000));
  return (['daily', 'study', 'game'] as const).map((lane) => {
    const pool = MISSION_POOL.filter((m) => m.lane === lane);
    return pool[((n % pool.length) + pool.length) % pool.length]!;
  });
}
