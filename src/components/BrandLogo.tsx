import Link from "next/link";

export interface BrandLogoProps {
  readonly size?: "sm" | "md" | "lg";
  readonly showText?: boolean;
  readonly className?: string;
  /** Wordmark on dark footer backgrounds */
  readonly variant?: "default" | "light";
  /** Home link - defaults to / */
  readonly homeHref?: string;
  readonly onClick?: () => void;
  /**
   * Replaces the size-derived wordmark classes. The header lockup uses it to
   * step the wordmark down (and hide it under 360px) so the hamburger stays
   * inside the viewport on small phones. It replaces rather than appends
   * because Tailwind emits utilities in its own canonical order, so an
   * appended `text-base` does not reliably beat the default `text-lg`.
   */
  readonly textClassName?: string;
  /** Extra classes for the mark. Same reason as `textClassName`. */
  readonly imageClassName?: string;
}

const markClasses: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
};

const textClasses: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

/**
 * The mark, inline. A magnifier whose lens holds a rising line that breaks
 * out of the glass as a tick: search, growth, done. Drawn with strokes in
 * `currentColor` so it takes the surface's text colour and stays crisp at
 * any size; `public/logo.png` remains the raster for schema and social cards.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      stroke="currentColor"
      strokeWidth="66"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="410" cy="450" r="205" />
      <path d="M556 596 655 785" />
      <path d="M300 462 385 350 625 635 825 400" />
    </svg>
  );
}

/**
 * Site-wide brand lockup: inline SVG mark in the primary blue + a display-face
 * wordmark carrying the blue-to-cyan gradient.
 */
export function BrandLogo({
  size = "md",
  showText = true,
  className = "",
  variant = "default",
  homeHref = "/",
  onClick,
  textClassName = "",
  imageClassName = "",
}: BrandLogoProps) {
  return (
    <Link
      href={homeHref}
      onClick={onClick}
      aria-label={showText ? undefined : "AnotherSEOGuru"}
      className={`flex items-center gap-2.5 transition-opacity hover:opacity-90 ${className}`}
    >
      <BrandMark
        className={`shrink-0 ${variant === "light" ? "text-white" : "text-primary-glow"} ${
          imageClassName || markClasses[size]
        }`}
      />
      {showText ? (
        <span
          className={`font-display font-semibold leading-tight tracking-[-0.03em] ${
            textClassName || textClasses[size]
          } ${variant === "light" ? "text-white" : "gradient-text"}`}
        >
          AnotherSEOGuru
        </span>
      ) : null}
    </Link>
  );
}
