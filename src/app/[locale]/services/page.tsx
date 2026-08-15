import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
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
import { NotForYou } from "@/components/positioning/NotForYou";
import { ENTRY_SEO_NET, formatPrice } from "@/data/pricing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  return buildMetadata({
    title: isEl ? "Υπηρεσίες SEO & Κατασκευής Ιστοσελίδων" : "SEO & Web Design Services",
    description: isEl
      ? "Τεχνικό SEO, τοπικό SEO, GEO και AEO, κατασκευή ιστοσελίδων και e-shop. Στρατηγική βασισμένη στα δεδομένα σας, όχι έτοιμα πακέτα."
      : "Technical SEO, local SEO, GEO and AEO, website and e-shop builds. Strategy built on your own data rather than a prepackaged checklist.",
    path: localizedPath(locale, "/services"),
    hreflangPath: "/services",
    primaryKeyword: isEl ? "υπηρεσίες SEO" : "SEO services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: isEl ? "Υπηρεσίες" : "Services", url: "/services" }],
    siteLocale,
  );

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateCollectionPageSchema({
      name: isEl ? "Υπηρεσίες SEO και κατασκευής ιστοσελίδων" : "SEO and web design services",
      description: isEl
        ? "Όλες οι υπηρεσίες SEO, GEO, AEO και κατασκευής ιστοσελίδων."
        : "Every SEO, GEO, AEO and website service we deliver.",
      url: `${BASE_URL}${lp("/services")}`,
      inLanguage: siteLocale,
      items: services.map((s) => {
        const el = isEl ? getServiceEl(s.slug) : null;
        return {
          url: `${BASE_URL}${lp(`/services/${s.slug}`)}`,
          name: el?.name ?? s.name,
        };
      }),
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
              {isEl ? "Υπηρεσίες SEO και κατασκευής ιστοσελίδων" : "SEO and web design services"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {isEl
                ? "Κάθε συνεργασία ξεκινά με ανάλυση της επιχείρησης, της αγοράς και του ανταγωνισμού σας. Τα πακέτα ορίζουν το αρχικό scope, η στρατηγική προσαρμόζεται στο δικό σας project."
                : "Every engagement starts with analysis of your business, market and competition. Packages define the initial scope; the strategy adapts to your project."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp("/get-started")}>
                {isEl ? "Ζητήστε Προσφορά" : "Request a Quote"}
              </PrimaryButtonLink>
              <GhostButtonLink href={lp("/pricing")}>
                {isEl ? "Δείτε τις Τιμές" : "View Pricing"}
              </GhostButtonLink>
            </div>
          </div>
        </section>

        <Section>
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Τι αναλαμβάνουμε" : "What we deliver"}
            title={isEl ? "Όλες οι υπηρεσίες" : "Every service"}
            body={
              isEl
                ? `Μηνιαία συνεργασία SEO από €${formatPrice(ENTRY_SEO_NET, siteLocale)} + ΦΠΑ 24%. Έργα κατασκευής τιμολογούνται ανά project.`
                : `Monthly SEO engagements from €${formatPrice(ENTRY_SEO_NET, siteLocale)} + 24% VAT. Website projects are quoted per project.`
            }
            className="mb-12"
          />

          <MeshGrid className="sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const el = isEl ? getServiceEl(service.slug) : null;
              const name = el?.name ?? service.name;
              const description = el?.description ?? service.description;
              const features = (el?.features ?? service.features).slice(0, 3);

              return (
                <Link
                  key={service.slug}
                  href={lp(`/services/${service.slug}`)}
                  className="group flex flex-col bg-surface p-7 transition-colors hover:bg-surface-raised"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                      {name}
                    </h2>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[13px] text-muted-foreground">
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </MeshGrid>
        </Section>

        <NotForYou locale={siteLocale} />

        <section className="relative overflow-hidden border-t border-hairline">
          <Bloom className="left-1/2 top-1/4 h-[24rem] w-[56rem] -translate-x-1/2" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-5xl">
              {isEl ? "Δεν είστε σίγουροι τι χρειάζεστε;" : "Not sure what you need?"}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {isEl
                ? "Πείτε μας τι θέλετε να πετύχετε. Θα κοιτάξουμε το site και την αγορά σας και θα σας πούμε τι έχει νόημα να γίνει πρώτο."
                : "Tell us what you want to achieve. We will look at your site and your market and tell you what is worth doing first."}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButtonLink href={lp("/get-started")}>
                {isEl ? "Συζητήστε το Project σας" : "Discuss Your Project"}
              </PrimaryButtonLink>
              <GhostButtonLink href={lp("/work")}>
                {isEl ? "Δείτε τα Έργα μας" : "View Our Work"}
              </GhostButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
