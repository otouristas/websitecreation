import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  allLocations,
  groupLocationsByCountry,
  groupUSLocationsByState,
  COUNTRY_LABELS,
  globalTier1Locations,
} from "@/data/locations";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

const COUNTRY_LABELS_EL: Record<string, string> = {
  US: 'Ηνωμένες Πολιτείες',
  GR: 'Ελλάδα',
  GB: 'Ηνωμένο Βασίλειο',
  CA: 'Καναδάς',
  AU: 'Αυστραλία',
  FR: 'Γαλλία',
  DE: 'Γερμανία',
  IT: 'Ιταλία',
  JP: 'Ιαπωνία',
  AE: 'Ηνωμένα Αραβικά Εμιράτα',
  SG: 'Σιγκαπούρη',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Κατασκευή Ιστοσελίδων ανά Πόλη",
      description:
        "Κατασκευή ιστοσελίδων, SEO, GEO και AEO σε 120+ πόλεις σε Ελλάδα, ΗΠΑ, Ευρώπη. Δείτε τις πόλεις, μάθετε τιμές και ζητήστε δωρεάν προσφορά.",
      path: localizedPath('el', '/locations'),
      hreflangPath: "/locations",
      primaryKeyword: "κατασκευή ιστοσελίδων ανά πόλη",
    });
  }

  return buildMetadata({
    title: "Website Creation by City - Worldwide",
    description:
      "Website creation, SEO, GEO, and AEO services in 120+ cities: USA, Greece, UK, Canada, Australia, and global hubs. Local pricing, rich city pages, and free quotes.",
    path: localizedPath('en', '/locations'),
    hreflangPath: "/locations",
    primaryKeyword: "website creation by city",
  });
}

const REGION_ORDER = ["US", "GR", "GB", "CA", "AU", "FR", "DE", "IT", "JP", "AE", "SG"] as const;

export default async function LocationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const byCountry = groupLocationsByCountry();
  const usByState = groupUSLocationsByState();
  const usStates = Object.keys(usByState).sort();

  const t = isEl
    ? {
        home: "Αρχική",
        locations: "Τοποθεσίες",
        h1: "Κατασκευή Ιστοσελίδων ανά Πόλη",
        sub: `Παρέχουμε υπηρεσίες κατασκευής ιστοσελίδων, SEO web design, GEO/AEO και ανάπτυξης κώδικα σε επιχειρήσεις σε ${allLocations.length}+ πόλεις σε Ελλάδα, ΗΠΑ και Ευρώπη.`,
        getStarted: "Ξεκινήστε",
        viewPricing: "Δείτε τις Τιμές",
        topCitiesTitle: "Κορυφαίες Πόλεις",
        topCitiesSub: "Επιλέξτε την πόλη σας για να δείτε τιμές, διαθεσιμότητα και τοπικές υπηρεσίες",
        showingCities: (count: number, total: number) => `Εμφάνιση ${count} από ${total} κύριες πόλεις`,
        citiesCount: (count: number) => `${count} πόλεις · Όλες οι υπηρεσίες διαθέσιμες`,
        allServicesTitle: "Διαθέσιμο σε Κάθε Πόλη",
        allServicesSub: "Όλες οι υπηρεσίες μας σε κάθε τοποθεσία που καλύπτουμε",
        readyTitle: "Έτοιμοι να Ξεκινήσετε το Project Σας;",
        readySub: "Λάβετε μια προσαρμοσμένη προσφορά για την πόλη σας.",
        grCitiesLink: "Πόλεις στην Ελλάδα (Ελληνικά) →",
        enCitiesLink: "Cities worldwide (English) →",
      }
    : {
        home: "Home",
        locations: "Locations",
        h1: "Website Creation by City - Worldwide",
        sub: `We provide website creation, SEO web design, GEO/AEO, and development services to businesses in ${allLocations.length}+ cities across the United States, Greece, Europe, and global hubs.`,
        getStarted: "Get Started",
        viewPricing: "View Pricing",
        topCitiesTitle: "Top Cities Globally",
        topCitiesSub: "Select your city for local pricing, availability, and service pages",
        showingCities: (count: number, total: number) => `Showing ${count} of ${total} priority cities`,
        citiesCount: (count: number) => `${count} cities · All services available`,
        allServicesTitle: "Available in Every City",
        allServicesSub: "Every service × every location we cover",
        readyTitle: "Ready to Start Your Project?",
        readySub: "Get a custom quote for your city.",
        grCitiesLink: "Cities in Greece (Greek) →",
        enCitiesLink: "Cities worldwide (English) →",
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
                <span className="text-foreground">{t.locations}</span>
              </nav>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {t.h1}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t.sub}
              </p>
              {isEl ? (
                <p className="text-sm text-muted-foreground mb-8">
                  <Link href={localizedPath("en", "/locations")} hrefLang="en" className="text-primary font-medium hover:underline">
                    {t.enCitiesLink}
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mb-8">
                  <Link href={localizedPath("el", "/locations")} hrefLang="el" className="text-primary font-medium hover:underline">
                    {t.grCitiesLink}
                  </Link>
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <Link href={lp("/get-started")} className="btn btn-gradient">
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t.topCitiesTitle}</h2>
            <p className="text-muted-foreground mb-8">
              {t.topCitiesSub}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {globalTier1Locations.slice(0, 36).map((location) => {
                const cityName = isEl && location.cityLocal ? location.cityLocal : location.city;
                return (
                  <Link
                    key={location.slug}
                    href={lp(`/services/website-creation/${location.slug}`)}
                    className="glass-card hover-glow card p-4 text-center"
                  >
                    <div className="font-semibold">{cityName}</div>
                    <div className="text-xs text-muted-foreground">
                      {location.countryCode === "US"
                        ? location.stateCode
                        : location.countryCode}
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              {t.showingCities(36, globalTier1Locations.length)}
            </p>
          </div>
        </section>

        {REGION_ORDER.filter((code) => byCountry[code]?.length).map((countryCode) => {
          const countryLabel = isEl ? (COUNTRY_LABELS_EL[countryCode] ?? countryCode) : (COUNTRY_LABELS[countryCode] ?? countryCode);
          return (
            <section
              key={countryCode}
              className={`section ${countryCode === "US" ? "" : "bg-muted/30"}`}
            >
              <div className="container">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {countryLabel}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t.citiesCount(byCountry[countryCode].length)}
                </p>

                {countryCode === "US" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {usStates.map((state) => (
                      <div key={state} className="glass-card hover-glow card p-6">
                        <h3 className="font-bold mb-4">{state}</h3>
                        <div className="flex flex-wrap gap-2">
                          {usByState[state].map((loc) => (
                            <Link
                              key={loc.slug}
                              href={lp(`/services/website-creation/${loc.slug}`)}
                              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                            >
                              {loc.city}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {byCountry[countryCode].map((loc) => {
                      const cityName = isEl && loc.cityLocal ? loc.cityLocal : loc.city;
                      return (
                        <Link
                          key={loc.slug}
                          href={lp(`/services/website-creation/${loc.slug}`)}
                          className="glass-card hover-glow px-4 py-2 rounded-lg border border-border transition-smooth text-sm font-medium"
                        >
                          {cityName}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}

        <section className="section">
          <div className="container text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t.allServicesTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.allServicesSub}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
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
            <h2 className="text-3xl font-bold mb-4">{t.readyTitle}</h2>
            <p className="text-white/80 mb-8">{t.readySub}</p>
            <Link href={lp("/get-started")} className="btn bg-white text-primary hover:bg-white/90">
              {t.getStarted}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
