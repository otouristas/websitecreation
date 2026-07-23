// SEO Metadata Builder - titles ≤60 chars total, descriptions 150–160 chars

import { Metadata } from 'next';
import { buildMetaDescription, finalizeDescription, BRAND_NAME, BASE_URL } from './description';
import { getHreflangAlternates, isGreekLocationSlug } from '@/lib/locale-paths';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { LOCALES } from '@/lib/i18n/locale';
import { shouldIndexServiceLocation, type Location } from '@/data/locations';

export const TITLE_BRAND_SUFFIX = ` | ${BRAND_NAME}`;
export const MAX_TITLE_TOTAL = 60;
export const MAX_TITLE_PRIMARY = MAX_TITLE_TOTAL - TITLE_BRAND_SUFFIX.length;
/** Greek glyphs are wider in SERP pixels — keep primary shorter to stay under ~561px. */
export const MAX_TITLE_PRIMARY_GREEK = 30;

function primaryTitleMax(text: string): number {
  return /[Α-Ωα-ωάέήίόύώϊϋΐΰ]/u.test(text) ? MAX_TITLE_PRIMARY_GREEK : MAX_TITLE_PRIMARY;
}

interface MetadataInput {
  title: string;
  description?: string;
  path: string;
  primaryKeyword?: string;
  location?: string;
  industry?: string;
  service?: string;
  usp?: string;
  ctaHint?: string;
  noIndex?: boolean;
  hreflangPath?: string;
  /** Locales the page truly exists in; hreflang is omitted unless ≥2. */
  hreflangLocales?: readonly SiteLocale[];
  /** Pre-built hreflang map (wins over hreflangPath), e.g. paired blog slugs. */
  languages?: Record<string, string>;
  /** Override the canonical URL path (e.g. /el render of an English-only page → /en canonical). */
  canonicalPath?: string;
}

function smartTruncateTitle(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/\s*[,;:\-–&|]+$/, '').trim();
}

/** Strip brand duplication and enforce primary segment length before suffix */
export function cleanPageTitle(raw: string): string {
  let cleanTitle = raw.trim();

  // Only strip brand when it is a leading/trailing suffix — never from the middle
  // (e.g. "AnotherSEOGuru vs Ahrefs" must stay intact, not collapse to "vs Ahrefs").
  cleanTitle = cleanTitle.replace(new RegExp(`\\s*[\\|\\-]\\s*${BRAND_NAME}\\s*$`, 'gi'), '');
  cleanTitle = cleanTitle.replace(new RegExp(`^${BRAND_NAME}\\s*[\\|\\-]\\s*`, 'gi'), '');

  cleanTitle = cleanTitle
    .replace(/\s*\|\s*$/, '')
    .replace(/\s*-\s*$/, '')
    .replace(/^\s*\|\s*/, '')
    .replace(/^\s*-\s*/, '')
    .replace(/^[–-]\s*/, '')
    .replace(/\s*[–]\s*/g, ' - ')
    .trim();

  if (cleanTitle.toLowerCase() === BRAND_NAME.toLowerCase()) {
    return BRAND_NAME;
  }

  const maxPrimary = primaryTitleMax(cleanTitle);
  if (cleanTitle.length > maxPrimary) {
    cleanTitle = smartTruncateTitle(cleanTitle, maxPrimary);
  }

  return cleanTitle;
}
 
export function buildFullTitle(raw: string): string {
  const primary = cleanPageTitle(raw);
  if (primary === BRAND_NAME) return BRAND_NAME;
  return `${primary}${TITLE_BRAND_SUFFIX}`;
}
 
import { getServiceEl } from '@/data/services-i18n';
import { industriesEl } from '@/data/industries-i18n';
import { getGreekLocative } from '@/lib/greek-locative';

export function buildMetadata(input: MetadataInput): Metadata {
  const {
    title,
    description: customDescription,
    path,
    primaryKeyword,
    location,
    industry,
    service,
    usp,
    ctaHint,
    noIndex = false,
    hreflangPath,
    hreflangLocales = LOCALES,
    languages: customLanguages,
    canonicalPath,
  } = input;

  const description = finalizeDescription(
    customDescription ||
      buildMetaDescription({
        primaryKeyword: primaryKeyword || title,
        location,
        industry,
        service,
        usp,
        ctaHint,
      }),
  );

  const canonicalSource = canonicalPath ?? path;
  const canonical =
    canonicalSource === '/'
      ? BASE_URL
      : `${BASE_URL}${canonicalSource.startsWith('/') ? canonicalSource : `/${canonicalSource}`}`;

  const fullTitle = buildFullTitle(title);

  const languages =
    customLanguages ?? (hreflangPath ? getHreflangAlternates(hreflangPath, hreflangLocales) : undefined);

  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: BRAND_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
 
  if (noIndex) {
    metadata.robots = { index: false, follow: false };
  }
 
  return metadata;
}
 
export function buildServiceMetadata(
  service: {
    name: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
  },
  locale: SiteLocale = 'en',
): Metadata {
  if (locale === 'el') {
    const svcEl = getServiceEl(service.slug);
    const name = svcEl?.name ?? service.name;
    const keyword = svcEl?.titleKeyword ?? name;
    const priceHook = isSeoRetainerService(service.slug) ? 'από €299/μήνα' : 'από €899';
    const hubSuffixes = isSeoRetainerService(service.slug)
      ? [' - Τιμές & Μετρήσιμα Αποτελέσματα', ' - Τιμές & Αποτελέσματα', ' - Τιμές & Πακέτα', ' - Τιμές', '']
      : [' - Τιμές & SEO από την 1η μέρα', ' - Τιμές, Πακέτα & SEO', ' - Τιμές & Πακέτα', ' - Τιμές', ''];
    return buildMetadata({
      title: fitTitleWithSuffix(keyword, hubSuffixes),
      description: `${keyword} από ελληνική ομάδα: διαφανείς τιμές, πακέτα ${priceHook} και SEO-ready παράδοση. Δείτε τιμές, διαδικασία και ζητήστε δωρεάν προσφορά.`,
      path: localizedPath('el', `/services/${service.slug}`),
      hreflangPath: `/services/${service.slug}`,
      service: name,
      primaryKeyword: keyword,
      ctaHint: 'Δείτε πακέτα και ζητήστε προσφορά.',
    });
  }
  return buildMetadata({
    title: fitTitleWithSuffix(
      service.name,
      isSeoRetainerService(service.slug)
        ? [' - Pricing & Measurable Results', ' - Pricing & Packages', ' - Pricing', '']
        : [' - SEO-Ready Delivery & Pricing', ' - Pricing & Packages', ' - Pricing', ''],
    ),
    description: `${service.name} for growing businesses: SEO-ready delivery, transparent pricing (${enPriceHook(service.slug)}), GEO/AEO, and fast turnaround. Get a free quote today.`,
    path: localizedPath(locale, `/services/${service.slug}`),
    hreflangPath: `/services/${service.slug}`,
    service: service.name,
    primaryKeyword: `${service.name} services`,
    ctaHint: 'View packages and request a quote.',
  });
}
 
export function buildServiceLocationMetadata(
  service: { name: string; slug: string },
  location: {
    city: string;
    cityLocal?: string;
    state: string;
    stateCode: string;
    slug: string;
    country?: string;
    countryCode?: string;
    currency?: string;
    tier?: 1 | 2;
  },
  locale: SiteLocale = 'en',
): Metadata {
  if (locale === 'el') {
    const svcEl = getServiceEl(service.slug);
    const translatedService = {
      name: svcEl?.name ?? service.name,
      slug: service.slug,
    };
    return buildServiceLocationMetadataEl(translatedService, location);
  }

  const placeLabel =
    location.countryCode && location.countryCode !== 'US'
      ? `${location.city}, ${location.country ?? location.countryCode}`
      : `${location.city}, ${location.stateCode}`;

  const noIndex = !shouldIndexServiceLocation(location as Location);

  return buildMetadata({
    // Front-load keyword + city so truncation drops the hook, never the keyword.
    title: fitTitleWithSuffix(`${service.name} ${location.city}`, enTitleSuffixes(service.slug)),
    description: `${service.name} in ${placeLabel}: SEO-ready websites, local strategy, GEO/AEO, and fast delivery. Transparent pricing (${enPriceHook(service.slug)}). Get a free quote.`,
    path: localizedPath(locale, `/services/${service.slug}/${location.slug}`),
    hreflangPath: `/services/${service.slug}/${location.slug}`,
    // English city pages don't have Greek counterparts unless the city is Greek.
    hreflangLocales: isGreekLocationSlug(location.slug) ? ['en', 'el'] : ['en'],
    service: service.name,
    location: placeLabel,
    usp: `Trusted ${service.name.toLowerCase()} for ${location.city}`,
    ctaHint: 'Request a free local quote.',
    noIndex,
  });
}
 
/** Services sold as monthly retainers (price hook €/μήνα) vs one-off projects. */
function isSeoRetainerService(slug: string): boolean {
  return ['local-seo', 'seo-audits', 'ai-visibility', 'link-building', 'eshop-seo', 'content-creation'].includes(slug);
}

/**
 * Greek SERP title suffix ladder (richest first). Leads with a value/outcome hook
 * per the premium positioning ("value, not cheapest") while keeping a compact
 * price-transparency token, since a large share of Greek queries carry
 * τιμή/κόστος/τιμές intent. `fitTitleWithSuffix` picks the longest that fits ≤43 chars.
 */
function elTitleSuffixes(slug: string): readonly string[] {
  return isSeoRetainerService(slug)
    ? [' - Τιμές & Αποτελέσματα', ' - Αποτελέσματα', ' - Τιμές', ' | Προσφορά', '']
    : [' - Τιμές & SEO από 1η μέρα', ' - Τιμές & SEO', ' - Τιμές', ' | Προσφορά', ''];
}

/** English SERP title suffix ladder (value-led, per "value not cheapest"). Picks the longest ≤43 chars. */
function enTitleSuffixes(slug: string): readonly string[] {
  return isSeoRetainerService(slug)
    ? [' - Measurable Results', ' - Pricing & Quote', ' - Pricing', '']
    : [' - SEO-Ready & Fast', ' - Pricing & Quote', ' - Pricing', ''];
}

/** English price hook. Business bills in EUR, so € everywhere for consistency with the pricing page. */
function enPriceHook(slug: string): string {
  return isSeoRetainerService(slug) ? 'from €299/mo' : 'from €899';
}

/** Append the longest suffix that keeps the primary title within the locale-aware max. */
function fitTitleWithSuffix(base: string, suffixes: readonly string[]): string {
  const max = primaryTitleMax(base);
  for (const suffix of suffixes) {
    if (base.length + suffix.length <= max) return base + suffix;
  }
  return base;
}

export function buildServiceLocationMetadataEl(
  service: { name: string; slug: string },
  location: {
    city: string;
    cityLocal?: string;
    slug: string;
    country?: string;
    countryCode?: string;
    tier?: 1 | 2;
  },
): Metadata {
  const svcEl = getServiceEl(service.slug);
  const keyword = svcEl?.titleKeyword ?? service.name;
  const city = location.cityLocal ?? location.city;
  const priceHook = isSeoRetainerService(service.slug) ? 'από €299/μήνα' : 'από €899';
  const locative = getGreekLocative(location.slug, city);
  // Greek locale should not index non-Greek city pages (wrong market + thin/duplicate risk).
  const noIndex = !isGreekLocationSlug(location.slug);

  return buildMetadata({
    // Keyword+city first so any truncation drops the hook, never the keyword.
    title: fitTitleWithSuffix(`${keyword} ${city}`, elTitleSuffixes(service.slug)),
    description: `${keyword} ${locative}: πακέτα ${priceHook}, SEO-ready παράδοση και τοπική στρατηγική.`,
    path: localizedPath('el', `/services/${service.slug}/${location.slug}`),
    hreflangPath: `/services/${service.slug}/${location.slug}`,
    hreflangLocales: isGreekLocationSlug(location.slug) ? ['en', 'el'] : ['el'],
    primaryKeyword: `${keyword} ${city}`,
    ctaHint: 'Ζητήστε προσφορά.',
    noIndex,
  });
}
 
export function buildIndustryMetadata(
  industry: {
    name: string;
    slug: string;
    metaDescription?: string;
  },
  locale: SiteLocale = 'en',
): Metadata {
  let indName = industry.name;
  let indDesc = industry.metaDescription;
  if (locale === 'el') {
    const indEl = industriesEl[industry.slug];
    if (indEl) {
      indName = indEl.name;
      indDesc = indEl.metaDescription;
    }
  }

  return buildMetadata({
    title:
      locale === 'el'
        ? fitTitleWithSuffix(`${indName} - Ιστοσελίδες & SEO`, [' | Πακέτα', ''])
        : fitTitleWithSuffix(`${indName} Websites & SEO`, [' | Packages & Pricing', ' | Pricing', '']),
    description:
      indDesc ||
      (locale === 'el'
        ? `Ιστοσελίδες και SEO για ${indName}: στρατηγικές ανά κλάδο, γρήγορη υλοποίηση και δεδομένα από το Google Search Console. Δείτε πακέτα και ζητήστε προσφορά.`
        : `Website design and SEO built for ${indName.toLowerCase()}: industry playbooks, fast builds, and measurable growth. Transparent pricing. See packages and get a free quote.`),
    path: localizedPath(locale, `/solutions/${industry.slug}`),
    hreflangPath: `/solutions/${industry.slug}`,
    industry: indName,
    ctaHint: locale === 'el' ? 'Δείτε πακέτα ανά κλάδο.' : 'Explore industry packages.',
  });
}
 
export function buildIndustryServiceMetadata(
  industry: { name: string; slug: string },
  service: { name: string; slug: string },
  locale: SiteLocale = 'en',
): Metadata {
  let indName = industry.name;
  let svcName = service.name;
  if (locale === 'el') {
    const indEl = industriesEl[industry.slug];
    if (indEl) indName = indEl.name;
    const svcEl = getServiceEl(service.slug);
    if (svcEl) svcName = svcEl.name;
  }

  return buildMetadata({
    title:
      locale === 'el'
        ? fitTitleWithSuffix(`${svcName} για ${indName}`, [' | Τιμές', ''])
        : fitTitleWithSuffix(`${svcName} for ${indName}`, [' | Pricing & Quote', '']),
    description:
      locale === 'el'
        ? `${svcName} σχεδιασμένο για ${indName}: παράδοση έτοιμη για SEO, διαφανείς τιμές και γρήγορη υλοποίηση. Ζητήστε δωρεάν συμβουλευτική.`
        : `${svcName} tailored for ${indName.toLowerCase()}: SEO-ready delivery, transparent pricing, and fast turnaround. Get a free consultation.`,
    path: localizedPath(locale, `/solutions/${industry.slug}/${service.slug}`),
    hreflangPath: `/solutions/${industry.slug}/${service.slug}`,
    service: svcName,
    industry: indName,
    usp: locale === 'el' ? `${svcName} σχεδιασμένο για ${indName}` : `${svcName} tailored for ${indName.toLowerCase()}`,
    ctaHint: locale === 'el' ? 'Ξεκινήστε με δωρεάν συμβουλευτική.' : 'Get started with a free consultation.',
  });
}
 
export { BASE_URL, BRAND_NAME };
