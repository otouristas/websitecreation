import { getAllServiceSlugs } from '@/data/services';
import {
  allLocations,
  getIndexableServiceLocationSlugs,
  type Location,
} from '@/data/locations';
import {
  buildUrlsetXml,
  chunkUrls,
  type SitemapUrlEntry,
} from '@/lib/sitemap-xml';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const BASE_URL = 'https://anotherseoguru.com';

/** Leave headroom under Google's 50k URL cap. */
export const LOCATION_SITEMAP_CHUNK = 40000;

export type LocationSitemapShard = 'el' | 'en-us' | 'en-intl';

function matchesShard(location: Location, shard: LocationSitemapShard): boolean {
  if (shard === 'el') return location.countryCode === 'GR';
  if (shard === 'en-us') return location.countryCode === 'US';
  // EN intl: UK/EU/CA/AU/etc. plus Greek EN alternates
  return location.countryCode !== 'US';
}

export function buildLocationServiceUrls(
  locale: SiteLocale,
  shard: LocationSitemapShard,
): SitemapUrlEntry[] {
  const serviceSlugs = getAllServiceSlugs();
  const indexable = new Set(getIndexableServiceLocationSlugs(locale));
  const locations = allLocations.filter(
    (l) => indexable.has(l.slug) && matchesShard(l, shard),
  );

  const urls: SitemapUrlEntry[] = [];
  for (const service of serviceSlugs) {
    for (const location of locations) {
      urls.push({
        loc: `${BASE_URL}${localizedPath(locale, `/services/${service}/${location.slug}`)}`,
        changefreq: 'monthly',
        priority: shard === 'el' ? '0.65' : '0.6',
      });
    }
  }

  if (shard === 'el') {
    urls.push({
      loc: `${BASE_URL}${localizedPath('el', '/locations')}`,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  return urls;
}

/** Build XML for a shard; when over chunk size, return only the requested chunk index. */
export function buildLocationSitemapXml(
  locale: SiteLocale,
  shard: LocationSitemapShard,
  chunkIndex = 0,
): { xml: string; chunkCount: number } {
  const urls = buildLocationServiceUrls(locale, shard);
  const chunks = chunkUrls(urls, LOCATION_SITEMAP_CHUNK);
  const safeIndex = Math.min(Math.max(chunkIndex, 0), chunks.length - 1);
  return {
    xml: buildUrlsetXml(chunks[safeIndex] ?? []),
    chunkCount: chunks.length,
  };
}

export function listLocationSitemapPaths(): string[] {
  const paths: string[] = [];

  for (const shard of ['el', 'en-us', 'en-intl'] as const) {
    const locale: SiteLocale = shard === 'el' ? 'el' : 'en';
    const { chunkCount } = buildLocationSitemapXml(locale, shard, 0);
    if (chunkCount <= 1) {
      paths.push(`/sitemap-locations-${shard}.xml`);
    } else {
      for (let i = 1; i <= chunkCount; i++) {
        paths.push(`/sitemap-locations-${shard}-${i}.xml`);
      }
    }
  }

  return paths;
}
