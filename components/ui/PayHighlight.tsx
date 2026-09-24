import { NATIONAL_BASELINE, PEST_CONTROL_WORKERS as P } from '@/lib/content/salary';
import { site } from '@/lib/site.config';
import { cx } from '@/lib/utils';

/**
 * Pay and outlook, headline-number style. Every figure carries a link to the BLS page it came
 * from, and the BLS exclusions stay visible — omitting them is how wage pages mislead.
 *
 * `benchmark` is for fields BLS does not measure separately: the same pest control worker
 * figures, clearly labelled as the nearest published benchmark rather than this field's pay.
 */

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
const S = NATIONAL_BASELINE.sources;

export function PayHighlight({
  fieldName,
  benchmark = false,
  industry = false,
  className,
}: {
  fieldName: string;
  benchmark?: boolean;
  /** The industry-wide version, for hub pages rather than a single field. */
  industry?: boolean;
  className?: string;
}) {
  const title = industry
    ? 'The industry by the numbers'
    : benchmark
      ? 'Industry benchmark'
      : 'Pay and job outlook';

  return (
    <section className={cx('label-panel', className)} aria-label={title}>
      <header className="label-bar">
        <span>{title}</span>
        <span>BLS {NATIONAL_BASELINE.referencePeriod}</span>
      </header>

      <div className="py-5 pl-[1.35rem] pr-5">
        <p className="mb-5 max-w-[62ch] text-sm leading-relaxed text-ink2">
          {industry ? (
            <>
              National figures for <strong className="text-ink">pest control workers</strong>{' '}
              (SOC {P.socCode}) &mdash; the federal category that covers most of the trade. About{' '}
              {P.employment.toLocaleString('en-US')} people held these jobs in {P.employmentYear}.
            </>
          ) : benchmark ? (
            <>
              BLS doesn&rsquo;t publish separate figures for {fieldName.toLowerCase()}, so these are
              the national numbers for <strong className="text-ink">pest control workers</strong>{' '}
              &mdash; the closest published benchmark, not this field&rsquo;s own pay.
            </>
          ) : (
            <>
              National figures for <strong className="text-ink">pest control workers</strong>{' '}
              (SOC {P.socCode}), the federal category this field is counted under.
            </>
          )}
        </p>

        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <Stat
            value={usd(P.medianAnnualUsd)}
            label={`Median annual pay · ${usd(P.medianHourlyUsd)}/hr`}
            href={S.pay.url}
          />
          <Stat
            value={`${usd(P.p10AnnualUsd)}–${usd(P.p90AnnualUsd)}`}
            label="Lowest 10% to highest 10% of earners"
            href={S.pay.url}
          />
          <Stat
            value={`+${P.projectedGrowthPercent}%`}
            label={`Projected job growth ${P.projectionWindow} (all jobs: ${P.allOccupationGrowthPercent}%)`}
            href={S.outlook.url}
          />
          <Stat
            value={P.annualOpenings.toLocaleString('en-US')}
            label="Openings projected each year, on average"
            href={S.outlook.url}
          />
        </ul>

        <div className="mt-6 grid gap-2 rounded-md border border-ruleStrong bg-stock p-4 text-sm text-ink2 sm:grid-cols-2">
          <p>
            <span className="font-semibold text-ink">{usd(P.industryMedian.usd)}</span> median
            inside {P.industryMedian.name.toLowerCase()}
          </p>
          <p>
            <span className="font-semibold text-ink">{usd(P.allOccupationMedianUsd)}</span> median
            across all US occupations
          </p>
        </div>

        <details className="mt-4 text-sm text-ink3">
          <summary className="cursor-pointer text-ink2 hover:text-ink">
            What these numbers leave out
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {NATIONAL_BASELINE.excludes.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="mt-2">
            Real route pay depends on commission, truck and tool allowances and overtime.{' '}
            <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
              Compare notes in the Discord
            </a>
            .
          </p>
        </details>
      </div>

      <footer className="rule-t py-3 pl-[1.35rem] pr-5">
        <p className="eyebrow mb-1.5">Sources</p>
        <ul className="space-y-1 text-xs">
          {[S.pay, S.outlook, S.oews].map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="link">
                {src.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}

function Stat({ value, label, href }: { value: string; label: string; href: string }) {
  return (
    <li className="stat">
      <span className="stat-value block">{value}</span>
      <span className="stat-label mt-1.5 block">
        {label}{' '}
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood underline-offset-2 hover:underline"
          >
            source
            <span className="sr-only"> (BLS, opens in a new tab)</span>
        </a>
      </span>
    </li>
  );
}
