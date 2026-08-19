/**
 * Which services genuinely belong to which industry.
 *
 * The route can generate 31 industries × 12 services × 2 locales = 744 pages.
 * Being able to generate a page is not a reason to index it: "e-shop SEO for
 * lawyers" and "logo design for hotels" are combinations the URL space allows
 * and that nobody searches for as a distinct need.
 *
 * `core` lists the services a business in that industry actually buys, and where
 * the page can say something a generic service page cannot. Everything outside
 * `core` is treated as a sub-intent the industry hub already covers, and is
 * consolidated there rather than published as its own thin landing page.
 *
 * This matrix is the *editorial* input to the tier decision. Measured demand
 * (`data/gsc-pages.ts`) is the other, and it can override in both directions:
 * a URL with real clicks is preserved even when it sits outside `core`.
 */

export interface IndustryRelevance {
  /** Services this industry genuinely buys, in rough order of commercial weight. */
  readonly core: readonly string[];
  /** Short note on what shapes demand here. Used in the audit trail. */
  readonly rationale: string;
}

/** Trades and home services: local intent dominates, no online storefront. */
const LOCAL_TRADE: readonly string[] = ['local-seo', 'website-creation', 'seo-audits'];

/** Regulated professions: local intent plus a long research phase before contact. */
const PROFESSIONAL: readonly string[] = ['local-seo', 'website-creation', 'content-creation', 'seo-audits'];

/** Clinics: local intent, trust-heavy research, strong review dependence. */
const MEDICAL: readonly string[] = ['local-seo', 'website-creation', 'content-creation', 'seo-audits'];

/** Hospitality: seasonal, multilingual, and fighting OTA intermediation. */
const HOSPITALITY: readonly string[] = [
  'website-creation',
  'local-seo',
  'ai-visibility',
  'seo-web-design',
  'content-creation',
  'seo-audits',
];

export const INDUSTRY_RELEVANCE: Record<string, IndustryRelevance> = {
  // --- trades -------------------------------------------------------------
  plumbers: { core: LOCAL_TRADE, rationale: 'Emergency and near-me intent; conversion happens by phone.' },
  electricians: { core: LOCAL_TRADE, rationale: 'Licence and safety proof drive selection; local intent.' },
  hvac: { core: [...LOCAL_TRADE, 'content-creation'], rationale: 'Seasonal demand peaks; service contracts reward content.' },
  roofers: { core: [...LOCAL_TRADE, 'content-creation'], rationale: 'High-value jobs with a long research phase before contact.' },
  landscapers: { core: LOCAL_TRADE, rationale: 'Local, visual, repeat-service intent.' },
  painters: { core: LOCAL_TRADE, rationale: 'Local quote-driven intent.' },
  carpenters: { core: LOCAL_TRADE, rationale: 'Bespoke work; portfolio and locality drive enquiries.' },
  flooring: { core: [...LOCAL_TRADE, 'content-creation'], rationale: 'Material comparison research precedes a local purchase.' },
  'cleaning-services': { core: LOCAL_TRADE, rationale: 'Recurring local contracts; near-me intent.' },
  movers: { core: LOCAL_TRADE, rationale: 'Route and date specific; strongly local.' },
  locksmiths: { core: LOCAL_TRADE, rationale: 'Emergency intent; map pack decides the call.' },
  'pest-control': { core: LOCAL_TRADE, rationale: 'Urgent local intent with seasonal peaks.' },

  // --- professional services ---------------------------------------------
  lawyers: { core: PROFESSIONAL, rationale: 'High-value matters; long research phase, strong local intent.' },
  'dui-lawyers': { core: PROFESSIONAL, rationale: 'Urgent, narrow, highly local practice-area intent.' },
  'personal-injury': { core: PROFESSIONAL, rationale: 'Competitive practice area; content and local signals decide.' },
  'financial-advisors': { core: PROFESSIONAL, rationale: 'Trust-led, regulated; research-heavy before contact.' },
  therapists: { core: PROFESSIONAL, rationale: 'Sensitive research intent; locality and trust dominate.' },
  chiropractors: { core: MEDICAL, rationale: 'Local clinic intent with condition-led research.' },

  // --- medical ------------------------------------------------------------
  dentists: { core: MEDICAL, rationale: 'Local clinic intent; treatment research and reviews.' },
  'plastic-surgeons': { core: MEDICAL, rationale: 'Procedure research is long and trust-critical.' },
  'med-spas': { core: MEDICAL, rationale: 'Treatment-led local intent with strong review dependence.' },

  // --- property and hospitality -------------------------------------------
  'real-estate': {
    core: ['website-creation', 'local-seo', 'content-creation', 'seo-audits', 'seo-web-design'],
    rationale: 'Listing-driven; area pages and property search are the ranking surface.',
  },
  hotels: { core: HOSPITALITY, rationale: 'Direct bookings compete with OTAs; seasonal multilingual demand.' },
  'villas-apartments': { core: HOSPITALITY, rationale: 'Same OTA dynamic as hotels at smaller inventory.' },
  'tour-operators': { core: HOSPITALITY, rationale: 'Seasonal, experience-led, multilingual demand.' },
  'travel-agencies': { core: HOSPITALITY, rationale: 'Package research is content-led and seasonal.' },
  'rent-a-car': { core: HOSPITALITY, rationale: 'Seasonal, location-anchored, availability-driven booking.' },
  'travel-ai-chatbots': {
    core: ['ai-visibility', 'website-creation', 'content-creation', 'seo-audits'],
    rationale: 'The buyer is already an AI-forward tourism operator; GEO/AEO is the point.',
  },

  // --- consumer venues ----------------------------------------------------
  restaurants: {
    core: ['local-seo', 'website-creation', 'seo-audits', 'eshop-woocommerce', 'eshop-seo'],
    rationale: 'Map pack decides footfall; online ordering is a genuine storefront, so its SEO counts too.',
  },
  gyms: { core: [...LOCAL_TRADE, 'content-creation'], rationale: 'Membership intent is local and comparison-led.' },
  salons: { core: LOCAL_TRADE, rationale: 'Appointment intent, local and review-driven.' },
};

/** Services that only make sense where the business genuinely sells online. */
const ECOMMERCE_SERVICES = new Set(['eshop-woocommerce', 'eshop-seo']);

export function isCoreService(industrySlug: string, serviceSlug: string): boolean {
  return INDUSTRY_RELEVANCE[industrySlug]?.core.includes(serviceSlug) ?? false;
}

export function relevanceRationale(industrySlug: string): string {
  return INDUSTRY_RELEVANCE[industrySlug]?.rationale ?? 'No editorial profile recorded.';
}

/**
 * Why a non-core pairing was rejected. Kept explicit so the audit trail records
 * a reason rather than just a verdict.
 */
export function mismatchReason(industrySlug: string, serviceSlug: string): string {
  if (ECOMMERCE_SERVICES.has(serviceSlug)) {
    return 'E-commerce service against an industry that does not sell products online.';
  }
  if (serviceSlug === 'logo-design') {
    return 'Branding is a sub-intent of the industry hub, not a separate search need.';
  }
  if (serviceSlug === 'link-building') {
    return 'Link building is bought as an SEO service, not as an industry-specific product.';
  }
  if (serviceSlug === 'speed-optimization') {
    return 'Performance work is technical and industry-agnostic; the service page covers it.';
  }
  if (serviceSlug === 'website-redesign') {
    return 'Redesign intent is served by the industry hub plus the redesign service page.';
  }
  return 'Outside the industry\'s core service set; the hub already satisfies this intent.';
}
