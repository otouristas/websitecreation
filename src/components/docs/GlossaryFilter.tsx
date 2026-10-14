"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export interface FilterTerm {
  readonly id: string;
  readonly name: string;
  readonly short: string;
  readonly href: string;
  readonly section: string;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Filter-as-you-type over the glossary. The full list below stays server-rendered. */
export function GlossaryFilter({ terms, placeholder, empty }: { readonly terms: ReadonlyArray<FilterTerm>; readonly placeholder: string; readonly empty: string }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const w = fold(q.trim());
    if (w.length < 2) return null;
    return terms.filter((t) => fold(`${t.name} ${t.short}`).includes(w)).slice(0, 12);
  }, [q, terms]);
  return (
    <div className="mt-7">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-11 w-full rounded-xl border border-hairline bg-surface pl-10 pr-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
        />
      </div>
      {hits ? (
        <ul className="mt-3 divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-surface">
          {hits.length === 0 ? <li className="px-4 py-4 text-[14px] text-muted-foreground">{empty}</li> : null}
          {hits.map((t) => (
            <li key={t.id}>
              <Link href={t.href} className="block px-4 py-3 hover:bg-primary/5">
                <span className="block text-[11.5px] text-muted-foreground">{t.section}</span>
                <span className="block text-[15px] font-medium text-foreground">{t.name}</span>
                <span className="block truncate text-[13.5px] text-muted-foreground">{t.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
