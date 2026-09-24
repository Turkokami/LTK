import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { STATES } from '@/lib/content/states';

export const metadata: Metadata = pageMeta({
  title: 'Pest control CEU requirements by state',
  description:
    'Continuing education requirements for pesticide applicators in every state: hours per cycle, accepted formats, approved providers and renewal deadlines.',
  path: '/academy/ceu/',
});

/** Layer-2 index. Also the internal-linking hub that gives all 50 state pages a parent. */
export default function CeuIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'CEU requirements', href: '/academy/ceu/' },
  ];
  const graph = buildGraph({ path: '/academy/ceu/', pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Academy · CEU requirements</p>
        <h1 className="display mb-5 max-w-[16ch]">CEU requirements, state by state</h1>
        <p className="prose-bulletin mb-10">
          Continuing education is written per state and usually per licence category, not as a
          single national total. We publish each state separately, source every figure to the
          issuing agency, and date it. States still in verification are marked.
        </p>

        <ul className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {STATES.map((s) => (
            <li key={s.code}>
              <a
                href={`/academy/ceu/${s.slug}/`}
                className="flex items-baseline justify-between bg-paper px-3 py-3 hover:bg-fieldTint"
              >
                <span className="text-sm">{s.name}</span>
                <span className="mono text-ink3">
                  {s.verified ? s.code : `W${s.wave}`}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mono mt-4 text-ink3">
          W1 / W2 / W3 marks the verification wave for states not yet published.
        </p>
      </div>
    </>
  );
}
