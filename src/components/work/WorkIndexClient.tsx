'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  portfolioProjects,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_CATEGORY_FILTERS,
  type PortfolioCategory,
  type PortfolioMarket,
} from '@/data/portfolio';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
interface WorkIndexClientProps {
  locale?: SiteLocale;
}

export function WorkIndexClient({ locale = 'en' }: WorkIndexClientProps) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const [category, setCategory] = useState<PortfolioCategory | 'all'>('all');
  const [market, setMarket] = useState<PortfolioMarket | 'all'>('all');

  const filtered = useMemo(() => {
    return portfolioProjects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (market !== 'all' && !p.markets.includes(market)) return false;
      return true;
    });
  }, [category, market]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory('all')}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${category === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          {isEl ? 'Όλα' : 'All'}
        </button>
        {PORTFOLIO_CATEGORY_FILTERS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            {isEl ? PORTFOLIO_CATEGORIES[c].labelEl : PORTFOLIO_CATEGORIES[c].label}
          </button>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {(['all', 'GR', 'EU', 'UK', 'US', 'CA'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMarket(m)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${market === m ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}
          >
            {m === 'all' ? (isEl ? 'Όλες οι αγορές' : 'All markets') : m}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const cat = PORTFOLIO_CATEGORIES[project.category];
          return (
            <Link
              key={project.slug}
              href={lp(`/work/${project.slug}`)}
              className="group card overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <PortfolioThumbnail src={project.screenshot} alt={project.name} />
                <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium">
                  {isEl ? cat.labelEl : cat.label}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold group-hover:text-primary">{project.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {isEl && project.summaryEl ? project.summaryEl : project.summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
