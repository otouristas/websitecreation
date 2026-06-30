'use client';

import { useEffect } from 'react';
import { loadGoogleAnalytics } from '@/lib/analytics';

export default function GoogleAnalytics() {
  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  return null;
}
