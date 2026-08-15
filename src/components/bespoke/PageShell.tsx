import type { CSSProperties, ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { cn } from '@/lib/cn';
import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * The spine every bespoke service and industry page sits on.
 *
 * These 43 pages each own their layout, but they must still read as 43 pages of
 * ONE site. So everything that carries brand identity - header, footer, tokens,
 * type scale, schema plumbing - lives here and is never forked. What the shell
 * deliberately does NOT impose is any section structure: `children` is free
 * markup, which is the whole point of the rebuild.
 *
 * `signatureHue` is an oklch hue angle. Keep it in the 150-290 band so accents
 * stay in the brand family (green -> teal -> blue -> indigo). Only the hue is
 * settable; lightness and chroma come from the theme, so a page is correct in
 * both light and dark without declaring anything twice.
 */
export function PageShell({
  locale,
  signatureHue,
  schemas,
  children,
  className,
  gridClassName = 'blueprint-grid',
}: {
  locale: SiteLocale;
  signatureHue: number;
  schemas: Parameters<typeof SchemaMarkup>[0]['schemas'];
  children: ReactNode;
  className?: string;
  /** Swap the page ground: 'blueprint-grid', 'rule-sheet', or '' for none. */
  gridClassName?: string;
}) {
  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main
        style={{ '--signature-h': String(signatureHue) } as CSSProperties}
        className={cn('relative z-0', gridClassName, className)}
      >
        {children}
      </main>
      <StickyMobileCta />
      <Footer locale={locale} />
    </>
  );
}

/**
 * Breadcrumb row positioned under the floating header pill. Bespoke heroes vary
 * wildly, so this is opt-in rather than baked into the shell.
 */
export function ShellCrumbs({
  items,
  className,
}: {
  items: { name: string; url: string }[];
  className?: string;
}) {
  return <Breadcrumbs items={items} className={cn('mb-6', className)} />;
}
