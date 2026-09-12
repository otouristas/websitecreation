import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import RelatedPages from "@/components/seo/RelatedPages";
import { buildMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOfferCatalogSchema,
  combineSchemas,
  BASE_URL,
} from "@/lib/seo/schema";
import { generateBreadcrumbs, getPricingRelatedPaths } from "@/lib/linking";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import {
  websitePackages,
  seoPackages,
  addOns,
  formatPrice,
  currentPrice,
  isOfferActive,
  resolvePriceTokens,
} from "@/data/pricing";
import { SEO_MIN_TERM_MONTHS } from "@/data/company-facts";
import { getPricingPageCopy } from "@/data/pricing-page-copy";
import {
  Section,
  SectionHeading,
  Bloom,
  PrimaryButtonLink,
  GhostButtonLink,
} from "@/components/landing/primitives";
import { PriceCard } from "@/components/pricing/PriceCard";
import { PricingCostGuide } from "@/components/pricing/PricingCostGuide";
import { SeoPackageCompare } from "@/components/pricing/SeoPackageCompare";
import { NotForYou } from "@/components/positioning/NotForYou";
import { SeoTimeline } from "@/components/positioning/SeoTimeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = getPricingPageCopy(locale);

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: localizedPath(locale, "/pricing"),
    hreflangPath: "/pricing",
    primaryKeyword: copy.primaryKeyword,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);
  const offerLive = isOfferActive();
  const raw = getPricingPageCopy(siteLocale);
  const rp = (text: string) => resolvePriceTokens(text, siteLocale);

  const copy = {
    ...raw,
    heroLead: rp(raw.heroLead),
    cost: {
      ...raw.cost,
      answer: rp(raw.cost.answer),
      websiteBand: rp(raw.cost.websiteBand),
    },
    faqs: raw.faqs.map((f) => ({
      question: f.question,
      answer: rp(f.answer),
    })),
  };

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: isEl ? "Τιμές" : "Pricing", url: "/pricing" }],
    siteLocale,
  );

  const faqs = copy.faqs;

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateOfferCatalogSchema({
      name: isEl
        ? "Υπηρεσίες SEO και κατασκευής ιστοσελίδων"
        : "SEO and website services",
      url: `${BASE_URL}${lp("/pricing")}`,
      locale: siteLocale,
      tiers: [...websitePackages, ...seoPackages],
      priceOf: (t) => currentPrice(t as never),
    }),
    generateFAQSchema({ faqs }),
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
              {copy.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.heroLead}
            </p>
            <p className="mt-5 max-w-2xl text-sm font-medium text-foreground">
              {copy.heroNote}
            </p>

            {offerLive ? (
              <p className="mt-8 inline-flex max-w-2xl flex-wrap items-center gap-2 rounded-[8px] border border-brand/35 bg-brand/10 px-4 py-2.5 text-[13px] leading-relaxed text-brand">
                {isEl
                  ? "Summer Offer: 20% χαμηλότερη τιμή για νέα projects που θα επιβεβαιωθούν έως 31 Αυγούστου 2026."
                  : "Summer Offer: 20% lower pricing for new projects confirmed by 31 August 2026."}
              </p>
            ) : null}
          </div>
        </section>

        <PricingCostGuide locale={siteLocale} copy={copy} />

        <Section id="websites">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Κατασκευή" : "Websites"}
            title={isEl ? "Πακέτα κατασκευής ιστοσελίδας" : "Website packages"}
            body={
              isEl
                ? "Οι χρόνοι παράδοσης ξεκινούν μετά την έγκριση του scope, την παράδοση προσβάσεων και υλικού και την ολοκλήρωση της εμπορικής συμφωνίας. Η πολυπλοκότητα, οι ενσωματώσεις και ο χρόνος ανατροφοδότησης επηρεάζουν την παράδοση."
                : "Delivery windows begin after scope approval, access handover, receipt of required material and completion of the commercial agreement. Complexity, integrations and feedback cycles affect delivery."
            }
            className="mb-12"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {websitePackages.map((tier) => (
              <PriceCard key={tier.id} tier={tier} locale={siteLocale} />
            ))}
          </div>
        </Section>

        <Section id="seo" className="pt-0">
          <SectionHeading
            align="left"
            eyebrow="SEO"
            title={isEl ? "Μηνιαία πακέτα SEO" : "Monthly SEO engagements"}
            body={
              isEl
                ? `Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μηνών, στη συνέχεια μηνιαία ανανέωση. Δεν πουλάμε SEO με βάση τον αριθμό λέξεων-κλειδιών, αλλά με βάση την κάλυψη της πραγματικής ζήτησης αναζήτησης και την ποιότητα των leads.`
                : `A ${SEO_MIN_TERM_MONTHS} month minimum term, then rolling monthly. We do not sell SEO by keyword count, but by coverage of real search demand and the quality of the leads it produces.`
            }
            className="mb-12"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {seoPackages.map((tier) => (
              <PriceCard key={tier.id} tier={tier} locale={siteLocale} recurring />
            ))}
          </div>
        </Section>

        <SeoPackageCompare
          locale={siteLocale}
          title={copy.compare.title}
          eyebrow={copy.compare.eyebrow}
          intro={copy.compare.intro}
          rows={copy.compare.rows}
          footnote={copy.compare.footnote}
        />

        <Section id="add-ons" className="pt-0">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Πρόσθετα" : "Add-ons"}
            title={isEl ? "Πρόσθετες υπηρεσίες" : "Additional services"}
            body={
              isEl
                ? "Τιμές εκκίνησης. Το τελικό κόστος εξαρτάται από το εύρος της εργασίας."
                : "Starting prices. Final cost depends on the scope of the work."
            }
            className="mb-12"
          />
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <div key={a.id} className="bg-surface p-6">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {isEl ? a.nameEl : a.nameEn}
                </p>
                <p className="mt-3 font-display text-xl font-medium tabular-nums tracking-[-0.03em] text-foreground">
                  {isEl ? "από " : "from "}€{formatPrice(a.from, siteLocale)}
                  {a.recurring ? (isEl ? "/μήνα" : "/mo") : ""}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {isEl ? "+ ΦΠΑ 24%" : "+ 24% VAT"}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {isEl
              ? "Τυχόν κόστη τρίτων για δημοσιεύσεις ή τοποθετήσεις σε εξωτερικά μέσα τιμολογούνται ξεχωριστά και συμφωνούνται εκ των προτέρων."
              : "Any third-party publisher or placement costs are quoted separately and agreed in advance."}
          </p>
        </Section>

        <NotForYou locale={siteLocale} />

        <SeoTimeline locale={siteLocale} />

        <Section id="faq" className="pt-0">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={copy.faqTitle}
            className="mb-10"
          />
          <FAQSection faqs={faqs} title="" locale={siteLocale} />
        </Section>

        <Section className="pt-0">
          <RelatedPages
            title={isEl ? "Σχετικές σελίδες" : "Related pages"}
            pages={getPricingRelatedPaths(siteLocale).map((p) => ({
              slug: lp(p.path),
              title: isEl ? p.titleEl : p.titleEn,
            }))}
          />
        </Section>

        <section className="relative overflow-hidden border-t border-hairline">
          <Bloom className="left-1/2 top-1/4 h-[24rem] w-[56rem] -translate-x-1/2" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-5xl">
              {isEl ? "Συζητήστε το έργο σας" : "Discuss your project"}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {isEl
                ? "Πείτε μας τι θέλετε να πετύχετε και σε τι κατάσταση είναι σήμερα το site σας. Θα σας πούμε ειλικρινά τι χρειάζεται και αν ταιριάζουμε."
                : "Tell us what you want to achieve and where your site stands today. We will tell you honestly what it needs and whether we are the right fit."}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButtonLink href={lp("/get-started")}>
                {isEl ? "Ζητήστε Προσφορά" : "Request a Quote"}
              </PrimaryButtonLink>
              <GhostButtonLink href={lp("/seo-services")}>
                {isEl ? "Υπηρεσίες SEO" : "SEO services"}
              </GhostButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
