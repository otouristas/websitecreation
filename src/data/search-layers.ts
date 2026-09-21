/**
 * The six layers of modern search optimization: SEO, AEO, GEO, AIO, DEO, SXO.
 *
 * The acronyms are not competing disciplines and none of them replaces SEO.
 * They are the successive moments in which a business can be found, quoted,
 * understood, recommended and finally chosen, and each one asks something
 * different of the same page. The site already sells the work (`/seo-services`,
 * `/services/ai-visibility`); what it never had was one page that defines the
 * terms, so seven blog posts define them in parallel and none of them owns the
 * query.
 *
 * Rules this data follows:
 *
 * - Every `href` points at a route that exists. The layer model is only useful
 *   if each layer hands the reader somewhere to act.
 * - `hue` is an oklch hue angle handed to `--signature-h`, so lightness and
 *   chroma come from the theme and each row is correct in light and dark
 *   without declaring a colour twice. The ladder runs 205 -> 288, inside the
 *   200-290 brand band; the source infographic's orange and green are not
 *   available to this site.
 * - No metric is promised. "Success metrics" are the things you can measure,
 *   not outcomes anyone is owed: an engine cites who it wants to.
 */

export interface SearchLayerColumn {
  readonly label: string;
  readonly items: readonly string[];
}

export interface SearchLayer {
  readonly abbr: string;
  readonly name: string;
  /** Anchor id, also the deep link a blog post can point at. */
  readonly id: string;
  /** The single thing this layer is trying to achieve. */
  readonly goal: string;
  /** Answer-first definition. One sentence, liftable on its own. */
  readonly definition: string;
  /** Why the layer exists at all - the shift that created it. */
  readonly why: string;
  readonly columns: readonly [SearchLayerColumn, SearchLayerColumn];
  readonly metrics: readonly string[];
  readonly hue: number;
  readonly href: string;
  readonly hrefLabel: string;
}

export const SEARCH_LAYERS: readonly SearchLayer[] = [
  {
    abbr: 'SEO',
    name: 'Search Engine Optimization',
    id: 'seo',
    goal: 'Get crawled, indexed, ranked',
    definition:
      'SEO is the work that makes a page reachable, indexable and worth ranking: the technical base, the content, the internal links and the authority behind them.',
    why: 'Still the floor under everything else. A page an engine cannot crawl or index is not a candidate for an answer, a citation or a recommendation either.',
    columns: [
      {
        label: 'Focus areas',
        items: [
          'Technical SEO',
          'Content quality',
          'Topical authority',
          'Internal linking',
          'Core Web Vitals',
          'Schema',
          'E-E-A-T',
          'Backlinks',
        ],
      },
      {
        label: 'Outcome',
        items: ['Rankings', 'Organic traffic', 'Indexed pages'],
      },
    ],
    metrics: ['Rankings', 'Organic traffic', 'Indexed pages'],
    hue: 205,
    href: '/seo-services',
    hrefLabel: 'SEO services',
  },
  {
    abbr: 'AEO',
    name: 'Answer Engine Optimization',
    id: 'aeo',
    goal: 'Become the direct answer',
    definition:
      'AEO is writing and marking up a page so a search engine can lift the answer straight out of it: question-shaped headings, short direct answers, lists, tables and FAQ markup.',
    why: 'A growing share of queries are resolved on the results page. If the answer is buried in paragraph nine, the box above it belongs to somebody else.',
    columns: [
      {
        label: 'Optimize for',
        items: [
          'Google AI Overviews',
          'Featured snippets',
          'Voice search',
          'FAQ answers',
          'Rich results',
        ],
      },
      {
        label: 'Requirements',
        items: [
          'Question-first content',
          'Short direct answers',
          'Lists',
          'Tables',
          'FAQ schema',
          'Clear entities',
        ],
      },
    ],
    metrics: ['AI Overview appearances', 'Featured snippets', 'Zero-click visibility'],
    hue: 222,
    href: '/services/ai-visibility',
    hrefLabel: 'AI visibility',
  },
  {
    abbr: 'GEO',
    name: 'Generative Engine Optimization',
    id: 'geo',
    goal: 'Get cited by AI',
    definition:
      'GEO is earning citations inside generated answers by publishing what a model cannot get anywhere else: original data, named expertise and a brand it can resolve consistently.',
    why: 'A generative answer quotes a handful of sources and drops the rest. Being in the index is table stakes; being the source it names is the job.',
    columns: [
      {
        label: 'Platforms',
        items: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Copilot'],
      },
      {
        label: 'Optimize with',
        items: [
          'Original research',
          'Statistics you generated',
          'Named expert opinion',
          'Brand mentions',
          'Entity consistency',
          'Fresh updates',
          'Structured content',
        ],
      },
    ],
    metrics: ['AI citations', 'AI mentions', 'Brand references'],
    hue: 240,
    href: '/tools/llm-citation-tracking',
    hrefLabel: 'LLM citation tracking',
  },
  {
    abbr: 'AIO',
    name: 'AI Optimization',
    id: 'aio',
    goal: 'Make content machine-readable',
    definition:
      'AIO is making a page parseable end to end: resolvable entities, structured data, consistent brand facts, and media a model can actually read rather than skip.',
    why: 'Models do not read a page the way a visitor does. Anything that depends on layout, a click or client-side rendering to make sense may never be understood at all.',
    columns: [
      {
        label: 'Optimize',
        items: [
          'Semantic entities',
          'Knowledge-graph signals',
          'Machine-readable content',
          'Structured data',
          'Consistent brand info',
          'Multimedia',
          'Freshness',
        ],
      },
      {
        label: 'What AI reads',
        items: ['Text', 'Images', 'PDFs', 'Videos', 'Tables', 'Structured data'],
      },
    ],
    metrics: ['Entity recognition', 'Correct brand facts', 'Coverage across surfaces'],
    hue: 258,
    href: '/services/seo-audits',
    hrefLabel: 'SEO audits',
  },
  {
    abbr: 'DEO',
    name: 'Decision Engine Optimization',
    id: 'deo',
    goal: 'Get chosen, not just cited',
    definition:
      'DEO is giving an assistant the facts it compares on before it recommends anyone: suitability, price, availability, reviews, policies and terms, in a form it can read.',
    why: 'Assistants have stopped listing options and started shortlisting them. The comparison happens off your site, using whatever data it could find.',
    columns: [
      {
        label: 'Optimize for',
        items: [
          'Suitability and relevance',
          'Pricing and availability',
          'Reviews and reputation',
          'Policies and terms',
          'Comparability',
          'Trust and credibility',
          'Structured decision data',
        ],
      },
      {
        label: 'What AI does',
        items: ['Evaluates options', 'Compares', 'Weighs criteria', 'Recommends', 'Takes action'],
      },
    ],
    metrics: ['Recommendations', 'Shortlist appearances', 'Assisted conversions'],
    hue: 272,
    href: '/services/local-seo',
    hrefLabel: 'Local SEO',
  },
  {
    abbr: 'SXO',
    name: 'Search Experience Optimization',
    id: 'sxo',
    goal: 'Turn visitors into customers',
    definition:
      'SXO is what happens after the click: speed, clarity, navigation, trust and the shortest honest path from landing on the page to making an enquiry.',
    why: 'Every layer above delivers a visit. Traffic that arrives on a slow, unclear page converts nothing, and the bounce is a signal of its own.',
    columns: [
      {
        label: 'Improve',
        items: [
          'UX and design',
          'Page speed',
          'Navigation',
          'Trust signals',
          'Readability',
          'Calls to action',
          'Conversion rate',
          'Mobile experience',
        ],
      },
      {
        label: 'Outcome',
        items: ['Engagement', 'Leads', 'Sales', 'Revenue'],
      },
    ],
    metrics: ['Engagement', 'Leads', 'Sales', 'Revenue'],
    hue: 288,
    href: '/services/seo-web-design',
    hrefLabel: 'SEO web design',
  },
] as const;

/** The base every layer draws on. The infographic's closing bar. */
export const LAYER_FOUNDATION = {
  title: 'All layers, one foundation',
  items: ['Data', 'Content', 'Entities', 'Authority', 'Trust'],
  note: 'Strong foundations power every layer of visibility and growth.',
} as const;

/** Stable dates for the framework page. Bump when the model itself changes. */
export const SEARCH_LAYERS_PUBLISHED = '2026-09-21T00:00:00.000Z';
export const SEARCH_LAYERS_UPDATED = '2026-09-21T00:00:00.000Z';

/**
 * Questions this page answers in its own words, rendered visibly on it and
 * repeated in `FAQPage`. They exist on no other URL.
 */
export const SEARCH_LAYERS_FAQS: readonly { question: string; answer: string }[] = [
  {
    question: 'Is SEO dead now that AI answers the question?',
    answer:
      'No. Every layer above SEO reads the same index SEO feeds. A page that is not crawlable, indexable or credible is not a candidate for an AI Overview, a citation or a recommendation either. What has changed is that ranking is no longer the last step.',
  },
  {
    question: 'What is the difference between AEO and GEO?',
    answer:
      'AEO targets the answer a search engine assembles on its own results page: featured snippets, AI Overviews, voice answers. GEO targets the answer a generative assistant writes elsewhere, where the win is being cited as a source rather than ranked in a list.',
  },
  {
    question: 'Do I have to work on all six layers at once?',
    answer:
      'No, and you cannot. They stack. Crawlability and indexing come first, answer formatting next, then the original material that earns citations, then the structured facts an assistant compares on, and conversion work runs alongside all of it.',
  },
  {
    question: 'Can anyone guarantee a citation in ChatGPT or an AI Overview?',
    answer:
      'No. No engine exposes a ranking lever and every one of them rewrites its answers continuously. What is controllable is whether your page can be crawled, parsed, quoted and compared. The citation is the engine’s decision.',
  },
  {
    question: 'How do you measure any of this?',
    answer:
      'Per layer. Rankings, indexed pages and organic traffic for SEO. Snippet and AI Overview appearances for AEO. Citations and brand mentions across assistants for GEO. Entity and brand-fact accuracy for AIO. Recommendations and assisted conversions for DEO. Engagement, leads and revenue for SXO.',
  },
] as const;
