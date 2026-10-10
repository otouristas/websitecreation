import type { SiteLocale } from '@/lib/i18n/locale';
import { localizedPath } from '@/lib/i18n/locale';
import { getAppPath } from '@/lib/app-links';
import { entrySeoNet, entryWebsiteNet, formatPrice } from '@/data/pricing';
import type { MarketingBadgeKind } from '@/components/kit/primitives';

/**
 * One menu definition for the desktop mega menu and the mobile sheet, so the
 * two can never list different pages or different prices. Every item may
 * carry a marketing indicator (`badge`) and a short `meta` (an entry price,
 * a count) that both menus render the same way.
 */

export type NavIconKey =
  | 'search'
  | 'map'
  | 'sparkles'
  | 'audit'
  | 'cart'
  | 'trend'
  | 'link'
  | 'pen'
  | 'globe'
  | 'refresh'
  | 'gauge'
  | 'palette'
  | 'hotel'
  | 'car'
  | 'compass'
  | 'home'
  | 'utensils'
  | 'building'
  | 'scale'
  | 'tooth'
  | 'list'
  | 'chart'
  | 'key'
  | 'file'
  | 'shield'
  | 'swords'
  | 'bot'
  | 'message'
  | 'users'
  | 'book'
  | 'library'
  | 'scan'
  | 'tag'
  | 'grid';

export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly desc?: string;
  readonly icon?: NavIconKey;
  readonly badge?: { readonly kind: MarketingBadgeKind; readonly label: string };
  readonly meta?: string;
  /** Links into the app (sign-up, demo) open as plain anchors. */
  readonly external?: boolean;
}

export interface NavColumn {
  readonly title: string;
  readonly items: readonly NavItem[];
}

export interface NavFeature {
  readonly tone: 'agency' | 'software' | 'proof';
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly chips?: readonly string[];
  readonly points?: readonly string[];
  readonly primary: { readonly href: string; readonly label: string; readonly external?: boolean };
  readonly secondary?: { readonly href: string; readonly label: string; readonly external?: boolean };
}

export interface NavMenu {
  readonly id: 'services' | 'industries' | 'software' | 'learn';
  readonly label: string;
  readonly badge?: { readonly kind: MarketingBadgeKind; readonly label: string };
  readonly columns: readonly NavColumn[];
  readonly feature: NavFeature;
  readonly footer?: { readonly href: string; readonly label: string };
}

export interface NavModel {
  readonly menus: readonly NavMenu[];
  readonly links: readonly NavItem[];
  /** Short marketing line shown above everything in the mobile sheet. */
  readonly promo: { readonly href: string; readonly tag: string; readonly text: string; readonly external?: boolean };
  readonly freeAudit: { readonly href: string; readonly label: string };
  readonly startFree: { readonly href: string; readonly label: string };
}

export function getNavModel(locale: SiteLocale): NavModel {
  const el = locale === 'el';
  const t = (en: string, gr: string) => (el ? gr : en);
  const lp = (p: string) => localizedPath(locale, p);
  const seoFrom = formatPrice(entrySeoNet(), locale);
  const webFrom = formatPrice(entryWebsiteNet(), locale);
  const signup = `${getAppPath('/signup')}?lang=${locale}&utm_source=website&utm_content=nav`;
  const demo = `${getAppPath('/demo')}?lang=${locale}&utm_source=website&utm_content=nav`;

  const NEW = { kind: 'new' as const, label: t('New', 'Νέο') };
  const FREE = { kind: 'free' as const, label: t('Free', 'Δωρεάν') };
  const POPULAR = { kind: 'popular' as const, label: t('Popular', 'Δημοφιλές') };
  const AI = { kind: 'ai' as const, label: 'AI' };

  const freeAudit = { href: `${lp('/get-started')}#free-audit`, label: t('Free SEO audit', 'Δωρεάν έλεγχος SEO') };
  const startFree = { href: signup, label: t('Start free with Google', 'Δωρεάν έναρξη με Google') };

  const services: NavMenu = {
    id: 'services',
    label: t('Services', 'Υπηρεσίες'),
    columns: [
      {
        title: t('Get found', 'Εμφανιστείτε'),
        items: [
          { href: lp('/seo-services'), label: t('SEO services', 'Υπηρεσίες SEO'), desc: t('Monthly SEO that brings customers', 'Μηνιαίο SEO που φέρνει πελάτες'), icon: 'trend', badge: POPULAR, meta: t(`from €${seoFrom}/mo`, `από €${seoFrom}/μήνα`) },
          { href: lp('/services/ai-visibility'), label: t('AI visibility (GEO / AEO)', 'Ορατότητα σε AI (GEO / AEO)'), desc: t('Get recommended by ChatGPT and Gemini', 'Να σας προτείνουν ChatGPT και Gemini'), icon: 'sparkles', badge: AI },
          { href: lp('/services/local-seo'), label: t('Local SEO', 'Τοπικό SEO'), desc: t('Win the Google Maps results', 'Πρώτοι στον χάρτη της Google'), icon: 'map' },
          { href: lp('/services/seo-audits'), label: t('SEO audit', 'Έλεγχος SEO'), desc: t('What holds your site back', 'Τι κρατά πίσω την ιστοσελίδα σας'), icon: 'audit', badge: FREE },
          { href: lp('/services/eshop-seo'), label: t('E-shop SEO', 'SEO για e-shop'), desc: t('More organic product sales', 'Περισσότερες οργανικές πωλήσεις'), icon: 'cart' },
          { href: lp('/services/link-building'), label: t('Link building', 'Backlinks'), desc: t('Clean links and digital PR', 'Καθαρά backlinks και digital PR'), icon: 'link' },
          { href: lp('/services/content-creation'), label: t('Content', 'Περιεχόμενο'), desc: t('Pages written to rank and sell', 'Κείμενα που κατατάσσονται και πουλάνε'), icon: 'pen' },
        ],
      },
      {
        title: t('Build', 'Κατασκευή'),
        items: [
          { href: lp('/services/website-creation'), label: t('Website creation', 'Κατασκευή ιστοσελίδων'), desc: t('Fast sites, ready for SEO', 'Γρήγορες ιστοσελίδες, έτοιμες για SEO'), icon: 'globe', badge: POPULAR, meta: t(`from €${webFrom}`, `από €${webFrom}`) },
          { href: lp('/services/eshop-woocommerce'), label: t('E-shop development', 'Κατασκευή e-shop'), desc: t('WooCommerce stores that sell', 'Καταστήματα WooCommerce που πουλάνε'), icon: 'cart' },
          { href: lp('/services/website-redesign'), label: t('Website redesign', 'Ανασχεδιασμός ιστοσελίδας'), desc: t('Modernise without losing rankings', 'Ανανέωση χωρίς απώλεια θέσεων'), icon: 'refresh' },
          { href: lp('/services/seo-web-design'), label: t('SEO web design', 'Σχεδιασμός με SEO'), desc: t('Built to rank from day one', 'Σχεδιασμένη να κατατάσσεται'), icon: 'search' },
          { href: lp('/services/speed-optimization'), label: t('Speed optimisation', 'Βελτίωση ταχύτητας'), desc: t('Pass Core Web Vitals', 'Επιτυχία στα Core Web Vitals'), icon: 'gauge' },
          { href: lp('/services/logo-design'), label: t('Logo design', 'Σχεδιασμός λογοτύπου'), desc: t('A brand people remember', 'Μια ταυτότητα που θυμούνται'), icon: 'palette' },
        ],
      },
    ],
    feature: {
      tone: 'agency',
      eyebrow: t('We do it for you', 'Το αναλαμβάνουμε εμείς'),
      title: t('Free SEO audit in 24 hours', 'Δωρεάν έλεγχος SEO σε 24 ώρες'),
      body: t(
        'Send your website. You get what costs you customers, what to fix first and a fixed price.',
        'Στείλτε την ιστοσελίδα σας. Παίρνετε τι σας κοστίζει πελάτες, τι διορθώνεται πρώτο και σταθερή τιμή.',
      ),
      points: [
        t('Technical, local and AI-search checks', 'Τεχνικό, τοπικό SEO και αναζήτηση AI'),
        t('Your top 5 fixes, in order', 'Οι 5 πρώτες διορθώσεις, με σειρά'),
        t('A fixed price, no lock-in', 'Σταθερή τιμή, χωρίς δέσμευση'),
      ],
      chips: [t(`SEO from €${seoFrom}/mo`, `SEO από €${seoFrom}/μήνα`), t(`Websites from €${webFrom}`, `Ιστοσελίδες από €${webFrom}`)],
      primary: { href: freeAudit.href, label: t('Get my free audit', 'Θέλω δωρεάν έλεγχο') },
      secondary: { href: lp('/pricing'), label: t('See all prices', 'Όλες οι τιμές') },
    },
    footer: { href: lp('/services'), label: t('All services', 'Όλες οι υπηρεσίες') },
  };

  const industries: NavMenu = {
    id: 'industries',
    label: t('Industries', 'Κλάδοι'),
    columns: [
      {
        title: t('Tourism', 'Τουρισμός'),
        items: [
          { href: lp('/solutions/hotels'), label: t('Hotels & hospitality', 'Ξενοδοχεία'), desc: t('Direct bookings from search', 'Απευθείας κρατήσεις από την αναζήτηση'), icon: 'hotel', badge: POPULAR },
          { href: lp('/solutions/villas-apartments'), label: t('Villas & apartments', 'Βίλες & καταλύματα'), desc: t('Fewer OTA commissions', 'Λιγότερες προμήθειες σε OTA'), icon: 'home' },
          { href: lp('/solutions/rent-a-car'), label: t('Rent-a-car', 'Ενοικίαση αυτοκινήτων'), desc: t('Bookings before the ferry lands', 'Κρατήσεις πριν δέσει το πλοίο'), icon: 'car' },
          { href: lp('/solutions/tour-operators'), label: t('Tours & activities', 'Εκδρομές & δραστηριότητες'), desc: t('Sell out the season', 'Γεμάτη σεζόν'), icon: 'compass' },
          { href: lp('/solutions/restaurants'), label: t('Restaurants', 'Εστιατόρια'), desc: t('Top of “near me” searches', 'Πρώτοι στο «κοντά μου»'), icon: 'utensils' },
        ],
      },
      {
        title: t('Local businesses', 'Τοπικές επιχειρήσεις'),
        items: [
          { href: lp('/solutions/real-estate'), label: t('Real estate', 'Μεσιτικά γραφεία'), desc: t('Leads from property searches', 'Πελάτες από αναζητήσεις ακινήτων'), icon: 'building' },
          { href: lp('/solutions/lawyers'), label: t('Law firms', 'Δικηγορικά γραφεία'), desc: t('Clients who search by case', 'Πελάτες που ψάχνουν ανά υπόθεση'), icon: 'scale' },
          { href: lp('/solutions/dentists'), label: t('Dentists & clinics', 'Οδοντίατροι & κλινικές'), desc: t('Booked appointments, locally', 'Ραντεβού από την περιοχή σας'), icon: 'tooth' },
          { href: lp('/solutions'), label: t('All industries', 'Όλοι οι κλάδοι'), desc: t('See every sector we serve', 'Όλοι οι κλάδοι που εξυπηρετούμε'), icon: 'grid' },
        ],
      },
    ],
    feature: {
      tone: 'proof',
      eyebrow: t('Case studies', 'Αποτελέσματα'),
      title: t('Real results from Search Console', 'Πραγματικά αποτελέσματα από το Search Console'),
      body: t(
        'Hotels, villas and rental companies across the Greek islands. Every number comes from the client’s own data.',
        'Ξενοδοχεία, βίλες και εταιρείες ενοικίασης στα νησιά. Κάθε νούμερο προέρχεται από τα δεδομένα του πελάτη.',
      ),
      points: [
        t('Greek and English sites, both ranked', 'Ελληνικές και αγγλικές σελίδες, και οι δύο στην κορυφή'),
        t('Direct bookings, not just traffic', 'Απευθείας κρατήσεις, όχι απλώς επισκέψεις'),
        t('Monthly reports you can check', 'Μηνιαίες αναφορές που ελέγχετε'),
      ],
      primary: { href: lp('/work'), label: t('See our work', 'Δείτε τη δουλειά μας') },
      secondary: { href: freeAudit.href, label: freeAudit.label },
    },
  };

  const software: NavMenu = {
    id: 'software',
    label: 'GSC Boost',
    badge: NEW,
    columns: [
      {
        title: t('The product', 'Το προϊόν'),
        items: [
          { href: lp('/platform/features#opportunities'), label: t('Opportunities', 'Ευκαιρίες'), desc: t('Ranked fixes with click estimates', 'Διορθώσεις με εκτίμηση κλικ'), icon: 'sparkles', badge: POPULAR },
          { href: lp('/platform/features#performance'), label: t('Performance', 'Απόδοση'), desc: t('Every traffic change, explained', 'Κάθε αλλαγή, εξηγημένη'), icon: 'chart' },
          { href: lp('/platform/features#keywords'), label: t('Keywords & rank tracking', 'Λέξεις-κλειδιά & θέσεις'), desc: t('Find demand, track wins', 'Βρείτε ζήτηση, μετρήστε θέσεις'), icon: 'key' },
          { href: lp('/platform/features#content'), label: t('Content studio', 'Περιεχόμενο'), desc: t('Brief, write, publish to WordPress', 'Brief, γράψιμο, δημοσίευση'), icon: 'file' },
          { href: lp('/platform/features#audit'), label: t('Site audit', 'Έλεγχος ιστότοπου'), desc: t('Technical issues, prioritised', 'Τεχνικά θέματα με προτεραιότητα'), icon: 'shield' },
        ],
      },
      {
        title: t('Go further', 'Περισσότερα'),
        items: [
          { href: lp('/platform/features#ai-visibility'), label: t('AI visibility', 'Ορατότητα σε AI'), desc: t('When ChatGPT and Gemini cite you', 'Πότε σας αναφέρουν ChatGPT και Gemini'), icon: 'bot', badge: AI },
          { href: lp('/platform/features#assistant'), label: t('AI assistant', 'Βοηθός AI'), desc: t('Answers from your own data', 'Απαντήσεις από τα δεδομένα σας'), icon: 'message', badge: AI },
          { href: lp('/platform/features#competitors'), label: t('Competitors', 'Ανταγωνιστές'), desc: t('Their wins, your gaps', 'Τα δικά τους κέρδη, τα δικά σας κενά'), icon: 'swords' },
          { href: lp('/platform/for/agencies'), label: t('For agencies', 'Για agencies'), desc: t('Clients, pipeline and reports', 'Πελάτες, pipeline και αναφορές'), icon: 'users' },
          { href: lp('/platform/pricing'), label: t('Plans & pricing', 'Πακέτα & τιμές'), desc: t('Start free, upgrade when it pays', 'Ξεκινήστε δωρεάν'), icon: 'tag', badge: FREE },
        ],
      },
    ],
    feature: {
      tone: 'software',
      eyebrow: t('New · do it yourself', 'Νέο · μόνοι σας'),
      title: t('Search Console, turned into a growth plan', 'Το Search Console, ως πλάνο ανάπτυξης'),
      body: t(
        'Connect Google once, read-only, and get the fixes that win the most clicks, ranked and estimated.',
        'Συνδέστε τη Google μία φορά, μόνο για ανάγνωση, και πάρτε τις διορθώσεις που φέρνουν τα περισσότερα κλικ.',
      ),
      primary: { href: signup, label: startFree.label, external: true },
      secondary: { href: demo, label: t('Explore the live demo', 'Ζωντανή επίδειξη'), external: true },
    },
    footer: { href: lp('/platform'), label: t('GSC Boost overview', 'Επισκόπηση GSC Boost') },
  };

  const learn: NavMenu = {
    id: 'learn',
    label: t('Learn', 'Μάθετε'),
    columns: [
      {
        title: t('Free tools', 'Δωρεάν εργαλεία'),
        items: [
          { href: `${lp('/')}#scan-url`, label: t('Instant site scan', 'Άμεσος έλεγχος ιστοσελίδας'), desc: t('13 checks, no sign-up', '13 έλεγχοι, χωρίς εγγραφή'), icon: 'scan', badge: FREE },
          { href: lp('/ai-visibility-check'), label: t('AI visibility check', 'Έλεγχος ορατότητας σε AI'), desc: t('Do AI assistants mention you?', 'Σας αναφέρουν οι βοηθοί AI;'), icon: 'bot', badge: FREE },
          { href: lp('/tools'), label: t('All SEO tools', 'Όλα τα εργαλεία SEO'), icon: 'grid' },
        ],
      },
      {
        title: t('Guides', 'Οδηγοί'),
        items: [
          { href: lp('/blog'), label: 'Blog', desc: t('SEO, AI search and web design', 'SEO, αναζήτηση AI, ιστοσελίδες'), icon: 'book' },
          { href: lp('/resources'), label: t('Resources', 'Οδηγοί & υλικό'), icon: 'library' },
          { href: lp('/glossary'), label: t('SEO glossary', 'Λεξικό SEO'), icon: 'list' },
          { href: lp('/compare'), label: t('Comparisons', 'Συγκρίσεις'), icon: 'swords' },
        ],
      },
    ],
    feature: {
      tone: 'agency',
      eyebrow: t('Talk to a person', 'Μιλήστε με άνθρωπο'),
      title: t('Not sure where to start?', 'Δεν ξέρετε από πού να ξεκινήσετε;'),
      body: t('Send us your site and one question. We reply within 24 hours, in Greek or English.', 'Στείλτε την ιστοσελίδα σας και μία ερώτηση. Απαντάμε σε 24 ώρες.'),
      primary: { href: lp('/contact'), label: t('Contact us', 'Επικοινωνία') },
      secondary: { href: lp('/about'), label: t('About us', 'Ποιοι είμαστε') },
    },
  };

  return {
    menus: [services, industries, software, learn],
    links: [
      { href: lp('/pricing'), label: t('Pricing', 'Τιμές') },
      { href: lp('/work'), label: t('Work', 'Έργα') },
    ],
    promo: {
      href: lp('/platform'),
      tag: t('New', 'Νέο'),
      text: t('GSC Boost: your Search Console as a to-do list', 'GSC Boost: το Search Console ως λίστα ενεργειών'),
    },
    freeAudit,
    startFree,
  };
}
