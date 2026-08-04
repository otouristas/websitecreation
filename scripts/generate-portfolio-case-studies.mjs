/**
 * Generates unique EN/EL case-study overrides + portfolio copy patches
 * from project metadata + optional Firecrawl scrape snippets.
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const index = JSON.parse(fs.readFileSync(path.join(root, '.firecrawl/work/_index.json'), 'utf8'));

/** @type {Record<string, { place: string; placeEl: string; niche: string; nicheEl: string; angle: string; angleEl: string; kwEn: string[]; kwEl: string[] }>} */
const META = {
  'aggelos-rentals': { place: 'Paros & Piraeus', placeEl: 'Πάρος & Πειραιάς', niche: 'car rental with port/airport delivery', nicheEl: 'ενοικίαση αυτοκινήτου με παράδοση λιμάνι/αεροδρόμιο', angle: 'seasonal fleet booking for island arrivals', angleEl: 'εποχιακές κρατήσεις στόλου για αφίξεις στο νησί', kwEn: ['rent a car Paros', 'car rental Piraeus port', 'airport car hire Greece'], kwEl: ['ενοικίαση αυτοκινήτου Πάρος', 'ενοικίαση αυτοκινήτου Πειραιάς', 'rent a car λιμάνι'] },
  'antiparos-rentacar': { place: 'Antiparos', placeEl: 'Αντίπαρος', niche: 'island rent-a-car', nicheEl: 'ενοικίαση αυτοκινήτου νησί', angle: 'ferry-arrival pickup and compact fleet for narrow roads', angleEl: 'παραλαβή από ferry και μικρός στόλος για στενούς δρόμους', kwEn: ['rent a car Antiparos', 'Antiparos car rental', 'scooter hire Antiparos'], kwEl: ['ενοικίαση αυτοκινήτου Αντίπαρος', 'rent a car Αντίπαρος', 'ενοικίαση μηχανής Αντίπαρος'] },
  'cyclades-rentacar': { place: 'Cyclades', placeEl: 'Κυκλάδες', niche: 'multi-island car rental brand', nicheEl: 'ενοικίαση αυτοκινήτου Κυκλάδες', angle: 'hub-and-spoke island rental positioning', angleEl: 'τοποθέτηση brand για πολλαπλά νησιά Κυκλάδων', kwEn: ['Cyclades car rental', 'rent a car Cyclades', 'Greek islands car hire'], kwEl: ['ενοικίαση αυτοκινήτου Κυκλάδες', 'rent a car Κυκλάδες', 'αυτοκίνητο Κυκλάδες'] },
  'cretanways-rentals': { place: 'Crete', placeEl: 'Κρήτη', niche: 'Crete car & scooter rentals', nicheEl: 'ενοικίαση αυτοκινήτου Κρήτη', angle: 'airport-to-resort routes across Crete', angleEl: 'διαδρομές αεροδρόμιο–θέρετρο σε όλη την Κρήτη', kwEn: ['rent a car Crete', 'Heraklion car rental', 'Crete scooter hire'], kwEl: ['ενοικίαση αυτοκινήτου Κρήτη', 'rent a car Ηράκλειο', 'ενοικίαση μηχανής Κρήτη'] },
  'naxos-carrentals': { place: 'Naxos', placeEl: 'Νάξος', niche: 'Naxos car rental', nicheEl: 'ενοικίαση αυτοκινήτου Νάξος', angle: 'port pickup and beach-day fleet pages', angleEl: 'παραλαβή λιμάνι και σελίδες στόλου για παραλίες', kwEn: ['rent a car Naxos', 'Naxos car rental', 'Naxos airport transfer car'], kwEl: ['ενοικίαση αυτοκινήτου Νάξος', 'rent a car Νάξος', 'αυτοκίνητο Νάξος'] },
  'rentacar-antiparos-gr': { place: 'Antiparos', placeEl: 'Αντίπαρος', niche: '.gr local rent-a-car', nicheEl: 'τοπική ενοικίαση αυτοκινήτου .gr', angle: 'Greek-first local SEO for Antiparos visitors', angleEl: 'τοπικό SEO στα ελληνικά για επισκέπτες Αντιπάρου', kwEn: ['Antiparos rent a car', 'car hire Antiparos Greece'], kwEl: ['ενοικίαση αυτοκινήτου Αντίπαρος', 'rentacar Αντίπαρος'] },
  'rentacar-in-paros': { place: 'Paros', placeEl: 'Πάρος', niche: 'Paros car rental landing brand', nicheEl: 'ενοικίαση αυτοκινήτου Πάρος', angle: 'conversion-led vehicle cards for summer peaks', angleEl: 'κάρτες οχημάτων βελτιστοποιημένες για καλοκαιρινή αιχμή', kwEn: ['rent a car in Paros', 'Paros car hire', 'Paros port car rental'], kwEl: ['ενοικίαση αυτοκινήτου στην Πάρο', 'rent a car Πάρος'] },
  'rentacar-piraeus': { place: 'Piraeus', placeEl: 'Πειραιάς', niche: 'port city car rental', nicheEl: 'ενοικίαση αυτοκινήτου λιμάνι', angle: 'ferry-day and cruise-port pickup intents', angleEl: 'προθέσεις παραλαβής για ferry και cruise', kwEn: ['rent a car Piraeus', 'Piraeus port car rental', 'Athens port car hire'], kwEl: ['ενοικίαση αυτοκινήτου Πειραιάς', 'rent a car Πειραιάς λιμάνι'] },
  'athens-rentacar': { place: 'Athens', placeEl: 'Αθήνα', niche: 'Athens city & airport rental', nicheEl: 'ενοικίαση αυτοκινήτου Αθήνα', angle: 'airport + city delivery for business and tourism', angleEl: 'παράδοση αεροδρόμιο/πόλη για business και τουρισμό', kwEn: ['rent a car Athens', 'Athens airport car rental', 'Athens car hire'], kwEl: ['ενοικίαση αυτοκινήτου Αθήνα', 'rent a car αεροδρόμιο Αθήνα'] },
  'rentacar-paros-gr': { place: 'Paros', placeEl: 'Πάρος', niche: 'Paros .gr rental site', nicheEl: 'ιστοσελίδα ενοικίασης Πάρος', angle: 'local domain authority for Greek searchers', angleEl: 'τοπικό domain για ελληνικές αναζητήσεις', kwEn: ['rentacar Paros', 'Paros car rental Greece'], kwEl: ['ενοικίαση αυτοκινήτου Πάρος', 'rentacar Πάρος'] },
  'folegandros-moto': { place: 'Folegandros', placeEl: 'Φολέγανδρος', niche: 'moto & scooter rental', nicheEl: 'ενοικίαση μηχανών & scooters', angle: 'two-wheel fleet for cliff-road island mobility', angleEl: 'στόλος δύο τροχών για μετακίνηση στο νησί', kwEn: ['Folegandros scooter rental', 'rent a moto Folegandros', 'ATV Folegandros'], kwEl: ['ενοικίαση μηχανής Φολέγανδρος', 'scooter Φολέγανδρος'] },
  'naxos-car-rental': { place: 'Naxos', placeEl: 'Νάξος', niche: 'Naxos car rental brand', nicheEl: 'brand ενοικίασης Νάξου', angle: 'distinct fleet taxonomy vs sibling Naxos brands', angleEl: 'διακριτή ταξινόμηση στόλου έναντι άλλων brands Νάξου', kwEn: ['Naxos car rental', 'rent a car Naxos airport'], kwEl: ['ενοικίαση αυτοκινήτου Νάξος', 'αυτοκίνητο αεροδρόμιο Νάξος'] },
  'naxos-auto-rent': { place: 'Naxos', placeEl: 'Νάξος', niche: 'auto rent Naxos', nicheEl: 'auto rent Νάξος', angle: 'English-first booking UX for international guests', angleEl: 'EN-first UX κρατήσεων για διεθνείς επισκέπτες', kwEn: ['Naxos auto rent', 'Naxos car hire online'], kwEl: ['ενοικίαση αυτοκινήτου Νάξος online', 'Naxos autorent'] },
  'rentacar-sifnos': { place: 'Sifnos', placeEl: 'Σίφνος', niche: 'Sifnos car rental', nicheEl: 'ενοικίαση αυτοκινήτου Σίφνος', angle: 'port arrival + village hop itineraries', angleEl: 'άφιξη λιμανιού και διαδρομές χωριών', kwEn: ['rent a car Sifnos', 'Sifnos car rental'], kwEl: ['ενοικίαση αυτοκινήτου Σίφνος', 'rent a car Σίφνος'] },

  'hotels-santorini': { place: 'Santorini', placeEl: 'Σαντορίνη', niche: 'Santorini hotels directory / bookings', nicheEl: 'ξενοδοχεία Σαντορίνη', angle: 'caldera & beach hotel discovery with direct CTAs', angleEl: 'ανακάλυψη ξενοδοχείων καλντέρας/παραλίας με άμεσα CTAs', kwEn: ['hotels Santorini', 'Santorini hotel booking', 'caldera hotels'], kwEl: ['ξενοδοχεία Σαντορίνη', 'κράτηση ξενοδοχείου Σαντορίνη'] },
  'hotels-sifnos': { place: 'Sifnos', placeEl: 'Σίφνος', niche: 'Sifnos hotels', nicheEl: 'ξενοδοχεία Σίφνος', angle: 'boutique island stays with local SEO hubs', angleEl: 'boutique διαμονή με τοπικά SEO hubs', kwEn: ['hotels Sifnos', 'Sifnos accommodation', 'where to stay Sifnos'], kwEl: ['ξενοδοχεία Σίφνος', 'διαμονή Σίφνος'] },
  'onoma-hotel': { place: 'Greece hospitality', placeEl: 'φιλοξενία Ελλάδα', niche: 'boutique hotel brand site', nicheEl: 'ιστοσελίδα boutique ξενοδοχείου', angle: 'brand storytelling + room-type SEO pages', angleEl: 'brand storytelling και σελίδες τύπων δωματίων', kwEn: ['Onoma Hotel', 'boutique hotel Greece', 'hotel direct booking'], kwEl: ['Onoma Hotel', 'boutique ξενοδοχείο', 'άμεση κράτηση ξενοδοχείου'] },
  'kipos-hotel': { place: 'garden hotel stay', placeEl: 'ξενοδοχείο με κήπο', niche: 'garden-themed hotel website', nicheEl: 'ιστοσελίδα ξενοδοχείου με κήπο', angle: 'amenities and garden experience as ranking hooks', angleEl: 'παροχές και εμπειρία κήπου ως SEO hooks', kwEn: ['Kipos Hotel', 'garden hotel Greece', 'hotel with garden'], kwEl: ['Kipos Hotel', 'ξενοδοχείο με κήπο', 'διαμονή με κήπο'] },
  'dailyhost': { place: 'short-term hosting', placeEl: 'βραχυχρόνια μίσθωση', niche: 'hospitality hosting platform/brand', nicheEl: 'brand φιλοξενίας / hosting', angle: 'property listing UX and host conversion paths', angleEl: 'UX καταχωρήσεων και conversion για hosts', kwEn: ['DailyHost', 'holiday hosting Greece', 'vacation rental hosting'], kwEl: ['DailyHost', 'βραχυχρόνια μίσθωση', 'διαχείριση καταλυμάτων'] },
  'dailyhost-eu': { place: 'EU hosting market', placeEl: 'αγορά hosting ΕΕ', niche: 'EU-facing hosting brand', nicheEl: 'ευρωπαϊκό hosting brand', angle: 'multi-market EN positioning for EU guests', angleEl: 'πολυαγοραία EN τοποθέτηση για ΕΕ', kwEn: ['DailyHost EU', 'Europe vacation hosting'], kwEl: ['DailyHost EU', 'φιλοξενία Ευρώπη'] },
  'antiparos-rooms': { place: 'Antiparos', placeEl: 'Αντίπαρος', niche: 'rooms & apartments Antiparos', nicheEl: 'δωμάτια & διαμερίσματα Αντίπαρος', angle: 'direct booking rooms vs OTA dependency', angleEl: 'άμεσες κρατήσεις δωματίων έναντι OTA', kwEn: ['Antiparos rooms', 'Antiparos apartments', 'stay in Antiparos'], kwEl: ['δωμάτια Αντίπαρος', 'διαμερίσματα Αντίπαρος', 'διαμονή Αντίπαρος'] },

  'eolides-villas': { place: 'Greek villas', placeEl: 'βίλες Ελλάδα', niche: 'luxury villa portfolio', nicheEl: 'portfolio πολυτελών βιλών', angle: 'multi-property villa SEO with inquiry forms', angleEl: 'SEO πολλών βιλών με φόρμες αιτήματος', kwEn: ['Eolides Villas', 'luxury villas Greece', 'villa rental Greece'], kwEl: ['Eolides Villas', 'πολυτελείς βίλες', 'ενοικίαση βίλας Ελλάδα'] },
  'villa-olivia-clara': { place: 'luxury villa stay', placeEl: 'πολυτελής βίλα', niche: 'single flagship villa site', nicheEl: 'ιστοσελίδα flagship βίλας', angle: 'photo-led conversion for high-intent villa searches', angleEl: 'μετατροπή μέσω φωτογραφίας για high-intent villa searches', kwEn: ['Villa Olivia Clara', 'luxury villa rental', 'private villa Greece'], kwEl: ['Villa Olivia Clara', 'ενοικίαση πολυτελούς βίλας', 'ιδιωτική βίλα'] },
  'villas-katerina': { place: 'villa complex', placeEl: 'συγκρότημα βιλών', niche: 'villas Katerina brand', nicheEl: 'brand Villas Katerina', angle: 'unit comparison pages for villa shoppers', angleEl: 'σελίδες σύγκρισης μονάδων για αγοραστές βιλών', kwEn: ['Villas Katerina', 'villas for rent Greece'], kwEl: ['Villas Katerina', 'βίλες προς ενοικίαση'] },
  'spili-apartments': { place: 'Spili Crete', placeEl: 'Σπήλι Κρήτη', niche: 'apartments in Spili', nicheEl: 'διαμερίσματα στο Σπήλι', angle: 'Crete hinterland stay SEO vs coastal competitors', angleEl: 'SEO διαμονής ενδοχώρας Κρήτης', kwEn: ['Spili apartments', 'Spili Crete accommodation', 'stay Spili'], kwEl: ['διαμερίσματα Σπήλι', 'διαμονή Σπήλι Κρήτη'] },
  'mykonos-luxury': { place: 'Mykonos', placeEl: 'Μύκονος', niche: 'Mykonos luxury stays', nicheEl: 'πολυτελής διαμονή Μύκονος', angle: 'luxury villa/hotel intents for international EN search', angleEl: 'luxury intents για διεθνές EN αναζητήσεις', kwEn: ['Mykonos luxury villa', 'luxury stay Mykonos', 'Mykonos private villa'], kwEl: ['πολυτελής βίλα Μύκονος', 'luxury Μύκονος'] },
  'ktima-orion': { place: 'estate / ktima', placeEl: 'κτήμα', niche: 'estate venue & stays', nicheEl: 'κτήμα για εκδηλώσεις & διαμονή', angle: 'venue + hospitality dual intent SEO', angleEl: 'διπλή πρόθεση SEO: venue και φιλοξενία', kwEn: ['Ktima Orion', 'estate venue Greece', 'wedding estate Crete'], kwEl: ['Κτήμα Orion', 'κτήμα εκδηλώσεων', 'χώρος γάμου'] },

  'discover-cyclades': { place: 'Cyclades', placeEl: 'Κυκλάδες', niche: 'Cyclades travel guide & tours', nicheEl: 'οδηγός & εκδρομές Κυκλάδων', angle: 'island hub architecture for discovery traffic', angleEl: 'αρχιτεκτονική hub ανά νησί για discovery traffic', kwEn: ['Discover Cyclades', 'Cyclades travel guide', 'Cyclades islands tours'], kwEl: ['Discover Cyclades', 'οδηγός Κυκλάδες', 'εκδρομές Κυκλάδες'] },
  'discover-crete': { place: 'Crete', placeEl: 'Κρήτη', niche: 'Crete discovery & tours', nicheEl: 'ανακάλυψη & εκδρομές Κρήτης', angle: 'region silos for west/east Crete intents', angleEl: 'region silos για δυτική/ανατολική Κρήτη', kwEn: ['Discover Crete', 'Crete tours', 'things to do Crete'], kwEl: ['Discover Crete', 'εκδρομές Κρήτη', 'τι να κάνω στην Κρήτη'] },
  'way-to-crete': { place: 'Crete', placeEl: 'Κρήτη', niche: 'Crete travel experiences', nicheEl: 'ταξιδιωτικές εμπειρίες Κρήτης', angle: 'experience-led booking pages for Crete travelers', angleEl: 'σελίδες εμπειριών με booking για ταξιδιώτες Κρήτης', kwEn: ['Way to Crete', 'Crete experiences', 'Crete day trips'], kwEl: ['Way to Crete', 'εμπειρίες Κρήτη', 'ημερήσιες εκδρομές Κρήτη'] },
  'santorini-daily-tours': { place: 'Santorini', placeEl: 'Σαντορίνη', niche: 'daily tours Santorini', nicheEl: 'ημερήσιες εκδρομές Σαντορίνη', angle: 'tour product pages for volcano/boat/day trips', angleEl: 'σελίδες προϊόντων για ηφαίστειο/βάρκα/day trips', kwEn: ['Santorini daily tours', 'Santorini boat tour', 'Santorini day trip'], kwEl: ['ημερήσιες εκδρομές Σαντορίνη', 'τουρ Σαντορίνη', 'βαρκάδα Σαντορίνη'] },
  'santo-tours-marinakis': { place: 'Santorini', placeEl: 'Σαντορίνη', niche: 'local Santorini tour operator', nicheEl: 'τοπικός tour operator Σαντορίνης', angle: 'family operator trust + excursion SEO', angleEl: 'εμπιστοσύνη οικογενειακού operator + SEO εκδρομών', kwEn: ['Santo Tours Marinakis', 'Santorini tours', 'Santorini excursions'], kwEl: ['Santo Tours Marinakis', 'εκδρομές Σαντορίνη'] },
  'quad-safari-rethymno': { place: 'Rethymno Crete', placeEl: 'Ρέθυμνο Κρήτη', niche: 'quad safari tours', nicheEl: 'εκδρομές quad safari', angle: 'adventure activity keywords around Rethymno', angleEl: 'adventure keywords γύρω από Ρέθυμνο', kwEn: ['quad safari Rethymno', 'Crete ATV tour', 'Rethymno jeep safari'], kwEl: ['quad safari Ρέθυμνο', 'ATV Κρήτη', 'σαφάρι Ρέθυμνο'] },
  'skydream-travel': { place: 'travel agency', placeEl: 'ταξιδιωτικό γραφείο', niche: 'travel agency / packages', nicheEl: 'ταξιδιωτικό γραφείο / πακέτα', angle: 'package and destination landing SEO', angleEl: 'SEO πακέτων και προορισμών', kwEn: ['SkyDream Travel', 'travel agency Greece', 'holiday packages'], kwEl: ['SkyDream Travel', 'ταξιδιωτικό γραφείο', 'πακέτα διακοπών'] },
  'cuba-travel-academy': { place: 'Cuba travel education', placeEl: 'εκπαίδευση ταξιδιών Κούβα', niche: 'Cuba travel academy / training', nicheEl: 'ακαδημία ταξιδιών Κούβας', angle: 'education + travel niche authority content', angleEl: 'εκπαιδευτικό + travel niche authority content', kwEn: ['Cuba Travel Academy', 'Cuba travel courses', 'travel training Cuba'], kwEl: ['Cuba Travel Academy', 'μαθήματα ταξιδιών Κούβα'] },
  'rethemnos': { place: 'Rethymno', placeEl: 'Ρέθυμνο', niche: 'Rethymno tourism portal', nicheEl: 'τουριστική πύλη Ρεθύμνου', angle: 'city guide hubs feeding commercial tourism pages', angleEl: 'city guide hubs προς εμπορικές σελίδες', kwEn: ['Rethymno tourism', 'visit Rethymno', 'Rethymno guide'], kwEl: ['τουρισμός Ρέθυμνο', 'οδηγός Ρέθυμνο', 'visit Ρέθυμνο'] },
  'weddings-folegandros': { place: 'Folegandros', placeEl: 'Φολέγανδρος', niche: 'destination weddings', nicheEl: 'γάμοι προορισμού', angle: 'wedding planning SEO for island elopements', angleEl: 'SEO οργάνωσης γάμου για νησιωτικά elopements', kwEn: ['Folegandros weddings', 'destination wedding Greece', 'island wedding Folegandros'], kwEl: ['γάμοι Φολέγανδρος', 'γάμος προορισμού Ελλάδα'] },
  'my-honeymoon': { place: 'honeymoon travel', placeEl: 'ταξίδι honeymoon', niche: 'honeymoon planning brand', nicheEl: 'brand οργάνωσης honeymoon', angle: 'romantic itinerary and package keyword clusters', angleEl: 'clusters ρομαντικών itineraries και πακέτων', kwEn: ['My Honeymoon', 'Greece honeymoon packages', 'honeymoon travel Greece'], kwEl: ['My Honeymoon', 'πακέτα honeymoon Ελλάδα', 'ταξίδι του μέλιτος'] },
  'travel-sifnos': { place: 'Sifnos', placeEl: 'Σίφνος', niche: 'Sifnos travel guide', nicheEl: 'ταξιδιωτικός οδηγός Σίφνου', angle: 'local experiences and stay discovery for Sifnos', angleEl: 'τοπικές εμπειρίες και ανακάλυψη διαμονής Σίφνου', kwEn: ['Travel Sifnos', 'Sifnos travel guide', 'visit Sifnos'], kwEl: ['Travel Sifnos', 'οδηγός Σίφνος', 'επισκεφθείτε Σίφνο'] },
  'greece-cyclades': { place: 'Cyclades Greece', placeEl: 'Κυκλάδες Ελλάδα', niche: 'Cyclades travel brand', nicheEl: 'travel brand Κυκλάδων', angle: 'broad Cyclades discovery vs island-specific siblings', angleEl: 'ευρεία ανακάλυψη Κυκλάδων vs εξειδικευμένα siblings', kwEn: ['Greece Cyclades', 'Cyclades holidays', 'Greek islands travel'], kwEl: ['Κυκλάδες Ελλάδα', 'διακοπές Κυκλάδες', 'ταξίδι ελληνικά νησιά'] },

  'kaffatos-vip-transfers': { place: 'VIP transfers Greece', placeEl: 'VIP μεταφορές Ελλάδα', niche: 'VIP chauffeur transfers', nicheEl: 'VIP μεταφορές με οδηγό', angle: 'airport/port VIP route landing pages', angleEl: 'landing pages VIP διαδρομών αεροδρόμιο/λιμάνι', kwEn: ['VIP transfers Greece', 'private driver Athens', 'airport VIP transfer'], kwEl: ['VIP μεταφορές', 'ιδιωτικός οδηγός Αθήνα', 'VIP αεροδρόμιο'] },
  'the-ace-vip': { place: 'VIP transport', placeEl: 'VIP μεταφορές', niche: 'ACE VIP transfer brand', nicheEl: 'brand ACE VIP', angle: 'premium fleet trust signals for corporate VIP', angleEl: 'premium trust signals για corporate VIP', kwEn: ['The ACE VIP', 'VIP car service', 'executive transfers Greece'], kwEl: ['The ACE VIP', 'VIP αυτοκίνητο', 'executive μεταφορές'] },
  'antiparos-transfer': { place: 'Antiparos', placeEl: 'Αντίπαρος', niche: 'island transfer service', nicheEl: 'μεταφορές νησιού', angle: 'ferry/port transfer booking for Antiparos', angleEl: 'κρατήσεις μεταφοράς ferry/λιμάνι Αντιπάρου', kwEn: ['Antiparos transfer', 'Antiparos taxi', 'port transfer Antiparos'], kwEl: ['μεταφορά Αντίπαρος', 'ταξί Αντίπαρος', 'transfer λιμάνι Αντίπαρος'] },

  'navos-ai': { place: 'travel AI product', placeEl: 'προϊόν travel AI', niche: 'AI travel assistant / SaaS', nicheEl: 'AI βοηθός ταξιδιών / SaaS', angle: 'product + use-case pages for AI citations', angleEl: 'product + use-case σελίδες για AI citations', kwEn: ['Navos AI', 'travel AI assistant', 'AI chatbot tourism'], kwEl: ['Navos AI', 'AI βοηθός ταξιδιών', 'chatbot τουρισμός'] },
  'project-shadow-ai': { place: 'AI tourism tooling', placeEl: 'AI εργαλεία τουρισμού', niche: 'AI project / platform', nicheEl: 'AI project / πλατφόρμα', angle: 'technical brand authority for AI search visibility', angleEl: 'τεχνική brand authority για AI search visibility', kwEn: ['Project Shadow AI', 'AI for travel brands', 'tourism AI platform'], kwEl: ['Project Shadow AI', 'AI για τουρισμό', 'πλατφόρμα tourism AI'] },

  'plati-taverna': { place: 'taverna / restaurant', placeEl: 'ταβέρνα / εστιατόριο', niche: 'Greek taverna website', nicheEl: 'ιστοσελίδα ελληνικής ταβέρνας', angle: 'menu + reservation local SEO', angleEl: 'μενού + κρατήσεις με τοπικό SEO', kwEn: ['Plati Taverna', 'Greek taverna', 'restaurant reservations'], kwEl: ['Πλάτη Ταβέρνα', 'ελληνική ταβέρνα', 'κράτηση εστιατορίου'] },
  'fabrica-cafe': { place: 'cafe', placeEl: 'καφέ', niche: 'cafe brand site', nicheEl: 'ιστοσελίδα καφέ', angle: 'local cafe discovery and menu highlights', angleEl: 'τοπική ανακάλυψη καφέ και highlights μενού', kwEn: ['Fabrica Cafe', 'cafe near me Greece', 'best cafe'], kwEl: ['Fabrica Cafe', 'καφέ', 'καλύτερο καφέ'] },
  'cocktails-in-the-city': { place: 'cocktail bar', placeEl: 'cocktail bar', niche: 'cocktail bar / nightlife', nicheEl: 'cocktail bar / nightlife', angle: 'events and signature drinks as content SEO', angleEl: 'events και signature drinks ως content SEO', kwEn: ['Cocktails in the City', 'cocktail bar Greece', 'best cocktails'], kwEl: ['Cocktails in the City', 'cocktail bar', 'cocktails Ελλάδα'] },
  'taverna-yiannis': { place: 'traditional taverna', placeEl: 'παραδοσιακή ταβέρνα', niche: 'family taverna site', nicheEl: 'ιστοσελίδα οικογενειακής ταβέρνας', angle: 'local food keywords and Google Maps conversion', angleEl: 'local food keywords και μετατροπή από Maps', kwEn: ['Taverna Yiannis', 'traditional Greek taverna', 'local restaurant Greece'], kwEl: ['Ταβέρνα Γιάννης', 'παραδοσιακή ταβέρνα', 'τοπικό εστιατόριο'] },
  'vwanaki': { place: 'restaurant brand', placeEl: 'εστιατόριο', niche: 'restaurant website', nicheEl: 'ιστοσελίδα εστιατορίου', angle: 'brand-led menu SEO and reservation CTAs', angleEl: 'brand-led SEO μενού και CTAs κράτησης', kwEn: ['Vwanaki restaurant', 'dine Greece', 'restaurant booking'], kwEl: ['Vwanaki εστιατόριο', 'κράτηση τραπεζιού'] },

  'arion-farm': { place: 'farm / agritourism', placeEl: 'αγρόκτημα / αγροτουρισμός', niche: 'farm brand & experiences', nicheEl: 'brand αγροκτήματος & εμπειρίες', angle: 'agritourism and product SEO', angleEl: 'SEO αγροτουρισμού και προϊόντων', kwEn: ['Arion Farm', 'agritourism Greece', 'farm experiences'], kwEl: ['Arion Farm', 'αγροτουρισμός', 'επισκέψιμο αγρόκτημα'] },
  'george-xipolitas': { place: 'personal brand / professional', placeEl: 'προσωπικό brand / επαγγελματίας', niche: 'professional services site', nicheEl: 'ιστοσελίδα επαγγελματικών υπηρεσιών', angle: 'authority pages for local professional search', angleEl: 'σελίδες κύρους για τοπική επαγγελματική αναζήτηση', kwEn: ['George Xipolitas', 'professional services Greece'], kwEl: ['George Xipolitas', 'επαγγελματικές υπηρεσίες'] },
  'helicro': { place: 'Belgium / EU business', placeEl: 'Βέλγιο / ΕΕ', niche: 'Helicro business site', nicheEl: 'επιχειρηματική ιστοσελίδα Helicro', angle: 'EU commercial SEO for B2B discovery', angleEl: 'ευρωπαϊκό commercial SEO για B2B', kwEn: ['Helicro', 'Belgium business website'], kwEl: ['Helicro', 'επιχειρηματική ιστοσελίδα Βέλγιο'] },
  'mastorush': { place: 'crafts / services Greece', placeEl: 'τεχνικές υπηρεσίες Ελλάδα', niche: 'Mastorush services brand', nicheEl: 'brand υπηρεσιών Mastorush', angle: 'service-area pages for local demand', angleEl: 'σελίδες περιοχής για τοπική ζήτηση', kwEn: ['Mastorush', 'home services Greece'], kwEl: ['Mastorush', 'υπηρεσίες σπιτιού'] },
  'opticore-store': { place: 'optics / eyewear e-commerce', placeEl: 'οπτικά / e-shop', niche: 'optics store e-shop', nicheEl: 'e-shop οπτικών', angle: 'category SEO for frames and lenses', angleEl: 'SEO κατηγοριών για σκελετούς και φακούς', kwEn: ['Opticore Store', 'buy glasses online Greece', 'optics e-shop'], kwEl: ['Opticore Store', 'αγορά γυαλιών online', 'e-shop οπτικών'] },
  'phytomore': { place: 'plant / wellness brand', placeEl: 'φυτά / wellness', niche: 'Phytomore product brand', nicheEl: 'product brand Phytomore', angle: 'product education content for organic search', angleEl: 'εκπαιδευτικό περιεχόμενο προϊόντων για organic', kwEn: ['Phytomore', 'plant based products', 'wellness shop'], kwEl: ['Phytomore', 'φυτικά προϊόντα', 'wellness shop'] },
  'thenutrinest': { place: 'nutrition brand', placeEl: 'διατροφή', niche: 'nutrition / healthy living', nicheEl: 'διατροφή / healthy living', angle: 'nutrition content hubs and product CTAs', angleEl: 'content hubs διατροφής και CTAs προϊόντων', kwEn: ['The Nutri Nest', 'nutrition Greece', 'healthy living shop'], kwEl: ['The Nutri Nest', 'διατροφή Ελλάδα', 'υγιεινή διατροφή'] },
  'folegandros-hairsalon': { place: 'Folegandros', placeEl: 'Φολέγανδρος', niche: 'hair salon', nicheEl: 'κομμωτήριο', angle: 'local service SEO for island visitors and residents', angleEl: 'τοπικό SEO υπηρεσίας για επισκέπτες και κατοίκους', kwEn: ['Folegandros hair salon', 'hairdresser Folegandros'], kwEl: ['κομμωτήριο Φολέγανδρος', 'hair salon Φολέγανδρος'] },
  'vape-and-more': { place: 'vape retail', placeEl: 'κατάστημα vape', niche: 'vape & more e-commerce', nicheEl: 'e-shop vape & more', angle: 'product category architecture for retail search', angleEl: 'αρχιτεκτονική κατηγοριών για retail search', kwEn: ['Vape and More', 'vape shop Greece', 'buy vape online'], kwEl: ['Vape and More', 'κατάστημα vape', 'αγορά vape online'] },
  'ilektronika-tsigara': { place: 'e-cigarette retail', placeEl: 'ηλεκτρονικά τσιγάρα', niche: 'e-cigarette shop', nicheEl: 'κατάστημα ηλεκτρονικών τσιγάρων', angle: 'Greek commercial keywords for e-cig categories', angleEl: 'ελληνικά commercial keywords για κατηγορίες', kwEn: ['electronic cigarettes Greece', 'e-cig shop'], kwEl: ['ηλεκτρονικά τσιγάρα', 'κατάστημα ηλεκτρονικών τσιγάρων'] },
  'best-pumpkin-near-me': { place: 'US local pumpkin / seasonal', placeEl: 'τοπικό seasonal US', niche: 'local “near me” seasonal site', nicheEl: 'τοπικό seasonal site «κοντά μου»', angle: 'hyperlocal near-me SEO for seasonal demand', angleEl: 'hyperlocal near-me SEO για εποχιακή ζήτηση', kwEn: ['best pumpkin near me', 'pumpkin patch near me'], kwEl: ['best pumpkin near me', 'κολοκύθα κοντά μου'] },
  'stretcher-stopper': { place: 'product / safety brand', placeEl: 'προϊόν / ασφάλεια', niche: 'Stretcher Stopper product site', nicheEl: 'ιστοσελίδα προϊόντος Stretcher Stopper', angle: 'product education + commercial intent pages', angleEl: 'εκπαίδευση προϊόντος + commercial σελίδες', kwEn: ['Stretcher Stopper', 'medical stretcher safety'], kwEl: ['Stretcher Stopper', 'ασφάλεια φορείου'] },
  'agrocult': { place: 'agriculture / agribusiness', placeEl: 'αγροτικές επιχειρήσεις', niche: 'AgroCult brand', nicheEl: 'brand AgroCult', angle: 'B2B agri content and service SEO', angleEl: 'B2B agri content και SEO υπηρεσιών', kwEn: ['AgroCult', 'agriculture Greece', 'agribusiness'], kwEl: ['AgroCult', 'γεωργία Ελλάδα', 'αγροτικές επιχειρήσεις'] },
  'erebos': { place: 'brand / nightlife or services', placeEl: 'brand / υπηρεσίες', niche: 'Erebos brand site', nicheEl: 'ιστοσελίδα brand Erebos', angle: 'brand-first SEO with clear service taxonomy', angleEl: 'brand-first SEO με σαφή ταξινόμηση υπηρεσιών', kwEn: ['Erebos', 'Erebos Greece'], kwEl: ['Erebos', 'Erebos Ελλάδα'] },
  'ergo-and-art': { place: 'art / crafts', placeEl: 'τέχνη / χειροτεχνία', niche: 'Ergo and Art studio', nicheEl: 'στούντιο Ergo and Art', angle: 'portfolio SEO for art and custom work inquiries', angleEl: 'portfolio SEO για τέχνη και custom παραγγελίες', kwEn: ['Ergo and Art', 'art studio Greece', 'custom art commissions'], kwEl: ['Ergo and Art', 'καλλιτεχνικό στούντιο', 'χειροποίητη τέχνη'] },
  'fitness-hood': { place: 'fitness training', placeEl: 'γυμναστήριο / training', niche: 'Fitness Hood training center', nicheEl: 'Fitness Hood training center', angle: 'local gym SEO and class/program pages', angleEl: 'τοπικό SEO γυμναστηρίου και σελίδες προγραμμάτων', kwEn: ['Fitness Hood', 'gym near me', 'personal training Greece'], kwEl: ['Fitness Hood', 'γυμναστήριο', 'personal training'] },
  'huqqa-king': { place: 'hookah / lounge brand', placeEl: 'ναργιλές / lounge', niche: 'Huqqa King lounge', nicheEl: 'Huqqa King lounge', angle: 'local nightlife discovery keywords', angleEl: 'τοπικά nightlife discovery keywords', kwEn: ['Huqqa King', 'hookah lounge', 'shisha bar'], kwEl: ['Huqqa King', 'ναργιλές', 'shisha bar'] },
  'koini-lisi': { place: 'solutions / services firm', placeEl: 'λύσεις / υπηρεσίες', niche: 'Koini Lisi services', nicheEl: 'υπηρεσίες Κοινή Λύση', angle: 'service landing pages for Greek commercial queries', angleEl: 'landing pages υπηρεσιών για ελληνικά commercial queries', kwEn: ['Koini Lisi', 'business solutions Greece'], kwEl: ['Κοινή Λύση', 'επιχειρηματικές λύσεις'] },
  'logopedia': { place: 'speech therapy education', placeEl: 'λογοθεραπεία / εκπαίδευση', niche: 'logopedia / speech therapy', nicheEl: 'λογοθεραπεία', angle: 'educational authority + local therapy booking SEO', angleEl: 'εκπαιδευτική αυθεντία + SEO κρατήσεων θεραπείας', kwEn: ['Logopedia', 'speech therapy Greece', 'λογοθεραπεία'], kwEl: ['λογοθεραπεία', 'λογοθεραπευτής', 'Logopedia'] },
  'politidis-fitness': { place: 'fitness brand', placeEl: 'fitness brand', niche: 'Politidis Fitness', nicheEl: 'Politidis Fitness', angle: 'trainer authority pages and program SEO', angleEl: 'σελίδες κύρους προπονητή και SEO προγραμμάτων', kwEn: ['Politidis Fitness', 'personal trainer Greece', 'fitness coaching'], kwEl: ['Politidis Fitness', 'personal trainer', 'προπόνηση'] },
  'smart-dog-training': { place: 'dog training', placeEl: 'εκπαίδευση σκύλων', niche: 'Smart Dog Training', nicheEl: 'Smart Dog Training', angle: 'local pet-service keywords and program funnels', angleEl: 'τοπικά pet-service keywords και funnels προγραμμάτων', kwEn: ['Smart Dog Training', 'dog training near me', 'puppy training Greece'], kwEl: ['εκπαίδευση σκύλων', 'εκπαιδευτής σκύλων', 'Smart Dog Training'] },
};

function scrapeStatus(slug) {
  const p = path.join(root, '.firecrawl/work', `${slug}.md`);
  if (!fs.existsSync(p) || fs.statSync(p).size < 40) {
    return { status: 'offline', snippet: '' };
  }
  const t = fs.readFileSync(p, 'utf8').replace(/\s+/g, ' ').trim();
  if (/sedoparking|parking\.com|Buy this domain|This domain is for sale/i.test(t)) {
    return { status: 'parked', snippet: t.slice(0, 280) };
  }
  if (t.length < 200 || (t.match(/undefined/g) || []).length >= 5) {
    return { status: 'thin', snippet: t.slice(0, 280) };
  }
  return { status: 'ok', snippet: t.slice(0, 280) };
}

function scrapeSnippet(slug) {
  const { status, snippet } = scrapeStatus(slug);
  return status === 'ok' ? snippet : '';
}

function smartSlice(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > 80 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function buildCase(p) {
  const m = META[p.slug];
  if (!m) throw new Error(`Missing META for ${p.slug}`);
  const servicesEn = (p.services || []).join(', ');
  const snippet = scrapeSnippet(p.slug);

  const overview = {
    en: `${p.name} is a live ${m.niche} project for ${m.place} (${p.markets.join(', ')}, ${p.languages.map(l=>l.toUpperCase()).join('/')}). We built a conversion-focused website with ${servicesEn || 'web + SEO'}, targeting “${m.kwEn[0]}” and related booking intents.`,
    el: `Το ${p.name} είναι ζωντανό έργο ${m.nicheEl} για ${m.placeEl} (${p.markets.join(', ')}, ${p.languages.map(l=>l.toUpperCase()).join('/')}). Φτιάξαμε ιστοσελίδα με ${servicesEn || 'web + SEO'} με στόχο «${m.kwEl[0]}» και σχετικές προθέσεις κράτησης.`,
  };

  const challenge = {
    en: `In ${m.place}, competitors fight for the same “${m.kwEn[0]}” queries. ${p.name} needed a site that differentiates via ${m.angle}, ranks locally, and turns mobile visitors into bookings or inquiries—without looking like a generic template.`,
    el: `Στο ${m.placeEl}, ο ανταγωνισμός διεκδικεί τις ίδιες αναζητήσεις «${m.kwEl[0]}». Το ${p.name} χρειαζόταν ιστοσελίδα που ξεχωρίζει με ${m.angleEl}, rankάρει τοπικά και μετατρέπει επισκέπτες mobile σε κρατήσεις ή αιτήματα—χωρίς generic template εμφάνιση.`,
  };

  const approach = {
    en: `We mapped ${m.place} search intent, structured pages around ${m.kwEn.slice(0, 3).join(', ')}, and shipped mobile-first UX with technical SEO, schema and clear CTAs. ${m.angle.charAt(0).toUpperCase() + m.angle.slice(1)}.${snippet ? ` Live site signals informed copy priorities.` : ''}`,
    el: `Χαρτογραφήσαμε τις προθέσεις αναζήτησης στο ${m.placeEl}, δομήσαμε σελίδες γύρω από ${m.kwEl.slice(0, 3).join(', ')} και παραδώσαμε mobile-first UX με τεχνικό SEO, schema και καθαρά CTAs. ${m.angleEl.charAt(0).toUpperCase() + m.angleEl.slice(1)}.${snippet ? ` Τα σήματα του live site καθοδήγησαν τις προτεραιότητες κειμένου.` : ''}`,
  };

  const seo = {
    en: uniq([
      `Primary keyword focus: ${m.kwEn[0]}`,
      ...m.kwEn.slice(1).map((k) => `Supporting cluster: ${k}`),
      `On-page titles/H1s unique to ${p.name} and ${m.place}`,
      `Internal links from informational pages to booking/contact money pages`,
      `LocalBusiness / relevant schema aligned to ${m.niche}`,
    ]),
    el: uniq([
      `Κύρια λέξη-κλειδί: ${m.kwEl[0]}`,
      ...m.kwEl.slice(1).map((k) => `Υποστηρικτικό cluster: ${k}`),
      `Μοναδικά titles/H1 για ${p.name} και ${m.placeEl}`,
      `Εσωτερική σύνδεση από informational σε σελίδες κράτησης/επικοινωνίας`,
      `Schema LocalBusiness / σχετικό με ${m.nicheEl}`,
    ]),
  };

  const geoAeo = {
    en: [
      `Entity-clear intro stating ${p.name}, ${m.place}, and core ${m.niche} offer`,
      `FAQ blocks answering “${m.kwEn[0]}” style questions for AI Overviews`,
      `Structured facts (location, services, languages) for LLM citations`,
      `About/how-it-works copy written for answer-engine extraction`,
    ],
    el: [
      `Ξεκάθαρη entity εισαγωγή: ${p.name}, ${m.placeEl}, προσφορά ${m.nicheEl}`,
      `FAQ που απαντούν ερωτήσεις τύπου «${m.kwEl[0]}» για AI Overviews`,
      `Δομημένα στοιχεία (τοποθεσία, υπηρεσίες, γλώσσες) για LLM citations`,
      `Κείμενα About/πώς-λειτουργεί έτοιμα για answer engines`,
    ],
  };

  const technical = {
    en: [
      `Mobile-first build optimized for ${m.place} travelers researching on phones`,
      `Core Web Vitals-minded media for ${p.name} galleries/fleet/menu assets`,
      `Clean URLs, sitemap, robots, and Search Console-ready launch`,
      `Tracking wired for booking/inquiry events specific to ${m.niche}`,
    ],
    el: [
      `Mobile-first υλοποίηση για επισκέπτες ${m.placeEl} από κινητό`,
      `Media βελτιστοποιημένα για CWV (gallery/στόλος/μενού ${p.name})`,
      `Καθαρά URLs, sitemap, robots και έτοιμο launch για Search Console`,
      `Tracking για events κράτησης/αιτήματος στο ${m.nicheEl}`,
    ],
  };

  const content = {
    en: [
      `Conversion copy emphasizing ${m.angle}`,
      `Trust modules tailored to ${m.niche} in ${m.place}`,
      `${p.languages.includes('el') && p.languages.includes('en') ? 'EN/EL content paths with consistent NAP and offers' : `Content localized for ${p.languages.join('/').toUpperCase()}`}`,
      `CTA hierarchy: book / WhatsApp / call — matched to ${p.name} buyer journey`,
    ],
    el: [
      `Copy μετατροπής με έμφαση σε ${m.angleEl}`,
      `Trust modules προσαρμοσμένα στο ${m.nicheEl} στο ${m.placeEl}`,
      `${p.languages.includes('el') && p.languages.includes('en') ? 'Διαδρομές EN/EL με συνεπή NAP και προσφορές' : `Τοπικό περιεχόμενο για ${p.languages.join('/').toUpperCase()}`}`,
      `Ιεραρχία CTA: κράτηση / WhatsApp / κλήση — για το buyer journey του ${p.name}`,
    ],
  };

  const outcomes = {
    en: [
      `Unique ${m.place} landing narrative for “${m.kwEn[0]}”`,
      `Service/product architecture mapped to ${m.niche} commercial intents`,
      `Schema + technical SEO baseline for ${p.name}`,
      `Mobile booking/inquiry paths ready for peak season traffic`,
    ],
    el: [
      `Μοναδική αφήγηση ${m.placeEl} για «${m.kwEl[0]}»`,
      `Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ${m.nicheEl}`,
      `Schema + τεχνικό SEO baseline για ${p.name}`,
      `Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν`,
    ],
  };

  const summary = {
    en: `${p.name}: ${m.niche} website for ${m.place} with SEO targeting “${m.kwEn[0]}”, fast mobile UX, and clear booking CTAs.`,
    el: `${p.name}: ιστοσελίδα ${m.nicheEl} για ${m.placeEl} με SEO σε «${m.kwEl[0]}», γρήγορο mobile UX και καθαρά CTAs κράτησης.`,
  };

  const results = [
    `${m.place}: pages and copy aimed at “${m.kwEn[0]}”`,
    `Differentiation: ${m.angle}`,
    `Stack: ${(p.services || []).slice(0, 3).join(', ') || 'website + SEO'}`,
  ];

  const titleKwEn =
    m.kwEn.find((k) => k.toLowerCase() !== p.name.toLowerCase()) || m.kwEn[0];
  const titleKwEl =
    m.kwEl.find((k) => k.toLowerCase() !== p.name.toLowerCase()) || m.kwEl[0];
  const seoTitle = smartSlice(`${p.name} | ${titleKwEn}`, 60);
  const seoDescription = smartSlice(
    `${p.name} — ${m.niche} in ${m.place}. SEO + mobile UX for “${m.kwEn[0]}”.`,
    160,
  );
  const seoTitleEl = smartSlice(`${p.name} | ${titleKwEl}`, 60);
  const seoDescriptionEl = smartSlice(
    `${p.name} — ${m.nicheEl} στο ${m.placeEl}. SEO + mobile UX για «${m.kwEl[0]}».`,
    160,
  );

  return {
    slug: p.slug,
    caseStudy: {
      overview,
      challenge,
      approach,
      seo,
      geoAeo,
      technical,
      content,
      outcomes,
      primaryKeywords: { en: m.kwEn, el: m.kwEl },
    },
    summary: summary.en,
    summaryEl: summary.el,
    results,
    seoTitle,
    seoDescription,
    seoTitleEl,
    seoDescriptionEl,
  };
}

const missing = index.filter((p) => !META[p.slug]).map((p) => p.slug);
if (missing.length) {
  console.error('Missing META for:', missing.join(', '));
  process.exit(1);
}

const built = index.map(buildCase);

// Uniqueness check
const overs = built.map((b) => b.caseStudy.overview.en);
const chall = built.map((b) => b.caseStudy.challenge.en);
function dups(arr) {
  const s = new Set();
  const d = new Set();
  for (const x of arr) {
    if (s.has(x)) d.add(x);
    s.add(x);
  }
  return [...d];
}
const od = dups(overs);
const cd = dups(chall);
if (od.length || cd.length) {
  console.error('Duplicate overviews', od.length, 'challenges', cd.length);
  process.exit(1);
}

const outTs = `import type { PortfolioCaseStudyMap } from './portfolio-case-study-types';

/** Unique EN/EL case-study overrides for every portfolio project. Auto-generated — edit META in scripts/generate-portfolio-case-studies.mjs to regenerate. */
export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudyMap = ${JSON.stringify(
  Object.fromEntries(built.map((b) => [b.slug, b.caseStudy])),
  null,
  2,
)};
`;

fs.writeFileSync(path.join(root, 'src/data/portfolio-case-studies.ts'), outTs);
fs.writeFileSync(path.join(root, '.firecrawl/work/_generated-copy.json'), JSON.stringify(built, null, 2));

// Write compact audits
fs.mkdirSync(path.join(root, 'docs/portfolio-audits'), { recursive: true });
const scrapeLabel = {
  ok: 'yes',
  offline: 'site offline at scrape time — used portfolio metadata',
  parked: 'domain parked / for-sale page at scrape time — used portfolio metadata',
  thin: 'thin or broken page content at scrape time — used portfolio metadata',
};

for (const p of index) {
  const m = META[p.slug];
  const { status, snippet } = scrapeStatus(p.slug);
  const md = `# ${p.name} (${p.slug})

- URL: ${p.url}
- Category: ${p.category}
- Place: ${m.place} / ${m.placeEl}
- Niche: ${m.niche}
- Keywords EN: ${m.kwEn.join('; ')}
- Keywords EL: ${m.kwEl.join('; ')}
- Angle: ${m.angle}
- Scrape: ${scrapeLabel[status]}

${snippet ? `## Snippet\n\n${snippet}\n` : ''}
`;
  fs.writeFileSync(path.join(root, 'docs/portfolio-audits', `${p.slug}.md`), md);
}

console.log('Wrote case studies for', built.length, 'projects');
console.log('Audits in docs/portfolio-audits/');
