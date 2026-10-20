"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Download, MousePointer2, Search } from "lucide-react";
import results from "@/data/client-search-results.json";
import type { SiteLocale } from "@/lib/i18n/locale";

type ResultSite = typeof results.sites[number];
function SearchResultCard({ site, locale }: { site: ResultSite; locale: SiteLocale }) {
  const [metric, setMetric] = useState<"clicks" | "impressions">("clicks");
  const gradient = useId().replace(/:/g, "");
  const isEl = locale === "el", tag = isEl ? "el-GR" : "en-US";
  const number = (n: number) => n.toLocaleString(tag);
  const date = (s: string) => new Date(s + "T12:00:00Z").toLocaleDateString(tag, { day: "numeric", month: "short", timeZone: "UTC" });
  const comparison = site.comparison?.coverageDays === 28 ? site.comparison : null;
  const change = comparison && comparison[metric] > 0 ? (site[metric] - comparison[metric]) / comparison[metric] : null;
  const color = metric === "clicks" ? "var(--chart-1)" : "var(--chart-2)";
  return <article className="overflow-hidden rounded-2xl border border-hairline bg-surface/70">
    <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-5"><div><p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Google Search Console</p><Link href={`/${locale}/work/${site.slug}`} className="mt-1.5 inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-link">{site.name}<ArrowUpRight className="size-4" aria-hidden /></Link></div><span className="rounded-full border border-hairline px-2.5 py-1 text-[10px] text-muted-foreground">{isEl ? "Πραγματικές μετρήσεις" : "Observed data"}</span></div>
    <div className="mx-5 grid grid-cols-2 gap-2">
      {(["clicks", "impressions"] as const).map(key => <button key={key} type="button" onClick={() => setMetric(key)} aria-pressed={metric === key} className={`rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-primary ${metric === key ? "border-primary/30 bg-primary/5" : "border-hairline hover:bg-background/50"}`}><span className="flex items-center gap-1.5 text-xs text-muted-foreground">{key === "clicks" ? <MousePointer2 className="size-3" aria-hidden /> : <Search className="size-3" aria-hidden />}{key === "clicks" ? (isEl ? "Κλικ" : "Clicks") : (isEl ? "Εμφανίσεις" : "Impressions")}</span><span className="mt-2 block text-2xl font-semibold tabular-nums tracking-tight text-foreground">{number(site[key])}</span></button>)}
    </div>
    <div className="mt-5 h-44 w-full pr-4" role="img" aria-label={`${site.name}: ${number(site[metric])} ${metric === "clicks" ? (isEl ? "κλικ" : "clicks") : (isEl ? "εμφανίσεις" : "impressions")}, ${date(site.from)}–${date(site.to)} 2026`}>
      <ResponsiveContainer width="100%" height="100%"><AreaChart data={site.points} margin={{ top: 10, right: 5, bottom: 0, left: 0 }}><defs><linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.25} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--hairline)" strokeDasharray="3 4" /><XAxis dataKey="date" tickFormatter={date} minTickGap={65} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} /><YAxis width={48} domain={[0, "auto"]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={n => number(Number(n))} axisLine={false} tickLine={false} /><Tooltip labelFormatter={value => date(String(value))} formatter={value => [number(Number(value)), metric === "clicks" ? (isEl ? "Κλικ" : "Clicks") : (isEl ? "Εμφανίσεις" : "Impressions")]} contentStyle={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "12px", fontSize: "12px", color: "var(--foreground)" }} /><Area type="monotone" dataKey={metric} stroke={color} strokeWidth={2} fill={`url(#${gradient})`} isAnimationActive={false} /></AreaChart></ResponsiveContainer>
    </div>
    <div className="mx-5 mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-hairline py-4 text-[11px] text-muted-foreground"><span>{date(site.from)}–{date(site.to)} 2026 · {isEl ? "28 ημέρες" : "28 days"}</span><a href={site.csv} download className="inline-flex items-center gap-1.5 rounded text-link hover:underline focus-visible:outline-2 focus-visible:outline-primary"><Download className="size-3" aria-hidden />{isEl ? "Στοιχεία σε CSV" : "Source CSV"}</a>{change !== null && <p className="w-full">{change >= 0 ? "+" : ""}{(change * 100).toLocaleString(tag, { maximumFractionDigits: 1 })}% {isEl ? "σε σχέση με τις προηγούμενες 28 ημέρες" : "compared with the previous 28 days"}</p>}</div>
    <details className="border-t border-hairline px-5 py-3 text-xs text-muted-foreground"><summary className="cursor-pointer">{isEl ? "Ημερήσιες μετρήσεις" : "Daily measurements"}</summary><div className="mt-3 max-h-52 overflow-auto"><table className="w-full text-left tabular-nums"><caption className="sr-only">{site.name} · Google Search Console</caption><thead><tr><th scope="col">{isEl ? "Ημέρα" : "Date"}</th><th scope="col">{isEl ? "Κλικ" : "Clicks"}</th><th scope="col">{isEl ? "Εμφανίσεις" : "Impressions"}</th></tr></thead><tbody>{site.points.map(row => <tr key={row.date}><th scope="row" className="py-1 font-normal">{date(row.date)}</th><td>{number(row.clicks)}</td><td>{number(row.impressions)}</td></tr>)}</tbody></table></div></details>
  </article>;
}
export function ClientSearchResults({ locale, slug, className = "" }: { locale: SiteLocale; slug?: string; className?: string }) {
  const sites = slug ? results.sites.filter(site => site.slug === slug) : results.sites;
  if (!sites.length) return null;
  return <section className={className} aria-label={locale === "el" ? "Πραγματικά στοιχεία αναζήτησης πελατών" : "Measured client search performance"}>
    {!slug && <div className="mb-7 max-w-2xl"><p className="text-xs font-medium uppercase tracking-widest text-primary">{locale === "el" ? "Από τα έργα μας" : "From our client projects"}</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{locale === "el" ? "Η πορεία των έργων στην αναζήτηση." : "A clear view of search performance."}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{locale === "el" ? "Πραγματικά ημερήσια κλικ και εμφανίσεις από το Google Search Console. Κάθε γράφημα καλύπτει 28 πλήρεις ημέρες. Τα στοιχεία επαληθεύτηκαν στις 20 Οκτωβρίου 2026." : "Actual daily clicks and impressions from Google Search Console. Each chart covers 28 complete days. Data verified on 20 October 2026."}</p></div>}
    <div className={`grid gap-5 ${slug ? "" : "lg:grid-cols-2"}`}>{sites.map(site => <SearchResultCard key={site.slug} site={site} locale={locale} />)}</div>
  </section>;
}
