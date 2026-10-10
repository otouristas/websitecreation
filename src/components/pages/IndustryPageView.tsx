import Link from 'next/link';
import { ArrowUpRight, Layers, MapPin, Target, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { getIndustriesForLocale } from '@/data/industries';
import { getIndexableServiceLocations } from '@/data/locations';
import { getFeaturedPortfolio, PORTFOLIO_CATEGORIES, type PortfolioCategory } from '@/data/portfolio';
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup } from '@/components/seo';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { solutionsUi } from '@/data/translations/solutions-ui';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import {
  Accent,
  AgencyCtas,
  Container,
  CtaBand,
  DecisionsPanel,
  KitHeading,
  KitSection,
  LocalPackPreview,
  Stage,
  kitSecondaryBtn,
} from '@/components/kit';
import { CardGrid, ChipLinks, LinkCard, PageHero, SplitRow } from '@/components/page-kit';

const TOURISM_SLUGS = new Set([
  'hotels',
  'rent-a-car',
  'tour-operators',
  'villas-apartments',
  'travel-agencies',
  'travel-ai-chatbots',
]);

/** Tourism verticals map onto a portfolio category for the proof strip. */
const PORTFOLIO_FOR: Record<string, PortfolioCategory> = {
  hotels: 'hotel',
  'rent-a-car': 'rent-a-car',
  'tour-operators': 'tours',
  'villas-apartments': 'villa',
  'travel-agencies': 'tours',
  'travel-ai-chatbots': 'travel-ai',
};

export function IndustryPageView({
  industrySlug,
  locale,
}: {
  industrySlug: string;
  locale: SiteLocale;
}) {
  const industry = getLocalizedIndustry(industrySlug, locale);
  if (!industry) return null;

  const isEl = locale === 'el';
  const tx = (en: string, el: string) => (isEl ? el : en);
  const ui = isEl ? solutionsUi.el : solutionsUi.en;
  const lp = (path: string) => localizedPath(locale, path);
  const relatedIndustries = getIndustriesForLocale(locale)
    .filter((i) => i.slug !== industrySlug)
    .slice(0, 4)
    .map((i) => getLocalizedIndustry(i.slug, locale)!);

  const breadcrumbs = [
    { name: ui.home, url: lp('/') },
    { name: ui.solutions, url: lp('/solutions') },
    { name: industry.name, url: lp(`/solutions/${industrySlug}`) },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateArticleSchema({
      headline: `${ui.websiteSolutionsFor} ${industry.name}`,
      description: industry.description,
      datePublished: GENERATED_CONTENT_PUBLISHED,
      dateModified: GENERATED_CONTENT_UPDATED,
      author: { name: 'AnotherSEOGuru' },
    }),
  );

  // Live website-creation city pages only (2026-10 city cut). This listed all
  // 45 Greek cities on /el and 18 US cities on /en; most are now 410.
  const locations = getIndexableServiceLocations(isEl ? 'el' : 'en');

  // Tourism proof: live sites in the same category (was AdsLandingBand).
  const isTourism = TOURISM_SLUGS.has(industrySlug);
  const category = PORTFOLIO_FOR[industrySlug] ?? 'tours';
  const featured = isTourism
    ? getFeaturedPortfolio(20).filter((p) => p.category === category).slice(0, 3)
    : [];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale}
          breadcrumbs={breadcrumbs}
          pill={{
            href: lp('/get-started#free-audit'),
            kind: 'free',
            tag: tx('Free', 'Δωρεάν'),
            text: tx('SEO audit for your business in 24 hours', 'Έλεγχος SEO για την επιχείρησή σας σε 24 ώρες'),
          }}
          title={
            <>
              {ui.websiteSolutionsFor} <Accent>{industry.name}</Accent>
            </>
          }
          lead={industry.description}
          actions={
            <div className="flex flex-col items-center gap-3">
              <AgencyCtas
                locale={locale}
                primaryHref={lp(`/get-started?project=${industrySlug}`)}
                primaryLabel={ui.getQuoteFor(industry.name)}
              />
              <Link href="#services" className="text-[14px] font-medium text-muted-foreground underline decoration-hairline underline-offset-4 hover:text-foreground">
                {ui.viewServices}
              </Link>
            </div>
          }
        />

        {featured.length > 0 ? (
          <KitSection className="!pb-0">
            <KitHeading
              align="center"
              eyebrow={tx('Live work', 'Ζωντανά έργα')}
              title={
                <>
                  {isEl ? 'Έργα που μας ' : 'Trusted by '}
                  <Accent>{isEl ? 'εμπιστεύονται' : 'tourism brands'}</Accent>
                </>
              }
              description={isEl ? 'Δείτε live ιστοσελίδες πριν ζητήσετε προσφορά.' : 'See live sites before you request a quote.'}
            />
            <CardGrid className="mt-10">
              {featured.map((p) => (
                <LinkCard
                  key={p.slug}
                  href={lp(`/work/${p.slug}`)}
                  eyebrow={isEl ? PORTFOLIO_CATEGORIES[p.category].labelEl : PORTFOLIO_CATEGORIES[p.category].label}
                  title={p.name}
                  text={isEl && p.summaryEl ? p.summaryEl : p.summary}
                />
              ))}
            </CardGrid>
            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              <Link href={lp('/work')} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                {isEl ? 'Όλες οι μελέτες περίπτωσης' : 'All case studies'}
              </Link>
              {' · '}
              {isEl ? 'SEO, GEO & AEO συμπεριλαμβάνονται' : 'SEO, GEO & AEO included'}
            </p>
          </KitSection>
        ) : null}

        <KitSection>
          <SplitRow
            eyebrow={tx('The brief', 'Οι ανάγκες')}
            eyebrowIcon={<Target />}
            title={ui.whatWebsitesNeed(industry.name)}
            body={ui.painIntro(industry.name)}
            bullets={industry.painPoints}
            links={[{ href: lp('/get-started#free-audit'), label: tx('Get a free SEO audit', 'Δωρεάν έλεγχος SEO'), primary: true }]}
            preview={
              <Stage>
                <DecisionsPanel locale={locale} />
              </Stage>
            }
          />
        </KitSection>

        <KitSection tinted id="services">
          <KitHeading
            eyebrow={tx('Services', 'Υπηρεσίες')}
            eyebrowIcon={<Layers />}
            title={ui.servicesFor(industry.nameFor)}
            description={ui.servicesIntro(industry.name)}
          />
          <CardGrid className="mt-12">
            {services.map((service) => {
              const svc = isEl ? getServiceEl(service.slug) : null;
              return (
                <LinkCard
                  key={service.slug}
                  href={lp(`/solutions/${industrySlug}/${service.slug}`)}
                  title={svc?.name ?? service.name}
                  text={svc?.description ?? service.description}
                  footer={<span className="font-medium text-link">{ui.learnMore}</span>}
                />
              );
            })}
          </CardGrid>
        </KitSection>

        {locations.length > 0 ? (
          <KitSection>
            <SplitRow
              flip
              eyebrow={tx('Local', 'Τοπικά')}
              eyebrowIcon={<MapPin />}
              title={ui.byCity(industry.name)}
              body={ui.locationsIntro(industry.name, isEl)}
              preview={
                <Stage>
                  <LocalPackPreview locale={locale} />
                </Stage>
              }
            />
            <ChipLinks
              className="mt-12"
              items={locations.map((location) => ({
                key: location.slug,
                href: lp(`/services/website-creation/${location.slug}`),
                label: 'cityLocal' in location && location.cityLocal ? location.cityLocal : location.city,
              }))}
            />
          </KitSection>
        ) : null}

        <section className="border-t border-hairline py-16">
          <Container>
            <KitHeading
              eyebrow={tx('Related', 'Σχετικά')}
              eyebrowIcon={<TrendingUp />}
              title={ui.relatedIndustries}
            />
            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {relatedIndustries.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={lp(`/solutions/${related.slug}`)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface/50 px-4 py-3.5 text-[14.5px] font-medium text-foreground transition-colors hover:border-brand/40"
                  >
                    {related.name}
                    <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href={lp('/contact')} className={kitSecondaryBtn}>
                {ui.freeQuote}
              </Link>
            </p>
          </Container>
        </section>

        <CtaBand
          locale={locale}
          source={`industry-${industrySlug}`}
          title={<>{ui.readyCta(industry.name)}</>}
          description={ui.readySub(industry.name)}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
