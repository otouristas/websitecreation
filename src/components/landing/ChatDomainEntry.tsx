"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { getAppPath } from "@/lib/app-links";
import type { SiteLocale } from "@/lib/i18n/locale";

export function ChatDomainEntry({ locale }: { locale: SiteLocale }) {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const tx = (en: string, el: string) => locale === "el" ? el : en;
  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const url = new URL(/^https?:\/\//i.test(domain.trim()) ? domain.trim() : `https://${domain.trim()}`);
      if (!/^https?:$/.test(url.protocol) || !/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname) || url.username || url.password || url.port || /^\d+(\.\d+){3}$/.test(url.hostname)) throw new Error();
      const next = `/onboarding?domain=${encodeURIComponent(url.hostname.toLowerCase())}&next=${encodeURIComponent("/app/chat")}`;
      window.location.assign(`${getAppPath("/signup")}?lang=${locale}&next=${encodeURIComponent(next)}`);
    } catch { setError(tx("Enter a public website domain, such as example.com.", "Εισαγάγετε έναν δημόσιο τομέα, όπως example.com.")); }
  }
  return <div className="mx-auto max-w-xl">
    <form onSubmit={submit} className="flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-2 text-left shadow-lg sm:flex-row">
      <label htmlFor="chat-site" className="sr-only">{tx("Your website", "Ο ιστότοπός σας")}</label>
      <div className="flex min-w-0 flex-1 items-center px-3"><span className="mr-1 text-sm text-muted-foreground" aria-hidden>https://</span><input id="chat-site" required maxLength={253} value={domain} onChange={event => { setDomain(event.target.value); setError(""); }} autoComplete="url" inputMode="url" placeholder="yourwebsite.com" aria-describedby={error ? "chat-domain-error" : "chat-domain-help"} aria-invalid={Boolean(error)} className="min-h-12 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
      <button className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{tx("Start with your site", "Ξεκινήστε με τον ιστότοπό σας")}<ArrowRight className="size-4" aria-hidden /></button>
    </form>
    {error && <p role="alert" id="chat-domain-error" className="mt-2 text-sm text-destructive">{error}</p>}
    <p id="chat-domain-help" className="mt-3 text-center text-xs text-muted-foreground">{tx("Create your workspace. Connect data when you are ready. Review changes before publishing.", "Δημιουργήστε τον χώρο σας. Συνδέστε δεδομένα όταν είστε έτοιμοι. Ελέγξτε τις αλλαγές πριν από τη δημοσίευση.")}</p>
    <a href={`${getAppPath("/demo/chat")}?lang=${locale}`} className="mt-4 inline-block text-sm font-medium text-link underline underline-offset-4">{tx("Try Aster AI with sample data", "Δοκιμάστε τον Aster AI με δείγμα δεδομένων")}</a>
  </div>;
}
