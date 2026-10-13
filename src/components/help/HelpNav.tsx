"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ListTree } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NavCategory {
  readonly slug: string;
  readonly title: string;
  readonly href: string;
  readonly articles: ReadonlyArray<{ readonly title: string; readonly href: string }>;
}

/** Topics with their articles. The current topic opens and the current article is marked. */
export function HelpSidebar({
  categories,
  current,
  home,
}: {
  readonly categories: ReadonlyArray<NavCategory>;
  readonly current?: string;
  readonly home: { readonly href: string; readonly label: string };
}) {
  const pathname = usePathname();
  // The reader's own choices; untouched topics are open only when they hold the current page.
  const [toggled, setToggled] = useState<ReadonlyMap<string, boolean>>(() => new Map());
  const isTopicOpen = (slug: string) => toggled.get(slug) ?? slug === current;
  const toggle = (slug: string) => setToggled((m) => new Map(m).set(slug, !isTopicOpen(slug)));

  return (
    <nav aria-label={home.label} className="text-[14px]">
      <Link href={home.href} className="mb-4 block px-2 font-display text-[15px] font-semibold text-foreground hover:text-primary-glow">
        {home.label}
      </Link>
      <ul className="grid gap-0.5">
        {categories.map((cat) => {
          const isOpen = isTopicOpen(cat.slug);
          return (
            <li key={cat.slug}>
              <button
                type="button"
                onClick={() => toggle(cat.slug)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-medium transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  current === cat.slug ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="min-w-0 flex-1">{cat.title}</span>
                <ChevronRight className={cn("size-3.5 shrink-0 transition-transform", isOpen && "rotate-90")} aria-hidden />
              </button>
              {isOpen ? (
                <ul className="mb-2 ml-3 grid border-l border-hairline">
                  {cat.articles.map((a) => {
                    const active = pathname === a.href;
                    return (
                      <li key={a.href}>
                        <Link
                          href={a.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "-ml-px block border-l-2 py-1.5 pl-3 pr-2 leading-snug transition-colors",
                            active ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {a.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export interface TocHeading {
  readonly id: string;
  readonly text: string;
  readonly level: 2 | 3;
}

/** "In this article", following the heading nearest the top of the viewport. */
export function HelpToc({ headings, label, collapsible = false }: { readonly headings: ReadonlyArray<TocHeading>; readonly label: string; readonly collapsible?: boolean }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  const list = (
    <ul className="grid gap-0.5 border-l border-hairline">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l-2 py-1.5 pr-2 text-[13px] leading-snug transition-colors",
              h.level === 3 ? "pl-6" : "pl-4",
              active === h.id ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (collapsible) {
    return (
      <details className="group rounded-2xl border border-hairline bg-surface">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
          <ListTree className="size-4 text-muted-foreground" aria-hidden />
          {label}
          <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
        </summary>
        <div className="px-4 pb-4">{list}</div>
      </details>
    );
  }
  return (
    <nav aria-label={label}>
      <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">{label}</p>
      {list}
    </nav>
  );
}
