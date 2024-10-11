'use client';

import { isPaidTier } from '@/config/permissions/features';
import { useAnalytics } from '@/lib/analytics/provider';
import { useAuth } from '@/lib/hooks/use-auth';

export function useDBDataMutation() {
  const { subscription } = useAuth();
  const analyticsManager = useAnalytics();
  const isPaid = isPaidTier(subscription?.tier);

  return {
    isPaid,
    analyticsManager
  };
}
