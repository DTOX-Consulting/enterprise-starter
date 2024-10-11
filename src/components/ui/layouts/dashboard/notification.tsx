'use client';

import { memoize } from '@/components/tools/memoize';
import { NotificationDrawer } from '@/components/ui/molecules/notification-drawer';
import { routes } from '@/config/navigation/routes';

import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

function _NotificationToggle() {
  const notifications: DCS<Notification>[] = [];

  const onNotificationClick = () => {
    // Implement
  };

  return (
    <NotificationDrawer
      notifications={notifications}
      seeAllRoute={routes.comingSoon}
      onNotificationClick={onNotificationClick}
    />
  );
}

export const NotificationToggle = memoize(_NotificationToggle);
