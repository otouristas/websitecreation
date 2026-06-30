// SEO Metadata Builder — titles ≤60 chars total, descriptions 150–160 chars

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
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\-–—]$/, '').trim();
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
    .replace(/^[—–-]\s*/, '')
    .replace(/\s*[—–-]\s*/g, ' — ')
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
  return buildMetadata({
    title: service.metaTitle || `${service.name} Services`,
    description: service.metaDescription,
    path: localizedPath(locale, `/services/${service.slug}`),
    hreflangPath: `/services/${service.slug}`,
    service: service.name,
    primaryKeyword: `${service.name} services`,
    ctaHint: locale === 'el' ? 'Δείτε πακέτα και ζητήστε προσφορά.' : 'View packages and request a quote.',
  });
}

export function buildServiceLocationMetadata(
  service: { name: string; slug: string },
  location: {
    city: string;
    state: string;
    stateCode: string;
    slug: string;
    country?: string;
    countryCode?: string;
    currency?: string;
  },
  locale: SiteLocale = 'en',
): Metadata {
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
    title: `${service.name} — ${place}`,
    description: `Επαγγελματικό ${service.name.toLowerCase()} στην ${place}. SEO, GEO/AEO, ταχύτητα ιστοσελίδας και τοπική στρατηγική. Δωρεάν προσφορά ή δοκιμή πλατφόρμας 7 ημερών.`,
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
  return buildMetadata({
    title: locale === 'el' ? `${industry.name} — Ιστοσελίδες & SEO` : `${industry.name} Website & SEO Solutions`,
    description:
      industry.metaDescription ||
      (locale === 'el'
        ? `Ιστοσελίδες και SEO για ${industry.name}. Industry playbooks, γρήγορη υλοποίηση και Search Console intelligence.`
        : `Website design and SEO for ${industry.name.toLowerCase()} businesses. Industry playbooks, fast builds, and Search Console intelligence. See packages.`),
    path: localizedPath(locale, `/solutions/${industry.slug}`),
    hreflangPath: `/solutions/${industry.slug}`,
    industry: industry.name,
    ctaHint: locale === 'el' ? 'Δείτε πακέτα ανά κλάδο.' : 'Explore industry packages.',
  });
}

export function buildIndustryServiceMetadata(
  industry: { name: string; slug: string },
  service: { name: string; slug: string },
  locale: SiteLocale = 'en',
): Metadata {
  return buildMetadata({
    title: locale === 'el' ? `${service.name} για ${industry.name}` : `${service.name} for ${industry.name}`,
    path: localizedPath(locale, `/solutions/${industry.slug}/${service.slug}`),
    hreflangPath: `/solutions/${industry.slug}/${service.slug}`,
    service: service.name,
    industry: industry.name,
    usp: `${service.name} tailored for ${industry.name.toLowerCase()}`,
    ctaHint: locale === 'el' ? 'Ξεκινήστε με δωρεάν συμβουλευτική.' : 'Get started with a free consultation.',
  });
}

export { BASE_URL, BRAND_NAME };
