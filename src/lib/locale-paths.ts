/**
 * Map paths between /en and /el marketing routes.
 */

import {
  localizedPath,
  siteLocaleFromPath,
  stripLocalePrefix,
  swapLocaleInPath,
  type SiteLocale,
} from '@/lib/i18n/locale';

const GREEK_LOCATION_SLUGS = new Set([
  'athens-gr',
  'thessaloniki-gr',
  'patras-gr',
  'heraklion-gr',
  'larissa-gr',
  'volos-gr',
  'santorini-gr',
  'mykonos-gr',
  'paros-gr',
  'naxos-gr',
  'crete-gr',
  'rethymno-gr',
  'chania-gr',
  'kos-gr',
  'corinth-gr',
  'serres-gr',
  'lamia-gr',
  'kavala-gr',
  'rhodes-gr',
  'corfu-gr',
  'zakynthos-gr',
  'lefkada-gr',
  'skiathos-gr',
  'ios-gr',
  'milos-gr',
  'syros-gr',
  'tinos-gr',
  'andros-gr',
  'karpathos-gr',
  'lemnos-gr',
  'chios-gr',
  'samos-gr',
  'ikaria-gr',
  'mytilene-gr',
  'ioannina-gr',
  'trikala-gr',
  'kalamata-gr',
  'agrinio-gr',
  'drama-gr',
  'alexandroupoli-gr',
  'tripoli-gr',
  'chalkida-gr',
  'komotini-gr',
  'nafplio-gr',
  'pyrgos-gr',
]);

export function isGreekLocationSlug(slug: string): boolean {
  return GREEK_LOCATION_SLUGS.has(slug) || slug.endsWith('-gr');
}

export function enServiceLocationPath(service: string, location: string): string {
  return localizedPath('en', `/services/${service}/${location}`);
}

export function elServiceLocationPath(service: string, location: string): string {
  return localizedPath('el', `/services/${service}/${location}`);
}

/** @deprecated use elServiceLocationPath */
export const grServiceLocationPath = elServiceLocationPath;

/** EN-first product paths with no dedicated EL twin, lang switch falls back to home. */
const EN_ONLY_PATH_PREFIXES = ['/platform', '/tools', '/resources', '/glossary'] as const;

function isEnOnlyBarePath(bare: string): boolean {
  return EN_ONLY_PATH_PREFIXES.some(
    (prefix) => bare === prefix || bare.startsWith(`${prefix}/`),
  );
}

/**
 * Locale twin for the current marketing path. Falls back to the other locale's
 * homepage when there is no reliable 1:1 page (platform/tools, non-GR locations).
 */
export function getAlternateLocalePath(pathname: string): string {
  const current = siteLocaleFromPath(pathname);
  const target: SiteLocale = current === 'el' ? 'en' : 'el';
  const bare = stripLocalePrefix(pathname);

  if (isEnOnlyBarePath(bare)) {
    return localizedPath(target, '/');
  }

  const serviceLocationMatch = bare.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (serviceLocationMatch) {
    const [, service, location] = serviceLocationMatch;
    if (isGreekLocationSlug(location)) {
      return target === 'el'
        ? elServiceLocationPath(service, location)
        : enServiceLocationPath(service, location);
    }
    return localizedPath(target, '/services');
  }

  return swapLocaleInPath(pathname, target);
}

export function getLocaleFromPath(pathname: string): SiteLocale {
  return siteLocaleFromPath(pathname);
}

const HREFLANG_BASE = 'https://anotherseoguru.com';

/**
 * hreflang alternates for a bare (locale-less) path. Only emit when the page
 * genuinely exists in more than one locale, advertising an alternate that
 * 404s or serves untranslated content hurts more than no hreflang at all.
 */
export function getHreflangAlternates(
  barePath: string,
  locales: readonly SiteLocale[] = ['en', 'el'],
): Record<string, string> | undefined {
  if (locales.length < 2) return undefined;
  const normalized = barePath.startsWith('/') ? barePath : `/${barePath}`;
  return {
    en: `${HREFLANG_BASE}${localizedPath('en', normalized)}`,
    el: `${HREFLANG_BASE}${localizedPath('el', normalized)}`,
    'x-default': `${HREFLANG_BASE}${localizedPath('en', normalized)}`,
  };
}

/**
 * hreflang map for pages whose slugs differ per locale (e.g. paired blog
 * posts). Pass full locale-prefixed paths; returns undefined unless at least
 * two locales are present.
 */
export function buildHreflangMapFromPaths(
  paths: Partial<Record<SiteLocale, string>>,
): Record<string, string> | undefined {
  const entries = Object.entries(paths).filter(
    (entry): entry is [SiteLocale, string] => typeof entry[1] === 'string' && entry[1].length > 0,
  );
  if (entries.length < 2) return undefined;
  const map: Record<string, string> = {};
  for (const [locale, p] of entries) {
    map[locale] = `${HREFLANG_BASE}${p.startsWith('/') ? p : `/${p}`}`;
  }
  if (map.en) map['x-default'] = map.en;
  return map;
}
