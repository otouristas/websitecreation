"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/contact-info";
import { BrandLogo } from "@/components/BrandLogo";
import { AgencyMegaMenu } from "@/components/AgencyMegaMenu";
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
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(): void {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }

  function scheduleClose(): void {
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 150);
  }

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <button
        type="button"
        className={`inline-flex items-center gap-0.5 rounded-lg px-1 py-1 ${linkClass}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {props.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-[70] pt-1">
          <div className={dropdownPanelInnerClass} onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            {props.children}
          </div>
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
              <AgencyMegaMenu locale={locale} label={nav.agency} />
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
              <Link href={lp("/pricing")} className={`rounded-lg px-1 py-1 ${linkClass}`}>
                {nav.pricing}
              </Link>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link href={lp("/work")} className={`hidden sm:inline-flex md:px-3 rounded-xl px-2 py-2 ${linkClass}`}>
                {nav.ourWork}
              </Link>
              <Link href={lp("/blog")} className={`hidden sm:inline-flex md:px-3 rounded-xl px-2 py-2 ${linkClass}`}>
                {nav.blog}
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick("header_whatsapp")}
                className={`hidden items-center gap-1.5 rounded-xl px-2 py-2 lg:inline-flex ${linkClass}`}
                aria-label={`WhatsApp ${PHONE_DISPLAY}`}
              >
                <svg className="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
              </a>
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
