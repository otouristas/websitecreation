import type { SiteLocale } from '@/lib/i18n/locale';
import { launchOfferView, packageEligible, type LaunchOfferView } from '@/data/commercial/campaign';
import { centsToEuros, discountedBaseCents, eurosToCents, grossCents, type VatTreatment } from '@/data/commercial/money';
import { seoLaunchFor } from '@/data/commercial/seo-launch';

/**
 * Single source of truth for every price on the site.
 *
 * Prices previously lived inline in `src/app/[locale]/pricing/page.tsx` and were
 * then restated as hardcoded strings in `service-hub-commercial.ts`,
 * `service-faq-data.ts`, `lib/seo/metadata.ts`, the location packs and the
 * homepage - so figures drifted between surfaces. Everything now reads here.
 *
 * All list prices are NET, excluding Greek VAT. Every surface that renders a
 * price must show both the net figure with "+ ΦΠΑ 24%" and the gross figure.
 */

export const VAT_RATE = 0.24;

/**
 * Retired summer-offer deadline, Europe/Athens.
 *
 * `isOfferActive()` describes that expired window only. It must not price
 * website builds and it must not discount SEO retainers. The Website Launch
 * Offer is a separate campaign (`src/data/commercial/campaign.ts`) and applies
 * to the build base alone.
 */
export const OFFER_ENDS = new Date('2026-08-31T23:59:59+03:00');

export function isOfferActive(now: Date = new Date()): boolean {
  return now.getTime() <= OFFER_ENDS.getTime();
}

/** Net euros -> gross euros for a VAT treatment. Public prices use Greek VAT. */
export function withVat(net: number, treatment: VatTreatment = 'gr_standard'): number {
  return centsToEuros(grossCents(eurosToCents(net), treatment));
}

/**
 * Greek uses `.` as the thousands separator and `,` for decimals; English the
 * reverse. The old pricing page called `toLocaleString()` with no locale, so
 * Greek pages rendered `1,799` while the surrounding copy said `1.799`.
 */
export function formatPrice(amount: number, locale: SiteLocale): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export interface Tier {
  readonly id: string;
  readonly name: string;
  /** Net list price, excluding VAT. */
  readonly regular: number;
  /** Net promotional price while the summer offer runs. */
  readonly offer: number;
  readonly popular?: boolean;
  readonly forEn: string;
  readonly forEl: string;
  readonly includesEn: readonly string[];
  readonly includesEl: readonly string[];
  /** Indicative production window. Never applied to SEO outcomes. */
  readonly deliveryEn?: string;
  readonly deliveryEl?: string;
}

const WEBSITE_IDS = new Set(['starter', 'professional', 'business']);

export function isWebsiteTier(tier: { readonly id: string }): boolean {
  return WEBSITE_IDS.has(tier.id);
}

/**
 * Net euros shown for a tier.
 *
 * Website builds use the launch-offer base when that view says the discount
 * applies, and the list price otherwise. SEO retainers always use `regular`.
 * Passing a date inside the old summer window does not discount them.
 */
export function currentPrice(tier: Tier, now?: Date): number {
  if (!isWebsiteTier(tier)) return tier.regular;
  return centsToEuros(displayedWebsiteBaseCents(tier, launchOfferView(undefined, now)));
}

/** List base in cents. The integer source for the 30% formula. */
export function websiteListCents(tier: Tier): number {
  return eurosToCents(tier.regular);
}

/** Build base in cents after the launch-offer rule. Extras are not passed through here. */
export function displayedWebsiteBaseCents(tier: Tier, view: LaunchOfferView = launchOfferView()): number {
  const list = websiteListCents(tier);
  if (!view.discountApplies || !packageEligible(view.campaign, tier.id)) return list;
  return discountedBaseCents(list, view.campaign.discount_bps);
}

export { seoLaunchFor };

export const websitePackages: readonly Tier[] = [
  {
    id: 'starter',
    name: 'Website Starter',
    regular: 1500,
    offer: 1050,
    forEn: 'Small but serious businesses that need a professional, SEO-ready website.',
    forEl: 'Μικρές αλλά σοβαρές επιχειρήσεις που χρειάζονται επαγγελματική ιστοσελίδα, έτοιμη για SEO.',
    includesEn: [
      'Up to 5 pages and 1 language',
      'Contact form',
      'Technical SEO on the build',
      'One training session, up to 60 minutes',
      'Two consolidated revision rounds',
      'No mandatory care plan and no app purchase',
    ],
    includesEl: [
      'Έως 5 σελίδες και 1 γλώσσα',
      'Φόρμα επικοινωνίας',
      'Τεχνικό SEO στην κατασκευή',
      'Μία εκπαίδευση έως 60 λεπτά',
      'Δύο συγκεντρωτικοί γύροι αναθεωρήσεων',
      'Χωρίς υποχρεωτικό πακέτο φροντίδας και χωρίς αγορά εφαρμογής',
    ],
    deliveryEn: '3 to 5 weeks',
    deliveryEl: '3 έως 5 εβδομάδες',
  },
  {
    id: 'professional',
    name: 'Website Professional',
    regular: 2500,
    offer: 1750,
    popular: true,
    forEn: 'Hotels, tourism and service businesses that need deeper SEO architecture and conversion work.',
    forEl: 'Ξενοδοχεία, τουριστικές επιχειρήσεις και εταιρείες υπηρεσιών που χρειάζονται βαθύτερη αρχιτεκτονική SEO και εργασία στις μετατροπές.',
    includesEn: [
      'Everything in Starter, up to 12 pages',
      'Keyword mapping',
      'Structured data matched to the page',
      'SEO Launch for 3 months while the offer applies: up to 2 hours of human SEO work per active month',
      'No automatic renewal into a paid retainer',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Starter, έως 12 σελίδες',
      'Αντιστοίχιση λέξεων-κλειδιών',
      'Structured data που αντιστοιχούν στη σελίδα',
      'SEO Launch 3 μηνών όσο ισχύει η προσφορά: έως 2 ώρες ανθρώπινης SEO εργασίας ανά ενεργό μήνα',
      'Χωρίς αυτόματη ανανέωση σε μηνιαίο SEO επί πληρωμή',
    ],
    deliveryEn: '5 to 8 weeks',
    deliveryEl: '5 έως 8 εβδομάδες',
  },
  {
    id: 'business',
    name: 'Website Business',
    regular: 4000,
    offer: 2800,
    forEn: 'Larger builds. E-commerce, migration and booking are included only when the quote names them.',
    forEl: 'Μεγαλύτερες κατασκευές. E-commerce, μετάπτωση και κρατήσεις περιλαμβάνονται μόνο όταν τα ονομάζει η προσφορά.',
    includesEn: [
      'Everything in Professional, up to 25 pages',
      'SEO Launch for 6 months while the offer applies: up to 2 hours of human SEO work per active month',
      'E-commerce, migration or booking only when the quote names them',
      'No automatic renewal into a paid retainer',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Professional, έως 25 σελίδες',
      'SEO Launch 6 μηνών όσο ισχύει η προσφορά: έως 2 ώρες ανθρώπινης SEO εργασίας ανά ενεργό μήνα',
      'E-commerce, μετάπτωση ή κρατήσεις μόνο όταν τα ονομάζει η προσφορά',
      'Χωρίς αυτόματη ανανέωση σε μηνιαίο SEO επί πληρωμή',
    ],
    deliveryEn: '8 to 12+ weeks',
    deliveryEl: '8 έως 12+ εβδομάδες',
  },
];

export const seoPackages: readonly Tier[] = [
  {
    id: 'foundations',
    name: 'SEO Foundations',
    regular: 500,
    offer: 500,
    forEn: 'The minimum engagement at which serious SEO work is possible.',
    forEl: 'Το ελάχιστο επίπεδο συνεργασίας στο οποίο μπορεί να γίνει σοβαρή δουλειά SEO.',
    includesEn: [
      'Technical audit and prioritised fix roadmap',
      'Priority commercial keyword clusters, mapped to pages',
      'On-page work on the pages that can convert',
      'Google Business Profile and local signals',
      'Monthly reporting tied to your commercial goals',
    ],
    includesEl: [
      'Τεχνικός έλεγχος και ιεραρχημένο πλάνο διορθώσεων',
      'Ομάδες εμπορικών λέξεων-κλειδιών, αντιστοιχισμένες σε σελίδες',
      'Εργασία on-page στις σελίδες που μπορούν να φέρουν πελάτες',
      'Google Business Profile και τοπικά σήματα',
      'Μηνιαία αναφορά συνδεδεμένη με τους εμπορικούς σας στόχους',
    ],
  },
  {
    id: 'growth',
    name: 'SEO Growth',
    regular: 900,
    offer: 900,
    popular: true,
    forEn: 'Businesses investing systematically in organic growth.',
    forEl: 'Επιχειρήσεις που επενδύουν συστηματικά στην οργανική ανάπτυξη.',
    includesEn: [
      'Everything in Foundations',
      'Broader topical coverage across your commercial clusters',
      'Content produced against real search demand',
      'Authority and backlink gap analysis',
      'AEO and GEO work for AI answer engines',
      'Monthly strategy call',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Foundations',
      'Ευρύτερη θεματική κάλυψη στις εμπορικές σας κατηγορίες',
      'Περιεχόμενο βασισμένο σε πραγματική ζήτηση αναζήτησης',
      'Ανάλυση authority και κενών σε backlinks',
      'Εργασία AEO και GEO για τις μηχανές απαντήσεων AI',
      'Μηνιαία τηλεδιάσκεψη στρατηγικής',
    ],
  },
  {
    id: 'authority',
    name: 'SEO Authority',
    regular: 1500,
    offer: 1500,
    forEn: 'Competitive markets, e-commerce, national and international programmes.',
    forEl: 'Ανταγωνιστικές αγορές, e-commerce, πανελλαδικά και διεθνή προγράμματα.',
    includesEn: [
      'Everything in Growth',
      'E-commerce, national or international scope',
      'Larger content programme and topical depth',
      'Digital PR and relevant link acquisition strategy',
      'Conversion analysis alongside the organic work',
      'Fortnightly performance review',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Growth',
      'Κάλυψη e-commerce, πανελλαδική ή διεθνή',
      'Μεγαλύτερο πρόγραμμα περιεχομένου και θεματικό βάθος',
      'Στρατηγική digital PR και απόκτησης σχετικών συνδέσμων',
      'Ανάλυση μετατροπών παράλληλα με την οργανική εργασία',
      'Ανασκόπηση απόδοσης κάθε δεκαπενθήμερο',
    ],
  },
];

export interface AddOn {
  readonly id: string;
  readonly from: number;
  readonly nameEn: string;
  readonly nameEl: string;
  readonly recurring?: boolean;
}

/** All add-ons are "from" prices: scope materially changes the final figure. */
export const addOns: readonly AddOn[] = [
  { id: 'content-page', from: 180, nameEn: 'Additional SEO / content page', nameEl: 'Επιπλέον σελίδα SEO ή περιεχομένου' },
  { id: 'website-page', from: 180, nameEn: 'Additional website page', nameEl: 'Επιπλέον σελίδα ιστοσελίδας' },
  { id: 'technical-audit', from: 450, nameEn: 'Technical SEO audit', nameEl: 'Τεχνικός έλεγχος SEO' },
  { id: 'advanced-audit', from: 750, nameEn: 'Advanced SEO audit', nameEl: 'Εκτενής έλεγχος SEO' },
  { id: 'maintenance', from: 250, nameEn: 'Website maintenance', nameEl: 'Συντήρηση ιστοσελίδας', recurring: true },
  { id: 'chatbot', from: 600, nameEn: 'AI chatbot integration', nameEl: 'Ενσωμάτωση AI chatbot' },
  { id: 'logo', from: 350, nameEn: 'Logo and brand essentials', nameEl: 'Λογότυπο και βασικά στοιχεία brand' },
  { id: 'ecommerce', from: 1200, nameEn: 'E-commerce functionality', nameEl: 'Λειτουργικότητα e-commerce' },
];

/**
 * Lowest entry points, for copy that references a starting figure.
 *
 * Functions, not constants. As constants these read `.offer` - the *promotional*
 * price - and froze it at module load, so the day `OFFER_ENDS` passed the
 * pricing page switched to the regular €1.500 / €500 via `currentPrice()` while
 * the mobile menu, the services hub and the homepage SEO block carried on
 * advertising €1.200 / €400. Same hazard the `PRICE_TOKENS` block below was
 * written to avoid, and the same reason it resolves at render time.
 */
export function entryWebsiteNet(now?: Date): number {
  return currentPrice(websitePackages[0], now);
}

export function entrySeoNet(now?: Date): number {
  return currentPrice(seoPackages[0], now);
}

/**
 * Look a tier up by id across both ladders.
 *
 * Used where a surface needs to name a package it is not itself rendering - for
 * example tagging a portfolio project with the packages it was delivered under.
 * Going through this keeps those labels tied to the single source of truth, so
 * renaming a tier here renames it everywhere.
 */
export function getTierById(id: string): Tier | undefined {
  return [...websitePackages, ...seoPackages].find((t) => t.id === id);
}

export { CARE_PLANS, EXTRA_WORK_CENTS_PER_HOUR, extraWorkCents, SUPPORT_WINDOW } from '@/data/commercial/care';
export { WEBSITE_LAUNCH_CAMPAIGN, launchOfferView } from '@/data/commercial/campaign';
export { PRICING_VERSION, BUILD_DISCOUNT_BPS, installmentSplitCents } from '@/data/commercial/money';

/**
 * Price tokens for authored copy.
 *
 * The location packs used to hardcode figures like "€1.200" and "από €600" in
 * Greek prose. Those were *offer* prices gated by `isOfferActive()`, so they
 * would have gone stale on their own the day the window closed, and some had
 * already drifted (e-commerce was written as €600 against a real €1.200).
 * Authored copy now writes `{{ENTRY_WEBSITE}}` and the number is resolved here
 * at render time, against the same data the pricing page uses.
 */
const PRICE_TOKENS: Record<string, () => number> = {
  ENTRY_WEBSITE: () => currentPrice(websitePackages[0]),
  WEBSITE_PRO: () => currentPrice(websitePackages[1]),
  WEBSITE_BUSINESS: () => currentPrice(websitePackages[2]),
  ENTRY_SEO: () => currentPrice(seoPackages[0]),
  SEO_GROWTH: () => currentPrice(seoPackages[1]),
  SEO_AUTHORITY: () => currentPrice(seoPackages[2]),
  ADDON_ECOMMERCE: () => addOns.find((a) => a.id === 'ecommerce')!.from,
  ADDON_TECHNICAL_AUDIT: () => addOns.find((a) => a.id === 'technical-audit')!.from,
  ADDON_ADVANCED_AUDIT: () => addOns.find((a) => a.id === 'advanced-audit')!.from,
  ADDON_LOGO: () => addOns.find((a) => a.id === 'logo')!.from,
};

/** Replace `{{TOKEN}}` with the live net price, formatted for the locale. */
export function resolvePriceTokens(text: string, locale: SiteLocale): string {
  return text.replace(/\{\{([A-Z_]+)\}\}/g, (whole, token: string) => {
    const get = PRICE_TOKENS[token];
    return get ? `€${formatPrice(get(), locale)}` : whole;
  });
}
