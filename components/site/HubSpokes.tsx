import type { Hub } from '@/lib/content/hubs';
import { site } from '@/lib/site.config';

/**
 * The "what's in this section" grid on every hub index. Only shipped spokes get a card
 * (`live: true`, or an `index` listing page for templated ones) — a card always goes
 * somewhere. Spokes that are not built yet are listed once, quietly, as "Coming next", with the
 * Discord as the way to vote for what gets built first. No route patterns are shown to readers.
 */
export function HubSpokes({ hub }: { hub: Hub }) {
  const built = hub.spokes.filter((s) => s.live || s.index);
  const next = hub.spokes.filter((s) => !(s.live || s.index));

  return (
    <section aria-labelledby={`${hub.id}-spokes`}>
      <h2 id={`${hub.id}-spokes`} className="eyebrow mb-4">
        In this section
      </h2>
      {built.length ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {built.map((s) => (
            <li key={s.pattern}>
              <a href={s.index ?? s.pattern} className="card group flex h-full items-center justify-between gap-4 p-5">
                <span className="h3 group-hover:text-blood">{s.label}</span>
                <span aria-hidden="true" className="text-blood">
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {next.length ? (
        <p className="mt-5 text-sm leading-relaxed text-ink3">
          <span className="font-semibold text-ink2">Coming next:</span>{' '}
          {next.map((s) => s.label.toLowerCase()).join(', ')}.{' '}
          <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
            Tell us in the Discord
          </a>{' '}
          which you want first.
        </p>
      ) : null}
    </section>
  );
}
