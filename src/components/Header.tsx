"use client";

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { FreeToolsMegaMenu } from "@/components/landing/free-tools-mega-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { localizedPath, siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";
import { getNavDictionary } from "@/lib/i18n/get-dictionary";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { trackCtaClick } from "@/lib/analytics";

const linkClass =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";

const dropdownPanelInnerClass =
  "min-w-[15rem] max-w-[22rem] rounded-2xl border border-border/80 bg-background/95 p-3 shadow-[0_20px_50px_-12px_hsl(217_91%_60%_/_0.18)] backdrop-blur-xl dark:shadow-[0_20px_50px_-12px_hsl(0_0%_0%_/_0.45)]";

const dropdownItemClass =
  "block rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary";

function sortAgencyServices() {
  const websiteCreation = services.find((s) => s.slug === "website-creation");
  const rest = services.filter((s) => s.slug !== "website-creation");
  const head = websiteCreation ? [websiteCreation] : [];
  return [...head, ...rest].slice(0, 6);
}

interface NavDropdownProps {
  readonly label: string;
  readonly children: React.ReactNode;
}

function NavDropdown(props: NavDropdownProps): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-0.5 rounded-lg px-1 py-1 ${linkClass}`}
        aria-expanded={open}
      >
        {props.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-[70] pt-2">
          <div className={dropdownPanelInnerClass}>{props.children}</div>
        </div>
      ) : null}
    </div>
  );
}

export default function Header({ locale: localeProp }: { locale?: SiteLocale }): ReactElement {
  const pathname = usePathname() ?? "/en";
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const nav = getNavDictionary(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>("agency");
  const agencyNavServices = sortAgencyServices();
  const isEl = locale === "el";
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
    setIsMobileMenuOpen(false);
  }, [pathname]);

  function toggleMobile(id: string): void {
    setMobileOpen((prev) => (prev === id ? null : id));
  }

  const agencyMobileLinks: (readonly [string, string])[] = [
    [lp("/services"), nav.allServices],
    [lp("/services/website-creation"), nav.websiteCreation],
    ...agencyNavServices
      .filter((s) => s.slug !== "website-creation")
      .map((s) => {
        const svcEl = isEl ? getServiceEl(s.slug) : null;
        const dispName = svcEl?.shortName ?? svcEl?.name ?? s.shortName;
        return [lp(`/services/${s.slug}`), dispName] as const;
      }),
  ];

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 overflow-visible transition-[box-shadow,background-color,border-color] duration-300 ease-out ${
          isScrolled
            ? "border-b border-border/70 bg-background/85 shadow-[0_12px_40px_-12px_hsl(217_91%_60%_/_0.12)] backdrop-blur-xl dark:bg-background/80 dark:shadow-[0_8px_32px_-8px_hsl(0_0%_0%_/_0.4)]"
            : "border-b border-transparent bg-transparent"
        }`}
        aria-label="Main"
      >
        <div className="container mx-auto px-3 py-1.5 transition-all duration-300 sm:px-4 md:min-h-20 md:px-6 md:py-2">
          <div className="flex min-h-14 items-center justify-between gap-3 md:min-h-[4.25rem]">
            <div className="flex min-w-0 flex-col justify-center gap-0.5">
              <BrandLogo size="md" className="shrink-0 transition-transform hover:opacity-90" homeHref={lp("/")} />
              <p className="max-w-[14rem] text-[9px] leading-snug text-muted-foreground sm:max-w-none sm:text-[10px] md:text-xs">
                {nav.tagline}
              </p>
            </div>
            <div className="hidden items-center gap-1 lg:flex lg:gap-2 xl:gap-3">
              {!isEl && (
                <>
                  <NavDropdown label={nav.platform}>
                    <Link href={lp("/platform")} className={dropdownItemClass}>
                      {nav.platformOverview}
                    </Link>
                    <Link href={lp("/platform/features")} className={dropdownItemClass}>
                      {nav.allFeatures}
                    </Link>
                    <Link href={lp("/platform/pricing")} className={dropdownItemClass}>
                      {nav.softwarePricing}
                    </Link>
                    <Link href={lp("/platform/for/agencies")} className={dropdownItemClass}>
                      {nav.forAgencies}
                    </Link>
                  </NavDropdown>
                  <FreeToolsMegaMenu />
                </>
              )}
              <NavDropdown label={nav.agency}>
                <Link href={lp("/services")} className={`${dropdownItemClass} font-semibold`}>
                  {nav.allServices}
                </Link>
                <Link href={lp("/services/website-creation")} className={dropdownItemClass}>
                  {nav.websiteCreation}
                </Link>
                {agencyNavServices
                  .filter((s) => s.slug !== "website-creation")
                  .map((s) => {
                    const svcEl = isEl ? getServiceEl(s.slug) : null;
                    const dispName = svcEl?.shortName ?? svcEl?.name ?? s.shortName;
                    return (
                      <Link key={s.slug} href={lp(`/services/${s.slug}`)} className={dropdownItemClass}>
                        {dispName}
                      </Link>
                    );
                  })}
              </NavDropdown>
              <NavDropdown label={nav.solutions}>
                <Link href={lp("/solutions/rent-a-car")} className={dropdownItemClass}>
                  {nav.rentACar}
                </Link>
                <Link href={lp("/solutions/hotels")} className={dropdownItemClass}>
                  {nav.hotels}
                </Link>
                <Link href={lp("/solutions/tour-operators")} className={dropdownItemClass}>
                  {nav.tours}
                </Link>
                <Link href={lp("/solutions")} className={dropdownItemClass}>
                  {nav.allSolutions}
                </Link>
              </NavDropdown>
              <NavDropdown label={nav.pricing}>
                {!isEl && (
                  <Link href={lp("/platform/pricing")} className={dropdownItemClass}>
                    {nav.softwarePricing}
                  </Link>
                )}
                <Link href={lp("/pricing")} className={dropdownItemClass}>
                  {nav.agencyPricing}
                </Link>
              </NavDropdown>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link href={lp("/work")} className={`hidden sm:inline-flex md:px-3 rounded-xl px-2 py-2 ${linkClass}`}>
                {nav.ourWork}
              </Link>
              <Link
                href={lp("/get-started")}
                onClick={() => trackCtaClick("header_get_quote")}
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-[transform,opacity] hover:opacity-95 md:inline-flex gradient-primary md:px-4"
              >
                {nav.getQuote}
              </Link>
              <button
                type="button"
                className="inline-flex rounded-xl p-2 text-foreground transition-colors hover:bg-primary/10 lg:hidden"
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
        locale={locale}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        agencyLinks={agencyMobileLinks}
        mobileOpen={mobileOpen}
        onToggleSection={toggleMobile}
      />
    </>
  );
}
