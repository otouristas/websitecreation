import { generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';
import { getPortfolioBySlug, type PortfolioProject } from '@/data/portfolio';
import { TOURISM_VERTICALS } from './index';

type EnglishSampleKind = 'hotel' | 'villa' | 'rental' | 'tours' | 'agency' | 'restaurant' | 'boat' | 'transfer' | 'tourism';

/**
 * English commercial pages under /en/tourism-seo. They pair with the Greek
 * pages under /el/seo-tourismou. Slugs differ on purpose: the Greek URLs keep
 * the words people search in Greek.
 */

export const EN_TOURISM_HUB_PATH = '/en/tourism-seo';
export const EN_TOURISM_HUB_NAME = 'Tourism SEO';

export const EN_TO_EL_SLUG = {
  hotels: 'xenodoxeia',
  villas: 'villes',
  'rent-a-car': 'rent-a-car',
  tours: 'ekdromes',
  'boat-rental': 'enoikiasi-skafon',
  transfers: 'transfer',
  restaurants: 'estiatoria',
  'travel-agencies': 'taxidiotika-grafeia',
} as const;

export type EnglishTourismSlug = keyof typeof EN_TO_EL_SLUG;

const EL_TO_EN_SLUG = Object.fromEntries(
  Object.entries(EN_TO_EL_SLUG).map(([en, el]) => [el, en]),
) as Record<string, EnglishTourismSlug>;

export function enTourismPath(slug: string): string {
  return `${EN_TOURISM_HUB_PATH}/${slug}`;
}

export function elSlugForEnglish(slug: string): string | undefined {
  return EN_TO_EL_SLUG[slug as EnglishTourismSlug];
}

export function englishSlugForGreek(slug: string): string | undefined {
  return EL_TO_EN_SLUG[slug];
}

export function tourismLanguageAlternates(enPath: string, elPath: string): Record<string, string> {
  return {
    en: `${BASE_URL}${enPath}`,
    el: `${BASE_URL}${elPath}`,
    'x-default': `${BASE_URL}${enPath}`,
  };
}

export interface EnglishTourismFaq {
  readonly question: string;
  readonly answer: string;
}

export interface EnglishTourismCard {
  readonly title: string;
  readonly body: string;
}

export interface EnglishTourismRegion {
  readonly label: string;
  readonly href: string;
  readonly note: string;
}

export interface EnglishTourismLink {
  readonly href: string;
  readonly title: string;
  readonly body: string;
}

export interface EnglishTourismSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface EnglishTourismVertical {
  readonly slug: EnglishTourismSlug;
  readonly elSlug: string;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  readonly h1Accent: string;
  readonly blurb: string;
  readonly lead: string;
  readonly sampleKind: EnglishSampleKind;
  readonly sections: readonly EnglishTourismSection[];
  readonly searches: readonly string[];
  readonly deliverables: readonly EnglishTourismCard[];
  readonly regions: readonly EnglishTourismRegion[];
  readonly faqs: readonly EnglishTourismFaq[];
  readonly related: readonly EnglishTourismLink[];
  readonly workSlugs: readonly string[];
  readonly serviceType: string;
}

const GREECE = { '@type': 'Country', name: 'Greece' } as const;
const ORG_ID = `${BASE_URL}/#organization`;

/** Projects that would name the agency's own island stay off these pages. */
const BLOCKED_WORK = new Set([
  'antiparos-rentacar',
  'rentacar-antiparos-gr',
  'antiparos-transfer',
  'antiparos-rooms',
  'hotels-sifnos',
  'rentacar-sifnos',
  'george-xipolitas',
]);

export function liveTourismProjects(slugs: readonly string[]): PortfolioProject[] {
  const seen = new Set<string>();
  const projects: PortfolioProject[] = [];
  for (const slug of slugs) {
    if (BLOCKED_WORK.has(slug) || seen.has(slug)) continue;
    const project = getPortfolioBySlug(slug);
    if (!project || project.liveStatus === 'offline') continue;
    seen.add(slug);
    projects.push(project);
  }
  return projects;
}

/** A short strip for the hub, drawn only from work already on the verticals. */
export function hubTourismProjects(): PortfolioProject[] {
  const slugs = TOURISM_VERTICALS.flatMap((vertical) => vertical.workSlugs);
  const projects = liveTourismProjects(slugs);
  const villa = projects.find((project) => project.slug === 'villa-olivia-clara');
  const featured = projects.filter((project) => project.featured);
  const pool = featured.length > 0 ? featured : projects;
  const withVilla = villa && !pool.some((project) => project.slug === villa.slug) ? [villa, ...pool] : pool;
  return withVilla.slice(0, 6);
}

export const HUB_FAQS: readonly EnglishTourismFaq[] = [
  {
    question: 'What is tourism SEO?',
    answer:
      'It is the work that helps a tourism business show up on Google, on the map and in AI answers when a traveller searches for a stay, a car, a tour or a table, so the booking can happen on your own site.',
  },
  {
    question: 'Why a separate page for each type of business?',
    answer:
      'A hotel, a rent a car company and a transfer firm win on different searches, with different pages and different schema. Each page describes the work for that business, not a generic tourism pitch.',
  },
  {
    question: 'Do you work across Greece?',
    answer:
      'Yes. Islands and the mainland, from Crete and the Cyclades to Athens, Thessaloniki and the Ionian islands. The work is remote, using Search Console and Google Business Profile.',
  },
  {
    question: 'When should seasonal businesses start?',
    answer:
      'Before the booking window, which for most summer properties means autumn or winter. Travellers decide months ahead. A site that is fixed in June has missed most of that year’s decisions.',
  },
];

export const HUB_PAINS: readonly {
  problem: string;
  problemBody: string;
  solution: string;
  solutionBody: string;
}[] = [
  {
    problem: 'OTA dependence',
    problemBody:
      'Booking platforms often rank above the business for its own name. The commission is then paid on a guest who was already looking for you.',
    solution: 'Keep the booking on your domain',
    solutionBody:
      'We start with the name search, then the pages that answer a real trip: a room, a pickup point, a departure or a table, with the request on your site.',
  },
  {
    problem: 'Seasonality',
    problemBody:
      'Demand piles up months before arrival, then drops. A site that only gets attention in June misses the searches that already decided the season.',
    solution: 'Build before the window opens',
    solutionBody:
      'The structural work happens ahead of the peak. Pages for shoulder season, city breaks and winter openings stay useful when the summer rush is over.',
  },
  {
    problem: 'Multilingual demand',
    problemBody:
      'A German guest searches in German, a British guest in English, and a domestic weekend in Greek. An automatic translation is not a set of pages.',
    solution: 'Languages travellers actually use',
    solutionBody:
      'Each market gets its own titles, descriptions and hreflang, for the countries that already book you. Three complete languages beat six thin ones.',
  },
];

const LOCAL = (city: string, slug: string, note: string): EnglishTourismRegion => ({
  label: city,
  href: `/en/services/local-seo/${slug}`,
  note,
});

export const ENGLISH_VERTICALS: readonly EnglishTourismVertical[] = [
  {
    slug: 'hotels',
    elSlug: 'xenodoxeia',
    name: 'Hotels',
    title: 'Hotel SEO Agency for Direct Bookings | AnotherSEOGuru',
    description:
      'Hotel SEO for independent hotels and resorts in Greece: room pages, Google Business Profile, multilingual search and more direct bookings. Get an audit.',
    h1: 'Hotel SEO for direct bookings across Greece',
    h1Accent: 'across Greece',
    blurb: 'Direct bookings from Google, instead of a commission on your own name.',
    lead:
      'Hotel SEO here has one job: the guest who searches your property, a room type or the destination lands on your site and books there. We work with independent hotels, boutique properties and resorts on islands, in cities and on the coast, and report each month from Search Console.',
    sampleKind: 'hotel',
    sections: [
      {
        heading: 'The leak is the booking path, not a lack of demand',
        paragraphs: [
          'Most Greek hotels do not lack interest. They lose the path. A traveller sees the name on a platform, searches it to check photos or a rate, and if the first result is the platform again, or a slow homepage with no availability, they go back. You pay a commission for a guest who already knew you.',
          'That is why hotel SEO starts with your name. You are the business being searched. It needs Hotel schema, a fast mobile page, the same details on Google Business Profile and the platforms, and a booking engine that loads without sending the guest to another domain for no reason.',
        ],
      },
      {
        heading: 'Room, offer and destination pages that can rank on their own',
        paragraphs: [
          'The next searches have no brand in them: a pool suite in a named village, a family hotel near a beach, a stay close to the port. Each one needs a page that answers that search. A homepage that says everything ranks for none of them.',
          'Destination copy is useful only when it is yours: the drive from the airport, the beach you can walk to, the months you are open. We do not write another generic list of things to do. For the site itself, see the [hotel websites](/en/solutions/hotels) we build.',
        ],
      },
      {
        heading: 'Languages, the map and AI answers',
        paragraphs: [
          'Each language is a full set of pages, with its own titles and correct hreflang, so Google shows the right market the right version. We would rather ship three languages properly than six machine translations. A plugin that duplicates pages usually creates the wrong canonicals, which technical SEO has to fix before new copy is worth writing.',
          'On a phone, Google Business Profile is often the first contact. Category, photos, amenities and a booking link decide whether you appear on the map. The same clear pages also give AI answers something accurate to cite. You can see today’s picture with the free AI visibility check.',
        ],
      },
    ],
    searches: [
      'hotel + destination',
      'room type + view',
      'hotel with pool + area',
      'family hotel + island',
      'boutique hotel + town',
      'your hotel name',
      'hotel near the port',
      'adults only + destination',
    ],
    deliverables: [
      { title: 'Site and booking-engine review', body: 'Mobile speed, indexation, language duplicates and the step where the guest leaves before booking.' },
      { title: 'Hotel schema', body: 'Hotel and room structured data, with the same name, address and phone on the site, the map and the platforms.' },
      { title: 'Room and offer pages', body: 'One page per room type and per offer that has its own search, with a way to book.' },
      { title: 'Multilingual SEO', body: 'Hreflang, translated titles and descriptions, and a check that each market sees its language.' },
      { title: 'Google Business Profile', body: 'Categories, amenities, photos, the booking link and a way to reply to reviews.' },
      { title: 'Monthly report', body: 'Clicks and impressions from Search Console, name searches, and what changed that month.' },
    ],
    regions: [
      LOCAL('Santorini', 'santorini-gr', 'Caldera and beach hotels are different products and need different pages.'),
      LOCAL('Mykonos', 'mykonos-gr', 'Heavy foreign-language demand, and platforms competing on almost every phrase.'),
      LOCAL('Heraklion', 'heraklion-gr', 'Crete is searched by town. Heraklion, the resorts and the beaches are not one page.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Packages, the old town and Lindos pull different guests, often from the same countries.'),
      LOCAL('Corfu', 'corfu-gr', 'British and Italian demand that needs hreflang from the first language you add.'),
      LOCAL('Athens', 'athens-gr', 'City hotels with year-round demand, conferences and short stays before a ferry.'),
    ],
    faqs: [
      {
        question: 'What does hotel SEO include?',
        answer:
          'A technical review of the site and the booking engine, Hotel schema, room and offer pages, multilingual SEO with hreflang, Google Business Profile and reviews, destination pages that are actually about your area, and a monthly Search Console report.',
      },
      {
        question: 'Can we outrank the platforms for our own name?',
        answer:
          'Often yes, because you are the business being searched. We do not promise a position. Name search is usually the most realistic and the most profitable work on a hotel site.',
      },
      {
        question: 'Do we need a new website first?',
        answer:
          'Not always. If the current site is fast and the booking engine works on a phone, we start there. If it is slow or never shows availability, a new site returns more than SEO on a broken base, and the audit will say so.',
      },
      {
        question: 'When should a seasonal hotel start?',
        answer:
          'In autumn or winter. Guests book months ahead, and Google needs time to change what it shows. A site repaired in June has missed most of that year’s decisions.',
      },
    ],
    related: [
      { href: '/en/solutions/hotels', title: 'Hotel websites', body: 'When the site is not ready to be promoted yet.' },
      { href: '/en/seo-services', title: 'SEO services', body: 'The monthly work this hotel page sits inside.' },
      { href: '/en/services/ai-visibility', title: 'AI visibility', body: 'How ChatGPT, Gemini and AI Overviews cite a property.' },
    ],
    workSlugs: ['hotels-santorini', 'onoma-hotel'],
    serviceType: 'Hotel SEO',
  },
  {
    slug: 'villas',
    elSlug: 'villes',
    name: 'Villas',
    title: 'Villa and Apartment SEO for Direct Holiday Bookings',
    description:
      'Villa SEO for holiday rentals and apartments in Greece: one page per property, Google Maps, multilingual search and direct booking requests.',
    h1: 'Villa SEO for holiday rentals in Greece',
    h1Accent: 'in Greece',
    blurb: 'One page per property, so the search matches the villa a guest can actually book.',
    lead:
      'Villa SEO is won property by property. A guest searches a pool, a view, a number of bedrooms or a beach, and the page has to be that villa, not a gallery of the whole collection. We work with owners and small managers across Greece and report enquiries from the site.',
    sampleKind: 'villa',
    sections: [
      {
        heading: 'A collection page cannot rank for one villa',
        paragraphs: [
          'Holiday-rental search is specific. People type the feature they care about and the place. If every villa shares one URL, Google has nothing distinct to show, and the guest cannot tell which house is free.',
          'Each property gets photos, capacity, the features it actually has, a map and a request for dates. Pages for a pool or a sea view exist only where a villa in the collection has that feature.',
        ],
      },
      {
        heading: 'Platforms, the map and the languages that book',
        paragraphs: [
          'Airbnb and similar sites will keep taking bookings. The SEO job is the search where you should be the result: your villa’s name, and the combination of place plus feature you can honestly offer.',
          'VacationRental or LodgingBusiness schema should repeat the same name and contact details as the map and the platforms. Languages follow the countries that already enquire, with hreflang, not a translated duplicate of every page.',
        ],
      },
    ],
    searches: [
      'villa + destination',
      'villa with pool + area',
      'sea view villa + island',
      'holiday home + bedrooms',
      'apartment + town',
      'your property name',
    ],
    deliverables: [
      { title: 'A page per property', body: 'Photos, capacity, features, a map and a request for dates, for each villa or apartment.' },
      { title: 'Lodging schema', body: 'VacationRental or LodgingBusiness data that matches the site, the map and the platforms.' },
      { title: 'Feature and area pages', body: 'Pool, view or beach distance, only where you have properties that match.' },
      { title: 'Multilingual SEO', body: 'Versions for the markets that book, with hreflang and translated metadata.' },
      { title: 'Google Business Profile', body: 'Set up within Google’s rules, with photos, reviews and a booking link.' },
      { title: 'Monthly report', body: 'Name searches, clicks per property and booking requests from the site.' },
    ],
    regions: [
      LOCAL('Mykonos', 'mykonos-gr', 'Short stays and high platform competition around named beaches and villas.'),
      LOCAL('Santorini', 'santorini-gr', 'Caldera villas and inland houses answer different searches.'),
      LOCAL('Naxos', 'naxos-gr', 'Villas are searched by village and beach, not by the island name alone.'),
      LOCAL('Paros', 'paros-gr', 'Rentals cluster around the port and the beaches, which should not share one page.'),
      LOCAL('Corfu', 'corfu-gr', 'British demand needs an English version that reads as written, not translated.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Lindos and the east coast are separate products from the city.'),
    ],
    faqs: [
      {
        question: 'Should every villa have its own page?',
        answer:
          'Yes, when it is a real property with its own photos and features. A single gallery cannot rank for a specific house, and it cannot show which dates are available.',
      },
      {
        question: 'What about villas we also list on platforms?',
        answer:
          'Keep the listings. SEO covers the searches where your site should be the result, especially your property name and the place-plus-feature combinations you can fulfil.',
      },
      {
        question: 'Which schema fits a holiday villa?',
        answer:
          'VacationRental or LodgingBusiness, with the same name and contact details as Google Business Profile and the platforms. We do not mark up a feature the house does not have.',
      },
      {
        question: 'Do apartment buildings use the same approach?',
        answer:
          'The same rule: one page per rentable unit or distinct apartment type, plus the area page only where you can say something a guest needs before they enquire.',
      },
    ],
    related: [
      { href: '/en/solutions/villas-apartments', title: 'Villa websites', body: 'Galleries, requests and a structure that can hold more than one property.' },
      { href: '/en/services/local-seo', title: 'Local SEO', body: 'Google Business Profile, the map and reviews.' },
      { href: '/en/tourism-seo/hotels', title: 'Hotel SEO', body: 'The same direct-booking idea for properties with room types.' },
    ],
    workSlugs: ['villa-olivia-clara', 'mykonos-luxury', 'ktima-orion'],
    serviceType: 'Villa SEO',
  },
  {
    slug: 'rent-a-car',
    elSlug: 'rent-a-car',
    name: 'Rent a car',
    title: 'Rent a Car SEO for Airports, Ports and Fleet Pages',
    description:
      'Rent a car SEO for fleets in Greece: a page for each airport, port and vehicle class, Google Maps, and bookings that stay on your own site. Get an audit.',
    h1: 'Rent a car SEO for airports, ports and fleets',
    h1Accent: 'airports, ports and fleets',
    blurb: 'Pickup points and vehicle classes, with the booking on your site.',
    lead:
      'Rent a car SEO comes down to three things: where the car is collected, which vehicle, and when. We build and improve rental sites so they appear for “car rental” plus your airport, port or island, and the booking stays with you instead of an aggregator.',
    sampleKind: 'rental',
    sections: [
      {
        heading: 'One office is not one page for every pickup',
        paragraphs: [
          'Travellers search the place they land or dock. An airport desk and a port desk are different intents, with different hours and directions. Putting both on the homepage throws away the search.',
          'Each real pickup point gets its own page: how to find the desk, the hours in season, and which vehicles are actually there. We do not invent desks you do not operate.',
        ],
      },
      {
        heading: 'Fleet pages and the questions asked before a booking',
        paragraphs: [
          'Automatic, family, jeep and cabrio pages exist when those cars are in the fleet. The page answers insurance, deposit, driver age and payment, because those are the questions that stop a booking.',
          'AutoRental schema and a Google Business Profile per office keep the name, phone and hours consistent. Aggregators can stay. The SEO target is the search that should end on your form.',
        ],
      },
    ],
    searches: [
      'car rental + airport',
      'car rental + port',
      'car hire + island',
      'automatic car + destination',
      'jeep rental + island',
      'your company name',
    ],
    deliverables: [
      { title: 'Pickup pages', body: 'One page for each airport, port or office you really serve, with hours and directions.' },
      { title: 'Fleet pages', body: 'Automatic, family, jeep and cabrio, with the facts a driver checks before booking.' },
      { title: 'Rental terms as pages', body: 'Insurance, deposit, driver age and payment, written where Google can read them.' },
      { title: 'A profile per office', body: 'Category, seasonal hours, photos, reviews and a booking link for each desk.' },
      { title: 'AutoRental schema', body: 'Structured data for the company and the offices, consistent with the map.' },
      { title: 'Monthly report', body: 'Clicks per pickup point and fleet page, and what changed that month.' },
    ],
    regions: [
      LOCAL('Heraklion', 'heraklion-gr', 'Airport and port pickups are separate searches from a city-centre desk.'),
      LOCAL('Athens', 'athens-gr', 'Airport, Piraeus and city offices should not share a single vague page.'),
      LOCAL('Santorini', 'santorini-gr', 'Port and airport demand spikes with the ferries and the flights, on different days.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Airport hire and hotel delivery are different offers.'),
      LOCAL('Corfu', 'corfu-gr', 'British visitors search “car hire”, not only “rent a car”.'),
      LOCAL('Chania', 'chania-gr', 'Airport, the old harbour and resort delivery each need their own explanation.'),
    ],
    faqs: [
      {
        question: 'Do we need a page for every airport we serve?',
        answer:
          'Yes, for every airport, port or office where a customer can actually collect a car. A page for a place you do not serve is a doorway page, and we will not create it.',
      },
      {
        question: 'What should a fleet page include?',
        answer:
          'The class of car, what is included, insurance and deposit, driver age, and a way to request those dates. A photo grid without those facts does not answer the search.',
      },
      {
        question: 'Can this replace the aggregators?',
        answer:
          'No, and it does not need to. The work is the searches where your own site should be the result, especially your name and the pickup point you operate.',
      },
      {
        question: 'How is this different from a new rental website?',
        answer:
          'A new site is the structure. SEO is the ongoing work that keeps pickup pages, fleet pages and the map aligned with how people search. If the current site cannot hold that structure, we will say so in the audit.',
      },
    ],
    related: [
      { href: '/en/solutions/rent-a-car', title: 'Rent a car websites', body: 'Fleet, bookings and a page per pickup point from the start.' },
      { href: '/en/tourism-seo/transfers', title: 'Transfer SEO', body: 'The same route logic for airport and port rides.' },
      { href: '/en/services/local-seo', title: 'Local SEO', body: 'Map listings for each desk that meets customers.' },
    ],
    workSlugs: ['cyclades-rentacar', 'rentacar-in-paros', 'naxos-carrentals', 'athens-rentacar', 'rentacar-piraeus', 'aggelos-rentals'],
    serviceType: 'Rent a car SEO',
  },
  {
    slug: 'tours',
    elSlug: 'ekdromes',
    name: 'Tours',
    title: 'Tour Operator SEO for Excursions and Experiences in Greece',
    description:
      'Tour operator SEO for day trips and excursions in Greece: one page per experience, multilingual search, Google Maps and direct bookings. Get an audit.',
    h1: 'Tour operator SEO for excursions in Greece',
    h1Accent: 'in Greece',
    blurb: 'One page per departure, so the search matches a tour someone can book.',
    lead:
      'Tour operator SEO is a catalogue problem. People search a specific day trip, a cruise or a pickup town, and the result has to be that experience, with the meeting point, what is included and a way to book. We do this for operators across Greece.',
    sampleKind: 'tours',
    sections: [
      {
        heading: 'A homepage list is not a tour page',
        paragraphs: [
          'GetYourGuide and similar sites win when your only URL is a list. Each excursion needs duration, the meeting point, what is included, the cancellation terms and a booking path on a stable address.',
          'Guides about the destination are useful when they answer a question asked before booking and then point at the tour page. A copied “top ten” article does not.',
        ],
      },
      {
        heading: 'Languages, departure points and AI summaries',
        paragraphs: [
          'Day trips are booked in the guest’s language, often on a phone the same day. Hreflang and translated metadata matter more than adding another thin language.',
          'TouristTrip schema and a Google Business Profile at the departure point give Google and AI answers a single description of the experience. If you also run boat trips, those belong on the boat rental page, not mixed into a walking tour.',
        ],
      },
    ],
    searches: [
      'day trip + destination',
      'tour + meeting point',
      'cruise + island',
      'wine tour + region',
      'private tour + town',
      'your operator name',
    ],
    deliverables: [
      { title: 'A page per tour', body: 'Duration, meeting point, what is included, cancellation and a way to book.' },
      { title: 'Experience schema', body: 'TouristTrip or Product schema and FAQs, with a price only where you already show it.' },
      { title: 'Multilingual SEO', body: 'Versions for the markets that book, with hreflang and translated metadata.' },
      { title: 'Departure-point profile', body: 'Category, photos from the tour and replies to reviews.' },
      { title: 'Destination answers', body: 'Short pages that resolve a pre-booking question and link to the tour.' },
      { title: 'Monthly report', body: 'Clicks and bookings per tour, and what changed that month.' },
    ],
    regions: [
      LOCAL('Santorini', 'santorini-gr', 'Caldera cruises and inland tours leave from different points and should not share a page.'),
      LOCAL('Heraklion', 'heraklion-gr', 'A Heraklion departure is a different product from a Chania or Rethymno one.'),
      LOCAL('Athens', 'athens-gr', 'Day trips from the city run all year, unlike a single-island season.'),
      LOCAL('Mykonos', 'mykonos-gr', 'Same-day boat and island trips are searched in several languages.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Old-town walks and east-coast trips answer different queries.'),
      LOCAL('Corfu', 'corfu-gr', 'British and Italian guests search the same tour in different words.'),
    ],
    faqs: [
      {
        question: 'Does every excursion need a URL?',
        answer:
          'Every tour you still sell does. A retired itinerary should not keep a page. A live one needs a stable address with the meeting point and what is included.',
      },
      {
        question: 'Should we show the price in the schema?',
        answer:
          'Only when the page itself shows that price. Markup that disagrees with the visible page is worse than no markup.',
      },
      {
        question: 'How is this different from a tour website?',
        answer:
          'The website is the catalogue. SEO keeps each experience aligned with the searches and the languages that book it, and reports which tours earn the clicks.',
      },
      {
        question: 'What if we also charter boats?',
        answer:
          'Boat routes get their own pages. Mixing a skippered cruise into a coach excursion confuses both the guest and the schema.',
      },
    ],
    related: [
      { href: '/en/solutions/tour-operators', title: 'Tour operator websites', body: 'A catalogue, galleries and a booking path.' },
      { href: '/en/tourism-seo/boat-rental', title: 'Boat rental SEO', body: 'Separate pages for vessels and sea routes.' },
      { href: '/en/services/ai-visibility', title: 'AI visibility', body: 'How assistants describe a tour when someone asks.' },
    ],
    workSlugs: ['santorini-daily-tours', 'discover-crete', 'way-to-crete', 'discover-cyclades', 'santo-tours-marinakis'],
    serviceType: 'Tour operator SEO',
  },
  {
    slug: 'boat-rental',
    elSlug: 'enoikiasi-skafon',
    name: 'Boat rental',
    title: 'Boat Rental and Yacht Charter SEO for Greek Islands',
    description:
      'Boat rental SEO for yacht charter and day cruises in Greece: a page per vessel and route, Google Maps and requests that stay with you. Get an audit.',
    h1: 'Boat rental SEO for charter and day cruises',
    h1Accent: 'charter and day cruises',
    blurb: 'A page for the boat and a page for the route, not one marina paragraph.',
    lead:
      'Boat rental SEO splits in two. Bareboat and skippered charter are searched by vessel. Day cruises are searched by route, stops and whether lunch is included. We build those pages for operators on the Greek islands and keep the request on your site.',
    sampleKind: 'boat',
    sections: [
      {
        heading: 'The boat and the route are different searches',
        paragraphs: [
          'Someone comparing a 40-foot yacht wants capacity, what the price includes and what they must bring. Someone booking a sunset cruise wants the stops, the hours and what happens if the wind is up. One page cannot be both.',
          'English is usually the first language, because the demand is international. Other languages are added where you already receive requests, with hreflang rather than a plugin duplicate.',
        ],
      },
      {
        heading: 'The marina listing and the aggregators',
        paragraphs: [
          'Google Business Profile belongs at the marina or the port you depart from, with seasonal hours and photos of the boats you operate. A listing for a harbour you do not use will not be created.',
          'Charter aggregators can remain. The pages we care about are your vessel names and the routes you actually run, so a search can end in your form.',
        ],
      },
    ],
    searches: [
      'boat rental + island',
      'yacht charter + marina',
      'day cruise + destination',
      'sunset cruise + port',
      'skippered boat + island',
      'your boat name',
    ],
    deliverables: [
      { title: 'A page per vessel', body: 'Capacity, specification, what the price includes and what you need from the guest.' },
      { title: 'A page per route', body: 'Stops, hours, food and the weather rule, for each cruise you run.' },
      { title: 'Schema', body: 'Product or TouristTrip schema and FAQs, with a price only where the page shows it.' },
      { title: 'Marina profile', body: 'Category, seasonal hours, photos and reviews at the port you use.' },
      { title: 'Multilingual SEO', body: 'English first, then other languages where there is demand, with hreflang.' },
      { title: 'Monthly report', body: 'Clicks and requests per vessel and route, and what changed.' },
    ],
    regions: [
      LOCAL('Santorini', 'santorini-gr', 'Caldera cruises and fishing-boat hire leave from different harbours.'),
      LOCAL('Mykonos', 'mykonos-gr', 'Day boats and overnight charter are searched as separate products.'),
      LOCAL('Paros', 'paros-gr', 'Naoussa and Parikia departures should not be one sentence on the homepage.'),
      LOCAL('Corfu', 'corfu-gr', 'Ionian day trips are often searched in English and Italian.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Marina charter and beach-boat hire answer different queries.'),
      LOCAL('Athens', 'athens-gr', 'Saronic day cruises are a city product with a long season.'),
    ],
    faqs: [
      {
        question: 'Is a day cruise the same page as a charter yacht?',
        answer:
          'No. Charter is chosen by the boat. A day cruise is chosen by the route. They need separate URLs.',
      },
      {
        question: 'Where should the Google listing sit?',
        answer:
          'At the marina or port you depart from, in the right category, with the seasonal hours. We do not open listings for harbours you do not use.',
      },
      {
        question: 'Which language comes first?',
        answer:
          'Usually English, because that is how most charter searches are typed. Greek and other languages follow the requests you already receive.',
      },
      {
        question: 'Do you publish a price we have not set?',
        answer:
          'No. Schema repeats a price only when the page shows it. If the rate depends on the week, the page should say that instead of inventing a figure.',
      },
    ],
    related: [
      { href: '/en/tourism-seo/tours', title: 'Tour operator SEO', body: 'Land excursions and meeting points, kept separate from the boats.' },
      { href: '/en/solutions/tour-operators', title: 'Experience websites', body: 'A catalogue and a mobile booking path.' },
      { href: '/en/services/website-creation', title: 'Website creation', body: 'A page per vessel when the current site cannot hold it.' },
    ],
    workSlugs: [],
    serviceType: 'Boat rental SEO',
  },
  {
    slug: 'transfers',
    elSlug: 'transfer',
    name: 'Transfers',
    title: 'Airport Transfer SEO for Ports, Hotels and Bookings',
    description:
      'Transfer SEO for airport and port rides in Greece: one page per route, a clear meeting point, Google Maps and bookings on your own site. Get an audit.',
    h1: 'Transfer SEO for airports, ports and hotels',
    h1Accent: 'airports, ports and hotels',
    blurb: 'One page per route, with the meeting point and the vehicle.',
    lead:
      'Transfer SEO is a route catalogue. People search the airport or the port, then the hotel or the town, and they want the duration, the vehicle and where the driver will be. We build that for transfer and taxi companies across Greece.',
    sampleKind: 'transfer',
    sections: [
      {
        heading: 'A price list is not a route page',
        paragraphs: [
          '“Athens airport to Rafina” and “Heraklion airport to Chania” are different searches. Each route that you sell often enough needs distance, duration, the vehicle, what happens if the flight is late, and the meeting point.',
          'Routes you rarely run can stay on a clear price list. Inventing a page for every village name, with the same paragraph swapped in, is a doorway page and we will not do it.',
        ],
      },
      {
        heading: 'Partners, the map and the phone call',
        paragraphs: [
          'Hotels and villas that actually recommend you are the right links. Bought link packages are not. Google Business Profile, with the right category and vehicle photos, is how many of the calls start.',
          'TaxiService schema describes the company and the areas you serve. It does not invent coverage. The monthly report shows clicks and bookings per route, plus calls from the map.',
        ],
      },
    ],
    searches: [
      'airport transfer + destination',
      'port transfer + town',
      'private driver + island',
      'taxi + airport',
      'hotel transfer + resort',
      'your company name',
    ],
    deliverables: [
      { title: 'A page per busy route', body: 'Distance, duration, vehicle, delays and the meeting point.' },
      { title: 'A readable price list', body: 'Clear rates for routes that do not earn their own page.' },
      { title: 'TaxiService schema', body: 'Structured data for the company and the areas you serve.' },
      { title: 'Google Business Profile', body: 'Category, phone, vehicle photos and reviews.' },
      { title: 'Partner links', body: 'Links from hotels and rentals that really recommend the service.' },
      { title: 'Monthly report', body: 'Clicks and bookings per route, map calls, and what changed.' },
    ],
    regions: [
      LOCAL('Athens', 'athens-gr', 'Airport, Piraeus and Rafina are three products, not one “Athens transfer” page.'),
      LOCAL('Heraklion', 'heraklion-gr', 'Airport to the city, to Hersonissos and to Chania are different routes.'),
      LOCAL('Santorini', 'santorini-gr', 'Port and airport arrivals need different meeting instructions.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Airport to Lindos is not the same search as a city taxi.'),
      LOCAL('Corfu', 'corfu-gr', 'Airport and port transfers are often booked in English before arrival.'),
      LOCAL('Chania', 'chania-gr', 'Airport, the harbour and hotel drops are three meeting points, not one page.'),
    ],
    faqs: [
      {
        question: 'How many route pages should we have?',
        answer:
          'One for each route people already search and you already drive. The rest belong on a price list. Dozens of near-duplicate village pages put the whole site at risk.',
      },
      {
        question: 'What belongs on a route page?',
        answer:
          'Distance, typical duration, the vehicle, the meeting point, and what you do when a flight or ferry is late. A phone number alone does not answer the search.',
      },
      {
        question: 'Will you buy links from hotel blogs?',
        answer:
          'No. Links come from hotels, villas and local guides that actually send you guests. Packages of paid links are against Google’s rules.',
      },
      {
        question: 'Is this the same job as rent a car SEO?',
        answer:
          'The shape is similar, but the intent is a ride, not a car they drive themselves. Pickup desks and routes should stay on their own sites and their own pages.',
      },
    ],
    related: [
      { href: '/en/tourism-seo/rent-a-car', title: 'Rent a car SEO', body: 'Pickup points and fleet pages, for a different booking.' },
      { href: '/en/services/local-seo', title: 'Local SEO', body: 'The map listing that produces the phone calls.' },
      { href: '/en/services/link-building', title: 'Link building', body: 'Links from real partners, within Google’s rules.' },
    ],
    workSlugs: [],
    serviceType: 'Transfer SEO',
  },
  {
    slug: 'restaurants',
    elSlug: 'estiatoria',
    name: 'Restaurants',
    title: 'Restaurant SEO for Tavernas, Beach Bars and Google Maps',
    description:
      'Restaurant SEO for tavernas and beach bars in tourist towns: Google Maps, a menu Google can read, reviews and requests for a table. Get an audit.',
    h1: 'Restaurant SEO for tourist towns and beach bars',
    h1Accent: 'tourist towns and beach bars',
    blurb: 'The map, a menu Google can read, and a way to ask for a table.',
    lead:
      'Restaurant SEO in a tourist town is mostly the map. Guests search a cuisine, a beach or “near me” on a phone, then look at photos, hours and the menu. We set up that path for tavernas, restaurants and beach bars, and keep the listing in season.',
    sampleKind: 'restaurant',
    sections: [
      {
        heading: 'The menu has to be text, not a photo',
        paragraphs: [
          'A menu photographed as one image is invisible to Google. The dishes that make you different, and the dietary options guests ask about, need to be text in Greek and English.',
          'Hours change with the season. The Google listing and the site have to change together, or the map sends people to a closed door.',
        ],
      },
      {
        heading: 'Reviews, directories and the same phone number',
        paragraphs: [
          'Restaurant schema and the Google Business Profile should share the name, address and phone. TripAdvisor and Apple Maps should say the same thing. A second phone number “for tourists” splits the reviews.',
          'We will not buy reviews. The work is a way of asking guests that Google allows, and replies that sound like the restaurant. The report covers calls, direction requests and what changed on the listing.',
        ],
      },
    ],
    searches: [
      'restaurant + town',
      'taverna + beach',
      'beach bar + area',
      'seafood + harbour',
      'your restaurant name',
      'restaurant near me',
    ],
    deliverables: [
      { title: 'Google Business Profile', body: 'Category, seasonal hours, photos, price range, reservations and regular posts.' },
      { title: 'A text menu', body: 'Greek and English, with the dishes that distinguish you and the dietary options.' },
      { title: 'Restaurant schema', body: 'Restaurant and Menu data consistent with the site, the map and directories.' },
      { title: 'Reviews', body: 'A request method Google allows, and reply templates in your voice.' },
      { title: 'Directory cleanup', body: 'The same name, address and phone on TripAdvisor, Apple Maps and local guides.' },
      { title: 'Monthly report', body: 'Calls, direction requests, map visits and what changed.' },
    ],
    regions: [
      LOCAL('Santorini', 'santorini-gr', 'Caldera restaurants and beach tavernas are searched as different meals.'),
      LOCAL('Mykonos', 'mykonos-gr', 'Beach bars and town restaurants compete in several languages.'),
      LOCAL('Athens', 'athens-gr', 'Neighbourhood search matters more than a generic “Athens restaurant” page.'),
      LOCAL('Chania', 'chania-gr', 'The old harbour and the beaches should not share one menu URL.'),
      LOCAL('Paros', 'paros-gr', 'Naoussa and the beaches are searched as different meals from Parikia.'),
      LOCAL('Corfu', 'corfu-gr', 'English menus are part of the product for a large share of tables.'),
    ],
    faqs: [
      {
        question: 'Is restaurant SEO mostly Google Maps?',
        answer:
          'In a tourist town, yes. The listing, the photos, the hours and the reviews decide most visits. The site still needs a text menu and a way to request a table.',
      },
      {
        question: 'Why can’t the menu be a PDF or a photo?',
        answer:
          'Google cannot read a photographed menu as dishes. Text in Greek and English is what shows up for a dish or a dietary search.',
      },
      {
        question: 'Will you ask guests for reviews?',
        answer:
          'Only in a way Google’s rules allow. We do not buy reviews or gate them so only happy guests are asked.',
      },
      {
        question: 'What changes in the off season?',
        answer:
          'The hours and the posts. A listing that still says you are open in November, when you are closed, wastes the trust you built in summer.',
      },
    ],
    related: [
      { href: '/en/solutions/restaurants', title: 'Restaurant websites', body: 'Menu, reservations and events on a fast page.' },
      { href: '/en/services/local-seo', title: 'Local SEO', body: 'The map work this page is built around.' },
      { href: '/el/blog/seo-gia-estiatoria', title: 'Restaurant SEO guide', body: 'The Greek guide to menus, the map and reviews.' },
    ],
    workSlugs: [],
    serviceType: 'Restaurant SEO',
  },
  {
    slug: 'travel-agencies',
    elSlug: 'taxidiotika-grafeia',
    name: 'Travel agencies',
    title: 'Travel Agency SEO for Packages and Group Departures',
    description:
      'Travel agency SEO for packages and group trips in Greece: one page per departure, destination answers and requests from your own website. Get an audit.',
    h1: 'Travel agency SEO for packages and group trips',
    h1Accent: 'packages and group trips',
    blurb: 'Packages as pages, not as PDF attachments nobody can find.',
    lead:
      'Travel agency SEO turns the programmes you already sell into pages people can find. A group departure, a honeymoon package or a school trip needs its own URL, with the day-by-day plan and a request form, instead of a PDF linked from the homepage.',
    sampleKind: 'agency',
    sections: [
      {
        heading: 'PDFs do not rank, and they are hard to read on a phone',
        paragraphs: [
          'If the only copy of a package is a PDF, Google has little to index and the guest has to pinch-zoom a brochure. Each current departure gets a stable page: the plan, what the price includes, the dates, and a form.',
          'Destination pages should be practical answers from your agency, not a copied encyclopedia. They exist to help someone choose a package you sell.',
        ],
      },
      {
        heading: 'Branches, schema and the request',
        paragraphs: [
          'TravelAgency schema and a Google Business Profile per branch keep the name and phone consistent. Reviews belong to the office that served the trip.',
          'School groups and closed departures still need a page if you want them found. When the dates pass, the page should say so, rather than keep inviting requests for a trip that left.',
        ],
      },
    ],
    searches: [
      'travel agency + city',
      'package + destination',
      'group trip + country',
      'honeymoon + destination',
      'school trip + region',
      'your agency name',
    ],
    deliverables: [
      { title: 'A page per package', body: 'Day by day, what the price includes, departures and a request form on a stable URL.' },
      { title: 'Destination pages', body: 'Practical answers from your agency, not copied descriptions.' },
      { title: 'TravelAgency schema', body: 'Structured data for the office and the branches, consistent everywhere.' },
      { title: 'A profile per branch', body: 'Reviews, photos and a link to the trips that office sells.' },
      { title: 'PDFs turned into pages', body: 'Programmes become pages a phone and Google can both read.' },
      { title: 'Monthly report', body: 'Requests per package and destination, and what changed.' },
    ],
    regions: [
      LOCAL('Athens', 'athens-gr', 'City agencies often sell both outbound packages and inbound day trips. Those are different pages.'),
      LOCAL('Naxos', 'naxos-gr', 'An island office selling excursions is a different page from an outbound package.'),
      LOCAL('Heraklion', 'heraklion-gr', 'Inbound Crete programmes are searched by area, not only by the agency name.'),
      LOCAL('Rhodes', 'rhodes-gr', 'Hotel packages and excursions are separate from a flight-and-hotel brochure.'),
      LOCAL('Corfu', 'corfu-gr', 'British guests search the package in English before they call the office.'),
      LOCAL('Chania', 'chania-gr', 'Local excursions and outbound holidays need different URLs.'),
    ],
    faqs: [
      {
        question: 'What happens to our PDF brochures?',
        answer:
          'Current programmes become pages. The PDF can stay as a download. A PDF alone is not enough for Google or for a guest on a phone.',
      },
      {
        question: 'Do old departures stay online?',
        answer:
          'Only if the page says the dates have passed and points at the next similar trip. A page that still invites bookings for a departure that left is a trust problem.',
      },
      {
        question: 'We have more than one office. How many listings?',
        answer:
          'One Google Business Profile per branch that meets customers, with that office’s phone and reviews. A single listing for every city you sell trips to is not the same thing.',
      },
      {
        question: 'Is this only for outbound holiday packages?',
        answer:
          'No. Inbound programmes, honeymoons, school groups and excursions all qualify, as long as each one you want found has its own page.',
      },
    ],
    related: [
      { href: '/en/solutions/travel-agencies', title: 'Travel agency websites', body: 'Package pages, destinations and a request form.' },
      { href: '/en/services/content-creation', title: 'Content', body: 'Destination and package copy written for a booking, not a brochure.' },
      { href: '/en/tourism-seo/tours', title: 'Tour operator SEO', body: 'When the product is a single excursion rather than a package.' },
    ],
    workSlugs: ['skydream-travel', 'my-honeymoon'],
    serviceType: 'Travel agency SEO',
  },
];

const BY_SLUG = new Map(ENGLISH_VERTICALS.map((vertical) => [vertical.slug, vertical]));

export function getEnglishTourismVertical(slug: string): EnglishTourismVertical | undefined {
  return BY_SLUG.get(slug as EnglishTourismSlug);
}

export function buildEnglishHubSchemas(): SchemaOutput[] {
  const url = `${BASE_URL}${EN_TOURISM_HUB_PATH}`;
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: '/en' },
        { name: EN_TOURISM_HUB_NAME, url: EN_TOURISM_HUB_PATH },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Tourism SEO for hotels, tours and travel businesses',
      description:
        'Tourism SEO for hotels, villas, rent a car, tours, boat rental, transfers, restaurants and travel agencies in Greece.',
      url,
      inLanguage: 'en',
      serviceType: 'Tourism SEO',
      provider: { '@id': ORG_ID },
      areaServed: GREECE,
    },
    generateFAQSchema({ faqs: HUB_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}

export function buildEnglishVerticalSchemas(vertical: EnglishTourismVertical): SchemaOutput[] {
  const path = enTourismPath(vertical.slug);
  const url = `${BASE_URL}${path}`;
  const service: SchemaOutput = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: vertical.h1,
    description: vertical.description,
    url,
    inLanguage: 'en',
    serviceType: vertical.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: GREECE,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: vertical.serviceType,
      itemListElement: vertical.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.title, description: item.body },
      })),
    },
  };
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: '/en' },
        { name: EN_TOURISM_HUB_NAME, url: EN_TOURISM_HUB_PATH },
        { name: vertical.name, url: path },
      ],
    }),
    service,
    generateFAQSchema({ faqs: vertical.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}
