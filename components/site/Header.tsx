import { site } from '@/lib/site.config';
import { HUBS, PRIMARY_NAV, getHub } from '@/lib/content/hubs';
import { ASSETS } from '@/lib/brand';
import { DiscordButton } from '@/components/community/Discord';

/**
 * Server component. No 'use client' anywhere in the header — a nav that needs JS to exist is a
 * nav a crawler cannot follow, and the internal link graph is the whole point. The mobile menu
 * is a native <details>, so it opens without JavaScript too.
 */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SiteHeader() {
  const nav = PRIMARY_NAV.map(getHub);
  return (
    <header className="rule-b sticky top-0 z-40 bg-stock">
      <div className="shell flex items-center justify-between gap-x-6 py-3">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label={`${site.name} — home`}>
          {/* The badge is decorative here; the wordmark beside it carries the name. */}
          <img
            src={ASSETS.mark}
            alt=""
            width={44}
            height={44}
            className="shrink-0 rounded-full ring-1 ring-ruleStrong"
          />
          <span className="min-w-0 leading-none">
            <span className="block font-sans text-[0.9375rem] font-extrabold uppercase leading-tight tracking-tight sm:text-lg">
              {site.name}
            </span>
            <span className="mono mt-1 hidden text-ink3 sm:block">Pest Pros helping Pest Pros</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-x-5">
            {nav.map((hub) => (
              <li key={hub.id}>
                <a href={hub.path} className="text-sm font-semibold text-ink2 transition-colors hover:text-blood">
                  {hub.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/search/"
            className="btn btn--ghost !px-3"
            aria-label="Search the site"
            title="Search"
          >
            <SearchIcon />
          </a>
          <a href="/join/" className="btn btn--ghost hidden sm:inline-flex">
            Join
          </a>
          <DiscordButton className="hidden sm:inline-flex">Discord</DiscordButton>

          {/* Mobile menu. */}
          <details className="group relative lg:hidden">
            <summary className="btn btn--ghost cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-[var(--radius)] border border-ruleStrong bg-paper p-3 shadow-2xl">
              <nav aria-label="Primary (mobile)">
                <ul className="mb-3 space-y-0.5">
                  {nav.map((hub) => (
                    <li key={hub.id}>
                      <a href={hub.path} className="block rounded-md px-3 py-2.5 font-semibold text-ink hover:bg-stock2 hover:text-blood">
                        {hub.eyebrow}
                        <span className="block text-xs font-normal text-ink3">{hub.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid gap-2 border-t border-rule pt-3">
                <DiscordButton className="w-full">Join the Discord</DiscordButton>
                <a href="/join/" className="btn btn--ghost w-full">
                  Get verified
                </a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export const ALL_HUBS = HUBS;
