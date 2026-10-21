import Link from 'next/link';
import { Check } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import {
  AiVisibilityPreview,
  DecisionsPanel,
  LocalPackPreview,
  PerformancePreview,
} from '@/components/kit';
import { ChipLinks, KitBreadcrumbs } from '@/components/page-kit';
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveChoice,
  WaveClose,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
} from '@/components/pages/platform-wave/ui';
import { accentEnd, ManagedFaq, ServiceHeroActions } from '@/components/pages/services-wave/ui';
import { IndustryAppPanel, WorkCards } from '@/components/pages/industry-wave/ui';
import { agencyTrust } from '@/components/kit/sections';
import { getPortfolioByCategory } from '@/data/portfolio';
import { services } from '@/data/services';
import { isIndustryServiceIndexable } from '@/lib/indexability/industry-service';
import { getServiceEl } from '@/data/services-i18n';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  combineSchemas,
  BASE_URL,
} from '@/lib/seo/schema';

/**
 * /solutions/hotels - bespoke.
 *
 * Signature: 262 (indigo). Deliberately a different shape from rent-a-car: a
 * centred editorial hero rather than a split, a numbered leak diagnostic rather
 * than a feature list, a language/market matrix, and proof as alternating wide
 * rows rather than a card grid. A hotel's problem is not seasonality, it is
 * that the OTA outranks it for its own name, so the page argues that first.
 *
 * Integrity: commission figures are given as market ranges and labelled. No
 * client occupancy, revenue or ranking claims.
 */

const SIGNATURE_HUE = 284;

const copy = {
  en: {
    eyebrow: 'Hotels and accommodation',
    h1: 'When someone searches your hotel by name, they should land on you',
    lede:
      'For most independent hotels the booking sites outrank the hotel for its own name, so a guest who already chose you still books through a marketplace and you still pay commission. Fixing that is the highest value work on a hotel site.',
    ctaPrimary: 'Get a quote for your hotel site',
    ctaSecondary: 'See hotel projects',
    leaks: {
      eyebrow: 'Diagnostic',
      title: 'Four places a hotel loses a direct booking',
      body: 'In roughly this order. Most properties have all four open at once.',
      items: [
        {
          n: '01',
          t: 'Brand search goes to an OTA',
          d: 'Someone types your hotel name. The first three results are marketplaces. You pay commission on a guest who was already yours.',
        },
        {
          n: '02',
          t: 'The site does not quote a price',
          d: 'No rate, no availability, no obvious way to book. The visitor leaves to check a site that will tell them.',
        },
        {
          n: '03',
          t: 'Room pages do not exist',
          d: 'One gallery for the whole property. Nothing to rank for a room type, a view, or a suite with a private pool.',
        },
        {
          n: '04',
          t: 'One language, or a bad second one',
          d: 'Your demand is international. A machine translated English page reads as untrustworthy at exactly the moment trust decides the booking.',
        },
      ],
    },
    parity: {
      eyebrow: 'Direct',
      title: 'The economics of a direct booking',
      body:
        'You are not going to leave the marketplaces, and you should not. But every booking that arrives direct keeps its full margin and gives you the guest relationship for the next stay.',
      rows: [
        { k: 'Commission per booking', ota: 'Charged', direct: 'None' },
        { k: 'Guest contact details', ota: 'Limited', direct: 'Yours' },
        { k: 'Repeat and loyalty', ota: 'Platform owns it', direct: 'You own it' },
        { k: 'Upsells and packages', ota: 'Constrained', direct: 'Unrestricted' },
      ],
      otaHead: 'Marketplace',
      directHead: 'Direct',
      note: 'Marketplace commission on accommodation commonly runs in the mid-teens to low twenties percent range. Market context, not a claim about your contracts.',
    },
    matrix: {
      eyebrow: 'Markets',
      title: 'Built for the markets that actually book you',
      body:
        'A Greek hotel taking German, British and French guests needs each of those to feel native, with the right currency, the right examples and correct hreflang so Google serves the right version.',
      langs: ['English', 'Greek', 'German', 'French'],
      rows: [
        { m: 'Room and rate pages', v: [true, true, true, true] },
        { m: 'Location and area guide', v: [true, true, true, false] },
        { m: 'Booking flow', v: [true, true, true, true] },
        { m: 'Offers and packages', v: [true, true, false, false] },
      ],
      note: 'A typical starting scope. Which languages you need depends on where your bookings come from.',
    },
    rooms: {
      eyebrow: 'Structure',
      title: 'Every room type earns its own page',
      body:
        'A room type is a product. It has a price, a capacity, a view and a set of searches attached to it. Collapsing them all into one gallery throws that away.',
      points: [
        'Rates, capacity, size and view as structured data',
        'Photography per room type, not one shared carousel',
        'Availability and booking entry on every room page',
        'Package and offer pages that can rank independently',
      ],
    },
    proof: {
      eyebrow: 'Proof',
      title: 'Accommodation sites we have built',
      body: 'Live projects. Real screenshots.',
    },
    seoBlock: {
      eyebrow: 'SEO',
      title: 'SEO services for hotels',
      body:
        'A new site is the start, not the finish. Hotel SEO keeps your own name, room types and destination searches pointing at your site rather than a marketplace: technical health, room and offer pages, Google Business Profile, reviews and multilingual content, reviewed against Search Console every month.',
      points: [
        'Brand searches: your site above the booking platforms for your own name',
        'Room, offer and destination pages that answer what guests search',
        'Google Business Profile, photos and review replies kept current',
        'Correct hreflang so each market sees its own language',
      ],
      guide: 'Read the hotel SEO guide',
      guideHref: '/blog/hotel-seo-guide',
      service: 'SEO services',
      serviceHref: '/seo-services',
    },
    servicesBlock: {
      eyebrow: 'Services',
      title: 'What we apply to a hotel site',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions from hoteliers',
      items: [
        {
          q: 'Can we outrank the booking sites for our own hotel name?',
          a: 'Brand search is the one area where an independent property has a structural advantage, because you are the entity being searched for. It takes correct schema, a fast and complete site, and consistent brand signals. We will not promise a position, but this is usually the most winnable work on a hotel site.',
        },
        {
          q: 'Do we need to replace our booking engine?',
          a: 'No. We integrate with what you already use so rates and availability stay in one system. If your current engine is the reason people abandon, we will tell you, but replacing it is your commercial decision and not something we push.',
        },
        {
          q: 'How many languages should the site be in?',
          a: 'Start with the markets that already book you, which your booking data will show. Adding a language is not just translation, it is a full set of pages with correct hreflang, so it is better to do three properly than six badly.',
        },
        {
          q: 'We are seasonal. When should the work happen?',
          a: 'Before the booking window opens, which for most Greek properties means winter. Guests book months ahead, so a site that goes live in June has missed most of the decisions for that season. These are indicative phases, not guaranteed timelines.',
        },
      ],
    },
    cta: {
      title: 'Send us your property',
      body: 'Give us your site and the markets you sell to. We will tell you where the direct bookings are leaking.',
      primary: 'Request a quote',
      secondary: 'See pricing',
    },
  },
  el: {
    eyebrow: 'Ξενοδοχεία και καταλύματα',
    h1: 'Κατασκευή ιστοσελίδας ξενοδοχείου για άμεσες κρατήσεις',
    lede:
      'Φτιάχνουμε ιστοσελίδες ξενοδοχείων που φέρνουν άμεσες κρατήσεις: σύνδεση με τη μηχανή κρατήσεών σας, σελίδες δωματίων με φωτογραφίες, πολύγλωσσο περιεχόμενο και SEO για τον προορισμό σας. Στα περισσότερα ανεξάρτητα ξενοδοχεία οι πλατφόρμες εμφανίζονται πάνω από το ίδιο το ξενοδοχείο για το όνομά του, οπότε ξεκινάμε από εκεί.',
    ctaPrimary: 'Ζητήστε προσφορά για το site σας',
    ctaSecondary: 'Δείτε έργα ξενοδοχείων',
    leaks: {
      eyebrow: 'Διάγνωση',
      title: 'Τέσσερα σημεία όπου ένα ξενοδοχείο χάνει απευθείας κράτηση',
      body: 'Περίπου με αυτή τη σειρά. Τα περισσότερα καταλύματα τα έχουν και τα τέσσερα ανοιχτά.',
      items: [
        {
          n: '01',
          t: 'Η αναζήτηση με το όνομά σας πάει σε OTA',
          d: 'Κάποιος γράφει το όνομα του ξενοδοχείου. Τα τρία πρώτα αποτελέσματα είναι πλατφόρμες. Πληρώνετε προμήθεια για πελάτη που ήταν ήδη δικός σας.',
        },
        {
          n: '02',
          t: 'Το site δεν δίνει τιμή',
          d: 'Καμία τιμή, καμία διαθεσιμότητα, κανένας προφανής τρόπος κράτησης. Ο επισκέπτης φεύγει σε ένα site που θα του απαντήσει.',
        },
        {
          n: '03',
          t: 'Δεν υπάρχουν σελίδες δωματίων',
          d: 'Μία γκαλερί για όλο το κατάλυμα. Τίποτα που να μπορεί να κατατάσσεται για τύπο δωματίου, θέα ή σουίτα με ιδιωτική πισίνα.',
        },
        {
          n: '04',
          t: 'Μία γλώσσα, ή μια κακή δεύτερη',
          d: 'Η ζήτησή σας είναι διεθνής. Μια αγγλική σελίδα από αυτόματη μετάφραση δεν εμπνέει εμπιστοσύνη ακριβώς τη στιγμή που η εμπιστοσύνη κρίνει την κράτηση.',
        },
      ],
    },
    parity: {
      eyebrow: 'Απευθείας',
      title: 'Τα οικονομικά μιας απευθείας κράτησης',
      body:
        'Δεν πρόκειται να φύγετε από τις πλατφόρμες, ούτε πρέπει. Κάθε κράτηση όμως που έρχεται απευθείας κρατά ολόκληρο το περιθώριο και σας δίνει τη σχέση με τον επισκέπτη για την επόμενη φορά.',
      rows: [
        { k: 'Προμήθεια ανά κράτηση', ota: 'Χρεώνεται', direct: 'Καμία' },
        { k: 'Στοιχεία επισκέπτη', ota: 'Περιορισμένα', direct: 'Δικά σας' },
        { k: 'Επαναληπτικές κρατήσεις', ota: 'Τις κρατά η πλατφόρμα', direct: 'Τις κρατάτε εσείς' },
        { k: 'Πακέτα και upsell', ota: 'Περιορισμένα', direct: 'Ελεύθερα' },
      ],
      otaHead: 'Πλατφόρμα',
      directHead: 'Απευθείας',
      note: 'Οι προμήθειες στα καταλύματα κινούνται συνήθως από τα μέσα του 10% έως τις αρχές του 20%. Δεδομένα αγοράς, όχι ισχυρισμός για τα δικά σας συμβόλαια.',
    },
    matrix: {
      eyebrow: 'Αγορές',
      title: 'Φτιαγμένο για τις αγορές που πραγματικά σας κλείνουν',
      body:
        'Ένα ελληνικό ξενοδοχείο που δέχεται Γερμανούς, Βρετανούς και Γάλλους χρειάζεται κάθε γλώσσα να μοιάζει φυσική, με σωστό νόμισμα, σωστά παραδείγματα και σωστό hreflang ώστε η Google να σερβίρει τη σωστή έκδοση.',
      langs: ['Αγγλικά', 'Ελληνικά', 'Γερμανικά', 'Γαλλικά'],
      rows: [
        { m: 'Σελίδες δωματίων και τιμών', v: [true, true, true, true] },
        { m: 'Οδηγός περιοχής', v: [true, true, true, false] },
        { m: 'Διαδικασία κράτησης', v: [true, true, true, true] },
        { m: 'Προσφορές και πακέτα', v: [true, true, false, false] },
      ],
      note: 'Ένα τυπικό αρχικό εύρος. Ποιες γλώσσες χρειάζεστε εξαρτάται από το πού βρίσκονται οι κρατήσεις σας.',
    },
    rooms: {
      eyebrow: 'Δομή',
      title: 'Κάθε τύπος δωματίου αξίζει τη δική του σελίδα',
      body:
        'Ένας τύπος δωματίου είναι προϊόν. Έχει τιμή, χωρητικότητα, θέα και ένα σύνολο αναζητήσεων πάνω του. Αν τα συγχωνεύσετε όλα σε μία γκαλερί, τα πετάτε.',
      points: [
        'Τιμές, χωρητικότητα, τετραγωνικά και θέα ως structured data',
        'Φωτογράφιση ανά τύπο δωματίου, όχι ένα κοινό carousel',
        'Διαθεσιμότητα και είσοδος κράτησης σε κάθε σελίδα δωματίου',
        'Σελίδες πακέτων και προσφορών που κατατάσσονται αυτόνομα',
      ],
    },
    proof: {
      eyebrow: 'Έργα',
      title: 'Sites καταλυμάτων που έχουμε φτιάξει',
      body: 'Ενεργά έργα. Πραγματικά screenshots.',
    },
    seoBlock: {
      eyebrow: 'SEO',
      title: 'SEO που κρατά τις κρατήσεις στο δικό σας site',
      body:
        'Η νέα ιστοσελίδα είναι η αρχή, όχι το τέλος. Το SEO για ξενοδοχεία κρατά το όνομά σας, τους τύπους δωματίων και τις αναζητήσεις του προορισμού στραμμένα στο δικό σας site αντί για μια πλατφόρμα: τεχνική υγεία, σελίδες δωματίων και προσφορών, Google Business Profile, κριτικές και πολύγλωσσο περιεχόμενο, με μηνιαίο έλεγχο στο Search Console.',
      points: [
        'Αναζητήσεις με το όνομά σας: το site σας πάνω από τις πλατφόρμες κρατήσεων',
        'Σελίδες δωματίων, προσφορών και προορισμού που απαντούν σε ό,τι ψάχνουν οι επισκέπτες',
        'Google Business Profile, φωτογραφίες και απαντήσεις σε κριτικές πάντα ενημερωμένα',
        'Σωστό hreflang ώστε κάθε αγορά να βλέπει τη δική της γλώσσα',
      ],
      guide: 'Διαβάστε τον οδηγό SEO για ξενοδοχεία',
      guideHref: '/blog/seo-gia-xenodoxeia',
      service: 'Υπηρεσίες SEO για ξενοδοχεία',
      serviceHref: '/seo-tourismou/xenodoxeia',
    },
    servicesBlock: {
      eyebrow: 'Υπηρεσίες',
      title: 'Τι εφαρμόζουμε σε ένα site ξενοδοχείου',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Συχνές ερωτήσεις από ξενοδόχους',
      items: [
        {
          q: 'Μπορούμε να ξεπεράσουμε τις πλατφόρμες για το ίδιο μας το όνομα;',
          a: 'Η αναζήτηση με το όνομα της επιχείρησης είναι το σημείο όπου ένα ανεξάρτητο κατάλυμα έχει δομικό πλεονέκτημα, γιατί εσείς είστε η οντότητα που αναζητείται. Χρειάζεται σωστό schema, γρήγορο και πλήρες site και συνεπή σήματα μάρκας. Δεν υποσχόμαστε θέση, αλλά συνήθως αυτή είναι η πιο εφικτή δουλειά σε ένα site ξενοδοχείου.',
        },
        {
          q: 'Πρέπει να αλλάξουμε μηχανή κρατήσεων;',
          a: 'Όχι. Συνδέουμε το site με αυτή που ήδη χρησιμοποιείτε, ώστε τιμές και διαθεσιμότητα να μένουν σε ένα σύστημα. Αν η σημερινή μηχανή είναι ο λόγος που εγκαταλείπουν οι επισκέπτες θα σας το πούμε, αλλά η αλλαγή είναι δική σας εμπορική απόφαση και δεν την πιέζουμε.',
        },
        {
          q: 'Σε πόσες γλώσσες πρέπει να είναι το site;',
          a: 'Ξεκινήστε από τις αγορές που ήδη σας κλείνουν, κάτι που φαίνεται στα δεδομένα κρατήσεων. Μια γλώσσα δεν είναι απλή μετάφραση, είναι πλήρες σύνολο σελίδων με σωστό hreflang, οπότε είναι προτιμότερες τρεις σωστές παρά έξι πρόχειρες.',
        },
        {
          q: 'Είμαστε εποχικοί. Πότε πρέπει να γίνει η δουλειά;',
          a: 'Πριν ανοίξει το παράθυρο κρατήσεων, που για τα περισσότερα ελληνικά καταλύματα σημαίνει χειμώνα. Οι επισκέπτες κλείνουν μήνες νωρίτερα, οπότε ένα site που βγαίνει live τον Ιούνιο έχει χάσει τις περισσότερες αποφάσεις της σεζόν. Πρόκειται για ενδεικτικές φάσεις, όχι εγγυημένα χρονοδιαγράμματα.',
        },
      ],
    },
    cta: {
      title: 'Στείλτε μας το κατάλυμά σας',
      body: 'Δώστε μας το site σας και τις αγορές στις οποίες απευθύνεστε. Θα σας πούμε από πού διαρρέουν οι απευθείας κρατήσεις.',
      primary: 'Ζητήστε προσφορά',
      secondary: 'Δείτε τιμές',
    },
  },
} as const;

export function HotelsPage({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const t = isEl ? copy.el : copy.en;
  const lp = (p: string) => localizedPath(locale, p);
  const industry = getLocalizedIndustry('hotels', locale);
  const projects = getPortfolioByCategory('hotel');

  const breadcrumbs = [
    { name: isEl ? 'Αρχική' : 'Home', url: lp('/') },
    { name: isEl ? 'Λύσεις' : 'Solutions', url: lp('/solutions') },
    { name: industry?.name ?? 'Hotels', url: lp('/solutions/hotels') },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: t.h1,
      description: industry?.description ?? t.lede,
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      areaServed: isEl ? ['GR'] : ['GR', 'US', 'GB'],
      serviceType: isEl ? 'Κατασκευή ιστοσελίδων και SEO για ξενοδοχεία' : 'Hotel website design and SEO',
    }),
    generateFAQSchema({ faqs: t.faq.items.map((f) => ({ question: f.q, answer: f.a })) }),
  );

  const tx = (en: string, el: string) => (isEl ? el : en);
  const thCls = 'px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground';

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} className="overflow-x-clip" schemas={schemas}>
      <WaveHero
        pill={
          <div className="flex flex-col items-start gap-4">
            <KitBreadcrumbs items={breadcrumbs} align="left" />
            <AnnouncePill
              wrap
              href={lp('/services/ai-visibility')}
              tag="AI"
              text={tx('Be the hotel ChatGPT and Gemini recommend', 'Γίνετε το ξενοδοχείο που προτείνουν ChatGPT και Gemini')}
            />
          </div>
        }
        title={accentEnd(t.h1, isEl ? 2 : 4)}
        titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.6rem] lg:text-[3.05rem]"
        lead={t.lede}
        actions={
          <ServiceHeroActions
            locale={locale}
            primaryHref={lp('/get-started?project=hotels')}
            primaryLabel={t.ctaPrimary}
            links={[{ href: '#proof', label: t.ctaSecondary }]}
          />
        }
        trust={<TrustMarks items={agencyTrust(locale).map((item) => item.label)} yesLabel={tx('Yes', 'Ναι')} />}
        panel={<IndustryAppPanel locale={locale} kind="hotel" />}
        panelNote={tx(
          'Sample data for a hotel inside AnotherSEOGuru App. Not a client account.',
          'Δείγμα δεδομένων ξενοδοχείου μέσα στο AnotherSEOGuru App. Όχι λογαριασμός πελάτη.',
        )}
      />

      <WaveSection id="leaks" shot="pains" tinted>
        <WaveHeading eyebrow={t.leaks.eyebrow} title={accentEnd(t.leaks.title, 2)} lead={t.leaks.body} />
        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {t.leaks.items.map((item) => (
            <li key={item.n} className="min-w-0 rounded-[22px] border border-hairline bg-background/70 p-6 sm:p-7">
              <div className="font-code text-[13px] font-semibold text-primary">{item.n}</div>
              <h3 className="mt-3 text-balance text-[20px] font-bold leading-snug text-foreground">{item.t}</h3>
              <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{item.d}</p>
            </li>
          ))}
        </ol>
      </WaveSection>

      <WaveSection shot="fixes">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <WaveHeading
            eyebrow={tx('Ranked fixes', 'Διορθώσεις με σειρά')}
            title={
              <>
                {tx('Each leak becomes a ranked fix', 'Κάθε διαρροή γίνεται διόρθωση')}{' '}
                <WaveAccent>{tx('with the clicks it should bring', 'με τα κλικ που αναμένεται να φέρει')}</WaveAccent>
              </>
            }
            lead={tx(
              'The order comes from Search Console. The property in the panel is a sample.',
              'Η σειρά βγαίνει από το Search Console. Το κατάλυμα στον πίνακα είναι δείγμα.',
            )}
          />
          <AppPanel
            url="app.anotherseoguru.com/sample/hotel"
            badge={tx('Sample data', 'Δείγμα δεδομένων')}
            caption={tx('Sample ranked fixes for a hotel, not a client account.', 'Δείγμα διορθώσεων για ξενοδοχείο, όχι λογαριασμός πελάτη.')}
          >
            <DecisionsPanel locale={locale} details />
          </AppPanel>
        </div>
      </WaveSection>

      <WaveSection shot="parity" tinted>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <WaveHeading eyebrow={t.parity.eyebrow} title={accentEnd(t.parity.title, 2)} lead={t.parity.body} />
          <div className="min-w-0">
            <div className="overflow-x-auto rounded-[22px] border border-hairline bg-background">
              <table className="w-full min-w-[22rem] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-hairline bg-surface/60">
                    <th className={thCls} />
                    <th className={thCls}>{t.parity.otaHead}</th>
                    <th className={`${thCls} !text-primary`}>{t.parity.directHead}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.parity.rows.map((row) => (
                    <tr key={row.k} className="border-b border-hairline last:border-0">
                      <td className="px-4 py-3.5 font-medium text-foreground">{row.k}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{row.ota}</td>
                      <td className="px-4 py-3.5 font-medium text-primary">{row.direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-pretty text-[13px] leading-relaxed text-muted-foreground">{t.parity.note}</p>
          </div>
        </div>
      </WaveSection>

      <WaveSection shot="markets">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <WaveHeading eyebrow={t.matrix.eyebrow} title={accentEnd(t.matrix.title, isEl ? 2 : 3)} lead={t.matrix.body} />
          <div className="min-w-0">
            <div className="overflow-x-auto rounded-[22px] border border-hairline bg-background">
              <table className="w-full min-w-[24rem] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-hairline bg-surface/60">
                    <th className={thCls}>{isEl ? 'Σελίδες' : 'Pages'}</th>
                    {t.matrix.langs.map((lang) => (
                      <th key={lang} className={`${thCls} !text-center`}>
                        {lang}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.matrix.rows.map((row) => (
                    <tr key={row.m} className="border-b border-hairline last:border-0">
                      <td className="px-4 py-3.5 font-medium text-foreground">{row.m}</td>
                      {row.v.map((on, index) => (
                        <td key={`${row.m}-${index}`} className="px-4 py-3.5 text-center">
                          {on ? (
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary" aria-label={isEl ? 'Ναι' : 'Yes'}>
                              <Check className="size-3" strokeWidth={3} aria-hidden />
                            </span>
                          ) : (
                            <span className="inline-block h-px w-3 bg-muted-foreground/40 align-middle" aria-label={isEl ? 'Όχι' : 'No'} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-pretty text-[13px] leading-relaxed text-muted-foreground">{t.matrix.note}</p>
          </div>
        </div>
      </WaveSection>

      <WaveSection shot="rooms" tinted>
        <div className="grid gap-16 lg:gap-24">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <WaveHeading eyebrow={t.rooms.eyebrow} title={accentEnd(t.rooms.title, isEl ? 2 : 2)} lead={t.rooms.body} />
              <ul className="mt-6 space-y-2">
                {t.rooms.points.map((point) => (
                  <li key={point} className="flex gap-2 text-pretty text-[15px] leading-6 text-foreground/90">
                    <span className="text-primary" aria-hidden>✓</span>
                    <span className="min-w-0">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <AppPanel
              url="app.anotherseoguru.com/sample/maps"
              badge={tx('Sample data', 'Δείγμα δεδομένων')}
              caption={tx('Sample map results, not a client listing.', 'Δείγμα αποτελεσμάτων χάρτη, όχι καταχώριση πελάτη.')}
            >
              <LocalPackPreview locale={locale} />
            </AppPanel>
          </div>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0 lg:order-2">
              <WaveHeading
                eyebrow="GEO / AEO"
                title={
                  <>
                    {tx('Recommended when guests', 'Να σας προτείνει η AI όταν οι επισκέπτες')} <WaveAccent>{tx('ask AI', 'ρωτούν')}</WaveAccent>
                  </>
                }
                lead={tx(
                  'More guests now ask ChatGPT or Gemini where to stay. We track whether your hotel is mentioned and give your pages the clear facts those answers quote.',
                  'Όλο και περισσότεροι επισκέπτες ρωτούν το ChatGPT ή το Gemini πού να μείνουν. Μετράμε αν αναφέρεται το ξενοδοχείο σας και δίνουμε στις σελίδες σας τα σαφή στοιχεία που χρησιμοποιούν αυτές οι απαντήσεις.',
                )}
              />
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] font-medium">
                <Link href={lp('/services/ai-visibility')} className="text-primary underline-offset-4 hover:underline">
                  {tx('AI visibility service', 'Υπηρεσία ορατότητας σε AI')}
                </Link>
                <Link href={lp('/ai-visibility-check')} className="text-foreground/80 underline decoration-hairline underline-offset-4 hover:text-foreground">
                  {tx('Free AI check', 'Δωρεάν έλεγχος AI')}
                </Link>
              </div>
            </div>
            <AppPanel
              url="app.anotherseoguru.com/sample/ai"
              badge={tx('Sample data', 'Δείγμα δεδομένων')}
              caption={tx('Sample AI visibility for a hotel, not a client account.', 'Δείγμα ορατότητας σε AI για ξενοδοχείο, όχι λογαριασμός πελάτη.')}
            >
              <AiVisibilityPreview locale={locale} />
            </AppPanel>
          </div>
        </div>
      </WaveSection>

      <WaveSection shot="seo">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <WaveHeading eyebrow={t.seoBlock.eyebrow} title={accentEnd(t.seoBlock.title, isEl ? 2 : 2)} lead={t.seoBlock.body} />
            <ul className="mt-6 space-y-2">
              {t.seoBlock.points.map((point) => (
                <li key={point} className="flex gap-2 text-pretty text-[15px] leading-6 text-foreground/90">
                  <span className="text-primary" aria-hidden>✓</span>
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] font-medium">
              <Link href={lp(t.seoBlock.guideHref)} className="text-primary underline-offset-4 hover:underline">
                {t.seoBlock.guide}
              </Link>
              <Link href={lp(t.seoBlock.serviceHref)} className="text-foreground/80 underline decoration-hairline underline-offset-4 hover:text-foreground">
                {t.seoBlock.service}
              </Link>
            </div>
          </div>
          <AppPanel
            url="app.anotherseoguru.com/sample/performance"
            badge={tx('Sample data', 'Δείγμα δεδομένων')}
            caption={tx('Sample search performance, not a client account.', 'Δείγμα απόδοσης αναζήτησης, όχι λογαριασμός πελάτη.')}
          >
            <PerformancePreview locale={locale} />
          </AppPanel>
        </div>
      </WaveSection>

      <WaveSection id="services" shot="services" tinted>
        <WaveHeading eyebrow={t.servicesBlock.eyebrow} title={t.servicesBlock.title} />
        <ChipLinks
          className="mt-10"
          items={services
            .filter((service) => isIndustryServiceIndexable('hotels', service.slug, locale))
            .map((service) => {
              const el = isEl ? getServiceEl(service.slug) : null;
              return { href: lp(`/solutions/hotels/${service.slug}`), label: el?.shortName ?? el?.name ?? service.shortName };
            })}
        />
        <p className="mt-8 text-[14.5px]">
          <Link href={lp('/pricing')} className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline">
            {t.cta.secondary}
            <span aria-hidden>→</span>
          </Link>
        </p>
      </WaveSection>

      <WaveChoice locale={locale} source="solutions-hotels-choice" />
      <WaveStats locale={locale} />

      <WaveSection id="proof" shot="proof">
        <WaveHeading eyebrow={t.proof.eyebrow} title={accentEnd(t.proof.title, isEl ? 2 : 2)} lead={t.proof.body} />
        <WorkCards projects={projects} locale={locale} showResults />
      </WaveSection>

      <ManagedFaq
        locale={locale}
        title={t.faq.title}
        faqs={t.faq.items.map((item) => ({ question: item.q, answer: item.a }))}
        askLabel={tx('Talk on WhatsApp', 'Μιλήστε στο WhatsApp')}
      />

      <WaveClose locale={locale} source="solutions-hotels" title={accentEnd(t.cta.title, 2)} lead={t.cta.body} />
    </PageShell>
  );
}
