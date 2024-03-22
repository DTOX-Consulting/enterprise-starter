'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((_metric) => {
    // console.log(metric);
  });

  return null;
}
