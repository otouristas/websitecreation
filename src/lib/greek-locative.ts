/** Greek locative phrases ("in {city}") for location slugs — shared by metadata and page copy. */
export function getGreekLocative(slug: string, cityFallback?: string): string {
  const locMap: Record<string, string> = {
    'athens-gr': 'στην Αθήνα',
    'thessaloniki-gr': 'στη Θεσσαλονίκη',
    'patras-gr': 'στην Πάτρα',
    'heraklion-gr': 'στο Ηράκλειο',
    'larissa-gr': 'στη Λάρισα',
    'volos-gr': 'στο Βόλο',
    'santorini-gr': 'στη Σαντορίνη',
    'mykonos-gr': 'στη Μύκονο',
    'paros-gr': 'στην Πάρο',
    'naxos-gr': 'στη Νάξο',
    'crete-gr': 'στην Κρήτη',
    'rethymno-gr': 'στο Ρέθυμνο',
    'chania-gr': 'στα Χανιά',
    'kos-gr': 'στην Κω',
    'corinth-gr': 'στην Κόρινθο',
    'serres-gr': 'στις Σέρρες',
    'lamia-gr': 'στη Λαμία',
    'kavala-gr': 'στην Καβάλα',
  };
  if (locMap[slug]) return locMap[slug];
  // Never collapse unknown cities to "στην Ελλάδα" — that created hundreds of duplicate H1/meta strings.
  if (cityFallback?.trim()) return `στο ${cityFallback.trim()}`;
  return 'στην περιοχή σας';
}
