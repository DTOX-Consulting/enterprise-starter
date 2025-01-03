'use client';

import { Provider as JotaiProvider } from 'jotai';

import { ThemeProvider, type ThemeProviderProps } from '@/components/providers/theme-provider';
import { AnalyticsProvider } from '@/lib/analytics/provider';
import { RXDBProvider } from '@/lib/db/rxdb/provider';
import { PersistQueryClient } from '@/lib/hooks/use-persist-query-client';
import { useHighlightIdentify } from '@/lib/sdks/highlight/client';

export function ClientProviders({ children, ...props }: ThemeProviderProps) {
  useHighlightIdentify();

  return (
    <JotaiProvider>
      <RXDBProvider>
        <ThemeProvider {...props}>
          <PersistQueryClient />
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </ThemeProvider>
      </RXDBProvider>
    </JotaiProvider>
  );
}
