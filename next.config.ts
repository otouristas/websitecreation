import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler for performance
  reactCompiler: true,

  // Next 16.3 writes AGENTS.md + CLAUDE.md into the repo root on every dev
  // start. Off by default here so the upgrade does not add files nobody asked
  // for; flip to true (or delete this line) to opt back in.
  agentRules: false,

  async redirects() {
    const appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN?.replace(/\/$/, '') || 'https://app.anotherseoguru.com';
    return [
      {
        source: '/landing',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/en/platform/features',
        permanent: true,
      },
      {
        source: '/seo-platform',
        destination: '/en/platform',
        permanent: true,
      },
      {
        source: '/:locale(en|el)/seo-platform',
        destination: '/:locale/platform',
        permanent: true,
      },
      {
        source: '/:locale(en|el)/seo-platform/:path*',
        destination: '/:locale/platform/:path*',
        permanent: true,
      },
      {
        source: '/free-tools/:path*',
        destination: `${appOrigin}/free-tools/:path*`,
        permanent: true,
      },
      {
        source: '/app/:path*',
        destination: `${appOrigin}/:path*`,
        permanent: false,
      },
      // English-only product sections. Serving them under /el produced an
      // English page with lang="el" that canonicalised to the /en twin, so
      // consolidate at the URL level instead of leaving the duplicate live.
      // /el/glossary is intentionally untouched: that one has Greek content.
      {
        source: '/el/:section(platform|tools|resources|compare)',
        destination: '/en/:section',
        permanent: true,
      },
      {
        source: '/el/:section(platform|tools|resources|compare)/:path*',
        destination: '/en/:section/:path*',
        permanent: true,
      },
      {
        source: '/gr',
        destination: '/el',
        permanent: true,
      },
      {
        source: '/gr/:path*',
        destination: '/el/:path*',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/en/work',
        permanent: true,
      },
      {
        source: '/work/:path*',
        destination: '/en/work/:path*',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/en/services/:path*',
        permanent: true,
      },
      {
        source: '/solutions/:path*',
        destination: '/en/solutions/:path*',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/en/pricing',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/get-started',
        destination: '/en/get-started',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/en/blog/:path*',
        permanent: true,
      },
      {
        source: '/platform/:path*',
        destination: '/en/platform/:path*',
        permanent: true,
      },
      {
        source: '/status',
        destination: '/en/contact',
        permanent: false,
      },
      {
        source: '/blog/google-search-operators-2025',
        destination: '/en/blog/google-search-operators-2026',
        permanent: true,
      },
      {
        source: '/:locale(en|el)/blog/google-search-operators-2025',
        destination: '/:locale/blog/google-search-operators-2026',
        permanent: true,
      },
    ];
  },

  // Image optimization for Core Web Vitals
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'anotherseoguru.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Compression
  compress: true,

  // Experimental features for scale
  experimental: {
    // Optimize package imports for faster builds
    optimizePackageImports: ['@/lib/seo', '@/components/seo', '@/lib/linking'],
  },

  turbopack: {
    root: __dirname,
  },

  // Cache headers for programmatic pages + sitewide security headers
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin-allow-popups',
      },
      {
        key: 'Content-Security-Policy',
        // GA4 collect hits go to regional hosts (e.g. region1.google-analytics.com)
        // for EU/UK/CH visitors. Exact www.* hosts do not match those subdomains.
        // https://developers.google.com/tag-platform/security/guides/csp
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.googletagmanager.com https://*.google-analytics.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://formspree.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self' https://formspree.io",
        ].join('; '),
      },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Service pages
        source: '/services/:service',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Service × Location pages
        source: '/services/:service/:location',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Industry pages
        source: '/solutions/:industry',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Industry × Service pages
        source: '/solutions/:industry/:service',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;

