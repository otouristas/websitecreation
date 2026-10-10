import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import {
  AgencyCtas,
  AnnouncePill,
  Container,
  HeroBackdrop,
  TrustLine,
  agencyTrust,
  type MarketingBadgeKind,
} from "@/components/kit";

export type Crumb = { readonly name: string; readonly url: string };

/**
 * Breadcrumb trail in the kit's quiet mono style. Same semantics as
 * components/seo/Breadcrumbs (nav + ol + aria-current), centred for heroes.
 * The BreadcrumbList schema stays with each page.
 */
export function KitBreadcrumbs({
  items,
  align = "center",
  className,
}: {
  readonly items: ReadonlyArray<Crumb>;
  readonly align?: "center" | "left";
  readonly className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[12.5px] text-muted-foreground", className)}>
      <ol className={cn("flex flex-wrap items-center gap-x-1 gap-y-1", align === "center" && "justify-center")}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.url}-${i}`} className="flex min-w-0 items-center gap-1">
              {i > 0 ? <ChevronRight className="size-3 shrink-0 text-muted-foreground/50" aria-hidden /> : null}
              {last ? (
                <span aria-current="page" className="max-w-[16rem] truncate text-foreground/85 sm:max-w-[28rem]">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="transition-colors hover:text-foreground">
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

export type HeroPill = {
  readonly href: string;
  readonly tag: string;
  readonly text: string;
  readonly kind?: MarketingBadgeKind;
};

/**
 * HeroCentered with breadcrumbs: the kit hero (grid backdrop, announce pill,
 * headline with a serif accent, lead, the two agency doors and the trust
 * line) plus the page's breadcrumb trail above the pill.
 *
 * `actions`/`trust` default to AgencyCtas and the agency trust line; pass
 * `null` to drop them (a page whose own form is the action). `size="md"`
 * is for long headlines (articles, tools), where 72px would break badly.
 */
export function PageHero({
  locale,
  breadcrumbs,
  pill,
  title,
  lead,
  actions,
  trust,
  meta,
  children,
  size = "lg",
  className,
}: {
  readonly locale: SiteLocale;
  readonly breadcrumbs?: ReadonlyArray<Crumb>;
  readonly pill?: HeroPill | ReactNode;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
  readonly actions?: ReactNode | null;
  readonly trust?: ReactNode | null;
  /** Small line under the lead (dates, notes). */
  readonly meta?: ReactNode;
  readonly children?: ReactNode;
  readonly size?: "lg" | "md";
  readonly className?: string;
}) {
  const pillNode =
    pill && typeof pill === "object" && "href" in (pill as HeroPill) && "tag" in (pill as HeroPill) ? (
      <AnnouncePill {...(pill as HeroPill)} />
    ) : (
      (pill as ReactNode)
    );
  const actionsNode = actions === undefined ? <AgencyCtas locale={locale} /> : actions;
  const trustNode = trust === undefined ? <TrustLine items={agencyTrust(locale)} /> : trust;

  return (
    <section className={cn("hero-below-header relative isolate overflow-hidden", className)}>
      <HeroBackdrop />
      <Container className="pt-2 text-center sm:pt-6">
        {breadcrumbs && breadcrumbs.length > 0 ? <KitBreadcrumbs items={breadcrumbs} className="mb-6" /> : null}
        {pillNode ? <div className="rise-in">{pillNode}</div> : null}
        <h1
          className={cn(
            "rise-in mx-auto text-balance font-display font-semibold text-foreground [animation-delay:60ms]",
            pillNode ? "mt-6" : "mt-2",
            size === "lg"
              ? "max-w-[18ch] text-[38px] leading-[1.04] tracking-[-0.045em] sm:max-w-4xl sm:text-[56px] lg:text-[68px]"
              : "max-w-4xl text-[32px] leading-[1.08] tracking-[-0.04em] sm:text-[44px] lg:text-[52px]",
          )}
        >
          {title}
        </h1>
        {lead ? (
          <p className="rise-in mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted-foreground [animation-delay:140ms] sm:text-[19px]">
            {lead}
          </p>
        ) : null}
        {meta ? <div className="rise-in mt-4 [animation-delay:180ms]">{meta}</div> : null}
        {actionsNode ? <div className="rise-in mt-8 [animation-delay:220ms]">{actionsNode}</div> : null}
        {trustNode ? <div className="rise-in mt-5 [animation-delay:260ms]">{trustNode}</div> : null}
      </Container>
      {children ? <div className="rise-in [animation-delay:320ms]">{children}</div> : null}
    </section>
  );
}
