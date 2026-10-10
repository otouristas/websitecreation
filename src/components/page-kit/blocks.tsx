import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import {
  AgencyCtas,
  Container,
  KitEyebrow,
  KitHeading,
  MarketingBadge,
  SoftwareCtas,
  type MarketingBadgeKind,
} from "@/components/kit";

/* ------------------------------------------------------------------ FAQ */

export type FaqItem = { readonly question: string; readonly answer: ReactNode };

/**
 * FAQ accordion in the kit's style. Native <details>, so every answer is in
 * the server HTML (the FAQPage schema each page emits must match visible
 * text) and it works without JavaScript. The first item starts open.
 */
export function KitFaq({
  items,
  title,
  eyebrow = "FAQ",
  description,
  id = "faq",
  className,
  bare = false,
}: {
  readonly items: ReadonlyArray<FaqItem>;
  readonly title: ReactNode;
  readonly eyebrow?: ReactNode;
  readonly description?: ReactNode;
  readonly id?: string;
  readonly className?: string;
  /** Render without the section wrapper and heading (inside an article). */
  readonly bare?: boolean;
}) {
  if (items.length === 0) return null;
  const list = (
    <div className={cn("divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface/60", !bare && "mx-auto mt-12 max-w-3xl")}>
      {items.map((f, i) => (
        <details key={f.question} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 text-left text-[15.5px] font-semibold leading-snug text-foreground transition-colors hover:text-brand sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="mt-0.5 font-mono text-[12px] font-medium text-brand">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{f.question}</span>
            <span
              aria-hidden
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-hairline text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand"
            >
              <Plus className="size-3.5" />
            </span>
          </summary>
          <div className="px-5 pb-6 pl-[3.25rem] text-[14.5px] leading-relaxed text-muted-foreground sm:px-6 sm:pl-[3.6rem]">{f.answer}</div>
        </details>
      ))}
    </div>
  );
  if (bare) return <div className={className}>{list}</div>;
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <Container>
        <KitHeading align="center" eyebrow={eyebrow} title={title} description={description} />
        {list}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ cards */

/** Link card: the hub tile used on index pages (industries, tools, posts). */
export function LinkCard({
  href,
  title,
  text,
  eyebrow,
  badge,
  footer,
  icon,
  as: Heading = "h3",
  className,
  children,
}: {
  readonly href: string;
  readonly title: ReactNode;
  readonly text?: ReactNode;
  readonly eyebrow?: ReactNode;
  readonly badge?: { kind: MarketingBadgeKind; label: string };
  readonly footer?: ReactNode;
  readonly icon?: ReactNode;
  readonly as?: "h2" | "h3";
  readonly className?: string;
  readonly children?: ReactNode;
}) {
  const external = href.startsWith("http");
  const cls = cn(
    "reveal group relative flex h-full flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface",
    className,
  );
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {icon ? (
            <span className="mb-4 flex size-9 items-center justify-center rounded-lg border border-hairline bg-background text-brand [&_svg]:size-4">
              {icon}
            </span>
          ) : null}
          {eyebrow ? <KitEyebrow className="mb-2.5 text-[11px]">{eyebrow}</KitEyebrow> : null}
          <Heading className="flex flex-wrap items-center gap-2 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-foreground">
            {title}
            {badge ? <MarketingBadge kind={badge.kind}>{badge.label}</MarketingBadge> : null}
          </Heading>
        </div>
        <ArrowUpRight
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>
      {text ? <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{text}</p> : <div className="flex-1" />}
      {children}
      {footer ? <div className="mt-5 border-t border-hairline pt-4 text-[13px] text-muted-foreground">{footer}</div> : null}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function CardGrid({ children, className, cols = 3 }: { readonly children: ReactNode; readonly className?: string; readonly cols?: 2 | 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Plain info card (no link): icon/eyebrow, title, text. */
export function InfoCard({
  title,
  text,
  eyebrow,
  icon,
  className,
  children,
  as: Heading = "h3",
}: {
  readonly title: ReactNode;
  readonly text?: ReactNode;
  readonly eyebrow?: ReactNode;
  readonly icon?: ReactNode;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly as?: "h2" | "h3" | "h4";
}) {
  return (
    <div className={cn("reveal flex h-full flex-col rounded-2xl border border-hairline bg-surface/60 p-6", className)}>
      {icon ? (
        <span className="mb-4 flex size-9 items-center justify-center rounded-lg border border-hairline bg-background text-brand [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      {eyebrow ? <KitEyebrow className="mb-2.5 text-[11px]">{eyebrow}</KitEyebrow> : null}
      <Heading className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-foreground">{title}</Heading>
      {text ? <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">{text}</p> : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ chips and related links */

export function ChipLinks({
  items,
  align = "left",
  className,
}: {
  readonly items: ReadonlyArray<{ href: string; label: ReactNode; key?: string }>;
  readonly align?: "left" | "center";
  readonly className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", align === "center" && "justify-center", className)}>
      {items.map((it) => (
        <li key={it.key ?? it.href}>
          <Link
            href={it.href}
            className="inline-flex min-h-9 items-center rounded-full border border-hairline bg-surface/70 px-3.5 py-1.5 text-[13.5px] text-foreground/85 transition-colors hover:border-brand/40 hover:text-foreground"
          >
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** "Related pages" block: a quiet heading and a grid of arrow links. */
export function RelatedLinks({
  title,
  items,
  className,
}: {
  readonly title: ReactNode;
  readonly items: ReadonlyArray<{ href: string; title: string; description?: string }>;
  readonly className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <KitEyebrow className="mb-4">{title}</KitEyebrow>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group flex h-full items-start justify-between gap-3 rounded-xl border border-hairline bg-surface/50 px-4 py-3 transition-colors hover:border-brand/40 hover:bg-surface"
            >
              <span className="min-w-0">
                <span className="block text-[14.5px] font-medium text-foreground">{it.title}</span>
                {it.description ? <span className="mt-1 line-clamp-2 block text-[13px] text-muted-foreground">{it.description}</span> : null}
              </span>
              <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ stats */

export function StatRow({
  items,
  className,
}: {
  readonly items: ReadonlyArray<{ value: string; label: string }>;
  readonly className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-2 overflow-hidden rounded-2xl border border-hairline bg-surface/60 sm:grid-cols-4", className)}>
      {items.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "px-5 py-6 text-center",
            i % 2 === 1 && "border-l border-hairline",
            i >= 2 && "border-t border-hairline sm:border-t-0",
            i === 2 && "sm:border-l",
          )}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-[32px] font-semibold tabular-nums leading-none tracking-[-0.04em] text-foreground sm:text-[38px]">{s.value}</dd>
          <dd className="mt-2 text-[13px] text-muted-foreground">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ strips */

type Copy = Record<SiteLocale, string>;
const c = (en: string, el: string): Copy => ({ en, el });

const DIY = {
  tag: c("Do it yourself", "Μόνοι σας"),
  title: c("Prefer to run it yourself? Use GSC Boost", "Προτιμάτε να το κάνετε μόνοι σας; Δοκιμάστε το GSC Boost"),
  body: c(
    "Our Search Console software, with its own monthly plans: it reads your data and hands you the fixes that win the most clicks, ranked and estimated. The same tool our team uses.",
    "Το λογισμικό μας για το Search Console, με δικά του μηνιαία πακέτα: διαβάζει τα δεδομένα σας και σας δίνει τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση. Το ίδιο εργαλείο που χρησιμοποιεί η ομάδα μας.",
  ),
  plans: c("See GSC Boost plans and prices", "Δείτε τα πακέτα και τις τιμές του GSC Boost"),
};

/**
 * The software door as a strip: GSC Boost as the do-it-yourself option, with
 * a link to its own pricing page. No plan figures here, so they live in one
 * place (/platform/pricing).
 */
export function DiyStrip({
  locale,
  source,
  className,
  title,
  body,
}: {
  readonly locale: SiteLocale;
  readonly source: string;
  readonly className?: string;
  readonly title?: ReactNode;
  readonly body?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "reveal grid gap-8 rounded-3xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center",
        className,
      )}
    >
      <div className="min-w-0">
        <KitEyebrow icon={<span className="size-1.5 rounded-full bg-signal" />} className="text-signal">
          {DIY.tag[locale]}
        </KitEyebrow>
        <h3 className="mt-3 text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[32px]">
          {title ?? DIY.title[locale]}
        </h3>
        <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{body ?? DIY.body[locale]}</p>
        <Link
          href={localizedPath(locale, "/platform/pricing")}
          className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-link underline-offset-4 hover:underline"
        >
          {DIY.plans[locale]}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <SoftwareCtas locale={locale} align="left" source={source} className="lg:!flex-col lg:!items-stretch" />
    </div>
  );
}

const AUDIT = {
  tag: c("Free audit first", "Πρώτα δωρεάν έλεγχος"),
  title: c("Not sure which package? Start with the free audit", "Δεν ξέρετε ποιο πακέτο; Ξεκινήστε με τον δωρεάν έλεγχο"),
  steps: [
    c("Send your website", "Στέλνετε την ιστοσελίδα σας"),
    c("Get the issues and what to fix first", "Παίρνετε τα προβλήματα και τι διορθώνεται πρώτο"),
    c("Receive a fixed price, then decide", "Λαμβάνετε σταθερή τιμή και αποφασίζετε"),
  ],
};

/** "Free audit first" strip: three numbered steps and the agency doors. */
export function AuditFirstStrip({ locale, className, title }: { readonly locale: SiteLocale; readonly className?: string; readonly title?: ReactNode }) {
  return (
    <div className={cn("reveal rounded-3xl border border-hairline bg-surface/60 p-6 sm:p-10", className)}>
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <KitEyebrow className="text-brand">{AUDIT.tag[locale]}</KitEyebrow>
          <h3 className="mt-3 text-balance font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[30px]">
            {title ?? AUDIT.title[locale]}
          </h3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {AUDIT.steps.map((s, i) => (
              <li key={s.en} className="flex items-start gap-3 text-[14.5px] leading-snug text-foreground/90">
                <span className="font-mono text-[12px] font-medium text-brand">{String(i + 1).padStart(2, "0")}</span>
                {s[locale]}
              </li>
            ))}
          </ol>
        </div>
        <AgencyCtas locale={locale} align="left" className="lg:!flex-col lg:!items-stretch" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ prose */

/** Typography wrapper for long-form text (legal pages, articles). */
export function KitProse({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={cn("markdown-body text-[16px] leading-[1.75]", className)}>{children}</div>;
}
