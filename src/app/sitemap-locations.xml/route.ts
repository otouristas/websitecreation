// Sitemap for location-based programmatic pages (largest sitemap)
import { NextResponse } from 'next/server';
import { getAllServiceSlugs } from '@/data/services';
import { getAllLocationSlugs } from '@/data/locations';

const BASE_URL = 'https://websites.anotherseoguru.com';

export async function GET() {
    const serviceSlugs = getAllServiceSlugs();
    const locationSlugs = getAllLocationSlugs();

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // Service × Location pages
    serviceSlugs.forEach(service => {
        locationSlugs.forEach(location => {
            urls.push({
                loc: `${BASE_URL}/services/${service}/${location}`,
                lastmod: new Date().toISOString(),
                changefreq: 'monthly',
                priority: '0.6',
            });
        });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
