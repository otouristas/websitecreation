import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageShell, ShellCrumbs } from '@/components/bespoke/PageShell';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import { PrimaryButtonLink, GhostButtonLink, Bloom, Tick } from '@/components/landing/primitives';
import { getPortfolioByCategory } from '@/data/portfolio';
import { services } from '@/data/services';
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
    h1: 'Όταν κάποιος ψάχνει το ξενοδοχείο σας με το όνομά του, πρέπει να καταλήγει σε εσάς',
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

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Centred editorial hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom signature className="left-1/2 top-[-12rem] h-[32rem] w-[64rem] -translate-x-1/2" />
        <div className="main-below-header relative mx-auto max-w-4xl px-6 pb-20 pt-6 text-center">
          <div className="flex justify-center">
            <ShellCrumbs items={breadcrumbs} />
          </div>
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.eyebrow}
          </span>
          <h1 className="rise-in mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-[3.5rem]">
            {t.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.lede}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryButtonLink href={lp('/get-started?project=hotels')}>
              {t.ctaPrimary}
            </PrimaryButtonLink>
            <GhostButtonLink href="#proof">{t.ctaSecondary}</GhostButtonLink>
          </div>
        </div>
      </section>

      {/* 2 - The four leaks, as a numbered diagnostic */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.leaks.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.leaks.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.leaks.body}</p>
        </div>

        <ol className="mt-14 space-y-px overflow-hidden rounded-[12px] border border-hairline bg-hairline">
          {t.leaks.items.map((it) => (
            <li key={it.n} className="grid gap-4 bg-surface p-7 sm:grid-cols-[4rem_1fr] sm:gap-8 md:p-9">
              <span className="font-display text-3xl font-medium tracking-[-0.03em] text-signature/40">
                {it.n}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                  {it.t}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 - Direct vs marketplace comparison table */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.parity.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.parity.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.parity.body}</p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="py-3 pr-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground" />
                  <th className="py-3 pr-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {t.parity.otaHead}
                  </th>
                  <th className="py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-signature">
                    {t.parity.directHead}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.parity.rows.map((r) => (
                  <tr key={r.k} className="border-b border-hairline">
                    <td className="py-4 pr-4 text-sm font-medium text-foreground">{r.k}</td>
                    <td className="py-4 pr-4 text-sm text-muted-foreground">{r.ota}</td>
                    <td className="py-4 text-sm font-medium text-signature">{r.direct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">{t.parity.note}</p>
        </div>
      </section>

      {/* 4 - Language / market matrix */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.matrix.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.matrix.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.matrix.body}</p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline">
                <th className="py-3 pr-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {isEl ? 'Σελίδες' : 'Pages'}
                </th>
                {t.matrix.langs.map((l) => (
                  <th
                    key={l}
                    className="py-3 pr-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {l}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.matrix.rows.map((r) => (
                <tr key={r.m} className="border-b border-hairline">
                  <td className="py-4 pr-4 text-sm font-medium text-foreground">{r.m}</td>
                  {r.v.map((on, i) => (
                    <td key={i} className="py-4 pr-4 text-center">
                      {on ? (
                        <span
                          className="inline-block size-2.5 rounded-full bg-signature"
                          aria-label={isEl ? 'Ναι' : 'Yes'}
                        />
                      ) : (
                        <span
                          className="inline-block h-px w-3 bg-muted-foreground/40 align-middle"
                          aria-label={isEl ? 'Όχι' : 'No'}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">{t.matrix.note}</p>
      </section>

      {/* 5 - Room structure */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
                {t.rooms.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
                {t.rooms.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.rooms.body}</p>
            </div>
            <ul className="space-y-px overflow-hidden rounded-[12px] border border-hairline bg-hairline">
              {t.rooms.points.map((p) => (
                <li key={p} className="flex gap-3 bg-background p-5 text-sm text-muted-foreground">
                  <Tick className="text-signature" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 - Proof as alternating wide rows */}
      <section id="proof" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
          {t.proof.eyebrow}
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
          {t.proof.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.proof.body}
        </p>

        <div className="mt-14 space-y-14">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={lp(`/work/${p.slug}`)}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-[12px] border border-hairline ${
                  i % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <PortfolioThumbnail
                  src={p.screenshot}
                  alt={p.name}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signature"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isEl ? p.summaryEl : p.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                  {((isEl ? p.resultsEl : p.results) ?? []).slice(0, 3).map((r) => (
                    <li key={r} className="flex gap-2.5 text-[13px] text-muted-foreground">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-signature" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7 - Services */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.servicesBlock.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.servicesBlock.title}
          </h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => {
              const el = isEl ? getServiceEl(s.slug) : null;
              return (
                <Link
                  key={s.slug}
                  href={lp(`/solutions/hotels/${s.slug}`)}
                  className="rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-signature/40 hover:text-foreground"
                >
                  {el?.shortName ?? el?.name ?? s.shortName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 - FAQ */}
      <section className="border-t border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.faq.title}
          </h2>
          <dl className="mt-10 space-y-px overflow-hidden rounded-[12px] border border-hairline bg-hairline">
            {t.faq.items.map((f) => (
              <div key={f.q} className="bg-background p-6">
                <dt className="font-display text-[17px] font-medium tracking-[-0.01em] text-foreground">
                  {f.q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 9 - CTA */}
      <section className="relative overflow-hidden border-t border-hairline">
        <Bloom signature className="left-1/2 top-1/4 h-[24rem] w-[52rem] -translate-x-1/2" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.cta.body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButtonLink href={lp('/get-started?project=hotels')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
