import Link from 'next/link';
import type { ReactNode } from 'react';
import { KitSection } from '@/components/kit';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import type { ServiceTopicEl } from '@/data/services-i18n';

/**
 * Keyword-map H2 topic blocks for Greek service pages.
 *
 * Each topic is a real H2 (the keyword map assigns specific H2 wording per
 * page), rendered as a card grid so a page can carry four or five of them
 * without turning into a wall of sections. Paragraphs may contain inline links
 * written as `[anchor](/path)`; paths are locale-less and get the page's
 * locale prefix here, so the anchor text the map asks for is what ships.
 */

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInlineLinks(text: string, locale: SiteLocale): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const href = m[2].startsWith('/') ? localizedPath(locale, m[2]) : m[2];
    out.push(
      <Link key={`${index}-${m[2]}`} href={href} className="font-medium text-link underline-offset-4 hover:underline">
        {m[1]}
      </Link>,
    );
    last = index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function TopicSections({
  topics,
  locale,
  tinted = false,
  id,
  className,
}: {
  readonly topics: readonly ServiceTopicEl[] | undefined;
  readonly locale: SiteLocale;
  readonly tinted?: boolean;
  readonly id?: string;
  readonly className?: string;
}) {
  if (!topics || topics.length === 0) return null;
  return (
    <KitSection tinted={tinted} id={id} className={className}>
      <div className={topics.length > 1 ? 'grid gap-5 md:grid-cols-2' : 'mx-auto max-w-3xl'}>
        {topics.map((topic) => (
          <article key={topic.title} className="reveal rounded-2xl border border-hairline bg-surface/60 p-6 sm:p-7">
            <h2 className="text-balance font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[24px]">
              {topic.title}
            </h2>
            {topic.paragraphs.map((para) => (
              <p key={para.slice(0, 48)} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {renderInlineLinks(para, locale)}
              </p>
            ))}
          </article>
        ))}
      </div>
    </KitSection>
  );
}
