import { NodeHtmlMarkdown } from "node-html-markdown";
import { parse, type HTMLElement } from "node-html-parser";

/**
 * Markdown twin of any rendered page: anotherseoguru.com/<path>.md, or the same
 * URL with `Accept: text/markdown`. Used by AI agents and answer engines that
 * prefer clean text over HTML. The page itself stays the canonical URL.
 */

const DROP = [
  "script",
  "style",
  "noscript",
  "svg",
  "template",
  "iframe",
  "form",
  "button",
  "[aria-hidden=true]",
  ".sr-only",
  "[hidden]",
];

const nhm = new NodeHtmlMarkdown({ bulletMarker: "-", codeBlockStyle: "fenced", maxConsecutiveNewlines: 2, keepDataImages: false, useLinkReferenceDefinitions: false });

function meta(root: HTMLElement, selector: string, attr = "content"): string | undefined {
  const v = root.querySelector(selector)?.getAttribute(attr)?.trim();
  return v ? v : undefined;
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

export interface PageMarkdown {
  readonly body: string;
  readonly canonical: string;
}

export function htmlToPageMarkdown(html: string, pageUrl: string): PageMarkdown {
  const root = parse(html, { comment: false });
  const title = root.querySelector("title")?.text.trim() ?? "";
  const description = meta(root, 'meta[name="description"]');
  const canonical = meta(root, 'link[rel="canonical"]', "href") ?? pageUrl;
  const lang = root.querySelector("html")?.getAttribute("lang") ?? undefined;

  const main = root.querySelector("main") ?? root.querySelector("body") ?? root;
  for (const sel of DROP) for (const node of main.querySelectorAll(sel)) node.remove();

  // Absolute links, so the Markdown works outside the site.
  const origin = new URL(pageUrl).origin;
  for (const a of main.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("/")) a.setAttribute("href", origin + href);
  }
  for (const img of main.querySelectorAll("img[src]")) {
    const src = img.getAttribute("src") ?? "";
    if (src.startsWith("/")) img.setAttribute("src", origin + src);
  }

  const content = nhm
    .translate(main.innerHTML)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const front = [
    "---",
    `title: ${yamlString(title)}`,
    description ? `description: ${yamlString(description)}` : null,
    `url: ${yamlString(canonical)}`,
    `markdown_url: ${yamlString(canonical.replace(/\/$/, "") + ".md")}`,
    lang ? `language: ${yamlString(lang)}` : null,
    `publisher: "AnotherSEOGuru (Touristas Technologies)"`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  return { body: `${front}\n\n${content}\n`, canonical };
}
