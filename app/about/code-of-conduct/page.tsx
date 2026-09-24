import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

export const metadata: Metadata = pageMeta({
  title: 'Code of conduct',
  description:
    'What is expected of members, what gets a post removed, what gets an account removed, and how enforcement decisions are made and appealed. Written plainly.',
  path: '/about/code-of-conduct/',
});

/**
 * REGISTRY R-08 — needs legal review before launch, but ship the draft. This is the first page a
 * sponsor's brand-safety reviewer opens and the page an entomologist checks before agreeing to
 * put their name and credential next to your members.
 *
 * The label-safety clause below is not boilerplate. A wrong dilution rate posted confidently in
 * a thread is a real-world harm, not a content-moderation abstraction.
 */
export default function CodeOfConductPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Code of conduct', href: '/about/code-of-conduct/' },
  ];
  const graph = buildGraph({ path: '/about/code-of-conduct/', pageType: 'AboutPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6 max-w-[13ch]">Code of conduct</h1>

          <p className="prose-bulletin">
            This is a working professionals&rsquo; forum. The bar is the same one you would apply
            on a job site with a customer standing nearby: direct is fine, blunt is fine, contempt
            is not.
          </p>

          <LabelBlock
            title="Label-legal advice is not optional here"
            signal="danger"
            meta="Removal without warning"
            className="mt-8"
          >
            Do not post an application rate, dilution, site or method that is off-label. Do not
            recommend one privately either. The label is the law in every state we operate in, a
            member acting on bad advice from this site can lose their licence or hurt someone, and
            we would rather lose the thread than carry that. Posts doing this are removed on sight
            and the reason is stated publicly in the thread.
          </LabelBlock>

          <div className="prose-bulletin mt-8">
            <h2 className="h2 mt-10 mb-3">What is expected</h2>
            <ul>
              <li>Say where your experience comes from. &ldquo;Twelve years in Gulf Coast multifamily&rdquo; is worth more than a confident assertion.</li>
              <li>Correct people on facts, not on tone or on how long they have been in the trade.</li>
              <li>Answer rookies properly. Everyone here was one, and the rookies forum exists so nobody has to pretend otherwise.</li>
              <li>Say when you are guessing.</li>
            </ul>

            <h2 className="h2 mt-10 mb-3">What gets a post removed</h2>
            <ul>
              <li>Off-label recommendations, as above.</li>
              <li>Naming and shaming a specific customer, address, or an identifiable colleague.</li>
              <li>Undisclosed commercial interest — if you sell it, distribute it, or are paid to promote it, say so in the post.</li>
              <li>Recruiting or advertising outside <a href="/trade/">Trade</a>.</li>
              <li>Harassment, slurs, or making someone&rsquo;s identity the subject.</li>
            </ul>

            <h2 className="h2 mt-10 mb-3">What gets an account removed</h2>
            <ul>
              <li>Falsifying a licence or verification detail. This one is permanent and there is no appeal.</li>
              <li>Repeated off-label advice after a removal and a warning.</li>
              <li>Sustained harassment of another member.</li>
              <li>Scraping member data or using the directory for bulk outreach.</li>
            </ul>

            <h2 className="h2 mt-10 mb-3">How enforcement works</h2>
            <p>
              Moderators are named, and they are working professionals rather than anonymous
              accounts. A removal is explained in the thread where it happened. You can appeal to
              the editorial lead, in writing, once — and if we got it wrong we will say so in the
              same thread.
            </p>

            <h2 className="h2 mt-10 mb-3">We do not delete threads to tidy up</h2>
            <p>
              An individual post can be removed. A whole thread is not deleted because it got
              heated, because it aged, or because a sponsor did not enjoy it. People link to these
              threads and cite them; breaking those links quietly is its own kind of dishonesty.
              Threads that need correcting get an editor&rsquo;s note at the top, dated.
            </p>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Enforcement at a glance"
            signal="warning"
            specs={[
              { label: 'Off-label advice', value: 'Removed on sight, stated publicly' },
              { label: 'Falsified licence', value: 'Permanent, no appeal' },
              { label: 'Moderators', value: 'Named working professionals' },
              { label: 'Appeals', value: 'Once, in writing, to the editorial lead' },
              { label: 'Thread deletion', value: 'Effectively never' },
            ]}
          />
          <p className="mono text-ink3">
            Related:{' '}
            <a className="text-field underline underline-offset-2" href="/about/verification/">
              how verification works
            </a>
          </p>
        </aside>
      </div>
    </>
  );
}
