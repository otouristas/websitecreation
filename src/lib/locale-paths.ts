/**
 * Map paths between English and Greek marketing routes.
 */

const GREEK_LOCATION_SLUGS = new Set([
  'athens-gr',
  'thessaloniki-gr',
  'patras-gr',
  'heraklion-gr',
  'larissa-gr',
  'volos-gr',
]);

export function isGreekLocationSlug(slug: string): boolean {
  return GREEK_LOCATION_SLUGS.has(slug) || slug.endsWith('-gr');
}

/** English programmatic service-location path */
export function enServiceLocationPath(service: string, location: string): string {
  return `/services/${service}/${location}`;
}

/** Greek programmatic service-location path */
export function grServiceLocationPath(service: string, location: string): string {
  return `/gr/services/${service}/${location}`;
}

/**
 * Given current pathname, return alternate locale href.
 */
export function getAlternateLocalePath(pathname: string): string {
  const isGreekRoute = pathname === '/gr' || pathname.startsWith('/gr/');

  if (isGreekRoute) {
    if (pathname === '/gr') return '/';
    if (pathname === '/gr/locations') return '/locations';

    const grServiceMatch = pathname.match(/^\/gr\/services\/([^/]+)\/([^/]+)$/);
    if (grServiceMatch) {
      const [, service, location] = grServiceMatch;
      return enServiceLocationPath(service, location);
    }

    if (pathname.startsWith('/gr/')) {
      return pathname.replace(/^\/gr/, '') || '/';
    }
    return '/';
  }

  if (pathname === '/') return '/gr';
  if (pathname === '/locations') return '/gr/locations';

  const enServiceMatch = pathname.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (enServiceMatch) {
    const [, service, location] = enServiceMatch;
    if (isGreekLocationSlug(location)) {
      return grServiceLocationPath(service, location);
    }
    return '/gr';
  }

  return '/gr';
}

export function getLocaleFromPath(pathname: string): 'en' | 'el' {
  return pathname === '/gr' || pathname.startsWith('/gr/') ? 'el' : 'en';
}
