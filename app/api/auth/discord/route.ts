import { authorizeUrl, discordConfigured } from '@/lib/server/discord';
import { STATE_COOKIE, cookie, isSecure, nonce, safeNext, sessionConfigured } from '@/lib/server/session';

/** GET /api/auth/discord/?next=/arena/agent/ — start Discord sign-in. */

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!discordConfigured || !sessionConfigured) return new Response('Discord sign-in is not set up yet.', { status: 503 });
  const next = safeNext(new URL(req.url).searchParams.get('next'));
  const state = nonce();
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl(req, state),
      'Set-Cookie': cookie(STATE_COOKIE, `${state}|${next}`, 600, isSecure(req)),
      'Cache-Control': 'no-store',
    },
  });
}
