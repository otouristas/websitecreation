import type { SiteLocale } from '@/lib/i18n/locale';
import type { SearchPreviewResult } from './types';

/**
 * The worked example the tool shows before anyone has run a check, and the one
 * it falls back to when the live check is unavailable.
 *
 * Same placeholder hotel as the homepage's `AiSearchSplit` section, in the
 * shape a live run returns, so the panels render identically either way. It is
 * always flagged `sample: true` and the UI labels it - an illustration of the
 * three surfaces, never a claimed placement.
 */

const EL: SearchPreviewResult = {
  keyword: 'boutique ξενοδοχείο Πάρος κοντά στο λιμάνι',
  market: 'gr-el',
  domain: 'your-hotel.gr',
  fetchedAt: '',
  sample: true,
  google: {
    matched: true,
    matchRank: 1,
    results: [
      {
        rank: 1,
        title: 'Boutique ξενοδοχείο στο λιμάνι της Παροικιάς · Your Hotel Paros',
        url: 'https://your-hotel.gr/domatia',
        domain: 'your-hotel.gr',
        breadcrumb: 'your-hotel.gr › δωμάτια',
        snippet:
          'Εννέα δωμάτια 300 μ. από το πλοίο. Δωρεάν παραλαβή από το λιμάνι, πρωινό στη βεράντα, τιμές απευθείας κράτησης.',
        isMatch: true,
      },
      {
        rank: 2,
        title: 'Τα 10 καλύτερα boutique ξενοδοχεία στην Πάρο',
        url: 'https://www.booking.com/paros',
        domain: 'booking.com',
        breadcrumb: 'booking.com › paros',
        snippet: 'Δείτε διαθεσιμότητα και τιμές για καταλύματα στην Παροικιά και σε όλη την Πάρο.',
        isMatch: false,
      },
      {
        rank: 3,
        title: 'Ξενοδοχεία Πάρος - κριτικές ταξιδιωτών',
        url: 'https://www.tripadvisor.com/Hotels-Paros',
        domain: 'tripadvisor.com',
        breadcrumb: 'tripadvisor.com › Hotels-Paros',
        snippet: 'Κριτικές, φωτογραφίες και κατάταξη για ξενοδοχεία στην Πάρο.',
        isMatch: false,
      },
    ],
  },
  aiOverview: {
    present: true,
    matched: true,
    blocks: [
      'Για boutique διαμονή κοντά στο λιμάνι της Παροικιάς, οι ταξιδιώτες συχνά ξεχωρίζουν το Your Hotel Paros - 300 μ. από το πλοίο, με δωρεάν παραλαβή - και δύο μεγαλύτερα καταλύματα στον περιφερειακό.',
    ],
    references: [
      { title: 'Your Hotel Paros', domain: 'your-hotel.gr', url: 'https://your-hotel.gr/', isMatch: true },
      { title: 'Booking.com', domain: 'booking.com', url: 'https://www.booking.com/paros', isMatch: false },
      { title: 'Greeka', domain: 'greeka.com', url: 'https://www.greeka.com/cyclades/paros/', isMatch: false },
    ],
  },
  chat: {
    available: true,
    matched: true,
    model: null,
    answer:
      'Το Your Hotel Paros βρίσκεται περίπου 300 μ. από τον σταθμό των πλοίων της Παροικιάς και προσφέρει δωρεάν παραλαβή. Οι τιμές ξεκινούν από την τιμή απευθείας κράτησης στην ιστοσελίδα του.',
    citations: [
      { title: 'your-hotel.gr/rooms', domain: 'your-hotel.gr', url: 'https://your-hotel.gr/domatia', isMatch: true },
    ],
  },
};

const EN: SearchPreviewResult = {
  keyword: 'boutique hotel Paros near the port',
  market: 'gr-en',
  domain: 'your-hotel.gr',
  fetchedAt: '',
  sample: true,
  google: {
    matched: true,
    matchRank: 1,
    results: [
      {
        rank: 1,
        title: 'Boutique hotel by Parikia port · Your Hotel Paros',
        url: 'https://your-hotel.gr/rooms',
        domain: 'your-hotel.gr',
        breadcrumb: 'your-hotel.gr › rooms',
        snippet:
          'Nine rooms 300 m from the ferry. Free port pickup, breakfast on the terrace, direct-booking rates.',
        isMatch: true,
      },
      {
        rank: 2,
        title: 'The 10 best boutique hotels in Paros',
        url: 'https://www.booking.com/paros',
        domain: 'booking.com',
        breadcrumb: 'booking.com › paros',
        snippet: 'Check availability and rates for stays in Parikia and across Paros.',
        isMatch: false,
      },
      {
        rank: 3,
        title: 'Paros hotels — traveller reviews',
        url: 'https://www.tripadvisor.com/Hotels-Paros',
        domain: 'tripadvisor.com',
        breadcrumb: 'tripadvisor.com › Hotels-Paros',
        snippet: 'Reviews, photos and rankings for hotels on Paros.',
        isMatch: false,
      },
    ],
  },
  aiOverview: {
    present: true,
    matched: true,
    blocks: [
      'For a boutique stay near Parikia port, travellers often shortlist Your Hotel Paros — 300 m from the ferry, with free port pickup — alongside two larger properties on the ring road.',
    ],
    references: [
      { title: 'Your Hotel Paros', domain: 'your-hotel.gr', url: 'https://your-hotel.gr/', isMatch: true },
      { title: 'Booking.com', domain: 'booking.com', url: 'https://www.booking.com/paros', isMatch: false },
      { title: 'Greeka', domain: 'greeka.com', url: 'https://www.greeka.com/cyclades/paros/', isMatch: false },
    ],
  },
  chat: {
    available: true,
    matched: true,
    model: null,
    answer:
      'Your Hotel Paros sits about 300 m from Parikia ferry terminal and offers a free pickup. Rooms start from the direct-booking rate on their own site.',
    citations: [
      { title: 'your-hotel.gr/rooms', domain: 'your-hotel.gr', url: 'https://your-hotel.gr/rooms', isMatch: true },
    ],
  },
};

export function sampleResult(locale: SiteLocale): SearchPreviewResult {
  return locale === 'el' ? EL : EN;
}
