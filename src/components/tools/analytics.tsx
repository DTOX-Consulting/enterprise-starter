'use client';

import { G } from '@mobily/ts-belt';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { WebVitals } from '@/components/tools/web-vitals';
import { getEnv } from '@/lib/env/env.mjs';

export function Analytics() {
  const googleAnalyticsId = getEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');
  const googleTagManagerId = getEnv('NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID');

  return (
    <>
      <WebVitals />
      <SpeedInsights />
      <VercelAnalytics />
      {G.isNotNullable(googleTagManagerId) && <GoogleTagManager gtmId={googleTagManagerId} />}
      {G.isNotNullable(googleAnalyticsId) && !G.isNotNullable(googleTagManagerId) && (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      )}
    </>
  );
}
