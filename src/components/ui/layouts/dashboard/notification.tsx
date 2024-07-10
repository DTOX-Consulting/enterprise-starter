'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { memoize } from '@/components/tools/memoize';
import { NotificationDrawer } from '@/components/ui/molecules/notification-drawer';
import { routes } from '@/config/navigation/routes';
import { useDBData, useDBDataExtras, useDBDataExtrasMutation } from '@/data';
import { useAIUpdates } from '@/data/components/ai-generator';
import { danglingPromise } from '@/lib/utils/promise';

import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

function _NotificationToggle() {
  useAIUpdates();
  const router = useRouter();
  const { notifications } = useDBDataExtras();
  const { setNotificationRead, setNotificationRemoved } = useDBDataExtrasMutation();

  const onNotificationClick = useCallback(
    (notification: DCS<Notification>, isRemoved?: boolean) => {
      if (isRemoved) {
        return danglingPromise(setNotificationRemoved(notification.id, true));
      }

      danglingPromise(setNotificationRead(notification.id));
    },
    [router, setNotificationRead, setNotificationRemoved]
  );

  return (
    <NotificationDrawer
      notifications={notifications}
      seeAllRoute={routes.comingSoon}
      onNotificationClick={onNotificationClick}
    />
  );
}

export const NotificationToggle = memoize(_NotificationToggle);
