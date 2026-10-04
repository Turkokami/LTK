import { abs } from '@/lib/site.config';
import { HUBS } from '@/lib/content/hubs';

/**
 * /sitemap.xml — the sitemap index. app/sitemap.ts splits the site into one sitemap per hub
 * (/sitemap/<id>.xml), and Next doesn't publish an index for those, but /sitemap.xml is where
 * Search Console and every crawler look first. Segments must match generateSitemaps().
 */

export const dynamic = 'force-static';

export function GET() {
  const now = new Date().toISOString();
  const segments = ['core', ...HUBS.map((h) => h.id)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${segments.map((s) => `  <sitemap><loc>${abs(`/sitemap/${s}.xml`)}</loc><lastmod>${now}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
