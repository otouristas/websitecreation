import type { ReactNode } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { AnnouncePill, AgencyCtas, HeroCentered, TrustLine, agencyTrust } from '@/components/kit/sections';
import { Accent, Stage, type MarketingBadgeKind } from '@/components/kit/primitives';
import { PreviewFrame } from '@/components/kit/AppWindow';
import { cn } from '@/lib/cn';
import type { SiteLocale } from '@/lib/i18n/locale';
import { AccentTitle } from './accent-title';

export type HeroLink = { readonly href: string; readonly label: string };

/**
 * Centered service hero in the app-landing layout: breadcrumbs, announce
 * pill, the page's existing H1 with its closing phrase in the serif accent,
 * the existing answer-first paragraph, the agency CTAs, the trust line, then
 * a product preview on a dotted stage that fits the service.
 *
 * Long H1s (the bespoke pages carry full keyword sentences) step down a size
 * so they stay readable instead of filling the screen.
 */
export function ServiceHero({
  locale,
  breadcrumbs,
  pill,
  h1,
  h1Accent,
  lead,
  extra,
  primaryLabel,
  primaryHref,
  links,
  visual,
  visualLabel,
  caption,
  wideVisual = false,
}: {
  readonly locale: SiteLocale;
  readonly breadcrumbs: { name: string; url: string }[];
  readonly pill?: { kind: MarketingBadgeKind; tag: string; text: string; href: string };
  readonly h1: string;
  /** Closing phrase to set in the accent; must be a suffix of `h1`. Defaults to splitForAccent. */
  readonly h1Accent?: string;
  readonly lead: ReactNode;
  /** A second paragraph under the lead (kept for pages that had one). */
  readonly extra?: ReactNode;
  readonly primaryLabel?: string;
  readonly primaryHref?: string;
  /** Quiet text links under the CTAs (pricing, locations...). */
  readonly links?: ReadonlyArray<HeroLink>;
  readonly visual?: ReactNode;
  readonly visualLabel?: string;
  readonly caption?: ReactNode;
  readonly wideVisual?: boolean;
}) {
  const long = h1.length > 58;
  return (
    <HeroCentered
      pill={
        <div className="flex flex-col items-center gap-5">
          <Breadcrumbs items={breadcrumbs} className="justify-center text-[13px] [&_ol]:justify-center" />
          {pill ? <AnnouncePill href={pill.href} kind={pill.kind} tag={pill.tag} text={pill.text} /> : null}
        </div>
      }
      title={
        <span
          className={cn(
            'block',
            long && 'text-[32px] leading-[1.08] sm:text-[48px] lg:text-[56px]',
          )}
        >
          {h1Accent && h1.endsWith(h1Accent) && h1.length > h1Accent.length ? (
            <>
              {h1.slice(0, h1.length - h1Accent.length).trimEnd()} <Accent>{h1Accent}</Accent>
            </>
          ) : (
            <AccentTitle text={h1} />
          )}
        </span>
      }
      lead={
        <>
          {lead}
          {extra ? <span className="mt-4 block text-[15px] sm:text-[16px]">{extra}</span> : null}
        </>
      }
      actions={
        <>
          <AgencyCtas locale={locale} primaryLabel={primaryLabel} primaryHref={primaryHref} />
          {links && links.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium">
              {links.map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="text-foreground/75 underline decoration-hairline underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ) : null}
        </>
      }
      trust={<TrustLine items={agencyTrust(locale)} />}
    >
      {visual ? (
        <div className={cn('mx-auto mt-14 w-full px-4 sm:px-8', wideVisual ? 'max-w-[1080px]' : 'max-w-[860px]')}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[6%] -top-[12%] -z-10 h-[60%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_30%,transparent),transparent)] blur-3xl"
            />
            <Stage className="frame-halo">
              <PreviewFrame label={visualLabel ?? ''}>{visual}</PreviewFrame>
            </Stage>
          </div>
          {caption ? <p className="mt-4 text-center text-[13px] text-muted-foreground">{caption}</p> : null}
        </div>
      ) : null}
    </HeroCentered>
  );
}
