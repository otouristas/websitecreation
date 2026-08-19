"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAlternateLocalePath } from "@/lib/locale-paths";
import { siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";

function localeLabel(locale: SiteLocale): string {
  return locale === "el" ? "ΕΛ" : "EN";
}

/**
 * `alternateHref` lets a page override the path-swap default. Blog posts need
 * it: slugs differ per locale, so swapping only the prefix pointed at a URL
 * that redirects straight back (69 such internal links before this).
 */
export function LanguageSwitcher({ alternateHref }: { alternateHref?: string }) {
  const pathname = usePathname() ?? "/en";
  const locale = siteLocaleFromPath(pathname);
  const target: SiteLocale = locale === "el" ? "en" : "el";
  const href = alternateHref ?? getAlternateLocalePath(pathname);
  const ariaLabel =
    target === "en" ? "Switch to English" : "Μετάβαση στα Ελληνικά";

  return (
    <div
      className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide"
      role="group"
      aria-label="Language"
    >
      {locale === "en" ? (
        <span className="text-foreground" aria-current="true">
          EN
        </span>
      ) : (
        <Link
          href={href}
          className="text-muted-foreground transition-colors hover:text-foreground"
          hrefLang="en"
          aria-label={ariaLabel}
        >
          EN
        </Link>
      )}
      <span className="text-muted-foreground/50" aria-hidden>
        ·
      </span>
      {locale === "el" ? (
        <span className="text-foreground" aria-current="true">
          ΕΛ
        </span>
      ) : (
        <Link
          href={href}
          className="text-muted-foreground transition-colors hover:text-foreground"
          hrefLang="el"
          aria-label={ariaLabel}
        >
          ΕΛ
        </Link>
      )}
      <span className="sr-only">
        Current language: {localeLabel(locale)}. {ariaLabel}.
      </span>
    </div>
  );
}
