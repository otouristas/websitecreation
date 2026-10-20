"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { SiteLocale } from "@/lib/i18n/locale";

const marks = [
  ["google_search_console", "Google Search Console"], ["google_analytics", "Google Analytics 4"],
  ["wordpress", "WordPress"], ["google", "Google Search"],
] as const;

/** Product integrations, explicitly labeled. These marks do not imply customer endorsements. */
export function WorkflowLogos({ locale }: { locale: SiteLocale }) {
  const [paused, setPaused] = useState(false);
  const el = locale === "el";
  return <section className="workflow-logos mx-auto max-w-6xl px-6 py-10" aria-label={el ? "Πλατφόρμες δεδομένων και δημοσίευσης" : "Data and publishing platforms"}>
    <div className="mb-6 flex items-center justify-center gap-3"><p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">{el ? "Τα εργαλεία της ροής εργασίας σας" : "The tools in your workflow"}</p><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} aria-label={paused ? (el ? "Συνέχιση λογοτύπων" : "Play logo animation") : (el ? "Παύση λογοτύπων" : "Pause logo animation")} className="rounded-full border border-hairline p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">{paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}</button></div>
    <div className="overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="workflow-logo-track flex w-max" data-paused={paused}>
        {[0, 1].map(group => <div key={group} aria-hidden={group === 1 || undefined} className={`flex shrink-0 ${group === 1 ? "workflow-logo-copy" : ""}`}>
          {[0, 1].flatMap(copy => marks.map(([name, label]) => <div key={`${copy}-${name}`} aria-hidden={copy === 1 || undefined} className={`flex h-16 w-[180px] shrink-0 items-center justify-center gap-3 px-5 ${copy === 1 ? "workflow-logo-copy" : ""}`}><Image src={`/integrations/service-${name}.svg`} alt="" width={28} height={28} className="size-7 object-contain" /><span className="text-sm font-medium text-muted-foreground">{label}</span></div>))}
        </div>)}
      </div>
    </div>
    <p className="mt-4 text-center text-[11px] text-muted-foreground">{el ? "Ενσωματώσεις και πηγές δεδομένων. Τα λογότυπα δεν αποτελούν αξιολογήσεις πελατών." : "Integrations and data sources. Logos are not customer endorsements."}</p>
  </section>;
}
