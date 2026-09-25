import type { CommunityPhoto } from '@/lib/content/community-photos';
import { cx } from '@/lib/utils';

/**
 * Grid of member photos from the LTK Discord, each credited by handle and date. Server-rendered;
 * each tile links to the full-size image. `limit` keeps field pages short.
 */

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function CommunityGallery({
  photos,
  limit,
  className,
}: {
  photos: CommunityPhoto[];
  limit?: number;
  className?: string;
}) {
  const shown = limit ? photos.slice(0, limit) : photos;
  if (!shown.length) return null;
  return (
    <ul className={cx('grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4', className)}>
      {shown.map((p) => (
        <li key={p.src}>
          <figure className="card m-0 h-full overflow-hidden">
            <a href={p.src} target="_blank" rel="noopener noreferrer" className="group block">
              <span className="block aspect-[4/3] overflow-hidden bg-stock2">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>
              <span className="sr-only"> (opens full size in a new tab)</span>
            </a>
            <figcaption className="p-3">
              {p.caption ? <span className="block text-sm font-semibold leading-snug text-ink">{p.caption}</span> : null}
              <span className="mt-1 block text-xs text-ink3">
                {p.credit} &middot; {fmt.format(new Date(p.date))}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
