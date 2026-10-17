import { findArticle, helpContent, helpPath, resolveHelpHref, type Block, type HelpCategory } from "@/data/help";
import { categoryTitle } from "@/components/glossary/category-labels";
import { BASE_URL } from "@/lib/seo/schema";
import type { SiteLocale } from "@/lib/i18n/locale";
import { allTerms, findTerm, glossaryPath, termCopy } from "@/lib/docs/glossary";

/**
 * Plain Markdown for every docs page, served at the page URL plus ".md"
 * (the middleware rewrites it). This is what "Copy page", "View as Markdown"
 * and the "Open in ChatGPT / Claude" hand-offs use, and what AI crawlers get
 * when they ask for text.
 */

const abs = (href: string) => (href.startsWith("/") ? `${BASE_URL}${href}` : href);

function inline(text: string, locale: SiteLocale): string {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => `[${label}](${abs(resolveHelpHref(href, locale))})`);
}

export function blocksToMarkdown(blocks: ReadonlyArray<Block>, locale: SiteLocale): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "p":
        out.push(inline(b.text, locale));
        break;
      case "h2":
        out.push(`## ${b.text}`);
        break;
      case "h3":
        out.push(`### ${b.text}`);
        break;
      case "list":
        out.push(b.items.map((i) => `- ${inline(i, locale)}`).join("\n"));
        break;
      case "steps":
        out.push(
          b.items
            .map((i, n) => (typeof i === "string" ? `${n + 1}. ${inline(i, locale)}` : `${n + 1}. **${i.title}**${i.text ? ` ${inline(i.text, locale)}` : ""}`))
            .join("\n"),
        );
        break;
      case "note":
        out.push(`> **${b.tone === "warning" ? (locale === "el" ? "Προσοχή" : "Warning") : b.tone === "tip" ? (locale === "el" ? "Συμβουλή" : "Tip") : locale === "el" ? "Σημείωση" : "Note"}:** ${inline(b.text, locale)}`);
        break;
      case "table":
        out.push([`| ${b.head.join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`, ...b.rows.map((r) => `| ${r.map((c) => inline(c, locale)).join(" | ")} |`)].join("\n"));
        break;
      case "image":
        out.push(`![${b.alt}](${abs(b.src)})${b.caption ? `\n*${b.caption}*` : ""}`);
        break;
      case "gallery":
        out.push(b.items.map((i) => `![${i.alt}](${abs(i.src)})`).join("\n"));
        break;
      case "cards":
        out.push(b.items.map((c) => `- [${c.title}](${abs(resolveHelpHref(c.href, locale))}): ${inline(c.text, locale)}`).join("\n"));
        break;
      case "tabs":
        out.push(b.items.map((t) => `#### ${t.label}\n\n${blocksToMarkdown(t.blocks, locale)}`).join("\n\n"));
        break;
      case "faq":
        out.push(b.items.map((f) => `**${f.q}**\n\n${inline(f.a, locale)}`).join("\n\n"));
        break;
      case "code":
        out.push(`\`\`\`${b.lang ?? ""}\n${b.text}\n\`\`\``);
        break;
      default: {
        const never: never = b;
        return never;
      }
    }
  }
  return out.join("\n\n");
}

const header = (title: string, url: string, description: string) => `# ${title}\n\n> ${description}\n\nSource: ${url}`;

function categoryMarkdown(locale: SiteLocale, cat: HelpCategory): string {
  return [
    header(cat.title, abs(helpPath(locale, cat.slug)), cat.description),
    cat.articles.map((a) => `- [${a.title}](${abs(helpPath(locale, cat.slug, a.slug))}): ${a.description}`).join("\n"),
  ].join("\n\n");
}

function homeMarkdown(locale: SiteLocale): string {
  const el = locale === "el";
  return [
    header(el ? "Τεκμηρίωση GSC Boost" : "GSC Boost documentation", abs(helpPath(locale)), el ? "Οδηγοί για το GSC Boost στο web και στο iPhone." : "Guides for GSC Boost on the web and on iPhone."),
    ...helpContent(locale).map((c) => `## ${c.title}\n\n${c.description}\n\n${c.articles.map((a) => `- [${a.title}](${abs(helpPath(locale, c.slug, a.slug))}): ${a.description}`).join("\n")}`),
  ].join("\n\n");
}

function termMarkdown(locale: SiteLocale, id: string): string | null {
  const ref = findTerm(id);
  if (!ref) return null;
  const t = termCopy(ref.term, locale);
  const el = locale === "el";
  const parts = [header(t.name, abs(glossaryPath(locale, id)), t.short), t.full];
  if (t.example) parts.push(`## ${el ? "Παράδειγμα" : "Example"}\n\n${t.example}`);
  if (t.technique) parts.push(`## ${el ? "Πώς να το εφαρμόσετε" : "How to apply it"}\n\n${t.technique}`);
  if (t.proTip) parts.push(`> **${el ? "Συμβουλή" : "Pro tip"}:** ${t.proTip}`);
  const related = (ref.term.relatedTerms ?? []).map((r) => findTerm(r)).filter((r) => r !== null);
  if (related.length) parts.push(`## ${el ? "Σχετικοί όροι" : "Related terms"}\n\n${related.map((r) => `- [${termCopy(r.term, locale).name}](${abs(glossaryPath(locale, r.term.id))})`).join("\n")}`);
  return parts.join("\n\n");
}

function glossaryMarkdown(locale: SiteLocale): string {
  const el = locale === "el";
  const byCat = new Map<string, string[]>();
  for (const { category, term } of allTerms()) {
    const key = categoryTitle(category, locale);
    const t = termCopy(term, locale);
    byCat.set(key, [...(byCat.get(key) ?? []), `- [${t.name}](${abs(glossaryPath(locale, term.id))}): ${t.short}`]);
  }
  return [
    header(el ? "SEO γλωσσάρι" : "SEO glossary", abs(glossaryPath(locale)), el ? "Όροι SEO, AEO, GEO και Search Console σε απλά λόγια." : "SEO, AEO, GEO and Search Console terms in plain words."),
    ...[...byCat].map(([k, v]) => `## ${k}\n\n${v.join("\n")}`),
  ].join("\n\n");
}

/** Markdown for a docs path such as ["en", "help", "getting-started", "welcome"], or null. */
export function markdownFor(segments: ReadonlyArray<string>): string | null {
  const [locale, section, a, b] = segments;
  if (locale !== "en" && locale !== "el") return null;
  if (section === "help") {
    const content = helpContent(locale);
    if (!a) return homeMarkdown(locale);
    const cat = content.find((c) => c.slug === a);
    if (!cat) return null;
    if (!b) return categoryMarkdown(locale, cat);
    const found = findArticle(content, a, b);
    if (!found) return null;
    return `${header(found.article.title, abs(helpPath(locale, a, b)), found.article.description)}\n\n${blocksToMarkdown(found.article.body, locale)}`;
  }
  if (section === "glossary") return a ? termMarkdown(locale, a) : glossaryMarkdown(locale);
  return null;
}

/** Every path markdownFor answers, for static generation. */
export function markdownPaths(): string[][] {
  const out: string[][] = [];
  for (const locale of ["en", "el"] as const) {
    out.push([locale, "help"], [locale, "glossary"]);
    for (const c of helpContent(locale)) {
      out.push([locale, "help", c.slug]);
      for (const a of c.articles) out.push([locale, "help", c.slug, a.slug]);
    }
    for (const { term } of allTerms()) out.push([locale, "glossary", term.id]);
  }
  return out;
}
