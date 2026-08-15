import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPillarCopy } from '@/data/blog-pillars';
import type { PillarSummary } from '@/lib/blog';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { MeshGrid } from '@/components/landing/primitives';

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
    <MeshGrid className="sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const copy = getPillarCopy(p.pillar, locale);
        if (!copy) return null;
        return (
          <Link
            key={p.pillar}
            href={localizedPath(locale, `/blog/topics/${p.pillar}`)}
            className="group flex flex-col bg-surface p-7 transition-colors hover:bg-surface-raised"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                {copy.title}
              </h3>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden
              />
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{copy.intro}</p>
            <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
              {p.count} {isEl ? 'άρθρα' : 'articles'}
            </span>
          </Link>
        );
      })}
    </MeshGrid>
  );
}
