import { NextResponse } from 'next/server';
import { listLocationSitemapPaths } from '@/lib/sitemap-locations';
import { buildSitemapIndexXml, XML_HEADERS } from '@/lib/sitemap-xml';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemap.xml`,
    `${BASE_URL}/sitemap-services.xml`,
    `${BASE_URL}/sitemap-solutions.xml`,
    ...listLocationSitemapPaths().map((p) => `${BASE_URL}${p}`),
  ];

  return new NextResponse(buildSitemapIndexXml(sitemaps), { headers: XML_HEADERS });
}
