import Link from 'next/link';
import { Location } from '@/data/locations';
import { Service } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { formatLocationNameEl } from '@/data/locations';

interface LocationContentGreekProps {
  location: Location;
  service?: Service;
}

export function LocationContentGreek({ location, service }: LocationContentGreekProps) {
  const city = location.cityLocal ?? location.city;
  const place = formatLocationNameEl(location);
  const serviceEl = service ? getServiceEl(service.slug) : null;
  const target = serviceEl?.name ?? (service?.name ?? 'SEO');

  return (
    <div className="prose prose-lg max-w-none text-gray-700" lang="el">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Η έξυπνη επιλογή για επιχειρήσεις στην {city}
        </h2>
        <p className="mb-4">
          Στην AnotherSEOGuru συνδυάζουμε πλατφόρμα SEO με Google Search Console, GEO (Generative Engine
          Optimization) και AEO (Answer Engine Optimization) για την {place}. Δεν χρησιμοποιούμε παλιές
          τακτικές — αναλύουμε τα πραγματικά σήματα κατάταξης και εφαρμόζουμε στρατηγική {target.toLowerCase()}{' '}
          με μετρήσιμο ROI.
        </p>
        <p>
          Έχουμε εμπειρία με ελληνικές αγορές φιλοξενίας και τουρισμού (π.χ. ξενοδοχεία, ενοικιάσεις
          οχημάτων) — κατανοούμε πώς η τοπική αναζήτηση και η ορατότητα σε AI αλλάζουν τις κρατήσεις και
          τα leads στην {city}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">1. Έρευνα με δεδομένα</h3>
          <p className="text-gray-600">
            Αναλύουμε ανταγωνιστές στην {city}: keywords, σελίδες που φέρνουν traffic και ευκαιρίες
            «striking distance» από το Search Console — όχι εικασίες.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">2. Τεχνική βάση</h3>
          <p className="text-gray-600">
            Core Web Vitals, indexability και καθαρή αρχιτεκτονική ώστε το site να φορτώνει γρήγορα για
            χρήστες στην {city} και σε κινητά.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">3. GEO &amp; AEO</h3>
          <p className="text-gray-600">
            Δομημένο περιεχόμενο, schema και οντότητες για ChatGPT Search, Perplexity και Gemini — ώστε η
            μάρκα σας να εμφανίζεται στις απαντήσεις AI, όχι μόνο στα blue links.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">4. Τοπική ανάπτυξη</h3>
          <p className="text-gray-600">
            Google Business Profile, τοπικές σελίδες και εσωτερική σύνδεση με γειτονικές περιοχές — κρίσιμο
            για ελληνικές αναζητήσεις «κοντά μου».
          </p>
        </div>
      </div>

      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <div className="mb-12 bg-blue-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Καλύπτουμε όλη την {city} και τις γειτονιές
          </h3>
          <p className="mb-6">
            Η τοπική SEO δεν είναι μόνο «{target.toLowerCase()} {city}» — στοχεύουμε γειτονιές και
            micro-intent όπου βρίσκονται οι πελάτες σας.
          </p>
          <div className="flex flex-wrap gap-3">
            {location.neighborhoods.map((hood) => (
              <span
                key={hood}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800 shadow-sm border border-blue-100"
              >
                {hood}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Συχνές ερωτήσεις — {city}</h3>
        <div className="space-y-4 not-prose">
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Πόσο κοστίζει {target.toLowerCase()} στην {city};
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Εξαρτάται από εμβέλεια και ανταγωνισμό. Δίνουμε προσφορά σε {location.currency} με σαφή
              πακέτα — χωρίς κρυφές χρεώσεις.
            </p>
          </details>
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Υποστηρίζετε ελληνικό και αγγλικό περιεχόμενο;
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Ναι. Για διεθνή τουρισμό στην {city} συνδυάζουμε ελληνικές landing σελίδες, hreflang και
              στρατηγική για ξένες αγορές.
            </p>
          </details>
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Τι είναι GEO/AEO και γιατί μετράει στην Ελλάδα;
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Οι χρήστες ρωτούν increasingly σε AI assistants. Το GEO βελτιώνει citations στα μοντέλα· το
              AEO βελτιώνει featured answers — κρίσιμο για hospitality, ιατρική αισθητική και B2B.
            </p>
          </details>
        </div>
      </div>

      <div className="text-center py-12 border-t border-gray-100 mt-12">
        <h3 className="text-2xl font-bold mb-4">Έτοιμοι να αναπτύξετε την επιχείρησή σας στην {city};</h3>
        <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
          Ζητήστε δωρεάν προσφορά — ή ξεκινήστε δοκιμή 7 ημερών της πλατφόρμας SEO μας.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Δωρεάν προσφορά — {city}
          </Link>
          <Link href="/blog/geo-aeo-ellada" className="btn btn-outline text-lg px-8 py-4">
            Οδηγός GEO &amp; AEO Ελλάδα
          </Link>
        </div>
      </div>
    </div>
  );
}
