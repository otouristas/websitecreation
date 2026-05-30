import { Location } from '@/data/locations';

interface ServiceAreaMapProps {
    location: Location;
    className?: string;
}

export function ServiceAreaMap({ location, className = '' }: ServiceAreaMapProps) {
    // Calculate a rough bounding box for the city (approx +/- 0.1 degrees)
    // 1 degree lat ~= 69 miles, 1 degree lon ~= 54.6 miles (at 38 deg lat)
    const offset = 0.1;
    const bbox = [
        location.longitude - offset, // min lon
        location.latitude - offset,  // min lat
        location.longitude + offset, // max lon
        location.latitude + offset   // max lat
    ].join(',');

    return (
        <div className={`rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 ${className}`}>
            <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Service Area: {location.city}
                </h3>
            </div>
            <div className="aspect-video w-full relative">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                    title={`Map of ${location.city}`}
                    className="absolute inset-0"
                />
            </div>
            <div className="p-3 text-xs text-gray-500 bg-gray-50 flex justify-between">
                <span>Serving {location.city} & surrounding neighborhoods</span>
                <a
                    href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=12/${location.latitude}/${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    View Larger Map
                </a>
            </div>
        </div>
    );
}
