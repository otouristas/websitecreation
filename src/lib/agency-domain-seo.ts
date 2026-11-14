import { allSitemapEntries } from '@/app/sitemap';
import { buildLocationServiceUrls } from '@/lib/sitemap-locations';
import type { SitemapUrlEntry } from '@/lib/sitemap-xml';
import { GET as servicesSitemap } from '@/app/sitemap-services.xml/route';
import { GET as solutionsSitemap } from '@/app/sitemap-solutions.xml/route';
import { AGENCY_ORIGIN, PRODUCT_ORIGIN, agencyDomainPath, isAgencyPathname } from '@/lib/site-split';

/**
 * SEO files for anotherseoguru.gr, the agency's own domain. The middleware
 * serves them at anotherseoguru.gr/sitemap.xml, /robots.txt and /llms.txt
 * (see src/lib/site-split.ts). They list the Greek agency pages of this
 * project under their .gr URLs.
 */

/** The .gr URL of a Greek agency URL on .com, or null for any other URL. */
export function toAgencyDomainUrl(comUrl: string): string | null {
  if (comUrl.startsWith(`${AGENCY_ORIGIN}/`)) return comUrl;
  if (!comUrl.startsWith(`${PRODUCT_ORIGIN}/el/`) && comUrl !== `${PRODUCT_ORIGIN}/el`) return null;
  const path = comUrl.slice(PRODUCT_ORIGIN.length);
  if (!isAgencyPathname(path)) return null;
  return `${AGENCY_ORIGIN}${agencyDomainPath(path)}`.replace(/\/$/, '') || AGENCY_ORIGIN;
}

async function locsOf(response: Response): Promise<SitemapUrlEntry[]> {
  const xml = await response.text();
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?(?:\s*<changefreq>([^<]+)<\/changefreq>)?(?:\s*<priority>([^<]+)<\/priority>)?/g)].map(
    (m) => ({ loc: m[1].replace(/&amp;/g, '&'), lastmod: m[2], changefreq: m[3], priority: m[4] }),
  );
}

export async function agencySitemapEntries(): Promise<SitemapUrlEntry[]> {
  const main: SitemapUrlEntry[] = allSitemapEntries().map((e) => ({
    loc: e.url,
    lastmod: e.lastModified ? new Date(e.lastModified).toISOString().slice(0, 10) : undefined,
    changefreq: e.changeFrequency,
    priority: e.priority === undefined ? undefined : String(e.priority),
  }));
  const all = [
    ...main,
    ...(await locsOf(await servicesSitemap())),
    ...(await locsOf(await solutionsSitemap())),
    ...buildLocationServiceUrls('el', 'el'),
  ];
  const seen = new Set<string>();
  const out: SitemapUrlEntry[] = [];
  for (const entry of all) {
    const loc = toAgencyDomainUrl(entry.loc);
    if (!loc || seen.has(loc)) continue;
    seen.add(loc);
    out.push({ ...entry, loc });
  }
  // The .gr home first.
  return out.sort((a, b) => (a.loc === AGENCY_ORIGIN ? -1 : b.loc === AGENCY_ORIGIN ? 1 : 0));
}

export function agencyRobotsTxt(): string {
  return [
    '# anotherseoguru.gr: websites and SEO for Greek businesses.',
    '# The SEO software lives at https://anotherseoguru.com',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `# Agency directory: ${AGENCY_ORIGIN}/llms.txt`,
    `# Full Greek text: ${AGENCY_ORIGIN}/llms-full.txt`,
    `Sitemap: ${AGENCY_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');
}
