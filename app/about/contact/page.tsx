import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { site } from '@/lib/site.config';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Who to reach for membership and verification, sponsorship, press and investor questions — routed separately so nothing lands in the wrong inbox.',
  path: '/about/contact/',
});

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Contact', href: '/about/contact/' },
  ];
  const graph = buildGraph({ path: '/about/contact/', pageType: 'ContactPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell max-w-measure pb-16">
        <p className="eyebrow mb-3">Trust</p>
        <h1 className="display mb-6">Contact</h1>
        <p className="prose-bulletin mb-8">
          Four routes, kept separate on purpose. A sponsor question and a verification question
          need different people and different response times.
        </p>

        <LabelBlock
          title="Where to write"
          specs={[
            { label: 'Membership', value: site.contact.membership },
            { label: 'Sponsorship', value: site.contact.sponsorship },
            { label: 'Press', value: site.contact.press },
            { label: 'Investors', value: site.contact.investors },
          ]}
        >
          Correcting something we published? Say which page and what is wrong — corrections go in
          dated and in place, per our{' '}
          <a href="/about/editorial-standards/" className="text-field underline underline-offset-2">
            editorial standards
          </a>
          .
        </LabelBlock>
      </div>
    </>
  );
}
