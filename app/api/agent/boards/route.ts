import { json, redisConfigured } from '@/lib/server/redis';
import { sessionUser } from '@/lib/server/session';
import { boards } from '@/lib/server/agent';

/** GET /api/agent/boards/ → season, all-time, live streaks and today's Daily Drop. */

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!redisConfigured) return json({ error: 'unavailable' }, 503);
  try {
    return json(await boards(sessionUser(req)));
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}
