'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactElement } from 'react';
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
  onClose: () => void;
  model: NavModel;
}

const COPY: Record<SiteLocale, { more: string; whatsapp: string; reply: string; vat: string }> = {
  el: {
    more: 'Περισσότερα',
    whatsapp: 'WhatsApp',
    reply: 'Απαντάμε σε 24 ώρες, στα ελληνικά ή στα αγγλικά.',
    vat: 'Σε κάθε τιμή αναγράφεται αν περιλαμβάνει ΦΠΑ 24%.',
  },
  en: {
    more: 'More',
    whatsapp: 'WhatsApp',
    reply: 'We reply within 24 hours, in English or Greek.',
    vat: 'Each price states whether it includes 24% VAT.',
  },
};

function Row({ item, pathname, onClose }: { readonly item: NavItem; readonly pathname: string; readonly onClose: () => void }) {
  const current = pathname === item.href ? 'page' : pathname.startsWith(item.href + '/') ? 'location' : undefined;
  const badge = item.badge?.kind === 'free' ? item.badge : undefined;
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
          {badge ? <MarketingBadge kind={badge.kind} className="text-foreground">{badge.label}</MarketingBadge> : null}
        </span>
        {item.desc ? <span className="mt-0.5 block break-words text-[0.8125rem] text-muted-foreground">{item.desc}</span> : null}
      </span>
      {item.meta ? (
        <span className="shrink-0 rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-foreground">{item.meta}</span>
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
    <Link href={item.href} aria-current={current} className={cn(cls, current && 'border-l-2 border-primary bg-primary/10')} onClick={onClose}>
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
        {software && l === f.primary ? <GoogleTile className="size-7" /> : null}
        {l.label}
      </a>
    ) : (
      <Link href={l.href} className={cls} onClick={handler}>
        {software && l === f.primary ? <GoogleTile className="size-7" /> : null}
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
            'col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[0.9375rem] font-semibold',
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

export function MobileNav({ locale, alternateHref, onClose, model }: MobileNavProps): ReactElement | null {
  const nav = getNavDictionary(locale);
  const pathname = usePathname() ?? '';
  const copy = COPY[locale] ?? COPY.en;
  const lp = (path: string) => localizedPath(locale, path);
  const panelRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<NavMenu['id'] | null>(null);
  const section = model.menus.find((group) => group.columns.some((column) =>
    column.items.some(({ href }) => href === pathname || pathname.startsWith(href + '/'))
  ));
  const isAgency = model.mode === 'agency';

  useEffect(() => {
    const dialog = panelRef.current;
    if (!dialog) return;
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.getElementById('mobile-menu-trigger')?.focus({ preventScroll: true });
    };
  }, []);

  const signupHref = appLink('/signup', locale, 'mobile-nav');
  const loginHref = appLink('/login', locale, 'mobile-nav');
  const menu = model.menus.find((m) => m.id === tab) ?? section ?? model.menus[0];
  const more: NavItem[] = [...model.links, { href: lp('/about'), label: locale === 'el' ? 'Ποιοι είμαστε' : 'About' }, { href: lp('/contact'), label: nav.contact }];

  return createPortal(
    <dialog
      ref={panelRef}
      className="fixed inset-0 m-0 flex h-screen max-h-none w-full max-w-none flex-col overscroll-contain border-0 bg-background p-0 text-foreground supports-[height:100dvh]:h-dvh lg:hidden"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      aria-modal="true"
      aria-label={locale === 'el' ? 'Πλοήγηση' : 'Navigation'}
    >
      <div className="shrink-0 border-b border-hairline">
        <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] min-[400px]:px-5">
          <BrandLogo
            size="md"
            className="min-w-0 shrink-0"
            homeHref={model.homeHref}
            onClick={onClose}
            imageClassName="h-7 min-[400px]:h-8"
          />
          <div className="flex shrink-0 items-center gap-1 min-[400px]:gap-1.5">
            <LanguageSwitcher alternateHref={alternateHref} />
            <ThemeToggle locale={locale} />
            <button
              ref={closeButtonRef}
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              // Close on touch release as well as on click: some iOS browsers
              // never deliver the click to a button inside this fixed sheet,
              // which left the X dead. The header ignores the ghost click.
              onPointerUp={(event) => {
                if (event.pointerType !== 'mouse') onClose();
              }}
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
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
        {isAgency ? null : (
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
            <span className="min-w-0 text-muted-foreground">{locale === 'el' ? 'Μόνο για ανάγνωση στο Search Console' : 'Read-only Search Console access'}</span>
            <a href={loginHref} onClick={onClose} className="shrink-0 font-medium text-link">
              {nav.logIn}
            </a>
          </div>
        </div>
        )}

        {/* Tabs mirror the desktop mega menus. */}
        <div role="tablist" aria-label={nav.openMenu} className="sticky top-0 z-10 flex overflow-x-auto border-b border-hairline bg-background/95 backdrop-blur scrollbar-none">
          {model.menus.map((m) => (
            <button
              key={m.id}
              role="tab"
              id={`mobile-tab-${m.id}`}
              aria-controls="mobile-nav-content"
              tabIndex={menu.id === m.id ? 0 : -1}
              onKeyDown={(event) => {
                const index = model.menus.indexOf(m);
                const count = model.menus.length;
                const next = {
                  ArrowRight: (index + 1) % count,
                  ArrowLeft: (index + count - 1) % count,
                  Home: 0,
                  End: count - 1,
                }[event.key];
                if (next === undefined) return;
                event.preventDefault();
                const nextId = model.menus[next].id;
                setTab(nextId);
                document.getElementById(`mobile-tab-${nextId}`)?.focus();
              }}
              type="button"
              aria-selected={menu.id === m.id}
              onClick={() => setTab(m.id)}
              className={cn(
                'relative flex min-h-12 shrink-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-3 text-[0.84375rem] font-medium transition-colors',
                menu.id === m.id ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {m.label}
              {m.badge ? <span aria-label={m.badge.label} className="size-2 rounded-full bg-signal" /> : null}
              <span className={cn('absolute inset-x-3 bottom-0 h-0.5 rounded-full', menu.id === m.id ? ('bg-primary') : 'bg-transparent')} />
            </button>
          ))}
        </div>

        <div id="mobile-nav-content" role="tabpanel" aria-labelledby={`mobile-tab-${menu.id}`}>
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="px-5 pb-1.5 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand">{col.title}</p>
              <div className="divide-y divide-hairline border-y border-hairline">
                {col.items.map((item) => (
                  <Row key={item.href + item.label} item={item} pathname={pathname} onClose={onClose} />
                ))}
              </div>
            </div>
          ))}
          {menu.footer ? (
            <Link href={menu.footer.href} aria-current={pathname === menu.footer.href ? "page" : undefined} onClick={onClose} className="aria-[current=page]:bg-primary/10 flex min-h-12 items-center justify-between px-5 text-sm font-semibold text-link">
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
            <Link key={item.href} href={item.href} aria-current={item.href === pathname ? "page" : undefined} onClick={onClose} className="aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary flex min-h-14 items-center justify-between px-5 text-[0.9375rem] text-foreground active:bg-surface-raised">
              {item.label}
              <ChevronRight className="size-4 text-muted-foreground/70" aria-hidden />
            </Link>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-hairline bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        {isAgency ? (
        <>
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
        </>
        ) : (
          <a
            href={model.secondaryCta.href}
            onClick={() => {
              trackCtaClick('mobile_nav_demo');
              onClose();
            }}
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl border border-hairline text-[0.9375rem] font-semibold text-foreground"
          >
            {model.secondaryCta.label}
            <ArrowRight className="size-4" />
          </a>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
