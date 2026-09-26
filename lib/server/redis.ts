import { createHash } from 'node:crypto';

/**
 * Minimal Upstash Redis client over its REST API — no SDK dependency. Vercel's Upstash
 * integration sets KV_REST_API_URL / KV_REST_API_TOKEN (older installs: UPSTASH_REDIS_REST_*).
 * Server-only: never import from a client component.
 */

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisConfigured = Boolean(URL_ && TOKEN);

export type Cmd = (string | number)[];

export async function redis(cmds: Cmd[]): Promise<unknown[]> {
  const res = await fetch(`${URL_}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  return out.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

export const sha = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 32);

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

/** Redis HGETALL over REST returns a flat [field, value, …] array. */
export function pairs(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (Array.isArray(raw)) for (let i = 0; i + 1 < raw.length; i += 2) out[String(raw[i])] = String(raw[i + 1]);
  return out;
}

export const DEVICE_RE = /^[a-zA-Z0-9-]{16,64}$/;

/**
 * Per-IP write limit. Returns true when the caller is over the limit. IPs are hashed and the
 * counter expires after the minute, so nothing identifying is kept.
 */
export async function overLimit(req: Request, scope: string, perMinute: number): Promise<boolean> {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || 'unknown';
  const key = `rl:${scope}:${sha(ip)}:${Math.floor(Date.now() / 60000)}`;
  const [count] = await redis([['INCR', key]]);
  if (Number(count) === 1) await redis([['EXPIRE', key, 60]]);
  return Number(count) > perMinute;
}
