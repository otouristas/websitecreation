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
            ],
            [
              "Brand Radar",
              "Customer questions, saved AI answers and sources, with an owner-managed shared Ahrefs check allowance."
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
        },
        {
          "type": "p",
          "text": "[Set up Brand Radar](/help/seo-in-practice/brand-radar)."
        },
        {
          "type": "p",
          "text": "[Explore the new visual workspace and document editor](/help/seo-in-practice/visual-seo-workspace)."
        }
      ]
    },
    {
      "slug": "brand-radar",
      "title": "Track buyer questions with Brand Radar",
      "description": "Read real saved AI answers and sources, choose a schedule and understand the shared check allowance.",
      "body": [
        {
          "type": "p",
          "text": "Open **AI visibility → Brand Radar** in the [web app](https://app.anotherseoguru.com/app/ai-visibility/brand-radar). The selected project determines the linked report; you do not need to enter a report URL. Updated native app versions use the same project data."
        },
        {
          "type": "h2",
          "id": "setup",
          "text": "Start with the questions your customers ask"
        },
        {
          "type": "steps",
          "items": [
            "The account owner connects the project. The new report starts with every platform paused.",
            "Add a customer question and its country. Each question must have fewer than 400 characters. You can add up to ten at a time.",
            "Choose platforms and a daily, weekly or monthly schedule. Review the projected account usage before confirming.",
            "Ahrefs collects answers on that schedule. Sync saved answers reads the results without starting another AI check.",
            "Read the answer, its platform, country and update date. Open the cited source pages before deciding what to change."
          ]
        },
        {
          "type": "h2",
          "id": "allowance",
          "text": "One account allowance, shared across projects"
        },
        {
          "type": "p",
          "text": "One question × one country × one platform × one run is one check. For a Standard connection with 300 included monthly checks, the following daily schedules have the same cost. Additional countries use additional checks."
        },
        {
          "type": "table",
          "head": [
            "Questions",
            "Platforms",
            "30 days",
            "31 days"
          ],
          "rows": [
            [
              "10",
              "1",
              "300 checks",
              "310 checks"
            ],
            [
              "2",
              "5",
              "300 checks",
              "310 checks"
            ],
            [
              "5",
              "1",
              "150 checks",
              "155 checks"
            ]
          ]
        },
        {
          "type": "note",
          "tone": "info",
          "text": "The allowance belongs to the connected Ahrefs account, not each project or each customer. The API does not return the remaining custom-prompt check balance. The app labels its schedule calculation as a projection and checks other account reports before an active change. Ahrefs remains authoritative for actual usage."
        },
        {
          "type": "h2",
          "id": "read",
          "text": "What the results mean"
        },
        {
          "type": "list",
          "items": [
            "A mention means your brand appears in the saved answer. A citation means a source links to your site. They are different observations.",
            "Weak name matches are flagged for review. A competitor named in text is not automatically a recommendation.",
            "Counts describe up to 100 returned saved answers, not every AI search or a global market share.",
            "No saved answer means unavailable. It does not prove that an assistant never mentions you.",
            "Answer update dates do not establish complete historical coverage. The results can vary between people and runs."
          ]
        },
        {
          "type": "h2",
          "id": "costs",
          "text": "Syncing and scheduling are different"
        },
        {
          "type": "p",
          "text": "The current [Ahrefs OpenAPI](https://docs.ahrefs.com/openapi.json), reviewed 20 October 2026, documents free management requests and zero API units for custom-only result reads. Scheduled collection still uses the monthly prompt checks. The app does not buy an additional prompt package or silently switch to Ahrefs’ paid discovery corpus."
        },
        {
          "type": "p",
          "text": "Use the saved answers and source pages to discuss a specific improvement with **Aster AI**. These observations do not guarantee a citation, first position or a recovery date."
        }
      ]
    },
    {
      "slug": "visual-seo-workspace",
      "title": "Explore rankings, links and opportunities",
      "description": "Use interactive views backed by saved Search Console and crawl data, then edit the page in the writing workspace.",
      "body": [
        {
          "type": "p",
          "text": "The updated workspace keeps the same project, dates and source records across its charts and tables. Available in the web app and updated iOS and Android builds. Light and dark themes use the same controls."
        },
        {
          "type": "steps",
          "items": [
            "Open This week → Search landscape. Select a position group to see its queries. Select a transition cell to see searches observed in both comparison periods. Web CSV exports the complete filtered set, not just the five preview rows.",
            "Open Opportunities. Filter the opportunity map, select a point and open its existing recommendation. The vertical axis uses a logarithmic scale for impressions. Point size represents estimated extra clicks, not a promised outcome.",
            "Open Site audit → Crawl explorer. Inspect saved response codes, click depth, page connections and folder flows. Select a page to inspect incoming and outgoing links, or search the page table. Opening the explorer does not start a paid crawl."
          ]
        },
        {
          "type": "note",
          "tone": "info",
          "text": "The ranking view covers returned Search Console rows, not every keyword on the internet. Transitions require observations in both periods. A successful HTTP response does not prove Google indexed a page; link counts do not measure authority."
        },
        {
          "type": "h2",
          "id": "coverage",
          "text": "Read the coverage before drawing conclusions"
        },
        {
          "type": "p",
          "text": "The network draws up to 70 pages at a time. Selecting a page brings its neighbours into view. The figures use the loaded crawl, while the drawing stays manageable. Incomplete crawls are identified. Native reports load up to 5,000 pages and 20,000 link rows and disclose when the limit is reached. Page tables initially show up to 100 matches; search narrows them."
        },
        {
          "type": "h2",
          "id": "writing",
          "text": "Write in a document, with Aster AI beside it"
        },
        {
          "type": "p",
          "text": "In Content → Page library or Content optimizer, Document mode displays headings, emphasis, lists, images and tables inside the editable page. Markdown remains available for source editing. The web writing panel answers questions using the current draft and offers opening-paragraph rewrites. Every rewrite has a before-and-after preview and requires your acceptance. Saving and publishing remain separate actions."
        },
        {
          "type": "p",
          "text": "iOS and Android include the bundled visual document editor and the existing Aster AI rewrite menu. On the phone, controls sit above the document and rewrite previews open separately. Source selection remains available for passages that cannot be mapped reliably. The web draft conversation reads at most the first 14,000 characters and tells you when the draft is longer."
        },
        {
          "type": "h2",
          "id": "integrations",
          "text": "WordPress and Chrome"
        },
        {
          "type": "p",
          "text": "Aster AI answers can show observed ranking groups and a filterable query table when Search Console ranking evidence is present. Open the project links for the full opportunity map and crawl network in the web app. The WordPress content editor remains the WordPress editor."
        },
        {
          "type": "p",
          "text": "[Open the workspace](https://app.anotherseoguru.com/app) or [try the sample workspace](https://app.anotherseoguru.com/demo). Sample reports are labelled; they are not your site’s results."
        }
      ]
    },
    {
      "slug": "client-agreements",
      "title": "Private client agreements",
      "description": "Blank drafts, private storage, versions and exports.",
      "body": [
        {
          "type": "p",
          "text": "Open **Agreements** in Client management or a client’s page. Every new draft starts with blank legal and commercial details. No clients or example agreements are created automatically."
        },
        {
          "type": "steps",
          "items": [
            "Link a client and optionally a project. Complete legal names, representatives, scope, deliverables and terms.",
            "Set fees, installments, monthly periods and explicit VAT treatment. Check the full payment schedule.",
            "Save, inspect the preview and completeness checklist, then export PDF or editable DOCX.",
            "Approval locks the version. Changes require a new version. Copying as a new agreement creates a new ID without signatures or a client link."
          ]
        },
        {
          "type": "h2",
          "id": "registry",
          "text": "Find company details by VAT / GEMI"
        },
        {
          "type": "p",
          "text": "Beside either party, choose Find company by VAT / GEMI. Review the source and select fields to fill. GEMI requires an approved personal API key from its [official service](https://opendata.businessportal.gr/register/), which is not activated yet. Greek tax-ID lookup can already use the European Commission VIES service. VIES covers intra-EU VAT registration and may return a name/address, not a GEMI ID or signing authority. A missing record does not mean the business does not exist. A lookup does not create a client or save an agreement."
        },
        {
          "type": "note",
          "tone": "info",
          "text": "The Greek B2B template needs legal review. Field completeness and author approval are not legal approval or a signature. Do not put passwords or secrets in an agreement."
        },
        {
          "type": "p",
          "text": "Downloading PDF/DOCX does not record delivery or signing. Direct agreement delivery from the app is not enabled. On web, record an actual signed PDF up to 3 MB with signatories and date. The app does not verify electronic signatures."
        },
        {
          "type": "p",
          "text": "Updated iOS and Android builds offer per-client lists, draft editing, version review, preview, export and file sharing. Signed-file and termination records are managed on web. Versions and history are private. Signed files require an authorised, short-lived download link."
        },
        {
          "type": "p",
          "text": "Your lawyer reviews the template and jurisdiction. Your accountant checks VAT and any requirement or exemption for [filing an agreement statement with AADE](https://www.aade.gr/ypoboli-katastasis-symfonitikon). The generic privacy clause does not replace a separate DPA where required."
        }
      ]
    }
  ]
};
