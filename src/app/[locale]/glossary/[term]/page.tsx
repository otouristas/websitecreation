import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import { categoryTitle } from "@/components/glossary/category-labels";
import type { Block } from "@/data/help";
import { resolveMarketingPath } from "@/lib/marketing-links";
import { allTerms, findTerm, glossaryPath, termCopy } from "@/lib/docs/glossary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateBreadcrumbSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string; term: string }> };

export function generateStaticParams() {
  return allTerms().map(({ term }) => ({ term: term.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, term } = await params;
  if (!isValidLocale(locale)) return {};
  const ref = findTerm(term);
  if (!ref) return {};
  const t = termCopy(ref.term, locale);
  const el = locale === "el";
  // "What is X" is how people search for a definition, in both languages.
  const title = el ? `Τι είναι το ${ref.term.term}; Ορισμός και παράδειγμα` : `What Is ${ref.term.term}? Definition and Example`;
  const description = `${t.short} ${el ? "Ορισμός, παράδειγμα και πώς να το εφαρμόσετε, στο SEO γλωσσάρι." : "Definition, example and how to apply it, in the SEO glossary."}`;
  const path = glossaryPath(locale, term);
  const meta = buildMetadata({ title, description, path, hreflangPath: `/glossary/${term}`, hreflangLocales: ["en", "el"], primaryKeyword: ref.term.term });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${path}.md` } } };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { locale: raw, term: id } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const ref = findTerm(id);
  if (!ref) notFound();
  const el = locale === "el";
  const { category, term } = ref;
  const t = termCopy(term, locale);
  const path = glossaryPath(locale, id);

  const order = allTerms();
  const i = order.findIndex((r) => r.term.id === id);
  const link = (r: (typeof order)[number] | undefined) => (r ? { title: termCopy(r.term, locale).name, href: glossaryPath(locale, r.term.id) } : null);

  const related = (term.relatedTerms ?? []).map((r) => findTerm(r)).filter((r) => r !== null);
  const links = (term.relatedLinks ?? []).filter((l) => !/^\/(en|el)\//.test(l.url) || l.url.startsWith(`/${locale}/`));

  const blocks: Block[] = [
    { type: "h2", id: "definition", text: el ? `Τι είναι το ${term.term}` : `What is ${term.term}` },
    { type: "p", text: t.full },
    ...(t.example ? ([{ type: "h2", id: "example", text: el ? "Παράδειγμα" : "Example" }, { type: "p", text: t.example }] as Block[]) : []),
    ...(t.technique ? ([{ type: "h2", id: "how-to-apply", text: el ? "Πώς να το εφαρμόσετε" : "How to apply it" }, { type: "p", text: t.technique }] as Block[]) : []),
    ...(t.proTip ? ([{ type: "note", tone: "tip", text: t.proTip }] as Block[]) : []),
    {
      type: "h2",
      id: "gsc-boost",
      text: el ? "Παρακολουθήστε το στο GSC Boost" : "Track it in GSC Boost",
    },
    {
      type: "p",
      text: el
        ? "Το GSC Boost διαβάζει τα δεδομένα σας από το Search Console και σας λέει τι να διορθώσετε πρώτα, με την εκτίμηση των clicks που φέρνει κάθε διόρθωση. [Ξεκινήστε από τον οδηγό](/help/getting-started/welcome) ή [κάντε δωρεάν εγγραφή](/signup)."
        : "GSC Boost reads your Search Console data and tells you what to fix first, with the clicks each fix is likely to bring. [Start with the guide](/help/getting-started/welcome) or [sign up free](/signup).",
    },
    ...(related.length
      ? ([
          { type: "h2", id: "related", text: el ? "Σχετικοί όροι" : "Related terms" },
          {
            type: "cards",
            cols: 2,
            items: related.map((r) => {
              const rc = termCopy(r.term, locale);
              return { title: rc.name, text: rc.short, href: glossaryPath(locale, r.term.id) };
            }),
          },
        ] as Block[])
      : []),
    ...(links.length
      ? ([
          { type: "h2", id: "resources", text: el ? "Σχετικοί πόροι" : "Related resources" },
          { type: "list", items: links.map((l) => `[${l.title}](${resolveMarketingPath(l.url, locale)})`) },
        ] as Block[])
      : []),
  ];

  const url = `${BASE_URL}${path}`;
  const setUrl = `${BASE_URL}${glossaryPath(locale)}`;
  const schemas = combineSchemas(
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${url}#term`,
      name: t.name,
      description: t.short,
      url,
      inLanguage: locale,
      inDefinedTermSet: { "@type": "DefinedTermSet", "@id": `${setUrl}#glossary`, name: el ? "SEO γλωσσάρι" : "SEO glossary", url: setUrl },
    },
    generateBreadcrumbSchema({
      items: [
        { name: el ? "Αρχική" : "Home", url: localizedPath(locale, "/") },
        { name: el ? "SEO γλωσσάρι" : "SEO glossary", url: glossaryPath(locale) },
        { name: t.name, url: path },
      ],
    }),
  );

  return (
    <DocsShell locale={locale} tab="glossary" alternateHref={glossaryPath(el ? "en" : "el", id)}>
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={categoryTitle(category, locale)}
        title={t.name}
        description={t.short}
        path={path}
        headings={blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text, level: 2 as const }] : []))}
        feedbackId={`glossary/${id}`}
        prev={link(order[i - 1])}
        next={link(order[i + 1])}
        rail={<SignupCard locale={locale} source={`glossary-${id}`} />}
      >
        <ArticleBody blocks={blocks} locale={locale} />
      </DocsPage>
    </DocsShell>
  );
}
