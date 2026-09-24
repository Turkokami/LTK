'use client';

import { useMemo, useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * ACE practice quiz. A client leaf: the questions are also rendered server-side on the module
 * pages (study notes), this component only adds answering and grading. No storage — progress
 * lives in component state and resets on reload, which is fine for practice.
 */

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  answerText: string;
  moduleName?: string;
  moduleN?: number;
}

export function Quiz({
  questions,
  modules,
}: {
  questions: QuizQuestion[];
  /** When given, shows a module filter (full practice test). */
  modules?: { n: number; name: string }[];
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<number | 'all'>('all');

  const active = useMemo(
    () => (filter === 'all' ? questions : questions.filter((q) => q.moduleN === filter)),
    [filter, questions],
  );

  const answered = active.filter((q) => answers[q.id]).length;
  const correct = active.filter((q) => answers[q.id] === q.correctOptionId).length;
  const percent = active.length ? Math.round((correct / active.length) * 100) : 0;

  function reset() {
    setAnswers((cur) => {
      const next = { ...cur };
      active.forEach((q) => delete next[q.id]);
      return next;
    });
    setSubmitted(false);
  }

  function pick(n: number | 'all') {
    setFilter(n);
    setSubmitted(false);
  }

  return (
    <div>
      {modules ? (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Choose a module">
          <Chip active={filter === 'all'} onClick={() => pick('all')}>
            Full exam ({questions.length})
          </Chip>
          {modules.map((m) => (
            <Chip key={m.n} active={filter === m.n} onClick={() => pick(m.n)}>
              {m.n}. {m.name}
            </Chip>
          ))}
        </div>
      ) : null}

      <ol className="space-y-4">
        {active.map((q, i) => {
          const selected = answers[q.id];
          const isRight = submitted && selected === q.correctOptionId;
          const isWrong = submitted && !!selected && selected !== q.correctOptionId;
          return (
            <li key={q.id} className="card p-5">
              <fieldset>
                <legend className="mb-3 w-full">
                  <span className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="mono text-ink3">
                      Q{i + 1}
                      {q.moduleName ? ` · ${q.moduleName}` : ''}
                    </span>
                    {submitted ? (
                      <span
                        className={cx(
                          'rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide',
                          isRight && 'bg-fieldTint text-field',
                          isWrong && 'bg-danger text-ink',
                          !selected && 'border border-ruleStrong text-ink3',
                        )}
                      >
                        {isRight ? 'Correct' : isWrong ? 'Incorrect' : 'Skipped'}
                      </span>
                    ) : null}
                  </span>
                  <span className="h3 block">{q.prompt}</span>
                </legend>

                <div className="space-y-2">
                  {q.options.map((o) => {
                    const showRight = submitted && o.id === q.correctOptionId;
                    const showWrong = submitted && selected === o.id && o.id !== q.correctOptionId;
                    return (
                      <label
                        key={o.id}
                        className={cx(
                          'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors',
                          'border-rule hover:border-ink3',
                          selected === o.id && !submitted && 'border-blood bg-stock2',
                          showRight && '!border-field bg-fieldTint',
                          showWrong && '!border-blood',
                          submitted && 'cursor-default',
                        )}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={o.id}
                          checked={selected === o.id}
                          disabled={submitted}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                          className="mt-0.5 accent-[var(--signal-danger)]"
                        />
                        <span className="text-ink">
                          <span className="mono mr-2 uppercase text-ink3">{o.id}</span>
                          {o.text}
                          {showRight ? (
                            <span className="ml-2 inline-block rounded-full bg-field px-2 py-0.5 align-middle text-[0.6875rem] font-bold uppercase tracking-wide text-stock">
                              Correct answer
                            </span>
                          ) : null}
                          {showWrong ? (
                            <span className="ml-2 inline-block rounded-full border border-blood px-2 py-0.5 align-middle text-[0.6875rem] font-bold uppercase tracking-wide text-blood">
                              Your answer
                            </span>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {submitted ? (
                  <div className="mt-4 rounded-md border border-ruleStrong bg-stock px-4 py-3 text-sm text-ink2">
                    <span className="mr-2 font-semibold uppercase tracking-wide text-blood">Why</span>
                    {q.answerText}
                  </div>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {/* Sticky action bar so grading is always one tap away on a phone. */}
      <div className="sticky bottom-3 z-10 mt-6">
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-ink2" aria-live="polite">
            {submitted ? (
              <>
                <span className="text-xl font-extrabold text-ink">{percent}%</span>{' '}
                &mdash; {correct} of {active.length} correct
              </>
            ) : (
              <>
                {answered} of {active.length} answered
              </>
            )}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn btn--ghost" onClick={reset}>
              Reset
            </button>
            {!submitted ? (
              <button type="button" className="btn" onClick={() => setSubmitted(true)}>
                Grade my answers
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
        active ? 'border-blood bg-danger text-ink' : 'border-ruleStrong text-ink2 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
