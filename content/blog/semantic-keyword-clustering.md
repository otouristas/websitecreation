---
slug: semantic-keyword-clustering
title: Semantic Keyword Clustering - A Practical Guide
description: What semantic keyword clustering is, how embeddings and intent grouping work, how to do it in Python or without code, and how to turn clusters into a content plan.
date: 2026-08-19
author: AnotherSEOGuru Editorial Team
category: SEO
categoryColor: bg-emerald-100 text-emerald-800
locale: en
pillar: search-console-mastery
faq:
  - question: What is semantic keyword clustering?
    answer: Grouping keywords by the meaning and intent behind them rather than by shared words, so each group maps to one page you should build. It answers how many pages a topic needs and what each one covers.
  - question: How do you cluster keywords in Python?
    answer: Convert each keyword to an embedding with a sentence-transformer model, compute pairwise cosine similarity, then group with agglomerative clustering at a distance threshold you tune by inspecting the output. Roughly thirty lines end to end.
  - question: What similarity threshold should I use?
    answer: There is no universal value. Start around 0.75 cosine similarity, read fifty clusters by hand, and move it. Too loose merges different intents; too tight produces near-duplicate groups that imply near-duplicate pages.
  - question: Can you cluster keywords without code?
    answer: Yes. Group by SERP overlap instead - if two queries return largely the same results, one page can serve both. It is slower to gather but reflects how the search engine already treats the queries.
  - question: How is semantic clustering different from keyword grouping?
    answer: Ordinary grouping matches shared text, so paraphrases split apart and different intents merge together. Semantic clustering compares meaning, then separates by intent, which maps far more closely to how pages actually rank.
---

Most keyword exports arrive as a few thousand rows with no structure. The question that matters is not which row has the highest volume — it is **how many pages this list actually represents**, and what each of those pages should cover. That is what clustering answers.

## What semantic keyword clustering is

Semantic keyword clustering groups keywords by the meaning and intent behind them rather than by the words they share.

The distinction is not academic. Two phrases can look almost identical and belong on different pages. Two phrases with no words in common can belong on the same one.

- "running shoes" and "trainers for running" — no shared words, same page
- "cheap running shoes" and "running shoes for flat feet" — two shared words out of three, different pages

String matching gets both of these wrong. Meaning-based grouping gets both right.

## Meaning is only the first axis

Grouping on meaning alone still merges things that should stay apart. "What is technical SEO" and "technical SEO agency" are semantically adjacent — same subject, nearly the same vocabulary — but one reader wants an explanation and the other wants a supplier. One becomes an article, the other a service page.

So useful clustering works on two axes at once:

| Axis | Question | Why it matters |
|---|---|---|
| Semantic similarity | Do these mean the same thing? | Merges paraphrases and synonyms |
| Search intent | What is the reader trying to do? | Splits explanation from purchase |

Intent is usually sorted into four buckets: informational, commercial, transactional, navigational. You do not need a classifier to apply this — reading the top ten results for a query tells you what the engine currently believes the intent is.

## The no-code method: SERP overlap

Before reaching for embeddings, there is a method that needs no code and reflects how the search engine already behaves.

For each pair of queries, collect the top ten ranking URLs and count how many appear in both. If two queries share most of their results, the engine already treats them as the same need, and one page can serve both. If they share almost none, they need separate pages.

This is slower to gather, and it costs API calls if you automate the collection. But it has one advantage nothing else does: it is evidence about the live SERP rather than a hypothesis about language. When a semantic model and SERP overlap disagree, the SERP is usually the one to trust.

## The Python method

If you want control over the method, the code is short. The shape of it:

1. **Embed each keyword.** A sentence-transformer model turns each phrase into a vector. `all-MiniLM-L6-v2` is a common starting point because it is small and fast; larger models group more subtly and cost more to run.
2. **Compute pairwise similarity.** Cosine similarity between every pair of vectors. For a few thousand keywords this is a single matrix operation.
3. **Cluster.** Agglomerative clustering with a distance threshold is the usual choice, because you do not have to declare the number of clusters up front — which you almost never know. HDBSCAN is a reasonable alternative when you also want outliers flagged rather than forced into a group.
4. **Name each cluster.** The keyword closest to the cluster centroid is a serviceable label, and usually a good candidate for the page's primary target.
5. **Read the output.** Not optional. See below.

Two practical notes. Normalise before embedding — lowercase, strip punctuation, collapse whitespace — or you will get clusters that differ only by capitalisation. And handle brand terms separately: they distort groupings because they are semantically close to everything in your catalogue.

The threshold is the parameter that decides whether the output is useful. There is no correct value to copy. Start near 0.75 cosine similarity, read fifty clusters by hand, and adjust. Too loose and unrelated intents collapse into one oversized cluster. Too tight and you get hundreds of near-duplicate groups implying hundreds of near-duplicate pages — the exact problem clustering was supposed to prevent.

## What you actually do with clusters

The cluster list is a means, not the deliverable. Four things get built from it.

**Content planning.** Each cluster becomes at most one page. This is the step that converts an unordered export into a finite backlog you can prioritise and finish.

**Topical maps.** Arrange clusters into a hub and its supporting pages: a broad pillar covering the topic, narrower pages covering its sub-questions. The clustering tells you which is which — the largest, most general cluster is usually the hub.

**Cannibalisation prevention.** Map your *existing* URLs to clusters. Two URLs in one cluster are competing for the same intent, which is the definition of cannibalisation. Merge them, redirect the weaker one, or narrow one to a genuinely different intent.

**Internal linking.** Pages within a cluster link to each other and up to the hub. This is a more defensible pattern than linking on exact-match anchors wherever a phrase happens to appear, and it survives the next algorithm update better.

## Where clustering goes wrong

- **Treating output as final.** Clustering is a judgement aid. Every run needs a human pass before it becomes a plan.
- **Ignoring commercial weight.** Two clusters of identical size can be worth wildly different amounts. No algorithm knows your margins.
- **Clustering the long tail too early.** Very low-volume phrases distort groupings without changing decisions. Filter first, cluster second.
- **One page per keyword.** The most expensive mistake, and the one clustering exists to prevent.
- **Never re-running it.** Intent shifts. A cluster that was informational two years ago may be transactional now, and the SERP will have moved before you notice.

## Where to start

If you have never done this, start with the no-code method on your thirty most commercially important queries. It takes an afternoon and usually surfaces at least one pair of pages competing for the same intent.

If you are working at the scale of a few thousand keywords, the Python route pays for itself quickly — but budget the time to read the output, not just to run it.

Related reading: [Semantic Keyword Clustering in the platform](/en/platform/features/semantic-keyword-clustering), the [technical SEO guide](/en/blog/technical-seo-guide), and [how to prioritise Search Console queries](/en/blog/gsc-query-prioritization-framework).
