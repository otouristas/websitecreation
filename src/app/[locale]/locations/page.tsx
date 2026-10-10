import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getIndexableServiceLocations, countryNameEl } from "@/data/locations";
import { getServiceBySlug, services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { CITY_PAGE_SERVICES } from "@/lib/indexability/service-location";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata, generateCollectionPageSchema } from "@/lib/seo";
import { BASE_URL } from "@/lib/seo/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Κατασκευή Ιστοσελίδων & SEO ανά Πόλη",
      description:
        "Κατασκευή ιστοσελίδων, τοπικό SEO, υπηρεσίες SEO και e-shop σε Αθήνα, Θεσσαλονίκη, Κρήτη, Κυκλάδες, Δωδεκάνησα και Ιόνιο. Δείτε την πόλη σας και ζητήστε προσφορά.",
      path: localizedPath('el', '/locations'),
      hreflangPath: "/locations",
      primaryKeyword: "κατασκευή ιστοσελίδων ανά πόλη",
    });
  }

  return buildMetadata({
    title: "Website Creation & SEO by City",
    description:
      "Website creation, local SEO, SEO services and e-shops in London and the main Greek destinations: Athens, Crete, the Cyclades, Rhodes, Kos and Corfu. Request a quote.",
    path: localizedPath('en', '/locations'),
    hreflangPath: "/locations",
    primaryKeyword: "website creation by city",
  });
}

export default async function LocationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === 'el';
  const lp = (path: string) => localizedPath(siteLocale, path);

  // Only cities with live service pages (2026-10 city cut, see
  // src/lib/indexability/service-location.ts). This page used to link all 161
  // locations, most of them noindex and now 410 Gone.
  const cities = getIndexableServiceLocations(siteLocale);
  const cityServices = CITY_PAGE_SERVICES
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const serviceLabel = (slug: string, fallback: string) => {
    const el = isEl ? getServiceEl(slug) : null;
    return el?.shortName ?? el?.name ?? fallback;
  };

  const collectionSchema = generateCollectionPageSchema({
    name: isEl ? "Κατασκευή Ιστοσελίδων & SEO ανά Πόλη" : "Website creation & SEO by city",
    url: `${BASE_URL}${lp("/locations")}`,
    inLanguage: siteLocale,
    items: cities.map((location) => ({
      url: `${BASE_URL}${lp(`/services/website-creation/${location.slug}`)}`,
      name: isEl && location.cityLocal ? location.cityLocal : location.city,
      itemType: "WebPage",
    })),
  });

  const t = isEl
    ? {
        home: "Αρχική",
        locations: "Τοποθεσίες",
        h1: "Κατασκευή Ιστοσελίδων & SEO ανά Πόλη",
        sub: "Σελίδες για τις πόλεις και τα νησιά όπου δουλεύουμε περισσότερο. Για κάθε άλλη περιοχή, οι σελίδες υπηρεσιών και η προσφορά ισχύουν το ίδιο.",
        getStarted: "Ξεκινήστε",
        viewPricing: "Δείτε τις Τιμές",
        citiesTitle: "Πόλεις και νησιά",
        allServicesTitle: "Όλες οι υπηρεσίες",
        allServicesSub: "Δουλεύουμε με επιχειρήσεις σε όλη την Ελλάδα, όχι μόνο στις πόλεις παραπάνω.",
        readyTitle: "Έτοιμοι να Ξεκινήσετε το Project Σας;",
        readySub: "Λάβετε μια προσαρμοσμένη προσφορά για την επιχείρησή σας.",
        otherLocaleLink: "Cities in English →",
      }
    : {
        home: "Home",
        locations: "Locations",
        h1: "Website Creation & SEO by City",
        sub: "Pages for London and the Greek destinations where we do most of our work. Anywhere else, the service pages and quotes apply just the same.",
        getStarted: "Get Started",
        viewPricing: "View Pricing",
        citiesTitle: "Cities and islands",
        allServicesTitle: "All services",
        allServicesSub: "We work with businesses well beyond the cities above.",
        readyTitle: "Ready to Start Your Project?",
        readySub: "Get a custom quote for your business.",
        otherLocaleLink: "Πόλεις στα Ελληνικά →",
      };

  return (
    <>
      <SchemaMarkup schemas={[collectionSchema]} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 main-below-header">
        <section className="section-compact ">
          <div className="container">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href={lp("/")} className="hover:text-primary">{t.home}</Link>
                <span>/</span>
                <span className="text-foreground">{t.locations}</span>
              </nav>

              <h1 className="font-display text-4xl font-medium tracking-[-0.04em] sm:text-5xl mb-6">
                {t.h1}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t.sub}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                <Link
                  href={localizedPath(isEl ? "en" : "el", "/locations")}
                  hrefLang={isEl ? "en" : "el"}
                  className="text-primary font-medium hover:underline"
                >
                  {t.otherLocaleLink}
                </Link>
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={lp("/get-started")} className="btn btn-primary">
                  {t.getStarted}
                </Link>
                <Link href={lp("/pricing")} className="btn btn-outline">
                  {t.viewPricing}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-8">{t.citiesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((location) => {
                const cityName = isEl && location.cityLocal ? location.cityLocal : location.city;
                const country = isEl ? countryNameEl(location) : location.country;
                return (
                  <div key={location.slug} className="card p-5">
                    <div className="font-semibold">{cityName}</div>
                    <div className="text-xs text-muted-foreground mb-3">{country}</div>
                    <ul className="flex flex-wrap gap-2">
                      {cityServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={lp(`/services/${service.slug}/${location.slug}`)}
                            className="inline-block rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
                          >
                            {serviceLabel(service.slug, service.shortName)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-surface-raised/40">
          <div className="container text-center">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-4">{t.allServicesTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.allServicesSub}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={lp(`/services/${service.slug}`)}
                  className="card card-interactive p-3 text-center rounded-lg border border-hairline transition-smooth text-sm font-medium"
                >
                  {serviceLabel(service.slug, service.shortName)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-medium tracking-[-0.03em] mb-4">{t.readyTitle}</h2>
            <p className="text-white/80 mb-8">{t.readySub}</p>
            <Link href={lp("/get-started")} className="btn bg-white text-primary hover:bg-white/90">
              {t.getStarted}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
