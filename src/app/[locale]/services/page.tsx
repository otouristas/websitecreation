import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
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
import { LocalPackPreview, MarketingBadge, ReportPreview, agencyTrust, type MarketingBadgeKind } from "@/components/kit";
import { DiyRow, SpeedPreview, getServiceKit } from "@/components/service-kit";
import { NotForYou } from "@/components/positioning/NotForYou";
import { entrySeoDisplay, currentPriceVatLabel, seoPackages, formatPrice, resolvePriceTokens } from "@/data/pricing";
import { homeCopy } from "@/components/pages/home/copy";
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveChoice,
  WaveClose,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import { RiskBuckets, ServiceHeroActions, accentEnd, type RiskTier } from "@/components/pages/services-wave/ui";

type PageProps = { params: Promise<{ locale: string }> };

const SERVICE_BUCKETS: readonly { readonly id: string; readonly label: Record<SiteLocale, string>; readonly slugs: readonly string[] }[] = [
  {
    id: "websites",
    label: { en: "Websites", el: "Ιστότοποι" },
    slugs: ["website-creation", "website-redesign", "web-design", "eshop-woocommerce", "logo-design"],
  },
  {
    id: "search",
    label: { en: "Search", el: "Αναζήτηση" },
    slugs: ["seo-audits", "local-seo", "link-building", "content-creation", "eshop-seo"],
  },
  {
    id: "speed",
    label: { en: "Speed and AI", el: "Ταχύτητα και AI" },
    slugs: ["speed-optimization", "ai-visibility"],
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  // This page is a directory of twelve services. It used to declare
  // `primaryKeyword: "υπηρεσίες SEO"`, competing with /seo-services (the
  // commercial pillar) and /services/seo-audits for one term that all three
  // wanted. The listing keeps the listing intent; the pillar keeps the term.
  return buildMetadata({
    title: isEl
      ? "Υπηρεσίες SEO & Κατασκευής Ιστοσελίδων | AnotherSEOGuru"
      : "SEO, Web Design & E-shop Services in Greece | AnotherSEOGuru",
    description: isEl
      ? "Όλες οι υπηρεσίες σε μία σελίδα: κατασκευή ιστοσελίδων και eshop, τεχνικό SEO, τοπικό SEO, GEO και AEO, περιεχόμενο και ανασχεδιασμός. Ζητήστε προσφορά."
      : "Every service in one place: website and e-shop builds, technical SEO, local SEO, GEO and AEO, content and redesigns for businesses in Greece. Get a quote.",
    path: localizedPath(locale, "/services"),
    hreflangPath: "/services",
    primaryKeyword: isEl ? "υπηρεσίες κατασκευής ιστοσελίδων" : "web design and SEO services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);
  const tx = (en: string, el: string) => (isEl ? el : en);

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
          itemType: "Service",
        };
      }),
    }),
  );

  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const tiers: readonly RiskTier[] = SERVICE_BUCKETS.map((bucket) => ({
    id: bucket.id,
    label: bucket.label[siteLocale],
    items: bucket.slugs.flatMap((slug) => {
      const service = bySlug.get(slug);
      if (!service) return [];
      const el = isEl ? getServiceEl(service.slug) : null;
      const kit = getServiceKit(service.slug);
      const Icon = kit.icon;
      const badge = SERVICE_BADGES[service.slug];
      return [
        {
          key: service.slug,
          title: el?.name ?? service.name,
          body: resolvePriceTokens(el?.description ?? service.description, siteLocale),
          href: lp(`/services/${service.slug}`),
          icon: <Icon className="size-5" aria-hidden />,
          badge: badge ? <MarketingBadge kind={badge.kind}>{badge.label[siteLocale]}</MarketingBadge> : undefined,
          points: (el?.features ?? service.features).slice(0, 3),
        },
      ];
    }),
  }));

  const h1 = isEl ? "Υπηρεσίες SEO και κατασκευής ιστοσελίδων" : "SEO and web design services";

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.6rem] lg:text-[3.15rem]"
          pill={
            <div className="flex min-w-0 flex-col items-start gap-4">
              <Breadcrumbs items={breadcrumbItems} className="min-w-0 max-w-full" />
              <AnnouncePill
                href={lp("/services/ai-visibility")}
                tag="AI"
                text={tx("See how your business appears in AI answers", "Δείτε πώς εμφανίζεται η επιχείρησή σας στις απαντήσεις AI")}
                wrap
              />
            </div>
          }
          title={accentEnd(h1, isEl ? 2 : 3)}
          lead={
            isEl
              ? "Χρειάζεστε νέα ιστοσελίδα ή θέλετε περισσότερα αιτήματα από αυτή που έχετε; Δείτε τι αναλαμβάνουμε σε κάθε περίπτωση και πόσο κοστίζει. Αν δεν ξέρετε από πού να αρχίσετε, μπορούμε να ελέγξουμε πρώτα την ιστοσελίδα σας."
              : "Do you need a new site, or more enquiries from the one you have? See what each service covers and how it is priced. If the problem is unclear, ask us to check your site first."
          }
          actions={
            <ServiceHeroActions
              locale={siteLocale}
              primaryHref={lp("/get-started")}
              primaryLabel={isEl ? "Ζητήστε προσφορά" : "Request a Quote"}
              links={[
                { href: lp("/ypiresies/times"), label: isEl ? "Δείτε τις τιμές" : "View Pricing" },
                { href: lp("/work"), label: isEl ? "Δείτε τα έργα μας" : "View Our Work" },
              ]}
            />
          }
          trust={<TrustMarks items={agencyTrust(siteLocale).map((item) => item.label)} yesLabel={homeCopy(siteLocale).markYes} />}
          panel={
            <AppPanel
              url="app.anotherseoguru.com/reports"
              badge={tx("Sample data", "Δείγμα δεδομένων")}
              caption={tx(
                "Sample work on a hotel website: a monthly SEO report and its Google Maps results.",
                "Δείγμα δουλειάς σε ιστοσελίδα ξενοδοχείου: μηνιαία αναφορά SEO και τα αποτελέσματα στους Χάρτες Google.",
              )}
            >
              <div className="grid min-w-0 gap-3 md:grid-cols-2">
                <ReportPreview locale={siteLocale} />
                <div className="grid min-w-0 grid-cols-1 content-start gap-3">
                  <LocalPackPreview locale={siteLocale} city={isEl ? "Πάρος" : "Paros"} />
                  <div className="hidden md:block">
                    <SpeedPreview locale={siteLocale} />
                  </div>
                </div>
              </div>
            </AppPanel>
          }
        />

        <WaveSection id="services" shot="risks">
          <WaveHeading
            eyebrow={tx("What we deliver", "Τι αναλαμβάνουμε")}
            title={accentEnd(tx("Every service", "Όλες οι υπηρεσίες"), isEl ? 1 : 1)}
            lead={
              isEl
                ? `Μηνιαία συνεργασία SEO από €${formatPrice(entrySeoDisplay(), siteLocale)} ${currentPriceVatLabel(seoPackages[0], siteLocale)}. Για την κατασκευή ιστοσελίδας δίνουμε ξεχωριστή προσφορά.`
                : `Monthly SEO engagements from €${formatPrice(entrySeoDisplay(), siteLocale)} ${currentPriceVatLabel(seoPackages[0], siteLocale)}. Website builds have a separate, one-off quote.`
            }
          />
          <RiskBuckets tiers={tiers} />
          <p className="mt-10 max-w-3xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {isEl ? (
              <>
                Αν θέλετε η ομάδα να αναλάβει τη δουλειά μέσα στο AnotherSEOGuru App, δείτε τη{" "}
                <Link href="/el/diacheirisi-seo" className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:text-primary">
                  διαχείριση SEO
                </Link>
                .
              </>
            ) : (
              <>
                If you want the team to do the work inside AnotherSEOGuru App, see{" "}
                <Link href="/el/diacheirisi-seo" className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:text-primary">
                  managed SEO
                </Link>
                .
              </>
            )}
          </p>
        </WaveSection>

        <WaveSteps
          id="process"
          eyebrow={tx("Scope", "Πορεία")}
          title={accentEnd(tx("How we prepare your quote", "Πώς ετοιμάζουμε την προσφορά σας"), isEl ? 2 : 1)}
          steps={
            isEl
              ? [
                  {
                    n: "01",
                    title: "Ανάλυση",
                    body: "Ξεκινάμε από την υπηρεσία που θέλετε να προωθήσετε και τις σελίδες που βρίσκουν σήμερα οι πελάτες σας.",
                  },
                  {
                    n: "02",
                    title: "Εργασίες και κόστος",
                    body: "Συμφωνούμε τι χρειάζεται να γίνει, τι περιλαμβάνει η τιμή και τι μπορείτε να κρατήσετε για αργότερα.",
                  },
                  {
                    n: "03",
                    title: "Στρατηγική",
                    body: "Ορίζουμε ποια αλλαγή έχει προτεραιότητα και πώς θα παρακολουθούμε τα αποτελέσματά της.",
                  },
                ]
              : [
                  {
                    n: "01",
                    title: "Analysis",
                    body: "We start with the service you want to sell and the pages your customers find today.",
                  },
                  {
                    n: "02",
                    title: "Work and cost",
                    body: "We agree what needs doing, what is included in the price and what can wait.",
                  },
                  {
                    n: "03",
                    title: "Strategy",
                    body: "We choose the first change and agree how we will follow its effect.",
                  },
                ]
          }
        />

        <WaveChoice locale={siteLocale} source="services-index-choice" />

        <div data-shot="fit">
          <NotForYou locale={siteLocale} />
        </div>

        <div data-shot="diy">
          <DiyRow locale={siteLocale} source="services-index" />
        </div>

        <WaveStats locale={siteLocale} />

        <WaveClose
          locale={siteLocale}
          source="services-index"
          title={accentEnd(tx("Not sure what you need?", "Δεν είστε σίγουροι τι χρειάζεστε;"), isEl ? 2 : 3)}
          lead={tx(
            "Tell us what you want to achieve. We will look at your site and your market and tell you what is worth doing first.",
            "Πείτε μας τι θέλετε να πετύχετε. Θα κοιτάξουμε το site και την αγορά σας και θα σας πούμε τι έχει νόημα να γίνει πρώτα.",
          )}
        />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}

const SERVICE_BADGES: Partial<Record<string, { kind: MarketingBadgeKind; label: Record<SiteLocale, string> }>> = {
  "website-creation": { kind: "popular", label: { en: "Popular", el: "Δημοφιλές" } },
  "ai-visibility": { kind: "ai", label: { en: "AI", el: "AI" } },
  "local-seo": { kind: "popular", label: { en: "Popular", el: "Δημοφιλές" } },
};
