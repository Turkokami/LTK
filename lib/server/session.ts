import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Signed session cookie for Discord sign-in. The cookie holds only the Discord user id and an
 * expiry, signed with AUTH_SECRET (HMAC-SHA256); everything else lives in Redis. httpOnly,
 * Secure, SameSite=Lax — so cross-site POSTs never carry it. Server-only.
 */

const SECRET = process.env.AUTH_SECRET ?? '';
export const SESSION_COOKIE = 'ltk_s';
export const STATE_COOKIE = 'ltk_oauth';
const MAX_AGE = 60 * 60 * 24 * 30;

export const sessionConfigured = SECRET.length >= 32;

const b64 = (s: string) => Buffer.from(s).toString('base64url');
const sign = (s: string) => createHmac('sha256', SECRET).update(s).digest('base64url');

export function readCookie(req: Request, name: string): string | null {
  const raw = req.headers.get('cookie') ?? '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

export function cookie(name: string, value: string, maxAge: number, secure: boolean): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`;
}

export const isSecure = (req: Request) => new URL(req.url).protocol === 'https:';

export function sessionCookie(req: Request, userId: string): string {
  const payload = b64(JSON.stringify({ id: userId, exp: Math.floor(Date.now() / 1000) + MAX_AGE }));
  return cookie(SESSION_COOKIE, `${payload}.${sign(payload)}`, MAX_AGE, isSecure(req));
}

export const clearSessionCookie = (req: Request) => cookie(SESSION_COOKIE, '', 0, isSecure(req));

/** The signed-in Discord user id, or null. */
export function sessionUser(req: Request): string | null {
  if (!sessionConfigured) return null;
  const raw = readCookie(req, SESSION_COOKIE);
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const want = Buffer.from(sign(payload));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try {
    const { id, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { id: string; exp: number };
    if (!/^\d{5,25}$/.test(id) || exp < Date.now() / 1000) return null;
    return id;
  } catch {
    return null;
  }
}

export const nonce = () => randomBytes(18).toString('base64url');

/** Same-origin check for state-changing requests (belt and braces on top of SameSite). */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin fetches from older browsers may omit it; the cookie is SameSite=Lax
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

/** Where to land after sign-in: a plain on-site path only, never another origin. */
export function safeNext(raw: string | null): string {
  return raw && /^\/[a-z0-9/_-]*$/i.test(raw) && !raw.startsWith('//') ? raw : '/arena/agent/';
}
