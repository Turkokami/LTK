import { site } from '@/lib/site.config';

/**
 * Live member and online counts for the LTK Discord, from Discord's public invite endpoint
 * (no token). Cached for an hour; falls back to the owner-reported figure if Discord is down.
 */

export interface DiscordStats {
  members: number;
  online: number | null;
  live: boolean;
}

export async function discordStats(): Promise<DiscordStats> {
  const code = site.discord.invite.split('/').pop();
  try {
    const res = await fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(String(res.status));
    const d = (await res.json()) as { approximate_member_count?: number; approximate_presence_count?: number };
    if (!d.approximate_member_count) throw new Error('no count');
    return { members: d.approximate_member_count, online: d.approximate_presence_count ?? null, live: true };
  } catch {
    return { members: site.community.members, online: null, live: false };
  }
}
