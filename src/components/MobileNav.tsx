'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { MarketingBadge } from '@/components/kit/primitives';
import { NAV_ICONS } from '@/components/nav/nav-icons';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';
import { WHATSAPP_HREF } from '@/lib/contact-info';
import { appLink } from '@/components/gsc-boost/copy';
import { GoogleTile } from '@/components/kit/sections';
import type { NavItem, NavMenu, NavModel } from '@/data/nav-menu';

interface MobileNavProps {
  locale: SiteLocale;
  alternateHref?: string;
  isOpen: boolean;
  onClose: () => void;
  model: NavModel;
}

const COPY: Record<SiteLocale, { more: string; talk: string; whatsapp: string; reply: string; markets: string; vat: string }> = {
  el: {
    more: 'Περισσότερα',
    talk: 'Ας μιλήσουμε',
    whatsapp: 'WhatsApp',
    reply: 'Απαντάμε σε 24 ώρες, στα ελληνικά ή στα αγγλικά.',
    markets: 'Αγορές',
    vat: 'Τιμές χωρίς ΦΠΑ 24%',
  },
  en: {
    more: 'More',
    talk: "Let's talk",
    whatsapp: 'WhatsApp',
    reply: 'We reply within 24 hours, in English or Greek.',
    markets: 'Markets',
    vat: 'Prices exclude 24% VAT',
  },
};

function Row({ item, onClose }: { readonly item: NavItem; readonly onClose: () => void }) {
  const Icon = item.icon ? NAV_ICONS[item.icon] : null;
  const body = (
    <>
      {Icon ? (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface text-brand">
          <Icon className="size-5" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-[0.9375rem] font-semibold text-foreground">{item.label}</span>
          {item.badge ? <MarketingBadge kind={item.badge.kind}>{item.badge.label}</MarketingBadge> : null}
        </span>
        {item.desc ? <span className="mt-0.5 block truncate text-[0.8125rem] text-muted-foreground">{item.desc}</span> : null}
      </span>
      {item.meta ? (
        <span className="shrink-0 rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-primary-glow">{item.meta}</span>
      ) : (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
      )}
    </>
  );
  const cls = 'flex min-h-16 w-full items-center gap-3 px-5 py-2.5 text-left transition-colors active:bg-surface-raised';
  return item.external ? (
    <a href={item.href} className={cls} onClick={onClose}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={cls} onClick={onClose}>
      {body}
    </Link>
  );
}

function FeatureBlock({ menu, onClose }: { readonly menu: NavMenu; readonly onClose: () => void }) {
  const f = menu.feature;
  const software = f.tone === 'software';
  const go = (l: NonNullable<typeof f.secondary>, cls: string, cta: string) => {
    const handler = () => {
      trackCtaClick(cta);
      onClose();
    };
    return l.external ? (
      <a href={l.href} className={cls} onClick={handler}>
        {l.label}
      </a>
    ) : (
      <Link href={l.href} className={cls} onClick={handler}>
        {l.label}
      </Link>
    );
  };
  return (
    <div
      className={cn(
        'border-y px-5 py-5',
        software
          ? 'border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_12%,var(--background)),var(--background))]'
          : 'border-primary/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_18%,var(--background)),var(--background))]',
      )}
    >
      <p className={cn('font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]', 'text-brand')}>{f.eyebrow}</p>
      <p className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">{f.title}</p>
      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{f.body}</p>
      {f.chips && f.chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {f.chips.map((c) => (
            <span key={c} className="rounded-full border border-hairline bg-background/60 px-2.5 py-1 font-mono text-[0.6875rem] text-foreground/85">
              {c}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {go(
          f.primary,
          cn(
            'col-span-2 flex h-12 items-center justify-center rounded-xl text-[0.9375rem] font-semibold',
            'asg-primary-action text-primary-foreground',
          ),
          `mobile_nav_${menu.id}_primary`,
        )}
        {f.secondary
          ? go(f.secondary, 'col-span-2 flex h-11 items-center justify-center rounded-xl border border-hairline text-sm font-medium text-foreground', `mobile_nav_${menu.id}_secondary`)
          : null}
      </div>
    </div>
  );
}

/**
 * Full-screen, edge-to-edge mobile navigation.
 *
 * Portalled to <body> so no page stacking context can paint over it. Every
 * row runs to both screen edges and only its content is inset. The sheet
 * opens on a promo line for AnotherSEOGuru App and four proof indicators, then four
 * tabs that mirror the desktop mega menus (same items, same badges and
 * prices, from `getNavModel`). Each tab ends on its offer, and the free audit
 * and WhatsApp stay pinned at the bottom.
 */
export function MobileNav({ locale, alternateHref, isOpen, onClose, model }: MobileNavProps): ReactElement | null {
  const nav = getNavDictionary(locale);
  const copy = COPY[locale] ?? COPY.en;
  const lp = (path: string) => localizedPath(locale, path);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  const [tab, setTab] = useState<NavMenu['id']>('services');

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
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
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

  const signupHref = appLink('/signup', locale, 'mobile-nav');
  const loginHref = appLink('/login', locale, 'mobile-nav');
  const menu = model.menus.find((m) => m.id === tab) ?? model.menus[0];
  const more: NavItem[] = [...model.links, { href: lp('/about'), label: locale === 'el' ? 'Ποιοι είμαστε' : 'About' }, { href: lp('/contact'), label: nav.contact }];

  return createPortal(
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col overscroll-contain bg-background lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={nav.openMenu}
    >
      <div className="shrink-0 border-b border-hairline">
        <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] min-[400px]:px-5">
          <BrandLogo
            size="md"
            className="min-w-0 shrink-0"
            homeHref={lp('/')}
            onClick={onClose}
            imageClassName="h-7 min-[400px]:h-8"
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
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Sign-up first: the software is the one thing a visitor can start
            right now, so it leads the sheet instead of a promo line and stats. */}
        <div className="border-b border-hairline px-4 py-4 min-[400px]:px-5">
          <a
            href={signupHref}
            onClick={() => {
              trackCtaClick('mobile_nav_signup');
              onClose();
            }}
            className="flex h-12 items-center justify-center gap-2.5 rounded-xl asg-primary-action pl-2 pr-4 font-display text-[0.9375rem] font-semibold text-primary-foreground shadow-[inset_0_1px_0_0_oklch(1_0_0/30%)]"
          >
            <GoogleTile className="size-8" />
            {model.startFree.label}
          </a>
          <div className="mt-2.5 flex items-center justify-between gap-3 text-[0.8125rem]">
            <span className="min-w-0 truncate text-muted-foreground">{nav.signUpNote}</span>
            <a href={loginHref} onClick={onClose} className="shrink-0 font-medium text-link">
              {nav.logIn}
            </a>
          </div>
        </div>

        {/* Tabs mirror the desktop mega menus. */}
        <div role="tablist" aria-label={nav.openMenu} className="sticky top-0 z-10 flex overflow-x-auto border-b border-hairline bg-background/95 backdrop-blur scrollbar-none">
          {model.menus.map((m) => (
            <button
              key={m.id}
              role="tab"
              type="button"
              aria-selected={tab === m.id}
              onClick={() => setTab(m.id)}
              className={cn(
                'relative flex min-h-12 shrink-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-3 text-[0.84375rem] font-medium transition-colors',
                tab === m.id ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {m.label}
              {m.badge ? <span aria-label={m.badge.label} className="size-2 rounded-full bg-signal" /> : null}
              <span className={cn('absolute inset-x-3 bottom-0 h-0.5 rounded-full', tab === m.id ? ('bg-primary') : 'bg-transparent')} />
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="px-5 pb-1.5 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand">{col.title}</p>
              <div className="divide-y divide-hairline border-y border-hairline">
                {col.items.map((item) => (
                  <Row key={item.href + item.label} item={item} onClose={onClose} />
                ))}
              </div>
            </div>
          ))}
          {menu.footer ? (
            <Link href={menu.footer.href} onClick={onClose} className="flex min-h-12 items-center justify-between px-5 text-sm font-semibold text-link">
              {menu.footer.label}
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
          {menu.id === 'services' ? <p className="px-5 pb-3 text-[0.6875rem] text-muted-foreground">{copy.vat}</p> : null}
          <FeatureBlock menu={menu} onClose={onClose} />
        </div>

        <p className="px-5 pb-1.5 pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand">{copy.more}</p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {more.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="flex min-h-14 items-center justify-between px-5 text-[0.9375rem] text-foreground active:bg-surface-raised">
              {item.label}
              <ChevronRight className="size-4 text-muted-foreground/70" aria-hidden />
            </Link>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-hairline bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Link
            href={model.freeAudit.href}
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl asg-primary-action text-[0.9375rem] font-semibold text-primary-foreground"
            onClick={() => {
              trackCtaClick('mobile_nav_free_audit');
              onClose();
            }}
          >
            {model.freeAudit.label}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCtaClick('mobile_nav_whatsapp');
              onClose();
            }}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-hairline px-4 text-[0.9375rem] font-medium text-foreground"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            {copy.whatsapp}
          </a>
        </div>
        <p className="pt-2 text-center text-[0.6875rem] text-muted-foreground">{copy.reply}</p>
      </div>
    </div>,
    portalHost,
  );
}
