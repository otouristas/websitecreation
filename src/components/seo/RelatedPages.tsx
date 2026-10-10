/**
 * Related Pages Component
 * Shows related content cards for internal linking
 */

import Link from 'next/link';

interface RelatedPage {
    slug: string;
    title: string;
    description?: string;
}

interface RelatedPagesProps {
    pages: RelatedPage[];
    title?: string;
    className?: string;
}

/**
 * Related pages section for hub-spoke internal linking
 */
export default function RelatedPages({
    pages,
    title = 'Related Articles',
    className = '',
}: RelatedPagesProps) {
    if (!pages || pages.length === 0) {
        return null;
    }

    return (
        <aside className={`rounded-2xl border border-hairline bg-surface/50 p-5 sm:p-6 ${className}`}>
            <h3 className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{title}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
                {pages.map((page) => (
                    <Link
                        key={page.slug}
                        href={page.slug.startsWith('/') ? page.slug : `/${page.slug}`}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-hairline bg-background/60 px-4 py-3 transition-colors hover:border-brand/45 hover:bg-surface"
                    >
                        <span className="min-w-0">
                            <span className="block text-[14.5px] font-medium text-foreground transition-colors group-hover:text-link">
                                {page.title}
                            </span>
                            {page.description && (
                                <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                                    {page.description}
                                </span>
                            )}
                        </span>
                        <span aria-hidden className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
