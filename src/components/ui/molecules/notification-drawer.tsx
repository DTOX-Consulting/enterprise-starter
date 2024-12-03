'use client';

import { G } from '@mobily/ts-belt';
import { X, Bell, type LucideIcon, icons } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';

import { Badge } from '@/components/ui/atoms/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/atoms/popover';
import { cn } from '@/lib/utils';
import { formatCreatedAt } from '@/lib/utils/date';

import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

export type Icons = {
  Sparkles: LucideIcon;
};

const NotificationBadge = ({ count }: { count: number }) => (
  <Badge className="absolute -top-1 right-[0.1rem] m-0 flex size-3 items-center justify-center p-0 text-center text-[0.5rem]">
    <span>{count}</span>
  </Badge>
);

const NotificationIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <Icon className="size-7 text-gray-4 hover:text-gray-5" />
);

export const NotificationTrigger = ({
  count,
  icon = Bell
}: { count: number; icon?: LucideIcon }) => (
  <div className="relative top-1 flex items-center">
    <NotificationIcon Icon={icon} />
    <NotificationBadge count={count} />
  </div>
);

export const NotificationItemIcon = ({
  icon,
  className
}: { icon: keyof Icons; className: string }) => {
  const Icon = icons[icon];
  return <Icon className={className} />;
};

export const NotificationContent = ({
  onClick,
  seeAllRoute,
  notifications
}: {
  seeAllRoute: string;
  notifications: DCS<Notification>[];
  onClick: (notification: DCS<Notification>, isRemoved?: boolean) => void;
}) => (
  <div className="z-20 w-full overflow-hidden rounded-md">
    <div className="py-2">
      {notifications.slice(0, 10).map((notification) => (
        <div
          key={notification.id}
          onKeyDown={() => {
            /* do nothing */
          }}
          onClick={() => onClick(notification)}
          className="group relative -mx-2 flex cursor-pointer flex-col border-b px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-5"
        >
          <X
            onClick={(event) => {
              event.stopPropagation();
              onClick(notification, true);
            }}
            className={cn(
              'invisible absolute right-3 top-2 size-4 cursor-pointer text-red-5 hover:text-red-3 group-hover:visible',
              {
                visible: isMobile
              }
            )}
          />
          <div className="flex items-center">
            {notification.icon && (
              <NotificationItemIcon icon={notification.icon} className="mx-1 size-6 text-gray-5" />
            )}
            {(Boolean(notification.image) || Boolean(notification.content.actorImage)) && (
              <Image
                src={notification.image ?? notification.content.actorImage ?? ''}
                className="mx-1 size-8 rounded-full object-cover"
                alt="avatar"
                height={32}
                width={32}
                unoptimized
              />
            )}
            <div className="flex flex-col">
              <p className="mx-2 w-[90%] text-sm">
                {Boolean(notification.content.actor) && (
                  <span className="font-bold">{notification.content.actor}&nbsp;</span>
                )}
                <span className="text-sm">{notification.content.action}</span>
              </p>
            </div>
          </div>
          <p className="mx-2 mt-2 text-right text-xs">{formatCreatedAt(notification.createdAt)}</p>
        </div>
      ))}

      {notifications.length === 0 && (
        <p className="text-center font-mont text-gray-6 dark:text-gray-4">No notifications</p>
      )}
    </div>
    {notifications.length !== 0 && (
      <Link
        href={seeAllRoute}
        className="block bg-gray-8 py-2 text-center font-bold text-white shadow-lg"
      >
        See all notifications
      </Link>
    )}
  </div>
);

export const NotificationDrawer = ({
  icon = Bell,
  seeAllRoute = '',
  notifications = [],
  onNotificationClick
}: {
  icon?: LucideIcon;
  seeAllRoute?: string;
  notifications?: DCS<Notification>[];
  onNotificationClick?: (notification: DCS<Notification>, isRemoved?: boolean) => void;
}) => {
  const unreadNotifications = notifications
    .filter(({ removedAt, readAt }) => G.isNullable(removedAt) && G.isNullable(readAt))
    .reverse();

  const count = unreadNotifications.length;

  const onClick = useCallback(
    (notification: DCS<Notification>, isRemoved = false) => {
      const newNotification = {
        ...notification,
        [isRemoved ? 'removedAt' : 'readAt']: new Date().toDateString()
      };

      onNotificationClick?.(newNotification, isRemoved);
    },
    [onNotificationClick]
  );

  return (
    <Popover>
      <PopoverTrigger>
        <NotificationTrigger count={count} icon={icon} />
      </PopoverTrigger>
      <PopoverContent>
        <NotificationContent
          onClick={onClick}
          seeAllRoute={seeAllRoute}
          notifications={unreadNotifications}
        />
      </PopoverContent>
    </Popover>
  );
};
