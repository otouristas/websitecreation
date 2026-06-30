// Sitemap for service pages - /en and /el
import { NextResponse } from 'next/server';
import { getAllServiceSlugs } from '@/data/services';
import { localizedPath } from '@/lib/i18n/locale';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  const serviceSlugs = getAllServiceSlugs();
  const locales = ['en', 'el'] as const;

  const urls = locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      loc: `${BASE_URL}${localizedPath(locale, `/services/${slug}`)}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
    })),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
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
