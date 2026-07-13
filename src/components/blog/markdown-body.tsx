import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { SiteLocale } from "@/lib/i18n/locale";

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
  if (firstSeg === "en" || firstSeg === "el") return href;
  return `/${locale}${href}`;
}

export function MarkdownBody({ markdown, locale = "en" }: MarkdownBodyProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
