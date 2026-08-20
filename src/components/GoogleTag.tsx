import { GOOGLE_TAG_BOOTSTRAP, GOOGLE_TAG_ORIGIN } from '@/lib/analytics';

/**
 * The Google tag (gtag.js) for GA4 + Google Ads, rendered in <head> on every
 * page. The inline script sets Consent Mode defaults and configures both
 * destinations, then loads gtag.js itself.
 */
export default function GoogleTag() {
  return (
    <>
      <link rel="preconnect" href={GOOGLE_TAG_ORIGIN} />
      <script id="google-tag-init" dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_BOOTSTRAP }} />
    </>
  );
}
