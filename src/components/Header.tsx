"use client";

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { FreeToolsMegaMenu } from "@/components/landing/free-tools-mega-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAppPath } from "@/lib/app-links";
import { services } from "@/data/services";

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

export default function Header(): ReactElement {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const agencyNavServices = sortAgencyServices();
  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function toggleMobile(id: string): void {
    setMobileOpen((prev) => (prev === id ? null : id));
  }
  function closeMobile(): void {
    setIsMobileMenuOpen(false);
    setMobileOpen(null);
  }
  return (
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
            <BrandLogo size="md" className="shrink-0 transition-transform hover:opacity-90" />
            <p className="max-w-[14rem] text-[9px] leading-snug text-muted-foreground sm:max-w-none sm:text-[10px] md:text-xs">
              Platform · Agency · Websites
            </p>
          </div>
          <div className="hidden items-center gap-1 lg:flex lg:gap-2 xl:gap-3">
            <NavDropdown label="Platform">
              <Link href="/platform" className={dropdownItemClass}>
                Platform overview
              </Link>
              <Link href="/platform/features" className={dropdownItemClass}>
                All features
              </Link>
              <Link href="/platform/pricing" className={dropdownItemClass}>
                Software pricing
              </Link>
              <Link href="/platform/for/agencies" className={dropdownItemClass}>
                For agencies
              </Link>
              <Link href="/platform/for/in-house" className={dropdownItemClass}>
                For in-house teams
              </Link>
              <Link href="/platform/for/ecommerce" className={dropdownItemClass}>
                For ecommerce
              </Link>
            </NavDropdown>
            <NavDropdown label="Agency">
              <Link href="/services" className={`${dropdownItemClass} font-semibold`}>
                All services
              </Link>
              <Link href="/services/website-creation" className={dropdownItemClass}>
                Website creation
              </Link>
              {agencyNavServices
                .filter((s) => s.slug !== "website-creation")
                .map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={dropdownItemClass}>
                    {s.shortName}
                  </Link>
                ))}
            </NavDropdown>
            <FreeToolsMegaMenu />
            <NavDropdown label="Pricing">
              <Link href="/platform/pricing" className={dropdownItemClass}>
                Software pricing
              </Link>
              <Link href="/pricing" className={dropdownItemClass}>
                Agency pricing
              </Link>
            </NavDropdown>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            <ThemeToggle />
            <a
              href={getAppPath("/auth")}
              className="hidden rounded-xl px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary sm:inline-flex md:px-3"
              rel="noopener noreferrer"
              aria-label="Sign in to AnotherSEOGuru"
            >
              Sign In
            </a>
            <a
              href={getAppPath("/auth")}
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-[transform,opacity] hover:opacity-95 md:inline-flex gradient-primary md:px-4"
              rel="noopener noreferrer"
              aria-label="Get started free with AnotherSEOGuru"
            >
              Get Started Free
            </a>
            <button
              type="button"
              className="inline-flex rounded-xl p-2 text-foreground transition-colors hover:bg-primary/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div className="max-h-[min(70vh,calc(100dvh-var(--site-header-height)))] overflow-y-auto rounded-xl border border-border/60 bg-background/96 py-2 backdrop-blur-md lg:hidden">
            {(
              [
                {
                  id: "platform",
                  title: "Platform",
                  links: [
                    ["/platform", "Overview"],
                    ["/platform/features", "All features"],
                    ["/platform/pricing", "Software pricing"],
                    ["/platform/for/agencies", "For agencies"],
                    ["/platform/for/in-house", "For in-house"],
                    ["/platform/for/ecommerce", "For ecommerce"],
                  ],
                },
                {
                  id: "agency",
                  title: "Agency",
                  links: [
                    ["/services", "All services"],
                    ["/services/website-creation", "Website creation"],
                    ...agencyNavServices
                      .filter((s) => s.slug !== "website-creation")
                      .map((s) => [`/services/${s.slug}`, s.shortName] as const),
                  ],
                },
              ] as const
            ).map((section) => (
              <div key={section.id} className="border-b border-border/50 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-2 py-2.5 text-left text-sm font-semibold text-foreground"
                  onClick={() => toggleMobile(section.id)}
                  aria-expanded={mobileOpen === section.id}
                >
                  {section.title}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${mobileOpen === section.id ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileOpen === section.id ? (
                  <div className="flex flex-col gap-0.5 pb-2 pl-3">
                    {section.links.map(([href, label]) => (
                      <Link
                        key={href}
                        href={href}
                        className="py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                        onClick={closeMobile}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="mt-1 flex flex-col gap-0.5 border-t border-border/50 px-2 pt-2">
              <Link
                href="/tools"
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={closeMobile}
              >
                Free tools
              </Link>
              <Link
                href="/platform/pricing"
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={closeMobile}
              >
                Software pricing
              </Link>
              <Link
                href="/pricing"
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={closeMobile}
              >
                Agency pricing
              </Link>
            </div>
            <p className="px-2 pt-2 text-xs text-muted-foreground">
              Blog, glossary, industries, cities, and compares are in the footer.
            </p>
            <div className="mt-3 flex flex-col gap-2 border-t border-border/50 px-2 pt-3">
              <a
                href={getAppPath("/auth")}
                className="inline-flex w-full items-center justify-center rounded-xl border border-border/80 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                rel="noopener noreferrer"
                onClick={closeMobile}
              >
                Sign In
              </a>
              <a
                href={getAppPath("/auth")}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 gradient-primary"
                rel="noopener noreferrer"
                onClick={closeMobile}
              >
                Get Started Free
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
