import { site } from '@/lib/site.config';
import { HeaderAgent } from '@/components/agent/HeaderAgent';
import { HUBS, PRIMARY_NAV, getHub } from '@/lib/content/hubs';
import { ASSETS } from '@/lib/brand';
import { DiscordButton } from '@/components/community/Discord';
import { ACE_PATH, ALL_QUESTIONS } from '@/lib/content/ace';

/**
 * Server component. No 'use client' anywhere in the header — a nav that needs JS to exist is a
 * nav a crawler cannot follow, and the internal link graph is the whole point. The mobile menu
 * is a native <details>, so it opens without JavaScript too.
 */

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
      <path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5" />
      <path d="M22 9.5V14" />
    </svg>
  );
}

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
      <div className="shell flex items-center justify-between gap-x-4 py-3 xl:gap-x-6">
        <a href="/" className="flex min-w-0 items-center gap-3 xl:shrink-0" aria-label={`${site.name} — home`}>
          {/* The badge is decorative here; the wordmark beside it carries the name. */}
          <img
            src={ASSETS.mark}
            alt=""
            width={44}
            height={44}
            className="shrink-0 rounded-full ring-1 ring-ruleStrong"
          />
          <span className="min-w-0 leading-none">
            <span className="block whitespace-nowrap font-sans text-[0.9375rem] font-extrabold uppercase leading-tight tracking-tight sm:text-lg">
              {/* Short name on phones and once the full desktop nav needs the room. */}
              <span className="sm:hidden xl:inline">{site.shortName}</span>
              <span className="hidden sm:inline xl:hidden">{site.name}</span>
            </span>
            <span className="mono mt-1 hidden whitespace-nowrap text-ink3 sm:block xl:hidden">Pest pros helping pest pros</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
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
          {/* ACE Prep: the highlighted free tool, on every screen size. */}
          <a
            href={ACE_PATH}
            className="btn btn--ace !px-3 sm:!px-4"
            title="Free ACE exam prep: study guide, practice test and flashcards"
          >
            <CapIcon />
            <span>
              ACE<span className="hidden sm:inline"> Prep</span>
            </span>
            <span className="ace-free hidden md:inline">Free</span>
          </a>
          <HeaderAgent />
          <a
            href="/search/"
            className="btn btn--ghost !px-3"
            aria-label="Search the site"
            title="Search"
          >
            <SearchIcon />
          </a>
          <a href="/join/" className="btn btn--ghost hidden xl:inline-flex">
            Join
          </a>
          <DiscordButton className="hidden sm:inline-flex">Discord</DiscordButton>

          {/* Mobile menu. */}
          <details className="group relative xl:hidden">
            <summary className="btn btn--ghost cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-[var(--radius)] border border-ruleStrong bg-paper p-3 shadow-2xl">
              <a href={ACE_PATH} className="btn--ace mb-3 block rounded-md border p-3">
                <span className="flex items-center gap-2 font-bold">
                  <CapIcon /> ACE Prep <span className="ace-free">Free</span>
                </span>
                <span className="mt-1 block text-xs text-ink2">
                  Study guide, {ALL_QUESTIONS.length} practice questions, flashcards and a speed round.
                </span>
              </a>
              <HeaderAgent variant="card" />
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
                  How to join
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
