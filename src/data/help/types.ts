/**
 * Help articles are plain data so English and Greek stay in step: both files export the same
 * category and article slugs. Inline text supports **bold**, `code` and [links](/path).
 */
export type Block =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly id: string; readonly text: string }
  | { readonly type: "h3"; readonly id: string; readonly text: string }
  | { readonly type: "list"; readonly items: ReadonlyArray<string> }
  | { readonly type: "steps"; readonly items: ReadonlyArray<string> }
  | { readonly type: "note"; readonly tone: "info" | "tip" | "warning"; readonly text: string }
  | { readonly type: "table"; readonly head: ReadonlyArray<string>; readonly rows: ReadonlyArray<ReadonlyArray<string>> };

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
  readonly articles: ReadonlyArray<HelpArticle>;
}

