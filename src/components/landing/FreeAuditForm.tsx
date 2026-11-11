"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { captureUtmParams, trackFormStart } from "@/lib/analytics";
import { describeAnswers, fetchTeamProgress, submitLead, type TeamProgress } from "@/lib/leads";
import { auditPhase } from "@/lib/lead-progress";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import type { SiteLocale } from "@/lib/i18n/locale";
import type { ScanResult } from "@/lib/scan/score";
import { waveField, wavePrimaryBtn } from "@/components/pages/platform-wave/ui";
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
 *               and the measured-audit/email status returned by the app
 *
 * The lead goes to the app for measured checks and to Formspree as a backup.
 * The board shows progress only; the findings reach the prospect by email.
 */

const COPY = {
  en: {
    eyebrow: "Free SEO audit",
    title: "See what your website needs first.",
    body: "We check your public pages and email a short summary with up to three measured findings. Reply with your goals so we can discuss the next steps.",
    website: "Your website",
    websitePh: "your-business.com",
    name: "Your name",
    email: "Email",
    phone: "Phone or WhatsApp (optional)",
    brief: "What does your business do, and who are your customers? (optional)",
    briefPh: "e.g. Boutique hotel in Oia with 12 suites. Most guests are couples from the UK and US. We want more direct bookings.",
    submit: "Start my free audit",
    sending: "Starting...",
    firstLook: "First check of your page",
    scope: "Initial HTML checks for this page.",
    passed: (p: number, t: number) => `${p} of ${t} checks passed`,
    issues: "Findings to review first",
    allGood: "This page passed the initial checks. A wider review may find other issues.",
    scanFailed: "The initial page check could not be completed. Your request has been received; we can review it together.",
    scanBlocked: "The website blocked our check. No SEO findings were inferred from the blocked response.",
    scanRateLimited: "The website temporarily limited requests. Your enquiry is saved so we can review the site together.",
    scanUpstreamError: "The page returned an error. No SEO score was inferred from that error page.",
    scanTooLarge: "The page exceeded the check's HTML size limit. No partial SEO score was produced.",
    teamTitle: "Your website check",
    teamDone: "The short summary has been sent to the email address you provided.",
    teamStatic: "We have received your request. We will contact you to discuss your website and your goals.",
    auditLabel: "Page and technical checks",
    auditFailed: "The automated check could not be completed. Contact us so we can review the website together.",
    auditUnavailable: "Your request is saved. Progress information is not available right now.",
    emailPending: "The short findings summary is being prepared.",
    emailUnknown: "The check is complete. Contact us to discuss the findings.",
    emailFailed: "The check finished, but the email send could not be confirmed. Contact us for the findings.",
    contactTeam: "Discuss the findings",
    statuses: { queued: "Waiting", running: "Checking", completed: "Checked", failed: "Could not complete", unavailable: "Request received" },
    errors: {
      website: "Enter your website address, like your-business.com.",
      name: "Add your name.",
      email: "Enter a valid email address.",
      generic: "Something went wrong. Please try again or message us on WhatsApp.",
    },
  },
  el: {
    eyebrow: "Δωρεάν έλεγχος SEO",
    title: "Δείτε τι χρειάζεται πρώτα η ιστοσελίδα σας.",
    body: "Ελέγχουμε τις δημόσιες σελίδες σας και στέλνουμε μια σύντομη σύνοψη με έως τρία ευρήματα. Απαντήστε μας με τους στόχους σας, για να συζητήσουμε τα επόμενα βήματα.",
    website: "Η ιστοσελίδα σας",
    websitePh: "h-epixeirisi-sas.gr",
    name: "Το όνομά σας",
    email: "Email",
    phone: "Τηλέφωνο ή WhatsApp (προαιρετικό)",
    brief: "Τι κάνει η επιχείρησή σας και ποιοι είναι οι πελάτες σας; (προαιρετικό)",
    briefPh: "π.χ. Boutique ξενοδοχείο στην Οία με 12 σουίτες. Οι περισσότεροι επισκέπτες είναι ζευγάρια από την Αγγλία και τις ΗΠΑ. Θέλουμε περισσότερες απευθείας κρατήσεις.",
    submit: "Ξεκινήστε τον δωρεάν έλεγχο",
    sending: "Ξεκινάμε...",
    firstLook: "Πρώτος έλεγχος της σελίδας σας",
    scope: "Αρχικός έλεγχος του HTML αυτής της σελίδας.",
    passed: (p: number, t: number) => `Πέρασαν ${p} από τους ${t} ελέγχους`,
    issues: "Ευρήματα που αξίζει να δείτε πρώτα",
    allGood: "Η σελίδα πέρασε τους αρχικούς ελέγχους. Ένας ευρύτερος έλεγχος μπορεί να εντοπίσει επιπλέον ζητήματα.",
    scanFailed: "Ο αρχικός έλεγχος της σελίδας δεν ολοκληρώθηκε. Λάβαμε το αίτημά σας και μπορούμε να το εξετάσουμε μαζί.",
    scanBlocked: "Η ιστοσελίδα δεν επέτρεψε την πρόσβαση στον έλεγχο. Δεν βγάλαμε συμπεράσματα SEO από αυτή την απάντηση.",
    scanRateLimited: "Η ιστοσελίδα περιόρισε προσωρινά τα αιτήματα. Το αίτημά σας έχει καταχωριστεί για να τη δούμε μαζί.",
    scanUpstreamError: "Η σελίδα επέστρεψε σφάλμα. Δεν υπολογίσαμε βαθμό SEO από τη σελίδα σφάλματος.",
    scanTooLarge: "Το HTML της σελίδας ξεπέρασε το όριο του ελέγχου. Δεν υπολογίστηκε βαθμός από ελλιπή δεδομένα.",
    teamTitle: "Ο έλεγχος της ιστοσελίδας σας",
    teamDone: "Η σύντομη σύνοψη στάλθηκε στο email που δηλώσατε.",
    teamStatic: "Λάβαμε το αίτημά σας. Θα επικοινωνήσουμε μαζί σας για την ιστοσελίδα και τους στόχους σας.",
    auditLabel: "Έλεγχος σελίδων και τεχνικών στοιχείων",
    auditFailed: "Ο αυτόματος έλεγχος δεν ολοκληρώθηκε. Επικοινωνήστε μαζί μας για να δούμε την ιστοσελίδα σας μαζί.",
    auditUnavailable: "Το αίτημά σας έχει καταχωριστεί. Οι πληροφορίες προόδου δεν είναι διαθέσιμες αυτή τη στιγμή.",
    emailPending: "Ετοιμάζεται η σύντομη σύνοψη των ευρημάτων.",
    emailUnknown: "Ο έλεγχος ολοκληρώθηκε. Επικοινωνήστε μαζί μας για να συζητήσουμε τα ευρήματα.",
    emailFailed: "Ο έλεγχος ολοκληρώθηκε, αλλά δεν επιβεβαιώθηκε η αποστολή του email. Επικοινωνήστε μαζί μας για τα ευρήματα.",
    contactTeam: "Συζητήστε τα ευρήματα",
    statuses: { queued: "Σε αναμονή", running: "Σε εξέλιξη", completed: "Ολοκληρώθηκε", failed: "Δεν ολοκληρώθηκε", unavailable: "Λάβαμε το αίτημα" },
    errors: {
      website: "Γράψτε τη διεύθυνση της ιστοσελίδας σας, π.χ. h-epixeirisi-sas.gr.",
      name: "Προσθέστε το όνομά σας.",
      email: "Γράψτε ένα έγκυρο email.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας μήνυμα στο WhatsApp.",
    },
  },
} as const;

const POLL_MS = 4000;
const POLL_LIMIT_MS = 12 * 60_000;

const formCard =
  "scroll-mt-28 rounded-[22px] border border-hairline bg-surface/80 p-5 text-left shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_24px_60px_-28px_color-mix(in_oklab,var(--primary)_50%,transparent)] sm:p-6";

const fieldError =
  "w-full rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-destructive";

function TeamBoard({ locale, token }: { locale: SiteLocale; token: string | null }) {
  const t = COPY[locale];
  const [progress, setProgress] = useState<TeamProgress | null>(null);
  const [lookupFailed, setLookupFailed] = useState(false);

  useEffect(() => {
    if (!token) return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    async function tick() {
      const next = await fetchTeamProgress(token as string);
      if (stop) return;
      if (next) setProgress(next);
      const expired = Date.now() - started >= POLL_LIMIT_MS;
      setLookupFailed(next === null || (expired && !next.done));
      if (!next?.done && !expired) timer = setTimeout(tick, POLL_MS);
    }
    void tick();
    return () => {
      stop = true;
      if (timer) clearTimeout(timer);
    };
  }, [token]);

  if (!token) return <p className="text-sm leading-relaxed text-muted-foreground">{t.teamStatic}</p>;

  const phase = lookupFailed ? "unavailable" : auditPhase(progress);
  const emailStatus = progress?.report_email_status;
  return (
    <div>
      <p className="font-display text-base font-semibold tracking-[-0.02em] text-foreground">{t.teamTitle}</p>
      <div className="mt-3 flex min-w-0 items-center gap-3 rounded-2xl border border-hairline bg-background/40 px-4 py-3 text-sm" role="status">
        {phase === "completed" ? <Check className="size-4 shrink-0 text-brand" aria-hidden /> : phase === "running" ? <Loader2 className="size-4 shrink-0 animate-spin text-brand" aria-hidden /> : <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
        <span className="min-w-0 flex-1">{t.auditLabel}</span>
        <span className="text-xs text-muted-foreground">{t.statuses[phase]}</span>
      </div>
      {phase === "failed" ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.auditFailed}</p> : phase === "unavailable" ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.auditUnavailable}</p> : null}
      {phase === "completed" && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{emailStatus === "sent" ? t.teamDone : emailStatus === "failed" ? t.emailFailed : emailStatus === "pending" || emailStatus === "sending" ? t.emailPending : t.emailUnknown}</p>}
      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">{t.contactTeam}<ArrowRight className="size-4" aria-hidden /></a>
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
  const [scanError, setScanError] = useState<string | null>(null);
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
        return r.ok && "score" in json ? { result: json, error: null } : { result: null, error: "error" in json ? json.error : "generic" };
      })
      .catch(() => ({ result: null, error: "generic" }));
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
      setScan(scanned.result);
      setScanError(scanned.error);
      setToken(res.token ?? null);
      setDone(true);
    } else {
      setError(res.error ?? t.errors.generic);
    }
  }

  if (done) {
    return (
      <div id="free-audit" className={cn(formCard, "grid gap-6 lg:grid-cols-2", className)} role="status">
        <div className="min-w-0">
          <p className="font-code text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">{t.firstLook}</p>
          {scan ? (
            <>
              <div className="mt-3 flex items-center gap-5">
                <ScoreDial score={scan.score} label={t.firstLook} />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {scan.finalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.passed(scan.passed, scan.total)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.scope}</p>
                  {scan.observedAt && Number.isFinite(Date.parse(scan.observedAt)) && <time className="mt-1 block text-xs text-muted-foreground" dateTime={scan.observedAt}>{new Date(scan.observedAt).toLocaleString(locale === "el" ? "el-GR" : "en-GB")}</time>}
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
                          {issue.detail && <span className="block break-words text-xs text-muted-foreground">{issue.detail}</span>}
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scanError === "access_blocked" ? t.scanBlocked : scanError === "upstream_rate_limited" ? t.scanRateLimited : scanError === "upstream_error" ? t.scanUpstreamError : scanError === "page_too_large" ? t.scanTooLarge : t.scanFailed}</p>
          )}
        </div>
        <div className="min-w-0">
          <TeamBoard locale={locale} token={token} />
        </div>
      </div>
    );
  }

  return (
    <form id="free-audit" onSubmit={handleSubmit} noValidate className={cn(formCard, className)}>
      <p className="font-code text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">{t.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{t.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="grid min-w-0 gap-2 sm:col-span-2">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
            <label className="grid min-w-0 flex-1 gap-1">
              <span className="sr-only">{t.website}</span>
              <input name="website" type="text" inputMode="url" autoComplete="url" placeholder={`${t.website}: ${t.websitePh}`} value={website} onFocus={markStarted} onChange={(e) => setWebsite(e.target.value)} className={waveField} />
            </label>
            <FetchDetailsButton locale={locale} state={details.state} onClick={handleFetchDetails} />
          </div>
          <FetchDetailsNote locale={locale} state={details.state} />
          {details.info && <SiteDetailsCard locale={locale} info={details.info} onDismiss={details.dismiss} />}
        </div>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.name}</span>
          <input name="name" type="text" autoComplete="name" placeholder={t.name} value={name} onFocus={markStarted} onChange={(e) => setName(e.target.value)} className={waveField} />
        </label>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.email}</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" placeholder={t.email} value={email} onFocus={markStarted} onChange={(e) => setEmail(e.target.value)} className={waveField} />
        </label>
        <label className="grid min-w-0 gap-1 sm:col-span-2">
          <span className="sr-only">{t.phone}</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phone} value={phone} onFocus={markStarted} onChange={(e) => setPhone(e.target.value)} className={waveField} />
        </label>
        <label className="grid min-w-0 gap-1 sm:col-span-2">
          <span className="text-[13px] text-muted-foreground">{t.brief}</span>
          <textarea name="brief" rows={3} maxLength={2000} placeholder={t.briefPh} value={brief} onFocus={markStarted} onChange={(e) => setBrief(e.target.value)} className={cn(waveField, "h-auto min-h-24 resize-y")} />
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
        <button type="submit" disabled={sending} className={cn(wavePrimaryBtn, "w-full shrink-0 sm:w-auto")}>
          {sending ? t.sending : t.submit}
          {!sending && <ArrowRight className="size-4 shrink-0" aria-hidden />}
        </button>
        {error && (
          <p className={fieldError} role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
