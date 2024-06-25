'use client';

import { X, Bell, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Badge } from '@/components/ui/atoms/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/atoms/popover';
import { cn } from '@/lib/utils';
import { formatCreatedAt } from '@/lib/utils/date';

type Notification = {
  id: string;
  image?: string;
  icon?: LucideIcon;
  content: {
    actor?: string;
    action?: string;
    actorImage?: string;
  };
  createdAt: string;
  lastUpdated: string;
  read?: boolean;
  readAt?: string;
  deleted?: boolean;
  deletedAt?: string;
};

const NotificationBadge = ({ count }: { count: number }) => {
  return (
    <Badge className="absolute -top-1 right-[0.1rem] m-0 flex size-3 items-center justify-center p-0 text-center text-[0.5rem]">
      <span>{count}</span>
    </Badge>
  );
};

const NotificationIcon = ({ Icon }: { Icon: LucideIcon }) => {
  return <Icon className=" size-7" />;
};

export const NotificationTrigger = ({
  count,
  icon = Bell
}: { count: number; icon?: LucideIcon }) => {
  return (
    <div className="relative top-1 flex items-center">
      <NotificationIcon Icon={icon} />
      <NotificationBadge count={count} />
    </div>
  );
};

const noop = () => {};

export const NotificationContent = ({
  onClick,
  seeAllRoute,
  notifications
}: {
  seeAllRoute: string;
  notifications: Notification[];
  onClick: (notification: Notification, isDelete?: boolean) => void;
}) => {
  return (
    <div className="z-20 w-full overflow-hidden rounded-md shadow-lg">
      <div className="py-2">
        {notifications.slice(0, 10).map((notification) => (
          <div
            key={notification.id}
            onKeyDown={noop}
            onClick={() => onClick(notification)}
            className="group relative -mx-2 flex flex-col border-b px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-500"
          >
            <X
              onClick={(e) => {
                e.stopPropagation();
                onClick(notification, true);
              }}
              className={cn(
                'invisible absolute right-3 top-2 size-4 cursor-pointer text-red-500 hover:text-red-300 group-hover:visible',
                {
                  visible: isMobile
                }
              )}
            />
            <div className="flex items-center">
              {(notification.image ?? notification.content.actorImage) && (
                <Image
                  src={notification.image ?? notification.content.actorImage ?? ''}
                  className="mx-1 size-8 rounded-full object-cover"
                  alt="avatar"
                  height={32}
                  width={32}
                />
              )}
              <div className="flex flex-col">
                <p className="mx-2 text-sm">
                  {notification.content.actor && (
                    <span className="font-bold">{notification.content.actor}&nbsp;</span>
                  )}
                  <span>{notification.content.action}</span>
                </p>
              </div>
            </div>
            <p className="mx-2 mt-2 text-right text-xs">
              {formatCreatedAt(notification.createdAt)}
            </p>
          </div>
        ))}
      </div>
      <Link href={seeAllRoute} className="block bg-gray-800 py-2 text-center font-bold text-white">
        See all notifications
      </Link>
    </div>
  );
};

export const NotificationDrawer = ({
  icon = Bell,
  seeAllRoute = '',
  notifications = test,
  onNotificationClick
}: {
  icon?: LucideIcon;
  seeAllRoute?: string;
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification, isDelete?: boolean) => void;
}) => {
  const [state, setState] = useState(notifications);

  const unreadNotifications = state.filter(({ deleted, read }) => !deleted && !read);
  const count = unreadNotifications.length;

  const onClick = useCallback(
    (notification: Notification, isDelete = false) => {
      if (onNotificationClick) {
        onNotificationClick(notification, isDelete);
      }
      if (isDelete) {
        notification.deleted = true;
        notification.deletedAt = new Date().toISOString();
      } else {
        notification.read = true;
        notification.readAt = new Date().toISOString();
      }

      setState([...state]);
    },
    [onNotificationClick, state]
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

const test: Notification[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    content: {
      actor: 'Sara Salah',
      action: 'replied on the Upload Image article.',
      actorImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
    },
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    content: {
      actor: 'Slick Net',
      action: 'started following you.',
      actorImage:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    content: {
      actor: 'Jane Doe',
      action: 'liked your reply on Test with TDD article.',
      actorImage:
        'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
    },
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80',
    content: {
      actor: 'Abigail Bennett',
      action: 'started following you.',
      actorImage:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80'
    },
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
];
