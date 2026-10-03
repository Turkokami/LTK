import { RANKS } from '@/lib/agent/config';

/**
 * Discord OAuth2 and (optional) rank roles. Server-only.
 *
 *   DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET   the LTK application (Developer Portal → OAuth2)
 *   DISCORD_GUILD_ID                           the LTK server, to check membership (optional)
 *   DISCORD_BOT_TOKEN + DISCORD_RANK_ROLES     rank roles: JSON {"recruit":"<role id>", …} (optional)
 *
 * Sign-in asks only for `identify` (+ `guilds.members.read` when a guild is set, to read the
 * member's server nickname and confirm they're in the server). No email, no friends list.
 */

const API = 'https://discord.com/api/v10';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? '';
export const GUILD_ID = process.env.DISCORD_GUILD_ID ?? '';
const BOT = process.env.DISCORD_BOT_TOKEN ?? '';

export const discordConfigured = Boolean(CLIENT_ID && CLIENT_SECRET);

function rankRoles(): Record<string, string> {
  try {
    const r = JSON.parse(process.env.DISCORD_RANK_ROLES ?? '{}') as Record<string, string>;
    return Object.fromEntries(Object.entries(r).filter(([k, v]) => RANKS.some((x) => x.id === k) && /^\d{5,25}$/.test(v)));
  } catch {
    return {};
  }
}
export const rolesConfigured = () => Boolean(BOT && GUILD_ID && Object.keys(rankRoles()).length);

export const redirectUri = (req: Request) => `${new URL(req.url).origin}/api/auth/discord/callback/`;

export function authorizeUrl(req: Request, state: string): string {
  const u = new URL('https://discord.com/oauth2/authorize');
  u.searchParams.set('client_id', CLIENT_ID);
  u.searchParams.set('response_type', 'code');
  u.searchParams.set('redirect_uri', redirectUri(req));
  u.searchParams.set('scope', GUILD_ID ? 'identify guilds.members.read' : 'identify');
  u.searchParams.set('state', state);
  u.searchParams.set('prompt', 'none');
  return u.toString();
}

export interface DiscordProfile {
  id: string;
  name: string;
  avatar: string | null;
  member: boolean;
}

export async function exchangeCode(req: Request, code: string): Promise<DiscordProfile> {
  const tok = await fetch(`${API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri(req), client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
    cache: 'no-store',
  });
  if (!tok.ok) throw new Error(`token ${tok.status}`);
  const { access_token } = (await tok.json()) as { access_token: string };
  const auth = { Authorization: `Bearer ${access_token}` };

  const me = await fetch(`${API}/users/@me`, { headers: auth, cache: 'no-store' });
  if (!me.ok) throw new Error(`me ${me.status}`);
  const u = (await me.json()) as { id: string; username: string; global_name?: string | null; avatar?: string | null };

  let member = false;
  let nick: string | null = null;
  if (GUILD_ID) {
    const m = await fetch(`${API}/users/@me/guilds/${GUILD_ID}/member`, { headers: auth, cache: 'no-store' });
    if (m.ok) {
      member = true;
      nick = ((await m.json()) as { nick?: string | null }).nick ?? null;
    }
  }
  // The token is not stored: one sign-in, one read, done.
  return {
    id: u.id,
    name: (nick || u.global_name || u.username).slice(0, 32),
    avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64` : null,
    member,
  };
}

/** Give the member the role for their rank and take the other rank roles away. Best effort. */
export async function syncRankRole(userId: string, rankId: string): Promise<void> {
  if (!rolesConfigured()) return;
  const roles = rankRoles();
  const headers = { Authorization: `Bot ${BOT}`, 'X-Audit-Log-Reason': 'LTK Hub rank' };
  const base = `${API}/guilds/${GUILD_ID}/members/${userId}/roles`;
  await Promise.all(
    Object.entries(roles).map(([id, role]) =>
      fetch(`${base}/${role}`, { method: id === rankId ? 'PUT' : 'DELETE', headers, cache: 'no-store' }).catch(() => undefined),
    ),
  );
}
