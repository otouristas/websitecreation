"use client";

import { useMemo, useRef, useState } from "react";
import { Download, FileUp, Lock, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import type { SiteLocale } from "@/lib/i18n/locale";
import { analyze, type Analysis, type Opportunity, type QueryRow } from "@/lib/opportunity-finder/engine";
import { parseSearchConsoleExport } from "@/lib/opportunity-finder/parse";

const RANGE_EL: Readonly<Record<number, string>> = {
  7: "Τελευταίες 7 ημέρες",
  28: "Τελευταίες 28 ημέρες",
  90: "Τελευταίοι 3 μήνες",
  180: "Τελευταίοι 6 μήνες",
  365: "Τελευταίοι 12 μήνες",
  487: "Τελευταίοι 16 μήνες",
};

const ERROR_EL: Readonly<Record<string, string>> = {
  "The file needs a header row and at least one row of data.": "Το αρχείο χρειάζεται γραμμή κεφαλίδων και τουλάχιστον μία γραμμή δεδομένων.",
  "Expected five columns: query (or page), clicks, impressions, CTR and position. Export from Search Console → Performance → Export → CSV and upload Queries.csv.":
    "Χρειάζονται πέντε στήλες: αναζήτηση (ή σελίδα), κλικ, impressions, CTR και θέση. Εξαγωγή από Search Console, Performance, Export, CSV, και ανεβάστε το Queries.csv.",
  "No rows could be read. Check that the file is the Queries.csv from a Search Console export.":
    "Δεν διαβάστηκε καμία γραμμή. Ελέγξτε ότι το αρχείο είναι το Queries.csv από εξαγωγή του Search Console.",
};

const ACTION_EL: Readonly<Record<string, string>> = {
  "Move it onto page 1": "Ανεβάστε το στην πρώτη σελίδα",
  "Push it into the top 3": "Σπρώξτε το στις 3 πρώτες θέσεις",
  "Rewrite the title and description": "Ξαναγράψτε τον τίτλο και την περιγραφή",
};

/** Search Console's own range presets, in days. */
const RANGES = [
  { days: 7, label: "Last 7 days" },
  { days: 28, label: "Last 28 days" },
  { days: 90, label: "Last 3 months" },
  { days: 180, label: "Last 6 months" },
  { days: 365, label: "Last 12 months" },
  { days: 487, label: "Last 16 months" },
] as const;

/** A fictional online bike shop, so visitors can see the output before exporting anything. */
function sampleRows(): QueryRow[] {
  const raw: Array<[string, number, number, number]> = [
    ["velora bikes", 2400, 5200, 1.2],
    ["velora", 1900, 3900, 1.1],
    ["best gravel bike under 1500", 210, 14800, 6.8],
    ["gravel bike size chart", 160, 9100, 5.4],
    ["how to choose a gravel bike", 95, 12400, 8.9],
    ["road bike vs gravel bike", 70, 18300, 12.6],
    ["tubeless tyre pressure calculator", 60, 7600, 9.7],
    ["bike fit guide", 140, 4200, 3.1],
    ["carbon vs aluminium bike frame", 40, 11200, 14.2],
    ["how to clean a bike chain", 55, 6900, 7.4],
    ["bike chain wear tool", 22, 3100, 6.1],
    ["commuter bike", 30, 16500, 17.8],
    ["electric gravel bike", 90, 5200, 4.6],
    ["gravel bike tyres", 48, 8800, 9.3],
    ["bike shop near me", 12, 22000, 24.5],
    ["what size bike do i need", 75, 13500, 10.2],
    ["bike maintenance checklist", 35, 2600, 5.9],
    ["winter cycling clothing", 18, 4700, 13.1],
    ["gravel bike geometry explained", 26, 2100, 4.2],
    ["bike pedals types", 20, 5400, 11.7],
    ["how often to replace bike chain", 64, 3300, 3.8],
    ["bikepacking bags", 15, 6100, 15.9],
    ["gravel race bike", 33, 2900, 7.9],
    ["cycling shoes sizing", 41, 3800, 6.3],
  ];
  return raw.map(([key, clicks, impressions, position]) => ({ key, clicks, impressions, ctr: clicks / impressions, position }));
}

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const pct = (r: number) => `${(r * 100).toFixed(1)}%`;

function toCsv(a: Analysis, days: number): string {
  const head = ["query", "type", "action", "position", "impressions_per_month", "ctr", "expected_ctr", "est_extra_clicks_per_month", "confidence"];
  const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const rows = a.opportunities.map((o) =>
    [
      esc(o.query),
      o.kind === "striking_distance" ? "striking distance" : "low CTR",
      esc(o.action),
      o.row.position.toFixed(1),
      Math.round((o.row.impressions * 30) / days),
      (o.row.ctr * 100).toFixed(2) + "%",
      (o.expectedCtr * 100).toFixed(2) + "%",
      o.impact,
      o.confidence,
    ].join(","),
  );
  return [head.join(","), ...rows].join("\n");
}

type Filter = "all" | "striking_distance" | "ctr_gap";

export function OpportunityFinder({ locale = "en" }: { readonly locale?: SiteLocale }) {
  const el = locale === "el";
  const rangeLabel = (days: number, fallback: string) => (el ? RANGE_EL[days] ?? fallback : fallback);
  const showError = (message: string) => (el ? ERROR_EL[message] ?? message : message);
  const actionLabel = (action: string) => (el ? ACTION_EL[action] ?? action : action);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [days, setDays] = useState<number>(90);
  const [brand, setBrand] = useState("");
  const [result, setResult] = useState<{ analysis: Analysis; skipped: number; sample: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (source: "file" | "paste" | "sample", content?: string) => {
    setError(null);
    if (source === "sample") {
      const analysis = analyze(sampleRows(), 90, "velora");
      setDays(90);
      setBrand("velora");
      setResult({ analysis, skipped: 0, sample: true });
      trackEvent("opportunity_finder_run", { source, rows: analysis.rows, opportunities: analysis.opportunities.length });
      return;
    }
    const parsed = parseSearchConsoleExport(content ?? text);
    if (parsed.error) {
      setResult(null);
      setError(parsed.error);
      trackEvent("opportunity_finder_error", { source });
      return;
    }
    const analysis = analyze(parsed.rows, days, brand);
    setResult({ analysis, skipped: parsed.skipped, sample: false });
    setFilter("all");
    trackEvent("opportunity_finder_run", { source, rows: analysis.rows, opportunities: analysis.opportunities.length, range_days: days });
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    const content = await file.text();
    setText(content);
    run("file", content);
  };

  const shown = useMemo<ReadonlyArray<Opportunity>>(
    () => (result ? result.analysis.opportunities.filter((o) => filter === "all" || o.kind === filter).slice(0, 50) : []),
    [result, filter],
  );

  const download = () => {
    if (!result) return;
    const blob = new Blob([toCsv(result.analysis, days)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "search-console-opportunities.csv";
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("opportunity_finder_export", { opportunities: result.analysis.opportunities.length });
  };

  const field = "w-full rounded-xl border border-hairline bg-background px-3 py-2 text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none";
  const a = result?.analysis;
  const strikingCount = a?.opportunities.filter((o) => o.kind === "striking_distance").length ?? 0;
  const ctrCount = a ? a.opportunities.length - strikingCount : 0;

  return (
    <div className="mt-8">
      <div className="rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <label className="block text-[13.5px] font-semibold text-foreground" htmlFor="of-file">
              {el ? "1. Η εξαγωγή από το Search Console" : "1. Your Search Console export"}
            </label>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              {el ? (
                <>
                  Performance, Search results, Export, Download CSV, και διαλέξτε το <code className="font-mono">Queries.csv</code> από το zip. Ή επικολλήστε τον πίνακα Queries από τα Google Sheets.
                </>
              ) : (
                <>
                  Performance → Search results → Export → Download CSV, then pick <code className="font-mono">Queries.csv</code> from the zip. Or paste the Queries table from Google Sheets.
                </>
              )}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                ref={inputRef}
                id="of-file"
                type="file"
                accept=".csv,text/csv,.tsv,text/plain"
                className="sr-only"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-hairline px-4 font-display text-[14px] font-medium text-foreground hover:border-primary/50"
              >
                <FileUp className="size-4" aria-hidden />
                {fileName ? (el ? "Άλλο αρχείο" : "Choose another file") : el ? "Επιλέξτε Queries.csv" : "Choose Queries.csv"}
              </button>
              {fileName ? <span className="truncate text-[13px] text-muted-foreground">{fileName}</span> : null}
            </div>
            <textarea
              aria-label={el ? "Ή επικολλήστε τον πίνακα Queries" : "Or paste the Queries table"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Top queries,Clicks,Impressions,CTR,Position\nexample query,120,4800,2.5%,6.2"}
              rows={5}
              className={cn(field, "mt-3 font-mono text-[12.5px]")}
            />
          </div>
          <div className="grid content-start gap-4">
            <div>
              <label className="block text-[13.5px] font-semibold text-foreground" htmlFor="of-range">
                {el ? "2. Διάστημα της εξαγωγής" : "2. Date range of the export"}
              </label>
              <select id="of-range" value={days} onChange={(e) => setDays(Number(e.target.value))} className={cn(field, "mt-2")}>
                {RANGES.map((r) => (
                  <option key={r.days} value={r.days}>
                    {rangeLabel(r.days, r.label)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-foreground" htmlFor="of-brand">
                {el ? "3. Ονόματα επωνυμίας προς εξαίρεση" : "3. Brand names to exclude"}
              </label>
              <input
                id="of-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="acme, acme books, akme"
                className={cn(field, "mt-2")}
              />
              <p className="mt-1 text-[12.5px] text-muted-foreground">{el ? "Χωρισμένα με κόμμα. Οι αναζητήσεις επωνυμίας έχουν CTR που καμία καμπύλη δεν προβλέπει." : "Comma-separated. Brand queries click at rates no curve predicts."}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => run("paste")}
                disabled={!text.trim()}
                className="asg-primary-action inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 font-display text-[14px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="size-3.5" aria-hidden />
                {el ? "Βρείτε ευκαιρίες" : "Find opportunities"}
              </button>
              <button
                type="button"
                onClick={() => run("sample")}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-hairline px-4 font-display text-[14px] font-medium text-foreground hover:border-primary/50"
              >
                {el ? "Δοκιμή με δείγμα" : "Try with sample data"}
              </button>
            </div>
          </div>
        </div>
        <p className="mt-5 flex items-center gap-2 text-[12.5px] text-muted-foreground">
          <Lock className="size-3.5 shrink-0" aria-hidden />
          {el ? "Τρέχει εξ ολοκλήρου στον browser σας. Η εξαγωγή δεν ανεβαίνει ούτε αποθηκεύεται." : "Runs entirely in your browser. Your export is never uploaded or stored."}
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-xl border border-warning bg-[var(--asg-warning-surface)] p-4 text-[14px] text-foreground">
          {showError(error)}
        </p>
      ) : null}

      {a ? (
        <div className="mt-8" aria-live="polite">
          {result?.sample ? (
            <p className="mb-4 text-[13.5px] text-muted-foreground">
              {el ? "Δείγμα δεδομένων: φανταστικό κατάστημα ποδηλάτων, τελευταίοι 3 μήνες, επωνυμία «velora» εκτός." : "Sample data: a fictional bike shop, last 3 months, brand “velora” excluded."}
            </p>
          ) : null}
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                k: el ? "Αναζητήσεις" : "Queries read",
                v: fmt(a.rows),
                sub: el
                  ? `${fmt(a.brandRows)} αναζητήσεις επωνυμίας εκτός${result && result.skipped ? `, ${fmt(result.skipped)} γραμμές παραλείφθηκαν` : ""}`
                  : `${fmt(a.brandRows)} brand queries excluded${result && result.skipped ? `, ${fmt(result.skipped)} rows skipped` : ""}`,
              },
              { k: el ? "Κλικ σήμερα" : "Clicks today", v: el ? `${fmt(a.clicksPerMonth)}/μήνα` : `${fmt(a.clicksPerMonth)}/mo`, sub: el ? "Από τις γραμμές της εξαγωγής" : "From the rows in your export" },
              {
                k: el ? "Ευκαιρίες" : "Opportunities",
                v: fmt(a.opportunities.length),
                sub: el ? `${strikingCount} κοντά στην κορυφή, ${ctrCount} χαμηλό CTR` : `${strikingCount} striking distance, ${ctrCount} low CTR`,
              },
              { k: el ? "Δική σας καμπύλη CTR" : "Own CTR curve", v: `${a.learnedBuckets}/20`, sub: el ? "Θέσεις που μαθαίνονται από τα δεδομένα σας. Οι υπόλοιπες μένουν στη βασική καμπύλη." : "Positions learned from your data; the rest use the baseline" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-hairline bg-surface p-4">
                <dt className="text-[12.5px] text-muted-foreground">{s.k}</dt>
                <dd className="mt-1 font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">{s.v}</dd>
                <dd className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{s.sub}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/[0.05] p-5">
            <p className="font-display text-[15.5px] font-semibold text-foreground">{el ? "Πρόβλεψη κλικ, επιπλέον κλικ τον μήνα" : "Click forecast, extra clicks a month"}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                { k: el ? "Συντηρητική" : "Conservative", v: a.forecast.conservative, sub: el ? "Οι 10 πρώτες διορθώσεις, με βάρος την εμπιστοσύνη" : "Top 10 fixes, weighted by confidence" },
                { k: el ? "Αναμενόμενη" : "Expected", v: a.forecast.expected, sub: el ? "Όλες οι διορθώσεις, με βάρος την εμπιστοσύνη" : "All fixes, weighted by confidence" },
                { k: el ? "Ταβάνι" : "Ceiling", v: a.forecast.ceiling, sub: el ? "Όλες οι διορθώσεις πλήρως" : "All fixes fully achieved" },
              ].map((s) => (
                <div key={s.k}>
                  <p className="text-[12.5px] text-muted-foreground">{s.k}</p>
                  <p className="font-display text-[24px] font-semibold text-foreground">+{fmt(s.v)}</p>
                  <p className="text-[12.5px] text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
              {el ? "Εκτιμήσεις για το μέγεθος της ευκαιρίας, όχι υποσχέσεις. Οι αλλαγές φαίνονται συνήθως σε δύο έως έξι εβδομάδες, αφού η Google ξανακάνει crawl." : "Estimates of the size of the prize, not promises. Changes usually take two to six weeks to show after Google recrawls."}
            </p>
          </div>

          {a.opportunities.length === 0 ? (
            <p className="mt-6 text-[14px] text-muted-foreground">
              {el ? "Καμία αναζήτηση δεν πέρασε τα όρια. Δοκιμάστε μεγαλύτερο διάστημα ή ελέγξτε μήπως τα ονόματα επωνυμίας αποκλείουν τα πάντα." : "No query met the thresholds. Try a longer date range, or check that brand names are not excluding everything."}
            </p>
          ) : (
            <>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {(
                  [
                    ["all", el ? `Όλες (${a.opportunities.length})` : `All (${a.opportunities.length})`],
                    ["striking_distance", el ? `Κοντά στην κορυφή (${strikingCount})` : `Striking distance (${strikingCount})`],
                    ["ctr_gap", el ? `Χαμηλό CTR (${ctrCount})` : `Low CTR (${ctrCount})`],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFilter(id)}
                    aria-pressed={filter === id}
                    className={cn(
                      "h-9 rounded-full border px-3.5 text-[13px] font-medium",
                      filter === id ? "border-primary/60 bg-primary/10 text-primary-glow" : "border-hairline text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={download}
                  className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline px-3.5 text-[13px] font-medium text-foreground hover:border-primary/50"
                >
                  <Download className="size-3.5" aria-hidden />
                  {el ? "Λήψη CSV" : "Download CSV"}
                </button>
              </div>
              <div className="mt-3 overflow-x-auto rounded-2xl border border-hairline">
                <table className="w-full min-w-[44rem] text-left text-[13.5px]">
                  <thead className="bg-surface text-[12px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">{el ? "Αναζήτηση και ενέργεια" : "Query and action"}</th>
                      <th className="px-3 py-3 text-right font-medium">{el ? "Θέση" : "Position"}</th>
                      <th className="px-3 py-3 text-right font-medium">{el ? "Impr./μήνα" : "Impr./mo"}</th>
                      <th className="px-3 py-3 text-right font-medium">CTR</th>
                      <th className="px-3 py-3 text-right font-medium">{el ? "Αναμενόμενο" : "Expected"}</th>
                      <th className="px-4 py-3 text-right font-medium">{el ? "Επιπλέον κλικ/μήνα" : "Extra clicks/mo"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((o) => (
                      <tr key={o.query} className="border-t border-hairline align-top">
                        <td className="px-4 py-3">
                          <span className="font-medium text-foreground">{o.query}</span>
                          <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                            <span className={o.kind === "striking_distance" ? "text-primary-glow" : "text-signal"}>
                              {o.kind === "striking_distance" ? (el ? "Κοντά στην κορυφή" : "Striking distance") : el ? "Χαμηλό CTR" : "Low CTR"}
                            </span>
                            {" · "}
                            {actionLabel(o.action)}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums">{o.row.position.toFixed(1)}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{fmt((o.row.impressions * 30) / days)}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{pct(o.row.ctr)}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                          {pct(o.expectedCtr)}
                          {o.targetPosition ? <span className="block text-[11.5px]">{el ? `στη θέση ${o.targetPosition}` : `at #${o.targetPosition}`}</span> : null}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">+{fmt(o.impact)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {a.opportunities.length > 50 ? (
                <p className="mt-2 text-[12.5px] text-muted-foreground">{el ? `Φαίνονται οι 50 πρώτες. Το CSV έχει και τις ${fmt(a.opportunities.length)}.` : `Showing the top 50. The CSV has all ${fmt(a.opportunities.length)}.`}</p>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
