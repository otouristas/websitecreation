import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageShell, ShellCrumbs } from '@/components/bespoke/PageShell';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import { PrimaryButtonLink, GhostButtonLink, Bloom, Tick } from '@/components/landing/primitives';
import { PriceCard } from '@/components/pricing/PriceCard';
import { portfolioProjects } from '@/data/portfolio';
import { websitePackages } from '@/data/pricing';
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
 * Signature: 259 (brand blue - this is the flagship service, so it holds the
 * house colour). Structure is the build itself: a wireframe -> design -> live
 * progression carries the hero, then the phases, then what you actually own at
 * the end. Ownership is the argument that closes this sale, so it gets its own
 * section rather than a bullet.
 *
 * Prices come from src/data/pricing.ts. Nothing here quotes a figure directly.
 */

const SIGNATURE_HUE = 259;

const copy = {
  en: {
    eyebrow: 'Website creation',
    h1: 'Websites built to be found, not just to look finished',
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
    h1: 'Ιστοσελίδες φτιαγμένες για να βρίσκονται, όχι απλώς για να δείχνουν έτοιμες',
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

/** Wireframe -> design -> live, drawn rather than photographed. */
function StageFrame({ variant }: { variant: 'wire' | 'design' | 'live' }) {
  const bar = (w: string, tone: string) => (
    <span className={`block h-2 rounded-[2px] ${tone}`} style={{ width: w }} />
  );

  return (
    <div className="overflow-hidden rounded-[10px] border border-hairline bg-background">
      <div className="flex gap-1.5 border-b border-hairline bg-surface-raised/70 px-3 py-2">
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span
          className={`size-1.5 rounded-full ${variant === 'live' ? 'bg-signature' : 'bg-foreground/15'}`}
        />
      </div>
      <div className="space-y-2.5 p-4">
        {variant === 'wire' && (
          <>
            {bar('60%', 'bg-foreground/12')}
            {bar('85%', 'bg-foreground/8')}
            {bar('45%', 'bg-foreground/8')}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-8 rounded-[3px] bg-foreground/6" />
              ))}
            </div>
          </>
        )}
        {variant === 'design' && (
          <>
            {bar('60%', 'bg-signature/50')}
            {bar('85%', 'bg-foreground/12')}
            {bar('45%', 'bg-foreground/10')}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-8 rounded-[3px] bg-signature/12" />
              ))}
            </div>
          </>
        )}
        {variant === 'live' && (
          <>
            {bar('60%', 'bg-signature')}
            {bar('85%', 'bg-foreground/20')}
            {bar('45%', 'bg-foreground/14')}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-8 rounded-[3px] bg-signature/25" />
              ))}
            </div>
            <span className="mt-1 inline-flex h-5 items-center rounded-full bg-brand/15 px-2 text-[9px] font-medium uppercase tracking-[0.1em] text-brand">
              indexed
            </span>
          </>
        )}
      </div>
    </div>
  );
}

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

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      {/* 1 - Hero with the three build stages */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom signature className="left-1/2 top-[-11rem] h-[28rem] w-[58rem] -translate-x-1/2" />
        <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-16 pt-6">
          <ShellCrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.eyebrow}
            </span>
            <h1 className="rise-in mt-4 font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-foreground md:text-[3.4rem]">
              {t.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp('/get-started?service=website-creation')}>
                {t.ctaPrimary}
              </PrimaryButtonLink>
              <GhostButtonLink href="#work">{t.ctaSecondary}</GhostButtonLink>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {(['wire', 'design', 'live'] as const).map((v, i) => (
              <div key={v} className="relative">
                <StageFrame variant={v} />
                <div className="mt-4">
                  <div className="font-display text-sm font-medium text-foreground">
                    {t.stages[i].k}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {t.stages[i].d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 - Phases */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.phases.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
            {t.phases.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.phases.body}</p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline md:grid-cols-2">
          {t.phases.items.map((it) => (
            <li key={it.n} className="bg-surface p-7 md:p-9">
              <span className="font-display text-2xl font-medium tracking-[-0.03em] text-signature/40">
                {it.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                {it.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 - Ownership */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.ownership.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.ownership.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.ownership.body}
            </p>
          </div>
          <ul className="space-y-4 self-center">
            {t.ownership.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                <Tick className="text-signature" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 - Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.proof.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.proof.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.proof.body(PROJECT_COUNT)}
            </p>
          </div>
          <Link
            href={lp('/work')}
            className="inline-flex items-center gap-2 text-sm font-medium text-signature hover:underline"
          >
            {t.proof.all}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((p) => (
            <Link
              key={p.slug}
              href={lp(`/work/${p.slug}`)}
              className="group bg-surface transition-colors hover:bg-background"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                <PortfolioThumbnail
                  src={p.screenshot}
                  alt={p.name}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-[15px] font-medium text-foreground">{p.name}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                  {isEl ? p.summaryEl : p.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 - Packages */}
      <section className="border-y border-hairline bg-surface-raised/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
              {t.pricing.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl">
              {t.pricing.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.pricing.body}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {websitePackages.map((tier) => (
              <PriceCard key={tier.id} tier={tier} locale={locale} />
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href={lp('/pricing')} className="font-medium text-signature hover:underline">
              {t.pricing.all}
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
            <PrimaryButtonLink href={lp('/get-started?service=website-creation')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
