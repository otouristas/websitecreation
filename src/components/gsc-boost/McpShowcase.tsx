"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { SiteLocale } from "@/lib/i18n/locale";

/** The deployed MCP Apps resource, exercised with an explicitly fictional fixture. */
export function McpShowcase({ locale }: { readonly locale: SiteLocale }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(820);
  const [ready, setReady] = useState(false);
  const el = locale === "el";
  useEffect(() => {
    const send = (message: object) => frame.current?.contentWindow?.postMessage(message, "*");
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.jsonrpc !== "2.0") return;
      const message = event.data;
      if (message.method === "ui/initialize") {
        send({ jsonrpc: "2.0", id: message.id, result: { protocolVersion: "2026-01-26", hostInfo: { name: "AnotherSEOGuru demo", version: "1.0.0" }, hostCapabilities: {}, hostContext: { theme: "light", locale: el ? "el-GR" : "en" } } });
      } else if (message.method === "ui/notifications/initialized") {
        const daily = [18, 25, 20, 35, 30, 38, 43];
        const impressions = [650, 700, 720, 890, 920, 1030, 1190];
        send({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: { structuredContent: {
          site_url: "sc-domain:demo.example",
          range: { start: "2026-11-02", end: "2026-11-08", days: 7 },
          previous_range: { start: "2026-10-26", end: "2026-11-01", days: 7 },
          dimension: "date",
          totals: { clicks: 209, impressions: 6100, ctr: 209 / 6100, position: 8.4 },
          previous_totals: { clicks: 135, impressions: 5200, ctr: 135 / 5200, position: 10.2 },
          rows: daily.map((clicks, i) => ({ date: `2026-11-0${i + 2}`, clicks, impressions: impressions[i], ctr: clicks / impressions[i], position: [10.1, 9.4, 9.2, 8.6, 8, 7.5, 7.1][i] })),
        }, isError: false } });
      } else if (message.method === "ui/notifications/size-changed" && Number.isFinite(message.params?.height)) {
        setHeight(Math.min(1600, Math.max(320, message.params.height + 2)));
      } else if (message.method === "ui/open-link") {
        send({ jsonrpc: "2.0", id: message.id, result: { isError: true } });
      }
    };
    window.addEventListener("message", onMessage);
    // Mount the resource only after its message listener is installed.
    const mount = window.requestAnimationFrame(() => setReady(true));
    return () => { window.cancelAnimationFrame(mount); window.removeEventListener("message", onMessage); };
  }, [el]);

  return <div id="mcp-preview" className="mx-auto max-w-5xl scroll-mt-[calc(var(--site-header-height)+1.5rem)] text-left" data-mcp-showcase>
    <div className="grid items-center gap-8 lg:grid-cols-[0.65fr_1.35fr]">
      <div className="min-w-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-2xl border border-hairline bg-white p-3"><Image src="/logos/assets/openai.webp" width={32} height={32} alt="ChatGPT" /></span>
          <span className="grid size-14 place-items-center rounded-2xl border border-hairline bg-white p-3"><Image src="/logos/assets/claude-mark.png" width={32} height={32} alt="Claude" /></span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">ANOTHERSEOGURU × CHATGPT / CLAUDE</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{el ? "Τα δεδομένα σας γίνονται συζήτηση." : "Your data becomes a conversation."}</h2>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{el ? "Κλικ, εμφανίσεις, CTR και θέση, με διαδραστικά γραφήματα μέσα στο ChatGPT. Στο Claude, τα ίδια εργαλεία δίνουν τα δεδομένα του έργου και τις εργασίες σας." : "Clicks, impressions, CTR and position, with interactive charts in ChatGPT. In Claude, the same tools provide your project data and tasks."}</p>
        <p className="mt-4 rounded-xl border border-hairline bg-surface/70 p-4 text-xs leading-6 text-muted-foreground">{el ? "Δοκιμάστε την κάρτα: πατήστε Κλικ, Εμφανίσεις, CTR ή Μέση θέση. Αυτό είναι το component του MCP μας με υποθετικά δεδομένα επίδειξης, όχι στοιχεία πελάτη." : "Try the card: choose Clicks, Impressions, CTR or Average position. This is our MCP component with fictional demonstration data, not customer records."}</p>
        <a href="#clients" className="mt-6 inline-flex min-h-12 items-center gap-3 font-semibold text-primary">{el ? "Συνδέστε τον βοηθό σας" : "Connect your assistant"}<ArrowRight className="size-4" aria-hidden /></a>
      </div>
      <figure className="min-w-0 overflow-hidden rounded-3xl border border-hairline bg-white p-2 shadow-[0_24px_80px_-35px_color-mix(in_oklab,var(--primary)_35%,transparent)] sm:p-3">
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#526377]">
          <span>{el ? "Διαδραστική κάρτα MCP" : "Interactive MCP card"}</span><span>{el ? "Υποθετικά δεδομένα" : "Fictional sample data"}</span>
        </figcaption>
        {ready ? <iframe key={locale} ref={frame} title={el ? "AnotherSEOGuru MCP: διαδραστικό δείγμα απόδοσης" : "AnotherSEOGuru MCP: interactive performance sample"} src="/previews/mcp/guru-v1.html" sandbox="allow-scripts" className="w-full border-0 bg-white" style={{ height }} /> : <div className="min-h-96 p-6 text-sm text-[#526377]">{el ? "Φόρτωση διαδραστικού δείγματος…" : "Loading interactive sample…"}</div>}
      </figure>
    </div>
  </div>;
}
