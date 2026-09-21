/**
 * The anatomy of a page written for AI search.
 *
 * The classic on-page checklist assumed a person scanning a results page and
 * deciding what to click. This one assumes a language model deciding what to
 * quote, and the two want different things from the same HTML: liftable
 * answers over clever intros, tables over prose, attributable numbers over
 * adjectives, and server-rendered text over anything a crawler has to execute.
 *
 * Twelve notes, each anchored to the part of the document it describes, and a
 * worked example to anchor them to. Two rules govern the example:
 *
 * - It is fiction and says so. The domain is `example.com`, the author is a
 *   placeholder, and every figure in it is labelled illustrative. This site
 *   does not publish invented benchmarks, not even inside a diagram.
 * - There is no perfect page and no score to chase. The notes mark where the
 *   effort pays when a model is the reader, nothing more.
 */

export interface AnatomyNote {
  /** Marker number. Runs top to bottom through the sample document. */
  readonly n: number;
  /** Which gutter the note sits in on wide screens. */
  readonly side: 'left' | 'right';
  /** Mono chip: the element of the page this note is about. */
  readonly badge: string;
  readonly title: string;
  readonly body: string;
}

export const ANATOMY_NOTES: readonly AnatomyNote[] = [
  {
    n: 1,
    side: 'left',
    badge: 'Title / H1 / URL',
    title: 'One page, one intent',
    body: 'The title names the topic and the jobs the page does for the reader. The H1 says the same thing. The URL is short, readable and never changes. All three tell a model what this page is before it reads a line of body copy.',
  },
  {
    n: 2,
    side: 'right',
    badge: 'Crawler access',
    title: 'Let the AI crawlers in',
    body: 'GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and Google-Extended each need an allow rule in robots.txt, and the content has to render on the server. Most AI crawlers do not run JavaScript, so anything drawn client-side is not there as far as they are concerned.',
  },
  {
    n: 3,
    side: 'left',
    badge: 'Answer first',
    title: 'Put the answer above the fold',
    body: 'Open with four to six sentences that answer the query outright. Each one has to survive being lifted out of the page alone, which rules out "as mentioned above" and any pronoun pointing backwards.',
  },
  {
    n: 4,
    side: 'right',
    badge: 'Fan-out coverage',
    title: 'One prompt, many queries',
    body: 'An answer engine splits a single prompt into a fan of related queries before it retrieves anything. Give each one its own H2, phrased the way it would be asked: what it is, how it works, what it costs, how to choose.',
  },
  {
    n: 5,
    side: 'left',
    badge: 'Structured formats',
    title: 'Tables and lists, not prose',
    body: 'Pricing belongs in a table with real headers. A sequence belongs in a numbered list. Self-contained rows parse cleanly and come back quoted; the same facts in a paragraph usually do not come back at all.',
  },
  {
    n: 6,
    side: 'right',
    badge: 'Extractable passages',
    title: 'Chunks that stand on their own',
    body: 'Retrieval pulls a passage, not a page. Lead each section with its answer and explain afterwards, so a paragraph that arrives without the one above it still makes sense.',
  },
  {
    n: 7,
    side: 'left',
    badge: 'Original data',
    title: 'Give it a number worth quoting',
    body: 'Models cite what is concrete, attributed and checkable. One figure you produced, with the sample size, the period and the method attached, is the most linkable thing on the page.',
  },
  {
    n: 8,
    side: 'right',
    badge: 'Non-commodity content',
    title: 'Say what nobody else can',
    body: 'A model already knows the definition and has read the other forty articles on the topic. What it cannot generate is your first-hand finding, your audit, the result that contradicts the consensus.',
  },
  {
    n: 9,
    side: 'left',
    badge: 'FAQ section',
    title: 'Question in, answer out',
    body: 'The format already matches how people prompt. Use the questions that actually arrive from sales calls and support tickets, in the words they arrive in, each answered in two sentences and marked up as FAQPage.',
  },
  {
    n: 10,
    side: 'right',
    badge: 'Schema markup',
    title: 'Say it twice, machine-readably',
    body: 'Article, FAQPage, Dataset for your own research, Organization for the publisher. Structured data restates in parseable form exactly what the visible copy already claims, and never anything it does not.',
  },
  {
    n: 11,
    side: 'left',
    badge: 'Entity and author',
    title: 'Be a thing the web knows',
    body: 'A named author with real credentials, a linked bio, one spelling of the brand everywhere it appears. Models resolve entities across the whole web, which makes off-page consistency an on-page job.',
  },
  {
    n: 12,
    side: 'right',
    badge: 'Freshness signals',
    title: 'Prove it is still true',
    body: 'A visible last-updated date backed by dateModified, figures stamped with when they were measured, and facts that are genuinely current. A stale number is the quickest way to lose a citation you already had.',
  },
] as const;

/**
 * The worked example. Fiction, labelled as fiction: placeholder domain,
 * placeholder author, illustrative figures.
 */
export const SAMPLE_PAGE = {
  label: 'Sample page - illustrative content',
  url: 'example.com/guides/hotel-booking-engines',
  title: 'Hotel Booking Engines: How They Work, What They Cost and How to Choose',
  metaDescription:
    'What a hotel booking engine actually does, what it costs per property, and what separates a system that converts direct bookings from an expensive one.',
  crawlers: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended'],
  crawlerRule: 'Allow: /',
  byline: {
    author: 'Sample Author',
    role: 'Direct booking lead',
    updated: 'Updated 12 September 2026',
    readTime: '9 min read',
  },
  takeaways: [
    'A booking engine takes the reservation on your own domain, so the commission stays with the property.',
    'Pricing is set per room and per property, not by booking volume, on most of the market.',
    'Commission-free does not mean cost-free: the fee moves to a subscription or to the payment provider.',
    'Mobile checkout is where direct bookings are lost, not the room page.',
  ],
  sections: [
    {
      heading: 'What is a hotel booking engine?',
      lead: 'A booking engine is the software that takes a reservation directly on the hotel website: it reads live availability and rates, holds the room, takes payment and writes the booking back to the property management system.',
      chunks: [
        { term: 'Availability', body: 'live room inventory, read from the PMS or channel manager' },
        { term: 'Rate plans', body: 'the prices and conditions a guest can actually book' },
        { term: 'Write-back', body: 'the confirmed reservation, returned to the PMS' },
      ],
    },
    {
      heading: 'How much does a booking engine cost?',
      lead: 'Cost is set per property and per room rather than per booking on most of the market. The table below is illustrative.',
      table: {
        caption: 'Illustrative monthly figures. A sample page, not pricing advice.',
        headers: ['Rooms', 'Entry', 'Mid-market', 'Enterprise'],
        rows: [
          ['Up to 20', 'EUR 49', 'EUR 180', '-'],
          ['21 to 80', 'EUR 215', 'EUR 640', 'EUR 1,100'],
          ['Over 80', '-', 'EUR 1,450', 'EUR 2,400'],
        ],
      },
    },
  ],
  stat: {
    value: '3.1x',
    line: 'the direct-booking rate of properties that finished mobile checkout in three steps rather than five.',
    source: 'Illustrative figure. Sample page, not a real study.',
  },
  differentiator: {
    heading: 'What the comparison tables leave out',
    body: 'Every roundup scores the same feature grid. None of them mentions that rate-parity clauses survive the switch, or that a new payment descriptor takes weeks to stop triggering chargebacks.',
  },
  faqs: [
    {
      q: 'Is a booking engine the same as a channel manager?',
      a: 'No. A channel manager distributes availability to the OTAs. A booking engine takes the reservation on your own site, and the two exchange the same inventory.',
    },
    {
      q: 'How long does implementation take?',
      a: 'Two to six weeks for most properties, and most of that is rate mapping rather than installing anything.',
    },
  ],
  schemaChips: ['Article', 'FAQPage', 'Dataset', 'Organization', 'dateModified'],
  authorNote: 'Author bio with real credentials, linked from the page and consistent with every other profile on the web.',
} as const;

/** The footnote the diagram carries, because the claim matters more than the diagram. */
export const ANATOMY_DISCLAIMER =
  'There is no perfect page and no score to optimize against here. This maps the places the effort pays when the reader is a model deciding what to cite. The example content is illustrative.';

/** Stable dates for the anatomy page. Bump when the notes change. */
export const ANATOMY_PUBLISHED = '2026-09-21T00:00:00.000Z';
export const ANATOMY_UPDATED = '2026-09-21T00:00:00.000Z';

/** Visible on the page, and the only URL these questions are answered on. */
export const ANATOMY_FAQS: readonly { question: string; answer: string }[] = [
  {
    question: 'What is the first thing to fix for AI search?',
    answer:
      'Access. Allow the AI crawlers in robots.txt and render the content on the server. Most of them do not execute JavaScript, so a page that draws its copy client-side is empty as far as they are concerned, and nothing further you do to it matters.',
  },
  {
    question: 'How long should the answer at the top of the page be?',
    answer:
      'Four to six sentences, written so any one of them can be lifted out on its own. That rules out openings that refer back to a previous paragraph, and pronouns whose subject is somewhere above.',
  },
  {
    question: 'Does schema markup make a model cite my page?',
    answer:
      'No. Structured data restates what the visible copy already says in a form a parser can read, which removes ambiguity. It cannot add a claim the page does not make, and marking up content that is not on the page breaks Google’s structured-data policy.',
  },
  {
    question: 'What are fan-out queries?',
    answer:
      'An answer engine expands one prompt into a set of related sub-queries and retrieves against all of them. Covering the whole set on a single page, each with its own question-shaped H2, is what lets one URL satisfy the entire fan-out.',
  },
  {
    question: 'Why does original data matter more than a longer article?',
    answer:
      'A model can already generate the definition and has read every other article on the topic. A figure you produced, with its sample size, period and method attached, is something it cannot get anywhere else, which is what a citation is for.',
  },
] as const;
