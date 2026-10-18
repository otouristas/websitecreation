"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { FooterCta } from "@/components/FooterCta";
import { getAppPath } from "@/lib/app-links";
import { getFooterDictionary } from "@/lib/i18n/get-dictionary";
import { localizedPath, siteLocaleFromPath, stripLocalePrefix, type SiteLocale } from "@/lib/i18n/locale";
import { CONTACT_EMAIL, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/contact-info";
import { trackCtaClick } from "@/lib/analytics";
import { consultantPath } from "@/data/founder";

/** Official SVGs from https://github.com/datatrans/payment-logos (CC-BY-SA-4.0) */
const PAYMENT_LOGOS = [
  { src: "/payments/visa.svg", alt: "Visa", width: 42 },
  { src: "/payments/mastercard.svg", alt: "Mastercard", width: 42 },
  { src: "/payments/american-express.svg", alt: "American Express", width: 42 },
  { src: "/payments/paypal.svg", alt: "PayPal", width: 42 },
  { src: "/payments/apple-pay.svg", alt: "Apple Pay", width: 42 },
  { src: "/payments/google-pay.svg", alt: "Google Pay", width: 42 },
  { src: "/payments/ideal.svg", alt: "iDEAL", width: 42 },
  { src: "/payments/bancontact.svg", alt: "Bancontact", width: 42 },
  { src: "/payments/jcb.svg", alt: "JCB", width: 42 },
] as const;

/**
 * Pages that already are the free-audit / contact flow, or the pricing page
 * the secondary button opens. The strip would repeat the page.
 */
const HIDE_FOOTER_CTA = new Set(["/contact", "/get-started", "/pricing"]);

const columnLinkClass =
  "inline-block max-w-full break-words py-0.5 text-[14px] leading-snug text-muted-foreground transition-colors hover:text-foreground";

const columnHeadingClass =
  "mb-5 block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70";

const socialButtonClass =
  "grid size-10 place-items-center rounded-xl border border-hairline bg-surface/60 text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground";

const closingRuleClass =
  "relative border-t border-hairline before:absolute before:inset-x-0 before:top-[-1px] before:h-px before:bg-[linear-gradient(90deg,transparent,var(--primary-glow)_30%,var(--brand)_70%,transparent)] before:opacity-70 before:content-['']";

type FooterLink = { readonly label: string; readonly href: string; readonly external?: boolean };

type FooterColumn = {
  readonly id: "product" | "services" | "areas" | "resources" | "company";
  readonly title: string;
  readonly links: readonly FooterLink[];
};

/**
 * Every href the previous footer linked, plus the place pages. City anchors
 * stay in Areas because those service×city URLs are the ranking targets.
 * App signup, login, free tools and the changelog stay on the English footer,
 * which is where they lived before.
 */
function footerColumns(locale: SiteLocale): readonly FooterColumn[] {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const t = getFooterDictionary(locale);
  const app = (label: string, path: string): FooterLink => ({ label, href: getAppPath(path), external: true });

  const product: FooterLink[] = [
    { label: isEl ? "AnotherSEOGuru App" : "Platform overview", href: lp("/platform") },
    { label: isEl ? "Δυνατότητες" : "Features", href: lp("/platform/features") },
    { label: isEl ? "Πακέτα εφαρμογής" : "Software plans", href: lp("/platform/pricing") },
    { label: isEl ? "Εφαρμογή iPhone" : "iPhone app", href: lp("/platform/iphone") },
    { label: isEl ? "Ενσωματώσεις" : "Integrations", href: lp("/platform/integrations") },
    { label: isEl ? "Ασφάλεια" : "Security", href: lp("/platform/security") },
    { label: isEl ? "Για agencies" : "For agencies", href: lp("/platform/for/agencies") },
    { label: isEl ? "Για in-house ομάδες" : "For in-house teams", href: lp("/platform/for/in-house") },
    { label: isEl ? "Για e-shop" : "For ecommerce", href: lp("/platform/for/ecommerce") },
  ];
  if (!isEl) {
    product.push(
      { label: "Compare alternatives", href: lp("/compare") },
      app("Free tools", "/free-tools"),
      app("Changelog", "/changelog"),
      app("Sign up", "/signup"),
      app("Login", "/login"),
    );
  }

  const services: FooterLink[] = [
    { label: isEl ? "Υπηρεσίες SEO" : "SEO Services", href: lp("/seo-services") },
    { label: isEl ? "Τεχνικό SEO" : "Technical SEO", href: lp("/seo-services/technical") },
    { label: "On-page SEO", href: lp("/seo-services/on-page") },
    { label: isEl ? "Στρατηγική SEO" : "SEO Strategy", href: lp("/seo-services/strategy") },
    { label: isEl ? t.websiteCreation : "Web Development Agency", href: lp("/services/website-creation") },
    { label: isEl ? "Σχεδιασμός με SEO" : "SEO Web Design", href: lp("/services/seo-web-design") },
    { label: isEl ? "Κατασκευή E-shop" : "E-commerce / E-shop", href: lp("/services/eshop-woocommerce") },
    ...(isEl ? [{ label: "SEO για E-shop", href: lp("/services/eshop-seo") }] : []),
    { label: isEl ? "Τοπικό SEO" : "Local SEO", href: lp("/services/local-seo") },
    { label: isEl ? "Ορατότητα σε AI" : "AI Visibility (GEO/AEO)", href: lp("/services/ai-visibility") },
    { label: isEl ? "Ανασχεδιασμός ιστοσελίδας" : "Website Redesign", href: lp("/services/website-redesign") },
    { label: isEl ? "SEO για ξενοδοχεία" : "Hotel SEO", href: lp("/solutions/hotels") },
    ...(isEl
      ? [
          { label: "Κατασκευή ιστοσελίδας ξενοδοχείου", href: lp("/solutions/hotels") },
          { label: "SEO για δικηγόρους", href: lp("/solutions/lawyers") },
          { label: "SEO για ακίνητα", href: lp("/solutions/real-estate") },
        ]
      : []),
    { label: isEl ? "Τιμές & πακέτα" : "Pricing & Packages", href: lp("/pricing") },
    { label: isEl ? "Όλες οι υπηρεσίες" : "All services", href: lp("/services") },
    ...(isEl ? [{ label: t.getStarted, href: lp("/get-started") }] : []),
  ];

  const areas: FooterLink[] = isEl
    ? [
        { label: "SEO σε όλη την Ελλάδα", href: "/el/seo" },
        { label: "Όλες οι περιοχές", href: lp("/locations") },
        { label: "Αθήνα", href: "/el/seo/athens" },
        { label: "SEO Αθήνα", href: lp("/services/local-seo/athens-gr") },
        { label: "Κατασκευή ιστοσελίδων Αθήνα", href: lp("/services/website-creation/athens-gr") },
        { label: "Κατασκευή E-shop Αθήνα", href: lp("/services/eshop-woocommerce/athens-gr") },
        { label: "Θεσσαλονίκη", href: "/el/seo/thessaloniki" },
        { label: "SEO Θεσσαλονίκη", href: lp("/services/local-seo/thessaloniki-gr") },
        { label: "Κατασκευή ιστοσελίδων Θεσσαλονίκη", href: lp("/services/website-creation/thessaloniki-gr") },
        { label: "Κατασκευή E-shop Θεσσαλονίκη", href: lp("/services/eshop-woocommerce/thessaloniki-gr") },
        { label: "Κατασκευή ιστοσελίδων Πάτρα", href: lp("/services/website-creation/patras-gr") },
        { label: "Κατασκευή E-shop Πάτρα", href: lp("/services/eshop-woocommerce/patras-gr") },
        { label: "Ηράκλειο", href: "/el/seo/heraklion" },
        { label: "Κατασκευή ιστοσελίδων Ηράκλειο", href: lp("/services/website-creation/heraklion-gr") },
        { label: "Χανιά", href: "/el/seo/chania" },
        { label: "SEO Χανιά", href: lp("/services/local-seo/chania-gr") },
        { label: "Κατασκευή ιστοσελίδων Χανιά", href: lp("/services/website-creation/chania-gr") },
        { label: "Ρόδος", href: "/el/seo/rhodes" },
        { label: "Κατασκευή ιστοσελίδων Ρόδος", href: lp("/services/website-creation/rhodes-gr") },
        { label: "Σαντορίνη", href: "/el/seo/santorini" },
        { label: "SEO Σαντορίνη", href: lp("/services/local-seo/santorini-gr") },
        { label: "Μύκονος", href: "/el/seo/mykonos" },
        { label: "SEO Μύκονος", href: lp("/services/local-seo/mykonos-gr") },
        { label: "SEO Κως", href: lp("/services/local-seo/kos-gr") },
        { label: "Κέρκυρα", href: "/el/seo/corfu" },
      ]
    : [
        { label: "All Locations", href: lp("/locations") },
        { label: "Web Design London", href: "/en/services/website-creation/london-uk" },
        { label: "SEO London", href: "/en/services/local-seo/london-uk" },
        { label: "Web Design Athens", href: "/en/services/website-creation/athens-gr" },
        { label: "SEO Athens", href: "/en/services/local-seo/athens-gr" },
        { label: "Web Design Heraklion", href: "/en/services/website-creation/heraklion-gr" },
        { label: "SEO Heraklion", href: "/en/services/local-seo/heraklion-gr" },
        { label: "SEO Chania", href: "/en/services/local-seo/chania-gr" },
        { label: "SEO Santorini", href: "/en/services/local-seo/santorini-gr" },
        { label: "SEO Mykonos", href: "/en/services/local-seo/mykonos-gr" },
        { label: "SEO Rhodes", href: "/en/services/local-seo/rhodes-gr" },
        { label: "SEO Corfu", href: "/en/services/local-seo/corfu-gr" },
      ];

  const resources: FooterLink[] = [
    { label: isEl ? t.aiVisibilityCheck : "AI visibility check", href: lp("/ai-visibility-check") },
    { label: isEl ? t.blog : "Blog", href: lp("/blog") },
    { label: isEl ? "Οδηγοί SEO" : "SEO guides", href: lp("/seo-guides") },
    { label: isEl ? t.work : "Case studies", href: lp("/work") },
    { label: isEl ? "Κέντρο βοήθειας" : "Help center", href: lp("/help") },
    { label: isEl ? "Λεξικό SEO" : "SEO glossary", href: lp("/glossary") },
  ];
  if (isEl) {
    resources.push(
      { label: "Οδηγός: κατασκευή e-shop", href: "/el/blog/kataskevi-eshop-odigos" },
      { label: "Πόσο κοστίζει μια ιστοσελίδα", href: "/el/blog/poso-kostizei-mia-istoselida" },
      { label: "Πόσο κοστίζει το SEO", href: "/el/blog/poso-kostizei-to-seo" },
    );
  } else {
    resources.push(
      { label: "Resources", href: lp("/resources") },
      { label: "SEO, AEO, GEO explained", href: lp("/resources/search-optimization-layers") },
      { label: "AI search page anatomy", href: lp("/resources/ai-search-page-anatomy") },
    );
  }

  return [
    { id: "product", title: t.product, links: product },
    { id: "services", title: isEl ? t.agency : "Services", links: services },
    { id: "areas", title: t.areas, links: areas },
    { id: "resources", title: isEl ? t.resources : "Resources", links: resources },
    {
      id: "company",
      title: isEl ? t.company : "Company",
      links: [
        { label: isEl ? t.about : "About us", href: lp("/about") },
        { label: isEl ? "Σύμβουλος SEO" : "SEO consultant", href: consultantPath(locale) },
        { label: "SEO guru", href: lp("/seo-guru") },
        { label: isEl ? t.contact : "Contact", href: lp("/contact") },
        { label: isEl ? t.privacy : "Privacy policy", href: lp("/privacy") },
        { label: isEl ? t.terms : "Terms of service", href: lp("/terms") },
        { label: isEl ? t.cookies : "Cookie policy", href: lp("/privacy#cookies") },
      ],
    },
  ];
}

function LinkList({ links }: { readonly links: readonly FooterLink[] }): ReactElement {
  return (
    <>
      {links.map((link) => (
        <li key={`${link.href}:${link.label}`}>
          {link.external ? (
            <a href={link.href} className={columnLinkClass} rel="noopener noreferrer">
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={columnLinkClass}>
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}

function FooterColumnView({ column }: { readonly column: FooterColumn }): ReactElement {
  return (
    <div className="min-w-0">
      <details className="group lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70 [&::-webkit-details-marker]:hidden">
          <span>{column.title}</span>
          <span
            aria-hidden
            className="grid size-6 shrink-0 place-items-center rounded-full border border-hairline text-[15px] leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand"
          >
            +
          </span>
        </summary>
        <ul className="space-y-2.5 pb-4">
          <LinkList links={column.links} />
        </ul>
      </details>
      <div className="hidden lg:block">
        <h3 className={columnHeadingClass}>{column.title}</h3>
        <ul className="space-y-2.5">
          <LinkList links={column.links} />
        </ul>
      </div>
    </div>
  );
}

export default function Footer({ locale: localeProp }: { locale?: SiteLocale }): ReactElement {
  const pathname = usePathname() ?? "/en";
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const currentYear = new Date().getFullYear();
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const t = getFooterDictionary(locale);
  const columns = footerColumns(locale);
  const showCta = !HIDE_FOOTER_CTA.has(stripLocalePrefix(pathname));

  return (
    <>
      {showCta ? <FooterCta locale={locale} /> : null}
      <footer className={showCta ? "border-t border-hairline bg-surface/40" : `${closingRuleClass} bg-surface/40`}>
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-14 pt-12 sm:px-8 md:pb-16 md:pt-16">
          <div className="mb-10 flex flex-col gap-6 border-b border-hairline pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 max-w-md">
              <BrandLogo size="lg" className="mb-4" homeHref={lp("/")} />
              <p className="text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
            </div>
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

          <div className="divide-y divide-hairline lg:grid lg:grid-cols-5 lg:gap-x-8 lg:divide-y-0">
            {columns.map((column) => (
              <FooterColumnView key={column.id} column={column} />
            ))}
          </div>

          <div className="mt-10 border-t border-hairline pt-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex min-w-0 flex-col items-center gap-3 md:items-start">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                  © {currentYear} AnotherSEOGuru — {isEl ? "Ένα προϊόν της Touristas Technologies" : "Touristas Technologies"}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCtaClick("footer_whatsapp")}
                    className="transition-colors hover:text-primary"
                  >
                    WhatsApp {PHONE_DISPLAY}
                  </a>
                  <span aria-hidden>•</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="break-all transition-colors hover:text-primary">
                    {CONTACT_EMAIL}
                  </a>
                  <span aria-hidden>•</span>
                  <Link href={lp("/contact")} className="transition-colors hover:text-primary">
                    {isEl ? t.contact : "Contact"}
                  </Link>
                  <span aria-hidden className="lg:hidden">
                    •
                  </span>
                  <CookiePreferencesLink
                    label={t.cookiePreferences}
                    className="cursor-pointer border-0 bg-transparent p-0 text-sm text-muted-foreground transition-colors hover:text-primary lg:hidden"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 md:items-end">
                <p className="text-xs text-muted-foreground">{isEl ? t.payments : "We accept"}</p>
                <ul
                  className="flex max-w-full flex-wrap items-center justify-center gap-1.5 md:justify-end"
                  aria-label={isEl ? "Δεχόμαστε κάρτες και ψηφιακές πληρωμές" : "Accepted payment methods"}
                >
                  {PAYMENT_LOGOS.map((logo) => (
                    <li key={logo.src} className="list-none">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={28}
                        className="h-6 w-auto rounded-sm opacity-70 transition-opacity hover:opacity-100 dark:brightness-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
