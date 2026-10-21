'use client';

import { useMemo, useState } from 'react';
import {
  portfolioProjects,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_CATEGORY_FILTERS,
  type PortfolioCategory,
  type PortfolioMarket,
} from '@/data/portfolio';
import { ProjectCard } from './ProjectCard';
import type { SiteLocale } from '@/lib/i18n/locale';
interface WorkIndexClientProps {
  locale?: SiteLocale;
}

export function WorkIndexClient({ locale = 'en' }: WorkIndexClientProps) {
  const isEl = locale === 'el';
  const [category, setCategory] = useState<PortfolioCategory | 'all'>('all');
  const [market, setMarket] = useState<PortfolioMarket | 'all'>('all');

  const filtered = useMemo(() => {
    return portfolioProjects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (market !== 'all' && !p.markets.includes(market)) return false;
      return true;
    });
  }, [category, market]);

  const chip = (on: boolean) =>
    `inline-flex min-h-9 max-w-full items-center rounded-full border px-3.5 py-1.5 text-left text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 ${
      on ? 'border-primary/50 bg-primary/10 text-foreground' : 'border-hairline bg-surface/70 text-muted-foreground hover:border-primary/35 hover:text-foreground'
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label={isEl ? 'Κατηγορία' : 'Category'}>
        <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={chip(category === 'all')}>
          {isEl ? 'Όλα' : 'All'}
        </button>
        {PORTFOLIO_CATEGORY_FILTERS.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
            {isEl ? PORTFOLIO_CATEGORIES[c].labelEl : PORTFOLIO_CATEGORIES[c].label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label={isEl ? 'Αγορά' : 'Market'}>
        {(['all', 'GR', 'EU', 'UK', 'US', 'CA'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={market === m}
            onClick={() => setMarket(m)}
            className={`rounded-full px-3 py-1 font-code text-[11.5px] font-medium uppercase tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 ${
              market === m ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {m === 'all' ? (isEl ? 'Όλες οι αγορές' : 'All markets') : m}
          </button>
        ))}
        <span className="ml-auto font-mono text-[12px] text-muted-foreground">{filtered.length}</span>
      </div>
      <div className="mt-10 grid min-w-0 gap-x-8 gap-y-12 md:grid-cols-2">
        {filtered.map(project => <ProjectCard key={project.slug} project={project} locale={locale}/>)}
      </div>
      {!filtered.length && <p className="py-16 text-center text-muted-foreground">{isEl ? 'Δεν υπάρχουν έργα με αυτούς τους συνδυασμούς φίλτρων.' : 'No projects match these filters.'}</p>}
    </>
  );
}
