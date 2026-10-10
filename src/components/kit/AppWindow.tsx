import type { ReactNode } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A framed "app window": browser chrome, hairline border and the site's
 * frame halo. The body is a static preview and is hidden from assistive tech;
 * `label` describes it instead. With `href`, the whole window becomes a link
 * with a hover CTA, as on the app's landing page.
 */
export function AppWindow({
  children,
  url = "app.anotherseoguru.com",
  badge,
  className,
  bodyClassName,
  label,
  href,
  ctaLabel,
}: {
  readonly children: ReactNode;
  readonly url?: string;
  readonly badge?: ReactNode;
  readonly className?: string;
  readonly bodyClassName?: string;
  readonly label: string;
  readonly href?: string;
  readonly ctaLabel?: string;
}) {
  return (
    <figure
      className={cn(
        "group/window frame-halo relative overflow-hidden rounded-xl border border-hairline bg-background text-left sm:rounded-2xl",
        className,
      )}
    >
      <figcaption className="sr-only">{label}</figcaption>
      <div className="relative flex h-9 items-center gap-3 border-b border-hairline bg-surface px-3 sm:h-10 sm:px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div
          className="absolute left-1/2 flex h-6 max-w-[55%] -translate-x-1/2 items-center gap-1.5 truncate rounded-md border border-hairline bg-background px-2.5 text-[11px] text-muted-foreground sm:px-3 sm:text-[12px]"
          aria-hidden
        >
          <Lock className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        {badge ? <div className="ml-auto hidden sm:block">{badge}</div> : null}
      </div>
      <div aria-hidden className={cn("pointer-events-none select-none", bodyClassName)}>
        {children}
      </div>
      {href ? (
        <a
          href={href}
          className="absolute inset-0 top-9 z-10 flex items-end justify-center pb-6 focus-visible:outline-none sm:top-10 sm:pb-10"
          aria-label={ctaLabel ? `${ctaLabel}: ${label}` : label}
        >
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/0 to-transparent opacity-0 transition-opacity duration-300 group-hover/window:opacity-100 group-focus-within/window:opacity-100"
          />
          {ctaLabel ? (
            <span className="relative inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background opacity-0 shadow-lg transition-all duration-300 group-hover/window:translate-y-0 group-hover/window:opacity-100 group-focus-within/window:translate-y-0 group-focus-within/window:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
              {ctaLabel}
              <ArrowRight className="size-3.5" />
            </span>
          ) : null}
        </a>
      ) : null}
    </figure>
  );
}

/** Lighter frame for feature previews: one card, no browser chrome. */
export function PreviewFrame({
  children,
  className,
  label,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly label: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <figcaption className="sr-only">{label}</figcaption>
      <div aria-hidden className="pointer-events-none select-none">
        {children}
      </div>
    </figure>
  );
}

/** The app's card: surface, hairline border, a header row and a body. */
export function PCard({
  title,
  subtitle,
  icon,
  meta,
  children,
  footer,
  className,
}: {
  readonly title?: ReactNode;
  readonly subtitle?: ReactNode;
  readonly icon?: ReactNode;
  readonly meta?: ReactNode;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-hairline bg-surface text-[13px] shadow-[0_1px_0_0_oklch(1_0_0/4%)_inset]", className)}>
      {title ? (
        <div className="flex items-start justify-between gap-3 border-b border-hairline px-4 py-3">
          <div className="flex min-w-0 items-start gap-2">
            {icon ? <span className="mt-0.5 text-brand [&_svg]:size-4">{icon}</span> : null}
            <div className="min-w-0">
              <div className="truncate font-semibold text-foreground">{title}</div>
              {subtitle ? <div className="truncate text-[12px] text-muted-foreground">{subtitle}</div> : null}
            </div>
          </div>
          {meta ? (
            <span className="shrink-0 rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
      {footer ? <div className="border-t border-hairline px-4 py-3">{footer}</div> : null}
    </div>
  );
}
