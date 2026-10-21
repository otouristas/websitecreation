import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { getIndustriesForLocale } from "@/data/industries";
import { getIndexableServiceLocations } from "@/data/locations";
import { getPortfolioByCategory, type PortfolioCategory, type PortfolioProject } from "@/data/portfolio";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/seo";
import { getIndustryPageCopy } from "@/data/industry-page-copy";
import { industryServicePath } from "@/lib/indexability/industry-service";
import { resolvePriceTokens } from "@/data/pricing";
import { SchemaMarkup } from "@/components/seo";
import { getLocalizedIndustry } from "@/lib/industry-locale";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { solutionsUi } from "@/data/translations/solutions-ui";
import { tourismPath } from "@/data/tourism-seo";
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from "@/lib/seo/content-dates";
import { agencyTrust, LocalPackPreview } from "@/components/kit";
import { ChipLinks, KitBreadcrumbs } from "@/components/page-kit";
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveChoice,
  WaveClose,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
  waveGhostBtn,
  wavePrimaryBtn,
} from "@/components/pages/platform-wave/ui";
import { accentEnd, ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel, sampleKindForIndustry, WorkCards } from "@/components/pages/industry-wave/ui";

const TOURISM_SLUGS = new Set([
  "hotels",
  "rent-a-car",
  "tour-operators",
  "villas-apartments",
  "travel-agencies",
  "travel-ai-chatbots",
]);

/** Tourism verticals map onto a portfolio category for the proof strip. */
const PORTFOLIO_FOR: Record<string, PortfolioCategory> = {
  hotels: "hotel",
  "rent-a-car": "rent-a-car",
  "tour-operators": "tours",
  "villas-apartments": "villa",
  "travel-agencies": "tours",
  "travel-ai-chatbots": "travel-ai",
};

/** Industry hub slug to its /el/seo-tourismou page. */
const TOURISM_SEO_FOR_INDUSTRY: Partial<Record<string, string>> = {
  "villas-apartments": "villes",
  "tour-operators": "ekdromes",
  "travel-agencies": "taxidiotika-grafeia",
  restaurants: "estiatoria",
};

function workForIndustry(slug: string): PortfolioProject[] {
  const category = PORTFOLIO_FOR[slug];
  if (!category || !TOURISM_SLUGS.has(slug)) return [];
  const projects = getPortfolioByCategory(category).filter((project) => project.featured && !project.liveStatus);
  const picked = projects.slice(0, 3);
  if (slug !== "villas-apartments") return picked;
  const villa = getPortfolioByCategory("villa").find((project) => project.slug === "villa-olivia-clara" && !project.liveStatus);
  if (!villa || picked.some((project) => project.slug === villa.slug)) return picked;
  return [villa, ...picked].slice(0, 3);
}

export function IndustryPageView({
  industrySlug,
  locale,
}: {
  industrySlug: string;
  locale: SiteLocale;
}) {
  const industry = getLocalizedIndustry(industrySlug, locale);
  if (!industry) return null;

  const isEl = locale === "el";
  const tourismSeo = isEl ? TOURISM_SEO_FOR_INDUSTRY[industrySlug] : undefined;
  const tx = (en: string, el: string) => (isEl ? el : en);
  const ui = isEl ? solutionsUi.el : solutionsUi.en;
  const lp = (path: string) => localizedPath(locale, path);
  const copy = getIndustryPageCopy(industrySlug, locale);
  const faqs = (copy?.faqs ?? []).map((item) => ({ question: item.question, answer: resolvePriceTokens(item.answer, locale) }));
  const relatedIndustries = getIndustriesForLocale(locale)
    .filter((item) => item.slug !== industrySlug)
    .slice(0, 4)
    .map((item) => getLocalizedIndustry(item.slug, locale)!);

  const breadcrumbs = [
    { name: ui.home, url: lp("/") },
    { name: ui.solutions, url: lp("/solutions") },
    { name: industry.name, url: lp(`/solutions/${industrySlug}`) },
  ];

  const headline = copy?.h1 ?? `${ui.websiteSolutionsFor} ${industry.name}`;
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateArticleSchema({
      headline,
      description: copy?.lead ?? industry.description,
      datePublished: GENERATED_CONTENT_PUBLISHED,
      dateModified: GENERATED_CONTENT_UPDATED,
      author: { name: "AnotherSEOGuru" },
    }),
    ...(faqs.length > 0 ? [generateFAQSchema({ faqs })] : []),
  );

  const locations = getIndexableServiceLocations(isEl ? "el" : "en");
  const featured = workForIndustry(industrySlug);
  const title = copy?.h1 ? (
    accentEnd(copy.h1, copy.accentWords ?? 2)
  ) : (
    <>
      {ui.websiteSolutionsFor} <WaveAccent>{industry.name}</WaveAccent>
    </>
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill
                wrap
                href={lp("/get-started#free-audit")}
                tag={tx("Free", "Δωρεάν")}
                text={tx("SEO audit for your business in 24 hours", "Έλεγχος SEO για την επιχείρησή σας σε 24 ώρες")}
              />
            </div>
          }
          title={title}
          titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.7rem] lg:text-[3.15rem]"
          lead={copy?.lead ?? industry.description}
          actions={
            <ServiceHeroActions
              locale={locale}
              primaryHref={lp(`/get-started?project=${industrySlug}`)}
              primaryLabel={ui.getQuoteFor(industry.name)}
              links={[{ href: "#services", label: ui.viewServices }]}
            />
          }
          trust={<TrustMarks items={agencyTrust(locale).map((item) => item.label)} yesLabel={tx("Yes", "Ναι")} />}
          panel={<IndustryAppPanel locale={locale} kind={sampleKindForIndustry(industrySlug)} />}
        />

        <WaveSection shot="pains">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
            <div className="min-w-0">
              <WaveHeading
                eyebrow={tx("The brief", "Οι ανάγκες")}
                title={copy?.needsTitle ?? ui.whatWebsitesNeed(industry.name)}
                lead={copy?.needsBody ?? ui.painIntro(industry.name)}
              />
              <Link href={lp("/get-started#free-audit")} className={`${wavePrimaryBtn} mt-8`}>
                {tx("Get a free SEO audit", "Δωρεάν έλεγχος SEO")}
              </Link>
            </div>
            <div className="min-w-0">
              <ol className="divide-y divide-hairline overflow-hidden rounded-[22px] border border-hairline bg-surface/60">
                {industry.painPoints.map((point, index) => (
                  <li key={point} className="flex gap-4 p-5 sm:p-6">
                    <span className="font-code text-[12px] font-medium text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <p className="min-w-0 text-pretty text-[16px] font-semibold leading-snug text-foreground">{point}</p>
                  </li>
                ))}
              </ol>
              {copy?.checklist ? (
                <div className="mt-5 rounded-[22px] border border-hairline bg-background/70 p-5 sm:p-6">
                  <h3 className="text-[16px] font-semibold text-foreground">{copy.checklist.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {copy.checklist.items.map((item) => (
                      <li key={item} className="flex gap-2 text-pretty text-[14.5px] leading-6 text-foreground/90">
                        <span className="text-primary" aria-hidden>
                          ✓
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </WaveSection>

        {copy?.topics && copy.topics.length > 0 ? (
          <WaveSection id="guide" shot="guide" tinted>
            <WaveHeading eyebrow={copy.topicsEyebrow} title={copy.topicsTitle ?? ""} />
            <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
              {copy.topics.map((topic) => (
                <article key={topic.title} className="min-w-0">
                  <p className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{topic.eyebrow}</p>
                  <h3 className="mt-3 text-balance font-display text-[1.45rem] font-bold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[1.7rem]">
                    {topic.title}
                  </h3>
                  <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{resolvePriceTokens(topic.body, locale)}</p>
                  {topic.bullets && topic.bullets.length > 0 ? (
                    <ul className="mt-5 space-y-2">
                      {topic.bullets.map((item) => (
                        <li key={item} className="flex gap-2 text-pretty text-[14.5px] leading-6 text-foreground/90">
                          <span className="text-primary" aria-hidden>
                            ✓
                          </span>
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {topic.link ? (
                    <p className="mt-5 text-[14.5px]">
                      <Link href={lp(topic.link.href)} className="font-medium text-primary underline-offset-4 hover:underline">
                        {topic.link.label}
                      </Link>
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </WaveSection>
        ) : null}

        <WaveSection id="services" shot="services" tinted={!copy?.topics?.length}>
          <WaveHeading
            eyebrow={tx("Services", "Υπηρεσίες")}
            title={copy?.servicesTitle ?? ui.servicesFor(industry.nameFor ?? industry.name)}
            lead={ui.servicesIntro(industry.name)}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const svc = isEl ? getServiceEl(service.slug) : null;
              return (
                <li key={service.slug} className="min-w-0">
                  <Link
                    href={lp(industryServicePath(industrySlug, service.slug, locale))}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <h3 className="text-balance text-[18px] font-bold leading-snug text-foreground">{svc?.name ?? service.name}</h3>
                    <p className="mt-2 flex-1 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{svc?.description ?? service.description}</p>
                    <span className="mt-4 text-[14px] font-medium text-primary">{ui.learnMore}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {tourismSeo ? (
            <p className="mt-8 text-[15px]">
              <Link href={tourismPath(tourismSeo)} className="font-medium text-primary underline-offset-4 hover:underline">
                {`Υπηρεσίες SEO για ${industry.nameFor ?? industry.name}`}
              </Link>
            </p>
          ) : null}
        </WaveSection>

        {locations.length > 0 ? (
          <WaveSection shot="locations">
            <div className={copy?.checklist ? "" : "grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"}>
              <WaveHeading
                eyebrow={tx("Local", "Τοπικά")}
                title={ui.byCity(industry.name)}
                lead={ui.locationsIntro(industry.name, isEl)}
              />
              {copy?.checklist ? null : (
                <AppPanel
                  url="app.anotherseoguru.com/sample/maps"
                  badge={tx("Sample data", "Δείγμα δεδομένων")}
                  caption={tx("Sample Google Maps results, not a client listing.", "Δείγμα αποτελεσμάτων Google Maps, όχι καταχώριση πελάτη.")}
                >
                  <LocalPackPreview locale={locale} />
                </AppPanel>
              )}
            </div>
            <ChipLinks
              className="mt-12"
              items={locations.map((location) => ({
                key: location.slug,
                href: lp(`/services/website-creation/${location.slug}`),
                label: "cityLocal" in location && location.cityLocal ? location.cityLocal : location.city,
              }))}
            />
          </WaveSection>
        ) : null}

        <WaveChoice locale={locale} source={`industry-${industrySlug}-choice`} />
        <WaveStats locale={locale} />

        {featured.length > 0 ? (
          <WaveSection id="proof" shot="proof">
            <WaveHeading
              align="center"
              eyebrow={tx("Live work", "Ζωντανά έργα")}
              title={
                isEl ? (
                  <>
                    Έργα που μας <WaveAccent>εμπιστεύονται</WaveAccent>
                  </>
                ) : (
                  <>
                    Trusted by <WaveAccent>tourism brands</WaveAccent>
                  </>
                )
              }
              lead={isEl ? "Δείτε live ιστοσελίδες πριν ζητήσετε προσφορά." : "See live sites before you request a quote."}
            />
            <WorkCards projects={featured} locale={locale} />
            <p className="mt-8 text-center text-[14px] text-muted-foreground">
              <Link href={lp("/work")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                {isEl ? "Όλες οι μελέτες περίπτωσης" : "All case studies"}
              </Link>
              {" · "}
              {isEl ? "SEO, GEO & AEO περιλαμβάνονται" : "SEO, GEO & AEO included"}
            </p>
          </WaveSection>
        ) : null}

        <WaveSection shot="related" tinted>
          <WaveHeading eyebrow={tx("Related", "Σχετικά")} title={ui.relatedIndustries} />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedIndustries.map((related) => (
              <li key={related.slug} className="min-w-0">
                <Link
                  href={lp(`/solutions/${related.slug}`)}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-[18px] border border-hairline bg-surface/50 px-4 py-3.5 text-[14.5px] font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  <span className="min-w-0 text-pretty">{related.name}</span>
                  <span className="shrink-0 text-primary" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href={lp("/contact")} className={waveGhostBtn}>
              {ui.freeQuote}
            </Link>
          </p>
        </WaveSection>

        {faqs.length > 0 ? (
          <ManagedFaq
            locale={locale}
            title={copy?.faqTitle ?? "FAQ"}
            faqs={faqs}
            askLabel={tx("Talk on WhatsApp", "Μιλήστε στο WhatsApp")}
          />
        ) : null}

        <WaveClose
          locale={locale}
          source={`industry-${industrySlug}`}
          title={accentEnd(copy?.ctaTitle ?? ui.readyCta(industry.name), 2)}
          lead={copy?.ctaBody ?? ui.readySub(industry.name)}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
