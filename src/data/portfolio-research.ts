/** Individually reviewed project briefs. Public-page evidence: docs/portfolio-audits/2026-10-20.md. */
export interface ProjectResearch {
  overview: { en: string; el: string };
  features: { en: string[]; el: string[] };
  audience: { en: string; el: string };
  journey: { en: string; el: string };
  keywords: { en: string[]; el: string[] };
}
export const PROJECT_RESEARCH: Record<string, ProjectResearch> = {
  "aggelos-rentals": {
    "overview": {
      "en": "Daily and monthly car rental in Piraeus, with delivery to the port and Athens airport.",
      "el": "Ημερήσια και μηνιαία ενοικίαση αυτοκινήτου στον Πειραιά, με παράδοση στο λιμάνι και στο αεροδρόμιο Αθηνών."
    },
    "features": {
      "en": [
        "Daily and monthly rentals",
        "Port and airport delivery",
        "24-hour customer support"
      ],
      "el": [
        "Ημερήσιες και μηνιαίες μισθώσεις",
        "Παράδοση σε λιμάνι και αεροδρόμιο",
        "Υποστήριξη όλο το εικοσιτετράωρο"
      ]
    },
    "audience": {
      "en": "Arrivals need to choose a vehicle and agree where and when to collect it.",
      "el": "Ο επισκέπτης χρειάζεται όχημα για τις ημερομηνίες του και σαφείς οδηγίες παραλαβής."
    },
    "journey": {
      "en": "Explore the fleet, compare rental periods and request a car for the chosen pickup point.",
      "el": "Επιλογή οχήματος και διάρκειας μίσθωσης, με αίτημα για το σημείο παραλαβής που εξυπηρετεί τον πελάτη."
    },
    "keywords": {
      "en": [
        "car rental Piraeus",
        "monthly car rental Piraeus"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Πειραιάς",
        "μηνιαία ενοικίαση αυτοκινήτου"
      ]
    }
  },
  "antiparos-rentacar": {
    "overview": {
      "en": "An Antiparos rental project presenting cars and scooters for exploring the island.",
      "el": "Έργο ενοικίασης αυτοκινήτων και σκούτερ στην Αντίπαρο, για τις καθημερινές μετακινήσεις στο νησί."
    },
    "features": {
      "en": [
        "Island car rentals",
        "Scooter options",
        "Rental enquiries"
      ],
      "el": [
        "Ενοικιάσεις αυτοκινήτων στο νησί",
        "Επιλογές σκούτερ",
        "Αιτήματα ενοικίασης"
      ]
    },
    "audience": {
      "en": "Visitors arriving by ferry need a practical way to move around Antiparos.",
      "el": "Οι επισκέπτες που φτάνουν με το πλοίο αναζητούν έναν πρακτικό τρόπο μετακίνησης στην Αντίπαρο."
    },
    "journey": {
      "en": "The project connects island transport information with a direct rental enquiry.",
      "el": "Η παρουσίαση συνδέει τις ανάγκες μετακίνησης στο νησί με την επικοινωνία για ενοικίαση."
    },
    "keywords": {
      "en": [
        "Antiparos car rental",
        "Antiparos scooter rental"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Αντίπαρος",
        "ενοικίαση σκούτερ Αντίπαρος"
      ]
    }
  },
  "cyclades-rentacar": {
    "overview": {
      "en": "A directory of local vehicle-rental partners across the Cyclades, from Discover Cyclades.",
      "el": "Κατάλογος τοπικών επιχειρήσεων ενοικίασης οχημάτων στις Κυκλάδες, από το Discover Cyclades."
    },
    "features": {
      "en": [
        "Browse by island and vehicle",
        "Local rental partners",
        "Direct rental arrangements"
      ],
      "el": [
        "Αναζήτηση ανά νησί και τύπο οχήματος",
        "Τοπικές επιχειρήσεις ενοικίασης",
        "Απευθείας συνεννόηση για την ενοικίαση"
      ]
    },
    "audience": {
      "en": "Travellers want to find a suitable local rental company on their chosen island.",
      "el": "Ο ταξιδιώτης θέλει να βρει την κατάλληλη τοπική επιχείρηση στο νησί που θα επισκεφθεί."
    },
    "journey": {
      "en": "Choose an island, explore vehicles and partners, then arrange the rental directly.",
      "el": "Επιλογή νησιού, γνωριμία με τα διαθέσιμα οχήματα και τους συνεργάτες, απευθείας επικοινωνία για την ενοικίαση."
    },
    "keywords": {
      "en": [
        "Cyclades car rental",
        "island rental companies"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Κυκλάδες",
        "τοπικές εταιρείες ενοικίασης"
      ]
    }
  },
  "naxos-carrentals": {
    "overview": {
      "en": "A local Naxos car-rental website with compact, automatic, family and four-wheel-drive vehicles.",
      "el": "Ιστοσελίδα τοπικής ενοικίασης αυτοκινήτων στη Νάξο, με μικρά, αυτόματα, οικογενειακά οχήματα και τετρακίνητα."
    },
    "features": {
      "en": [
        "Vehicle categories",
        "Online booking",
        "Local Naxos team"
      ],
      "el": [
        "Κατηγορίες οχημάτων",
        "Ηλεκτρονική κράτηση",
        "Τοπική ομάδα στη Νάξο"
      ]
    },
    "audience": {
      "en": "Visitors need to match their group and route to a suitable car.",
      "el": "Οι επισκέπτες χρειάζονται αυτοκίνητο που να ταιριάζει στην παρέα και στις διαδρομές τους."
    },
    "journey": {
      "en": "Select travel dates, explore vehicle categories and continue to the booking flow.",
      "el": "Επιλογή ημερομηνιών, σύγκριση κατηγοριών και συνέχεια στην κράτηση."
    },
    "keywords": {
      "en": [
        "Naxos car rental",
        "automatic car Naxos"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Νάξος",
        "αυτόματο αυτοκίνητο Νάξος"
      ]
    }
  },
  "rentacar-antiparos-gr": {
    "overview": {
      "en": "AGGELOS Rentals serves Paros and Antiparos with a local car-rental offer.",
      "el": "Η AGGELOS Rentals εξυπηρετεί την Πάρο και την Αντίπαρο με ενοικιάσεις αυτοκινήτων."
    },
    "features": {
      "en": [
        "Paros and Antiparos coverage",
        "Vehicle selection",
        "Rental contact"
      ],
      "el": [
        "Εξυπηρέτηση Πάρου και Αντιπάρου",
        "Επιλογή οχήματος",
        "Επικοινωνία για ενοικίαση"
      ]
    },
    "audience": {
      "en": "Travellers moving between the two islands need clear local rental information.",
      "el": "Οι ταξιδιώτες που επισκέπτονται τα δύο νησιά χρειάζονται σαφείς πληροφορίες για την ενοικίασή τους."
    },
    "journey": {
      "en": "Find the relevant island and vehicle, then contact the rental team.",
      "el": "Εντοπισμός του νησιού και του κατάλληλου οχήματος, με συνέχεια στην επικοινωνία με την επιχείρηση."
    },
    "keywords": {
      "en": [
        "Paros Antiparos rent a car",
        "AGGELOS Rentals"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Πάρος Αντίπαρος",
        "AGGELOS Rentals"
      ]
    }
  },
  "rentacar-in-paros": {
    "overview": {
      "en": "A Greek-language guide to car rental in Paros, with port and airport information and a booking route through Discover Cyclades.",
      "el": "Ελληνικός οδηγός ενοικίασης αυτοκινήτου στην Πάρο, με πληροφορίες για λιμάνι και αεροδρόμιο και δυνατότητα κράτησης μέσω Discover Cyclades."
    },
    "features": {
      "en": [
        "Paros pickup information",
        "Rental advice",
        "Booking access"
      ],
      "el": [
        "Πληροφορίες παραλαβής στην Πάρο",
        "Συμβουλές ενοικίασης",
        "Πρόσβαση στην κράτηση"
      ]
    },
    "audience": {
      "en": "Greek-speaking visitors need to plan their rental before arriving on Paros.",
      "el": "Οι ελληνόφωνοι επισκέπτες θέλουν να οργανώσουν την ενοικίαση πριν φτάσουν στην Πάρο."
    },
    "journey": {
      "en": "Read local rental guidance, choose the pickup context and proceed to booking.",
      "el": "Ενημέρωση για την ενοικίαση, επιλογή σημείου παραλαβής και συνέχεια στην κράτηση."
    },
    "keywords": {
      "en": [
        "car rental Paros",
        "Paros airport rental"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Πάρος",
        "παραλαβή αυτοκινήτου αεροδρόμιο Πάρου"
      ]
    }
  },
  "rentacar-piraeus": {
    "overview": {
      "en": "GetCarPiraeus offers cars, vans, motorcycles and scooters around Piraeus and its ferry port.",
      "el": "Το GetCarPiraeus προσφέρει αυτοκίνητα, βαν, μοτοσικλέτες και σκούτερ στον Πειραιά και στο λιμάνι."
    },
    "features": {
      "en": [
        "Port gates E1–E12",
        "Cars, vans and two-wheelers",
        "Piraeus and neighbouring areas"
      ],
      "el": [
        "Πύλες λιμανιού Ε1–Ε12",
        "Αυτοκίνητα, βαν και δίκυκλα",
        "Πειραιάς και γειτονικές περιοχές"
      ]
    },
    "audience": {
      "en": "Ferry passengers need to organise pickup around a specific gate and arrival time.",
      "el": "Οι επιβάτες των πλοίων χρειάζονται παραλαβή κοντά στην πύλη και στην ώρα άφιξής τους."
    },
    "journey": {
      "en": "Browse vehicle types and pickup areas, then arrange a rental with the local team.",
      "el": "Επιλογή τύπου οχήματος και περιοχής παραλαβής, με συνέχεια στη συνεννόηση με την τοπική ομάδα."
    },
    "keywords": {
      "en": [
        "Piraeus port car rental",
        "GetCarPiraeus"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου λιμάνι Πειραιά",
        "GetCarPiraeus"
      ]
    }
  },
  "athens-rentacar": {
    "overview": {
      "en": "An Athens car-rental project focused on city and airport arrivals.",
      "el": "Έργο ενοικίασης αυτοκινήτων στην Αθήνα, με έμφαση στις μετακινήσεις στην πόλη και στις αφίξεις από το αεροδρόμιο."
    },
    "features": {
      "en": [
        "Athens car rental",
        "Airport arrival planning",
        "Rental enquiries"
      ],
      "el": [
        "Ενοικίαση αυτοκινήτου στην Αθήνα",
        "Οργάνωση άφιξης από το αεροδρόμιο",
        "Αιτήματα ενοικίασης"
      ]
    },
    "audience": {
      "en": "Visitors need to arrange transport for an Athens stay.",
      "el": "Οι επισκέπτες χρειάζονται μετακίνηση για τη διαμονή τους στην Αθήνα."
    },
    "journey": {
      "en": "The project presents rental information and a direct contact route.",
      "el": "Το έργο παρουσιάζει τις πληροφορίες ενοικίασης και οδηγεί στην απευθείας επικοινωνία."
    },
    "keywords": {
      "en": [
        "Athens rent a car",
        "Athens airport car rental"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Αθήνα",
        "ενοικίαση αυτοκινήτου αεροδρόμιο Αθηνών"
      ]
    }
  },
  "rentacar-paros-gr": {
    "overview": {
      "en": "A Paros car-rental project for travellers planning their island transport.",
      "el": "Έργο ενοικίασης αυτοκινήτων στην Πάρο, για ταξιδιώτες που οργανώνουν τις μετακινήσεις τους στο νησί."
    },
    "features": {
      "en": [
        "Paros rental information",
        "Island transport",
        "Contact for availability"
      ],
      "el": [
        "Πληροφορίες ενοικίασης στην Πάρο",
        "Μετακινήσεις στο νησί",
        "Επικοινωνία για διαθεσιμότητα"
      ]
    },
    "audience": {
      "en": "Visitors need a vehicle for their dates and planned island routes.",
      "el": "Ο επισκέπτης χρειάζεται όχημα για τις ημερομηνίες και τις διαδρομές του."
    },
    "journey": {
      "en": "Rental information leads to an availability enquiry with the business.",
      "el": "Οι πληροφορίες ενοικίασης οδηγούν σε αίτημα διαθεσιμότητας προς την επιχείρηση."
    },
    "keywords": {
      "en": [
        "Paros rent a car",
        "Paros island transport"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Πάρος",
        "μετακινήσεις στην Πάρο"
      ]
    }
  },
  "hotels-santorini": {
    "overview": {
      "en": "A Santorini hotel and area guide combining accommodation discovery with practical travel information.",
      "el": "Οδηγός ξενοδοχείων και περιοχών της Σαντορίνης, που συνδυάζει την αναζήτηση διαμονής με πρακτικές ταξιδιωτικές πληροφορίες."
    },
    "features": {
      "en": [
        "Hotel discovery",
        "Area guides",
        "Practical travel and safety information"
      ],
      "el": [
        "Αναζήτηση ξενοδοχείων",
        "Οδηγοί περιοχών",
        "Πρακτικές πληροφορίες ταξιδιού και ασφάλειας"
      ]
    },
    "audience": {
      "en": "Travellers need to choose where to stay and understand the island before booking.",
      "el": "Ο ταξιδιώτης θέλει να επιλέξει περιοχή και διαμονή γνωρίζοντας καλύτερα το νησί."
    },
    "journey": {
      "en": "Explore areas and accommodation, read travel guidance and follow the relevant booking links.",
      "el": "Αναζήτηση περιοχής και καταλύματος, ενημέρωση για το ταξίδι και συνέχεια στους σχετικούς συνδέσμους κράτησης."
    },
    "keywords": {
      "en": [
        "Santorini hotels",
        "where to stay in Santorini"
      ],
      "el": [
        "ξενοδοχεία Σαντορίνη",
        "πού να μείνω στη Σαντορίνη"
      ]
    }
  },
  "hotels-sifnos": {
    "overview": {
      "en": "A curated directory of Sifnos hotels and villas, organised by area and style with direct contact to local partners.",
      "el": "Επιλεγμένος κατάλογος ξενοδοχείων και βιλών στη Σίφνο, ανά περιοχή και ύφος διαμονής, με απευθείας επικοινωνία με τους συνεργάτες."
    },
    "features": {
      "en": [
        "Accommodation by area",
        "Hotels and villas",
        "Direct partner contact"
      ],
      "el": [
        "Καταλύματα ανά περιοχή",
        "Ξενοδοχεία και βίλες",
        "Απευθείας επικοινωνία με τους συνεργάτες"
      ]
    },
    "audience": {
      "en": "Visitors want to match a Sifnos stay to their preferred village and travel style.",
      "el": "Οι επισκέπτες θέλουν διαμονή που να ταιριάζει στην περιοχή και στον τρόπο διακοπών τους."
    },
    "journey": {
      "en": "Choose an area or accommodation style, explore each property and contact the partner.",
      "el": "Επιλογή περιοχής ή τύπου διαμονής, παρουσίαση καταλύματος και επικοινωνία με τον συνεργάτη."
    },
    "keywords": {
      "en": [
        "Sifnos hotels",
        "Sifnos villas"
      ],
      "el": [
        "ξενοδοχεία Σίφνος",
        "βίλες Σίφνος"
      ]
    }
  },
  "onoma-hotel": {
    "overview": {
      "en": "A five-star hotel in Thessaloniki built around personalised stays, with a rooftop pool and bar, dining and playful shared spaces.",
      "el": "Πεντάστερο ξενοδοχείο στη Θεσσαλονίκη με εξατομικευμένη εμπειρία διαμονής, πισίνα και μπαρ στην ταράτσα, εστιατόριο και χώρους ψυχαγωγίας."
    },
    "features": {
      "en": [
        "Personalised rooms",
        "Rooftop pool and bar",
        "Direct hotel booking"
      ],
      "el": [
        "Δωμάτια με προσωπικό χαρακτήρα",
        "Πισίνα και μπαρ στην ταράτσα",
        "Απευθείας κράτηση στο ξενοδοχείο"
      ]
    },
    "audience": {
      "en": "Guests want to discover the hotel experience as well as the right room.",
      "el": "Ο επισκέπτης θέλει να γνωρίσει την εμπειρία του ξενοδοχείου και να επιλέξει δωμάτιο."
    },
    "journey": {
      "en": "Explore rooms, rooftop and dining experiences, then check dates for a direct booking.",
      "el": "Γνωριμία με τα δωμάτια, την ταράτσα και την εστίαση, με συνέχεια στον έλεγχο ημερομηνιών και στην απευθείας κράτηση."
    },
    "keywords": {
      "en": [
        "ONOMA Hotel Thessaloniki",
        "five-star hotel Thessaloniki"
      ],
      "el": [
        "ONOMA Hotel Θεσσαλονίκη",
        "πεντάστερο ξενοδοχείο Θεσσαλονίκη"
      ]
    }
  },
  "mykonos-luxury": {
    "overview": {
      "en": "A Mykonos concierge platform for private villas, yachts and tailored VIP experiences.",
      "el": "Υπηρεσίες προσωπικής εξυπηρέτησης στη Μύκονο, με ιδιωτικές βίλες, γιοτ και εξατομικευμένες εμπειρίες."
    },
    "features": {
      "en": [
        "Private villa collection",
        "Yacht experiences",
        "24-hour concierge service"
      ],
      "el": [
        "Συλλογή ιδιωτικών βιλών",
        "Εμπειρίες με γιοτ",
        "Προσωπική εξυπηρέτηση όλο το εικοσιτετράωρο"
      ]
    },
    "audience": {
      "en": "Guests need a coordinated stay across accommodation, sea trips and special requests.",
      "el": "Οι επισκέπτες χρειάζονται συντονισμό διαμονής, θαλάσσιων εξορμήσεων και προσωπικών επιθυμιών."
    },
    "journey": {
      "en": "Discover villas or experiences and send a tailored request to the concierge team.",
      "el": "Ανακάλυψη βιλών και εμπειριών, με εξατομικευμένο αίτημα προς την ομάδα εξυπηρέτησης."
    },
    "keywords": {
      "en": [
        "Mykonos luxury villas",
        "Mykonos yacht concierge"
      ],
      "el": [
        "πολυτελείς βίλες Μύκονος",
        "γιοτ Μύκονος"
      ]
    }
  },
  "discover-cyclades": {
    "overview": {
      "en": "A Cyclades travel platform bringing island guides, ferry tracking, accommodation and activities into one planning experience.",
      "el": "Ταξιδιωτική πλατφόρμα για τις Κυκλάδες, με οδηγούς νησιών, παρακολούθηση πλοίων, διαμονή και δραστηριότητες."
    },
    "features": {
      "en": [
        "Guides for 24 islands",
        "Ferry routes and live tracking",
        "Touristas AI travel assistant"
      ],
      "el": [
        "Οδηγοί για 24 νησιά",
        "Δρομολόγια και ζωντανή παρακολούθηση πλοίων",
        "Ταξιδιωτικός βοηθός Touristas AI"
      ]
    },
    "audience": {
      "en": "Travellers need to connect destination research with the practical details of an island trip.",
      "el": "Ο ταξιδιώτης θέλει να συνδέσει την έμπνευση για τον προορισμό με την πρακτική οργάνωση του ταξιδιού."
    },
    "journey": {
      "en": "Start with an island or ferry route, explore places to stay and things to do, and use the travel assistant for questions.",
      "el": "Αφετηρία ένα νησί ή δρομολόγιο, συνέχεια σε διαμονή και δραστηριότητες, με τον ταξιδιωτικό βοηθό διαθέσιμο για ερωτήσεις."
    },
    "keywords": {
      "en": [
        "Cyclades travel guide",
        "Greece ferry tracker"
      ],
      "el": [
        "οδηγός Κυκλάδων",
        "παρακολούθηση πλοίων"
      ]
    }
  },
  "discover-crete": {
    "overview": {
      "en": "An independent Crete travel guide covering beaches, cities, stays, transport and suggested itineraries.",
      "el": "Ανεξάρτητος ταξιδιωτικός οδηγός Κρήτης για παραλίες, πόλεις, διαμονή, μετακινήσεις και προτεινόμενες διαδρομές."
    },
    "features": {
      "en": [
        "Beach and city guides",
        "Ferry, flight and car information",
        "Multi-day itineraries"
      ],
      "el": [
        "Οδηγοί για παραλίες και πόλεις",
        "Πληροφορίες για πλοία, πτήσεις και αυτοκίνητα",
        "Πολυήμερες διαδρομές"
      ]
    },
    "audience": {
      "en": "Visitors need to turn a large island into a practical trip that fits their available days.",
      "el": "Οι επισκέπτες θέλουν να οργανώσουν ένα ταξίδι που να χωρά τις αποστάσεις και τις επιλογές της Κρήτης στις ημέρες τους."
    },
    "journey": {
      "en": "Choose places and an itinerary, then plan accommodation and transport around that route.",
      "el": "Επιλογή προορισμών και διαδρομής, με οργάνωση διαμονής και μετακίνησης γύρω από το πρόγραμμα."
    },
    "keywords": {
      "en": [
        "Crete travel guide",
        "Crete itinerary"
      ],
      "el": [
        "ταξιδιωτικός οδηγός Κρήτης",
        "διαδρομές στην Κρήτη"
      ]
    }
  },
  "way-to-crete": {
    "overview": {
      "en": "An archived Crete travel project centred on storytelling, local tours and experiences.",
      "el": "Παλαιότερο ταξιδιωτικό έργο για την Κρήτη, με ιστορίες του τόπου, εκδρομές και τοπικές εμπειρίες."
    },
    "features": {
      "en": [
        "Crete destination stories",
        "Local experiences",
        "Historical project showcase"
      ],
      "el": [
        "Ιστορίες από την Κρήτη",
        "Τοπικές εμπειρίες",
        "Παρουσίαση παλαιότερου έργου"
      ]
    },
    "audience": {
      "en": "The project introduced travellers to Crete through local perspectives and experiences.",
      "el": "Το έργο παρουσίαζε την Κρήτη μέσα από την τοπική ματιά και τις εμπειρίες της."
    },
    "journey": {
      "en": "Destination stories connected visitors with ideas for exploring the island.",
      "el": "Οι ιστορίες του προορισμού οδηγούσαν σε ιδέες για εξερεύνηση του νησιού."
    },
    "keywords": {
      "en": [
        "Crete experiences",
        "Crete local tours"
      ],
      "el": [
        "εμπειρίες Κρήτη",
        "τοπικές εκδρομές Κρήτη"
      ]
    }
  },
  "santorini-daily-tours": {
    "overview": {
      "en": "A family-run Santorini agency based in Fira, offering day tours, cruises and transfers since 2000.",
      "el": "Οικογενειακό πρακτορείο στα Φηρά της Σαντορίνης, με εκδρομές, κρουαζιέρες και μεταφορές από το 2000."
    },
    "features": {
      "en": [
        "Volcano and catamaran trips",
        "Private island tours",
        "Local transfers"
      ],
      "el": [
        "Εκδρομές στο ηφαίστειο και με καταμαράν",
        "Ιδιωτικές περιηγήσεις στο νησί",
        "Τοπικές μεταφορές"
      ]
    },
    "audience": {
      "en": "Visitors need to choose an excursion that fits their available time and interests.",
      "el": "Οι επισκέπτες θέλουν εκδρομή που να ταιριάζει στον χρόνο και στα ενδιαφέροντά τους."
    },
    "journey": {
      "en": "Explore tour options, read the trip details and continue to a booking or local enquiry.",
      "el": "Αναζήτηση εκδρομής, ενημέρωση για το πρόγραμμα και συνέχεια σε κράτηση ή επικοινωνία με το πρακτορείο."
    },
    "keywords": {
      "en": [
        "Santorini day tours",
        "Santorini volcano cruise"
      ],
      "el": [
        "εκδρομές Σαντορίνη",
        "κρουαζιέρα ηφαίστειο Σαντορίνης"
      ]
    }
  },
  "santo-tours-marinakis": {
    "overview": {
      "en": "Marinakis Tours offers private tours, wine experiences, catamaran trips and transfers on Santorini.",
      "el": "Η Marinakis Tours προσφέρει ιδιωτικές περιηγήσεις, επισκέψεις σε οινοποιεία, εκδρομές με καταμαράν και μεταφορές στη Σαντορίνη."
    },
    "features": {
      "en": [
        "Family agency since 2000",
        "Island and wine tours",
        "Private transfers"
      ],
      "el": [
        "Οικογενειακό πρακτορείο από το 2000",
        "Περιηγήσεις και επισκέψεις σε οινοποιεία",
        "Ιδιωτικές μεταφορές"
      ]
    },
    "audience": {
      "en": "Guests need to organise a private Santorini experience or a reliable transfer.",
      "el": "Οι επισκέπτες χρειάζονται οργάνωση ιδιωτικής εμπειρίας ή μεταφοράς στη Σαντορίνη."
    },
    "journey": {
      "en": "Choose a tour or transfer, review the service and contact the agency about the plan.",
      "el": "Επιλογή περιήγησης ή μεταφοράς, ενημέρωση για την υπηρεσία και επικοινωνία με το πρακτορείο."
    },
    "keywords": {
      "en": [
        "Santorini private tours",
        "Marinakis transfers"
      ],
      "el": [
        "ιδιωτικές εκδρομές Σαντορίνη",
        "Marinakis μεταφορές"
      ]
    }
  },
  "skydream-travel": {
    "overview": {
      "en": "An Athens travel design studio creating bespoke trips around the traveller’s interests.",
      "el": "Ταξιδιωτικό γραφείο στην Αθήνα που σχεδιάζει εξατομικευμένα ταξίδια με βάση τα ενδιαφέροντα του ταξιδιώτη."
    },
    "features": {
      "en": [
        "Tailored travel planning",
        "Destination inspiration",
        "Personal travel consultation"
      ],
      "el": [
        "Εξατομικευμένος σχεδιασμός ταξιδιού",
        "Έμπνευση για προορισμούς",
        "Προσωπική ταξιδιωτική συμβουλή"
      ]
    },
    "audience": {
      "en": "Travellers need a trip shaped around their preferences rather than a fixed package.",
      "el": "Οι ταξιδιώτες αναζητούν πρόγραμμα προσαρμοσμένο στις προτιμήσεις τους, πέρα από ένα έτοιμο πακέτο."
    },
    "journey": {
      "en": "Discover the studio’s approach and destinations, then discuss a personal travel brief.",
      "el": "Γνωριμία με τη φιλοσοφία και τους προορισμούς του γραφείου, με συνέχεια στη συζήτηση για το προσωπικό ταξίδι."
    },
    "keywords": {
      "en": [
        "bespoke travel Athens",
        "Skydream Travel"
      ],
      "el": [
        "εξατομικευμένα ταξίδια Αθήνα",
        "Skydream Travel"
      ]
    }
  },
  "cuba-travel-academy": {
    "overview": {
      "en": "A practical Cuba travel guide covering visas, currency, weather, safety and trip preparation.",
      "el": "Πρακτικός ταξιδιωτικός οδηγός για την Κούβα, με πληροφορίες για βίζα, συνάλλαγμα, καιρό, ασφάλεια και προετοιμασία."
    },
    "features": {
      "en": [
        "Entry and visa guidance",
        "Currency and practical advice",
        "Destination information"
      ],
      "el": [
        "Πληροφορίες εισόδου και βίζας",
        "Συνάλλαγμα και πρακτικές συμβουλές",
        "Πληροφορίες προορισμού"
      ]
    },
    "audience": {
      "en": "Greek-speaking travellers need clear answers before planning a trip to Cuba.",
      "el": "Οι ελληνόφωνοι ταξιδιώτες χρειάζονται ξεκάθαρες απαντήσεις πριν οργανώσουν το ταξίδι τους στην Κούβα."
    },
    "journey": {
      "en": "Follow the preparation topics and destination guides to build an informed travel plan.",
      "el": "Ενημέρωση ανά θέμα προετοιμασίας και προορισμό, ώστε ο ταξιδιώτης να οργανώσει το πρόγραμμά του."
    },
    "keywords": {
      "en": [
        "Cuba travel guide",
        "Cuba visa information"
      ],
      "el": [
        "ταξίδι Κούβα",
        "βίζα Κούβας"
      ]
    }
  },
  "antiparos-transfer": {
    "overview": {
      "en": "AGGELOS Transfer provides private transport on Paros and Antiparos, including airport arrivals, weddings and island tours.",
      "el": "Η AGGELOS Transfer αναλαμβάνει ιδιωτικές μεταφορές στην Πάρο και στην Αντίπαρο, για αφίξεις στο αεροδρόμιο, γάμους και περιηγήσεις."
    },
    "features": {
      "en": [
        "Paros and Antiparos transfers",
        "Wedding transport",
        "Private island tours"
      ],
      "el": [
        "Μεταφορές σε Πάρο και Αντίπαρο",
        "Μεταφορές για γάμους",
        "Ιδιωτικές περιηγήσεις"
      ]
    },
    "audience": {
      "en": "Guests and event organisers need coordinated transport for a specific journey.",
      "el": "Επισκέπτες και διοργανωτές εκδηλώσεων χρειάζονται συντονισμένη μεταφορά για συγκεκριμένη διαδρομή."
    },
    "journey": {
      "en": "Choose the service and send the journey details to arrange a transfer.",
      "el": "Επιλογή υπηρεσίας και αποστολή των στοιχείων διαδρομής για την οργάνωση της μεταφοράς."
    },
    "keywords": {
      "en": [
        "Antiparos transfer",
        "Paros wedding transport"
      ],
      "el": [
        "μεταφορές Αντίπαρος",
        "μεταφορές γάμου Πάρος"
      ]
    }
  },
  "navos-ai": {
    "overview": {
      "en": "An always-on business strategy advisor that connects business context and external changes with evidence and decisions.",
      "el": "Σύμβουλος επιχειρηματικής στρατηγικής που συνδέει το πλαίσιο της επιχείρησης και τις εξωτερικές αλλαγές με τεκμηριωμένες αποφάσεις."
    },
    "features": {
      "en": [
        "Business context",
        "External change monitoring",
        "Decision support"
      ],
      "el": [
        "Πλαίσιο επιχείρησης",
        "Παρακολούθηση εξωτερικών αλλαγών",
        "Υποστήριξη αποφάσεων"
      ]
    },
    "audience": {
      "en": "Business owners need to turn changing information into decisions relevant to their company.",
      "el": "Οι επιχειρηματίες χρειάζονται να μετατρέπουν τις πληροφορίες που αλλάζουν σε αποφάσεις σχετικές με τη δική τους επιχείρηση."
    },
    "journey": {
      "en": "Understand the advisor, supply business context and use the analysis to evaluate next steps.",
      "el": "Γνωριμία με τον σύμβουλο, προσθήκη στοιχείων της επιχείρησης και αξιοποίηση της ανάλυσης για τα επόμενα βήματα."
    },
    "keywords": {
      "en": [
        "AI business strategy advisor",
        "Navos AI"
      ],
      "el": [
        "σύμβουλος επιχειρηματικής στρατηγικής AI",
        "Navos AI"
      ]
    }
  },
  "project-shadow-ai": {
    "overview": {
      "en": "A WooCommerce AI plugin and analytics product for store questions, content writing and customer assistance.",
      "el": "Πρόσθετο AI και εργαλείο ανάλυσης για WooCommerce, με απαντήσεις για το κατάστημα, συγγραφή περιεχομένου και υποστήριξη πελατών."
    },
    "features": {
      "en": [
        "Store analytics and questions",
        "Shadow Writer",
        "Store chatbot and plugin insights"
      ],
      "el": [
        "Ανάλυση και ερωτήσεις για το κατάστημα",
        "Shadow Writer",
        "Chatbot καταστήματος και πληροφορίες προσθέτων"
      ]
    },
    "audience": {
      "en": "Store owners want useful answers and writing tools connected to their WooCommerce business.",
      "el": "Οι ιδιοκτήτες καταστημάτων θέλουν απαντήσεις και εργαλεία συγγραφής που συνδέονται με τη δική τους επιχείρηση WooCommerce."
    },
    "journey": {
      "en": "Explore the product’s store workflows and choose the relevant plugin setup.",
      "el": "Γνωριμία με τις λειτουργίες του καταστήματος και συνέχεια στην κατάλληλη εγκατάσταση του προσθέτου."
    },
    "keywords": {
      "en": [
        "WooCommerce AI plugin",
        "Project Shadow AI"
      ],
      "el": [
        "πρόσθετο AI WooCommerce",
        "Project Shadow AI"
      ]
    }
  },
  "rethemnos": {
    "overview": {
      "en": "A local Rethymno publication covering news, culture, events and life in the region.",
      "el": "Τοπική ενημερωτική ιστοσελίδα για το Ρέθυμνο, με ειδήσεις, πολιτισμό, εκδηλώσεις και τη ζωή της περιοχής."
    },
    "features": {
      "en": [
        "Local news",
        "Culture and events",
        "Rethymno community information"
      ],
      "el": [
        "Τοπικές ειδήσεις",
        "Πολιτισμός και εκδηλώσεις",
        "Ενημέρωση για την κοινωνία του Ρεθύμνου"
      ]
    },
    "audience": {
      "en": "Residents and visitors need timely local information and events.",
      "el": "Κάτοικοι και επισκέπτες χρειάζονται τοπική ενημέρωση και πληροφορίες για εκδηλώσεις."
    },
    "journey": {
      "en": "Browse the news categories and event coverage to find relevant local stories.",
      "el": "Περιήγηση στις κατηγορίες ειδήσεων και στις εκδηλώσεις για τις ιστορίες που ενδιαφέρουν τον αναγνώστη."
    },
    "keywords": {
      "en": [
        "Rethymno news",
        "Rethymno events"
      ],
      "el": [
        "ειδήσεις Ρέθυμνο",
        "εκδηλώσεις Ρέθυμνο"
      ]
    }
  },
  "ktima-orion": {
    "overview": {
      "en": "A wedding and baptism venue in Keratea, Attica, with sea views and spaces for 50 to 350 guests.",
      "el": "Χώρος γάμων και βαπτίσεων στην Κερατέα Αττικής, με θέα στη θάλασσα και δυνατότητα φιλοξενίας 50 έως 350 καλεσμένων."
    },
    "features": {
      "en": [
        "Weddings and baptisms",
        "Sea-view venue",
        "Guest parking"
      ],
      "el": [
        "Γάμοι και βαπτίσεις",
        "Χώρος με θέα στη θάλασσα",
        "Χώρος στάθμευσης επισκεπτών"
      ]
    },
    "audience": {
      "en": "Couples and families need to evaluate the setting, guest capacity and event arrangements.",
      "el": "Ζευγάρια και οικογένειες χρειάζονται εικόνα του χώρου, της χωρητικότητας και της οργάνωσης της εκδήλωσης."
    },
    "journey": {
      "en": "Explore the venue and event services, then enquire about dates and a visit.",
      "el": "Γνωριμία με τον χώρο και τις υπηρεσίες, με αίτημα για ημερομηνίες και επίσκεψη στο κτήμα."
    },
    "keywords": {
      "en": [
        "wedding venue Keratea",
        "Ktima Orion"
      ],
      "el": [
        "κτήμα γάμου Κερατέα",
        "Κτήμα Ωρίων"
      ]
    }
  },
  "weddings-folegandros": {
    "overview": {
      "en": "A Folegandros wedding-planning website for destination weddings, elopements and ceremonies around Chora and Panagia.",
      "el": "Ιστοσελίδα οργάνωσης γάμων στη Φολέγανδρο, για τελετές, μικρούς γάμους και ζευγάρια που επιλέγουν τη Χώρα και την Παναγία."
    },
    "features": {
      "en": [
        "Destination wedding planning",
        "Intimate ceremonies",
        "Folegandros locations"
      ],
      "el": [
        "Οργάνωση γάμου στο νησί",
        "Μικρές, προσωπικές τελετές",
        "Τοποθεσίες στη Φολέγανδρο"
      ]
    },
    "audience": {
      "en": "Couples planning from abroad need a local picture of the ceremony and its arrangements.",
      "el": "Τα ζευγάρια που οργανώνουν τον γάμο από απόσταση χρειάζονται τοπική γνώση και σαφή εικόνα των επιλογών τους."
    },
    "journey": {
      "en": "Explore the wedding setting and planning services, then discuss the ceremony with the team.",
      "el": "Γνωριμία με τις τοποθεσίες και τις υπηρεσίες οργάνωσης, με συνέχεια στη συζήτηση της τελετής με την ομάδα."
    },
    "keywords": {
      "en": [
        "Folegandros wedding planner",
        "Cyclades elopement"
      ],
      "el": [
        "οργάνωση γάμου Φολέγανδρος",
        "γάμος Κυκλάδες"
      ]
    }
  },
  "my-honeymoon": {
    "overview": {
      "en": "A travel-planning service for personalised honeymoons and trips designed around each couple.",
      "el": "Υπηρεσία σχεδιασμού γαμήλιων ταξιδιών, με προτάσεις προσαρμοσμένες στο κάθε ζευγάρι."
    },
    "features": {
      "en": [
        "Honeymoon destinations",
        "Personal travel planning",
        "Couple consultation"
      ],
      "el": [
        "Προορισμοί γαμήλιου ταξιδιού",
        "Εξατομικευμένος σχεδιασμός",
        "Συζήτηση με το ζευγάρι"
      ]
    },
    "audience": {
      "en": "Couples need to choose a destination and organise a honeymoon that suits them.",
      "el": "Τα ζευγάρια χρειάζονται προορισμό και πρόγραμμα γαμήλιου ταξιδιού που να τους ταιριάζει."
    },
    "journey": {
      "en": "Find destination inspiration and discuss a tailored honeymoon itinerary.",
      "el": "Έμπνευση από προορισμούς και συζήτηση για ένα προσωπικό πρόγραμμα γαμήλιου ταξιδιού."
    },
    "keywords": {
      "en": [
        "personalised honeymoon",
        "myHoneymoon"
      ],
      "el": [
        "γαμήλιο ταξίδι",
        "myHoneymoon"
      ]
    }
  },
  "george-xipolitas": {
    "overview": {
      "en": "A personal hospitality and dining-consulting project for George Xipolitas.",
      "el": "Προσωπική επαγγελματική παρουσία του George Xipolitas στον χώρο της φιλοξενίας και της συμβουλευτικής εστίασης."
    },
    "features": {
      "en": [
        "Professional identity",
        "Hospitality expertise",
        "Consulting enquiries"
      ],
      "el": [
        "Επαγγελματική ταυτότητα",
        "Εμπειρία στη φιλοξενία",
        "Αιτήματα συμβουλευτικής"
      ]
    },
    "audience": {
      "en": "Hospitality businesses need to understand the consultant’s focus before making contact.",
      "el": "Οι επιχειρήσεις φιλοξενίας χρειάζονται εικόνα της εξειδίκευσης του συμβούλου πριν επικοινωνήσουν."
    },
    "journey": {
      "en": "The project introduces the professional and connects relevant enquiries to direct contact.",
      "el": "Το έργο παρουσιάζει τον επαγγελματία και οδηγεί τα σχετικά αιτήματα στην απευθείας επικοινωνία."
    },
    "keywords": {
      "en": [
        "hospitality consultant Greece",
        "George Xipolitas"
      ],
      "el": [
        "σύμβουλος εστίασης Ελλάδα",
        "George Xipolitas"
      ]
    }
  },
  "helicro": {
    "overview": {
      "en": "A Belgian airport-transfer and private-chauffeur service linking Brussels, Antwerp, Ghent and Wallonia with regional airports.",
      "el": "Βελγική υπηρεσία μεταφορών αεροδρομίου και ιδιωτικού οδηγού, για Βρυξέλλες, Αμβέρσα, Γάνδη και Βαλλονία."
    },
    "features": {
      "en": [
        "Airport minivan transfers",
        "Zaventem, Charleroi and Lille",
        "Private chauffeur requests"
      ],
      "el": [
        "Μεταφορές με μίνι βαν",
        "Αεροδρόμια Zaventem, Charleroi και Lille",
        "Αιτήματα ιδιωτικού οδηγού"
      ]
    },
    "audience": {
      "en": "Travellers need to arrange an airport journey with clear pickup and destination details.",
      "el": "Οι ταξιδιώτες χρειάζονται οργανωμένη μεταφορά αεροδρομίου με σαφές σημείο παραλαβής και προορισμό."
    },
    "journey": {
      "en": "Choose the airport route, enter the journey details and request the transfer.",
      "el": "Επιλογή διαδρομής αεροδρομίου, συμπλήρωση στοιχείων και αίτημα μεταφοράς."
    },
    "keywords": {
      "en": [
        "Brussels airport transfer",
        "Belgium private chauffeur"
      ],
      "el": [
        "μεταφορά αεροδρόμιο Βρυξελλών",
        "ιδιωτικός οδηγός Βέλγιο"
      ]
    }
  },
  "mastorush": {
    "overview": {
      "en": "A Greek platform for finding tradespeople and requesting quotes for home and property work.",
      "el": "Ελληνική πλατφόρμα αναζήτησης επαγγελματιών και προσφορών για εργασίες σε σπίτι και επαγγελματικό χώρο."
    },
    "features": {
      "en": [
        "Search by trade",
        "Describe the required job",
        "Request local professional quotes"
      ],
      "el": [
        "Αναζήτηση ανά ειδικότητα",
        "Περιγραφή της εργασίας",
        "Αίτημα προσφορών από επαγγελματίες"
      ]
    },
    "audience": {
      "en": "People need to find the right trade for a specific job, from plumbing to electrical work.",
      "el": "Ο χρήστης χρειάζεται την κατάλληλη ειδικότητα για τη δουλειά του, από υδραυλικά έως ηλεκτρολογικά."
    },
    "journey": {
      "en": "Choose the trade, describe the job and request help from relevant professionals.",
      "el": "Επιλογή ειδικότητας, περιγραφή της εργασίας και αίτημα προς τους κατάλληλους επαγγελματίες."
    },
    "keywords": {
      "en": [
        "find tradespeople Greece",
        "MastoRush"
      ],
      "el": [
        "βρες μάστορα",
        "MastoRush"
      ]
    }
  },
  "thenutrinest": {
    "overview": {
      "en": "Nutrinest Clinic is the nutrition practice of clinical dietitian Konstantina Papageorgiou, MSc.",
      "el": "Το Nutrinest Clinic είναι το διαιτολογικό γραφείο της κλινικής διαιτολόγου Κωνσταντίνας Παπαγεωργίου, MSc."
    },
    "features": {
      "en": [
        "Dietitian profile",
        "Nutrition services",
        "Appointment enquiries"
      ],
      "el": [
        "Παρουσίαση της διαιτολόγου",
        "Υπηρεσίες διατροφής",
        "Αιτήματα ραντεβού"
      ]
    },
    "audience": {
      "en": "Prospective clients need to understand the practitioner’s approach and available nutrition support.",
      "el": "Ο ενδιαφερόμενος χρειάζεται να γνωρίσει τη διαιτολόγο, την προσέγγισή της και τις υπηρεσίες της."
    },
    "journey": {
      "en": "Read about the practitioner and services, then contact the clinic for an appointment.",
      "el": "Γνωριμία με τη διαιτολόγο και τις υπηρεσίες, με συνέχεια στην επικοινωνία για ραντεβού."
    },
    "keywords": {
      "en": [
        "Nutrinest Clinic",
        "Konstantina Papageorgiou dietitian"
      ],
      "el": [
        "Nutrinest Clinic",
        "Κωνσταντίνα Παπαγεωργίου διαιτολόγος"
      ]
    }
  },
  "folegandros-hairsalon": {
    "overview": {
      "en": "Sousi Hair Salon by Katerina offers hair, nail, makeup and bridal services on Folegandros.",
      "el": "Το Sousi Hair Salon της Κατερίνας προσφέρει κομμωτική, περιποίηση άκρων, μακιγιάζ και νυφικές υπηρεσίες στη Φολέγανδρο."
    },
    "features": {
      "en": [
        "Hair and styling",
        "Nails and makeup",
        "Bridal appointments"
      ],
      "el": [
        "Κομμωτική και χτενίσματα",
        "Περιποίηση άκρων και μακιγιάζ",
        "Νυφικά ραντεβού"
      ]
    },
    "audience": {
      "en": "Residents, visitors and brides need to find the right beauty service and arrange an appointment.",
      "el": "Κάτοικοι, επισκέπτες και νύφες χρειάζονται την κατάλληλη υπηρεσία και οργάνωση ραντεβού."
    },
    "journey": {
      "en": "Explore the salon’s services and contact Katerina to arrange the appointment.",
      "el": "Γνωριμία με τις υπηρεσίες του κομμωτηρίου και επικοινωνία με την Κατερίνα για ραντεβού."
    },
    "keywords": {
      "en": [
        "Folegandros hair salon",
        "Folegandros bridal makeup"
      ],
      "el": [
        "κομμωτήριο Φολέγανδρος",
        "νυφικό μακιγιάζ Φολέγανδρος"
      ]
    }
  },
  "folegandros-moto": {
    "overview": {
      "en": "Road Runner rents motorcycles, scooters and ATVs on Folegandros, with local service dating to 1998.",
      "el": "Η Road Runner ενοικιάζει μοτοσικλέτες, σκούτερ και ATV στη Φολέγανδρο, με παρουσία στο νησί από το 1998."
    },
    "features": {
      "en": [
        "Motorcycles, scooters and ATVs",
        "Port and hotel delivery",
        "Folegandros rental team"
      ],
      "el": [
        "Μοτοσικλέτες, σκούτερ και ATV",
        "Παράδοση σε λιμάνι και ξενοδοχείο",
        "Τοπική ομάδα στη Φολέγανδρο"
      ]
    },
    "audience": {
      "en": "Visitors need an island vehicle suited to their licence, group and travel dates.",
      "el": "Οι επισκέπτες χρειάζονται όχημα κατάλληλο για την άδεια οδήγησης, την παρέα και τις ημερομηνίες τους."
    },
    "journey": {
      "en": "Compare vehicle categories, check rental information and arrange delivery with the team.",
      "el": "Σύγκριση κατηγοριών οχημάτων, ενημέρωση για την ενοικίαση και συνεννόηση για την παράδοση."
    },
    "keywords": {
      "en": [
        "Folegandros scooter rental",
        "Road Runner Folegandros"
      ],
      "el": [
        "ενοικίαση σκούτερ Φολέγανδρος",
        "Road Runner Φολέγανδρος"
      ]
    }
  },
  "best-pumpkin-near-me": {
    "overview": {
      "en": "A US pumpkin-patch discovery website with location guides and a Halloween affiliate shop.",
      "el": "Ιστοσελίδα αναζήτησης pumpkin patches στις ΗΠΑ, με οδηγούς ανά περιοχή και κατάστημα προτάσεων για το Halloween."
    },
    "features": {
      "en": [
        "Pumpkin patches by location",
        "Seasonal activity guides",
        "Halloween affiliate shopping"
      ],
      "el": [
        "Αναζήτηση pumpkin patch ανά περιοχή",
        "Οδηγοί εποχικών δραστηριοτήτων",
        "Προτάσεις αγορών Halloween με συνεργαζόμενους συνδέσμους"
      ]
    },
    "audience": {
      "en": "Families need to find a nearby pumpkin patch and plan a seasonal outing.",
      "el": "Οι οικογένειες χρειάζονται ένα κοντινό pumpkin patch και πληροφορίες για να οργανώσουν τη φθινοπωρινή εξόρμησή τους."
    },
    "journey": {
      "en": "Search by location, explore patch guides and follow relevant seasonal recommendations.",
      "el": "Αναζήτηση περιοχής, ανάγνωση οδηγών και επιλογή σχετικών εποχικών προτάσεων."
    },
    "keywords": {
      "en": [
        "pumpkin patch near me",
        "pumpkin patches by city"
      ],
      "el": [
        "pumpkin patch κοντά μου",
        "pumpkin patches ανά πόλη"
      ]
    }
  },
  "stretcher-stopper": {
    "overview": {
      "en": "StretcherStopper® is a floor-mounted hospital protection device designed for stretcher and equipment environments.",
      "el": "Το StretcherStopper® είναι σύστημα προστασίας νοσοκομειακών χώρων που στερεώνεται στο δάπεδο και αφορά τη χρήση φορείων και εξοπλισμού."
    },
    "features": {
      "en": [
        "Hospital wall protection",
        "Floor-mounted device",
        "Product information and enquiries"
      ],
      "el": [
        "Προστασία νοσοκομειακών χώρων",
        "Στερέωση στο δάπεδο",
        "Πληροφορίες προϊόντος και επικοινωνία"
      ]
    },
    "audience": {
      "en": "Healthcare buyers need to understand the device, its use and its suitability for their facility.",
      "el": "Οι υπεύθυνοι προμηθειών χρειάζονται να κατανοήσουν το προϊόν, τη χρήση και την καταλληλότητά του για τον χώρο τους."
    },
    "journey": {
      "en": "Review the product and its application, then contact the supplier with a specific requirement.",
      "el": "Ενημέρωση για το προϊόν και την εφαρμογή του, με συνέχεια σε συγκεκριμένο αίτημα προς τον προμηθευτή."
    },
    "keywords": {
      "en": [
        "hospital wall protection",
        "StretcherStopper"
      ],
      "el": [
        "προστασία νοσοκομειακών χώρων",
        "StretcherStopper"
      ]
    }
  },
  "antiparos-rooms": {
    "overview": {
      "en": "AGGELOS Antiparos Apartments presents island accommodation with sea views, balconies and practical in-room facilities.",
      "el": "Η AGGELOS Antiparos Apartments παρουσιάζει διαμονή στην Αντίπαρο με θέα στη θάλασσα, μπαλκόνια και πρακτικές παροχές δωματίου."
    },
    "features": {
      "en": [
        "Sea-view apartments",
        "Kitchen and Wi-Fi facilities",
        "Direct stay enquiries"
      ],
      "el": [
        "Διαμερίσματα με θέα στη θάλασσα",
        "Κουζίνα και Wi-Fi",
        "Απευθείας αιτήματα διαμονής"
      ]
    },
    "audience": {
      "en": "Guests need to assess the accommodation and its facilities before requesting dates.",
      "el": "Οι επισκέπτες χρειάζονται εικόνα του καταλύματος και των παροχών πριν ζητήσουν ημερομηνίες."
    },
    "journey": {
      "en": "Explore the apartments, location and facilities, then enquire about a stay.",
      "el": "Γνωριμία με τα διαμερίσματα, την τοποθεσία και τις παροχές, με συνέχεια σε αίτημα διαμονής."
    },
    "keywords": {
      "en": [
        "Antiparos apartments",
        "AGGELOS Antiparos"
      ],
      "el": [
        "διαμερίσματα Αντίπαρος",
        "AGGELOS Antiparos"
      ]
    }
  },
  "erebos": {
    "overview": {
      "en": "A real-time vehicle-tracking platform for individual vehicles and fleets, using a phone or GPS hardware.",
      "el": "Πλατφόρμα ζωντανής παρακολούθησης οχημάτων και στόλων, με χρήση κινητού ή συσκευής GPS."
    },
    "features": {
      "en": [
        "Real-time vehicle location",
        "Phone or GPS device",
        "Individual vehicles and fleets"
      ],
      "el": [
        "Ζωντανή θέση οχήματος",
        "Χρήση κινητού ή συσκευής GPS",
        "Μεμονωμένα οχήματα και στόλοι"
      ]
    },
    "audience": {
      "en": "Vehicle owners and fleet teams need to understand tracking options and choose a suitable setup.",
      "el": "Ιδιοκτήτες οχημάτων και υπεύθυνοι στόλων χρειάζονται την κατάλληλη μέθοδο παρακολούθησης για τη χρήση τους."
    },
    "journey": {
      "en": "Review the tracking methods and platform, then choose the setup for the vehicle or fleet.",
      "el": "Ενημέρωση για τις μεθόδους παρακολούθησης και επιλογή εγκατάστασης για το όχημα ή τον στόλο."
    },
    "keywords": {
      "en": [
        "GPS vehicle tracking",
        "Erebos fleet tracking"
      ],
      "el": [
        "παρακολούθηση οχήματος GPS",
        "Erebos στόλος"
      ]
    }
  },
  "naxos-car-rental": {
    "overview": {
      "en": "A Naxos Auto Rent website for local car rental and delivery at the port or airport.",
      "el": "Ιστοσελίδα της Naxos Auto Rent για τοπική ενοικίαση αυτοκινήτου και παράδοση στο λιμάνι ή στο αεροδρόμιο."
    },
    "features": {
      "en": [
        "Local Naxos rental team",
        "Port and airport delivery",
        "Vehicle and booking information"
      ],
      "el": [
        "Τοπική ομάδα στη Νάξο",
        "Παράδοση σε λιμάνι και αεροδρόμιο",
        "Πληροφορίες οχημάτων και κράτησης"
      ]
    },
    "audience": {
      "en": "Arriving guests need a car and an agreed pickup point on Naxos.",
      "el": "Οι επισκέπτες χρειάζονται αυτοκίνητο και συμφωνημένο σημείο παραλαβής στη Νάξο."
    },
    "journey": {
      "en": "Explore the fleet and arrival options, then continue to the rental arrangement.",
      "el": "Γνωριμία με τον στόλο και τις επιλογές παραλαβής, με συνέχεια στην οργάνωση της ενοικίασης."
    },
    "keywords": {
      "en": [
        "Naxos Auto Rent",
        "Naxos port car rental"
      ],
      "el": [
        "Naxos Auto Rent",
        "ενοικίαση αυτοκινήτου λιμάνι Νάξου"
      ]
    }
  },
  "naxos-auto-rent": {
    "overview": {
      "en": "A family-run Naxos Auto Rent business offering car rentals and delivery at the port, airport or hotel.",
      "el": "Οικογενειακή επιχείρηση Naxos Auto Rent, με ενοικιάσεις αυτοκινήτων και παράδοση σε λιμάνι, αεροδρόμιο ή ξενοδοχείο."
    },
    "features": {
      "en": [
        "Family-run local business",
        "Port, airport and hotel delivery",
        "Online rental booking"
      ],
      "el": [
        "Οικογενειακή τοπική επιχείρηση",
        "Παράδοση σε λιμάνι, αεροδρόμιο και ξενοδοχείο",
        "Ηλεκτρονική κράτηση ενοικίασης"
      ]
    },
    "audience": {
      "en": "Travellers want to compare cars and organise pickup around their arrival.",
      "el": "Οι ταξιδιώτες θέλουν να συγκρίνουν αυτοκίνητα και να οργανώσουν την παραλαβή σύμφωνα με την άφιξή τους."
    },
    "journey": {
      "en": "Choose dates and a vehicle, then confirm the rental and delivery details.",
      "el": "Επιλογή ημερομηνιών και οχήματος, με συνέχεια στην κράτηση και στα στοιχεία παράδοσης."
    },
    "keywords": {
      "en": [
        "Naxos car rental",
        "Naxos Auto Rent"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Νάξος",
        "Naxos Auto Rent"
      ]
    }
  },
  "rentacar-sifnos": {
    "overview": {
      "en": "Artemis Rental is a family car-rental business in Apollonia, Sifnos, serving visitors since 1988.",
      "el": "Η Artemis Rental είναι οικογενειακή επιχείρηση ενοικίασης αυτοκινήτων στην Απολλωνία της Σίφνου, με παρουσία από το 1988."
    },
    "features": {
      "en": [
        "Local family business",
        "Kamares arrival options",
        "Online reservation information"
      ],
      "el": [
        "Τοπική οικογενειακή επιχείρηση",
        "Παραλαβή για αφίξεις στις Καμάρες",
        "Πληροφορίες ηλεκτρονικής κράτησης"
      ]
    },
    "audience": {
      "en": "Visitors need an island car and clear arrangements for arrival at Kamares.",
      "el": "Οι επισκέπτες χρειάζονται αυτοκίνητο και σαφή συνεννόηση για την άφιξή τους στις Καμάρες."
    },
    "journey": {
      "en": "Explore the fleet, read the rental details and request the travel dates.",
      "el": "Γνωριμία με τον στόλο και τους όρους ενοικίασης, με αίτημα για τις ημερομηνίες ταξιδιού."
    },
    "keywords": {
      "en": [
        "Sifnos car rental",
        "Artemis Rental Sifnos"
      ],
      "el": [
        "ενοικίαση αυτοκινήτου Σίφνος",
        "Artemis Rental Σίφνος"
      ]
    }
  },
  "vwanaki": {
    "overview": {
      "en": "A mobile cocktail-bar van for weddings, baptisms and events in Athens and beyond.",
      "el": "Κινητό cocktail bar σε βανάκι για γάμους, βαπτίσεις και εκδηλώσεις στην Αθήνα και σε άλλους προορισμούς."
    },
    "features": {
      "en": [
        "Mobile cocktail bar",
        "Weddings and private events",
        "Event quote requests"
      ],
      "el": [
        "Κινητό cocktail bar",
        "Γάμοι και ιδιωτικές εκδηλώσεις",
        "Αιτήματα προσφοράς εκδήλωσης"
      ]
    },
    "audience": {
      "en": "Event organisers need to understand the bar experience and request a service for their date and venue.",
      "el": "Οι διοργανωτές χρειάζονται εικόνα της υπηρεσίας και προσφορά για την ημερομηνία και τον χώρο της εκδήλωσής τους."
    },
    "journey": {
      "en": "Explore the cocktail-bar experience and send the event details for a tailored quote.",
      "el": "Γνωριμία με την εμπειρία του κινητού μπαρ και αποστολή στοιχείων εκδήλωσης για προσωπική προσφορά."
    },
    "keywords": {
      "en": [
        "mobile cocktail bar Athens",
        "vwanaki"
      ],
      "el": [
        "κινητό μπαρ εκδηλώσεων",
        "vwanaki"
      ]
    }
  }
};
