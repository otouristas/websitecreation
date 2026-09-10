'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';
import { WHATSAPP_HREF } from '@/lib/contact-info';
import { getTrustStats, MARKETS_LABEL } from '@/data/trust-stats';
import { entrySeoNet, entryWebsiteNet, formatPrice } from '@/data/pricing';

interface MobileNavProps {
  locale: SiteLocale;
  alternateHref?: string;
  isOpen: boolean;
  onClose: () => void;
  agencyLinks: readonly (readonly [string, string])[];
  mobileOpen: string | null;
  onToggleSection: (id: string) => void;
}

const COPY: Record<
  SiteLocale,
  {
    offersTitle: string;
    websiteOffer: string;
    websiteMeta: (price: string) => string;
    seoOffer: string;
    seoMeta: (price: string) => string;
    vatNote: string;
    marketsLabel: string;
    moreTitle: string;
    talkTitle: string;
    whatsapp: string;
    replyNote: string;
  }
> = {
  el: {
    offersTitle: 'Τι κάνουμε',
    websiteOffer: 'Κατασκευή ιστοσελίδας',
    websiteMeta: (price) => `από €${price}`,
    seoOffer: 'SEO για επιχειρήσεις',
    seoMeta: (price) => `από €${price}/μήνα`,
    vatNote: 'Τιμές χωρίς ΦΠΑ 24%',
    marketsLabel: 'Αγορές',
    moreTitle: 'Περισσότερα',
    talkTitle: 'Ας μιλήσουμε',
    whatsapp: 'Μίλα μας στο WhatsApp',
    replyNote: 'Απαντάμε εντός 24 ωρών σε εργάσιμες ημέρες.',
  },
  en: {
    offersTitle: 'What we do',
    websiteOffer: 'Website creation',
    websiteMeta: (price) => `from €${price}`,
    seoOffer: 'SEO for businesses',
    seoMeta: (price) => `from €${price}/month`,
    vatNote: 'Prices exclude 24% VAT',
    marketsLabel: 'Markets',
    moreTitle: 'More',
    talkTitle: "Let's talk",
    whatsapp: 'Chat on WhatsApp',
    replyNote: 'We reply within 24 working hours.',
  },
};

/** Full-bleed row. Every tappable row in the sheet uses the same 56px rhythm. */
const rowClass =
  'flex min-h-14 w-full items-center justify-between gap-3 px-5 text-left text-[0.9375rem] text-foreground transition-colors active:bg-surface-raised';

/**
 * Full-screen, edge-to-edge mobile navigation.
 *
 * Rendered through a portal on `document.body`. The layout wraps page content
 * in `relative z-0`, which opens a stacking context, so the sheet's z-index
 * was scoped to that wrapper while the sticky quote bar and the WhatsApp pill
 * are body-level siblings - they painted straight over an open menu.
 *
 * Two things drove the redesign. First, the old sheet framed everything in a
 * 1rem gutter, so section dividers stopped short of the screen edge and the
 * panel read as a card floating on the page rather than as the page. Rows are
 * full-bleed now and only their text is inset. Second, it carried no reason to
 * buy: the menu is the highest-intent surface on mobile, so it now leads with
 * the two commercial offers and their entry prices, and carries the proof
 * numbers that already exist in the repo (project count, markets, languages,
 * response time) instead of a single thin chip row.
 */
export function MobileNav({
  locale,
  alternateHref,
  isOpen,
  onClose,
  agencyLinks,
  mobileOpen,
  onToggleSection,
}: MobileNavProps): ReactElement | null {
  const lp = (path: string) => localizedPath(locale, path);
  const nav = getNavDictionary(locale);
  const copy = COPY[locale] ?? COPY.en;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalHost(document.body);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      // Keep focus inside the sheet: it covers the whole viewport, so tabbing
      // out of it lands on controls nobody can see.
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !portalHost) return null;

  const sections = [
    { id: 'agency', title: nav.agency, links: agencyLinks },
    {
      id: 'solutions',
      title: nav.solutions,
      links: [
        [lp('/solutions/rent-a-car'), nav.rentACar],
        [lp('/solutions/hotels'), nav.hotels],
        [lp('/solutions/tour-operators'), nav.tours],
        [lp('/solutions/villas-apartments'), nav.villas],
        [lp('/solutions'), nav.allSolutions],
      ] as const,
    },
  ];

  const stats = getTrustStats(locale);

  const offers = [
    {
      href: lp('/services/website-creation'),
      title: copy.websiteOffer,
      meta: copy.websiteMeta(formatPrice(entryWebsiteNet(), locale)),
      cta: 'website_creation',
    },
    {
      href: lp('/services/seo-audits'),
      title: copy.seoOffer,
      meta: copy.seoMeta(formatPrice(entrySeoNet(), locale)),
      cta: 'seo',
    },
  ];

  const moreLinks: readonly (readonly [string, string])[] = [
    [lp('/pricing'), nav.pricing],
    [lp('/work'), nav.ourWork],
    [lp('/blog'), nav.blog],
    [lp('/contact'), nav.contact],
  ];

  return createPortal(
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col overscroll-contain bg-background lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={nav.agency}
    >
      {/* Header: edge to edge, hairline only, no inner card. */}
      <div className="shrink-0 border-b border-hairline bg-gradient-to-b from-primary/[0.07] to-transparent">
        <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] min-[400px]:px-5">
          {/* Same lockup rules as the site header: at 320px the wordmark and
              three controls cannot share a row without pushing the close
              button off-screen. */}
          <BrandLogo
            size="md"
            className="min-w-0 shrink-0"
            homeHref={lp('/')}
            onClick={onClose}
            imageClassName="h-7 w-7 min-[400px]:h-8 min-[400px]:w-8"
            textClassName="max-[359px]:sr-only whitespace-nowrap text-base min-[400px]:text-lg"
          />
          <div className="flex shrink-0 items-center gap-1 min-[400px]:gap-1.5">
            <LanguageSwitcher alternateHref={alternateHref} />
            <ThemeToggle locale={locale} />
            <button
              ref={closeButtonRef}
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onClick={onClose}
              aria-label={nav.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Marketing indicators. Numbers come from trust-stats, which derives
            the project count from the portfolio dataset, so nothing here can
            drift away from what /work actually lists. */}
        <dl className="grid grid-cols-4 divide-x divide-hairline border-t border-hairline">
          {stats.map((stat) => (
            <div key={stat.label} className="px-1.5 py-2.5 text-center min-[360px]:px-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[0.9375rem] font-semibold leading-tight text-foreground min-[360px]:text-base">
                  {stat.value}
                </span>
                <span className="mt-0.5 block text-[0.625rem] leading-tight text-muted-foreground min-[360px]:text-[0.6875rem]">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Commercial offers first: this is the highest-intent surface on
            mobile and it used to open on a services accordion. */}
        <p className="px-5 pb-1.5 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {copy.offersTitle}
        </p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {offers.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              onClick={() => {
                trackCtaClick(`mobile_nav_offer_${offer.cta}`);
                onClose();
              }}
              className={`${rowClass} font-semibold`}
            >
              <span>{offer.title}</span>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {offer.meta}
              </span>
            </Link>
          ))}
        </div>
        <p className="px-5 pb-3 pt-2 text-[0.6875rem] text-muted-foreground">{copy.vatNote}</p>

        {sections.map((section) => (
          <div key={section.id} className="border-t border-hairline">
            <button
              type="button"
              className={`${rowClass} font-semibold`}
              onClick={() => onToggleSection(section.id)}
              aria-expanded={mobileOpen === section.id}
            >
              {section.title}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                  mobileOpen === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileOpen === section.id ? (
              <div className="border-t border-hairline bg-surface-raised/50">
                {section.links.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex min-h-12 items-center px-5 pl-7 text-sm text-muted-foreground transition-colors active:text-foreground"
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <p className="px-5 pb-1.5 pt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {copy.moreTitle}
        </p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {moreLinks.map(([href, label]) => (
            <Link key={href} href={href} className={rowClass} onClick={onClose}>
              {label}
            </Link>
          ))}
        </div>

        <p className="px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{copy.marketsLabel}:</span>{' '}
          {MARKETS_LABEL[locale]}
        </p>
      </div>

      <div className="shrink-0 border-t border-hairline bg-background px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <p className="pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {copy.talkTitle}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href={lp('/get-started')}
            className="btn btn-gradient flex h-12 w-full items-center justify-center rounded-xl text-[0.9375rem] font-semibold"
            onClick={() => {
              trackCtaClick('mobile_nav_quote');
              onClose();
            }}
          >
            {nav.getQuote}
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCtaClick('mobile_nav_whatsapp');
              onClose();
            }}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-hairline text-[0.9375rem] font-semibold text-foreground transition-colors active:bg-surface-raised"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            {copy.whatsapp}
          </a>
        </div>
        <p className="pt-2.5 text-center text-[0.6875rem] text-muted-foreground">{copy.replyNote}</p>
      </div>
    </div>,
    portalHost,
  );
}
