/**
 * Working items for the website SEO checklist.
 *
 * Rendered on /en/blog/seo-checklist. The article explains the order; this
 * list is the sheet a reader can tick, download, or print. A referring-domain
 * target is intentionally absent: that number is a planning note, not a check
 * this page can satisfy.
 */

export interface SeoChecklistItem {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
}

export interface SeoChecklistGroup {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly items: readonly SeoChecklistItem[];
}

export const SEO_CHECKLIST_PAGE = "https://anotherseoguru.com/en/blog/seo-checklist";

export const SEO_CHECKLIST: readonly SeoChecklistGroup[] = [
  {
    id: "crawl",
    title: "Crawl and index",
    intro: "Stop here if Google is storing the wrong URL. Copy edits on a non-canonical page do not count.",
    items: [
      {
        id: "host",
        label: "One preferred host",
        detail: "HTTPS, a single www choice, and 301 redirects from the other variants. No redirect chains.",
      },
      {
        id: "robots",
        label: "robots.txt is not blocking the site",
        detail: "CSS, JavaScript, and money URLs are allowed. A leftover Disallow from staging is a fail.",
      },
      {
        id: "noindex",
        label: "No accidental noindex",
        detail: "Important URLs return 200 and do not carry noindex from a staging plugin or a template default.",
      },
      {
        id: "canonical",
        label: "Self-referencing canonicals",
        detail: "Each indexable URL points at itself. Faceted or parameter URLs point at the canonical, or they are not indexed.",
      },
      {
        id: "sitemap",
        label: "Sitemap lists canonical URLs only",
        detail: "Submitted in Search Console. No noindex URLs, no redirects, no duplicates.",
      },
      {
        id: "coverage",
        label: "Money pages are indexed",
        detail: "URL Inspection shows the canonical you chose. A pile of 'Discovered - currently not indexed' on commercial URLs is unfinished.",
      },
    ],
  },
  {
    id: "on-page",
    title: "On-page",
    intro: "One URL, one intent. If two queries need different pages, split them before you rewrite.",
    items: [
      {
        id: "intent",
        label: "One primary query, matching the results",
        detail: "Read the current results for that query. Your page should do the same job: answer, compare, or sell.",
      },
      {
        id: "title",
        label: "Title states the topic near the front",
        detail: "Unique on the site, readable in the result, and not stuffed. Check the rendered title, not only the CMS field.",
      },
      {
        id: "h1",
        label: "One H1 that agrees with the title",
        detail: "The H1 can be more human than the title. It should not introduce a second topic.",
      },
      {
        id: "opening",
        label: "The first screen answers the query",
        detail: "Definition, offer, or outcome appears before the company story.",
      },
      {
        id: "description",
        label: "Meta description matches the page",
        detail: "Written to earn the click. It does not repeat the title, and it does not promise something the page lacks.",
      },
      {
        id: "headings",
        label: "Headings are real sections",
        detail: "H2s cover the next questions a reader has. They are not a keyword list with no text under them.",
      },
      {
        id: "media",
        label: "Images carry the page, they do not replace it",
        detail: "Descriptive alt text on informational images. Text that matters is in HTML, not only inside a picture.",
      },
    ],
  },
  {
    id: "content",
    title: "Content",
    intro: "Specific beats long. A price, a process, a comparison, or a local fact is evidence. A slogan is not.",
    items: [
      {
        id: "questions",
        label: "The page answers the follow-up questions",
        detail: "Pricing, timing, who it is for, and how it differs from the alternative, when those are part of the query.",
      },
      {
        id: "proof",
        label: "Claims can be checked",
        detail: "Dates, figures, and examples are on the page. Schema repeats visible facts and does not invent FAQs.",
      },
      {
        id: "overlap",
        label: "No two URLs fight for the same intent",
        detail: "Overlapping service pages or a blog post that copies a money page are merged or given different jobs.",
      },
    ],
  },
  {
    id: "speed",
    title: "Templates and speed",
    intro: "Measure the templates that carry commercial URLs. A fast blog post does not fix a slow service template.",
    items: [
      {
        id: "lcp",
        label: "Largest Contentful Paint on key templates",
        detail: "Check mobile. Hero images, fonts, and server time are the usual causes when it is slow.",
      },
      {
        id: "inp",
        label: "Interaction to Next Paint on interactive templates",
        detail: "Menus, filters, and forms. A page that feels stuck after a tap fails this even if it loads quickly.",
      },
      {
        id: "cls",
        label: "Layout stays still",
        detail: "Images have dimensions. Late banners and web fonts do not push the content down after paint.",
      },
      {
        id: "html",
        label: "Important text is in the initial HTML",
        detail: "Titles, prices, and the main answer are not painted only by client-side JavaScript.",
      },
    ],
  },
  {
    id: "links",
    title: "Internal links",
    intro: "Discovery and relevance. External links come after these, not instead of them.",
    items: [
      {
        id: "orphans",
        label: "Money pages are not orphans",
        detail: "Each commercial URL has inlinks from a relevant hub, not only from the XML sitemap.",
      },
      {
        id: "support",
        label: "Guides point at the page they support",
        detail: "A blog post links to the service, location, or product it explains. Dead-end articles waste the visit.",
      },
      {
        id: "anchors",
        label: "Anchors describe the destination",
        detail: "Varied, readable phrases. The same exact-match anchor on every page is a fail.",
      },
      {
        id: "nav",
        label: "Global nav is reserved for primary paths",
        detail: "The footer does not list every URL. If everything is persistent, nothing is prioritised.",
      },
    ],
  },
  {
    id: "local",
    title: "Local",
    intro: "Skip this group if customers do not search for a place. The map pack is a different result from the blue links.",
    items: [
      {
        id: "gbp",
        label: "Google Business Profile is verified",
        detail: "The primary category matches what you sell. The profile is not a duplicate of an old listing.",
      },
      {
        id: "nap",
        label: "Name, address, and phone match the website",
        detail: "The same string on the profile, the footer, and the contact page. No old phone number left in schema.",
      },
      {
        id: "location-pages",
        label: "Location pages describe that place",
        detail: "Service area, proof, and useful detail. A city name swapped into one template is not a location page.",
      },
    ],
  },
  {
    id: "measure",
    title: "Measurement",
    intro: "Without this, the ticks above are a to-do list you cannot score.",
    items: [
      {
        id: "gsc",
        label: "Search Console uses the canonical host",
        detail: "The property matches the URL you want indexed. Data from an old http or www variant is the wrong report.",
      },
      {
        id: "striking",
        label: "Queries in positions 4 to 20 are listed",
        detail: "Those are the pages to improve next. Note the URL that already ranks, so you do not publish a rival.",
      },
      {
        id: "rerun",
        label: "The list is rerun after structural change",
        detail: "Redesign, migration, or a new SEO plugin. Canonicals, redirects, and headings are the first things that break.",
      },
    ],
  },
];

export function allChecklistIds(): readonly string[] {
  return SEO_CHECKLIST.flatMap((group) => group.items.map((item) => item.id));
}
