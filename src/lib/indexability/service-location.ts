/**
 * Service × city pages that still exist.
 *
 * The programmatic grid used to render every service for every city in both
 * locales: about 1,100 indexable URLs plus about 1,300 noindex ones. Each city
 * paragraph was reused across 12 services, Greek pages existed for US cities,
 * and only 3 keywords ranked site-wide. The owner approved cutting the grid
 * to a small set of strong pages. This file is that set. Every other
 * `/{locale}/services/{service}/{location}` URL returns 410 Gone from
 * `src/middleware.ts`.
 *
 * This module is imported by the middleware (edge runtime), so it must stay
 * free of data imports. Plain string lists only.
 *
 * How the lists were chosen (2026-10 cut):
 * - Services: website-creation, local-seo and seo-audits (the main "SEO
 *   services" product, Greek name «Υπηρεσίες SEO») are the services people
 *   search with a city name. The fourth slot went to eshop-woocommerce over
 *   ai-visibility: "κατασκευη eshop" has about 700 searches a month in Greece
 *   (Ahrefs, 2026-10), and e-shops are bought locally, while nobody searches
 *   "AI visibility + city". The portfolio has 3 ai-visibility projects
 *   against 1 tagged e-shop build, but it also has several live stores
 *   (opticore-store, phytomore, thenutrinest), so it does not decide it.
 * - Greek cities: the approved core list, plus Rethymno (most clicks of any
 *   city page in the GSC export: 4), Kos (the only Greek ranking keyword on
 *   the site lands on a Kos city page) and Kalamata (third most city-page
 *   impressions in the GSC export: 483). crete-gr is dropped in favour of
 *   heraklion-gr, chania-gr and rethymno-gr: a region page overlaps all three.
 * - English: London (portfolio-backed EN hub) plus the Greek tourism
 *   destinations, which is where English-language demand for Greek web work
 *   comes from. Thessaloniki, Patras and Kalamata are not tourism-led, so they
 *   stay Greek-only.
 * - US cities: dropped. The 2026-08 GSC export shows 3 clicks in total across
 *   every US city page, and Ahrefs finds no ranking US city keyword.
 */
import type { SiteLocale } from '@/lib/i18n/locale';

/** Services that keep city pages, in display order. */
export const CITY_PAGE_SERVICES = [
  'website-creation',
  'local-seo',
  'seo-audits',
  'eshop-woocommerce',
] as const;

/** Cities that keep pages, per locale, in display order. */
export const CITY_PAGE_LOCATIONS: Record<SiteLocale, readonly string[]> = {
  el: [
    'athens-gr',
    'thessaloniki-gr',
    'heraklion-gr',
    'chania-gr',
    'rethymno-gr',
    'santorini-gr',
    'mykonos-gr',
    'paros-gr',
    'naxos-gr',
    'rhodes-gr',
    'kos-gr',
    'corfu-gr',
    'patras-gr',
    'kalamata-gr',
  ],
  en: [
    'london-uk',
    'athens-gr',
    'heraklion-gr',
    'chania-gr',
    'rethymno-gr',
    'santorini-gr',
    'mykonos-gr',
    'paros-gr',
    'naxos-gr',
    'rhodes-gr',
    'kos-gr',
    'corfu-gr',
  ],
};

const SERVICE_SET = new Set<string>(CITY_PAGE_SERVICES);
const LOCATION_SETS: Record<SiteLocale, Set<string>> = {
  el: new Set(CITY_PAGE_LOCATIONS.el),
  en: new Set(CITY_PAGE_LOCATIONS.en),
};

export function isCityPageService(serviceSlug: string): boolean {
  return SERVICE_SET.has(serviceSlug);
}

/** True when the city keeps pages in this locale (for any of the kept services). */
export function isCityPageLocation(locale: SiteLocale, locationSlug: string): boolean {
  return LOCATION_SETS[locale]?.has(locationSlug) ?? false;
}

/** True when `/{locale}/services/{service}/{location}` is a live page. */
export function isServiceLocationKept(
  locale: SiteLocale,
  serviceSlug: string,
  locationSlug: string,
): boolean {
  return isCityPageService(serviceSlug) && isCityPageLocation(locale, locationSlug);
}

/** Every live service × city combination for a locale. */
export function listKeptServiceLocations(
  locale: SiteLocale,
): { service: string; location: string }[] {
  return CITY_PAGE_SERVICES.flatMap((service) =>
    CITY_PAGE_LOCATIONS[locale].map((location) => ({ service, location })),
  );
}

/**
 * Removed city URLs that still carry a ranking. These get a 308 to the
 * service hub instead of a 410, so the ranking signal is consolidated on the
 * main page rather than thrown away.
 *
 * /el/services/link-building/kos-gr ranks #4 on google.gr for "link building"
 * (Ahrefs, 2026-10). It is the only Greek keyword the site ranks for, and it
 * should rank on /el/services/link-building.
 */
export const SERVICE_LOCATION_REDIRECTS: Readonly<Record<string, string>> = {
  '/el/services/link-building/kos-gr': '/el/services/link-building',
};

const SERVICE_LOCATION_PATH = /^\/(en|el)\/services\/([^/]+)\/([^/]+)\/?$/;

export type ServiceLocationRouteDecision =
  | { kind: 'keep' }
  | { kind: 'redirect'; to: string }
  | { kind: 'gone'; locale: SiteLocale; service: string; location: string };

/**
 * Decide how a request path is served. Returns null for paths that are not a
 * localized service × city URL.
 */
export function decideServiceLocationRoute(pathname: string): ServiceLocationRouteDecision | null {
  const match = SERVICE_LOCATION_PATH.exec(pathname);
  if (!match) return null;
  const [, locale, service, location] = match as unknown as [string, SiteLocale, string, string];
  if (isServiceLocationKept(locale, service, location)) return { kind: 'keep' };
  const normalized = `/${locale}/services/${service}/${location}`;
  const redirect = SERVICE_LOCATION_REDIRECTS[normalized];
  if (redirect) return { kind: 'redirect', to: redirect };
  return { kind: 'gone', locale, service, location };
}
