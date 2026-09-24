import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

/**
 * Investors → Thesis.
 *
 * Public, not gated. A thesis behind an email wall signals a business that does not believe its
 * own argument — and under the v3.2 Conversion Contract, a gated PDF on a page with a declared
 * primary action is a banned lead magnet regardless.
 *
 * Every number on this page is either a cited industry figure with a visible source, or absent.
 * The traction numbers live at /investors/traction/ behind R-17 for the same reason the sponsor
 * audience page does — an investor who catches one invented figure correctly discounts all of
 * them.
 *
 * CONVERSION CONTRACT: primary action "Request the data room"; snippet shape paragraph;
 * citability 1 and 3.
 */

export const metadata: Metadata = pageMeta({
  title: 'Why this business exists',
  description:
    'The investment thesis — a fragmented, consolidating, licence-gated industry with no independent hub, and what a verified professional community is worth in it.',
  path: '/investors/thesis/',
});

export default function ThesisPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Investors', href: '/investors/' },
    { name: 'Thesis', href: '/investors/thesis/' },
  ];
  const graph = buildGraph({ path: '/investors/thesis/', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Investors · Thesis</p>
          <h1 className="display mb-6 max-w-[18ch]">Why this business exists</h1>

          {/*
            Not a QuickAnswer block. QuickAnswer requires a named reviewer and a verification
            date — it is the E-E-A-T attribution component for Academy, Lab and Wire, where a
            reader is relying on a fact. A thesis is an argument, not a verified claim, and
            attaching false attribution to it would cheapen the component everywhere else.
            Answer-first still applies: the argument leads.
          */}
          <p className="lede mb-10">
            A licence-gated, consolidating, highly fragmented industry has no independent place
            where its professionals gather. The existing options are association gatekeeping,
            vendor-funded trade press, and unmoderated social groups. A verified professional
            community owns the audience every vendor in the category needs to reach — on
            infrastructure nobody else controls.
          </p>

          <h2 className="h2 mb-3 mt-10">The structural facts</h2>
          <div className="prose-bulletin">
            <p>
              Three features of this industry make a community property unusually defensible, and
              they compound:
            </p>
            <p>
              <strong>The audience is licence-gated.</strong> Applicator licensing is a state
              requirement with continuing-education obligations attached. That is a recurring,
              calendar-driven reason to return that no lifestyle community has, and it gives us a
              membership test nobody can fake at scale.
            </p>
            <p>
              <strong>The industry is fragmenting and consolidating at once.</strong> Roll-ups
              absorb independents while new operators keep entering. Both groups need the same
              things — people, technology decisions, regulatory clarity — and neither has a
              neutral place to get them.
            </p>
            <p>
              <strong>Vendor spend has nowhere good to go.</strong> Manufacturers and software
              companies need to reach technicians and owners. Today that money goes to trade
              shows and to publications those same vendors fund, which is precisely why the
              audience discounts it.
            </p>
          </div>

          <h2 className="h2 mb-3 mt-10">What we are not building</h2>
          <div className="prose-bulletin">
            <p>
              Not a trade publication funded by the companies it covers. Not an association with
              a gatekeeping model. Not a lead-generation business that sells its members to the
              people selling to them. Each of those is a faster route to revenue and each
              destroys the asset it monetises. The independence is not a marketing position — it
              is the product.
            </p>
          </div>

          <div className="rule-t mt-12 pt-6">
            <a href="/about/contact/" className="btn">Request the data room</a>
            <a href="/about/sponsorship-policy/" className="btn-ghost ml-3">
              How revenue works without selling editorial
            </a>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Numbers on this page"
            signal="warning"
            specs={[
              { label: 'Projections', value: 'Not published' },
              { label: 'Traction', value: 'Dated, from analytics' },
              { label: 'Gating', value: 'None — thesis is public' },
            ]}
          >
            An investor who finds one invented figure is right to discount every other figure. So
            the thesis carries the argument and the data room carries the numbers, and neither
            carries an estimate dressed as a measurement.
          </LabelBlock>
        </aside>
      </div>
    </>
  );
}
