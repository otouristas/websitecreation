"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, RotateCcw, Search } from "lucide-react";
import { MARKETS, defaultMarketFor, type MarketId } from "@/lib/search-preview/markets";
import { sampleResult } from "@/lib/search-preview/demo";
import type { SearchPreviewResult, SourceLink } from "@/lib/search-preview/types";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { trackCtaClick, trackEvent, trackFormStart } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { primaryBtnClass } from "@/components/landing/primitives";

/**
 * The live version of the homepage's "one search, three places" section.
 *
 * A visitor types a keyword and, optionally, their domain; /api/search-preview
 * runs the query through DataForSEO and this renders the same three panels the
 * homepage illustrates - the Google result, the AI Overview above it, and what
 * ChatGPT answers - with their domain highlighted wherever it shows up.
 *
 * Before the first run the panels hold the worked example from the homepage,
 * labelled as one. That is deliberate: an empty tool teaches nothing, and a
 * sample passed off as live would be the exact thing this page argues against.
 *
 * Every check costs us money upstream, so the button is the only thing that
 * spends: no check on mount, no re-run on a field change, no polling.
 */

type Stage = "idle" | "running" | "done";

const MIN_RUN_MS = 1_600;

const COPY = {
  en: {
    keywordLabel: "Keyword",
    keywordPlaceholder: "boutique hotel paros",
    domainLabel: "Your domain (optional)",
    domainPlaceholder: "your-site.gr",
    marketLabel: "Market",
    run: "Check all three",
    running: "Checking",
    again: "Run another keyword",
    log: [
      "Sending the query to Google",
      "Reading the organic results",
      "Looking for an AI Overview",
      "Asking ChatGPT the same thing",
      "Matching your domain",
    ],
    hint: "Free · no signup · live data",
    sampleBadge: "Example",
    sampleNote: "This is what the check returns. Type a keyword to run your own.",
    liveNote: (keyword: string, market: string) => `Live check for “${keyword}” · ${market}`,
    cols: [
      { label: "Google search", hint: "The classic result" },
      { label: "AI Overview", hint: "The summary above it" },
      { label: "ChatGPT", hint: "The answer that names you" },
    ],
    verdict: (matched: number, total: number) => `You appear on ${matched} of ${total} surfaces`,
    verdictNone: "Your domain appears on none of the three",
    noDomain: "Add your domain above to see where you already appear.",
    rank: (n: number) => `#${n}`,
    notRanked: "Not in the top 20",
    cited: "Cited",
    notCited: "Not cited",
    notShown: "Not shown",
    aiAbsent: "Google showed no AI Overview for this query.",
    aiAbsentHint: "That is a finding too - here the classic result still owns the answer.",
    chatUnavailable: "The chat answer did not come back this time. The other two surfaces are live.",
    noResults: "Google returned no organic results for this query.",
    sources: "Sources",
    caveat:
      "No engine guarantees a citation, and answers differ per user and per day. This is one reading, taken now - the work is making your pages usable by all three and watching the trend.",
    cta: "Get a plan for these three surfaces",
    errors: {
      invalid_keyword: "Type a keyword first.",
      keyword_too_long: "Keep it to a search phrase - up to 80 characters.",
      invalid_domain: "That does not look like a domain. Try your-site.gr.",
      invalid_market: "Pick a market from the list.",
      rate_limited: "That is a lot of checks from one connection. Try again in an hour.",
      daily_limit: "The free checks for today are used up. Message us and we will run yours.",
      unconfigured: "Live checks are off right now. The example below shows what you get.",
      no_results: "Nothing came back for that keyword. Try a broader phrase.",
      timeout: "The check took too long. Try again in a moment.",
      upstream: "The data provider did not answer. Try again in a moment.",
      generic: "Something went wrong. Try again, or message us and we will run it for you.",
    } as Record<string, string>,
  },
  el: {
    keywordLabel: "Λέξη-κλειδί",
    keywordPlaceholder: "boutique ξενοδοχείο πάρος",
    domainLabel: "Το domain σας (προαιρετικό)",
    domainPlaceholder: "to-site-sas.gr",
    marketLabel: "Αγορά",
    run: "Έλεγχος και στα τρία",
    running: "Έλεγχος",
    again: "Έλεγχος άλλης λέξης-κλειδί",
    log: [
      "Αποστολή της αναζήτησης στη Google",
      "Ανάγνωση των οργανικών αποτελεσμάτων",
      "Αναζήτηση AI Overview",
      "Η ίδια ερώτηση στο ChatGPT",
      "Αντιστοίχιση με το domain σας",
    ],
    hint: "Δωρεάν · χωρίς εγγραφή · ζωντανά δεδομένα",
    sampleBadge: "Παράδειγμα",
    sampleNote: "Έτσι δείχνει ο έλεγχος. Γράψτε μια λέξη-κλειδί για τον δικό σας.",
    liveNote: (keyword: string, market: string) => `Ζωντανός έλεγχος για «${keyword}» · ${market}`,
    cols: [
      { label: "Αναζήτηση Google", hint: "Το κλασικό αποτέλεσμα" },
      { label: "AI Overview", hint: "Η περίληψη από πάνω" },
      { label: "ChatGPT", hint: "Η απάντηση που σας ονομάζει" },
    ],
    verdict: (matched: number, total: number) => `Εμφανίζεστε σε ${matched} από ${total} σημεία`,
    verdictNone: "Το domain σας δεν εμφανίζεται σε κανένα από τα τρία",
    noDomain: "Προσθέστε το domain σας παραπάνω για να δείτε πού εμφανίζεστε ήδη.",
    rank: (n: number) => `#${n}`,
    notRanked: "Εκτός των 20 πρώτων",
    cited: "Με αναφορά",
    notCited: "Χωρίς αναφορά",
    notShown: "Δεν εμφανίστηκε",
    aiAbsent: "Η Google δεν έδειξε AI Overview για αυτή την αναζήτηση.",
    aiAbsentHint: "Και αυτό είναι εύρημα - εδώ την απάντηση την κρατά ακόμη το κλασικό αποτέλεσμα.",
    chatUnavailable: "Η απάντηση του chat δεν επέστρεψε αυτή τη φορά. Τα άλλα δύο σημεία είναι ζωντανά.",
    noResults: "Η Google δεν επέστρεψε οργανικά αποτελέσματα για αυτή την αναζήτηση.",
    sources: "Πηγές",
    caveat:
      "Καμία μηχανή δεν εγγυάται αναφορά, και οι απαντήσεις διαφέρουν ανά χρήστη και ανά ημέρα. Αυτή είναι μία μέτρηση, τώρα - η δουλειά είναι να γίνουν οι σελίδες σας αξιοποιήσιμες και από τα τρία και να παρακολουθείται η τάση.",
    cta: "Ζητήστε πλάνο για αυτά τα τρία σημεία",
    errors: {
      invalid_keyword: "Γράψτε πρώτα μια λέξη-κλειδί.",
      keyword_too_long: "Κρατήστε το σε φράση αναζήτησης - έως 80 χαρακτήρες.",
      invalid_domain: "Αυτό δεν μοιάζει με domain. Δοκιμάστε to-site-sas.gr.",
      invalid_market: "Επιλέξτε αγορά από τη λίστα.",
      rate_limited: "Πολλοί έλεγχοι από αυτή τη σύνδεση. Δοκιμάστε ξανά σε μία ώρα.",
      daily_limit: "Οι δωρεάν έλεγχοι για σήμερα εξαντλήθηκαν. Γράψτε μας και τον τρέχουμε εμείς.",
      unconfigured: "Οι ζωντανοί έλεγχοι είναι προσωρινά εκτός. Το παράδειγμα δείχνει τι παίρνετε.",
      no_results: "Δεν επέστρεψε τίποτα για αυτή τη λέξη-κλειδί. Δοκιμάστε πιο γενική φράση.",
      timeout: "Ο έλεγχος άργησε πολύ. Δοκιμάστε ξανά σε λίγο.",
      upstream: "Ο πάροχος δεδομένων δεν απάντησε. Δοκιμάστε ξανά σε λίγο.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή γράψτε μας να τον τρέξουμε εμείς.",
    } as Record<string, string>,
  },
} as const;

/** Glass frame with the mono label the three surfaces share on the homepage. */
function Frame({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
  return (
    <div className="glass flex h-full min-w-0 flex-col rounded-2xl p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{label}</span>
        <span className="truncate text-[11px] text-muted-foreground">{hint}</span>
      </div>
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3" aria-hidden>
      <div className="h-2.5 w-1/3 rounded bg-foreground/15" />
      <div className="h-2.5 w-5/6 rounded bg-foreground/10" />
      <div className="h-2.5 w-full rounded bg-foreground/10" />
      <div className="h-2.5 w-4/6 rounded bg-foreground/10" />
      <div className="h-2.5 w-3/6 rounded bg-foreground/10" />
    </div>
  );
}

/** Source chip. A matched domain gets the signal ring, the rest stay hairline. */
function SourceChip({ source }: { source: SourceLink }) {
  const className = source.isMatch
    ? "rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[10px] text-foreground ring-1 ring-signal/30"
    : "rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-muted-foreground";
  if (!source.url) return <span className={className}>{source.domain}</span>;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title={source.title}
      className={cn(className, "transition-colors hover:text-foreground")}
    >
      {source.domain}
    </a>
  );
}

type SurfaceState = "in" | "out" | "absent";

function StatusPill({ label, detail, state }: { label: string; detail: string; state: SurfaceState }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
        state === "in"
          ? "border-signal/40 bg-signal/10 text-foreground"
          : state === "out"
            ? "border-hairline bg-surface/60 text-muted-foreground"
            : "border-dashed border-hairline text-muted-foreground/80",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          state === "in" ? "bg-signal" : state === "out" ? "bg-warning/70" : "bg-muted-foreground/40",
        )}
      />
      <span className="font-medium">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em]">{detail}</span>
    </span>
  );
}

export function SearchPreview({ locale = "en" }: { locale?: SiteLocale }) {
  const t = COPY[locale];
  const lp = (path: string) => localizedPath(locale, path);

  const [keyword, setKeyword] = useState("");
  const [domain, setDomain] = useState("");
  const [market, setMarket] = useState<MarketId>(defaultMarketFor(locale));
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<SearchPreviewResult>(() => sampleResult(locale));
  const [error, setError] = useState<string | null>(null);
  const [logStep, setLogStep] = useState(0);
  const keywordRef = useRef<HTMLInputElement>(null);

  // The log walks itself while the request is in flight. A live check takes
  // 10-25 s (the chat call does its own web search), so this is the only thing
  // telling the visitor the page has not stalled.
  useEffect(() => {
    if (stage !== "running") return;
    const id = setInterval(() => setLogStep((n) => Math.min(n + 1, t.log.length - 1)), 2_600);
    return () => clearInterval(id);
  }, [stage, t.log.length]);

  async function run(e: FormEvent) {
    e.preventDefault();
    const value = keyword.trim();
    if (!value) {
      setError(t.errors.invalid_keyword);
      keywordRef.current?.focus();
      return;
    }

    setError(null);
    setLogStep(0);
    setStage("running");
    trackFormStart("ai_visibility_check");

    const started = Date.now();
    let outcome: { ok: true; data: SearchPreviewResult } | { ok: false; code: string };
    try {
      const res = await fetch("/api/search-preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ keyword: value, domain: domain.trim(), market }),
      });
      const json = (await res.json()) as SearchPreviewResult | { error: string };
      outcome =
        res.ok && "google" in json
          ? { ok: true, data: json }
          : { ok: false, code: "error" in json ? json.error : "generic" };
    } catch {
      outcome = { ok: false, code: "generic" };
    }

    // Let the last log line land before the panels swap, so the check does not
    // flash past on a cache hit.
    const wait = Math.max(0, MIN_RUN_MS - (Date.now() - started));
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    if (outcome.ok) {
      setResult(outcome.data);
      setStage("done");
      trackEvent("ai_visibility_check", {
        market,
        has_domain: Boolean(outcome.data.domain),
        ranked: outcome.data.google.matched,
        ai_overview: outcome.data.aiOverview.present,
        cited_in_ai: outcome.data.aiOverview.matched || outcome.data.chat.matched,
      });
    } else {
      setError(t.errors[outcome.code] ?? t.errors.generic);
      setStage(result.sample ? "idle" : "done");
    }
  }

  function reset() {
    setKeyword("");
    setDomain("");
    setError(null);
    setResult(sampleResult(locale));
    setStage("idle");
    setTimeout(() => keywordRef.current?.focus(), 0);
  }

  const busy = stage === "running";
  const marketLabel = MARKETS.find((m) => m.id === result.market)?.label[locale] ?? "";

  const surfaces: { label: string; detail: string; state: SurfaceState }[] = [
    {
      label: t.cols[0].label,
      detail: result.google.matchRank ? t.rank(result.google.matchRank) : t.notRanked,
      state: result.google.matched ? "in" : "out",
    },
    {
      label: t.cols[1].label,
      detail: !result.aiOverview.present ? t.notShown : result.aiOverview.matched ? t.cited : t.notCited,
      state: !result.aiOverview.present ? "absent" : result.aiOverview.matched ? "in" : "out",
    },
    {
      label: t.cols[2].label,
      detail: !result.chat.available ? t.notShown : result.chat.matched ? t.cited : t.notCited,
      state: !result.chat.available ? "absent" : result.chat.matched ? "in" : "out",
    },
  ];
  const present = surfaces.filter((s) => s.state !== "absent").length;
  const matched = surfaces.filter((s) => s.state === "in").length;

  const inputClass =
    "h-12 w-full min-w-0 rounded-full border border-hairline bg-background/60 px-5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:outline-none";

  return (
    <div className="w-full">
      <form onSubmit={run} className="glass rounded-3xl p-4 sm:p-5" noValidate>
        <label htmlFor="sp-keyword" className="sr-only">
          {t.keywordLabel}
        </label>
        <div className="flex items-center gap-2 rounded-full border border-hairline bg-background/60 pl-5 focus-within:border-brand/60">
          <Search className="size-4 shrink-0 text-brand" aria-hidden />
          <input
            ref={keywordRef}
            id="sp-keyword"
            name="keyword"
            type="text"
            maxLength={80}
            spellCheck={false}
            autoComplete="off"
            placeholder={t.keywordPlaceholder}
            value={keyword}
            disabled={busy}
            onChange={(e) => setKeyword(e.target.value)}
            className="h-12 w-full min-w-0 bg-transparent pr-5 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <div className="min-w-0 flex-1">
            <label htmlFor="sp-domain" className="sr-only">
              {t.domainLabel}
            </label>
            <input
              id="sp-domain"
              name="domain"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              placeholder={t.domainPlaceholder}
              value={domain}
              disabled={busy}
              onChange={(e) => setDomain(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="relative min-w-0 sm:w-56">
            <label htmlFor="sp-market" className="sr-only">
              {t.marketLabel}
            </label>
            {/* `appearance-none` drops the native arrow, whose colour comes from
                the OS and disappears on the dark theme. This one is ours. */}
            <select
              id="sp-market"
              name="market"
              value={market}
              disabled={busy}
              onChange={(e) => setMarket(e.target.value as MarketId)}
              className={cn(inputClass, "appearance-none pr-11 text-sm")}
            >
              {MARKETS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label[locale]}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <button type="submit" disabled={busy} className={cn(primaryBtnClass, "shrink-0 disabled:opacity-80")}>
            {busy ? (
              <>
                <span className="live-dot" aria-hidden />
                {t.running}…
              </>
            ) : (
              <>
                {t.run}
                <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
          {busy ? (
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand" aria-live="polite">
              <span className="live-dot" aria-hidden />
              {t.log[logStep]}…
            </p>
          ) : (
            <p
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.14em]",
                error ? "text-warning" : "text-muted-foreground",
              )}
              role={error ? "alert" : undefined}
            >
              {error ?? t.hint}
            </p>
          )}
          {stage === "done" && !busy ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              {t.again}
            </button>
          ) : null}
        </div>
      </form>

      {/* What the panels below are: the example, or a live run and its verdict. */}
      <div className="mt-6" aria-live="polite">
        {result.sample ? (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
              {t.sampleBadge}
            </span>
            {t.sampleNote}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {t.liveNote(result.keyword, marketLabel)}
            </p>
            {result.domain ? (
              <>
                <p className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {matched === 0 ? t.verdictNone : t.verdict(matched, present)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {surfaces.map((s) => (
                    <StatusPill key={s.label} label={s.label} detail={s.detail} state={s.state} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t.noDomain}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {/* Google */}
        <Frame label={t.cols[0].label} hint={t.cols[0].hint}>
          {busy ? (
            <Skeleton />
          ) : result.google.results.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground">{t.noResults}</p>
          ) : (
            <ol className="space-y-4 text-[13px]">
              {result.google.results.map((r) => (
                <li
                  key={`${r.rank}-${r.url}`}
                  className={cn(
                    "rounded-xl p-3",
                    r.isMatch ? "border border-signal/30 bg-signal/5" : "border border-transparent",
                  )}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-brand">{t.rank(r.rank)}</span>
                    <span className="truncate font-mono text-[10px] text-muted-foreground">{r.breadcrumb}</span>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-1 block font-medium leading-snug text-link hover:underline"
                  >
                    {r.title}
                  </a>
                  {r.snippet ? (
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{r.snippet}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </Frame>

        {/* AI Overview */}
        <Frame label={t.cols[1].label} hint={t.cols[1].hint}>
          {busy ? (
            <Skeleton />
          ) : !result.aiOverview.present ? (
            <div className="text-[13px] leading-relaxed">
              <p className="text-foreground">{t.aiAbsent}</p>
              <p className="mt-2 text-muted-foreground">{t.aiAbsentHint}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-hairline bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_14%,transparent),color-mix(in_oklab,var(--brand)_10%,transparent))] p-3 text-[13px]">
              <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                <svg viewBox="0 0 16 16" aria-hidden className="size-3">
                  <path d="M8 1l1.8 4.6L14 7.4l-4.2 1.8L8 14l-1.8-4.8L2 7.4l4.2-1.8z" fill="currentColor" />
                </svg>
                AI Overview
              </p>
              <div className="space-y-2 leading-relaxed text-foreground">
                {result.aiOverview.blocks.map((block, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {block}
                  </p>
                ))}
              </div>
              {result.aiOverview.references.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {result.aiOverview.references.map((ref) => (
                    <SourceChip key={ref.url || ref.domain} source={ref} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </Frame>

        {/* ChatGPT */}
        <Frame label={t.cols[2].label} hint={t.cols[2].hint}>
          {busy ? (
            <Skeleton />
          ) : !result.chat.available ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground">{t.chatUnavailable}</p>
          ) : (
            <div className="flex flex-col gap-2 text-[13px]">
              <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-primary px-3 py-2 leading-relaxed text-primary-foreground">
                {result.keyword}
              </p>
              <div className="mr-auto max-w-[94%] rounded-2xl rounded-bl-md border border-hairline bg-surface/70 px-3 py-2 leading-relaxed text-muted-foreground">
                <p className="whitespace-pre-line">{result.chat.answer}</p>
                {result.chat.citations.length > 0 ? (
                  <div className="mt-2.5 border-t border-hairline pt-2.5">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {t.sources}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.chat.citations.map((c) => (
                        <SourceChip key={c.url} source={c} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </Frame>
      </div>

      <div className="mt-8 flex flex-col items-center gap-5 text-center">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.caveat}</p>
        <Link
          href={`${lp("/get-started")}${result.domain && !result.sample ? `?website=${encodeURIComponent(result.domain)}` : ""}`}
          onClick={() => trackCtaClick("ai_visibility_check_plan")}
          className={primaryBtnClass}
        >
          {t.cta}
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
