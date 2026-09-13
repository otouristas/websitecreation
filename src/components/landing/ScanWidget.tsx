"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";
import { captureUtmParams, trackCtaClick, trackFormStart, trackLead } from "@/lib/analytics";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import type { ScanResult } from "@/lib/scan/score";
import type { ScanErrorCode } from "@/lib/scan/ssrf";
import { cn } from "@/lib/cn";
import { primaryBtnClass, ghostBtnClass } from "./primitives";

/**
 * The hero lead magnet.
 *
 *   idle      -> a URL and one button
 *   scanning  -> a mono log while /api/scan works (minimum 2.2 s so the log
 *                is readable even when the scan is instant)
 *   results   -> score dial, the three costliest issues, one next step
 *   capture   -> email or WhatsApp number, one field
 *   sent      -> thank you + the two ways to continue
 *
 * Every state renders without the previous one's height jumping around, and
 * the whole thing degrades to a plain link to /get-started without JS.
 */

type Stage = "idle" | "scanning" | "results" | "capture" | "sent";

const MIN_SCAN_MS = 2200;

const COPY = {
  en: {
    placeholder: "your-website.gr",
    scan: "Scan my site",
    scanning: "Scanning",
    hint: "Free · 13 checks · no signup",
    whatsapp: "Talk on WhatsApp",
    log: ["Resolving host", "Fetching homepage", "Reading title and description", "Checking structured data", "Timing the server", "Scoring"],
    scoreLabel: "Visibility score",
    passed: (p: number, t: number) => `${p} of ${t} checks passed`,
    issues: "Costing you the most",
    allGood: "The homepage passes every check. The next gains are in content depth and AI visibility.",
    next: "Get the full audit and a plan in 24h",
    again: "Scan another site",
    captureTitle: "Where should we send the full audit?",
    captureBody: "Email or WhatsApp number. A person reads it, replies within 24 working hours, and there is nothing to unsubscribe from.",
    contact: "Email or WhatsApp number",
    send: "Send me the audit",
    sending: "Sending",
    thanks: "Sent. We reply within 24 working hours.",
    continueBrief: "Add details for a sharper plan",
    errors: {
      invalid_url: "That does not look like a website address.",
      blocked_host: "We can only scan public websites.",
      dns: "We could not find that domain.",
      timeout: "The site took too long to answer. Try again in a moment.",
      unreachable: "The site did not answer.",
      not_html: "That address does not return a web page.",
      too_many_redirects: "The site redirects too many times.",
      rate_limited: "Too many scans from this connection. Try again in a minute.",
      generic: "Something went wrong. Try again or message us on WhatsApp.",
      contact: "Add an email address or a phone number.",
    },
  },
  el: {
    placeholder: "your-website.gr",
    scan: "Έλεγχος ιστοσελίδας",
    scanning: "Έλεγχος",
    hint: "Δωρεάν · 13 έλεγχοι · χωρίς εγγραφή",
    whatsapp: "Μίλα μας στο WhatsApp",
    log: ["Εύρεση διακομιστή", "Λήψη αρχικής σελίδας", "Ανάγνωση τίτλου και περιγραφής", "Έλεγχος δομημένων δεδομένων", "Χρονομέτρηση διακομιστή", "Βαθμολόγηση"],
    scoreLabel: "Βαθμός ορατότητας",
    passed: (p: number, t: number) => `${p} από ${t} ελέγχους πέρασαν`,
    issues: "Σας κοστίζουν περισσότερο",
    allGood: "Η αρχική περνά κάθε έλεγχο. Τα επόμενα κέρδη είναι στο βάθος περιεχομένου και στην ορατότητα σε AI.",
    next: "Πλήρης έλεγχος και πλάνο σε 24 ώρες",
    again: "Έλεγχος άλλης ιστοσελίδας",
    captureTitle: "Πού να σας στείλουμε τον πλήρη έλεγχο;",
    captureBody: "Email ή αριθμός WhatsApp. Το διαβάζει άνθρωπος, απαντά εντός 24 εργάσιμων ωρών, και δεν υπάρχει τίποτα για να διαγραφείτε.",
    contact: "Email ή αριθμός WhatsApp",
    send: "Στείλτε μου τον έλεγχο",
    sending: "Αποστολή",
    thanks: "Στάλθηκε. Απαντάμε εντός 24 εργάσιμων ωρών.",
    continueBrief: "Δώστε λεπτομέρειες για πιο ακριβές πλάνο",
    errors: {
      invalid_url: "Αυτό δεν μοιάζει με διεύθυνση ιστοσελίδας.",
      blocked_host: "Μπορούμε να ελέγξουμε μόνο δημόσιες ιστοσελίδες.",
      dns: "Δεν βρήκαμε αυτό το domain.",
      timeout: "Η ιστοσελίδα άργησε πολύ να απαντήσει. Δοκιμάστε ξανά σε λίγο.",
      unreachable: "Η ιστοσελίδα δεν απάντησε.",
      not_html: "Η διεύθυνση δεν επιστρέφει ιστοσελίδα.",
      too_many_redirects: "Η ιστοσελίδα κάνει πάρα πολλές ανακατευθύνσεις.",
      rate_limited: "Πολλοί έλεγχοι από αυτή τη σύνδεση. Δοκιμάστε ξανά σε ένα λεπτό.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή γράψτε μας στο WhatsApp.",
      contact: "Προσθέστε ένα email ή έναν αριθμό τηλεφώνου.",
    },
  },
} as const;

function ScoreDial({ score, label }: { score: number; label: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const tone = score >= 80 ? "var(--signal)" : score >= 55 ? "var(--brand)" : "var(--warning)";
  return (
    <div className="relative grid size-24 shrink-0 place-items-center" role="img" aria-label={`${label}: ${score}/100`}>
      <svg viewBox="0 0 80 80" className="absolute inset-0 size-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--hairline)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <span className="font-display text-2xl font-semibold tabular-nums tracking-[-0.04em] text-foreground">
        {score}
      </span>
    </div>
  );
}

export function ScanWidget({ locale = "en", className }: { locale?: SiteLocale; className?: string }) {
  const t = COPY[locale];
  const lp = (path: string) => localizedPath(locale, path);

  const [stage, setStage] = useState<Stage>("idle");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logStep, setLogStep] = useState(0);
  const [contact, setContact] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Advance the mono log while scanning. The step is reset by handleScan, so
  // the effect only owns the interval.
  useEffect(() => {
    if (stage !== "scanning") return;
    const id = setInterval(() => setLogStep((n) => Math.min(n + 1, t.log.length - 1)), 420);
    return () => clearInterval(id);
  }, [stage, t.log.length]);

  async function handleScan(e: FormEvent) {
    e.preventDefault();
    const value = url.trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setLogStep(0);
    setStage("scanning");
    trackFormStart("instant_scan");

    const started = Date.now();
    let outcome: { ok: true; data: ScanResult } | { ok: false; code: string };
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value, locale }),
      });
      const json = (await res.json()) as ScanResult | { error: ScanErrorCode };
      outcome = res.ok && "score" in json ? { ok: true, data: json } : { ok: false, code: (json as { error: string }).error ?? "generic" };
    } catch {
      outcome = { ok: false, code: "generic" };
    }

    const wait = Math.max(0, MIN_SCAN_MS - (Date.now() - started));
    await new Promise((r) => setTimeout(r, wait));

    if (outcome.ok) {
      setResult(outcome.data);
      setStage("results");
    } else {
      const map = t.errors as Record<string, string>;
      setError(map[outcome.code] ?? t.errors.generic);
      setStage("idle");
    }
  }

  async function handleCapture(e: FormEvent) {
    e.preventDefault();
    const value = contact.trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const looksPhone = /^\+?[\d\s().-]{7,}$/.test(value);
    if (!looksEmail && !looksPhone) {
      setError(t.errors.contact);
      return;
    }
    if (gotcha) {
      // Honeypot filled: pretend success, send nothing.
      setStage("sent");
      return;
    }
    setError(null);
    setSending(true);
    const res = await submitToFormspree({
      form: "instant_scan",
      _subject: `Instant scan lead: ${result?.finalUrl ?? url}`,
      website: result?.finalUrl ?? url,
      contact: value,
      contact_type: looksEmail ? "email" : "whatsapp",
      score: String(result?.score ?? ""),
      issues: (result?.topIssues ?? []).map((i) => i.label.en).join(" | "),
      locale,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      ...captureUtmParams(),
    });
    setSending(false);
    if (res.ok) {
      trackLead("instant_scan", { score: String(result?.score ?? "") });
      setStage("sent");
    } else {
      setError(res.error ?? t.errors.generic);
    }
  }

  function reset() {
    setStage("idle");
    setResult(null);
    setError(null);
    setContact("");
    setUrl("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const briefHref = `${lp("/get-started")}?website=${encodeURIComponent(result?.finalUrl ?? url)}`;

  return (
    <div data-scan-widget className={cn("w-full max-w-xl", className)}>
      {(stage === "idle" || stage === "scanning") && (
        <form onSubmit={handleScan} className="relative" noValidate>
          <div className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
            <label htmlFor="scan-url" className="sr-only">
              {t.placeholder}
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:px-0">
              <svg viewBox="0 0 20 20" aria-hidden className="size-4 shrink-0 text-brand">
                <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                id="scan-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                placeholder={t.placeholder}
                value={url}
                disabled={stage === "scanning"}
                onChange={(e) => setUrl(e.target.value)}
                className="h-11 w-full min-w-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:h-12"
              />
            </div>
            <button type="submit" disabled={stage === "scanning"} className={cn(primaryBtnClass, "shrink-0 disabled:opacity-80")}>
              {stage === "scanning" ? (
                <>
                  <span className="live-dot" aria-hidden />
                  {t.scanning}…
                </>
              ) : (
                <>
                  {t.scan}
                  <ArrowRight className="size-4" aria-hidden />
                </>
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
            {stage === "scanning" ? (
              <ol className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
                <li className="flex items-center gap-2 text-brand">
                  <span className="live-dot" aria-hidden />
                  {t.log[logStep]}…
                </li>
              </ol>
            ) : (
              <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", error ? "text-warning" : "text-muted-foreground")} role={error ? "alert" : undefined}>
                {error ?? t.hint}
              </p>
            )}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick("hero_whatsapp")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              {t.whatsapp}
            </a>
          </div>
        </form>
      )}

      {stage === "results" && result && (
        <div className="glass rounded-3xl p-5 sm:p-6" aria-live="polite">
          <div className="flex items-center gap-5">
            <ScoreDial score={result.score} label={t.scoreLabel} />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{t.scoreLabel}</p>
              <p className="mt-1 truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                {result.finalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{t.passed(result.passed, result.total)}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-hairline pt-4">
            {result.topIssues.length > 0 ? (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.issues}</p>
                <ul className="mt-3 space-y-2.5">
                  {result.topIssues.map((issue) => (
                    <li key={issue.id} className="flex gap-3 text-sm">
                      <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-warning" />
                      <span>
                        <span className="font-medium text-foreground">{issue.label[locale]}</span>
                        {issue.detail ? <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">{issue.detail}</span> : null}
                        <span className="block text-[13px] leading-relaxed text-muted-foreground">{issue.hint[locale]}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">{t.allGood}</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setStage("capture")} className={primaryBtnClass}>
              {t.next}
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              <RotateCcw className="size-3.5" aria-hidden />
              {t.again}
            </button>
          </div>
        </div>
      )}

      {stage === "capture" && (
        <form onSubmit={handleCapture} className="glass rounded-3xl p-5 sm:p-6" noValidate>
          <p className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">{t.captureTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.captureBody}</p>
          <label htmlFor="scan-contact" className="sr-only">
            {t.contact}
          </label>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              id="scan-contact"
              name="contact"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder={t.contact}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              autoFocus
              className="h-12 min-w-0 flex-1 rounded-full border border-hairline bg-background/60 px-5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:outline-none"
            />
            {/* Honeypot: humans never see or fill this. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
              className="hidden"
              aria-hidden
            />
            <button type="submit" disabled={sending} className={cn(primaryBtnClass, "shrink-0 disabled:opacity-80")}>
              {sending ? `${t.sending}…` : t.send}
              {!sending ? <ArrowRight className="size-4" aria-hidden /> : null}
            </button>
          </div>
          {error ? (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-warning" role="alert">
              {error}
            </p>
          ) : null}
          <button type="button" onClick={() => setStage("results")} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            ← {result ? result.finalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""}
          </button>
        </form>
      )}

      {stage === "sent" && (
        <div className="glass rounded-3xl p-5 sm:p-6" aria-live="polite">
          <p className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
            <span className="live-dot" aria-hidden />
            {t.thanks}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href={briefHref} onClick={() => trackCtaClick("scan_continue_brief")} className={ghostBtnClass}>
              {t.continueBrief}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick("scan_whatsapp")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
