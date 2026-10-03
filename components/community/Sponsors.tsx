import { SPONSORS, getSponsor, type Sponsor } from '@/lib/content/sponsors';
import { EVENTS } from '@/lib/content/events-feed';
import { cx } from '@/lib/utils';

/**
 * Sponsor logos. Every placement is labelled "Sponsors" and every outbound link is
 * rel="sponsored" (sponsorship policy). Logos sit on their own plate — white for logos drawn
 * on white, dark for logos drawn for dark — so each brand shows the way it was made.
 */

function Plate({ s, className }: { s: Sponsor; className?: string }) {
  return (
    <span className={cx('flex items-center justify-center rounded-md p-3', s.plate === 'light' ? 'bg-white' : 'bg-[#1d2130]', className)}>
      <img src={s.logo.src} alt={s.name} width={s.logo.width} height={s.logo.height} loading="lazy" className="max-h-full w-auto max-w-full object-contain" />
    </span>
  );
}

function Wrap({ s, children, className }: { s: Sponsor; children: React.ReactNode; className?: string }) {
  return s.url ? (
    <a href={s.url} target="_blank" rel="sponsored noopener" className={className} title={`${s.name} (opens in a new tab)`}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  );
}

/** A row of logos. `ids` limits it to an event's sponsors. */
export function SponsorStrip({ ids, label = 'Sponsors', className }: { ids?: string[]; label?: string; className?: string }) {
  const list = ids ? ids.map(getSponsor).filter((s): s is Sponsor => !!s) : SPONSORS;
  return (
    <div className={className}>
      <p className="eyebrow mb-3">{label}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {list.map((s) => (
          <li key={s.id}>
            <Wrap s={s} className="block transition-opacity hover:opacity-85">
              <Plate s={s} className="h-20" />
            </Wrap>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Logos with what each sponsor does and the events they've backed. */
export function SponsorWall() {
  const eventName = (id: string) => EVENTS.find((e) => e.id === id)?.name.replace(/^LTK /, '') ?? id;
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {SPONSORS.map((s) => (
        <li key={s.id} className="card flex flex-col gap-4 p-4">
          <Wrap s={s} className="block">
            <Plate s={s} className="h-28" />
          </Wrap>
          <div>
            <p className="font-semibold text-ink">{s.name}</p>
            <p className="mt-1 text-sm text-ink2">{s.what}</p>
            <p className="mono mt-2 text-ink3">Backed: {s.backed.map(eventName).join(' · ')}</p>
            {s.url ? (
              <a href={s.url} target="_blank" rel="sponsored noopener" className="link mt-2 inline-block text-sm">
                Visit {s.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
