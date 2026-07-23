import { NextResponse } from 'next/server';
import { buildLocationSitemapXml } from '@/lib/sitemap-locations';
import { XML_HEADERS } from '@/lib/sitemap-xml';

/** Greek service×location URLs that pass the uniqueness gate. */
export async function GET() {
  const { xml } = buildLocationSitemapXml('el', 'el');
  return new NextResponse(xml, { headers: XML_HEADERS });
}
