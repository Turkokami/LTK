import { json, overLimit, redisConfigured } from '@/lib/server/redis';
import { sameOrigin, sessionUser } from '@/lib/server/session';
import { getProfile, getState, importState } from '@/lib/server/agent';

/** POST /api/agent/import/ <AgentState> — once per account, carry a browser's progress over. */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const id = redisConfigured && sameOrigin(req) ? sessionUser(req) : null;
  if (!id) return json({ error: 'sign in' }, 401);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  try {
    if (await overLimit(req, `agent:${id}`, 60)) return json({ error: 'slow down' }, 429);
    const p = await getProfile(id);
    if (!p) return json({ error: 'sign in' }, 401);
    if (p.imported) return json({ state: await getState(id) });
    return json({ state: await importState(id, body) });
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}
