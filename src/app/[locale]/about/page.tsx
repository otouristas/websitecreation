import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Gem, Quote, Search, TrendingUp, Zap } from "lucide-react";
import { KitBreadcrumbs } from "@/components/page-kit";
import { HOME_LOGOS } from "@/data/home-content";
import { homeCopy } from "@/components/pages/home/copy";
import {
  AnnouncePill,
  TrustMarks,
  WaveAccent,
  WaveChoice,
  WaveClose,
  WaveEyebrow,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveSteps,
  waveGhostBtn,
  wavePrimaryBtn,
} from "@/components/pages/platform-wave/ui";
import { accentEnd, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel } from "@/components/pages/industry-wave/ui";
import { KIT_COPY } from "@/components/kit/sections";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { SchemaOutput } from "@/lib/types/seo";
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { MARKET_COUNT } from '@/data/company-facts';
import { LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME } from '@/data/legal-entity';
import { industries } from '@/data/industries';
import { FOUNDER_YEARS, PROJECTS_DELIVERED, consultantPath } from '@/data/founder';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Ποιοι Είμαστε - Εταιρεία SEO & Λογισμικό",
      description:
        "Η AnotherSEOGuru συνδυάζει ένα SEO platform με ένα agency κατασκευής ιστοσελίδων και SEO. Γρήγορες ιστοσελίδες, SEO, GEO, AEO και μετρήσιμη ανάπτυξη στην Ελλάδα.",
      path: localizedPath('el', '/about'),
      hreflangPath: "/about",
    });
  }

  return buildMetadata({
    title: "About - SEO Agency & Software",
    description:
      `AnotherSEOGuru combines a GSC-native SEO platform with an execution-focused agency. Fast websites, GEO, AEO, and measurable growth across ${PROJECTS_DELIVERED}+ delivered projects.`,
    path: localizedPath('en', '/about'),
    hreflangPath: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const t = isEl
    ? {
        home: "Αρχική",
        about: "Σχετικά",
        h1: "Κατασκευάζουμε ιστοσελίδες που φέρνουν αποτελέσματα",
        sub: "Η Touristas Technologies είναι ιδιοκτήτης και φορέας λειτουργίας του ιστότοπου anotherseoguru.com και της εφαρμογής στο app.anotherseoguru.com. Η AnotherSEOGuru είναι η ομάδα σχεδιασμού ιστοσελίδων και SEO της εταιρείας, με στόχο να βοηθήσει τις επιχειρήσεις να πετύχουν online με γρήγορες, όμορφες και βελτιστοποιημένες ιστοσελίδες.",
        storyLabel: "Η ιστορία μας",
        storyTitle: "Από την απογοήτευση στη λύση",
        storyP1: "Ξεκινήσαμε την AnotherSEOGuru επειδή κουραστήκαμε να βλέπουμε επιχειρήσεις να πληρώνουν ακριβά σε agencies που παραδίδουν αργές, ξεπερασμένες ιστοσελίδες που δεν κατατάσσονται ούτε φέρνουν κρατήσεις.",
        storyP2: "Πάρα πολλοί σχεδιαστές ιστοσελίδων εστιάζουν μόνο στο να κάνουν τα πράγματα να φαίνονται όμορφα, αγνοώντας εντελώς την ταχύτητα και τη βελτιστοποίηση SEO. Το αποτέλεσμα; Όμορφες ιστοσελίδες που δεν τις βρίσκει κανείς.",
        storyP3: "Ακολουθήσαμε μια διαφορετική προσέγγιση. Κάθε ιστοσελίδα που κατασκευάζουμε ξεκινά με βάση την ταχύτητα και το SEO. Στη συνέχεια προσθέτουμε εξαιρετικό σχεδιασμό. Το αποτέλεσμα είναι ιστοσελίδες που δείχνουν εκπληκτικές ΚΑΙ φέρνουν πραγματικά αποτελέσματα.",
        quote: "«Μια ιστοσελίδα που κανείς δεν μπορεί να βρει είναι μια ιστοσελίδα που δεν υπάρχει. Κατασκευάζουμε ιστοσελίδες που ανακαλύπτονται από τους πελάτες.»",
        author: "Η ομάδα της AnotherSEOGuru",
        founderLabel: "Η ομάδα",
        founderTitle: "Η ομάδα της Touristas Technologies",
        founderBody: `Η Touristas Technologies είναι ιδιοκτήτης του ιστότοπου anotherseoguru.com και της εφαρμογής AnotherSEOGuru στο app.anotherseoguru.com. Η ομάδα, με ${FOUNDER_YEARS}+ χρόνια στο SEO, έχει παραδώσει πάνω από ${PROJECTS_DELIVERED} έργα, κυρίως για ξενοδοχεία, ενοικιάσεις αυτοκινήτων, τουριστικές και τοπικές επιχειρήσεις στην Ελλάδα.`,
        founderFacts: [
          { value: `${FOUNDER_YEARS}+`, label: "χρόνια στο SEO" },
          { value: `${PROJECTS_DELIVERED}+`, label: "έργα" },
          { value: "Ελλάδα", label: "αγορά" },
        ],
        founderRole: "Ομάδα SEO και web design",
        founderLink: "Δείτε πώς δουλεύει η ομάδα",
        beliefsTitle: "Τι πιστεύουμε",
        beliefsSub: "Οι βασικές μας αρχές καθοδηγούν κάθε μας βήμα",
        howWeWorkTitle: "Πώς δουλεύουμε",
        howWeWorkSub: "Μια απλή, διαφανής διαδικασία από την αρχή μέχρι το τέλος",
        ctaTitle: "Έτοιμοι να συνεργαστούμε;",
        ctaSub: "Ας κατασκευάσουμε μια ιστοσελίδα που θα φέρει πραγματικά αποτελέσματα στην επιχείρησή σας.",
        viewPricing: "Δείτε τις τιμές",
        startProject: "Ξεκινήστε το έργο",
        values: [
          {
            title: "Πρώτα η ταχύτητα",
            description: "Κάθε ιστοσελίδα που κατασκευάζουμε είναι βελτιστοποιημένη για κορυφαία απόδοση. Οι γρήγορες ιστοσελίδες κατατάσσονται καλύτερα και μετατρέπουν περισσότερους επισκέπτες.",
            icon: "⚡",
          },
          {
            title: "Ενσωματωμένο SEO",
            description: "Δεν προσθέτουμε το SEO στο τέλος. Είναι μέρος της διαδικασίας μας από την πρώτη μέρα - δομή, περιεχόμενο, τεχνικό SEO.",
            icon: "🔍",
          },
          {
            title: "Διαφανείς τιμές",
            description: "Χωρίς κρυφές χρεώσεις ή εκπλήξεις. Γνωρίζετε ακριβώς τι λαμβάνετε και ποιο είναι το κόστος εκ των προτέρων.",
            icon: "💎",
          },
          {
            title: "Εστίαση στα αποτελέσματα",
            description: "Μια όμορφη ιστοσελίδα είναι άχρηστη αν δεν φέρνει αποτελέσματα. Σχεδιάζουμε για επιχειρηματικά αποτελέσματα, όχι για βραβεία.",
            icon: "📈",
          },
        ],
        // Every figure derives from repo data. These previously read "500+",
        // "98%" and "50+" with no source in the repo, and the satisfaction
        // number had no survey, NPS or source behind it at all - so it is
        // gone rather than corrected.
        stats: [
          { value: `${PROJECTS_DELIVERED}+`, label: "Ολοκληρωμένα έργα" },
          { value: `${industries.length}`, label: "Κλάδοι που εξυπηρετούμε" },
          { value: `${MARKET_COUNT}`, label: "Αγορές" },
          { value: "2-4", label: "Εβδομάδες για δημοσίευση" },
        ],
        steps: [
          { step: "01", title: "Ανακάλυψη", description: "Μαθαίνουμε για την επιχείρησή σας, τους στόχους και το κοινό σας. Επιλέγετε το πακέτο σας και παρέχετε το υλικό." },
          { step: "02", title: "Σχεδιασμός", description: "Δημιουργούμε ένα προσαρμοσμένο σχέδιο στα μέτρα σας. Το ελέγχετε και μας δίνετε το feedback σας." },
          { step: "03", title: "Ανάπτυξη", description: "Κατασκευάζουμε την ιστοσελίδα σας με ενσωματωμένη ταχύτητα και SEO. Κάθε σελίδα βελτιστοποιείται για κορυφαία απόδοση." },
          { step: "04", title: "Λανσάρισμα", description: "Λανσάρουμε την ιστοσελίδα σας και βεβαιωνόμαστε ότι όλα λειτουργούν άψογα. Ξεκινάτε να εμφανίζεστε στα αποτελέσματα online." },
        ],
      }
    : {
        home: "Home",
        about: "About",
        h1: "We Build Websites That Actually Work",
        sub: "Touristas Technologies owns and operates anotherseoguru.com and the AnotherSEOGuru app at app.anotherseoguru.com. AnotherSEOGuru is the company's web design and SEO team, focused on helping businesses succeed online with fast, beautiful, search-optimized websites.",
        storyLabel: "Our Story",
        storyTitle: "From Frustration to Solution",
        storyP1: "We started AnotherSEOGuru because we were tired of seeing businesses get ripped off by agencies that deliver slow, outdated websites that don't rank or convert.",
        storyP2: "Too many web designers focus on making things look pretty while completely ignoring performance and search optimization. The result? Beautiful websites that nobody can find.",
        storyP3: "We took a different approach. Every site we build starts with speed and SEO as the foundation. Then we add great design on top. The result is websites that look amazing AND actually drive business results.",
        quote: "\"A website that nobody can find is a website that doesn't exist. We build sites that get discovered.\"",
        author: "The AnotherSEOGuru Team",
        founderLabel: "The team",
        founderTitle: "The Touristas Technologies team",
        founderBody: `Touristas Technologies owns anotherseoguru.com and the AnotherSEOGuru app at app.anotherseoguru.com. The team, with ${FOUNDER_YEARS}+ years in SEO, has delivered more than ${PROJECTS_DELIVERED} projects, mostly for hotels, car rentals, tourism and local businesses in Greece.`,
        founderFacts: [
          { value: `${FOUNDER_YEARS}+`, label: "years in SEO" },
          { value: `${PROJECTS_DELIVERED}+`, label: "projects" },
          { value: "Greece", label: "market" },
        ],
        founderRole: "SEO and web design team",
        founderLink: "See how the team works",
        beliefsTitle: "What We Believe",
        beliefsSub: "Our core principles guide everything we do",
        howWeWorkTitle: "How We Work",
        howWeWorkSub: "A simple, transparent process from start to finish",
        ctaTitle: "Ready to Work With Us?",
        ctaSub: "Let's build a website that actually drives results for your business.",
        viewPricing: "View Pricing",
        startProject: "Start Your Project",
        values: [
          {
            title: "Speed First",
            description: "Every website we build is optimized for performance. Fast sites rank better and convert more visitors.",
            icon: "⚡",
          },
          {
            title: "SEO Built-In",
            description: "We don't bolt SEO on at the end. It's part of our process from day one - structure, content, technical.",
            icon: "🔍",
          },
          {
            title: "Transparent Pricing",
            description: "No hidden fees, no surprises. You know exactly what you're getting and what it costs upfront.",
            icon: "💎",
          },
          {
            title: "Results Focused",
            description: "A pretty website is useless if it doesn't convert. We design for business outcomes, not awards.",
            icon: "📈",
          },
        ],
        stats: [
          { value: `${PROJECTS_DELIVERED}+`, label: "Projects delivered" },
          { value: `${industries.length}`, label: "Industries served" },
          { value: `${MARKET_COUNT}`, label: "Markets" },
          { value: "2-4", label: "Weeks to launch" },
        ],
        steps: [
          { step: "01", title: "Discovery", description: "We learn about your business, goals, and target audience. You choose your package and provide content." },
          { step: "02", title: "Design", description: "We create a custom design tailored to your brand. You review and provide feedback." },
          { step: "03", title: "Development", description: "We build your site with speed and SEO baked in. Every page is optimized for performance." },
          { step: "04", title: "Launch", description: "We launch your site and make sure everything works perfectly. You start getting found online." },
        ],
      };

  const siteLocale = locale as SiteLocale;
  const tx = (en: string, el: string) => (isEl ? el : en);
  const breadcrumbs = [
    { name: t.home, url: lp("/") },
    { name: t.about, url: lp("/about") },
  ];
  const icons = [Zap, Search, Gem, TrendingUp];
  const copy = homeCopy(siteLocale);

  // AboutPage ties this URL to the Organization the layout already emits,
  // so AI engines read it as the company's own page.
  const aboutSchema: SchemaOutput = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}${lp("/about")}#webpage`,
    url: `${BASE_URL}${lp("/about")}`,
    name: t.about,
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "AnotherSEOGuru",
      parentOrganization: {
        "@type": "Organization",
        "@id": LEGAL_ENTITY_ID,
        name: LEGAL_ENTITY_NAME,
      },
    },
  };

  return (
    <>
      <SchemaMarkup schemas={[aboutSchema, generateBreadcrumbSchema({ items: breadcrumbs })]} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill
                wrap
                href={lp("/platform")}
                tag={tx("New", "Νέο")}
                text={tx("We also build AnotherSEOGuru App, our own SEO software", "Φτιάχνουμε και το AnotherSEOGuru App, το δικό μας λογισμικό SEO")}
              />
            </div>
          }
          title={accentEnd(t.h1, 3)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.45rem] lg:text-[3rem]"
          lead={t.sub}
          actions={
            <ServiceHeroActions
              locale={siteLocale}
              primaryHref={`${lp("/get-started")}#free-audit`}
              primaryLabel={KIT_COPY.freeAudit[siteLocale]}
              whatsappLabel={KIT_COPY.whatsapp[siteLocale]}
            />
          }
          trust={
            <TrustMarks
              yesLabel={tx("Yes", "Ναι")}
              items={[KIT_COPY.reply24[siteLocale], KIT_COPY.realData[siteLocale], KIT_COPY.noContract[siteLocale]]}
            />
          }
          panel={<IndustryAppPanel locale={siteLocale} kind="local" />}
          panelNote={tx(
            "Sample data inside AnotherSEOGuru App. This is not a client account.",
            "Δείγμα δεδομένων μέσα στο AnotherSEOGuru App. Δεν είναι στοιχεία πελάτη.",
          )}
        />

        <WaveSection shot="stats">
          <dl className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-hairline lg:grid-cols-4">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 border-hairline bg-background px-3 py-7 text-center max-lg:border-b max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-b-0 sm:p-8 lg:border-r lg:p-10 lg:last:border-r-0"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[2.2rem] font-bold leading-none tracking-tight text-foreground sm:text-5xl">
                  <StatFigure value={stat.value} />
                </dd>
                <dd className="mt-2 text-pretty text-[14px] text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </WaveSection>

        <section data-shot="logos" className="border-y border-hairline bg-surface/40">
          <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
            <p className="mb-7 text-center text-[13px] font-medium tracking-[0.01em] text-muted-foreground">{copy.trustIntro}</p>
            <div className="home-logo-rail">
              <div className="home-logo-track">
                {[false, true].map((hidden) => (
                  <ul
                    key={String(hidden)}
                    className={`home-logo-run flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-16 sm:pr-16 ${hidden ? "home-logo-copy" : ""}`}
                    aria-hidden={hidden || undefined}
                  >
                    {HOME_LOGOS.map((logo) => (
                      <li key={`${logo.alt}-${hidden}`} className="flex h-12 shrink-0 items-center justify-center sm:h-16">
                        <Image
                          src={logo.src}
                          alt={hidden ? "" : logo.alt}
                          width={220}
                          height={64}
                          unoptimized
                          loading={hidden ? "lazy" : "eager"}
                          className="home-logo"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WaveSection shot="story">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <WaveEyebrow>{t.storyLabel}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
                {accentEnd(t.storyTitle, 1)}
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-[16.5px] leading-[1.7] text-muted-foreground">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            </div>
            <figure className="min-w-0 rounded-[22px] border border-hairline bg-surface/70 p-7 sm:p-9">
              <Quote className="size-6 text-primary" aria-hidden />
              <blockquote className="mt-4 text-pretty font-display text-[1.35rem] font-semibold italic leading-snug text-foreground sm:text-[1.6rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 font-code text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{t.author}</figcaption>
            </figure>
          </div>
        </WaveSection>

        <WaveSection id="team" shot="team" tinted>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <WaveHeading eyebrow={t.founderLabel} title={accentEnd(t.founderTitle, 1)} lead={t.founderBody} />
              <Link href={consultantPath(siteLocale)} className={`${wavePrimaryBtn} mt-8`}>
                {t.founderLink}
              </Link>
            </div>
            <figure className="min-w-0 rounded-[22px] border border-hairline bg-background p-7 sm:p-9">
              <figcaption>
                <span className="block text-balance font-display text-[1.7rem] font-bold tracking-[-0.03em] text-foreground sm:text-[2rem]">
                  {LEGAL_ENTITY_NAME}
                </span>
                <span className="mt-2 block text-[13px] text-muted-foreground">{t.founderRole}</span>
              </figcaption>
              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-hairline pt-6">
                {t.founderFacts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="font-display text-[1.6rem] font-bold tabular-nums leading-none tracking-tight text-foreground sm:text-[1.85rem]">
                      <StatFigure value={fact.value} />
                    </dd>
                    <dd className="mt-1.5 text-pretty text-[13px] text-muted-foreground">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </WaveSection>

        <WaveSection shot="principles">
          <WaveHeading align="center" eyebrow={tx("Principles", "Αρχές")} title={accentEnd(t.beliefsTitle, 1)} lead={t.beliefsSub} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, index) => {
              const Icon = icons[index] ?? Zap;
              return (
                <li key={value.title} className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-6">
                  <span className="grid size-11 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-balance text-[1.15rem] font-bold text-foreground">{value.title}</h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">{value.description}</p>
                </li>
              );
            })}
          </ul>
        </WaveSection>

        <WaveSteps
          shot="process"
          eyebrow={tx("Process", "Διαδικασία")}
          title={accentEnd(t.howWeWorkTitle, 1)}
          lead={t.howWeWorkSub}
          steps={t.steps.map((step) => ({ n: step.step, title: step.title, body: step.description }))}
          actions={
            <Link href={lp("/pricing")} className={waveGhostBtn}>
              {t.viewPricing}
            </Link>
          }
        />

        <WaveChoice locale={siteLocale} source="about-choice" />

        <WaveClose
          locale={siteLocale}
          source="about-band"
          title={accentEnd(t.ctaTitle, 1)}
          lead={t.ctaSub}
        />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}

function StatFigure({ value }: { readonly value: string }) {
  if (!value.endsWith("+")) return value;
  return (
    <>
      {value.slice(0, -1)}
      <WaveAccent>+</WaveAccent>
    </>
  );
}
