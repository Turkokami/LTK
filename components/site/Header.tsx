import { site } from '@/lib/site.config';
import { HUBS, PRIMARY_NAV, getHub } from '@/lib/content/hubs';
import { ASSETS } from '@/lib/brand';
import { DiscordButton } from '@/components/community/Discord';

/**
 * Server component. No 'use client' anywhere in the header — a nav that needs JS to exist is a
 * nav a crawler cannot follow, and the internal link graph is the whole point.
 */
export function SiteHeader() {
  return (
    <header className="rule-b sticky top-0 z-40 bg-stock">
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <a href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          {/* The badge is decorative here; the wordmark beside it carries the name. */}
          <img
            src={ASSETS.mark}
            alt=""
            width={44}
            height={44}
            className="rounded-full ring-1 ring-ruleStrong"
          />
          <span className="leading-none">
            <span className="block font-sans text-lg font-extrabold uppercase tracking-tight">
              {site.name}
            </span>
            <span className="mono mt-1 block text-ink3">Pest pros helping pest pros</span>
          </span>
        </a>

        <nav aria-label="Primary" className="order-3 w-full lg:order-none lg:w-auto">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {PRIMARY_NAV.map((id) => {
              const hub = getHub(id);
              return (
                <li key={hub.id}>
                  <a
                    href={hub.path}
                    className="text-sm font-semibold text-ink2 transition-colors hover:text-blood"
                  >
                    {hub.eyebrow}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="/join/" className="btn btn--ghost hidden sm:inline-flex">
            Join
          </a>
          <DiscordButton>Discord</DiscordButton>
        </div>
      </div>
    </header>
  );
}

export const ALL_HUBS = HUBS;
