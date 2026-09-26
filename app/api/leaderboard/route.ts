import { DEVICE_RE, json, overLimit, redis, redisConfigured, sha } from '@/lib/server/redis';

/**
 * /api/leaderboard — Arena high scores, honour system.
 *
 *   lb:<game>       sorted set  deviceHash → best score (ZADD GT keeps only improvements)
 *   lbname:<game>   hash        deviceHash → display name
 *
 * Scores are submitted by the browser, so they cannot be proven; they are capped at the
 * game's theoretical maximum and rate-limited, and the page labels the board as honour-system.
 * Names are restricted to a plain character set with a small blocklist; moderators can remove
 * an entry with ZREM/HDEL in the Upstash console. Play-for-fun — no prizes (REGISTRY R-18).
 */

export const dynamic = 'force-dynamic';

/** Upper bound per game: ~100 answers in 60s, all correct, full streak bonus. */
const GAMES: Record<string, { max: number }> = {
  'speed-round': { max: 60000 },
  'photo-id-sprint': { max: 60000 },
};
const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9 _.\-]{1,19}$/;
const BLOCK = ['fuck', 'shit', 'nigg', 'fag', 'cunt', 'bitch', 'retard', 'nazi', 'whore', 'slut'];
const TOP = 20;

function clean(name: string): string | null {
  const n = name.trim().replace(/\s+/g, ' ');
  if (!NAME_RE.test(n)) return null;
  const flat = n.toLowerCase().replace(/[^a-z]/g, '');
  if (BLOCK.some((w) => flat.includes(w))) return null;
  return n;
}

async function top(game: string) {
  const [raw] = await redis([['ZRANGE', `lb:${game}`, 0, TOP - 1, 'REV', 'WITHSCORES']]);
  const flat = Array.isArray(raw) ? raw.map(String) : [];
  const devs: string[] = [];
  const scores: number[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) {
    devs.push(flat[i]!);
    scores.push(Number(flat[i + 1]));
  }
  if (!devs.length) return [];
  const [names] = await redis([['HMGET', `lbname:${game}`, ...devs]]);
  const list = Array.isArray(names) ? names : [];
  return devs.map((d, i) => ({ name: String(list[i] ?? 'Anonymous'), score: scores[i]!, me: d }));
}

/** GET /api/leaderboard?game=…&device=… → { top: [{ name, score, mine }], best } */
export async function GET(req: Request) {
  if (!redisConfigured) return json({ error: 'leaderboard unavailable' }, 503);
  const u = new URL(req.url);
  const game = u.searchParams.get('game') ?? '';
  if (!GAMES[game]) return json({ error: 'unknown game' }, 400);
  const device = u.searchParams.get('device') ?? '';
  const dev = DEVICE_RE.test(device) ? sha(device) : null;
  try {
    const board = await top(game);
    let best: number | null = null;
    if (dev) {
      const [s] = await redis([['ZSCORE', `lb:${game}`, dev]]);
      best = s === null || s === undefined ? null : Number(s);
    }
    return json({ top: board.map(({ name, score, me }) => ({ name, score, mine: me === dev })), best });
  } catch {
    return json({ error: 'leaderboard unavailable' }, 503);
  }
}

/** POST { game, device, name, score } → { top, best, rank } */
export async function POST(req: Request) {
  if (!redisConfigured) return json({ error: 'leaderboard unavailable' }, 503);
  let body: { game?: unknown; device?: unknown; name?: unknown; score?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  const game = String(body.game ?? '');
  const device = String(body.device ?? '');
  const score = Number(body.score);
  const name = clean(String(body.name ?? ''));
  const cfg = GAMES[game];
  if (!cfg || !DEVICE_RE.test(device) || !Number.isInteger(score) || score <= 0 || score > cfg.max) {
    return json({ error: 'bad request' }, 400);
  }
  if (!name) return json({ error: 'name', message: 'Use 2–20 letters, numbers, spaces, dots, dashes or underscores.' }, 400);
  const dev = sha(device);
  try {
    if (await overLimit(req, 'lb', 10)) return json({ error: 'slow down' }, 429);
    const res = await redis([
      ['ZADD', `lb:${game}`, 'GT', score, dev],
      ['HSET', `lbname:${game}`, dev, name],
      ['ZSCORE', `lb:${game}`, dev],
      ['ZREVRANK', `lb:${game}`, dev],
    ]);
    const board = await top(game);
    return json({
      top: board.map(({ name: n, score: s, me }) => ({ name: n, score: s, mine: me === dev })),
      best: Number(res[2]),
      rank: res[3] === null ? null : Number(res[3]) + 1,
    });
  } catch {
    return json({ error: 'leaderboard unavailable' }, 503);
  }
}
