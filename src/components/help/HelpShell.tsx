import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, LifeBuoy, Mail, PlayCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { appLink } from "@/components/gsc-boost/copy";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import { helpContent, helpPath, searchIndex } from "@/data/help";
import { HelpSearch } from "./HelpSearch";
import { HelpSidebar, type NavCategory } from "./HelpNav";

export const SUPPORT_EMAIL = "support@anotherseoguru.com";

/** Help center chrome copy. Industry terms stay in English (docs/greek-style-guide.md). */
export function helpCopy(locale: SiteLocale) {
  const el = locale === "el";
  return {
    home: el ? "Κέντρο βοήθειας GSC Boost" : "GSC Boost help center",
    short: el ? "Κέντρο βοήθειας" : "Help center",
    heroLead: el
      ? "Οδηγοί για κάθε μέρος του GSC Boost, από τη σύνδεση του Search Console μέχρι τη λειτουργία ενός γραφείου πάνω του."
      : "Guides for every part of GSC Boost, from connecting Search Console to running an agency on it.",
    search: {
      placeholder: el ? "Αναζήτηση στο κέντρο βοήθειας" : "Search the help center",
      empty: el ? "Κανένα άρθρο δεν ταιριάζει με «{query}»." : "No articles match “{query}”.",
      emptyHint: el ? "Δοκιμάστε λιγότερες ή διαφορετικές λέξεις." : "Try fewer or different words.",
    },
    topics: el ? "Θέματα" : "Topics",
    browse: el ? "Ανά θέμα" : "Browse by topic",
    popular: el ? "Δημοφιλή άρθρα" : "Popular articles",
    popularShort: el ? "Δημοφιλή:" : "Popular:",
    articles: (n: number) => (el ? `${n} ${n === 1 ? "άρθρο" : "άρθρα"}` : `${n} ${n === 1 ? "article" : "articles"}`),
    inThisArticle: el ? "Σε αυτό το άρθρο" : "In this article",
    previous: el ? "Προηγούμενο" : "Previous",
    next: el ? "Επόμενο" : "Next",
    openApp: el ? "Άνοιγμα του GSC Boost" : "Open GSC Boost",
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

export function navCategories(locale: SiteLocale): NavCategory[] {
  return helpContent(locale).map((c) => ({
    slug: c.slug,
    title: c.title,
    href: helpPath(locale, c.slug),
    articles: c.articles.map((a) => ({ title: a.title, href: helpPath(locale, c.slug, a.slug) })),
  }));
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

export function DemoCard({ locale, source }: { readonly locale: SiteLocale; readonly source: string }) {
  const t = helpCopy(locale);
  return (
    <a href={appLink("/demo", locale, source)} className="group block rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-primary/40">
      <PlayCircle className="size-6 text-primary-glow" aria-hidden />
      <span className="mt-4 flex items-center gap-1.5 font-display text-[16px] font-semibold text-foreground">
        {t.demoTitle}
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
      <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{t.demoText}</span>
    </a>
  );
}

/** Help bar + left topic nav + page, GitHub Docs style. The page brings its own right rail. */
export function HelpShell({ locale, current, children }: { readonly locale: SiteLocale; readonly current?: string; readonly children: ReactNode }) {
  const t = helpCopy(locale);
  const categories = navCategories(locale);
  const home = { href: helpPath(locale), label: t.short };
  return (
    <>
      <Header locale={locale} />
      <main className="main-below-header relative z-0">
        <div className="border-b border-hairline">
          <div className="mx-auto flex max-w-[88rem] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <Link href={home.href} className="font-display text-[17px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary-glow">
              {t.home}
            </Link>
            <div className="order-last w-full md:order-none md:ml-auto md:w-[26rem]">
              <HelpSearch index={searchIndex(locale)} labels={t.search} shortcut />
            </div>
            <a
              href={appLink("/app", locale, "help-bar")}
              className="ml-auto inline-flex items-center gap-1 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground md:ml-0"
            >
              {t.openApp}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
        <div className="mx-auto grid max-w-[88rem] lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="sticky top-[var(--site-header-height)] hidden h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-r border-hairline px-4 py-8 scrollbar-none lg:block">
            <HelpSidebar categories={categories} current={current} home={home} />
          </aside>
          <div className="min-w-0">
            <details className="group mx-4 mt-6 rounded-2xl border border-hairline bg-surface sm:mx-6 lg:hidden">
              <summary className="cursor-pointer list-none px-4 py-3 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">{t.topics}</summary>
              <div className="px-2 pb-4">
                <HelpSidebar categories={categories} current={current} home={home} />
              </div>
            </details>
            {children}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
