import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { eventEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { SponsorStrip } from '@/components/community/Sponsors';
import { EVENTS } from '@/lib/content/events-feed';
import { getSponsor } from '@/lib/content/sponsors';
import { site } from '@/lib/site.config';

/** /arena/tournaments/<id>/ — one LTK event: poster, sponsors, updates (newest first), stream. */

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = EVENTS.find((x) => x.id === slug);
  if (!e) return {};
  const sponsors = e.sponsors.map((id) => getSponsor(id)?.name).filter(Boolean).join(', ');
  return pageMeta({
    title: fitTitle([`${e.name}: results, poster and sponsors`, `${e.name}: results and sponsors`, e.name]),
    description: e.seoDescription ?? pickDescription(`${e.name} (${e.when.split(' · ')[0]}): ${e.summary}`, [
      ` Sponsored by ${sponsors}.`,
      ' Posters, sponsors and results.',
      ' Sponsors and results.',
      ' An LTK Discord event.',
    ]),
    path: `/arena/tournaments/${e.id}/`,
    ogImage: e.image?.src.endsWith('.webp') ? `${e.image.src.replace(/\.webp$/, '-og.jpg')}` : undefined,
  });
}

export default async function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = EVENTS.find((x) => x.id === slug);
  if (!e) notFound();
  const path = `/arena/tournaments/${e.id}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Tournaments', href: '/arena/tournaments/' },
    { name: e.name, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: e.startDate ? eventEntities({ path, events: [{ slug: e.id, name: e.name, description: e.summary, startDate: e.startDate, online: true }] }) : undefined,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">
          Arena &middot; {e.status === 'running' ? 'Running now' : 'Past event'} &middot; {e.game}
        </p>
        <h1 className="display mb-3 max-w-[20ch]">{e.name}</h1>
        <p className="mono mb-4 text-ink3">{e.when}</p>
        <p className="lede mb-8 max-w-[60ch]">{e.summary}</p>

        <div className={e.image ? 'grid items-start gap-8 lg:grid-cols-[2fr_3fr]' : ''}>
          {e.image ? <img src={e.image.src} alt={e.image.alt} width={e.image.width} height={e.image.height} className="w-full rounded-md ring-1 ring-ruleStrong" /> : null}
          <div>
            {e.updates?.length ? (
              <section aria-labelledby="updates">
                <h2 id="updates" className="h2 mb-4">
                  Updates
                </h2>
                {e.updates.map((u, i) => (
                  <article key={u.title} className={i ? 'mt-8 border-t border-rule pt-8' : ''}>
                    <p className="eyebrow mb-2">{i === 0 ? 'Latest' : 'Earlier'}</p>
                    <h3 className="h3 mb-3">{u.title}</h3>
                    {u.image ? <img src={u.image.src} alt={u.image.alt} width={u.image.width} height={u.image.height} className="mb-4 w-full rounded-md" /> : null}
                    {u.body.map((b) => (
                      <p key={b} className="mb-2 text-ink2">
                        {b}
                      </p>
                    ))}
                  </article>
                ))}
              </section>
            ) : null}
            {e.watch ? (
              <a href={e.watch} target="_blank" rel="noopener noreferrer" className="btn mt-2">
                Watch the stream<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <SponsorStrip ids={e.sponsors} label="Sponsored by" className="mt-8" />
            <p className="mt-3 text-sm text-ink3">
              Thank you to the sponsors who made it happen.{' '}
              <a href="/partners/" className="link">
                Sponsor the next one
              </a>
              .
            </p>
          </div>
        </div>

        <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Brackets, sign-ups and full results</span> live in the {site.discord.name}.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
        <p className="mt-6 text-sm">
          <a href="/arena/tournaments/" className="link">
            All tournaments
          </a>
        </p>
      </div>
    </>
  );
}
