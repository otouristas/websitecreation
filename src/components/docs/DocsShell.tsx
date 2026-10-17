import type { ReactNode } from "react";
import Link from "next/link";
import { appLink } from "@/components/gsc-boost/copy";
import { helpPath, IPHONE_CATEGORY } from "@/data/help";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { docsTabs, sidebarFor, type DocsTab } from "@/lib/docs/nav";
import { glossaryPath } from "@/lib/docs/glossary";
import { SUPPORT_EMAIL } from "@/components/help/HelpShell";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { AskAi, type AskCopy } from "./AskAi";
import { DocsMobileMenu } from "./DocsMobileMenu";
import { DocsSearch, type SearchCopy } from "./DocsSearch";
import { DocsSidebar, type SidebarChrome } from "./DocsSidebar";
import { DocsTopbar, type TopbarCopy } from "./DocsTopbar";
import { DocsUIProvider } from "./DocsUI";

/** Chrome copy for the docs. Industry terms stay in English (docs/greek-style-guide.md). */
export function docsCopy(locale: SiteLocale) {
  const el = locale === "el";
  return {
    search: el ? "Αναζήτηση…" : "Search…",
    ask: el ? "Ρωτήστε το AI" : "Ask AI",
    signup: el ? "Δωρεάν εγγραφή" : "Sign up free",
    signupShort: el ? "Εγγραφή" : "Sign up",
    app: el ? "Άνοιγμα εφαρμογής" : "Open the app",
    menu: el ? "Μενού" : "Menu",
    close: el ? "Κλείσιμο" : "Close",
    llms: "llms-full.txt",
    language: el ? "Γλώσσα" : "Language",
    onThisPage: el ? "Σε αυτή τη σελίδα" : "On this page",
  };
}

function searchCopy(locale: SiteLocale): SearchCopy {
  const el = locale === "el";
  return {
    placeholder: el ? "Αναζήτηση σε οδηγούς, iPhone και γλωσσάρι" : "Search guides, iPhone and the glossary",
    empty: el ? "Τίποτα για «{query}»." : "Nothing for “{query}”.",
    emptyHint: el ? "Δοκιμάστε άλλες λέξεις ή ρωτήστε το AI παρακάτω." : "Try other words, or ask AI below.",
    askAi: el ? "Ρωτήστε το AI: «{query}»" : "Ask AI: “{query}”",
    quick: el ? "Γρήγοροι σύνδεσμοι" : "Quick links",
    close: el ? "Κλείσιμο" : "Close",
    quickLinks: [
      { title: el ? "Σύνδεση του Search Console" : "Connect Google Search Console", href: helpPath(locale, "getting-started", "connect-search-console"), section: el ? "Ξεκινήστε" : "Get started" },
      { title: el ? "Η εβδομάδα σας" : "This week", href: helpPath(locale, "search-performance", "this-week"), section: el ? "Οδηγοί" : "Guides" },
      { title: el ? "Ευκαιρίες" : "Opportunities", href: helpPath(locale, "opportunities-tasks", "opportunities"), section: el ? "Οδηγοί" : "Guides" },
      { title: el ? "Εφαρμογή iPhone" : "iPhone app", href: helpPath(locale, IPHONE_CATEGORY), section: "iPhone" },
      { title: el ? "SEO γλωσσάρι Α–Ω" : "SEO glossary A–Z", href: glossaryPath(locale), section: el ? "Γλωσσάρι" : "Glossary" },
    ],
  };
}

function askCopy(locale: SiteLocale): AskCopy {
  const el = locale === "el";
  return {
    title: el ? "Ρωτήστε το AI" : "Ask AI",
    button: el ? "Ρωτήστε το AI" : "Ask AI",
    placeholder: el ? "Ρωτήστε για το GSC Boost ή έναν όρο SEO" : "Ask about GSC Boost or any SEO term",
    intro: el
      ? "Απαντήσεις από τους οδηγούς του GSC Boost και το SEO γλωσσάρι, με τις σελίδες που χρησιμοποιήθηκαν."
      : "Answers from the GSC Boost guides and the SEO glossary, with the pages they came from.",
    suggestions: el
      ? ["Πώς συνδέω το Search Console;", "Πώς βάζω την εφαρμογή στο iPhone μου;", "Τι είναι το striking distance;", "Πώς δουλεύει το client portal;"]
      : ["How do I connect Search Console?", "How do I install the iPhone app?", "What is striking distance?", "How does the client portal work?"],
    sources: el ? "Πηγές" : "Sources",
    thinking: el ? "Ψάχνω στους οδηγούς…" : "Reading the docs…",
    fallbackIntro: el ? "Αυτές οι σελίδες ταιριάζουν περισσότερο με την ερώτησή σας:" : "These pages match your question best:",
    handoff: el ? "Ή ρωτήστε με τα docs μας ως πλαίσιο:" : "Or ask with our docs as context:",
    limited: el ? "Πολλές ερωτήσεις σε λίγο χρόνο. Δοκιμάστε ξανά σε λίγο ή γράψτε μας." : "Too many questions in a short time. Try again shortly, or write to us.",
    close: el ? "Κλείσιμο" : "Close",
    disclaimer: el ? `Το AI μπορεί να κάνει λάθη. Για τον λογαριασμό σας γράψτε στο ${SUPPORT_EMAIL}.` : `AI can make mistakes. For your account, write to ${SUPPORT_EMAIL}.`,
  };
}

/**
 * The docs frame, modelled on Mintlify: a full-height sidebar with search and
 * grouped pages, tabs along the top, the page, and Ask AI. It replaces the site
 * header on /help, /glossary and /resources; the sign-up action moves into the
 * tab bar and the sidebar.
 */
export function DocsShell({
  locale,
  tab,
  alternateHref,
  children,
}: {
  readonly locale: SiteLocale;
  readonly tab: DocsTab;
  /** The same page in the other language, when it exists. */
  readonly alternateHref?: string | null;
  readonly children: ReactNode;
}) {
  const t = docsCopy(locale);
  const groups = sidebarFor(tab, locale);
  const chrome: SidebarChrome = {
    homeHref: localizedPath(locale, "/"),
    docsHref: helpPath(locale),
    searchLabel: t.search,
    askLabel: t.ask,
    signupHref: appLink("/signup", locale, `docs-sidebar-${tab}`),
    signupLabel: t.signup,
    appHref: appLink("/app", locale, `docs-sidebar-${tab}`),
    appLabel: t.app,
    llmsLabel: t.llms,
    alternate: alternateHref ? { href: alternateHref, label: locale === "el" ? "English" : "Ελληνικά" } : null,
    languageLabel: t.language,
  };
  const topbar: TopbarCopy = {
    homeHref: localizedPath(locale, "/"),
    signupHref: appLink("/signup", locale, `docs-topbar-${tab}`),
    signupLabel: t.signup,
    signupShort: t.signupShort,
    appHref: appLink("/app", locale, `docs-topbar-${tab}`),
    appLabel: t.app,
    menuLabel: t.menu,
    searchLabel: t.search,
    askLabel: t.ask,
  };

  return (
    <DocsUIProvider locale={locale}>
      <div className="docs-root relative min-h-dvh bg-background">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[18.5rem] border-r border-hairline bg-background lg:block">
          <DocsSidebar groups={groups} chrome={chrome} locale={locale} />
        </aside>
        <div className="lg:pl-[18.5rem]">
          <DocsTopbar tabs={docsTabs(locale)} active={tab} copy={topbar} />
          <main id="content" className="relative z-0">
            {children}
          </main>
          <DocsFooter locale={locale} />
        </div>
        <DocsMobileMenu groups={groups} chrome={chrome} locale={locale} closeLabel={t.close} />
        <DocsSearch copy={searchCopy(locale)} />
        <AskAi copy={askCopy(locale)} />
      </div>
    </DocsUIProvider>
  );
}

function DocsFooter({ locale }: { readonly locale: SiteLocale }) {
  const el = locale === "el";
  const lp = (p: string) => localizedPath(locale, p);
  const links = [
    { label: el ? "Αρχική" : "Home", href: lp("/") },
    { label: "GSC Boost", href: lp("/platform") },
    { label: el ? "Εφαρμογή iPhone" : "iPhone app", href: lp("/platform/iphone") },
    { label: el ? "Τιμές" : "Pricing", href: lp("/platform/pricing") },
    { label: "Blog", href: lp("/blog") },
    { label: el ? "Απόρρητο" : "Privacy", href: lp("/privacy") },
    { label: el ? "Όροι" : "Terms", href: lp("/terms") },
  ];
  return (
    <footer className="border-t border-hairline px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[72rem] flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-muted-foreground">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-foreground">
            {l.label}
          </Link>
        ))}
        <CookiePreferencesLink
          label={el ? "Προτιμήσεις cookies" : "Cookie preferences"}
          className="cursor-pointer border-0 bg-transparent p-0 hover:text-foreground lg:hidden"
        />
        <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground sm:ml-auto">
          {SUPPORT_EMAIL}
        </a>
      </div>
      <p className="mx-auto mt-4 max-w-[72rem] text-[12.5px] text-muted-foreground/80">© {new Date().getFullYear()} AnotherSEOGuru</p>
    </footer>
  );
}
