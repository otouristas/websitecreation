import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { ROICalculator } from '@/components/tools';
import { HowItWorks, FeatureHighlightGrid, AgencyBand, HomeFaq } from '@/components/marketing';
import {
  LandingHero,
  ProblemSolutionSection,
  LandingComparisonTable,
  LandingTestimonials,
  LandingPricingTeaser,
  PortfolioGrid,
  VerticalServices,
} from '@/components/landing';
import { AgencyPricingTeaser } from '@/components/landing/AgencyPricingTeaser';
import { AgencyServicesGrid } from '@/components/landing/AgencyServicesGrid';
import { getMarketingFeatureBySlug, type MarketingFeature } from '@/data/marketing-features';
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import { BASE_URL } from '@/lib/seo/description';
import { elHome } from '@/data/translations/el-home';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const HOME_FEATURE_SLUGS = [
  'semantic-keyword-clustering',
  'ranking-tracker',
  'technical-seo-audits',
  'multi-llm-ai-system',
  'ai-autopilot-mode',
  'sprint-board-task-management',
] as const;

function getHomeHighlightFeatures(): MarketingFeature[] {
  return HOME_FEATURE_SLUGS.map((slug) => getMarketingFeatureBySlug(slug)).filter(
    (f): f is MarketingFeature => Boolean(f),
  );
}

export function HomePageView({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  if (isEl) {
    const orgSchema = generateOrganizationSchema({
      name: 'AnotherSEOGuru',
      url: `${BASE_URL}/el`,
      logo: `${BASE_URL}/logo.png`,
      description:
        'Agency κατασκευής ιστοσελίδων και SEO για τουρισμό, ξενοδοχεία, rent-a-car και travel AI στην Ελλάδα και διεθνώς.',
    });

    return (
      <>
        <SchemaMarkup schemas={[orgSchema]} />
        <Header />
        <main className="relative z-0 overflow-hidden">
          <LandingHero locale="el" />
          <VerticalServices locale="el" />
          <PortfolioGrid locale="el" />
          <ProblemSolutionSection locale="el" />
          <section className="border-y border-border bg-muted/20 py-10">
            <div className="container">
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {elHome.logos}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-90 lg:gap-12">
                {[
                  { src: '/logos/assets/aggelosrentals.png', alt: 'Aggelos Rentals' },
                  { src: '/logos/assets/alkhotel.png', alt: 'ALK Hotel' },
                  { src: '/logos/assets/antiparosrentacar.png', alt: 'Antiparos Rent a Car' },
                  { src: '/logos/assets/villa-olivia-clara-logo-768x204.png', alt: 'Villa Olivia Clara' },
                  { src: '/logos/assets/elitehospitality.png', alt: 'Elite Hospitality' },
                ].map((logo) => (
                  <div key={logo.alt} className="relative h-12 w-32 sm:w-36">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <HowItWorks
            heading={elHome.howItWorks.heading}
            subheading={elHome.howItWorks.subheading}
            steps={elHome.howItWorks.steps.map((s, i) => ({ step: i + 1, ...s }))}
          />
          <AgencyServicesGrid locale="el" />
          <AgencyBand locale="el" />
          <LandingTestimonials locale="el" />
          <AgencyPricingTeaser locale="el" />
          <HomeFaq locale="el" />
          <section className="bg-foreground py-[var(--marketing-section-y)] text-center text-background">
            <div className="container max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold">{elHome.finalCta.title}</h2>
              <p className="mb-8 text-background/80">{elHome.finalCta.body}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href={lp('/get-started')} className="btn bg-background px-8 py-4 font-semibold text-foreground hover:bg-background/90">
                  {elHome.finalCta.cta}
                </Link>
                <Link href={lp('/work')} className="btn border-2 border-background/40 px-8 py-4 font-semibold text-background hover:bg-background/10">
                  {elHome.finalCta.secondary}
                </Link>
              </div>
            </div>
          </section>
        </main>
        <StickyMobileCta />
        <Footer />
      </>
    );
  }

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'AnotherSEOGuru SEO Platform',
    description:
      'Search Console workspace with semantic clustering, rank tracking, technical audits, LLM-assisted workflows, and optional agency delivery.',
    url: `${BASE_URL}/en`,
  });
  const highlightFeatures = getHomeHighlightFeatures();

  return (
    <>
      <SchemaMarkup schemas={[softwareSchema]} />
      <Header />
      <main className="relative z-0 overflow-hidden">
        <LandingHero />
        <VerticalServices />
        <PortfolioGrid />
        <ProblemSolutionSection />
        <section className="border-y border-border bg-muted/20 py-10">
          <div className="container">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Trusted by tourism & travel brands worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-80 grayscale transition-all duration-500 hover:grayscale-0 lg:gap-16">
              {[
                '/logos/assets/aggelosrentals.png',
                '/logos/assets/alkhotel.png',
                '/logos/assets/antiparosrentacar.png',
                '/logos/assets/elitehospitality.png',
                '/logos/assets/villa-olivia-clara-logo-768x204.png',
              ].map((src) => (
                <div key={src} className="relative h-14 w-36">
                  <Image src={src} alt="" fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <HowItWorks
          heading="How we deliver tourism websites that rank"
          subheading="From brief to live site — with SEO, GEO and AEO built in, not bolted on."
          steps={[
            { step: 1, title: 'Strategy & brief', description: 'Market, competitors and keyword opportunities mapped before design.' },
            { step: 2, title: 'Design & build', description: 'Mobile-first UX for bookings, galleries and conversion paths.' },
            { step: 3, title: 'SEO · GEO · AEO', description: 'Technical setup, schema, content hubs and AI-search optimization.' },
            { step: 4, title: 'Launch & grow', description: 'Go-live, Search Console monitoring and ongoing improvements.' },
          ]}
        />
        <FeatureHighlightGrid
          heading="Platform capabilities teams open daily"
          subheading="Deep pages for every module — aligned with the in-app experience."
          features={highlightFeatures}
          limit={6}
        />
        <LandingComparisonTable />
        <LandingTestimonials />
        <AgencyBand />
        <LandingPricingTeaser />
        <section id="calculator" className="border-y border-border bg-gradient-to-b from-muted/40 to-background py-[var(--marketing-section-y)]">
          <div className="container">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">What would top rankings mean for your pipeline?</h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Stress-test lead value and organic growth before you commit budget.
                </p>
              </div>
              <ROICalculator />
            </div>
          </div>
        </section>
        <HomeFaq />
        <section className="bg-foreground py-[var(--marketing-section-y)] text-center text-background">
          <div className="container max-w-2xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready for a site that wins bookings?</h2>
            <p className="mb-10 text-lg text-background/80">Get a quote, see our work, or explore the platform.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={lp('/get-started')} className="btn bg-background px-8 py-4 font-semibold text-foreground hover:bg-background/90">
                Get a quote
              </Link>
              <Link href={lp('/work')} className="btn border-2 border-background/40 px-8 py-4 font-semibold text-background hover:bg-background/10">
                See our work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <StickyMobileCta />
      <Footer />
    </>
  );
}
