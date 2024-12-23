import '@/styles/globals.css';

import { staticMetaData, staticViewport } from '@/app/metadata';
import {
  fontSFPro,
  fontMono,
  fontSans,
  fontLora,
  fontMont,
  fontParis,
  fontMontAlt
} from '@/assets/fonts';
import { Providers } from '@/components/providers';
import { Analytics } from '@/components/tools/analytics';
import { TailwindIndicator } from '@/components/tools/tailwind-indicator';
import { ScrollToTop } from '@/components/ui/molecules/scroll-to-top';
import { HighlightProvider } from '@/lib/sdks/highlight/provider';
import { MeticulousScript } from '@/lib/sdks/meticulous/script';
import { TermlyConsentBanner } from '@/lib/sdks/termly/consent-banner';
import { cn } from '@/lib/utils';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const viewport: Viewport = staticViewport;
export const metadata: Metadata = staticMetaData;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <HighlightProvider>
      <html lang="en" className="h-full scroll-smooth overflow-x-hidden" suppressHydrationWarning>
        <head>
          <MeticulousScript />
          <TermlyConsentBanner />
        </head>

        <body
          className={cn(
            'flex min-h-dvh flex-col bg-background',
            'font-sans antialiased',
            fontMontAlt.variable,
            fontSFPro.variable,
            fontParis.variable,
            fontSans.variable,
            fontMono.variable,
            fontMont.variable,
            fontLora.variable
          )}
        >
          <Providers attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-dvh flex-col">{children}</div>
          </Providers>
          <Analytics />
          <ScrollToTop />
          <TailwindIndicator />
        </body>
      </html>
    </HighlightProvider>
  );
}
