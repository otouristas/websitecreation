import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler for performance
  reactCompiler: true,

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

