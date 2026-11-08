import { NextResponse } from 'next/server';
import { listLocationSitemapPaths } from '@/lib/sitemap-locations';
import { buildSitemapIndexXml, XML_HEADERS } from '@/lib/sitemap-xml';
import { AGENCY_ON_OWN_DOMAIN } from '@/lib/site-split';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  // Services, solutions and city sitemaps hold agency pages only. Once the
  // agency has its own domain they move to anotherseoguru.gr/sitemap.xml.
  const sitemaps = [
    `${BASE_URL}/sitemap.xml`,
    ...(AGENCY_ON_OWN_DOMAIN
      ? []
      : [
          `${BASE_URL}/sitemap-services.xml`,
          `${BASE_URL}/sitemap-solutions.xml`,
          ...listLocationSitemapPaths().map((p) => `${BASE_URL}${p}`),
        ]),
  ];

  return new NextResponse(buildSitemapIndexXml(sitemaps), { headers: XML_HEADERS });
}
