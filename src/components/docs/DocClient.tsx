"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/cn";

/** Mintlify-style tabs. Panels are server-rendered; this only switches them. */
export function DocTabs({ labels, children }: { readonly labels: ReadonlyArray<string>; readonly children: ReadonlyArray<ReactNode> }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="mt-7">
      <div role="tablist" className="flex gap-6 overflow-x-auto border-b border-hairline [scrollbar-width:none]">
        {labels.map((l, i) => (
          <button
            key={l}
            role="tab"
            type="button"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p${i}`}
            onClick={() => setActive(i)}
            className={cn("-mb-px shrink-0 border-b-2 pb-2.5 text-[14.5px] transition-colors", i === active ? "border-primary-glow font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
          >
            {l}
          </button>
        ))}
      </div>
      {children.map((c, i) => (
        <div key={i} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={i !== active}>
          {c}
        </div>
      ))}
    </div>
  );
}

export function CopyButton({ text, label }: { readonly text: string; readonly label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1500);
        } catch {
          /* clipboard blocked */
        }
      }}
      className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
    >
      {done ? <Check className="size-3.5 text-signal" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
    </button>
  );
}

/** Click a screenshot to see it full size. */
export function Zoomable({ children, label, closeLabel }: { readonly children: ReactNode; readonly label: string; readonly closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} aria-label={label} className="block w-full cursor-zoom-in text-left">
        {children}
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[94dvh] max-w-[min(96vw,110rem)] bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <button type="button" onClick={() => dialog.current?.close()} aria-label={closeLabel} className="fixed right-4 top-4 grid size-10 place-items-center rounded-full bg-black/60 text-white">
          <X className="size-5" aria-hidden />
        </button>
        <div className="[&_img]:max-h-[92dvh] [&_img]:w-auto [&_img]:max-w-full">{children}</div>
      </dialog>
    </>
  );
}
