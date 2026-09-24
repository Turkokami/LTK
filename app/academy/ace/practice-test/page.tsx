import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { AceNav } from '@/components/ace/AceNav';
import { Quiz } from '@/components/ace/Quiz';
import { ACE_MODULES, ACE_PATH, ALL_QUESTIONS } from '@/lib/content/ace';
import { site } from '@/lib/site.config';

/**
 * Full-length ACE practice test. Every question from all eleven modules, filterable by module.
 * CONVERSION CONTRACT: primary action "Grade my answers"; secondary Discord study group.
 */

const PATH = `${ACE_PATH}practice-test/`;

export const metadata: Metadata = pageMeta({
  title: 'ACE practice test: free exam questions with answers',
  description: `A free ${ALL_QUESTIONS.length}-question ACE practice test covering all 11 study modules, from insect biology to wood-destroying insects, graded instantly with explanations.`,
  path: PATH,
});

export default function PracticeTestPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
    { name: 'Practice test', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-8">
        <p className="eyebrow mb-3">ACE Prep &middot; Practice test</p>
        <h1 className="display mb-6 max-w-[18ch]">ACE practice test</h1>
        <AceNav current="practice" />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="lede">
            {ALL_QUESTIONS.length} questions across all {ACE_MODULES.length} modules. Take the
            whole thing, or pick one module to drill. Grading shows the reasoning behind every
            answer.
          </p>
          <DiscordButton variant="ghost">Compare scores on Discord</DiscordButton>
        </div>

        <Quiz questions={ALL_QUESTIONS} modules={ACE_MODULES.map((m) => ({ n: m.n, name: m.name }))} />

        <p className="mt-8 text-sm text-ink3">
          Got one wrong and the explanation didn&rsquo;t click?{' '}
          <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
            Ask the study group in the Discord
          </a>
          .
        </p>
      </div>
    </>
  );
}
