import type { Metadata, Viewport } from 'next';
import { Archivo, Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site, abs } from '@/lib/site.config';
import { ASSETS } from '@/lib/brand';
import { SiteHeader } from '@/components/site/Header';
import { SiteFooter } from '@/components/site/Footer';
import { AgentToaster } from '@/components/agent/AgentToaster';
import { Analytics } from '@vercel/analytics/next';
import { DiscordBand } from '@/components/community/Discord';

/**
 * Type pairing (docs/DESIGN.md):
 *   Archivo       — display + UI. Industrial grotesque, the closest thing to label typography.
 *   Newsreader    — long-form reference only. Reads as a technical bulletin, not a blog post.
 *   JetBrains Mono— data, spec labels, credential numbers, state codes.
 */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['400', '500', '600'],
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
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
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} ${mono.variable}`}>
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
