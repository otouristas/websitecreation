import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Globe, Plus, TrendingUp } from "lucide-react";
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
import { Accent, Container, CtaBand, KitHeading, KitSection } from "@/components/kit";
import {
  AuditFirstStrip,
  ChipLinks,
  DiyStrip,
  KitFaq,
  PageHero,
  RelatedLinks,
  accentTail,
} from "@/components/page-kit";
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

  const tx = (en: string, el: string) => (isEl ? el : en);
  const jump = [
    { href: "#websites", label: tx("Websites", "Ιστοσελίδες") },
    { href: "#seo", label: "SEO" },
    { href: "#add-ons", label: tx("Add-ons", "Πρόσθετα") },
    { href: "#software", label: tx("GSC Boost software", "Λογισμικό GSC Boost") },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={
            offerLive
              ? { href: "#websites", kind: "save", tag: "-20%", text: tx("Summer Offer on new projects", "Summer Offer σε νέα έργα") }
              : {
                  href: lp("/get-started#free-audit"),
                  kind: "free",
                  tag: tx("Free", "Δωρεάν"),
                  text: tx("Every engagement starts with an SEO audit", "Κάθε συνεργασία ξεκινά με έλεγχο SEO"),
                }
          }
          title={accentTail(copy.h1, isEl ? 2 : 1)}
          lead={copy.heroLead}
          meta={
            <div className="flex flex-col items-center gap-3">
              <p className="max-w-2xl text-[14px] font-medium text-foreground">{copy.heroNote}</p>
              {offerLive ? (
                <p className="inline-flex max-w-2xl flex-wrap items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-2.5 text-[13px] leading-relaxed text-warning">
                  {isEl
                    ? "Summer Offer: 20% χαμηλότερη τιμή για νέα projects που θα επιβεβαιωθούν έως 31 Αυγούστου 2026."
                    : "Summer Offer: 20% lower pricing for new projects confirmed by 31 August 2026."}
                </p>
              ) : null}
            </div>
          }
        >
          <Container className="mt-10">
            <ChipLinks align="center" items={jump} />
          </Container>
        </PageHero>

        <PricingCostGuide locale={siteLocale} copy={copy} />

        <Container>
          <AuditFirstStrip locale={siteLocale} />
        </Container>

        <KitSection id="websites">
          <KitHeading
            eyebrow={isEl ? "Κατασκευή" : "Websites"}
            eyebrowIcon={<Globe />}
            title={accentTail(isEl ? "Πακέτα κατασκευής ιστοσελίδας" : "Website packages")}
            description={
              isEl
                ? "Οι χρόνοι παράδοσης ξεκινούν μετά την έγκριση του scope, την παράδοση προσβάσεων και υλικού και την ολοκλήρωση της εμπορικής συμφωνίας. Η πολυπλοκότητα, οι ενσωματώσεις και ο χρόνος ανατροφοδότησης επηρεάζουν την παράδοση."
                : "Delivery windows begin after scope approval, access handover, receipt of required material and completion of the commercial agreement. Complexity, integrations and feedback cycles affect delivery."
            }
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {websitePackages.map((tier) => (
              <PriceCard key={tier.id} tier={tier} locale={siteLocale} />
            ))}
          </div>
        </KitSection>

        <KitSection id="seo" tinted>
          <KitHeading
            eyebrow="SEO"
            eyebrowIcon={<TrendingUp />}
            title={accentTail(isEl ? "Μηνιαία πακέτα SEO" : "Monthly SEO engagements")}
            description={
              isEl
                ? `Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μηνών, στη συνέχεια μηνιαία ανανέωση. Δεν πουλάμε SEO με βάση τον αριθμό λέξεων-κλειδιών, αλλά με βάση την κάλυψη της πραγματικής ζήτησης αναζήτησης και την ποιότητα των leads.`
                : `A ${SEO_MIN_TERM_MONTHS} month minimum term, then rolling monthly. We do not sell SEO by keyword count, but by coverage of real search demand and the quality of the leads it produces.`
            }
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {seoPackages.map((tier) => (
              <PriceCard key={tier.id} tier={tier} locale={siteLocale} recurring />
            ))}
          </div>
        </KitSection>

        <SeoPackageCompare
          locale={siteLocale}
          title={copy.compare.title}
          eyebrow={copy.compare.eyebrow}
          intro={copy.compare.intro}
          rows={copy.compare.rows}
          footnote={copy.compare.footnote}
        />

        <KitSection id="add-ons">
          <KitHeading
            eyebrow={isEl ? "Πρόσθετα" : "Add-ons"}
            eyebrowIcon={<Plus />}
            title={accentTail(isEl ? "Πρόσθετες υπηρεσίες" : "Additional services")}
            description={
              isEl
                ? "Τιμές εκκίνησης. Το τελικό κόστος εξαρτάται από το εύρος της εργασίας."
                : "Starting prices. Final cost depends on the scope of the work."
            }
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <div key={a.id} className="reveal rounded-2xl border border-hairline bg-surface/60 p-5">
                <p className="text-[14.5px] font-medium leading-snug text-foreground">{isEl ? a.nameEl : a.nameEn}</p>
                <p className="mt-3 font-display text-[22px] font-semibold tabular-nums tracking-[-0.03em] text-foreground">
                  {isEl ? "από " : "from "}€{formatPrice(a.from, siteLocale)}
                  {a.recurring ? (isEl ? "/μήνα" : "/mo") : ""}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{isEl ? "+ ΦΠΑ 24%" : "+ 24% VAT"}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
            {isEl
              ? "Τυχόν κόστη τρίτων για δημοσιεύσεις ή τοποθετήσεις σε εξωτερικά μέσα τιμολογούνται ξεχωριστά και συμφωνούνται εκ των προτέρων."
              : "Any third-party publisher or placement costs are quoted separately and agreed in advance."}
          </p>
        </KitSection>

        <KitSection id="software" tinted>
          <KitHeading
            align="center"
            eyebrow={tx("Software plans", "Πακέτα λογισμικού")}
            title={
              <>
                {tx("The do-it-yourself", "Η επιλογή")} <Accent>{tx("option", "«μόνοι σας»")}</Accent>
              </>
            }
            description={tx(
              "If you have someone in-house to do the work, GSC Boost gives them the same ranked fix list our team works from, on a monthly software plan.",
              "Αν έχετε άνθρωπο στην ομάδα σας να κάνει τη δουλειά, το GSC Boost του δίνει την ίδια λίστα διορθώσεων με την οποία δουλεύει η ομάδα μας, με μηνιαίο πακέτο λογισμικού.",
            )}
          />
          <DiyStrip locale={siteLocale} source="pricing-diy" className="mt-12" />
        </KitSection>

        <NotForYou locale={siteLocale} />

        <SeoTimeline locale={siteLocale} />

        <KitFaq title={copy.faqTitle} items={faqs} />

        <section className="border-t border-hairline py-16">
          <Container>
            <RelatedLinks
              title={isEl ? "Σχετικές σελίδες" : "Related pages"}
              items={getPricingRelatedPaths(siteLocale).map((p) => ({
                href: lp(p.path),
                title: isEl ? p.titleEl : p.titleEn,
              }))}
            />
          </Container>
        </section>

        <CtaBand
          locale={siteLocale}
          source="pricing-band"
          title={accentTail(isEl ? "Συζητήστε το έργο σας" : "Discuss your project", 2)}
          description={
            isEl
              ? "Πείτε μας τι θέλετε να πετύχετε και σε τι κατάσταση είναι σήμερα το site σας. Θα σας πούμε ειλικρινά τι χρειάζεται και αν ταιριάζουμε."
              : "Tell us what you want to achieve and where your site stands today. We will tell you honestly what it needs and whether we are the right fit."
          }
        />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
