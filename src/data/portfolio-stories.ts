/** Editorial headlines grounded in the individually reviewed public project briefs. */
import { PROJECT_RESEARCH } from './portfolio-research';
import type { SiteLocale } from '@/lib/i18n/locale';

const HEADLINES: Record<string, readonly [string, string]> = {
  'aggelos-rentals': ['Car hire from the port of Piraeus to Athens airport', 'Ενοικίαση αυτοκινήτου με παράδοση στον Πειραιά ή στο αεροδρόμιο'],
  'antiparos-rentacar': ['Cars and scooters for a stay on Antiparos', 'Αυτοκίνητα και σκούτερ για διακοπές στην Αντίπαρο'],
  'cyclades-rentacar': ['Find a local rental company by island', 'Επιλογή τοπικού γραφείου ενοικίασης ανά νησί'],
  'naxos-carrentals': ['Choosing a car for a family trip to Naxos', 'Επιλογές αυτοκινήτου για οικογενειακές διακοπές στη Νάξο'],
  'rentacar-antiparos-gr': ['One rental company serving Paros and Antiparos', 'Ένα γραφείο ενοικίασης για Πάρο και Αντίπαρο'],
  'rentacar-in-paros': ['Planning a pickup at the port or airport of Paros', 'Παραλαβή αυτοκινήτου στο λιμάνι ή στο αεροδρόμιο της Πάρου'],
  'rentacar-piraeus': ['Cars, vans and scooters near the ferry port', 'Αυτοκίνητα, βαν και σκούτερ κοντά στο λιμάνι του Πειραιά'],
  'athens-rentacar': ['Hiring a car on arrival in Athens', 'Ενοικίαση αυτοκινήτου στην πόλη και στο αεροδρόμιο της Αθήνας'],
  'rentacar-paros-gr': ['Planning a car rental before arriving in Paros', 'Οργάνωση της ενοικίασης αυτοκινήτου πριν την άφιξη στην Πάρο'],
  'hotels-santorini': ['Choosing an area to stay in Santorini', 'Επιλογή περιοχής για διαμονή στη Σαντορίνη'],
  'hotels-sifnos': ['A local directory of hotels and villas', 'Κατάλογος ξενοδοχείων και κατοικιών ανά περιοχή'],
  'onoma-hotel': ['Rooms, rooftop drinks and a stay in Thessaloniki', 'Δωμάτια, πισίνα και μπαρ στην ταράτσα στη Θεσσαλονίκη'],
  'villa-olivia-clara': ['Four bedrooms and a private pool above Platis Gialos', 'Τέσσερα υπνοδωμάτια και ιδιωτική πισίνα πάνω από τον Πλατύ Γιαλό'],
  'mykonos-luxury': ['A concierge service for villas and yachts', 'Υπηρεσίες οργάνωσης διαμονής σε βίλες και ναύλωσης σκαφών'],
  'discover-cyclades': ['Island guides with ferries, stays and activities', 'Οδηγοί νησιών με πλοία, διαμονή και δραστηριότητες'],
  'discover-crete': ['Planning a route through Crete', 'Σχεδιασμός διαδρομής στην Κρήτη'],
  'santorini-daily-tours': ['Day tours and transfers from a family agency in Fira', 'Εκδρομές και μεταφορές από οικογενειακό γραφείο στα Φηρά'],
  'santo-tours-marinakis': ['Private tours, wine tastings and catamaran trips', 'Ιδιωτικές ξεναγήσεις, γευσιγνωσίες και εκδρομές με καταμαράν'],
  'skydream-travel': ['A travel brief built around the traveller’s interests', 'Οργάνωση ταξιδιού με βάση τα ενδιαφέροντα του ταξιδιώτη'],
  'cuba-travel-academy': ['Visas, currency and practical questions about Cuba', 'Βίζα, νόμισμα και προετοιμασία για ταξίδι στην Κούβα'],
  'antiparos-transfer': ['Private transfers for arrivals, tours and weddings', 'Ιδιωτικές μεταφορές για αφίξεις, εκδρομές και γάμους'],
  'navos-ai': ['Business strategy with the evidence behind each decision', 'Στοιχεία που βοηθούν μια επιχείρηση να πάρει αποφάσεις'],
  'project-shadow-ai': ['An AI plugin for WooCommerce store owners', 'Εργαλεία AI για καταστήματα WooCommerce'],
  'ktima-orion': ['A venue in Keratea for weddings and baptisms', 'Χώρος για γάμους και βαπτίσεις στην Κερατέα'],
  'weddings-folegandros': ['Planning a wedding ceremony on Folegandros', 'Οργάνωση γάμου στη Φολέγανδρο'],
  'my-honeymoon': ['Honeymoon planning around each couple’s plans', 'Οργάνωση γαμήλιου ταξιδιού για κάθε ζευγάρι'],
  'george-xipolitas': ['Consulting for hospitality and dining businesses', 'Συμβουλευτική για επιχειρήσεις φιλοξενίας και εστίασης'],
  'helicro': ['Booking a private airport transfer in Belgium', 'Κράτηση ιδιωτικής μεταφοράς προς αεροδρόμια του Βελγίου'],
  'mastorush': ['Finding a tradesperson and requesting a quote', 'Αναζήτηση τεχνίτη και αίτημα προσφοράς για εργασίες στο σπίτι'],
  'thenutrinest': ['A clinical dietitian’s practice online', 'Η διαδικτυακή παρουσία ενός διαιτολογικού γραφείου'],
  'folegandros-hairsalon': ['Hair appointments and bridal styling on Folegandros', 'Κομμωτήριο και νυφικό χτένισμα στη Φολέγανδρο'],
  'folegandros-moto': ['Scooter, motorcycle and ATV rentals on Folegandros', 'Ενοικίαση σκούτερ, μοτοσικλέτας και ATV στη Φολέγανδρο'],
  'best-pumpkin-near-me': ['Finding a pumpkin patch near home', 'Αναζήτηση κοντινής φάρμας με κολοκύθες στις ΗΠΑ'],
  'stretcher-stopper': ['Showing how a floor-mounted stretcher stop works', 'Παρουσίαση ενός επιδαπέδιου στοπ για φορεία'],
  'antiparos-rooms': ['Sea-view apartments with balconies on Antiparos', 'Διαμερίσματα με μπαλκόνι και θέα στη θάλασσα στην Αντίπαρο'],
  'erebos': ['Tracking a vehicle by phone or GPS device', 'Εντοπισμός οχήματος μέσω κινητού ή συσκευής GPS'],
  'naxos-car-rental': ['Arranging car delivery at the port or airport of Naxos', 'Παράδοση αυτοκινήτου στο λιμάνι ή στο αεροδρόμιο της Νάξου'],
  'naxos-auto-rent': ['A family-run rental company with hotel delivery', 'Οικογενειακή επιχείρηση με παράδοση αυτοκινήτου στο ξενοδοχείο'],
  'rentacar-sifnos': ['A family rental business in Apollonia since 1988', 'Οικογενειακό γραφείο ενοικίασης στην Απολλωνία από το 1988'],
  'vwanaki': ['A mobile cocktail bar for weddings and other events', 'Ένα κινητό μπαρ για γάμους, βαπτίσεις και εκδηλώσεις'],
};
export function projectStory(slug: string, locale: SiteLocale) {
  const brief = PROJECT_RESEARCH[slug];
  const headline = HEADLINES[slug]?.[locale === 'el' ? 1 : 0] ?? brief.overview[locale];
  const cyclades = slug === 'cyclades-rentacar';
  return {
    headline,
    context: cyclades ? (locale === 'el'
      ? 'Στις Κυκλάδες, η επιλογή οχήματος ξεκινά από το νησί και τον άνθρωπο που θα το παραδώσει. Το Cyclades Rent a Car συγκεντρώνει τοπικούς συνεργάτες στο ίδιο περιβάλλον, ώστε ο ταξιδιώτης να ξεκινά από τον προορισμό του και να βρίσκει μια επιχείρηση που δραστηριοποιείται εκεί.'
      : 'In the Cyclades, choosing a vehicle starts with the island and the people who will hand over the keys. Cyclades Rent a Car brings local rental partners into one place, letting travellers begin with their destination and find a business that actually operates there.')
      : brief.audience[locale],
    experience: cyclades ? (locale === 'el'
      ? 'Η επιλογή νησιού και τύπου οχήματος οργανώνει την αναζήτηση πριν ο επισκέπτης φτάσει στους συνεργάτες. Η παρουσίαση δίνει χώρο στην τοπική επιχείρηση και οδηγεί στην απευθείας συνεννόηση για την ενοικίαση. Ο κατάλογος λειτουργεί ως σημείο γνωριμίας με τους συνεργάτες, μέσα στο ευρύτερο περιβάλλον του Discover Cyclades.'
      : 'Island and vehicle choices give the search a clear starting point before introducing the local partners. Each business has a place in the experience, with the next step leading to a direct rental arrangement. The directory connects travellers with those partners within the wider Discover Cyclades ecosystem.')
      : brief.journey[locale],
  };
}
