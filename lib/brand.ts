/**
 * brand.ts — the named brand palette and asset registry.
 *
 * Keystone 1.3 (individuality guardrail) requires a real, named palette specific to this
 * property — never a colour pulled from a style database. Every swatch below is named for
 * something in the subject's own world, and the name is the reason the value exists.
 *
 * These values are mirrored as CSS custom properties in app/globals.css. That file is the
 * runtime source of truth for components; this file is the documentation layer and the source
 * for anything that needs colour in TypeScript (OG generation, SVG, email).
 *
 * If you change a value, change it in BOTH places in the same commit.
 */

export interface Swatch {
  /** Name carries the reason. "Label stock" is a decision; "gray-100" is not. */
  name: string;
  hex: string;
  /** CSS custom property in globals.css. */
  token: string;
  use: string;
  /** Contrast ratio against the ground it is used on. Keystone Dimension 14: AA is the floor. */
  contrast?: string;
}

export const PALETTE: Swatch[] = [
  {
    name: 'Night route',
    hex: '#121412',
    token: '--stock',
    use: 'Page ground. The smoky green-black behind the LTK badge — lifted straight from the banner.',
  },
  {
    name: 'Night route, lit',
    hex: '#232522',
    token: '--stock-2',
    use: 'Hover ground on cards and list rows.',
  },
  {
    name: 'Crawlspace',
    hex: '#1a1c1a',
    token: '--paper',
    use: 'Panels, cards, header, footer, table bodies.',
  },
  {
    name: 'Bone',
    hex: '#efe8d6',
    token: '--ink',
    use: 'Primary text. The cream of the badge ring and the "LICENSED" lettering.',
    contrast: '15.1:1 on Night route — AAA',
  },
  {
    name: 'Old bone',
    hex: '#c7c0ae',
    token: '--ink-2',
    use: 'Long-form body. A step down so headings still lead.',
    contrast: '10.2:1 on Night route — AAA',
  },
  {
    name: 'Dust',
    hex: '#948e80',
    token: '--ink-3',
    use: 'Metadata and captions. Never for anything a reader must act on.',
    contrast: '5.3:1 on Crawlspace — AA',
  },
  {
    name: 'Scope line',
    hex: '#34362f',
    token: '--rule',
    use: 'Borders. The thin crosshair lines of the scope.',
  },
  {
    name: 'Blood red',
    hex: '#b3141f',
    token: '--signal-danger',
    use: 'Primary actions and the brand accent — the red of the badge ribbon and the rat’s ears.',
    contrast: 'Bone text on it — 6.0:1',
  },
  {
    name: 'Red dot',
    hex: '#f05a63',
    token: '--blood-text',
    use: 'Red used AS text on dark grounds — links, highlights, the scope’s dot.',
    contrast: '5.2:1 on Crawlspace — AA',
  },
  {
    name: 'WARNING',
    hex: '#e0a013',
    token: '--signal-warning',
    use: 'Regulatory and state-specific flags.',
    contrast: 'Used as a ground with Night route text — 8.1:1',
  },
  {
    name: 'Licensed green',
    hex: '#6cc49a',
    token: '--field',
    use: 'Verified credentials, licensed status, anything earned.',
    contrast: '8.2:1 on Crawlspace — AAA',
  },
  {
    name: 'Licensed green, deep',
    hex: '#4f9f7b',
    token: '--field-2',
    use: 'Borders on verified badges.',
  },
  {
    name: 'Licensed tint',
    hex: '#1c2b24',
    token: '--field-tint',
    use: 'Verified badge ground.',
  },
];

export function swatch(token: string): Swatch | undefined {
  return PALETTE.find((s) => s.token === token);
}

/** Hex values for contexts that cannot read CSS custom properties: OG generation, SVG, email. */
export const HEX = {
  stock: '#121412',
  stock2: '#232522',
  paper: '#1a1c1a',
  ink: '#efe8d6',
  ink2: '#c7c0ae',
  ink3: '#948e80',
  rule: '#34362f',
  danger: '#b3141f',
  bloodText: '#f05a63',
  warning: '#e0a013',
  field: '#6cc49a',
} as const;

/**
 * Brand assets. The mark is the LTK badge: the rat in the scope with the "Licensed to Kill"
 * ribbon. Cropped from the owner-supplied banner (public/brand/ltk-banner.jpg), which is only
 * ~200px tall — swap in a high-resolution original when one exists.
 */
export const ASSETS = {
  /** Square badge. Header, hero, cards. */
  mark: '/brand/ltk-badge.jpg',
  /** Small raster favicon. */
  favicon: '/brand/favicon-64.png',
  /** Full-width banner with the smoky background. */
  banner: '/brand/ltk-banner.jpg',
  /** Raster for the schema ImageObject node. Must be square and ≥ 1200px. */
  logoRaster: '/brand/logo-1200.jpg',
  appleTouchIcon: '/brand/apple-touch-icon.png',
} as const;
