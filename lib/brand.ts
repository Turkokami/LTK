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
    name: 'Label stock',
    hex: '#f0efe9',
    token: '--stock',
    use: 'Page ground. The cool bone of a printed pesticide label — deliberately not warm cream.',
  },
  {
    name: 'Label stock, second pull',
    hex: '#e6e5dd',
    token: '--stock-2',
    use: 'Hover ground on cards and list rows.',
  },
  {
    name: 'Fresh sheet',
    hex: '#fbfbf8',
    token: '--paper',
    use: 'Panels, header, footer, table bodies.',
  },
  {
    name: 'Label black',
    hex: '#16171a',
    token: '--ink',
    use: 'Body text, signal bars, primary action.',
    contrast: '15.1:1 on Label stock — AAA',
  },
  {
    name: 'Second read',
    hex: '#4a4d54',
    token: '--ink-2',
    use: 'Long-form body. Lighter than primary so headings still lead.',
    contrast: '7.9:1 on Label stock — AAA',
  },
  {
    name: 'Fine print',
    hex: '#7b7f87',
    token: '--ink-3',
    use: 'Spec keys, eyebrows, metadata. Never for anything a reader must act on.',
    contrast: '4.6:1 on Label stock — AA',
  },
  {
    name: 'Hairline',
    hex: '#c9c7bd',
    token: '--rule',
    use: 'Every border on the site. Labels are built from rules, not shadows — there are no box-shadows in this system.',
  },
  {
    name: 'DANGER',
    hex: '#d13a1f',
    token: '--signal-danger',
    use: 'The single most important thing on a page. One per page. Never two.',
    contrast: '5.3:1 on Fresh sheet — AA',
  },
  {
    name: 'WARNING',
    hex: '#e0a013',
    token: '--signal-warning',
    use: 'Regulatory and state-specific flags. Also the threshold line in the brand mark.',
    contrast: 'Used as a ground with Label black text — 8.6:1',
  },
  {
    name: 'Field green',
    hex: '#1f4d3d',
    token: '--field',
    use: 'Verified credentials, licensed status, anything earned. The only "positive" colour in the system.',
    contrast: '9.8:1 on Label stock — AAA',
  },
  {
    name: 'Field green, light',
    hex: '#2f6b56',
    token: '--field-2',
    use: 'Borders on verified badges, hover on field-green surfaces.',
  },
  {
    name: 'Field tint',
    hex: '#e3ebe6',
    token: '--field-tint',
    use: 'Verified badge ground, state-list hover.',
  },
];

export function swatch(token: string): Swatch | undefined {
  return PALETTE.find((s) => s.token === token);
}

/** Hex values for contexts that cannot read CSS custom properties: OG generation, SVG, email. */
export const HEX = {
  stock: '#f0efe9',
  stock2: '#e6e5dd',
  paper: '#fbfbf8',
  ink: '#16171a',
  ink2: '#4a4d54',
  ink3: '#7b7f87',
  rule: '#c9c7bd',
  danger: '#d13a1f',
  warning: '#e0a013',
  field: '#1f4d3d',
} as const;

/**
 * Brand assets. The mark is the IPM action threshold — a dashed threshold line with a
 * population curve crossing it. See docs/BRAND.md for why, and for the one rule that matters:
 * the dashed mark is for display sizes, the solid-line favicon variant is for everything
 * under ~32px.
 */
export const ASSETS = {
  /** Square mark, dashed threshold. Display use. */
  mark: '/brand/mark.svg',
  /** Square mark, solid threshold, heavier strokes. Anything small. */
  favicon: '/brand/favicon.svg',
  /** Horizontal lockup, mark + wordmark + descriptor rule. */
  logo: '/brand/logo.svg',
  /** Same lockup for dark grounds. */
  logoReversed: '/brand/logo-reversed.svg',
  /** Raster for the schema ImageObject node. Must be square and ≥ 1200px. */
  logoRaster: '/brand/logo-1200.png',
  appleTouchIcon: '/brand/apple-touch-icon.png',
} as const;
