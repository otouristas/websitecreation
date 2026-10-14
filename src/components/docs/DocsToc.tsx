"use client";

import { useEffect, useState } from "react";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TocHeading {
  readonly id: string;
  readonly text: string;
  readonly level: 2 | 3;
}

/** "On this page", following the heading nearest the top of the viewport. */
export function DocsToc({ headings, label }: { readonly headings: ReadonlyArray<TocHeading>; readonly label: string }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <nav aria-label={label}>
      <p className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground">
        <AlignLeft className="size-3.5 text-muted-foreground" aria-hidden />
        {label}
      </p>
      <ul className="grid gap-0.5 border-l border-hairline">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-[13.5px] leading-snug transition-colors",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id ? "border-primary-glow font-medium text-primary-glow" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
