import Image from 'next/image';
import Link from 'next/link';

import defaultUser from '@/assets/images/default-user.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/atoms/avatar';
import { routes } from '@/config/navigation/routes';
import { getUserSession, type SessionUser } from '@/lib/sdks/kinde/api/session';
import { cn } from '@/lib/utils';

import type { AvatarProps } from '@radix-ui/react-avatar';

type UserAvatarProps = {
  avatarProps?: AvatarProps;
  userProps?: UserImageProps;
};

type UserImageProps = {
  width?: number;
  height?: number;
  className?: string;
  user?: SessionUser;
};

export const UserImage = ({ user, width = 40, height = 40, className = '' }: UserImageProps) => {
  return (
    <Image
      unoptimized
      alt="Profile"
      width={width}
      height={height}
      src={user?.image ?? defaultUser}
      className={cn('size-10 rounded-full border bg-gray-200', className)}
    />
  );
};

export const UserDetails = ({ user, className }: UserImageProps) => {
  return (
    <span className="flex flex-col text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-400">
      <span className={cn('w-full truncate font-semibold leading-none ', className)}>
        {user?.name}
      </span>
      <span className={cn('mt-1 w-full truncate text-xs leading-none', className)}> </span>
    </span>
  );
};

export const UserImageWithDetails = (props: UserImageProps) => {
  return (
    <div className="flex cursor-pointer flex-row items-center space-x-2">
      <UserImage {...props} />
      <UserDetails {...props} />
    </div>
  );
};

export const UserImageLink = (props: UserImageProps) => {
  return (
    <Link href={routes.settings}>
      <UserImageWithDetails {...props} />
    </Link>
  );
};

export const UserImageSession = async (props: UserImageProps & { link?: boolean }) => {
  const newProps = { ...props, user: props.user ?? (await getUserSession()).user };
  return props.link ? <UserImageLink {...newProps} /> : <UserImageWithDetails {...newProps} />;
};

export function UserAvatar(props: UserAvatarProps = {}) {
  const { userProps, avatarProps } = props;

  const user = userProps?.user;
  const userName = user?.name ?? 'User';
  const userImage = user?.image ?? undefined;

  return (
    <Avatar {...avatarProps}>
      <AvatarImage alt="Picture" src={userImage} />
      <AvatarFallback>
        <span className="sr-only">{userName}</span>
        <UserImage user={user} />
      </AvatarFallback>
    </Avatar>
  );
}
