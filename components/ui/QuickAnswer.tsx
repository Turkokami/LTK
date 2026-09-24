import type { ReactNode } from 'react';
import { formatVerified } from '@/lib/utils';

/**
 * QuickAnswer — the answer-first block. CLAUDE.md 2.3.
 *
 * Required at the top of every Academy, Lab and Wire page, before any narrative.
 * Answer engines extract the first complete, self-contained answer they find. If the direct
 * answer sits in paragraph nine, a competitor's paragraph one wins.
 *
 * Constraints, enforced in review:
 *   - `question` matches the target query verbatim, and is the page's H2.
 *   - `answer` is 40–60 words and makes complete sense lifted out of context. No "as described
 *     above", no "see the table below", no pronouns pointing at surrounding copy.
 *   - `fact` is one hard thing: a number, a date, a statute reference, an agency name.
 *   - `verifiedOn` and `reviewer` are not optional. Anonymous regulatory guidance does not
 *     compete in this vertical.
 */
export function QuickAnswer({
  question,
  answer,
  fact,
  verifiedOn,
  reviewer,
}: {
  question: string;
  answer: ReactNode;
  fact?: ReactNode;
  /** ISO date. Must equal the schema dateModified. */
  verifiedOn: string;
  reviewer: { name: string; credential?: string; href: string };
}) {
  return (
    <div className="label-panel">
      <div className="label-bar">
        <span>Quick answer</span>
        <span className="opacity-80">Verified {formatVerified(verifiedOn)}</span>
      </div>

      <div className="px-4 py-4">
        <h2 className="h3 mb-2">{question}</h2>
        <p className="prose-bulletin !mb-0 text-ink">{answer}</p>

        {fact ? (
          <p className="mono mt-3 border-l-2 border-[var(--signal-warning)] pl-3 text-ink2">
            {fact}
          </p>
        ) : null}
      </div>

      <div className="rule-t px-4 py-2">
        <span className="mono text-ink3">
          Reviewed by{' '}
          <a href={reviewer.href} className="text-field underline underline-offset-2">
            {reviewer.name}
          </a>
          {reviewer.credential ? `, ${reviewer.credential}` : null}
        </span>
      </div>
    </div>
  );
}
