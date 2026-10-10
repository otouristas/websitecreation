import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BedDouble, Bot, Briefcase, Check, Languages, Layers, Stethoscope, Wallet } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import {
  Accent,
  AgencyCtas,
  AiVisibilityPreview,
  AppWindow,
  CheckList,
  CtaBand,
  DecisionsPanel,
  FeatureRow,
  KitHeading,
  KitSection,
  LocalPackPreview,
  OverviewPreview,
  Stage,
} from '@/components/kit';
import { ChipLinks, KitFaq, PageHero } from '@/components/page-kit';
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
    h1: 'SEO για ξενοδοχεία: όταν κάποιος ψάχνει το ξενοδοχείο σας, πρέπει να καταλήγει σε εσάς',
    lede:
      'Στα περισσότερα ανεξάρτητα ξενοδοχεία οι πλατφόρμες κρατήσεων εμφανίζονται πάνω από το ίδιο το ξενοδοχείο για το όνομά του. Έτσι ένας επισκέπτης που σας έχει ήδη επιλέξει κλείνει μέσω πλατφόρμας και εσείς πληρώνετε προμήθεια. Η διόρθωση αυτού είναι η πιο κερδοφόρα δουλειά σε ένα site ξενοδοχείου.',
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
        'Τιμές, χωρητικότητα, τετραγωνικά και θέα ως δομημένα δεδομένα',
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
          a: 'Όχι. Κάνουμε ενσωμάτωση με αυτή που ήδη χρησιμοποιείτε ώστε τιμές και διαθεσιμότητα να μένουν σε ένα σύστημα. Αν η σημερινή μηχανή είναι ο λόγος που εγκαταλείπουν οι επισκέπτες θα σας το πούμε, αλλά η αλλαγή είναι δική σας εμπορική απόφαση και δεν την πιέζουμε.',
        },
        {
          q: 'Σε πόσες γλώσσες πρέπει να είναι το site;',
          a: 'Ξεκινήστε από τις αγορές που ήδη σας κλείνουν, κάτι που φαίνεται στα δεδομένα κρατήσεων. Μια γλώσσα δεν είναι απλή μετάφραση, είναι πλήρες σύνολο σελίδων με σωστό hreflang, οπότε είναι προτιμότερο τρεις σωστά παρά έξι πρόχειρα.',
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
  const cut = t.h1.lastIndexOf(', ');
  const thCls = 'px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground';

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      <PageHero
        locale={locale}
        size="md"
        breadcrumbs={breadcrumbs}
        pill={{
          href: lp('/services/ai-visibility'),
          kind: 'ai',
          tag: 'AI',
          text: tx('Be the hotel ChatGPT and Gemini recommend', 'Γίνετε το ξενοδοχείο που προτείνουν ChatGPT και Gemini'),
        }}
        title={
          cut > 0 ? (
            <>
              {t.h1.slice(0, cut + 2)}
              <Accent>{t.h1.slice(cut + 2)}</Accent>
            </>
          ) : (
            t.h1
          )
        }
        lead={t.lede}
        actions={
          <div className="flex flex-col items-center gap-3">
            <AgencyCtas locale={locale} primaryHref={lp('/get-started?project=hotels')} primaryLabel={t.ctaPrimary} />
            <Link href="#proof" className="text-[14px] font-medium text-muted-foreground underline decoration-hairline underline-offset-4 hover:text-foreground">
              {t.ctaSecondary}
            </Link>
          </div>
        }
      >
        <div className="mx-auto mt-14 w-full max-w-[1240px] px-3 sm:px-6">
          <AppWindow
            label={tx(
              'Search Console overview for a sample Paros hotel: clicks, impressions, CTR, position and the next fixes.',
              'Επισκόπηση Search Console για δείγμα ξενοδοχείου στην Πάρο: κλικ, εμφανίσεις, CTR, θέση και οι επόμενες διορθώσεις.',
            )}
            badge={
              <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {tx('Sample hotel', 'Δείγμα ξενοδοχείου')}
              </span>
            }
          >
            <OverviewPreview locale={locale} />
          </AppWindow>
        </div>
      </PageHero>

      {/* The four leaks, as a numbered diagnostic beside the ranked fixes */}
      <KitSection>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <KitHeading
              eyebrow={t.leaks.eyebrow}
              eyebrowIcon={<Stethoscope />}
              title={t.leaks.title}
              description={t.leaks.body}
            />
            <ol className="mt-10 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface/60">
              {t.leaks.items.map((it) => (
                <li key={it.n} className="reveal flex gap-4 p-5 sm:p-6">
                  <span className="font-mono text-[12px] font-medium text-brand">{it.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold text-foreground">{it.t}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{it.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal min-w-0 lg:sticky lg:top-28">
            <Stage>
              <DecisionsPanel locale={locale} details />
            </Stage>
            <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
              {tx('Each leak becomes a ranked fix with the clicks it should bring.', 'Κάθε διαρροή γίνεται διόρθωση με σειρά και τα κλικ που αναμένεται να φέρει.')}
            </p>
          </div>
        </div>
      </KitSection>

      {/* Direct vs marketplace */}
      <KitSection tinted>
        <FeatureRow
          eyebrow={t.parity.eyebrow}
          eyebrowIcon={<Wallet />}
          title={t.parity.title}
          body={t.parity.body}
          note={t.parity.note}
          preview={
            <Stage>
              <div className="overflow-x-auto rounded-xl border border-hairline bg-background">
                <table className="w-full min-w-[22rem] border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-hairline bg-surface/60">
                      <th className={thCls} />
                      <th className={thCls}>{t.parity.otaHead}</th>
                      <th className={`${thCls} !text-brand`}>{t.parity.directHead}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.parity.rows.map((r) => (
                      <tr key={r.k} className="border-b border-hairline last:border-0">
                        <td className="px-4 py-3.5 font-medium text-foreground">{r.k}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{r.ota}</td>
                        <td className="px-4 py-3.5 font-medium text-brand">{r.direct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Stage>
          }
        />
      </KitSection>

      {/* Language / market matrix */}
      <KitSection>
        <FeatureRow
          flip
          eyebrow={t.matrix.eyebrow}
          eyebrowIcon={<Languages />}
          title={t.matrix.title}
          body={t.matrix.body}
          note={t.matrix.note}
          preview={
            <Stage>
              <div className="overflow-x-auto rounded-xl border border-hairline bg-background">
                <table className="w-full min-w-[24rem] border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-hairline bg-surface/60">
                      <th className={thCls}>{isEl ? 'Σελίδες' : 'Pages'}</th>
                      {t.matrix.langs.map((l) => (
                        <th key={l} className={`${thCls} !text-center`}>
                          {l}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.matrix.rows.map((r) => (
                      <tr key={r.m} className="border-b border-hairline last:border-0">
                        <td className="px-4 py-3.5 font-medium text-foreground">{r.m}</td>
                        {r.v.map((on, i) => (
                          <td key={i} className="px-4 py-3.5 text-center">
                            {on ? (
                              <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand" aria-label={isEl ? 'Ναι' : 'Yes'}>
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
            </Stage>
          }
        />
      </KitSection>

      {/* Room structure, then AI answers */}
      <KitSection tinted>
        <div className="grid gap-24 sm:gap-28">
          <FeatureRow
            eyebrow={t.rooms.eyebrow}
            eyebrowIcon={<BedDouble />}
            title={t.rooms.title}
            body={t.rooms.body}
            bullets={t.rooms.points}
            preview={
              <Stage>
                <LocalPackPreview locale={locale} />
              </Stage>
            }
          />
          <FeatureRow
            flip
            eyebrow="GEO / AEO"
            eyebrowIcon={<Bot />}
            title={
              <>
                {tx('Recommended when guests', 'Να σας προτείνει η AI όταν οι επισκέπτες')} <Accent>{tx('ask AI', 'ρωτούν')}</Accent>
              </>
            }
            body={tx(
              'More guests now ask ChatGPT or Gemini where to stay. We track whether your hotel is mentioned and give your pages the clear facts those answers quote.',
              'Όλο και περισσότεροι επισκέπτες ρωτούν το ChatGPT ή το Gemini πού να μείνουν. Μετράμε αν αναφέρεται το ξενοδοχείο σας και δίνουμε στις σελίδες σας τα σαφή στοιχεία που χρησιμοποιούν αυτές οι απαντήσεις.',
            )}
            links={[
              { href: lp('/services/ai-visibility'), label: tx('AI visibility service', 'Υπηρεσία ορατότητας σε AI'), primary: true },
              { href: lp('/ai-visibility-check'), label: tx('Free AI check', 'Δωρεάν έλεγχος AI') },
            ]}
            preview={
              <Stage>
                <AiVisibilityPreview locale={locale} />
              </Stage>
            }
          />
        </div>
      </KitSection>

      {/* Proof as alternating wide rows */}
      <KitSection id="proof">
        <KitHeading eyebrow={t.proof.eyebrow} eyebrowIcon={<Briefcase />} title={t.proof.title} description={t.proof.body} />
        <div className="mt-14 grid gap-16">
          {projects.map((p, i) => (
            <Link key={p.slug} href={lp(`/work/${p.slug}`)} className="reveal group grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-hairline ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <PortfolioThumbnail
                  src={p.screenshot}
                  alt={p.name}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em] text-foreground">{p.name}</h3>
                  <ArrowUpRight className="mt-1.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{isEl ? p.summaryEl : p.summary}</p>
                <CheckList size="sm" className="mt-5 border-t border-hairline pt-4" items={((isEl ? p.resultsEl : p.results) ?? []).slice(0, 3)} />
              </div>
            </Link>
          ))}
        </div>
      </KitSection>

      {/* Services */}
      <KitSection tinted>
        <KitHeading eyebrow={t.servicesBlock.eyebrow} eyebrowIcon={<Layers />} title={t.servicesBlock.title} />
        <ChipLinks
          className="mt-10"
          items={services
            .filter((s) => isIndustryServiceIndexable('hotels', s.slug, locale))
            .map((s) => {
              const el = isEl ? getServiceEl(s.slug) : null;
              return { href: lp(`/solutions/hotels/${s.slug}`), label: el?.shortName ?? el?.name ?? s.shortName };
            })}
        />
        <p className="mt-8 text-[14px]">
          <Link href={lp('/pricing')} className="inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline">
            {t.cta.secondary}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </KitSection>

      <KitFaq eyebrow={t.faq.eyebrow} title={t.faq.title} items={t.faq.items.map((f) => ({ question: f.q, answer: f.a }))} />

      <CtaBand
        locale={locale}
        source="solutions-hotels"
        title={
          <>
            {t.cta.title.split(' ').slice(0, -2).join(' ')} <Accent>{t.cta.title.split(' ').slice(-2).join(' ')}</Accent>
          </>
        }
        description={t.cta.body}
      />
    </PageShell>
  );
}
