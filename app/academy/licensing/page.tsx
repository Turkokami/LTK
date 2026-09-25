import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { PUBLISHED_STATES, STATES } from '@/lib/content/states';
import { abs, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * /academy/licensing/ — index for geo layer 1. Only verified states have licensing pages;
 * the rest are listed so the reader can see where their state stands and ask in the Discord.
 */

const PATH = '/academy/licensing/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control licensing requirements by state',
  description:
    'How pest control licensing works state by state: the agency, licence categories, exams and renewal rules, verified against each state agency and dated.',
  path: PATH,
});

export default function LicensingIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Licensing', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(PATH)}#states`,
        name: 'Pest control licensing requirements by state',
        numberOfItems: PUBLISHED_STATES.length,
        itemListElement: PUBLISHED_STATES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${s.name} pest control licensing`,
          url: abs(`/academy/licensing/${s.slug}/`),
        })),
      },
    ],
  });
  const pending = STATES.filter((s) => !PUBLISHED_STATES.includes(s));

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Academy &middot; Licensing</p>
        <h1 className="display mb-6 max-w-[18ch]">Licensing requirements, state by state</h1>

        <div className="mb-12 max-w-[52rem]">
          <QuickAnswer
            question="How do you get a pest control license?"
            answer={
              <>
                Structural pest control is licensed by each state, usually through its department
                of agriculture or a dedicated pest control board. Most states split the licence
                into categories such as general pest, termite and fumigation, require an exam for
                each, and set their own renewal cycle and continuing-education rules.
              </>
            }
            fact="The categories, exams and renewal rules differ in every state — pick yours below."
            verifiedOn="2026-09-23"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />
        </div>

        <h2 className="h2 mb-2">Verified states</h2>
        <p className="mb-5 max-w-[62ch] text-ink2">
          Each of these was checked against the state agency and dated. Open one for the licence
          categories, exam structure and renewal rules.
        </p>
        <StateGrid states={PUBLISHED_STATES} hrefFor={(s) => `/academy/licensing/${s.slug}/`} />

        <h2 className="h2 mb-2 mt-14">Being verified</h2>
        <p className="mb-5 max-w-[62ch] text-ink2">
          We publish a state only after checking every figure against its own regulator &mdash; a
          wrong licensing number is worse than none. Until yours is up, someone in the{' '}
          {site.discord.name} has probably licensed there.
        </p>
        <ul className="mb-6 flex flex-wrap gap-2">
          {pending.map((s) => (
            <li key={s.code} className="mono rounded-full border border-ruleStrong px-2.5 py-1 text-ink3">
              {s.name}
            </li>
          ))}
        </ul>
        <DiscordButton variant="ghost">Ask about your state</DiscordButton>
      </div>
    </>
  );
}
