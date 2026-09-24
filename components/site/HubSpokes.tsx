import type { Hub } from '@/lib/content/hubs';
import { site } from '@/lib/site.config';

/**
 * The "what's in this section" grid on every hub index. Shipped spokes (`live: true` in
 * hubs.ts) link straight through; everything else reads as rolling out, with a nudge to the Discord
 * where members can ask for the one they need next. No route patterns are shown to readers.
 */
export function HubSpokes({ hub }: { hub: Hub }) {
  return (
    <section aria-labelledby={`${hub.id}-spokes`}>
      <h2 id={`${hub.id}-spokes`} className="eyebrow mb-4">
        In this section
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {hub.spokes.map((s) => {
          return (
            <li key={s.pattern}>
              {s.live ? (
                <a href={s.pattern} className="card group flex h-full items-center justify-between gap-4 p-5">
                  <span className="h3 group-hover:text-blood">{s.label}</span>
                  <span aria-hidden="true" className="text-blood">
                    &rarr;
                  </span>
                </a>
              ) : (
                <div className="card flex h-full items-center justify-between gap-4 p-5">
                  <span className="h3">{s.label}</span>
                  <span className="mono shrink-0 rounded-full border border-ruleStrong px-2.5 py-1 text-ink3">
                    Rolling out
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-ink3">
        Want something here sooner?{' '}
        <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
          Tell us in the Discord
        </a>{' '}
        &mdash; member requests decide what we build next.
      </p>
    </section>
  );
}
