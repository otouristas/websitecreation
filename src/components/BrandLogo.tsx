import Image from "next/image";
import Link from "next/link";

export interface BrandLogoProps {
  readonly size?: "sm" | "md" | "lg";
  readonly showText?: boolean;
  readonly className?: string;
  /** Force the on-dark artwork when the local surface remains dark. */
  readonly variant?: "default" | "light";
  readonly homeHref?: string;
  readonly onClick?: () => void;
  readonly imageClassName?: string;
}

const lockupClasses = { sm: "h-7", md: "h-8", lg: "h-10" } as const;
const markClasses = { sm: "h-6 w-[30px]", md: "h-8 w-10", lg: "h-10 w-[50px]" } as const;

/** Exact supplied folded-A asset; image references keep gradient IDs isolated. */
export function BrandMark({ className = "" }: { className?: string }) {
  return <Image src="/brand/asg-mark.svg" width={320} height={256} alt="" aria-hidden className={className} unoptimized />;
}

/** The wordmark is part of the approved SVG, never reconstructed with UI text. */
export function BrandLogo({
  size = "md", showText = true, className = "", variant = "default", homeHref = "/", onClick, imageClassName = "",
}: BrandLogoProps) {
  const imageClasses = `${imageClassName || lockupClasses[size]} w-auto max-w-full`;
  return (
    <Link href={homeHref} onClick={onClick} aria-label="AnotherSEOGuru" className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-90 ${className}`}>
      {showText ? (
        <>
          <Image src="/brand/asg-lockup-on-dark.svg" width={1128} height={256} alt="" aria-hidden className={`${variant === "light" ? "" : "asg-logo-dark"} ${imageClasses}`} loading="eager" unoptimized />
          {variant === "default" ? <Image src="/brand/asg-lockup-on-light.svg" width={1128} height={256} alt="" aria-hidden className={`asg-logo-light ${imageClasses}`} loading="eager" unoptimized /> : null}
        </>
      ) : <BrandMark className={imageClassName || markClasses[size]} />}
    </Link>
  );
}
