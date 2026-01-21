// Sitemap for solutions (industry) pages
import { NextResponse } from 'next/server';
import { getAllIndustrySlugs } from '@/data/industries';
import { getAllServiceSlugs } from '@/data/services';

const BASE_URL = 'https://websites.anotherseoguru.com';

export async function GET() {
    const industrySlugs = getAllIndustrySlugs();
    const serviceSlugs = getAllServiceSlugs();

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // Industry hub pages
    industrySlugs.forEach(industry => {
        urls.push({
            loc: `${BASE_URL}/solutions/${industry}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.8',
        });
    });

    // Industry × Service pages
    industrySlugs.forEach(industry => {
        serviceSlugs.forEach(service => {
            urls.push({
                loc: `${BASE_URL}/solutions/${industry}/${service}`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: '0.7',
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
