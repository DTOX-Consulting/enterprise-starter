'use client';

import { HighlightInit, ErrorBoundary } from '@highlight-run/next/client';

import { config } from '@/lib/sdks/highlight/config';
import { CustomHighlightStart } from '@/lib/sdks/highlight/custom-start';

import type { PropsWithChildren } from 'react';

export const HighlightProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <HighlightInit
        manualStart
        tracingOrigins
        projectId={config.projectId}
        serviceName={config.serviceName}
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: []
        }}
      />
      <CustomHighlightStart />
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
};
