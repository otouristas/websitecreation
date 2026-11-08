/**
 * anotherseoguru.com is the product site (AnotherSEOGuru App). The done-for-you
 * agency (websites and SEO for Greek businesses) is a separate business that
 * serves Greek clients, so its pages live in Greek only, under /el, until they
 * move to their own domain (anotherseoguru.gr).
 *
 * This module is imported by the middleware (edge runtime) and by client
 * components, so it must stay free of imports (locale.ts imports it). Plain strings only.
 */

function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/el') return '/';
  if (pathname.startsWith('/en/') || pathname.startsWith('/el/')) return pathname.slice(3) || '/';
  return pathname;
}

/** Greek landing page of the agency (the future anotherseoguru.gr home). */
export const AGENCY_HOME_PATH = '/ypiresies';
/** Agency prices: the one package, websites and monthly SEO. */
export const AGENCY_PRICING_PATH = '/ypiresies/times';
/** The agency's free audit form. */
export const AGENCY_AUDIT_PATH = '/get-started';

export const AGENCY_HOME_EL = `/el${AGENCY_HOME_PATH}`;
export const AGENCY_PRICING_EL = `/el${AGENCY_PRICING_PATH}`;
export const AGENCY_AUDIT_EL = `/el${AGENCY_AUDIT_PATH}#free-audit`;

/** Bare-path sections (no locale prefix) that belong to the agency. */
const AGENCY_SECTIONS = [
  AGENCY_HOME_PATH,
  '/services',
  '/solutions',
  '/locations',
  '/seo-services',
  '/seo-consultant',
  '/symvoulos-seo',
  '/managed-seo',
  '/diacheirisi-seo',
  '/tourism-seo',
  '/seo-tourismou',
  '/seo',
  '/kataskevi-istoselidon',
  '/work',
  '/seo-guru',
  '/get-started',
] as const;

/** True for a bare path (e.g. `/services/local-seo`) of an agency page. */
export function isAgencyBarePath(barePath: string): boolean {
  const path = barePath.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return AGENCY_SECTIONS.some((section) => path === section || path.startsWith(`${section}/`));
}

/** True for a locale-prefixed pathname (e.g. `/el/work/onoma-hotel`) of an agency page. */
export function isAgencyPathname(pathname: string): boolean {
  return isAgencyBarePath(stripLocalePrefix(pathname));
}

/** Greek cities that keep service x city pages (see indexability/service-location). */
const EL_CITY_PAGES = new Set([
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
]);

const CITY_PAGE_SERVICES = new Set(['website-creation', 'local-seo', 'seo-audits', 'eshop-woocommerce']);

const EN_TO_EL_TOURISM: Record<string, string> = {
  hotels: 'xenodoxeia',
  villas: 'villes',
  'rent-a-car': 'rent-a-car',
  tours: 'ekdromes',
  'boat-rental': 'enoikiasi-skafon',
  transfers: 'transfer',
  restaurants: 'estiatoria',
  'travel-agencies': 'taxidiotika-grafeia',
};

/**
 * The Greek page for an agency bare path (e.g. `/managed-seo` gives
 * `/el/diacheirisi-seo`): its Greek twin, or the closest Greek hub when the
 * English page has no twin. Callers check isAgencyBarePath first.
 */
export function greekAgencyPath(barePath: string): string {
  const bare = barePath.replace(/\/+$/, '') || '/';
  if (bare === '/seo-consultant') return '/el/symvoulos-seo';
  if (bare === '/managed-seo') return '/el/diacheirisi-seo';

  const tourism = /^\/tourism-seo(?:\/([a-z0-9-]+))?$/.exec(bare);
  if (tourism) {
    const el = tourism[1] ? EN_TO_EL_TOURISM[tourism[1]] : undefined;
    return el ? `/el/seo-tourismou/${el}` : '/el/seo-tourismou';
  }

  const city = /^\/services\/([a-z0-9-]+)\/([a-z0-9-]+)$/.exec(bare);
  if (city) {
    return CITY_PAGE_SERVICES.has(city[1]) && EL_CITY_PAGES.has(city[2]) ? `/el${bare}` : `/el/services/${city[1]}`;
  }

  return `/el${bare}`;
}

/**
 * Where an English agency URL goes now: its Greek page. Null for every other URL.
 */
export function englishAgencyRedirect(pathname: string): string | null {
  if (!(pathname === '/en' || pathname.startsWith('/en/'))) return null;
  const bare = stripLocalePrefix(pathname).replace(/\/+$/, '') || '/';
  if (!isAgencyBarePath(bare)) return null;
  if (bare === '/get-started') return AGENCY_AUDIT_EL;
  return greekAgencyPath(bare);
}
