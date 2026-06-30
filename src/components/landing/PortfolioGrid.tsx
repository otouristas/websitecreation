import Link from 'next/link';
import { getFeaturedPortfolio, PORTFOLIO_CATEGORIES } from '@/data/portfolio';
import { PortfolioThumbnail } from './PortfolioThumbnail';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

interface PortfolioGridProps {
  locale?: SiteLocale;
  limit?: number;
}

export function PortfolioGrid({ locale = 'en', limit = 12 }: PortfolioGridProps) {
  const isEl = locale === 'el';
  const projects = getFeaturedPortfolio(limit);
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="py-[var(--marketing-section-y)] border-y border-border bg-muted/20">
      <div className="container">
        <div className="mb-10 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {isEl ? 'Έργα που μας εμπιστεύονται' : 'Work that ranks and converts'}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {isEl
                ? 'Ξενοδοχεία, rent-a-car, τουρισμός και travel AI — δείτε live ιστοσελίδες που φτιάξαμε.'
                : 'Hotels, rent-a-car, tours and travel AI — live sites we designed, built and optimized.'}
            </p>
          </div>
          <Link href={lp('/work')} className="btn btn-outline mt-4 md:mt-0">
            {isEl ? 'Όλα τα έργα' : 'View all projects'}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => {
            const cat = PORTFOLIO_CATEGORIES[project.category];
            return (
              <Link
                key={project.slug}
                href={lp(`/work/${project.slug}`)}
                className="group card overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 to-muted overflow-hidden">
                  <PortfolioThumbnail
                    src={project.screenshot}
                    alt={`${project.name} homepage`}
                    className="transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium">
                    {isEl ? cat.labelEl : cat.label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {isEl && project.summaryEl ? project.summaryEl : project.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
