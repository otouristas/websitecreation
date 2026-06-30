import { NextResponse } from 'next/server';
import { getAllServiceSlugs } from '@/data/services';
import { getAllLocationSlugs } from '@/data/locations';
import { buildUrlsetXml, type SitemapUrlEntry, XML_HEADERS } from '@/lib/sitemap-xml';
import { localizedPath } from '@/lib/i18n/locale';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  const serviceSlugs = getAllServiceSlugs();
  const locationSlugs = getAllLocationSlugs();
  const urls: SitemapUrlEntry[] = [];

  for (const service of serviceSlugs) {
    for (const location of locationSlugs) {
      urls.push({
        loc: `${BASE_URL}${localizedPath('en', `/services/${service}/${location}`)}`,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }
  }

  return new NextResponse(buildUrlsetXml(urls), { headers: XML_HEADERS });
}
