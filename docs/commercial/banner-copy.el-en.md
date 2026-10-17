# Banner copy and creative specs

These are specifications, not exported ad files. Nothing here is published or sent to an ad platform.

## On-site strip

Desktop, el: «−30% στην κατασκευή ιστοσελίδας. Με 3 μήνες SEO στο Professional ή 6 μήνες στο Business.» CTA «Δες τα πακέτα». Link «Όροι προσφοράς».

Desktop, en: “30% off your website build. Professional includes 3 months of SEO Launch. Business includes 6.” CTA “See the packages”. Link “Offer terms”.

Mobile, el: «Ιστοσελίδα από 1.050€ + ΦΠΑ · −30%».

Mobile, en: “Websites from €1,050 + VAT · 30% off”.

The strip is in document flow, dismissible for the session, and is not fixed, so it does not cover the cookie banner. One strip per page (the homepage passes `showStrip={false}` into the package grid because the page already has the strip).

## Still frames (do not export from this PR)

Safe area: 64 px inset on the short side. Logo: the existing folded-A lockup, not a redraw. Palette: Blue `#007BFF`, Cyan `#2FC6F4`, Teal `#18BFAE`, Mint `#78E6A3`, Ink `#050D1A`, Paper `#F5F7FB`. Type on Paper or Ink only, never small white type on cyan or mint. Reduced-motion stills have no animated gradient sweep.

| Frame | Size | Content |
| --- | --- | --- |
| Feed portrait | 1080×1350 | Eyebrow “Website Launch Offer”. Headline same as the hero. Price “from €1,050 + VAT”. Footer line “30% off the build base. SEO Launch on Professional (3) and Business (6). Offer terms apply.” |
| Story | 1080×1920 | Same headline in the upper third. Price in the middle. CTA “Request a quote” in the lower third, above the 250 px story-UI safe band. |
| Link | 1200×628 | Left: folded-A and “from €1,050 + VAT”. Right: “30% off the website build.” No fake countdown, no slot count. |

Scarcity is omitted from every frame until `capacity_verified_at` exists.
