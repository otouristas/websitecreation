import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

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
      "AnotherSEOGuru combines a GSC-native SEO platform with an execution-focused agency. Fast websites, GEO, AEO, and measurable growth. 500+ projects delivered.",
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
        storyP2: "Πάρα πολλοί σχεδιαστές ιστοσελίδων εστιάζουν μόνο στο να κάνουν τα πράγματα να φαίνονται όμορφα, αγνοώντας εντελώς την ταχύτητα και τη βελτιστοποίηση SEO. Το αποτέλεσμα? Όμορφες ιστοσελίδες που κανείς δεν μπορεί να βρει.",
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
        startProject: "Ξεκινήστε το Project",
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
        stats: [
          { value: "500+", label: "Ιστοσελίδες που Παραδόθηκαν" },
          { value: "98%", label: "Ικανοποίηση Πελατών" },
          { value: "50+", label: "Κλάδοι που Εξυπηρετήθηκαν" },
          { value: "2-4", label: "Εβδομάδες για Λανσάρισμα" },
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
          { value: "500+", label: "Websites Delivered" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "50+", label: "Industries Served" },
          { value: "2-4", label: "Weeks to Launch" },
        ],
        steps: [
          { step: "01", title: "Discovery", description: "We learn about your business, goals, and target audience. You choose your package and provide content." },
          { step: "02", title: "Design", description: "We create a custom design tailored to your brand. You review and provide feedback." },
          { step: "03", title: "Development", description: "We build your site with speed and SEO baked in. Every page is optimized for performance." },
          { step: "04", title: "Launch", description: "We launch your site and make sure everything works perfectly. You start getting found online." },
        ],
      };

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="main-below-header">
        <section className="section-compact gradient-hero">
          <div className="container">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href={lp("/")} className="hover:text-primary">{t.home}</Link>
                <span>/</span>
                <span className="text-foreground">{t.about}</span>
              </nav>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {t.h1}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.sub}
              </p>
            </div>
          </div>
        </section>

        <section className="section -mt-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {t.stats.map((stat) => (
                <div key={stat.label} className="glass-card hover-glow card p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {t.storyLabel}
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  {t.storyTitle}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t.storyP1}</p>
                  <p>{t.storyP2}</p>
                  <p>{t.storyP3}</p>
                </div>
              </div>
              <div className="glass-card hover-glow card p-8 bg-muted/50">
                <blockquote className="text-lg italic mb-4">
                  {t.quote}
                </blockquote>
                <div className="font-semibold">{t.author}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.beliefsTitle}</h2>
              <p className="text-muted-foreground">{t.beliefsSub}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.values.map((value) => (
                <div key={value.title} className="glass-card hover-glow card p-6 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.howWeWorkTitle}</h2>
              <p className="text-muted-foreground">{t.howWeWorkSub}</p>
            </div>

            <div className="space-y-6">
              {t.steps.map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t.ctaSub}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={lp("/pricing")} className="btn bg-white text-primary hover:bg-white/90">
                {t.viewPricing}
              </Link>
              <Link href={lp("/get-started")} className="btn border-2 border-white text-white hover:bg-white/10">
                {t.startProject}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
