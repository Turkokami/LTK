import { KIND_LABEL, type RegulatoryUpdate } from '@/lib/content/wire';
import { formatVerified } from '@/lib/utils';
import { cx } from '@/lib/utils';

/**
 * One regulatory item. The source is printed in visible text beside every item — a regulatory
 * claim without its primary document is the one error here that can cost a reader a licence.
 */
export function UpdateCard({
  u,
  stateName,
  today,
}: {
  u: RegulatoryUpdate;
  /** Shown as the scope tag; "Federal" for US. */
  stateName: string;
  /** ISO date, passed in so server and client agree on "upcoming". */
  today: string;
}) {
  const upcoming = u.effectiveOn > today;
  return (
    <article className="label-panel h-full">
      <div className="label-bar">
        <span>
          {stateName} &middot; {KIND_LABEL[u.kind]}
        </span>
        <span className={cx(upcoming && 'text-blood')}>
          {upcoming ? 'Takes effect ' : ''}
          {formatVerified(u.effectiveOn)}
        </span>
      </div>
      <div className="py-4 pl-[1.35rem] pr-5">
        <h3 className="h3 mb-2 text-lg">{u.headline}</h3>
        <p className="mb-3 text-[0.9375rem] leading-relaxed text-ink2">{u.summary}</p>
        <p className="mb-3 rounded-md border border-ruleStrong bg-stock px-3 py-2 text-sm text-ink2">
          <span className="mr-2 font-semibold uppercase tracking-wide text-blood">What to do</span>
          {u.whatToDo}
        </p>
        <p className="text-xs text-ink3">
          Source:{' '}
          <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" className="link">
            {u.sourceLabel}
          </a>
        </p>
      </div>
    </article>
  );
}
