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

/** Email once REGISTRY R-07 lands; until then the channel that actually reaches someone. */
function route(email: string | null, fallback: 'discord' | 'linkedin', label: string) {
  if (email) {
    return (
      <a href={`mailto:${email}`} className="link">
        {email}
      </a>
    );
  }
  const href = fallback === 'discord' ? site.discord.invite : site.social.linkedin;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

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
          Kept separate on purpose — a sponsor question and a membership question need different
          people. The fastest way to reach anyone at LTK today is the Discord.
        </p>

        <LabelBlock
          title="Where to write"
          specs={[
            { label: 'Membership', value: route(site.contact.membership, 'discord', 'Message the crew in the Discord') },
            { label: 'Sponsorship', value: route(site.contact.sponsorship, 'linkedin', 'Message LTK on LinkedIn') },
            { label: 'Press', value: route(site.contact.press, 'linkedin', 'Message LTK on LinkedIn') },
            { label: 'Investors', value: route(site.contact.investors, 'linkedin', 'Message LTK on LinkedIn') },
            { label: 'Corrections', value: route(null, 'discord', 'Flag it in the Discord') },
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
