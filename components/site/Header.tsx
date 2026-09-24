import { site } from '@/lib/site.config';
import { HUBS, PRIMARY_NAV, getHub } from '@/lib/content/hubs';
import { ASSETS } from '@/lib/brand';

/**
 * Server component. No 'use client' anywhere in the header — a nav that needs JS to exist is a
 * nav a crawler cannot follow, and the internal link graph is the whole point.
 */
export function SiteHeader() {
  return (
    <header className="rule-b bg-paper">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-3">
        <a href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          {/* The mark is decorative here; the wordmark beside it carries the name. */}
          <img src={ASSETS.mark} alt="" width={28} height={28} />
          <span className="font-sans text-lg font-extrabold tracking-tight">{site.name}</span>
        </a>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {PRIMARY_NAV.map((id) => {
              const hub = getHub(id);
              return (
                <li key={hub.id}>
                  <a href={hub.path} className="mono uppercase text-ink2 hover:text-ink">
                    {hub.eyebrow}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href="/join/" className="btn">
          Join
        </a>
      </div>
    </header>
  );
}

export const ALL_HUBS = HUBS;
