import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';

export const metadata: Metadata = pageMeta({
  title: 'Editorial standards',
  description:
    'How regulatory content here is researched, sourced, reviewed, dated and corrected. Read by search engines, sponsors and journalists, so it is written for all.',
  path: '/about/editorial-standards/',
});

export default function EditorialStandardsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Editorial standards', href: '/about/editorial-standards/' },
  ];
  const graph = buildGraph({ path: '/about/editorial-standards/', pageType: 'AboutPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell max-w-measure pb-16">
        <p className="eyebrow mb-3">Trust</p>
        <h1 className="display mb-6">Editorial standards</h1>

        <div className="prose-bulletin">
          <p>
            <strong>Sourcing.</strong> Every regulatory figure on this site is sourced to the
            issuing state agency. We do not source regulatory facts from other companies&rsquo;
            blog posts. Each figure carries a source link and a verification date.
          </p>
          <p>
            <strong>Review.</strong> Every page carrying licensing, CEU or pesticide-related
            technical content is written by a named editor and reviewed by a named subject
            reviewer before it publishes. Both names appear on the page.
          </p>
          <p>
            <strong>Dating.</strong> The visible &ldquo;last verified&rdquo; date and the machine-readable
            modification date are the same value. State requirements change; a figure without a
            date is not information.
          </p>
          <p>
            <strong>Gaps.</strong> When we have not yet verified something, the page says so
            rather than estimating. An honest gap is a better page than a confident wrong number.
          </p>
          <p>
            <strong>Corrections.</strong> Errors are corrected in place with a dated correction
            note, not silently overwritten. Members report rule changes faster than agencies
            publish them, and we would rather be told.
          </p>
          <p>
            <strong>Independence.</strong> Product reviews and comparisons are never sponsored.
            The wall between sponsorship and editorial is stated in full on the{' '}
            <a href="/about/sponsorship-policy/">sponsorship policy</a> page, and review testing
            is described on the <a href="/about/review-methodology/">review methodology</a> page.
          </p>
        </div>
      </div>
    </>
  );
}
