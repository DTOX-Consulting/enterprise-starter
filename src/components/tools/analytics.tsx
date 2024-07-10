'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { WebVitals } from '@/components/tools/web-vitals';
import { getEnv } from '@/lib/env/env.mjs';

export function Analytics() {
  return (
    <>
      <WebVitals />
      <SpeedInsights />
      <VercelAnalytics />
      {/* <GoogleAnalytics gaId={getEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID')} /> */}
      <GoogleTagManager gtmId={getEnv('NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID')} />
    </>
  );
}
