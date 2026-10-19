import type { Block } from "@/data/help";

/**
 * The /resources hub: clusters, their pillars and supporting articles.
 *
 * Bodies reuse the help-center blocks, so pages render through ArticleBody,
 * get FAQPage and HowTo schema from their own visible blocks, and have a
 * Markdown twin. Inline links take site paths with the locale (/en/...),
 * help paths (/help/...) or app paths (/demo, /signup).
 */

export type ClusterId = "search-console" | "traffic-drops" | "forecasting" | "reporting" | "ai-visibility";

export type ResourceKind = "pillar" | "article" | "tool";

/** Informational pages get a soft CTA (demo, the free tool); commercial ones a direct sign-up. */
export type CtaIntent = "soft" | "direct";

export interface ResourceArticle {
  readonly slug: string;
  readonly cluster: ClusterId;
  readonly kind: ResourceKind;
  /** H1. */
  readonly title: string;
  /** <title> before the brand suffix. Kept short enough to show in full. */
  readonly seoTitle: string;
  /** Meta description and the lead under the H1. */
  readonly description: string;
  /** The one query this URL owns. No other URL on the site targets it. */
  readonly primaryKeyword: string;
  readonly secondaryKeywords: ReadonlyArray<string>;
  readonly cta: CtaIntent;
  readonly published: string;
  readonly updated: string;
  readonly body: ReadonlyArray<Block>;
}

export interface ResourceCluster {
  readonly id: ClusterId;
  readonly title: string;
  readonly summary: string;
  /** The pillar's path under /resources. */
  readonly pillar: string;
  /** Pages in this cluster that live elsewhere on the site and stay where they are. */
  readonly existing: ReadonlyArray<{ readonly title: string; readonly href: string; readonly role: "pillar" | "supporting" | "commercial" | "tool" }>;
  /** Where the cluster hands off to the product. */
  readonly product: { readonly title: string; readonly href: string };
}
