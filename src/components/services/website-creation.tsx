import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { KeyRound, Layers } from 'lucide-react';
import { CtaBand, FeatureRow, KitHeading, KitSection, Stage, StepsGrid } from '@/components/kit';
import {
  AccentTitle,
  BuildStagesPreview,
  FaqBlock,
  OwnershipPreview,
  PriceTiers,
  ProofGrid,
  ServiceHero,
  getServiceKit,
  pick,
} from '@/components/service-kit';
import { portfolioProjects } from '@/data/portfolio';
import { PROJECT_COUNT } from '@/data/company-facts';
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
      body: (n: number) => `A selection from ${n} delivered projects. Every screenshot is a live site.`,
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
    h1: 'Κατασκευή ιστοσελίδων που βρίσκονται στη Google, όχι απλώς δείχνουν έτοιμες',
    lede:
      'Ένα site που κερδίζει βραβεία σχεδιασμού και δεν φέρνει επισκεψιμότητα είναι φυλλάδιο. Χτίζουμε τον σχεδιασμό και τα θεμέλια για το SEO ως μία δουλειά, ώστε αυτό που βγαίνει live να μπορεί πραγματικά να σας φέρνει πελάτες.',
    ctaPrimary: 'Ξεκινήστε το project σας',
    ctaSecondary: 'Δείτε έργα',
    stages: [
      { k: 'Wireframe', d: 'Πρώτα η δομή και η αρχιτεκτονική σελίδων' },
      { k: 'Σχεδιασμός', d: 'Το brand σας, πάνω σε αυτή τη δομή' },
      { k: 'Live', d: 'Κατασκευή, έλεγχος, καταχώρηση και παράδοση' },
    ],
    phases: {
      eyebrow: 'Διαδικασία',
      title: 'Πώς τρέχει πραγματικά μια κατασκευή',
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
      body: (n: number) => `Μια επιλογή από ${n} έργα που έχουμε παραδώσει. Κάθε screenshot είναι ενεργό site.`,
      all: 'Δείτε όλα τα έργα',
    },
    pricing: {
      eyebrow: 'Πακέτα',
      title: 'Πόσο κοστίζει μια κατασκευή',
      body: 'Σταθερό εύρος, σταθερή τιμή, συμφωνημένα πριν ξεκινήσουμε. Ο ΦΠΑ φαίνεται σε κάθε τιμή.',
      all: 'Συγκρίνετε όλα τα πακέτα',
    },
    faq: {
      eyebrow: 'Ερωτήσεις',
      title: 'Πριν μας δώσετε brief',
      items: [
        {
          q: 'Πόσο χρόνο παίρνει μια ιστοσελίδα;',
          a: 'Από τρεις έως δώδεκα εβδομάδες ανάλογα με το εύρος, το οποίο ορίζεται από το πόσες σελίδες χρειάζονται πραγματικό περιεχόμενο και αν υπάρχει ηλεκτρονικό κατάστημα. Ο χρόνος παράδοσης αναγράφεται σε κάθε πακέτο. Πρόκειται για ενδεικτικές φάσεις, όχι εγγυημένες ημερομηνίες.',
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
      ],
    },
    cta: {
      title: 'Πείτε μας τι θέλετε να χτιστεί',
      body: 'Στείλτε μας τι έχετε τώρα και τι πρέπει να κάνει. Θα επανέλθουμε με εύρος και σταθερή τιμή.',
      primary: 'Ξεκινήστε το project σας',
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
    generateFAQSchema({ faqs: t.faq.items.map((f) => ({ question: f.q, answer: f.a })) }),
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
        lead={t.lede}
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
          <KitHeading eyebrow={t.proof.eyebrow} title={<AccentTitle text={t.proof.title} />} description={t.proof.body(PROJECT_COUNT)} />
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

      {/* 6 - FAQ */}
      <FaqBlock
        locale={locale}
        eyebrow={t.faq.eyebrow}
        title={<AccentTitle text={t.faq.title} />}
        faqs={t.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
      />

      {/* 7 - CTA */}
      <CtaBand locale={locale} source="service-website-creation" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
    </PageShell>
  );
}
