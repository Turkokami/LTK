import { MILESTONES, PRESS, formatMilestoneDate } from '@/lib/content/timeline';
import { cx } from '@/lib/utils';

/** "LTK since 2025": the dated history, newest first, with a gaming/sponsor/press tag. */

const TAG: Record<string, { label: string; cls: string }> = {
  community: { label: 'Community', cls: 'text-ink2 border-rule' },
  gaming: { label: 'Gaming', cls: 'text-field border-field' },
  sponsor: { label: 'Sponsor', cls: 'text-warning border-warning' },
  press: { label: 'Press', cls: 'text-blood border-blood' },
  podcast: { label: 'Podcast', cls: 'text-ink2 border-ruleStrong' },
};

export function Timeline({ limit }: { limit?: number }) {
  const list = [...MILESTONES].reverse().slice(0, limit);
  return (
    <ol className="relative border-l border-ruleStrong pl-6">
      {list.map((m) => {
        const tag = TAG[m.kind]!;
        const external = m.href?.startsWith('http');
        return (
          <li key={m.date + m.title} className="relative mb-7 last:mb-0">
            <span aria-hidden="true" className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-stock bg-blood" />
            <p className="mono mb-1 flex flex-wrap items-center gap-2 text-ink3">
              <time dateTime={m.date}>{formatMilestoneDate(m.date)}</time>
              <span className={cx('rounded-full border px-2 py-px text-[0.625rem] uppercase tracking-wide', tag.cls)}>{tag.label}</span>
            </p>
            <h3 className="font-semibold text-ink">
              {m.href ? (
                <a href={m.href} className="hover:text-blood" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {m.title}
                  {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              ) : (
                m.title
              )}
            </h3>
            <p className="mt-1 max-w-[62ch] text-sm text-ink2">{m.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

/** "As featured in" line for press coverage. */
export function FeaturedIn({ className }: { className?: string }) {
  return (
    <p className={cx('text-sm text-ink2', className)}>
      <span className="eyebrow mr-2">As featured in</span>
      {PRESS.map((p, i) => (
        <span key={p.url}>
          {i ? ' · ' : ''}
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="link font-semibold">
            {p.outlet}
          </a>{' '}
          <span className="text-ink3">
            ({p.publisher}, {formatMilestoneDate(p.date)})
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      ))}
    </p>
  );
}
