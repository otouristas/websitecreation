import Link from 'next/link';
import type { BlogPostListItem } from '@/lib/blog';
import { normalizePillar } from '@/lib/blog';
import { getPillarCopy } from '@/data/blog-pillars';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/** Article card for the archive and hub grids. */
export function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: BlogPostListItem;
  locale: SiteLocale;
  featured?: boolean;
}) {
  const isEl = locale === 'el';
  const pillar = normalizePillar(post.pillar);
  const pillarCopy = pillar ? getPillarCopy(pillar, locale) : undefined;

  return (
    <article className={`group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-surface-raised ${featured ? 'md:p-9' : ''}`}>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {pillarCopy ? (
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
            {pillarCopy.title}
          </span>
        ) : null}
        <span className="text-[11px] text-muted-foreground">
          {post.readingTime} {isEl ? 'λεπτά' : 'min'}
        </span>
      </div>

      <h3
        className={`font-display font-medium tracking-[-0.02em] text-foreground ${
          featured ? 'text-2xl md:text-3xl' : 'text-lg'
        }`}
      >
        <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className={`mt-3 flex-1 leading-relaxed text-muted-foreground ${featured ? 'text-base' : 'text-sm'}`}>
        {post.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-[11px] text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(isEl ? 'el-GR' : 'en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>
        <span className="text-brand transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </article>
  );
}
