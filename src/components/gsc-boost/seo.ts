import type { Metadata } from "next";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, BRAND_NAME, generateBreadcrumbSchema } from "@/lib/seo/schema";
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
export function gscBoostSoftwareSchema(locale: SiteLocale, path = "/platform"): SchemaOutput {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GSC Boost",
    alternateName: "AnotherSEOGuru",
    description:
      locale === "el"
        ? "Λογισμικό SEO που διαβάζει το Google Search Console και δίνει τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση."
        : "SEO software that reads Google Search Console and hands you the fixes that win the most clicks, ranked and estimated.",
    url: `${BASE_URL}${localizedPath(locale, path)}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    installUrl: getAppPath("/signup"),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: String(Math.min(...PLANS.map((p) => p.monthly))),
      highPrice: String(Math.max(...PLANS.map((p) => p.monthly))),
      offerCount: PLANS.length,
      offers: PLANS.map((p) => ({
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
        url: `${BASE_URL}${localizedPath(locale, "/platform/pricing")}`,
      })),
    },
    provider: { "@type": "Organization", name: BRAND_NAME, url: BASE_URL },
  };
}

export function platformBreadcrumbs(locale: SiteLocale, trail: ReadonlyArray<{ name: string; path: string }>) {
  const home = locale === "el" ? "Αρχική" : "Home";
  return generateBreadcrumbSchema({
    items: [{ name: home, url: localizedPath(locale, "/") }, { name: "GSC Boost", url: localizedPath(locale, "/platform") }, ...trail.map((t) => ({ name: t.name, url: localizedPath(locale, t.path) }))],
  });
}
