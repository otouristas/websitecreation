export interface HomeFaqItem {
  readonly question: string;
  readonly answer: string;
}

/** Agency FAQ aligned to GSC commercial queries — not the software product. */
export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    question: 'What does AnotherSEOGuru do?',
    answer:
      'AnotherSEOGuru is a web design and SEO agency. We build websites, WooCommerce shops, and hotel sites, then grow them with technical SEO, local SEO, GEO, and AEO so you win bookings and leads — not just traffic.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Website packages start at €899 for small businesses. Hotel and multi-property projects typically sit in the €1,799–€2,999+ range. Every site ships SEO-ready: speed, schema, metadata, and a content plan.',
  },
  {
    question: 'How much does SEO cost in Greece?',
    answer:
      'Monthly SEO starts at €299 for local businesses and scales with competition and keyword scope. A full retainer includes technical work, on-page, schema, content, links, and GEO/AEO for AI answers.',
  },
  {
    question: 'What is GEO vs SEO vs AEO?',
    answer:
      'SEO ranks you in classic Google results. AEO (Answer Engine Optimization) structures content so AI systems can extract a direct answer. GEO (Generative Engine Optimization) helps your brand get cited in ChatGPT, Perplexity, Gemini, and Google AI Overviews. We implement all three on every site.',
  },
  {
    question: 'Do you build hotel and rent-a-car websites?',
    answer:
      'Yes. Tourism is our deepest vertical: hotels, villas, rent-a-car, and tours. We design for direct bookings, multilingual pages, and island/city SEO so you rely less on OTAs.',
  },
  {
    question: 'How long until SEO shows results?',
    answer:
      'Search Console impressions usually move in 3–6 months. Meaningful booking or lead growth typically takes 6–12 months, depending on competition and how fast content ships.',
  },
  {
    question: 'Is SEO included in the website price?',
    answer:
      'Yes. Every website includes technical SEO, schema, Core Web Vitals work, and metadata. Ongoing ranking work is a separate monthly package from €299.',
  },
  {
    question: 'SEO or Google Ads — which should I buy first?',
    answer:
      'If you need leads this week, ads can fill the gap. If you want compounding demand you own, start with the website and SEO. Most clients do a short ads burst while organic rankings build.',
  },
];
