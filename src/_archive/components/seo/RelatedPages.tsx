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
        <aside className={`bg-muted/30 rounded-2xl p-6 ${className}`}>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="space-y-3">
                {pages.map((page) => (
                    <Link
                        key={page.slug}
                        href={page.slug.startsWith('/') ? page.slug : `/${page.slug}`}
                        className="block p-4 rounded-xl bg-background border border-border hover:border-primary transition-colors group"
                    >
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                            {page.title}
                        </h4>
                        {page.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {page.description}
                            </p>
                        )}
                    </Link>
                ))}
            </div>
        </aside>
    );
}
