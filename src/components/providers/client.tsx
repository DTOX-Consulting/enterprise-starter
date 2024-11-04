'use client';

import { Provider as JotaiProvider } from 'jotai';

import { ThemeProvider, type ThemeProviderProps } from '@/components/providers/theme-provider';
import { RXDBProvider } from '@/lib/db/rxdb/provider';

export function ClientProviders({ children, ...props }: Readonly<ThemeProviderProps>) {
  return (
    <JotaiProvider>
      <RXDBProvider>
        <ThemeProvider {...props}>{children}</ThemeProvider>
      </RXDBProvider>
    </JotaiProvider>
  );
}
