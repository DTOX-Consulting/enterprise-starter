import '@/styles/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

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
import { WebVitals } from '@/components/tools/web-vitals';
import ScrollToTop from '@/components/ui/organisms/navigation/scroll-to-top';
import { cn } from '@/lib/utils';

export const viewport: Viewport = staticViewport;
export const metadata: Metadata = staticMetaData;

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Toaster />
        <WebVitals />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">{children}</div>
          <TailwindIndicator />
        </Providers>
        <Analytics />
        <ScrollToTop />
      </body>
      <GoogleAnalytics gaId="" />
    </html>
  );
}
