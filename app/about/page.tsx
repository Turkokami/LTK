import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';

const HUB = getHub('about');

export const metadata: Metadata = pageMeta({
  title: 'Who runs this and how it works',
  description:
    'The team, the advisory board, how content is researched and reviewed, how product reviews are run, and how member licences are verified. All of it in public.',
  path: HUB.path,
});

/**
 * The Trust hub index. These pages ship BEFORE content, not after — they establish the entity
 * that everything else references. Every link below goes to a page that states a policy, not a
 * page that describes an aspiration.
 */
export default function AboutPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: HUB.path },
  ];
  const graph = buildGraph({ path: HUB.path, pageType: 'AboutPage', crumbs });

  const pages = [
    {
      href: '/about/verification/',
      title: 'How licence verification works',
      blurb:
        'What we ask for, what we check it against, what appears publicly, and what we never publish or sell.',
    },
    {
      href: '/about/editorial-standards/',
      title: 'Editorial standards',
      blurb:
        'How regulatory content is sourced, reviewed, dated and corrected — and what we do when we have not verified something yet.',
    },
    {
      href: '/about/review-methodology/',
      title: 'How we test and review',
      blurb:
        'Testing protocol, scoring criteria, the separation of editorial scores from member ratings, and the flat statement that reviews are not for sale.',
    },
    {
      href: '/about/sponsorship-policy/',
      title: 'Sponsorship policy',
      blurb:
        'What a sponsor can buy, what no amount of money buys, how sponsored content is labelled, and why member data is not for sale.',
    },
    {
      href: '/about/code-of-conduct/',
      title: 'Code of conduct',
      blurb:
        'What is expected, what gets a post removed, what gets an account removed, and how enforcement is decided and appealed.',
    },
    {
      href: '/about/advisory-board/',
      title: 'Advisory board',
      blurb:
        'The certified entomologists who review technical content and put their credential next to what we publish.',
    },
    {
      href: '/about/press/',
      title: 'Press',
      blurb: 'What we can speak to on the record, and what we will not do with member information.',
    },
    {
      href: '/about/contact/',
      title: 'Contact',
      blurb: 'Four routes: membership, sponsorship, press, investors.',
    },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Trust</p>
        <h1 className="display mb-5 max-w-[16ch]">Who runs this and how it works</h1>
        <p className="prose-bulletin mb-10">
          This site publishes regulatory guidance that people act on and reviews that influence
          real purchase decisions. Everything about how that gets made — sourcing, review,
          dating, corrections, sponsorship boundaries, moderation — is written down here rather
          than assumed. If something below is vague, that is a defect and we want to hear about it.
        </p>

        <ul className="grid gap-px bg-rule md:grid-cols-2">
          {pages.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="group block h-full bg-paper p-5 hover:bg-stock2">
                <h2 className="h3 mb-2 group-hover:text-field">{p.title}</h2>
                <p className="text-sm leading-relaxed text-ink2">{p.blurb}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
