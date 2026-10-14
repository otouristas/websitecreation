"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, FileText } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PageActionsCopy {
  readonly copy: string;
  readonly copied: string;
  readonly copyHint: string;
  readonly view: string;
  readonly viewHint: string;
  /** "{name}" is replaced with the assistant's name. */
  readonly openIn: string;
  readonly openHint: string;
  readonly more: string;
}

const AI = [
  { name: "ChatGPT", url: (q: string) => `https://chatgpt.com/?hints=search&q=${q}`, logo: "M" },
  { name: "Claude", url: (q: string) => `https://claude.ai/new?q=${q}`, logo: "C" },
  { name: "Perplexity", url: (q: string) => `https://www.perplexity.ai/search?q=${q}`, logo: "P" },
] as const;

/** "Copy page" with a menu: view as Markdown, or open the page in an assistant. */
export function PageActions({ mdHref, pageUrl, copy }: { readonly mdHref: string; readonly pageUrl: string; readonly copy: PageActionsCopy }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  async function copyPage() {
    try {
      const res = await fetch(mdHref);
      await navigator.clipboard.writeText(await res.text());
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      window.open(mdHref, "_blank");
    }
    setOpen(false);
  }

  const prompt = encodeURIComponent(`Read ${pageUrl}.md so I can ask questions about it.`);
  const item = "flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-foreground/[0.05]";

  return (
    <div ref={box} className="relative inline-flex shrink-0">
      <button
        type="button"
        onClick={copyPage}
        className="inline-flex h-9 items-center gap-2 rounded-l-xl border border-hairline bg-surface px-3 text-[13.5px] font-medium text-foreground transition-colors hover:bg-foreground/[0.04]"
      >
        {done ? <Check className="size-4 text-signal" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {done ? copy.copied : copy.copy}
      </button>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={copy.more}
        className="inline-flex h-9 items-center rounded-r-xl border border-l-0 border-hairline bg-surface px-2 text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
      >
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-hairline bg-surface-raised p-1.5 shadow-2xl">
          <button type="button" role="menuitem" onClick={copyPage} className={item}>
            <Copy className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span>
              <span className="block text-[14px] font-medium text-foreground">{copy.copy}</span>
              <span className="block text-[12.5px] text-muted-foreground">{copy.copyHint}</span>
            </span>
          </button>
          <a role="menuitem" href={mdHref} target="_blank" rel="noopener" className={item}>
            <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span>
              <span className="block text-[14px] font-medium text-foreground">{copy.view}</span>
              <span className="block text-[12.5px] text-muted-foreground">{copy.viewHint}</span>
            </span>
          </a>
          <div className="my-1 border-t border-hairline" />
          {AI.map((a) => (
            <a key={a.name} role="menuitem" href={a.url(prompt)} target="_blank" rel="noopener" className={item}>
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded bg-foreground/10 text-[9px] font-bold text-foreground">{a.logo}</span>
              <span>
                <span className="block text-[14px] font-medium text-foreground">{copy.openIn.replace("{name}", a.name)}</span>
                <span className="block text-[12.5px] text-muted-foreground">{copy.openHint}</span>
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
