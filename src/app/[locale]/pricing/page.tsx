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
} from "@/data/pricing";
import { SEO_MIN_TERM_MONTHS } from "@/data/company-facts";
import {
  Section,
  SectionHeading,
  Bloom,
  PrimaryButtonLink,
  GhostButtonLink,
} from "@/components/landing/primitives";
import { PriceCard } from "@/components/pricing/PriceCard";
import { NotForYou } from "@/components/positioning/NotForYou";
import { SeoTimeline } from "@/components/positioning/SeoTimeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  return buildMetadata({
    title: isEl ? "Τιμές SEO & Κατασκευής Ιστοσελίδων" : "SEO & Website Pricing",
    description: isEl
      ? "Διαφανείς τιμές για SEO και κατασκευή ιστοσελίδων, με ΦΠΑ 24%. Στρατηγική προσαρμοσμένη στο project σας, χωρίς εγγυήσεις κατάταξης."
      : "Transparent pricing for SEO and website projects, with VAT shown clearly. Strategy built around your project, with no ranking guarantees.",
    path: localizedPath(locale, "/pricing"),
    hreflangPath: "/pricing",
    primaryKeyword: isEl ? "τιμές SEO" : "SEO pricing",
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

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: isEl ? "Τιμές" : "Pricing", url: "/pricing" }],
    siteLocale,
  );

  const faqs = isEl
    ? [
        {
          question: "Γιατί δεν προσφέρετε SEO με 100 ευρώ τον μήνα;",
          answer:
            "Σε αυτό το επίπεδο δεν υπάρχει χρόνος για έρευνα, τεχνική εργασία, περιεχόμενο και παρακολούθηση. Μια σοβαρή συνεργασία SEO απαιτεί ανάλυση δεδομένων, υλοποίηση και συνεχή προσαρμογή. Προτιμούμε να πούμε ότι δεν ταιριάζουμε, παρά να χρεώσουμε για κάτι που δεν πρόκειται να αποδώσει.",
        },
        {
          question: "Εγγυάστε την πρώτη θέση στη Google;",
          answer:
            "Όχι. Κανένα agency δεν ελέγχει τα συστήματα κατάταξης της Google, οπότε καμία εγγύηση θέσης δεν είναι βάσιμη. Δουλεύουμε πάνω σε ό,τι ελέγχεται: τεχνική κατάσταση, περιεχόμενο, αρχιτεκτονική, authority και μετατροπές.",
        },
        {
          question: "Σε πόσο καιρό θα δω αποτελέσματα;",
          answer:
            "Εξαρτάται από τον ανταγωνισμό, την υπάρχουσα κατάσταση του site, το authority και την ταχύτητα υλοποίησης. Ενδεικτικά: 0 έως 3 μήνες θεμέλια, 3 έως 6 μήνες πιθανή ανάπτυξη, 6 έως 12 και πλέον μήνες σύνθετη απόδοση. Πρόκειται για φάσεις, όχι για εγγυήσεις.",
        },
        {
          question: "Χρειάζεται συμβόλαιο;",
          answer: `Για τα μηνιαία πακέτα SEO ισχύει ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μηνών και στη συνέχεια η συνεργασία συνεχίζεται μηνιαία. Ο λόγος είναι πρακτικός: οι πρώτοι μήνες πηγαίνουν σε θεμέλια που αποδίδουν αργότερα. Τα έργα κατασκευής ιστοσελίδας τιμολογούνται ανά έργο.`,
        },
        {
          question: "Περιλαμβάνεται ο ΦΠΑ στις τιμές;",
          answer:
            "Οι αναγραφόμενες επαγγελματικές τιμές εμφανίζονται προ ΦΠΑ. Προστίθεται ΦΠΑ 24%, όπου εφαρμόζεται. Σε κάθε πακέτο εμφανίζεται και η τελική τιμή με ΦΠΑ.",
        },
        {
          question: "Είναι ίδια η στρατηγική σε κάθε πακέτο;",
          answer:
            "Όχι. Τα πακέτα ορίζουν το αρχικό scope, όχι τη στρατηγική. Κάθε project ξεκινά με ανάλυση επιχείρησης, αγοράς, ανταγωνισμού και δεδομένων, και το πλάνο προσαρμόζεται στο μοντέλο, τον κλάδο και τους στόχους σας.",
        },
      ]
    : [
        {
          question: "Why do you not offer SEO for 100 euro a month?",
          answer:
            "At that level there is no time for research, technical work, content and monitoring. Serious SEO requires data analysis, implementation and continuous adjustment. We would rather tell you we are not a fit than charge for something that will not work.",
        },
        {
          question: "Do you guarantee first position on Google?",
          answer:
            "No. No agency controls Google's ranking systems, so no position guarantee is legitimate. We work on what can actually be influenced: technical condition, content, architecture, authority and conversion.",
        },
        {
          question: "How long until I see results?",
          answer:
            "It depends on competition, the current state of the site, authority and how quickly recommendations get implemented. Indicatively: 0 to 3 months foundations, 3 to 6 months potential growth, 6 to 12 and more months compounding. These are phases, not guarantees.",
        },
        {
          question: "Is a contract required?",
          answer: `Monthly SEO engagements carry a ${SEO_MIN_TERM_MONTHS} month minimum term, then continue month to month. The reason is practical: the first months go into foundations that pay off later. Website projects are quoted per project.`,
        },
        {
          question: "Is VAT included in the prices?",
          answer:
            "Listed professional prices are shown excluding VAT. Greek VAT of 24% is added where applicable. Every package also displays the final price including VAT.",
        },
        {
          question: "Is the strategy the same in every package?",
          answer:
            "No. Packages define the initial scope, not the strategy. Every project starts with analysis of your business, market, competitors and data, and the plan adapts to your model, sector and goals.",
        },
      ];

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
              {isEl ? "Τιμές SEO και κατασκευής ιστοσελίδων" : "SEO and website pricing"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {isEl
                ? "Οι τιμές μας δεν βασίζονται στο πόσο φθηνά μπορούμε να παραδώσουμε μια λίστα εργασιών. Βασίζονται στον χρόνο, την τεχνική εργασία, την έρευνα, το περιεχόμενο και τη στρατηγική που απαιτείται για πραγματική οργανική ανάπτυξη."
                : "Our pricing is not based on how cheaply we can deliver a task list. It reflects the time, technical work, research, content and strategy required to produce real organic growth."}
            </p>
            <p className="mt-5 max-w-2xl text-sm font-medium text-foreground">
              {isEl
                ? "Τα πακέτα ορίζουν το αρχικό scope. Η στρατηγική προσαρμόζεται στο project."
                : "Packages define the initial scope. The strategy adapts to the project."}
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
            title={isEl ? "Συχνές ερωτήσεις για τις τιμές" : "Pricing questions"}
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
              {isEl ? "Συζητήστε το project σας" : "Discuss your project"}
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
