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

export function getAlternateLocalePath(pathname: string): string {
  const current = siteLocaleFromPath(pathname);
  const target: SiteLocale = current === 'el' ? 'en' : 'el';
  const bare = stripLocalePrefix(pathname);

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

export function getHreflangAlternates(barePath: string): {
  en: string;
  el: string;
  'x-default': string;
} {
  const base = 'https://anotherseoguru.com';
  const normalized = barePath.startsWith('/') ? barePath : `/${barePath}`;
  return {
    en: `${base}${localizedPath('en', normalized)}`,
    el: `${base}${localizedPath('el', normalized)}`,
    'x-default': `${base}${localizedPath('en', normalized)}`,
  };
}
