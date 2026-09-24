import { ImageResponse } from 'next/og';
import { site } from '@/lib/site.config';

/**
 * Self-hosted OG cards, generated per template.
 *
 * The prototype's OG image was a host-generated screenshot on a CDN that refuses automated
 * access — so robots-respecting unfurlers and AI preview generators could not fetch it at all,
 * and the asset carried no logo, no headline and no reason to click. Both problems are fixed
 * here: publicly fetchable, designed, and specific to the page.
 *
 * This matters more than usual because early distribution runs through Facebook groups and
 * technicians texting links to each other. The share card IS the ad.
 *
 * Usage:  /og/state/?t=Texas%20CEU%20requirements&s=TX
 *         /og/thread/?t=German%20roach%20cleanout%20protocol
 */

export const runtime = 'edge';

const STOCK = '#f0efe9';
const PAPER = '#fbfbf8';
const INK = '#16171a';
const RULE = '#c9c7bd';
const FIELD = '#1f4d3d';
const WARNING = '#e0a013';

/** Signal colour per template. Same hierarchy as the on-site label system. */
const SIGNAL: Record<string, string> = {
  default: INK,
  state: WARNING,
  thread: FIELD,
  lab: INK,
  wire: INK,
  partners: FIELD,
};

const EYEBROW: Record<string, string> = {
  default: 'For licensed pest management professionals',
  state: 'Academy · State reference',
  thread: 'Community · Verified members only',
  lab: 'Lab · Independent review',
  wire: 'Wire · Regulatory',
  partners: 'Partners',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ template: string }> },
) {
  const { template } = await params;
  const key = template in SIGNAL ? template : 'default';
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('t') ?? site.tagline;
  const stamp = searchParams.get('s') ?? '';
  const bar = SIGNAL[key] ?? INK;
  const barText = key === 'state' ? INK : STOCK;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: STOCK,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Label signal bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: bar,
            color: barText,
            padding: '18px 48px',
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <span>{EYEBROW[key]}</span>
          {stamp ? <span>{stamp}</span> : null}
        </div>

        {/* Headline panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            background: PAPER,
            borderBottom: `1px solid ${RULE}`,
            padding: '0 48px',
          }}
        >
          <div
            style={{
              fontSize: title.length > 70 ? 54 : 68,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.06,
              color: INK,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '22px 48px',
            fontSize: 22,
            color: INK,
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: -0.5 }}>{site.name}</span>
          <span style={{ color: '#7b7f87', letterSpacing: 2, textTransform: 'uppercase', fontSize: 18 }}>
            Verified · dated · sourced
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
