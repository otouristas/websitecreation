import type { ReactNode } from 'react';
import {
  Bot,
  ClipboardCheck,
  FileText,
  Gauge,
  Globe,
  Link2,
  MapPin,
  Palette,
  RefreshCw,
  Search,
  ShoppingCart,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { MarketingBadgeKind } from '@/components/kit/primitives';
import {
  AiVisibilityPreview,
  AuditPreview,
  CompetitorsPreview,
  ContentPreview,
  KeywordsPreview,
  LocalPackPreview,
  OpportunitiesPreview,
  PerformancePreview,
  ReportPreview,
} from '@/components/kit/previews';
import type { SiteLocale } from '@/lib/i18n/locale';
import {
  BrandKitPreview,
  BuildStagesPreview,
  GbpProfilePreview,
  OwnershipPreview,
  RedirectMapPreview,
  SpeedPreview,
  StorePreview,
} from './previews';

type Copy = { en: string; el: string };
const c = (en: string, el: string): Copy => ({ en, el });

export type ServiceKitConfig = {
  readonly icon: LucideIcon;
  readonly pill: { kind: MarketingBadgeKind; tag: Copy | string; text: Copy; href: string };
  /** Hero visual. `city` is used by local previews on city pages. */
  readonly hero: (l: SiteLocale, city?: string) => ReactNode;
  readonly heroLabel: Copy;
  /** Second visual, beside the "what's included" row. */
  readonly detail: (l: SiteLocale) => ReactNode;
  readonly pricing: 'seo' | 'website' | null;
  readonly addOns: ReadonlyArray<string>;
  /** Show the "Prefer to do it yourself? GSC Boost" row. */
  readonly diy: boolean;
  /** "audit" keeps the free-audit CTA, "quote" asks for a project quote. */
  readonly cta: 'audit' | 'quote';
  readonly wide?: boolean;
};

const freeAudit = '/get-started#free-audit';

export const SERVICE_KIT: Record<string, ServiceKitConfig> = {
  'website-creation': {
    icon: Globe,
    pill: { kind: 'popular', tag: c('Popular', 'Δημοφιλές'), text: c('Mobile-first builds with SEO from day one', 'Mobile-first κατασκευή με SEO από την πρώτη μέρα'), href: '/work' },
    hero: (l) => <AuditPreview locale={l} />,
    heroLabel: c('A pre-launch site audit on a sample hotel website: score, critical issues and Core Web Vitals.', 'Έλεγχος πριν το λανσάρισμα σε δείγμα ιστοσελίδας ξενοδοχείου: βαθμολογία, κρίσιμα θέματα και Core Web Vitals.'),
    detail: (l) => <OwnershipPreview locale={l} />,
    pricing: 'website',
    addOns: [],
    diy: false,
    cta: 'quote',
  },
  'website-redesign': {
    icon: RefreshCw,
    pill: { kind: 'free', tag: c('Free', 'Δωρεάν'), text: c('A free SEO audit before anything moves', 'Δωρεάν έλεγχος SEO πριν αλλάξει οτιδήποτε'), href: freeAudit },
    hero: (l) => <RedirectMapPreview locale={l} />,
    heroLabel: c('A redirect map from a sample redesign: old URLs mapped to new ones before launch.', 'Χάρτης ανακατευθύνσεων από δείγμα ανασχεδιασμού: παλιά URL αντιστοιχισμένα σε νέα πριν το λανσάρισμα.'),
    detail: (l) => <AuditPreview locale={l} />,
    pricing: 'website',
    addOns: [],
    diy: false,
    cta: 'quote',
  },
  'seo-web-design': {
    icon: Search,
    pill: { kind: 'popular', tag: 'SEO', text: c('Architecture, schema and speed built in', 'Αρχιτεκτονική, schema και ταχύτητα από την αρχή'), href: '/seo-services' },
    hero: (l) => <AuditPreview locale={l} />,
    heroLabel: c('A site audit on a sample hotel website.', 'Έλεγχος ιστότοπου σε δείγμα ιστοσελίδας ξενοδοχείου.'),
    detail: (l) => <KeywordsPreview locale={l} />,
    pricing: 'website',
    addOns: [],
    diy: false,
    cta: 'quote',
  },
  'speed-optimization': {
    icon: Gauge,
    pill: { kind: 'free', tag: c('Free', 'Δωρεάν'), text: c('Core Web Vitals checked in the free audit', 'Τα Core Web Vitals ελέγχονται στον δωρεάν έλεγχο'), href: freeAudit },
    hero: (l) => <SpeedPreview locale={l} />,
    heroLabel: c('Core Web Vitals before and after on a sample hotel page.', 'Core Web Vitals πριν και μετά σε δείγμα σελίδας ξενοδοχείου.'),
    detail: (l) => <AuditPreview locale={l} />,
    pricing: null,
    addOns: ['technical-audit', 'maintenance'],
    diy: true,
    cta: 'audit',
  },
  'ai-visibility': {
    icon: Bot,
    pill: { kind: 'ai', tag: c('AI', 'AI'), text: c('Free check: does ChatGPT mention you?', 'Δωρεάν έλεγχος: σας αναφέρει το ChatGPT;'), href: '/ai-visibility-check' },
    hero: (l) => <AiVisibilityPreview locale={l} />,
    heroLabel: c('AI visibility on a sample hotel: which prompts cite or mention it in each AI assistant.', 'Ορατότητα σε AI σε δείγμα ξενοδοχείου: σε ποια ερωτήματα το αναφέρει κάθε βοηθός AI.'),
    detail: (l) => <ContentPreview locale={l} />,
    pricing: 'seo',
    addOns: [],
    diy: true,
    cta: 'audit',
  },
  'logo-design': {
    icon: Palette,
    pill: { kind: 'new', tag: c('Brand', 'Brand'), text: c('Logo and brand kit ready for your new site', 'Λογότυπο και brand kit έτοιμα για το νέο σας site'), href: '/services/website-creation' },
    hero: (l) => <BrandKitPreview locale={l} />,
    heroLabel: c('A sample brand kit: logo, colour palette and file formats.', 'Δείγμα brand kit: λογότυπο, παλέτα χρωμάτων και μορφές αρχείων.'),
    detail: (l) => <BuildStagesPreview locale={l} />,
    pricing: null,
    addOns: ['logo'],
    diy: false,
    cta: 'quote',
    wide: true,
  },
  'content-creation': {
    icon: FileText,
    pill: { kind: 'ai', tag: c('GEO', 'GEO'), text: c('Pages written for Google and for AI answers', 'Σελίδες γραμμένες για τη Google και τις απαντήσεις AI'), href: '/services/ai-visibility' },
    hero: (l) => <ContentPreview locale={l} />,
    heroLabel: c('A content brief and optimizer score for a sample travel guide.', 'Brief περιεχομένου και βαθμολογία βελτιστοποίησης για δείγμα ταξιδιωτικού οδηγού.'),
    detail: (l) => <KeywordsPreview locale={l} />,
    pricing: 'seo',
    addOns: ['content-page'],
    diy: true,
    cta: 'audit',
    wide: true,
  },
  'local-seo': {
    icon: MapPin,
    pill: { kind: 'popular', tag: c('Local', 'Τοπικό'), text: c('Get found on Google Maps where you work', 'Εμφανιστείτε στους Χάρτες Google εκεί που δουλεύετε'), href: '/locations' },
    hero: (l, city) => <LocalPackPreview locale={l} city={city} />,
    heroLabel: c('Google Maps results for a sample hotel search, with the client in first place.', 'Αποτελέσματα Χαρτών Google για δείγμα αναζήτησης ξενοδοχείου, με τον πελάτη πρώτο.'),
    detail: (l) => <GbpProfilePreview locale={l} />,
    pricing: 'seo',
    addOns: [],
    diy: true,
    cta: 'audit',
  },
  'link-building': {
    icon: Link2,
    pill: { kind: 'save', tag: c('White-hat', 'White-hat'), text: c('Editorial links, never spam directories', 'Editorial σύνδεσμοι, ποτέ spam κατάλογοι'), href: '/seo-services' },
    hero: (l) => <CompetitorsPreview locale={l} />,
    heroLabel: c('A keyword gap against three sample competitors.', 'Κενό λέξεων-κλειδιών απέναντι σε τρεις ανταγωνιστές (δείγμα).'),
    detail: (l) => <ReportPreview locale={l} />,
    pricing: 'seo',
    addOns: [],
    diy: false,
    cta: 'audit',
  },
  'seo-audits': {
    icon: ClipboardCheck,
    pill: { kind: 'free', tag: c('Free', 'Δωρεάν'), text: c('Start with a free SEO audit in 24 hours', 'Ξεκινήστε με δωρεάν έλεγχο SEO σε 24 ώρες'), href: freeAudit },
    hero: (l) => <AuditPreview locale={l} />,
    heroLabel: c('A site audit on a sample hotel website: score, critical issues and Core Web Vitals.', 'Έλεγχος ιστότοπου σε δείγμα ιστοσελίδας ξενοδοχείου: βαθμολογία, κρίσιμα θέματα και Core Web Vitals.'),
    detail: (l) => <OpportunitiesPreview locale={l} />,
    pricing: 'seo',
    addOns: ['technical-audit', 'advanced-audit'],
    diy: true,
    cta: 'audit',
  },
  'eshop-woocommerce': {
    icon: ShoppingCart,
    pill: { kind: 'popular', tag: 'Woo', text: c('Stores built to rank, load fast and sell', 'Καταστήματα που κατατάσσονται, φορτώνουν γρήγορα και πουλάνε'), href: '/work' },
    hero: (l) => <StorePreview locale={l} />,
    heroLabel: c('Store health for a sample WooCommerce shop.', 'Υγεία καταστήματος για δείγμα WooCommerce e-shop.'),
    detail: (l) => <PerformancePreview locale={l} />,
    pricing: 'website',
    addOns: ['ecommerce'],
    diy: false,
    cta: 'quote',
  },
  'eshop-seo': {
    icon: TrendingUp,
    pill: { kind: 'free', tag: c('Free', 'Δωρεάν'), text: c('A free audit of your categories and products', 'Δωρεάν έλεγχος κατηγοριών και προϊόντων'), href: freeAudit },
    hero: (l) => <OpportunitiesPreview locale={l} />,
    heroLabel: c('Ranked SEO opportunities on a sample site.', 'Ευκαιρίες SEO με σειρά σε δείγμα ιστότοπου.'),
    detail: (l) => <StorePreview locale={l} />,
    pricing: 'seo',
    addOns: [],
    diy: true,
    cta: 'audit',
  },
};

export function getServiceKit(slug: string): ServiceKitConfig {
  return SERVICE_KIT[slug] ?? SERVICE_KIT['seo-audits'];
}

/** Resolve a Copy or a plain (untranslated brand) string. */
export function pick(v: Copy | string, l: SiteLocale): string {
  return typeof v === 'string' ? v : v[l];
}
