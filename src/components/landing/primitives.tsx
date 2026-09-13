import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

/**
 * Shared building blocks for every marketing surface.
 *
 * Royal blue leads on actions, cyan carries the accent (eyebrows, ticks,
 * numerals), signal green is reserved for proof states. Sections across the
 * whole site compose these rather than hand-rolling spacing and type - that
 * consistency is what makes the site read as one system instead of thirty
 * templates.
 */

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24", className)}
    >
      {children}
    </section>
  );
}

/** Uppercase mono micro-label. The cyan dot is the brand's punctuation. */
export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand",
        className,
      )}
    >
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-brand" /> : null}
      {children}
    </span>
  );
}

/** Mono numeral for numbered rows: 01, 02, 03. */
export function Numeral({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] tracking-[0.18em] text-brand", className)}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground">
        {title}
      </Tag>
      {body ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{body}</p>
      ) : null}
    </div>
  );
}

/** Glass card. `interactive` lights the border on hover. */
export function Panel({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-colors",
        interactive && "hover:border-brand/40",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The hairline mesh: a grid whose 1px gaps expose the hairline background, so
 * cells are divided by rules without any borders on the cells themselves.
 * Children should carry `bg-surface`.
 */
export function MeshGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Bento: a 12-column grid of glass cells with spotlight borders. Cells choose
 * their span with `className` (`lg:col-span-6 lg:row-span-2`). On phones the
 * grid collapses to one column.
 */
export function Bento({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12", className)}>
      {children}
    </div>
  );
}

export function BentoCell({
  children,
  className,
  href,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  padded?: boolean;
}) {
  const inner = cn(
    "glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-colors",
    padded && "p-6 md:p-7",
    href && "group hover:border-brand/40",
  );

  return (
    <SpotlightCard className={cn("rounded-2xl", className)}>
      {href ? (
        <Link href={href} className={inner}>
          {children}
        </Link>
      ) : (
        <div className={inner}>{children}</div>
      )}
    </SpotlightCard>
  );
}

/** Mono ticker line: short facts separated by cyan dots. */
export function Kicker({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
    >
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-3">
          {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-brand/70" /> : null}
          {item}
        </span>
      ))}
    </p>
  );
}

const primaryBtnClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-sm font-semibold text-primary-foreground bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_35%,transparent),0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[inset_0_1px_0_0_oklch(1_0_0/22%),0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_55%,transparent),0_16px_40px_-14px_color-mix(in_oklab,var(--primary)_90%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const ghostBtnClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-hairline bg-surface/60 px-6 font-display text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-brand/50 hover:bg-surface-raised/80";

export { primaryBtnClass, ghostBtnClass };

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn(primaryBtnClass, className)}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn(ghostBtnClass, className)}>
      {children}
    </button>
  );
}

export function PrimaryButtonLink({
  children,
  className,
  href,
  ...props
}: { href: string } & Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} {...props} className={cn(primaryBtnClass, className)}>
      {children}
    </Link>
  );
}

export function GhostButtonLink({
  children,
  className,
  href,
  ...props
}: { href: string } & Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} {...props} className={cn(ghostBtnClass, className)}>
      {children}
    </Link>
  );
}

/** Circle-check used for every feature bullet on the site. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("mt-[3px] size-4 shrink-0 text-brand", className)}
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M4.8 8.3l2 2 4.4-4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Decorative brand glow. Always pointer-events-none + aria-hidden.
 *
 * `signature` tints the glow with the page's own `--signature-h` instead of the
 * fixed blue core, which is how bespoke pages get their own light without
 * leaving the brand. `signal` is the quieter green glow behind proof panels.
 */
export function Bloom({
  className,
  soft = false,
  signature = false,
  signal = false,
}: {
  className?: string;
  soft?: boolean;
  signature?: boolean;
  signal?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        signal ? "bloom-signal" : signature ? "bloom-signature" : soft ? "bloom-soft" : "bloom",
        "pointer-events-none absolute",
        className,
      )}
    />
  );
}
