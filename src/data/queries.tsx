'use client';

import { useNavigation } from '@/config/navigation/use-navigation';
import { useAuth } from '@/lib/hooks/use-auth';
import { useAtom } from '@/lib/state/atoms';

export function useDBData() {
  const { userId } = useAuth();
  const { path } = useNavigation();
  const [isReady] = useAtom('dbInitializedAtom');

  return {
    path,
    userId,
    isReady
  };
}
