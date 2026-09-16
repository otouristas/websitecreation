"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/contact-info";
import { BrandLogo } from "@/components/BrandLogo";
import { AgencyMegaMenu } from "@/components/AgencyMegaMenu";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { localizedPath, siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";
import { getNavDictionary } from "@/lib/i18n/get-dictionary";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { trackCtaClick } from "@/lib/analytics";

const linkClass =
  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/6 hover:text-foreground";

/* Not `glass`: the pill's own backdrop-filter makes it the backdrop root, so
   a nested blur only samples the pill, never the page underneath, and at 72%
   the heading of the page read straight through the open menu. Even 95%
   left a 60px display heading ghosting through, so the panel is opaque. */
const dropdownPanelInnerClass =
  "min-w-[15rem] max-w-[22rem] rounded-2xl border border-hairline bg-popover p-2 shadow-[inset_0_1px_0_0_oklch(1_0_0/6%),0_24px_60px_-28px_oklch(0_0_0/70%)]";

const dropdownItemClass =
  "block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground";

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

export default function Header({
  locale: localeProp,
  alternateHref,
}: { locale?: SiteLocale; alternateHref?: string }): ReactElement {
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
    // Post-mount sync is the point here: close the mobile menu on client-side navigation,
    // so the first paint has to be the SSR value and this corrects it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
            <div className="hidden items-center gap-1 lg:flex">
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
              <Link href={lp("/pricing")} className={linkClass}>
                {nav.pricing}
              </Link>
              <Link href={lp("/work")} className={linkClass}>
                {nav.ourWork}
              </Link>
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
                <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
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
        agencyLinks={agencyMobileLinks}
        mobileOpen={mobileOpen}
        onToggleSection={toggleMobile}
      />
    </>
  );
}
