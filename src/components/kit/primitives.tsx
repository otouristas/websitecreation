import type { HTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The app landing page's design language (app.anotherseoguru.com), rebuilt on
 * the website's own tokens. Same rhythm and devices as the app: a 1200px
 * column, mono eyebrows with an icon, tight semibold headlines with one to
 * three serif italic accent words, check lists and product previews on a
 * dotted stage. Colours stay the site's navy, royal blue, cyan and lime.
 *
 * Everything here is a server component. Reveals use the site's CSS
 * scroll-driven `reveal` utility, so nothing depends on JavaScript.
 */

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...props} />;
}

/** Serif italic for one to three accent words in a headline. */
export function Accent({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <span className={cn("font-serif text-[1.08em] font-normal italic leading-none tracking-[-0.01em] text-brand", className)}>
      {children}
    </span>
  );
}

/** Small mono label above a section title, with an optional icon. */
export function KitEyebrow({
  children,
  icon,
  className,
}: {
  readonly children: ReactNode;
  readonly icon?: ReactNode;
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground [&_svg]:size-3.5",
        className,
      )}
    >
      {icon ? <span className="flex text-brand">{icon}</span> : null}
      {children}
    </div>
  );
}

export function KitHeading({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  size = "md",
  className,
  children,
}: {
  readonly eyebrow?: ReactNode;
  readonly eyebrowIcon?: ReactNode;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: "left" | "center";
  readonly as?: "h1" | "h2" | "h3";
  readonly size?: "md" | "lg";
  readonly className?: string;
  readonly children?: ReactNode;
}) {
  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <KitEyebrow icon={eyebrowIcon} className="mb-4">
          {eyebrow}
        </KitEyebrow>
      ) : null}
      <Tag
        className={cn(
          "text-balance font-display font-semibold tracking-[-0.035em] text-foreground",
          size === "lg"
            ? "text-[36px] leading-[1.05] sm:text-[52px] lg:text-[60px]"
            : "text-[30px] leading-[1.1] sm:text-[40px] lg:text-[44px]",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** Bulleted list with check marks (benefits, plan features). */
export function CheckList({
  items,
  className,
  size = "md",
}: {
  readonly items: ReadonlyArray<ReactNode>;
  readonly className?: string;
  readonly size?: "sm" | "md";
}) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-2.5 text-foreground/90",
            size === "sm" ? "text-[13px] leading-5" : "text-[15px] leading-6",
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand",
              size === "sm" ? "size-4 [&_svg]:size-2.5" : "size-5 [&_svg]:size-3",
            )}
            aria-hidden
          >
            <Check strokeWidth={3} />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The soft stage behind product previews: sunken surface, dotted texture, hairline border. */
export function Stage({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-hairline bg-surface/50 p-3 sm:p-5",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="kit-dots pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export type MarketingBadgeKind = "new" | "free" | "popular" | "ai" | "live" | "save";

const BADGE_CLASS: Record<MarketingBadgeKind, string> = {
  new: "bg-signal text-signal-foreground",
  free: "bg-brand/15 text-brand ring-1 ring-inset ring-brand/30",
  popular: "bg-primary/15 text-primary-glow ring-1 ring-inset ring-primary/35",
  ai: "bg-[linear-gradient(120deg,var(--primary),var(--brand))] text-primary-foreground",
  live: "bg-success/15 text-success ring-1 ring-inset ring-success/30",
  save: "bg-warning/15 text-warning ring-1 ring-inset ring-warning/30",
};

/**
 * Marketing indicator: the small uppercase tag beside a menu item or a card
 * title ("New", "Free", "Popular", "AI"). One component so every surface
 * uses the same five colours for the same five meanings.
 */
export function MarketingBadge({
  kind,
  children,
  className,
}: {
  readonly kind: MarketingBadgeKind;
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[18px] shrink-0 items-center rounded-full px-1.5 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.08em]",
        BADGE_CLASS[kind],
        className,
      )}
    >
      {kind === "live" ? <span aria-hidden className="mr-1 size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
