import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler for performance
  reactCompiler: true,

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
        destination: '/platform/features',
        permanent: true,
      },
      {
        source: '/seo-platform',
        destination: '/platform',
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
        destination: '/contact',
        permanent: false,
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

  // Cache headers for programmatic pages
  async headers() {
    return [
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

