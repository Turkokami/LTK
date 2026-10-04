import { ImageResponse } from 'next/og';
import { site } from '@/lib/site.config';
import { HEX } from '@/lib/brand';

/**
 * Self-hosted share cards (Open Graph / Twitter), 1200×630, one per page.
 *
 * Early distribution runs through Facebook groups, Discord and techs texting links to each
 * other, so the card IS the ad: the LTK badge, the page's own title and section, and the
 * address. Pages with a photo (field guides, events) put it on the right with the badge on top.
 *
 *   /og/default/?t=Termite%20control&e=Fields&img=/photos/termite.jpg
 *
 * `img` must be a local JPEG or PNG (the renderer can't read WebP). Fonts and images are read
 * from this deployment's own origin.
 */

export const runtime = 'edge';

const SIGNAL: Record<string, string> = {
  default: HEX.danger,
  state: HEX.warning,
  thread: HEX.field,
  lab: HEX.danger,
  wire: HEX.danger,
  partners: HEX.field,
};

const BONE = '#f2ede4';
const MUTED = '#a7aca5';
const LOCAL_IMG = /^\/[\w/.-]+\.(jpe?g|png)$/i;

export async function GET(request: Request, { params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const { origin, searchParams: q } = new URL(request.url);

  const title = (q.get('t') ?? site.tagline).slice(0, 110);
  const eyebrow = (q.get('e') ?? 'Pest pros helping pest pros').slice(0, 48);
  const imgParam = q.get('img');
  const photo = imgParam && LOCAL_IMG.test(imgParam) && !imgParam.includes('..') ? `${origin}${imgParam}` : null;
  const accent = SIGNAL[template] ?? HEX.danger;
  const host = new URL(site.url).host.replace(/^www\./, '');

  const [bold, semi] = await Promise.all([
    fetch(`${origin}/fonts/archivo-800.woff`).then((r) => r.arrayBuffer()),
    fetch(`${origin}/fonts/archivo-600.woff`).then((r) => r.arrayBuffer()),
  ]);

  const size = title.length > 70 ? 52 : title.length > 40 ? 62 : 74;
  const badge = `${origin}/brand/badge-600.jpg`;

  return new ImageResponse(
    (
      <div style={{ width: '1200px', height: '630px', display: 'flex', background: HEX.stock, fontFamily: 'Archivo', position: 'relative' }}>
        {/* Soft red glow, like the dot in the scope. */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: 20,
            width: 680,
            height: 680,
            borderRadius: 340,
            background: 'radial-gradient(circle, rgba(196,32,44,0.32) 0%, rgba(18,20,18,0) 70%)',
            display: 'flex',
          }}
        />
        <div style={{ position: 'absolute', left: 0, top: 0, width: '1200px', height: '10px', background: accent, display: 'flex' }} />

        {/* Words */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 700, padding: '64px 0 52px 64px' }}>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: HEX.bloodText }}>{eyebrow}</div>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, color: BONE }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 800, color: BONE, textTransform: 'uppercase', letterSpacing: 0.5 }}>{site.name}</div>
            <div style={{ display: 'flex', width: 2, height: 26, background: '#3a3f3a' }} />
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: MUTED }}>{host}</div>
          </div>
        </div>

        {/* The page photo with the badge on it, or the badge on its own */}
        {photo ? (
          <div style={{ display: 'flex', position: 'absolute', right: 0, top: 10, width: 460, height: 620 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={460} height={620} style={{ objectFit: 'cover', width: 460, height: 620 }} alt="" />
            <div style={{ position: 'absolute', left: 0, top: 0, width: 160, height: 620, display: 'flex', background: `linear-gradient(90deg, ${HEX.stock} 0%, rgba(18,20,18,0) 100%)` }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badge} width={180} height={180} style={{ position: 'absolute', right: 28, bottom: 28, borderRadius: 90, border: `6px solid ${HEX.stock}` }} alt="" />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, paddingRight: 30 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badge} width={400} height={400} style={{ borderRadius: 200, border: '6px solid #2a2e2a' }} alt="" />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Archivo', data: bold, weight: 800, style: 'normal' },
        { name: 'Archivo', data: semi, weight: 600, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  );
}
