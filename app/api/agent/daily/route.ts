import { json, overLimit, redisConfigured } from '@/lib/server/redis';
import { sameOrigin, sessionUser } from '@/lib/server/session';
import { serverDaily } from '@/lib/server/agent';
import { dailyDrop } from '@/lib/agent/daily';

/** POST /api/agent/daily/ { day, picks: { photo, q }, localHour } — graded on the server. */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const id = redisConfigured && sameOrigin(req) ? sessionUser(req) : null;
  if (!id) return json({ error: 'sign in' }, 401);
  let body: { day?: unknown; picks?: { photo?: unknown; q?: unknown }; localHour?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  // Only today's drop counts; a result queued offline yesterday is dropped.
  if (body.day !== dailyDrop().day || !body.picks) return json({ error: 'expired' }, 410);
  try {
    if (await overLimit(req, `agent:${id}`, 60)) return json({ error: 'slow down' }, 429);
    return json({ state: await serverDaily(id, body.picks, Number(body.localHour)) });
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}
