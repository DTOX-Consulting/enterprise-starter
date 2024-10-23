import Link from 'next/link';

import { Badge } from '@/components/ui/atoms/badge';
import { routes } from '@/config/navigation/routes';

import type { PropsWithChildren } from 'react';

export function SubscriptionBadge({ children }: Readonly<PropsWithChildren>) {
  return (
    <Link href={routes.pricing} className="flex items-center justify-center">
      <Badge variant="secondary" className="rounded-lg px-2 py-1.5">
        {children}
      </Badge>
    </Link>
  );
}
