'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '@/lib/utils';
import { award } from '@/lib/agent/store';
import { XP } from '@/lib/agent/config';

/**
 * ACE practice exam builder: pick a difficulty, topic, length and timer, then take the exam one
 * question at a time and get a scored breakdown with every explanation.
 *
 * Difficulty maps the question tags: recall = Easy, id = Medium, applied = Hard.
 * Timers are a practice convenience, not the real exam's rules. Best scores per setup are a
 * per-browser convenience in localStorage. Keyboard: 1–3 answer, ← → move, F flag.
 */

export interface ExamQuestion {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  answerText: string;
  moduleN: number;
  moduleName: string;
  difficulty: 'recall' | 'id' | 'applied';
}

type Level = 'easy' | 'medium' | 'hard' | 'mixed';
type Timer = 'off' | 'standard' | 'fast';
type Phase = 'setup' | 'exam' | 'results';

const LEVELS: { id: Level; name: string; blurb: string; tag?: ExamQuestion['difficulty'] }[] = [
  { id: 'easy', name: 'Easy', blurb: 'Straight recall: terms, definitions, key facts.', tag: 'recall' },
  { id: 'medium', name: 'Medium', blurb: 'Identification: tell lookalikes apart.', tag: 'id' },
  { id: 'hard', name: 'Hard', blurb: 'Job scenarios: what is it, and what do you do?', tag: 'applied' },
  { id: 'mixed', name: 'Mixed', blurb: 'All three, like the real exam.' },
];
const TIMERS: { id: Timer; name: string; perQuestion: number | null; blurb: string }[] = [
  { id: 'off', name: 'Untimed', perQuestion: null, blurb: 'Take as long as you need.' },
  { id: 'standard', name: 'Timed', perQuestion: 60, blurb: '1 minute per question.' },
  { id: 'fast', name: 'Pressure', perQuestion: 30, blurb: '30 seconds per question.' },
];
const LENGTHS = [10, 25, 50, 100];
const BEST_KEY = 'ltk-ace-exam-best';
const LETTER = ['1', '2', '3'];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j]!, b[i]!];
  }
  return b;
}
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

export function ExamBuilder({ questions, modules }: { questions: ExamQuestion[]; modules: { n: number; name: string }[] }) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [level, setLevel] = useState<Level>('mixed');
  const [moduleN, setModuleN] = useState<number | 'all'>('all');
  const [length, setLength] = useState(25);
  const [timer, setTimer] = useState<Timer>('off');

  const [exam, setExam] = useState<ExamQuestion[]>([]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [usedSec, setUsedSec] = useState(0);
  const [missedOnly, setMissedOnly] = useState(false);
  const [best, setBest] = useState<Record<string, number>>({});
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setBest(JSON.parse(window.localStorage.getItem(BEST_KEY) ?? '{}'));
    } catch {
      /* ignore */
    }
  }, []);

  const pool = useMemo(() => {
    const tag = LEVELS.find((l) => l.id === level)?.tag;
    return questions.filter((q) => (moduleN === 'all' || q.moduleN === moduleN) && (!tag || q.difficulty === tag));
  }, [questions, level, moduleN]);
  const count = Math.min(length, pool.length);
  const perQ = TIMERS.find((t) => t.id === timer)?.perQuestion ?? null;
  const setupKey = `${level}|${moduleN}|${timer}`;

  function start() {
    // Mixed draws evenly from each tier where it can, so a mixed exam isn't all one kind.
    let picked: ExamQuestion[];
    if (level === 'mixed') {
      const tiers = (['recall', 'id', 'applied'] as const).map((t) => shuffle(pool.filter((q) => q.difficulty === t)));
      picked = [];
      for (let k = 0; picked.length < count; k++) {
        const t = tiers[k % 3]!;
        const q = t.shift();
        if (q) picked.push(q);
        if (tiers.every((x) => x.length === 0)) break;
      }
      picked = shuffle(picked);
    } else {
      picked = shuffle(pool).slice(0, count);
    }
    setExam(picked);
    setI(0);
    setAnswers({});
    setFlags(new Set());
    setMissedOnly(false);
    setTimeLeft(perQ ? perQ * picked.length : 0);
    setStartedAt(Date.now());
    setPhase('exam');
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const finish = useCallback(() => {
    setUsedSec(Math.round((Date.now() - startedAt) / 1000));
    setPhase('results');
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [startedAt]);

  // Countdown; auto-finish at zero.
  useEffect(() => {
    if (phase !== 'exam' || !perQ) return;
    if (timeLeft <= 0) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, perQ, timeLeft, finish]);

  const q = exam[i];
  const choose = useCallback((optId: string) => q && setAnswers((a) => ({ ...a, [q.id]: optId })), [q]);
  const toggleFlag = useCallback(
    () =>
      q &&
      setFlags((f) => {
        const n = new Set(f);
        if (n.has(q.id)) n.delete(q.id);
        else n.add(q.id);
        return n;
      }),
    [q],
  );

  useEffect(() => {
    if (phase !== 'exam') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const n = LETTER.indexOf(e.key);
      if (n >= 0 && q?.options[n]) choose(q.options[n]!.id);
      else if (e.key === 'ArrowRight') setI((x) => Math.min(exam.length - 1, x + 1));
      else if (e.key === 'ArrowLeft') setI((x) => Math.max(0, x - 1));
      else if (e.key.toLowerCase() === 'f') toggleFlag();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, q, exam.length, choose, toggleFlag]);

  // Results.
  const correct = exam.filter((x) => answers[x.id] === x.correctOptionId).length;
  const pct = exam.length ? Math.round((correct / exam.length) * 100) : 0;
  useEffect(() => {
    if (phase !== 'results' || !exam.length) return;
    const earned = exam.reduce((sum, x) => (answers[x.id] === x.correctOptionId ? sum + (XP.examPerCorrect[x.difficulty] ?? 8) : sum), 0);
    award({
      xp: earned * (XP.examTimerMultiplier[timer] ?? 1),
      label: `ACE exam: ${correct}/${exam.length}`,
      stats: { examsDone: 1 },
      event: { kind: 'exam', level, timer, correct, total: exam.length },
    });
    setBest((b) => {
      if ((b[setupKey] ?? -1) >= pct) return b;
      const next = { ...b, [setupKey]: pct };
      try {
        window.localStorage.setItem(BEST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* ------------------------------------------------------------------ setup */
  if (phase === 'setup') {
    return (
      <div ref={top} className="label-panel scroll-mt-24">
        <div className="label-bar">
          <span>Build your practice exam</span>
          <span>{questions.length} questions in the bank</span>
        </div>
        <div className="space-y-6 py-5 pl-[1.35rem] pr-5">
          <fieldset>
            <legend className="eyebrow mb-3">Difficulty</legend>
            <div className="grid gap-2 sm:grid-cols-4">
              {LEVELS.map((l) => (
                <Option key={l.id} active={level === l.id} onClick={() => setLevel(l.id)} title={l.name} blurb={l.blurb} />
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-3 block">Topic</span>
              <select
                value={moduleN}
                onChange={(e) => setModuleN(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full rounded-md border border-ruleStrong bg-stock px-3 py-2.5 text-ink"
              >
                <option value="all">All 11 modules</option>
                {modules.map((m) => (
                  <option key={m.n} value={m.n}>
                    {m.n}. {m.name}
                  </option>
                ))}
              </select>
            </label>
            <fieldset>
              <legend className="eyebrow mb-3">Questions</legend>
              <div className="flex flex-wrap gap-2">
                {LENGTHS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={length === n}
                    onClick={() => setLength(n)}
                    className={cx(
                      'rounded-md border px-4 py-2 text-sm font-semibold transition-colors',
                      length === n ? 'border-blood bg-danger text-ink' : 'border-ruleStrong text-ink2 hover:text-ink',
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <fieldset>
            <legend className="eyebrow mb-3">Timer</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {TIMERS.map((t) => (
                <Option key={t.id} active={timer === t.id} onClick={() => setTimer(t.id)} title={t.name} blurb={t.blurb} />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
            <p className="text-sm text-ink2">
              {pool.length === 0 ? (
                'No questions match. Try another difficulty or topic.'
              ) : (
                <>
                  <strong className="text-ink">{count}</strong> {LEVELS.find((l) => l.id === level)!.name.toLowerCase()} questions
                  {moduleN === 'all' ? '' : ` from module ${moduleN}`}
                  {perQ ? (
                    <>
                      {' '}
                      &middot; <strong className="text-ink">{clock(perQ * count)}</strong> on the clock
                    </>
                  ) : (
                    ' · untimed'
                  )}
                  {count < length ? ` (only ${pool.length} available)` : ''}
                  {best[setupKey] !== undefined ? <> &middot; your best: {best[setupKey]}%</> : null}
                </>
              )}
            </p>
            <button type="button" className="btn btn--lg" onClick={start} disabled={pool.length === 0}>
              Start exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ exam */
  if (phase === 'exam' && q) {
    const answeredCount = Object.keys(answers).length;
    const urgent = perQ !== null && timeLeft <= 60;
    return (
      <div ref={top} className="scroll-mt-24">
        <div className="sticky top-[5.5rem] z-10 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-rule bg-stock/95 px-4 py-3 backdrop-blur">
          <span className="mono text-ink2">
            Question {i + 1} / {exam.length} &middot; {answeredCount} answered
          </span>
          {perQ ? (
            <span className={cx('text-2xl font-extrabold tabular-nums', urgent ? 'text-blood' : 'text-ink')} aria-live="off">
              {clock(timeLeft)}
            </span>
          ) : (
            <span className="mono text-ink3">Untimed</span>
          )}
          <button type="button" className="btn !py-2" onClick={finish}>
            Finish &amp; grade
          </button>
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
          <div className="h-full bg-field transition-[width]" style={{ width: `${(answeredCount / exam.length) * 100}%` }} />
        </div>

        <div className="label-panel">
          <div className="label-bar">
            <span>
              {q.moduleName} &middot; {LEVELS.find((l) => l.tag === q.difficulty)?.name}
            </span>
            <button type="button" onClick={toggleFlag} className={cx('uppercase', flags.has(q.id) ? 'text-blood' : 'hover:text-ink')} aria-pressed={flags.has(q.id)}>
              {flags.has(q.id) ? '⚑ Flagged' : '⚐ Flag for review'}
            </button>
          </div>
          <fieldset className="py-5 pl-[1.35rem] pr-5">
            <legend className="h3 mb-4 w-full">{q.prompt}</legend>
            <div className="space-y-2">
              {q.options.map((o, n) => (
                <label
                  key={o.id}
                  className={cx(
                    'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-[0.9375rem] transition-colors',
                    answers[q.id] === o.id ? 'border-blood bg-stock2' : 'border-rule hover:border-ink3',
                  )}
                >
                  <input type="radio" name={q.id} className="sr-only" checked={answers[q.id] === o.id} onChange={() => choose(o.id)} />
                  <kbd className="mono shrink-0 rounded border border-ruleStrong px-1.5 text-ink3">{n + 1}</kbd>
                  <span className="text-ink">{o.text}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex items-center justify-between gap-3 border-t border-rule px-5 py-3">
            <button type="button" className="btn btn--ghost" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0}>
              &larr; Back
            </button>
            {i < exam.length - 1 ? (
              <button type="button" className="btn btn--ghost" onClick={() => setI((x) => x + 1)}>
                Next &rarr;
              </button>
            ) : (
              <button type="button" className="btn" onClick={finish}>
                Finish &amp; grade
              </button>
            )}
          </div>
        </div>

        <nav aria-label="Jump to a question" className="mt-4 flex flex-wrap gap-1.5">
          {exam.map((x, n) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Question ${n + 1}${answers[x.id] ? ', answered' : ''}${flags.has(x.id) ? ', flagged' : ''}`}
              className={cx(
                'mono h-8 w-8 rounded border text-xs',
                n === i ? 'border-ink text-ink' : answers[x.id] ? 'border-field2 bg-fieldTint text-ink' : 'border-ruleStrong text-ink3',
                flags.has(x.id) && '!border-blood',
              )}
            >
              {n + 1}
            </button>
          ))}
        </nav>
        <p className="mt-3 text-xs text-ink3">Keys: 1–3 answer · ← → move · F flag. Unanswered questions count as wrong.</p>
      </div>
    );
  }

  /* ------------------------------------------------------------------ results */
  const byModule = modules
    .map((m) => {
      const qs = exam.filter((x) => x.moduleN === m.n);
      return { ...m, total: qs.length, right: qs.filter((x) => answers[x.id] === x.correctOptionId).length };
    })
    .filter((m) => m.total > 0);
  const byLevel = LEVELS.filter((l) => l.tag).map((l) => {
    const qs = exam.filter((x) => x.difficulty === l.tag);
    return { ...l, total: qs.length, right: qs.filter((x) => answers[x.id] === x.correctOptionId).length };
  });
  const review = missedOnly ? exam.filter((x) => answers[x.id] !== x.correctOptionId) : exam;

  return (
    <div ref={top} className="scroll-mt-24">
      <div className="label-panel mb-8" aria-live="polite">
        <div className="label-bar">
          <span>Your result</span>
          <span>
            {perQ ? `${clock(usedSec)} used of ${clock(perQ * exam.length)}` : `${clock(usedSec)} taken`}
          </span>
        </div>
        <div className="grid gap-6 py-5 pl-[1.35rem] pr-5 md:grid-cols-[auto_1fr]">
          <div>
            <p className="display">{pct}%</p>
            <p className="text-ink2">
              {correct} of {exam.length} correct
              {best[setupKey] === pct && pct > 0 ? <span className="ml-2 font-semibold text-field">Personal best</span> : null}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn" onClick={start}>
                Same settings, new questions
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setPhase('setup')}>
                Change settings
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Breakdown title="By difficulty" rows={byLevel.filter((r) => r.total).map((r) => ({ label: r.name, right: r.right, total: r.total }))} />
            <Breakdown title="By module" rows={byModule.map((r) => ({ label: `${r.n}. ${r.name}`, right: r.right, total: r.total }))} />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="h2">Review</h2>
        <button type="button" className="btn btn--ghost !py-2" aria-pressed={missedOnly} onClick={() => setMissedOnly((m) => !m)}>
          {missedOnly ? 'Show all' : `Show missed only (${exam.length - correct})`}
        </button>
      </div>
      <ol className="space-y-3">
        {review.map((x) => {
          const mine = answers[x.id];
          const right = mine === x.correctOptionId;
          return (
            <li key={x.id} className="card p-5">
              <p className="mono mb-1 text-ink3">
                Q{exam.indexOf(x) + 1} &middot; {x.moduleName} &middot; {LEVELS.find((l) => l.tag === x.difficulty)?.name}
                {flags.has(x.id) ? ' · flagged' : ''}
              </p>
              <p className="mb-3 font-semibold text-ink">{x.prompt}</p>
              <ul className="mb-3 space-y-1 text-sm">
                {x.options.map((o) => (
                  <li
                    key={o.id}
                    className={cx(
                      'rounded px-3 py-1.5',
                      o.id === x.correctOptionId ? 'bg-fieldTint text-ink' : o.id === mine ? 'bg-danger/40 text-ink' : 'text-ink2',
                    )}
                  >
                    {o.id === x.correctOptionId ? '✓ ' : o.id === mine ? '✗ ' : ''}
                    {o.text}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink2">
                <span className={cx('mr-2 font-semibold uppercase tracking-wide', right ? 'text-field' : 'text-blood')}>
                  {right ? 'Correct' : mine ? 'Missed' : 'Skipped'}
                </span>
                {x.answerText}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Option({ active, onClick, title, blurb }: { active: boolean; onClick: () => void; title: string; blurb: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'rounded-lg border p-3 text-left transition-colors',
        active ? 'border-blood bg-stock2' : 'border-rule hover:border-ink3',
      )}
    >
      <span className="block font-semibold text-ink">{title}</span>
      <span className="block text-xs text-ink3">{blurb}</span>
    </button>
  );
}

function Breakdown({ title, rows }: { title: string; rows: { label: string; right: number; total: number }[] }) {
  return (
    <div>
      <p className="eyebrow mb-2">{title}</p>
      <ul className="space-y-1.5">
        {rows.map((r) => {
          const p = Math.round((r.right / r.total) * 100);
          return (
            <li key={r.label} className="text-sm">
              <span className="flex justify-between gap-2 text-ink2">
                <span className="truncate">{r.label}</span>
                <span className="mono shrink-0">
                  {r.right}/{r.total}
                </span>
              </span>
              <span className="mt-1 block h-1 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
                <span className={cx('block h-full', p >= 70 ? 'bg-field' : 'bg-danger')} style={{ width: `${p}%` }} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
