'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const doNotShow = ['/chat', '/external/chat'];
export function TermlyConsentBanner() {
  const pathname = usePathname();
  if (doNotShow.includes(pathname)) return null;

  return (
    <Script
      strategy="lazyOnload"
      src="https://app.termly.io/resource-blocker/2ee5f4a1-208f-4ccb-8dcd-eedfdaed862d?autoBlock=on"
    />
  );
}
