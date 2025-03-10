'use client';

import { H } from '@highlight-run/next/client';
import { G } from '@mobily/ts-belt';
import { useEffect } from 'react';

import { useAuth } from '@/lib/hooks/use-auth';
import { isLocalHost } from '@/lib/utils/dom';

import type { SessionUser } from '@/lib/sdks/kinde/api/session';

export function CustomHighlightStart() {
  useEffect(() => {
    if (isLocalHost()) return;

    H.start();
    return () => H.stop();
  });

  return null;
}

export const useHighlightIdentify = () => {
  const { user } = useAuth();
  useEffect(() => (shouldRun(user) ? identify(user) : undefined), [user]);
};

export const identify = (user: SessionUser) =>
  H.identify(user.email, {
    email: user.email,
    name: user.name,
    id: user.id
  });

const shouldRun = (user?: SessionUser): user is SessionUser => {
  const hasUser = G.isNotNullable(user?.email);
  return hasUser && !isLocalHost();
};
