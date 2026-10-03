import { ACHIEVEMENTS, rankFor, type AgentEvent, type StatKey } from './config';

/**
 * The Agent file: XP, stats, achievements and Daily Drop history, kept in this browser's
 * localStorage. Nothing is sent anywhere — it's a per-device convenience, and the site works
 * the same with storage blocked (awards just don't persist).
 *
 * `award()` is idempotent per `key` when `once` is set, so "read this field guide" can fire on
 * every visit and only ever pay out once. Every change notifies subscribers and dispatches an
 * `ltk-agent` window event the toaster listens to.
 */

const KEY = 'ltk-agent-v1';

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

const EMPTY: AgentState = {
  xp: 0,
  stats: { dailyDone: 0, dailyBestStreak: 0, examsDone: 0, fieldGuides: 0, states: 0, glossaryKnown: 0, decks: 0, votes: 0, videos: 0, bestSprint: 0, bestSpeed: 0 },
  achievements: {},
  once: {},
  daily: {},
  streak: { last: null, count: 0 },
};

let state: AgentState | null = null;
const subs = new Set<() => void>();

function load(): AgentState {
  if (state) return state;
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<AgentState>) : {};
    state = { ...EMPTY, ...parsed, stats: { ...EMPTY.stats, ...(parsed.stats ?? {}) }, streak: { ...EMPTY.streak, ...(parsed.streak ?? {}) } };
  } catch {
    state = { ...EMPTY };
  }
  return state;
}

function save(next: AgentState, notices: AgentNotice[]) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: progress lasts for this page view only */
  }
  subs.forEach((f) => f());
  for (const n of notices) window.dispatchEvent(new CustomEvent<AgentNotice>('ltk-agent', { detail: n }));
}

export function getAgent(): AgentState {
  return load();
}
export const SERVER_AGENT = EMPTY;

export function subscribeAgent(f: () => void) {
  subs.add(f);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      state = null;
      f();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    subs.delete(f);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Pay out XP and update stats. Returns the XP actually awarded (0 if `once` already paid).
 */
export function award(opts: {
  xp: number;
  label: string;
  once?: string;
  stats?: Partial<Record<StatKey, number>>;
  /** Stats to raise to at least this value (personal bests). */
  max?: Partial<Record<StatKey, number>>;
  event?: AgentEvent;
}): number {
  if (typeof window === 'undefined') return 0;
  const cur = load();
  if (opts.once && cur.once[opts.once]) return 0;
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
      next.achievements[a.id] = Date.now();
      notices.push({ type: 'achievement', id: a.id, name: a.name });
    }
  }
  save(next, notices);
  return amount;
}

/** Record a finished Daily Drop for `day` (YYYY-MM-DD in DAILY_TZ) and update the streak. */
export function recordDaily(day: string, yesterday: string, answers: boolean[], xp: number, localHour: number) {
  const cur = load();
  if (cur.daily[day]) return;
  const count = cur.streak.last === yesterday ? cur.streak.count + 1 : 1;
  state = { ...cur, daily: { ...cur.daily, [day]: { answers, doneAt: Date.now() } }, streak: { last: day, count } };
  award({
    xp,
    label: 'Daily Drop',
    stats: { dailyDone: 1 },
    max: { dailyBestStreak: count },
    event: { kind: 'daily', localHour },
  });
}

export function resetAgent() {
  save({ ...EMPTY }, []);
}
