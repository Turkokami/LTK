import { json, overLimit, redisConfigured } from '@/lib/server/redis';
import { sameOrigin, sessionUser } from '@/lib/server/session';
import { price, serverAward } from '@/lib/server/agent';
import type { AwardOpts } from '@/lib/agent/engine';

/** POST /api/agent/award/ — an award from the browser, priced and applied by the server. */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const id = redisConfigured && sameOrigin(req) ? sessionUser(req) : null;
  if (!id) return json({ error: 'sign in' }, 401);
  let body: Partial<AwardOpts>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  const opts = price(body);
  if (!opts) return json({ error: 'bad request' }, 400);
  try {
    if (await overLimit(req, `agent:${id}`, 60)) return json({ error: 'slow down' }, 429);
    return json({ state: await serverAward(id, opts) });
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}
