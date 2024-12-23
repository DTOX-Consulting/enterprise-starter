'use client';

import { G } from '@mobily/ts-belt';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import { config } from '@/lib/sdks/termly/config';

const doNotShow = ['/chat', '/external/chat'];

export function TermlyConsentBanner() {
  const pathname = usePathname();
  if (G.isNullable(config.projectId) || doNotShow.includes(pathname)) return null;

  const baseUrl = 'https://app.termly.io/resource-blocker';
  const url = `${baseUrl}/${config.projectId}?autoBlock=${config.autoBlock ? 'on' : 'off'}`;

  return <Script strategy="lazyOnload" src={url} />;
}
