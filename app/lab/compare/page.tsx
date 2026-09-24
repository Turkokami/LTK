import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { COMPARISONS } from '@/lib/content/lab';

export const metadata: Metadata = pageMeta({
  title: 'Head-to-head comparisons',
  description:
    'Products and software compared on identical criteria, published before testing began. No sponsored placements, no paid inclusion, no vendor preview.',
  path: '/lab/compare/',
});

export default function CompareIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Comparisons', href: '/lab/compare/' },
  ];
  const graph = buildGraph({ path: '/lab/compare/', pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Lab · Comparisons</p>
        <h1 className="display mb-5 max-w-[16ch]">Head-to-head comparisons</h1>
        <p className="prose-bulletin mb-10">
          Every product in a set is assessed against the same criteria, written and published
          before testing starts. Where a criterion cannot be assessed for a product, the cell says
          so — it is never scored zero and never dropped.
        </p>

        {COMPARISONS.length === 0 ? (
          <LabelBlock title="No comparisons published yet" signal="warning">
            The methodology publishes before the first comparison does. Read{' '}
            <a href="/about/review-methodology/" className="text-field underline underline-offset-2">
              how we test
            </a>{' '}
            and tell us which comparison would actually be useful to you.
          </LabelBlock>
        ) : (
          <ul className="grid gap-px bg-rule md:grid-cols-2">
            {COMPARISONS.map((c) => (
              <li key={c.slug}>
                <a href={`/lab/compare/${c.slug}/`} className="group block h-full bg-paper p-5 hover:bg-stock2">
                  <p className="eyebrow mb-2">{c.category}</p>
                  <h2 className="h3 group-hover:text-field">{c.shortTitle}</h2>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
