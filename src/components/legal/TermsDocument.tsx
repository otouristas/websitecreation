import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/kit';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type TermsBlock =
  | { readonly kind: 'p'; readonly text: string }
  | { readonly kind: 'list'; readonly items: readonly string[] };

export type TermsDocumentCopy = {
  readonly title: string;
  readonly lastUpdated: string;
  readonly eyebrow: string;
  readonly tocLabel: string;
  readonly skipLabel: string;
  readonly intro: string;
  readonly sections: readonly {
    readonly id: string;
    readonly heading: string;
    readonly blocks: readonly TermsBlock[];
  }[];
};

const linkClass =
  'font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

function headingParts(heading: string): { readonly num: string; readonly title: string } {
  const match = /^(\d+)\.\s+(.+)$/.exec(heading);
  if (!match) return { num: '', title: heading };
  return { num: match[1] ?? '', title: match[2] ?? heading };
}

function LegalAnchor({
  href,
  label,
  locale,
}: {
  readonly href: string;
  readonly label: string;
  readonly locale: SiteLocale;
}) {
  if (href.startsWith('mailto:')) {
    return (
      <a className={linkClass} href={href}>
        {label}
      </a>
    );
  }
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link className={linkClass} href={localizedPath(locale, href)}>
        {label}
      </Link>
    );
  }
  return <>{label}</>;
}

function Inline({ text, locale }: { readonly text: string; readonly locale: SiteLocale }) {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(<strong key={index}>{token.slice(2, -2)}</strong>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (link) {
        nodes.push(
          <LegalAnchor key={index} href={link[2] ?? ''} label={link[1] ?? token} locale={locale} />,
        );
      }
    }
    last = index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function Blocks({
  blocks,
  locale,
}: {
  readonly blocks: readonly TermsBlock[];
  readonly locale: SiteLocale;
}) {
  return (
    <div className="mt-4 space-y-4 text-[16.5px] leading-[1.75] text-muted-foreground sm:text-[17px] [&_strong]:font-semibold [&_strong]:text-foreground">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'p':
            return (
              <p key={index}>
                <Inline locale={locale} text={block.text} />
              </p>
            );
          case 'list':
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 marker:text-brand">
                {block.items.map((item) => (
                  <li key={item}>
                    <Inline locale={locale} text={item} />
                  </li>
                ))}
              </ul>
            );
          default: {
            const unreachable: never = block;
            return unreachable;
          }
        }
      })}
    </div>
  );
}

export function TermsDocument({
  locale,
  terms,
}: {
  readonly locale: SiteLocale;
  readonly terms: TermsDocumentCopy;
}) {
  return (
    <Container className="hero-below-header pb-28 lg:pb-24">
      <header className="max-w-[68ch]">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand">{terms.eyebrow}</p>
        <h1 className="mt-3 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[48px]">
          {terms.title}
        </h1>
        <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {terms.lastUpdated}
        </p>
        <p className="mt-6 text-[17px] leading-[1.7] text-foreground/80">{terms.intro}</p>
      </header>

      <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <nav
          aria-label={terms.tocLabel}
          className="mb-10 rounded-2xl border border-hairline bg-surface/70 p-4 sm:p-5 lg:sticky lg:top-[calc(var(--site-header-height)+1.25rem)] lg:mb-0 lg:max-h-[calc(100vh-var(--site-header-height)-2.5rem)] lg:overflow-y-auto"
        >
          <a
            href="#terms-body"
            className="sr-only focus:not-sr-only focus:mb-3 focus:inline-block focus:font-medium focus:text-foreground focus:underline"
          >
            {terms.skipLabel}
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{terms.tocLabel}</p>
          <ol className="mt-3 border-t border-hairline pt-2">
            {terms.sections.map((section) => {
              const { num, title } = headingParts(section.heading);
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-lg px-1.5 py-1.5 text-[13.5px] leading-snug text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="mt-0.5 w-6 shrink-0 font-mono text-[11px] font-medium text-brand">{num}</span>
                    <span>{title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <article id="terms-body" className="min-w-0 max-w-[68ch]">
          {terms.sections.map((section) => {
            const { num, title } = headingParts(section.heading);
            return (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-[calc(var(--site-header-height)+1.25rem)] border-t border-hairline py-8 sm:py-10"
              >
                <h2
                  id={`${section.id}-title`}
                  className="font-display text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.03em] text-foreground sm:text-[1.65rem]"
                >
                  <span className="mb-1.5 block font-mono text-[12px] font-medium tracking-[0.14em] text-brand">{num}</span>
                  {title}
                </h2>
                <Blocks blocks={section.blocks} locale={locale} />
              </section>
            );
          })}
        </article>
      </div>
    </Container>
  );
}
