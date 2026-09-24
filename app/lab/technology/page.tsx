import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { TECHNOLOGY, TECHNOLOGY_BACKLOG } from '@/lib/content/lab';

/**
 * Technology explainer hub.
 *
 * WHY THIS EXISTS: /lab/compare/ had a hub and /lab/technology/ did not, so every explainer was
 * an orphan — reachable only by knowing its URL. A section with no index is a section search
 * engines and humans both fail to discover.
 *
 * SNIPPET SHAPE: list. The question behind this page is "what are all these things", which
 * resolves as an enumeration, not prose.
 *
 * The backlog is published openly rather than hidden. Naming what has not been written yet is
 * how a reader calibrates how much of the Lab exists — and it is an invitation for a member to
 * say "I have run that for two years, let me tell you what the brochure leaves out."
 */

export const metadata: Metadata = pageMeta({
  title: 'Pest control technology explainers',
  description:
    'What each technology actually is, where it genuinely fits, and where it does not. Written against published research and patent filings, not vendor marketing.',
  path: '/lab/technology/',
});

export default function TechnologyIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Technology', href: '/lab/technology/' },
  ];
  const graph = buildGraph({ path: '/lab/technology/', pageType: 'CollectionPage', crumbs });

  const published = new Set(TECHNOLOGY.map((t) => t.slug));
  const pending = TECHNOLOGY_BACKLOG.filter((slug) => !published.has(slug));

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Lab · Technology</p>
        <h1 className="display mb-5 max-w-[18ch]">Technology explainers</h1>
        <p className="prose-bulletin mb-10 max-w-[68ch]">
          Every explainer answers the same three questions: what the thing actually is, where it
          genuinely fits, and where it does not. The third one is the reason these exist. A
          manufacturer will tell you the first two accurately enough — nobody has a commercial
          reason to tell you the third.
        </p>

        {TECHNOLOGY.length === 0 ? (
          <LabelBlock title="Nothing published yet" signal="warning">
            No explainers have been published. This section publishes against sources, and an
            empty section is more honest than a fast one.
          </LabelBlock>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {TECHNOLOGY.map((t) => (
              <li key={t.slug} className="rule-t pt-4">
                <h2 className="h3 mb-1">
                  <a href={`/lab/technology/${t.slug}/`}>{t.name}</a>
                </h2>
                <p className="mono text-sm text-ink3">
                  {t.doesNotFit.length} documented limitations · {t.sources.length} sources ·
                  verified {t.verifiedOn}
                </p>
              </li>
            ))}
          </ul>
        )}

        {pending.length ? (
          <div className="rule-t mt-12 pt-6">
            <h2 className="h2 mb-3">Not written yet</h2>
            <p className="prose-bulletin mb-4 max-w-[68ch]">
              These are queued, in priority order. Priority is set by purchase value and by how
              poor the existing independent coverage is. If you run one of these daily, you know
              things the research does not — that is worth more to this section than another
              literature review.
            </p>
            <ul className="mono grid gap-1 text-ink3 md:grid-cols-2">
              {pending.map((slug) => (
                <li key={slug}>{slug.replace(/-/g, ' ')}</li>
              ))}
            </ul>
            <a href="/community/" className="btn mt-6">
              Tell us what the brochure leaves out
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
}
