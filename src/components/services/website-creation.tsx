import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { KeyRound, Layers, MapPin } from 'lucide-react';
import { CtaBand, FeatureRow, KitHeading, KitSection, Stage, StepsGrid } from '@/components/kit';
import {
  AccentTitle,
  BuildStagesPreview,
  ChipLinks,
  FaqBlock,
  OwnershipPreview,
  PriceTiers,
  ProofGrid,
  ServiceHero,
  getServiceKit,
  pick,
} from '@/components/service-kit';
import { portfolioProjects } from '@/data/portfolio';
import { PROJECTS_DELIVERED_LABEL } from '@/data/company-facts';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl, type ServiceTopicEl } from '@/data/services-i18n';
import { getIndexableServiceLocations } from '@/data/locations';
import { resolvePriceTokens } from '@/data/pricing';
import { getGreekLocative } from '@/lib/greek-locative';
import { TopicSections, renderInlineLinks } from './topic-sections';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  combineSchemas,
  BASE_URL,
} from '@/lib/seo/schema';

/**
 * /services/website-creation - bespoke.
 *
 * App-landing layout (service-kit): centered hero with a pre-launch audit
 * preview, then the four phases with the wireframe -> design -> live frames,
 * then what you actually own at the end. Ownership is the argument that closes this sale, so it gets its own
 * section rather than a bullet.
 *
 * Prices come from src/data/pricing.ts. Nothing here quotes a figure directly.
 */

const SIGNATURE_HUE = 259;

/**
 * Greek keyword-map H2s that have no English counterpart on this page
 * (κατασκευή ιστοσελίδας: τι περιλαμβάνει / παρουσίασης ή e-shop / WordPress).
 */
const topicsEl: readonly ServiceTopicEl[] = [
  {
    title: 'Τι περιλαμβάνει η κατασκευή ιστοσελίδας',
    paragraphs: [
      'Σχεδιασμό στα μέτρα του brand σας (όχι έτοιμο template), responsive κατασκευή mobile-first, τεχνικά θεμέλια SEO, ρύθμιση Analytics και Search Console και εκπαίδευση για να τη διαχειρίζεστε μόνοι σας. Τα κείμενα μπορούμε να τα γράψουμε εμείς ή να σας δώσουμε brief ανά σελίδα.',
      'Για τη συνεχή ανάπτυξη μετά το λανσάρισμα υπάρχουν οι [υπηρεσίες SEO](/seo-services), και για το συνολικό κόστος ο οδηγός [πόσο κοστίζει μια ιστοσελίδα](/blog/poso-kostizei-mia-istoselida).',
    ],
  },
  {
    title: 'Ιστοσελίδα παρουσίασης ή e-shop;',
    paragraphs: [
      'Μια ιστοσελίδα παρουσίασης φέρνει τηλεφωνήματα, αιτήματα και κρατήσεις: υπηρεσίες, περιοχές, έργα και φόρμα επικοινωνίας. Αν πουλάτε προϊόντα online, χρειάζεστε ηλεκτρονικό κατάστημα με πληρωμές, μεταφορικά και τιμολόγηση, δηλαδή [κατασκευή eshop](/services/eshop-woocommerce).',
    ],
  },
  {
    title: 'Κατασκευή ιστοσελίδας με WordPress ή custom;',
    paragraphs: [
      'Το WordPress ταιριάζει όταν θέλετε να αλλάζετε μόνοι σας κείμενα και σελίδες, και είναι η βάση κάθε e-shop που στήνουμε σε WooCommerce. Η custom κατασκευή ταιριάζει όταν χρειάζεστε ειδική λειτουργικότητα ή μέγιστη ταχύτητα. Η τιμή ορίζεται από το εύρος (σελίδες, γλώσσες, λειτουργίες), και σε κάθε περίπτωση το site μένει δικό σας.',
    ],
  },
];

const copy = {
  en: {
    eyebrow: 'Website creation',
    h1: 'Website creation built to be found, not just to look finished',
    lede:
      'A site that wins design awards and no search traffic is a brochure. We build the design and the search foundation as one job, so the thing you launch can actually bring you work.',
    ctaPrimary: 'Start your project',
    ctaSecondary: 'See the work',
    stages: [
      { k: 'Wireframe', d: 'Structure and page architecture first' },
      { k: 'Design', d: 'Your brand, applied to that structure' },
      { k: 'Live', d: 'Built, tested, indexed and handed over' },
    ],
    phases: {
      eyebrow: 'Process',
      title: 'How a build actually runs',
      body:
        'Four phases. You see work at the end of each one, so nothing is a surprise at launch.',
      items: [
        {
          n: '01',
          t: 'Scope and architecture',
          d: 'What pages exist, what each one is for, and which searches it is meant to answer. This is where SEO is decided, not at the end.',
        },
        {
          n: '02',
          t: 'Design',
          d: 'Applied to your brand, on real content, reviewed on mobile first because that is where most of your visitors are.',
        },
        {
          n: '03',
          t: 'Build',
          d: 'Fast, accessible, on clean markup with schema and Core Web Vitals handled during the build rather than patched afterwards.',
        },
        {
          n: '04',
          t: 'Launch and handover',
          d: 'Analytics and Search Console configured, redirects mapped if we are replacing a site, and training so you can run it.',
        },
      ],
    },
    ownership: {
      eyebrow: 'Ownership',
      title: 'You own what we build',
      body:
        'No proprietary page builder you can only edit by paying us. If you decide to work with someone else in two years, the site goes with you.',
      points: [
        'Your domain and hosting stay in your name',
        'Standard, portable technology with no lock-in',
        'You get admin access, not a limited client login',
        'Training so routine edits do not need us',
      ],
    },
    proof: {
      eyebrow: 'Work',
      title: 'Recent builds',
      body: (n: string) => `A selection from ${n} delivered projects. Every screenshot is a live site.`,
      all: 'See all work',
    },
    pricing: {
      eyebrow: 'Packages',
      title: 'What a build costs',
      body: 'Fixed scope, fixed price, agreed before we start. VAT shown on every figure.',
      all: 'Compare all packages',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Before you brief us',
      items: [
        {
          q: 'How long does a website take?',
          a: 'Between three and twelve weeks depending on scope, which is set by how many pages need real content and whether e-commerce is involved. The delivery window for each package is stated on it. These are indicative phases, not guaranteed dates.',
        },
        {
          q: 'Do you write the content?',
          a: 'We can. Most projects work best when you supply the raw facts about your business and we handle the structure, the writing and the search targeting. If you would rather write it yourself we will give you the brief for each page.',
        },
        {
          q: 'What happens to our current rankings if we rebuild?',
          a: 'This is the real risk in a rebuild and it is handled with a redirect map built before launch, so every existing URL points to its replacement. Skipping that step is how sites lose their traffic overnight.',
        },
        {
          q: 'Can we edit the site ourselves afterwards?',
          a: 'Yes, and we train you on it at handover. Routine changes like text, images, prices and new pages should not require an agency.',
        },
      ],
    },
    cta: {
      title: 'Tell us what you need built',
      body: 'Send us what you have now and what it needs to do. We will come back with scope and a fixed price.',
      primary: 'Start your project',
      secondary: 'See pricing',
    },
  },
  el: {
    eyebrow: 'Κατασκευή ιστοσελίδων',
    h1: 'Κατασκευή ιστοσελίδων που φέρνουν πελάτες από τη Google',
    lede:
      'Η κατασκευή ιστοσελίδας στην AnotherSEOGuru περιλαμβάνει σχεδιασμό, ανάπτυξη και βασικό SEO από την πρώτη μέρα. Η δημιουργία ιστοσελίδας ξεκινά από {{ENTRY_WEBSITE}} και ένα site παρουσίασης παραδίδεται συνήθως σε 3–5 εβδομάδες.',
    ctaPrimary: 'Ζητήστε προσφορά',
    ctaSecondary: 'Δείτε έργα',
    stages: [
      { k: 'Wireframe', d: 'Πρώτα η δομή και η αρχιτεκτονική σελίδων' },
      { k: 'Σχεδιασμός', d: 'Το brand σας, πάνω σε αυτή τη δομή' },
      { k: 'Live', d: 'Κατασκευή, έλεγχος, καταχώρηση και παράδοση' },
    ],
    phases: {
      eyebrow: 'Διαδικασία',
      title: 'Η διαδικασία κατασκευής ιστοσελίδας σε 4 βήματα',
      body:
        'Τέσσερις φάσεις. Βλέπετε δουλειά στο τέλος κάθε μίας, οπότε τίποτα δεν είναι έκπληξη στο λανσάρισμα.',
      items: [
        {
          n: '01',
          t: 'Εύρος και αρχιτεκτονική',
          d: 'Ποιες σελίδες υπάρχουν, τι εξυπηρετεί η καθεμία και σε ποιες αναζητήσεις απαντά. Εδώ κρίνεται το SEO, όχι στο τέλος.',
        },
        {
          n: '02',
          t: 'Σχεδιασμός',
          d: 'Πάνω στο brand σας, με πραγματικό περιεχόμενο, με έλεγχο πρώτα σε κινητό γιατί εκεί βρίσκονται οι περισσότεροι επισκέπτες σας.',
        },
        {
          n: '03',
          t: 'Κατασκευή',
          d: 'Γρήγορη, προσβάσιμη, με καθαρό κώδικα, schema και Core Web Vitals μέσα στην κατασκευή αντί για μπάλωμα μετά.',
        },
        {
          n: '04',
          t: 'Λανσάρισμα και παράδοση',
          d: 'Ρύθμιση Analytics και Search Console, χάρτης ανακατευθύνσεων αν αντικαθιστούμε παλιό site, και εκπαίδευση για να το τρέχετε.',
        },
      ],
    },
    ownership: {
      eyebrow: 'Ιδιοκτησία',
      title: 'Ό,τι χτίζουμε είναι δικό σας',
      body:
        'Κανένας κλειστός page builder που μπορείτε να επεξεργαστείτε μόνο πληρώνοντάς μας. Αν σε δύο χρόνια αποφασίσετε να συνεργαστείτε με άλλον, το site φεύγει μαζί σας.',
      points: [
        'Το domain και το hosting μένουν στο όνομά σας',
        'Τυπική, μεταφέρσιμη τεχνολογία χωρίς εγκλωβισμό',
        'Παίρνετε πρόσβαση διαχειριστή, όχι περιορισμένο λογαριασμό πελάτη',
        'Εκπαίδευση ώστε οι απλές αλλαγές να μη χρειάζονται εμάς',
      ],
    },
    proof: {
      eyebrow: 'Έργα',
      title: 'Πρόσφατες κατασκευές',
      body: (n: string) =>
        `Μια επιλογή από ${n} έργα που έχουμε παραδώσει ως εταιρεία κατασκευής ιστοσελίδων. Κάθε screenshot είναι ενεργό site.`,
      all: 'Δείτε όλα τα έργα',
    },
    pricing: {
      eyebrow: 'Πακέτα',
      title: 'Πακέτα και τιμές κατασκευής ιστοσελίδων',
      body: 'Σταθερό εύρος, σταθερή τιμή, συμφωνημένα πριν ξεκινήσουμε. Το Starter είναι η οικονομική επιλογή για μικρές επιχειρήσεις. Ο ΦΠΑ φαίνεται σε κάθε τιμή.',
      all: 'Συγκρίνετε όλα τα πακέτα',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Συχνές ερωτήσεις για την κατασκευή ιστοσελίδας',
      items: [
        {
          q: 'Πόσο κοστίζει η κατασκευή μιας ιστοσελίδας;',
          a: 'Τα πακέτα ξεκινούν από {{ENTRY_WEBSITE}} (Starter), με {{WEBSITE_PRO}} (Professional) και {{WEBSITE_BUSINESS}} (Business) για μεγαλύτερα, πολύγλωσσα ή σύνθετα έργα. Όλες οι τιμές είναι χωρίς ΦΠΑ και η τελική προσφορά ορίζεται από το εύρος πριν ξεκινήσουμε.',
        },
        {
          q: 'Πόσο χρόνο χρειάζεται η κατασκευή ιστοσελίδας;',
          a: 'Ένα site παρουσίασης παραδίδεται συνήθως σε 3 έως 5 εβδομάδες. Μεγαλύτερα έργα χρειάζονται 5 έως 12 εβδομάδες, ανάλογα με το πόσες σελίδες χρειάζονται πραγματικό περιεχόμενο και αν υπάρχει ηλεκτρονικό κατάστημα. Ο χρόνος αναγράφεται σε κάθε πακέτο και είναι ενδεικτικός, όχι εγγυημένη ημερομηνία.',
        },
        {
          q: 'Φτιάχνετε ιστοσελίδες με WordPress;',
          a: 'Ναι, όταν ταιριάζει στο έργο: τα e-shop τα στήνουμε σε WooCommerce, που τρέχει πάνω σε WordPress, και σε site παρουσίασης το WordPress βολεύει όταν θέλετε να διαχειρίζεστε μόνοι σας κείμενα και σελίδες. Για ειδικές λειτουργίες ή μέγιστη ταχύτητα προτείνουμε custom κατασκευή.',
        },
        {
          q: 'Η ιστοσελίδα θα είναι δική μου;',
          a: 'Ναι. Το domain και το hosting μένουν στο όνομά σας, παίρνετε πλήρη πρόσβαση διαχειριστή και η τεχνολογία είναι τυπική και μεταφέρσιμη. Αν αλλάξετε συνεργάτη, το site φεύγει μαζί σας.',
        },
        {
          q: 'Τι πληρώνω μετά την παράδοση (hosting, συντήρηση);',
          a: 'Το hosting και το domain πληρώνονται απευθείας στον πάροχο, στο όνομά σας. Η συντήρηση (ενημερώσεις, αντίγραφα ασφαλείας, μικρές αλλαγές) είναι προαιρετική μηνιαία υπηρεσία με την τιμή της στη σελίδα τιμών. Δεν υπάρχει υποχρεωτική συνδρομή σε εμάς.',
        },
        {
          q: 'Γράφετε εσείς το περιεχόμενο;',
          a: 'Μπορούμε. Τα περισσότερα έργα δουλεύουν καλύτερα όταν μας δίνετε τα πραγματικά στοιχεία της επιχείρησης και αναλαμβάνουμε εμείς τη δομή, το κείμενο και τη στόχευση. Αν προτιμάτε να το γράψετε μόνοι σας, σας δίνουμε brief για κάθε σελίδα.',
        },
        {
          q: 'Τι γίνεται με τις θέσεις μας αν ανακατασκευάσουμε;',
          a: 'Αυτός είναι ο πραγματικός κίνδυνος σε μια ανακατασκευή και αντιμετωπίζεται με χάρτη ανακατευθύνσεων που ετοιμάζεται πριν το λανσάρισμα, ώστε κάθε υπάρχον URL να δείχνει στο αντίστοιχο νέο. Η παράλειψη αυτού του βήματος είναι ο λόγος που sites χάνουν την επισκεψιμότητά τους σε μια νύχτα.',
        },
        {
          q: 'Μπορούμε να επεξεργαζόμαστε μόνοι μας το site μετά;',
          a: 'Ναι, και σας εκπαιδεύουμε στην παράδοση. Αλλαγές ρουτίνας όπως κείμενα, εικόνες, τιμές και νέες σελίδες δεν πρέπει να απαιτούν γραφείο.',
        },
        {
          q: 'Χρησιμοποιείτε AI στην κατασκευή;',
          a: 'Ως εργαλείο, όπου επιταχύνει τη δουλειά χωρίς να ρίχνει την ποιότητα. Η δομή, ο σχεδιασμός, τα κείμενα και ο κώδικας περνούν από έλεγχο της ομάδας πριν βγει οτιδήποτε live, και η ιστοσελίδα στήνεται ώστε να μπορεί να αναφέρεται και στις απαντήσεις AI.',
        },
      ],
    },
    cta: {
      title: 'Ζητήστε προσφορά για την ιστοσελίδα σας',
      body: 'Στείλτε μας τι έχετε τώρα και τι πρέπει να κάνει. Θα επανέλθουμε με εύρος και σταθερή τιμή.',
      primary: 'Ζητήστε προσφορά',
      secondary: 'Δείτε τιμές',
    },
  },
} as const;

export function WebsiteCreationPage({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const t = isEl ? copy.el : copy.en;
  const lp = (p: string) => localizedPath(locale, p);
  const service = getServiceBySlug('website-creation');
  const serviceEl = isEl ? getServiceEl('website-creation') : null;

  const showcase = portfolioProjects.filter((p) => p.featured).slice(0, 6);
  const cities = isEl ? getIndexableServiceLocations('el') : [];
  const rp = (text: string) => resolvePriceTokens(text, locale);
  const faqs = t.faq.items.map((f) => ({ question: f.q, answer: rp(f.a) }));

  const breadcrumbs = [
    { name: isEl ? 'Αρχική' : 'Home', url: lp('/') },
    { name: isEl ? 'Υπηρεσίες' : 'Services', url: lp('/services') },
    { name: serviceEl?.name ?? service?.name ?? 'Website Creation', url: lp('/services/website-creation') },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: serviceEl?.name ?? service?.name ?? 'Website Creation',
      description: serviceEl?.description ?? service?.description ?? t.lede,
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      areaServed: isEl ? ['GR'] : ['GR', 'US', 'GB'],
      serviceType: isEl ? 'Κατασκευή ιστοσελίδων' : 'Website design and development',
    }),
    generateFAQSchema({ faqs }),
  );

  const kit = getServiceKit('website-creation');
  const quoteHref = lp('/get-started?service=website-creation');

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Hero */}
      <ServiceHero
        locale={locale}
        breadcrumbs={breadcrumbs}
        pill={{ kind: kit.pill.kind, tag: pick(kit.pill.tag, locale), text: kit.pill.text[locale], href: lp(kit.pill.href) }}
        h1={t.h1}
        lead={rp(t.lede)}
        primaryLabel={t.ctaPrimary}
        primaryHref={quoteHref}
        links={[
          { href: '#work', label: t.ctaSecondary },
          { href: lp('/pricing'), label: t.cta.secondary },
        ]}
        visual={kit.hero(locale)}
        visualLabel={kit.heroLabel[locale]}
      />

      {/* 2 - The three build stages and the four phases */}
      <KitSection id="process" className="mt-6 sm:mt-10">
        <KitHeading eyebrow={t.phases.eyebrow} eyebrowIcon={<Layers />} title={<AccentTitle text={t.phases.title} />} description={t.phases.body} />
        <StepsGrid
          className="mt-12 md:grid-cols-2 lg:grid-cols-4"
          steps={t.phases.items.map((it, i) => ({
            title: it.t,
            text: it.d,
            preview:
              i < 3 ? (
                <div className="grid gap-2">
                  <BuildStagesPreview locale={locale} only={(['wire', 'design', 'live'] as const)[i]} />
                  <p className="text-[12px] leading-snug text-muted-foreground">{t.stages[i].d}</p>
                </div>
              ) : undefined,
          }))}
        />
      </KitSection>

      {isEl ? <TopicSections topics={topicsEl} locale={locale} id="whats-included" /> : null}

      {/* 3 - Ownership */}
      <KitSection tinted>
        <FeatureRow
          flip
          eyebrow={t.ownership.eyebrow}
          eyebrowIcon={<KeyRound />}
          title={<AccentTitle text={t.ownership.title} />}
          body={t.ownership.body}
          bullets={t.ownership.points}
          preview={
            <Stage>
              <OwnershipPreview locale={locale} />
            </Stage>
          }
        />
      </KitSection>

      {/* 4 - Work */}
      <KitSection id="work">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <KitHeading eyebrow={t.proof.eyebrow} title={<AccentTitle text={t.proof.title} />} description={t.proof.body(PROJECTS_DELIVERED_LABEL)} />
          <Link href={lp('/work')} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-link underline-offset-4 hover:underline">
            {t.proof.all}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ProofGrid className="mt-12" projects={showcase} locale={locale} />
      </KitSection>

      {/* 5 - Packages */}
      <KitSection tinted id="pricing">
        <KitHeading align="center" eyebrow={t.pricing.eyebrow} title={<AccentTitle text={t.pricing.title} />} description={t.pricing.body} />
        <PriceTiers kind="website" locale={locale} className="mt-12" />
        <p className="mt-10 text-center text-[14px]">
          <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
            {t.pricing.all}
          </Link>
        </p>
      </KitSection>

      {isEl ? (
        <KitSection id="locations">
          <KitHeading
            eyebrow="Περιοχές"
            eyebrowIcon={<MapPin />}
            title={<AccentTitle text="Κατασκευή ιστοσελίδων σε Αθήνα, Θεσσαλονίκη, Κρήτη και νησιά" />}
            description={renderInlineLinks(
              'Δουλεύουμε με επιχειρήσεις σε όλη την Ελλάδα. Δείτε για παράδειγμα την [κατασκευή ιστοσελίδων στην Αθήνα](/services/website-creation/athens-gr), στη [Θεσσαλονίκη](/services/website-creation/thessaloniki-gr) και στο [Ηράκλειο](/services/website-creation/heraklion-gr), ή επιλέξτε την πόλη σας:',
              locale,
            )}
          />
          <ChipLinks
            className="mt-10"
            items={cities.map((l) => ({
              href: lp(`/services/website-creation/${l.slug}`),
              label: `Ιστοσελίδες ${getGreekLocative(l.slug, l.cityLocal ?? l.city)}`,
            }))}
          />
        </KitSection>
      ) : null}

      {/* 6 - FAQ */}
      <FaqBlock
        locale={locale}
        eyebrow={t.faq.eyebrow}
        title={<AccentTitle text={t.faq.title} />}
        faqs={faqs}
      />

      {/* 7 - CTA */}
      <CtaBand locale={locale} source="service-website-creation" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
    </PageShell>
  );
}
