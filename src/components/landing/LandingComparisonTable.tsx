import Link from "next/link";
import { Check, X } from "lucide-react";

const competitors = [
  { name: "Ahrefs", price: "$99/mo" },
  { name: "SEMrush", price: "$119/mo" },
  { name: "SurferSEO", price: "$89/mo" },
] as const;

const rows: { label: string; us: boolean; them: "all" | "none" | "mixed" }[] = [
  { label: "Keyword research", us: true, them: "all" },
  { label: "Rank tracking", us: true, them: "mixed" },
  { label: "Backlink monitoring", us: true, them: "mixed" },
  { label: "Technical SEO audit", us: true, them: "all" },
  { label: "AI content workflows", us: true, them: "none" },
  { label: "GSC-native prioritization", us: true, them: "none" },
  { label: "Free tools hub", us: true, them: "none" },
];

function competitorCell(ok: boolean) {
  return ok ? (
    <Check className="w-5 h-5 text-[hsl(var(--success))] mx-auto" aria-label="Included" />
  ) : (
    <X className="w-5 h-5 text-muted-foreground mx-auto" aria-label="Not included" />
  );
}

export function LandingComparisonTable() {
  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How we compare to <span className="gradient-text">classic SEO stacks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Honest positioning: we are built around your Search Console reality, AI execution, and optional agency
            delivery — not a generic enterprise suite.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            For deeper comparisons see{" "}
            <Link href="/compare/ahrefs" className="text-primary underline">
              vs Ahrefs
            </Link>
            ,{" "}
            <Link href="/compare/semrush" className="text-primary underline">
              vs Semrush
            </Link>
            ,{" "}
            <Link href="/compare/search-console-alone" className="text-primary underline">
              vs GSC alone
            </Link>
            .
          </p>
        </div>
        <div className="overflow-x-auto overscroll-x-contain pb-2 -mx-1 px-1 max-w-6xl mx-auto">
          <p className="text-xs text-muted-foreground mb-2 sm:hidden">Swipe horizontally to view the table.</p>
          <div className="min-w-[720px]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Capability</th>
                  <th className="text-center p-4 font-semibold text-foreground">
                    <div className="text-primary">AnotherSEOGuru</div>
                    <div className="text-muted-foreground font-normal">Software + optional agency</div>
                  </th>
                  {competitors.map((c) => (
                    <th key={c.name} className="text-center p-4 font-semibold text-foreground">
                      <div>{c.name}</div>
                      <div className="text-muted-foreground font-normal">{c.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4 font-medium text-foreground">{row.label}</td>
                    <td className="p-4 text-center">{competitorCell(row.us)}</td>
                    {competitors.map((c, i) => {
                      const ok =
                        row.them === "all" ? true : row.them === "none" ? false : i !== 2;
                      return (
                        <td key={c.name} className="p-4 text-center">
                          {competitorCell(ok)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
