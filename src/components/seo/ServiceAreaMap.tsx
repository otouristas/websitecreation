import { Location } from '@/data/locations';
import type { SiteLocale } from '@/lib/i18n/locale';

interface ServiceAreaMapProps {
    location: Location;
    className?: string;
    locale?: SiteLocale;
}

export function ServiceAreaMap({ location, className = '', locale = 'en' }: ServiceAreaMapProps) {
    const isEl = locale === 'el';
    const cityName = isEl && location.cityLocal ? location.cityLocal : location.city;

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
        <div className={`rounded-xl overflow-hidden border border-hairline shadow-sm bg-surface-raised ${className}`}>
            <div className="p-4 border-b border-hairline bg-surface">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {isEl ? `Περιοχή εξυπηρέτησης: ${cityName}` : `Service Area: ${cityName}`}
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
                    title={isEl ? `Χάρτης ${cityName}` : `Map of ${cityName}`}
                    className="absolute inset-0"
                />
            </div>
            <div className="p-3 text-xs text-muted-foreground bg-surface-raised flex justify-between">
                <span>
                    {isEl
                        ? `Εξυπηρετούμε ${cityName} και τις γύρω περιοχές`
                        : `Serving ${cityName} & surrounding neighborhoods`}
                </span>
                <a
                    href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=12/${location.latitude}/${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {isEl ? 'Μεγαλύτερος χάρτης' : 'View Larger Map'}
                </a>
            </div>
        </div>
    );
}
