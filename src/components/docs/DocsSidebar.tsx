"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronRight, FileText, Globe, Search, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import { DocIcon } from "./icons";
import { useDocsUI } from "./DocsUI";
import type { SideGroup, SideItem } from "@/lib/docs/nav";

export interface SidebarChrome {
  readonly homeHref: string;
  readonly docsHref: string;
  readonly searchLabel: string;
  readonly askLabel: string;
  readonly signupHref: string;
  readonly signupLabel: string;
  readonly appHref: string;
  readonly appLabel: string;
  readonly llmsLabel: string;
  readonly alternate: { readonly href: string; readonly label: string } | null;
  readonly languageLabel: string;
}

const isActive = (pathname: string, href: string) => pathname === href;
const holdsActive = (pathname: string, item: SideItem): boolean =>
  isActive(pathname, item.href) || (item.children ?? []).some((c) => holdsActive(pathname, c));

function Item({ item, pathname, depth = 0 }: { readonly item: SideItem; readonly pathname: string; readonly depth?: number }) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? holdsActive(pathname, item);
  const active = isActive(pathname, item.href);
  const linkClass = cn(
    "group flex min-h-8 flex-1 items-center gap-2.5 rounded-lg py-1.5 pr-2 text-[14px] leading-snug transition-colors",
    depth === 0 ? "pl-3" : "pl-3",
    active ? "bg-primary/10 font-medium text-primary-glow" : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
  );
  const body = (
    <>
      <DocIcon name={item.icon} className={cn("size-4 shrink-0", active ? "text-primary-glow" : "text-muted-foreground/80 group-hover:text-foreground")} />
      <span className="min-w-0 flex-1">{item.title}</span>
      {item.badge ? (
        <span className="rounded-md bg-primary/12 px-1.5 py-px font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-glow">{item.badge}</span>
      ) : null}
      {item.external ? <ArrowUpRight className="size-3.5 shrink-0 opacity-60" aria-hidden /> : null}
    </>
  );
  return (
    <li>
      <div className="flex items-center">
        {item.external ? (
          <a href={item.href} className={linkClass} target="_blank" rel="noopener">
            {body}
          </a>
        ) : (
          <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
            {body}
          </Link>
        )}
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setToggled(!open)}
            aria-expanded={open}
            aria-label={item.title}
            className="ml-0.5 grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} aria-hidden />
          </button>
        ) : null}
      </div>
      {hasChildren && open ? (
        <ul className="my-1 ml-5 grid gap-px border-l border-hairline pl-2">
          {item.children!.map((c) => (
            <Item key={c.href} item={c} pathname={pathname} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** Logo, search, grouped pages and the account links, as in Mintlify docs. */
export function DocsSidebar({ groups, chrome, locale }: { readonly groups: ReadonlyArray<SideGroup>; readonly chrome: SidebarChrome; readonly locale: "en" | "el" }) {
  const pathname = usePathname() ?? "";
  const ui = useDocsUI();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 pb-4 pt-5">
        <BrandLogo size="sm" homeHref={chrome.homeHref} imageClassName="h-6" />
        <Link href={chrome.docsHref} className="rounded-md border border-hairline px-1.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
          Docs
        </Link>
        <div className="ml-auto">
          <ThemeToggle locale={locale} />
        </div>
      </div>
      <div className="grid gap-2 px-4">
        <button
          type="button"
          onClick={() => ui.open("search")}
          className="flex h-10 w-full items-center gap-2.5 rounded-xl border border-hairline bg-surface px-3 text-left text-[14px] text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Search className="size-4" aria-hidden />
          <span className="flex-1">{chrome.searchLabel}</span>
          <kbd className="rounded-md border border-hairline px-1.5 font-mono text-[11px]">⌘K</kbd>
        </button>
        <button
          type="button"
          onClick={() => ui.open("ask")}
          className="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-left text-[14px] font-medium text-foreground transition-colors hover:bg-primary/8"
        >
          <Sparkles className="size-4 text-primary-glow" aria-hidden />
          <span className="flex-1">{chrome.askLabel}</span>
          <kbd className="rounded-md border border-hairline px-1.5 font-mono text-[11px] text-muted-foreground">⌘I</kbd>
        </button>
      </div>

      <nav aria-label="Docs" className="mt-4 min-h-0 flex-1 overflow-y-auto px-3 pb-6 [scrollbar-width:thin]">
        {groups.map((g) => (
          <div key={g.title} className="mt-5 first:mt-1">
            <p className="mb-1.5 px-3 text-[12.5px] font-semibold tracking-[-0.005em] text-foreground">{g.title}</p>
            <ul className="grid gap-px">
              {g.items.map((item) => (
                <Item key={item.href + item.title} item={item} pathname={pathname} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="grid gap-1 border-t border-hairline px-3 py-3 text-[13.5px]">
        <a href="/llms-full.txt" className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground">
          <FileText className="size-4" aria-hidden />
          <span className="flex-1">{chrome.llmsLabel}</span>
          <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
        </a>
        <a href={chrome.appHref} className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground">
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="flex-1">{chrome.appLabel}</span>
        </a>
        {chrome.alternate ? (
          <Link
            href={chrome.alternate.href}
            hrefLang={locale === "el" ? "en" : "el"}
            className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
          >
            <Globe className="size-4" aria-hidden />
            <span className="flex-1">{chrome.languageLabel}</span>
            <span className="font-medium text-foreground">{chrome.alternate.label}</span>
          </Link>
        ) : null}
        <a
          href={chrome.signupHref}
          className="asg-primary-action mt-2 inline-flex h-10 items-center justify-center rounded-xl font-display text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
        >
          {chrome.signupLabel}
        </a>
      </div>
    </div>
  );
}
