import { ACE_PATH } from '@/lib/content/ace';
import { cx } from '@/lib/utils';

/** Tool switcher shared by every ACE Prep page. Plain links — every tool is its own URL. */
const TOOLS = [
  { key: 'overview', label: 'Overview', href: ACE_PATH },
  { key: 'practice', label: 'Practice test', href: `${ACE_PATH}practice-test/` },
  { key: 'flashcards', label: 'Flashcards', href: `${ACE_PATH}flashcards/` },
  { key: 'glossary', label: 'Glossary', href: `${ACE_PATH}glossary/` },
  { key: 'library', label: 'Podcast, videos & decks', href: `${ACE_PATH}library/` },
] as const;

export type AceTool = (typeof TOOLS)[number]['key'] | 'module';

export function AceNav({ current }: { current: AceTool }) {
  return (
    <nav aria-label="ACE Prep tools" className="mb-8 overflow-x-auto">
      <ul className="flex min-w-max gap-2">
        {TOOLS.map((t) => {
          const on = t.key === current;
          return (
            <li key={t.key}>
              <a
                href={t.href}
                aria-current={on ? 'page' : undefined}
                className={cx(
                  'inline-block rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
                  on
                    ? 'border-blood bg-danger text-ink'
                    : 'border-ruleStrong text-ink2 hover:border-ink3 hover:text-ink',
                )}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
