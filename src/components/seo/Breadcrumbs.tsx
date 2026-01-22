/**
 * Breadcrumbs Component
 * Visual navigation with semantic HTML for accessibility
 */

import Link from 'next/link';
import type { Breadcrumb } from '@/lib/types/page';

interface BreadcrumbsProps {
    items: Breadcrumb[];
    className?: string;
}

/**
 * Breadcrumb navigation component
 * Uses semantic <nav> with aria-label for accessibility
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center text-sm text-muted-foreground ${className}`}
        >
            <ol className="flex items-center flex-wrap gap-1">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.url} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-muted-foreground/50">/</span>
                            )}
                            {isLast ? (
                                <span className="text-foreground font-medium" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
