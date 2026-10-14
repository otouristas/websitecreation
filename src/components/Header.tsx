"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { MegaNav } from "@/components/nav/MegaNav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { localizedPath, siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";
import { getNavDictionary } from "@/lib/i18n/get-dictionary";
import { getNavModel } from "@/data/nav-menu";
import { getTrustChips } from "@/data/trust-stats";
import { trackCtaClick } from "@/lib/analytics";
import { appLink } from "@/components/gsc-boost/copy";

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
  const signupHref = appLink("/signup", locale, "header");
  const loginHref = appLink("/login", locale, "header");

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
            {/* Preserve the approved lockup aspect ratio at phone widths. */}
            <BrandLogo
              size="md"
              className="min-w-0 shrink-0"
              homeHref={lp("/")}
              imageClassName="h-7 min-[400px]:h-8"
            />
            <div className="hidden items-center lg:flex">
              <MegaNav model={model} chips={chips} />
            </div>
            <div className="flex shrink-0 items-center gap-1 min-[400px]:gap-1.5 sm:gap-2">
              {/* Below 360px the switcher lives only in the mobile menu, so the
                  logo, Sign up and the menu button fit. */}
              <div className="hidden min-[360px]:block">
                <LanguageSwitcher alternateHref={alternateHref} />
              </div>
              {/* The theme toggle lives in the mobile menu below sm, to make room for Sign up. */}
              <div className="hidden sm:block">
                <ThemeToggle locale={locale} />
              </div>
              <a
                href={loginHref}
                onClick={() => trackCtaClick("header_login")}
                className="hidden h-9 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground 2xl:inline-flex"
              >
                {nav.logIn}
              </a>
              {/* The quote is the secondary action. Below xl the mega menu needs the
                  room; the mobile bar and menu carry the quote below lg. */}
              <Link
                href={lp("/get-started")}
                onClick={() => trackCtaClick("header_get_quote")}
                className="hidden h-9 items-center whitespace-nowrap rounded-full border border-hairline px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 xl:inline-flex"
              >
                {nav.getQuoteShort}
              </Link>
              <a
                href={signupHref}
                onClick={() => trackCtaClick("header_signup")}
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 font-display text-sm font-semibold text-primary-foreground asg-primary-action shadow-[inset_0_1px_0_0_oklch(1_0_0/18%),0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_35%,transparent),0_8px_24px_-10px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px sm:px-4 motion-reduce:transition-none"
              >
                <span className="sm:hidden">{nav.signUpShort}</span>
                <span className="hidden sm:inline">{nav.signUp}</span>
              </a>
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
