"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { getAppPath } from "@/lib/app-links";
import { localizedPath, siteLocaleFromPath, type SiteLocale } from "@/lib/i18n/locale";
import { getFooterDictionary } from "@/lib/i18n/get-dictionary";

const columnLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

const columnHeadingClass =
  "mb-5 text-sm font-semibold tracking-tight text-foreground";

const socialButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary";

export default function Footer({ locale: localeProp }: { locale?: SiteLocale }): ReactElement {
  const pathname = usePathname() ?? "/en";
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const currentYear = new Date().getFullYear();
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const t = getFooterDictionary(locale);
  return (
    <footer className="relative mt-20 border-t border-border/80 bg-gradient-to-b from-primary/[0.07] via-muted/35 to-muted/45 dark:from-primary/[0.1] dark:via-background dark:to-muted/20 md:mt-28 lg:mt-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />
      <div className="container mx-auto px-4 pb-16 pt-24 sm:px-6 md:pb-20 md:pt-32 lg:pb-24 lg:pt-40">
        <div className="mb-12 grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <BrandLogo size="lg" className="mb-4" homeHref={lp("/")} />
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://twitter.com/anotherseoguru"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClass}
                aria-label="Twitter"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/anotherseoguru"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClass}
                aria-label="LinkedIn"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/anotherseoguru"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClass}
                aria-label="GitHub"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@anotherseoguru"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClass}
                aria-label="YouTube"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className={columnHeadingClass}>{isEl ? t!.agency : "Product"}</h3>
            <ul className="space-y-3.5">
              {isEl ? (
                <>
                  <li>
                    <Link href={lp("/services")} className={columnLinkClass}>
                      {t.services}
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/services/website-creation")} className={columnLinkClass}>
                      {t.websiteCreation}
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/pricing")} className={columnLinkClass}>
                      {t.pricing}
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/get-started")} className={columnLinkClass}>
                      {t.getStarted}
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/locations")} className={columnLinkClass}>
                      {t.locations}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={lp("/platform/features")} className={columnLinkClass}>
                      Features
                    </Link>
                  </li>
                  <li>
                    <a href={getAppPath("/free-tools")} className={columnLinkClass} rel="noopener noreferrer">
                      Free tools
                    </a>
                  </li>
                  <li>
                    <Link href={lp("/pricing")} className={columnLinkClass}>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a href={getAppPath("/signup")} className={columnLinkClass} rel="noopener noreferrer">
                      Sign up
                    </a>
                  </li>
                  <li>
                    <a href={getAppPath("/login")} className={columnLinkClass} rel="noopener noreferrer">
                      Login
                    </a>
                  </li>
                  <li>
                    <Link href={lp("/resources")} className={columnLinkClass}>
                      Roadmap
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className={columnHeadingClass}>{isEl ? t!.resources : "Resources"}</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href={lp("/blog")} className={columnLinkClass}>
                  {isEl ? t!.blog : "Blog"}
                </Link>
              </li>
              <li>
                <Link href={lp("/work")} className={columnLinkClass}>
                  {isEl ? t!.work : "Case studies"}
                </Link>
              </li>
              {!isEl && (
                <>
                  <li>
                    <Link href={lp("/glossary")} className={columnLinkClass}>
                      SEO glossary
                    </Link>
                  </li>
                  <li>
                    <a href={getAppPath("/help")} className={columnLinkClass} rel="noopener noreferrer">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a href={getAppPath("/changelog")} className={columnLinkClass} rel="noopener noreferrer">
                      Changelog
                    </a>
                  </li>
                  <li>
                    <Link href={lp("/resources")} className={columnLinkClass}>
                      SEO guides
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/platform/features")} className={columnLinkClass}>
                      Platform features
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className={columnHeadingClass}>{isEl ? t!.company : "Company"}</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href={lp("/about")} className={columnLinkClass}>
                  {isEl ? t!.about : "About us"}
                </Link>
              </li>
              <li>
                <Link href={lp("/contact")} className={columnLinkClass}>
                  {isEl ? t!.contact : "Contact"}
                </Link>
              </li>
              {!isEl && (
                <>
                  <li>
                    <Link href={lp("/contact")} className={columnLinkClass}>
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/contact")} className={columnLinkClass}>
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link href={lp("/contact")} className={columnLinkClass}>
                      Affiliates
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className={columnHeadingClass}>{isEl ? t!.legal : "Legal"}</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href={lp("/privacy")} className={columnLinkClass}>
                  {isEl ? t!.privacy : "Privacy policy"}
                </Link>
              </li>
              <li>
                <Link href={lp("/terms")} className={columnLinkClass}>
                  {isEl ? t!.terms : "Terms of service"}
                </Link>
              </li>
              <li>
                <Link href={lp("/privacy#cookies")} className={columnLinkClass}>
                  {isEl ? t!.cookies : "Cookie policy"}
                </Link>
              </li>
              <li>
                <Link href={lp("/privacy")} className={columnLinkClass}>
                  {isEl ? t!.gdpr : "GDPR"}
                </Link>
              </li>
              {!isEl && (
                <li>
                  <Link href={lp("/contact")} className={columnLinkClass}>
                    Security
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-10 md:pt-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <p className="text-sm text-muted-foreground">
                © {currentYear} AnotherSEOGuru. {isEl ? t!.rights : "All rights reserved."}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="mailto:hello@anotherseoguru.com" className="transition-colors hover:text-foreground">
                  hello@anotherseoguru.com
                </a>
                <span aria-hidden>•</span>
                <Link href={lp("/contact")} className="transition-colors hover:text-foreground">
                  {isEl ? t!.contact : "Contact"}
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-end">
              <p className="text-xs text-muted-foreground">{isEl ? t!.payments : "We accept"}</p>
              <img
                src="/payment-methods.png"
                alt="Accepted payment methods: Visa, Mastercard, Amex, iDEAL, JCB, Bancontact, Apple Pay, Google Pay, PayPal"
                width={320}
                height={36}
                className="h-6 opacity-70 transition-opacity hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
