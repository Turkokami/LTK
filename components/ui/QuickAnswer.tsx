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
  stampLabel = 'Verified',
}: {
  question: string;
  answer: ReactNode;
  fact?: ReactNode;
  /** ISO date. Must equal the schema dateModified. */
  verifiedOn: string;
  reviewer: { name: string; credential?: string; href: string };
  /** "Verified" for regulatory records; "Updated" for study material that is not a verified claim. */
  stampLabel?: 'Verified' | 'Updated';
}) {
  return (
    <div className="label-panel">
      <div className="label-bar">
        <span>Quick answer</span>
        <span className="opacity-80">
          {stampLabel} {formatVerified(verifiedOn)}
        </span>
      </div>

      <div className="py-5 pl-[1.35rem] pr-5">
        <h2 className="h3 mb-2 text-xl">{question}</h2>
        <p className="!mb-0 text-[1.0625rem] leading-relaxed text-ink">{answer}</p>

        {fact ? (
          <p className="mt-4 rounded-md border border-ruleStrong bg-stock px-3 py-2 text-sm text-ink2">
            <span className="mr-2 font-semibold uppercase tracking-wide text-blood">Key fact</span>
            {fact}
          </p>
        ) : null}
      </div>

      <div className="rule-t py-2.5 pl-[1.35rem] pr-5">
        <span className="text-xs text-ink3">
          Reviewed by{' '}
          <a href={reviewer.href} className="link">
            {reviewer.name}
          </a>
          {reviewer.credential ? `, ${reviewer.credential}` : null}
        </span>
      </div>
    </div>
  );
}
