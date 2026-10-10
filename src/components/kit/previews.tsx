import type { ReactNode } from "react";
import {
  AlertTriangle,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronsUpDown,
  CornerDownLeft,
  FileText,
  Gauge,
  KeyRound,
  LayoutGrid,
  LineChart as LineChartIcon,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import { PCard } from "./AppWindow";
import { LineChart, ScoreRing, Sparkline, series } from "./chart";

/**
 * Static product previews in the app's visual language, drawn on a sample
 * site (a fictional Paros hotel, because most of our visitors run tourism
 * businesses). They are server-rendered markup, not the live app, so the
 * website stays fast and every number here is clearly sample data.
 */

type L = SiteLocale;
const tx = (l: L, en: string, el: string) => (l === "el" ? el : en);

export const SAMPLE_SITE = "aegean-suites.example";

/* ------------------------------------------------------------------ bits */

type KindTone = "brand" | "primary" | "warning" | "destructive" | "success" | "muted";
const TONE: Record<KindTone, string> = {
  brand: "bg-brand/15 text-brand",
  primary: "bg-primary/15 text-primary-glow",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
  success: "bg-success/15 text-success",
  muted: "bg-foreground/8 text-muted-foreground",
};

export function Pill({ tone, children, className }: { readonly tone: KindTone; readonly children: ReactNode; readonly className?: string }) {
  return <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium", TONE[tone], className)}>{children}</span>;
}

function Delta({ v, suffix = "%" }: { readonly v: number; readonly suffix?: string }) {
  const up = v >= 0;
  return (
    <span className={cn("text-[11.5px] font-medium", up ? "text-success" : "text-destructive")}>
      {up ? "↗" : "↘"} {up ? "+" : ""}
      {v}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ opportunities */

type Fix = { kind: KindTone; label: string; effort: string; title: string; path: string; gain: string; detail?: string };

function fixes(l: L): Fix[] {
  return [
    {
      kind: "primary",
      label: tx(l, "Striking distance", "Κοντά στην κορυφή"),
      effort: tx(l, "Quick fix", "Γρήγορο"),
      title: tx(l, "Push “boutique hotel paros” into the top 3", "Ανεβάστε το «boutique hotel πάρος» στο top 3"),
      path: "/rooms",
      gain: "+412",
      detail: tx(l, "Ranks 6.4 with 9,800 impressions a month. Position 3 is worth about +412 clicks.", "Θέση 6,4 με 9.800 εμφανίσεις τον μήνα. Η θέση 3 αξίζει περίπου +412 κλικ."),
    },
    {
      kind: "warning",
      label: tx(l, "Low CTR", "Χαμηλό CTR"),
      effort: tx(l, "Quick fix", "Γρήγορο"),
      title: tx(l, "Rewrite the title and description for this page", "Ξαναγράψτε τίτλο και περιγραφή της σελίδας"),
      path: "/paros-hotel-with-pool",
      gain: "+268",
      detail: tx(l, "CTR is 1.9% at position 3.8, where 7% is typical.", "CTR 1,9% στη θέση 3,8, όπου το συνηθισμένο είναι 7%."),
    },
    {
      kind: "destructive",
      label: tx(l, "Content decay", "Πτώση περιεχομένου"),
      effort: tx(l, "Half a day", "Μισή μέρα"),
      title: tx(l, "Refresh this decaying guide", "Ανανεώστε αυτόν τον οδηγό που πέφτει"),
      path: "/blog/best-beaches-paros",
      gain: "+190",
      detail: tx(l, "Clicks fell 41% since June. Rankings slipped from 4.2 to 8.9.", "Τα κλικ έπεσαν 41% από τον Ιούνιο. Η θέση από 4,2 έγινε 8,9."),
    },
    {
      kind: "brand",
      label: tx(l, "Missing content", "Λείπει σελίδα"),
      effort: tx(l, "A day", "Μία μέρα"),
      title: tx(l, "Create a page for “paros hotel near the port”", "Φτιάξτε σελίδα για «ξενοδοχείο πάρος κοντά στο λιμάνι»"),
      path: tx(l, "1,300 searches a month", "1.300 αναζητήσεις τον μήνα"),
      gain: "+96",
    },
  ];
}

/** "Do this next": the ranked fixes list. */
export function DecisionsPanel({ locale: l, count = 4, numbered = true, details = false }: { readonly locale: L; readonly count?: number; readonly numbered?: boolean; readonly details?: boolean }) {
  return (
    <PCard
      icon={<Sparkles />}
      title={tx(l, "Do this next", "Κάντε αυτό τώρα")}
      meta={tx(l, "up to +966 clicks/mo", "έως +966 κλικ/μήνα")}
    >
      <ul className="divide-y divide-hairline">
        {fixes(l)
          .slice(0, count)
          .map((f, i) => (
            <li key={f.title} className="flex gap-3 px-4 py-3">
              {numbered ? (
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-[11px] font-medium text-muted-foreground">
                  {i + 1}
                </span>
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Pill tone={f.kind}>{f.label}</Pill>
                  <span className="text-[11px] text-muted-foreground">{f.effort}</span>
                </div>
                <div className="mt-1 font-medium leading-snug text-foreground">{f.title}</div>
                {details && f.detail ? <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{f.detail}</div> : null}
                <div className="mt-0.5 truncate text-[12px] text-muted-foreground">{f.path}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-semibold text-foreground">{f.gain}</div>
                <div className="text-[11px] text-muted-foreground">{tx(l, "clicks / mo", "κλικ / μήνα")}</div>
              </div>
            </li>
          ))}
      </ul>
    </PCard>
  );
}

/** The full Opportunities list with filter chips. */
export function OpportunitiesPreview({ locale: l }: { readonly locale: L }) {
  const chips = [
    [tx(l, "All", "Όλα"), "38"],
    [tx(l, "Striking distance", "Κοντά στην κορυφή"), "21"],
    [tx(l, "Low CTR", "Χαμηλό CTR"), "6"],
    [tx(l, "Content decay", "Πτώση"), "7"],
    [tx(l, "Cannibalization", "Κανιβαλισμός"), "4"],
  ];
  return (
    <PCard
      icon={<Sparkles />}
      title={tx(l, "Opportunities", "Ευκαιρίες")}
      subtitle={tx(l, "38 found · up to +966 clicks/mo", "38 ευκαιρίες · έως +966 κλικ/μήνα")}
      meta={tx(l, "Sorted by impact", "Κατά επίδραση")}
    >
      <div className="flex gap-1.5 overflow-hidden border-b border-hairline px-4 py-2.5">
        {chips.map(([label, n], i) => (
          <span
            key={label}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px]",
              i === 0 ? "bg-foreground text-background" : "border border-hairline text-muted-foreground",
            )}
          >
            {label} <span className="opacity-70">{n}</span>
          </span>
        ))}
      </div>
      <ul className="divide-y divide-hairline">
        {fixes(l)
          .slice(0, 3)
          .map((f) => (
            <li key={f.title} className="flex gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Pill tone={f.kind}>{f.label}</Pill>
                  <span className="text-[11px] text-muted-foreground">{f.effort}</span>
                </div>
                <div className="mt-1 font-medium text-foreground">{f.title}</div>
                {f.detail ? <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{f.detail}</div> : null}
                <div className="mt-0.5 text-[12px] text-muted-foreground">{f.path}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-semibold text-foreground">{f.gain}</div>
                <div className="text-[11px] text-muted-foreground">{tx(l, "clicks / mo", "κλικ / μήνα")}</div>
              </div>
            </li>
          ))}
      </ul>
    </PCard>
  );
}

/* ------------------------------------------------------------------ raw GSC table */

export function RawQueriesPanel({ locale: l }: { readonly locale: L }) {
  const rows: [string, string, string, string, string][] = [
    ["aegean suites", "4,120", "9,880", "41.7%", "1.2"],
    ["aegean suites paros", "2,310", "5,940", "38.9%", "1.1"],
    [tx(l, "paros hotels", "ξενοδοχεια παρος"), "702", "31,400", "2.2%", "8.1"],
    ["boutique hotel paros", "388", "9,800", "4.0%", "6.4"],
    [tx(l, "paros hotel with pool", "παρος ξενοδοχειο με πισινα"), "301", "15,800", "1.9%", "3.8"],
    [tx(l, "where to stay in paros", "που να μεινω στην παρο"), "244", "12,100", "2.0%", "7.2"],
    ["naoussa hotels", "196", "8,300", "2.4%", "9.6"],
  ];
  return (
    <PCard title={tx(l, "Queries", "Ερωτήματα")} meta={tx(l, "1,248 rows", "1.248 γραμμές")}>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-2 text-left font-medium">{tx(l, "Top queries", "Κορυφαία ερωτήματα")}</th>
            <th className="px-2 py-2 text-right font-medium">{tx(l, "Clicks", "Κλικ")}</th>
            <th className="hidden px-2 py-2 text-right font-medium sm:table-cell">{tx(l, "Impr.", "Εμφαν.")}</th>
            <th className="px-2 py-2 text-right font-medium">CTR</th>
            <th className="px-4 py-2 text-right font-medium">{tx(l, "Pos.", "Θέση")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((r) => (
            <tr key={r[0]}>
              <td className="max-w-[12rem] truncate px-4 py-2 text-foreground/90">{r[0]}</td>
              <td className="px-2 py-2 text-right tabular-nums text-muted-foreground">{r[1]}</td>
              <td className="hidden px-2 py-2 text-right tabular-nums text-muted-foreground sm:table-cell">{r[2]}</td>
              <td className="px-2 py-2 text-right tabular-nums text-muted-foreground">{r[3]}</td>
              <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PCard>
  );
}

/* ------------------------------------------------------------------ overview (hero) */

const NAV_GROUPS = (l: L) => [
  { label: tx(l, "Today", "Σήμερα"), items: [[LayoutGrid, tx(l, "This week", "Αυτή την εβδομάδα"), true], [ListChecks, tx(l, "Tasks", "Εργασίες")], [LineChartIcon, tx(l, "Performance", "Απόδοση")]] },
  { label: tx(l, "Grow", "Ανάπτυξη"), items: [[Sparkles, tx(l, "Opportunities", "Ευκαιρίες")], [KeyRound, tx(l, "Keywords", "Λέξεις-κλειδιά")], [FileText, tx(l, "Content", "Περιεχόμενο")]] },
  { label: tx(l, "Health", "Υγεία"), items: [[ShieldCheck, tx(l, "Site audit", "Έλεγχος ιστότοπου")]] },
  { label: tx(l, "Market", "Αγορά"), items: [[Swords, tx(l, "Competitors", "Ανταγωνιστές")], [Bot, tx(l, "AI visibility", "Ορατότητα σε AI")]] },
] as const;

export function OverviewPreview({ locale: l }: { readonly locale: L }) {
  const clicks = series(28, 1450, 1720, 0.1, 3);
  const prev = series(28, 1380, 1500, 0.09, 7);
  const tiles: { label: string; value: string; delta: number; suffix?: string; tone: "primary" | "brand" | "success" | "warning"; vals: number[] }[] = [
    { label: tx(l, "Clicks", "Κλικ"), value: "44.6K", delta: 12.4, tone: "primary", vals: clicks },
    { label: tx(l, "Impressions", "Εμφανίσεις"), value: "1.2M", delta: 8.1, tone: "brand", vals: series(28, 38000, 43000, 0.08, 5) },
    { label: "CTR", value: "3.7%", delta: 0.2, suffix: " pts", tone: "success", vals: series(28, 3.4, 3.7, 0.05, 2) },
    { label: tx(l, "Avg. position", "Μέση θέση"), value: "9.4", delta: -0.6, suffix: "", tone: "warning", vals: series(28, 10, 9.4, 0.05, 9) },
  ];
  return (
    <div className="flex min-h-[520px] bg-background text-[13px]">
      <aside className="hidden w-52 shrink-0 border-r border-hairline bg-surface/60 p-3 md:block">
        <div className="flex items-center gap-2 rounded-lg border border-hairline bg-background px-2.5 py-2">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">A</span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold text-foreground">Aegean Suites</div>
            <div className="truncate text-[10.5px] text-muted-foreground">{SAMPLE_SITE}</div>
          </div>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </div>
        {NAV_GROUPS(l).map((g) => (
          <div key={g.label} className="mt-4">
            <div className="px-2 text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground/80">{g.label}</div>
            <ul className="mt-1.5 grid gap-0.5">
              {g.items.map(([Icon, label, active]) => (
                <li
                  key={label as string}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px]",
                    active ? "bg-foreground/8 font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {label as string}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11.5px] text-muted-foreground">{tx(l, "Overview", "Επισκόπηση")} · {SAMPLE_SITE}</div>
            <div className="mt-0.5 font-display text-[18px] font-semibold text-foreground">Aegean Suites</div>
          </div>
          <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <span className="hidden items-center gap-1.5 rounded-md border border-hairline px-2 py-1 sm:inline-flex">
              <Search className="size-3" /> {tx(l, "Search…", "Αναζήτηση…")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline px-2 py-1">
              <CalendarDays className="size-3" /> {tx(l, "Last 28 days", "Τελευταίες 28 ημέρες")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-1 font-medium text-primary-glow">
              <Sparkles className="size-3" /> {tx(l, "Ask AI", "Ρωτήστε")}
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <div key={t.label} className={cn("rounded-xl border bg-surface p-3", i === 0 ? "border-primary/60" : "border-hairline")}>
              <div className="text-[11.5px] text-muted-foreground">{t.label}</div>
              <div className="mt-1 font-display text-[22px] font-semibold tracking-tight text-foreground">{t.value}</div>
              <Delta v={t.delta} suffix={t.suffix ?? "%"} />
              <Sparkline values={t.vals} tone={t.tone} className="mt-1.5" />
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-xl border border-hairline bg-surface p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">{tx(l, "Clicks over time", "Κλικ στον χρόνο")}</div>
                <div className="text-[11.5px] text-muted-foreground">{tx(l, "Last 28 days vs previous period", "28 ημέρες έναντι προηγούμενης περιόδου")}</div>
              </div>
              <div className="flex gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><span className="h-0.5 w-3 bg-primary-glow" />{tx(l, "Current", "Τώρα")}</span>
                <span className="inline-flex items-center gap-1"><span className="h-0.5 w-3 bg-muted-foreground/50" />{tx(l, "Previous", "Πριν")}</span>
              </div>
            </div>
            <LineChart
              className="mt-2"
              current={clicks}
              previous={prev}
              yTicks={[0, 500, 1000, 1500, 2000]}
              xLabels={l === "el" ? ["13 Σεπ", "20 Σεπ", "27 Σεπ", "4 Οκτ", "10 Οκτ"] : ["Sep 13", "Sep 20", "Sep 27", "Oct 4", "Oct 10"]}
              height={190}
            />
          </div>
          <DecisionsPanel locale={l} count={3} numbered={false} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ performance */

export function PerformancePreview({ locale: l }: { readonly locale: L }) {
  const vals = series(26, 9000, 14800, 0.07, 4);
  return (
    <PCard
      title={tx(l, "Clicks · last 6 months", "Κλικ · τελευταίοι 6 μήνες")}
      subtitle={tx(l, "Weekly, with your change notes and confirmed Google updates", "Εβδομαδιαία, με τις αλλαγές σας και τις ενημερώσεις της Google")}
      meta="58.2K"
    >
      <div className="px-3 pt-3">
        <LineChart
          current={vals}
          yTicks={[0, 4000, 8000, 12000, 16000]}
          xLabels={l === "el" ? ["Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ"] : ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
          markers={[
            { at: 7, tone: "brand" },
            { at: 13, tone: "warning" },
            { at: 19, tone: "brand" },
            { at: 22, tone: "warning" },
          ]}
          height={210}
        />
      </div>
      <ul className="grid gap-1.5 border-t border-hairline px-4 py-3 text-[11.5px] text-muted-foreground sm:grid-cols-2">
        <li className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand" />{tx(l, "Shipped: new rooms page with prices", "Αλλαγή: νέα σελίδα δωματίων με τιμές")}</li>
        <li className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-warning" />{tx(l, "Google core update began", "Ξεκίνησε core update της Google")}</li>
        <li className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand" />{tx(l, "Shipped: Greek version of the guide", "Αλλαγή: ελληνική έκδοση του οδηγού")}</li>
        <li className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-warning" />{tx(l, "Spam update began", "Ξεκίνησε spam update")}</li>
      </ul>
    </PCard>
  );
}

/* ------------------------------------------------------------------ keywords */

export function KeywordsPreview({ locale: l }: { readonly locale: L }) {
  const rows: [string, string, string, number, string, KindTone][] = [
    ["boutique hotel paros", tx(l, "Commercial", "Εμπορική"), "2.4K", 41, "6.4", "primary"],
    [tx(l, "paros hotels with pool", "ξενοδοχεια παρος με πισινα"), tx(l, "Commercial", "Εμπορική"), "1.9K", 38, "3.8", "primary"],
    [tx(l, "paros suites sea view", "σουιτες παρος θεα θαλασσα"), tx(l, "Transactional", "Συναλλακτική"), "880", 29, tx(l, "Not ranking", "Χωρίς θέση"), "success"],
    [tx(l, "where to stay in paros", "που να μεινω στην παρο"), tx(l, "Informational", "Ενημερωτική"), "3.6K", 33, "7.2", "muted"],
    [tx(l, "paros port hotels", "ξενοδοχεια παροικια λιμανι"), tx(l, "Commercial", "Εμπορική"), "1.3K", 22, "—", "primary"],
  ];
  return (
    <div className="grid gap-3">
      <PCard
        icon={<Search />}
        title={tx(l, "Ideas for “paros hotel”", "Ιδέες για «ξενοδοχείο πάρος»")}
        subtitle={tx(l, "Greece · Greek and English", "Ελλάδα · Ελληνικά και Αγγλικά")}
        meta={tx(l, "sample data", "δείγμα")}
      >
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2 text-left font-medium">{tx(l, "Keyword", "Λέξη-κλειδί")}</th>
              <th className="hidden px-2 py-2 text-left font-medium sm:table-cell">{tx(l, "Intent", "Πρόθεση")}</th>
              <th className="px-2 py-2 text-right font-medium">{tx(l, "Volume", "Όγκος")}</th>
              <th className="px-2 py-2 text-right font-medium">KD</th>
              <th className="px-4 py-2 text-right font-medium">{tx(l, "You", "Εσείς")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className="max-w-[11rem] truncate px-4 py-2 text-foreground/90">{r[0]}</td>
                <td className="hidden px-2 py-2 sm:table-cell"><Pill tone={r[5]}>{r[1]}</Pill></td>
                <td className="px-2 py-2 text-right tabular-nums text-muted-foreground">{r[2]}</td>
                <td className="px-2 py-2 text-right tabular-nums text-muted-foreground">{r[3]}</td>
                <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PCard>
      <PCard title={tx(l, "Rank tracking", "Παρακολούθηση θέσεων")} subtitle={tx(l, "36 tracked keywords", "36 λέξεις-κλειδιά")} meta={tx(l, "daily", "καθημερινά")}>
        <div className="grid gap-3 px-4 py-3 sm:grid-cols-[1fr_1fr]">
          <div>
            <div className="flex h-2 overflow-hidden rounded-full">
              <span className="w-[22%] bg-primary" />
              <span className="w-[31%] bg-brand" />
              <span className="w-[28%] bg-success" />
              <span className="w-[19%] bg-warning" />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[11.5px] text-muted-foreground">
              <span>Top 3 <b className="text-foreground">8</b></span>
              <span>4–10 <b className="text-foreground">11</b></span>
              <span>11–20 <b className="text-foreground">10</b></span>
              <span>21+ <b className="text-foreground">7</b></span>
            </div>
          </div>
          <ul className="grid gap-1.5 text-[12px]">
            {[
              ["boutique hotel paros", "6.4", "+1.8"],
              [tx(l, "paros hotel with pool", "παρος ξενοδοχειο με πισινα"), "3.8", "+0.9"],
              ["naoussa hotels", "9.6", "-0.4"],
            ].map(([k, p, d]) => (
              <li key={k} className="flex items-center justify-between gap-2">
                <span className="truncate text-foreground/90">{k}</span>
                <span className="flex shrink-0 items-center gap-2 tabular-nums">
                  <span className="text-foreground">{p}</span>
                  <span className={d.startsWith("-") ? "text-destructive" : "text-success"}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PCard>
    </div>
  );
}

/* ------------------------------------------------------------------ audit */

export function AuditPreview({ locale: l }: { readonly locale: L }) {
  const issues: [KindTone, string, string, string][] = [
    ["destructive", tx(l, "Critical", "Κρίσιμο"), tx(l, "6 sitemap URLs return 404", "6 URL του sitemap επιστρέφουν 404"), tx(l, "Including /offers/early-booking", "Μεταξύ τους το /offers/early-booking")],
    ["destructive", tx(l, "Critical", "Κρίσιμο"), tx(l, "Greek pages have no hreflang", "Οι ελληνικές σελίδες δεν έχουν hreflang"), tx(l, "Google shows the English page to Greek searchers", "Η Google δείχνει την αγγλική σελίδα σε Έλληνες")],
    ["warning", tx(l, "Warning", "Προσοχή"), tx(l, "14 titles longer than 60 characters", "14 τίτλοι πάνω από 60 χαρακτήρες"), tx(l, "Mostly /rooms/*", "Κυρίως /rooms/*")],
    ["warning", tx(l, "Warning", "Προσοχή"), tx(l, "Booking engine blocks the rooms page LCP", "Η μηχανή κρατήσεων καθυστερεί το LCP"), "LCP 3.9s · mobile"],
  ];
  return (
    <PCard title={tx(l, "Site audit", "Έλεγχος ιστότοπου")} subtitle={tx(l, "312 pages crawled · sample data", "312 σελίδες · δείγμα")} meta={tx(l, "weekly", "εβδομαδιαία")}>
      <div className="flex items-center gap-4 border-b border-hairline px-4 py-3">
        <ScoreRing value={78} />
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[
            ["2", tx(l, "Critical", "Κρίσιμα"), "text-destructive"],
            ["14", tx(l, "Warnings", "Προειδοποιήσεις"), "text-warning"],
            ["27", tx(l, "Notices", "Σημειώσεις"), "text-brand"],
          ].map(([n, label, cls]) => (
            <div key={label} className="rounded-lg border border-hairline bg-background px-2.5 py-2">
              <div className="font-display text-[18px] font-semibold text-foreground">{n}</div>
              <div className={cn("text-[11px]", cls)}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <ul className="divide-y divide-hairline">
        {issues.map(([tone, label, title, sub]) => (
          <li key={title} className="flex items-start gap-3 px-4 py-2.5">
            <Pill tone={tone} className="mt-0.5 gap-1">
              {tone === "destructive" ? <AlertTriangle className="size-3" /> : null}
              {label}
            </Pill>
            <div className="min-w-0">
              <div className="font-medium text-foreground">{title}</div>
              <div className="text-[12px] text-muted-foreground">{sub}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
        <span className="font-medium text-foreground">Core Web Vitals · mobile</span>
        <span>LCP 3.9s <Pill tone="warning">{tx(l, "Needs work", "Βελτίωση")}</Pill></span>
        <span>INP 160ms <Pill tone="success">{tx(l, "Good", "Καλό")}</Pill></span>
        <span>CLS 0.04 <Pill tone="success">{tx(l, "Good", "Καλό")}</Pill></span>
      </div>
    </PCard>
  );
}

/* ------------------------------------------------------------------ AI visibility */

export function AiVisibilityPreview({ locale: l }: { readonly locale: L }) {
  type S = "cited" | "mentioned" | "absent";
  const rows: [string, S, S, S, S][] = [
    [tx(l, "best boutique hotel in paros", "καλύτερο boutique ξενοδοχείο πάρος"), "cited", "mentioned", "cited", "cited"],
    [tx(l, "paros hotel near the port", "ξενοδοχείο πάρος κοντά στο λιμάνι"), "mentioned", "absent", "cited", "absent"],
    [tx(l, "family hotel paros with pool", "οικογενειακό ξενοδοχείο πάρος πισίνα"), "absent", "absent", "mentioned", "absent"],
    [tx(l, "romantic hotel naoussa", "ρομαντικό ξενοδοχείο νάουσα"), "cited", "cited", "absent", "mentioned"],
  ];
  const cell = (s: S) =>
    s === "cited" ? (
      <span className="inline-flex items-center gap-1 text-success"><CheckCircle2 className="size-3" />{tx(l, "Cited", "Πηγή")}</span>
    ) : s === "mentioned" ? (
      <span className="inline-flex items-center gap-1 text-foreground/85"><span className="size-2 rounded-full bg-foreground/60" />{tx(l, "Mentioned", "Αναφορά")}</span>
    ) : (
      <span className="text-muted-foreground/70">— {tx(l, "Absent", "Απουσία")}</span>
    );
  return (
    <PCard
      title={tx(l, "AI visibility", "Ορατότητα σε AI")}
      subtitle={tx(l, "How AI assistants answer your buyers’ questions · sample data", "Πώς απαντούν οι βοηθοί AI στους πελάτες σας · δείγμα")}
      meta={tx(l, "weekly", "εβδομαδιαία")}
    >
      <div className="overflow-hidden">
        <table className="w-full text-[11.5px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2 text-left font-medium">{tx(l, "Prompt", "Ερώτηση")}</th>
              <th className="px-2 py-2 text-left font-medium">ChatGPT</th>
              <th className="hidden px-2 py-2 text-left font-medium sm:table-cell">Gemini</th>
              <th className="hidden px-2 py-2 text-left font-medium sm:table-cell">Perplexity</th>
              <th className="px-2 py-2 text-left font-medium">AI Overviews</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className="max-w-[10rem] truncate px-4 py-2 text-foreground/90">{r[0]}</td>
                <td className="px-2 py-2">{cell(r[1])}</td>
                <td className="hidden px-2 py-2 sm:table-cell">{cell(r[2])}</td>
                <td className="hidden px-2 py-2 sm:table-cell">{cell(r[3])}</td>
                <td className="px-2 py-2">{cell(r[4])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-hairline px-4 py-3">
        <div className="text-[12px] font-medium text-foreground">{tx(l, "Share of voice across tracked prompts", "Μερίδιο φωνής στις ερωτήσεις")}</div>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full">
          <span className="w-[34%] bg-primary" />
          <span className="w-[27%] bg-warning" />
          <span className="w-[21%] bg-success" />
          <span className="w-[18%] bg-foreground/25" />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span><span className="mr-1 inline-block size-2 rounded-full bg-primary" />Aegean Suites 34%</span>
          <span><span className="mr-1 inline-block size-2 rounded-full bg-warning" />Port View 27%</span>
          <span><span className="mr-1 inline-block size-2 rounded-full bg-success" />Naoussa Bay 21%</span>
          <span><span className="mr-1 inline-block size-2 rounded-full bg-foreground/25" />{tx(l, "Others", "Άλλοι")} 18%</span>
        </div>
      </div>
    </PCard>
  );
}

/* ------------------------------------------------------------------ assistant */

export function AssistantPreview({ locale: l }: { readonly locale: L }) {
  return (
    <PCard icon={<Bot />} title={tx(l, "AI assistant", "Βοηθός AI")} subtitle={tx(l, "Answers from your own Search Console data", "Απαντά με τα δικά σας δεδομένα Search Console")}>
      <div className="grid gap-3 px-4 py-4">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-[12.5px] text-primary-foreground">
          {tx(l, "Why did clicks to our Paros beaches guide drop?", "Γιατί έπεσαν τα κλικ στον οδηγό για τις παραλίες της Πάρου;")}
        </div>
        <div className="flex gap-2.5">
          <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><Bot className="size-3.5" /></span>
          <div className="rounded-2xl rounded-tl-md border border-hairline bg-background px-3.5 py-2.5 text-[12.5px] leading-relaxed text-foreground/90">
            {l === "el" ? (
              <>Τα κλικ στο <b>/blog/best-beaches-paros</b> έπεσαν <b>41%</b> (1.204 → 710). Η μέση θέση πήγε από <b>4,2</b> σε <b>8,9</b>, άρα είναι απώλεια θέσης και όχι ζήτησης.</>
            ) : (
              <>Clicks to <b>/blog/best-beaches-paros</b> fell <b>41%</b> (1,204 → 710). Average position moved from <b>4.2</b> to <b>8.9</b>, so this is a ranking loss, not lower demand.</>
            )}
            <div className="mt-2 font-semibold text-foreground">{tx(l, "What I’d do first", "Τι θα έκανα πρώτα")}</div>
            <ol className="mt-1 list-decimal space-y-0.5 pl-4">
              <li>{tx(l, "Update the 2024 prices and ferry times.", "Ενημερώστε τιμές και δρομολόγια του 2024.")}</li>
              <li>{tx(l, "Add a map and a short FAQ section.", "Προσθέστε χάρτη και σύντομες ερωτήσεις.")}</li>
              <li>{tx(l, "Link to it from the rooms page.", "Βάλτε σύνδεσμο από τη σελίδα δωματίων.")}</li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-hairline bg-background px-3 py-2 text-[12px] text-muted-foreground">
          {tx(l, "Ask about your search data…", "Ρωτήστε για τα δεδομένα σας…")}
          <CornerDownLeft className="size-3.5" />
        </div>
      </div>
    </PCard>
  );
}

/* ------------------------------------------------------------------ content */

export function ContentPreview({ locale: l }: { readonly locale: L }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <PCard icon={<FileText />} title={tx(l, "Content brief", "Brief περιεχομένου")} subtitle={tx(l, "“where to stay in paros”", "«πού να μείνω στην Πάρο»")}>
        <div className="px-4 py-3 text-[12px]">
          <div className="flex gap-4 text-muted-foreground">
            <span><b className="text-foreground">1,800–2,200</b> {tx(l, "words", "λέξεις")}</span>
            <span><b className="text-foreground">7</b> {tx(l, "sections", "ενότητες")}</span>
          </div>
          <ul className="mt-2.5 grid gap-1.5">
            {[
              tx(l, "Parikia, Naoussa or Golden Beach?", "Παροικιά, Νάουσα ή Χρυσή Ακτή;"),
              tx(l, "Best areas for families", "Οι καλύτερες περιοχές για οικογένειες"),
              tx(l, "Staying near the port", "Διαμονή κοντά στο λιμάνι"),
              tx(l, "When to book", "Πότε να κλείσετε"),
              "FAQ",
            ].map((h) => (
              <li key={h} className="flex items-center gap-2 text-foreground/90">
                <span className="rounded bg-foreground/8 px-1 font-mono text-[10px] text-muted-foreground">H2</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </PCard>
      <PCard title={tx(l, "Optimizer", "Βελτιστοποίηση")} subtitle={tx(l, "Draft vs brief", "Κείμενο έναντι brief")}>
        <div className="flex items-center gap-3 px-4 py-3">
          <ScoreRing value={84} size={58} />
          <div className="text-[12px] text-muted-foreground">{tx(l, "Target 85+ to match the top results", "Στόχος 85+ για τα κορυφαία αποτελέσματα")}</div>
        </div>
        <ul className="grid gap-1.5 border-t border-hairline px-4 py-3 text-[12px]">
          <li className="flex items-center gap-2 text-foreground/90"><CheckCircle2 className="size-3.5 text-success" />{tx(l, "Keyword in title and H1", "Λέξη-κλειδί σε τίτλο και H1")}</li>
          <li className="flex items-center gap-2 text-foreground/90"><CheckCircle2 className="size-3.5 text-success" />{tx(l, "Covers 9 of 11 subtopics", "Καλύπτει 9 από 11 υποθέματα")}</li>
          <li className="flex items-center gap-2 text-foreground/90"><AlertTriangle className="size-3.5 text-warning" />{tx(l, "No FAQ section yet", "Δεν υπάρχουν ακόμα ερωτήσεις")}</li>
        </ul>
        <div className="border-t border-hairline px-4 py-2.5 text-right">
          <span className="rounded-md border border-hairline px-2 py-1 text-[11.5px] text-foreground">{tx(l, "Publish to WordPress", "Δημοσίευση στο WordPress")}</span>
        </div>
      </PCard>
    </div>
  );
}

/* ------------------------------------------------------------------ competitors */

export function CompetitorsPreview({ locale: l }: { readonly locale: L }) {
  const comps: [string, number, string][] = [
    ["portview-paros.example", 412, "w-[92%]"],
    ["naoussabay.example", 305, "w-[70%]"],
    ["cycladic-stays.example", 188, "w-[44%]"],
  ];
  return (
    <PCard title={tx(l, "Keyword gap", "Κενό λέξεων-κλειδιών")} subtitle={tx(l, "Keywords competitors rank for and you don’t · sample data", "Όπου κατατάσσονται οι ανταγωνιστές κι εσείς όχι · δείγμα")}>
      <ul className="grid gap-2 px-4 py-3">
        {comps.map(([d, n, w]) => (
          <li key={d} className="flex items-center gap-3 text-[12px]">
            <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-foreground/5">
              <div className={cn("absolute inset-y-0 left-0 rounded-md bg-primary/25", w)} />
              <span className="relative flex h-full items-center px-2 text-foreground/90">{d}</span>
            </div>
            <span className="w-10 text-right font-semibold tabular-nums text-foreground">{n}</span>
          </li>
        ))}
      </ul>
      <table className="w-full border-t border-hairline text-[12px]">
        <tbody className="divide-y divide-hairline">
          {[
            [tx(l, "paros hotel with breakfast", "πάρος ξενοδοχείο με πρωινό"), "1,600", "#2"],
            [tx(l, "adults only hotel paros", "ξενοδοχείο μόνο για ενήλικες πάρος"), "1,100", "#4"],
            [tx(l, "paros hotel with jacuzzi", "πάρος ξενοδοχείο με τζακούζι"), "720", "#3"],
          ].map(([k, v, p]) => (
            <tr key={k}>
              <td className="px-4 py-2 text-foreground/90">{k}</td>
              <td className="px-2 py-2 text-right tabular-nums text-muted-foreground">{v}</td>
              <td className="px-4 py-2 text-right text-muted-foreground">{p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PCard>
  );
}

/* ------------------------------------------------------------------ agency */

export function PipelinePreview({ locale: l }: { readonly locale: L }) {
  const cols: { stage: string; items: [string, string][] }[] = [
    { stage: tx(l, "New leads", "Νέα leads"), items: [["Villa Thalassa", tx(l, "Website audit", "Έλεγχος ιστοσελίδας")], ["Milos Rent", tx(l, "Free audit form", "Φόρμα ελέγχου")]] },
    { stage: tx(l, "Proposal sent", "Προσφορά"), items: [["Kyma Hotel", "€900/" + tx(l, "mo", "μήνα")]] },
    { stage: tx(l, "Won", "Κλειστά"), items: [["Naxos Tours", "€1,500/" + tx(l, "mo", "μήνα")], ["Oia Cave", "€2,500"]] },
  ];
  return (
    <PCard icon={<Users />} title={tx(l, "Pipeline", "Pipeline")} subtitle={tx(l, "Requests from your website land here", "Τα αιτήματα από την ιστοσελίδα σας έρχονται εδώ")}>
      <div className="grid grid-cols-3 gap-2 p-3">
        {cols.map((c) => (
          <div key={c.stage} className="rounded-lg bg-foreground/5 p-2">
            <div className="flex items-center justify-between px-1 text-[11px] font-medium text-muted-foreground">
              {c.stage}
              <span>{c.items.length}</span>
            </div>
            <ul className="mt-2 grid gap-1.5">
              {c.items.map(([n, m]) => (
                <li key={n} className="rounded-md border border-hairline bg-surface px-2 py-1.5">
                  <div className="truncate text-[12px] font-medium text-foreground">{n}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{m}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PCard>
  );
}

/** A monthly client report page, for agency-service pages and "what you get". */
export function ReportPreview({ locale: l }: { readonly locale: L }) {
  return (
    <PCard title={tx(l, "Monthly report · September", "Μηνιαία αναφορά · Σεπτέμβριος")} subtitle="aegean-suites.example" meta="PDF">
      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        {[
          [tx(l, "Organic clicks", "Οργανικά κλικ"), "14.8K", 23],
          [tx(l, "Booking-page visits", "Επισκέψεις κρατήσεων"), "2,940", 31],
          [tx(l, "Top-3 keywords", "Λέξεις στο top 3"), "8", 60],
        ].map(([label, v, d]) => (
          <div key={label as string} className="rounded-lg border border-hairline bg-background px-2.5 py-2">
            <div className="truncate text-[11px] text-muted-foreground">{label}</div>
            <div className="font-display text-[17px] font-semibold text-foreground">{v}</div>
            <Delta v={d as number} />
          </div>
        ))}
      </div>
      <div className="px-3">
        <LineChart current={series(12, 6200, 14800, 0.05, 2)} yTicks={[0, 5000, 10000, 15000]} xLabels={l === "el" ? ["Οκτ", "Ιαν", "Απρ", "Ιούλ", "Σεπ"] : ["Oct", "Jan", "Apr", "Jul", "Sep"]} height={150} />
      </div>
      <ul className="grid gap-1.5 border-t border-hairline px-4 py-3 text-[12px] text-foreground/90">
        <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" />{tx(l, "Shipped: Greek rooms pages with hreflang", "Έγινε: ελληνικές σελίδες δωματίων με hreflang")}</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" />{tx(l, "Shipped: faster booking widget (LCP 3.9s → 2.1s)", "Έγινε: γρηγορότερη κράτηση (LCP 3,9s → 2,1s)")}</li>
        <li className="flex items-center gap-2"><Gauge className="size-3.5 text-brand" />{tx(l, "Next: “paros hotel near the port” page", "Επόμενο: σελίδα «ξενοδοχείο κοντά στο λιμάνι»")}</li>
      </ul>
    </PCard>
  );
}

/** Local pack card for local-SEO pages. */
export function LocalPackPreview({ locale: l, city = "Paros" }: { readonly locale: L; readonly city?: string }) {
  return (
    <PCard icon={<MapPin />} title={tx(l, `Map results · “hotel ${city.toLowerCase()}”`, `Χάρτης · «ξενοδοχείο ${city}»`)} subtitle={tx(l, "Google Maps, mobile", "Google Maps, κινητό")}>
      <ul className="divide-y divide-hairline">
        {[
          ["Aegean Suites", "4.9", "312", true],
          ["Port View Hotel", "4.6", "540", false],
          ["Naoussa Bay", "4.7", "198", false],
        ].map(([n, r, c, you]) => (
          <li key={n as string} className={cn("flex items-center justify-between gap-3 px-4 py-2.5", you && "bg-primary/8")}>
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-medium text-foreground">
                {n}
                {you ? <Pill tone="brand">{tx(l, "You", "Εσείς")}</Pill> : null}
              </div>
              <div className="text-[12px] text-muted-foreground">★ {r} · {c} {tx(l, "reviews", "κριτικές")}</div>
            </div>
            <span className="text-[12px] text-muted-foreground">{tx(l, "Directions", "Οδηγίες")}</span>
          </li>
        ))}
      </ul>
    </PCard>
  );
}

/* ------------------------------------------------------------------ mini previews for steps */

export function PropertiesMini({ locale: l }: { readonly locale: L }) {
  return (
    <div className="grid gap-1.5 rounded-xl border border-hairline bg-background p-2 text-[12px]">
      {[SAMPLE_SITE, "villa-thalassa.example"].map((d, i) => (
        <div key={d} className={cn("flex items-center gap-2 rounded-lg border px-2.5 py-2", i === 0 ? "border-primary/60 bg-primary/8" : "border-hairline")}>
          <span className={cn("size-3 rounded-full border-2", i === 0 ? "border-primary bg-primary" : "border-foreground/30")} />
          <span className="flex-1 truncate text-foreground/90">{d}</span>
          <span className="text-[10.5px] text-muted-foreground">{tx(l, "Domain", "Domain")}</span>
        </div>
      ))}
    </div>
  );
}

export function PlanMini({ locale: l }: { readonly locale: L }) {
  return (
    <div className="rounded-xl border border-hairline bg-background p-3 text-[12px]">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[20px] font-semibold text-foreground">38</span>
        <span className="text-muted-foreground">{tx(l, "up to +966 clicks/mo", "έως +966 κλικ/μήνα")}</span>
      </div>
      {[
        [tx(l, "Striking distance", "Κοντά στην κορυφή"), "w-[80%]", 21],
        [tx(l, "Content decay", "Πτώση"), "w-[30%]", 7],
        [tx(l, "Low CTR", "Χαμηλό CTR"), "w-[24%]", 6],
      ].map(([k, w, n]) => (
        <div key={k as string} className="mt-1.5 flex items-center gap-2">
          <span className="w-28 truncate text-muted-foreground">{k}</span>
          <span className="h-1.5 flex-1 rounded-full bg-foreground/8"><span className={cn("block h-full rounded-full bg-primary", w as string)} /></span>
          <span className="w-5 text-right tabular-nums text-foreground">{n}</span>
        </div>
      ))}
    </div>
  );
}

export function FollowThroughMini({ locale: l }: { readonly locale: L }) {
  return (
    <div className="rounded-xl border border-hairline bg-background p-3 text-[12px]">
      <div className="flex items-center gap-2">
        <Pill tone="warning">{tx(l, "In progress", "Σε εξέλιξη")}</Pill>
        <span className="text-muted-foreground">{tx(l, "Due Friday", "Έως Παρασκευή")}</span>
      </div>
      <div className="mt-1.5 font-medium text-foreground">{tx(l, "Rewrite the title and description for this page", "Νέος τίτλος και περιγραφή της σελίδας")}</div>
      <div className="text-muted-foreground">{tx(l, "+268 clicks/mo estimated", "εκτίμηση +268 κλικ/μήνα")}</div>
    </div>
  );
}
