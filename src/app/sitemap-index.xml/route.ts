import { NextResponse } from 'next/server';
import { buildSitemapIndexXml, XML_HEADERS } from '@/lib/sitemap-xml';

const BASE_URL = 'https://anotherseoguru.com';

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemap.xml`,
    `${BASE_URL}/sitemap-services.xml`,
    `${BASE_URL}/sitemap-solutions.xml`,
    `${BASE_URL}/sitemap-locations.xml`,
    `${BASE_URL}/sitemap-locations-el.xml`,
  ];

  return new NextResponse(buildSitemapIndexXml(sitemaps), { headers: XML_HEADERS });
}
