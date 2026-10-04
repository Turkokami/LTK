import { OptImg } from '@/components/ui/OptImg';
import { GALLERY } from '@/lib/content/gallery';

/**
 * A row of gallery photos for any page: pick by src from lib/content/gallery.ts, so captions
 * and alt text stay in one place. Links through to the matching gallery section.
 */
export function PhotoStrip({ srcs, title, eyebrow, className = '' }: { srcs: string[]; title?: string; eyebrow?: string; className?: string }) {
  const all = GALLERY.flatMap((sec) => sec.images.map((img) => ({ ...img, section: sec.id })));
  const imgs = srcs.map((s) => all.find((i) => i.src === s)).filter((i): i is (typeof all)[number] => !!i);
  if (!imgs.length) return null;
  return (
    <section className={className} aria-label={title ?? 'Photos'}>
      {eyebrow ? <p className="eyebrow mb-1">{eyebrow}</p> : null}
      {title ? <h2 className="h2 mb-4">{title}</h2> : null}
      <ul className={imgs.length >= 4 ? 'grid grid-cols-2 gap-3 lg:grid-cols-4' : imgs.length === 3 ? 'grid grid-cols-2 gap-3 lg:grid-cols-3' : 'grid gap-3 sm:grid-cols-2'}>
        {imgs.map((img) => (
          <li key={img.src}>
            <a href={`/community/gallery/#${img.section}`} className="group block overflow-hidden rounded-[var(--radius)] border border-[rgba(255,42,61,0.45)] bg-stock2 hover:border-[#ff2a3d]">
              <OptImg src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1023px) 50vw, 300px" widths={[384, 640]} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              <span className="block px-3 py-2 text-sm font-semibold text-ink">{img.caption}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
