import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { SPONSORS } from '@/lib/content/sponsors';
import { EVENTS } from '@/lib/content/events-feed';
import { cx } from '@/lib/utils';
import { abs } from '@/lib/site.config';

/**
 * /partners/<sponsor>/ — a thank-you page per sponsor: who they are, what they've backed, and
 * the posters to prove it. Outbound links are rel="sponsored" (sponsorship policy).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SPONSORS.map((s) => ({ brand: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const s = SPONSORS.find((x) => x.id === brand);
  if (!s) return {};
  return pageMeta({
    title: fitTitle([`${s.name}: LTK sponsor`, s.name]),
    description: pickDescription(`${s.name} sponsors LTK, the community for the whole pest control trade.`, [
      ` ${s.what}`,
      ' See the tournaments and leagues they’ve backed, with the posters.',
      ' See the tournaments and leagues they’ve backed.',
      ' See the events they’ve backed.',
    ]),
    path: `/partners/${s.id}/`,
    ogTemplate: 'partners',
  });
}

export default async function SponsorPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const s = SPONSORS.find((x) => x.id === brand);
  if (!s) notFound();
  const path = `/partners/${s.id}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners/' },
    { name: s.name, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    // A Brand node: the site's own Organization is the only Organization in the graph.
    primary: [{ '@type': 'Brand', '@id': `${abs(path)}#sponsor`, name: s.name, ...(s.url ? { url: s.url } : {}), description: s.what }],
  });
  const backed = EVENTS.filter((e) => e.sponsors.includes(s.id));

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Partners &middot; Sponsor</p>
        <div className="mb-8 grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className={cx('flex h-48 items-center justify-center rounded-lg p-6', s.plate === 'light' ? 'bg-white' : 'bg-[#1d2130]')}>
            <img src={s.logo.src} alt={s.name} width={s.logo.width} height={s.logo.height} className="max-h-full w-auto max-w-full object-contain" />
          </div>
          <div>
            <h1 className="display mb-3">{s.name}</h1>
            <p className="lede mb-4">{s.what}</p>
            {s.url ? (
              <a href={s.url} target="_blank" rel="sponsored noopener" className="btn">
                Visit {s.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>

        <h2 className="h2 mb-2">What they&rsquo;ve backed</h2>
        <p className="mb-5 max-w-[60ch] text-ink2">
          Thank you, {s.name}. These LTK events happened because companies like this one put up the support.
        </p>
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {backed.map((e) => {
            const img = e.image ?? e.updates?.[0]?.image;
            return (
              <li key={e.id}>
                <a href={`/arena/tournaments/${e.id}/`} className="card group block h-full overflow-hidden">
                  {img ? <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" /> : null}
                  <div className="p-4">
                    <p className="mono mb-1 text-ink3">{e.when.split(' · ')[0]}</p>
                    <p className="font-semibold text-ink group-hover:text-blood">{e.name}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="discord-band mt-12 p-6 sm:p-8">
          <h2 className="h2 mb-2">Want your company here?</h2>
          <p className="mb-4 max-w-[58ch] text-ink2">
            Back a tournament, the fantasy league or a giveaway and get in front of the techs and owners who show up for it.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/partners/" className="btn">
              Why sponsor LTK
            </a>
            <a href="/partners/inventory/" className="btn btn--ghost">
              What you can sponsor
            </a>
            <DiscordButton variant="ghost">Message us</DiscordButton>
          </div>
        </div>
      </div>
    </>
  );
}
