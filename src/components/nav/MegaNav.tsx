'use client';

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { NavFeature, NavItem, NavMenu, NavModel } from '@/data/nav-menu';
import { MarketingBadge } from '@/components/kit/primitives';
import { trackCtaClick } from '@/lib/analytics';
import { NAV_ICONS } from './nav-icons';

const triggerClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/6 hover:text-foreground aria-expanded:bg-foreground/6 aria-expanded:text-foreground';

function ItemLink({ item, onNavigate }: { readonly item: NavItem; readonly onNavigate: () => void }) {
  const Icon = item.icon ? NAV_ICONS[item.icon] : null;
  const body = (
    <>
      {Icon ? (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-brand transition-colors group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-[18px]" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-foreground">{item.label}</span>
          {item.badge ? <MarketingBadge kind={item.badge.kind}>{item.badge.label}</MarketingBadge> : null}
        </span>
        {item.desc ? <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">{item.desc}</span> : null}
        {item.meta ? <span className="mt-1 block font-mono text-[11px] text-brand">{item.meta}</span> : null}
      </span>
    </>
  );
  const cls = 'group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-foreground/[0.045] focus-visible:bg-foreground/[0.045] focus-visible:outline-none';
  return item.external ? (
    <a href={item.href} className={cls} onClick={onNavigate}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={cls} onClick={onNavigate}>
      {body}
    </Link>
  );
}

function FeatureCard({ feature, menuId, onNavigate }: { readonly feature: NavFeature; readonly menuId: string; readonly onNavigate: () => void }) {
  const software = feature.tone === 'software';
  const agency = feature.tone === 'agency';
  const linkFor = (l: NonNullable<NavFeature['secondary']>, cls: string, cta: string) =>
    l.external ? (
      <a href={l.href} className={cls} onClick={() => { trackCtaClick(cta); onNavigate(); }}>
        {l.label}
        <ArrowRight className="size-4" />
      </a>
    ) : (
      <Link href={l.href} className={cls} onClick={() => { trackCtaClick(cta); onNavigate(); }}>
        {l.label}
        <ArrowRight className="size-4" />
      </Link>
    );

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-2xl border p-5',
        software && 'border-signal/35 bg-[linear-gradient(170deg,color-mix(in_oklab,var(--signal)_12%,var(--surface)),var(--surface)_70%)]',
        agency && 'border-primary/40 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--primary)_28%,var(--surface)),var(--surface)_75%)]',
        feature.tone === 'proof' && 'border-hairline bg-surface',
      )}
    >
      <span className={cn('font-mono text-[11px] font-medium uppercase tracking-[0.12em]', software ? 'text-signal' : 'text-brand')}>
        {feature.eyebrow}
      </span>
      <p className="mt-2 font-display text-[19px] font-semibold leading-snug tracking-[-0.02em] text-foreground">{feature.title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{feature.body}</p>

      {software ? (
        <ul className="mt-4 grid gap-1.5 rounded-xl border border-hairline bg-background/70 p-2 text-[12px]" aria-hidden>
          {[
            ['+412', 'boutique hotel paros → top 3'],
            ['+268', '/paros-hotel-with-pool · CTR'],
            ['+190', '/blog/best-beaches-paros'],
          ].map(([gain, label]) => (
            <li key={label} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
              <Sparkles className="size-3.5 shrink-0 text-signal" />
              <span className="min-w-0 flex-1 truncate text-foreground/85">{label}</span>
              <span className="font-semibold tabular-nums text-foreground">{gain}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {feature.points && feature.points.length > 0 ? (
        <ul className="mt-4 grid gap-2 text-[12.5px] text-foreground/85">
          {feature.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      ) : null}

      {feature.chips && feature.chips.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {feature.chips.map((c) => (
            <span key={c} className="rounded-full border border-hairline bg-background/60 px-2.5 py-1 font-mono text-[11px] text-foreground/85">
              {c}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-2 pt-5">
        {linkFor(
          feature.primary,
          cn(
            'inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-semibold transition-[transform,filter] hover:-translate-y-px',
            software ? 'bg-signal text-signal-foreground hover:brightness-105' : 'bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] text-primary-foreground',
          ),
          `mega_${menuId}_primary`,
        )}
        {feature.secondary
          ? linkFor(
              feature.secondary,
              'inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-hairline bg-background/60 px-4 text-sm font-medium text-foreground transition-colors hover:border-brand/50',
              `mega_${menuId}_secondary`,
            )
          : null}
      </div>
    </div>
  );
}

function Panel({ menu, onNavigate, chips }: { readonly menu: NavMenu; readonly onNavigate: () => void; readonly chips: readonly string[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-hairline bg-popover shadow-[inset_0_1px_0_0_oklch(1_0_0/6%),0_30px_70px_-20px_color-mix(in_oklab,var(--primary)_35%,transparent),0_30px_70px_-30px_oklch(0_0_0/60%)]">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_17.5rem] gap-2 p-3">
        {menu.columns.map((col) => (
          <div key={col.title} className="p-2">
            <p className="px-2.5 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{col.title}</p>
            <div className="grid gap-0.5">
              {col.items.map((item) => (
                <ItemLink key={item.href + item.label} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
        <FeatureCard feature={menu.feature} menuId={menu.id} onNavigate={onNavigate} />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-hairline bg-surface/60 px-6 py-3 text-[12.5px]">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
          {chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-signal" />
              {c}
            </span>
          ))}
        </div>
        {menu.footer ? (
          <Link href={menu.footer.href} onClick={onNavigate} className="inline-flex shrink-0 items-center gap-1 font-semibold text-link hover:underline">
            {menu.footer.label}
            <ArrowRight className="size-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Desktop navigation inside the floating header pill: four mega menus
 * (Services, Industries, GSC Boost, Learn) plus plain links. One panel is
 * open at a time and it opens on hover, on click and from the keyboard;
 * Escape and a click outside close it.
 */
export function MegaNav({ model, chips }: { readonly model: NavModel; readonly chips: readonly string[] }): ReactElement {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // The pill has a backdrop-filter, which makes it the containing block for
    // fixed children; the panel is portalled to <body> so it lines up with
    // the viewport instead of with the pill.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHost(document.body);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }, [cancelClose]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        rootRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  useEffect(() => cancelClose, [cancelClose]);

  const active = model.menus.find((m) => m.id === open) ?? null;

  return (
    <div ref={rootRef} className="flex items-center gap-0.5" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
      {model.menus.map((menu) => (
        <button
          key={menu.id}
          type="button"
          data-menu={menu.id}
          className={triggerClass}
          aria-expanded={open === menu.id}
          aria-controls={`mega-${menu.id}`}
          onMouseEnter={() => {
            cancelClose();
            setOpen(menu.id);
          }}
          onClick={() => setOpen((cur) => (cur === menu.id ? null : menu.id))}
        >
          {menu.label}
          {menu.badge ? (
            <span className="relative flex size-2" aria-label={menu.badge.label}>
              <span className="absolute inset-0 animate-ping rounded-full bg-signal/60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
          ) : null}
          <ChevronDown className={cn('size-4 transition-transform', open === menu.id && 'rotate-180')} aria-hidden />
        </button>
      ))}
      {model.links.map((l) => (
        <Link key={l.href} href={l.href} className={cn(triggerClass, 'hidden xl:inline-flex')} onMouseEnter={() => setOpen(null)}>
          {l.label}
        </Link>
      ))}

      {active && host
        ? createPortal(
            <div className="pointer-events-none fixed inset-x-0 top-[calc(var(--site-header-height)+0.25rem)] z-[70] hidden px-6 lg:block">
              <div
                ref={panelRef}
                id={`mega-${active.id}`}
                className="pointer-events-auto mx-auto max-w-6xl pt-1"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <Panel menu={active} chips={chips} onNavigate={() => setOpen(null)} />
              </div>
            </div>,
            host,
          )
        : null}
    </div>
  );
}
