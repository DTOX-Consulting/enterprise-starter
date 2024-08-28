'use client';

import { Provider } from 'rxdb-hooks';

import { useRxDB } from '@/lib/db/rxdb/hooks';

import type { PropsWithChildren } from 'react';

export const RXDBProvider = ({ children }: PropsWithChildren) => {
  const { getDb } = useRxDB();

  // Until DB becomes available, consumer hooks that
  // depend on it will still work, absorbing the delay
  // by setting their state to isFetching:true
  return <Provider db={getDb()}>{children}</Provider>;
};
