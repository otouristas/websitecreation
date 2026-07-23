'use client';

import dynamic from 'next/dynamic';

const ROICalculator = dynamic(
  () => import('@/components/tools/ROICalculator').then((m) => m.ROICalculator),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[420px] rounded-2xl border border-border bg-muted/40" aria-hidden />
    ),
  },
);

export function LazyROICalculator() {
  return <ROICalculator />;
}
