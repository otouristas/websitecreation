'use client';

import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';
import { trackCtaClick } from '@/lib/analytics';
import { WHATSAPP_HREF, PHONE_DISPLAY } from '@/lib/contact-info';
import { getTrustChips } from '@/data/trust-stats';

interface MobileNavProps {
  locale: SiteLocale;
  isOpen: boolean;
  onClose: () => void;
  agencyLinks: readonly (readonly [string, string])[];
  mobileOpen: string | null;
  onToggleSection: (id: string) => void;
}

export function MobileNav({
  locale,
  isOpen,
  onClose,
  agencyLinks,
  mobileOpen,
  onToggleSection,
}: MobileNavProps) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const nav = getNavDictionary(locale);

  if (!isOpen) return null;

  const sections = [
    ...(!isEl
      ? [
          {
            id: 'platform',
            title: nav.platform,
            links: [
              [lp('/platform'), nav.platformOverview],
              [lp('/platform/features'), nav.allFeatures],
              [lp('/platform/pricing'), nav.softwarePricing],
              [lp('/platform/for/agencies'), nav.forAgencies],
            ] as const,
          },
        ]
      : []),
    {
      id: 'agency',
      title: nav.agency,
      links: agencyLinks,
    },
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

  const chips = getTrustChips(locale);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background lg:hidden" role="dialog" aria-modal="true">
      {/* Gradient hero header with trust chips */}
      <div className="shrink-0 bg-gradient-to-br from-primary/[0.12] via-background to-background">
        <div className="flex items-center justify-between px-4 py-3">
          <BrandLogo size="md" homeHref={lp('/')} onClick={onClose} />
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="rounded-xl p-2 text-foreground hover:bg-muted"
              onClick={onClose}
              aria-label={nav.closeMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-border/60 px-4 pb-3 text-xs font-medium text-muted-foreground">
          {chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-1">
              <span className="text-[hsl(142_69%_45%)]">✓</span> {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-border/60">
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-foreground"
              onClick={() => onToggleSection(section.id)}
              aria-expanded={mobileOpen === section.id}
            >
              {section.title}
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${mobileOpen === section.id ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileOpen === section.id ? (
              <div className="flex flex-col gap-1 pb-4 pl-1">
                {section.links.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex flex-col gap-1 py-4">
          {!isEl && (
            <Link href={lp('/tools')} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" onClick={onClose}>
              {nav.freeTools}
            </Link>
          )}
          <Link href={lp('/pricing')} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" onClick={onClose}>
            {nav.agencyPricing}
          </Link>
          <Link href={lp('/work')} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" onClick={onClose}>
            {nav.ourWork}
          </Link>
          <Link href={lp('/contact')} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" onClick={onClose}>
            {nav.contact}
          </Link>
          <Link href={lp('/blog')} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted" onClick={onClose}>
            {nav.blog}
          </Link>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-background p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-2.5">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCtaClick('mobile_nav_whatsapp');
              onClose();
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-base font-bold text-white shadow-md transition hover:opacity-90"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            {isEl ? 'WhatsApp' : 'WhatsApp'} · {PHONE_DISPLAY}
          </a>
          <Link
            href={lp('/get-started')}
            className="btn btn-gradient w-full py-4 text-center text-base font-semibold"
            onClick={onClose}
          >
            {nav.getQuote}
          </Link>
        </div>
      </div>
    </div>
  );
}
