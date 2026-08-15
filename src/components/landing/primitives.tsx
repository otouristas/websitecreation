import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Shared building blocks for every marketing surface.
 *
 * Ported from the Growth OS studio design and re-skinned in the brand: blue
 * leads on actions, green carries the accent (eyebrows, ticks, numerals).
 * Sections across the whole site compose these rather than hand-rolling
 * spacing and type - that consistency is what makes the site read as one
 * system instead of thirty templates.
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
      className={cn("relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28", className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 font-display text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>
      ) : null}
    </div>
  );
}

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
        "rounded-[10px] border border-hairline bg-surface p-6 transition-colors",
        interactive && "hover:border-brand/30",
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
        "grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline",
        className,
      )}
    >
      {children}
    </div>
  );
}

const primaryBtnClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-primary px-5 font-display text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90";

const ghostBtnClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-hairline bg-surface-raised/60 px-5 font-display text-sm font-medium text-foreground transition-colors hover:border-brand/40";

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
 * leaving the brand.
 */
export function Bloom({
  className,
  soft = false,
  signature = false,
}: {
  className?: string;
  soft?: boolean;
  signature?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        signature ? "bloom-signature" : soft ? "bloom-soft" : "bloom",
        "pointer-events-none absolute",
        className,
      )}
    />
  );
}
