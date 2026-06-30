import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { industriesEl } from "@/data/industries-i18n";
import { getServiceEl } from "@/data/services-i18n";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Κλαδικές Λύσεις SEO & Web Design",
      description:
        "Εξειδικευμένες ιστοσελίδες και λύσεις SEO για ενοικίαση αυτοκινήτου, ξενοδοχεία, τουρισμό, εστιατόρια, e-commerce και άλλα. Ζητήστε δωρεάν προσφορά.",
      path: localizedPath('el', '/solutions'),
      hreflangPath: "/solutions",
    });
  }

  return buildMetadata({
    title: "Industry SEO & Web Solutions",
    description:
      "Industry-specific website and SEO solutions for restaurants, hotels, legal, medical, home services, ecommerce, and more. Tailored playbooks and service packages.",
    path: localizedPath('en', '/solutions'),
    hreflangPath: "/solutions",
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const t = isEl
    ? {
        home: "Αρχική",
        solutions: "Λύσεις",
        h1: "Κλαδικές Λύσεις",
        sub: "Κάθε κλάδος έχει μοναδικές ανάγκες. Κατασκευάζουμε ιστοσελίδες ειδικά σχεδιασμένες για τον δικό σας κλάδο - με τα χαρακτηριστικά, το design και το SEO που σας βοηθά να ξεχωρίσετε.",
        viewPricing: "Δείτε τις Τιμές",
        startProject: "Ξεκινήστε το Project",
        ourServicesTitle: "Οι Υπηρεσίες Μας",
        ourServicesSub: "Κάθε κλαδική λύση περιλαμβάνει πρόσβαση σε όλο το φάσμα των υπηρεσιών μας",
        readyTitle: "Έτοιμοι να Κατασκευάσετε την Ιστοσελίδα Σας;",
        readySub: "Λάβετε μια προσαρμοσμένη προσφορά ειδικά για τον κλάδο της επιχείρησής σας.",
        viewSolutionsFor: (name: string) => `Λύσεις για ${name} →`,
      }
    : {
        home: "Home",
        solutions: "Solutions",
        h1: "Industry Solutions",
        sub: "Every industry has unique needs. We build websites specifically designed for your business type - with the features, design, and SEO focus that helps you stand out and get found by your ideal customers.",
        viewPricing: "View Pricing",
        startProject: "Start Your Project",
        ourServicesTitle: "Our Services",
        ourServicesSub: "Every industry solution includes access to our full range of services",
        readyTitle: "Ready to Build Your Industry Website?",
        readySub: "Get a custom quote tailored for your business type.",
        viewSolutionsFor: (name: string) => `View ${name} Solutions →`,
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
                <span className="text-foreground">{t.solutions}</span>
              </nav>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {t.h1}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={lp("/pricing")} className="btn btn-gradient">
                  {t.viewPricing}
                </Link>
                <Link href={lp("/get-started")} className="btn btn-outline">
                  {t.startProject}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => {
                const indEl = isEl ? industriesEl[industry.slug] : null;
                const name = indEl?.name ?? industry.name;
                const desc = indEl?.description ?? industry.description;
                const points = isEl && indEl?.painPoints ? indEl.painPoints : industry.painPoints;
                return (
                  <Link
                    key={industry.slug}
                    href={lp(`/solutions/${industry.slug}`)}
                    className="glass-card hover-glow card p-6 group"
                  >
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth">
                      {name}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {points.slice(0, 3).map((point, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-muted rounded"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary text-sm font-medium">
                      {t.viewSolutionsFor(name)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              {t.ourServicesTitle}
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t.ourServicesSub}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {services.map((service) => {
                const svcEl = isEl ? getServiceEl(service.slug) : null;
                const name = svcEl?.shortName ?? svcEl?.name ?? service.shortName;
                return (
                  <Link
                    key={service.slug}
                    href={lp(`/services/${service.slug}`)}
                    className="glass-card hover-glow p-3 text-center rounded-lg border border-border transition-smooth text-sm font-medium"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t.readyTitle}
            </h2>
            <p className="text-white/80 mb-8">
              {t.readySub}
            </p>
            <Link href={lp("/get-started")} className="btn bg-white text-primary hover:bg-white/90">
              {t.startProject}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
