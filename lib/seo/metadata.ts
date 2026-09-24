import type { Metadata } from 'next';
import { site, abs } from '@/lib/site.config';

/**
 * The only place page metadata is assembled. CLAUDE.md §5 audit gate checks:
 * title <= 60 chars, description 140-160 chars, canonical always absolute.
 */
export interface PageMetaInput {
  /** <= 60 characters. Audience first, brand last. */
  title: string;
  /** 140-160 characters. Concrete deliverables, in demand order. Never "we are a platform". */
  description: string;
  /** Path only, with trailing slash. */
  path: string;
  /** Gated or thin-value pages only. Default is indexable. */
  noindex?: boolean;
  ogTemplate?: string;
}

export function pageMeta({
  title,
  description,
  path,
  noindex = false,
  ogTemplate = 'default',
}: PageMetaInput): Metadata {
  const url = abs(path);
  if (process.env.NODE_ENV !== 'production') {
    if (title.length > 60) console.warn(`[seo] title ${title.length} chars (>60): ${path}`);
    if (description.length < 140 || description.length > 160) {
      console.warn(`[seo] description ${description.length} chars (want 140-160): ${path}`);
    }
  }
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: site.locale,
      images: [{ url: abs(`/og/${ogTemplate}/`), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/**
 * fitDescription — compose a meta description that lands in the 140–160 character band when
 * part of it is variable-length.
 *
 * The problem this solves: a template like `${category} discussion between…` produces a
 * description 16 characters longer for "Commercial & food safety" than for "Bed bugs". A single
 * hand-tuned string cannot be in band for both, and the audit harness is right to fail it.
 *
 * Pass a base and one or more optional tails in priority order. The longest combination that
 * still fits the band wins. If nothing fits, the base is returned and the harness will flag it —
 * which is correct, because silently shipping an out-of-band description is the failure we are
 * trying to catch.
 */
export function fitDescription(base: string, tails: string[] = [], min = 140, max = 160): string {
  let best = base;
  let acc = base;
  for (const tail of tails) {
    const next = `${acc} ${tail}`.trim();
    if (next.length > max) break;
    acc = next;
    if (acc.length >= min) best = acc;
  }
  // If the base alone already overshoots, nothing we append helps. Return it and let the
  // harness fail — the copy itself needs shortening by a human.
  return best.length >= min && best.length <= max ? best : acc.length <= max ? acc : base;
}

/**
 * fitTitle — keep a generated title inside the display budget.
 *
 * Titles built from a registry are variable-length by nature: "Fumigation" and "Termite and
 * wood-destroying organisms" cannot carry the same suffix and both stay under 60. Trying the
 * decorated form first and degrading to the bare subject is better than truncating mid-word,
 * which is what a search engine does for you if you do not do it yourself.
 *
 * Returns the first candidate that fits, or the shortest candidate if none do.
 */
/**
 * The layout applies `%s · ${site.shortName}`. The separator plus spaces is 3 characters, and the
 * suffix length is read from config rather than hardcoded so a rename cannot silently push
 * every title on the site over budget. The short name ("LTK") is used rather than the full
 * "Licensed to Kill" because the full name would eat a third of every title's 60 characters.
 */
export const TITLE_SUFFIX_LENGTH = 3 + site.shortName.length;

export function fitTitle(candidates: string[], max = 60 - TITLE_SUFFIX_LENGTH): string {
  const fits = candidates.find((c) => c.length <= max);
  if (fits) return fits;
  return [...candidates].sort((a, b) => a.length - b.length)[0] ?? '';
}

/**
 * pickDescription — choose the tail that lands in the snippet band.
 *
 * `fitDescription` appends tails in order and stops at the first overflow, which is right when
 * the tails are genuinely incremental. It is wrong when the base text varies a lot: a 123-char
 * summary and an 88-char summary need different-sized tails, and a single ordered list cannot
 * serve both — the long base overflows on the tail the short base needs.
 *
 * This tries each candidate independently and returns the first that lands in band, so one
 * template can serve fourteen registry entries of wildly different lengths without a human
 * hand-writing fourteen descriptions.
 */
export function pickDescription(
  base: string,
  candidates: string[],
  min = 140,
  max = 160,
): string {
  const trimmed = base.trim();
  if (trimmed.length >= min && trimmed.length <= max) return trimmed;

  for (const tail of candidates) {
    const next = `${trimmed} ${tail.trim()}`.trim();
    if (next.length >= min && next.length <= max) return next;
  }

  // Nothing landed. Return the closest under max so the harness reports a real number and a
  // human shortens the source copy, rather than shipping a silently truncated snippet.
  const under = [trimmed, ...candidates.map((t) => `${trimmed} ${t.trim()}`.trim())]
    .filter((s) => s.length <= max)
    .sort((a, b) => b.length - a.length);
  return under[0] ?? trimmed;
}
