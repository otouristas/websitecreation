import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { rehypeHeadingIds } from "@/lib/rehype-heading-ids";
import { isEnOnlySection, type SiteLocale } from "@/lib/i18n/locale";
import { blogHref } from "@/lib/blog";

interface MarkdownBodyProps {
  readonly markdown: string;
  /** Current locale; bare internal links (/services, /blog…) are prefixed with it. */
  readonly locale?: SiteLocale;
}

/**
 * Prefix a bare internal href with the current locale so in-body markdown links
 * never trigger the middleware 307 hop (or cross-locale 404s). Links that are
 * already localized (/en, /el) or non-navigational (#, mailto:, tel:, http) pass through.
 */
function localizeHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/")) return href;
  // Only skip when the first path segment is exactly a locale (avoids matching
  // paths like "/energy-seo"). Otherwise prefix so the link resolves in-locale.
  const firstSeg = href.split(/[/?#]/)[1] ?? "";
  const hasLocale = firstSeg === "en" || firstSeg === "el";
  const bare = hasLocale ? href.slice(3) || "/" : href;
  const barePath = bare.split(/[?#]/)[0];
  // Platform/tools/resources/compare exist only in English - including when the
  // author already typed an /el prefix, which then 308'd.
  if (isEnOnlySection(barePath)) return `/en${bare}`;
  if (hasLocale) return href;
  // A post exists in exactly one locale. Prefixing a bare /blog/<slug> with the
  // reader's locale pointed at a URL that 308s to the other one, so resolve the
  // slug against the post's own locale instead.
  if (firstSeg === "blog") {
    const slug = barePath.split("/")[2];
    if (slug) return blogHref(slug, locale);
  }
  return `/${locale}${href}`;
}

export function MarkdownBody({ markdown, locale = "en" }: MarkdownBodyProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHeadingIds]}
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("/")) {
            return <Link href={localizeHref(href, locale)}>{children}</Link>;
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
