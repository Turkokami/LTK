import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { personNode } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { peopleByRole } from '@/lib/content/people';

export const metadata: Metadata = pageMeta({
  title: 'Advisory board',
  description:
    'The certified entomologists who review technical content here, teach the Academy sessions, and put their name and credential number next to what we publish.',
  path: '/about/advisory-board/',
});

/**
 * REGISTRY R-05. The highest-leverage asset in the whole build and the longest lead time.
 *
 * It does five jobs at once: it makes regulatory content rankable in a YMYL-adjacent vertical,
 * it gives a sponsor's marketing team the technical defensibility they need, it signals to
 * capital that this is an institution rather than a media hobby, it brings members who show up
 * for a specific person by name, and it earns links from the institutions the advisors belong to.
 */
export default function AdvisoryBoardPage() {
  const advisors = peopleByRole('advisor');
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Advisory board', href: '/about/advisory-board/' },
  ];

  const graph = buildGraph({
    path: '/about/advisory-board/',
    pageType: 'AboutPage',
    crumbs,
    primary: advisors.map((a) =>
      personNode({
        name: a.name,
        path: `/about/team/${a.slug}/`,
        jobTitle: a.jobTitle,
        affiliation: a.affiliation,
        sameAs: a.sameAs,
        credential: a.credential
          ? {
              category: a.credential.category,
              identifier: a.credential.identifier,
              issuedBy: a.credential.issuedBy,
            }
          : undefined,
      }),
    ),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Trust</p>
        <h1 className="display mb-6 max-w-[14ch]">Advisory board</h1>
        <p className="prose-bulletin mb-10">
          Technical content here is reviewed by certified entomologists who let us publish their
          name, their credential and their affiliation next to it. That is the standard we hold
          ourselves to, and it is the reason you can act on what you read here.
        </p>

        {advisors.length === 0 ? (
          <LabelBlock title="Board in formation" signal="warning" meta="R-05">
            We are not listing anyone until they have signed on and their credential has been
            checked. A page of plausible-looking names would be the fastest way to lose the trust
            this whole site is built to earn.
          </LabelBlock>
        ) : (
          <ul className="grid gap-px bg-rule md:grid-cols-2">
            {advisors.map((a) => (
              <li key={a.slug} className="bg-paper p-5">
                <h2 className="h3 mb-1">
                  <a href={`/about/team/${a.slug}/`} className="hover:text-field">
                    {a.name}
                  </a>
                </h2>
                <p className="mono mb-2 text-ink3">
                  {a.jobTitle}
                  {a.affiliation ? ` · ${a.affiliation}` : ''}
                </p>
                <p className="text-sm text-ink2">{a.bio}</p>
                {a.credential ? (
                  <p className="mono mt-3 text-field">
                    {a.credential.category}
                    {a.credential.identifier ? ` · ${a.credential.identifier}` : ''} ·{' '}
                    {a.credential.issuedBy}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
