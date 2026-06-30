import Link from 'next/link';
import { getFeaturedPortfolio, PORTFOLIO_CATEGORIES, type PortfolioCategory } from '@/data/portfolio';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const TOURISM_CATEGORIES: PortfolioCategory[] = [
  'rent-a-car',
  'hotel',
  'villa',
  'tours',
  'transfers',
  'travel-ai',
];

interface AdsLandingBandProps {
  industrySlug: string;
  locale?: SiteLocale;
}

export function AdsLandingBand({ industrySlug, locale = 'en' }: AdsLandingBandProps) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const category = TOURISM_CATEGORIES.includes(industrySlug as PortfolioCategory)
    ? (industrySlug as PortfolioCategory)
    : 'tours';

  const featured = getFeaturedPortfolio(20).filter((p) => p.category === category).slice(0, 3);

  return (
    <section className="border-y border-border bg-primary/5 py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">
            {isEl ? 'Έργα που μας εμπιστεύονται' : 'Trusted by tourism brands'}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isEl
              ? 'Δείτε live ιστοσελίδες πριν ζητήσετε προσφορά.'
              : 'See live sites before you request a quote.'}
          </p>
        </div>
        {featured.length > 0 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {featured.map((p) => (
              <Link key={p.slug} href={lp(`/work/${p.slug}`)} className="card p-4 hover:border-primary/40">
                <span className="text-xs text-primary">
                  {isEl ? PORTFOLIO_CATEGORIES[p.category].labelEl : PORTFOLIO_CATEGORIES[p.category].label}
                </span>
                <h3 className="font-semibold">{p.name}</h3>
              </Link>
            ))}
          </div>
        )}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href={lp(`/get-started?project=${industrySlug}`)} className="btn btn-gradient px-8 py-3">
            {isEl ? 'Ζητήστε δωρεάν προσφορά' : 'Get a free quote'}
          </Link>
          <Link href={lp('/work')} className="btn btn-outline px-8 py-3">
            {isEl ? 'Όλα τα case studies' : 'All case studies'}
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {isEl ? 'Απάντηση εντός 24 ωρών · SEO, GEO & AEO included' : 'Reply within 24h · SEO, GEO & AEO included'}
        </p>
      </div>
    </section>
  );
}
