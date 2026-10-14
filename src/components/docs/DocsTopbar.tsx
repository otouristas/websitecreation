"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, Search, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/cn";
import { docIcon } from "./icons";
import { useDocsUI } from "./DocsUI";
import type { DocsTab, TabLink } from "@/lib/docs/nav";

export interface TopbarCopy {
  readonly homeHref: string;
  readonly signupHref: string;
  readonly signupLabel: string;
  readonly signupShort: string;
  readonly appHref: string;
  readonly appLabel: string;
  readonly menuLabel: string;
  readonly searchLabel: string;
  readonly askLabel: string;
}

/** Tabs across the top, as in Mintlify, plus the sign-up action. On phones it also carries the logo and menu. */
export function DocsTopbar({ tabs, active, copy }: { readonly tabs: ReadonlyArray<TabLink>; readonly active: DocsTab; readonly copy: TopbarCopy }) {
  const ui = useDocsUI();
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      {/* Phone row: menu, logo, search, ask, sign up. */}
      <div className="flex h-14 items-center gap-2 px-4 lg:hidden">
        <button type="button" onClick={() => ui.open("menu")} aria-label={copy.menuLabel} className="grid size-9 place-items-center rounded-lg border border-hairline text-foreground">
          <Menu className="size-4.5" aria-hidden />
        </button>
        <BrandLogo size="sm" homeHref={copy.homeHref} imageClassName="h-6 min-[400px]:h-7" />
        <div className="ml-auto flex items-center gap-1.5">
          <button type="button" onClick={() => ui.open("search")} aria-label={copy.searchLabel} className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
            <Search className="size-4.5" aria-hidden />
          </button>
          <button type="button" onClick={() => ui.open("ask")} aria-label={copy.askLabel} className="grid size-9 place-items-center rounded-lg text-primary-glow">
            <Sparkles className="size-4.5" aria-hidden />
          </button>
          <a href={copy.signupHref} className="asg-primary-action inline-flex h-9 items-center rounded-full px-3.5 font-display text-[13.5px] font-semibold text-primary-foreground">
            {copy.signupShort}
          </a>
        </div>
      </div>
      <div className="flex items-center gap-6 px-4 sm:px-8 lg:h-14">
        <nav aria-label="Docs sections" className="-mb-px flex min-w-0 flex-1 gap-5 overflow-x-auto [scrollbar-width:none] lg:gap-7">
          {tabs.map((t) => {
            const Icon = docIcon(t.icon);
            const on = t.id === active;
            return (
              <Link
                key={t.id}
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 border-b-2 text-[14px] transition-colors lg:h-14",
                  on ? "border-primary-glow font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {Icon ? <Icon className={cn("size-4", on ? "text-primary-glow" : "")} aria-hidden /> : null}
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a href={copy.appHref} className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-[13.5px] font-medium text-muted-foreground hover:text-foreground">
            {copy.appLabel}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
          <a
            href={copy.signupHref}
            className="asg-primary-action inline-flex h-9 items-center rounded-full px-4 font-display text-[14px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-transform hover:-translate-y-px"
          >
            {copy.signupLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
