import { Badge } from '@/components/ui/atoms/badge';

import type { PropsWithChildren } from 'react';

export function SubscriptionBadge({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="secondary" className="rounded-lg px-2 py-1.5">
        {children}
      </Badge>
    </div>
  );
}
