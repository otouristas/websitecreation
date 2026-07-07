/** Greek locative phrases ("in {city}") for location slugs — shared by metadata and page copy. */
export function getGreekLocative(slug: string): string {
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
  return locMap[slug] || 'στην Ελλάδα';
}
