import { json, redisConfigured } from '@/lib/server/redis';
import { sameOrigin, sessionConfigured, sessionUser } from '@/lib/server/session';
import { discordConfigured } from '@/lib/server/discord';
import { codename, getProfile, getState, saveProfile } from '@/lib/server/agent';

/**
 * GET   /api/agent/  → { configured, user, state, imported }   (user null when signed out)
 * PATCH /api/agent/  { public: boolean } → show or hide the Discord name on leaderboards
 */

export const dynamic = 'force-dynamic';

const configured = discordConfigured && sessionConfigured && redisConfigured;

export async function GET(req: Request) {
  const id = configured ? sessionUser(req) : null;
  if (!id) return json({ configured, user: null });
  try {
    const [p, state] = await Promise.all([getProfile(id), getState(id)]);
    if (!p) return json({ configured, user: null });
    return json({
      configured,
      user: { id, name: p.name, avatar: p.avatar, public: p.public, member: p.member, codename: codename(id) },
      state,
      imported: p.imported,
    });
  } catch {
    return json({ configured, user: null, error: 'unavailable' }, 503);
  }
}

export async function PATCH(req: Request) {
  const id = configured && sameOrigin(req) ? sessionUser(req) : null;
  if (!id) return json({ error: 'sign in' }, 401);
  let body: { public?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  if (typeof body.public !== 'boolean') return json({ error: 'bad request' }, 400);
  await saveProfile(id, { public: body.public });
  return json({ ok: true });
}
