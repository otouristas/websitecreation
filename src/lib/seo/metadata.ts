// SEO Metadata Builder - titles ≤60 chars total, descriptions 150–160 chars

import { Metadata } from 'next';
import { buildMetaDescription, finalizeDescription, BRAND_NAME, BASE_URL } from './description';
import { getHreflangAlternates } from '@/lib/locale-paths';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

export const TITLE_BRAND_SUFFIX = ` | ${BRAND_NAME}`;
export const MAX_TITLE_TOTAL = 60;
export const MAX_TITLE_PRIMARY = MAX_TITLE_TOTAL - TITLE_BRAND_SUFFIX.length;

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
}

function smartTruncateTitle(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\-–]$/, '').trim();
}

/** Strip brand duplication and enforce primary segment length before suffix */
export function cleanPageTitle(raw: string): string {
  let cleanTitle = raw.trim();

  cleanTitle = cleanTitle.replace(new RegExp(`\\s*[\\|\\-]\\s*${BRAND_NAME}`, 'gi'), '');
  cleanTitle = cleanTitle.replace(new RegExp(`^${BRAND_NAME}\\s*[\\|\\-]\\s*`, 'gi'), '');

  if (cleanTitle.toLowerCase() !== BRAND_NAME.toLowerCase()) {
    cleanTitle = cleanTitle.replace(new RegExp(BRAND_NAME, 'gi'), '').trim();
  }
 
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
 
  if (cleanTitle.length > MAX_TITLE_PRIMARY) {
    cleanTitle = smartTruncateTitle(cleanTitle, MAX_TITLE_PRIMARY);
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
 
  const canonical =
    path === '/' ? BASE_URL : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
 
  const fullTitle = buildFullTitle(title);
 
  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      ...(hreflangPath ? { languages: getHreflangAlternates(hreflangPath) } : {}),
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
    const desc = svcEl?.description ?? service.metaDescription;
    return buildMetadata({
      title: `${name} - SEO & Web`,
      description: desc,
      path: localizedPath('el', `/services/${service.slug}`),
      hreflangPath: `/services/${service.slug}`,
      service: name,
      primaryKeyword: name,
      ctaHint: 'Δείτε πακέτα και ζητήστε προσφορά.',
    });
  }
  return buildMetadata({
    title: service.metaTitle || `${service.name} Services`,
    description: service.metaDescription,
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
 
  return buildMetadata({
    title: `${service.name} in ${placeLabel}`,
    description: `Expert ${service.name.toLowerCase()} in ${placeLabel}. SEO-ready websites, local strategy, GEO/AEO, and fast delivery. Pricing in ${location.currency ?? 'USD'}. Free quote.`,
    path: localizedPath(locale, `/services/${service.slug}/${location.slug}`),
    hreflangPath: `/services/${service.slug}/${location.slug}`,
    service: service.name,
    location: placeLabel,
    usp: `Trusted ${service.name.toLowerCase()} for ${location.city}`,
    ctaHint: 'Request a free local quote.',
  });
}
 
function getGreekLocative(slug: string): string {
  const locMap: Record<string, string> = {
    'athens-gr': 'στην Αθήνα',
    'thessaloniki-gr': 'στη Θεσσαλονίκη',
    'patras-gr': 'στην Πάτρα',
    'heraklion-gr': 'στο Ηράκλειο',
    'larissa-gr': 'στη Λάρισα',
    'volos-gr': 'στο Βόλο',
    'santorini-gr': 'στη Σαντορίνη',
    'mykonos-gr': 'στη Μύκονο',
    'paros-gr': 'στην Πάρο',
    'naxos-gr': 'στη Νάξο',
    'crete-gr': 'στην Κρήτη',
    'rethymno-gr': 'στο Ρέθυμνο',
    'chania-gr': 'στα Χανιά',
    'kos-gr': 'στην Κω',
    'corinth-gr': 'στην Κόρινθο',
    'serres-gr': 'στις Σέρρες',
    'lamia-gr': 'στη Λαμία',
    'kavala-gr': 'στην Καβάλα',
  };
  return locMap[slug] || 'στην Ελλάδα';
}

export function buildServiceLocationMetadataEl(
  service: { name: string; slug: string },
  location: {
    city: string;
    cityLocal?: string;
    slug: string;
    country?: string;
  },
): Metadata {
  const place = location.cityLocal
    ? `${location.cityLocal}, ${location.country ?? 'Ελλάδα'}`
    : `${location.city}, ${location.country ?? 'Ελλάδα'}`;
 
  return buildMetadata({
    title: `${service.name} - ${place}`,
    description: `Υπηρεσίες για ${service.name.toLowerCase()} ${getGreekLocative(location.slug)} με SEO, GEO/AEO, κορυφαία ταχύτητα και τοπική στρατηγική.`,
    path: localizedPath('el', `/services/${service.slug}/${location.slug}`),
    hreflangPath: `/services/${service.slug}/${location.slug}`,
    primaryKeyword: `${service.name} ${location.cityLocal ?? location.city}`,
    ctaHint: 'Ζητήστε δωρεάν προσφορά.',
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
    title: locale === 'el' ? `${indName} - Ιστοσελίδες & SEO` : `${indName} Website & SEO Solutions`,
    description:
      indDesc ||
      (locale === 'el'
        ? `Ιστοσελίδες και SEO για ${indName}. Industry playbooks, γρήγορη υλοποίηση και Search Console intelligence.`
        : `Website design and SEO for ${indName.toLowerCase()} businesses. Industry playbooks, fast builds, and Search Console intelligence. See packages.`),
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
    title: locale === 'el' ? `${svcName} για ${indName}` : `${svcName} for ${indName}`,
    path: localizedPath(locale, `/solutions/${industry.slug}/${service.slug}`),
    hreflangPath: `/solutions/${industry.slug}/${service.slug}`,
    service: svcName,
    industry: indName,
    usp: locale === 'el' ? `${svcName} σχεδιασμένο για ${indName}` : `${svcName} tailored for ${indName.toLowerCase()}`,
    ctaHint: locale === 'el' ? 'Ξεκινήστε με δωρεάν συμβουλευτική.' : 'Get started with a free consultation.',
  });
}
 
export { BASE_URL, BRAND_NAME };
