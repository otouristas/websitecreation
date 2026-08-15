/**
 * Shapes for the coded product mockups.
 *
 * These illustrate the AnotherSEOGuru platform's UI (app.anotherseoguru.com),
 * which is genuinely Google Search Console-native. The series are
 * representative of the interface, NOT claimed client results - no figure here
 * is presented anywhere as a customer outcome.
 */

export interface TrendPoint {
  label: string;
  clicks: number;
  impressions: number;
  position: number;
}

/** 12-month impressions/clicks shape for the hero dashboard chart. */
export const searchTrend: TrendPoint[] = [
  { label: 'Sep', clicks: 210, impressions: 12400, position: 28.4 },
  { label: 'Oct', clicks: 268, impressions: 14100, position: 26.1 },
  { label: 'Nov', clicks: 341, impressions: 16800, position: 23.7 },
  { label: 'Dec', clicks: 402, impressions: 18200, position: 21.2 },
  { label: 'Jan', clicks: 515, impressions: 21600, position: 18.9 },
  { label: 'Feb', clicks: 640, impressions: 24900, position: 16.4 },
  { label: 'Mar', clicks: 788, impressions: 28300, position: 14.1 },
  { label: 'Apr', clicks: 921, impressions: 31800, position: 12.3 },
  { label: 'May', clicks: 1104, impressions: 35400, position: 10.6 },
  { label: 'Jun', clicks: 1290, impressions: 39100, position: 9.2 },
  { label: 'Jul', clicks: 1482, impressions: 42700, position: 8.1 },
  { label: 'Aug', clicks: 1695, impressions: 46200, position: 7.3 },
];

export interface KeywordRow {
  keyword: string;
  position: number;
  change: number;
  impressions: number;
  cluster: string;
}

/** "Striking distance" table - the platform's core view. */
export const strikingDistance: KeywordRow[] = [
  { keyword: 'seo υπηρεσίες', position: 6.0, change: +4.2, impressions: 45, cluster: 'SEO services' },
  { keyword: 'κατασκευή ιστοσελίδων αθήνα', position: 16.1, change: +2.8, impressions: 41, cluster: 'Web design' },
  { keyword: 'προώθηση ιστοσελίδων τιμή', position: 1.0, change: +0.4, impressions: 5, cluster: 'SEO services' },
  { keyword: 'seo για ξενοδοχεία', position: 24.8, change: +6.1, impressions: 118, cluster: 'Hotel SEO' },
  { keyword: 'geo agency ελλάδα', position: 12.8, change: +9.3, impressions: 204, cluster: 'AI visibility' },
];

export interface ClusterRow {
  name: string;
  keywords: number;
  avgPosition: number;
  tone: 'primary' | 'brand' | 'neutral';
}

export const clusters: ClusterRow[] = [
  { name: 'SEO services & pricing', keywords: 24, avgPosition: 11.4, tone: 'primary' },
  { name: 'Web design by city', keywords: 31, avgPosition: 18.2, tone: 'brand' },
  { name: 'E-shop / WooCommerce', keywords: 17, avgPosition: 26.7, tone: 'neutral' },
];

export interface CitationRow {
  engine: string;
  cited: boolean;
  prompt: string;
}

/** AI-visibility panel: where the brand is cited across answer engines. */
export const aiCitations: CitationRow[] = [
  { engine: 'ChatGPT', cited: true, prompt: 'best seo agency in greece' },
  { engine: 'Perplexity', cited: true, prompt: 'hotel seo greece' },
  { engine: 'Google AI Overviews', cited: false, prompt: 'πόσο κοστίζει το seo' },
  { engine: 'Gemini', cited: true, prompt: 'geo aeo agency' },
];

/** Voice/chat transcript for the phone frame. */
export const assistantThread = [
  { from: 'user' as const, text: 'Which pages lost traffic last month?' },
  { from: 'bot' as const, text: 'Three pages dropped. /el/services/local-seo fell 8 positions after a template change on 12 Aug.' },
  { from: 'user' as const, text: 'What should I fix first?' },
  { from: 'bot' as const, text: 'Restore the H1 and internal links on that template. It has 1,240 impressions at position 14 - the fastest win available.' },
];
