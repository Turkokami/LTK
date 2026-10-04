import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { bylineNodes, personRef } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { SOFTWARE_GUIDES } from '@/lib/content/software';
import { EDITOR } from '@/lib/content/editorial';
import { abs, ID, site } from '@/lib/site.config';

/**
 * /lab/software/<slug>/ — a researched guide to one pest control business platform. Labelled
 * plainly as research, not a hands-on review: no scores, no verdict, prices as published.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SOFTWARE_GUIDES.map((g) => ({ slug: g.slug }));
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = SOFTWARE_GUIDES.find((x) => x.slug === slug);
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.description, path: `/lab/software/${g.slug}/`, ogTemplate: 'lab' });
}

export default async function SoftwarePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = SOFTWARE_GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();
  const path = `/lab/software/${g.slug}/`;
  const url = abs(path);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Software', href: '/lab/software/' },
    { name: g.name, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: g.title,
        description: g.summary,
        mainEntityOfPage: { '@id': ID.webpage(url) },
        author: personRef(EDITOR),
        publisher: { '@id': ID.organization },
        dateModified: g.checked,
        about: { '@type': 'SoftwareApplication', name: g.name, applicationCategory: 'BusinessApplication', url: g.url, author: { '@type': 'Organization', name: g.maker } },
        citation: g.sources.map((s) => s.url),
      },
      ...bylineNodes(EDITOR),
    ],
  });
  const others = SOFTWARE_GUIDES.filter((x) => x.slug !== g.slug);

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Lab &middot; Software guide</p>
        <h1 className="display mb-4 max-w-[20ch]">{g.name}</h1>
        <p className="lede mb-6 max-w-[62ch]">{g.summary}</p>

        <div className="mb-8 rounded-md border border-warning/60 bg-stock2 p-4 text-sm text-ink2">
          <span className="font-semibold text-ink">Researched guide, not a hands-on review.</span> We haven&rsquo;t tested
          {` ${g.name}`}. This is what the vendor publishes, checked {fmt(g.checked)}, plus the questions worth asking in a
          demo. Using it? Tell the crew how it really runs in the {site.discord.name}.
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <LabelBlock
            title="At a glance"
            signal="field"
            specs={[
              { label: 'Made by', value: g.maker },
              { label: 'Built for', value: g.builtFor },
              { label: 'Pest-specific', value: g.pestSpecific ? 'Yes — built for pest control' : 'No — general field-service software' },
              { label: 'Pricing', value: g.pricing },
              { label: 'Website', value: <a href={g.url} target="_blank" rel="noopener noreferrer" className="link">{g.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a> },
            ]}
          />
          <section className="label-panel" aria-label="Core features">
            <div className="label-bar">
              <span>Core features</span>
            </div>
            <ul className="list-disc space-y-1 py-4 pl-[2.6rem] pr-5 text-[0.9375rem] text-ink2">
              {g.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="label-panel" aria-label="Pest-control features">
            <div className="label-bar">
              <span>Pest-control features</span>
            </div>
            {g.pestFeatures.length ? (
              <ul className="list-disc space-y-1 py-4 pl-[2.6rem] pr-5 text-[0.9375rem] text-ink2">
                {g.pestFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : (
              <p className="py-4 pl-[1.35rem] pr-5 text-[0.9375rem] text-ink2">
                The vendor doesn&rsquo;t list pest-specific features such as chemical use records, WDO reports or bait-station
                tracking. Check how you&rsquo;d handle those before switching.
              </p>
            )}
          </section>
          <section className="label-panel" aria-label="Questions to ask in a demo">
            <div className="label-bar">
              <span>Ask in the demo</span>
            </div>
            <ol className="list-decimal space-y-1 py-4 pl-[2.6rem] pr-5 text-[0.9375rem] text-ink2">
              {g.checkBeforeBuying.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </section>
        </div>

        {g.integrations.length ? (
          <p className="mt-6 max-w-[70ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Integrations the vendor lists:</span> {g.integrations.join(', ')}.
          </p>
        ) : null}

        <section className="mt-8" aria-labelledby="sources">
          <h2 id="sources" className="h3 mb-2">
            Sources
          </h2>
          <ul className="space-y-1 text-sm">
            {g.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink3">Checked {fmt(g.checked)}. Software changes fast — confirm pricing and features with the vendor.</p>
        </section>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Run your company on {g.name}?</span> The crew wants the real story.
          </p>
          <DiscordButton>Share on Discord</DiscordButton>
        </div>

        <h2 className="h2 mb-4 mt-12">Other software guides</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <a href={`/lab/software/${o.slug}/`} className="card group block h-full p-4">
                <p className="font-semibold text-ink group-hover:text-blood">{o.name}</p>
                <p className="mono mt-1 text-ink3">{o.pestSpecific ? 'Pest-specific' : 'General field service'}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
