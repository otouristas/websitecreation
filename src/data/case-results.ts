/**
 * Measured results for portfolio projects, from Google Search Console.
 *
 * Every figure here was read from the property's own Search Console data on
 * 2026-11-07 (through the AnotherSEOGuru App warehouse or the Ahrefs GSC
 * connection). Publishing approved by George, 2026-11-07. Keep claims to what
 * the numbers show: no invented tactics, no projections.
 */
export interface CaseMetric {
  /** Greek formatting (1.149, 7,9). */
  readonly value: string;
  /** English formatting when it differs (1,149, 7.9). */
  readonly valueEn?: string;
  readonly labelEn: string;
  readonly labelEl: string;
}

export interface CaseResult {
  readonly slug: string;
  readonly name: string;
  /** The one number the homepage card leads with. */
  readonly headline: CaseMetric;
  readonly metrics: readonly CaseMetric[];
  readonly summaryEn: string;
  readonly summaryEl: string;
  readonly periodEn: string;
  readonly periodEl: string;
}

export const CASE_RESULTS: readonly CaseResult[] = [
  {
    slug: 'discover-cyclades',
    name: 'Discover Cyclades',
    headline: { value: '7.425', valueEn: '7,425', labelEn: 'Google clicks in October 2026', labelEl: 'clicks από Google τον Οκτώβριο 2026' },
    metrics: [
      { value: '7.425', valueEn: '7,425', labelEn: 'clicks in October, outside the peak season', labelEl: 'clicks τον Οκτώβριο, εκτός σεζόν' },
      { value: '+41%', labelEn: 'October clicks against the July peak (5,252)', labelEl: 'clicks Οκτωβρίου σε σχέση με την κορύφωση του Ιουλίου (5.252)' },
      { value: '500K+', labelEn: 'Google impressions in August alone', labelEl: 'εμφανίσεις στη Google μόνο τον Αύγουστο' },
    ],
    summaryEn: 'A Cyclades travel platform that kept growing after the summer: October brought more Google clicks than July.',
    summaryEl: 'Ταξιδιωτική πλατφόρμα για τις Κυκλάδες που συνέχισε να μεγαλώνει μετά το καλοκαίρι: ο Οκτώβριος έφερε περισσότερα clicks από τον Ιούλιο.',
    periodEn: 'Google Search Console, June to October 2026',
    periodEl: 'Google Search Console, Ιούνιος έως Οκτώβριος 2026',
  },
  {
    slug: 'antiparos-rentacar',
    name: 'Antiparos Rent a Car',
    headline: { value: '+48%', labelEn: 'Google clicks, summer 2026 vs summer 2025', labelEl: 'clicks από Google, καλοκαίρι 2026 έναντι 2025' },
    metrics: [
      { value: '+48%', labelEn: 'clicks June to August, year on year (2,179 → 3,214)', labelEl: 'clicks Ιουνίου έως Αυγούστου σε σχέση με πέρσι (2.179 → 3.214)' },
      { value: '21 → 11', labelEn: 'average Google position in July, 2025 vs 2026', labelEl: 'μέση θέση στη Google τον Ιούλιο, 2025 έναντι 2026' },
      { value: '1.149', valueEn: '1,149', labelEn: 'clicks in July 2026, the best month on record', labelEl: 'clicks τον Ιούλιο 2026, ο καλύτερος μήνας που έχει καταγραφεί' },
    ],
    summaryEn: 'A car and scooter rental on Antiparos that moved from page two to the top of page one for its island searches.',
    summaryEl: 'Ενοικιάσεις αυτοκινήτων και scooter στην Αντίπαρο που πέρασαν από τη 2η σελίδα της Google στην κορυφή της 1ης.',
    periodEn: 'Google Search Console, summer 2025 and summer 2026',
    periodEl: 'Google Search Console, καλοκαίρι 2025 και καλοκαίρι 2026',
  },
  {
    slug: 'onoma-hotel',
    name: 'Onoma Hotel',
    headline: { value: '+65%', labelEn: 'Google clicks in three months', labelEl: 'clicks από Google σε τρεις μήνες' },
    metrics: [
      { value: '+65%', labelEn: 'monthly clicks, June to September 2026 (1,031 → 1,704)', labelEl: 'μηνιαία clicks, Ιούνιος έως Σεπτέμβριος 2026 (1.031 → 1.704)' },
      { value: '7,9 → 4,1', valueEn: '7.9 → 4.1', labelEn: 'average Google position', labelEl: 'μέση θέση στη Google' },
      { value: '5,6% → 7,3%', valueEn: '5.6% → 7.3%', labelEn: 'click-through rate', labelEl: 'ποσοστό κλικ (CTR)' },
    ],
    summaryEn: 'A city hotel that climbed into the top four results and turned more of its searches into visits.',
    summaryEl: 'Ξενοδοχείο πόλης που ανέβηκε στις 4 πρώτες θέσεις και μετέτρεψε περισσότερες αναζητήσεις σε επισκέψεις.',
    periodEn: 'Google Search Console, June to September 2026',
    periodEl: 'Google Search Console, Ιούνιος έως Σεπτέμβριος 2026',
  },
  {
    slug: 'helicro',
    name: 'Helicro',
    headline: { value: '4×', labelEn: 'Google clicks in one month', labelEl: 'clicks από Google μέσα σε έναν μήνα' },
    metrics: [
      { value: '61 → 246', labelEn: 'monthly clicks, September to October 2026', labelEl: 'μηνιαία clicks, Σεπτέμβριος έως Οκτώβριος 2026' },
      { value: '509 → 2.454', valueEn: '509 → 2,454', labelEn: 'monthly Google impressions', labelEl: 'μηνιαίες εμφανίσεις στη Google' },
      { value: '3', labelEn: 'airports served: Zaventem, Charleroi and Lille', labelEl: 'αεροδρόμια: Zaventem, Charleroi και Lille' },
    ],
    summaryEn: 'A new Belgian airport-transfer website that quadrupled its Google clicks in its second full month.',
    summaryEl: 'Νέα βελγική ιστοσελίδα μεταφορών αεροδρομίου που τετραπλασίασε τα clicks από Google στον δεύτερο πλήρη μήνα της.',
    periodEn: 'Google Search Console, August to October 2026',
    periodEl: 'Google Search Console, Αύγουστος έως Οκτώβριος 2026',
  },
];

export function getCaseResult(slug: string): CaseResult | undefined {
  return CASE_RESULTS.find((c) => c.slug === slug);
}

export const metricValue = (m: CaseMetric, el: boolean): string => (el ? m.value : m.valueEn ?? m.value);
