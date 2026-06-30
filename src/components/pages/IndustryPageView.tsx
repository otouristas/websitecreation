import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { services } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { industries, getIndustryBySlug } from '@/data/industries';
import { greeceLocations, tier1Locations } from '@/data/locations';
import { generateArticleSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs } from '@/components/seo';
import { AdsLandingBand } from '@/components/marketing/AdsLandingBand';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { solutionsUi } from '@/data/translations/solutions-ui';

const TOURISM_SLUGS = new Set([
  'hotels',
  'rent-a-car',
  'tour-operators',
  'villas-apartments',
  'travel-agencies',
  'travel-ai-chatbots',
]);

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
  const ui = isEl ? solutionsUi.el : solutionsUi.en;
  const lp = (path: string) => localizedPath(locale, path);
  const relatedIndustries = industries
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
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: { name: 'AnotherSEOGuru' },
    }),
  );

  const locations = isEl ? greeceLocations : tier1Locations.slice(0, 18);

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header />
      <main className="main-below-header">
        <section className="section-compact gradient-hero">
          <div className="container">
            <div className="max-w-3xl">
              <Breadcrumbs items={breadcrumbs} className="mb-6" />
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                {ui.websiteSolutionsFor} {industry.name}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">{industry.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={lp(`/get-started?project=${industrySlug}`)} className="btn btn-gradient">
                  {ui.getQuoteFor(industry.name)}
                </Link>
                <Link href="#services" className="btn btn-outline">
                  {ui.viewServices}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {TOURISM_SLUGS.has(industrySlug) && <AdsLandingBand industrySlug={industrySlug} locale={locale} />}

        <section className="section">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{ui.whatWebsitesNeed(industry.name)}</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">{ui.painIntro(industry.name)}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {industry.painPoints.map((point) => (
                <div key={point} className="card p-6 text-center hover-glow">
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30" id="services">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{ui.servicesFor(industry.name)}</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">{ui.servicesIntro(industry.name)}</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const svc = isEl ? getServiceEl(service.slug) : null;
                return (
                  <Link
                    key={service.slug}
                    href={lp(`/solutions/${industrySlug}/${service.slug}`)}
                    className="card p-6 hover-glow"
                  >
                    <h3 className="mb-2 font-semibold">{svc?.name ?? service.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{svc?.description ?? service.description}</p>
                    <span className="text-sm font-medium text-primary">{ui.learnMore}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{ui.byCity(industry.name)}</h2>
            <p className="mb-8 text-muted-foreground">{ui.locationsIntro(industry.name, isEl)}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={lp(`/services/website-creation/${location.slug}`)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-center text-sm transition-smooth hover:border-primary hover:text-primary"
                >
                  {'cityLocal' in location && location.cityLocal ? location.cityLocal : location.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{ui.relatedIndustries}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedIndustries.map((related) => (
                <Link key={related.slug} href={lp(`/solutions/${related.slug}`)} className="card p-4 text-center hover-glow">
                  <span className="font-medium">{related.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold">{ui.readyCta(industry.name)}</h2>
            <p className="mb-8 text-white/80">{ui.readySub(industry.name)}</p>
            <Link href={lp('/contact')} className="btn bg-white text-primary hover:bg-white/90">
              {ui.freeQuote}
            </Link>
          </div>
        </section>
      </main>
      <StickyMobileCta />
      <Footer />
    </>
  );
}
