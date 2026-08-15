import type { SiteLocale } from '@/lib/i18n/locale';

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
 * Summer promotion deadline, Europe/Athens.
 *
 * `isOfferActive()` gates every promotional price and all offer copy, so the
 * discount and its messaging disappear on their own after this instant. No
 * countdown timers and no scarcity claims - the date does the work.
 */
export const OFFER_ENDS = new Date('2026-08-31T23:59:59+03:00');

export function isOfferActive(now: Date = new Date()): boolean {
  return now.getTime() <= OFFER_ENDS.getTime();
}

/** Net -> gross. Rounded to cents so €892.80 renders exactly. */
export function withVat(net: number): number {
  return Math.round(net * (1 + VAT_RATE) * 100) / 100;
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

/** The price actually charged today, net of VAT. */
export function currentPrice(tier: Tier, now?: Date): number {
  return isOfferActive(now) ? tier.offer : tier.regular;
}

export const websitePackages: readonly Tier[] = [
  {
    id: 'starter',
    name: 'Website Starter',
    regular: 1500,
    offer: 1200,
    forEn: 'Small but serious businesses that need a professional, SEO-ready website.',
    forEl: 'Μικρές αλλά σοβαρές επιχειρήσεις που χρειάζονται επαγγελματική ιστοσελίδα, έτοιμη για SEO.',
    includesEn: [
      'Custom design on your brand, not a template',
      'Mobile-first build and Core Web Vitals work',
      'Technical SEO foundations and clean architecture',
      'Analytics and Search Console configured',
      'Training so you can run it yourself',
    ],
    includesEl: [
      'Σχεδιασμός στα μέτρα του brand σας, όχι έτοιμο template',
      'Κατασκευή mobile-first και εργασία στα Core Web Vitals',
      'Τεχνικά θεμέλια SEO και καθαρή αρχιτεκτονική',
      'Ρύθμιση Analytics και Search Console',
      'Εκπαίδευση για να το διαχειρίζεστε μόνοι σας',
    ],
    deliveryEn: '3 to 5 weeks',
    deliveryEl: '3 έως 5 εβδομάδες',
  },
  {
    id: 'professional',
    name: 'Website Professional',
    regular: 2500,
    offer: 2000,
    popular: true,
    forEn: 'Hotels, tourism and service businesses that need deeper SEO architecture and conversion work.',
    forEl: 'Ξενοδοχεία, τουριστικές επιχειρήσεις και εταιρείες υπηρεσιών που χρειάζονται βαθύτερη αρχιτεκτονική SEO και εργασία στις μετατροπές.',
    includesEn: [
      'Everything in Starter',
      'Deeper information architecture and keyword mapping',
      'Conversion paths designed around enquiries or bookings',
      'Multilingual structure where the market needs it',
      'Structured data matched to what is on the page',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Starter',
      'Βαθύτερη αρχιτεκτονική πληροφορίας και αντιστοίχιση λέξεων-κλειδιών',
      'Διαδρομές μετατροπής σχεδιασμένες για αιτήματα ή κρατήσεις',
      'Πολυγλωσσική δομή όπου την απαιτεί η αγορά',
      'Δομημένα δεδομένα που αντιστοιχούν στο ορατό περιεχόμενο',
    ],
    deliveryEn: '5 to 8 weeks',
    deliveryEl: '5 έως 8 εβδομάδες',
  },
  {
    id: 'business',
    name: 'Website Business',
    regular: 4000,
    offer: 3200,
    forEn: 'Complex, multilingual, multi-location, e-commerce and custom projects.',
    forEl: 'Σύνθετα έργα: πολυγλωσσικά, πολλαπλών τοποθεσιών, e-commerce και custom κατασκευές.',
    includesEn: [
      'Everything in Professional',
      'E-commerce or booking integrations',
      'Multi-location or multi-property structure',
      'Custom functionality scoped to the project',
      'Migration planning that protects existing rankings',
    ],
    includesEl: [
      'Όλα όσα περιλαμβάνει το Professional',
      'Ενσωματώσεις e-commerce ή συστήματος κρατήσεων',
      'Δομή πολλαπλών τοποθεσιών ή καταλυμάτων',
      'Custom λειτουργικότητα προσαρμοσμένη στο έργο',
      'Σχέδιο μετάπτωσης που προστατεύει τις υπάρχουσες κατατάξεις',
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
    offer: 400,
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
    offer: 720,
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
    offer: 1200,
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

/** Lowest entry points, for copy that references a starting figure. */
export const ENTRY_WEBSITE_NET = websitePackages[0].offer;
export const ENTRY_SEO_NET = seoPackages[0].offer;

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
