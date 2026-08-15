import Link from 'next/link';
import { MapPin, Star, Clock, Phone } from 'lucide-react';
import { PageShell, ShellCrumbs } from '@/components/bespoke/PageShell';
import { PrimaryButtonLink, GhostButtonLink, Bloom, Tick } from '@/components/landing/primitives';
import { greeceLocations, tier1Locations } from '@/data/locations';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  combineSchemas,
  BASE_URL,
} from '@/lib/seo/schema';

/**
 * /services/local-seo - bespoke.
 *
 * Signature: 165 (green-teal, the map register). The page is organised around
 * the local pack itself, because that is the only result most local searches
 * ever look at. Google documents three ranking factors for it - relevance,
 * distance and prominence - so those carry the middle of the page rather than a
 * generic feature grid, and the NAP section is shown as a diff because that is
 * how the problem actually looks in the wild.
 *
 * Integrity: the pack mockup uses placeholder slots and carries no invented
 * business names, star ratings or review counts.
 */

const SIGNATURE_HUE = 165;

const copy = {
  en: {
    eyebrow: 'Local SEO',
    h1: 'Show up in the map pack, where local searches actually end',
    lede:
      'For "near me" and city searches, most people never scroll past the three map results. Getting into that block is a different job from ranking a web page, and it is the one that brings a local business the phone call.',
    ctaPrimary: 'Get a local SEO quote',
    ctaSecondary: 'How it works',
    pack: {
      label: 'Local results',
      query: 'plumber near me',
      slots: ['Position 1', 'Position 2', 'Position 3'],
      meta: ['Open now', 'Call', 'Directions'],
      note: 'Illustrative structure of the local pack. Not a live result and not a promise of placement.',
    },
    factors: {
      eyebrow: 'What decides it',
      title: 'Three factors, and only one of them is fixed',
      body:
        'Google states that local results are ranked on relevance, distance and prominence. You cannot move your premises, so the work goes into the other two.',
      items: [
        {
          k: 'Relevance',
          d: 'How well your profile and site match what was searched. Categories, services and the words you actually use.',
          movable: true,
        },
        {
          k: 'Distance',
          d: 'How far you are from the searcher or the place they named. This one you cannot change, so it sets a realistic radius.',
          movable: false,
        },
        {
          k: 'Prominence',
          d: 'How well known the business is: citations, links, coverage, and the review activity you earn honestly over time.',
          movable: true,
        },
      ],
      movableLabel: 'We work on this',
      fixedLabel: 'Fixed constraint',
    },
    profile: {
      eyebrow: 'Profile',
      title: 'A Google Business Profile is a product page you do not own',
      body:
        'It is often the first thing a customer sees and the last page they need. Half-filled profiles lose to complete ones for the same search.',
      points: [
        'Correct primary and secondary categories',
        'Services and service areas that match how people search',
        'Hours, holiday hours and attributes kept current',
        'Photos, products and posts that are actually maintained',
        'Questions answered before a competitor answers them',
      ],
    },
    nap: {
      eyebrow: 'Consistency',
      title: 'The same business, listed four different ways',
      body:
        'Name, address and phone need to match everywhere they appear. When they drift, the signals split between versions and none of them get full credit.',
      badLabel: 'Drifted',
      goodLabel: 'Consistent',
      bad: [
        'Acme Plumbing Ltd, 12 Iroon Str., 210-555-0100',
        'Acme Plumbing, 12 Iroon Street, +30 210 555 0100',
        'ACME PLUMBING LTD, Iroon 12, 2105550100',
      ],
      good: [
        'Acme Plumbing Ltd, 12 Iroon Street, +30 210 555 0100',
        'Acme Plumbing Ltd, 12 Iroon Street, +30 210 555 0100',
        'Acme Plumbing Ltd, 12 Iroon Street, +30 210 555 0100',
      ],
    },
    coverage: {
      eyebrow: 'Coverage',
      title: 'A page per place you actually serve',
      body:
        'One contact page listing twenty cities ranks for none of them. Real location pages, only for places you genuinely operate in.',
      more: 'See all locations',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions about local SEO',
      items: [
        {
          q: 'How long before we appear in the map pack?',
          a: 'Profile and consistency work can show movement within weeks, while prominence builds over months. Anyone who gives you a date is guessing. We work in indicative phases and report what actually changed.',
        },
        {
          q: 'We serve a whole region, not one address. Does local SEO still work?',
          a: 'Yes, through service area configuration rather than a pin per town. Creating fake addresses to cover more area violates Google guidelines and gets profiles suspended, so we do not do it.',
        },
        {
          q: 'Can you get us reviews?',
          a: 'We can set up the process that makes it easy for real customers to leave one, and make sure you are asking at the right moment. We do not write reviews, buy them, or use services that do.',
        },
        {
          q: 'Do we need a website if we have a Google profile?',
          a: 'Yes. The profile is the shopfront, the site is what backs up its claims and it is where relevance is established. Businesses with a thin or missing site consistently struggle in competitive local searches.',
        },
      ],
    },
    cta: {
      title: 'Find out where you stand locally',
      body: 'Tell us your business and the area you cover. We will look at your profile, your citations and who is currently taking the pack.',
      primary: 'Request a quote',
      secondary: 'See pricing',
    },
  },
  el: {
    eyebrow: 'Τοπικό SEO',
    h1: 'Εμφανιστείτε στο τοπικό πακέτο χάρτη, εκεί που καταλήγουν οι τοπικές αναζητήσεις',
    lede:
      'Στις αναζητήσεις «κοντά μου» και με όνομα πόλης, οι περισσότεροι δεν κατεβαίνουν ποτέ κάτω από τα τρία αποτελέσματα του χάρτη. Το να μπείτε εκεί είναι διαφορετική δουλειά από το να ανεβάσετε μια σελίδα, και είναι αυτή που φέρνει το τηλεφώνημα σε μια τοπική επιχείρηση.',
    ctaPrimary: 'Ζητήστε προσφορά για τοπικό SEO',
    ctaSecondary: 'Πώς δουλεύει',
    pack: {
      label: 'Τοπικά αποτελέσματα',
      query: 'υδραυλικός κοντά μου',
      slots: ['Θέση 1', 'Θέση 2', 'Θέση 3'],
      meta: ['Ανοιχτά τώρα', 'Κλήση', 'Οδηγίες'],
      note: 'Ενδεικτική δομή του τοπικού πακέτου. Δεν είναι πραγματικό αποτέλεσμα ούτε υπόσχεση θέσης.',
    },
    factors: {
      eyebrow: 'Τι το κρίνει',
      title: 'Τρεις παράγοντες, και μόνο ο ένας είναι δεδομένος',
      body:
        'Η Google αναφέρει ότι τα τοπικά αποτελέσματα κατατάσσονται με βάση τη συνάφεια, την απόσταση και την αναγνωρισιμότητα. Την έδρα σας δεν τη μετακινείτε, οπότε η δουλειά πάει στα άλλα δύο.',
      items: [
        {
          k: 'Συνάφεια',
          d: 'Πόσο ταιριάζει το προφίλ και το site σας με αυτό που αναζητήθηκε. Κατηγορίες, υπηρεσίες και οι λέξεις που πραγματικά χρησιμοποιείτε.',
          movable: true,
        },
        {
          k: 'Απόσταση',
          d: 'Πόσο μακριά είστε από τον χρήστη ή από το σημείο που ανέφερε. Αυτό δεν αλλάζει, οπότε ορίζει μια ρεαλιστική ακτίνα.',
          movable: false,
        },
        {
          k: 'Αναγνωρισιμότητα',
          d: 'Πόσο γνωστή είναι η επιχείρηση: αναφορές, σύνδεσμοι, δημοσιότητα και οι αξιολογήσεις που κερδίζετε τίμια με τον χρόνο.',
          movable: true,
        },
      ],
      movableLabel: 'Εδώ δουλεύουμε',
      fixedLabel: 'Δεδομένος περιορισμός',
    },
    profile: {
      eyebrow: 'Προφίλ',
      title: 'Το Google Business Profile είναι σελίδα προϊόντος που δεν σας ανήκει',
      body:
        'Συχνά είναι το πρώτο που βλέπει ο πελάτης και η τελευταία σελίδα που χρειάζεται. Τα μισογεμισμένα προφίλ χάνουν από τα πλήρη στην ίδια αναζήτηση.',
      points: [
        'Σωστή κύρια και δευτερεύουσες κατηγορίες',
        'Υπηρεσίες και περιοχές εξυπηρέτησης όπως τις ψάχνει ο κόσμος',
        'Ωράριο, αργίες και χαρακτηριστικά πάντα ενημερωμένα',
        'Φωτογραφίες, προϊόντα και δημοσιεύσεις που όντως συντηρούνται',
        'Απαντήσεις σε ερωτήσεις πριν απαντήσει ο ανταγωνιστής',
      ],
    },
    nap: {
      eyebrow: 'Συνέπεια',
      title: 'Η ίδια επιχείρηση, καταχωρημένη με τέσσερις διαφορετικούς τρόπους',
      body:
        'Επωνυμία, διεύθυνση και τηλέφωνο πρέπει να ταιριάζουν παντού. Όταν αποκλίνουν, τα σήματα μοιράζονται ανάμεσα στις εκδοχές και καμία δεν παίρνει πλήρη αξία.',
      badLabel: 'Με αποκλίσεις',
      goodLabel: 'Συνεπές',
      bad: [
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, 210-555-0100',
        'Acme Υδραυλικές, Ηρώων 12, +30 210 555 0100',
        'ACME ΥΔΡΑΥΛΙΚΕΣ ΕΠΕ, Οδός Ηρώων 12, 2105550100',
      ],
      good: [
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
      ],
    },
    coverage: {
      eyebrow: 'Κάλυψη',
      title: 'Μία σελίδα για κάθε περιοχή που πραγματικά εξυπηρετείτε',
      body:
        'Μια σελίδα επικοινωνίας με είκοσι πόλεις δεν κατατάσσεται σε καμία. Πραγματικές σελίδες περιοχών, μόνο για μέρη όπου όντως δραστηριοποιείστε.',
      more: 'Δείτε όλες τις περιοχές',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Συχνές ερωτήσεις για το τοπικό SEO',
      items: [
        {
          q: 'Σε πόσο καιρό θα εμφανιστούμε στο πακέτο χάρτη;',
          a: 'Η δουλειά στο προφίλ και στη συνέπεια μπορεί να δείξει κίνηση μέσα σε εβδομάδες, ενώ η αναγνωρισιμότητα χτίζεται σε μήνες. Όποιος σας δίνει ημερομηνία μαντεύει. Δουλεύουμε σε ενδεικτικές φάσεις και αναφέρουμε τι πραγματικά άλλαξε.',
        },
        {
          q: 'Εξυπηρετούμε ολόκληρη περιοχή, όχι μία διεύθυνση. Δουλεύει το τοπικό SEO;',
          a: 'Ναι, μέσω ρύθμισης περιοχής εξυπηρέτησης και όχι με μια καρφίτσα ανά πόλη. Η δημιουργία πλασματικών διευθύνσεων για μεγαλύτερη κάλυψη παραβιάζει τις οδηγίες της Google και οδηγεί σε αναστολή του προφίλ, οπότε δεν το κάνουμε.',
        },
        {
          q: 'Μπορείτε να μας φέρετε αξιολογήσεις;',
          a: 'Μπορούμε να στήσουμε τη διαδικασία που κάνει εύκολο σε πραγματικούς πελάτες να αφήσουν αξιολόγηση και να φροντίσουμε να τη ζητάτε τη σωστή στιγμή. Δεν γράφουμε αξιολογήσεις, δεν τις αγοράζουμε και δεν συνεργαζόμαστε με υπηρεσίες που το κάνουν.',
        },
        {
          q: 'Χρειαζόμαστε ιστοσελίδα αν έχουμε προφίλ Google;',
          a: 'Ναι. Το προφίλ είναι η βιτρίνα, το site είναι αυτό που τεκμηριώνει όσα λέει και εκεί χτίζεται η συνάφεια. Επιχειρήσεις με ελλιπές ή ανύπαρκτο site δυσκολεύονται σταθερά σε ανταγωνιστικές τοπικές αναζητήσεις.',
        },
      ],
    },
    cta: {
      title: 'Δείτε πού βρίσκεστε τοπικά',
      body: 'Πείτε μας την επιχείρηση και την περιοχή σας. Θα κοιτάξουμε το προφίλ σας, τις αναφορές σας και ποιος κρατά σήμερα το πακέτο.',
      primary: 'Ζητήστε προσφορά',
      secondary: 'Δείτε τιμές',
    },
  },
} as const;

export function LocalSeoPage({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const t = isEl ? copy.el : copy.en;
  const lp = (p: string) => localizedPath(locale, p);
  const service = getServiceBySlug('local-seo');
  const serviceEl = isEl ? getServiceEl('local-seo') : null;

  const locations = isEl ? greeceLocations.slice(0, 18) : tier1Locations.slice(0, 18);

  const breadcrumbs = [
    { name: isEl ? 'Αρχική' : 'Home', url: lp('/') },
    { name: isEl ? 'Υπηρεσίες' : 'Services', url: lp('/services') },
    { name: serviceEl?.name ?? service?.name ?? 'Local SEO', url: lp('/services/local-seo') },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: serviceEl?.name ?? service?.name ?? 'Local SEO',
      description: serviceEl?.description ?? service?.description ?? t.lede,
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      areaServed: isEl ? ['GR'] : ['GR', 'US', 'GB'],
      serviceType: isEl ? 'Τοπικό SEO' : 'Local SEO',
    }),
    generateFAQSchema({ faqs: t.faq.items.map((f) => ({ question: f.q, answer: f.a })) }),
  );

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Hero with the local pack mockup */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom signature className="left-[60%] top-[-10rem] h-[30rem] w-[46rem]" />
        <div className="main-below-header relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <ShellCrumbs items={breadcrumbs} />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.eyebrow}
            </span>
            <h1 className="rise-in mt-4 font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-foreground md:text-[3.3rem]">
              {t.h1}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp('/get-started?service=local-seo')}>
                {t.ctaPrimary}
              </PrimaryButtonLink>
              <GhostButtonLink href="#factors">{t.ctaSecondary}</GhostButtonLink>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[14px] border border-signature/25 bg-surface ring-1 ring-hairline">
              <div className="border-b border-hairline bg-surface-raised/80 px-4 py-3">
                <div className="flex items-center gap-2 rounded-full border border-hairline bg-background px-3 py-1.5">
                  <span className="text-[11px] text-muted-foreground">{t.pack.query}</span>
                </div>
              </div>

              {/* map plate */}
              <div className="relative h-28 border-b border-hairline bg-signature/5">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                {[
                  { l: '24%', tp: '52%' },
                  { l: '52%', tp: '30%' },
                  { l: '74%', tp: '62%' },
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: p.l, top: p.tp }}
                  >
                    <MapPin className="size-5 text-signature" aria-hidden />
                  </span>
                ))}
              </div>

              <div className="divide-y divide-hairline">
                {t.pack.slots.map((s, i) => (
                  <div key={s} className="flex items-start gap-3 px-4 py-3.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-signature/15 text-[10px] font-medium text-signature">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="h-2.5 w-28 rounded-[2px] bg-foreground/15" />
                      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3" aria-hidden />
                          <span className="inline-block h-1.5 w-6 rounded-[2px] bg-foreground/10" />
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" aria-hidden />
                          {t.pack.meta[0]}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3" aria-hidden />
                          {t.pack.meta[1]}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
              {t.pack.note}
            </p>
          </div>
        </div>
      </section>

      {/* 2 - The three ranking factors */}
      <section id="factors" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.factors.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.factors.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.factors.body}</p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline md:grid-cols-3">
          {t.factors.items.map((f) => (
            <div key={f.k} className="flex flex-col bg-surface p-7">
              <span
                className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${
                  f.movable
                    ? 'bg-signature/12 text-signature'
                    : 'bg-foreground/8 text-muted-foreground'
                }`}
              >
                {f.movable ? t.factors.movableLabel : t.factors.fixedLabel}
              </span>
              <h3 className="mt-5 font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                {f.k}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 - Google Business Profile */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.profile.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.profile.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.profile.body}</p>
          </div>
          <ul className="space-y-px self-center overflow-hidden rounded-[12px] border border-hairline bg-hairline">
            {t.profile.points.map((p) => (
              <li key={p} className="flex gap-3 bg-background p-5 text-sm text-muted-foreground">
                <Tick className="text-signature" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 - NAP consistency, shown as a diff */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.nap.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.nap.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.nap.body}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[12px] border border-hairline">
            <div className="border-b border-hairline bg-destructive/8 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-destructive">
              {t.nap.badLabel}
            </div>
            <ul className="divide-y divide-hairline bg-surface font-mono text-[12px] leading-relaxed">
              {t.nap.bad.map((l, i) => (
                <li key={i} className="px-5 py-3.5 text-muted-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[12px] border border-signature/30">
            <div className="border-b border-hairline bg-signature/8 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-signature">
              {t.nap.goodLabel}
            </div>
            <ul className="divide-y divide-hairline bg-surface font-mono text-[12px] leading-relaxed">
              {t.nap.good.map((l, i) => (
                <li key={i} className="px-5 py-3.5 text-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 - Coverage */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.coverage.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.coverage.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.coverage.body}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={lp(`/services/local-seo/${l.slug}`)}
                className="rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-signature/40 hover:text-foreground"
              >
                {'cityLocal' in l && l.cityLocal ? l.cityLocal : l.city}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href={lp('/locations')} className="font-medium text-signature hover:underline">
              {t.coverage.more}
            </Link>
          </p>
        </div>
      </section>

      {/* 6 - FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
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
      </section>

      {/* 7 - CTA */}
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
            <PrimaryButtonLink href={lp('/get-started?service=local-seo')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
