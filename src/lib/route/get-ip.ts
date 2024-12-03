import { G } from '@mobily/ts-belt';
import { headers } from 'next/headers';

export function getIp() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const forwardedFor = (headers() as unknown as Headers).get('x-forwarded-for');

  if (G.isNotNullable(forwardedFor)) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return (headers() as unknown as Headers).get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}
