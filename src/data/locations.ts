// Locations data for programmatic SEO pages
// Generated from US cities with population 50,000+

export interface Location {
    slug: string;
    city: string;
    state: string;
    stateCode: string;
    population: number;
    latitude: number;
    longitude: number;
}

// Top 100 US cities by population (tier 1 - for immediate launch)
export const tier1Locations: Location[] = [
    { slug: 'new-york-ny', city: 'New York City', state: 'New York', stateCode: 'NY', population: 8804190, latitude: 40.71427, longitude: -74.00597 },
    { slug: 'los-angeles-ca', city: 'Los Angeles', state: 'California', stateCode: 'CA', population: 3820914, latitude: 34.05223, longitude: -118.24368 },
    { slug: 'chicago-il', city: 'Chicago', state: 'Illinois', stateCode: 'IL', population: 2664452, latitude: 41.85003, longitude: -87.65005 },
    { slug: 'houston-tx', city: 'Houston', state: 'Texas', stateCode: 'TX', population: 2314157, latitude: 29.76328, longitude: -95.36327 },
    { slug: 'phoenix-az', city: 'Phoenix', state: 'Arizona', stateCode: 'AZ', population: 1650070, latitude: 33.44838, longitude: -112.07404 },
    { slug: 'philadelphia-pa', city: 'Philadelphia', state: 'Pennsylvania', stateCode: 'PA', population: 1573916, latitude: 39.95238, longitude: -75.16362 },
    { slug: 'san-antonio-tx', city: 'San Antonio', state: 'Texas', stateCode: 'TX', population: 1526656, latitude: 29.42412, longitude: -98.49363 },
    { slug: 'san-diego-ca', city: 'San Diego', state: 'California', stateCode: 'CA', population: 1404452, latitude: 32.71571, longitude: -117.16472 },
    { slug: 'dallas-tx', city: 'Dallas', state: 'Texas', stateCode: 'TX', population: 1326087, latitude: 32.78306, longitude: -96.80667 },
    { slug: 'jacksonville-fl', city: 'Jacksonville', state: 'Florida', stateCode: 'FL', population: 1009833, latitude: 30.33218, longitude: -81.65565 },
    { slug: 'fort-worth-tx', city: 'Fort Worth', state: 'Texas', stateCode: 'TX', population: 1008106, latitude: 32.72541, longitude: -97.32085 },
    { slug: 'san-jose-ca', city: 'San Jose', state: 'California', stateCode: 'CA', population: 997368, latitude: 37.33939, longitude: -121.89496 },
    { slug: 'austin-tx', city: 'Austin', state: 'Texas', stateCode: 'TX', population: 974447, latitude: 30.26715, longitude: -97.74306 },
    { slug: 'columbus-oh', city: 'Columbus', state: 'Ohio', stateCode: 'OH', population: 913175, latitude: 39.96118, longitude: -82.99879 },
    { slug: 'charlotte-nc', city: 'Charlotte', state: 'North Carolina', stateCode: 'NC', population: 911311, latitude: 35.22709, longitude: -80.84313 },
    { slug: 'indianapolis-in', city: 'Indianapolis', state: 'Indiana', stateCode: 'IN', population: 887642, latitude: 39.76838, longitude: -86.15804 },
    { slug: 'san-francisco-ca', city: 'San Francisco', state: 'California', stateCode: 'CA', population: 827526, latitude: 37.77493, longitude: -122.41942 },
    { slug: 'seattle-wa', city: 'Seattle', state: 'Washington', stateCode: 'WA', population: 780995, latitude: 47.60621, longitude: -122.33207 },
    { slug: 'denver-co', city: 'Denver', state: 'Colorado', stateCode: 'CO', population: 729019, latitude: 39.73915, longitude: -104.9847 },
    { slug: 'washington-dc', city: 'Washington', state: 'District of Columbia', stateCode: 'DC', population: 689545, latitude: 38.89511, longitude: -77.03637 },
    { slug: 'nashville-tn', city: 'Nashville', state: 'Tennessee', stateCode: 'TN', population: 689447, latitude: 36.16589, longitude: -86.78444 },
    { slug: 'oklahoma-city-ok', city: 'Oklahoma City', state: 'Oklahoma', stateCode: 'OK', population: 681054, latitude: 35.46756, longitude: -97.51643 },
    { slug: 'el-paso-tx', city: 'El Paso', state: 'Texas', stateCode: 'TX', population: 678815, latitude: 31.75872, longitude: -106.48693 },
    { slug: 'boston-ma', city: 'Boston', state: 'Massachusetts', stateCode: 'MA', population: 653833, latitude: 42.35843, longitude: -71.05977 },
    { slug: 'portland-or', city: 'Portland', state: 'Oregon', stateCode: 'OR', population: 652503, latitude: 45.52345, longitude: -122.67621 },
    { slug: 'detroit-mi', city: 'Detroit', state: 'Michigan', stateCode: 'MI', population: 645705, latitude: 42.33143, longitude: -83.04575 },
    { slug: 'las-vegas-nv', city: 'Las Vegas', state: 'Nevada', stateCode: 'NV', population: 641903, latitude: 36.17497, longitude: -115.13722 },
    { slug: 'memphis-tn', city: 'Memphis', state: 'Tennessee', stateCode: 'TN', population: 633104, latitude: 35.14953, longitude: -90.04898 },
    { slug: 'louisville-ky', city: 'Louisville', state: 'Kentucky', stateCode: 'KY', population: 624444, latitude: 38.25424, longitude: -85.75941 },
    { slug: 'baltimore-md', city: 'Baltimore', state: 'Maryland', stateCode: 'MD', population: 585708, latitude: 39.29038, longitude: -76.61219 },
    { slug: 'albuquerque-nm', city: 'Albuquerque', state: 'New Mexico', stateCode: 'NM', population: 564559, latitude: 35.08449, longitude: -106.65114 },
    { slug: 'milwaukee-wi', city: 'Milwaukee', state: 'Wisconsin', stateCode: 'WI', population: 563531, latitude: 43.0389, longitude: -87.90647 },
    { slug: 'tucson-az', city: 'Tucson', state: 'Arizona', stateCode: 'AZ', population: 542629, latitude: 32.22174, longitude: -110.92648 },
    { slug: 'fresno-ca', city: 'Fresno', state: 'California', stateCode: 'CA', population: 542107, latitude: 36.74773, longitude: -119.77237 },
    { slug: 'sacramento-ca', city: 'Sacramento', state: 'California', stateCode: 'CA', population: 524943, latitude: 38.58157, longitude: -121.4944 },
    { slug: 'atlanta-ga', city: 'Atlanta', state: 'Georgia', stateCode: 'GA', population: 510823, latitude: 33.749, longitude: -84.38798 },
    { slug: 'miami-fl', city: 'Miami', state: 'Florida', stateCode: 'FL', population: 487014, latitude: 25.77427, longitude: -80.19366 },
    { slug: 'omaha-ne', city: 'Omaha', state: 'Nebraska', stateCode: 'NE', population: 486051, latitude: 41.25626, longitude: -95.94043 },
    { slug: 'raleigh-nc', city: 'Raleigh', state: 'North Carolina', stateCode: 'NC', population: 482295, latitude: 35.7721, longitude: -78.63861 },
    { slug: 'kansas-city-mo', city: 'Kansas City', state: 'Missouri', stateCode: 'MO', population: 475378, latitude: 39.09973, longitude: -94.57857 },
    { slug: 'long-beach-ca', city: 'Long Beach', state: 'California', stateCode: 'CA', population: 474140, latitude: 33.76696, longitude: -118.18923 },
    { slug: 'mesa-az', city: 'Mesa', state: 'Arizona', stateCode: 'AZ', population: 471825, latitude: 33.42227, longitude: -111.82264 },
    { slug: 'colorado-springs-co', city: 'Colorado Springs', state: 'Colorado', stateCode: 'CO', population: 456568, latitude: 38.83388, longitude: -104.82136 },
    { slug: 'virginia-beach-va', city: 'Virginia Beach', state: 'Virginia', stateCode: 'VA', population: 454808, latitude: 36.85293, longitude: -75.97799 },
    { slug: 'oakland-ca', city: 'Oakland', state: 'California', stateCode: 'CA', population: 419267, latitude: 37.80437, longitude: -122.2708 },
    { slug: 'tampa-fl', city: 'Tampa', state: 'Florida', stateCode: 'FL', population: 414547, latitude: 27.94752, longitude: -82.45843 },
    { slug: 'tulsa-ok', city: 'Tulsa', state: 'Oklahoma', stateCode: 'OK', population: 413066, latitude: 36.15398, longitude: -95.99277 },
    { slug: 'minneapolis-mn', city: 'Minneapolis', state: 'Minnesota', stateCode: 'MN', population: 410939, latitude: 44.97997, longitude: -93.26384 },
    { slug: 'wichita-ks', city: 'Wichita', state: 'Kansas', stateCode: 'KS', population: 396119, latitude: 37.69224, longitude: -97.33754 },
    { slug: 'arlington-tx', city: 'Arlington', state: 'Texas', stateCode: 'TX', population: 388125, latitude: 32.73569, longitude: -97.10807 },
];

// All US cities 50k+ population (tier 2 - for scale)
// This is a subset - in production, load from JSON file
export const allLocations: Location[] = [
    ...tier1Locations,
    { slug: 'bakersfield-ca', city: 'Bakersfield', state: 'California', stateCode: 'CA', population: 373640, latitude: 35.37329, longitude: -119.01871 },
    { slug: 'cleveland-oh', city: 'Cleveland', state: 'Ohio', stateCode: 'OH', population: 365379, latitude: 41.4995, longitude: -81.69541 },
    { slug: 'new-orleans-la', city: 'New Orleans', state: 'Louisiana', stateCode: 'LA', population: 362701, latitude: 29.95465, longitude: -90.07507 },
    { slug: 'aurora-co', city: 'Aurora', state: 'Colorado', stateCode: 'CO', population: 359407, latitude: 39.72943, longitude: -104.83192 },
    { slug: 'honolulu-hi', city: 'Honolulu', state: 'Hawaii', stateCode: 'HI', population: 350964, latitude: 21.30694, longitude: -157.85833 },
    { slug: 'anaheim-ca', city: 'Anaheim', state: 'California', stateCode: 'CA', population: 350742, latitude: 33.83529, longitude: -117.9145 },
    { slug: 'orlando-fl', city: 'Orlando', state: 'Florida', stateCode: 'FL', population: 334854, latitude: 28.53834, longitude: -81.37924 },
    { slug: 'lexington-ky', city: 'Lexington', state: 'Kentucky', stateCode: 'KY', population: 320347, latitude: 37.98869, longitude: -84.47772 },
    { slug: 'riverside-ca', city: 'Riverside', state: 'California', stateCode: 'CA', population: 317261, latitude: 33.95335, longitude: -117.39616 },
    { slug: 'corpus-christi-tx', city: 'Corpus Christi', state: 'Texas', stateCode: 'TX', population: 316239, latitude: 27.80058, longitude: -97.39638 },
    { slug: 'cincinnati-oh', city: 'Cincinnati', state: 'Ohio', stateCode: 'OH', population: 311097, latitude: 39.12711, longitude: -84.51439 },
    { slug: 'santa-ana-ca', city: 'Santa Ana', state: 'California', stateCode: 'CA', population: 310227, latitude: 33.74557, longitude: -117.86783 },
    { slug: 'stockton-ca', city: 'Stockton', state: 'California', stateCode: 'CA', population: 305658, latitude: 37.9577, longitude: -121.29078 },
    { slug: 'pittsburgh-pa', city: 'Pittsburgh', state: 'Pennsylvania', stateCode: 'PA', population: 304391, latitude: 40.44062, longitude: -79.99589 },
    { slug: 'saint-paul-mn', city: 'Saint Paul', state: 'Minnesota', stateCode: 'MN', population: 303176, latitude: 44.94441, longitude: -93.09327 },
    { slug: 'lincoln-ne', city: 'Lincoln', state: 'Nebraska', stateCode: 'NE', population: 294757, latitude: 40.8, longitude: -96.66696 },
    { slug: 'anchorage-ak', city: 'Anchorage', state: 'Alaska', stateCode: 'AK', population: 289600, latitude: 61.21806, longitude: -149.90028 },
    { slug: 'henderson-nv', city: 'Henderson', state: 'Nevada', stateCode: 'NV', population: 285667, latitude: 36.0397, longitude: -114.98194 },
    { slug: 'greensboro-nc', city: 'Greensboro', state: 'North Carolina', stateCode: 'NC', population: 285342, latitude: 36.07264, longitude: -79.79198 },
    { slug: 'plano-tx', city: 'Plano', state: 'Texas', stateCode: 'TX', population: 283558, latitude: 33.01984, longitude: -96.69889 },
    { slug: 'newark-nj', city: 'Newark', state: 'New Jersey', stateCode: 'NJ', population: 281944, latitude: 40.73566, longitude: -74.17237 },
    { slug: 'madison-wi', city: 'Madison', state: 'Wisconsin', stateCode: 'WI', population: 280305, latitude: 43.07305, longitude: -89.40123 },
    { slug: 'st-louis-mo', city: 'St. Louis', state: 'Missouri', stateCode: 'MO', population: 279695, latitude: 38.62727, longitude: -90.19789 },
    { slug: 'chula-vista-ca', city: 'Chula Vista', state: 'California', stateCode: 'CA', population: 265757, latitude: 32.64005, longitude: -117.0842 },
    { slug: 'toledo-oh', city: 'Toledo', state: 'Ohio', stateCode: 'OH', population: 265638, latitude: 41.66394, longitude: -83.55521 },
    { slug: 'jersey-city-nj', city: 'Jersey City', state: 'New Jersey', stateCode: 'NJ', population: 264290, latitude: 40.72816, longitude: -74.07764 },
    { slug: 'reno-nv', city: 'Reno', state: 'Nevada', stateCode: 'NV', population: 264165, latitude: 39.52963, longitude: -119.8138 },
    { slug: 'chandler-az', city: 'Chandler', state: 'Arizona', stateCode: 'AZ', population: 260828, latitude: 33.30616, longitude: -111.84125 },
    { slug: 'fort-wayne-in', city: 'Fort Wayne', state: 'Indiana', stateCode: 'IN', population: 260326, latitude: 41.1306, longitude: -85.12886 },
    { slug: 'buffalo-ny', city: 'Buffalo', state: 'New York', stateCode: 'NY', population: 258071, latitude: 42.88645, longitude: -78.87837 },
    { slug: 'durham-nc', city: 'Durham', state: 'North Carolina', stateCode: 'NC', population: 257636, latitude: 35.99403, longitude: -78.89862 },
    { slug: 'st-petersburg-fl', city: 'St. Petersburg', state: 'Florida', stateCode: 'FL', population: 257083, latitude: 27.77086, longitude: -82.67927 },
    { slug: 'irvine-ca', city: 'Irvine', state: 'California', stateCode: 'CA', population: 256927, latitude: 33.66946, longitude: -117.82311 },
    { slug: 'laredo-tx', city: 'Laredo', state: 'Texas', stateCode: 'TX', population: 256153, latitude: 27.50641, longitude: -99.50754 },
    { slug: 'lubbock-tx', city: 'Lubbock', state: 'Texas', stateCode: 'TX', population: 249042, latitude: 33.57786, longitude: -101.85517 },
    { slug: 'gilbert-az', city: 'Gilbert', state: 'Arizona', stateCode: 'AZ', population: 247542, latitude: 33.35283, longitude: -111.78903 },
    { slug: 'winston-salem-nc', city: 'Winston-Salem', state: 'North Carolina', stateCode: 'NC', population: 241218, latitude: 36.09986, longitude: -80.24422 },
    { slug: 'glendale-az', city: 'Glendale', state: 'Arizona', stateCode: 'AZ', population: 240126, latitude: 33.53865, longitude: -112.18599 },
    { slug: 'norfolk-va', city: 'Norfolk', state: 'Virginia', stateCode: 'VA', population: 238005, latitude: 36.84681, longitude: -76.28522 },
    { slug: 'hialeah-fl', city: 'Hialeah', state: 'Florida', stateCode: 'FL', population: 237069, latitude: 25.8576, longitude: -80.27811 },
    { slug: 'garland-tx', city: 'Garland', state: 'Texas', stateCode: 'TX', population: 236897, latitude: 32.91262, longitude: -96.63888 },
    { slug: 'scottsdale-az', city: 'Scottsdale', state: 'Arizona', stateCode: 'AZ', population: 236839, latitude: 33.50921, longitude: -111.89903 },
    { slug: 'irving-tx', city: 'Irving', state: 'Texas', stateCode: 'TX', population: 236607, latitude: 32.81402, longitude: -96.94889 },
    { slug: 'boise-id', city: 'Boise', state: 'Idaho', stateCode: 'ID', population: 235684, latitude: 43.6135, longitude: -116.20345 },
    { slug: 'chesapeake-va', city: 'Chesapeake', state: 'Virginia', stateCode: 'VA', population: 235429, latitude: 36.81904, longitude: -76.27494 },
    { slug: 'north-las-vegas-nv', city: 'North Las Vegas', state: 'Nevada', stateCode: 'NV', population: 234807, latitude: 36.19886, longitude: -115.1175 },
    { slug: 'fremont-ca', city: 'Fremont', state: 'California', stateCode: 'CA', population: 232206, latitude: 37.54827, longitude: -121.98857 },
    { slug: 'spokane-wa', city: 'Spokane', state: 'Washington', stateCode: 'WA', population: 229447, latitude: 47.65966, longitude: -117.42908 },
    { slug: 'baton-rouge-la', city: 'Baton Rouge', state: 'Louisiana', stateCode: 'LA', population: 227470, latitude: 30.44332, longitude: -91.18747 },
    { slug: 'richmond-va', city: 'Richmond', state: 'Virginia', stateCode: 'VA', population: 226610, latitude: 37.55376, longitude: -77.46026 },
];

// Helper functions
export const getLocationBySlug = (slug: string): Location | undefined => {
    return allLocations.find((l) => l.slug === slug);
};

export const getAllLocationSlugs = (): string[] => {
    return allLocations.map((l) => l.slug);
};

export const getTier1LocationSlugs = (): string[] => {
    return tier1Locations.map((l) => l.slug);
};

export const getLocationsByState = (stateCode: string): Location[] => {
    return allLocations.filter((l) => l.stateCode === stateCode);
};

// Format location for display
export const formatLocationName = (location: Location): string => {
    return `${location.city}, ${location.stateCode}`;
};

// State code to full name mapping
export const stateNames: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
    FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
    IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
    ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
    MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
    PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
    TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
    WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};
