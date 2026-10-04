import type { Metadata, Viewport } from 'next';
import { Rubik, Newsreader } from 'next/font/google';
import './globals.css';
import { site, abs } from '@/lib/site.config';
import { ASSETS } from '@/lib/brand';
import { SiteHeader } from '@/components/site/Header';
import { SiteFooter } from '@/components/site/Footer';
import { AgentToaster } from '@/components/agent/AgentToaster';
import { Analytics } from '@vercel/analytics/next';
import { DiscordBand } from '@/components/community/Discord';

/**
 * Type pairing (2026-10 refresh — softer and friendlier than the old industrial set):
 *   Rubik       — display, UI and labels. Rounded corners, friendly, still punchy at 800–900.
 *                 It keeps the old CSS variable names (--font-archivo, and --font-mono maps to
 *                 it in globals.css) so every existing class picks it up.
 *   Newsreader  — long-form reference only.
 */
// Variable font: one file covers every weight (400-900), instead of six separate downloads
// competing with the hero headline (the page's LCP element).
const archivo = Rubik({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['400', '500', '600'],
  display: 'swap',
});
/**
 * CLAUDE.md 2.6 — `maximum-scale` is banned. It was the original prototype's WCAG 1.4.4 defect
 * and it is not coming back.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#121412',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Pest control pros: Discord, state CEU guides & tech reviews',
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  alternates: { canonical: abs('/') },
  icons: {
    // Small sizes use a close crop of the rat in the scope; large ones the full badge.
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/brand/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: ASSETS.appleTouchIcon, sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  // Fallback share card for any page that doesn't set its own (pageMeta sets one per page).
  openGraph: {
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og/default/', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/default/'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-stock"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        {/* Every page ends with the invite. The Discord is where the community lives today. */}
        <div className="shell mt-16">
          <DiscordBand />
        </div>
        <SiteFooter />
        <AgentToaster />
        {/* Vercel Web Analytics: cookieless page counts. Inert until enabled in the Vercel project. */}
        <Analytics />
      </body>
    </html>
  );
}
