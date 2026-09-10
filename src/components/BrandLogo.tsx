import Image from "next/image";
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

const imagePixels: Record<NonNullable<BrandLogoProps["size"]>, number> = {
  sm: 24,
  md: 32,
  lg: 40,
};

const textClasses: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

/**
 * Site-wide brand lockup: PNG mark + gradient or light wordmark (matches Vite marketing).
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
  const px = imagePixels[size];
  return (
    <Link href={homeHref} onClick={onClick} className={`flex items-center gap-2 hover:opacity-90 transition-opacity ${className}`}>
      <Image
        src="/logo.png"
        alt={showText ? "" : "AnotherSEOGuru"}
        width={px}
        height={px}
        className={`flex-shrink-0 object-contain ${imageClassName}`}
        priority={size === "md"}
      />
      {showText ? (
        <span
          className={`font-bold leading-tight ${textClassName || textClasses[size]} ${
            variant === "light" ? "text-white" : "gradient-text"
          }`}
        >
          AnotherSEOGuru
        </span>
      ) : null}
    </Link>
  );
}
