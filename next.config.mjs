/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true, // URL policy: canonical form has a trailing slash. See CLAUDE.md 2.7.
  async redirects() {
    // Routes never change silently. If a route must move, its 301 lands in the SAME commit.
    return [
      // Career routes became the Fields hub (2026-09-24), before first indexation.
      { source: '/trade/paths/', destination: '/fields/', permanent: true },
      { source: '/trade/paths/:slug/', destination: '/fields/:slug/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};
export default nextConfig;
