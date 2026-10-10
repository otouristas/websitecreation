import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { CheckList, CtaBand, KitHeading, KitSection, LocalPackPreview, MarketingBadge, ReportPreview, type MarketingBadgeKind } from "@/components/kit";
import { AccentTitle, DiyRow, ServiceHero, SpeedPreview, getServiceKit } from "@/components/service-kit";
import { NotForYou } from "@/components/positioning/NotForYou";
import { entrySeoNet, formatPrice, resolvePriceTokens } from "@/data/pricing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  // This page is a directory of twelve services. It used to declare
  // `primaryKeyword: "υπηρεσίες SEO"`, competing with /seo-services (the
  // commercial pillar) and /services/seo-audits for one term that all three
  // wanted. The listing keeps the listing intent; the pillar keeps the term.
  return buildMetadata({
    title: isEl ? "Όλες οι Υπηρεσίες SEO & Κατασκευής Ιστοσελίδων" : "All SEO & Web Design Services",
    description: isEl
      ? "Όλες οι υπηρεσίες μας σε μία σελίδα: κατασκευή ιστοσελίδων και e-shop, τεχνικό SEO, τοπικό SEO, GEO και AEO, περιεχόμενο και ανασχεδιασμός."
      : "Every service in one place: website and e-shop builds, technical SEO, local SEO, GEO and AEO, content, and redesigns.",
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
          itemType: 'Service',
        };
      }),
    }),
  );

  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            kind: 'ai',
            tag: 'AI',
            text: tx('Get recommended by ChatGPT, Gemini and Google AI', 'Να σας προτείνουν ChatGPT, Gemini και Google AI'),
            href: lp('/services/ai-visibility'),
          }}
          h1={isEl ? 'Υπηρεσίες SEO και κατασκευής ιστοσελίδων' : 'SEO and web design services'}
          lead={
            isEl
              ? 'Κάθε συνεργασία ξεκινά με ανάλυση της επιχείρησης, της αγοράς και του ανταγωνισμού σας. Τα πακέτα ορίζουν το αρχικό scope, η στρατηγική προσαρμόζεται στο δικό σας project.'
              : 'Every engagement starts with analysis of your business, market and competition. Packages define the initial scope; the strategy adapts to your project.'
          }
          primaryHref={lp('/get-started')}
          primaryLabel={isEl ? 'Ζητήστε Προσφορά' : 'Request a Quote'}
          links={[
            { href: lp('/pricing'), label: isEl ? 'Δείτε τις Τιμές' : 'View Pricing' },
            { href: lp('/work'), label: isEl ? 'Δείτε τα Έργα μας' : 'View Our Work' },
          ]}
          wideVisual
          visual={
            <div className="grid gap-3 md:grid-cols-2">
              <ReportPreview locale={siteLocale} />
              <div className="grid content-start gap-3">
                <LocalPackPreview locale={siteLocale} city={isEl ? 'Πάρος' : 'Paros'} />
                <div className="hidden md:block">
                  <SpeedPreview locale={siteLocale} />
                </div>
              </div>
            </div>
          }
          visualLabel={tx(
            'Sample work on a hotel website: a monthly SEO report and its Google Maps results.',
            'Δείγμα δουλειάς σε ιστοσελίδα ξενοδοχείου: μηνιαία αναφορά SEO και τα αποτελέσματα στους Χάρτες Google.',
          )}
        />

        <KitSection className="mt-6 sm:mt-10">
          <KitHeading
            eyebrow={isEl ? 'Τι αναλαμβάνουμε' : 'What we deliver'}
            title={<AccentTitle text={isEl ? 'Όλες οι υπηρεσίες' : 'Every service'} />}
            description={
              isEl
                ? `Μηνιαία συνεργασία SEO από €${formatPrice(entrySeoNet(), siteLocale)} + ΦΠΑ 24%. Έργα κατασκευής τιμολογούνται ανά project.`
                : `Monthly SEO engagements from €${formatPrice(entrySeoNet(), siteLocale)} + 24% VAT. Website projects are quoted per project.`
            }
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const el = isEl ? getServiceEl(service.slug) : null;
              const name = el?.name ?? service.name;
              const description = resolvePriceTokens(el?.description ?? service.description, siteLocale);
              const features = (el?.features ?? service.features).slice(0, 3);
              const kit = getServiceKit(service.slug);
              const Icon = kit.icon;
              const badge = SERVICE_BADGES[service.slug];

              return (
                <Link
                  key={service.slug}
                  href={lp(`/services/${service.slug}`)}
                  className="reveal group flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface"
                  style={{ ['--rv' as string]: `${(i % 3) * 5}%` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-background text-brand">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="flex items-center gap-2">
                      {badge ? <MarketingBadge kind={badge.kind}>{badge.label[siteLocale]}</MarketingBadge> : null}
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                    </span>
                  </div>
                  <h2 className="mt-5 text-[18px] font-semibold tracking-[-0.015em] text-foreground">{name}</h2>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{description}</p>
                  <CheckList items={features} size="sm" className="mt-5 border-t border-hairline pt-4" />
                </Link>
              );
            })}
          </div>
        </KitSection>

        <NotForYou locale={siteLocale} />

        <DiyRow locale={siteLocale} source="services-index" />

        <CtaBand
          locale={siteLocale}
          source="services-index"
          title={<AccentTitle text={isEl ? 'Δεν είστε σίγουροι τι χρειάζεστε;' : 'Not sure what you need?'} />}
          description={
            isEl
              ? 'Πείτε μας τι θέλετε να πετύχετε. Θα κοιτάξουμε το site και την αγορά σας και θα σας πούμε τι έχει νόημα να γίνει πρώτο.'
              : 'Tell us what you want to achieve. We will look at your site and your market and tell you what is worth doing first.'
          }
        />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}

const SERVICE_BADGES: Partial<Record<string, { kind: MarketingBadgeKind; label: Record<SiteLocale, string> }>> = {
  'website-creation': { kind: 'popular', label: { en: 'Popular', el: 'Δημοφιλές' } },
  'ai-visibility': { kind: 'ai', label: { en: 'AI', el: 'AI' } },
  'local-seo': { kind: 'popular', label: { en: 'Popular', el: 'Δημοφιλές' } },
};
