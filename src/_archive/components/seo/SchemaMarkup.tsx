/**
 * SchemaMarkup Component
 * Renders JSON-LD structured data in the document head
 */

import type { SchemaOutput } from '@/lib/types/seo';

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
                __html: JSON.stringify(schemas),
            }}
        />
    );
}
