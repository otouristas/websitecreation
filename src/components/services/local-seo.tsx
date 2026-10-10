import Link from 'next/link';
import { MapPin, Phone, Star } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { BeforeAfter, CtaBand, FeatureRow, KitHeading, KitSection, LocalPackPreview, MarketingBadge, Stage } from '@/components/kit';
import {
  AccentTitle,
  ChipLinks,
  FaqBlock,
  GbpProfilePreview,
  NapListPreview,
  PriceTiers,
  ServiceHero,
  getServiceKit,
  pick,
} from '@/components/service-kit';
import { cn } from '@/lib/cn';
import { getIndexableServiceLocations } from '@/data/locations';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl, type ServiceTopicEl } from '@/data/services-i18n';
import { resolvePriceTokens } from '@/data/pricing';
import { TopicSections } from './topic-sections';
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
 * Integrity: the hero uses the kit's sample-hotel local pack (clearly labelled
 * as sample data, with the "illustrative, not a promise of placement" note as
 * its caption); nothing on the page claims a real client's ranking.
 */

const SIGNATURE_HUE = 200;

/** Greek keyword-map H2s with no English counterpart on this page. */
const topicsEl: readonly ServiceTopicEl[] = [
  {
    title: 'Κριτικές: πώς τις αυξάνετε σωστά',
    paragraphs: [
      'Ζητήστε κριτική τη στιγμή που ο πελάτης είναι ικανοποιημένος, με έναν απευθείας σύνδεσμο προς το προφίλ σας, και απαντήστε σε κάθε κριτική, θετική ή αρνητική. Δεν γράφουμε, δεν αγοράζουμε και δεν «φιλτράρουμε» κριτικές: παραβιάζουν τις οδηγίες της Google και μπορεί να οδηγήσουν σε αναστολή του προφίλ.',
    ],
  },
  {
    title: 'Τοπικό SEO για ξενοδοχεία και rent-a-car στα νησιά',
    paragraphs: [
      'Στα νησιά ο επισκέπτης ψάχνει πριν φτάσει, συχνά στα αγγλικά και με όνομα λιμανιού ή αεροδρομίου. Το προφίλ, οι φωτογραφίες και οι σελίδες σας πρέπει να απαντούν σε αυτές τις αναζητήσεις. Δείτε πώς το εφαρμόζουμε στις [ιστοσελίδες ξενοδοχείων](/solutions/hotels) και στις [ιστοσελίδες rent a car](/solutions/rent-a-car).',
      'Αν η επιχείρησή σας δεν είναι ακόμα στον χάρτη, ξεκινήστε από τον οδηγό [πώς βάζω την επιχείρησή μου στο Google Maps](/blog/epixeirisi-sto-google-maps).',
    ],
  },
];

const copy = {
  en: {
    eyebrow: 'Local SEO',
    h1: 'Local SEO that puts you in the map pack, where local searches actually end',
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
    h1: 'Τοπικό SEO: εμφάνιση στο Google Maps και στις τοπικές αναζητήσεις',
    lede:
      'Το τοπικό SEO κάνει την επιχείρησή σας να εμφανίζεται στον χάρτη της Google και στα τοπικά αποτελέσματα όταν κάποιος ψάχνει «κοντά μου» ή με όνομα πόλης. Ξεκινάμε από το Google Business Profile (πρώην Google My Business) και τη συνέπεια των στοιχείων σας σε όλο το διαδίκτυο.',
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
      title: 'Τι είναι το τοπικό SEO και τι κρίνει τη θέση σας',
      body:
        'Οι περισσότεροι δεν κατεβαίνουν ποτέ κάτω από τα τρία αποτελέσματα του χάρτη. Η Google αναφέρει ότι αυτά κατατάσσονται με βάση τη συνάφεια, την απόσταση και την αναγνωρισιμότητα. Την έδρα σας δεν τη μετακινείτε, οπότε η δουλειά πάει στα άλλα δύο.',
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
      title: 'Βελτιστοποίηση Google Business Profile',
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
      title: 'Σελίδες ανά περιοχή και τοπικά backlinks',
      body:
        'Μια σελίδα επικοινωνίας με είκοσι πόλεις δεν κατατάσσεται σε καμία. Φτιάχνουμε πραγματικές σελίδες περιοχών, μόνο για μέρη όπου όντως δραστηριοποιείστε, και τις στηρίζουμε με συνδέσμους από τοπικά sites, συλλόγους και καταλόγους της περιοχής.',
      more: 'Δείτε όλες τις περιοχές',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Συχνές ερωτήσεις για το τοπικό SEO',
      items: [
        {
          q: 'Γιατί η επιχείρησή μου δεν εμφανίζεται στο Google Maps;',
          a: 'Οι πιο συχνές αιτίες είναι ότι το προφίλ δεν έχει επαληθευτεί, η κύρια κατηγορία δεν ταιριάζει με αυτό που ψάχνει ο πελάτης, τα στοιχεία διαφέρουν από site σε site ή απλώς άλλοι ανταγωνιστές είναι πιο κοντά και πιο γνωστοί. Ξεκινάμε από έναν έλεγχο του προφίλ για να δούμε ποιο από αυτά ισχύει.',
        },
        {
          q: 'Πώς βάζω την επιχείρησή μου στο Google Maps;',
          a: 'Δημιουργείτε δωρεάν Google Business Profile, δηλώνετε διεύθυνση ή περιοχή εξυπηρέτησης, επιλέγετε κατηγορία και ολοκληρώνετε την επαλήθευση. Τα βήματα αναλυτικά είναι στον οδηγό μας «Πώς βάζω την επιχείρησή μου στο Google Maps».',
        },
        {
          q: 'Πόσο κοστίζει το τοπικό SEO;',
          a: 'Το τοπικό SEO περιλαμβάνεται σε όλα τα μηνιαία πακέτα SEO, από {{ENTRY_SEO}} τον μήνα χωρίς ΦΠΑ. Για μία τοποθεσία σε μία πόλη συνήθως αρκεί το Foundations· περισσότερες τοποθεσίες ή ανταγωνιστικοί κλάδοι χρειάζονται μεγαλύτερο πακέτο.',
        },
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
      title: 'Δείτε πού βρίσκεστε στον χάρτη',
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

  // Live local-seo city pages only. This listed 18 US cities on /en (all of
  // them noindex, now 410) and the first 18 Greek cities on /el.
  const locations = getIndexableServiceLocations(locale);

  const faqs = t.faq.items.map((f) => ({ question: f.q, answer: resolvePriceTokens(f.a, locale) }));

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
    generateFAQSchema({ faqs }),
  );

  const kit = getServiceKit('local-seo');
  const pricing = isEl
    ? { eyebrow: 'Τιμές', title: 'Τιμές & πακέτα', body: 'Το τοπικό SEO περιλαμβάνεται σε όλα τα μηνιαία πακέτα SEO. Ο ΦΠΑ 24% φαίνεται σε κάθε τιμή.', all: 'Δείτε όλες τις τιμές' }
    : { eyebrow: 'Pricing', title: 'Pricing & packages', body: 'Local SEO is part of every monthly SEO package. 24% VAT is shown on every figure.', all: 'See all pricing' };

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Hero with the local pack */}
      <ServiceHero
        locale={locale}
        breadcrumbs={breadcrumbs}
        pill={{ kind: kit.pill.kind, tag: pick(kit.pill.tag, locale), text: kit.pill.text[locale], href: lp(kit.pill.href) }}
        h1={t.h1}
        lead={t.lede}
        primaryLabel={t.ctaPrimary}
        primaryHref={lp('/get-started?service=local-seo')}
        links={[
          { href: '#factors', label: t.ctaSecondary },
          { href: lp('/pricing'), label: t.cta.secondary },
        ]}
        visual={<LocalPackPreview locale={locale} city={isEl ? 'Πάρος' : 'Paros'} />}
        visualLabel={kit.heroLabel[locale]}
        caption={t.pack.note}
      />

      {/* 2 - The three ranking factors */}
      <KitSection id="factors" className="mt-6 sm:mt-10">
        <KitHeading eyebrow={t.factors.eyebrow} eyebrowIcon={<MapPin />} title={<AccentTitle text={t.factors.title} />} description={t.factors.body} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.factors.items.map((f, i) => (
            <div
              key={f.k}
              className={cn(
                'reveal flex flex-col rounded-2xl border p-6',
                f.movable ? 'border-hairline bg-surface/60' : 'border-dashed border-hairline bg-transparent',
              )}
              style={{ ['--rv' as string]: `${i * 6}%` }}
            >
              <MarketingBadge kind={f.movable ? 'live' : 'save'} className="w-fit">
                {f.movable ? t.factors.movableLabel : t.factors.fixedLabel}
              </MarketingBadge>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-foreground">{f.k}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </KitSection>

      {/* 3 - Google Business Profile */}
      <KitSection tinted>
        <FeatureRow
          flip
          eyebrow={t.profile.eyebrow}
          eyebrowIcon={<Star />}
          title={<AccentTitle text={t.profile.title} />}
          body={t.profile.body}
          bullets={t.profile.points}
          preview={
            <Stage>
              <GbpProfilePreview locale={locale} />
            </Stage>
          }
        />
      </KitSection>

      {/* 4 - NAP consistency, shown as before / after */}
      <KitSection>
        <KitHeading eyebrow={t.nap.eyebrow} eyebrowIcon={<Phone />} title={<AccentTitle text={t.nap.title} />} description={t.nap.body} />
        <div className="mt-12">
          <BeforeAfter
            before={{
              tag: t.nap.badLabel,
              title: 'NAP',
              text: isEl ? 'Επωνυμία, διεύθυνση, τηλέφωνο' : 'Name, address, phone',
              node: (
                <Stage className="p-2.5 sm:p-4">
                  <NapListPreview title={t.nap.badLabel} lines={t.nap.bad} tone="bad" />
                </Stage>
              ),
            }}
            after={{
              tag: t.nap.goodLabel,
              title: 'NAP',
              text: isEl ? 'Ίδια παντού' : 'The same everywhere',
              node: (
                <Stage className="p-2.5 sm:p-4">
                  <NapListPreview title={t.nap.goodLabel} lines={t.nap.good} tone="good" />
                </Stage>
              ),
            }}
          />
        </div>
      </KitSection>

      {isEl ? <TopicSections topics={topicsEl} locale={locale} id="reviews" /> : null}

      {/* 5 - Pricing, from src/data/pricing.ts */}
      <KitSection tinted id="pricing">
        <KitHeading align="center" eyebrow={pricing.eyebrow} title={<AccentTitle text={pricing.title} />} description={pricing.body} />
        <PriceTiers kind="seo" locale={locale} className="mt-12" />
        <p className="mt-10 text-center text-[14px]">
          <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
            {pricing.all}
          </Link>
        </p>
      </KitSection>

      {/* 6 - Coverage */}
      <KitSection id="locations">
        <KitHeading eyebrow={t.coverage.eyebrow} eyebrowIcon={<MapPin />} title={<AccentTitle text={t.coverage.title} />} description={t.coverage.body} />
        <ChipLinks
          className="mt-10"
          items={locations.map((l) => ({
            href: lp(`/services/local-seo/${l.slug}`),
            label: 'cityLocal' in l && l.cityLocal ? l.cityLocal : l.city,
          }))}
        />
        <p className="mt-8 text-[14px]">
          <Link href={lp('/locations')} className="font-medium text-link underline-offset-4 hover:underline">
            {t.coverage.more}
          </Link>
        </p>
      </KitSection>

      {/* 7 - FAQ */}
      <FaqBlock
        locale={locale}
        tinted
        eyebrow={t.faq.eyebrow}
        title={<AccentTitle text={t.faq.title} />}
        faqs={faqs}
      />

      {/* 8 - CTA */}
      <CtaBand locale={locale} source="service-local-seo" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
    </PageShell>
  );
}
