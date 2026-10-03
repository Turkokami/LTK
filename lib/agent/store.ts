import { applyAward, applyDaily, EMPTY_AGENT, hasProgress, normalize, type AgentNotice, type AgentState, type AwardOpts } from './engine';

export type { AgentNotice, AgentState, DailyRecord } from './engine';

/**
 * The Agent file in the browser.
 *
 * Signed out, it lives in localStorage only. Signed in with Discord, the server's copy is the
 * record: every award is applied here straight away (so toasts are instant), queued, and sent
 * to the server, which validates it and returns the authoritative state. The queue survives a
 * reload, so an award made offline is sent on the next visit.
 *
 * Every change notifies subscribers and dispatches an `ltk-agent` window event the toaster
 * listens to.
 */

const KEY = 'ltk-agent-v1';
const QUEUE_KEY = 'ltk-agent-queue-v1';

export interface AgentUser {
  id: string;
  name: string;
  avatar: string | null;
  /** Shows the Discord name on leaderboards; otherwise the codename is used. */
  public: boolean;
  codename: string;
  member: boolean;
}

export interface AgentSession {
  /** Discord sign-in is set up on this deploy. */
  configured: boolean;
  user: AgentUser | null;
  /** The first /api/agent/ check has finished. */
  ready: boolean;
}

type Pending =
  | { type: 'award'; opts: AwardOpts }
  | { type: 'daily'; day: string; picks: { photo: string; q: string }; localHour: number };

let state: AgentState | null = null;
let session: AgentSession = { configured: false, user: null, ready: false };
const SERVER_SESSION: AgentSession = session;
const subs = new Set<() => void>();

const notify = () => subs.forEach((f) => f());

function load(): AgentState {
  if (state) return state;
  if (typeof window === 'undefined') return EMPTY_AGENT;
  try {
    const raw = window.localStorage.getItem(KEY);
    state = normalize(raw ? JSON.parse(raw) : {});
  } catch {
    state = normalize({});
  }
  return state;
}

function save(next: AgentState, notices: AgentNotice[] = []) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: progress lasts for this page view only */
  }
  notify();
  for (const n of notices) window.dispatchEvent(new CustomEvent<AgentNotice>('ltk-agent', { detail: n }));
}

export function getAgent(): AgentState {
  return load();
}
export const SERVER_AGENT = EMPTY_AGENT;
export const getAgentSession = () => session;
export const getServerAgentSession = () => SERVER_SESSION;

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

/* ------------------------------------------------------------------ server sync */

function readQueue(): Pending[] {
  try {
    return JSON.parse(window.localStorage.getItem(QUEUE_KEY) ?? '[]') as Pending[];
  } catch {
    return [];
  }
}
function writeQueue(q: Pending[]) {
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {
    /* ignore */
  }
}
function enqueue(p: Pending) {
  if (!session.user) return;
  writeQueue([...readQueue(), p].slice(-50));
  void flush();
}

async function post(path: string, body: unknown): Promise<Response> {
  return fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

let flushing = false;
/** Send queued awards one at a time; adopt the server's state once the queue is empty. */
async function flush() {
  if (flushing || !session.user) return;
  flushing = true;
  let latest: AgentState | null = null;
  try {
    for (;;) {
      const item = readQueue()[0];
      if (!item) break;
      let res: Response;
      try {
        res = item.type === 'award' ? await post('/api/agent/award/', item.opts) : await post('/api/agent/daily/', item);
      } catch {
        break; // offline: keep the queue for next time
      }
      if (res.status === 401) {
        session = { ...session, user: null };
        notify();
        break;
      }
      if (res.status >= 500 || res.status === 429) break;
      if (res.ok) {
        const data = (await res.json()) as { state?: unknown };
        if (data.state) latest = normalize(data.state);
      }
      writeQueue(readQueue().slice(1)); // 2xx applied, other 4xx rejected: either way, done
    }
  } finally {
    flushing = false;
  }
  if (latest && !readQueue().length) save(latest);
}

let started = false;
/** Called once per page load (AgentSync): who is signed in, and pull their saved file. */
export async function startAgentSync() {
  if (started || typeof window === 'undefined') return;
  started = true;
  try {
    const res = await fetch('/api/agent/', { cache: 'no-store' });
    const data = (await res.json()) as { configured?: boolean; user?: AgentUser | null; state?: unknown; imported?: boolean };
    session = { configured: Boolean(data.configured), user: data.user ?? null, ready: true };
    notify();
    if (!session.user) return;
    let server = normalize(data.state);
    // First sign-in on an account: carry this browser's progress over.
    if (!data.imported && hasProgress(load())) {
      const r = await post('/api/agent/import/', load());
      if (r.ok) server = normalize(((await r.json()) as { state: unknown }).state);
    }
    if (!readQueue().length) save(server);
    else void flush();
  } catch {
    session = { ...session, ready: true };
    notify();
  }
}

export async function setLeaderboardName(isPublic: boolean) {
  const res = await fetch('/api/agent/', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ public: isPublic }) });
  if (res.ok && session.user) {
    session = { ...session, user: { ...session.user, public: isPublic } };
    notify();
  }
}

export async function signOut() {
  await fetch('/api/auth/logout/', { method: 'POST' }).catch(() => undefined);
  writeQueue([]);
  session = { ...session, user: null };
  // The signed-in file stays on the account; this browser starts fresh.
  save(normalize({}));
}

/* ------------------------------------------------------------------ actions */

/** Pay out XP and update stats. Returns the XP actually awarded (0 if `once` already paid). */
export function award(opts: AwardOpts): number {
  if (typeof window === 'undefined') return 0;
  const { next, amount, notices } = applyAward(load(), opts);
  if (next === load()) return 0;
  save(next, notices);
  enqueue({ type: 'award', opts });
  return amount;
}

/**
 * Record a finished Daily Drop. Graded here for the instant result; when signed in, the picks
 * go to the server, which grades them again for the leaderboard.
 */
export function recordDaily(
  d: { day: string; yesterday: string; answers: boolean[]; localHour: number },
  picks: { photo: string; q: string },
) {
  const { next, notices } = applyDaily(load(), d);
  if (next === load()) return;
  save(next, notices);
  enqueue({ type: 'daily', day: d.day, picks, localHour: d.localHour });
}

export function resetAgent() {
  save(normalize({}));
}
