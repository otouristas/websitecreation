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
   * Extra classes for the wordmark. The header lockup uses it to step the
   * wordmark down (and drop it entirely under 360px) so the hamburger stays
   * inside the viewport on small phones.
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
          className={`font-bold leading-tight ${textClasses[size]} ${
            variant === "light" ? "text-white" : "gradient-text"
          } ${textClassName}`}
        >
          AnotherSEOGuru
        </span>
      ) : null}
    </Link>
  );
}
