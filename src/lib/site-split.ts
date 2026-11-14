import { hasMigratedAgencyPage } from '../data/migrated-agency-paths';

/**
 * anotherseoguru.com is the product site (AnotherSEOGuru App). The done-for-you
 * agency (websites and SEO for Greek businesses) is a separate business that
 * serves Greek clients, so its pages live in Greek only, under /el, until they
 * move to their own domain (anotherseoguru.gr).
 *
 * This module is imported by the middleware (edge runtime) and by client
 * components. Its only dependency is the static set of published agency paths.
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

/** The agency's own domain. */
export const AGENCY_DOMAIN = 'anotherseoguru.gr';
export const AGENCY_ORIGIN = `https://${AGENCY_DOMAIN}`;
export const PRODUCT_ORIGIN = 'https://anotherseoguru.com';

/** The agency is served by Cloudflare Workers on its own domain. */
export const AGENCY_ON_OWN_DOMAIN = true;

function splitSuffix(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

/**
 * The path on anotherseoguru.gr of a Greek agency page on .com:
 * `/el/ypiresies` is the .gr home, `/el/ypiresies/times` is `/times`, and
 * `/el/<section>/...` drops the `/el`.
 */
export function agencyDomainPath(elPathname: string): string {
  const [path, suffix] = splitSuffix(elPathname);
  const bare = stripLocalePrefix(path).replace(/\/+$/, '') || '/';
  if (bare === AGENCY_HOME_PATH) return `/${suffix}`;
  if (bare.startsWith(`${AGENCY_HOME_PATH}/`)) return `${bare.slice(AGENCY_HOME_PATH.length)}${suffix}`;
  return `${bare}${suffix}`;
}

/** The inverse: the Greek page on .com that serves a path on anotherseoguru.gr. */
export function comPathForAgencyDomain(grPathname: string): string | null {
  const bare = grPathname.replace(/\/+$/, '') || '/';
  if (bare === '/') return AGENCY_HOME_EL;
  if (bare === '/times') return AGENCY_PRICING_EL;
  if (bare === '/el' || bare.startsWith('/el/') || bare === '/en' || bare.startsWith('/en/')) return null;
  return isAgencyBarePath(bare) ? `/el${bare}` : null;
}

/** The public href of a Greek agency page (e.g. `/el/ypiresies/times`). */
export function agencyHref(elPathname: string): string {
  return AGENCY_ON_OWN_DOMAIN ? `${AGENCY_ORIGIN}${agencyDomainPath(elPathname)}` : elPathname;
}

/** Hrefs for links to the agency from anywhere on the site. */
export const AGENCY_HOME_HREF = agencyHref(AGENCY_HOME_EL);
export const AGENCY_PRICING_HREF = agencyHref(AGENCY_PRICING_EL);
export const AGENCY_AUDIT_HREF = agencyHref(AGENCY_AUDIT_EL);

/** Bare-path sections (no locale prefix) that belong to the agency. */
const AGENCY_SECTIONS = [
  AGENCY_HOME_PATH,
  '/odigoi',
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

/**
 * Where a Greek agency page on anotherseoguru.com goes once the agency has its
 * own domain. Null while AGENCY_ON_OWN_DOMAIN is off, and for every other URL.
 */
export function greekAgencyMoveRedirect(pathname: string): string | null {
  if (!AGENCY_ON_OWN_DOMAIN) return null;
  if (!pathname.startsWith('/el/')) return null;
  const [path, suffix] = splitSuffix(pathname);
  const target = agencyDomainPath(path);
  // Bare /el belongs to the product. Only published, migrated pages have successors.
  if (!isAgencyPathname(path) && !path.startsWith('/el/blog/')) return null;
  return hasMigratedAgencyPage(target) ? `${AGENCY_ORIGIN}${target}${suffix}` : null;
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
 * Where an English agency URL goes now: its Greek page (on anotherseoguru.gr
 * once AGENCY_ON_OWN_DOMAIN is on). Null for every other URL.
 */
export function englishAgencyRedirect(pathname: string): string | null {
  if (!(pathname === '/en' || pathname.startsWith('/en/'))) return null;
  const bare = stripLocalePrefix(pathname).replace(/\/+$/, '') || '/';
  if (!isAgencyBarePath(bare)) return null;
  if (bare === '/get-started') return agencyHref(AGENCY_AUDIT_EL);
  const target = greekAgencyPath(bare);
  return greekAgencyMoveRedirect(target) ?? target;
}

/** Render ordinary links directly to a migrated service, article or case study. */
export function migratedAgencyHref(href: string): string {
  const [path, suffix] = splitSuffix(href);
  const target = greekAgencyMoveRedirect(path) ?? englishAgencyRedirect(path);
  if (!target?.startsWith(AGENCY_ORIGIN + '/')) return href;
  const url = new URL(target);
  const original = new URL(path + suffix, PRODUCT_ORIGIN);
  url.search = original.search;
  if (original.hash) url.hash = original.hash;
  return url.href;
}
