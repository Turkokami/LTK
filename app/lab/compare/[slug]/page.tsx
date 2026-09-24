import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { COMPARISONS, getComparison } from '@/lib/content/lab';
import { abs, ID } from '@/lib/site.config';
import { formatVerified } from '@/lib/utils';

/**
 * Head-to-head comparison. Highest commercial intent on the site and the page type
 * disproportionately cited by answer engines, because a comparison is a question with a
 * bounded answer set.
 *
 * CONVERSION CONTRACT (lib/content/conversion.ts):
 *   primary action  — Read the methodology
 *   snippet shape   — table, backed by a real <table> with identical criteria across the set
 *   citability      — all four signals. This is the only page type expected to hit all four.
 *
 * The identical-criteria rule is not a style preference. If a criterion cannot be assessed for
 * one product, the cell says so — it is never scored zero and never quietly dropped, because
 * both of those silently flatter whichever product we happened to test more thoroughly.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return pageMeta({
    title: c.title.slice(0, 60),
    description: c.metaDescription,
    path: `/lab/compare/${c.slug}/`,
    ogTemplate: 'lab',
  });
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const path = `/lab/compare/${c.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Comparisons', href: '/lab/compare/' },
    { name: c.shortTitle, href: path },
  ];

  const url = abs(path);

  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${url}#comparison`,
        name: c.title,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: c.products.length,
        itemListElement: c.products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            '@id': `${url}#product-${p.slug}`,
            name: p.name,
            brand: { '@type': 'Brand', name: p.brand },
            category: c.category,
            // AggregateRating ONLY from verified-member ratings. Never an editorial score.
            // docs/SCHEMA.md policy line; omitted entirely when nobody has rated it.
            ...(p.memberRating && p.memberRating.count > 0
              ? {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: p.memberRating.value,
                    reviewCount: p.memberRating.count,
                    bestRating: 5,
                  },
                }
              : {}),
          },
        })),
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: c.title,
        mainEntityOfPage: { '@id': ID.webpage(url) },
        author: { '@id': abs(c.reviewer.path) + '#person' },
        publisher: { '@id': ID.organization },
        dateModified: c.testedOn,
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Lab · Comparison · {c.category}</p>
        <h1 className="display mb-6 max-w-[20ch]">{c.title}</h1>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <QuickAnswer
            question={c.question}
            answer={c.answer}
            fact={c.hardFact}
            verifiedOn={c.testedOn}
            reviewer={{ name: c.reviewer.name, credential: c.reviewer.credential, href: c.reviewer.path }}
          />

          {/* The one DANGER signal on this page. Independence is the entire value of the Lab. */}
          <LabelBlock title="How this was tested" signal="danger" meta="Methodology">
            Every product here was assessed against the same criteria, written and published
            before testing began. Nobody paid for inclusion, placement or a score, and no
            manufacturer saw this before you did.{' '}
            <a href="/about/review-methodology/" className="text-field underline underline-offset-2">
              Read the methodology
            </a>
          </LabelBlock>
        </div>

        {/* SNIPPET SHAPE: table. Real semantic markup, per Keystone 4.3. */}
        <h2 className="h2 mb-3 mt-12">Side by side</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-ink bg-paper text-sm">
            <caption className="sr-only">
              {c.title} — identical criteria applied to every product in the set
            </caption>
            <thead>
              <tr className="bg-ink text-stock">
                <th scope="col" className="mono px-3 py-2 text-left uppercase">
                  Criterion
                </th>
                {c.products.map((p) => (
                  <th scope="col" key={p.slug} className="mono px-3 py-2 text-left uppercase">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.criteria.map((crit) => (
                <tr key={crit.key} className="rule-t">
                  <th scope="row" className="px-3 py-2 text-left font-semibold">
                    {crit.label}
                  </th>
                  {c.products.map((p) => {
                    const cell = p.scores[crit.key];
                    return (
                      <td key={p.slug} className="px-3 py-2">
                        {cell ?? (
                          // Never a zero, never a blank. An unassessable criterion says so.
                          <span className="mono text-ink3">Not assessable — see notes</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="rule-t bg-stock2">
                <th scope="row" className="px-3 py-2 text-left font-semibold">
                  Member rating
                </th>
                {c.products.map((p) => (
                  <td key={p.slug} className="mono px-3 py-2">
                    {p.memberRating && p.memberRating.count > 0 ? (
                      <>
                        {p.memberRating.value.toFixed(1)} / 5{' '}
                        <span className="text-ink3">({p.memberRating.count} verified)</span>
                      </>
                    ) : (
                      <span className="text-ink3">Not yet rated</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mono mt-2 text-ink3">
          Member ratings come from licence-verified members reporting field use. Editorial
          assessment and member rating are separate numbers and never blended.
        </p>

        <h2 className="h2 mb-3 mt-12">What we would actually buy</h2>
        <div className="prose-bulletin">{c.verdict}</div>

        <div className="rule-t mt-12 pt-6">
          <a href="/about/review-methodology/" className="btn">
            Read the methodology
          </a>
          <p className="mono mt-3 text-ink3">
            Tested {formatVerified(c.testedOn)} · Criteria published before testing began
          </p>
        </div>
      </div>
    </>
  );
}
