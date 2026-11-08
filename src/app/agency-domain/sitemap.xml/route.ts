import { NextResponse } from 'next/server';
import { agencySitemapEntries } from '@/lib/agency-domain-seo';
import { buildUrlsetXml, XML_HEADERS } from '@/lib/sitemap-xml';

/** anotherseoguru.gr/sitemap.xml (rewritten here by the middleware). */
export async function GET() {
  return new NextResponse(buildUrlsetXml(await agencySitemapEntries()), {
    headers: { ...XML_HEADERS, 'X-Robots-Tag': 'noindex' },
  });
}
