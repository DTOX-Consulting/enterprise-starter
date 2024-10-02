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
import { Toaster } from '@/components/ui/organisms/toast/toaster';
import { cn } from '@/lib/utils';

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = staticViewport;
export const metadata: Metadata = staticMetaData;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background',
          'font-sans antialiased',
          fontSFPro.variable,
          fontMontAlt.variable,
          fontParis.variable,
          fontSans.variable,
          fontMono.variable,
          fontMont.variable,
          fontLora.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">{children}</div>
          <Toaster />
        </Providers>
        <Analytics />
        <ScrollToTop />
        <TailwindIndicator />
      </body>
    </html>
  );
}
