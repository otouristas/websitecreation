"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/contact-info";
import { BrandLogo } from "@/components/BrandLogo";
import { MegaNav } from "@/components/nav/MegaNav";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { localizedPath, siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";
import { getNavDictionary } from "@/lib/i18n/get-dictionary";
import { getNavModel } from "@/data/nav-menu";
import { getTrustChips } from "@/data/trust-stats";
import { trackCtaClick } from "@/lib/analytics";

export default function Header({
  locale: localeProp,
  alternateHref,
}: { locale?: SiteLocale; alternateHref?: string }): ReactElement {
  const pathname = usePathname() ?? "/en";
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const model = useMemo(() => getNavModel(locale), [locale]);
  const chips = getTrustChips(locale);
  const lp = (path: string) => localizedPath(locale, path);

  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Post-mount sync is the point here: close the mobile menu on client-side navigation,
    // so the first paint has to be the SSR value and this corrects it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-2 pt-3 min-[400px]:px-3 sm:px-6"
        aria-label="Main"
      >
        {/* Full-width ground behind the floating pill. The pill is narrower
            than the viewport and translucent, so page content (breadcrumbs,
            headings) used to stay visible in the gutters beside it, in the
            gap above it and through it as it scrolled underneath. This band
            fades that content out across the whole header height; it is
            transparent at the top of the page so the hero keeps its light. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(var(--site-header-height)+0.75rem)] bg-[linear-gradient(to_bottom,var(--background)_calc(100%_-_1rem),transparent_100%)] transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-auto relative mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border px-2.5 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 min-[400px]:px-3 sm:gap-4 sm:px-5 sm:py-3 lg:rounded-full ${
            isScrolled
              ? "border-hairline bg-surface/85 shadow-[inset_0_1px_0_0_oklch(1_0_0/6%),0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_20px_60px_-30px_color-mix(in_oklab,var(--primary)_60%,transparent),0_16px_40px_-24px_oklch(0_0_0/60%)] backdrop-blur-xl"
              : "border-transparent bg-surface/30 backdrop-blur-md"
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-3">
            {/* The wordmark is 170px at text-lg. With the language switcher,
                theme toggle and hamburger on the same row that pushed the
                hamburger past the right edge of a 320-375px viewport, i.e. the
                menu could not be opened at all on an iPhone SE. It steps down
                with the viewport and falls back to screen-reader-only under
                360px, where only the mark fits. */}
            <BrandLogo
              size="md"
              className="min-w-0 shrink-0"
              homeHref={lp("/")}
              imageClassName="h-7 w-7 min-[400px]:h-8 min-[400px]:w-8"
              textClassName="max-[359px]:sr-only whitespace-nowrap text-base min-[400px]:text-lg"
            />
            <div className="hidden items-center lg:flex">
              <MegaNav model={model} chips={chips} />
            </div>
            <div className="flex shrink-0 items-center gap-1 min-[400px]:gap-1.5 sm:gap-2">
              <LanguageSwitcher alternateHref={alternateHref} />
              <ThemeToggle locale={locale} />
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick("header_whatsapp")}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground xl:inline-flex"
                aria-label={`WhatsApp ${PHONE_DISPLAY}`}
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                <span className="hidden 2xl:inline">{PHONE_DISPLAY}</span>
              </a>
              <Link
                href={lp("/get-started")}
                onClick={() => trackCtaClick("header_get_quote")}
                className="hidden h-9 items-center gap-1.5 rounded-full px-4 font-display text-sm font-semibold text-primary-foreground bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_35%,transparent),0_8px_24px_-10px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px md:inline-flex motion-reduce:transition-none"
              >
                {nav.getQuote}
              </Link>
              <button
                type="button"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-label={nav.openMenu}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav
        alternateHref={alternateHref}
        locale={locale}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        model={model}
      />
    </>
  );
}
