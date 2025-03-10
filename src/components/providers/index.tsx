import { headers } from 'next/headers';

import { ClientProviders } from '@/components/providers/client';
import { Toaster } from '@/components/ui/organisms/toast/toaster';
import { TRPCReactProvider } from '@/trpc/react';

import type { ThemeProviderProps } from '@/components/providers/theme-provider';

export function Providers({ children, ...props }: Readonly<ThemeProviderProps>) {
  return (
    <TRPCReactProvider headers={headers() as unknown as Headers}>
      <ClientProviders {...props}>{children}</ClientProviders>
      <Toaster />
    </TRPCReactProvider>
  );
}
