'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PortfolioThumbnail({
  src,
  alt,
  className = '',
  hero = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Full-width case-study hero: responsive srcset up to 1920w. */
  hero?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/30 via-muted to-primary/10 ${className}`}
        aria-hidden
      />
    );
  }

  // Card thumbnails never render wider than ~600 CSS px, so a fixed width
  // (1x 640w, 2x 1200w) keeps the 1920w candidate out of the srcset.
  const dims = hero
    ? { width: 1200, height: 750, sizes: '(max-width: 1024px) 100vw, 1000px' }
    : { width: 600, height: 375 };

  return (
    <Image
      src={src}
      alt={alt}
      {...dims}
      className={`h-full w-full object-cover object-top ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
