/**
 * /api/votes — community up/down votes for Crew picks.
 *
 * Storage: Upstash Redis over its REST API (no SDK dependency). Vercel's Upstash integration
 * sets KV_REST_API_URL / KV_REST_API_TOKEN (older installs: UPSTASH_REDIS_REST_*). Without
 * them the endpoint answers 503 and the UI hides the buttons.
 *
 * Model, per item id:
 *   votes:<id>      hash  { up, down }
 *   voters:<id>     hash  { <deviceHash>: "1" | "-1" }   — one vote per device, changeable
 *   rl:<ipHash>:<minute>  counter with 60s expiry          — 30 writes/min per IP
 * Device ids are random per browser and are hashed before storage; IPs are hashed and only
 * live for a minute. Neither is ever returned.
 *
 * These are community votes, not verified ratings: no Review/AggregateRating markup uses them.
 */

export const dynamic = 'force-dynamic';

import { DEVICE_RE, json, overLimit, pairs, redis, redisConfigured, sha, type Cmd } from '@/lib/server/redis';

const ID_RE = /^[a-z0-9-]{1,80}$/;
const MAX_IDS = 100;
const WRITES_PER_MINUTE = 30;

/** GET /api/votes?ids=a,b,c&device=… → { counts: { id: { up, down } }, mine: { id: 1 | -1 } } */
export async function GET(req: Request) {
  if (!redisConfigured) return json({ error: 'voting unavailable' }, 503);
  const u = new URL(req.url);
  const ids = (u.searchParams.get('ids') ?? '')
    .split(',')
    .filter((x) => ID_RE.test(x))
    .slice(0, MAX_IDS);
  if (!ids.length) return json({ counts: {}, mine: {} });
  const device = u.searchParams.get('device') ?? '';
  const dev = DEVICE_RE.test(device) ? sha(device) : null;

  try {
    const cmds: Cmd[] = ids.map((id) => ['HGETALL', `votes:${id}`]);
    if (dev) ids.forEach((id) => cmds.push(['HGET', `voters:${id}`, dev]));
    const res = await redis(cmds);
    const counts: Record<string, { up: number; down: number }> = {};
    const mine: Record<string, number> = {};
    ids.forEach((id, i) => {
      const h = pairs(res[i]);
      counts[id] = { up: Number(h.up ?? 0), down: Number(h.down ?? 0) };
      if (dev) {
        const v = Number(res[ids.length + i] ?? 0);
        if (v === 1 || v === -1) mine[id] = v;
      }
    });
    return json({ counts, mine });
  } catch {
    return json({ error: 'voting unavailable' }, 503);
  }
}

/** POST { id, device, vote: 1 | -1 | 0 } → { up, down, mine } */
export async function POST(req: Request) {
  if (!redisConfigured) return json({ error: 'voting unavailable' }, 503);
  let body: { id?: unknown; device?: unknown; vote?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  const id = String(body.id ?? '');
  const device = String(body.device ?? '');
  const vote = Number(body.vote);
  if (!ID_RE.test(id) || !DEVICE_RE.test(device) || ![1, -1, 0].includes(vote)) {
    return json({ error: 'bad request' }, 400);
  }

  const dev = sha(device);

  try {
    if (await overLimit(req, 'votes', WRITES_PER_MINUTE)) return json({ error: 'slow down' }, 429);
    const [prevRaw] = await redis([['HGET', `voters:${id}`, dev]]);
    const prev = Number(prevRaw ?? 0);
    const cmds: Cmd[] = [];
    if (prev === 1) cmds.push(['HINCRBY', `votes:${id}`, 'up', -1]);
    if (prev === -1) cmds.push(['HINCRBY', `votes:${id}`, 'down', -1]);
    if (vote === 1) cmds.push(['HINCRBY', `votes:${id}`, 'up', 1]);
    if (vote === -1) cmds.push(['HINCRBY', `votes:${id}`, 'down', 1]);
    cmds.push(vote === 0 ? ['HDEL', `voters:${id}`, dev] : ['HSET', `voters:${id}`, dev, String(vote)]);
    cmds.push(['HGETALL', `votes:${id}`]);
    const res = await redis(cmds);
    const h = pairs(res[res.length - 1]);
    return json({ up: Math.max(0, Number(h.up ?? 0)), down: Math.max(0, Number(h.down ?? 0)), mine: vote });
  } catch {
    return json({ error: 'voting unavailable' }, 503);
  }
}
