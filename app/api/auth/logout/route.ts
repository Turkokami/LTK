import { clearSessionCookie, sameOrigin } from '@/lib/server/session';

/** POST /api/auth/logout/ — sign out of this browser. */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { 'Set-Cookie': clearSessionCookie(req), 'Cache-Control': 'no-store' } });
}
