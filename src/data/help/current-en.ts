import type { HelpCategory } from "./types";

export const currentEn: HelpCategory = {
  "slug": "seo-in-practice",
  "title": "SEO in practice",
  "description": "Evidence, practical checks and your next steps in the app.",
  "group": "product",
  "articles": [
    {
      "slug": "when-changes-appear",
      "title": "When do SEO changes appear in Google?",
      "description": "Understand the stages after a change, check what Google has processed and measure results carefully.",
      "body": [
        {
          "type": "p",
          "text": "Publishing a change starts a process. Google must discover the page, crawl it, process its content and decide how to serve it. Being indexed does not guarantee impressions, traffic or a better ranking."
        },
        {
          "type": "note",
          "tone": "info",
          "text": "Official guidance checked on 20 October 2026. Broad ranges are guidance, not deadlines. There is no verified universal “20 hours to discover a page” or “1.5 hours to finish indexing” rule."
        },
        {
          "type": "h2",
          "id": "verified-guidance",
          "text": "What Google actually says"
        },
        {
          "type": "table",
          "head": [
            "Process",
            "Official guidance",
            "What to check"
          ],
          "rows": [
            [
              "Recrawl / title-link update",
              "A few days to a few weeks. Requesting a crawl does not guarantee indexing.",
              "URL Inspection: last crawl and page status."
            ],
            [
              "robots.txt",
              "Google generally caches it for up to 24 hours; refresh failures can extend this.",
              "The live file and server errors."
            ],
            [
              "URL-changing site migration",
              "A few weeks or more for small/medium sites; larger sites can take longer.",
              "Redirects, canonicals, internal links and sitemap."
            ],
            [
              "Manual-action reconsideration",
              "Several days or weeks; some cases take longer.",
              "The actual Search Console decision."
            ],
            [
              "Improvements after a core update",
              "Some changes can show within days; site-wide reassessment can take several months. Recovery is not guaranteed.",
              "Content quality, seasonality and comparable periods."
            ],
            [
              "Temporary result removal",
              "The Removals tool hides a URL for about six months. It does not delete the page or block crawling.",
              "Request status and the appropriate permanent solution."
            ]
          ]
        },
        {
          "type": "h2",
          "id": "other-processes",
          "text": "Other processes have no universal fixed duration"
        },
        {
          "type": "p",
          "text": "Page discovery, sitemap processing, crawl frequency and crawl capacity depend on the site. Do not add estimated stages together to forecast a result date."
        },
        {
          "type": "p",
          "text": "Rendering, meta tags, link signals, indexing or deindexing, canonical selection, structured data, images and videos have no single guaranteed processing time. Valid schema does not guarantee a rich result."
        },
        {
          "type": "p",
          "text": "Google can choose a different title, description or search image from those you specify. There is no universal one-to-two-day deadline for these changes, and spam-update outcomes have no fixed timetable."
        },
        {
          "type": "h2",
          "id": "checklist",
          "text": "What to do next"
        },
        {
          "type": "steps",
          "items": [
            "Verify the change on the live page and record its shipped date in Tasks.",
            "Check Google’s actual last crawl in URL Inspection. Our app’s crawl is not a Google crawl.",
            "For new pages, check internal links, sitemap, robots.txt, noindex and content quality.",
            "Compare matching country/device conditions and appropriate dates. Allow for seasonality and reporting delay.",
            "If Google has not recrawled or the sample is small, describe the measurement as early or inconclusive."
          ]
        },
        {
          "type": "note",
          "tone": "tip",
          "text": "The 28-day before/after window in Tasks helps monitor changes. It is not a Google deadline or proof that the change caused the outcome."
        },
        {
          "type": "h2",
          "id": "sources",
          "text": "Official sources"
        },
        {
          "type": "list",
          "items": [
            "[Ask Google to recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)",
            "[robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)",
            "[Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)",
            "[Title links](https://developers.google.com/search/docs/appearance/title-link)",
            "[Core updates](https://developers.google.com/search/docs/appearance/core-updates)",
            "[Removals](https://support.google.com/webmasters/answer/9689846)",
            "[Manual actions](https://support.google.com/webmasters/answer/9044175)"
          ]
        }
      ]
    },
    {
      "slug": "complete-seo-audit",
      "title": "Complete SEO audit with Aster AI",
      "description": "One report from your connected evidence, with concrete monthly priorities.",
      "body": [
        {
          "type": "p",
          "text": "Open **AI tools → Complete SEO audit** for the selected project. You do not need to retype its URL or connect another provider. Choose your dates and comparison in the app."
        },
        {
          "type": "steps",
          "items": [
            "Optionally describe the business goal.",
            "Set a fresh SEO-data allowance of up to 30 credits. With 0, only cached provider data is used. Writing the report uses your existing AI allowance separately.",
            "Run the audit to see daily clicks, top queries, backlinks, competitors and saved AI answers.",
            "Review sources, dates and coverage. Each priority can become a separate task with evidence and steps."
          ]
        },
        {
          "type": "note",
          "tone": "tip",
          "text": "The audit samples up to four public pages. Index estimates differ from observed Search Console clicks. A keyword missing from a sample does not prove you do not rank. AI coverage describes only previously saved answer checks."
        },
        {
          "type": "p",
          "text": "The report does not change your site, submit a disavow file or guarantee rankings. Missing data is unavailable, never zero."
        }
      ]
    },
    {
      "slug": "latest-features",
      "title": "Current features and where to find them",
      "description": "A current guide to sources, tasks, new tools and client requests.",
      "body": [
        {
          "type": "p",
          "text": "Updated 20 October 2026. These instructions describe the web app. Other apps depend on the version you have installed."
        },
        {
          "type": "table",
          "head": [
            "Feature",
            "How to use it"
          ],
          "rows": [
            [
              "Aster AI",
              "Ask about the selected project. Open evidence from source citations. Reporting dates and comparisons are preserved; missing evidence is not zero."
            ],
            [
              "Business Brain",
              "Draft a profile from the site, review its source links and save what you confirm. Each project has its own profile."
            ],
            [
              "Page actions",
              "Choose from the project’s discovered pages. Aster AI drafts changes from the page and relevant evidence."
            ],
            [
              "Content Pruning & Refresh",
              "Review pruning candidates, CTR opportunities and topic clusters. Create tasks or export CSV. Pages are never deleted or changed; backlinks, conversions and protected status prevent delete recommendations."
            ],
            [
              "Client requests",
              "In the client portal: Work → New request. Clients write naturally, review an organized draft and confirm it. The original message is retained. Owner preview allows testing without submission."
            ],
            [
              "Tasks and measurement",
              "Create specific tasks with a page, query and evidence. Marking work shipped records its date and starts a 28-day comparison. Notes are shown separately from actions."
            ],
            [
              "SEO data",
              "Fresh lookups use the existing credit ledger and limits. Compatible operations fall back between Ahrefs and DataForSEO if one is unavailable. Their datasets and capabilities are not identical."
            ]
          ]
        },
        {
          "type": "note",
          "tone": "tip",
          "text": "The custom **Proposals** workspace is currently private to the designated owner account. It is not available to every customer or plan."
        },
        {
          "type": "p",
          "text": "[Explore the complete SEO audit](/help/seo-in-practice/complete-seo-audit) or [read when to evaluate changes](/help/seo-in-practice/when-changes-appear)."
        }
      ]
    }
  ]
};
