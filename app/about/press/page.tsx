import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { site } from '@/lib/site.config';
import { EPISODES } from '@/lib/content/podcast';

export const metadata: Metadata = pageMeta({
  title: 'Press',
  description:
    'What we are, who to contact, what we can speak to on the record, and where to find brand assets. Written for journalists covering the pest management industry.',
  path: '/about/press/',
});

/**
 * Feeds the Reviews dimension — the chronic weak spot across the whole portfolio. Off-page
 * proof does not accumulate by itself; a press page that makes a journalist's job easy is the
 * cheapest way to start it.
 */
export default function PressPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Press', href: '/about/press/' },
  ];
  const graph = buildGraph({ path: '/about/press/', pageType: 'AboutPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6">Press</h1>

          <div className="prose-bulletin">
            <h2 className="h2 mt-8 mb-3">In one line</h2>
            <p>
              {site.name} is a professional community and continuing-education platform for
              licensed pest management professionals in the United States, where posting requires
              a verified applicator licence.
            </p>

            <h2 className="h2 mt-10 mb-3">What we can speak to</h2>
            <ul>
              <li>State-by-state applicator licensing and continuing-education requirements, and how they differ.</li>
              <li>Technician recruitment and retention, and what the work actually pays.</li>
              <li>Adoption of monitoring technology, sensor networks and field-service software in the trade.</li>
              <li>What working technicians say about regulatory changes, drawn from the forums.</li>
            </ul>

            <h2 className="h2 mt-10 mb-3">What we will not do</h2>
            <p>
              We do not provide member contact details to journalists, and we do not quote a
              forum post without the member&rsquo;s permission — including posts that are publicly
              readable. Members write here expecting to be talking to their trade.
            </p>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Media contact"
            specs={[
              {
                label: 'Contact',
                value: site.contact.press ? (
                  <a href={`mailto:${site.contact.press}`} className="link">{site.contact.press}</a>
                ) : (
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                    Message LTK on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ),
              },
              {
                label: 'Brand assets',
                value: (
                  <>
                    <a href="/brand/logo-1200.jpg" className="link">Badge logo, 1200px</a>
                    {' · '}
                    <a href="/brand/ltk-banner.jpg" className="link">Banner</a>
                  </>
                ),
              },
              {
                label: 'Coverage',
                value: (
                  <>
                    {EPISODES.map((e, i) => (
                      <span key={e.slug}>
                        {i ? ' · ' : ''}
                        <a href={`https://www.youtube.com/watch?v=${e.youtubeId}`} target="_blank" rel="noopener noreferrer" className="link">
                          {e.show}
                        </a>
                      </span>
                    ))}
                  </>
                ),
              },
            ]}
          />
        </aside>
      </div>
    </>
  );
}
