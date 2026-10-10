import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPillarCopy } from '@/data/blog-pillars';
import type { PillarSummary } from '@/lib/blog';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/** The six pillar hubs, as the archive's primary navigation. */
export function PillarGrid({
  pillars,
  locale,
  currentSlug,
}: {
  pillars: readonly PillarSummary[];
  locale: SiteLocale;
  currentSlug?: string;
}) {
  const isEl = locale === 'el';
  const items = pillars.filter((p) => p.pillar !== currentSlug);
  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const copy = getPillarCopy(p.pillar, locale);
        if (!copy) return null;
        return (
          <Link
            key={p.pillar}
            href={localizedPath(locale, `/blog/topics/${p.pillar}`)}
            className="reveal group flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-foreground">
                {copy.title}
              </h3>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                aria-hidden
              />
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{copy.intro}</p>
            <span className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-brand">
              {p.count} {isEl ? 'άρθρα' : 'articles'}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
