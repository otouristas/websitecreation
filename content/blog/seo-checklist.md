---
slug: seo-checklist
title: Website SEO Checklist (2026)
description: "A practical 2026 website SEO checklist for crawl, on-page, speed, internal links and local signals, with a sheet you can tick, download or print."
date: 2026-10-16
author: AnotherSEOGuru Editorial Team
category: SEO
categoryColor: bg-emerald-100 text-emerald-800
pillar: agency-playbooks
faq:
  - question: What is a website SEO checklist?
    answer: A website SEO checklist is an ordered list of crawl, on-page, speed, internal-link and local checks you can verify on a live site. It is a working order, not a score.
  - question: How often should I run a website SEO checklist?
    answer: Run the full list after launch, a redesign or a migration. Between those events, recheck titles, index coverage and Core Web Vitals each month, and again after any template change.
  - question: What should I fix first on a website?
    answer: Fix indexation and canonicals before rewriting copy. A page Google cannot keep in the index will not benefit from a better title or a longer article.
  - question: Does this checklist cover AI search?
    answer: Clear answers, headings and visible facts help both Google and AI systems that quote pages. The list does not add a separate score for ChatGPT or AI Overviews.
  - question: Can I download the website SEO checklist?
    answer: Yes. The sheet on this page saves ticks in your browser and downloads as Markdown or CSV, or you can print it. Nothing is uploaded.
---

A **website SEO checklist** is the shortest honest order for checking a site: can Google crawl and keep the right URLs, does each URL match one intent, is the template usable on a phone, and do internal links point at the pages that should rank. This page is that list. Tick items in the browser, download the sheet, or print it. Ticks stay on this device.

If the terms are new, read [what SEO is](/en/blog/what-is-seo) and the [beginner guide](/en/blog/seo-for-beginners) first. The checks below assume you can open Google Search Console and view a page's HTML, not only the CMS preview.

## What to check, and in what order

A flat list treats a missing meta description and a noindex on the homepage as equal. They are not. Work in layers, and stop when a layer is broken:

1. **Crawl and index.** If the preferred URL is not the one Google stores, later edits land on the wrong page.
2. **On-page clarity.** The title, the H1 and the first screen have to match the query you want.
3. **Templates and speed.** A slow or shifting template taxes every URL that uses it.
4. **Internal links.** Orphan money pages do not get the benefit of the content you already wrote.
5. **Local signals,** only if customers search for a place.
6. **Measurement.** Search Console has to be on the canonical host before you can tell whether a fix moved anything.

A referring-domain target is a planning note, not a box this page can tick. When pages are worth linking to, use the [link building guide](/en/blog/link-building-guide).

## Tick the checklist

The sheet below is the working copy. Mark an item only after you have checked it on the live site. Download Markdown or CSV, or print it. Ticks stay in this browser.

<!-- seo-checklist -->

## Priority by what breaks first

| Phase | Check before you move on | If it fails |
| :--- | :--- | :--- |
| Crawl and index | Preferred host, robots.txt, accidental noindex, canonicals, sitemap | Fix this before any copy work |
| On-page | One intent, title, H1, opening answer, meta description | Rewrite the URL. Do not add a second page for the same query |
| Speed | LCP, INP and CLS on the templates that carry money URLs | Fix the template, not one blog post |
| Internal links | Money pages have inlinks; anchors say where they go | Link from the hub that should support them |
| Local | Verified Business Profile, matching name, address and phone | Only for queries that include a place |
| Measurement | Search Console on the canonical host; queries in positions 4-20 noted | You are guessing until this exists |

The technical pass is spelled out in the [technical SEO guide](/en/blog/technical-seo-guide). Titles, headings and intent are in the [on-page SEO guide](/en/blog/on-page-seo). Use a [free SEO audit](/en/tools/free-seo-audit) as a first look, then confirm anything it flags in Search Console. An automated crawl will not tell you whether the page matches the query.

## How to mark an item done

"Done" means you can point at evidence.

- **Indexation.** URL Inspection shows the canonical you chose. If Google picked another URL, the box stays empty until the redirect or the tag is fixed.
- **Titles.** The title in the rendered HTML matches what you shipped, the query sits near the front, and no other URL repeats it. Plugins often overwrite the CMS field.
- **Speed.** The numbers are for the money template on mobile, not one desktop run of the homepage.
- **Internal links.** A crawl or the Links report shows inlinks from a relevant hub. A footer link alone is not that.
- **Local.** The Business Profile is verified and the name, address and phone match the site.

Leave the box empty when you cannot show that. A full sheet and no Search Console property is not a finished audit.

## A short pass on a small site

On a local service site with a homepage, a few service URLs, city pages and a blog, the first hour is the host and the index. If both `www` and the bare domain return 200, redirect one to the other before you touch copy. If URL Inspection says a service page is excluded, that is the task for the day.

Then read the service titles in the rendered HTML. Give each URL one query, using the [keyword research guide](/en/blog/keyword-research-guide), and rewrite the title and opening so they match. Length and proof are covered in the [SEO content guide](/en/blog/seo-content-guide). Do not add another service URL until the current ones are indexable and different from each other.

City pages that only swap a place name into one template are not location pages yet. Add something true about that place, or keep them out of the index until you can. The [local SEO guide](/en/blog/local-seo-guide) is the Business Profile work that often moves map results sooner than another city URL. Each blog post should link to the service it supports. The [internal linking audit checklist](/en/blog/internal-linking-audit-checklist) is the longer version of that pass.

## Links, local and AI search

Count the referring domains you already have. Decide which URLs deserve mentions: pages that explain a method, publish a figure, or document a project. A target count is a planning note. It is not proof the site is healthy, and buying links to colour a cell in does not fix the pages. Use the [link building guide](/en/blog/link-building-guide) once there is something specific to point at.

The map pack depends on the profile, reviews, and whether the site agrees with the profile. [Local SEO](/en/services/local-seo) is that work. Skip the local group on the sheet if you do not serve a place.

AI search does not need a second list. Pages that answer in the first screen, use real headings, and keep facts in the HTML are the ones systems can quote. Do not add FAQ markup for questions the page does not show.

## Where checklists go wrong

1. **Ticking the CMS, not the rendered page.** A title field overwritten by a plugin is not the title Google sees.
2. **Starting with blog posts** while money URLs are noindexed, canonicalised to the homepage, or missing from the sitemap.
3. **One checklist item meaning the same thing on every URL.** A hotel room page, a practice page and a glossary entry share the order of layers. They do not share the proof.
4. **Chasing a link count** before the pages worth linking to are indexable and specific.
5. **Never reopening the list.** Redesigns, host moves and plugin updates quietly undo canonicals, redirects and headings. Run it again after each of those.

## Ready to turn the checklist into a plan

If the first pass shows index or template problems, an [SEO audit](/en/services/seo-audits) is faster than guessing from a spreadsheet. Ongoing on-page and technical work sits in retainers from {{ENTRY_SEO}}/mo, listed on [pricing](/en/pricing). [Get started](/en/get-started) with the URLs you care about and we will say which layer to fix first.
