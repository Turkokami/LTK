import { XP, RANKS, rankFor, type AgentEvent, type StatKey } from '@/lib/agent/config';
import { applyAward, applyDaily, normalize, type AgentState, type AwardOpts } from '@/lib/agent/engine';
import { dailyDrop } from '@/lib/agent/daily';
import { redis, pairs, sha } from './redis';
import { syncRankRole } from './discord';

/**
 * Signed-in Agent files, server side. Keys (all under `ltk:` via the redis helper):
 *
 *   agent:<id>            hash   name, avatar, member, public ("1"/"0"), imported ("1")
 *   agent:<id>:state      string AgentState JSON
 *   agent:<id>:cap:<day>  int    XP paid today (daily cap), expires after 2 days
 *   agents:xp             zset   id → total XP
 *   agents:season:<YYYY-MM> zset id → XP earned this month
 *   agents:streak         zset   id → current Daily Drop streak
 *   agents:daily:<day>    zset   id → Daily Drop score (correct × 1000 + streak)
 *
 * The client says what happened; the server decides what it's worth. Fixed awards are priced
 * here from the XP table, game and exam awards are bounded by their own maths, and there is a
 * daily XP cap per account. Play-for-fun, no prizes (REGISTRY R-18).
 */

export const DAILY_XP_CAP = 2500;
/** Progress carried over from a browser on first sign-in, at most. */
export const IMPORT_XP_CAP = 2500;

export interface Profile {
  name: string;
  avatar: string | null;
  member: boolean;
  public: boolean;
  imported: boolean;
}

export const codename = (id: string) => `Agent ${sha(`codename:${id}`).slice(0, 4).toUpperCase()}`;

export async function getProfile(id: string): Promise<Profile | null> {
  const [raw] = await redis([['HGETALL', `agent:${id}`]]);
  const h = pairs(raw);
  if (!h.name) return null;
  return { name: h.name, avatar: h.avatar || null, member: h.member === '1', public: h.public === '1', imported: h.imported === '1' };
}

export async function saveProfile(id: string, p: Partial<Profile>) {
  const fields: (string | number)[] = [];
  for (const [k, v] of Object.entries(p)) fields.push(k, typeof v === 'boolean' ? (v ? '1' : '0') : (v ?? ''));
  if (fields.length) await redis([['HSET', `agent:${id}`, ...fields]]);
}

export async function getState(id: string): Promise<AgentState> {
  const [raw] = await redis([['GET', `agent:${id}:state`]]);
  try {
    return normalize(typeof raw === 'string' ? JSON.parse(raw) : {});
  } catch {
    return normalize({});
  }
}

const month = (day: string) => day.slice(0, 7);

/** Persist a new state and keep the boards (and the Discord role) in step. */
async function commit(id: string, before: AgentState, next: AgentState, paid: number, day: string) {
  const cmds: (string | number)[][] = [
    ['SET', `agent:${id}:state`, JSON.stringify(next)],
    ['ZADD', 'agents:xp', next.xp, id],
  ];
  if (paid > 0) cmds.push(['ZINCRBY', `agents:season:${month(day)}`, paid, id]);
  if (next.streak.count !== before.streak.count) cmds.push(['ZADD', 'agents:streak', next.streak.count, id]);
  await redis(cmds);
  const r0 = rankFor(before.xp).index;
  const r1 = rankFor(next.xp).index;
  if (r1 !== r0) await syncRankRole(id, RANKS[r1]!.id);
}

/** Take up to `xp` from today's allowance; returns what may be paid. */
async function allowance(id: string, day: string, xp: number): Promise<number> {
  if (xp <= 0) return 0;
  const key = `agent:${id}:cap:${day}`;
  const [used] = await redis([['INCRBY', key, xp], ['EXPIRE', key, 172800]]);
  const over = Number(used) - DAILY_XP_CAP;
  return over <= 0 ? xp : Math.max(0, xp - over);
}

const int = (v: unknown, lo: number, hi: number) => (Number.isInteger(v) && (v as number) >= lo && (v as number) <= hi ? (v as number) : null);

/** Turn a client award into a server-priced one, or null if it doesn't add up. */
export function price(body: Partial<AwardOpts>): AwardOpts | null {
  const e = (body.event ?? {}) as Partial<AgentEvent>;
  const once = typeof body.once === 'string' ? body.once : undefined;
  const fixed = (re: RegExp, xp: number, stat: StatKey, label: string): AwardOpts | null =>
    once && re.test(once) ? { xp, label, once, stats: { [stat]: 1 }, event: { kind: e.kind! } } : null;

  switch (e.kind) {
    case 'field':
      return fixed(/^field:[a-z0-9-]{2,60}$/, XP.fieldGuideRead, 'fieldGuides', 'Field guide read');
    case 'state':
      return fixed(/^state:[A-Z]{2}$/, XP.stateViewed, 'states', 'State licensing');
    case 'glossary':
      return fixed(/^glossary:[\w.-]{1,80}$/, XP.glossaryKnown, 'glossaryKnown', 'Glossary card known');
    case 'deck':
      return fixed(/^deck:[\w:.-]{1,80}$/, XP.deckFinished, 'decks', 'Deck finished');
    case 'vote':
      return fixed(/^vote:[\w:.-]{1,80}$/, XP.vote, 'votes', 'Gear vote');
    case 'video':
      return fixed(/^video:[\w-]{6,20}$/, XP.videoPlayed, 'videos', 'Episode played');
    case 'exam': {
      const total = int(e.total, 1, 100);
      const correct = total === null ? null : int(e.correct, 0, total);
      const level = (['easy', 'medium', 'hard', 'mixed'] as const).find((l) => l === e.level);
      const timer = (['off', 'standard', 'fast'] as const).find((t) => t === e.timer);
      if (correct === null || !level || !timer) return null;
      const ceiling = correct * Math.max(...Object.values(XP.examPerCorrect)) * (XP.examTimerMultiplier[timer] ?? 1);
      return {
        xp: Math.min(Math.max(0, Number(body.xp) || 0), ceiling),
        label: `ACE exam: ${correct}/${total}`,
        stats: { examsDone: 1 },
        event: { kind: 'exam', level, timer, correct, total: total! },
      };
    }
    case 'speed-round':
    case 'photo-id-sprint':
    case 'inspection-hunt':
    case 'lookalike': {
      const score = int(e.score, 0, 60000);
      if (score === null) return null;
      const total = e.total === undefined ? undefined : int(e.total, 0, 200) ?? undefined;
      const correct = total === undefined ? undefined : int(e.correct, 0, total) ?? undefined;
      const GAME = {
        'speed-round': { label: 'Speed Round', best: 'bestSpeed' },
        'photo-id-sprint': { label: 'Photo ID Sprint', best: 'bestSprint' },
        'inspection-hunt': { label: 'Inspection Hunt', best: 'bestHunt' },
        lookalike: { label: 'Lookalike Showdown', best: 'bestLookalike' },
      } as const;
      const g = GAME[e.kind];
      return {
        xp: Math.min(XP.gameCap, score / XP.gameScoreDivisor),
        label: g.label,
        max: { [g.best]: score },
        event: { kind: e.kind, score, correct, total },
      };
    }
    default:
      return null;
  }
}

export async function serverAward(id: string, opts: AwardOpts): Promise<AgentState> {
  const day = dailyDrop().day;
  const cur = await getState(id);
  if (opts.once && cur.once[opts.once]) return cur;
  const xp = await allowance(id, day, Math.round(opts.xp));
  const { next } = applyAward(cur, { ...opts, xp });
  // Paid = base award + any weekly mission it completed.
  await commit(id, cur, next, next.xp - cur.xp, day);
  return next;
}

/** Grade today's Daily Drop from the member's picks and record it. */
export async function serverDaily(id: string, picks: { photo?: unknown; q?: unknown }, localHour: number): Promise<AgentState | null> {
  const drop = dailyDrop();
  const cur = await getState(id);
  if (cur.daily[drop.day]) return cur;
  const answers = [picks.photo === drop.photo.group, picks.q === drop.question.correctOptionId];
  const { next } = applyDaily(cur, { day: drop.day, yesterday: drop.yesterday, answers, localHour: int(localHour, 0, 23) ?? 12 });
  const paid = next.xp - cur.xp;
  // The Daily Drop always pays in full (at most 225 plus a mission bonus), but counts toward the cap.
  await allowance(id, drop.day, paid);
  await commit(id, cur, next, paid, drop.day);
  await redis([['ZADD', `agents:daily:${drop.day}`, answers.filter(Boolean).length * 1000 + Math.min(next.streak.count, 999), id], ['EXPIRE', `agents:daily:${drop.day}`, 60 * 60 * 24 * 40]]);
  return next;
}

/** First sign-in: carry a browser's progress over, within limits. */
export async function importState(id: string, raw: unknown): Promise<AgentState> {
  const cur = await getState(id);
  const local = normalize(raw);
  const stat = (k: StatKey) => Math.max(cur.stats[k], Math.min(local.stats[k], k.startsWith('best') ? 60000 : 1000));
  const stats = Object.fromEntries(Object.keys(cur.stats).map((k) => [k, stat(k as StatKey)])) as AgentState['stats'];
  const next: AgentState = {
    xp: Math.max(cur.xp, Math.min(local.xp, IMPORT_XP_CAP)),
    stats,
    achievements: { ...local.achievements, ...cur.achievements },
    once: { ...local.once, ...cur.once },
    daily: { ...local.daily, ...cur.daily },
    streak: cur.streak.last ? cur.streak : { last: local.streak.last, count: Math.min(local.streak.count, 400) },
    // Mission progress isn't imported: the server's week is the record.
    week: cur.week,
  };
  await commit(id, cur, next, Math.max(0, next.xp - cur.xp), dailyDrop().day);
  await saveProfile(id, { imported: true });
  return next;
}

/* ------------------------------------------------------------------ boards */

export interface BoardRow {
  name: string;
  avatar: string | null;
  value: number;
  rank: string;
  mine: boolean;
}

async function board(key: string, me: string | null, n = 15, filter?: (id: string, s: AgentState | null) => boolean): Promise<BoardRow[]> {
  const [raw] = await redis([['ZRANGE', key, 0, n * 2 - 1, 'REV', 'WITHSCORES']]);
  const flat = Array.isArray(raw) ? raw.map(String) : [];
  const rows: { id: string; value: number }[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) rows.push({ id: flat[i]!, value: Number(flat[i + 1]) });
  if (!rows.length) return [];
  const res = await redis(rows.flatMap((r) => [['HGETALL', `agent:${r.id}`], ['GET', `agent:${r.id}:state`]]));
  const out: BoardRow[] = [];
  rows.forEach((r, i) => {
    const h = pairs(res[i * 2]);
    let s: AgentState | null = null;
    try {
      s = normalize(JSON.parse(String(res[i * 2 + 1] ?? '{}')));
    } catch {
      /* ignore */
    }
    if (filter && !filter(r.id, s)) return;
    const pub = h.public === '1';
    out.push({
      name: pub && h.name ? h.name : codename(r.id),
      avatar: pub ? h.avatar || null : null,
      value: r.value,
      rank: rankFor(s?.xp ?? 0).rank.name,
      mine: r.id === me,
    });
  });
  return out.slice(0, n);
}

/** One month's season board (YYYY-MM), top `n`. */
export function seasonBoard(month: string, n = 10) {
  return board(`agents:season:${month}`, null, n);
}

export async function boards(me: string | null) {
  const drop = dailyDrop();
  const [season, allTime, streaks, today] = await Promise.all([
    board(`agents:season:${month(drop.day)}`, me),
    board('agents:xp', me),
    // A streak only counts while it's alive: played today or yesterday.
    board('agents:streak', me, 15, (_id, s) => !!s && (s.streak.last === drop.day || s.streak.last === drop.yesterday)),
    board(`agents:daily:${drop.day}`, me),
  ]);
  return {
    season: { month: month(drop.day), rows: season },
    allTime,
    streaks,
    today: { number: drop.number, rows: today.map((r) => ({ ...r, value: Math.floor(r.value / 1000) })) },
  };
}
