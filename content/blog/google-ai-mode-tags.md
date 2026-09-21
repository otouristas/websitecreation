---
slug: google-ai-mode-tags
title: Google AI Mode tags and what grounds them
description: What AI Mode's leaked output tags appear to be, why a website cannot emit them, and what a page has to publish to fill one of those slots.
date: 2026-09-21
author: AnotherSEOGuru Editorial Team
translationOf: google-ai-mode-tags-el
category: AI SEO
categoryColor: bg-sky-100 text-sky-800
pillar: ai-llm-visibility
faq:
  - question: Can I add these tags to my HTML?
    answer: No. They are the model's output vocabulary, rendered by Google's front end. Your page supplies the data a card is built from, and that is the whole of your control.
  - question: Is this documented by Google?
    answer: No. It is reverse-engineered from prompt leaks. Google has not acknowledged the vocabulary, and the published source contains editing artifacts and one invalid JSON example.
  - question: Does schema markup make AI Mode show my business?
    answer: It cannot make anything happen. Structured data makes a page readable without guessing. Whether an engine uses it is the engine's decision, and nobody can promise otherwise.
  - question: How many items does a list need?
    answer: The source says three, sharing one entity type. Below either threshold the container is said to flatten to plain bullets. Treat it as a floor worth meeting anyway.
  - question: What should I do first if I only do one thing?
    answer: Fill in the entity block you already have. Most sites declare a type and stop, which tells a machine that a business exists without telling it which one.
---

A tag list from Google's AI Mode has been circulating since Dan Petrovic published it on 20 September 2026. It catalogues the markup the system appears to emit so its front end can render cards, carousels, maps, product modules and interactive widgets inside an AI answer.

The useful part is not the list. It is what the list implies about where your control actually ends.

## You cannot emit these tags

This is the misreading to get out of the way first, because a lot of advice this month will be built on it.

`<Carousel>`, `<Entity>`, `<layout type="map">`, `<Product>`, `<DataViz>` and the rest are **the model's output vocabulary**. The model writes them; Google's front end renders them. They never appear in a website's HTML, and adding them to yours does nothing at all.

What a site can be is the **grounding source** the card is assembled from. That reframes the whole document. The "required grounding attributes" column in the entity table stops being trivia about Google's internals and becomes a checklist of what a page has to publish for a given card to have anything to render.

## Read the source critically

Before you build a strategy on this, three things are worth knowing.

It is reverse-engineered from prompt leaks, not a published specification. Google has not confirmed the vocabulary exists, and a leak is a snapshot of one moment in a system that changes weekly.

The published article still carries its drafting artifacts. Several sections open with "Your draft mentions…" or "While your draft covers…", which is an editing session that made it into the final text rather than analysis of the leak.

And one example does not parse. The `<InlineQuiz>` block gives the second question an unquoted `explanation` value, so it is not valid JSON. Small, but it tells you the examples are illustrative rather than captured output.

The layout and grounding-attribute columns in the 30-entity table also read as the author's own synthesis rather than leaked material. That does not make them wrong. It makes them a hypothesis.

None of this makes the document useless. It makes it intelligence rather than documentation, and the right response is to act only on what would be worth doing anyway.

## The two rules you can actually measure

Most of the vocabulary is unfalsifiable from outside. Two claims are not, and they are the ones to work with.

**Homogeneity.** Entries inside one container must share a single entity type. Mix hotels and restaurants in one list and it is said to degrade to plain bullets.

**A minimum of three.** A carousel or image grid needs at least three validated children. With one or two, the layout flattens.

Both are ordinary content-architecture advice wearing a new hat. A list of three parallel things, each described with the same attributes, is easier for anything to read, a search engine and a person alike. That is the test every recommendation below has to pass: **worth doing even if the leak is wrong.**

## What the entity types actually ask for

Thirty entity types is a lot. Most will never apply to you. The ones that matter for a typical services or hospitality business are these.

| Entity type | Layout it feeds | What your page must publish |
| :--- | :--- | :--- |
| LodgingPlace | Carousel | Price per night, three or more images, coordinates |
| LocalServiceOrTradeBusiness | List | Service area, service type, licence or registration |
| PhysicalStoreOrLocalBusiness | Map | Address, opening hours, coordinates |
| Event | Event card | Start date and time, venue with coordinates, ticket price |
| SpecificPurchasableSoftwareSystem | Comparison | Feature list, licence or plan, platform compatibility |
| SpecificPerson | List | Name, role, biography, profile links |
| VehicleModel | Comparison | Trim, efficiency, transmission and seats, daily rate |

Read the right-hand column as the actual deliverable. Every row is a set of schema.org properties you either publish or do not, and the honest summary of most sites is that they declare a type and stop there.

## The gap almost everyone has

Run a check on your own homepage and you will probably find an `Organization` or `LocalBusiness` block containing a name, maybe a logo, and nothing else.

That block tells a machine that a business exists here. It does not tell it **which** business, where, reachable how, open when. Declaring the type is the easy half, and it is the half everyone does.

The fix is unglamorous and it is the highest-value thing on this page: open the entity block you already have and fill it in. Name, url, address, telephone, opening hours, `sameAs` links to the profiles that corroborate you. No new pages, no new vocabulary.

## What this changes about GEO work

Not much, and that is the point worth making to anyone selling you a new service line off the back of this leak.

The work is the same work: a clear entity, real structured data matching what is visibly on the page, content that answers questions in server-rendered HTML, and lists that are parallel and long enough to be worth reading as a set. We wrote about how that sits alongside classic search in [GEO vs SEO vs AEO](/en/blog/geo-vs-seo-vs-aeo), and about measurement in [LLM citations and brand visibility](/en/blog/llm-citations-brand-visibility).

What the leak genuinely adds is **specificity about thresholds**. Three items, not two. One type per container, not a mixed list. Those are concrete enough to audit, which is more than most GEO advice offers.

What it does not add is any promise. Nothing here makes an engine cite you. Optimisation makes content usable by an answer engine; using it remains the engine's decision, and anyone telling you otherwise is selling something.

## Want to see what a machine can read on your site?

Our [live site test](/en/get-started) checks the entity block, list shape and image assets described above and reports what is missing, in plain language. If you would rather read first, the [AI visibility service](/en/services/ai-visibility) explains what the ongoing work involves and what it will not promise, and the [glossary](/en/glossary) defines the terms. The wider cluster starts at [AI and LLM visibility](/en/blog/pillar-ai-llm-visibility).

## FAQ

### Can I add these tags to my HTML?

No. They are the model's output vocabulary, rendered by Google's front end. Your page supplies the data a card is built from, and that is the whole of your control.

### Is this documented by Google?

No. It is reverse-engineered from prompt leaks. Google has not acknowledged the vocabulary, and the published source contains editing artifacts and one invalid JSON example.

### Does schema markup make AI Mode show my business?

It cannot make anything happen. Structured data makes a page readable without guessing. Whether an engine uses it is the engine's decision.

### How many items does a list need?

The source says three, sharing one entity type. Below either threshold the container is said to flatten to plain bullets. Treat it as a floor worth meeting anyway.

### What should I do first if I only do one thing?

Fill in the entity block you already have. Most sites declare a type and stop, which tells a machine that a business exists without telling it which one.

*Source: Dan Petrovic, DEJAN AI, 20 September 2026. Treat it as intelligence, not documentation.*
