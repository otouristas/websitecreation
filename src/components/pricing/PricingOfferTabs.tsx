"use client";

import { useLayoutEffect, useSyncExternalStore, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import type { SiteLocale } from "@/lib/i18n/locale";
import { DEFAULT_PRICING_TAB, PRICING_TABS, tabFromLocation, type PricingTabId } from "./pricing-tabs";

const COPY = {
  label: { en: "Pricing categories", el: "Κατηγορίες τιμών" },
  tabs: {
    websites: { en: "Websites", el: "Ιστοσελίδες" },
    seo: { en: "SEO services", el: "Υπηρεσίες SEO" },
    software: { en: "AnotherSEOGuru App", el: "AnotherSEOGuru App" },
  },
} as const;

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function tabInLocation(): PricingTabId {
  return tabFromLocation(window.location.search, window.location.hash) ?? DEFAULT_PRICING_TAB;
}

function getSnapshot(): PricingTabId {
  return tabInLocation();
}

function getServerSnapshot(): PricingTabId {
  return DEFAULT_PRICING_TAB;
}

function applyTab(id: PricingTabId) {
  document.documentElement.setAttribute("data-pricing-tab", id);
}

function writeUrl(id: PricingTabId, mode: "push" | "replace") {
  const url = new URL(window.location.href);
  url.searchParams.set("tab", id);
  url.hash = id;
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === next) return;
  if (mode === "push") window.history.pushState({ pricingTab: id }, "", next);
  else window.history.replaceState({ pricingTab: id }, "", next);
}

/**
 * Tabs for the three offer groups. Panel markup is passed in as children and
 * stays in the document; this component only moves selection, focus and the URL.
 */
export function PricingOfferTabs({
  locale,
  children,
}: {
  readonly locale: SiteLocale;
  readonly children: ReactNode;
}) {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    applyTab(tabInLocation());
  }, [active]);

  function select(id: PricingTabId, mode: "push" | "replace") {
    writeUrl(id, mode);
    applyTab(id);
    emit();
  }

  function onClick(event: MouseEvent<HTMLAnchorElement>, id: PricingTabId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    select(id, "push");
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = PRICING_TABS.indexOf(active);
    let nextIndex = index;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % PRICING_TABS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + PRICING_TABS.length) % PRICING_TABS.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = PRICING_TABS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const id = PRICING_TABS[nextIndex];
    if (!id) return;
    select(id, "replace");
    document.getElementById(`pricing-tab-${id}`)?.focus();
  }

  return (
    <>
      <div
        role="tablist"
        aria-label={COPY.label[locale]}
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-1 rounded-2xl border border-hairline bg-surface/70 p-1"
      >
        {PRICING_TABS.map((id) => {
          const selected = active === id;
          return (
            <a
              key={id}
              id={`pricing-tab-${id}`}
              href={`?tab=${id}#${id}`}
              role="tab"
              data-pricing-tab-btn={id}
              aria-selected={selected}
              aria-controls={id}
              tabIndex={selected ? 0 : -1}
              onClick={(event) => onClick(event, id)}
              className="inline-flex min-h-11 min-w-0 items-center justify-center text-balance rounded-xl px-1 py-2 text-center text-[12px] leading-snug transition-[color,background-color,border-color] focus-visible:ring-2 focus-visible:ring-brand sm:px-3 sm:text-[14.5px]"
            >
              {COPY.tabs[id][locale]}
            </a>
          );
        })}
      </div>
      <div className="mt-10">{children}</div>
    </>
  );
}
