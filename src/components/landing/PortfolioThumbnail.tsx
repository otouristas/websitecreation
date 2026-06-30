'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PortfolioThumbnail({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
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

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover object-top ${className}`}
      sizes="(max-width: 768px) 100vw, 25vw"
      onError={() => setFailed(true)}
    />
  );
}
