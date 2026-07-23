import { NextResponse } from 'next/server';
import { buildLocationSitemapXml } from '@/lib/sitemap-locations';
import { XML_HEADERS } from '@/lib/sitemap-xml';

/** EN × UK/EU/CA/AU/other (+ Greek EN alternates) that pass the uniqueness gate. */
export async function GET() {
  const { xml } = buildLocationSitemapXml('en', 'en-intl');
  return new NextResponse(xml, { headers: XML_HEADERS });
}
