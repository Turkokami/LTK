/**
 * OptImg — a plain <img> that asks Next's image optimizer (Vercel) for a right-sized, modern-format
 * copy: phones download a few hundred pixels instead of the 1,600–2,000px original. Server-safe
 * (no client JS). Widths must be in Next's default device/image sizes.
 *
 *   <OptImg src="/photos/x.jpg" width={1600} height={1200} sizes="(max-width: 640px) 50vw, 240px" />
 */

const ALLOWED = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const DEFAULT_WIDTHS = [384, 640, 828, 1080, 1200, 1920];

export function optUrl(src: string, w: number, q = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

export function OptImg({
  src,
  width,
  height,
  sizes,
  widths = DEFAULT_WIDTHS,
  alt = '',
  className,
  style,
  priority = false,
  quality = 75,
}: {
  src: string;
  width: number;
  height: number;
  /** How wide the image renders, so the browser picks the right file. */
  sizes: string;
  widths?: number[];
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Above-the-fold hero: load first, no lazy loading. */
  priority?: boolean;
  quality?: number;
}) {
  // Never ask for more pixels than the original has, and only for sizes the optimizer accepts.
  const ws = widths.filter((w) => ALLOWED.includes(w) && w <= width);
  const set = (ws.length ? ws : [ALLOWED.filter((w) => w <= width).pop() ?? 384]).map((w) => `${optUrl(src, w, quality)} ${w}w`).join(', ');
  const fallback = optUrl(src, ws[Math.min(1, ws.length - 1)] ?? 640, quality);
  return (
    <img
      src={fallback}
      srcSet={set}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}

/** For small fixed-size images (badges): 1x and 2x copies at the display size. */
export function badgeSrc(src: string, display: number): { src: string; srcSet: string } {
  const one = ALLOWED.find((w) => w >= display) ?? 384;
  const two = ALLOWED.find((w) => w >= display * 2) ?? 384;
  return { src: optUrl(src, one), srcSet: `${optUrl(src, one)} 1x, ${optUrl(src, two)} 2x` };
}
