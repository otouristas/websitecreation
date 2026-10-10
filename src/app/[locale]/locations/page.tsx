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
import { LayoutGrid, MapPin } from "lucide-react";
import { CtaBand, KitHeading, KitSection, kitPrimaryBtn, kitSecondaryBtn } from "@/components/kit";
import { PageHero, accentTail } from "@/components/page-kit";

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
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={[
            { name: t.home, url: lp("/") },
            { name: t.locations, url: lp("/locations") },
          ]}
          pill={{
            href: lp("/get-started"),
            kind: "free",
            tag: isEl ? "Δωρεάν" : "Free",
            text: isEl ? "Έλεγχος SEO για την πόλη σας" : "An SEO audit for your city",
          }}
          title={accentTail(t.h1, 2)}
          lead={t.sub}
          meta={
            <Link
              href={localizedPath(isEl ? "en" : "el", "/locations")}
              hrefLang={isEl ? "en" : "el"}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t.otherLocaleLink}
            </Link>
          }
          actions={
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={lp("/get-started")} className={kitPrimaryBtn}>
                {t.getStarted}
              </Link>
              <Link href={lp("/pricing")} className={kitSecondaryBtn}>
                {t.viewPricing}
              </Link>
            </div>
          }
        />

        <KitSection className="!pt-14">
          <KitHeading eyebrow={t.locations} eyebrowIcon={<MapPin />} title={accentTail(t.citiesTitle, isEl ? 1 : 2)} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((location) => {
              const cityName = isEl && location.cityLocal ? location.cityLocal : location.city;
              const country = isEl ? countryNameEl(location) : location.country;
              return (
                <div key={location.slug} className="rounded-2xl border border-hairline bg-surface/70 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-display text-[17px] font-semibold text-foreground">
                    <MapPin className="size-4 text-brand" aria-hidden />
                    {cityName}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{country}</div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cityServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={lp(`/services/${service.slug}/${location.slug}`)}
                          className="inline-flex min-h-9 items-center rounded-full border border-hairline bg-background/50 px-3 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
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
        </KitSection>

        <KitSection tinted>
          <KitHeading
            align="center"
            eyebrow={isEl ? "Υπηρεσίες" : "Services"}
            eyebrowIcon={<LayoutGrid />}
            title={accentTail(t.allServicesTitle, 1)}
            description={t.allServicesSub}
          />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={lp(`/services/${service.slug}`)}
                className="flex min-h-12 items-center justify-center rounded-xl border border-hairline bg-surface/70 p-3 text-center text-sm font-medium text-foreground transition-colors hover:border-primary/50"
              >
                {serviceLabel(service.slug, service.shortName)}
              </Link>
            ))}
          </div>
        </KitSection>

        <CtaBand locale={siteLocale} source="locations-band" title={accentTail(t.readyTitle, 2)} description={t.readySub} />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
