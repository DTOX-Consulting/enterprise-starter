'use client';

import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { RXDBProvider } from '@/lib/db/rxdb/provider';

import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ClientProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <JotaiProvider>
      <RXDBProvider>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </RXDBProvider>
    </JotaiProvider>
  );
}
