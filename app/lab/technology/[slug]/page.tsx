import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { stateReferenceEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { TECHNOLOGY, getTechnology } from '@/lib/content/lab';

/**
 * Technology explainer.
 *
 * CONVERSION CONTRACT: primary action "See what members use"; snippet shape paragraph
 * (answer-first definition) followed by a real list; citability 1, 2 and 3.
 *
 * The "where it does not fit" section is the point of the page. Manufacturer marketing never
 * writes it, which is exactly why a technician researching a five-figure purchase cannot find
 * the answer anywhere. It is also citability signal 3 — a stated position a competitor could
 * disagree with.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return TECHNOLOGY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTechnology(slug);
  if (!t) return {};
  return pageMeta({
    // Was `.slice(0, 60)`, which truncated mid-word and also ignored the brand suffix the
    // layout appends — so the visible title could still overshoot AND read as a broken
    // sentence. fitTitle degrades to a shorter whole phrase instead of cutting one in half.
    title: fitTitle([
      `${t.name} — what it is and where it fits`,
      `${t.name}: where it fits and where it doesn't`,
      `${t.name} explained`,
      t.name,
    ]),
    description: pickDescription(
      `${t.name} — how it works, the jobs it suits, and the jobs it does not.`,
      [
        'Written against published research and patent filings rather than vendor marketing.',
        'Written against published research and field studies, not vendor marketing.',
        'Written against published research, not vendor marketing.',
        'Sourced, dated, and specific about the limits.',
      ],
    ),
    path: `/lab/technology/${t.slug}/`,
    ogTemplate: 'lab',
  });
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTechnology(slug);
  if (!t) notFound();

  const path = `/lab/technology/${t.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Technology', href: '/lab/technology/' },
    { name: t.name, href: path },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: stateReferenceEntities({
      path,
      headline: `${t.name} — what it is and where it fits`,
      stateName: 'United States',
      dateModified: t.verifiedOn,
      author: { name: t.reviewer.name, path: t.reviewer.path },
      about: t.name,
    }),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Lab · Technology</p>
          <h1 className="display mb-6 max-w-[18ch]">{t.name}</h1>

          <QuickAnswer
            question={`What is ${t.name.toLowerCase()}?`}
            answer={t.definition}
            verifiedOn={t.verifiedOn}
            reviewer={{ name: t.reviewer.name, credential: t.reviewer.credential, href: t.reviewer.path }}
          />

          <h2 className="h2 mb-3 mt-10">Where it fits</h2>
          <ul className="prose-bulletin">
            {t.fits.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h2 className="h2 mb-3 mt-10">Where it does not</h2>
          <p className="prose-bulletin">
            This is the part the brochure leaves out, so it is the part worth reading.
          </p>
          <ul className="prose-bulletin">
            {t.doesNotFit.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          {t.sources.length ? (
            <>
              <h2 className="h2 mb-3 mt-10">Sources</h2>
              <ul className="prose-bulletin">
                {t.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="rule-t mt-12 pt-6">
            <a href="/lab/" className="btn">
              See what members use
            </a>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Independence"
            signal="danger"
            specs={[
              { label: 'Sponsored', value: 'No' },
              { label: 'Vendor review', value: 'None — nobody saw this first' },
              { label: 'Reviewer', value: t.reviewer.name },
            ]}
          >
            <a href="/about/review-methodology/" className="text-field underline underline-offset-2">
              How we test and review
            </a>
          </LabelBlock>
        </aside>
      </div>
    </>
  );
}
