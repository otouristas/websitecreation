import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Υπηρεσίες Κατασκευής Ιστοσελίδων & SEO",
      description:
        "Κατασκευή ιστοσελίδων, ανασχεδιασμός, SEO, GEO, AEO, τοπικό SEO, link building και τεχνικός έλεγχος. Δείτε τις τιμές μας και ζητήστε δωρεάν προσφορά.",
      path: localizedPath('el', '/services'),
      hreflangPath: "/services",
    });
  }

  return buildMetadata({
    title: "Web Design & SEO Services",
    description:
      "Website creation, redesign, SEO web design, GEO, AEO, local SEO, content, link building, and technical audits. Full-service agency plus GSC-native software.",
    path: localizedPath('en', '/services'),
    hreflangPath: "/services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const t = isEl
    ? {
        h1Pre: "Οι",
        h1Post: "Υπηρεσίες μας",
        sub: "Ολοκληρωμένες ψηφιακές λύσεις που βοηθούν την επιχείρησή σας να αναπτυχθεί. Από premium web design μέχρι τεχνική βελτιστοποίηση SEO.",
        learnMore: "Μάθετε περισσότερα",
        moreFeatures: (count: number) => `+ ${count} επιπλέον χαρακτηριστικά`,
        notSureTitle: "Δεν είστε σίγουροι τι χρειάζεστε;",
        notSureDesc: "Κλείστε μια δωρεάν διαβούλευση με τους ειδικούς μας. Θα αναλύσουμε την online παρουσία σας και θα σας προτείνουμε την καλύτερη στρατηγική ανάπτυξης.",
        getQuote: "Λάβετε Δωρεάν Προσφορά",
        viewPricing: "Δείτε τις Τιμές",
      }
    : {
        h1Pre: "Our",
        h1Post: "Services",
        sub: "Comprehensive digital solutions to help your business grow. From stunning web design to technical SEO optimization.",
        learnMore: "Learn more",
        moreFeatures: (count: number) => `+ ${count} more features`,
        notSureTitle: "Not sure what you need?",
        notSureDesc: "Book a free consultation with our experts. We'll analyze your current online presence and recommend the best strategy for your growth.",
        getQuote: "Get a Free Quote",
        viewPricing: "View Pricing",
      };

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="main-below-header min-h-screen pb-16">
        <section className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t.h1Pre} <span className="gradient-text">{t.h1Post}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const svcEl = isEl ? getServiceEl(service.slug) : null;
              const name = svcEl?.name ?? service.name;
              const desc = svcEl?.description ?? service.description;
              const features = isEl && svcEl?.features ? svcEl.features : service.features;
              
              return (
                <Link
                  key={service.slug}
                  href={lp(`/services/${service.slug}`)}
                  className="glass-card hover-glow card p-8 group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-smooth shadow-lg shadow-primary/20">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {name}
                  </h2>

                  <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
                    {desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                    {features.length > 3 && (
                      <div className="text-xs text-muted-foreground pl-3.5">{t.moreFeatures(features.length - 3)}</div>
                    )}
                  </div>

                  <div className="flex items-center text-primary font-medium mt-auto group-hover:translate-x-1 transition-transform">
                    {t.learnMore}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="container mt-24">
          <div className="glass-card hover-glow rounded-3xl p-8 sm:p-12 text-center border border-border relative overflow-hidden bg-muted/10">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{t.notSureTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t.notSureDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={lp("/contact")} className="btn btn-gradient px-8 py-3">
                  {t.getQuote}
                </Link>
                <Link href={lp("/pricing")} className="btn btn-outline px-8 py-3 bg-background">
                  {t.viewPricing}
                </Link>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </section>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
