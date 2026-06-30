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
      title: "Τιμές & Πακέτα SEO & Κατασκευής Ιστοσελίδων",
      description:
        "Διαφανείς τιμές για κατασκευή ιστοσελίδας, ανασχεδιασμό, πακέτα SEO, GEO/AEO και βελτιστοποίηση ταχύτητας. Δείτε τα πακέτα μας.",
      path: localizedPath(locale as SiteLocale, "/pricing"),
      hreflangPath: "/pricing",
    });
  }
  return buildMetadata({
    title: "Agency Pricing - Web & SEO Packages",
    description:
      "Transparent agency pricing for website creation, redesign, SEO web design, GEO, AEO, and speed optimization. Compare packages and request a custom quote today.",
    path: localizedPath(locale as SiteLocale, "/pricing"),
    hreflangPath: "/pricing",
  });
}

const packagesEn = [
  {
    name: "Starter",
    description: "Perfect for small businesses and startups getting online",
    price: 899,
    originalPrice: 1499,
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "Basic SEO setup",
      "Speed optimized",
      "1 revision round",
      "2-week delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses that need more features",
    price: 1799,
    originalPrice: 2999,
    features: [
      "Up to 10 pages",
      "Custom design",
      "Advanced contact forms",
      "Full SEO optimization",
      "Blog/News section",
      "Social media integration",
      "2 revision rounds",
      "3-week delivery",
      "Analytics setup",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Business",
    description: "Complete solution for established businesses",
    price: 2999,
    originalPrice: 4999,
    features: [
      "Up to 20 pages",
      "Premium custom design",
      "E-commerce ready",
      "Full SEO + local SEO",
      "CMS integration",
      "Email marketing setup",
      "Unlimited revisions",
      "4-week delivery",
      "Priority support",
      "3 months maintenance",
    ],
    cta: "Go Business",
    popular: false,
  },
];

const packagesEl = [
  {
    name: "Starter",
    description: "Ιδανικό για μικρές επιχειρήσεις και startups που ξεκινούν online",
    price: 899,
    originalPrice: 1499,
    features: [
      "Έως 5 σελίδες",
      "Mobile responsive σχεδιασμός",
      "Φόρμα επικοινωνίας",
      "Βασικό SEO setup",
      "Βελτιστοποίηση ταχύτητας",
      "1 γύρος αναθεωρήσεων",
      "2 εβδομάδες παράδοση",
    ],
    cta: "Ξεκινήστε",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ιδανικό για αναπτυσσόμενες επιχειρήσεις που χρειάζονται περισσότερα",
    price: 1799,
    originalPrice: 2999,
    features: [
      "Έως 10 σελίδες",
      "Custom σχεδιασμός",
      "Προηγμένες φόρμες",
      "Πλήρης SEO βελτιστοποίηση",
      "Ενότητα Blog/Νέα",
      "Σύνδεση με Social Media",
      "2 γύροι αναθεωρήσεων",
      "3 εβδομάδες παράδοση",
      "Ρύθμιση Analytics",
    ],
    cta: "Δημοφιλέστερο",
    popular: true,
  },
  {
    name: "Business",
    description: "Ολοκληρωμένη λύση για εδραιωμένες επιχειρήσεις & e-shop",
    price: 2999,
    originalPrice: 4999,
    features: [
      "Έως 20 σελίδες",
      "Premium custom σχεδιασμός",
      "Έτοιμο e-commerce",
      "Πλήρες SEO & τοπικό SEO",
      "Ενσωμάτωση CMS",
      "Ρύθμιση Email Marketing",
      "Απεριόριστες αναθεωρήσεις",
      "4 εβδομάδες παράδοση",
      "Υποστήριξη προτεραιότητας",
      "3 μήνες συντήρηση",
    ],
    cta: "Επιλογή Business",
    popular: false,
  },
];

const seoPackagesEn = [
  {
    name: "Starter SEO",
    description: "Ideal for local businesses starting their organic growth",
    price: 349,
    period: "/mo",
    features: [
      "Up to 10 target keywords",
      "Basic On-page SEO setup",
      "Google Business Profile optimization",
      "1 SEO-optimized article per month",
      "Monthly keyword ranking report",
      "Core Web Vitals basic check",
    ],
    cta: "Choose Starter SEO",
  },
  {
    name: "Growth SEO",
    description: "For businesses wanting to dominate search results",
    price: 699,
    period: "/mo",
    features: [
      "Up to 30 target keywords",
      "Full On-page & Technical SEO",
      "Local SEO targeting",
      "3 SEO-optimized articles per month",
      "Link building strategy (2 quality links)",
      "AEO/GEO AI search optimization",
      "Monthly strategy call",
    ],
    cta: "Choose Growth SEO",
    popular: true,
  },
  {
    name: "Scale SEO",
    description: "For e-commerce stores and national brands",
    price: 1199,
    period: "/mo",
    features: [
      "60+ target keywords",
      "E-commerce SEO (collections/products)",
      "International SEO & Hreflang setup",
      "6+ SEO-optimized articles per month",
      "Premium Link Building (5+ quality links)",
      "AEO/GEO & AI chatbot support",
      "Direct slack/phone support",
      "Bi-weekly performance review",
    ],
    cta: "Choose Scale SEO",
  },
];

const seoPackagesEl = [
  {
    name: "Starter SEO",
    description: "Ιδανικό για τοπικές επιχειρήσεις που ξεκινούν την προώθηση",
    price: 299,
    period: "/μήνα",
    features: [
      "Στόχευση έως 10 λέξεων-κλειδιά",
      "Βασικό On-page SEO",
      "Βελτιστοποίηση Google Business Profile",
      "1 SEO-optimized άρθρο / μήνα",
      "Μηνιαία αναφορά κατάταξης",
      "Έλεγχος Core Web Vitals",
    ],
    cta: "Επιλογή Starter SEO",
  },
  {
    name: "Growth SEO",
    description: "Για επιχειρήσεις που θέλουν να κυριαρχήσουν στον ανταγωνισμό",
    price: 599,
    period: "/μήνα",
    features: [
      "Στόχευση έως 30 λέξεων-κλειδιά",
      "Πλήρες On-page & Technical SEO",
      "Τοπικό SEO σε Tier-1 πόλεις",
      "3 SEO-optimized άρθρα / μήνα",
      "Στρατηγική Link Building (2 backlinks)",
      "AEO/GEO optimization για AI search",
      "1/2 ώρα μηνιαία συμβουλευτική",
    ],
    cta: "Επιλογή Growth SEO",
    popular: true,
  },
  {
    name: "Scale SEO",
    description: "Για e-shops και μεγάλες επιχειρήσεις σε ανταγωνιστικές αγορές",
    price: 999,
    period: "/μήνα",
    features: [
      "Στόχευση 60+ λέξεων-κλειδιά",
      "E-commerce SEO (κατηγορίες/προϊόντα)",
      "Πολυγλωσσικό SEO & Hreflang",
      "6+ SEO-optimized άρθρα / μήνα",
      "Premium Link Building (5+ backlinks)",
      "AEO/GEO & AI Chatbot integration",
      "2 ώρες μηνιαία συμβουλευτική",
      "Priority υποστήριξη 24/7",
    ],
    cta: "Επιλογή Scale SEO",
  },
];

const addOnsEn = [
  { name: "Logo Design", price: 299 },
  { name: "Content Writing (per page)", price: 99 },
  { name: "Additional Pages", price: 149 },
  { name: "E-commerce Setup", price: 499 },
  { name: "Monthly Maintenance", price: 199 },
  { name: "AI Chatbot Integration", price: 399 },
];

const addOnsEl = [
  { name: "Σχεδιασμός Λογοτύπου", price: 299 },
  { name: "Συγγραφή Περιεχομένου (ανά σελίδα)", price: 99 },
  { name: "Επιπλέον Σελίδες", price: 149 },
  { name: "Ρύθμιση E-commerce", price: 499 },
  { name: "Μηνιαία Συντήρηση", price: 199 },
  { name: "Ενσωμάτωση AI Chatbot", price: 399 },
];

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  const isEl = locale === 'el';

  const t = isEl
    ? {
        h1: "Απλές, Διαφανείς Τιμές",
        sub: "Χωρίς κρυφές χρεώσεις. Επιλέξτε το πακέτο που ταιριάζει στις ανάγκες σας και αποκτήστε μια γρήγορη, επαγγελματική ιστοσελίδα.",
        webPackagesTitle: "Πακέτα Κατασκευής Ιστοσελίδας",
        seoPackagesTitle: "Πακέτα Προώθησης SEO (Μηνιαία)",
        addonsTitle: "Προαιρετικά Add-ons",
        addonsSub: "Ενισχύστε το πακέτο σας με επιπλέον υπηρεσίες",
        faqTitle: "Συχνές Ερωτήσεις",
        currency: "€",
        periodOneTime: "εφάπαξ",
        per: "/μήνα",
        questions: [
          {
            q: "Τι περιλαμβάνεται στην τιμή;",
            a: "Κάθε πακέτο περιλαμβάνει σχεδιασμό, ανάπτυξη, βασικό setup SEO, mobile βελτιστοποίηση και καθοδήγηση για hosting. Παραδίδουμε όλα τα αρχεία του κώδικα μετά την ολοκλήρωση."
          },
          {
            q: "Πόσο χρόνο παίρνει η κατασκευή;",
            a: "Οι χρόνοι παράδοσης διαμορφώνονται ως εξής: Starter (2 εβδομάδες), Professional (3 εβδομάδες), Business (4 εβδομάδες). Αυτό ισχύει από την έναρξη του project αφού λάβουμε όλο το υλικό."
          },
          {
            q: "Τι γίνεται αν χρειαστώ αλλαγές μετά το λανσάρισμα;",
            a: "Οι αναθεωρήσεις κατά τη διάρκεια του project περιλαμβάνονται. Μετά το λανσάρισμα, μπορείτε να επιλέξετε το μηνιαίο πλάνο συντήρησης ή να ζητήσετε αλλαγές με ωριαία χρέωση."
          },
          {
            q: "Χρειάζεται να παρέχω εγώ το περιεχόμενο;",
            a: "Ναι, θα χρειαστεί να μας δώσετε τα κείμενα και τις εικόνες. Αν χρειάζεστε βοήθεια, προσφέρουμε υπηρεσίες συγγραφής SEO περιεχομένου ως add-on."
          }
        ],
        ctaTitle: "Έτοιμοι να Ξεκινήσουμε;",
        ctaDesc: "Επιλέξτε το πακέτο σας και λανσάρετε τη νέα σας ιστοσελίδα σε εβδομάδες, όχι μήνες.",
        ctaButton: "Ξεκινήστε το Project",
      }
    : {
        h1: "Simple, Transparent Pricing",
        sub: "No hidden fees. No surprises. Choose the package that fits your business and get a fast, professional website that drives results.",
        webPackagesTitle: "Website Creation Packages",
        seoPackagesTitle: "Monthly SEO Packages",
        addonsTitle: "Optional Add-ons",
        addonsSub: "Enhance your package with additional services",
        faqTitle: "Common Questions",
        currency: "$",
        periodOneTime: "one-time",
        per: "/mo",
        questions: [
          {
            q: "What's included in the price?",
            a: "Each package includes design, development, basic SEO setup, mobile optimization, and hosting setup guidance. You'll receive all source files upon completion."
          },
          {
            q: "How long does it take?",
            a: "Delivery times vary by package: Starter (2 weeks), Professional (3 weeks), Business (4 weeks). These are from project kickoff after receiving all content."
          },
          {
            q: "What if I need changes later?",
            a: "Revisions during the project are included. After launch, you can purchase our monthly maintenance plan or request changes on an hourly basis."
          },
          {
            q: "Do I need to provide content?",
            a: "Yes, you'll need to provide text content and images. If you need help, we offer content writing services as an add-on."
          }
        ],
        ctaTitle: "Ready to Get Started?",
        ctaDesc: "Choose your package and launch your new website in weeks, not months.",
        ctaButton: "Start Your Project",
      };

  const webPackages = isEl ? packagesEl : packagesEn;
  const seoPackages = isEl ? seoPackagesEl : seoPackagesEn;
  const addOns = isEl ? addOnsEl : addOnsEn;

  return (
    <>
      <Header />
      <main className="main-below-header">
        <section className="section-compact gradient-hero">
          <div className="container text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.sub}
            </p>
          </div>
        </section>

        {/* Web Design Packages */}
        <section className="section -mt-8">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t.webPackagesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              {webPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`glass-card hover-glow card p-6 relative flex flex-col ${pkg.popular ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-semibold">
                      {isEl ? "Δημοφιλές" : "Most Popular"}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{pkg.description}</p>
                    <div className="flex flex-col items-center justify-center gap-0">
                      {pkg.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through decoration-destructive/50 decoration-2">
                          {t.currency}{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{t.currency}{pkg.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">{t.periodOneTime}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={lp(`/get-started?package=${pkg.name.toLowerCase()}`)}
                    className={`btn w-full justify-center ${pkg.popular ? "btn-gradient" : "btn-outline"}`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Packages */}
        <section className="section bg-muted/20 border-y border-border">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t.seoPackagesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {seoPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`glass-card hover-glow card p-6 relative flex flex-col ${pkg.popular ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-semibold">
                      {isEl ? "Δημοφιλές" : "Most Popular"}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{pkg.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{t.currency}{pkg.price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm">{pkg.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={lp(`/get-started?package=${pkg.name.toLowerCase()}`)}
                    className={`btn w-full justify-center ${pkg.popular ? "btn-gradient" : "btn-outline"}`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.addonsTitle}</h2>
              <p className="text-muted-foreground">
                {t.addonsSub}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {addOns.map((addon) => (
                <div key={addon.name} className="glass-card hover-glow card p-4 flex items-center justify-between">
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-primary font-semibold">{t.currency}{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-muted/30 border-t border-border">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">{t.faqTitle}</h2>

            <div className="space-y-4">
              {t.questions.map((q) => (
                <div key={q.q} className="glass-card hover-glow card p-6">
                  <h3 className="font-semibold mb-2">{q.q}</h3>
                  <p className="text-sm text-muted-foreground">{q.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-white/80 mb-8">
              {t.ctaDesc}
            </p>
            <Link href={lp("/contact")} className="btn bg-white text-primary hover:bg-white/90">
              {t.ctaButton}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
