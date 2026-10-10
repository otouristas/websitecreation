import {
  getLocationBySlug,
  isServiceLocationIndexable,
  type Location,
} from '@/data/locations';
import { listKeptServiceLocations } from '@/lib/indexability/service-location';
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
  // Only the kept service × city pages (2026-10 city cut). Everything else
  // under /services/{service}/{location} is 410 Gone and must not be listed.
  const urls: SitemapUrlEntry[] = [];
  for (const { service, location: slug } of listKeptServiceLocations(locale)) {
    const location = getLocationBySlug(slug);
    if (!location || !matchesShard(location, shard)) continue;
    if (!isServiceLocationIndexable(service, location, locale)) continue;
    urls.push({
      loc: `${BASE_URL}${localizedPath(locale, `/services/${service}/${location.slug}`)}`,
      changefreq: 'monthly',
      priority: shard === 'el' ? '0.65' : '0.6',
    });
  }

  // /el/locations is not re-added here. It is already in the main sitemap via
  // `bilingualPaths` (src/app/sitemap.ts), so this submitted it twice - and
  // asymmetrically, since /en/locations was never added to the en-intl shard.

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
    // Skip shards with nothing in them. US city pages were removed in the
    // 2026-10 city cut, so advertising an empty en-us sitemap in the index just
    // gives Search Console a 0-URL child to report on.
    if (buildLocationServiceUrls(locale, shard).length === 0) continue;

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
