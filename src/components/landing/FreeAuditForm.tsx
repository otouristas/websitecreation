"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { captureUtmParams, trackFormStart, trackLead } from "@/lib/analytics";
import { describeAnswers, fetchTeamProgress, submitLead, type TeamAgent, type TeamProgress } from "@/lib/leads";
import type { SiteLocale } from "@/lib/i18n/locale";
import type { ScanResult } from "@/lib/scan/score";
import { primaryBtnClass } from "./primitives";
import { ScoreDial } from "./ScanWidget";
import { FetchDetailsButton, FetchDetailsNote, SiteDetailsCard, siteDetailsFields, siteDetailsMessage, useSiteDetails } from "./SiteDetailsFetch";

/**
 * The free SEO audit request: website, name, email, phone and a short brief.
 * "Fetch my details" next to the website reads the homepage and fills the empty
 * fields (phone, email, brief), and the site's own name, title, description and
 * logo travel with the lead.
 *
 *   form     -> five fields and one button
 *   results  -> the instant homepage check (score + costliest issues) right away,
 *               and a live board of the SEO team working on the full audit in the app
 *
 * The lead goes to the app (which starts the agent team) and to Formspree as a backup.
 * The board shows progress only; the findings reach the prospect by email.
 */

const COPY = {
  en: {
    eyebrow: "Free SEO audit",
    title: "Tell us about your business. Our SEO team starts on your site right away.",
    body: "You see a first check of your homepage in seconds. Then our team runs a full audit, keyword research, competitor and content analysis, and sends you the results with a plan.",
    website: "Your website",
    websitePh: "your-business.com",
    name: "Your name",
    email: "Email",
    phone: "Phone or WhatsApp (optional)",
    brief: "What does your business do, and who are your customers? (optional)",
    briefPh: "e.g. Boutique hotel in Oia with 12 suites. Most guests are couples from the UK and US. We want more direct bookings.",
    submit: "Start my free audit",
    sending: "Starting...",
    firstLook: "First look at your homepage",
    passed: (p: number, t: number) => `${p} of ${t} checks passed`,
    issues: "Costing you the most",
    allGood: "Your homepage passes every quick check. The full audit looks deeper.",
    scanFailed: "We couldn't load your homepage for the quick check. The team will look at it in the full audit.",
    teamTitle: "Our SEO team is working on your site",
    teamDone: "The team has finished. The full results and your plan are on their way to your inbox.",
    teamStatic: "Our team has your request. The full audit and your plan arrive by email within 24 working hours.",
    statuses: { queued: "Waiting", running: "Working", done: "Done" },
    agents: {
      auditor: "Technical audit of up to 30 pages",
      keywords: "Keyword research for your market",
      competitors: "Competitor analysis",
      content: "Content and trust review",
      strategist: "Your plan for the next 90 days",
    } as Record<TeamAgent, string>,
    errors: {
      website: "Enter your website address, like your-business.com.",
      name: "Add your name.",
      email: "Enter a valid email address.",
      generic: "Something went wrong. Please try again or message us on WhatsApp.",
    },
  },
  el: {
    eyebrow: "Δωρεάν έλεγχος SEO",
    title: "Πείτε μας για την επιχείρησή σας. Η ομάδα SEO ξεκινά αμέσως.",
    body: "Βλέπετε έναν πρώτο έλεγχο της αρχικής σας σε λίγα δευτερόλεπτα. Μετά η ομάδα μας κάνει πλήρη έλεγχο, έρευνα λέξεων κλειδιών, ανάλυση ανταγωνισμού και περιεχομένου και σας στέλνει τα αποτελέσματα με πλάνο.",
    website: "Η ιστοσελίδα σας",
    websitePh: "h-epixeirisi-sas.gr",
    name: "Το όνομά σας",
    email: "Email",
    phone: "Τηλέφωνο ή WhatsApp (προαιρετικό)",
    brief: "Τι κάνει η επιχείρησή σας και ποιοι είναι οι πελάτες σας; (προαιρετικό)",
    briefPh: "π.χ. Boutique ξενοδοχείο στην Οία με 12 σουίτες. Οι περισσότεροι επισκέπτες είναι ζευγάρια από Αγγλία και ΗΠΑ. Θέλουμε περισσότερες απευθείας κρατήσεις.",
    submit: "Ξεκινήστε τον δωρεάν έλεγχο",
    sending: "Ξεκινάμε...",
    firstLook: "Πρώτη ματιά στην αρχική σας",
    passed: (p: number, t: number) => `${p} από ${t} έλεγχοι πέρασαν`,
    issues: "Σας κοστίζουν περισσότερο",
    allGood: "Η αρχική σας περνά όλους τους γρήγορους ελέγχους. Ο πλήρης έλεγχος πάει πιο βαθιά.",
    scanFailed: "Δεν φορτώσαμε την αρχική σας για τον γρήγορο έλεγχο. Η ομάδα θα την εξετάσει στον πλήρη έλεγχο.",
    teamTitle: "Η ομάδα SEO δουλεύει στην ιστοσελίδα σας",
    teamDone: "Η ομάδα τελείωσε. Τα πλήρη αποτελέσματα και το πλάνο σας έρχονται στο email σας.",
    teamStatic: "Η ομάδα μας έλαβε το αίτημά σας. Ο πλήρης έλεγχος και το πλάνο σας έρχονται με email μέσα σε 24 εργάσιμες ώρες.",
    statuses: { queued: "Σε αναμονή", running: "Σε εξέλιξη", done: "Έτοιμο" },
    agents: {
      auditor: "Τεχνικός έλεγχος έως 30 σελίδων",
      keywords: "Έρευνα λέξεων κλειδιών για την αγορά σας",
      competitors: "Ανάλυση ανταγωνισμού",
      content: "Έλεγχος περιεχομένου και αξιοπιστίας",
      strategist: "Το πλάνο σας για τις επόμενες 90 ημέρες",
    } as Record<TeamAgent, string>,
    errors: {
      website: "Γράψτε τη διεύθυνση της ιστοσελίδας σας, π.χ. h-epixeirisi-sas.gr.",
      name: "Προσθέστε το όνομά σας.",
      email: "Γράψτε ένα έγκυρο email.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας μήνυμα στο WhatsApp.",
    },
  },
} as const;

const AGENT_ORDER: TeamAgent[] = ["auditor", "keywords", "competitors", "content", "strategist"];
const POLL_MS = 4000;
const POLL_LIMIT_MS = 12 * 60_000;

const inputClass =
  "h-12 w-full min-w-0 rounded-2xl border border-hairline bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:outline-none";

function TeamBoard({ locale, token }: { locale: SiteLocale; token: string | null }) {
  const t = COPY[locale];
  const [progress, setProgress] = useState<TeamProgress | null>(null);

  useEffect(() => {
    if (!token) return;
    let stop = false;
    const started = Date.now();
    async function tick() {
      const next = await fetchTeamProgress(token as string);
      if (stop) return;
      if (next) setProgress(next);
      if (!next?.done && Date.now() - started < POLL_LIMIT_MS) setTimeout(tick, POLL_MS);
    }
    void tick();
    return () => {
      stop = true;
    };
  }, [token]);

  if (!token) return <p className="text-sm leading-relaxed text-muted-foreground">{t.teamStatic}</p>;

  return (
    <div>
      <p className="flex items-center gap-2 font-display text-base font-semibold tracking-[-0.02em] text-foreground">
        {!progress?.done && <span className="live-dot" aria-hidden />}
        {t.teamTitle}
      </p>
      <ol className="mt-3 grid gap-2" aria-live="polite">
        {AGENT_ORDER.map((agent) => {
          const raw = progress?.agents.find((a) => a.agent === agent)?.status ?? "queued";
          // A step that couldn't finish is picked up by a person; the prospect just sees it as handled.
          const status = raw === "failed" ? "done" : raw;
          return (
            <li key={agent} className="flex min-w-0 items-center gap-3 rounded-2xl border border-hairline bg-background/40 px-4 py-2.5 text-sm">
              {status === "done" ? (
                <Check className="size-4 shrink-0 text-brand" aria-hidden />
              ) : status === "running" ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-brand" aria-hidden />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-hairline" aria-hidden />
              )}
              <span className={cn("min-w-0 flex-1", status === "queued" ? "text-muted-foreground" : "text-foreground")}>{t.agents[agent]}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.statuses[status]}</span>
            </li>
          );
        })}
      </ol>
      {progress?.done && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.teamDone}</p>}
    </div>
  );
}

export function FreeAuditForm({
  locale = "en",
  initialWebsite = "",
  context,
  className,
}: {
  locale?: SiteLocale;
  initialWebsite?: string;
  /** Extra labelled answers for the lead's message (e.g. the industry a page linked from). */
  context?: Record<string, string>;
  className?: string;
}) {
  const t = COPY[locale];
  const details = useSiteDetails();
  const [website, setWebsite] = useState(initialWebsite);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brief, setBrief] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (started) return;
    setStarted(true);
    trackFormStart("free_audit");
  }

  async function handleFetchDetails() {
    markStarted();
    const found = await details.fetchFor(website);
    if (!found) return;
    // Only empty fields: whatever the visitor typed wins.
    if (found.email) setEmail((v) => v || (found.email as string));
    if (found.phone) setPhone((v) => v || (found.phone as string));
    if (found.description) setBrief((v) => v || (found.description as string));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const site = website.trim();
    const mail = email.trim();
    if (!/^[^\s]+\.[a-z]{2,}/i.test(site.replace(/^https?:\/\//i, ""))) return setError(t.errors.website);
    if (!name.trim()) return setError(t.errors.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return setError(t.errors.email);
    if (gotcha) {
      setDone(true);
      return;
    }
    setError(null);
    setSending(true);
    const utm = captureUtmParams();
    const quick = fetch("/api/scan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url: site, locale }) })
      .then(async (r) => {
        const json = (await r.json()) as ScanResult | { error: string };
        return r.ok && "score" in json ? json : null;
      })
      .catch(() => null);
    const [res, scanned] = await Promise.all([
      submitLead(
        {
          form: "free_audit",
          _subject: `Free audit request: ${site}`,
          website: site,
          name: name.trim(),
          email: mail,
          phone: phone.trim(),
          brief: brief.trim(),
          company: details.info?.siteName ?? "",
          ...siteDetailsFields(details.info),
          ...context,
          locale,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          ...utm,
        },
        {
          name: name.trim(),
          email: mail,
          phone: phone.trim() || undefined,
          website: site,
          company: details.info?.siteName ?? undefined,
          service: "seo",
          message: [brief.trim(), describeAnswers({ Request: "Free SEO audit", ...context, ...utm }), siteDetailsMessage(details.info)]
            .filter(Boolean)
            .join("\n\n"),
          locale,
          source: "website-free-audit",
        },
      ),
      quick,
    ]);
    setSending(false);
    if (res.ok) {
      trackLead("free_audit", scanned ? { score: String(scanned.score) } : undefined);
      setScan(scanned);
      setToken(res.token ?? null);
      setDone(true);
    } else {
      setError(res.error ?? t.errors.generic);
    }
  }

  if (done) {
    return (
      <div id="free-audit" className={cn("glass grid scroll-mt-28 gap-6 rounded-3xl p-5 text-left sm:p-6 lg:grid-cols-2", className)} role="status">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{t.firstLook}</p>
          {scan ? (
            <>
              <div className="mt-3 flex items-center gap-5">
                <ScoreDial score={scan.score} label={t.firstLook} />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {scan.finalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.passed(scan.passed, scan.total)}</p>
                </div>
              </div>
              {scan.topIssues.length > 0 ? (
                <>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.issues}</p>
                  <ul className="mt-3 space-y-2.5">
                    {scan.topIssues.map((issue) => (
                      <li key={issue.id} className="flex gap-3 text-sm">
                        <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-warning" />
                        <span className="min-w-0">
                          <span className="font-medium text-foreground">{issue.label[locale]}</span>
                          <span className="block text-[13px] leading-relaxed text-muted-foreground">{issue.hint[locale]}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.allGood}</p>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.scanFailed}</p>
          )}
        </div>
        <div className="min-w-0">
          <TeamBoard locale={locale} token={token} />
        </div>
      </div>
    );
  }

  return (
    <form id="free-audit" onSubmit={handleSubmit} noValidate className={cn("glass scroll-mt-28 rounded-3xl p-5 text-left sm:p-6", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{t.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{t.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="grid min-w-0 gap-2 sm:col-span-2">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
            <label className="grid min-w-0 flex-1 gap-1">
              <span className="sr-only">{t.website}</span>
              <input name="website" type="text" inputMode="url" autoComplete="url" placeholder={`${t.website}: ${t.websitePh}`} value={website} onFocus={markStarted} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
            </label>
            <FetchDetailsButton locale={locale} state={details.state} onClick={handleFetchDetails} />
          </div>
          <FetchDetailsNote locale={locale} state={details.state} />
          {details.info && <SiteDetailsCard locale={locale} info={details.info} onDismiss={details.dismiss} />}
        </div>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.name}</span>
          <input name="name" type="text" autoComplete="name" placeholder={t.name} value={name} onFocus={markStarted} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.email}</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" placeholder={t.email} value={email} onFocus={markStarted} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1 sm:col-span-2">
          <span className="sr-only">{t.phone}</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phone} value={phone} onFocus={markStarted} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1 sm:col-span-2">
          <span className="text-[13px] text-muted-foreground">{t.brief}</span>
          <textarea name="brief" rows={3} maxLength={2000} placeholder={t.briefPh} value={brief} onFocus={markStarted} onChange={(e) => setBrief(e.target.value)} className={cn(inputClass, "h-auto min-h-24 resize-y py-3")} />
        </label>
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
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={sending} className={cn(primaryBtnClass, "w-full shrink-0 disabled:opacity-80 sm:w-auto")}>
          {sending ? t.sending : t.submit}
          {!sending && <ArrowRight className="size-4 shrink-0" aria-hidden />}
        </button>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
