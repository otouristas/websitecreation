import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody, ShotFrame } from "@/components/help/ArticleBody";
import { ContactCard } from "@/components/help/HelpShell";
import { DocsPage, headingsOf } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import { appLink } from "@/components/gsc-boost/copy";
import { IPHONE_CATEGORY, articleFaqs, helpContent, helpPath, type Block, type Shot } from "@/data/help";
import { categoryIcon } from "@/lib/docs/nav";
import { glossaryPath } from "@/lib/docs/glossary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateBreadcrumbSchema, generateCollectionPageSchema, generateFAQSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "el" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const el = locale === "el";
  const meta = buildMetadata({
    title: el ? "Τεκμηρίωση GSC Boost: οδηγοί web και iPhone" : "GSC Boost Docs: Web and iPhone Guides",
    description: el
      ? "Οδηγοί για το GSC Boost στο web και στο iPhone: σύνδεση Search Console, ευκαιρίες, θέσεις, έλεγχος ιστότοπου, ορατότητα σε AI, γραφεία και χρεώσεις, με screenshots."
      : "Guides for GSC Boost on the web and iPhone: connect Search Console, opportunities, rank tracking, site audits, AI visibility, agencies and billing, with screenshots.",
    path: helpPath(locale),
    hreflangPath: "/help",
    hreflangLocales: ["en", "el"],
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${helpPath(locale)}.md` } } };
}

const shot = (name: string, alt: string, caption?: string): Shot => ({
  src: `/images/docs/web/${name}-light.webp`,
  srcDark: `/images/docs/web/${name}-dark.webp`,
  alt,
  caption,
  width: 1600,
  height: 1000,
  device: "browser",
});
const phone = (name: string, alt: string): Shot => ({ src: `/images/iphone/${name}.webp`, alt, width: 601, height: 1306, device: "iphone" });

function homeBlocks(locale: SiteLocale): Block[] {
  const el = locale === "el";
  const h = (slug: string, article?: string) => helpPath(locale, slug, article);
  const content = helpContent(locale).filter((c) => c.slug !== IPHONE_CATEGORY);
  return [
    {
      type: "p",
      text: el
        ? "Το **GSC Boost** διαβάζει τα δεδομένα σας από το **Google Search Console** και τα κάνει πλάνο για την εβδομάδα: ποιες σελίδες και ποια queries να δουλέψετε, τι να αλλάξετε και πόσα clicks φέρνει κάθε διόρθωση. Εδώ θα βρείτε οδηγούς για κάθε οθόνη του web app και της εφαρμογής iPhone, και ένα SEO γλωσσάρι με κάθε όρο σε απλά λόγια."
        : "**GSC Boost** reads your **Google Search Console** data and turns it into a plan for the week: which pages and queries to work on, what to change, and how many clicks each fix is likely to bring. Here you'll find guides for every screen of the web app and the iPhone app, plus an SEO glossary with every term in plain words.",
    },
    {
      type: "cards",
      cols: 3,
      items: [
        { title: el ? "Ξεκινήστε σε 5 λεπτά" : "Start in five minutes", text: el ? "Συνδέστε το Search Console και δείτε τις πρώτες διορθώσεις." : "Connect Search Console and see your first fixes.", href: h("getting-started", "connect-search-console"), icon: "rocket" },
        { title: el ? "Εφαρμογή iPhone" : "iPhone app", text: el ? "Η εβδομάδα σας, θέσεις, ειδοποιήσεις και Live Activities. Σε beta." : "Your week, rankings, alerts and Live Activities. In beta.", href: h(IPHONE_CATEGORY), icon: "smartphone" },
        { title: el ? "SEO γλωσσάρι" : "SEO glossary", text: el ? "Πάνω από 100 όροι SEO, AEO και GEO, ο καθένας με δική του σελίδα." : "Over 100 SEO, AEO and GEO terms, each with its own page.", href: glossaryPath(locale), icon: "library" },
      ],
    },
    { type: "h2", id: "quickstart", text: el ? "Γρήγορη εκκίνηση" : "Quickstart" },
    {
      type: "steps",
      items: [
        {
          title: el ? "Κάντε εγγραφή με Google" : "Sign up with Google",
          text: el
            ? "Ανοίξτε τη [σελίδα εγγραφής](/signup) και επιλέξτε τον λογαριασμό Google που έχει πρόσβαση στο Search Console σας. Η πρόσβαση είναι μόνο για ανάγνωση."
            : "Open the [sign-up page](/signup) and pick the Google account that has access to your Search Console. Access is read-only.",
          image: shot("signup", el ? "Η σελίδα εγγραφής του GSC Boost" : "The GSC Boost sign-up page"),
        },
        {
          title: el ? "Διαλέξτε τους ιστότοπούς σας" : "Pick your sites",
          text: el
            ? "Κάθε property του Search Console γίνεται project. Ορίστε brand terms, ανταγωνιστές και αγορά. [Δείτε πώς](/help/getting-started/projects-and-sites)."
            : "Each Search Console property becomes a project. Set brand terms, competitors and your market. [See how](/help/getting-started/projects-and-sites).",
        },
        {
          title: el ? "Ανοίξτε την «Αυτή την εβδομάδα»" : "Open This week",
          text: el
            ? "Οι διορθώσεις με τα περισσότερα clicks βρίσκονται στην κορυφή, με την υγεία της αναζήτησης και την τάση της κίνησης από κάτω."
            : "The fixes worth the most clicks sit at the top, with search health and the traffic trend underneath.",
          image: shot("overview", el ? "Η οθόνη «Αυτή την εβδομάδα» με τις κορυφαίες διορθώσεις" : "The This week screen with the top fixes"),
        },
        {
          title: el ? "Στείλτε διορθώσεις στις Εργασίες" : "Send fixes to Tasks",
          text: el
            ? "Από τις [Ευκαιρίες](/help/opportunities-tasks/opportunities) στείλτε όσες θέλετε στις Εργασίες, κάντε τις αλλαγές και σημειώστε τις ως ολοκληρωμένες."
            : "From [Opportunities](/help/opportunities-tasks/opportunities), send the ones you want to Tasks, ship the changes and mark them done.",
        },
        {
          title: el ? "Μετρήστε το αποτέλεσμα" : "Measure the result",
          text: el
            ? "Το GSC Boost συγκρίνει clicks και θέσεις πριν και μετά από κάθε αλλαγή, ώστε να βλέπετε τι δούλεψε."
            : "GSC Boost compares clicks and positions before and after each change, so you can see what worked.",
          image: shot("tasks-results", el ? "Αποτελέσματα εργασιών πριν και μετά" : "Task results before and after"),
        },
      ],
    },
    { type: "h2", id: "web-and-iphone", text: el ? "Στο web και στο iPhone" : "On the web and on iPhone" },
    {
      type: "tabs",
      items: [
        {
          label: el ? "Web app" : "Web app",
          blocks: [
            {
              type: "p",
              text: el
                ? "Όλα τα εργαλεία σε μία οθόνη: απόδοση, ευκαιρίες, λέξεις-κλειδιά, περιεχόμενο, έλεγχος ιστότοπου, ανταγωνιστές, ορατότητα σε AI και εργαλεία για γραφεία. Πατήστε `⌘K` για να πάτε οπουδήποτε."
                : "Every tool in one place: performance, opportunities, keywords, content, site audit, competitors, AI visibility and agency tools. Press `⌘K` to jump anywhere.",
            },
            { type: "image", ...shot("command-palette", el ? "Η παλέτα εντολών ⌘K στο web app" : "The ⌘K command palette in the web app") },
          ],
        },
        {
          label: "iPhone",
          blocks: [
            {
              type: "p",
              text: el
                ? "Η ίδια εβδομάδα στην τσέπη σας, με θέσεις, έλεγχο ιστότοπου με Live Activity και ειδοποιήσεις. Η εφαρμογή είναι σε beta στο TestFlight. [Δείτε πώς τη βάζετε](/help/iphone-app)."
                : "The same week in your pocket, with rankings, a site audit with a Live Activity, and alerts. The app is in beta on TestFlight. [See how to get it](/help/iphone-app).",
            },
            {
              type: "gallery",
              items: [
                phone("today", el ? "Η οθόνη Σήμερα στο iPhone" : "The Today screen on iPhone"),
                phone("ranking-ladder", el ? "Η σκάλα θέσεων στο iPhone" : "The ranking ladder on iPhone"),
                phone("site-audit", el ? "Ο έλεγχος ιστότοπου στο iPhone" : "The site audit on iPhone"),
              ],
            },
          ],
        },
      ],
    },
    { type: "h2", id: "explore", text: el ? "Εξερευνήστε το GSC Boost" : "Explore GSC Boost" },
    {
      type: "cards",
      cols: 2,
      items: content.map((c) => ({ title: c.title, text: c.description, href: h(c.slug), icon: categoryIcon(c.slug) })),
    },
    { type: "h2", id: "faq", text: el ? "Συχνές ερωτήσεις" : "Frequently asked questions" },
    {
      type: "faq",
      items: el
        ? [
            { q: "Τι χρειάζομαι για να ξεκινήσω;", a: "Έναν λογαριασμό Google με πρόσβαση σε τουλάχιστον ένα property του Search Console. Η εγγραφή είναι δωρεάν και η πρόσβαση μόνο για ανάγνωση." },
            { q: "Μπορώ να το δοκιμάσω χωρίς να συνδέσω ιστότοπο;", a: "Ναι. Η [ζωντανή επίδειξη](/demo) τρέχει με δείγμα δεδομένων για τρεις ιστότοπους και κάθε οθόνη λειτουργεί." },
            { q: "Υπάρχει εφαρμογή για iPhone;", a: "Ναι, σε beta μέσω TestFlight. Ζητήστε πρόσκληση στο support@anotherseoguru.com. Δεν είναι ακόμη στο App Store." },
            { q: "Μπορούν τα AI εργαλεία να διαβάσουν αυτούς τους οδηγούς;", a: "Ναι. Κάθε σελίδα υπάρχει και ως Markdown (προσθέστε `.md` στο URL) και όλα μαζί στο `/llms-full.txt`. Το «Αντιγραφή σελίδας» τα ανοίγει απευθείας σε ChatGPT ή Claude." },
          ]
        : [
            { q: "What do I need to start?", a: "A Google account with access to at least one Search Console property. Signing up is free and access is read-only." },
            { q: "Can I try it without connecting a site?", a: "Yes. The [live demo](/demo) runs on sample data for three sites and every screen works." },
            { q: "Is there an iPhone app?", a: "Yes, in beta through TestFlight. Ask for an invite at support@anotherseoguru.com. It isn't on the App Store yet." },
            { q: "Can AI tools read these docs?", a: "Yes. Every page is also available as Markdown (add `.md` to the URL), and everything together is at `/llms-full.txt`. **Copy page** opens a page straight in ChatGPT or Claude." },
          ],
    },
  ];
}

export default async function HelpHomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const el = locale === "el";
  const blocks = homeBlocks(locale);
  const content = helpContent(locale);
  const crumbs = [
    { name: el ? "Αρχική" : "Home", url: localizedPath(locale, "/") },
    { name: el ? "Κέντρο βοήθειας" : "Help center", url: helpPath(locale) },
  ];
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: crumbs }),
    generateCollectionPageSchema({
      name: el ? "Τεκμηρίωση GSC Boost" : "GSC Boost docs",
      description: el ? "Οδηγοί για το GSC Boost στο web και στο iPhone." : "Guides for GSC Boost on the web and on iPhone.",
      url: `${BASE_URL}${helpPath(locale)}`,
      inLanguage: locale,
      items: content.map((c) => ({ name: c.title, url: `${BASE_URL}${helpPath(locale, c.slug)}` })),
    }),
    generateFAQSchema({ faqs: articleFaqs(blocks) }),
  );

  return (
    <DocsShell locale={locale} tab="guides" alternateHref={helpPath(el ? "en" : "el")}>
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={el ? "Ξεκινήστε" : "Get started"}
        title={el ? "Καλώς ήρθατε στο GSC Boost" : "Welcome to GSC Boost"}
        description={
          el
            ? "Η πλατφόρμα SEO πάνω στο Google Search Console, για web και iPhone. Μάθετε να τη χρησιμοποιείτε από την πρώτη σύνδεση μέχρι τη λειτουργία ενός γραφείου."
            : "The SEO platform built on Google Search Console, on the web and on iPhone. Learn it from your first connection to running an agency on it."
        }
        path={helpPath(locale)}
        headings={headingsOf(blocks)}
        feedbackId="home"
        rail={<SignupCard locale={locale} source="help-home" />}
      >
        <ShotFrame
          shot={{
            src: "/images/docs/web/overview-light.webp",
            srcDark: "/images/docs/web/overview-dark.webp",
            alt: el ? "Το GSC Boost με τις διορθώσεις της εβδομάδας" : "GSC Boost showing this week's fixes",
            width: 1600,
            height: 1000,
            device: "browser",
          }}
          locale={locale}
        />
        <ArticleBody blocks={blocks} locale={locale} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a href={appLink("/demo", locale, "help-home-demo")} className="rounded-2xl border border-hairline p-5 transition-colors hover:border-primary/50">
            <span className="block font-display text-[15.5px] font-semibold text-foreground">{el ? "Ζωντανή επίδειξη" : "Live demo"}</span>
            <span className="mt-1 block text-[14px] text-muted-foreground">{el ? "Κάθε οθόνη με δείγμα δεδομένων. Χωρίς εγγραφή." : "Every screen on sample data. No sign-up."}</span>
          </a>
          <ContactCard locale={locale} className="sm:flex-col sm:items-start" />
        </div>
      </DocsPage>
    </DocsShell>
  );
}
