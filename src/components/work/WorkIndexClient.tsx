'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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

  const chip = (on: boolean) =>
    `inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
      on ? 'border-brand/50 bg-brand/15 text-foreground' : 'border-hairline bg-surface/70 text-muted-foreground hover:border-brand/40 hover:text-foreground'
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
            className={`rounded-full px-3 py-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.06em] transition-colors ${
              market === m ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {m === 'all' ? (isEl ? 'Όλες οι αγορές' : 'All markets') : m}
          </button>
        ))}
        <span className="ml-auto font-mono text-[12px] text-muted-foreground">{filtered.length}</span>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const cat = PORTFOLIO_CATEGORIES[project.category];
          return (
            <Link
              key={project.slug}
              href={lp(`/work/${project.slug}`)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/60 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface">
                <PortfolioThumbnail src={project.screenshot} alt={project.name} />
                <span className="absolute bottom-3 left-3 rounded-full border border-hairline bg-background/90 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-foreground/85 backdrop-blur">
                  {isEl ? cat.labelEl : cat.label}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[16px] font-semibold text-foreground">{project.name}</h2>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                </div>
                <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
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
