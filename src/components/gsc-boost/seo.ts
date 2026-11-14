import type { Metadata } from "next";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME, brandOrganization, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getAppPath } from "@/lib/app-links";
import type { Copy } from "./copy";
import { PLANS } from "./plans";
import type { SchemaOutput } from "@/lib/types/seo";

/**
 * Metadata for a /platform page. The platform is bilingual: each locale is
 * its own canonical, with en/el/x-default hreflang alternates.
 */
export function platformMetadata(input: {
  readonly locale: SiteLocale;
  readonly path: string;
  readonly title: Copy;
  readonly description: Copy;
  readonly keyword: Copy;
}): Metadata {
  const { locale, path } = input;
  const localized = localizedPath(locale, path);
  return buildMetadata({
    title: input.title[locale],
    description: input.description[locale],
    path: localized,
    canonicalPath: localized,
    hreflangPath: path,
    primaryKeyword: input.keyword[locale],
  });
}

/** SoftwareApplication with the real plan prices (US dollars, per month). */
export function gscBoostSoftwareSchema(locale: SiteLocale, path = "/"): SchemaOutput {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#app`,
    name: "AnotherSEOGuru App",
    alternateName: "AnotherSEOGuru",
    description:
      locale === "el"
        ? "Λογισμικό για ανάλυση αναζητήσεων και αναφορές SEO. Συνδέστε το Google Search Console, συγκρίνετε την απόδοση ανά σελίδα και ετοιμάστε αναφορά για τον πελάτη σας."
        : "SEO reporting software for agencies and site owners. Connect Google Search Console, compare search performance by page and prepare a client report.",
    url: BASE_URL,
    subjectOf: { "@type": "WebPage", url: `${BASE_URL}${localizedPath(locale, path)}` },
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEO reporting software",
    operatingSystem: "Web, iOS, Android",
    inLanguage: locale,
    installUrl: getAppPath("/signup"),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: String(Math.max(...PLANS.map((p) => p.monthly))),
      offerCount: PLANS.length + 1,
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", url: `${BASE_URL}${localizedPath(locale, "/pricing")}` },
        ...PLANS.map((p) => ({
          "@type": "Offer",
          name: p.id,
          price: String(p.monthly),
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(p.monthly),
            priceCurrency: "USD",
            unitCode: "MON",
          },
          url: `${BASE_URL}${localizedPath(locale, "/pricing")}`,
        })),
      ],
    },
    provider: brandOrganization(),
    publisher: { "@type": "Organization", "@id": LEGAL_ENTITY_ID, name: LEGAL_ENTITY_NAME },
  };
}

export function platformBreadcrumbs(locale: SiteLocale, trail: ReadonlyArray<{ name: string; path: string }>) {
  const home = locale === "el" ? "Αρχική" : "Home";
  return generateBreadcrumbSchema({
    items: [{ name: home, url: localizedPath(locale, "/") }, ...trail.map((t) => ({ name: t.name, url: localizedPath(locale, t.path) }))],
  });
}
