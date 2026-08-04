import { NextResponse } from 'next/server';
import { buildLocationSitemapXml } from '@/lib/sitemap-locations';
import { XML_HEADERS } from '@/lib/sitemap-xml';

/** EN × US allowlisted locations that pass the uniqueness gate. */
export async function GET() {
  const { xml } = buildLocationSitemapXml('en', 'en-us');
  return new NextResponse(xml, { headers: XML_HEADERS });
}
