import Link from 'next/link';
import { ArrowUpRight, CalendarRange, MapPin } from 'lucide-react';
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
 * /solutions/rent-a-car - bespoke.
 *
 * Signature: 205 (Aegean cyan). Structure is built around the three things that
 * actually decide a car rental site's search performance - a season that opens
 * and closes, a booking funnel competing with OTAs, and a fleet that has to be
 * crawlable as a catalogue - none of which the generic industry template
 * expressed. This is our deepest vertical: 14 of the 71 projects are rentals,
 * so the proof wall is real screenshots, not claims.
 *
 * Integrity: the season curve and the commission band are labelled market
 * context. No client traffic, revenue or ranking figures appear anywhere.
 */

const SIGNATURE_HUE = 205;

const copy = {
  en: {
    eyebrow: 'Rent-a-car',
    h1: 'Car rental sites that take the booking direct',
    lede:
      'Rental demand arrives in a narrow season, from people comparing you against an OTA on a phone at an airport. The site has to load fast, quote a real price, and let them finish. That is what we build.',
    ctaPrimary: 'Get a quote for your rental site',
    ctaSecondary: 'See rental projects',
    widget: {
      label: 'Booking search',
      pickup: 'Pick-up',
      pickupValue: 'Athens Airport (ATH)',
      dropoff: 'Drop-off',
      dropoffValue: 'Same location',
      dates: 'Dates',
      datesValue: '12 Jul - 19 Jul',
      cta: 'Check availability',
      note: 'Illustrative interface, not a live booking engine.',
    },
    atAGlance: 'At a glance',
    stats: [
      { k: 'Rental projects delivered', v: '14' },
      { k: 'Built bilingual EN / EL', v: 'Standard' },
      { k: 'Airport, port and island pages', v: 'Per location' },
    ],
    season: {
      eyebrow: 'Season',
      title: 'Your year is not flat, so your site cannot be either',
      body:
        'Island and airport rental demand opens in spring, peaks in high summer and closes again. Rankings earned in February are what convert in July, because a page that starts ranking in June has already missed the booking window.',
      caption:
        'Indicative seasonal shape for Greek island and airport rental demand. Market context, not client data.',
      months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      points: [
        'Content and technical work lands in the off season',
        'Fleet and offer pages are live before demand opens',
        'Peak months are for conversion work, not rebuilds',
      ],
    },
    channel: {
      eyebrow: 'Channel',
      title: 'Every OTA booking costs you a cut. Every direct booking does not.',
      body:
        'Marketplaces bring volume and take commission on each reservation. A direct booking keeps that margin and gives you the customer relationship. We are not arguing you leave the OTAs, we are arguing you stop being dependent on them.',
      otaLabel: 'Via an OTA',
      otaValue: 'Commission on every booking',
      otaNote: 'Market commission on car rental marketplaces commonly sits in the mid-teens to mid-twenties percent range.',
      directLabel: 'Direct on your site',
      directValue: 'No per booking commission',
      directNote: 'You keep the margin, the customer data and the repeat business.',
      footnote: 'Commission ranges are market context. Your actual rates depend on your agreements.',
    },
    fleet: {
      eyebrow: 'Architecture',
      title: 'A fleet is a catalogue, so it gets crawled like one',
      body:
        'Most rental sites hide the whole fleet behind a booking widget, which leaves Google nothing to index. Each category and each vehicle gets a real URL that can rank on its own.',
      tree: [
        { depth: 0, path: '/', label: 'Home' },
        { depth: 1, path: '/fleet', label: 'Full fleet' },
        { depth: 2, path: '/fleet/economy', label: 'Economy' },
        { depth: 3, path: '/fleet/economy/fiat-panda', label: 'Vehicle page' },
        { depth: 2, path: '/fleet/suv', label: 'SUV and 4x4' },
        { depth: 1, path: '/locations', label: 'Locations' },
        { depth: 2, path: '/locations/athens-airport', label: 'Airport pickup' },
        { depth: 2, path: '/locations/piraeus-port', label: 'Port pickup' },
      ],
      points: [
        'Vehicle pages carry specs, transmission, seats and rates',
        'Location pages target airport and port pickup queries',
        'Offer and long-term pages sit outside the booking widget',
      ],
    },
    proof: {
      eyebrow: 'Proof',
      title: 'Rental sites we have built',
      body: 'Live projects. Every screenshot below is a real site we delivered.',
      visit: 'Visit site',
    },
    servicesBlock: {
      eyebrow: 'Services',
      title: 'What we apply to a rental site',
      body: 'Pick the piece you need, or the whole build.',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions from rental operators',
      items: [
        {
          q: 'Can you connect the site to our booking engine?',
          a: 'Yes. We build around your existing reservation system rather than replacing it, so rates and availability stay in one place. If you have not chosen one yet we will help you compare options against how you actually operate.',
        },
        {
          q: 'Do we need a separate page for every car?',
          a: 'For anything you want found in search, yes. A vehicle page can rank for model specific queries and gives you somewhere to put specs, transmission, luggage and seasonal rates. Cars you rarely rent out can stay inside a category page.',
        },
        {
          q: 'Should the site be in Greek and English?',
          a: 'For island and airport rental, almost always. Your booking demand is largely inbound, and the Greek version still matters for local and long term rental. We build both properly rather than machine translating one into the other.',
        },
        {
          q: 'When should we start if we want to be ready for summer?',
          a: 'Technical and content work needs to be finished before demand opens, so winter is the right time to build. Starting in May means competing in the peak with a site that has not had time to establish itself. These are indicative phases, not guaranteed timelines.',
        },
      ],
    },
    cta: {
      title: 'Tell us about your fleet',
      body: 'Send us your current site and the locations you cover. We will come back with what is worth fixing first.',
      primary: 'Request a quote',
      secondary: 'See pricing',
    },
  },
  el: {
    eyebrow: 'Ενοικίαση αυτοκινήτων',
    h1: 'Sites ενοικίασης που κλείνουν την κράτηση απευθείας',
    lede:
      'Η ζήτηση έρχεται σε στενή σεζόν, από ανθρώπους που σας συγκρίνουν με ένα OTA από το κινητό τους στο αεροδρόμιο. Το site πρέπει να φορτώνει γρήγορα, να δίνει πραγματική τιμή και να τους αφήνει να ολοκληρώσουν. Αυτό χτίζουμε.',
    ctaPrimary: 'Ζητήστε προσφορά για το site σας',
    ctaSecondary: 'Δείτε έργα ενοικίασης',
    widget: {
      label: 'Αναζήτηση κράτησης',
      pickup: 'Παραλαβή',
      pickupValue: 'Αεροδρόμιο Αθηνών (ATH)',
      dropoff: 'Επιστροφή',
      dropoffValue: 'Ίδιο σημείο',
      dates: 'Ημερομηνίες',
      datesValue: '12 Ιουλ - 19 Ιουλ',
      cta: 'Έλεγχος διαθεσιμότητας',
      note: 'Ενδεικτικό περιβάλλον, όχι ενεργή μηχανή κρατήσεων.',
    },
    atAGlance: 'Με μια ματιά',
    stats: [
      { k: 'Έργα ενοικίασης που παραδώσαμε', v: '14' },
      { k: 'Δίγλωσσα EN / EL', v: 'Πάντα' },
      { k: 'Σελίδες αεροδρομίου, λιμανιού και νησιού', v: 'Ανά σημείο' },
    ],
    season: {
      eyebrow: 'Σεζόν',
      title: 'Η χρονιά σας δεν είναι επίπεδη, ούτε το site μπορεί να είναι',
      body:
        'Η ζήτηση σε νησιά και αεροδρόμια ανοίγει την άνοιξη, κορυφώνεται στην καρδιά του καλοκαιριού και κλείνει ξανά. Οι θέσεις που κερδίζετε τον Φεβρουάριο είναι αυτές που φέρνουν κρατήσεις τον Ιούλιο, γιατί μια σελίδα που αρχίζει να ανεβαίνει τον Ιούνιο έχει ήδη χάσει το παράθυρο.',
      caption:
        'Ενδεικτική εικόνα εποχικότητας για ζήτηση σε ελληνικά νησιά και αεροδρόμια. Δεδομένα αγοράς, όχι στοιχεία πελατών.',
      months: ['Απρ', 'Μάι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ'],
      points: [
        'Το τεχνικό κομμάτι και το περιεχόμενο γίνονται εκτός σεζόν',
        'Οι σελίδες στόλου και προσφορών είναι live πριν ανοίξει η ζήτηση',
        'Οι μήνες αιχμής είναι για βελτίωση μετατροπών, όχι για ανακατασκευή',
      ],
    },
    channel: {
      eyebrow: 'Κανάλι',
      title: 'Κάθε κράτηση μέσω OTA σας κοστίζει προμήθεια. Η απευθείας όχι.',
      body:
        'Οι πλατφόρμες φέρνουν όγκο και κρατούν ποσοστό σε κάθε κράτηση. Μια απευθείας κράτηση κρατά αυτό το περιθώριο και σας δίνει τη σχέση με τον πελάτη. Δεν λέμε να φύγετε από τα OTAs, λέμε να πάψετε να εξαρτάστε από αυτά.',
      otaLabel: 'Μέσω OTA',
      otaValue: 'Προμήθεια σε κάθε κράτηση',
      otaNote: 'Οι προμήθειες στις πλατφόρμες ενοικίασης κινούνται συνήθως από τα μέσα του 10% έως τα μέσα του 20%.',
      directLabel: 'Απευθείας στο site σας',
      directValue: 'Χωρίς προμήθεια ανά κράτηση',
      directNote: 'Κρατάτε το περιθώριο, τα στοιχεία του πελάτη και την επαναληπτική κράτηση.',
      footnote: 'Τα ποσοστά είναι δεδομένα αγοράς. Οι δικές σας χρεώσεις εξαρτώνται από τις συμφωνίες σας.',
    },
    fleet: {
      eyebrow: 'Αρχιτεκτονική',
      title: 'Ο στόλος είναι κατάλογος, οπότε πρέπει να διαβάζεται σαν κατάλογος',
      body:
        'Τα περισσότερα sites ενοικίασης κρύβουν όλο τον στόλο πίσω από ένα widget κράτησης, οπότε η Google δεν έχει τι να καταχωρήσει. Κάθε κατηγορία και κάθε όχημα παίρνει πραγματικό URL που μπορεί να κατατάσσεται μόνο του.',
      tree: [
        { depth: 0, path: '/', label: 'Αρχική' },
        { depth: 1, path: '/fleet', label: 'Όλος ο στόλος' },
        { depth: 2, path: '/fleet/economy', label: 'Economy' },
        { depth: 3, path: '/fleet/economy/fiat-panda', label: 'Σελίδα οχήματος' },
        { depth: 2, path: '/fleet/suv', label: 'SUV και 4x4' },
        { depth: 1, path: '/locations', label: 'Σημεία' },
        { depth: 2, path: '/locations/athens-airport', label: 'Παραλαβή αεροδρομίου' },
        { depth: 2, path: '/locations/piraeus-port', label: 'Παραλαβή λιμανιού' },
      ],
      points: [
        'Οι σελίδες οχημάτων έχουν προδιαγραφές, κιβώτιο, θέσεις και τιμές',
        'Οι σελίδες σημείων στοχεύουν αναζητήσεις αεροδρομίου και λιμανιού',
        'Οι σελίδες προσφορών και μακροχρόνιας μίσθωσης είναι εκτός widget',
      ],
    },
    proof: {
      eyebrow: 'Έργα',
      title: 'Sites ενοικίασης που έχουμε φτιάξει',
      body: 'Ενεργά έργα. Κάθε screenshot παρακάτω είναι πραγματικό site που παραδώσαμε.',
      visit: 'Επίσκεψη',
    },
    servicesBlock: {
      eyebrow: 'Υπηρεσίες',
      title: 'Τι εφαρμόζουμε σε ένα site ενοικίασης',
      body: 'Διαλέξτε το κομμάτι που χρειάζεστε ή ολόκληρη την κατασκευή.',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Συχνές ερωτήσεις από γραφεία ενοικίασης',
      items: [
        {
          q: 'Μπορείτε να συνδέσετε το site με τη μηχανή κρατήσεων μας;',
          a: 'Ναι. Χτίζουμε γύρω από το σύστημα που ήδη χρησιμοποιείτε αντί να το αντικαταστήσουμε, ώστε τιμές και διαθεσιμότητα να μένουν σε ένα σημείο. Αν δεν έχετε επιλέξει ακόμη, σας βοηθάμε να συγκρίνετε με βάση το πώς πραγματικά δουλεύετε.',
        },
        {
          q: 'Χρειάζεται ξεχωριστή σελίδα για κάθε αυτοκίνητο;',
          a: 'Για ό,τι θέλετε να βρίσκεται στην αναζήτηση, ναι. Μια σελίδα οχήματος μπορεί να κατατάσσεται σε αναζητήσεις με συγκεκριμένο μοντέλο και σας δίνει χώρο για προδιαγραφές, κιβώτιο, αποσκευές και εποχικές τιμές. Οχήματα που νοικιάζετε σπάνια μπορούν να μείνουν μέσα στη σελίδα κατηγορίας.',
        },
        {
          q: 'Πρέπει το site να είναι στα ελληνικά και στα αγγλικά;',
          a: 'Για νησιά και αεροδρόμια, σχεδόν πάντα. Η ζήτηση είναι σε μεγάλο βαθμό εισερχόμενη, ενώ η ελληνική έκδοση εξακολουθεί να μετράει για τοπική και μακροχρόνια μίσθωση. Χτίζουμε σωστά και τις δύο, δεν περνάμε τη μία από αυτόματη μετάφραση.',
        },
        {
          q: 'Πότε πρέπει να ξεκινήσουμε για να είμαστε έτοιμοι το καλοκαίρι;',
          a: 'Το τεχνικό κομμάτι και το περιεχόμενο πρέπει να έχουν ολοκληρωθεί πριν ανοίξει η ζήτηση, οπότε ο χειμώνας είναι η σωστή στιγμή. Ξεκινώντας τον Μάιο μπαίνετε στην αιχμή με site που δεν πρόλαβε να σταθεροποιηθεί. Πρόκειται για ενδεικτικές φάσεις, όχι εγγυημένα χρονοδιαγράμματα.',
        },
      ],
    },
    cta: {
      title: 'Πείτε μας για τον στόλο σας',
      body: 'Στείλτε μας το σημερινό σας site και τα σημεία που καλύπτετε. Θα σας πούμε τι αξίζει να διορθωθεί πρώτο.',
      primary: 'Ζητήστε προσφορά',
      secondary: 'Δείτε τιμές',
    },
  },
} as const;

/** Indicative demand shape, Apr to Oct. Deliberately unitless - see caption. */
const SEASON_SHAPE = [18, 38, 66, 92, 100, 72, 34];

function SeasonCurve({ months }: { months: readonly string[] }) {
  const w = 640;
  const h = 180;
  const step = w / (SEASON_SHAPE.length - 1);
  const y = (v: number) => h - (v / 100) * (h - 24) - 12;
  const pts = SEASON_SHAPE.map((v, i) => [i * step, y(v)] as const);
  const line = pts.map(([x, yy], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yy.toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Indicative seasonal demand shape rising from April to a peak in August and falling through October"
      >
        <defs>
          <linearGradient id="rac-season" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--signature)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--signature)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#rac-season)" />
        <path d={line} fill="none" stroke="var(--signature)" strokeWidth="2" strokeLinecap="round" />
        {pts.map(([x, yy], i) => (
          <circle key={i} cx={x} cy={yy} r="3" fill="var(--signature)" />
        ))}
      </svg>
      <div className="mt-3 grid grid-cols-7 text-center text-[11px] text-muted-foreground">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </figure>
  );
}

export function RentACarPage({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const t = isEl ? copy.el : copy.en;
  const lp = (p: string) => localizedPath(locale, p);
  const industry = getLocalizedIndustry('rent-a-car', locale);
  const projects = getPortfolioByCategory('rent-a-car');

  const breadcrumbs = [
    { name: isEl ? 'Αρχική' : 'Home', url: lp('/') },
    { name: isEl ? 'Λύσεις' : 'Solutions', url: lp('/solutions') },
    { name: industry?.name ?? 'Rent-a-Car', url: lp('/solutions/rent-a-car') },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: t.h1,
      description: industry?.description ?? t.lede,
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      areaServed: isEl ? ['GR'] : ['GR', 'US', 'GB'],
      serviceType: isEl ? 'Κατασκευή ιστοσελίδων και SEO για ενοικίαση αυτοκινήτων' : 'Car rental website design and SEO',
    }),
    generateFAQSchema({ faqs: t.faq.items.map((f) => ({ question: f.q, answer: f.a })) }),
  );

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Hero: copy left, booking widget right */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom signature className="left-[62%] top-[-10rem] h-[30rem] w-[46rem]" />
        <div className="main-below-header relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <ShellCrumbs items={breadcrumbs} />
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.eyebrow}
            </span>
            <h1 className="rise-in mt-4 font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-foreground md:text-[3.4rem]">
              {t.h1}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp('/get-started?project=rent-a-car')}>
                {t.ctaPrimary}
              </PrimaryButtonLink>
              <GhostButtonLink href="#proof">{t.ctaSecondary}</GhostButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[14px] border border-signature/25 bg-surface ring-1 ring-hairline">
              <div className="flex items-center justify-between border-b border-hairline bg-surface-raised/80 px-5 py-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-signature">
                  {t.widget.label}
                </span>
                <span className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-foreground/15" />
                  <span className="size-2 rounded-full bg-foreground/15" />
                  <span className="size-2 rounded-full bg-signature/60" />
                </span>
              </div>
              <div className="space-y-3 p-5">
                {[
                  { icon: MapPin, label: t.widget.pickup, value: t.widget.pickupValue },
                  { icon: MapPin, label: t.widget.dropoff, value: t.widget.dropoffValue },
                  { icon: CalendarRange, label: t.widget.dates, value: t.widget.datesValue },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-[8px] border border-hairline bg-background px-4 py-3"
                  >
                    <Icon className="size-4 shrink-0 text-signature" aria-hidden />
                    <span className="w-24 shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="truncate text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
                <div className="flex h-11 items-center justify-center rounded-[8px] bg-signature px-5 font-display text-sm font-medium text-white">
                  {t.widget.cta}
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">{t.widget.note}</p>
          </div>
        </div>
      </section>

      {/* 2 - At a glance strip */}
      <section className="border-b border-hairline bg-surface-raised/30">
        <div className="mx-auto grid max-w-6xl gap-px bg-hairline px-0 sm:grid-cols-3">
          {t.stats.map((s) => (
            <div key={s.k} className="bg-background px-6 py-7">
              <div className="font-display text-2xl font-medium tracking-[-0.03em] text-signature">
                {s.v}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 - Season */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.season.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.season.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.season.body}</p>
            <ul className="mt-7 space-y-3">
              {t.season.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <Tick className="text-signature" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[12px] border border-hairline bg-surface p-6 md:p-8">
            <SeasonCurve months={t.season.months} />
            <p className="mt-5 border-t border-hairline pt-4 text-[11px] leading-relaxed text-muted-foreground">
              {t.season.caption}
            </p>
          </div>
        </div>
      </section>

      {/* 4 - Channel math */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.channel.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.channel.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.channel.body}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[12px] border border-hairline bg-background p-7">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {t.channel.otaLabel}
              </div>
              <div className="mt-3 font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                {t.channel.otaValue}
              </div>
              <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-hairline">
                <span className="h-full w-[78%] bg-foreground/25" />
                <span className="h-full w-[22%] bg-destructive/70" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.channel.otaNote}</p>
            </div>

            <div className="rounded-[12px] border border-signature/30 bg-background p-7">
              <div className="text-[11px] uppercase tracking-[0.14em] text-signature">
                {t.channel.directLabel}
              </div>
              <div className="mt-3 font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                {t.channel.directValue}
              </div>
              <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-hairline">
                <span className="h-full w-full bg-signature" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t.channel.directNote}
              </p>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground">{t.channel.footnote}</p>
        </div>
      </section>

      {/* 5 - Fleet architecture */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.fleet.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.fleet.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.fleet.body}</p>
            <ul className="mt-7 space-y-3">
              {t.fleet.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <Tick className="text-signature" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rule-sheet rounded-[12px] border border-hairline bg-surface p-6 font-mono text-[13px] md:p-7">
            {t.fleet.tree.map((n) => (
              <div
                key={n.path}
                className="flex items-baseline gap-3 py-[7px]"
                style={{ paddingLeft: `${n.depth * 1.15}rem` }}
              >
                {n.depth > 0 && (
                  <span aria-hidden className="text-muted-foreground/40">
                    └
                  </span>
                )}
                <span className="text-signature">{n.path}</span>
                <span className="ml-auto shrink-0 font-sans text-[11px] text-muted-foreground">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 - Proof wall: the 14 real rental projects */}
      <section id="proof" className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.proof.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.proof.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.proof.body}
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={lp(`/work/${p.slug}`)}
                className="group flex flex-col bg-surface transition-colors hover:bg-background"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                  <PortfolioThumbnail
                    src={p.screenshot}
                    alt={p.name}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                      {p.name}
                    </h3>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signature"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                    {isEl ? p.summaryEl : p.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 - Services applied */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
          {t.servicesBlock.eyebrow}
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
          {t.servicesBlock.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.servicesBlock.body}
        </p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const el = isEl ? getServiceEl(s.slug) : null;
            return (
              <Link
                key={s.slug}
                href={lp(`/solutions/rent-a-car/${s.slug}`)}
                className="group bg-surface p-6 transition-colors hover:bg-background"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[15px] font-medium text-foreground">
                    {el?.name ?? s.name}
                  </h3>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signature"
                    aria-hidden
                  />
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {el?.description ?? s.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 8 - FAQ */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.faq.title}
          </h2>
          <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
            {t.faq.items.map((f) => (
              <div key={f.q} className="py-6">
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
            <PrimaryButtonLink href={lp('/get-started?project=rent-a-car')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
