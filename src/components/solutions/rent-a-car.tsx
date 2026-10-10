import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Briefcase, CalendarRange, Layers, MapPin, Network, Wallet } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import {
  Accent,
  AgencyCtas,
  Container,
  CtaBand,
  DecisionsPanel,
  FeatureRow,
  KitEyebrow,
  KitHeading,
  KitSection,
  Stage,
} from '@/components/kit';
import { CardGrid, KitFaq, LinkCard, PageHero } from '@/components/page-kit';
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
    h1: 'Κατασκευή ιστοσελίδας rent a car που κλείνει την κράτηση απευθείας',
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
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#rac-season)" />
        <path d={line} fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
        {pts.map(([x, yy], i) => (
          <circle key={i} cx={x} cy={yy} r="3" fill="var(--brand)" />
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

  const tx = (en: string, el: string) => (isEl ? el : en);
  const splitAt = Math.max(t.h1.lastIndexOf(' that '), t.h1.lastIndexOf(' που '));

  const widget = (
    <div className="overflow-hidden rounded-xl border border-hairline bg-background text-left">
      <div className="flex items-center justify-between border-b border-hairline bg-surface px-4 py-3">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-brand">{t.widget.label}</span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-brand/60" />
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        {[
          { icon: MapPin, label: t.widget.pickup, value: t.widget.pickupValue },
          { icon: MapPin, label: t.widget.dropoff, value: t.widget.dropoffValue },
          { icon: CalendarRange, label: t.widget.dates, value: t.widget.datesValue },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg border border-hairline bg-surface/60 px-3.5 py-2.5">
            <Icon className="size-4 shrink-0 text-brand" aria-hidden />
            <span className="min-w-20 shrink-0 pr-1 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{label}</span>
            <span className="min-w-0 truncate text-[13.5px] font-medium text-foreground">{value}</span>
          </div>
        ))}
        <div className="flex h-10 items-center justify-center rounded-lg bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] px-5 font-display text-[14px] font-semibold text-primary-foreground">
          {t.widget.cta}
        </div>
      </div>
    </div>
  );

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      <PageHero
        locale={locale}
        breadcrumbs={breadcrumbs}
        pill={{
          href: '#proof',
          kind: 'popular',
          tag: t.stats[0].v,
          text: tx('rental sites delivered, all live projects', 'sites ενοικίασης που έχουμε παραδώσει'),
        }}
        title={
          splitAt > 0 ? (
            <>
              {t.h1.slice(0, splitAt + 1)}
              <Accent>{t.h1.slice(splitAt + 1)}</Accent>
            </>
          ) : (
            t.h1
          )
        }
        lead={t.lede}
        actions={
          <div className="flex flex-col items-center gap-3">
            <AgencyCtas locale={locale} primaryHref={lp('/get-started?project=rent-a-car')} primaryLabel={t.ctaPrimary} />
            <Link href="#proof" className="text-[14px] font-medium text-muted-foreground underline decoration-hairline underline-offset-4 hover:text-foreground">
              {t.ctaSecondary}
            </Link>
          </div>
        }
      >
        <Container className="mt-14">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Stage className="flex flex-col justify-center">
              {widget}
              <p className="mt-3 text-center text-[11.5px] text-muted-foreground">{t.widget.note}</p>
            </Stage>
            <Stage>
              <DecisionsPanel locale={locale} count={3} />
            </Stage>
          </div>
          <div className="mt-8">
            <KitEyebrow className="mb-3">{t.atAGlance}</KitEyebrow>
            <dl className="grid overflow-hidden rounded-2xl border border-hairline bg-surface/60 text-left sm:grid-cols-3">
              {t.stats.map((s, i) => (
                <div key={s.k} className={`px-6 py-5 ${i > 0 ? 'border-t border-hairline sm:border-l sm:border-t-0' : ''}`}>
                  <dt className="sr-only">{s.k}</dt>
                  <dd className="font-display text-[24px] font-semibold tracking-[-0.03em] text-foreground">{s.v}</dd>
                  <dd className="mt-1 text-[13.5px] text-muted-foreground">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </PageHero>

      <KitSection>
        <div className="grid gap-24 sm:gap-28">
          <FeatureRow
            eyebrow={t.season.eyebrow}
            eyebrowIcon={<CalendarRange />}
            title={t.season.title}
            body={t.season.body}
            bullets={t.season.points}
            preview={
              <Stage>
                <div className="rounded-xl border border-hairline bg-background p-5 sm:p-6">
                  <SeasonCurve months={t.season.months} />
                  <p className="mt-5 border-t border-hairline pt-4 text-[11.5px] leading-relaxed text-muted-foreground">{t.season.caption}</p>
                </div>
              </Stage>
            }
          />
          <FeatureRow
            flip
            eyebrow={t.fleet.eyebrow}
            eyebrowIcon={<Network />}
            title={t.fleet.title}
            body={t.fleet.body}
            bullets={t.fleet.points}
            preview={
              <Stage>
                <div className="rounded-xl border border-hairline bg-background p-5 font-mono text-[13px] sm:p-6">
                  {t.fleet.tree.map((n) => (
                    <div
                      key={n.path}
                      // Wraps so the label drops under the path on a 320px phone
                      // instead of pushing past the edge of the sheet.
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-[7px]"
                      style={{ paddingLeft: `${n.depth * 1.15}rem` }}
                    >
                      {n.depth > 0 && (
                        <span aria-hidden className="text-muted-foreground/40">
                          └
                        </span>
                      )}
                      <span className="text-brand">{n.path}</span>
                      <span className="ml-auto shrink-0 font-sans text-[11px] text-muted-foreground">{n.label}</span>
                    </div>
                  ))}
                </div>
              </Stage>
            }
          />
        </div>
      </KitSection>

      {/* Channel math */}
      <KitSection tinted>
        <KitHeading eyebrow={t.channel.eyebrow} eyebrowIcon={<Wallet />} title={t.channel.title} description={t.channel.body} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="reveal rounded-2xl border border-hairline bg-background/70 p-6 sm:p-7">
            <KitEyebrow>{t.channel.otaLabel}</KitEyebrow>
            <div className="mt-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{t.channel.otaValue}</div>
            <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-hairline" aria-hidden>
              <span className="h-full w-[78%] bg-foreground/25" />
              <span className="h-full w-[22%] bg-destructive/70" />
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{t.channel.otaNote}</p>
          </div>
          <div className="reveal rounded-2xl border border-brand/30 bg-background/70 p-6 sm:p-7">
            <KitEyebrow className="text-brand">{t.channel.directLabel}</KitEyebrow>
            <div className="mt-3 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{t.channel.directValue}</div>
            <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-hairline" aria-hidden>
              <span className="h-full w-full bg-brand" />
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{t.channel.directNote}</p>
          </div>
        </div>
        <p className="mt-6 text-[12px] text-muted-foreground">{t.channel.footnote}</p>
      </KitSection>

      {/* Proof wall: the real rental projects */}
      <KitSection id="proof">
        <KitHeading eyebrow={t.proof.eyebrow} eyebrowIcon={<Briefcase />} title={t.proof.title} description={t.proof.body} />
        <CardGrid className="mt-12">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={lp(`/work/${p.slug}`)}
              className="reveal group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/60 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                <PortfolioThumbnail src={p.screenshot} alt={p.name} className="transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-semibold text-foreground">{p.name}</h3>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                </div>
                <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{isEl ? p.summaryEl : p.summary}</p>
              </div>
            </Link>
          ))}
        </CardGrid>
      </KitSection>

      {/* Services applied */}
      <KitSection tinted>
        <KitHeading eyebrow={t.servicesBlock.eyebrow} eyebrowIcon={<Layers />} title={t.servicesBlock.title} description={t.servicesBlock.body} />
        <CardGrid className="mt-10">
          {services.map((s) => {
            const el = isEl ? getServiceEl(s.slug) : null;
            return (
              <LinkCard
                key={s.slug}
                href={lp(`/solutions/rent-a-car/${s.slug}`)}
                title={el?.name ?? s.name}
                text={el?.description ?? s.description}
              />
            );
          })}
        </CardGrid>
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
        source="solutions-rent-a-car"
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
