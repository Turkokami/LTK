import { ImageResponse } from 'next/og';
import { site, abs } from '@/lib/site.config';
import { HEX, ASSETS } from '@/lib/brand';

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

const STOCK = HEX.stock;
const PAPER = HEX.paper;
const INK = HEX.ink;
const RULE = HEX.rule;
const FIELD = HEX.field;
const WARNING = HEX.warning;
const DANGER = HEX.danger;

/** Signal colour per template. Same hierarchy as the on-site label system. */
const SIGNAL: Record<string, string> = {
  default: DANGER,
  state: WARNING,
  thread: FIELD,
  lab: DANGER,
  wire: DANGER,
  partners: FIELD,
};

const EYEBROW: Record<string, string> = {
  default: 'Pest pros helping pest pros',
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
  const bar = SIGNAL[key] ?? DANGER;
  // Dark text on the light grounds (warning, green), bone on blood red.
  const barText = bar === DANGER ? INK : STOCK;

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
          <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={abs(ASSETS.mark)} width={64} height={64} style={{ borderRadius: 32 }} alt="" />
            <span style={{ fontWeight: 800, letterSpacing: -0.5, textTransform: 'uppercase' }}>
              {site.name}
            </span>
          </span>
          <span style={{ color: HEX.ink3, letterSpacing: 2, textTransform: 'uppercase', fontSize: 18 }}>
            Join us on Discord
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
