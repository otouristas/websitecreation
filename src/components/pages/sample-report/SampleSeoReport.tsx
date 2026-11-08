import { ArrowDownRight, ArrowUpRight, CheckCircle2, CircleDot, Lightbulb } from "lucide-react";
import type { SiteLocale } from "@/lib/i18n/locale";

/**
 * A complete monthly SEO client report on sample data, laid out the way
 * AnotherSEOGuru App's Reports page builds it (Summary, clicks over time,
 * ranking spread, top queries and pages, wins and losses, opportunities,
 * completed work, next steps). Every figure is invented for the example and
 * the report says so in its header. Prints cleanly on A4.
 */

type L = SiteLocale;
const tx = (l: L, en: string, el: string) => (l === "el" ? el : en);

const fmt = (l: L, n: number) => n.toLocaleString(l === "el" ? "el-GR" : "en-US");

/** Monthly organic clicks, Oct 2025 to Oct 2026 (sample). */
const CLICKS = [3670, 3810, 3520, 3940, 4120, 4050, 4310, 4480, 4390, 4560, 4710, 4630, 5180];
const NON_BRAND = [2420, 2510, 2290, 2600, 2740, 2690, 2860, 2990, 2900, 3010, 3120, 2890, 3412];
const MONTHS_EN = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const MONTHS_EL = ["Οκτ", "Νοε", "Δεκ", "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ"];

function Delta({ v, suffix = "%" }: { readonly v: number; readonly suffix?: string }) {
  const up = v >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums ${up ? "text-success" : "text-destructive"}`}>
      <Icon className="size-3.5" aria-hidden />
      {up ? "+" : ""}
      {v}
      {suffix}
    </span>
  );
}

function Section({ title, note, children }: { readonly title: string; readonly note?: string; readonly children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid border-t border-hairline px-5 py-6 sm:px-8">
      <h3 className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em] text-foreground">
        <span className="h-4 w-1 rounded-full bg-primary" aria-hidden />
        {title}
      </h3>
      {note ? <p className="mt-1 text-[13px] text-muted-foreground">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ClicksChart({ l }: { readonly l: L }) {
  const w = 640;
  const h = 200;
  const pad = { t: 10, r: 10, b: 24, l: 40 };
  const max = 6000;
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (CLICKS.length - 1);
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const path = (s: readonly number[]) => s.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const months = l === "el" ? MONTHS_EL : MONTHS_EN;
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label={tx(l, "Monthly organic clicks over 13 months, total and non-branded, both rising", "Μηνιαία οργανικά κλικ σε 13 μήνες, συνολικά και χωρίς επωνυμία, και τα δύο ανεβαίνουν")}>
        {[0, 2000, 4000, 6000].map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} className="stroke-hairline" strokeWidth={1} />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {t === 0 ? "0" : `${t / 1000}K`}
            </text>
          </g>
        ))}
        {months.map((m, i) =>
          i % 3 === 0 || i === months.length - 1 ? (
            <text key={i} x={x(i)} y={h - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {m}
            </text>
          ) : null,
        )}
        <path d={path(CLICKS)} fill="none" className="stroke-foreground/35" strokeWidth={2} strokeDasharray="4 4" />
        <path d={path(NON_BRAND)} fill="none" className="stroke-primary" strokeWidth={2.5} />
        <circle cx={x(CLICKS.length - 1)} cy={y(NON_BRAND[NON_BRAND.length - 1])} r={4} className="fill-primary" />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-primary" aria-hidden />
          {tx(l, "Non-branded clicks", "Κλικ χωρίς επωνυμία")}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-foreground/35" aria-hidden />
          {tx(l, "All organic clicks", "Όλα τα οργανικά κλικ")}
        </span>
      </figcaption>
    </figure>
  );
}

function Table({ head, rows }: { readonly head: readonly string[]; readonly rows: ReadonlyArray<ReadonlyArray<React.ReactNode>> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[340px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-hairline text-[11.5px] uppercase tracking-wide text-muted-foreground">
            {head.map((h, i) => (
              <th key={h} className={`py-2 font-medium ${i ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-b border-hairline/60 last:border-0">
              {r.map((c, ci) => (
                <td key={ci} className={`py-2 ${ci ? "text-right tabular-nums" : "min-w-0 pr-3 text-foreground"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SampleSeoReport({ locale: l }: { readonly locale: L }) {
  const n = (v: number) => fmt(l, v);
  const kpis: ReadonlyArray<[string, string, number, string]> = [
    [tx(l, "Non-branded clicks", "Κλικ χωρίς επωνυμία"), n(3412), 18, tx(l, "+41% vs Oct 2025", "+41% έναντι Οκτ 2025")],
    [tx(l, "Appointment requests from organic", "Αιτήματα ραντεβού από οργανική"), n(47), 15, tx(l, "+62% vs Oct 2025", "+62% έναντι Οκτ 2025")],
    [tx(l, "All organic clicks", "Όλα τα οργανικά κλικ"), n(5180), 12, tx(l, "+41% vs Oct 2025", "+41% έναντι Οκτ 2025")],
    [tx(l, "Queries in the top 10", "Αναζητήσεις στο top 10"), n(142), 15, tx(l, "+19 queries this month", "+19 αναζητήσεις αυτόν τον μήνα")],
  ];

  return (
    <article id="sample-report" className="sample-report overflow-hidden rounded-[22px] border border-hairline bg-background text-foreground shadow-sm print:rounded-none print:border-0 print:shadow-none">
      {/* Cover */}
      <header className="flex flex-wrap items-start justify-between gap-4 bg-primary/8 px-5 py-6 sm:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-primary">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground" aria-hidden>
              YA
            </span>
            {tx(l, "Your Agency · your logo here", "Το agency σας · το λογότυπό σας εδώ")}
          </div>
          <h2 className="mt-3 font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[1.9rem]">
            {tx(l, "SEO report: Northside Dental", "Αναφορά SEO: Northside Dental")}
          </h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {tx(l, "October 2026 · compared with September 2026 and October 2025 · northside-dental.example", "Οκτώβριος 2026 · σε σύγκριση με Σεπτέμβριο 2026 και Οκτώβριο 2025 · northside-dental.example")}
          </p>
        </div>
        <span className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-[12px] font-medium text-foreground">
          {tx(l, "Sample data: an invented client", "Δείγμα δεδομένων: φανταστικός πελάτης")}
        </span>
      </header>

      <Section title={tx(l, "Summary", "Σύνοψη")}>
        <p className="text-pretty text-[15px] leading-relaxed">
          {tx(
            l,
            "Non-branded clicks rose 18% to 3,412, the best month on record, and organic search brought 47 appointment requests (up from 41). Most of the gain came from the new emergency dentist page, which reached position 4 within three weeks. Next month we focus on the implant pages, where 9 queries sit in positions 5 to 12.",
            "Τα κλικ χωρίς επωνυμία ανέβηκαν 18% στα 3.412, ο καλύτερος μήνας μέχρι σήμερα, και η οργανική αναζήτηση έφερε 47 αιτήματα ραντεβού (από 41). Το μεγαλύτερο μέρος της ανόδου ήρθε από τη νέα σελίδα για επείγοντα οδοντιατρικά περιστατικά, που έφτασε στη θέση 4 μέσα σε τρεις εβδομάδες. Τον επόμενο μήνα εστιάζουμε στις σελίδες εμφυτευμάτων, όπου 9 αναζητήσεις βρίσκονται στις θέσεις 5 έως 12.",
          )}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map(([label, value, d, yoy]) => (
            <div key={label} className="flex min-w-0 flex-col rounded-xl border border-hairline bg-surface/60 p-3">
              <div className="text-[12px] leading-snug text-muted-foreground">{label}</div>
              <div className="mt-auto pt-1 font-display text-[22px] font-semibold tabular-nums">{value}</div>
              <div className="flex flex-wrap items-center gap-x-2">
                <Delta v={d} />
                <span className="text-[11.5px] text-muted-foreground">{tx(l, "vs Sep", "έναντι Σεπ")}</span>
              </div>
              <div className="text-[11.5px] text-muted-foreground">{yoy}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={tx(l, "Organic clicks over time", "Οργανικά κλικ στον χρόνο")} note={tx(l, "13 months, so seasonality is visible. Source: Google Search Console.", "13 μήνες, ώστε να φαίνεται η εποχικότητα. Πηγή: Google Search Console.")}>
        <ClicksChart l={l} />
      </Section>

      <Section title={tx(l, "Ranking spread", "Κατανομή θέσεων")} note={tx(l, "Queries with impressions, by average position", "Αναζητήσεις με εμφανίσεις, ανά μέση θέση")}>
        <div className="grid gap-2.5">
          {[
            [tx(l, "Positions 1 to 3", "Θέσεις 1 έως 3"), 38, 6, "w-[19%]"],
            [tx(l, "Positions 4 to 10", "Θέσεις 4 έως 10"), 104, 13, "w-[52%]"],
            [tx(l, "Positions 11 to 20", "Θέσεις 11 έως 20"), 161, -8, "w-[80%]"],
          ].map(([label, count, d, w]) => (
            <div key={label as string} className="flex items-center gap-3 text-[13px]">
              <span className="w-32 shrink-0 text-muted-foreground sm:w-40">{label}</span>
              <span className="h-2 flex-1 rounded-full bg-foreground/8">
                <span className={`block h-full rounded-full bg-primary ${w as string}`} />
              </span>
              <span className="w-10 shrink-0 text-right font-medium tabular-nums">{count}</span>
              <span className="w-12 shrink-0 text-right">
                <Delta v={d as number} suffix="" />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12.5px] text-muted-foreground">
          {tx(l, "Fewer queries in 11 to 20 is good news here: 13 of them moved up into the top 10.", "Λιγότερες αναζητήσεις στις θέσεις 11 έως 20 είναι καλό νέο: 13 από αυτές ανέβηκαν στο top 10.")}
        </p>
      </Section>

      <div>
        <Section title={tx(l, "Top queries", "Κορυφαίες αναζητήσεις")} note={tx(l, "Non-branded, by clicks", "Χωρίς επωνυμία, ανά κλικ")}>
          <Table
            head={[tx(l, "Query", "Αναζήτηση"), tx(l, "Clicks", "Κλικ"), tx(l, "Position", "Θέση")]}
            rows={[
              ["emergency dentist springfield", n(412), "3.8"],
              ["dentist near me", n(388), "6.1"],
              ["teeth whitening springfield", n(251), "4.4"],
              ["invisalign cost", n(176), "8.9"],
              ["dental implants springfield", n(149), "7.2"],
            ]}
          />
        </Section>
        <Section title={tx(l, "Top pages", "Κορυφαίες σελίδες")} note={tx(l, "By clicks", "Ανά κλικ")}>
          <Table
            head={[tx(l, "Page", "Σελίδα"), tx(l, "Clicks", "Κλικ"), tx(l, "Change", "Μεταβολή")]}
            rows={[
              ["/emergency-dentist", n(968), <Delta key="a" v={212} />],
              ["/", n(1544), <Delta key="b" v={4} />],
              ["/teeth-whitening", n(531), <Delta key="c" v={9} />],
              ["/invisalign", n(402), <Delta key="d" v={-6} />],
              ["/dental-implants", n(357), <Delta key="e" v={11} />],
            ]}
          />
        </Section>
      </div>

      <Section title={tx(l, "Wins and losses", "Κέρδη και απώλειες")} note={tx(l, "Queries with the biggest click changes vs September, with the reason", "Οι αναζητήσεις με τη μεγαλύτερη μεταβολή κλικ έναντι Σεπτεμβρίου, με την αιτία")}>
        <ul className="grid gap-2 text-[14px] sm:grid-cols-2">
          {[
            [true, "emergency dentist springfield", "+298", tx(l, "New page live on 8 Oct", "Νέα σελίδα live στις 8 Οκτ")],
            [true, "same day dentist", "+84", tx(l, "Same page, new FAQ section", "Ίδια σελίδα, νέα ενότητα FAQ")],
            [false, "invisalign cost", "-31", tx(l, "A competitor's price page now ranks above us", "Η σελίδα τιμών ανταγωνιστή είναι πλέον πάνω μας")],
            [false, "kids dentist", "-12", tx(l, "Seasonal: school term started", "Εποχικό: άνοιξαν τα σχολεία")],
          ].map(([win, q, d, why]) => (
            <li key={q as string} className="flex min-w-0 items-start gap-2 rounded-lg border border-hairline p-3">
              {win ? <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> : <ArrowDownRight className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />}
              <span className="min-w-0">
                <span className="font-medium">{q as string}</span> <span className="tabular-nums text-muted-foreground">{d as string}</span>
                <span className="block text-[12.5px] text-muted-foreground">{why as string}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={tx(l, "Completed work", "Ολοκληρωμένες εργασίες")} note={tx(l, "What we shipped in October and what it earned so far", "Τι υλοποιήσαμε τον Οκτώβριο και τι έφερε μέχρι τώρα")}>
        <ul className="grid gap-2 text-[14px]">
          {[
            tx(l, "Published the emergency dentist page (8 Oct): +298 clicks, position 4", "Δημοσίευση σελίδας για επείγοντα (8 Οκτ): +298 κλικ, θέση 4"),
            tx(l, "Rewrote titles and descriptions on 6 service pages: CTR 2.1% → 3.0%", "Νέοι τίτλοι και περιγραφές σε 6 σελίδες υπηρεσιών: CTR 2,1% → 3,0%"),
            tx(l, "Fixed 14 broken internal links found in the site audit", "Διόρθωση 14 σπασμένων εσωτερικών συνδέσμων από τον έλεγχο ιστότοπου"),
            tx(l, "Compressed homepage images: mobile LCP 3.6 s → 2.2 s", "Συμπίεση εικόνων αρχικής: LCP κινητού 3,6 s → 2,2 s"),
          ].map((item) => (
            <li key={item} className="flex min-w-0 items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={tx(l, "Opportunities", "Ευκαιρίες")} note={tx(l, "Found in Search Console, with an estimate of extra monthly clicks", "Από το Search Console, με εκτίμηση επιπλέον μηνιαίων κλικ")}>
        <Table
          head={[tx(l, "Opportunity", "Ευκαιρία"), tx(l, "Queries", "Αναζητήσεις"), tx(l, "Est. clicks/mo", "Εκτ. κλικ/μήνα")]}
          rows={[
            [tx(l, "Implant pages in positions 5 to 12", "Σελίδες εμφυτευμάτων στις θέσεις 5 έως 12"), "9", "+180 to +310"],
            [tx(l, "Low CTR on “invisalign cost” (CTR 1.4% at position 8.9)", "Χαμηλό CTR στο «invisalign cost» (1,4% στη θέση 8,9)"), "4", "+60 to +95"],
            [tx(l, "Kids dentist page losing clicks for 3 months", "Η σελίδα παιδοδοντιάτρου χάνει κλικ εδώ και 3 μήνες"), "6", "+40 to +70"],
          ]}
        />
        <p className="mt-3 text-[12.5px] text-muted-foreground">
          {tx(l, "Estimates use the click-through rate each position usually earns. They are ranges, not promises.", "Οι εκτιμήσεις βασίζονται στο CTR που συνήθως φέρνει κάθε θέση. Είναι εύρος, όχι υπόσχεση.")}
        </p>
      </Section>

      <Section title={tx(l, "Next steps", "Επόμενα βήματα")} note={tx(l, "Highest priority first", "Με σειρά προτεραιότητας")}>
        <ol className="grid gap-2 text-[14px]">
          {[
            tx(l, "Expand the dental implants page with costs, recovery time and FAQs", "Επέκταση της σελίδας εμφυτευμάτων με κόστος, χρόνο ανάρρωσης και FAQ"),
            tx(l, "New title and description for the Invisalign page, testing a price range in the title", "Νέος τίτλος και περιγραφή στη σελίδα Invisalign, με εύρος τιμής στον τίτλο"),
            tx(l, "Refresh the kids dentist page before the January peak", "Ανανέωση της σελίδας παιδοδοντιάτρου πριν την αιχμή του Ιανουαρίου"),
          ].map((item, i) => (
            <li key={item} className="flex min-w-0 items-start gap-2">
              {i === 0 ? <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> : <CircleDot className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />}
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-hairline bg-surface/50 px-5 py-4 text-[12px] text-muted-foreground sm:px-8">
        <span>{tx(l, "Prepared by Your Agency for Northside Dental", "Ετοιμάστηκε από το agency σας για τη Northside Dental")}</span>
        <span>{tx(l, "Data: Google Search Console and Google Analytics", "Δεδομένα: Google Search Console και Google Analytics")}</span>
      </footer>
    </article>
  );
}
