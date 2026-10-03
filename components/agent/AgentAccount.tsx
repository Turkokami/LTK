'use client';

import { useEffect, useState } from 'react';
import { setLeaderboardName, signOut } from '@/lib/agent/store';
import { useAgentSession } from './useAgent';

/**
 * Discord sign-in panel. Hidden entirely until sign-in is set up on this deploy. Signed out:
 * what signing in gets you. Signed in: who you are, the leaderboard-name switch, sign out.
 */

function DiscordGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z" />
    </svg>
  );
}

export function signInHref(next: string) {
  return `/api/auth/discord/?next=${encodeURIComponent(next)}`;
}

export function AgentAccount({ next = '/arena/agent/', discordInvite }: { next?: string; discordInvite: string }) {
  const s = useAgentSession();
  const [flash, setFlash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const u = new URL(window.location.href);
    const r = u.searchParams.get('signin');
    if (!r) return;
    setFlash(r === 'ok' ? null : r === 'cancelled' ? 'Sign-in cancelled.' : 'Sign-in didn’t work. Try again in a minute.');
    u.searchParams.delete('signin');
    window.history.replaceState(null, '', u.pathname + u.search + u.hash);
  }, []);

  if (!s.ready || !s.configured) return null;

  if (!s.user) {
    return (
      <div className="mb-8 rounded-[var(--radius)] border border-ruleStrong p-5">
        {flash ? <p className="mb-2 text-sm text-blood">{flash}</p> : null}
        <p className="h3 mb-1">Save your Agent file with Discord</p>
        <p className="mb-4 max-w-[60ch] text-sm text-ink2">
          Keep your XP, streak and achievements on every phone and computer, get on the leaderboards, and pick up
          your rank role in the LTK Discord. We only see your Discord name and picture &mdash; no email, no messages.
        </p>
        <a href={signInHref(next)} className="btn" rel="nofollow">
          <DiscordGlyph /> Sign in with Discord
        </a>
      </div>
    );
  }

  const u = s.user;
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[var(--radius)] border border-ruleStrong p-5">
      {u.avatar ? <img src={u.avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-full" /> : null}
      <div className="min-w-[14rem] flex-1">
        <p className="font-semibold text-ink">
          Signed in as {u.name} <span className="mono ml-1 text-ink3">({u.codename})</span>
        </p>
        <label className="mt-2 flex items-start gap-2 text-sm text-ink2">
          <input
            type="checkbox"
            className="mt-1"
            checked={u.public}
            disabled={busy}
            onChange={async (e) => {
              setBusy(true);
              await setLeaderboardName(e.target.checked);
              setBusy(false);
            }}
          />
          <span>
            Show my Discord name and picture on leaderboards. Off, you appear as <strong className="text-ink">{u.codename}</strong>.
          </span>
        </label>
        {!u.member ? (
          <p className="mt-2 text-sm text-ink2">
            You&rsquo;re not in the LTK Discord yet &mdash;{' '}
            <a href={discordInvite} className="link" target="_blank" rel="noopener noreferrer">
              join
            </a>{' '}
            to get your rank role.
          </p>
        ) : null}
      </div>
      <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
        Sign out
      </button>
    </div>
  );
}
