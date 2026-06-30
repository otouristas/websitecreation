'use client';

import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getNavDictionary } from '@/lib/i18n/get-dictionary';

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

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background lg:hidden" role="dialog" aria-modal="true">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
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
        <div className="flex flex-col gap-3">
          <Link
            href={lp('/get-started')}
            className="btn btn-gradient w-full py-4 text-center text-base font-semibold"
            onClick={onClose}
          >
            {nav.getQuote}
          </Link>
          <Link
            href={lp('/work')}
            className="btn btn-outline w-full py-4 text-center text-base font-semibold"
            onClick={onClose}
          >
            {nav.ourWork}
          </Link>
        </div>
      </div>
    </div>
  );
}
