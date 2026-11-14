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
import { getServiceEl, localTopicsEl } from '@/data/services-i18n';
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


const copy = {
  en: {
    eyebrow: 'Local SEO',
    h1: 'Help local customers find you on Google Maps',
    lede:
      'When someone nearby needs your service, a map listing can be the first place they see your business. We check what they see there, whether they can reach you and how your local pages appear in search.',
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
      title: 'How Google orders local results',
      body:
        'Google mainly uses relevance, distance and prominence to order local results. Two people making the same search from opposite sides of town may see different businesses.',
      items: [
        {
          k: 'Relevance',
          d: 'How well your profile and site match what was searched. Categories, services and the words you actually use.',
          movable: true,
        },
        {
          k: 'Distance',
          d: 'How far your premises are from the searcher or the location used in the search.',
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
      title: 'What customers see on your Google Business Profile',
      body:
        'Someone ready to visit needs current opening hours, the right entrance and a working number. We check the listing as a customer would see it on their phone.',
      points: [
        'Correct primary and secondary categories',
        'Services and service areas that match how people search',
        'Hours, holiday hours and attributes kept current',
        'Photos, products and posts that are actually maintained',
        'A booking or appointment link where available',
      ],
    },
    nap: {
      eyebrow: 'Consistency',
      title: 'Which listings still show your old address?',
      body:
        'If you moved or changed your phone number, an old directory listing can still send customers to the wrong place. We compare the details on your site, map listing and main directories.',
      badLabel: 'Drifted',
      goodLabel: 'Consistent',
      bad: [
        'Acme Plumbing Ltd, 12 Iroon Str., 210-555-0100',
        'Directory: 24 Iroon Street, former premises',
        'Map: 12 Iroon Street, old number 210 555 0199',
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
        'A location page earns its place when it answers a question specific to that area, such as where customers collect a car or which days you offer appointments. We start with places where you operate.',
      more: 'See all locations',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions about local SEO',
      items: [
        {
          q: 'How long before we appear in the map pack?',
          a: 'There is no fixed date or guaranteed position. We document the changes, sample searches from relevant locations and report available calls and direction requests.',
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
          a: 'An eligible business can have a profile without a website. A website gives people somewhere to compare services, read booking terms or request an appointment.',
        },
      ],
    },
    cta: {
      title: 'Find out where you stand locally',
      body: 'Send us your profile and the area you serve. We will check what customers see and which details need attention.',
      primary: 'Request a quote',
      secondary: 'See pricing',
    },
  },
  el: {
    eyebrow: 'Τοπικό SEO',
    h1: 'Τοπικό SEO για αναζητήσεις στο Google Maps',
    lede:
      'Όταν κάποιος ψάχνει κοντά του, μπορεί να δει πρώτα το Google Business Profile σας. Ελέγχουμε τι γράφει για τις υπηρεσίες σας, αν δείχνει το σωστό ωράριο και αν μπορεί ο πελάτης να σας καλέσει ή να σας βρει στον χάρτη.',
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
        'Η Google εξηγεί ότι η σειρά των τοπικών αποτελεσμάτων βασίζεται κυρίως στη συνάφεια, την απόσταση και την αναγνωρισιμότητα. Δύο άνθρωποι που κάνουν την ίδια αναζήτηση σε διαφορετικά σημεία της πόλης μπορεί να δουν διαφορετικές επιχειρήσεις.',
      items: [
        {
          k: 'Συνάφεια',
          d: 'Πόσο ταιριάζει το προφίλ και το site σας με αυτό που αναζητήθηκε. Κατηγορίες, υπηρεσίες και οι λέξεις που πραγματικά χρησιμοποιείτε.',
          movable: true,
        },
        {
          k: 'Απόσταση',
          d: 'Πού βρίσκεται η επιχείρησή σας σε σχέση με τον άνθρωπο που ψάχνει ή με την τοποθεσία της αναζήτησης.',
          movable: false,
        },
        {
          k: 'Αναγνωρισιμότητα',
          d: 'Πόσο γνωστή είναι η επιχείρηση. Η Google αναφέρει, μεταξύ άλλων, συνδέσμους από άλλες ιστοσελίδες, τον αριθμό των κριτικών και τις βαθμολογίες.',
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
        'Αν κάποιος θέλει να έρθει σήμερα, πρέπει να ξέρει αν είστε ανοιχτά και ποια είσοδο να χρησιμοποιήσει. Ελέγχουμε αυτά τα στοιχεία στο προφίλ, όπως εμφανίζονται στο κινητό του πελάτη.',
      points: [
        'Σωστή κύρια και δευτερεύουσες κατηγορίες',
        'Υπηρεσίες και περιοχές εξυπηρέτησης όπως τις ψάχνει ο κόσμος',
        'Ωράριο, αργίες και χαρακτηριστικά πάντα ενημερωμένα',
        'Φωτογραφίες, προϊόντα και δημοσιεύσεις που όντως συντηρούνται',
        'Σύνδεσμος για ραντεβού ή κράτηση, όπου προσφέρεται',
      ],
    },
    nap: {
      eyebrow: 'Συνέπεια',
      title: 'Ποιες καταχωρίσεις δείχνουν ακόμη την παλιά διεύθυνση;',
      body:
        'Αν μετακομίσατε ή αλλάξατε τηλέφωνο, ένας παλιός κατάλογος μπορεί ακόμη να στέλνει πελάτες σε λάθος διεύθυνση. Συγκρίνουμε την ιστοσελίδα, τους Χάρτες και τις βασικές καταχωρίσεις για να βρούμε πού χρειάζεται διόρθωση.',
      badLabel: 'Με αποκλίσεις',
      goodLabel: 'Συνεπές',
      bad: [
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, 210-555-0100',
        'Κατάλογος: Ηρώων 24, παλιά έδρα',
        'Χάρτης: Ηρώων 12, παλιό τηλέφωνο 210 555 0199',
      ],
      good: [
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
        'Acme Υδραυλικές ΕΠΕ, Ηρώων 12, +30 210 555 0100',
      ],
    },
    coverage: {
      eyebrow: 'Κάλυψη',
      title: 'Πότε χρειάζεται σελίδα για μια περιοχή',
      body:
        'Μια χωριστή σελίδα έχει νόημα όταν εξηγεί κάτι χρήσιμο για τη συγκεκριμένη περιοχή, όπως πού παραλαμβάνει ο πελάτης ένα όχημα ή ποιες ημέρες κάνετε επισκέψεις. Αρχίζουμε από τα σημεία όπου πράγματι εξυπηρετείτε κόσμο.',
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
          q: 'Μπορείτε να μας πείτε πότε θα εμφανιστούμε στον χάρτη;',
          a: 'Δεν υπάρχει εγγυημένη ημερομηνία ή θέση. Μπορούμε να σας δείξουμε τι αλλάξαμε στο προφίλ, πού εμφανίζεται η επιχείρηση στις δοκιμές μας και ποια στοιχεία για κλήσεις ή οδηγίες πρόσβασης είναι διαθέσιμα.',
        },
        {
          q: 'Εξυπηρετούμε ολόκληρη περιοχή, όχι μία διεύθυνση. Δουλεύει το τοπικό SEO;',
          a: 'Ναι. Αν πηγαίνετε εσείς στον πελάτη, δηλώνετε τις περιοχές που εξυπηρετείτε. Αν δεν δέχεστε κόσμο στην έδρα σας, αποκρύπτετε τη διεύθυνση από το δημόσιο προφίλ.',
        },
        {
          q: 'Μπορείτε να μας φέρετε αξιολογήσεις;',
          a: 'Μπορούμε να στήσουμε τη διαδικασία που κάνει εύκολο σε πραγματικούς πελάτες να αφήσουν αξιολόγηση και να φροντίσουμε να τη ζητάτε τη σωστή στιγμή. Δεν γράφουμε αξιολογήσεις, δεν τις αγοράζουμε και δεν συνεργαζόμαστε με υπηρεσίες που το κάνουν.',
        },
        {
          q: 'Χρειαζόμαστε ιστοσελίδα αν έχουμε προφίλ Google;',
          a: 'Μπορείτε να έχετε επιλέξιμο προφίλ και χωρίς ιστοσελίδα. Η ιστοσελίδα είναι χρήσιμη όταν ο πελάτης θέλει να συγκρίνει υπηρεσίες, να διαβάσει όρους ή να κλείσει ραντεβού.',
        },
      ],
    },
    cta: {
      title: 'Δείτε πού βρίσκεστε στον χάρτη',
      body: 'Στείλτε μας το προφίλ σας και πείτε μας πού εξυπηρετείτε πελάτες. Θα ελέγξουμε τι βλέπει κάποιος που σας αναζητά και ποιες πληροφορίες χρειάζονται διόρθωση.',
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
          { href: lp('/ypiresies/times'), label: t.cta.secondary },
        ]}
        visual={<LocalPackPreview locale={locale} city={isEl ? 'Πάρος' : 'Paros'} />}
        visualLabel={kit.heroLabel[locale]}
        caption={t.pack.note}
      />

      {/* 2 - The three ranking factors */}
      <KitSection id="factors" className="mt-6 sm:mt-10">
        <KitHeading eyebrow={t.factors.eyebrow} eyebrowIcon={<MapPin />} title={<AccentTitle text={t.factors.title} />} description={t.factors.body} />
        <p className="mt-4 text-[14px]">
          <a className="text-link underline underline-offset-4" href={`https://support.google.com/business/answer/7091?hl=${locale}`}>
            {isEl ? 'Πώς εξηγεί η Google την τοπική κατάταξη' : 'How Google explains local ranking'}
          </a>
        </p>
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

      {isEl ? <TopicSections topics={localTopicsEl} locale={locale} id="reviews" /> : null}

      {/* 5 - Pricing, from src/data/pricing.ts */}
      <KitSection tinted id="pricing">
        <KitHeading align="center" eyebrow={pricing.eyebrow} title={<AccentTitle text={pricing.title} />} description={pricing.body} />
        <PriceTiers kind="seo" locale={locale} className="mt-12" />
        <p className="mt-10 text-center text-[14px]">
          <Link href={lp('/ypiresies/times')} className="font-medium text-link underline-offset-4 hover:underline">
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
      <CtaBand agency locale={locale} source="service-local-seo" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
    </PageShell>
  );
}
