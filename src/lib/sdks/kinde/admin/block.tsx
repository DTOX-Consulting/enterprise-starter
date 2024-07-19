'use server';

import { G } from '@mobily/ts-belt';

import ComingSoon from '@/components/ui/layouts/default/coming-soon';
import { getUserSession } from '@/lib/sdks/kinde/api/session';

import type { ReactNode } from 'react';

export async function AdminBlock({
  children,
  noBlock = false
}: { children?: ReactNode; noBlock?: boolean }) {
  const { isAdmin } = noBlock ? { isAdmin: true } : await getUserSession();

  if (isAdmin && G.isNotNullable(children)) return <>{children}</>;
  if (!isAdmin) return <ComingSoon />;

  return null;
}
