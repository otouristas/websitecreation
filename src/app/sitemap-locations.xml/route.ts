import { NextResponse } from 'next/server';

/**
 * Legacy single EN locations sitemap, permanently redirect crawlers to the
 * locale/country shards listed in sitemap-index.xml.
 */
export async function GET() {
  return NextResponse.redirect('https://anotherseoguru.com/sitemap-index.xml', 301);
}
