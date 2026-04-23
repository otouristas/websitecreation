import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { ROICalculator } from '@/components/tools';
import {
  HowItWorks,
  FeatureHighlightGrid,
  AgencyBand,
  HomeFaq,
} from "@/components/marketing";
import {
  LandingHero,
  ProblemSolutionSection,
  LandingComparisonTable,
  LandingTestimonials,
  LandingPricingTeaser,
} from "@/components/landing";
import { getMarketingFeatureBySlug, type MarketingFeature } from '@/data/marketing-features';
import { buildMetadata } from '@/lib/seo';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import { BASE_URL } from '@/lib/seo/description';

export const metadata = buildMetadata({
  title: 'AnotherSEOGuru — SEO platform + agency for Search Console teams',
  description:
    'GSC-native SEO software with clustering, rank tracking, audits, and AI workflows — plus done-for-you agency services when you want execution.',
  path: '/',
  primaryKeyword: 'SEO software',
});

const HOME_FEATURE_SLUGS = [
  'semantic-keyword-clustering',
  'ranking-tracker',
  'technical-seo-audits',
  'multi-llm-ai-system',
  'ai-autopilot-mode',
  'sprint-board-task-management',
] as const;

function getHomeHighlightFeatures(): MarketingFeature[] {
  return HOME_FEATURE_SLUGS.map((slug) => getMarketingFeatureBySlug(slug)).filter((f): f is MarketingFeature => Boolean(f));
}

export default function Home() {
  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'AnotherSEOGuru SEO Platform',
    description:
      'Search Console workspace with semantic clustering, rank tracking, technical audits, LLM-assisted workflows, and optional agency delivery.',
    url: `${BASE_URL}/`,
  });
  const highlightFeatures = getHomeHighlightFeatures();
  return (
    <>
      <SchemaMarkup schemas={[softwareSchema]} />
      <Header />
      <main className="relative z-0 overflow-hidden">
        <LandingHero />
        <ProblemSolutionSection />
        <section className="py-10 border-y border-border bg-muted/20">
          <div className="container">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Trusted by 500+ businesses scaling organic
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/aggelosrentals.png" alt="Aggelos Rentals" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/alkhotel.png" alt="ALK Hotel" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/antiparosrentacar.png" alt="Antiparos Rent a Car" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/elitehospitality.png" alt="Elite Hospitality" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/theagencylogo.png" alt="The Agency" fill className="object-contain" />
              </div>
              <div className="relative w-40 h-14">
                <Image src="/logos/assets/villa-olivia-clara-logo-768x204.png" alt="Villa Olivia Clara" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>
        <HowItWorks
          heading="How teams go from GSC rows to shipped work"
          subheading="Connect your property once, then prioritize with clustering, health scoring, and AI-assisted briefs — weekly."
          steps={[
            {
              step: 1,
              title: 'Connect Search Console',
              description: 'Authorize your site and pull queries, pages, countries, and devices into a workspace built for SEO decisions.',
            },
            {
              step: 2,
              title: 'Cluster & diagnose',
              description: 'Group intent, spot cannibalization, and surface decay before it shows up in revenue.',
            },
            {
              step: 3,
              title: 'Track & audit',
              description: 'Monitor rankings and technical health with modules that feed the same backlog your team already uses.',
            },
            {
              step: 4,
              title: 'Execute or delegate',
              description: 'Use AI workflows in-product — or engage our agency for web design, local, and retainers.',
            },
          ]}
        />
        <FeatureHighlightGrid
          heading="Platform capabilities teams actually open daily"
          subheading="Deep pages for every module — aligned with the in-app experience."
          features={highlightFeatures}
          limit={6}
        />
        <LandingComparisonTable />
        <LandingTestimonials />
        <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] border-t border-border">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Agency services when you want it done for you</h2>
              <p className="text-lg text-muted-foreground">
                Local domination, programmatic landing pages, technical speed, and authority building — the same operators behind the product.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/services/local-seo"
                className="md:col-span-2 group relative rounded-2xl overflow-hidden bg-foreground text-background p-8 lg:p-12 hover:shadow-strong transition min-h-[280px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-3">Local map growth</h3>
                  <p className="text-background/80 max-w-lg">
                    Own near-me demand with GBP, citations, and on-site locality — paired with Search Console reality checks.
                  </p>
                </div>
                <span className="font-semibold text-primary-foreground inline-flex items-center gap-2">
                  Explore local SEO
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-border p-8 hover:border-primary/40 hover:bg-muted/20 transition flex flex-col justify-between min-h-[200px]"
              >
                <h3 className="text-xl font-bold mb-2">Full service catalog</h3>
                <p className="text-sm text-muted-foreground">pSEO, links, speed, design — browse every engagement.</p>
                <span className="text-primary font-medium text-sm mt-4">All services →</span>
              </Link>
              <Link
                href="/services/seo-web-design"
                className="rounded-2xl border border-border p-8 hover:border-primary/40 hover:bg-muted/20 transition flex flex-col justify-between min-h-[200px]"
              >
                <h3 className="text-xl font-bold mb-2">SEO web design</h3>
                <p className="text-sm text-muted-foreground">Sites engineered to rank from launch, not retrofitted later.</p>
                <span className="text-primary font-medium text-sm mt-4">See design SEO →</span>
              </Link>
            </div>
            <div className="text-center mt-10">
              <Link href="/pricing" className="btn btn-outline px-8">
                Agency retainers & packages
              </Link>
            </div>
          </div>
        </section>
        <AgencyBand />
        <LandingPricingTeaser />
        <section id="calculator" className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-gradient-to-b from-muted/40 to-background border-y border-border">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Revenue modeling
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">What would top rankings mean for your pipeline?</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Use the calculator to stress-test lead value, close rates, and incremental organic sessions — before you commit budget to software or
                  services.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0 text-sm">✓</div>
                    <span className="font-medium text-foreground">Scenario planning for organic + local</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0 text-sm">✓</div>
                    <span className="font-medium text-foreground">Shareable numbers for stakeholders</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                <div className="relative">
                  <ROICalculator />
                </div>
              </div>
            </div>
          </div>
        </section>
        <HomeFaq />
        <section
          className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-foreground text-background text-center"
          aria-labelledby="homepage-final-cta-heading"
        >
          <div className="container max-w-2xl">
            <h2 id="homepage-final-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Choose how you want to grow organic
            </h2>
            <p className="text-lg text-background/80 mb-4 leading-relaxed">
              See the Search Console workspace, talk to a strategist, or read playbooks — three clear paths so your next step matches budget, timeline,
              and ownership.
            </p>
            <p className="text-sm text-background/65 mb-10 font-medium">
              No forced bundles: use the product alone, hire the agency, or combine both.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/platform"
                className="btn bg-background text-foreground hover:bg-background/90 px-8 py-4 font-semibold"
                aria-label="Explore the AnotherSEOGuru SEO platform and features"
              >
                Explore the platform
              </Link>
              <Link
                href="/contact"
                className="btn border-2 border-background/40 text-background hover:bg-background/10 px-8 py-4 font-semibold"
                aria-label="Book a strategy call with AnotherSEOGuru"
              >
                Book a strategy call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
