// SEO Metadata Builder - titles ≤60 chars total, descriptions 145–155 chars

import { Metadata } from 'next';
import { buildMetaDescription, finalizeDescription, fitDescription, BRAND_NAME, BASE_URL } from './description';
import { getHreflangAlternates, isGreekLocationSlug } from '@/lib/locale-paths';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { LOCALES } from '@/lib/i18n/locale';
import { shouldIndexServiceLocation, type Location } from '@/data/locations';
import { getServiceEl } from '@/data/services-i18n';
import { industriesEl } from '@/data/industries-i18n';
import { getGreekLocative } from '@/lib/greek-locative';

export const TITLE_BRAND_SUFFIX = ` | ${BRAND_NAME}`;
export const MAX_TITLE_TOTAL = 60;
export const MAX_TITLE_PRIMARY = MAX_TITLE_TOTAL - TITLE_BRAND_SUFFIX.length;
/**
 * Greek titles were capped at a flat 30 characters, which truncated titles that
 * would have displayed fine. The real constraint is SERP pixel width (~580px on
 * desktop), so we estimate width per glyph class instead of counting characters.
 */
export const MAX_TITLE_PRIMARY_GREEK = 34;
const SERP_TITLE_PIXELS = 580;
const BRAND_PIXELS = 108; // " | AnotherSEOGuru" at ~16px Arial

/** Rough per-character advance width at the 16px Google renders titles at. */
function estimateTitlePixels(text: string): number {
  let px = 0;
  for (const ch of text) {
    if (/[ilj.,'!|]/.test(ch)) px += 4;
    else if (/[A-ZΑ-ΩΆΈΉΊΌΎΏ]/u.test(ch)) px += 10.5;
    else if (/[α-ωάέήίόύώϊϋΐΰ]/u.test(ch)) px += 8.6;
    else if (/[mwMW]/.test(ch)) px += 13;
    else px += 8;
  }
  return px;
}

function primaryTitleMax(text: string): number {
  const isGreek = /[Α-Ωα-ωάέήίόύώϊϋΐΰ]/u.test(text);
  if (!isGreek) return MAX_TITLE_PRIMARY;
  // Take the larger of the character floor and what actually fits by pixels.
  const budget = SERP_TITLE_PIXELS - BRAND_PIXELS;
  const perChar = estimateTitlePixels(text) / Math.max(1, text.length);
  const byPixels = Math.floor(budget / Math.max(6, perChar));
  return Math.max(MAX_TITLE_PRIMARY_GREEK, Math.min(byPixels, MAX_TITLE_PRIMARY));
}

/**
 * Tokens the brief bans from titles and descriptions.
 *
 * `negatable` marks the ones where the negated form is not a violation but the
 * required disclaimer: "no ranking guarantees" is the policy, "we guarantee
 * rankings" is what the brief forbids. Those are checked per occurrence against
 * the words immediately preceding them rather than by the bare token, because a
 * flat /\bguarantee/i flags our own disclaimer on /pricing.
 */
const BANNED_METADATA: readonly { rx: RegExp; label: string; negatable?: boolean }[] = [
  { rx: /—/, label: 'em dash' },
  { rx: /\bbest\b/i, label: '"best"' },
  { rx: /#1\b/, label: '"#1"' },
  { rx: /\bguarantee/i, label: 'guarantee', negatable: true },
  { rx: /\bdominate\b/i, label: 'dominate' },
  { rx: /εγγυημ[έε]ν/i, label: 'εγγυημένο', negatable: true },
  { rx: /εγγ[υύ]ησ/i, label: 'εγγύηση', negatable: true },
  { rx: /κυριαρχ[ήη]σ/i, label: 'κυριαρχήστε' },
];

/** Words that turn a banned claim into an acceptable disclaimer. */
const NEGATORS =
  /(?:\b(?:no|not|never|without|zero)\b|(?:χωρίς|όχι|δεν|καμία|καμιά|ουδεμία))[\s\p{L}]{0,24}$/iu;

/**
 * Every banned token in `value`, skipping negatable ones that are preceded by a
 * negation within a short window. Shared with scripts/seo-audit.ts so the audit
 * and the dev-time guard can never disagree.
 */
export function findBannedTokens(value: string): string[] {
  const found: string[] = [];
  for (const { rx, label, negatable } of BANNED_METADATA) {
    const global = new RegExp(rx.source, rx.flags.includes('g') ? rx.flags : `${rx.flags}g`);
    for (const m of value.matchAll(global)) {
      const index = m.index ?? 0;
      if (negatable && NEGATORS.test(value.slice(Math.max(0, index - 32), index))) continue;
      found.push(label);
      break;
    }
  }
  return found;
}

function assertMetadataClean(kind: 'title' | 'description', value: string, path: string): void {
  if (process.env.NODE_ENV === 'production') return;
  for (const label of findBannedTokens(value)) {
    console.error(`[metadata] banned token ${label} in ${kind} for ${path}: "${value}"`);
  }
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
  /** OpenGraph overrides. OG copy may be more persuasive but must stay accurate. */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Present on blog posts, so OpenGraph declares an article rather than a website. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
  };
  /** Override the canonical URL path (e.g. /el render of an English-only page → /en canonical). */
  canonicalPath?: string;
}

function smartTruncateTitle(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/\s*[;:\-–&|]+$/, '').trim();
}

/** Strip brand duplication and enforce primary segment length before suffix */
export function cleanPageTitle(raw: string): string {
  let cleanTitle = raw.trim();

  // Only strip brand when it is a leading/trailing suffix, never from the middle
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
    ogTitle,
    ogDescription,
    ogImage,
    article,
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

  assertMetadataClean('title', fullTitle, path);
  assertMetadataClean('description', description, path);

  const languages =
    customLanguages ?? (hreflangPath ? getHreflangAlternates(hreflangPath, hreflangLocales) : undefined);

  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      url: canonical,
      siteName: BRAND_NAME,
      locale: path.startsWith('/el') ? 'el_GR' : 'en_US',
      ...(article
        ? {
            type: 'article' as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: article.authors,
            section: article.section,
          }
        : { type: 'website' as const }),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
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
    const retainer = isSeoRetainerService(service.slug);
    const hubSuffixes = retainer
      ? [' - Στρατηγική & Υλοποίηση', ' - Στρατηγική', ' - Υπηρεσίες', '']
      : [' - Σχεδιασμός & Υλοποίηση', ' - Υλοποίηση', ' - Υπηρεσίες', ''];

    const descRetainer = fitDescription(`${keyword} από εξειδικευμένη ελληνική ομάδα:`, [
      'τεχνικός έλεγχος, περιεχόμενο βάσει πραγματικής ζήτησης, τοπικά σήματα και μετρήσιμα leads. Ζητήστε δωρεάν προσφορά.',
      'τεχνικός έλεγχος, περιεχόμενο βάσει ζήτησης, τοπικά σήματα και μετρήσιμα leads. Ζητήστε προσφορά.',
      'τεχνικός έλεγχος, περιεχόμενο βάσει ζήτησης και μετρήσιμα leads. Ζητήστε προσφορά.',
    ]);
    const descBuild = fitDescription(`${keyword} με τεχνικά θεμέλια από την πρώτη μέρα:`, [
      'καθαρή αρχιτεκτονική, mobile-first ταχύτητα, Core Web Vitals και δομή μετατροπών. Ζητήστε δωρεάν προσφορά.',
      'καθαρή αρχιτεκτονική, ταχύτητα, Core Web Vitals και δομή μετατροπών. Ζητήστε προσφορά.',
    ]);

    return buildMetadata({
      title: fitTitleWithSuffix(keyword, hubSuffixes),
      description: retainer ? descRetainer : descBuild,
      path: localizedPath('el', `/services/${service.slug}`),
      hreflangPath: `/services/${service.slug}`,
      service: name,
      primaryKeyword: keyword,
      ctaHint: 'Δείτε πακέτα και ζητήστε προσφορά.',
    });
  }

  const descRetainerEn = fitDescription(`${service.name} services for business growth:`, [
    'technical audits, search-demand content strategy, local signals, and reporting tied to revenue. Request a quote.',
    'technical audits, demand-led content, and monthly reporting tied to revenue. Request a free quote.',
    'technical audits, demand-led content, and reporting tied to commercial goals. Request a quote.',
  ]);
  const descBuildEn = fitDescription(`${service.name} with technical SEO from day one:`, [
    'custom UX architecture, mobile-first performance, Core Web Vitals and conversion structure. Request a free quote.',
    'clean UX architecture, mobile speed, Core Web Vitals and conversion structure. Request a free quote.',
    'clean architecture, mobile speed and conversion structure. Request a quote.',
  ]);

  return buildMetadata({
    title: fitTitleWithSuffix(
      service.name,
      isSeoRetainerService(service.slug)
        ? [' - Strategy & Implementation', ' - Strategy', ' - Services', '']
        : [' - Design & Build', ' - Build', ' - Services', ''],
    ),
    description: isSeoRetainerService(service.slug) ? descRetainerEn : descBuildEn,
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

  const noIndex = !shouldIndexServiceLocation(location as Location, 'en');

  return buildMetadata({
    // Front-load keyword + city so truncation drops the hook, never the keyword.
    title: fitTitleWithSuffix(`${service.name} ${location.city}`, enTitleSuffixes(service.slug)),
    description: fitDescription(`${service.name} in ${placeLabel}.`, [
      'Local search strategy, technical SEO foundations, Core Web Vitals and content built around local customer search demand. Request a quote.',
      'Local search strategy, technical SEO foundations, and content built around local customer search demand. Request a quote.',
      'Local search strategy, technical foundations, and content built around how people there actually search. Request a quote.',
      'Local search strategy, technical foundations and content built around how people there search. Request a quote.',
      'Local search strategy, technical foundations and content that matches local search intent. Request a quote.',
      'Local search strategy, technical SEO foundations and local content. Request a free quote from our team.',
      'Local search strategy, technical SEO foundations and locally-targeted content. Request a free quote.',
      'Local search strategy and technical SEO foundations for the area. Request a free quote.',
    ]),
    path: localizedPath(locale, `/services/${service.slug}/${location.slug}`),
    hreflangPath: `/services/${service.slug}/${location.slug}`,
    // English city pages don't have Greek counterparts unless the city is Greek.
    hreflangLocales: isGreekLocationSlug(location.slug) ? ['en', 'el'] : ['en'],
    service: service.name,
    location: placeLabel,
    usp: `${service.name} for businesses in ${location.city}`,
    ctaHint: 'Request a free local quote.',
    noIndex,
  });
}

/** Services sold as monthly retainers vs one-off fixed-scope projects. */
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
    ? [' - Τοπική Στρατηγική SEO', ' - Τοπικό SEO', ' | Προσφορά', '']
    : [' - Σχεδιασμός & Υλοποίηση', ' - Κατασκευή', ' | Προσφορά', ''];
}

/** English SERP title suffix ladder (value-led, per "value not cheapest"). Picks the longest ≤43 chars. */
function enTitleSuffixes(slug: string): readonly string[] {
  return isSeoRetainerService(slug)
    ? [' - Local SEO Strategy', ' - Local Strategy', ' - Local SEO', '']
    : [' - Design & Build', ' - Web Design', ' - Websites', ''];
}

/** Append the longest suffix that keeps the primary title within the locale-aware max. */
function fitTitleWithSuffix(base: string, suffixes: readonly string[]): string {
  const max = primaryTitleMax(base);
  for (const suffix of suffixes) {
    if (base.length + suffix.length <= max) return base + suffix;
  }
  return base;
}

/**
 * Short Greek SERP keywords when full titleKeyword + city exceeds the 30-char primary
 * budget, city name must never be dropped by truncation.
 */
const EL_SHORT_TITLE_KEYWORD: Record<string, string> = {
  'website-creation': 'Ιστοσελίδες',
  'website-redesign': 'Ανασχεδιασμός',
  'seo-web-design': 'SEO Web Design',
  'local-seo': 'Τοπικό SEO',
  'seo-audits': 'Υπηρεσίες SEO',
  'eshop-woocommerce': 'E-shop',
  'eshop-seo': 'E-shop SEO',
  'ai-visibility': 'GEO / AEO',
  'speed-optimization': 'Ταχύτητα Site',
  'link-building': 'Link Building',
  'content-creation': 'SEO Content',
};

function elLocationTitleBase(serviceSlug: string, keyword: string, city: string): string {
  const full = `${keyword} ${city}`;
  if (full.length <= MAX_TITLE_PRIMARY_GREEK) return full;
  const short = EL_SHORT_TITLE_KEYWORD[serviceSlug] ?? 'SEO';
  const shortBase = `${short} ${city}`;
  if (shortBase.length <= MAX_TITLE_PRIMARY_GREEK) return shortBase;
  // Last resort: city-first so the place name survives smartTruncate
  return `${city} ${short}`;
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
  const locative = getGreekLocative(location.slug, city);
  // EL indexes only Greek locations that pass the uniqueness content gate.
  const noIndex = !shouldIndexServiceLocation(location as Location, 'el');
  const titleBase = elLocationTitleBase(service.slug, keyword, city);

  return buildMetadata({
    // Prefer short keyword when needed so truncation never drops the city.
    title: fitTitleWithSuffix(titleBase, elTitleSuffixes(service.slug)),
    description: fitDescription(`${keyword} ${locative}.`, [
      'Τοπική στρατηγική αναζήτησης, τεχνικά θεμέλια SEO, Core Web Vitals και περιεχόμενο για τη ζήτηση της περιοχής. Ζητήστε δωρεάν προσφορά.',
      'Τοπική στρατηγική αναζήτησης, τεχνικά θεμέλια SEO και περιεχόμενο βασισμένο στο πώς ψάχνουν στην περιοχή. Ζητήστε προσφορά.',
      'Τοπική στρατηγική αναζήτησης, τεχνικά θεμέλια και περιεχόμενο βασισμένο στο πώς ψάχνουν στην περιοχή. Ζητήστε προσφορά.',
      'Τοπική στρατηγική αναζήτησης, τεχνικά θεμέλια SEO και στοχευμένο τοπικό περιεχόμενο. Ζητήστε δωρεάν προσφορά.',
      'Τοπική στρατηγική αναζήτησης, τεχνικά θεμέλια SEO και τοπικό περιεχόμενο. Ζητήστε δωρεάν προσφορά.',
      'Τοπική στρατηγική αναζήτησης και τεχνικά θεμέλια SEO. Ζητήστε δωρεάν προσφορά από την ομάδα μας.',
    ]),
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

  const pains = (locale === 'el' ? industriesEl[industry.slug]?.painPoints : undefined)
    ?? (industry as { painPoints?: string[] }).painPoints
    ?? [];
  const painTail = pains.slice(0, 2).map((t) => (/[.!?]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`)).join(' ');
  // Authored descriptions win when they already fill the SERP window; otherwise
  // top up from the industry's own pain points rather than generic filler.
  const composed = indDesc && indDesc.length >= 140
    ? indDesc
    : [indDesc, painTail].filter(Boolean).join(' ').trim() || undefined;

  return buildMetadata({
    title:
      locale === 'el'
        ? fitTitleWithSuffix(`${indName} - Ιστοσελίδες & SEO`, [' | Πακέτα', ''])
        : fitTitleWithSuffix(`${indName} Websites & SEO`, [' | Strategy & Build', ' | Solutions', '']),
    description:
      composed ||
      (locale === 'el'
        ? `Ιστοσελίδες και SEO για ${indName}: στρατηγικές ανά κλάδο, γρήγορη υλοποίηση και δεδομένα από το Google Search Console. Δείτε πακέτα και ζητήστε προσφορά.`
        : `Website design and SEO built for ${indName}: industry playbooks, fast builds, and measurable growth. Transparent pricing. See packages and get a free quote.`),
    path: localizedPath(locale, `/solutions/${industry.slug}`),
    hreflangPath: `/solutions/${industry.slug}`,
    industry: indName,
    ctaHint: locale === 'el' ? 'Δείτε πακέτα ανά κλάδο.' : 'Explore industry packages.',
  });
}

const EL_SHORT_INDUSTRY_SERVICE_TITLE: Record<string, string> = {
  'website-creation': 'Ιστοσελίδες',
  'website-redesign': 'Ανασχεδιασμός',
  'seo-web-design': 'SEO Web Design',
  'speed-optimization': 'Ταχύτητα Site',
  'ai-visibility': 'GEO & AEO',
  'logo-design': 'Logo Design',
  'content-creation': 'SEO Content',
  'local-seo': 'Τοπικό SEO',
  'link-building': 'Link Building',
  'seo-audits': 'SEO Audits',
  'eshop-woocommerce': 'E-shop',
  'eshop-seo': 'E-shop SEO',
};

const EN_SHORT_INDUSTRY_SERVICE_TITLE: Record<string, string> = {
  'website-creation': 'Web Design',
  'website-redesign': 'Redesign',
  'seo-web-design': 'SEO Web Design',
  'speed-optimization': 'Speed Optimization',
  'ai-visibility': 'GEO & AEO',
  'logo-design': 'Logo Design',
  'content-creation': 'SEO Content',
  'local-seo': 'Local SEO',
  'link-building': 'Link Building',
  'seo-audits': 'SEO Audits',
  'eshop-woocommerce': 'E-commerce',
  'eshop-seo': 'E-shop SEO',
};

export function buildIndustryServiceMetadata(
  industry: { name: string; slug: string; painPoints?: readonly string[] },
  service: { name: string; slug: string },
  locale: SiteLocale = 'en',
): Metadata {
  let indName = industry.name;
  let svcName = service.name;
  let pains: readonly string[] = industry.painPoints ?? [];
  if (locale === 'el') {
    const indEl = industriesEl[industry.slug];
    if (indEl) {
      indName = indEl.name;
      pains = indEl.painPoints ?? pains;
    }
    const svcEl = getServiceEl(service.slug);
    if (svcEl) svcName = svcEl.name;
  }

  // Pain points are fragments; punctuate before appending so descriptions do
  // not run two sentences together.
  const punct = (t?: string) => (t ? (/[.!?]$/.test(t.trim()) ? t.trim() + ' ' : t.trim() + '. ') : '');
  const tail = punct(pains[0]) + punct(pains[1]);

  const descEl = fitDescription(`${svcName} για ${indName}. ${tail}`.replace(/\s+/g, ' '), [
    'Στρατηγική SEO και σχεδιασμός βάσει της πραγματικής ζήτησης του κλάδου σας, όχι έτοιμο πακέτο. Ζητήστε δωρεάν προσφορά.',
    'Στρατηγική βάσει της πραγματικής ζήτησης του κλάδου σας, όχι έτοιμο πακέτο. Ζητήστε δωρεάν προσφορά.',
    'Στρατηγική βάσει της πραγματικής ζήτησης του κλάδου σας, όχι έτοιμο πακέτο. Ζητήστε προσφορά.',
    'Στρατηγική βάσει της πραγματικής ζήτησης του κλάδου σας. Ζητήστε δωρεάν προσφορά.',
    'Στρατηγική προσαρμοσμένη στη ζήτηση του κλάδου σας. Ζητήστε δωρεάν προσφορά σήμερα.',
    'Στρατηγική προσαρμοσμένη στον κλάδο σας. Ζητήστε δωρεάν προσφορά σήμερα.',
    'Στρατηγική προσαρμοσμένη στον κλάδο σας. Ζητήστε δωρεάν προσφορά.',
    'Στρατηγική στα μέτρα σας. Ζητήστε δωρεάν προσφορά σήμερα.',
    'Στρατηγική στα μέτρα σας. Ζητήστε δωρεάν προσφορά.',
    'Ζητήστε δωρεάν προσφορά από την ομάδα μας.',
    'Ζητήστε δωρεάν προσφορά σήμερα.',
    'Ζητήστε δωρεάν προσφορά.',
    'Ζητήστε προσφορά.',
  ]);
  const descEn = fitDescription(`${svcName} for ${indName.toLowerCase()}. ${tail}`.replace(/\s+/g, ' '), [
    "Custom web design and SEO strategy built on your sector's real search demand, not a template. Request a free quote.",
    "Web design and SEO strategy built on your sector's real search demand, not a template. Request a quote.",
    "Strategy built on your sector's real search demand, not a template. Request a quote.",
    "Strategy built on your sector's real search demand. Request a free quote from our team.",
    "Strategy shaped by your sector's real search demand. Request a free quote from our team.",
    "Strategy shaped by your sector's demand, not a template. Request a free quote.",
    "Strategy shaped by your sector's real demand. Request a free quote today.",
    "Strategy shaped by your sector's demand. Request a free quote today.",
    "Strategy tailored to your sector. Request a free quote today.",
    "Request a free quote from our team today.",
  ]);

  const shortSvcEl = EL_SHORT_INDUSTRY_SERVICE_TITLE[service.slug] ?? svcName;
  const shortSvcEn = EN_SHORT_INDUSTRY_SERVICE_TITLE[service.slug] ?? service.name;

  return buildMetadata({
    title:
      locale === 'el'
        ? fitTitleWithSuffix(`${shortSvcEl} για ${indName}`, [' | Στρατηγική', ''])
        : fitTitleWithSuffix(`${shortSvcEn} for ${indName}`, [' | Strategy', '']),
    description: locale === 'el' ? descEl : descEn,
    path: localizedPath(locale, '/solutions/' + industry.slug + '/' + service.slug),
    hreflangPath: '/solutions/' + industry.slug + '/' + service.slug,
    service: svcName,
    industry: indName,
  });
}

export { BASE_URL, BRAND_NAME };
