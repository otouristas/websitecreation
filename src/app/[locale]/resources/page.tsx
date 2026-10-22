import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Block } from "@/data/help";
import { COMPARE_PAGES_EL } from "@/data/compare-pages-el";
import { OPPORTUNITY_FINDER, articlesFor, clusterArticles, clusterById, findResource, resourcePath } from "@/data/resources";
import { EL_FINDER } from "@/data/resources/el/opportunity";
import { PLATFORM_TOOLS, getPlatformTool } from "@/data/platform-tools";
import { getAllBlogPosts } from "@/lib/blog";
import { glossaryPath } from "@/lib/docs/glossary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string }> };

const HUB_EL = {
  title: "Δωρεάν οδηγοί SEO",
  description:
    "Δωρεάν οδηγοί SEO με δεδομένα Search Console: ανάλυση, πτώση επισκεψιμότητας, πρόβλεψη, αναφορές, εύρεση ευκαιριών, πλαίσια αναζήτησης AI και λεξικό.",
  primaryKeyword: "δωρεάν οδηγοί seo",
  eyebrow: "Υλικό",
  heading: "Οδηγοί SEO",
  lead: "Οδηγοί για το Search Console, δωρεάν εύρεση ευκαιριών, πλαίσια για αναζήτηση AI και το λεξικό. Είναι το υλικό που χρησιμοποιεί η ομάδα μας στη δουλειά με πελάτες.",
  intro:
    "Πρακτικοί οδηγοί για να γίνουν τα δεδομένα του Google Search Console δουλειά που φέρνει ανάπτυξη: πώς τα διαβάζετε, πώς διαγιγνώσκετε μια πτώση, πώς μετράτε και βάζετε προτεραιότητα στις διορθώσεις, και πώς τα αναφέρετε. Κάθε θέμα ξεκινά με έναν οδηγό που το καλύπτει από την αρχή ως το τέλος και μετά πηγαίνει πιο βαθιά.",
  freeTool: "Δωρεάν εργαλείο",
  finderText: "Ανεβάστε την εξαγωγή του Search Console και δείτε αναζητήσεις για άνοδο, snippets για επανεγγραφή και πρόβλεψη κλικ. Τρέχει στον browser, χωρίς εγγραφή.",
  aiTitle: "Έλεγχος ορατότητας σε AI",
  aiText: "Δείτε τι απαντούν το AI Overview της Google και το ChatGPT για μία λέξη-κλειδί, και ποιους αναφέρουν.",
  startHere: "Ξεκινήστε εδώ.",
  layersTitle: "Επίπεδα σύγχρονης αναζήτησης",
  layersStart: "SEO, AEO, GEO, AIO, DEO και SXO σε ένα μοντέλο.",
  relatedGuide: "Σχετικός οδηγός.",
  freeToolLabel: "Δωρεάν εργαλείο.",
  frameworks: "Πλαίσια που αξίζει να κρατήσετε",
  layersText: "SEO, AEO, GEO, AIO, DEO και SXO σε ένα μοντέλο: τι βελτιστοποιεί κάθε επίπεδο, τι ζητά από μια σελίδα και πώς μετράται.",
  anatomyTitle: "Ανατομία σελίδας για αναζήτηση AI",
  anatomyText: "Δώδεκα μέρη μιας σελίδας που αποφασίζουν αν μια μηχανή απαντήσεων μπορεί να τη διαβάσει, να την παραθέσει και να την αναφέρει, σημειωμένα πάνω σε ένα παράδειγμα.",
  learn: "Μάθετε",
  guidesTitle: "Οδηγοί SEO",
  guidesText: "Οι οδηγοί κατάταξης σε ένα ευρετήριο: ο βασικός οδηγός, λέξεις-κλειδιά, on-page, τεχνικό SEO, σύνδεσμοι και τοπική αναζήτηση.",
  glossaryTitle: "Λεξικό SEO",
  glossaryText: "Πάνω από 100 όροι, ο καθένας στη δική του σελίδα, με παράδειγμα και τρόπο εφαρμογής.",
  appGuidesTitle: "Οδηγοί AnotherSEOGuru App",
  appGuidesText: "Πώς χρησιμοποιείτε κάθε οθόνη της εφαρμογής, με στιγμιότυπα.",
  iphoneTitle: "Εφαρμογή iPhone",
  iphoneText: "Πάρτε την έκδοση beta, Live Activities, widgets και ειδοποιήσεις.",
  tools: "Δωρεάν εργαλεία",
  blog: "Από το blog",
  allArticles: "Όλα τα άρθρα",
  compare: "Συγκρίσεις",
  home: "Αρχική",
  schemaName: "Οδηγοί SEO",
  schemaDescription: "Οδηγοί Search Console, δωρεάν εργαλεία και πλαίσια από το AnotherSEOGuru.",
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const el = locale === "el";
  const path = localizedPath(locale, "/resources");
  return buildMetadata({
    title: el ? HUB_EL.title : "Free SEO Resources & Search Console Guides",
    description: el
      ? HUB_EL.description
      : "Free SEO resources built on Search Console data: guides to analysis, traffic drops, forecasting and reporting, a free opportunity finder, AI search frameworks and the SEO glossary.",
    path,
    canonicalPath: path,
    hreflangPath: "/resources",
    primaryKeyword: el ? HUB_EL.primaryKeyword : "SEO resources",
  });
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale: SiteLocale = locale;
  const el = siteLocale === "el";
  const g = HUB_EL;
  const lp = (path: string) => localizedPath(siteLocale, path);
  const rp = (slug?: string) => resourcePath(slug, siteLocale);
  const posts = getAllBlogPosts().filter((p) => p.locale === siteLocale).slice(0, 12);
  const clusters = ["search-console", "traffic-drops", "forecasting", "reporting", "ai-visibility"] as const;

  const blocks: Block[] = [
    {
      type: "p",
      text: el
        ? g.intro
        : "Practical guides for turning Google Search Console data into growth: how to read it, how to diagnose a drop, how to size and prioritize fixes, and how to report the results. Each topic starts with a guide that covers it end to end, then goes deeper.",
    },
    { type: "h2", id: "free-tool", text: el ? g.freeTool : "Free tool" },
    {
      type: "cards",
      cols: 2,
      items: [
        {
          title: el ? EL_FINDER.title : OPPORTUNITY_FINDER.title,
          text: el ? g.finderText : "Upload your Search Console export and get the queries worth pushing, the snippets worth rewriting and a click forecast. Runs in your browser, no sign-up.",
          href: rp(OPPORTUNITY_FINDER.slug),
          icon: "wrench",
        },
        {
          title: el ? g.aiTitle : "AI visibility check",
          text: el ? g.aiText : "See what Google's AI Overview and ChatGPT answer for one keyword, and who they cite.",
          href: lp("/ai-visibility-check"),
          icon: "bot",
        },
      ],
    },
    ...clusters.flatMap((id): Block[] => {
      const cluster = clusterById(id, siteLocale);
      const pillar = findResource(cluster.pillar, siteLocale);
      const articles = clusterArticles(cluster.id, siteLocale).filter((a) => a.kind !== "pillar");
      return [
        { type: "h2", id: cluster.id, text: cluster.title },
        { type: "p", text: cluster.summary },
        {
          type: "cards",
          cols: 3,
          items: [
            pillar
              ? { title: pillar.title.split(":")[0], text: `${el ? g.startHere : "Start here."} ${pillar.description}`, href: rp(pillar.slug), icon: "book" }
              : {
                  title: el ? g.layersTitle : "The layers of modern search optimization",
                  text: `${el ? g.startHere : "Start here."} ${el ? g.layersStart : "SEO, AEO, GEO, AIO, DEO and SXO in one model."}`,
                  href: lp("/resources/search-optimization-layers"),
                  icon: "layers",
                },
            ...articles.map((a) => ({ title: a.title.split(":")[0], text: a.description, href: rp(a.slug) })),
            ...cluster.existing.filter((e) => e.role !== "commercial").map((e) => ({ title: e.title, text: e.role === "tool" ? (el ? g.freeToolLabel : "Free tool.") : el ? g.relatedGuide : "Related guide.", href: e.href })),
          ],
        },
      ];
    }),
    { type: "h2", id: "frameworks", text: el ? g.frameworks : "Frameworks worth bookmarking" },
    {
      type: "cards",
      cols: 2,
      items: [
        {
          title: el ? g.layersTitle : "The layers of modern search optimization",
          text: el ? g.layersText : "SEO, AEO, GEO, AIO, DEO and SXO in one model: what each layer optimizes for, what it asks of a page, and how it is measured.",
          href: lp("/resources/search-optimization-layers"),
          icon: "layers",
        },
        {
          title: el ? g.anatomyTitle : "Anatomy of a page built for AI search",
          text: el ? g.anatomyText : "Twelve parts of a page that decide whether an answer engine can read it, quote it and cite it, annotated on a worked example.",
          href: lp("/resources/ai-search-page-anatomy"),
          icon: "file",
        },
      ],
    },
    { type: "h2", id: "learn", text: el ? g.learn : "Learn" },
    {
      type: "cards",
      cols: 3,
      items: [
        { title: el ? g.guidesTitle : "SEO guides", text: el ? g.guidesText : "The ranking guides in one index: the main guide, plus keywords, on-page, technical SEO, links and local search.", href: lp("/seo-guides"), icon: "book" },
        { title: el ? g.glossaryTitle : "SEO glossary", text: el ? g.glossaryText : "Over 100 terms, each on its own page with an example and how to apply it.", href: glossaryPath(siteLocale), icon: "library" },
        { title: el ? g.appGuidesTitle : "AnotherSEOGuru App guides", text: el ? g.appGuidesText : "How to use every screen of the web app, with screenshots.", href: lp("/help"), icon: "book" },
        { title: el ? g.iphoneTitle : "iPhone app", text: el ? g.iphoneText : "Get the beta, Live Activities, widgets and alerts.", href: lp("/help/iphone-app"), icon: "smartphone" },
      ],
    },
    { type: "h2", id: "tools", text: el ? g.tools : "Free tools" },
    {
      type: "cards",
      cols: 2,
      items: PLATFORM_TOOLS.map((t) => {
        const tool = getPlatformTool(t.slug, siteLocale) ?? t;
        return { title: tool.title, text: tool.description ?? "", href: lp(`/tools/${t.slug}`), icon: "wrench" };
      }),
    },
    { type: "h2", id: "blog", text: el ? g.blog : "From the blog" },
    { type: "list", items: [...posts.map((p) => `[${p.title}](${localizedPath(p.locale, `/blog/${p.slug}`)})`), `[${el ? g.allArticles : "All articles"}](${lp("/blog")})`] },
    { type: "h2", id: "compare", text: el ? g.compare : "Compare" },
    {
      type: "cards",
      cols: 3,
      items: el
        ? [
            { title: "AnotherSEOGuru App και Ahrefs", text: COMPARE_PAGES_EL.ahrefs.cardText, href: lp("/compare/ahrefs") },
            { title: "AnotherSEOGuru App και Semrush", text: COMPARE_PAGES_EL.semrush.cardText, href: lp("/compare/semrush") },
            { title: "Μόνο το Search Console", text: COMPARE_PAGES_EL["search-console-alone"].cardText, href: lp("/compare/search-console-alone") },
          ]
        : [
            { title: "AnotherSEOGuru App vs Ahrefs", text: "Where each one fits, feature by feature.", href: lp("/compare/ahrefs") },
            { title: "AnotherSEOGuru App vs Semrush", text: "Price, data sources and workflow compared.", href: lp("/compare/semrush") },
            { title: "vs Search Console alone", text: "What you get on top of the free Google tool.", href: lp("/compare/search-console-alone") },
          ],
    },
  ];

  const articles = articlesFor(siteLocale);
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: [{ name: el ? g.home : "Home", url: lp("/") }, { name: el ? g.eyebrow : "Resources", url: rp() }] }),
    generateCollectionPageSchema({
      name: el ? g.schemaName : "SEO resources",
      description: el ? g.schemaDescription : "Search Console guides, free tools and frameworks from AnotherSEOGuru.",
      url: `${BASE_URL}${rp()}`,
      inLanguage: siteLocale,
      items: [
        ...articles.map((a) => ({ url: `${BASE_URL}${rp(a.slug)}`, name: a.title, itemType: "Article" })),
        { url: `${BASE_URL}${rp(OPPORTUNITY_FINDER.slug)}`, name: el ? EL_FINDER.title : OPPORTUNITY_FINDER.title, itemType: "WebApplication" },
      ],
    }),
  );

  return (
    <DocsShell locale={siteLocale} tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={siteLocale}
        eyebrow={el ? g.eyebrow : "Resources"}
        title={el ? g.heading : "SEO resources"}
        description={el ? g.lead : "Search Console guides, a free opportunity finder, AI search frameworks and the glossary: the same material our team uses on client work."}
        path={lp("/resources")}
        markdown={false}
        headings={blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text, level: 2 as const }] : []))}
        rail={<SignupCard locale={siteLocale} source="resources" />}
      >
        <ArticleBody blocks={blocks} locale={siteLocale} />
      </DocsPage>
    </DocsShell>
  );
}
