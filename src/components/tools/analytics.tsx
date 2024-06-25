'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { WebVitals } from '@/components/tools/web-vitals';

export function Analytics() {
  return (
    <>
      <WebVitals />
      <SpeedInsights />
      <VercelAnalytics />
    </>
  );
}
