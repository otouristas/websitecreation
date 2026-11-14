/**
 * SchemaMarkup Component
 * Renders JSON-LD structured data in the document head
 */

import { AGENCY_ORIGIN, AGENCY_WORKER, PRODUCT_ORIGIN, agencyDomainPath, isAgencyPathname } from '@/lib/site-split';
import type { SchemaOutput } from '@/lib/types/seo';

/** Resolve references in the agency's structured data to their public page or entity. */
function agencySchemaUrl(key: string, value: unknown): unknown {
    if (typeof value !== 'string' || !(value === PRODUCT_ORIGIN || value.startsWith(PRODUCT_ORIGIN + '/'))) return value;
    const url = new URL(value);
    if (url.pathname === '/' && (!url.hash || ['#organization', '#website'].includes(url.hash))) {
        return `${AGENCY_ORIGIN}/${url.search}${url.hash}`;
    }
    if (key === 'item' && /^\/el\/?$/.test(url.pathname)) return `${AGENCY_ORIGIN}/`;
    if (key === 'item' && url.pathname === '/el/blog') return `${AGENCY_ORIGIN}/odigoi`;
    if (isAgencyPathname(url.pathname)) return AGENCY_ORIGIN + agencyDomainPath(url.pathname) + url.search + url.hash;
    if (/^\/(?:brand|portfolio|images)\//.test(url.pathname)) return AGENCY_ORIGIN + url.pathname + url.search;
    if (url.pathname === '/opengraph-image.png') return `${AGENCY_ORIGIN}/brand/agency-og.png`;
    return value;
}

interface SchemaMarkupProps {
    schemas: SchemaOutput[];
}

/**
 * Server component that renders JSON-LD script tags
 * Can accept multiple schema objects
 */
export default function SchemaMarkup({ schemas }: SchemaMarkupProps) {
    if (!schemas || schemas.length === 0) {
        return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas, AGENCY_WORKER ? agencySchemaUrl : undefined).replace(/</g, '\\u003c'),
            }}
        />
    );
}
