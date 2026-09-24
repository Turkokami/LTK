import type { ReactNode } from 'react';
import { cx, isRegistryStub } from '@/lib/utils';

/**
 * LabelBlock — the signature component.
 *
 * A precautionary-statement panel, set the way a pesticide label sets one: hairline box,
 * uppercase mono header bar carrying a signal word, and a rigid key/value grid beneath.
 *
 * It has exactly three jobs across the site, and it should never be used for a fourth:
 *   1. Regulatory facts on Academy state pages  → signal="warning"
 *   2. Verified credentials on member/expert pages → signal="field"
 *   3. Methodology and disclosure statements in the Lab → signal="danger" (once per page)
 *
 * Signal words carry meaning here, exactly as they do on a label. DANGER appears at most once
 * on any page. If you find yourself wanting a second, one of them is not the most important
 * thing on the page.
 */

export type Signal = 'default' | 'danger' | 'warning' | 'field';

const BAR: Record<Signal, string> = {
  default: '',
  danger: 'label-bar--danger',
  warning: 'label-bar--warning',
  field: 'label-bar--field',
};

export interface Spec {
  label: string;
  /** A string, or null to render an honest "not published" state rather than a guess. */
  value: ReactNode | null;
}

export function LabelBlock({
  title,
  signal = 'default',
  meta,
  specs,
  children,
  className,
}: {
  /** Uppercase in the bar. Keep under ~40 characters or it wraps badly on mobile. */
  title: string;
  signal?: Signal;
  /** Right-aligned in the bar. Use for a date, a state code, a registration number. */
  meta?: string;
  specs?: Spec[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx('label-panel', className)} aria-label={title}>
      <header className={cx('label-bar', BAR[signal])}>
        <span>{title}</span>
        {meta ? <span className="opacity-80">{meta}</span> : null}
      </header>

      {specs?.length ? (
        <dl className="m-0">
          {specs.map((s) => (
            <div className="spec-row" key={s.label}>
              <dt>{s.label}</dt>
              <dd className="m-0">
                <SpecValue value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {children ? <div className="px-3 py-3 text-sm text-ink2">{children}</div> : null}
    </section>
  );
}

/**
 * Renders a null as an honest gap and a registry sentinel as an unmissable flag.
 * CLAUDE.md 2.5 — a wrong CEU number is worse than no page.
 */
function SpecValue({ value }: { value: ReactNode | null }) {
  if (value === null || value === undefined) {
    return (
      <span className="mono text-ink3">
        Not yet published — verifying with the state agency
      </span>
    );
  }
  if (typeof value === 'string' && isRegistryStub(value)) {
    return <span className="registry-stub">{value}</span>;
  }
  return <>{value}</>;
}
