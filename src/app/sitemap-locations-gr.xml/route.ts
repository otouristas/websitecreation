import { NextResponse } from 'next/server';
import { getAllServiceSlugs } from '@/data/services';
import { greeceLocations } from '@/data/locations';
import { buildUrlsetXml, type SitemapUrlEntry, XML_HEADERS } from '@/lib/sitemap-xml';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  const serviceSlugs = getAllServiceSlugs();
  const greekSlugs = greeceLocations.map((l) => l.slug);
  const urls: SitemapUrlEntry[] = [];

  for (const service of serviceSlugs) {
    for (const location of greekSlugs) {
      urls.push({
        loc: `${BASE_URL}/gr/services/${service}/${location}`,
        changefreq: 'monthly',
        priority: '0.65',
      });
    }
  }

  urls.push({
    loc: `${BASE_URL}/gr/locations`,
    changefreq: 'weekly',
    priority: '0.8',
  });

  return new NextResponse(buildUrlsetXml(urls), { headers: XML_HEADERS });
}
