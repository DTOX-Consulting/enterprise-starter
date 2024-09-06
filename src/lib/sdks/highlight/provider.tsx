'use client';

import { HighlightInit, ErrorBoundary } from '@highlight-run/next/client';
import HyperDX from '@hyperdx/browser';

import { CustomHighlightStart } from '@/lib/sdks/highlight/client';
import { config } from '@/lib/sdks/highlight/config';

import type { PropsWithChildren } from 'react';

HyperDX.attachToReactErrorBoundary(ErrorBoundary);

export const HighlightProvider = ({ children }: PropsWithChildren) => (
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
