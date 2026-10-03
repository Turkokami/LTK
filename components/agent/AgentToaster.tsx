'use client';

import { useEffect, useState } from 'react';
import { startAgentSync, type AgentNotice } from '@/lib/agent/store';
import { cx } from '@/lib/utils';

/**
 * XP, rank-up and achievement pop-ups. Listens for `ltk-agent` events from the store. Toasts
 * stack bottom-right, auto-dismiss, and are announced politely to screen readers.
 */
type Toast = AgentNotice & { key: number };

export function AgentToaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Mounted once in the root layout, so this is also where the signed-in sync starts.
  useEffect(() => {
    void startAgentSync();
  }, []);

  useEffect(() => {
    let n = 0;
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<AgentNotice>).detail;
      const key = Date.now() + ++n;
      setToasts((t) => [...t.slice(-3), { ...detail, key }]);
      const ms = detail.type === 'xp' ? 2600 : 5200;
      window.setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), ms);
    };
    window.addEventListener('ltk-agent', onEvent);
    return () => window.removeEventListener('ltk-agent', onEvent);
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.key}
          className={cx(
            'agent-toast pointer-events-auto rounded-[var(--radius)] border bg-paper px-4 py-3 shadow-2xl',
            t.type === 'xp' && 'border-ruleStrong',
            t.type === 'rank' && 'border-field',
            t.type === 'achievement' && 'border-blood',
          )}
        >
          {t.type === 'xp' ? (
            <p className="text-sm text-ink2">
              <span className="font-bold text-field">+{t.amount} XP</span> &middot; {t.label}
            </p>
          ) : t.type === 'rank' ? (
            <>
              <p className="eyebrow mb-0.5">Rank up</p>
              <p className="font-bold text-ink">You are now {t.name}</p>
            </>
          ) : (
            <>
              <p className="eyebrow mb-0.5">Achievement unlocked</p>
              <p className="font-bold text-ink">{t.name}</p>
              <a href="/arena/agent/" className="link text-xs">
                See your Agent file
              </a>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
