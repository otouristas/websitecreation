import type { ComponentType } from "react";
import {
  FileText,
  Settings,
  Link2,
  Search,
  BarChart3,
  Star,
  MapPin,
  BookOpen,
  Gauge,
  RefreshCw,
  Bot,
  Wrench,
} from "lucide-react";

export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  fullDefinition: string;
  example?: string;
  technique?: string;
  proTip?: string;
  relatedTerms?: string[];
  relatedLinks?: { title: string; url: string; type: "feature" | "tool" | "blog" | "help" }[];
}

export interface GlossaryCategory {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  terms: GlossaryTerm[];
}

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "on-page-seo",
    title: "On-Page SEO",
    description: "Optimization techniques applied directly on web pages",
    icon: FileText,
    color: "blue",
    terms: [
      {
        id: "title-tag",
        term: "Title Tag",
        shortDefinition: "HTML element specifying a page's title for search results and browser tabs.",
        fullDefinition: "The title tag is an HTML element that defines the title of a web page. It appears in search engine results as the clickable headline and in browser tabs. Title tags are one of the most important on-page SEO factors.",
        example: "<title>Best Running Shoes 2025 | Expert Reviews & Buying Guide</title>",
        technique: "Keep titles 50-60 characters, include primary keyword near the beginning, add brand name at the end with a pipe separator, make it compelling to improve CTR.",
        proTip: "Use unique titles for every page. Duplicate titles confuse search engines about which page to rank.",
        relatedTerms: ["meta-description", "serp", "ctr"],
        relatedLinks: [
          { title: "Meta Tags Generator", url: "/free-tools/meta-tags-generator", type: "tool" },
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "meta-description",
        term: "Meta Description",
        shortDefinition: "HTML attribute providing a brief summary of page content for search results.",
        fullDefinition: "A meta description is an HTML attribute that provides a concise summary of a web page's content. While not a direct ranking factor, it significantly impacts click-through rates as it appears as the snippet text under the title in search results.",
        example: "<meta name=\"description\" content=\"Compare the top 10 running shoes of 2025. Expert reviews, price comparisons, and buying tips to help you find your perfect pair.\">",
        technique: "Write 150-160 characters, include primary keyword naturally, add a call-to-action, make it unique per page, and match search intent.",
        proTip: "If Google rewrites your meta description, it means the original didn't match user intent well enough.",
        relatedTerms: ["title-tag", "ctr", "serp"],
        relatedLinks: [
          { title: "Meta Description Generator", url: "/free-tools/meta-description-generator", type: "tool" },
          { title: "Meta Tags Generator", url: "/free-tools/meta-tags-generator", type: "tool" }
        ]
      },
      {
        id: "h1-tag",
        term: "H1 Tag",
        shortDefinition: "The main heading tag in HTML, typically used for the primary page title.",
        fullDefinition: "The H1 tag is the highest-level heading in HTML and should represent the main topic of your page. It helps search engines understand page content hierarchy and is crucial for accessibility.",
        example: "<h1>Complete Guide to Running Shoes: How to Choose the Right Pair</h1>",
        technique: "Use exactly one H1 per page, include your primary keyword, make it descriptive and different from your title tag, place it near the top of your content.",
        proTip: "Your H1 should answer: 'What is this page about?' in a way that matches user search intent.",
        relatedTerms: ["heading-structure", "content-optimization", "semantic-html"],
        relatedLinks: [
          { title: "Heading Analyzer", url: "/free-tools/heading-analyzer", type: "tool" }
        ]
      },
      {
        id: "heading-structure",
        term: "Heading Structure",
        shortDefinition: "The hierarchical organization of H1-H6 tags to structure page content.",
        fullDefinition: "Heading structure refers to the logical hierarchy of headings (H1 through H6) used to organize content. Proper heading structure improves readability, accessibility, and helps search engines understand content relationships.",
        example: "H1: Guide to SEO → H2: On-Page SEO → H3: Title Tags → H2: Off-Page SEO → H3: Link Building",
        technique: "Follow a logical hierarchy (never skip levels), use H2s for main sections, H3s for subsections. Include keywords naturally but prioritize readability.",
        proTip: "Create a heading outline before writing content. It serves as your content roadmap and ensures logical flow.",
        relatedTerms: ["h1-tag", "semantic-html", "content-optimization"],
        relatedLinks: [
          { title: "Heading Analyzer", url: "/free-tools/heading-analyzer", type: "tool" }
        ]
      },
      {
        id: "keyword-density",
        term: "Keyword Density",
        shortDefinition: "The percentage of times a keyword appears compared to total word count.",
        fullDefinition: "Keyword density is the ratio of a target keyword's frequency to total words on a page, expressed as a percentage. While once important, modern SEO focuses more on natural language and semantic relevance than specific density targets.",
        example: "If 'running shoes' appears 10 times in a 1,000-word article, the keyword density is 1%.",
        technique: "Aim for 1-2% naturally, but focus on synonyms and related terms. Use your keyword in the first 100 words, in headings, and in the conclusion.",
        proTip: "If you have to force keywords in, you're overdoing it. Write for humans first, search engines second.",
        relatedTerms: ["keyword-stuffing", "lsi-keywords", "semantic-seo"],
        relatedLinks: [
          { title: "Keyword Density Checker", url: "/free-tools/keyword-density-checker", type: "tool" },
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" }
        ]
      },
      {
        id: "image-alt-text",
        term: "Image Alt Text",
        shortDefinition: "Descriptive text attribute for images that helps search engines and screen readers.",
        fullDefinition: "Alt text (alternative text) is an HTML attribute that describes the contents of an image. It serves three purposes: accessibility for visually impaired users, context for search engines, and fallback text when images fail to load.",
        example: "<img src=\"nike-air-max.jpg\" alt=\"Nike Air Max 2025 running shoes in black and white colorway\">",
        technique: "Be descriptive and specific, include relevant keywords naturally, keep it under 125 characters, don't start with 'image of' or 'picture of'.",
        proTip: "Decorative images can use empty alt attributes (alt=\"\"). Don't describe images that don't add informational value.",
        relatedTerms: ["image-seo", "accessibility", "technical-seo"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "internal-linking",
        term: "Internal Linking",
        shortDefinition: "Hyperlinks connecting pages within the same website.",
        fullDefinition: "Internal linking is the practice of creating hyperlinks between pages on the same domain. It distributes page authority, helps users navigate, and enables search engines to discover and understand site structure and content relationships.",
        example: "A blog post about 'running techniques' links to your 'best running shoes' guide using descriptive anchor text.",
        technique: "Use descriptive anchor text, link from high-authority pages to important pages, create topic clusters, add contextual links within content, maintain a shallow site architecture.",
        proTip: "Audit your orphan pages regularly. Pages with no internal links pointing to them are hard for search engines to find and rank.",
        relatedTerms: ["anchor-text", "link-equity", "site-architecture", "topic-clusters"],
        relatedLinks: [
          { title: "Internal Linking at Scale", url: "/blog/internal-linking-scale", type: "blog" }
        ]
      },
      {
        id: "content-optimization",
        term: "Content Optimization",
        shortDefinition: "The process of improving content to rank better and satisfy user intent.",
        fullDefinition: "Content optimization involves enhancing web content to improve search rankings, user engagement, and conversions. It includes keyword integration, readability improvements, multimedia addition, and ensuring content fully addresses user queries.",
        example: "Updating an old blog post with current statistics, adding an FAQ section, embedding relevant videos, and improving readability scores.",
        technique: "Cover topics comprehensively (10x content), answer related questions, use structured data, optimize for featured snippets, update content regularly.",
        proTip: "Use the 'People Also Ask' boxes and related searches as inspiration for content sections and FAQs.",
        relatedTerms: ["content-freshness", "search-intent", "e-e-a-t"],
        relatedLinks: [
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" },
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Website infrastructure optimization for search engine crawling and indexing",
    icon: Settings,
    color: "purple",
    terms: [
      {
        id: "crawling",
        term: "Crawling",
        shortDefinition: "The process by which search engine bots discover and read web pages.",
        fullDefinition: "Crawling is the process where search engine bots (like Googlebot) systematically browse the web to discover new and updated content. Bots follow links, read content, and send data back to be indexed.",
        example: "Googlebot discovers your new blog post by following an internal link from your homepage, then reads and stores the content.",
        technique: "Ensure a clear site structure, submit an XML sitemap, use internal linking, avoid crawl traps (infinite calendars, faceted navigation), and monitor crawl stats in GSC.",
        proTip: "Check Server Logs to see exactly what Googlebot is crawling. GSC's crawl stats only show aggregates.",
        relatedTerms: ["indexing", "robots-txt", "xml-sitemap", "crawl-budget"],
        relatedLinks: [
          { title: "Log File SEO Guide", url: "/blog/log-file-seo-guide", type: "blog" },
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "indexing",
        term: "Indexing",
        shortDefinition: "The process of storing and organizing crawled pages in search engine databases.",
        fullDefinition: "After crawling, search engines process and store page content in their index (a massive database). Only indexed pages can appear in search results. Indexing involves analyzing content, understanding topics, and determining relevance.",
        example: "After Googlebot crawls your page, it gets processed and added to Google's index within hours to weeks, depending on site authority.",
        technique: "Use the URL Inspection tool in GSC to check indexing status, request indexing for important pages, avoid duplicate content, and ensure pages are crawlable.",
        proTip: "A page being crawled doesn't guarantee indexing. Low-quality or duplicate content may be crawled but not indexed.",
        relatedTerms: ["crawling", "de-indexing", "index-bloat", "canonical-tag"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "robots-txt",
        term: "Robots.txt",
        shortDefinition: "A file that instructs search engine crawlers which pages to crawl or avoid.",
        fullDefinition: "Robots.txt is a text file placed in your site's root directory that tells search engine crawlers which URLs they can and cannot access. It's used to manage crawl budget and prevent indexing of certain content.",
        example: "User-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: /public/\nSitemap: https://example.com/sitemap.xml",
        technique: "Block admin pages, staging environments, search results pages, and low-value filter/sort URLs. Always allow CSS/JS files. Include sitemap location.",
        proTip: "Robots.txt blocks crawling, not indexing. If pages have external links pointing to them, they can still appear in search results.",
        relatedTerms: ["crawling", "noindex", "crawl-budget"],
        relatedLinks: [
          { title: "Robots.txt Generator", url: "/free-tools/robots-txt-generator", type: "tool" }
        ]
      },
      {
        id: "xml-sitemap",
        term: "XML Sitemap",
        shortDefinition: "A file listing important URLs to help search engines discover and crawl content.",
        fullDefinition: "An XML sitemap is a structured file that lists the URLs on your website you want search engines to crawl and index. It includes metadata like last modification date, change frequency, and priority.",
        example: "<?xml version=\"1.0\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>https://example.com/page</loc>\n    <lastmod>2025-01-15</lastmod>\n  </url>\n</urlset>",
        technique: "Include only indexable pages, keep under 50MB or 50,000 URLs, update lastmod only when content changes, submit to GSC, and split large sitemaps.",
        proTip: "Monitor 'Sitemap' report in GSC. If submitted URLs don't match indexed URLs, investigate why pages are being excluded.",
        relatedTerms: ["crawling", "indexing", "robots-txt"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "canonical-tag",
        term: "Canonical Tag",
        shortDefinition: "HTML element that specifies the preferred version of a page to avoid duplicate content.",
        fullDefinition: "A canonical tag (rel=\"canonical\") is an HTML element that tells search engines which URL is the 'master' version when multiple pages have similar or identical content. It consolidates ranking signals to the preferred URL.",
        example: "<link rel=\"canonical\" href=\"https://www.example.com/products/shoes\" />",
        technique: "Self-reference canonicals on every page, point duplicates to the original, use absolute URLs, ensure canonical pages are indexable and match the content.",
        proTip: "Check that your canonical points to the version you want to rank (https vs http, www vs non-www, with/without trailing slash).",
        relatedTerms: ["duplicate-content", "indexing", "url-normalization"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "structured-data",
        term: "Structured Data (Schema)",
        shortDefinition: "Code markup that helps search engines understand page content and enables rich results.",
        fullDefinition: "Structured data is a standardized format (typically JSON-LD) for providing explicit information about a page's content. It helps search engines understand entities, relationships, and can trigger rich results like stars, FAQs, and product info in SERPs.",
        example: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\",\n  \"headline\": \"SEO Guide\",\n  \"author\": {\"@type\": \"Person\", \"name\": \"John Doe\"}\n}",
        technique: "Use JSON-LD format, validate with Google's Rich Results Test, implement relevant schema types (Article, Product, FAQ, HowTo), avoid spammy markup.",
        proTip: "Not all schema types trigger rich results. Focus on types Google explicitly supports and documents.",
        relatedTerms: ["rich-snippets", "serp-features", "json-ld"],
        relatedLinks: [
          { title: "Schema Generator", url: "/free-tools/schema-generator", type: "tool" }
        ]
      },
      {
        id: "https",
        term: "HTTPS",
        shortDefinition: "Secure version of HTTP that encrypts data between browser and server.",
        fullDefinition: "HTTPS (Hypertext Transfer Protocol Secure) encrypts data transmitted between a user's browser and your web server. It's a confirmed Google ranking factor and essential for user trust, especially for sites handling sensitive information.",
        example: "https://www.example.com (secure) vs http://www.example.com (not secure)",
        technique: "Get an SSL certificate (free via Let's Encrypt), redirect all HTTP to HTTPS, update internal links, update sitemap and canonical tags, check for mixed content.",
        proTip: "After migrating to HTTPS, monitor GSC for both versions for a few months to catch any issues.",
        relatedTerms: ["ssl-certificate", "site-security", "migration"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "hreflang",
        term: "Hreflang",
        shortDefinition: "HTML attribute that specifies language and regional targeting for international pages.",
        fullDefinition: "Hreflang is an HTML attribute that tells search engines which language and regional version of a page to show users based on their location and language preferences. Essential for international and multilingual websites.",
        example: "<link rel=\"alternate\" hreflang=\"en-us\" href=\"https://example.com/en-us/page\" />\n<link rel=\"alternate\" hreflang=\"es\" href=\"https://example.com/es/page\" />",
        technique: "Include self-referencing hreflang, ensure bidirectional references, use correct language/region codes, implement via HTML head, HTTP headers, or sitemap.",
        proTip: "Always include an x-default hreflang for users who don't match any specified language/region combination.",
        relatedTerms: ["international-seo", "geo-targeting", "language-targeting"],
        relatedLinks: [
          { title: "Hreflang Guide", url: "/blog/hreflang-guide", type: "blog" },
          { title: "Hreflang Builder", url: "/free-tools/hreflang-builder", type: "tool" }
        ]
      },
      {
        id: "page-speed",
        term: "Page Speed",
        shortDefinition: "How fast a web page loads, affecting user experience and search rankings.",
        fullDefinition: "Page speed measures how quickly the content on a URL loads. It's a ranking factor for both desktop and mobile search, and significantly impacts user experience, bounce rates, and conversions.",
        example: "A page with 2-second load time typically has 9% bounce rate; a 5-second load time increases bounce to 38%.",
        technique: "Optimize images (WebP format, lazy loading), minify CSS/JS, enable compression, use CDN, reduce server response time, eliminate render-blocking resources.",
        proTip: "Focus on perceived performance. Users care about when they can interact with content, not just when everything finishes loading.",
        relatedTerms: ["core-web-vitals", "lcp", "fid", "cls"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "mobile-first-indexing",
        term: "Mobile-First Indexing",
        shortDefinition: "Google's practice of using the mobile version of a site for indexing and ranking.",
        fullDefinition: "Mobile-first indexing means Google predominantly uses the mobile version of content for indexing and ranking. This reflects how most users now access the web via mobile devices.",
        example: "If your mobile site has less content than desktop, Google will only see and index the mobile content, potentially hurting rankings.",
        technique: "Ensure mobile and desktop have the same content, use responsive design, check mobile usability in GSC, test with Mobile-Friendly Test tool.",
        proTip: "Check the User-Agent string in your server logs. If you see 'Googlebot-Mobile', that's what's indexing your site.",
        relatedTerms: ["responsive-design", "mobile-usability", "page-speed"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "link-building",
    title: "Link Building",
    description: "Strategies for acquiring quality backlinks from other websites",
    icon: Link2,
    color: "green",
    terms: [
      {
        id: "backlink",
        term: "Backlink",
        shortDefinition: "A link from one website to another, signaling trust and authority.",
        fullDefinition: "A backlink (also called inbound link or incoming link) is a hyperlink from one website to another. Search engines view backlinks as votes of confidence, using them as a key ranking factor to determine page authority and relevance.",
        example: "A tech blog linking to your software review: '<a href=\"https://yoursite.com/review\">Check out this detailed review</a>'",
        technique: "Focus on earning links from high-authority, relevant sites. Create linkable assets (studies, tools, guides), do outreach, guest post strategically, and build relationships in your niche.",
        proTip: "One link from a high-authority site in your niche is worth more than 100 links from random low-quality sites.",
        relatedTerms: ["anchor-text", "domain-authority", "link-equity", "dofollow"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" },
          { title: "Link Velocity Tracker", url: "/features/link-velocity-tracker", type: "feature" }
        ]
      },
      {
        id: "anchor-text",
        term: "Anchor Text",
        shortDefinition: "The visible, clickable text in a hyperlink.",
        fullDefinition: "Anchor text is the visible, clickable text of a hyperlink that provides context about the linked page's content. Search engines use anchor text to understand what the destination page is about.",
        example: "In 'Read our <a href=\"/guide\">complete SEO guide</a>', the anchor text is 'complete SEO guide'.",
        technique: "Use varied, natural anchor text. Mix branded, exact-match, partial-match, and generic anchors. Avoid over-optimized anchor text which looks manipulative.",
        proTip: "An unnatural anchor text profile (too many exact-match keywords) is a red flag for Google's spam algorithms.",
        relatedTerms: ["backlink", "internal-linking", "link-building"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "domain-authority",
        term: "Domain Authority (DA)",
        shortDefinition: "A metric predicting a website's ability to rank, based on its backlink profile.",
        fullDefinition: "Domain Authority is a search engine ranking score (developed by Moz) that predicts how likely a website is to rank in search results. It's calculated based on the quantity and quality of backlinks, scored from 1-100.",
        example: "Wikipedia has DA 100, while a new blog might have DA 10-20. Higher DA sites pass more value when linking to you.",
        technique: "Build DA by earning quality backlinks, creating valuable content, and maintaining a clean link profile. Focus on your niche authority rather than raw DA numbers.",
        proTip: "DA is a third-party metric, not a Google ranking factor. Use it comparatively within your niche, not as an absolute target.",
        relatedTerms: ["page-authority", "backlink", "link-equity"],
        relatedLinks: [
          { title: "Competitor Analysis", url: "/features/competitor-analysis", type: "feature" }
        ]
      },
      {
        id: "link-equity",
        term: "Link Equity (Link Juice)",
        shortDefinition: "The ranking value passed from one page to another through hyperlinks.",
        fullDefinition: "Link equity (colloquially 'link juice') refers to the value and authority that a hyperlink passes from one page to another. Factors affecting link equity include the linking page's authority, relevance, link placement, and anchor text.",
        example: "A dofollow link from a high-authority homepage passes more equity than a nofollow link buried in a footer.",
        technique: "Earn links from high-authority pages, ensure links are dofollow, get contextual links (within content), and build relevance between linking and linked pages.",
        proTip: "Links from pages with fewer outbound links pass more equity per link. A page linking to 3 sites passes more per link than one linking to 100.",
        relatedTerms: ["backlink", "dofollow", "nofollow", "pagerank"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "dofollow",
        term: "Dofollow Link",
        shortDefinition: "A link that passes SEO value and authority to the destination page.",
        fullDefinition: "A dofollow link is a hyperlink that allows search engine crawlers to follow it and pass link equity (ranking value) to the linked page. By default, all links are dofollow unless specified otherwise.",
        example: "A standard HTML link: <a href=\"https://example.com\">Link Text</a> (dofollow by default)",
        technique: "Prioritize earning dofollow links from authoritative sites, but maintain a natural link profile that includes nofollow links too (from social media, forums, etc.).",
        proTip: "A healthy backlink profile has a mix of dofollow and nofollow links. 100% dofollow looks unnatural.",
        relatedTerms: ["nofollow", "link-equity", "backlink"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "nofollow",
        term: "Nofollow Link",
        shortDefinition: "A link with an attribute telling search engines not to pass ranking value.",
        fullDefinition: "A nofollow link includes the rel='nofollow' attribute, which tells search engines not to follow the link or pass link equity. Commonly used for paid links, user-generated content, and untrusted sources.",
        example: "<a href=\"https://example.com\" rel=\"nofollow\">Sponsored Link</a>",
        technique: "Use nofollow for: paid/sponsored links, user-generated content (comments, forums), affiliate links, and any links you don't want to vouch for.",
        proTip: "Google treats nofollow as a 'hint' rather than a directive. They may choose to follow and count nofollow links if deemed valuable.",
        relatedTerms: ["dofollow", "sponsored-attribute", "ugc-attribute", "backlink"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "link-building-outreach",
        term: "Link Building Outreach",
        shortDefinition: "The process of contacting website owners to request backlinks.",
        fullDefinition: "Link building outreach involves identifying relevant websites and reaching out to their owners or editors to request backlinks. Successful outreach requires personalization, value proposition, and relationship building.",
        example: "Emailing a blogger: 'I noticed your article on X topic. We just published a comprehensive study that your readers might find valuable...'",
        technique: "Personalize every email, offer value (not just ask), target relevant sites, follow up strategically, build relationships before asking, use tools to find contact info.",
        proTip: "Focus on building relationships, not transactions. The best links come from genuine connections in your industry.",
        relatedTerms: ["guest-posting", "broken-link-building", "skyscraper-technique"],
        relatedLinks: [
          { title: "Outreach Autopilot", url: "/features/outreach-autopilot", type: "feature" }
        ]
      },
      {
        id: "toxic-backlinks",
        term: "Toxic Backlinks",
        shortDefinition: "Low-quality or spammy links that can harm your search rankings.",
        fullDefinition: "Toxic backlinks are links from low-quality, spammy, or irrelevant websites that can negatively impact your SEO. They may be the result of negative SEO attacks, poor link building practices, or link schemes.",
        example: "Links from PBNs (private blog networks), link farms, adult sites, gambling sites (if unrelated), and sites with malware.",
        technique: "Regularly audit your backlink profile, identify toxic links using SEO tools, try to get them removed via outreach, and disavow as a last resort.",
        proTip: "Don't panic about every low-quality link. Google usually ignores them. Only disavow if you have a manual penalty or obvious negative SEO attack.",
        relatedTerms: ["disavow-tool", "link-audit", "negative-seo"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "keyword-research",
    title: "Keyword Research",
    description: "Finding and analyzing search terms to target for SEO",
    icon: Search,
    color: "orange",
    terms: [
      {
        id: "keywords",
        term: "Keywords",
        shortDefinition: "Words or phrases users type into search engines to find information.",
        fullDefinition: "Keywords are the terms and phrases that users enter into search engines when looking for information, products, or services. They form the foundation of SEO strategy, connecting user intent with your content.",
        example: "'best running shoes for beginners', 'how to train for a marathon', 'Nike Air Max reviews'",
        technique: "Start with seed keywords, expand using research tools, analyze competitor keywords, consider search intent, and organize into topic clusters.",
        proTip: "Don't just chase high-volume keywords. Focus on keywords that match your content's purpose and your audience's needs.",
        relatedTerms: ["long-tail-keywords", "search-intent", "keyword-difficulty", "search-volume"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" },
          { title: "Keyword Clustering Tool", url: "/free-tools/keyword-clustering", type: "tool" }
        ]
      },
      {
        id: "long-tail-keywords",
        term: "Long-tail Keywords",
        shortDefinition: "Longer, more specific keyword phrases with lower volume but higher intent.",
        fullDefinition: "Long-tail keywords are longer, more specific search phrases (typically 3+ words) that have lower search volume but often higher conversion rates. They represent more specific user intent and face less competition.",
        example: "'best waterproof running shoes for flat feet' vs the short-tail 'running shoes'",
        technique: "Find long-tail variations using 'People Also Ask', related searches, forums, and keyword tools. Target them in specific content pieces and FAQ sections.",
        proTip: "Long-tail keywords often make up 70% of all searches. They're easier to rank for and convert better because of specific intent.",
        relatedTerms: ["keywords", "search-intent", "keyword-difficulty"],
        relatedLinks: [
          { title: "Keyword Clustering Guide", url: "/help/keyword-clustering-guide", type: "help" },
          { title: "PAA Extractor", url: "/free-tools/paa-extractor", type: "tool" }
        ]
      },
      {
        id: "search-volume",
        term: "Search Volume",
        shortDefinition: "The number of times a keyword is searched in a given timeframe.",
        fullDefinition: "Search volume represents the average number of times a keyword is searched per month. It's a key metric for understanding keyword potential and prioritizing which terms to target in your SEO strategy.",
        example: "'SEO' might have 100K monthly searches, while 'local SEO for dentists' might have 500.",
        technique: "Balance volume with competition and intent. High volume means more potential traffic but often more competition. Cross-reference with keyword difficulty.",
        proTip: "Search volume is an estimate, not exact data. Use it for comparison between keywords rather than absolute planning.",
        relatedTerms: ["keyword-difficulty", "keywords", "ctr"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      },
      {
        id: "keyword-difficulty",
        term: "Keyword Difficulty",
        shortDefinition: "A metric estimating how hard it is to rank for a specific keyword.",
        fullDefinition: "Keyword difficulty (KD) is a score that estimates how challenging it would be to rank on the first page of search results for a given keyword. It's typically based on the authority and backlink profiles of currently ranking pages.",
        example: "KD 10 = Easy (new sites can rank), KD 50 = Moderate, KD 80+ = Very hard (requires high authority)",
        technique: "For new sites, target KD under 30. Build authority over time to compete for harder keywords. Always verify by manually checking who's currently ranking.",
        proTip: "Don't rely solely on KD scores. Manually analyze the SERP—sometimes 'high difficulty' keywords have weak competitors you can beat with better content.",
        relatedTerms: ["search-volume", "serp-analysis", "domain-authority"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" },
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "search-intent",
        term: "Search Intent",
        shortDefinition: "The underlying goal a user has when typing a search query.",
        fullDefinition: "Search intent (also called user intent or query intent) refers to the purpose behind a search query. Understanding intent is crucial for creating content that satisfies users and ranks well. The four main types are informational, navigational, commercial, and transactional.",
        example: "Informational: 'how to tie running shoes'. Transactional: 'buy Nike Air Max'. Commercial: 'best running shoes 2025'. Navigational: 'Nike official site'",
        technique: "Analyze the current SERP to understand what Google thinks the intent is. Match your content format (guide, product page, comparison, etc.) to the intent.",
        proTip: "If your content doesn't match search intent, you won't rank—no matter how good it is. Always check the SERP before creating content.",
        relatedTerms: ["keywords", "serp-analysis", "content-optimization"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      },
      {
        id: "keyword-cannibalization",
        term: "Keyword Cannibalization",
        shortDefinition: "When multiple pages on your site compete for the same keyword.",
        fullDefinition: "Keyword cannibalization occurs when multiple pages on the same website target the same or very similar keywords, causing them to compete against each other in search results. This can dilute ranking signals and confuse search engines.",
        example: "Having '/best-running-shoes' and '/top-running-shoes-2025' both targeting 'best running shoes' causes cannibalization.",
        technique: "Audit your content for overlapping keywords, consolidate similar pages into one comprehensive piece, use canonical tags, or differentiate content focus.",
        proTip: "Use GSC to identify cannibalization: if multiple URLs rank for the same query and swap positions, you likely have cannibalization.",
        relatedTerms: ["content-consolidation", "canonical-tag", "site-architecture"],
        relatedLinks: [
          { title: "Cannibalization Doctor", url: "/features/cannibalization-doctor", type: "feature" }
        ]
      },
      {
        id: "keyword-clustering",
        term: "Keyword Clustering",
        shortDefinition: "Grouping related keywords to target with a single piece of content.",
        fullDefinition: "Keyword clustering is the practice of grouping semantically related keywords that share the same search intent. Instead of creating separate pages for each keyword, you target a cluster of related terms with one comprehensive piece of content.",
        example: "Clustering 'running shoes for beginners', 'best first running shoes', 'starter running sneakers' into one guide targeting all three.",
        technique: "Use SERP overlap analysis to group keywords (if 3+ same URLs rank for two keywords, they belong together). Create pillar content for clusters.",
        proTip: "Clustering prevents cannibalization and creates more authoritative content. One great page > five thin pages targeting similar keywords.",
        relatedTerms: ["topic-clusters", "semantic-seo", "pillar-content"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" },
          { title: "Keyword Clustering Tool", url: "/free-tools/keyword-clustering", type: "tool" },
          { title: "Keyword Clustering Guide", url: "/help/keyword-clustering-guide", type: "help" }
        ]
      },
      {
        id: "seed-keywords",
        term: "Seed Keywords",
        shortDefinition: "Starting keywords used to generate broader keyword lists.",
        fullDefinition: "Seed keywords are the foundational terms that represent your core topics, products, or services. They serve as starting points for keyword research, from which you expand to find related terms, long-tail variations, and question-based queries.",
        example: "For a running shoe store: seed keywords might be 'running shoes', 'athletic footwear', 'trail running'",
        technique: "Brainstorm core topics, check competitor home/category pages, use GSC data for existing queries, think about how customers describe your products/services.",
        proTip: "Don't overthink seed keywords. Start broad and let research tools reveal the opportunities. The goal is to discover keywords you didn't think of.",
        relatedTerms: ["keyword-research", "keyword-expansion", "competitor-analysis"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "analytics-metrics",
    title: "Analytics & Metrics",
    description: "Key performance indicators and measurements for SEO success",
    icon: BarChart3,
    color: "cyan",
    terms: [
      {
        id: "clicks",
        term: "Clicks",
        shortDefinition: "The number of times users click on your search result to visit your page.",
        fullDefinition: "In SEO, clicks represent the number of times users clicked on your website's listing in search results. It's a direct measure of how effective your titles and descriptions are at attracting visitors from search.",
        example: "Your page appeared 10,000 times in search results (impressions) and received 500 clicks = 5% CTR",
        technique: "Improve clicks by optimizing title tags for appeal, writing compelling meta descriptions, using structured data for rich snippets, and matching search intent.",
        proTip: "Track clicks alongside position. If you rank #1 but have low clicks, your title/description needs work. If you rank #5 with high clicks, you're doing something right.",
        relatedTerms: ["impressions", "ctr", "serp"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "impressions",
        term: "Impressions",
        shortDefinition: "The number of times your page appeared in search results.",
        fullDefinition: "Impressions count how many times any URL from your site appeared in search results viewed by a user. An impression is counted when your URL appears in search results, whether or not the user scrolls to see it.",
        example: "If your page shows on page 1 for 'running shoes' and that query is searched 10,000 times, you could get up to 10,000 impressions.",
        technique: "Increase impressions by targeting more keywords, improving rankings for existing keywords, expanding to new content topics, and fixing indexing issues.",
        proTip: "High impressions with low clicks? Your rankings might be lower positions (7-10) or your titles aren't compelling. Low impressions but you're indexed? You might need more content or better keyword targeting.",
        relatedTerms: ["clicks", "ctr", "average-position"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "ctr",
        term: "CTR (Click-Through Rate)",
        shortDefinition: "The percentage of impressions that resulted in clicks.",
        fullDefinition: "Click-through rate (CTR) is the ratio of clicks to impressions, expressed as a percentage. It measures how often people who see your listing in search results actually click through to your website.",
        example: "500 clicks ÷ 10,000 impressions × 100 = 5% CTR. Average CTR for position 1 is ~28%, position 10 is ~2.5%.",
        technique: "Improve CTR by: writing compelling titles with power words, adding numbers/dates, using emotional triggers, testing different meta descriptions, earning rich snippets.",
        proTip: "CTR varies by position. Compare your CTR to expected CTR for your position. If you're underperforming, focus on title/description optimization.",
        relatedTerms: ["clicks", "impressions", "title-tag", "meta-description"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "average-position",
        term: "Average Position",
        shortDefinition: "The average ranking position of your page for a query in search results.",
        fullDefinition: "Average position is the mean ranking of your URL for queries over a time period. A position of 1 means you're first; position 10 means you're last on page 1. It's averaged across all times the page appeared.",
        example: "If your page ranked #1 once and #5 once for a query, your average position is 3.",
        technique: "Improve average position through content optimization, building backlinks, improving user engagement signals, fixing technical issues, and enhancing E-E-A-T signals.",
        proTip: "Focus on queries where you rank 5-15 (striking distance). Small improvements here can significantly boost traffic. Queries at 50+ need major work.",
        relatedTerms: ["ranking", "serp", "impressions"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Ranking Predictions", url: "/features/ranking-predictions", type: "feature" }
        ]
      },
      {
        id: "bounce-rate",
        term: "Bounce Rate",
        shortDefinition: "The percentage of visitors who leave after viewing only one page.",
        fullDefinition: "Bounce rate measures the percentage of single-page sessions where users left your site without interacting further. While not a direct ranking factor, high bounce rates may indicate content that doesn't satisfy user intent.",
        example: "1,000 visitors, 600 left after one page = 60% bounce rate. Blogs often have 70-90% bounce rate (normal), e-commerce should be 20-45%.",
        technique: "Reduce bounce rate by: matching search intent, improving page speed, adding compelling CTAs, using internal links, improving content quality, and optimizing mobile experience.",
        proTip: "Bounce rate without context is meaningless. A single-page site or a page that fully answers the query will have high bounce rate—and that's fine.",
        relatedTerms: ["dwell-time", "pogo-sticking", "user-engagement"],
        relatedLinks: [
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "organic-traffic",
        term: "Organic Traffic",
        shortDefinition: "Visitors who arrive at your site from unpaid search engine results.",
        fullDefinition: "Organic traffic consists of visitors who find your website through non-paid search engine results. It's the primary goal of SEO—increasing the quantity and quality of visitors from search engines without paying for ads.",
        example: "If 10,000 monthly visitors come from Google search results (not Google Ads), that's your organic traffic.",
        technique: "Grow organic traffic by: expanding keyword targeting, improving existing rankings, creating more content, building backlinks, fixing technical issues, and targeting featured snippets.",
        proTip: "Track organic traffic trends, not just absolute numbers. Seasonal businesses have natural fluctuations. Compare year-over-year for accurate growth measurement.",
        relatedTerms: ["paid-traffic", "direct-traffic", "referral-traffic"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "dwell-time",
        term: "Dwell Time",
        shortDefinition: "How long a user spends on your page before returning to search results.",
        fullDefinition: "Dwell time is the duration between when a user clicks on a search result and when they return to the SERP. It's a potential user engagement signal—longer dwell time suggests the content satisfied the user's query.",
        example: "User clicks your result, spends 5 minutes reading, then goes back to Google. Dwell time = 5 minutes.",
        technique: "Increase dwell time by: creating comprehensive content, using engaging multimedia, improving readability, adding table of contents, using internal links to keep users on site.",
        proTip: "Dwell time isn't directly measurable in analytics. Use 'time on page' as a proxy, but remember it's not identical—dwell time specifically measures return to SERP.",
        relatedTerms: ["bounce-rate", "pogo-sticking", "user-engagement"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "conversion-rate",
        term: "Conversion Rate",
        shortDefinition: "The percentage of visitors who complete a desired action.",
        fullDefinition: "Conversion rate measures the percentage of website visitors who complete a specific goal, such as making a purchase, signing up for a newsletter, or filling out a contact form. It connects SEO traffic to business outcomes.",
        example: "1,000 organic visitors, 30 made a purchase = 3% conversion rate. Average e-commerce is 2-3%, B2B lead gen is 2-5%.",
        technique: "Improve conversion rate by: attracting the right traffic (intent match), optimizing landing pages, improving UX, A/B testing CTAs, building trust with reviews/testimonials.",
        proTip: "High-intent long-tail keywords often convert better than high-volume head terms. 100 visitors from 'buy running shoes online' > 1,000 from 'running'.",
        relatedTerms: ["organic-traffic", "user-intent", "landing-page"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "serp-features",
    title: "SERP Features",
    description: "Special result types that appear in search engine results pages",
    icon: Star,
    color: "yellow",
    terms: [
      {
        id: "featured-snippet",
        term: "Featured Snippet",
        shortDefinition: "A highlighted answer box that appears at the top of search results.",
        fullDefinition: "A featured snippet is a special search result that appears above the regular organic results (position 0). It extracts and displays a direct answer from a webpage, including paragraph, list, table, or video formats.",
        example: "Query: 'How to tie shoelaces' → Featured snippet shows step-by-step instructions pulled from a webpage.",
        technique: "Target question-based queries, structure content with clear headings, use lists/tables, answer the query concisely in 40-60 words, provide comprehensive follow-up content.",
        proTip: "Check what format the current snippet uses (paragraph, list, table) and match it. Google prefers keeping the same format.",
        relatedTerms: ["serp", "position-zero", "rich-snippets"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "people-also-ask",
        term: "People Also Ask (PAA)",
        shortDefinition: "An expandable box showing related questions users commonly search.",
        fullDefinition: "People Also Ask is a SERP feature that displays a list of related questions users frequently search for. When clicked, each question expands to show an answer snippet and link. New questions dynamically load as users interact.",
        example: "Searching 'running shoes' shows PAA: 'What are the best running shoes for beginners?', 'How often should you replace running shoes?'",
        technique: "Use PAA questions as content ideas, create FAQ sections addressing these questions, use question-and-answer format in content, target long-tail question keywords.",
        proTip: "PAA questions are gold for content planning. Each one represents real user interest and can be a section in your content or a standalone article.",
        relatedTerms: ["featured-snippet", "faq-schema", "long-tail-keywords"],
        relatedLinks: [
          { title: "PAA Extractor", url: "/free-tools/paa-extractor", type: "tool" }
        ]
      },
      {
        id: "rich-snippets",
        term: "Rich Snippets",
        shortDefinition: "Enhanced search results displaying additional information like stars, prices, or images.",
        fullDefinition: "Rich snippets are search results enhanced with additional visual information derived from structured data. They can include star ratings, prices, availability, cooking times, calorie counts, and more—making listings more eye-catching.",
        example: "A recipe result showing: ★★★★☆ (4.5) · 45 min · 350 calories vs a plain blue link with just title and description.",
        technique: "Implement relevant schema markup (Product, Recipe, Review, FAQ, HowTo), test with Rich Results Test, ensure data accuracy, avoid spammy markup.",
        proTip: "Rich snippets improve CTR by 20-30%. Prioritize schema for your most important page types and track CTR changes after implementation.",
        relatedTerms: ["structured-data", "schema-markup", "ctr"],
        relatedLinks: [
          { title: "Schema Generator", url: "/free-tools/schema-generator", type: "tool" }
        ]
      },
      {
        id: "knowledge-panel",
        term: "Knowledge Panel",
        shortDefinition: "An information box appearing on the right side of search results for entities.",
        fullDefinition: "A Knowledge Panel is a box that appears in search results containing key facts about entities (people, places, organizations, things). It draws information from Google's Knowledge Graph and various trusted sources.",
        example: "Searching 'Apple Inc' shows a panel with logo, stock price, CEO, founding date, headquarters, etc.",
        technique: "Claim and verify your Google Business Profile, maintain consistent NAP across the web, build Wikipedia presence (if notable), use Organization schema, cultivate authoritative mentions.",
        proTip: "You can suggest edits to your Knowledge Panel if you're the verified representative of the entity. Look for 'Claim this knowledge panel' at the bottom.",
        relatedTerms: ["knowledge-graph", "entity-seo", "google-business-profile"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-pack",
        term: "Local Pack",
        shortDefinition: "A map with 3 local business listings appearing for location-based searches.",
        fullDefinition: "The Local Pack (also called Map Pack or 3-Pack) is a SERP feature displaying a map and three local business listings for queries with local intent. It appears prominently and is crucial for local businesses.",
        example: "Searching 'coffee shops near me' shows a map with 3 nearby coffee shops, their ratings, hours, and directions.",
        technique: "Optimize Google Business Profile, ensure NAP consistency, build local citations, get reviews, use local keywords, add location pages, embed Google Maps.",
        proTip: "Proximity is a major factor, but you can compete with businesses closer to the searcher by having better reviews, more complete profile, and stronger local signals.",
        relatedTerms: ["google-business-profile", "local-seo", "nap"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "image-pack",
        term: "Image Pack",
        shortDefinition: "A row of images appearing in organic search results.",
        fullDefinition: "The Image Pack is a horizontal row of images that appears within organic search results for queries where visual content is relevant. Clicking these images takes users to Google Images or directly to the source page.",
        example: "Searching 'running shoe styles' might show an image pack with photos of different running shoes inline with web results.",
        technique: "Optimize images with descriptive filenames, use relevant alt text, ensure images are high quality, create image-heavy content for visual queries, use image sitemaps.",
        proTip: "Images that appear in the Image Pack often drive significant traffic. Check GSC's 'Image' search type to see which images are performing.",
        relatedTerms: ["image-seo", "image-alt-text", "visual-search"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "video-carousel",
        term: "Video Carousel",
        shortDefinition: "A scrollable row of video results, typically from YouTube.",
        fullDefinition: "The Video Carousel is a SERP feature showing a horizontal, scrollable row of video thumbnails for queries where video content is relevant. Videos are primarily from YouTube and display titles, channels, and durations.",
        example: "Searching 'how to tie a tie' shows a video carousel with tutorial videos from various YouTube channels.",
        technique: "Create video content for informational queries, optimize YouTube titles/descriptions, use Video schema on embedded videos, create engaging thumbnails, add timestamps.",
        proTip: "Videos often appear for 'how to' queries. If you see video carousels for your target keywords, consider creating video content—or you're missing a major traffic opportunity.",
        relatedTerms: ["youtube-seo", "video-schema", "serp-features"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "ai-overview",
        term: "AI Overview (SGE)",
        shortDefinition: "AI-generated summary appearing at the top of search results.",
        fullDefinition: "AI Overview (formerly Search Generative Experience/SGE) is Google's AI-powered feature that provides a synthesized answer at the top of search results. It combines information from multiple sources and may change how users interact with search results.",
        example: "Searching 'best time to visit Japan' might show an AI-generated overview summarizing weather, events, and tourist seasons with source links.",
        technique: "Focus on E-E-A-T signals, create authoritative content that could be cited, use clear structure, answer questions comprehensively, build topical authority.",
        proTip: "Being cited in AI Overviews may become crucial. Focus on being the authoritative source that AI wants to reference, not just ranking #1.",
        relatedTerms: ["llm-seo", "zero-click-search", "serp-features"],
        relatedLinks: [
          { title: "AI Overview Checker", url: "/free-tools/ai-overview-checker", type: "tool" },
          { title: "LLM SEO Guide", url: "/blog/llm-seo-chatgpt-perplexity", type: "blog" }
        ]
      }
    ]
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Optimization for location-based searches and local businesses",
    icon: MapPin,
    color: "red",
    terms: [
      {
        id: "google-business-profile",
        term: "Google Business Profile (GBP)",
        shortDefinition: "Free Google tool for managing your business's appearance in search and maps.",
        fullDefinition: "Google Business Profile (formerly Google My Business) is a free tool that allows businesses to manage their online presence across Google Search and Maps. It displays business information, hours, reviews, photos, and posts.",
        example: "When someone searches 'pizza near me', GBP determines which businesses appear in the Local Pack with their hours, ratings, and location.",
        technique: "Complete every field, choose accurate categories, add high-quality photos, post regularly, respond to all reviews, enable messaging, keep hours updated.",
        proTip: "Add products/services with descriptions and prices. Many businesses skip this, but it helps you appear for more specific local searches.",
        relatedTerms: ["local-pack", "local-seo", "nap"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "nap",
        term: "NAP (Name, Address, Phone)",
        shortDefinition: "Business contact information that must be consistent across the web.",
        fullDefinition: "NAP stands for Name, Address, and Phone number—the critical business information that should be consistent across your website, Google Business Profile, directories, and all online mentions. Inconsistency confuses search engines and hurts local rankings.",
        example: "If your GBP says '123 Main St' but your website says '123 Main Street, Suite 100', that's NAP inconsistency.",
        technique: "Audit all citations for consistency, use the exact same format everywhere, include NAP in website footer, use LocalBusiness schema, fix variations promptly.",
        proTip: "Create a master document with your exact NAP format. Use it when submitting to any directory or platform. Even small variations can hurt.",
        relatedTerms: ["local-citations", "google-business-profile", "local-seo"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-citations",
        term: "Local Citations",
        shortDefinition: "Online mentions of your business name, address, and phone number.",
        fullDefinition: "Local citations are online references to your business's NAP information on websites, directories, apps, and social platforms. They help search engines verify your business exists and is legitimate, impacting local search rankings.",
        example: "Listings on Yelp, Yellow Pages, Facebook, industry directories, local chamber of commerce—each is a citation.",
        technique: "Submit to major directories first (Yelp, Facebook, Apple Maps, Bing Places), then industry-specific directories, ensure consistency, remove duplicates, fix incorrect listings.",
        proTip: "Quality over quantity. Citations from authoritative, relevant sources matter more than hundreds from low-quality directories.",
        relatedTerms: ["nap", "google-business-profile", "local-seo"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-keywords",
        term: "Local Keywords",
        shortDefinition: "Search terms that include geographic modifiers or imply local intent.",
        fullDefinition: "Local keywords are search terms that include location modifiers (city, neighborhood, 'near me') or have implicit local intent. They're essential for businesses targeting customers in specific geographic areas.",
        example: "'plumber in Brooklyn', 'best coffee shop downtown Seattle', 'dentist near me', '24-hour pharmacy Chicago'",
        technique: "Research local search volume, include city/neighborhood names in content, create location-specific landing pages, optimize for 'near me' queries, use location in title tags.",
        proTip: "Don't just add city names randomly. Create genuinely useful local content that mentions neighborhoods, landmarks, and local references naturally.",
        relatedTerms: ["geo-targeting", "local-content", "location-pages"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      },
      {
        id: "review-management",
        term: "Review Management",
        shortDefinition: "The practice of monitoring, responding to, and encouraging customer reviews.",
        fullDefinition: "Review management involves actively monitoring reviews across platforms, responding professionally to both positive and negative feedback, and implementing strategies to encourage satisfied customers to leave reviews.",
        example: "Responding to a negative review: 'We're sorry about your experience. Please contact us at [email] so we can make this right.'",
        technique: "Respond to all reviews within 24-48 hours, thank positive reviewers, address negative reviews professionally, never argue, ask happy customers for reviews at the right moment.",
        proTip: "Negative reviews handled well can build trust. A thoughtful response shows potential customers you care. Never buy fake reviews—Google will catch you.",
        relatedTerms: ["google-business-profile", "local-seo", "reputation-management"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "geo-targeting",
        term: "Geo-Targeting",
        shortDefinition: "Delivering content or results based on a user's geographic location.",
        fullDefinition: "Geo-targeting is the practice of delivering different content, ads, or search results to users based on their geographic location. In SEO, it involves optimizing for specific locations and ensuring search engines understand your target areas.",
        example: "A national pizza chain showing different locations and menus based on whether you're searching from New York or Los Angeles.",
        technique: "Use hreflang for international targeting, create location-specific landing pages, implement LocalBusiness schema, set geographic target in GSC (if applicable).",
        proTip: "For multi-location businesses, don't create thin doorway pages. Each location page should have unique, valuable content about that specific location.",
        relatedTerms: ["local-keywords", "hreflang", "location-pages"],
        relatedLinks: [
          { title: "Hreflang Builder", url: "/free-tools/hreflang-builder", type: "tool" }
        ]
      }
    ]
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    description: "Planning and creating content that ranks and converts",
    icon: BookOpen,
    color: "indigo",
    terms: [
      {
        id: "e-e-a-t",
        term: "E-E-A-T",
        shortDefinition: "Experience, Expertise, Authoritativeness, Trustworthiness—Google's content quality guidelines.",
        fullDefinition: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is Google's framework for evaluating content quality. It's especially important for YMYL (Your Money Your Life) topics. The extra E for Experience was added in 2022.",
        example: "A medical article written by a licensed doctor (expertise) who has treated patients (experience) for a respected hospital (authority) with cited sources (trust).",
        technique: "Display author credentials, link to authoritative sources, show real experience, get mentions/links from authorities, use HTTPS, display contact info, update content regularly.",
        proTip: "E-E-A-T isn't a direct ranking factor—it's what Google's quality raters use. But optimizing for it aligns with what Google's algorithms reward.",
        relatedTerms: ["ymyl", "content-quality", "author-authority"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "content-decay",
        term: "Content Decay",
        shortDefinition: "The gradual decline in organic traffic and rankings of older content.",
        fullDefinition: "Content decay occurs when previously high-performing content gradually loses rankings and traffic over time. This happens as content becomes outdated, competitors publish better content, or user needs evolve.",
        example: "A 'Best Tools 2023' article that ranked #1 now ranks #15 because it's outdated and competitors have 2025 versions.",
        technique: "Monitor traffic trends per page, identify decaying content before it's too late, update with current information, refresh titles with current year, add new sections, improve comprehensiveness.",
        proTip: "Set calendar reminders to review evergreen content quarterly. Preventing decay is easier than recovering from it.",
        relatedTerms: ["content-freshness", "content-update", "evergreen-content"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "topic-clusters",
        term: "Topic Clusters",
        shortDefinition: "A content organization strategy linking related articles around a pillar page.",
        fullDefinition: "Topic clusters are a content architecture strategy where a comprehensive pillar page covers a broad topic, and multiple cluster pages cover related subtopics in depth. All cluster pages link to the pillar and vice versa, creating a semantic relationship.",
        example: "Pillar: 'Complete Guide to Running' → Clusters: 'Running Shoes', 'Training Plans', 'Nutrition for Runners', 'Injury Prevention'",
        technique: "Identify core topics for pillar pages, create detailed cluster content for subtopics, use consistent internal linking structure, ensure anchor text reflects topic relationships.",
        proTip: "Pillar pages should be 3,000+ words covering the topic broadly. Cluster pages go deeper on specific aspects. Together they establish topical authority.",
        relatedTerms: ["pillar-content", "internal-linking", "topical-authority"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "content-gap-analysis",
        term: "Content Gap Analysis",
        shortDefinition: "Identifying topics competitors cover that you don't.",
        fullDefinition: "Content gap analysis is the process of comparing your content to competitors' to identify topics, keywords, or questions they cover that you're missing. It reveals opportunities to capture traffic and serve your audience better.",
        example: "Competitor ranks for 'running in rain' and 'running at night'. You have no content on these topics = content gaps.",
        technique: "Analyze competitor keywords you don't rank for, check PAA boxes for missed questions, survey customers about unanswered needs, use content gap tools.",
        proTip: "Not every gap needs filling. Prioritize gaps that align with your business goals and have reasonable search volume. Quality > quantity.",
        relatedTerms: ["competitor-analysis", "keyword-research", "content-strategy"],
        relatedLinks: [
          { title: "Content Gap Analysis", url: "/features/content-gap-analysis", type: "feature" },
          { title: "Competitor Content Spy", url: "/features/competitor-content-spy", type: "feature" }
        ]
      },
      {
        id: "evergreen-content",
        term: "Evergreen Content",
        shortDefinition: "Content that remains relevant and valuable long after publication.",
        fullDefinition: "Evergreen content is content that stays relevant over time, continually attracting traffic without becoming dated. It covers timeless topics that maintain consistent search interest, unlike news or trend-based content.",
        example: "'How to tie a tie' (evergreen) vs 'Best phones of 2023' (not evergreen). The first will be relevant for decades; the second is already outdated.",
        technique: "Target timeless topics, avoid date-specific references unless necessary, write comprehensively, plan regular updates, focus on fundamental concepts and how-to guides.",
        proTip: "Even evergreen content needs occasional updates. Check annually to ensure examples, links, and best practices are current.",
        relatedTerms: ["content-strategy", "content-decay", "long-form-content"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "thin-content",
        term: "Thin Content",
        shortDefinition: "Pages with little or no added value for users.",
        fullDefinition: "Thin content refers to pages that provide little unique value—they may be too short, duplicate other content, be auto-generated, or simply not helpful to users. Google may demote thin content or penalize sites with too much of it.",
        example: "A 100-word product description copied from the manufacturer, or tag pages with just a list of post titles and no context.",
        technique: "Audit for thin pages (under 300 words without good reason), noindex low-value pages, consolidate similar thin pages, add unique value to product descriptions.",
        proTip: "Word count alone doesn't define thin content. A 200-word page that perfectly answers a simple question is better than 2,000 words of fluff.",
        relatedTerms: ["content-quality", "index-bloat", "duplicate-content"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "content-freshness",
        term: "Content Freshness",
        shortDefinition: "How recently content was published or updated.",
        fullDefinition: "Content freshness refers to how current your content is. For some queries (news, trending topics, 'best of [year]'), Google prefers fresh content. Updating existing content can boost rankings by signaling relevance.",
        example: "Updating your 'Best Running Shoes' post from 2023 data to 2025 data and changing the title can restore lost rankings.",
        technique: "Update content with new information regularly, change last-modified dates only with substantial updates, add current year to titles where relevant, publish timely content for trending topics.",
        proTip: "Not all content needs freshness. 'How to boil water' doesn't need 2025 updates. But 'Best AI tools' becomes stale quickly.",
        relatedTerms: ["content-decay", "content-update", "query-deserves-freshness"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "core-web-vitals",
    title: "Core Web Vitals",
    description: "Google's metrics for measuring user experience and page performance",
    icon: Gauge,
    color: "emerald",
    terms: [
      {
        id: "lcp",
        term: "LCP (Largest Contentful Paint)",
        shortDefinition: "Measures how quickly the largest content element becomes visible.",
        fullDefinition: "Largest Contentful Paint (LCP) measures the time it takes for the largest content element (image, video, or text block) in the viewport to become visible. It's a key Core Web Vital indicating perceived load speed.",
        example: "Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s. If your hero image takes 5 seconds to load, your LCP is 5 seconds.",
        technique: "Optimize and compress images, use next-gen formats (WebP), implement lazy loading, preload critical resources, use CDN, reduce server response time.",
        proTip: "Identify your LCP element using PageSpeed Insights or DevTools. Often it's a hero image—optimizing just that one element can dramatically improve LCP.",
        relatedTerms: ["core-web-vitals", "page-speed", "fid", "cls"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "fid",
        term: "FID (First Input Delay)",
        shortDefinition: "Measures the time from first user interaction to browser response.",
        fullDefinition: "First Input Delay (FID) measures the time between when a user first interacts with your page (clicks, taps, presses a key) and when the browser can respond. It indicates how responsive your page feels.",
        example: "Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms. If you click a button and nothing happens for 500ms, that's poor FID.",
        technique: "Minimize JavaScript execution, break up long tasks, use web workers, defer non-critical JavaScript, remove unused code, reduce third-party script impact.",
        proTip: "FID is being replaced by INP (Interaction to Next Paint). Start measuring INP now as it will become the primary responsiveness metric.",
        relatedTerms: ["core-web-vitals", "inp", "javascript-optimization"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" }
        ]
      },
      {
        id: "cls",
        term: "CLS (Cumulative Layout Shift)",
        shortDefinition: "Measures visual stability by tracking unexpected layout movements.",
        fullDefinition: "Cumulative Layout Shift (CLS) measures how much page content unexpectedly shifts during loading. High CLS frustrates users when elements move as they try to interact with the page.",
        example: "Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25. A button that moves as an ad loads above it = high CLS.",
        technique: "Set explicit dimensions for images/videos, reserve space for ads/embeds, avoid inserting content above existing content, use CSS transform for animations.",
        proTip: "Ads are often the biggest CLS culprits. Reserve exact pixel dimensions for ad containers to prevent shifts when ads load.",
        relatedTerms: ["core-web-vitals", "layout-stability", "page-experience"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "inp",
        term: "INP (Interaction to Next Paint)",
        shortDefinition: "Measures overall page responsiveness to user interactions.",
        fullDefinition: "Interaction to Next Paint (INP) is replacing FID as a Core Web Vital. It measures responsiveness by observing all interactions during a page visit and reporting the worst (or near-worst) interaction latency.",
        example: "Good: <200ms, Needs Improvement: 200-500ms, Poor: >500ms. Unlike FID (first interaction only), INP considers all interactions.",
        technique: "Optimize JavaScript for all interactions (not just first), yield to the main thread frequently, prioritize visible content, minimize third-party script impact.",
        proTip: "INP is harder to optimize than FID because every interaction counts. Focus on optimizing your most common user interactions first.",
        relatedTerms: ["core-web-vitals", "fid", "responsiveness"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" }
        ]
      },
      {
        id: "page-experience",
        term: "Page Experience",
        shortDefinition: "Google's combined measure of user experience signals including Core Web Vitals.",
        fullDefinition: "Page Experience is Google's holistic measure of user experience encompassing Core Web Vitals, mobile-friendliness, HTTPS, safe browsing, and intrusive interstitial guidelines. It became a ranking factor in 2021.",
        example: "A page with good Core Web Vitals, mobile-friendly design, HTTPS, no security issues, and no intrusive popups has good page experience.",
        technique: "Pass all Core Web Vitals, ensure mobile responsiveness, use HTTPS, avoid malware, remove intrusive interstitials, maintain safe browsing status.",
        proTip: "Page experience is a tiebreaker, not a dominant signal. Great content with poor page experience can still outrank poor content with perfect metrics.",
        relatedTerms: ["core-web-vitals", "mobile-usability", "https"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "algorithm-updates",
    title: "Algorithm & Updates",
    description: "Google algorithm changes and their impact on rankings",
    icon: RefreshCw,
    color: "amber",
    terms: [
      {
        id: "google-algorithm",
        term: "Google Algorithm",
        shortDefinition: "The complex system Google uses to rank search results.",
        fullDefinition: "Google's algorithm is the system of rules and machine learning models that retrieve and rank content from its index. It considers hundreds of factors to deliver the most relevant results for each search query.",
        example: "When you search 'best pizza', the algorithm evaluates millions of pages for relevance, authority, and user experience to rank results.",
        technique: "Focus on quality content, build authority, ensure technical health, and align with user intent. Don't try to 'game' the algorithm—build for users.",
        proTip: "The algorithm updates constantly. Focus on sustainable SEO practices rather than tactics that exploit temporary loopholes.",
        relatedTerms: ["ranking-factors", "algorithm-update", "serp"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "algorithm-update",
        term: "Algorithm Update",
        shortDefinition: "Changes Google makes to its ranking systems.",
        fullDefinition: "Algorithm updates are changes Google makes to how it ranks search results. They range from minor daily tweaks to major core updates that can significantly impact rankings. Google announces major updates but not minor ones.",
        example: "A core update might cause sites with thin content to drop 30% while quality sites improve. The Helpful Content Update targeted AI-generated fluff.",
        technique: "Monitor rankings around announced update dates, compare to industry trends, analyze impacted pages for patterns, focus recovery on content quality.",
        proTip: "If you drop after an update, don't panic-edit everything. Wait for the dust to settle, analyze patterns, then make strategic improvements.",
        relatedTerms: ["core-update", "helpful-content-update", "spam-update"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "core-update",
        term: "Core Update",
        shortDefinition: "Major algorithm updates affecting broad ranking systems.",
        fullDefinition: "Core updates are significant changes to Google's main ranking algorithm, typically announced and named by release date (e.g., 'March 2025 Core Update'). They can cause large ranking fluctuations and usually complete over 2 weeks.",
        example: "A core update might promote sites with strong E-E-A-T while demoting those with thin content or poor user experience.",
        technique: "Focus on overall site quality, E-E-A-T signals, content depth, and user satisfaction. There's no 'fix' for core updates—improve broadly.",
        proTip: "Core update recovery can take until the next core update. Use the time between to make substantial quality improvements.",
        relatedTerms: ["algorithm-update", "e-e-a-t", "ranking-volatility"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "helpful-content-update",
        term: "Helpful Content Update",
        shortDefinition: "Update targeting content created primarily for search engines rather than users.",
        fullDefinition: "The Helpful Content Update targets sites with content that feels written for search engines rather than humans. It's a site-wide signal—having lots of unhelpful content can drag down rankings for your entire domain.",
        example: "Sites with auto-generated content, thin affiliate pages, or content that doesn't satisfy user intent were hit. 'How tall is Eiffel Tower?' articles with 2000 words of filler.",
        technique: "Remove or substantially improve unhelpful content, ensure every page provides unique value, write for humans first, answer queries directly without excessive fluff.",
        proTip: "The HCU classifier is site-wide. Even if 80% of your content is great, 20% unhelpful content can hurt everything. Audit and prune aggressively.",
        relatedTerms: ["content-quality", "thin-content", "algorithm-update"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "spam-update",
        term: "Spam Update",
        shortDefinition: "Updates targeting manipulative and spammy SEO tactics.",
        fullDefinition: "Spam updates improve Google's ability to detect and demote websites using manipulative tactics like link spam, cloaking, keyword stuffing, and other violations of search guidelines.",
        example: "Sites with purchased links, hidden text, or private blog networks dropping from rankings after a spam update.",
        technique: "Avoid link schemes, don't use hidden text, ensure no cloaking, disavow toxic links if you have a penalty, follow Google's spam policies.",
        proTip: "Spam updates can take weeks to fully roll out. If hit, address violations thoroughly rather than making quick fixes.",
        relatedTerms: ["link-spam", "manual-penalty", "black-hat-seo"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "ranking-volatility",
        term: "Ranking Volatility",
        shortDefinition: "The degree of fluctuation in search rankings over time.",
        fullDefinition: "Ranking volatility refers to how much search rankings change. High volatility indicates many sites moving positions, often due to algorithm updates. Normal fluctuation is expected; extreme volatility suggests major changes.",
        example: "On a normal day, rankings might shift 1-2 positions. During a core update, you might see 10+ position swings across many queries.",
        technique: "Track rankings daily, compare to industry volatility sensors, don't overreact to minor fluctuations, investigate patterns during high volatility periods.",
        proTip: "Use volatility tools to distinguish between site-specific issues and industry-wide algorithm changes. If everyone's volatile, it's probably an update.",
        relatedTerms: ["algorithm-update", "ranking-tracker", "serp-analysis"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "ai-seo",
    title: "AI & SEO",
    description: "AI technologies and their impact on search optimization",
    icon: Bot,
    color: "violet",
    terms: [
      {
        id: "llm-seo",
        term: "LLM SEO",
        shortDefinition: "Optimizing content to appear in Large Language Model responses.",
        fullDefinition: "LLM SEO refers to strategies for getting your content cited by AI assistants like ChatGPT, Perplexity, Claude, and Google's AI Overviews. As users increasingly get answers from AI, being the source these models reference becomes valuable.",
        example: "When someone asks ChatGPT 'best project management tools', getting your software mentioned with a link is LLM SEO success.",
        technique: "Build brand authority, get mentioned on authoritative sites, create factual structured content, ensure data is easily parseable, target question-based queries.",
        proTip: "LLMs learn from their training data and sometimes real-time search. Building brand mentions across the web is increasingly important.",
        relatedTerms: ["ai-overview", "zero-click-search", "e-e-a-t"],
        relatedLinks: [
          { title: "LLM SEO Guide", url: "/blog/llm-seo-chatgpt-perplexity", type: "blog" },
          { title: "AI Overview Checker", url: "/free-tools/ai-overview-checker", type: "tool" }
        ]
      },
      {
        id: "ai-content",
        term: "AI-Generated Content",
        shortDefinition: "Content created by artificial intelligence tools.",
        fullDefinition: "AI-generated content is text, images, or other media created by AI tools like ChatGPT, Claude, or Gemini. Google doesn't penalize AI content per se—it penalizes low-quality content regardless of how it's created.",
        example: "Using ChatGPT to draft a blog post, then editing for accuracy, brand voice, and adding unique insights.",
        technique: "Use AI as a starting point, not a final product. Add unique expertise, fact-check everything, inject personal experience, ensure E-E-A-T signals.",
        proTip: "The Helpful Content Update targets content that doesn't add value. AI content that's just regurgitation will fail; AI content enhanced with expertise can succeed.",
        relatedTerms: ["helpful-content-update", "content-quality", "e-e-a-t"],
        relatedLinks: [
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" },
          { title: "ChatGPT SEO Prompts", url: "/free-tools/chatgpt-seo-prompts", type: "tool" }
        ]
      },
      {
        id: "zero-click-search",
        term: "Zero-Click Search",
        shortDefinition: "Searches where users get answers without clicking any results.",
        fullDefinition: "Zero-click searches occur when users find their answer directly on the SERP (via featured snippets, knowledge panels, or AI Overviews) without clicking through to any website. This trend is growing with AI integration.",
        example: "Searching 'weather today' shows the forecast directly. No click needed. Same for 'how old is Tom Hanks' or simple calculations.",
        technique: "Optimize for featured snippets to get brand exposure even without clicks, target queries with commercial/transactional intent that require clicks, track brand visibility not just clicks.",
        proTip: "Zero-click isn't always bad. Being the answer in a featured snippet builds brand awareness even without clicks. Adjust your KPIs accordingly.",
        relatedTerms: ["featured-snippet", "ai-overview", "knowledge-panel"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "semantic-search",
        term: "Semantic Search",
        shortDefinition: "Search that understands meaning and context, not just keywords.",
        fullDefinition: "Semantic search uses AI to understand the intent and contextual meaning behind queries, rather than just matching keywords. It connects related concepts and delivers results that answer what users actually want.",
        example: "'Apple pie recipe' returns recipes, not Apple Inc. 'best phone for photos' understands you want camera-focused phones.",
        technique: "Write naturally for topics, not just keywords. Cover related concepts comprehensively, use synonyms, answer related questions, build topical authority.",
        proTip: "Keyword stuffing is dead. Semantic search rewards content that thoroughly covers a topic with natural language rather than repeating exact keywords.",
        relatedTerms: ["search-intent", "topical-authority", "natural-language-processing"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "entity-seo",
        term: "Entity SEO",
        shortDefinition: "Optimization focused on entities (people, places, things) rather than keywords.",
        fullDefinition: "Entity SEO is the practice of optimizing for how search engines understand and connect entities—specific people, places, organizations, concepts, and things. It's about being recognized as a definitive entity in your space.",
        example: "When you search 'Elon Musk', Google shows a Knowledge Panel because it understands Elon Musk as an entity connected to Tesla, SpaceX, etc.",
        technique: "Build consistent brand mentions, claim Knowledge Panels, use Organization schema, get Wikipedia presence (if notable), maintain consistent information across platforms.",
        proTip: "Entities are how Google connects information across the web. Building entity recognition means your brand becomes part of Google's understanding of topics.",
        relatedTerms: ["knowledge-graph", "knowledge-panel", "structured-data"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "ai-autopilot",
        term: "AI Autopilot (SEO)",
        shortDefinition: "Automated AI-driven SEO optimization and task execution.",
        fullDefinition: "AI Autopilot in SEO refers to systems that automatically analyze data, generate recommendations, and execute optimization tasks using artificial intelligence. It helps scale SEO efforts across large sites.",
        example: "An AI system that automatically detects content decay, generates improvement suggestions, and schedules updates based on priority.",
        technique: "Use AI for repetitive tasks (meta description generation, content audits), maintain human oversight for strategy, validate AI recommendations before implementation.",
        proTip: "AI Autopilot works best for execution at scale. Strategy and critical decisions still benefit from human expertise and judgment.",
        relatedTerms: ["ai-content", "seo-automation", "machine-learning"],
        relatedLinks: [
          { title: "AI Autopilot Mode", url: "/features/ai-autopilot-mode", type: "feature" },
          { title: "Sprint Board", url: "/features/sprint-board-task-management", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    description: "Essential SEO tools and platforms for analysis and optimization",
    icon: Wrench,
    color: "slate",
    terms: [
      {
        id: "google-search-console",
        term: "Google Search Console (GSC)",
        shortDefinition: "Free Google tool providing search performance data and site health insights.",
        fullDefinition: "Google Search Console is a free service from Google that helps you monitor, maintain, and troubleshoot your site's presence in search results. It provides data on impressions, clicks, rankings, indexing status, and technical issues.",
        example: "GSC shows you're getting 10,000 impressions for 'running shoes' but only 200 clicks, indicating low CTR that needs improvement.",
        technique: "Connect all site properties, submit sitemaps, monitor Core Web Vitals, check indexing coverage, analyze search queries, request indexing for new content.",
        proTip: "GSC data has a 2-3 day delay. For recent changes, check the URL Inspection tool which shows fresh crawl data.",
        relatedTerms: ["impressions", "clicks", "average-position", "indexing"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "google-analytics",
        term: "Google Analytics 4 (GA4)",
        shortDefinition: "Google's free web analytics platform for tracking user behavior.",
        fullDefinition: "Google Analytics 4 is Google's analytics platform that tracks website traffic, user behavior, conversions, and more. It uses event-based tracking and machine learning to provide insights about your audience and their journey.",
        example: "GA4 shows organic traffic drives 60% of your conversions, with users visiting an average of 3 pages before purchasing.",
        technique: "Set up proper conversion tracking, connect with GSC, create custom reports for SEO metrics, use segments to analyze organic traffic separately.",
        proTip: "Link GA4 with GSC to combine behavior data with search performance. This helps identify which rankings actually drive conversions.",
        relatedTerms: ["organic-traffic", "conversion-rate", "user-behavior"],
        relatedLinks: [
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "serp",
        term: "SERP (Search Engine Results Page)",
        shortDefinition: "The page displayed by search engines in response to a query.",
        fullDefinition: "A SERP is the page search engines display after a user enters a query. Modern SERPs include organic results, paid ads, featured snippets, knowledge panels, maps, images, videos, and various other features.",
        example: "Searching 'best coffee maker' shows ads at top, a featured snippet, shopping results, PAA box, and organic listings—all on one SERP.",
        technique: "Analyze SERPs for your target keywords to understand intent, identify featured snippet opportunities, assess competitor content, and plan content format.",
        proTip: "SERPs vary by device, location, and personalization. Check from incognito mode and different locations for accurate competitive analysis.",
        relatedTerms: ["serp-features", "organic-results", "featured-snippet"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "search-operators",
        term: "Search Operators",
        shortDefinition: "Special commands to refine and filter search queries.",
        fullDefinition: "Search operators are special characters and commands used to refine search queries. They're invaluable for SEO research, competitive analysis, finding backlink opportunities, and auditing indexed pages.",
        example: "site:example.com (all indexed pages), intitle:\"keyword\" (pages with keyword in title), -keyword (exclude results), link:example.com (who links to you)",
        technique: "Use site: to audit indexing, intitle:/inurl: for competitive research, related: for finding similar sites, cache: to see Google's version.",
        proTip: "Combine operators for powerful queries: site:competitor.com intitle:\"guest post\" finds guest post opportunities on competitor sites.",
        relatedTerms: ["indexing", "serp", "competitive-analysis"],
        relatedLinks: [
          { title: "Search Operators Tool", url: "/free-tools/search-operators", type: "tool" },
          { title: "Google Search Operators Guide", url: "/blog/google-search-operators-2025", type: "blog" }
        ]
      },
      {
        id: "rank-tracking",
        term: "Rank Tracking",
        shortDefinition: "Monitoring keyword positions in search results over time.",
        fullDefinition: "Rank tracking involves monitoring where your pages appear in search results for specific keywords. It helps measure SEO progress, identify opportunities, detect problems, and track competitor movements.",
        example: "Tracking 100 keywords weekly shows 'best running shoes' improved from #8 to #4, while 'marathon training' dropped from #3 to #7.",
        technique: "Track head terms and long-tail keywords, monitor daily during updates, compare to competitors, segment by page/category, track SERP feature presence.",
        proTip: "Don't obsess over daily fluctuations. Look at trends over weeks/months. A 1-position change day-to-day is noise; consistent decline is a signal.",
        relatedTerms: ["average-position", "serp", "ranking-volatility"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Ranking Predictions", url: "/features/ranking-predictions", type: "feature" }
        ]
      },
      {
        id: "site-audit",
        term: "Site Audit",
        shortDefinition: "Comprehensive analysis of a website's technical SEO health.",
        fullDefinition: "A site audit is a thorough examination of a website's technical SEO, identifying issues that may impact crawling, indexing, and rankings. It covers site structure, page speed, mobile-friendliness, indexing, and on-page elements.",
        example: "An audit reveals 500 pages with missing meta descriptions, 200 broken internal links, 3 orphan pages, and slow Core Web Vitals.",
        technique: "Run audits monthly on large sites, weekly during migrations. Prioritize issues by impact, fix crawl/index issues first, then on-page, then minor items.",
        proTip: "Not all audit issues matter equally. 100 missing image alt texts < 1 noindex on your money page. Prioritize by traffic impact.",
        relatedTerms: ["technical-seo", "crawling", "indexing"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" },
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "competitor-analysis",
        term: "Competitor Analysis",
        shortDefinition: "Researching competitor SEO strategies and performance.",
        fullDefinition: "SEO competitor analysis involves studying competitors' organic search performance, keyword rankings, backlink profiles, content strategies, and technical implementations to identify opportunities and inform your strategy.",
        example: "Analysis shows competitor ranks for 500 keywords you don't, has 3x your backlinks, but poor Core Web Vitals you can beat.",
        technique: "Identify true SERP competitors (not just business competitors), analyze their top content, find their backlink sources, identify content gaps, study their site structure.",
        proTip: "Your real competitors are whoever ranks for your target keywords—not necessarily your business competitors. A blog might outrank you, not a rival company.",
        relatedTerms: ["content-gap-analysis", "backlink-analysis", "keyword-research"],
        relatedLinks: [
          { title: "Competitor Analysis", url: "/features/competitor-analysis", type: "feature" },
          { title: "Competitor Content Spy", url: "/features/competitor-content-spy", type: "feature" }
        ]
      },
      {
        id: "seo-reporting",
        term: "SEO Reporting",
        shortDefinition: "Regular reports communicating SEO performance and progress.",
        fullDefinition: "SEO reporting involves creating regular summaries of SEO metrics, progress toward goals, and actionable insights. Good reports translate data into business impact and guide strategy decisions.",
        example: "Monthly report shows: 15% organic traffic increase, 5 new page 1 rankings, 20 backlinks acquired, 3 technical issues fixed.",
        technique: "Report on business metrics (traffic, conversions, revenue), not just rankings. Include context, trends, actions taken, and next steps. Customize for audience.",
        proTip: "Executives want business impact, not rankings. Lead with 'organic traffic increased revenue by $X' not 'we moved from position 8 to 5'.",
        relatedTerms: ["analytics", "kpis", "organic-traffic"],
        relatedLinks: [
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "advanced-concepts",
    title: "Advanced Concepts",
    description: "Advanced SEO strategies and specialized optimization techniques",
    icon: Settings,
    color: "pink",
    terms: [
      {
        id: "crawl-budget",
        term: "Crawl Budget",
        shortDefinition: "The number of pages Googlebot will crawl on your site in a given time.",
        fullDefinition: "Crawl budget is the number of pages Google's crawler will visit on your website within a certain timeframe. For large sites, optimizing crawl budget ensures important pages get crawled frequently while low-value pages don't waste resources.",
        example: "A site with 1 million pages but crawl budget for 10,000/day means it takes 100 days to crawl everything once.",
        technique: "Block low-value pages in robots.txt, fix crawl errors, improve page speed, remove duplicate content, optimize internal linking to important pages.",
        proTip: "Crawl budget only matters for large sites (100K+ pages). Small sites will have everything crawled regardless of optimization.",
        relatedTerms: ["crawling", "robots-txt", "indexing"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "index-bloat",
        term: "Index Bloat",
        shortDefinition: "Having too many low-value pages indexed in search engines.",
        fullDefinition: "Index bloat occurs when a site has too many thin, duplicate, or low-quality pages indexed. This dilutes crawl budget, spreads PageRank thin, and can negatively impact how Google perceives site quality.",
        example: "An e-commerce site with 500 product pages but 50,000 indexed URLs due to faceted navigation creating infinite filter combinations.",
        technique: "Audit indexed pages with site: operator, noindex thin/duplicate pages, canonicalize variations, block low-value URLs from crawling, consolidate content.",
        proTip: "Check GSC's 'Pages' report. If indexed pages >> your actual content pages, you likely have bloat. Target quality over quantity.",
        relatedTerms: ["thin-content", "duplicate-content", "crawl-budget"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "topical-authority",
        term: "Topical Authority",
        shortDefinition: "Being recognized as an authoritative source on a specific topic.",
        fullDefinition: "Topical authority is the perceived expertise a website has on a particular subject area. Sites with topical authority tend to rank better for related queries because Google trusts them as comprehensive sources.",
        example: "A website dedicated to running with 100+ detailed articles on training, shoes, nutrition, and injuries has topical authority in running.",
        technique: "Cover your topic comprehensively, create content clusters, earn links from topic-relevant sites, build author expertise, update content regularly.",
        proTip: "You don't need authority in everything. Pick your niche and go deep. A site about 'running' will outrank a general 'sports' site for running queries.",
        relatedTerms: ["topic-clusters", "e-e-a-t", "content-strategy"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "pogo-sticking",
        term: "Pogo-sticking",
        shortDefinition: "When users quickly bounce back to search results and click another result.",
        fullDefinition: "Pogo-sticking occurs when a user clicks a search result, quickly returns to the SERP, and clicks a different result. It suggests the first result didn't satisfy their query—a potential negative signal.",
        example: "User searches 'best coffee maker', clicks result #1, returns in 5 seconds, clicks result #2 and stays. Result #1 may have pogo-sticking issues.",
        technique: "Match search intent precisely, answer the query quickly (don't bury the answer), improve page speed, ensure mobile-friendliness, use clear headlines.",
        proTip: "Put the answer to the query near the top. If users have to scroll through ads and fluff to find what they want, they'll pogo-stick back.",
        relatedTerms: ["bounce-rate", "dwell-time", "search-intent"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      },
      {
        id: "redirect",
        term: "Redirect (301/302)",
        shortDefinition: "Sending users and search engines from one URL to another.",
        fullDefinition: "Redirects tell browsers and search engines that a page has moved. 301 redirects are permanent (pass full link equity), while 302 redirects are temporary (intended to be short-term, historically passed less equity).",
        example: "Migrating from HTTP to HTTPS requires 301 redirects: http://example.com/page → https://example.com/page",
        technique: "Use 301 for permanent moves, keep redirect chains under 3 hops, update internal links to point directly to final URLs, monitor for redirect loops.",
        proTip: "After a site migration, keep old redirects in place for at least a year. Removing them too soon can lose accumulated link equity.",
        relatedTerms: ["site-migration", "link-equity", "technical-seo"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "log-file-analysis",
        term: "Log File Analysis",
        shortDefinition: "Analyzing server logs to understand how search engines crawl your site.",
        fullDefinition: "Log file analysis involves examining your web server's log files to see exactly which pages search engine bots visit, how often, and whether they encounter errors. It provides ground truth about crawl behavior.",
        example: "Logs show Googlebot visits your blog 1000 times/day but your product pages only 50 times/day—indicating crawl priority issues.",
        technique: "Filter logs for bot user agents, identify frequently/rarely crawled pages, spot crawl errors, detect crawl waste, analyze crawl patterns over time.",
        proTip: "Log files are the only way to see what Googlebot actually does, not what you think it does. They can reveal hidden issues GSC doesn't show.",
        relatedTerms: ["crawling", "crawl-budget", "googlebot"],
        relatedLinks: [
          { title: "Log File SEO Guide", url: "/blog/log-file-seo-guide", type: "blog" }
        ]
      },
      {
        id: "site-migration",
        term: "Site Migration",
        shortDefinition: "Moving a website to a new domain, platform, or structure.",
        fullDefinition: "Site migration involves significant changes to a website's URL structure, domain, platform, or content. Migrations carry SEO risk—improper handling can cause major traffic losses, while good execution can maintain or improve rankings.",
        example: "Migrating from example.com to newexample.com, or from HTTP to HTTPS, or from an old CMS to a new one.",
        technique: "Create comprehensive redirect maps, update all internal links, monitor GSC for errors, notify Google via Change of Address tool, preserve URL structures when possible.",
        proTip: "Never migrate during your busy season. Traffic drops are normal post-migration—recover time can be weeks to months. Plan buffer time.",
        relatedTerms: ["redirect", "canonical-tag", "https"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "ymyl",
        term: "YMYL (Your Money Your Life)",
        shortDefinition: "Topics that can significantly impact users' health, finances, or safety.",
        fullDefinition: "YMYL (Your Money Your Life) refers to topics that could significantly impact a person's health, financial stability, safety, or wellbeing. Google holds YMYL content to higher quality standards and E-E-A-T requirements.",
        example: "Medical advice, financial planning, legal information, news about current events, and safety-related content are all YMYL topics.",
        technique: "Ensure content is created/reviewed by experts, cite authoritative sources, display credentials, maintain accuracy, update regularly, build author reputation.",
        proTip: "If you're in a YMYL niche, invest heavily in author bios, expert review, citations, and trustworthiness signals. Google scrutinizes YMYL content closely.",
        relatedTerms: ["e-e-a-t", "content-quality", "trustworthiness"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "duplicate-content",
        term: "Duplicate Content",
        shortDefinition: "Substantially similar content appearing at multiple URLs.",
        fullDefinition: "Duplicate content is identical or near-identical content that appears at multiple URLs, either within a single site or across different sites. It can cause crawl waste, dilute rankings, and confuse search engines about which version to rank.",
        example: "Product descriptions copied from manufacturers, www vs non-www versions, HTTP vs HTTPS versions, URL parameters creating duplicates.",
        technique: "Use canonical tags to specify preferred versions, implement proper redirects, set parameter handling in GSC, create unique content, consolidate similar pages.",
        proTip: "Duplicate content typically isn't penalized—it's filtered. But it wastes crawl budget and can cause the wrong version to rank. Fix with canonicals.",
        relatedTerms: ["canonical-tag", "index-bloat", "content-quality"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "noindex",
        term: "Noindex Tag",
        shortDefinition: "A directive telling search engines not to include a page in their index.",
        fullDefinition: "The noindex meta tag or HTTP header tells search engines that a page should not be added to their index and therefore won't appear in search results. It's different from blocking crawling—the page is still crawled but not indexed.",
        example: "<meta name=\"robots\" content=\"noindex\"> on thank-you pages, admin pages, or thin tag/category pages.",
        technique: "Use noindex for: thin pages, duplicate pages, admin areas, staging sites, thank-you pages. Don't use on pages you want traffic to.",
        proTip: "Noindex + follow lets Google crawl links on the page without indexing it. Useful for pages with good internal links but no search value themselves.",
        relatedTerms: ["robots-txt", "indexing", "meta-tags"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "pagination-seo",
        term: "Pagination SEO",
        shortDefinition: "Handling multi-page content for optimal search engine indexing.",
        fullDefinition: "Pagination SEO involves properly handling content split across multiple pages (like blog archives or product listings) so search engines can discover all content while avoiding duplicate content issues.",
        example: "A blog with 50 posts showing 10 per page: /blog/, /blog/page/2/, /blog/page/3/, etc. Each needs proper handling.",
        technique: "Use self-referencing canonicals on each page, ensure proper linking between pages, consider 'load more' or infinite scroll with proper implementation, use view-all pages if appropriate.",
        proTip: "Google deprecated rel='next/prev' hints. Now focus on clear navigation, ensuring each paginated page has unique valuable content visible.",
        relatedTerms: ["canonical-tag", "crawling", "site-architecture"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "rendering",
        term: "Rendering (JavaScript SEO)",
        shortDefinition: "How search engines process and execute JavaScript to see page content.",
        fullDefinition: "Rendering is the process by which search engines execute JavaScript to generate the final HTML content of a page. JavaScript-heavy sites require proper rendering for search engines to index their content.",
        example: "A React SPA that loads content via JavaScript. Googlebot must render the page to see the content—if rendering fails, content isn't indexed.",
        technique: "Use server-side rendering (SSR) or static generation for critical content, test with Mobile-Friendly Test, check rendered HTML in GSC, minimize render-blocking JS.",
        proTip: "Googlebot queues pages for rendering—there's a delay between crawl and render. SSR ensures content is immediately visible without rendering dependency.",
        relatedTerms: ["javascript-seo", "indexing", "crawling"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  }
];
