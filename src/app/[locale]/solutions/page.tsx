import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { industries, TOURISM_INDUSTRY_SLUGS } from "@/data/industries";
import { industriesEl } from "@/data/industries-i18n";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  combineSchemas,
  BASE_URL,
} from "@/lib/seo/schema";
import { generateBreadcrumbs } from "@/lib/linking";
import {
  Section,
  SectionHeading,
  MeshGrid,
  Bloom,
  PrimaryButtonLink,
  GhostButtonLink,
} from "@/components/landing/primitives";
import { PROJECT_COUNT } from "@/data/company-facts";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  return buildMetadata({
    title: isEl ? "Λύσεις SEO & Ιστοσελίδων ανά Κλάδο" : "SEO & Website Solutions by Industry",
    description: isEl
      ? "Ιστοσελίδες και SEO ανά κλάδο: ξενοδοχεία, ενοικίαση αυτοκινήτου, τουρισμός, εστίαση και υπηρεσίες. Στρατηγική με βάση τη ζήτηση του κλάδου σας."
      : "Websites and SEO by industry: hotels, rent-a-car, tourism, restaurants and service businesses. Strategy built around the demand in your sector.",
    path: localizedPath(locale, "/solutions"),
    hreflangPath: "/solutions",
    primaryKeyword: isEl ? "λύσεις ανά κλάδο" : "industry solutions",
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: isEl ? "Λύσεις" : "Solutions", url: "/solutions" }],
    siteLocale,
  );

  const named = industries.map((i) => ({
    ...i,
    displayName: isEl ? industriesEl[i.slug]?.name ?? i.name : i.name,
    displayDescription: isEl
      ? industriesEl[i.slug]?.description ?? i.description
      : i.description,
    displayPainPoints: isEl
      ? industriesEl[i.slug]?.painPoints ?? i.painPoints
      : i.painPoints,
  }));

  // Tourism is where the portfolio proof lives, so it leads. Everything else
  // keeps its own indexable page and is listed in full below.
  const tourism = named.filter((i) => TOURISM_INDUSTRY_SLUGS.includes(i.slug as never));
  const rest = named.filter((i) => !TOURISM_INDUSTRY_SLUGS.includes(i.slug as never));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateCollectionPageSchema({
      name: isEl ? "Λύσεις ανά κλάδο" : "Solutions by industry",
      url: `${BASE_URL}${lp("/solutions")}`,
      inLanguage: siteLocale,
      items: named.map((i) => ({
        url: `${BASE_URL}${lp(`/solutions/${i.slug}`)}`,
        name: i.displayName,
      })),
    }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <section className="relative overflow-hidden border-b border-hairline">
          <Bloom className="left-1/2 top-[-8rem] h-[26rem] w-[60rem] -translate-x-1/2" />
          <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-14 pt-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <h1 className="rise-in max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
              {isEl ? "Λύσεις ανά κλάδο" : "Solutions by industry"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {isEl
                ? `Η ζήτηση αναζήτησης διαφέρει ριζικά ανά κλάδο. Έχουμε παραδώσει ${PROJECT_COUNT} έργα, με το μεγαλύτερο βάθος σε τουρισμό και φιλοξενία.`
                : `Search demand differs sharply by sector. We have delivered ${PROJECT_COUNT} projects, with the most depth in tourism and hospitality.`}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp("/get-started")}>
                {isEl ? "Ζητήστε Προσφορά" : "Request a Quote"}
              </PrimaryButtonLink>
              <GhostButtonLink href={lp("/work")}>
                {isEl ? "Δείτε τα Έργα μας" : "View Our Work"}
              </GhostButtonLink>
            </div>
          </div>
        </section>

        <Section>
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Εξειδίκευση" : "Where we are strongest"}
            title={isEl ? "Τουρισμός και φιλοξενία" : "Tourism and hospitality"}
            body={
              isEl
                ? "Εδώ βρίσκεται το μεγαλύτερο μέρος του portfolio μας: εποχικότητα, πολυγλωσσικά sites, απευθείας κρατήσεις και ανταγωνισμός με τα OTAs."
                : "This is where most of our portfolio sits: seasonality, multilingual sites, direct bookings and competing with the OTAs."
            }
            className="mb-12"
          />
          <MeshGrid className="sm:grid-cols-2 lg:grid-cols-3">
            {tourism.map((industry) => (
              <Link
                key={industry.slug}
                href={lp(`/solutions/${industry.slug}`)}
                className="group flex flex-col bg-surface p-7 transition-colors hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                    {industry.displayName}
                  </h2>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {industry.displayDescription}
                </p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                  {industry.displayPainPoints.slice(0, 3).map((p) => (
                    <li key={p} className="flex gap-2.5 text-[13px] text-muted-foreground">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </MeshGrid>
        </Section>

        <Section className="pt-0">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Και ακόμη" : "Also covered"}
            title={isEl ? "Υπόλοιποι κλάδοι" : "Other industries"}
            body={
              isEl
                ? "Η ίδια μεθοδολογία εφαρμόζεται και εδώ: ανάλυση ζήτησης, τεχνικά θεμέλια, περιεχόμενο και μετρήσιμα leads."
                : "The same method applies here: demand analysis, technical foundations, content and measurable leads."
            }
            className="mb-12"
          />
          <MeshGrid className="sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((industry) => (
              <Link
                key={industry.slug}
                href={lp(`/solutions/${industry.slug}`)}
                className="group flex items-start justify-between gap-3 bg-surface p-5 transition-colors hover:bg-surface-raised"
              >
                <span className="text-sm font-medium leading-snug text-foreground">
                  {industry.displayName}
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            ))}
          </MeshGrid>
        </Section>

        <Section className="pt-0">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Υπηρεσίες" : "Services"}
            title={isEl ? "Τι εφαρμόζουμε σε κάθε κλάδο" : "What we apply in every sector"}
            className="mb-10"
          />
          <div className="flex flex-wrap gap-2">
            {services.map((s) => {
              const el = isEl ? getServiceEl(s.slug) : null;
              return (
                <Link
                  key={s.slug}
                  href={lp(`/services/${s.slug}`)}
                  className="rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  {el?.shortName ?? el?.name ?? s.shortName}
                </Link>
              );
            })}
          </div>
        </Section>

        <section className="relative overflow-hidden border-t border-hairline">
          <Bloom className="left-1/2 top-1/4 h-[24rem] w-[56rem] -translate-x-1/2" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-5xl">
              {isEl ? "Ο κλάδος σας δεν είναι στη λίστα;" : "Sector not on the list?"}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {isEl
                ? "Η μεθοδολογία δεν αλλάζει. Πείτε μας τι κάνετε και σε ποια αγορά, και θα δούμε αν υπάρχει πραγματική ζήτηση αναζήτησης να αξιοποιήσουμε."
                : "The method does not change. Tell us what you do and which market, and we will look at whether there is real search demand to work with."}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButtonLink href={lp("/get-started")}>
                {isEl ? "Συζητήστε το Project σας" : "Discuss Your Project"}
              </PrimaryButtonLink>
              <GhostButtonLink href={lp("/pricing")}>
                {isEl ? "Δείτε τις Τιμές" : "View Pricing"}
              </GhostButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
