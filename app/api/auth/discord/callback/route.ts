import { exchangeCode, syncRankRole } from '@/lib/server/discord';
import { STATE_COOKIE, cookie, isSecure, readCookie, safeNext, sessionCookie } from '@/lib/server/session';
import { getProfile, getState, saveProfile } from '@/lib/server/agent';
import { redisConfigured } from '@/lib/server/redis';
import { RANKS, rankFor } from '@/lib/agent/config';

/** GET /api/auth/discord/callback/ — Discord sends the member back here after they approve. */

export const dynamic = 'force-dynamic';

function back(req: Request, path: string, extra: string[] = []) {
  const headers = new Headers({ Location: new URL(path, req.url).toString(), 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', cookie(STATE_COOKIE, '', 0, isSecure(req)));
  for (const c of extra) headers.append('Set-Cookie', c);
  return new Response(null, { status: 302, headers });
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const [state, nextRaw] = (readCookie(req, STATE_COOKIE) ?? '').split('|');
  const next = safeNext(nextRaw ?? null);
  const sep = next.includes('?') ? '&' : '?';
  if (u.searchParams.get('error')) return back(req, `${next}${sep}signin=cancelled`);
  const code = u.searchParams.get('code');
  if (!state || !code || u.searchParams.get('state') !== state || !redisConfigured) return back(req, `${next}${sep}signin=failed`);

  try {
    const p = await exchangeCode(req, code);
    const existing = await getProfile(p.id);
    await saveProfile(p.id, { name: p.name, avatar: p.avatar, member: p.member, ...(existing ? {} : { public: false, imported: false }) });
    if (p.member) {
      const s = await getState(p.id);
      await syncRankRole(p.id, RANKS[rankFor(s.xp).index]!.id);
    }
    return back(req, `${next}${sep}signin=ok`, [sessionCookie(req, p.id)]);
  } catch {
    return back(req, `${next}${sep}signin=failed`);
  }
}
