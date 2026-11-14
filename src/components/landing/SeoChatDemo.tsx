"use client";

import { useState } from "react";
import { AsterMark } from "./AsterIdentity";
import { ArrowUp, ArrowUpRight, Check, ChevronDown, FileText, Plus, Search, Sparkles } from "lucide-react";
import { getAppPath } from "@/lib/app-links";
import { northwindTitleExample } from "@/data/northwind-title-example";
import type { SiteLocale } from "@/lib/i18n/locale";

const examples = {
  en: [
    northwindTitleExample.en,
    {
      label: "Falling clicks",
      question: "Why are fewer people opening our waterproofing guide?",
      answer: "Check whether fewer people are seeing the guide or fewer are clicking when they see it. Compare the same search terms over two equal periods. If impressions hold steady, look at the title and the other results that appear beside it.",
      steps: ["Clicks and impressions for the guide", "Search terms with the largest drop", "Results for those same searches"],
      action: "Investigate the waterproofing guide",
      before: "Clicks to one guide fell",
      after: "A list of the searches to check first",
    },
    {
      label: "Editing content",
      question: "What’s missing from our guide to washing a rain jacket?",
      answer: "A reader with a jacket in their hands needs to know where to start. Add a short section on checking the care label before choosing a wash cycle. Verify any temperature or detergent advice against the manufacturer’s instructions.",
      steps: ["The questions the guide already answers", "Advice that needs a manufacturer’s source", "A draft section for the editor"],
      action: "Add a care-label section",
      before: "Wash your jacket on a suitable cycle.",
      after: "Check the care label inside your jacket for the recommended wash cycle.",
    },
    {
      label: "Technical SEO",
      question: "Why is Google showing a different jacket page?",
      answer: "Open the page’s canonical tag. It tells Google which URL you consider the main version. If the rain jackets page points to the general clothing category, check whether that was intentional before changing it.",
      steps: ["The submitted page address and HTTP response", "The URL in its canonical tag", "Whether the preferred page appears in the sitemap"],
      action: "Review the preferred URL",
      before: "Jackets page points to /clothing",
      after: "Check whether /rain-jackets should be the preferred page",
    },
  ],
  el: [
    northwindTitleExample.el,
    {
      label: "Λιγότερα κλικ",
      question: "Γιατί ανοίγουν λιγότεροι τον οδηγό μας για την αδιαβροχοποίηση;",
      answer: "Εξετάστε αν ο οδηγός εμφανίζεται λιγότερο συχνά ή αν τον βλέπουν αλλά δεν τον επιλέγουν. Συγκρίνετε τις ίδιες αναζητήσεις σε δύο περιόδους ίσης διάρκειας. Αν οι εμφανίσεις παραμένουν σταθερές, δείτε τον τίτλο και τα άλλα αποτελέσματα που εμφανίζονται δίπλα του.",
      steps: ["Κλικ και εμφανίσεις του οδηγού", "Αναζητήσεις με τη μεγαλύτερη πτώση", "Ποιες άλλες σελίδες εμφανίζονται για τις ίδιες αναζητήσεις"],
      action: "Έλεγχος του οδηγού για την αδιαβροχοποίηση",
      before: "Μειώθηκαν τα κλικ σε έναν οδηγό",
      after: "Οι αναζητήσεις που αξίζει να εξετάσετε πρώτα",
    },
    {
      label: "Βελτίωση άρθρου",
      question: "Τι λείπει από το άρθρο μας για το πλύσιμο ενός αδιάβροχου;",
      answer: "Ο αναγνώστης έχει το μπουφάν στα χέρια του και θέλει να ξέρει από πού να αρχίσει. Προσθέστε μια μικρή ενότητα για την ετικέτα φροντίδας. Πριν προτείνετε θερμοκρασία ή απορρυπαντικό, ελέγξτε τι συνιστά ο κατασκευαστής.",
      steps: ["Ποιες ερωτήσεις καλύπτει ήδη το άρθρο", "Ποιες οδηγίες χρειάζονται πηγή από τον κατασκευαστή", "Προσχέδιο της νέας ενότητας"],
      action: "Προσθήκη οδηγίας για την ετικέτα φροντίδας",
      before: "Πλύνετε το μπουφάν στο κατάλληλο πρόγραμμα.",
      after: "Δείτε στην εσωτερική ετικέτα του μπουφάν ποιο πρόγραμμα πλύσης συνιστά ο κατασκευαστής.",
    },
    {
      label: "Τεχνικός έλεγχος",
      question: "Γιατί η Google εμφανίζει άλλη σελίδα για τα αδιάβροχα;",
      answer: "Ελέγξτε το canonical της σελίδας. Αυτό δείχνει στη Google ποια διεύθυνση θεωρείτε κύρια. Αν η σελίδα με τα αδιάβροχα παραπέμπει στη γενική κατηγορία ρούχων, δείτε πρώτα αν το είχατε ορίσει έτσι σκόπιμα.",
      steps: ["Η διεύθυνση της σελίδας και η απόκριση HTTP", "Πού παραπέμπει το canonical", "Αν η κύρια διεύθυνση περιλαμβάνεται στο sitemap"],
      action: "Έλεγχος της κύριας διεύθυνσης",
      before: "Η σελίδα για τα αδιάβροχα παραπέμπει στο /clothing",
      after: "Ελέγξτε αν η κύρια σελίδα πρέπει να είναι η /rain-jackets",
    },
  ],
};

export function SeoChatDemo({ locale }: { locale: SiteLocale }) {
  const [selected, setSelected] = useState(0);
  const item = examples[locale][selected];
  const tx = (en: string, el: string) => locale === "el" ? el : en;
  return <section id="aster" aria-label={tx("Interactive Aster AI demonstration", "Δοκιμάστε μια συνομιλία με τον Aster AI")} className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-hairline bg-surface text-left shadow-2xl">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4"><span className="inline-flex items-center gap-2 font-semibold"><AsterMark className="size-8 text-primary" />AnotherSEOGuru App <span className="font-normal text-muted-foreground">/ Aster AI</span></span><span className="rounded-full border border-hairline px-3 py-1 text-[11px] text-muted-foreground">{tx("Demonstration · fictional site", "Παράδειγμα με φανταστικό ιστότοπο")}</span></div>
    <div className="grid md:grid-cols-[190px_minmax(0,1fr)]">
      <nav aria-label={tx("Example workflows", "Παραδείγματα ερωτήσεων")} className="flex flex-wrap gap-1 border-b border-hairline bg-background/30 p-3 md:flex-col md:flex-nowrap md:border-b-0 md:border-r">{examples[locale].map((example, index) => <button key={example.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`max-w-full rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-primary ${selected === index ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-surface"}`}>{example.label}</button>)}<span className="mt-auto hidden px-3 pb-2 pt-16 text-xs text-muted-foreground md:block">northwind-outdoors.example</span></nav>
      <div className="min-w-0 p-5 sm:p-8" aria-live="polite">
        <p className="ml-auto max-w-xl rounded-2xl rounded-br-md bg-primary/10 px-4 py-3 text-sm font-medium">{item.question}</p>
        <details className="mt-7 text-xs text-muted-foreground"><summary className="flex cursor-pointer list-none items-center gap-2"><Search className="size-3.5" aria-hidden />{tx("Evidence behind this example", "Τι εξετάζει ο Aster AI")}<ChevronDown className="size-3" aria-hidden /></summary><ul className="mt-3 grid gap-2">{item.steps.map(step => <li key={step} className="flex items-center gap-2"><Check className="size-3.5 text-primary" aria-hidden />{step}</li>)}</ul><p className="mt-3">{tx("These examples use a fictional outdoor shop.", "Τα παραδείγματα αφορούν υποθετικό κατάστημα ειδών πεζοπορίας.")}</p></details>
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold"><AsterMark className="size-7 text-primary" />Aster AI</div>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-foreground">{item.answer}</p>
        <div className="mt-6 overflow-hidden rounded-[23px] border border-hairline bg-surface"><div className="flex items-center gap-3 border-b border-hairline bg-gradient-to-r from-primary/10 to-transparent p-5 text-sm font-semibold"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary"><FileText className="size-5" aria-hidden /></span>{item.action}</div><dl className="grid gap-4 p-5 text-sm sm:grid-cols-2"><div className="rounded-xl bg-background/50 p-3"><dt className="text-xs text-muted-foreground">{tx("Starting point", "Αφετηρία")}</dt><dd className="mt-2 leading-6">{item.before}</dd></div><div className="rounded-xl bg-primary/5 p-3"><dt className="text-xs text-primary">{tx("Proposed result", "Πρόταση")}</dt><dd className="mt-2 font-medium leading-6">{item.after}</dd></div></dl></div>
        <div className="mt-7 rounded-[28px] border border-primary/20 bg-surface p-4 shadow-[0_0_0_4px_rgb(7_92_229/0.025),0_12px_35px_-20px_rgb(7_92_229/0.25)]">
          <span className="inline-flex rounded-lg bg-background/80 px-2 py-1 text-[10px] text-muted-foreground">northwind-outdoors.example</span>
          <p className="min-h-16 px-1 py-4 text-sm text-muted-foreground">{tx("What would you like to improve?", "Τι θέλετε να βελτιώσετε;")}</p>
          <div className="flex items-center gap-2"><Plus className="size-8 rounded-full bg-background p-2 text-muted-foreground" aria-hidden /><span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1.5 text-[11px] font-medium text-primary"><Sparkles className="size-3.5" aria-hidden />Aster AI</span><span className="flex-1" /><a href={`${getAppPath("/demo/chat")}?lang=${locale}`} aria-label={tx("Open the interactive Aster AI demo", "Άνοιγμα της δοκιμαστικής συνομιλίας με τον Aster AI")} className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowUp className="size-4" /></a></div>
        </div>
        <a href={`${getAppPath("/demo/chat")}?lang=${locale}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-link">{tx("Open the Aster AI demo", "Δοκιμάστε τον Aster AI με ενδεικτικά δεδομένα")}<ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
    </div>
  </section>;
}
