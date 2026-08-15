'use client';

import { useEffect, useState } from 'react';
import type { BlogHeading } from '@/lib/blog';

/**
 * Sticky TOC with scroll-spy.
 *
 * Anchors come from `extractHeadings` server-side and the rendered heading ids
 * come from `rehypeHeadingIds` - both use the same `slugifyHeading`, so Greek
 * headings resolve identically on both sides.
 */
export function TableOfContents({
  headings,
  label,
}: {
  headings: readonly BlogHeading[];
  label: string;
}) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label={label} className="scrollbar-none max-h-[calc(100vh-9rem)] overflow-y-auto">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">{label}</p>
      <ul className="space-y-1 border-l border-hairline">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-1.5 text-[13px] leading-snug transition-colors ${
                h.depth === 3 ? 'pl-6' : 'pl-4'
              } ${
                active === h.id
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-hairline hover:text-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
