import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

export const metadata: Metadata = pageMeta({
  title: 'How we test and review',
  description:
    'Our testing protocol, scoring criteria, how member ratings are collected, and the flat statement that reviews here are not for sale and never have been.',
  path: '/about/review-methodology/',
});

/**
 * BUILD-PLAN Phase 4 gate: this page ships BEFORE the first review exists.
 *
 * The independence of the Lab is the entire value of the Lab. The moment a review can be bought,
 * the hub is worthless — and so is every sponsorship dollar attached to it, because what a
 * manufacturer is buying is proximity to credibility. Publishing the wall is what lets you
 * charge more, not less.
 */
export default function ReviewMethodologyPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Review methodology', href: '/about/review-methodology/' },
  ];
  const graph = buildGraph({
    path: '/about/review-methodology/',
    pageType: 'AboutPage',
    crumbs,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6 max-w-[14ch]">How we test and review</h1>

          {/* The one DANGER signal permitted on this page. */}
          <LabelBlock
            title="Reviews are not for sale"
            signal="danger"
            meta="Standing policy"
          >
            No manufacturer, distributor, software vendor or sponsor can buy a review, influence a
            score, see a review before publication, or have a review removed. There is no tier of
            sponsorship that changes this and there never will be. If someone tells you otherwise,
            they are not speaking for us — tell us and we will correct it publicly.
          </LabelBlock>

          <div className="prose-bulletin mt-8">
            <h2 className="h2 mt-10 mb-3">What we review</h2>
            <p>
              Equipment, chemistry-adjacent application gear, monitoring technology and
              field-service software — the things members spend real money on and cannot easily
              evaluate before buying. We do not review products we have not used, and we do not
              publish a review built only from a spec sheet.
            </p>

            <h2 className="h2 mt-10 mb-3">How products are obtained</h2>
            <p>
              We buy what we can. Where a manufacturer supplies a unit, that is stated at the top
              of the review, in the label system, not in small print at the bottom. Supplied units
              are returned or disposed of after testing; we do not keep them and we do not resell
              them.
            </p>

            <h2 className="h2 mt-10 mb-3">How testing works</h2>
            <p>
              Every product in a category is assessed against the same published criteria, in the
              same conditions, by the same reviewer where possible. The criteria are written and
              published <em>before</em> testing begins, so nobody can reverse-engineer a scoring
              rubric that flatters a favourite. Where a product is tested in the field rather than
              on a bench, the protocol and the raw data are published alongside the conclusion.
            </p>

            <h2 className="h2 mt-10 mb-3">Editorial scores and member ratings are separate</h2>
            <p>
              You will see two numbers and they never mix. The <strong>editorial assessment</strong>{' '}
              is one reviewer&rsquo;s judgement against published criteria, signed by name. The{' '}
              <strong>member rating</strong> is an aggregate of ratings from licence-verified
              members who have used the product in the field.
            </p>
            <p>
              Only the member rating is published as a machine-readable aggregate rating. An
              editorial score is one person&rsquo;s opinion and marking it up as an aggregate would
              misrepresent it to search engines and to anyone reading a rich result.
            </p>

            <h2 className="h2 mt-10 mb-3">Comparisons</h2>
            <p>
              Head-to-head comparisons use identical criteria across every product in the set. If a
              product cannot be assessed on a criterion, that cell says so rather than being
              scored zero or quietly dropped.
            </p>

            <h2 className="h2 mt-10 mb-3">Corrections and right of reply</h2>
            <p>
              Manufacturers may contest a factual error and we will correct it, dated and in place.
              They may not contest a conclusion. A disputed conclusion gets a linked response, not
              a rewrite.
            </p>

            <h2 className="h2 mt-10 mb-3">Affiliate links</h2>
            <p>
              If we ever use them, they will be disclosed on the page and they will never affect
              which products are reviewed, how they score, or the order they appear in.
            </p>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Scoring inputs"
            specs={[
              { label: 'Editorial score', value: 'One named reviewer, published criteria' },
              { label: 'Member rating', value: 'Verified members only, field use' },
              { label: 'Marked up as rating', value: 'Member rating only' },
              { label: 'Sponsor influence', value: 'None, at any tier' },
            ]}
          />
          <p className="mono text-ink3">
            Related:{' '}
            <a className="text-field underline underline-offset-2" href="/about/sponsorship-policy/">
              sponsorship policy
            </a>
          </p>
        </aside>
      </div>
    </>
  );
}
