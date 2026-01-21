// Sitemap index pointing to all sub-sitemaps
import { NextResponse } from 'next/server';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
    const sitemaps = [
        `${BASE_URL}/sitemap.xml`,
        `${BASE_URL}/sitemap-services.xml`,
        `${BASE_URL}/sitemap-solutions.xml`,
        `${BASE_URL}/sitemap-locations.xml`,
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
