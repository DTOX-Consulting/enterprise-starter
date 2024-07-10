'use client';

import { G } from '@mobily/ts-belt';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  onViewChange,
  stringifyValue,
  createBusinessEvent
} from '@/app/(authenticated)/businesses/utils/handlers';
import { memoize } from '@/components/tools/memoize';
import { NotificationDrawer } from '@/components/ui/molecules/notification-drawer';
import { ToastAction } from '@/components/ui/organisms/toast/toast';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { createPath } from '@/config/navigation';
import { routes } from '@/config/navigation/routes';
import { useDBData, useDBDataExtras, useDBDataExtrasMutation, useDBDataMutation } from '@/data';
import { useAIUpdates } from '@/data/components/ai-generator';
import { danglingPromise } from '@/lib/utils/promise';

import type { Option } from '@/data/option';
import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

function _NotificationToggle() {
  useAIUpdates();
  const router = useRouter();
  const { getBusiness } = useDBData();
  const { notifications } = useDBDataExtras();
  const { updateBusiness } = useDBDataMutation();
  const { setNotificationRead, setNotificationRemoved } = useDBDataExtrasMutation();

  const onNotificationClick = useCallback(
    (notification: DCS<Notification>, isRemoved?: boolean) => {
      if (isRemoved) {
        return danglingPromise(setNotificationRemoved(notification.id, true));
      }

      const { key, current, updated, businessId } = notification.meta?.suggestion ?? {};
      if (G.isNullable(key) || G.isNullable(businessId) || G.isNullable(updated)) {
        return;
      }

      const { name, organizationId } = getBusiness(businessId) ?? {};
      if (G.isNullable(name)) {
        return;
      }

      let route = 'core';

      if (['tagline', 'description', 'logo'].includes(key)) {
        route = 'branding';
      }

      router.push(
        createPath({
          page: route,
          base: 'businesses',
          orgId: organizationId,
          businessId: businessId
        })
      );

      toast({
        title: 'AI Suggestion',
        viewportClassName: 'md:max-w-[50rem]',
        description: (
          <div className="space-y-4 text-sm">
            <span>
              Change the <b>{key}</b> for <b>{name}</b>?
            </span>
            <div>
              <h4 className="font-semibold">Current</h4>
              <div>{stringifyValue(current)}</div>
            </div>
            <div>
              <h4 className="font-semibold">Updated</h4>
              <div>{stringifyValue(updated)}</div>
            </div>
          </div>
        ),
        action: (
          <ToastAction
            altText="Accept"
            onClick={() => {
              danglingPromise(setNotificationRead(notification.id));
              const event = createBusinessEvent(updated as string | Option[]);
              const changer = onViewChange(key, { id: businessId }, updateBusiness);
              changer(event);
            }}
          >
            Accept
          </ToastAction>
        )
      });
    },
    [router, updateBusiness, getBusiness, setNotificationRead, setNotificationRemoved]
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
