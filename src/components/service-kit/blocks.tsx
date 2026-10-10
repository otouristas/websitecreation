import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import FAQSection from '@/components/seo/FAQSection';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import { PriceCard } from '@/components/pricing/PriceCard';
import { CheckList, KitEyebrow, KitHeading, Stage } from '@/components/kit/primitives';
import { KitSection, SoftwareCtas } from '@/components/kit/sections';
import { PreviewFrame } from '@/components/kit/AppWindow';
import { FollowThroughMini, OpportunitiesPreview, PlanMini } from '@/components/kit/previews';
import { addOns, formatPrice, seoPackages, websitePackages } from '@/data/pricing';
import type { PortfolioProject } from '@/data/portfolio';
import { cn } from '@/lib/cn';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/* ------------------------------------------------------------------ cards */

/** Title + text cards (definitions, deliverables, audiences). Optional link per card. */
export function CardGrid({
  items,
  cols = 3,
  locale,
  className,
}: {
  readonly items: ReadonlyArray<{ title: string; body: string; href?: string }>;
  readonly cols?: 2 | 3;
  /** Needed when items carry unlocalised hrefs. */
  readonly locale?: SiteLocale;
  readonly className?: string;
}) {
  return (
    <div className={cn('grid gap-4', cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2', className)}>
      {items.map((item, i) => {
        const inner = (
          <>
            <span className="font-mono text-[12px] font-medium text-brand">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 flex items-start justify-between gap-3 text-[17px] font-semibold tracking-[-0.01em] text-foreground">
              {item.title}
              {item.href ? (
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
              ) : null}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{item.body}</p>
          </>
        );
        const cls =
          'reveal group flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors';
        return item.href ? (
          <Link
            key={item.title}
            href={locale ? localizedPath(locale, item.href) : item.href}
            className={cn(cls, 'hover:border-brand/40 hover:bg-surface')}
          >
            {inner}
          </Link>
        ) : (
          <div key={item.title} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/** Numbered process: one card per step, mono number, title and optional text. */
export function ProcessGrid({
  steps,
  className,
}: {
  readonly steps: ReadonlyArray<{ title: string; body?: string }>;
  readonly className?: string;
}) {
  return (
    <ol
      className={cn(
        'grid gap-4 sm:grid-cols-2',
        steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        className,
      )}
    >
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="reveal relative flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6"
          style={{ ['--rv' as string]: `${(i % 3) * 5}%` }}
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-background font-mono text-[12px] font-medium text-brand">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 text-[16px] font-semibold leading-snug text-foreground">{s.title}</h3>
          {s.body ? <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}

/** Pill links (cities, industries, neighbourhoods). */
export function ChipLinks({
  items,
  className,
}: {
  readonly items: ReadonlyArray<{ href?: string; label: string }>;
  readonly className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((c) => (
        <li key={(c.href ?? '') + c.label}>
          {c.href ? (
            <Link
              href={c.href}
              className="inline-flex min-h-10 items-center rounded-full border border-hairline bg-surface/70 px-4 text-[14px] text-foreground/85 transition-colors hover:border-brand/45 hover:text-foreground"
            >
              {c.label}
            </Link>
          ) : (
            <span className="inline-flex min-h-10 items-center rounded-full border border-hairline bg-surface/50 px-4 text-[14px] text-muted-foreground">
              {c.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Linked cards with a short description (related services). */
export function LinkCards({
  items,
  className,
}: {
  readonly items: ReadonlyArray<{ href: string; title: string; body?: string }>;
  readonly className?: string;
}) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="reveal group flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface"
        >
          <span className="flex items-start justify-between gap-3 text-[16px] font-semibold text-foreground">
            {it.title}
            <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
          </span>
          {it.body ? <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground">{it.body}</span> : null}
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ proof */

export function ProofGrid({
  projects,
  locale,
  thumbnails = true,
  className,
}: {
  readonly projects: ReadonlyArray<PortfolioProject>;
  readonly locale: SiteLocale;
  readonly thumbnails?: boolean;
  readonly className?: string;
}) {
  const isEl = locale === 'el';
  return (
    <ul className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {projects.map((p) => (
        <li key={p.slug} className="reveal">
          <Link
            href={localizedPath(locale, `/work/${p.slug}`)}
            className="group block h-full overflow-hidden rounded-2xl border border-hairline bg-surface/70 transition-colors hover:border-brand/40"
          >
            {thumbnails ? (
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface">
                <PortfolioThumbnail
                  src={p.screenshot}
                  alt={p.name}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ) : null}
            <span className="block p-5">
              <span className="flex items-center justify-between gap-3 text-[15px] font-semibold text-foreground">
                {p.name}
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
              </span>
              <span className="mt-1.5 line-clamp-2 block text-[13.5px] leading-relaxed text-muted-foreground">
                {isEl && p.summaryEl ? p.summaryEl : p.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ pricing */

/** Package cards straight from src/data/pricing.ts. */
export function PriceTiers({
  kind,
  locale,
  className,
}: {
  readonly kind: 'seo' | 'website';
  readonly locale: SiteLocale;
  readonly className?: string;
}) {
  const tiers = kind === 'seo' ? seoPackages : websitePackages;
  return (
    <div className={cn('grid gap-6 md:grid-cols-3', className)}>
      {tiers.map((tier) => (
        <PriceCard key={tier.id} tier={tier} locale={locale} recurring={kind === 'seo'} />
      ))}
    </div>
  );
}

/** "From" prices for one-off add-ons (audits, logo, e-commerce). */
export function AddOnCards({
  ids,
  locale,
  className,
}: {
  readonly ids: ReadonlyArray<string>;
  readonly locale: SiteLocale;
  readonly className?: string;
}) {
  const isEl = locale === 'el';
  const items = addOns.filter((a) => ids.includes(a.id));
  if (items.length === 0) return null;
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {items.map((a) => (
        <div key={a.id} className="reveal flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface/70 p-5">
          <span className="text-[15px] font-semibold text-foreground">{isEl ? a.nameEl : a.nameEn}</span>
          <span className="shrink-0 text-right">
            <span className="block text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{isEl ? 'από' : 'from'}</span>
            <span className="font-display text-[22px] font-semibold tabular-nums text-foreground">
              €{formatPrice(a.from, locale)}
            </span>
            <span className="text-[12px] text-muted-foreground">
              {a.recurring ? (isEl ? '/μήνα' : '/mo') : ''} {isEl ? '+ ΦΠΑ' : '+ VAT'}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ FAQ */

/** Kit heading over the existing FAQ accordion (answers stay in the DOM). */
export function FaqBlock({
  locale,
  title,
  eyebrow,
  faqs,
  id = 'faq',
  tinted = false,
}: {
  readonly locale: SiteLocale;
  readonly title: ReactNode;
  readonly eyebrow?: string;
  readonly faqs: ReadonlyArray<{ question: string; answer: string }>;
  readonly id?: string;
  readonly tinted?: boolean;
}) {
  if (faqs.length === 0) return null;
  return (
    <KitSection id={id} tinted={tinted}>
      <div className="mx-auto max-w-3xl">
        <KitHeading align="center" eyebrow={eyebrow ?? (locale === 'el' ? 'Ερωτήσεις' : 'Questions')} title={title} />
        <FAQSection faqs={[...faqs]} title="" locale={locale} className="!pb-0 !pt-10" />
      </div>
    </KitSection>
  );
}

/* ------------------------------------------------------------------ GSC Boost */

const DIY = {
  eyebrow: { en: 'Do it yourself', el: 'Μόνοι σας' },
  title: { en: 'Prefer to do it yourself?', el: 'Προτιμάτε να το κάνετε μόνοι σας;' },
  accent: { en: 'Use GSC Boost', el: 'Δοκιμάστε το GSC Boost' },
  body: {
    en: 'GSC Boost is the software our team runs every client on. Connect Search Console read-only and it hands you the fixes that win the most clicks, ranked and estimated.',
    el: 'Το GSC Boost είναι το λογισμικό με το οποίο δουλεύει η ομάδα μας κάθε πελάτη. Συνδέετε το Search Console μόνο για ανάγνωση και σας δίνει τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση.',
  },
  bullets: {
    en: ['Fixes ranked by the clicks they could bring', 'Built on your own Search Console data', 'Free to start, no card for the demo'],
    el: ['Διορθώσεις με σειρά βάσει των κλικ που φέρνουν', 'Με βάση τα δικά σας δεδομένα Search Console', 'Δωρεάν έναρξη, χωρίς κάρτα για την επίδειξη'],
  },
  more: { en: 'See what GSC Boost does', el: 'Δείτε τι κάνει το GSC Boost' },
} as const;

/**
 * The quiet "Prefer to do it yourself?" row for SEO, audit, AI-visibility and
 * content pages: lime eyebrow, three checks, the software CTAs and a preview.
 */
export function DiyRow({
  locale,
  source,
  preview,
  body,
  flip = true,
  className,
}: {
  readonly locale: SiteLocale;
  readonly source: string;
  readonly preview?: ReactNode;
  readonly body?: string;
  readonly flip?: boolean;
  readonly className?: string;
}) {
  const l = locale;
  return (
    <KitSection tinted className={className} id="gsc-boost">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className={cn('reveal min-w-0', flip && 'lg:order-2')}>
          <KitEyebrow icon={<span className="size-1.5 rounded-full bg-signal" />} className="mb-4 text-signal">
            {DIY.eyebrow[l]} · GSC Boost
          </KitEyebrow>
          <h2 className="text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[36px]">
            {DIY.title[l]}{' '}
            <span className="font-serif text-[1.08em] font-normal italic leading-none tracking-[-0.01em] text-signal">
              {DIY.accent[l]}
            </span>
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">{body ?? DIY.body[l]}</p>
          <CheckList items={DIY.bullets[l]} className="mt-6" />
          <SoftwareCtas locale={l} align="left" source={source} className="mt-8" />
          <p className="mt-4 text-[13px] text-muted-foreground">
            <Link href={localizedPath(l, '/platform')} className="inline-flex items-center gap-1 underline decoration-hairline underline-offset-4 hover:text-foreground">
              {DIY.more[l]}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </p>
        </div>
        <div className={cn('reveal min-w-0 [--rv:8%]', flip && 'lg:order-1')}>
          <Stage>
            <PreviewFrame label={DIY.body[l]}>
              {preview ?? (
                <div className="grid gap-3">
                  <OpportunitiesPreview locale={l} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PlanMini locale={l} />
                    <FollowThroughMini locale={l} />
                  </div>
                </div>
              )}
            </PreviewFrame>
          </Stage>
        </div>
      </div>
    </KitSection>
  );
}
