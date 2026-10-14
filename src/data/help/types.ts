/**
 * Help articles are plain data so English and Greek stay in step: both files export the same
 * category and article slugs. Inline text supports **bold**, `code` and [links](/path).
 */
export type Block =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly id: string; readonly text: string }
  | { readonly type: "h3"; readonly id: string; readonly text: string }
  | { readonly type: "list"; readonly items: ReadonlyArray<string> }
  /** Numbered steps. An item is either one line, or a titled step with its own body. */
  | { readonly type: "steps"; readonly items: ReadonlyArray<string | StepItem> }
  | { readonly type: "note"; readonly tone: "info" | "tip" | "warning"; readonly text: string }
  | { readonly type: "table"; readonly head: ReadonlyArray<string>; readonly rows: ReadonlyArray<ReadonlyArray<string>> }
  /** One screenshot in a browser or iPhone frame. `src` is the light capture, `srcDark` the dark one. */
  | ({ readonly type: "image" } & Shot)
  /** Several iPhone screens side by side. */
  | { readonly type: "gallery"; readonly items: ReadonlyArray<Shot> }
  /** Linked cards in a grid. `icon` is a key of DOC_ICONS in src/components/docs/icons.ts. */
  | { readonly type: "cards"; readonly cols?: 2 | 3; readonly items: ReadonlyArray<CardItem> }
  /** Switchable panels, e.g. "Web app" / "iPhone". */
  | { readonly type: "tabs"; readonly items: ReadonlyArray<{ readonly label: string; readonly blocks: ReadonlyArray<Block> }> }
  /** Questions and answers. Rendered as an accordion and emitted as FAQPage schema. */
  | { readonly type: "faq"; readonly items: ReadonlyArray<{ readonly q: string; readonly a: string }> }
  | { readonly type: "code"; readonly lang?: string; readonly title?: string; readonly text: string };

export interface StepItem {
  readonly title: string;
  readonly text?: string;
  readonly image?: Shot;
}

export interface Shot {
  /** Public path, e.g. /images/docs/web/overview-light.webp */
  readonly src: string;
  readonly srcDark?: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
  readonly device?: "browser" | "iphone";
}

export interface CardItem {
  readonly title: string;
  readonly text: string;
  readonly href: string;
  readonly icon?: string;
}

export interface HelpArticle {
  readonly slug: string;
  readonly title: string;
  /** One-sentence lead under the title, also used in search results and cards. */
  readonly description: string;
  readonly body: ReadonlyArray<Block>;
}

export interface HelpCategory {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  /** Sidebar group the category sits in on the Guides tab. */
  readonly group?: "start" | "product" | "iphone" | "account";
  readonly articles: ReadonlyArray<HelpArticle>;
}
