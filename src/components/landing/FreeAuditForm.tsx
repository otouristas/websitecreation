"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { captureUtmParams, trackFormStart, trackLead } from "@/lib/analytics";
import { describeAnswers, submitLead } from "@/lib/leads";
import type { SiteLocale } from "@/lib/i18n/locale";
import { primaryBtnClass } from "./primitives";

/**
 * The two-field free audit request: website plus an email or WhatsApp number.
 * It sits above the long project wizard so a visitor who only wants the audit
 * the homepage promises can ask for it in ten seconds.
 */

const COPY = {
  en: {
    eyebrow: "Free SEO audit",
    title: "Only want the free audit? Two fields.",
    body: "We audit your site's SEO, speed and AI-search readiness and send you a prioritised fix list within 24 working hours. No call needed.",
    website: "Your website",
    websitePh: "your-business.com",
    contact: "Email or WhatsApp number",
    submit: "Send me the audit",
    sending: "Sending...",
    doneTitle: "Request received.",
    doneBody: "Your audit is on its way within 24 working hours. Want a full quote too? Fill in the brief below.",
    errors: {
      website: "Enter your website address, like your-business.com.",
      contact: "Add an email address or a phone number.",
      generic: "Something went wrong. Please try again or message us on WhatsApp.",
    },
  },
  el: {
    eyebrow: "Δωρεάν έλεγχος SEO",
    title: "Θέλετε μόνο τον δωρεάν έλεγχο; Δύο πεδία.",
    body: "Ελέγχουμε το SEO, την ταχύτητα και την ετοιμότητα της ιστοσελίδας σας για την αναζήτηση με AI και σας στέλνουμε λίστα διορθώσεων με προτεραιότητες μέσα σε 24 εργάσιμες ώρες. Χωρίς τηλεφώνημα.",
    website: "Η ιστοσελίδα σας",
    websitePh: "h-epixeirisi-sas.gr",
    contact: "Email ή αριθμός WhatsApp",
    submit: "Στείλτε μου τον έλεγχο",
    sending: "Αποστολή...",
    doneTitle: "Λάβαμε το αίτημά σας.",
    doneBody: "Ο έλεγχος θα σας σταλεί μέσα σε 24 εργάσιμες ώρες. Θέλετε και πλήρη προσφορά; Συμπληρώστε το brief παρακάτω.",
    errors: {
      website: "Γράψτε τη διεύθυνση της ιστοσελίδας σας, π.χ. h-epixeirisi-sas.gr.",
      contact: "Προσθέστε ένα email ή έναν αριθμό τηλεφώνου.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας μήνυμα στο WhatsApp.",
    },
  },
} as const;

const inputClass =
  "h-12 w-full min-w-0 rounded-full border border-hairline bg-background/60 px-5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:outline-none";

export function FreeAuditForm({ locale = "en", initialWebsite = "", className }: { locale?: SiteLocale; initialWebsite?: string; className?: string }) {
  const t = COPY[locale];
  const [website, setWebsite] = useState(initialWebsite);
  const [contact, setContact] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (started) return;
    setStarted(true);
    trackFormStart("free_audit");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const site = website.trim();
    const value = contact.trim();
    if (!/^[^\s]+\.[a-z]{2,}/i.test(site.replace(/^https?:\/\//i, ""))) {
      setError(t.errors.website);
      return;
    }
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const looksPhone = /^\+?[\d\s().-]{7,}$/.test(value);
    if (!looksEmail && !looksPhone) {
      setError(t.errors.contact);
      return;
    }
    if (gotcha) {
      setDone(true);
      return;
    }
    setError(null);
    setSending(true);
    const utm = captureUtmParams();
    const res = await submitLead(
      {
        form: "free_audit",
        _subject: `Free audit request: ${site}`,
        website: site,
        contact: value,
        contact_type: looksEmail ? "email" : "whatsapp",
        locale,
        page: typeof window !== "undefined" ? window.location.pathname : "",
        ...utm,
      },
      {
        email: looksEmail ? value : undefined,
        phone: looksEmail ? undefined : value,
        website: site,
        service: "seo",
        message: describeAnswers({ Request: "Free SEO audit", ...utm }),
        locale,
        source: "website-free-audit",
      },
    );
    setSending(false);
    if (res.ok) {
      trackLead("free_audit");
      setDone(true);
    } else {
      setError(res.error ?? t.errors.generic);
    }
  }

  if (done) {
    return (
      <div id="free-audit" className={cn("glass scroll-mt-28 rounded-3xl p-5 text-left sm:p-6", className)} role="status">
        <p className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
          <Check className="size-5 shrink-0 text-brand" aria-hidden />
          {t.doneTitle}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.doneBody}</p>
      </div>
    );
  }

  return (
    <form id="free-audit" onSubmit={handleSubmit} noValidate className={cn("glass scroll-mt-28 rounded-3xl p-5 text-left sm:p-6", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{t.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{t.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <label htmlFor="free-audit-website" className="sr-only">
          {t.website}
        </label>
        <input
          id="free-audit-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder={t.websitePh}
          value={website}
          onFocus={markStarted}
          onChange={(e) => setWebsite(e.target.value)}
          className={inputClass}
        />
        <label htmlFor="free-audit-contact" className="sr-only">
          {t.contact}
        </label>
        <input
          id="free-audit-contact"
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder={t.contact}
          value={contact}
          onFocus={markStarted}
          onChange={(e) => setContact(e.target.value)}
          className={inputClass}
        />
        {/* Honeypot: humans never see or fill this. */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button type="submit" disabled={sending} className={cn(primaryBtnClass, "shrink-0 disabled:opacity-80")}>
          {sending ? t.sending : t.submit}
          {!sending && <ArrowRight className="size-4 shrink-0" aria-hidden />}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
