import type { SiteLocale } from '@/lib/i18n/locale';
import {
  VAT_RATE,
  addOns,
  currentPrice,
  formatPrice,
  seoPackages,
  withVat,
} from '@/data/pricing';

/**
 * The six services on /seo-services, and the copy for the three spokes that
 * do not already have a commercial page.
 *
 * Audit, local SEO and link building stay on /services/seo-audits,
 * /services/local-seo and /services/link-building. Technical, on-page and
 * strategy live at /seo-services/<slug>. Those three slugs must not be added
 * to `src/data/services.ts`: that array is the axis of the city-page matrix.
 *
 * Every euro figure is read from `src/data/pricing.ts` at render time.
 * Nothing here is a client result, a testimonial or a made-up number.
 */

export const SPOKE_SLUGS = ['technical', 'on-page', 'strategy'] as const;
export type SpokeSlug = (typeof SPOKE_SLUGS)[number];

export function isSpokeSlug(slug: string): slug is SpokeSlug {
  return (SPOKE_SLUGS as readonly string[]).includes(slug);
}

export interface SeoServiceCard {
  readonly id: 'audit' | 'technical' | 'on-page' | 'local' | 'links' | 'strategy';
  readonly title: string;
  readonly body: string;
  /** Locale-less path. CardGrid prefixes the locale. */
  readonly href: string;
}

export interface SpokeSection {
  readonly title: string;
  readonly body: string;
}

export interface SpokeFaq {
  readonly question: string;
  readonly answer: string;
}

export interface SpokePageCopy {
  readonly slug: SpokeSlug;
  readonly eyebrow: string;
  readonly h1: string;
  readonly lead: string;
  readonly extra: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly serviceType: string;
  readonly includes: { readonly title: string; readonly intro: string; readonly items: readonly SpokeSection[] };
  readonly process: { readonly title: string; readonly intro: string; readonly steps: readonly SpokeSection[] };
  readonly pricing: { readonly title: string; readonly intro: string; readonly note: string };
  readonly otherTitle: string;
  readonly otherIntro: string;
  readonly faqs: readonly SpokeFaq[];
  readonly faqTitle: string;
  readonly relatedTitle: string;
  readonly cta: { readonly title: string; readonly body: string; readonly primary: string; readonly secondary: string };
  /** Existing guide. Locale-less path. */
  readonly guide: { readonly href: string; readonly label: string };
}

export interface PublishedSpokePrices {
  /** SEO Foundations, the live monthly list price, net + VAT + gross. */
  readonly foundations: string;
  /** Technical SEO audit add-on, a from-price, net + VAT + gross. */
  readonly audit: string;
  readonly foundationsNet: number;
  readonly auditNet: number;
}

function vatPhrase(locale: SiteLocale): string {
  const pct = Math.round(VAT_RATE * 100);
  return locale === 'el' ? `ΦΠΑ ${pct}%` : `${pct}% VAT`;
}

function money(amount: number, locale: SiteLocale): string {
  return `€${formatPrice(amount, locale)}`;
}

/**
 * The two prices the spokes are allowed to quote, formatted from the live list.
 * Foundations uses the price charged today (regular once the offer window has
 * closed). The audit add-on is a from-price.
 */
export function publishedSpokePrices(locale: SiteLocale): PublishedSpokePrices {
  const foundations = seoPackages.find((tier) => tier.id === 'foundations');
  const audit = addOns.find((item) => item.id === 'technical-audit');
  if (!foundations || !audit) {
    throw new Error('Published SEO price list is missing Foundations or the technical audit add-on.');
  }
  const net = currentPrice(foundations);
  const per = locale === 'el' ? '/μήνα' : '/month';
  const incl = locale === 'el' ? 'με ΦΠΑ' : 'incl. VAT';
  const vat = vatPhrase(locale);
  const from = locale === 'el' ? 'από ' : 'from ';
  return {
    foundationsNet: net,
    auditNet: audit.from,
    foundations: `${money(net, locale)}${per} + ${vat} (${money(withVat(net), locale)} ${incl})`,
    audit: `${from}${money(audit.from, locale)} + ${vat} (${money(withVat(audit.from), locale)} ${incl})`,
  };
}

/** Replace {{FOUNDATIONS}} and {{AUDIT}} in authored spoke copy. */
export function fillSpokePrices(text: string, locale: SiteLocale): string {
  const prices = publishedSpokePrices(locale);
  return text.replace(/\{\{FOUNDATIONS\}\}/g, prices.foundations).replace(/\{\{AUDIT\}\}/g, prices.audit);
}

const cards: Record<SiteLocale, readonly SeoServiceCard[]> = {
  en: [
    {
      id: 'audit',
      title: 'SEO audit',
      href: '/services/seo-audits',
      body: 'A prioritised review of what blocks the site, with a fix list you can run yourself or hand to us.',
    },
    {
      id: 'technical',
      title: 'Technical SEO',
      href: '/seo-services/technical',
      body: 'Crawl, indexation, speed, canonicals and structured data, in that order, so the pages that sell can be read.',
    },
    {
      id: 'on-page',
      title: 'On-page SEO',
      href: '/seo-services/on-page',
      body: 'Title tags, headings and copy on the pages that can bring a customer, mapped to the search each page should own.',
    },
    {
      id: 'local',
      title: 'Local SEO',
      href: '/services/local-seo',
      body: 'Google Business Profile, consistent contact details and location pages for searches that end in a call or a visit.',
    },
    {
      id: 'links',
      title: 'Link building',
      href: '/services/link-building',
      body: 'Relevant editorial links and digital PR. Not directories bought in bulk.',
    },
    {
      id: 'strategy',
      title: 'SEO strategy',
      href: '/seo-services/strategy',
      body: 'Which pages to build, which to fix, and what happens each month, from your own Search Console data.',
    },
  ],
  el: [
    {
      id: 'audit',
      title: 'SEO audit',
      href: '/services/seo-audits',
      body: 'Προτεραιοποιημένος έλεγχος του τι εμποδίζει την ιστοσελίδα, με λίστα διορθώσεων που μπορείτε να υλοποιήσετε μόνοι σας ή να μας την αναθέσετε.',
    },
    {
      id: 'technical',
      title: 'Τεχνικό SEO',
      href: '/seo-services/technical',
      body: 'Crawl, ευρετηρίαση, ταχύτητα, canonical και structured data, με αυτή τη σειρά, ώστε οι σελίδες που πουλάνε να διαβάζονται.',
    },
    {
      id: 'on-page',
      title: 'On-page SEO',
      href: '/seo-services/on-page',
      body: 'Title tags, επικεφαλίδες και κείμενο στις σελίδες που μπορούν να φέρουν πελάτη, αντιστοιχισμένα στην αναζήτηση που πρέπει να κερδίσει η καθεμία.',
    },
    {
      id: 'local',
      title: 'Τοπικό SEO',
      href: '/services/local-seo',
      body: 'Google Business Profile, ίδια στοιχεία επικοινωνίας παντού και σελίδες περιοχής για αναζητήσεις που καταλήγουν σε τηλεφώνημα ή επίσκεψη.',
    },
    {
      id: 'links',
      title: 'Link building',
      href: '/services/link-building',
      body: 'Σχετικοί editorial σύνδεσμοι και digital PR. Όχι κατάλογοι που αγοράζονται μαζικά.',
    },
    {
      id: 'strategy',
      title: 'Στρατηγική SEO',
      href: '/seo-services/strategy',
      body: 'Ποιες σελίδες φτιάχνονται, ποιες διορθώνονται και τι γίνεται κάθε μήνα, με βάση τα δεδομένα του Search Console σας.',
    },
  ],
};

export function getSeoServiceCards(locale: SiteLocale): readonly SeoServiceCard[] {
  return cards[locale];
}

export function getSeoHubServicesBlock(locale: SiteLocale): {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
} {
  const prices = publishedSpokePrices(locale);
  if (locale === 'el') {
    return {
      eyebrow: 'Υπηρεσίες',
      title: 'Έξι υπηρεσίες, καθεμία στη δική της σελίδα',
      description: `Έλεγχος, τεχνικό SEO, on-page, τοπικό SEO, link building και στρατηγική. Η μηνιαία δουλειά ξεκινά με το SEO Foundations στα ${prices.foundations}. Ένας τεχνικός έλεγχος μόνος του είναι ${prices.audit}.`,
    };
  }
  return {
    eyebrow: 'Services',
    title: 'Six services, each on its own page',
    description: `Audit, technical SEO, on-page, local SEO, link building and strategy. Monthly work starts with SEO Foundations at ${prices.foundations}. A technical audit on its own is ${prices.audit}.`,
  };
}

const spokes: Record<SpokeSlug, Record<SiteLocale, Omit<SpokePageCopy, 'slug'>>> = {
  technical: {
    en: {
      eyebrow: 'Technical SEO',
      h1: 'Technical SEO so Google can read the pages that sell',
      lead:
        'Technical SEO removes what stops Google crawling, reading and indexing the pages that sell: indexation errors, canonicals, speed and Core Web Vitals, structured data that matches the visible page, and the internal links between those pages.',
      extra:
        'The ongoing fixes are part of the monthly SEO engagement. A one-off technical audit is a separate add-on on the published price list.',
      metaTitle: 'Technical SEO for indexation',
      metaDescription:
        'Technical SEO for crawl, indexation, Core Web Vitals and structured data that matches the page. The monthly work sits in the published SEO package.',
      primaryKeyword: 'technical SEO',
      serviceType: 'Technical SEO',
      includes: {
        title: 'What technical SEO covers',
        intro:
          'Four areas. None of them is a ranking promise. They are the conditions under which the rest of the SEO work can be read.',
        items: [
          {
            title: 'Crawl and indexation',
            body:
              'robots.txt, XML sitemaps, canonicals, soft 404s, and pages that should be in the index but are not. If Google cannot fetch the page, nothing else on it matters.',
          },
          {
            title: 'Speed and Core Web Vitals',
            body:
              'Template-level speed on the pages people use to enquire or book, measured as Core Web Vitals rather than a single lab score.',
          },
          {
            title: 'Structured data',
            body:
              'Markup that matches what a visitor can already see. We do not mark up ratings, prices or claims the page does not show.',
          },
          {
            title: 'Internal links',
            body:
              'A path from supporting pages to the commercial pages, so crawlers and visitors both reach the URLs that can bring a customer.',
          },
        ],
      },
      process: {
        title: 'How the technical work runs',
        intro: 'The order is fixed. Indexation before new pages.',
        steps: [
          {
            title: 'Audit and a prioritised list',
            body:
              'The technical audit produces a fix list in order, not every warning a crawler can emit. Foundations includes this audit. It can also be bought on its own.',
          },
          {
            title: 'Fixes that unblock indexing',
            body:
              'Canonicals, status codes, sitemaps and blocked URLs come before content expansion. A new page on a site Google cannot crawl does not get a chance to rank.',
          },
          {
            title: 'Speed on the pages that convert',
            body:
              'Core Web Vitals work targets the templates behind enquiries and bookings. We then recheck field data rather than a one-off lab run.',
          },
          {
            title: 'Recheck in Search Console',
            body:
              'Each shipped fix is confirmed in Search Console and a fresh crawl before the next item on the list starts.',
          },
        ],
      },
      pricing: {
        title: 'What technical SEO costs',
        intro:
          'Two published prices cover this work. Monthly technical SEO is part of SEO Foundations. A standalone technical audit is the add-on. A wider audit is a separate line on the pricing page.',
        note:
          'The minimum monthly engagement is {{MONTHS}} months, then it renews month to month. The audit add-on is one-off, and the "from" means scope changes the final figure.',
      },
      otherTitle: 'The other five services',
      otherIntro: 'Technical SEO is one part of the hub. The others have their own pages.',
      faqTitle: 'Questions about technical SEO',
      faqs: [
        {
          question: 'What is technical SEO?',
          answer:
            'It is the work that lets a search engine fetch, understand and index the pages you want customers to find. It covers crawl and indexation, canonicals, speed, structured data and internal links.',
        },
        {
          question: 'Is the technical audit the same as monthly technical SEO?',
          answer:
            'No. The audit is a one-off review and a prioritised fix list. Monthly technical SEO is the work of shipping those fixes, and the new ones that appear, inside the retainer.',
        },
        {
          question: 'How much does technical SEO cost?',
          answer:
            'Monthly work is SEO Foundations at {{FOUNDATIONS}}. A standalone technical audit is {{AUDIT}}. Both are the published list prices. The cards on this page show the same totals.',
        },
        {
          question: 'Do you guarantee a ranking from technical fixes?',
          answer:
            'No. Technical fixes remove barriers. They do not control how Google ranks pages, and we do not promise a position.',
        },
      ],
      relatedTitle: 'Related pages',
      cta: {
        title: 'Start with the audit, then the fixes',
        body:
          'Send the site. We look at indexation and the pages that should be bringing customers, and we come back with what to fix and what it costs.',
        primary: 'Request a free audit',
        secondary: 'See the price list',
      },
      guide: { href: '/blog/technical-seo-guide', label: 'Technical SEO guide' },
    },
    el: {
      eyebrow: 'Τεχνικό SEO',
      h1: 'Τεχνικό SEO ώστε η Google να διαβάζει τις σελίδες που πουλάνε',
      lead:
        'Το τεχνικό SEO αφαιρεί ό,τι εμποδίζει τη Google να κάνει crawl, να διαβάσει και να ευρετηριάσει τις σελίδες που πουλάνε: σφάλματα ευρετηρίασης, canonical, ταχύτητα και Core Web Vitals, structured data που συμφωνούν με τη σελίδα, και οι εσωτερικοί σύνδεσμοι ανάμεσά τους.',
      extra:
        'Οι συνεχείς διορθώσεις ανήκουν στη μηνιαία συνεργασία SEO. Ένας εφάπαξ τεχνικός έλεγχος είναι ξεχωριστό πρόσθετο στον δημοσιευμένο τιμοκατάλογο.',
      metaTitle: 'Τεχνικό SEO: crawl και ευρετηρίαση',
      metaDescription:
        'Τεχνικό SEO για crawl, ευρετηρίαση, Core Web Vitals και structured data που συμφωνούν με τη σελίδα. Η μηνιαία δουλειά ανήκει στο δημοσιευμένο πακέτο SEO.',
      primaryKeyword: 'τεχνικό SEO',
      serviceType: 'Technical SEO',
      includes: {
        title: 'Τι καλύπτει το τεχνικό SEO',
        intro:
          'Τέσσερις περιοχές. Καμία δεν είναι υπόσχεση κατάταξης. Είναι οι συνθήκες για να διαβαστεί η υπόλοιπη δουλειά SEO.',
        items: [
          {
            title: 'Crawl και ευρετηρίαση',
            body:
              'robots.txt, XML sitemap, canonical, soft 404 και σελίδες που πρέπει να είναι στο ευρετήριο αλλά δεν είναι. Αν η Google δεν μπορεί να φέρει τη σελίδα, τίποτα άλλο πάνω της δεν μετράει.',
          },
          {
            title: 'Ταχύτητα και Core Web Vitals',
            body:
              'Ταχύτητα στο πρότυπο των σελίδων από τις οποίες ζητούν προσφορά ή κλείνουν κράτηση, μετρημένη ως Core Web Vitals και όχι ως ένας βαθμός εργαστηρίου.',
          },
          {
            title: 'Structured data',
            body:
              'Markup που συμφωνεί με ό,τι βλέπει ήδη ο επισκέπτης. Δεν σημειώνουμε βαθμολογίες, τιμές ή ισχυρισμούς που η σελίδα δεν δείχνει.',
          },
          {
            title: 'Εσωτερικοί σύνδεσμοι',
            body:
              'Διαδρομή από τις υποστηρικτικές σελίδες προς τις εμπορικές, ώστε και οι crawlers και οι επισκέπτες να φτάνουν στα URL που μπορούν να φέρουν πελάτη.',
          },
        ],
      },
      process: {
        title: 'Πώς τρέχει η τεχνική δουλειά',
        intro: 'Η σειρά είναι σταθερή. Πρώτα η ευρετηρίαση, μετά οι νέες σελίδες.',
        steps: [
          {
            title: 'Έλεγχος και ιεραρχημένη λίστα',
            body:
              'Ο τεχνικός έλεγχος παραδίδει λίστα διορθώσεων με σειρά, όχι κάθε προειδοποίηση που μπορεί να εκδώσει ένας crawler. Το Foundations τον περιλαμβάνει. Μπορεί να αγοραστεί και μόνος του.',
          },
          {
            title: 'Διορθώσεις που ανοίγουν την ευρετηρίαση',
            body:
              'Canonical, κωδικοί κατάστασης, sitemap και αποκλεισμένα URL πριν από επέκταση περιεχομένου. Μια νέα σελίδα σε site που η Google δεν μπορεί να διαβάσει δεν προλαβαίνει να καταταχθεί.',
          },
          {
            title: 'Ταχύτητα στις σελίδες που μετατρέπουν',
            body:
              'Η δουλειά στα Core Web Vitals στοχεύει τα πρότυπα πίσω από αιτήματα και κρατήσεις. Μετά ελέγχουμε τα δεδομένα πεδίου, όχι μία μέτρηση εργαστηρίου.',
          },
          {
            title: 'Επανέλεγχος στο Search Console',
            body:
              'Κάθε διόρθωση επιβεβαιώνεται στο Search Console και σε νέο crawl πριν ξεκινήσει το επόμενο στοιχείο της λίστας.',
          },
        ],
      },
      pricing: {
        title: 'Τι κοστίζει το τεχνικό SEO',
        intro:
          'Δύο δημοσιευμένες τιμές καλύπτουν αυτή τη δουλειά. Το μηνιαίο τεχνικό SEO ανήκει στο SEO Foundations. Ένας αυτόνομος τεχνικός έλεγχος είναι το πρόσθετο. Ένας ευρύτερος έλεγχος είναι ξεχωριστή γραμμή στη σελίδα τιμών.',
        note:
          'Η ελάχιστη μηνιαία συνεργασία είναι {{MONTHS}} μήνες και μετά ανανεώνεται μήνα με τον μήνα. Το πρόσθετο του ελέγχου είναι εφάπαξ, και το «από» σημαίνει ότι το εύρος αλλάζει την τελική τιμή.',
      },
      otherTitle: 'Οι άλλες πέντε υπηρεσίες',
      otherIntro: 'Το τεχνικό SEO είναι ένα μέρος του κόμβου. Οι υπόλοιπες έχουν δική τους σελίδα.',
      faqTitle: 'Ερωτήσεις για το τεχνικό SEO',
      faqs: [
        {
          question: 'Τι είναι το τεχνικό SEO;',
          answer:
            'Είναι η δουλειά που επιτρέπει σε μια μηχανή αναζήτησης να φέρει, να καταλάβει και να ευρετηριάσει τις σελίδες που θέλετε να βρίσκουν οι πελάτες. Καλύπτει crawl και ευρετηρίαση, canonical, ταχύτητα, structured data και εσωτερικούς συνδέσμους.',
        },
        {
          question: 'Ο τεχνικός έλεγχος είναι το ίδιο με το μηνιαίο τεχνικό SEO;',
          answer:
            'Όχι. Ο έλεγχος είναι εφάπαξ ανασκόπηση και ιεραρχημένη λίστα διορθώσεων. Το μηνιαίο τεχνικό SEO είναι η υλοποίηση αυτών των διορθώσεων, και των νέων που εμφανίζονται, μέσα στη μηνιαία συνεργασία.',
        },
        {
          question: 'Πόσο κοστίζει το τεχνικό SEO;',
          answer:
            'Η μηνιαία δουλειά είναι το SEO Foundations στα {{FOUNDATIONS}}. Ένας αυτόνομος τεχνικός έλεγχος είναι {{AUDIT}}. Και οι δύο τιμές είναι ο δημοσιευμένος τιμοκατάλογος. Οι κάρτες σε αυτή τη σελίδα δείχνουν τα ίδια σύνολα.',
        },
        {
          question: 'Δίνετε εγγύηση κατάταξης από τις τεχνικές διορθώσεις;',
          answer:
            'Όχι. Οι τεχνικές διορθώσεις αφαιρούν εμπόδια. Δεν ελέγχουν το πώς κατατάσσει τις σελίδες η Google και δεν υποσχόμαστε θέση.',
        },
      ],
      relatedTitle: 'Σχετικές σελίδες',
      cta: {
        title: 'Ξεκινήστε από τον έλεγχο, μετά τις διορθώσεις',
        body:
          'Στείλτε την ιστοσελίδα. Κοιτάμε την ευρετηρίαση και τις σελίδες που θα έπρεπε να φέρνουν πελάτες, και επιστρέφουμε με το τι διορθώνεται και τι κοστίζει.',
        primary: 'Ζητήστε δωρεάν έλεγχο',
        secondary: 'Δείτε τον τιμοκατάλογο',
      },
      guide: { href: '/blog/techniko-seo', label: 'Οδηγός τεχνικού SEO' },
    },
  },
  'on-page': {
    en: {
      eyebrow: 'On-page SEO',
      h1: 'On-page SEO for the pages that can bring a customer',
      lead:
        'On-page SEO is the page itself. The title tag, the headings, the copy and the internal links are written for the one search that page should own. One commercial cluster, one URL.',
      extra:
        'It is part of the monthly Foundations engagement, and it starts after the technical issues that stop those pages being indexed.',
      metaTitle: 'On-page SEO for commercial pages',
      metaDescription:
        'On-page SEO for the title tag, headings and copy on the pages that can bring a customer. One search, one URL. Included in the monthly SEO package.',
      primaryKeyword: 'on-page SEO',
      serviceType: 'On-page SEO',
      includes: {
        title: 'What on-page SEO covers',
        intro: 'The work is on the pages that can convert, not a rewrite of the whole site for its own sake.',
        items: [
          {
            title: 'A keyword-to-page map',
            body:
              'Built from your Search Console queries and the pages that already receive them. A generic volume export is not the starting point.',
          },
          {
            title: 'Title tags and headings',
            body:
              'The query the page should own is visible in the title tag and the H1, and the first screen answers it.',
          },
          {
            title: 'Copy that matches the search',
            body:
              'Service pages and location pages that answer what someone asks just before they request a quote, in the language of that market.',
          },
          {
            title: 'Internal links with a job',
            body:
              'Supporting pages point at the commercial URL they belong with, using anchor text that describes the destination.',
          },
        ],
      },
      process: {
        title: 'How on-page work runs',
        intro: 'Pick the URLs, rewrite the ones that can convert, then read what Search Console does with them.',
        steps: [
          {
            title: 'Choose the pages',
            body:
              'We list the URLs that can bring an enquiry or a booking, and the queries each one should own. Pages that overlap get separated or merged.',
          },
          {
            title: 'Rewrite the ones that can convert',
            body:
              'The title tag, the headings and the opening answer change first. The rest of the page follows the same query, without a second page competing for it.',
          },
          {
            title: 'Connect them',
            body:
              'Internal links are added from the pages a visitor has already read to the page that can take the enquiry.',
          },
          {
            title: 'Read the result in Search Console',
            body:
              'The next month looks at clicks and queries on those URLs. A page that gains impressions and no clicks gets a new title, not more of the same paragraph.',
          },
        ],
      },
      pricing: {
        title: 'What on-page SEO costs',
        intro:
          'There is no separate on-page package. The work is included in SEO Foundations. The technical audit add-on is the one-off review that shows which of these pages are blocked before the copy changes. Extra pages, when the scope needs them, are the additional content-page add-on on the pricing page.',
        note:
          'The minimum monthly engagement is {{MONTHS}} months, then it renews month to month. The audit add-on is one-off, and the "from" means scope changes the final figure.',
      },
      otherTitle: 'The other five services',
      otherIntro: 'On-page SEO sits between the technical work and the monthly plan.',
      faqTitle: 'Questions about on-page SEO',
      faqs: [
        {
          question: 'What is on-page SEO?',
          answer:
            'It is the work on the page itself: the title tag, the headings, the copy and the internal links, written so the page answers one commercial search.',
        },
        {
          question: 'How is it different from technical SEO?',
          answer:
            'Technical SEO decides whether Google can fetch and index the page. On-page SEO decides whether that page answers the search it is meant to win.',
        },
        {
          question: 'How much does on-page SEO cost?',
          answer:
            'It is included in SEO Foundations at {{FOUNDATIONS}}. There is no separate on-page fee. The technical audit add-on, {{AUDIT}}, is the one-off review that precedes it when the pages are blocked.',
        },
        {
          question: 'Do you publish a set number of pages a month?',
          answer:
            'No number is on the price list, so we do not advertise one. The monthly list names the pages. Extra pages are priced as the additional content-page add-on on the pricing page.',
        },
      ],
      relatedTitle: 'Related pages',
      cta: {
        title: 'Start from the pages that can convert',
        body:
          'Send the site. We look at which URLs already receive the commercial queries, and we come back with what to rewrite and what it costs.',
        primary: 'Request a free audit',
        secondary: 'See the price list',
      },
      guide: { href: '/blog/on-page-seo', label: 'On-page SEO guide' },
    },
    el: {
      eyebrow: 'On-page SEO',
      h1: 'On-page SEO για τις σελίδες που μπορούν να φέρουν πελάτη',
      lead:
        'Το on-page SEO είναι η ίδια η σελίδα. Το title tag, οι επικεφαλίδες, το κείμενο και οι εσωτερικοί σύνδεσμοι γράφονται για τη μία αναζήτηση που πρέπει να κερδίσει η σελίδα. Μία εμπορική ομάδα αναζητήσεων, ένα URL.',
      extra:
        'Ανήκει στη μηνιαία συνεργασία Foundations και ξεκινά αφού διορθωθούν τα τεχνικά ζητήματα που εμποδίζουν την ευρετηρίαση αυτών των σελίδων.',
      metaTitle: 'On-page SEO για εμπορικές σελίδες',
      metaDescription:
        'On-page SEO για title tag, επικεφαλίδες και κείμενο στις σελίδες που φέρνουν πελάτες. Μία αναζήτηση, ένα URL. Περιλαμβάνεται στο μηνιαίο πακέτο SEO.',
      primaryKeyword: 'on-page SEO',
      serviceType: 'On-page SEO',
      includes: {
        title: 'Τι καλύπτει το on-page SEO',
        intro: 'Η δουλειά γίνεται στις σελίδες που μπορούν να φέρουν πελάτη, όχι σε ξαναγράψιμο όλου του site χωρίς λόγο.',
        items: [
          {
            title: 'Αντιστοίχιση αναζήτησης σε σελίδα',
            body:
              'Φτιάχνεται από τα queries του Search Console σας και τις σελίδες που ήδη τα δέχονται. Μια γενική λίστα όγκου δεν είναι η αφετηρία.',
          },
          {
            title: 'Title tags και επικεφαλίδες',
            body:
              'Το query που πρέπει να κερδίσει η σελίδα φαίνεται στο title tag και στο H1, και η πρώτη οθόνη το απαντά.',
          },
          {
            title: 'Κείμενο που ταιριάζει στην αναζήτηση',
            body:
              'Σελίδες υπηρεσίας και σελίδες περιοχής που απαντούν σε αυτό που ρωτά κάποιος λίγο πριν ζητήσει προσφορά, στη γλώσσα αυτής της αγοράς.',
          },
          {
            title: 'Εσωτερικοί σύνδεσμοι με δουλειά',
            body:
              'Οι υποστηρικτικές σελίδες δείχνουν στο εμπορικό URL στο οποίο ανήκουν, με anchor text που περιγράφει τον προορισμό.',
          },
        ],
      },
      process: {
        title: 'Πώς τρέχει η on-page δουλειά',
        intro: 'Διαλέγουμε τα URL, ξαναγράφουμε όσα μπορούν να φέρουν πελάτη, και διαβάζουμε τι κάνει το Search Console.',
        steps: [
          {
            title: 'Επιλογή σελίδων',
            body:
              'Καταγράφουμε τα URL που μπορούν να φέρουν αίτημα ή κράτηση, και τα queries που πρέπει να κερδίσει το καθένα. Σελίδες που επικαλύπτονται χωρίζονται ή ενώνονται.',
          },
          {
            title: 'Ξαναγράψιμο όσων μετατρέπουν',
            body:
              'Πρώτα αλλάζουν το title tag, οι επικεφαλίδες και η απάντηση στην αρχή. Η υπόλοιπη σελίδα ακολουθεί το ίδιο query, χωρίς δεύτερη σελίδα να διεκδικεί την ίδια αναζήτηση.',
          },
          {
            title: 'Σύνδεση μεταξύ τους',
            body:
              'Προστίθενται εσωτερικοί σύνδεσμοι από τις σελίδες που έχει ήδη διαβάσει ο επισκέπτης προς τη σελίδα που μπορεί να πάρει το αίτημα.',
          },
          {
            title: 'Ανάγνωση στο Search Console',
            body:
              'Τον επόμενο μήνα κοιτάμε κλικ και queries σε αυτά τα URL. Μια σελίδα που κερδίζει εμφανίσεις χωρίς κλικ παίρνει νέο title, όχι την ίδια παράγραφο ξανά.',
          },
        ],
      },
      pricing: {
        title: 'Τι κοστίζει το on-page SEO',
        intro:
          'Δεν υπάρχει ξεχωριστό πακέτο on-page. Η δουλειά περιλαμβάνεται στο SEO Foundations. Το πρόσθετο του τεχνικού ελέγχου είναι η εφάπαξ ανασκόπηση που δείχνει ποιες από αυτές τις σελίδες δεν ευρετηριάζονται, πριν αλλάξει το κείμενο. Επιπλέον σελίδες, όταν τις χρειάζεται το εύρος, είναι το πρόσθετο επιπλέον σελίδας περιεχομένου στη σελίδα τιμών.',
        note:
          'Η ελάχιστη μηνιαία συνεργασία είναι {{MONTHS}} μήνες και μετά ανανεώνεται μήνα με τον μήνα. Το πρόσθετο του ελέγχου είναι εφάπαξ, και το «από» σημαίνει ότι το εύρος αλλάζει την τελική τιμή.',
      },
      otherTitle: 'Οι άλλες πέντε υπηρεσίες',
      otherIntro: 'Το on-page SEO κάθεται ανάμεσα στην τεχνική δουλειά και το μηνιαίο πλάνο.',
      faqTitle: 'Ερωτήσεις για το on-page SEO',
      faqs: [
        {
          question: 'Τι είναι το on-page SEO;',
          answer:
            'Είναι η δουλειά πάνω στην ίδια τη σελίδα: το title tag, οι επικεφαλίδες, το κείμενο και οι εσωτερικοί σύνδεσμοι, ώστε η σελίδα να απαντά σε μία εμπορική αναζήτηση.',
        },
        {
          question: 'Σε τι διαφέρει από το τεχνικό SEO;',
          answer:
            'Το τεχνικό SEO αποφασίζει αν η Google μπορεί να φέρει και να ευρετηριάσει τη σελίδα. Το on-page SEO αποφασίζει αν η σελίδα απαντά στην αναζήτηση που πρέπει να κερδίσει.',
        },
        {
          question: 'Πόσο κοστίζει το on-page SEO;',
          answer:
            'Περιλαμβάνεται στο SEO Foundations στα {{FOUNDATIONS}}. Δεν υπάρχει ξεχωριστή χρέωση on-page. Το πρόσθετο του τεχνικού ελέγχου, {{AUDIT}}, είναι η εφάπαξ ανασκόπηση που προηγείται όταν οι σελίδες δεν ευρετηριάζονται.',
        },
        {
          question: 'Δημοσιεύετε συγκεκριμένο αριθμό σελίδων τον μήνα;',
          answer:
            'Ο τιμοκατάλογος δεν αναφέρει αριθμό, οπότε δεν διαφημίζουμε έναν. Η μηνιαία λίστα ονομάζει τις σελίδες. Οι επιπλέον σελίδες τιμολογούνται ως το πρόσθετο επιπλέον σελίδας περιεχομένου στη σελίδα τιμών.',
        },
      ],
      relatedTitle: 'Σχετικές σελίδες',
      cta: {
        title: 'Ξεκινήστε από τις σελίδες που μπορούν να φέρουν πελάτη',
        body:
          'Στείλτε την ιστοσελίδα. Κοιτάμε ποια URL δέχονται ήδη τις εμπορικές αναζητήσεις, και επιστρέφουμε με το τι χρειάζεται ξαναγράψιμο και τι κοστίζει.',
        primary: 'Ζητήστε δωρεάν έλεγχο',
        secondary: 'Δείτε τον τιμοκατάλογο',
      },
      guide: { href: '/blog/on-page-seo-el', label: 'Οδηγός on-page SEO' },
    },
  },
  strategy: {
    en: {
      eyebrow: 'SEO strategy',
      h1: 'An SEO strategy from your Search Console, not a template',
      lead:
        'An SEO strategy names the pages, the fixes and the order of the work. It starts from the queries, clicks and URLs already in your Search Console, then says what happens each month.',
      extra:
        'The monthly plan is SEO Foundations. The higher packages on the price list add coverage and a monthly strategy call. We do not promise a position.',
      metaTitle: 'SEO strategy from Search Console',
      metaDescription:
        'An SEO strategy that names the pages, the fixes and the monthly order of work, based on your Search Console. It is part of the monthly SEO package.',
      primaryKeyword: 'SEO strategy',
      serviceType: 'SEO strategy',
      includes: {
        title: 'What the strategy names',
        intro: 'A strategy you cannot point at a URL and a month is a slogan. These are the four things the plan has to say.',
        items: [
          {
            title: 'One query, one URL',
            body:
              'The map says which commercial cluster belongs to which page. Without it, two of your URLs compete and neither is the obvious result.',
          },
          {
            title: 'An order, not a catalogue',
            body:
              'Technical blockers first, then the pages that can convert, then wider coverage. A long list with no sequence is not a strategy.',
          },
          {
            title: 'Named monthly work',
            body:
              'Each month has pages, fixes and topics written down. "Optimisation" on its own is not a deliverable.',
          },
          {
            title: 'A report tied to the plan',
            body:
              'Clicks, the commercial queries, and the enquiries that came from organic search. Work that does not earn its place comes off the plan.',
          },
        ],
      },
      process: {
        title: 'How the plan is built',
        intro: 'The first quarter is the foundation. After that the plan changes because the data changed, not because a template said so.',
        steps: [
          {
            title: 'Weeks 1-2: the map',
            body:
              'Technical findings, Search Console, and the competitors who actually appear for your queries. The output is a prioritised plan.',
          },
          {
            title: 'Months 1-3: the foundation',
            body:
              'The blockers, the pages that can convert, and the local profile where the business has a real place or a real service area.',
          },
          {
            title: 'From month 4: coverage',
            body:
              'Wider topics and internal links toward the commercial pages, still against the same map.',
          },
          {
            title: 'Every month: keep or cut',
            body:
              'The report shows what shipped and what the queries did. The next month follows that, not a document written in week one.',
          },
        ],
      },
      pricing: {
        title: 'What SEO strategy costs',
        intro:
          'Strategy is not a separate fee and not a standalone PDF. It is the plan inside the monthly engagement, starting at SEO Foundations. The technical audit add-on is the published way to get the prioritised list without the monthly engagement. The Growth package on the pricing page adds a monthly strategy call.',
        note:
          'The minimum monthly engagement is {{MONTHS}} months, then it renews month to month. Under that, there is not enough time to see whether the plan is working. The audit add-on is one-off.',
      },
      otherTitle: 'The other five services',
      otherIntro: 'The strategy is the order in which the other five get done.',
      faqTitle: 'Questions about SEO strategy',
      faqs: [
        {
          question: 'What is an SEO strategy?',
          answer:
            'It is the decision of which pages exist, which fixes come first, and what is done each month. It is not a keyword spreadsheet with no URLs on it.',
        },
        {
          question: 'What do you base it on?',
          answer:
            'Your Search Console, a crawl of the site, and the pages that already appear for the queries you care about. A strategy without that access is a guess.',
        },
        {
          question: 'How much does SEO strategy cost?',
          answer:
            'It is included in SEO Foundations at {{FOUNDATIONS}}. It is not billed as a separate strategy document. A one-off technical audit, {{AUDIT}}, is the published way to get the prioritised list without the monthly engagement.',
        },
        {
          question: 'How long is the engagement?',
          answer:
            'The minimum is {{MONTHS}} months, then it renews monthly. We do not sell a shorter strategy-only package, because the plan cannot be judged before then.',
        },
      ],
      relatedTitle: 'Related pages',
      cta: {
        title: 'Start with the plan, not a contract pitch',
        body:
          'Tell us what you sell and where. We look at the site and Search Console and come back with the order of work and the published price.',
        primary: 'Request a free audit',
        secondary: 'See the price list',
      },
      guide: { href: '/seo-services', label: 'All SEO services' },
    },
    el: {
      eyebrow: 'Στρατηγική SEO',
      h1: 'Στρατηγική SEO από το Search Console σας, όχι από πρότυπο',
      lead:
        'Μια στρατηγική SEO ονομάζει τις σελίδες, τις διορθώσεις και τη σειρά της δουλειάς. Ξεκινά από τα queries, τα κλικ και τα URL που υπάρχουν ήδη στο Search Console σας, και μετά λέει τι γίνεται κάθε μήνα.',
      extra:
        'Το μηνιαίο πλάνο είναι το SEO Foundations. Τα ανώτερα πακέτα στον τιμοκατάλογο προσθέτουν κάλυψη και μηνιαία κλήση στρατηγικής. Δεν υποσχόμαστε θέση.',
      metaTitle: 'Στρατηγική SEO από το Search Console',
      metaDescription:
        'Στρατηγική SEO που ονομάζει τις σελίδες, τις διορθώσεις και τη μηνιαία σειρά δουλειάς, με βάση το Search Console σας. Μέρος του μηνιαίου πακέτου SEO.',
      primaryKeyword: 'στρατηγική SEO',
      serviceType: 'SEO strategy',
      includes: {
        title: 'Τι ονομάζει η στρατηγική',
        intro: 'Στρατηγική που δεν δείχνει URL και μήνα είναι σύνθημα. Αυτά είναι τα τέσσερα που πρέπει να λέει το πλάνο.',
        items: [
          {
            title: 'Ένα query, ένα URL',
            body:
              'Ο χάρτης λέει ποια εμπορική ομάδα αναζητήσεων ανήκει σε ποια σελίδα. Χωρίς αυτόν, δύο δικά σας URL ανταγωνίζονται και κανένα δεν είναι το προφανές αποτέλεσμα.',
          },
          {
            title: 'Σειρά, όχι κατάλογος',
            body:
              'Πρώτα τα τεχνικά εμπόδια, μετά οι σελίδες που μπορούν να φέρουν πελάτη, μετά η ευρύτερη κάλυψη. Μια μακριά λίστα χωρίς σειρά δεν είναι στρατηγική.',
          },
          {
            title: 'Ονομασμένη μηνιαία δουλειά',
            body:
              'Κάθε μήνας έχει σελίδες, διορθώσεις και θέματα γραμμένα. Η «βελτιστοποίηση» από μόνη της δεν είναι παραδοτέο.',
          },
          {
            title: 'Αναφορά δεμένη με το πλάνο',
            body:
              'Κλικ, εμπορικά queries και αιτήματα που ήρθαν από την οργανική αναζήτηση. Δουλειά που δεν κερδίζει τη θέση της βγαίνει από το πλάνο.',
          },
        ],
      },
      process: {
        title: 'Πώς φτιάχνεται το πλάνο',
        intro: 'Το πρώτο τρίμηνο είναι η βάση. Μετά το πλάνο αλλάζει επειδή άλλαξαν τα δεδομένα, όχι επειδή το είπε ένα πρότυπο.',
        steps: [
          {
            title: 'Εβδομάδες 1-2: ο χάρτης',
            body:
              'Τεχνικά ευρήματα, Search Console και οι ανταγωνιστές που εμφανίζονται πραγματικά για τα queries σας. Το παραδοτέο είναι ιεραρχημένο πλάνο.',
          },
          {
            title: 'Μήνες 1-3: η βάση',
            body:
              'Τα εμπόδια, οι σελίδες που μπορούν να φέρουν πελάτη, και το τοπικό προφίλ όπου η επιχείρηση έχει πραγματικό σημείο ή πραγματική περιοχή εξυπηρέτησης.',
          },
          {
            title: 'Από τον 4ο μήνα: κάλυψη',
            body:
              'Ευρύτερα θέματα και εσωτερικοί σύνδεσμοι προς τις εμπορικές σελίδες, πάντα πάνω στον ίδιο χάρτη.',
          },
          {
            title: 'Κάθε μήνα: μένει ή κόβεται',
            body:
              'Η αναφορά δείχνει τι παραδόθηκε και τι έκαναν τα queries. Ο επόμενος μήνας ακολουθεί αυτό, όχι ένα έγγραφο της πρώτης εβδομάδας.',
          },
        ],
      },
      pricing: {
        title: 'Τι κοστίζει η στρατηγική SEO',
        intro:
          'Η στρατηγική δεν είναι ξεχωριστή αμοιβή ούτε αυτόνομο PDF. Είναι το πλάνο μέσα στη μηνιαία συνεργασία, με αφετηρία το SEO Foundations. Το πρόσθετο του τεχνικού ελέγχου είναι ο δημοσιευμένος τρόπος να πάρετε την ιεραρχημένη λίστα χωρίς τη μηνιαία συνεργασία. Το πακέτο Growth στη σελίδα τιμών προσθέτει μηνιαία κλήση στρατηγικής.',
        note:
          'Η ελάχιστη μηνιαία συνεργασία είναι {{MONTHS}} μήνες και μετά ανανεώνεται μήνα με τον μήνα. Κάτω από αυτό δεν προλαβαίνει να φανεί αν το πλάνο δουλεύει. Το πρόσθετο του ελέγχου είναι εφάπαξ.',
      },
      otherTitle: 'Οι άλλες πέντε υπηρεσίες',
      otherIntro: 'Η στρατηγική είναι η σειρά με την οποία γίνονται οι άλλες πέντε.',
      faqTitle: 'Ερωτήσεις για τη στρατηγική SEO',
      faqs: [
        {
          question: 'Τι είναι μια στρατηγική SEO;',
          answer:
            'Είναι η απόφαση για το ποιες σελίδες υπάρχουν, ποιες διορθώσεις προηγούνται και τι γίνεται κάθε μήνα. Δεν είναι ένα φύλλο λέξεων-κλειδιών χωρίς URL.',
        },
        {
          question: 'Πάνω σε τι τη βασίζετε;',
          answer:
            'Στο Search Console σας, σε crawl του site και στις σελίδες που εμφανίζονται ήδη για τα queries που σας ενδιαφέρουν. Στρατηγική χωρίς αυτή την πρόσβαση είναι εικασία.',
        },
        {
          question: 'Πόσο κοστίζει η στρατηγική SEO;',
          answer:
            'Περιλαμβάνεται στο SEO Foundations στα {{FOUNDATIONS}}. Δεν τιμολογείται ως ξεχωριστό έγγραφο στρατηγικής. Ένας εφάπαξ τεχνικός έλεγχος, {{AUDIT}}, είναι ο δημοσιευμένος τρόπος να πάρετε την ιεραρχημένη λίστα χωρίς τη μηνιαία συνεργασία.',
        },
        {
          question: 'Πόσο διαρκεί η συνεργασία;',
          answer:
            'Το ελάχιστο είναι {{MONTHS}} μήνες και μετά ανανεώνεται μηνιαία. Δεν πουλάμε συντομότερο πακέτο μόνο για στρατηγική, γιατί το πλάνο δεν κρίνεται νωρίτερα.',
        },
      ],
      relatedTitle: 'Σχετικές σελίδες',
      cta: {
        title: 'Ξεκινήστε από το πλάνο, όχι από παρουσίαση συμβολαίου',
        body:
          'Πείτε μας τι πουλάτε και πού. Κοιτάμε το site και το Search Console και επιστρέφουμε με τη σειρά της δουλειάς και τη δημοσιευμένη τιμή.',
        primary: 'Ζητήστε δωρεάν έλεγχο',
        secondary: 'Δείτε τον τιμοκατάλογο',
      },
      guide: { href: '/seo-services', label: 'Όλες οι υπηρεσίες SEO' },
    },
  },
};

export function getSpokeCopy(locale: SiteLocale, slug: string): SpokePageCopy | null {
  if (!isSpokeSlug(slug)) return null;
  return { slug, ...spokes[slug][locale] };
}
