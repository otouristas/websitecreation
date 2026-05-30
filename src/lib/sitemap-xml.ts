/**
 * Helpers for XML sitemap generation with optional sharding.
 */

export const SITEMAP_MAX_URLS = 50000;

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export function buildUrlsetXml(urls: SitemapUrlEntry[]): string {
  const lastmodDefault = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod ?? lastmodDefault}</lastmod>
    <changefreq>${url.changefreq ?? 'monthly'}</changefreq>
    <priority>${url.priority ?? '0.6'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;
}

export function buildSitemapIndexXml(sitemapLocs: string[]): string {
  const lastmod = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapLocs
  .map(
    (loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`;
}

export function chunkUrls<T>(items: T[], size = SITEMAP_MAX_URLS): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks.length ? chunks : [[]];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const XML_HEADERS = {
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
} as const;
