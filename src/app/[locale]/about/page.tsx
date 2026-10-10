import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Gem, Quote, Search, TrendingUp, Zap } from "lucide-react";
import { Container, CtaBand, KitHeading, KitSection, Stage, StepsGrid } from "@/components/kit";
import { InfoCard, PageHero, SplitRow, StatRow, accentTail } from "@/components/page-kit";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { MARKET_COUNT, PROJECT_COUNT } from '@/data/company-facts';
import { industries } from '@/data/industries';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Ποιοι Είμαστε - SEO & Web Design",
      description:
        "Η AnotherSEOGuru συνδυάζει ένα SEO platform με ένα agency κατασκευής ιστοσελίδων και SEO. Γρήγορες ιστοσελίδες, SEO, GEO, AEO και μετρήσιμη ανάπτυξη στην Ελλάδα.",
      path: localizedPath('el', '/about'),
      hreflangPath: "/about",
    });
  }

  return buildMetadata({
    title: "About - SEO Agency & Software",
    description:
      `AnotherSEOGuru combines a GSC-native SEO platform with an execution-focused agency. Fast websites, GEO, AEO, and measurable growth across ${PROJECT_COUNT} live client projects.`,
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
        h1: "Κατασκευάζουμε Ιστοσελίδες που Φέρνουν Αποτελέσματα",
        sub: "Η AnotherSEOGuru είναι ένα agency σχεδιασμού ιστοσελίδων και SEO που εστιάζει σε ένα πράγμα: να βοηθήσει τις επιχειρήσεις να πετύχουν online με γρήγορες, όμορφες και βελτιστοποιημένες ιστοσελίδες.",
        storyLabel: "Η Ιστορία Μας",
        storyTitle: "Από την Απογοήτευση στη Λύση",
        storyP1: "Ξεκινήσαμε την AnotherSEOGuru επειδή κουραστήκαμε να βλέπουμε επιχειρήσεις να πληρώνουν ακριβά σε agencies που παραδίδουν αργές, ξεπερασμένες ιστοσελίδες που δεν κατατάσσονται ούτε φέρνουν κρατήσεις.",
        storyP2: "Πάρα πολλοί σχεδιαστές ιστοσελίδων εστιάζουν μόνο στο να κάνουν τα πράγματα να φαίνονται όμορφα, αγνοώντας εντελώς την ταχύτητα και τη βελτιστοποίηση SEO. Το αποτέλεσμα; Όμορφες ιστοσελίδες που δεν τις βρίσκει κανείς.",
        storyP3: "Ακολουθήσαμε μια διαφορετική προσέγγιση. Κάθε ιστοσελίδα που κατασκευάζουμε ξεκινά με βάση την ταχύτητα και το SEO. Στη συνέχεια προσθέτουμε εξαιρετικό σχεδιασμό. Το αποτέλεσμα είναι ιστοσελίδες που δείχνουν εκπληκτικές ΚΑΙ φέρνουν πραγματικά αποτελέσματα.",
        quote: "«Μια ιστοσελίδα που κανείς δεν μπορεί να βρει είναι μια ιστοσελίδα που δεν υπάρχει. Κατασκευάζουμε ιστοσελίδες που ανακαλύπτονται από τους πελάτες.»",
        author: "Η Ομάδα της AnotherSEOGuru",
        beliefsTitle: "Τι Πιστεύουμε",
        beliefsSub: "Οι βασικές μας αρχές καθοδηγούν κάθε μας βήμα",
        howWeWorkTitle: "Πώς Εργαζόμαστε",
        howWeWorkSub: "Μια απλή, διαφανής διαδικασία από την αρχή μέχρι το τέλος",
        ctaTitle: "Έτοιμοι να Συνεργαστούμε;",
        ctaSub: "Ας κατασκευάσουμε μια ιστοσελίδα που θα φέρει πραγματικά αποτελέσματα στην επιχείρησή σας.",
        viewPricing: "Δείτε τις Τιμές",
        startProject: "Ξεκινήστε το έργο",
        values: [
          {
            title: "Ταχύτητα Πρώτα",
            description: "Κάθε ιστοσελίδα που κατασκευάζουμε είναι βελτιστοποιημένη για κορυφαία απόδοση. Οι γρήγορες ιστοσελίδες κατατάσσονται καλύτερα και μετατρέπουν περισσότερους επισκέπτες.",
            icon: "⚡",
          },
          {
            title: "Ενσωματωμένο SEO",
            description: "Δεν προσθέτουμε το SEO στο τέλος. Είναι μέρος της διαδικασίας μας από την πρώτη μέρα - δομή, περιεχόμενο, τεχνικό SEO.",
            icon: "🔍",
          },
          {
            title: "Διαφανείς Τιμές",
            description: "Χωρίς κρυφές χρεώσεις ή εκπλήξεις. Γνωρίζετε ακριβώς τι λαμβάνετε και ποιο είναι το κόστος εκ των προτέρων.",
            icon: "💎",
          },
          {
            title: "Εστίαση στα Αποτελέσματα",
            description: "Μια όμορφη ιστοσελίδα είναι άχρηστη αν δεν φέρνει αποτελέσματα. Σχεδιάζουμε για επιχειρηματικά αποτελέσματα, όχι για βραβεία.",
            icon: "📈",
          },
        ],
        // Every figure derives from repo data. These read "500+", "98%" and
        // "50+" against real values of 71 and 31, and the satisfaction number
        // had no survey, NPS or source behind it at all - so it is gone rather
        // than corrected.
        stats: [
          { value: `${PROJECT_COUNT}`, label: "Ζωντανά έργα" },
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
        sub: "AnotherSEOGuru is a web design and SEO agency focused on one thing: helping businesses succeed online with fast, beautiful, search-optimized websites.",
        storyLabel: "Our Story",
        storyTitle: "From Frustration to Solution",
        storyP1: "We started AnotherSEOGuru because we were tired of seeing businesses get ripped off by agencies that deliver slow, outdated websites that don't rank or convert.",
        storyP2: "Too many web designers focus on making things look pretty while completely ignoring performance and search optimization. The result? Beautiful websites that nobody can find.",
        storyP3: "We took a different approach. Every site we build starts with speed and SEO as the foundation. Then we add great design on top. The result is websites that look amazing AND actually drive business results.",
        quote: "\"A website that nobody can find is a website that doesn't exist. We build sites that get discovered.\"",
        author: "The AnotherSEOGuru Team",
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
          { value: `${PROJECT_COUNT}`, label: "Live projects" },
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

  const tx = (en: string, el: string) => (isEl ? el : en);
  const breadcrumbs = [
    { name: t.home, url: lp("/") },
    { name: t.about, url: lp("/about") },
  ];
  const icons = [Zap, Search, Gem, TrendingUp];

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale as SiteLocale}
          breadcrumbs={breadcrumbs}
          pill={{
            href: lp("/platform"),
            kind: "new",
            tag: tx("New", "Νέο"),
            text: tx("We also build GSC Boost, our own SEO software", "Φτιάχνουμε και το GSC Boost, το δικό μας λογισμικό SEO"),
          }}
          title={accentTail(t.h1, 3)}
          lead={t.sub}
        >
          <Container className="mt-14">
            <StatRow items={t.stats.map((s) => ({ value: s.value, label: s.label }))} />
          </Container>
        </PageHero>

        <KitSection>
          <SplitRow
            eyebrow={t.storyLabel}
            eyebrowIcon={<BookOpen />}
            title={t.storyTitle}
            body={
              <div className="space-y-4">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            }
            preview={
              <Stage>
                <figure className="rounded-xl border border-hairline bg-background p-7 sm:p-9">
                  <Quote className="size-6 text-brand" aria-hidden />
                  <blockquote className="mt-4 font-serif text-[22px] italic leading-snug text-foreground sm:text-[26px]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{t.author}</figcaption>
                </figure>
              </Stage>
            }
          />
        </KitSection>

        <KitSection tinted>
          <KitHeading
            align="center"
            eyebrow={tx("Principles", "Αρχές")}
            title={accentTail(t.beliefsTitle, 1)}
            description={t.beliefsSub}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, i) => {
              const Icon = icons[i] ?? Zap;
              return <InfoCard key={value.title} icon={<Icon />} title={value.title} text={value.description} />;
            })}
          </div>
        </KitSection>

        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx("Process", "Διαδικασία")}
            title={accentTail(t.howWeWorkTitle, 1)}
            description={t.howWeWorkSub}
          />
          <StepsGrid
            className="mt-12 md:grid-cols-2 lg:grid-cols-4"
            steps={t.steps.map((st) => ({ title: st.title, text: st.description }))}
          />
          <p className="mt-10 text-center text-[14px]">
            <Link href={lp("/pricing")} className="inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline">
              {t.viewPricing}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </KitSection>

        <CtaBand locale={locale as SiteLocale} source="about-band" title={accentTail(t.ctaTitle, 1)} description={t.ctaSub} />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
