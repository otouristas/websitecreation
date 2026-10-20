/** Editorial headlines grounded in the individually reviewed public project briefs. */
import { PROJECT_RESEARCH } from './portfolio-research';
import type { SiteLocale } from '@/lib/i18n/locale';

const HEADLINES: Record<string, readonly [string, string]> = {
  'aggelos-rentals': ['From the port to the road.', 'Από το λιμάνι, στον δρόμο.'],
  'antiparos-rentacar': ['An island, at your own pace.', 'Η Αντίπαρος, στον δικό σας ρυθμό.'],
  'cyclades-rentacar': ['Your island. Your local rental partner.', 'Το νησί σας. Ο δικός σας συνεργάτης.'],
  'naxos-carrentals': ['The right car for a Naxos escape.', 'Το κατάλληλο αυτοκίνητο για τη Νάξο.'],
  'rentacar-antiparos-gr': ['Two islands. One local connection.', 'Δύο νησιά. Ένας τοπικός συνεργάτης.'],
  'rentacar-in-paros': ['Arrive in Paros with a plan.', 'Η μετακίνησή σας στην Πάρο ξεκινά εδώ.'],
  'rentacar-piraeus': ['A port, a pickup, a journey.', 'Ένα λιμάνι. Μια παραλαβή. Μια διαδρομή.'],
  'athens-rentacar': ['An easier start in Athens.', 'Η αρχή του ταξιδιού στην Αθήνα.'],
  'rentacar-paros-gr': ['Paros begins behind the wheel.', 'Η Πάρος ξεκινά από το τιμόνι.'],
  'hotels-santorini': ['Find your side of Santorini.', 'Βρείτε τη δική σας πλευρά της Σαντορίνης.'],
  'hotels-sifnos': ['A stay that feels like Sifnos.', 'Μια διαμονή με τον χαρακτήρα της Σίφνου.'],
  'onoma-hotel': ['A city stay with personality.', 'Διαμονή με προσωπικότητα.'],
  'villa-olivia-clara': ['Space to make Sifnos your own.', 'Ο δικός σας χώρος στη Σίφνο.'],
  'mykonos-luxury': ['Mykonos, arranged around you.', 'Η Μύκονος, στα δικά σας μέτρα.'],
  'discover-cyclades': ['Many islands. One place to begin.', 'Πολλά νησιά. Μία αφετηρία.'],
  'discover-crete': ['A whole island to discover.', 'Ένα ολόκληρο νησί για να ανακαλύψετε.'],
  'way-to-crete': ['Crete, through its stories.', 'Η Κρήτη μέσα από τις ιστορίες της.'],
  'santorini-daily-tours': ['A Santorini day worth planning.', 'Μια μέρα στη Σαντορίνη, όπως τη θέλετε.'],
  'santo-tours-marinakis': ['Local knowledge. Personal journeys.', 'Τοπική γνώση. Προσωπικές διαδρομές.'],
  'skydream-travel': ['A trip that starts with you.', 'Ένα ταξίδι που ξεκινά από εσάς.'],
  'cuba-travel-academy': ['Cuba, with the practical answers.', 'Η Κούβα, με τις απαντήσεις που χρειάζεστε.'],
  'antiparos-transfer': ['From arrival to the occasion.', 'Από την άφιξη μέχρι την ξεχωριστή στιγμή.'],
  'navos-ai': ['Business context becomes a decision.', 'Από τα δεδομένα της επιχείρησης στην απόφαση.'],
  'project-shadow-ai': ['A closer conversation with your store.', 'Ένας νέος τρόπος να γνωρίσετε το κατάστημά σας.'],
  'rethemnos': ['The life of a place, every day.', 'Η ζωή ενός τόπου, κάθε μέρα.'],
  'ktima-orion': ['A setting for the moments that matter.', 'Ένας χώρος για τις στιγμές που μετράνε.'],
  'weddings-folegandros': ['A small island. A very personal day.', 'Ένα μικρό νησί. Μια πολύ προσωπική μέρα.'],
  'my-honeymoon': ['The first journey of your next chapter.', 'Το πρώτο ταξίδι του επόμενου κεφαλαίου σας.'],
  'george-xipolitas': ['Hospitality, with a personal point of view.', 'Φιλοξενία με προσωπική ματιά.'],
  'helicro': ['A clear route to your next flight.', 'Μια ξεκάθαρη διαδρομή για την επόμενη πτήση.'],
  'mastorush': ['The job meets the right professional.', 'Η εργασία βρίσκει τον κατάλληλο επαγγελματία.'],
  'thenutrinest': ['Nutrition with a human connection.', 'Η διατροφή μέσα από μια ανθρώπινη σχέση.'],
  'folegandros-hairsalon': ['Island life. Individual style.', 'Η ζωή στο νησί, με το δικό σας στιλ.'],
  'folegandros-moto': ['Folegandros, on two wheels or four.', 'Η Φολέγανδρος, σε δύο ή τέσσερις τροχούς.'],
  'best-pumpkin-near-me': ['A local route to autumn adventures.', 'Ένας οδηγός για τις φθινοπωρινές εξορμήσεις.'],
  'stretcher-stopper': ['A specific product. A clear explanation.', 'Ένα εξειδικευμένο προϊόν, με σαφή παρουσίαση.'],
  'antiparos-rooms': ['A room with an island outlook.', 'Ένα δωμάτιο με θέα στο νησί.'],
  'erebos': ['A live view of the road ahead.', 'Ζωντανή εικόνα της διαδρομής.'],
  'naxos-car-rental': ['A local welcome on four wheels.', 'Μια τοπική υποδοχή, σε τέσσερις τροχούς.'],
  'naxos-auto-rent': ['Family knowledge of every island road.', 'Οικογενειακή εμπειρία στους δρόμους του νησιού.'],
  'rentacar-sifnos': ['Sifnos, with a local at your side.', 'Η Σίφνος, με έναν ντόπιο στο πλευρό σας.'],
  'vwanaki': ['A cocktail bar that comes to the party.', 'Ένα cocktail bar που έρχεται στη γιορτή.'],
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
      : `${brief.overview[locale]} ${brief.audience[locale]}`,
    experience: cyclades ? (locale === 'el'
      ? 'Η επιλογή νησιού και τύπου οχήματος οργανώνει την αναζήτηση πριν ο επισκέπτης φτάσει στους συνεργάτες. Η παρουσίαση δίνει χώρο στην τοπική επιχείρηση και οδηγεί στην απευθείας συνεννόηση για την ενοικίαση. Ο κατάλογος λειτουργεί ως σημείο γνωριμίας με τους συνεργάτες, μέσα στο ευρύτερο περιβάλλον του Discover Cyclades.'
      : 'Island and vehicle choices give the search a clear starting point before introducing the local partners. Each business has a place in the experience, with the next step leading to a direct rental arrangement. The directory connects travellers with those partners within the wider Discover Cyclades ecosystem.')
      : brief.journey[locale],
  };
}
