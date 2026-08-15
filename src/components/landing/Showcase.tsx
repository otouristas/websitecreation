import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPortfolioBySlug, PORTFOLIO_CATEGORIES } from '@/data/portfolio';
import { getTierById } from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Bloom, Eyebrow, GhostButtonLink, Section, SectionHeading, Tick } from './primitives';
import { AiVisibilityPanel, ProductFrame } from './graphics';

/**
 * Alternating showcase rows built from real client work.
 *
 * Screenshots come from `public/portfolio/` and copy from `portfolio.ts` -
 * including the `results`/`resultsEl` bullets, which describe delivered scope.
 * Nothing here is invented or placeholder.
 *
 * The three projects are chosen rather than taken from `featured`, so each row
 * shows the packages it was delivered under and a visitor can see a real
 * example of what a given tier buys. Tier names resolve through `getTierById`,
 * so they cannot drift from /pricing.
 *
 * The final row is the platform (AI-visibility panel), so the section carries
 * both halves of the positioning: agency proof and software.
 */
const SHOWCASE: readonly { slug: string; tiers: readonly string[] }[] = [
  { slug: 'discover-cyclades', tiers: ['business', 'authority'] },
  { slug: 'villa-olivia-clara', tiers: ['professional', 'growth'] },
  { slug: 'mykonos-luxury', tiers: ['growth'] },
];

export function Showcase({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const rows = SHOWCASE.flatMap((entry) => {
    const project = getPortfolioBySlug(entry.slug);
    if (!project) return [];
    const tiers = entry.tiers.map(getTierById).filter((t) => t !== undefined);
    return [{ project, tiers }];
  });

  return (
    <Section id="in-action" className="relative">
      <SectionHeading
        eyebrow={isEl ? 'Έργα' : 'In action'}
        title={
          isEl ? (
            <>
              Δουλειά που <span className="text-primary">κατατάσσεται</span>
            </>
          ) : (
            <>
              Work that <span className="text-primary">actually ranks</span>
            </>
          )
        }
        body={
          isEl
            ? 'Ζωντανά έργα, το καθένα με τα πακέτα υπό τα οποία παραδόθηκε, ώστε να δείτε τι περιλαμβάνει στην πράξη κάθε επίπεδο.'
            : 'Live projects, each tagged with the packages it was delivered under, so you can see what a tier actually buys.'
        }
      />

      <div className="mt-16 space-y-20 md:space-y-28">
        {rows.map(({ project, tiers }, index) => {
          const cat = PORTFOLIO_CATEGORIES[project.category];
          const bullets = (isEl ? project.resultsEl ?? project.results : project.results) ?? [];
          const flipped = index % 2 === 1;

          return (
            <div
              key={project.slug}
              className="rise-in grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className={flipped ? 'order-1 lg:order-2' : 'order-1'}>
                <div className="relative">
                  <Bloom soft className="-left-16 top-1/4 h-64 w-80" />
                  <ProductFrame url={project.url.replace(/^https?:\/\//, '')} className="relative">
                    <Image
                      src={project.screenshot}
                      alt={
                        isEl ? `${project.name} - αρχική σελίδα` : `${project.name} homepage`
                      }
                      width={1200}
                      height={800}
                      className="h-auto w-full rounded-[6px] object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </ProductFrame>
                </div>
              </div>

              <div className={flipped ? 'order-2 lg:order-1' : 'order-2'}>
                <Eyebrow>{isEl ? cat.labelEl : cat.label}</Eyebrow>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-foreground md:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {isEl ? project.summaryEl ?? project.summary : project.summary}
                </p>

                {tiers.length > 0 ? (
                  <div className="mt-6">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {isEl ? 'Παραδόθηκε με' : 'Delivered under'}
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tiers.map((tier) => (
                        <Link
                          key={tier.id}
                          href={lp('/pricing')}
                          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-brand/40"
                        >
                          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                          {tier.name}
                        </Link>
                      ))}
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      {isEl ? tiers[0].forEl : tiers[0].forEn}
                    </p>
                  </div>
                ) : null}

                {bullets.length > 0 ? (
                  <ul className="mt-8 space-y-4 border-t border-hairline pt-6">
                    {bullets.slice(0, 3).map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Tick />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link
                  href={lp(`/work/${project.slug}`)}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  {isEl ? 'Δείτε το έργο' : 'View the project'}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          );
        })}

        {/* Platform row - the software half of the positioning */}
        <div className="rise-in grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-1">
            <AiVisibilityPanel locale={isEl ? 'el' : 'en'} />
          </div>
          <div className="order-2">
            <Eyebrow>{isEl ? 'Η πλατφόρμα μας' : 'Our platform'}</Eyebrow>
            <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-foreground md:text-4xl">
              {isEl ? 'Δείτε πού σας αναφέρει το AI' : 'See where AI cites you'}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {isEl
                ? 'Η δική μας πλατφόρμα συνδέεται απευθείας με το Google Search Console και παρακολουθεί πού εμφανίζεται το brand σας σε ChatGPT, Perplexity, Gemini και AI Overviews.'
                : 'Our own platform connects straight to Google Search Console and tracks where your brand shows up across ChatGPT, Perplexity, Gemini and AI Overviews.'}
            </p>
            <div className="mt-8">
              <GhostButtonLink href={lp('/platform')}>
                {isEl ? 'Δείτε την πλατφόρμα' : 'Explore the platform'}
                <ArrowRight className="size-4" aria-hidden />
              </GhostButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <GhostButtonLink href={lp('/work')}>
          {isEl ? 'Όλα τα έργα' : 'View all projects'}
        </GhostButtonLink>
      </div>
    </Section>
  );
}
