import { LifeBuoy, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";

export const SUPPORT_EMAIL = "support@anotherseoguru.com";

/** Help center chrome copy. Industry terms stay in English (docs/greek-style-guide.md). */
export function helpCopy(locale: SiteLocale) {
  const el = locale === "el";
  return {
    home: el ? "Κέντρο βοήθειας AnotherSEOGuru App" : "AnotherSEOGuru App help center",
    short: el ? "Κέντρο βοήθειας" : "Help center",
    heroLead: el
      ? "Οδηγοί για κάθε μέρος του AnotherSEOGuru App, από τη σύνδεση του Search Console μέχρι τη λειτουργία ενός γραφείου πάνω του."
      : "Guides for every part of AnotherSEOGuru App, from connecting Search Console to running an agency on it.",
    search: {
      placeholder: el ? "Πώς μπορούμε να βοηθήσουμε;" : "How can we help?",
      empty: el ? "Κανένα άρθρο δεν ταιριάζει με «{query}»." : "No articles match “{query}”.",
      emptyHint: el ? "Δοκιμάστε λιγότερες ή διαφορετικές λέξεις." : "Try fewer or different words.",
      whatsapp: el ? "Μιλήστε μας στο WhatsApp" : "Chat on WhatsApp",
      contact: el ? "Σελίδα επικοινωνίας" : "Contact page",
      clear: el ? "Καθαρισμός αναζήτησης" : "Clear search",
    },
    topics: el ? "Θέματα" : "Topics",
    browse: el ? "Ανά θέμα" : "Browse by topic",
    popular: el ? "Δημοφιλή άρθρα" : "Popular articles",
    popularShort: el ? "Δημοφιλή:" : "Popular:",
    articles: (n: number) => (el ? `${n} ${n === 1 ? "άρθρο" : "άρθρα"}` : `${n} ${n === 1 ? "article" : "articles"}`),
    inThisArticle: el ? "Σε αυτό το άρθρο" : "In this article",
    previous: el ? "Προηγούμενο" : "Previous",
    next: el ? "Επόμενο" : "Next",
    openApp: el ? "Άνοιγμα του AnotherSEOGuru App" : "Open AnotherSEOGuru App",
    demoTitle: el ? "Δοκιμάστε τη ζωντανή επίδειξη" : "Try the live demo",
    demoText: el ? "Κάθε οθόνη με δείγμα δεδομένων για τρεις ιστότοπους. Χωρίς εγγραφή." : "Every screen with sample data for three sites. No sign-up.",
    stillNeedHelp: el ? "Χρειάζεστε ακόμη βοήθεια;" : "Still need help?",
    stillNeedHelpText: el
      ? "Γράψτε μας σε ποια σελίδα ήσασταν και τι περιμένατε. Κάθε μήνυμα το διαβάζει άνθρωπος."
      : "Write to us with the page you were on and what you expected. A person reads every message.",
    contact: el ? "Επικοινωνία με την υποστήριξη" : "Contact support",
    helpful: el ? "Σας βοήθησε αυτό το άρθρο;" : "Was this article helpful?",
    yes: el ? "Ναι" : "Yes",
    no: el ? "Όχι" : "No",
    thanksYes: el ? "Ευχαριστούμε! Χαιρόμαστε που βοήθησε." : "Thanks! Glad it helped.",
    thanksNo: el ? "Ευχαριστούμε. Γράψτε μας τι έλειπε και θα το προσθέσουμε." : "Thanks. Tell us what was missing and we'll add it.",
    homeCrumb: el ? "Αρχική" : "Home",
  };
}

export function ContactCard({ locale, className }: { readonly locale: SiteLocale; readonly className?: string }) {
  const t = helpCopy(locale);
  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center", className)}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary-glow">
        <LifeBuoy className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[16px] font-semibold text-foreground">{t.stillNeedHelp}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{t.stillNeedHelpText}</p>
      </div>
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-deep"
      >
        <Mail className="size-4" aria-hidden />
        {t.contact}
      </a>
    </div>
  );
}
