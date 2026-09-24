import type { MetadataRoute } from 'next';
import { abs, INDEXABLE } from '@/lib/site.config';
import { HUBS } from '@/lib/content/hubs';

/**
 * Sitemap URLs must match what generateSitemaps() in app/sitemap.ts produces.
 * If you add a segment there, add it here in the same commit.
 */
export default function robots(): MetadataRoute.Robots {
  const segments = ['core', ...HUBS.map((h) => h.id)];

  // See INDEXABLE in site.config.ts. Until the brand and the domain are both settled, this
  // deployment is not allowed to be crawled — no sitemap is advertised either, because an
  // advertised sitemap is an invitation regardless of what the rules say.
  if (!INDEXABLE) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Gated and non-content surfaces only. Never disallow anything that should compound.
        disallow: ['/investors/data-room/', '/api/', '/search/', '/og/'],
      },
    ],
    sitemap: segments.map((s) => abs(`/sitemap/${s}.xml`)),
    host: abs('/'),
  };
}
