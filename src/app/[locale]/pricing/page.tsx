import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedPages from "@/components/seo/RelatedPages";
import { generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/seo/schema";
import { generateBreadcrumbs, getPricingRelatedPaths } from "@/lib/linking";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  if (locale === 'el') {
    return buildMetadata({
      title: "SEO Τιμές & Πακέτα - Κόστος Ιστοσελίδας",
      description:
        "Πόσο κοστίζει το SEO και η κατασκευή ιστοσελίδας; Πακέτα SEO από €299/μήνα, ιστοσελίδες από €899. Διαφανείς τιμές σε €, χωρίς κρυφές χρεώσεις.",
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
    price: 299,
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
    price: 599,
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
    price: 999,
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
        h1: "Τιμές SEO & Πακέτα Ιστοσελίδας",
        sub: "Διαφανές τιμές SEO και κατασκευής ιστοσελίδας στην Ελλάδα. Χωρίς κρυφές χρεώσεις — Starter SEO από €299/μήνα, ιστοσελίδες από €899.",
        webPackagesTitle: "Πακέτα Κατασκευής Ιστοσελίδας",
        seoPackagesTitle: "Τιμές SEO / Μηνιαία Πακέτα Προώθησης",
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
          },
          {
            q: "Πόσο κοστίζει το SEO στην Ελλάδα; Ποιες είναι οι τιμές SEO;",
            a: "Τα μηνιαία πακέτα SEO ξεκινούν από €299/μήνα (Starter), €599/μήνα (Growth) και €999/μήνα (Scale). Στην αγορά, το κόστος SEO κυμαίνεται συνήθως €250–€1.500+/μήνα ανάλογα με ανταγωνισμό και στόχους. Όλες οι τιμές μας είναι σε Ευρώ, χωρίς κρυφές χρεώσεις."
          },
          {
            q: "Γιατί το SEO φαίνεται ακριβό σε σχέση με φθηνές προσφορές;",
            a: "Επειδή σοβαρό SEO περιλαμβάνει τεχνική εργασία, περιεχόμενο, τοπικό προφίλ και αναφορές κάθε μήνα. Προσφορές €80–€100/μήνα σχεδόν πάντα σημαίνουν αυτοματοποιημένες αναφορές ή ριψοκίνδυνες τακτικές — όχι πραγματική βελτίωση κατάταξης."
          },
          {
            q: "Τι περιλαμβάνει ένα πακέτο SEO;",
            a: "Τεχνικό SEO, βελτιστοποίηση περιεχομένου και λέξεων-κλειδιών, τοπικό SEO με Google Business Profile και μηνιαία αναφορά προόδου. Τα μεγαλύτερα πακέτα προσθέτουν link building, περισσότερα άρθρα και βελτιστοποίηση GEO/AEO για AI μηχανές αναζήτησης."
          },
          {
            q: "Πόσο κοστίζει μια ιστοσελίδα;",
            a: "Η κατασκευή ιστοσελίδας ξεκινά από €899 (Starter, έως 5 σελίδες), €1.799 (Professional, έως 10 σελίδες) και €2.999 (Business, έως 20 σελίδες). Για e-shop προσθέστε τη ρύθμιση e-commerce (€499). Η τιμή περιλαμβάνει σχεδιασμό, ανάπτυξη και βασικό SEO."
          },
          {
            q: "Σε πόσο καιρό θα δω αποτελέσματα από το SEO;",
            a: "Για τοπικές αναζητήσεις με χαμηλό ανταγωνισμό, συχνά μέσα σε 2-3 μήνες. Για ανταγωνιστικές λέξεις-κλειδιά πανελλαδικά, υπολογίστε 4-6 μήνες. Το SEO είναι επένδυση που κλιμακώνεται - κάθε μήνας χτίζει πάνω στον προηγούμενο."
          },
          {
            q: "Πόσο κοστίζει κατασκευή e-shop;",
            a: "Η ρύθμιση WooCommerce e-shop ξεκινά από €499 ως add-on πάνω σε πακέτο ιστοσελίδας (ή ως μέρος του Business πακέτου στα €2.999). Το τελικό κόστος εξαρτάται από μέγεθος καταλόγου, πληρωμές και αποστολές. Δείτε και την υπηρεσία Κατασκευή E-shop WooCommerce."
          },
          {
            q: "Έχετε παραδείγματα έργων;",
            a: "Ναι — πάνω από 70 live projects σε rent-a-car, ξενοδοχεία, tours, e-shop και τοπικές επιχειρήσεις. Δείτε το portfolio μας και ζητήστε παρόμοιο project μέσω Get Started."
          }
        ],
        ctaTitle: "Έτοιμοι να Ξεκινήσουμε;",
        ctaDesc: "Επιλέξτε το πακέτο σας και λανσάρετε τη νέα σας ιστοσελίδα σε εβδομάδες, όχι μήνες. Ή ζητήστε προσαρμοσμένη προσφορά.",
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
        currency: "€",
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
          },
          {
            q: "How much does SEO cost?",
            a: "Monthly SEO packages start at €299/mo (Starter), €599/mo (Growth), and €999/mo (Scale). The cost depends on your industry's competition, your website's current state, and your goals. All prices are in EUR with no hidden fees."
          },
          {
            q: "What does an SEO package include?",
            a: "Technical SEO, content and keyword optimization, local SEO with Google Business Profile, and a monthly progress report. Larger packages add link building, more articles, and GEO/AEO optimization for AI search engines."
          },
          {
            q: "How much does a website cost?",
            a: "Website creation starts at €899 (Starter, up to 5 pages), €1,799 (Professional, up to 10 pages), and €2,999 (Business, up to 20 pages). For an e-shop, add e-commerce setup (€499). Pricing includes design, development, and baseline SEO."
          },
          {
            q: "How soon will I see SEO results?",
            a: "For low-competition local searches, often within 2-3 months. For competitive national keywords, expect 4-6 months. SEO compounds - every month builds on the last."
          },
          {
            q: "How much does an e-shop cost?",
            a: "WooCommerce e-commerce setup starts from €499 as an add-on on a website package (or as part of the Business package at €2,999). Final cost depends on catalog size, payments and shipping. See our WooCommerce e-shop service for details."
          },
          {
            q: "Do you have live project examples?",
            a: "Yes — 70+ live projects across rent-a-car, hotels, tours, e-commerce and local businesses. Browse the portfolio and request a similar project via Get Started."
          }
        ],
        ctaTitle: "Ready to Get Started?",
        ctaDesc: "Choose your package and launch your new website in weeks, not months. Or request a custom quote.",
        ctaButton: "Start Your Project",
      };

  const webPackages = isEl ? packagesEl : packagesEn;
  const seoPackages = isEl ? seoPackagesEl : seoPackagesEn;
  const addOns = isEl ? addOnsEl : addOnsEn;

  const faqSchema = generateFAQSchema({
    faqs: t.questions.map((q) => ({ question: q.q, answer: q.a })),
  });
  const breadcrumbs = generateBreadcrumbs(
    [{ name: isEl ? "Τιμές" : "Pricing", url: "/pricing" }],
    locale as SiteLocale,
  );
  const breadcrumbSchema = generateBreadcrumbSchema({ items: breadcrumbs });
  const relatedPages = getPricingRelatedPaths().map((p) => ({
    slug: lp(p.path),
    title: isEl ? p.titleEl : p.titleEn,
  }));

  return (
    <>
      <SchemaMarkup schemas={combineSchemas(faqSchema, breadcrumbSchema)} />
      <Header />
      <main className="main-below-header">
        <section className="section-compact gradient-hero">
          <div className="container text-center">
            <Breadcrumbs items={breadcrumbs} className="mb-6 justify-center" />
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
                    href={lp(`/get-started?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}`)}
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
                    href={lp(`/get-started?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}`)}
                    className={`btn w-full justify-center ${pkg.popular ? "btn-gradient" : "btn-outline"}`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO cost explainer (EL only — targets "πόσο κοστίζει το seo" / "seo τιμές") */}
        {isEl && (
          <section className="section">
            <div className="container max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">Πόσο Κοστίζει το SEO στην Ελλάδα;</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Το κόστος SEO στην Ελλάδα κυμαίνεται συνήθως από <strong className="text-foreground">€250 έως €1.500+ τον μήνα</strong>,
                  ανάλογα με τον ανταγωνισμό του κλάδου, το μέγεθος της ιστοσελίδας και τους στόχους σας. Στην
                  AnotherSEOGuru δουλεύουμε με τρία διαφανή πακέτα: <strong className="text-foreground">Starter €299/μήνα</strong> για
                  τοπικές επιχειρήσεις, <strong className="text-foreground">Growth €599/μήνα</strong> για επιχειρήσεις που θέλουν να
                  κυριαρχήσουν στις αναζητήσεις, και <strong className="text-foreground">Scale €999/μήνα</strong> για e-shop και brands
                  με πανελλαδική στόχευση.
                </p>
                <p>Τι επηρεάζει την τιμή:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Ανταγωνισμός:</strong> το «SEO Αθήνα» για δικηγόρους κοστίζει περισσότερο από το
                    τοπικό SEO σε μικρότερη πόλη με λίγους ανταγωνιστές.
                  </li>
                  <li>
                    <strong className="text-foreground">Κατάσταση ιστοσελίδας:</strong> ένα site με τεχνικά προβλήματα χρειάζεται
                    διορθώσεις πριν αποδώσει το περιεχόμενο.
                  </li>
                  <li>
                    <strong className="text-foreground">Στόχοι:</strong> τοπική προβολή σε μία πόλη ή πανελλαδική κατάταξη για
                    ανταγωνιστικές λέξεις-κλειδιά.
                  </li>
                  <li>
                    <strong className="text-foreground">Περιεχόμενο & links:</strong> τα άρθρα και το link building κλιμακώνουν το
                    αποτέλεσμα - και το κόστος.
                  </li>
                </ul>
                <p>
                  Προσοχή στις «προσφορές» των €100/μήνα: συνήθως σημαίνουν αυτοματοποιημένες αναφορές χωρίς πραγματική δουλειά.
                  Το σωστό SEO είναι επένδυση με μετρήσιμη απόδοση - ζητήστε πάντα να δείτε τι ακριβώς περιλαμβάνει το πακέτο και
                  πώς μετριέται η πρόοδος.
                </p>
              </div>
            </div>
          </section>
        )}

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

        {/* Money-page internal links */}
        <section className="section border-t border-border">
          <div className="container max-w-3xl">
            <RelatedPages
              title={isEl ? "Σχετικές σελίδες" : "Explore related pages"}
              pages={relatedPages}
            />
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
            <Link href={lp("/get-started")} className="btn bg-white text-primary hover:bg-white/90">
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
