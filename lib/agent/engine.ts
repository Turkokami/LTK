import { ACHIEVEMENTS, XP, rankFor, type AgentEvent, type StatKey } from './config';

/**
 * The Agent rules as pure functions, shared by the browser (signed-out play and optimistic
 * updates) and the server (signed-in play, where the server's copy is the record). No I/O here.
 */

export interface DailyRecord {
  /** Results per question: true = correct. */
  answers: boolean[];
  doneAt: number;
}

export interface AgentState {
  xp: number;
  stats: Record<StatKey, number>;
  achievements: Record<string, number>;
  once: Record<string, 1>;
  daily: Record<string, DailyRecord>;
  streak: { last: string | null; count: number };
}

export type AgentNotice =
  | { type: 'xp'; amount: number; label: string }
  | { type: 'rank'; name: string }
  | { type: 'achievement'; id: string; name: string };

export interface AwardOpts {
  xp: number;
  label: string;
  once?: string;
  stats?: Partial<Record<StatKey, number>>;
  /** Stats to raise to at least this value (personal bests). */
  max?: Partial<Record<StatKey, number>>;
  event?: AgentEvent;
}

export const EMPTY_AGENT: AgentState = {
  xp: 0,
  stats: { dailyDone: 0, dailyBestStreak: 0, examsDone: 0, fieldGuides: 0, states: 0, glossaryKnown: 0, decks: 0, votes: 0, videos: 0, bestSprint: 0, bestSpeed: 0 },
  achievements: {},
  once: {},
  daily: {},
  streak: { last: null, count: 0 },
};

/** Fill in anything missing from a stored or uploaded state. */
export function normalize(raw: unknown): AgentState {
  const p = (raw && typeof raw === 'object' ? raw : {}) as Partial<AgentState>;
  return {
    ...EMPTY_AGENT,
    ...p,
    xp: Number.isFinite(p.xp) ? Math.max(0, Math.round(p.xp!)) : 0,
    stats: { ...EMPTY_AGENT.stats, ...(p.stats ?? {}) },
    achievements: { ...(p.achievements ?? {}) },
    once: { ...(p.once ?? {}) },
    daily: { ...(p.daily ?? {}) },
    streak: { ...EMPTY_AGENT.streak, ...(p.streak ?? {}) },
  };
}

export const hasProgress = (s: AgentState) => s.xp > 0 || Object.keys(s.daily).length > 0;

/** Apply one award. Returns the new state, the XP actually paid (0 if `once` already paid) and the notices. */
export function applyAward(cur: AgentState, opts: AwardOpts, now = Date.now()): { next: AgentState; amount: number; notices: AgentNotice[] } {
  if (opts.once && cur.once[opts.once]) return { next: cur, amount: 0, notices: [] };
  const next: AgentState = {
    ...cur,
    stats: { ...cur.stats },
    achievements: { ...cur.achievements },
    once: opts.once ? { ...cur.once, [opts.once]: 1 } : cur.once,
  };
  for (const [k, v] of Object.entries(opts.stats ?? {})) next.stats[k as StatKey] += v ?? 0;
  for (const [k, v] of Object.entries(opts.max ?? {})) next.stats[k as StatKey] = Math.max(next.stats[k as StatKey], v ?? 0);
  const before = rankFor(cur.xp).index;
  const amount = Math.max(0, Math.round(opts.xp));
  next.xp = cur.xp + amount;

  const notices: AgentNotice[] = [];
  if (amount > 0) notices.push({ type: 'xp', amount, label: opts.label });
  const after = rankFor(next.xp);
  if (after.index > before) notices.push({ type: 'rank', name: after.rank.name });
  for (const a of ACHIEVEMENTS) {
    if (!next.achievements[a.id] && a.test(next.stats, opts.event)) {
      next.achievements[a.id] = now;
      notices.push({ type: 'achievement', id: a.id, name: a.name });
    }
  }
  return { next, amount, notices };
}

export function dailyXp(answers: boolean[], streak: number): number {
  return XP.dailyComplete + answers.filter(Boolean).length * XP.dailyCorrect + Math.min(streak * XP.dailyStreakPerDay, XP.dailyStreakCap);
}

/** Record a finished Daily Drop for `day` (YYYY-MM-DD, drop time zone) and update the streak. */
export function applyDaily(
  cur: AgentState,
  d: { day: string; yesterday: string; answers: boolean[]; localHour: number },
  now = Date.now(),
): { next: AgentState; amount: number; notices: AgentNotice[] } {
  if (cur.daily[d.day]) return { next: cur, amount: 0, notices: [] };
  const count = cur.streak.last === d.yesterday ? cur.streak.count + 1 : 1;
  const withDay: AgentState = { ...cur, daily: { ...cur.daily, [d.day]: { answers: d.answers, doneAt: now } }, streak: { last: d.day, count } };
  return applyAward(
    withDay,
    { xp: dailyXp(d.answers, count), label: 'Daily Drop', stats: { dailyDone: 1 }, max: { dailyBestStreak: count }, event: { kind: 'daily', localHour: d.localHour } },
    now,
  );
}
