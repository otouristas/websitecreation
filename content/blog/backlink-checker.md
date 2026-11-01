---
slug: backlink-checker
title: How to Find and Check Website Backlinks
description: "How to find and check backlinks of any website, with Search Console for your site, free checkers for other domains, and a practical quality review."
date: 2026-09-05
updated: 2026-10-16
author: AnotherSEOGuru Editorial Team
category: SEO
categoryColor: bg-emerald-100 text-emerald-800
pillar: agency-playbooks
faq:
  - question: What is a backlink checker?
    answer: A backlink checker is a tool that lists the pages linking to a website or URL, along with metrics like referring domains, anchor text, follow vs nofollow status, and the authority of each linking site. Ahrefs, Semrush, Moz and Google Search Console are the most used.
  - question: How do I find backlinks of a website?
    answer: For a site you own, open Google Search Console, go to Links, and export external links. For any other site, paste the URL into a backlink checker and export referring domains. Google Search itself does not list another site's backlinks.
  - question: How do I check backlinks for free?
    answer: Open Google Search Console, go to Links, and export "Top linking sites" and "Top linked pages" for your own site. For any other domain, use the free tiers of Ahrefs Backlink Checker, Semrush Backlink Analytics, Moz Link Explorer or SE Ranking, which show the top 100 links and referring domains.
  - question: How do I check backlinks in Google Search?
    answer: You cannot. Searching link:example.com does not return a reliable backlink list. Use Search Console's Links report for a property you verify. For any other domain, use a third-party backlink checker.
  - question: How do I check backlink quality?
    answer: Ignore the raw link count. Check referring domains, whether the links are followed, whether the linking sites are topically relevant, and whether the anchor text is mostly brand and natural phrases. A long tail of relevant sites beats a spike of identical directories.
  - question: How do I check competitor backlinks?
    answer: "Paste the competitor domain into a backlink checker, sort referring domains by traffic or Domain Rating, filter to followed links, and export the list. Then run a link gap report to find sites linking to two or more competitors but not to you: those are your best outreach targets."
  - question: How many backlinks do I have?
    answer: "Google Search Console shows the total external links Google knows about for your site under Links. Third-party backlink checkers will show a different number because each crawls its own index: compare referring domains, not raw link counts, and track the trend rather than the absolute figure."
  - question: How many backlinks do I need to rank?
    answer: "There is no fixed number. Run a backlink checker on the top 5 pages ranking for your target keyword and compare their referring domains to yours. The gap in relevant, followed referring domains is the number to close: usually far fewer than the raw backlink totals suggest."
  - question: What is a toxic backlink and should I disavow it?
    answer: A toxic backlink comes from spam, hacked, or link-scheme sites. Google says it ignores most of these automatically, so disavow only when you have a manual action or clear evidence of a paid link scheme pointing at you. Do not disavow links just because a tool labels them "toxic".
  - question: Which backlink checker is the most accurate?
    answer: Ahrefs has the largest live link index, Semrush is close and updates fast, Majestic stores the deepest historical data, and Moz is the easiest free option. No third-party tool matches Google's own view, so use Search Console for your site and one paid index for competitors.
---

A **backlink checker** lists every page that links to a website, yours or a competitor's, and shows whether those links help, do nothing, or come from spam. To find them: use Google Search Console if you own the site, and a third-party checker for any other URL. Google Search itself will not list another site's backlinks. This page is the step-by-step for both cases, plus how to judge link quality. When you know the gap, the [link building guide](/en/blog/link-building-guide) covers how to earn the links.

## How to find backlinks of a website

The method depends on whether you can verify the site.

### Your own website

1. Open [Google Search Console](https://search.google.com/search-console) for the property you own.
2. Click **Links** in the left menu.
3. Read **Top linking sites**, **Top linked pages**, and **Top linking text**.
4. Click **Export external links** when you need the full list rather than the on-screen sample.

Search Console is free and it is Google's own data. It has no authority scores, it lags the live web by days or weeks, and it only covers properties you verify.

### Any other website

1. Paste the exact URL, not only the homepage, into one backlink checker.
2. Export referring domains. Keep followed links from sites that have their own organic traffic.
3. Open the linking pages and note why they linked: a statistic, a tool, a guide, or a quote.
4. Repeat for the pages that already rank for your query. Sites that link to them and not to you are the outreach list.

Free tiers are enough for a first look. They usually return about the top 100 links:

- **Ahrefs Backlink Checker**: top 100 backlinks, referring domains, DR, and anchor text for any URL.
- **Semrush Backlink Analytics**: free account, ten requests a day, Authority Score and toxicity flags.
- **Moz Link Explorer**: ten free queries a month with DA, spam score, and linking domains.
- **SE Ranking, Seobility, Majestic**: similar samples from smaller or older indexes.

A full competitor gap needs a paid index. Our [best SEO tools roundup](/en/blog/best-seo-tools-2026) shows where each suite fits.

## How to check backlinks in Google Search

You cannot check another site's backlinks from Google Search. The old `link:` operator does not return a reliable list, so `link:example.com` is not a method. What does work:

- **A site you verify:** Search Console → Links. That is Google's view of your external links.
- **A site you do not own:** a third-party backlink checker. Google will not show you that site's links.
- **Pages that mention a brand without linking:** quoted searches. The [Google search operators guide](/en/blog/google-search-operators-2026) covers those. A mention is not a backlink until the page actually links.

If a guide tells you to type `link:` into Google and export the results, it is describing an operator Google retired for this job.

## What is a backlink checker?

A backlink checker crawls the web, records hyperlinks, and lets you query that index by domain or URL. Enter a site and you get its **referring domains** (unique linking websites), total **backlinks** (individual links, often many from one site), the **anchor text** used, whether each link is **followed or nofollow**, and an authority score for each linking domain: Domain Rating (DR) in Ahrefs, Authority Score in Semrush, Domain Authority (DA) in Moz, Trust Flow in Majestic.

None of these tools sees the web exactly as Google does. Each runs its own crawler and index, so counts differ between them. The [glossary entry on backlinks](/en/glossary?term=backlink) covers the terminology if you are new to [off-page SEO](/en/blog/off-page-seo).

## Best backlink checker tools compared

| Tool | Free tier | Index strength | Best for | Paid from |
| :--- | :--- | :--- | :--- | :--- |
| Google Search Console | Unlimited, own site only | Google's own data | Monitoring your site, disavow decisions | Free |
| Ahrefs | Top 100 links per URL | Largest live index, fastest crawl | Competitor analysis, link gap, lost links | $129/mo |
| Semrush | 10 checks/day | Very large, fast updates | Backlink audit with toxicity score, outreach | $139.95/mo |
| Moz Link Explorer | 10 queries/mo | Mid-size | DA checks, spam score, beginners | $49/mo |
| Majestic | Sample only | Deep historical index | Trust Flow, Citation Flow, link history | $49.99/mo |
| SE Ranking | Limited sample | Mid-size | Budget all-in-one with backlink monitor | $65/mo |

Two rules make the choice simple. If you manage one site and mostly need your own links, Search Console plus one free checker is enough. If you sell SEO, publish weekly, or need competitor data, pay for one large index. We compare the two leaders in [Ahrefs vs AnotherSEOGuru](/en/compare/ahrefs) and [Semrush vs AnotherSEOGuru](/en/compare/semrush).

## How to check backlink quality

Raw link counts mislead. One site can send 5,000 sitewide footer links and count for less than one editorial mention in a relevant article. Read the report in this order:

1. **Referring domains, not backlinks.** Growth in unique linking sites is the metric that correlates with rankings. Ten links from one domain roughly equal one vote.
2. **Followed vs nofollow ratio.** Followed links pass authority. Nofollow, UGC and sponsored links still bring referral traffic and brand signals but little ranking weight.
3. **Authority distribution.** A healthy profile has a long tail of DR 10-40 relevant sites and a few DR 60+ editorial links. All DR 0-5 directories, or all identical DR 50 guest post farms, looks manufactured.
4. **Anchor text mix.** Mostly brand names, URLs, and natural phrases. If 40 percent of anchors are exact-match commercial keywords, Google's link spam systems notice.
5. **Velocity and lost links.** Steady acquisition beats spikes. Check the new and lost reports monthly; a sudden drop usually means a redesign broke URLs, which is a [technical SEO](/en/blog/pillar-technical-seo-in-house) fix, not a link building problem.
6. **Relevance.** A linking site your buyers never read is a weak link even when its authority score is high. Open the page. If the topic does not overlap, the score does not matter.

A quality pass is manual. Export the referring domains, sort by the linking site's traffic, and open the ones you might want more of. Tools can flag spam patterns. They cannot tell you whether the link belongs in your niche.

## How to check competitor backlinks (the link gap workflow)

This is where a backlink checker pays for itself. The workflow takes about 30 minutes per keyword cluster:

1. Search your target keyword and note the top 5 ranking URLs.
2. Paste each URL into the backlink checker and export referring domains, filtered to followed links from sites with organic traffic above 500.
3. Run the **link intersect** or **backlink gap** report with your domain as the target. Sites linking to two or more competitors but not to you are warm prospects.
4. Sort by referring-domain traffic and relevance, discard directories, scrapers and PBN-looking networks, and you have an outreach list.
5. Read the linking pages and note *why* they linked (a statistic, a tool, a guide, an expert quote) then build the asset that earns the same link. Skipping this step is why most outreach fails.

Pair the list with [keyword research](/en/tools/keyword-research) so you chase links for pages that can actually rank once the authority gap closes. The emails and prospect sheet for that outreach are in the [link building guide](/en/blog/link-building-guide).

## Backlink audit: finding toxic backlinks

Every backlink checker now sells a "toxic score", and most of it is noise. Google has said repeatedly that it ignores spammy links it does not trust, so the average site never needs a disavow file. A backlink audit is still worth doing once or twice a year for three reasons:

- **Manual actions.** An "unnatural links" penalty in Search Console means you must identify and disavow the paid or scheme links, then file reconsideration.
- **Negative SEO or hacked-site spam.** Thousands of adult, gambling or pharma links appearing in a week are worth documenting and disavowing as a precaution.
- **Your own past mistakes.** Old paid link packages, PBNs, or widget links with exact-match anchors are the one category worth removing proactively.

How to run it: export all referring domains, sort by lowest DR and highest link count, and manually review anything with spam patterns (foreign-language link farms, no organic traffic, hundreds of outbound links per page). Only then create a domain-level disavow file. Never upload a tool's auto-generated toxic list: you will disavow legitimate links and lose rankings. A professional [SEO audit](/en/services/seo-audits) includes this review with the disavow decision made for you.

## Backlink monitoring and common mistakes

A backlink checker used once is a snapshot. Used monthly, it is an early-warning system. Turn on new and lost referring-domain alerts, reclaim lost links first (fixing a broken URL usually restores the link), and report links next to the [organic traffic](/en/blog/how-to-increase-organic-traffic) trend so they are judged by what they moved.

Four mistakes waste the most time:

1. **Comparing counts across tools.** Ahrefs, Semrush and Moz will never agree. Pick one and track the trend.
2. **Chasing DA or DR alone.** A DR 70 site your customers never read is worth less than a DR 30 niche publication with real traffic.
3. **Disavowing on a toxicity score.** This causes more ranking losses than it prevents.
4. **Auditing links before fixing the site.** If the [free SEO audit](/en/tools/free-seo-audit) shows indexation problems or the [internal linking audit](/en/blog/internal-linking-audit-checklist) shows orphan pages, fix those first.

## FAQ

### What is a backlink checker?

A tool that lists the pages linking to a domain or URL, with referring domains, anchor text, follow status, and linking-site authority. Search Console, Ahrefs, Semrush, Moz and Majestic are the main options.

### How do I find backlinks of a website?

For a site you own, use Search Console → Links and export external links. For any other site, paste the URL into a backlink checker and export referring domains.

### How do I check backlinks for free?

Use Google Search Console's Links report for your own site. For any other domain, the free versions of Ahrefs, Semrush or Moz show the top links and referring domains.

### How do I check backlinks in Google Search?

You cannot list another site's backlinks from Google Search. The `link:` operator is not a reliable method. Search Console is the Google view, and only for properties you verify.

### How do I check backlink quality?

Count referring domains rather than raw links, prefer followed links from relevant sites, and read the anchor text. A long tail of relevant sites is healthier than a pile of identical directories.

### How do I check competitor backlinks?

Enter the competitor URL in a backlink checker, export followed referring domains with real traffic, then run a link gap report against your own domain.

### How many backlinks do I have?

Search Console gives Google's count under Links. Third-party checkers differ because each has its own index. Track referring domains over time, not the raw number.

### How many backlinks do I need?

Compare your referring domains to the top 5 pages ranking for your keyword. The gap in relevant, followed referring domains is what you need to close.

### What is a toxic backlink and should I disavow it?

A link from spam, hacked or link-scheme sites. Google ignores most of them; disavow only with a manual action or clear evidence of paid link schemes.

### Which backlink checker is most accurate?

Ahrefs has the largest live index, Semrush the fastest updates, Majestic the deepest history, Moz the easiest free option. Pair Search Console with one paid tool.

## Ready to turn the backlink gap into a plan?

Run the checker, export the competitor gap, and bring it to us. We start with a full [SEO audit](/en/services/seo-audits), map the pages worth promoting, and run white-hat [link building](/en/services/link-building) that closes the gap with links your buyers actually see. Review [pricing](/en/pricing) or [get started](/en/get-started) with your money pages and competitor list.
