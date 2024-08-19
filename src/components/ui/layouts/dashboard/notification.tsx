'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { memoize } from '@/components/tools/memoize';
import { NotificationDrawer } from '@/components/ui/molecules/notification-drawer';
import { routes } from '@/config/navigation/routes';
import { useDBDataExtras, useDBDataExtrasMutation } from '@/data';
import { danglingPromise } from '@/lib/utils/promise';

import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

function _NotificationToggle() {
  const router = useRouter(); // This is declared but not used in the callback
  const { notifications } = useDBDataExtras();
  const { setNotificationRead, setNotificationRemoved } = useDBDataExtrasMutation();

  const onNotificationClick = useCallback(
    (notification: DCS<Notification>, isRemoved?: boolean) => {
      if (isRemoved) {
        return danglingPromise(setNotificationRemoved(notification.id, true));
      }

      danglingPromise(setNotificationRead(notification.id));
    },
    [setNotificationRead, setNotificationRemoved]
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
