"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SiteLocale } from "@/lib/i18n/locale";

type Panel = "none" | "search" | "ask" | "menu";

interface DocsUIValue {
  readonly locale: SiteLocale;
  readonly panel: Panel;
  readonly open: (p: Panel) => void;
  readonly close: () => void;
  /** A question typed in search can be handed to Ask AI. */
  readonly pendingQuestion: string;
  readonly ask: (question: string) => void;
}

const DocsUIContext = createContext<DocsUIValue | null>(null);

/** Which overlay is open (search, Ask AI or the mobile menu), plus the global shortcuts. */
export function DocsUIProvider({ locale, children }: { readonly locale: SiteLocale; readonly children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>("none");
  const [pendingQuestion, setPendingQuestion] = useState("");
  const open = useCallback((p: Panel) => setPanel(p), []);
  const close = useCallback(() => setPanel("none"), []);
  const ask = useCallback((q: string) => {
    setPendingQuestion(q);
    setPanel("ask");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPanel((p) => (p === "search" ? "none" : "search"));
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setPanel((p) => (p === "ask" ? "none" : "ask"));
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setPanel("search");
      } else if (e.key === "Escape") {
        setPanel("none");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // No page scroll behind a modal or the mobile menu.
  useEffect(() => {
    if (panel === "search" || panel === "menu") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [panel]);

  const value = useMemo(() => ({ locale, panel, open, close, pendingQuestion, ask }), [locale, panel, open, close, pendingQuestion, ask]);
  return <DocsUIContext.Provider value={value}>{children}</DocsUIContext.Provider>;
}

export function useDocsUI(): DocsUIValue {
  const v = useContext(DocsUIContext);
  if (!v) throw new Error("useDocsUI outside DocsUIProvider");
  return v;
}
