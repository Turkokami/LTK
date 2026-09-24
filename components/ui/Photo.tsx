import type { FieldPhoto } from '@/lib/content/photos';
import { cx } from '@/lib/utils';

/**
 * A photo with its credit line. The credit is not optional: CC BY and CC BY-SA placeholders
 * require attribution (author, licence, link to source). `caption` adds a sentence before it.
 */
export function Photo({
  photo,
  caption,
  priority = false,
  aspect = 'aspect-[16/9]',
  className,
}: {
  photo: FieldPhoto;
  caption?: string;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={cx('m-0', className)}>
      <div className={cx('overflow-hidden rounded-[var(--radius)] border border-rule bg-stock2', aspect)}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-ink3">
        {caption ? <span className="mr-1 text-ink2">{caption}</span> : null}
        <PhotoCredit photo={photo} />
      </figcaption>
    </figure>
  );
}

export function PhotoCredit({ photo }: { photo: FieldPhoto }) {
  return (
    <>
      Photo: {photo.credit}
      {' · '}
      {photo.source ? (
        <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-ink hover:underline">
          {photo.license}
          <span className="sr-only"> (source, opens in a new tab)</span>
        </a>
      ) : (
        photo.license
      )}
    </>
  );
}
