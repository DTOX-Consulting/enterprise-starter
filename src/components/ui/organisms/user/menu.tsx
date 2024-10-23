import { FlaskConical, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem
} from '@/components/ui/atoms/dropdown-menu';
import { closeSideBar } from '@/components/ui/layouts/dashboard/utils';
import { ThemeToggleSubMenu } from '@/components/ui/molecules/theme-toggle';
import { UserImage, UserImageWithDetails } from '@/components/ui/organisms/user/image';
import { routes } from '@/config/navigation/routes';
import { useAtom } from '@/lib/state/atoms';
import { cn } from '@/lib/utils';

import type { SessionUser } from '@/lib/sdks/kinde/api/session';

export const UserMenu = ({ user, noMinimize }: { user?: SessionUser; noMinimize?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [isMinimized] = useAtom('sidebarMinimizedAtom');

  const UserComponent = Boolean(isMinimized) && !Boolean(noMinimize) ? UserImage : UserImageWithDetails;

  const handleClick = useCallback(() => {
    closeSideBar();
    setOpen(false);
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn('flex focus-visible:outline-none', {
          'justify-center': Boolean(isMinimized) && !Boolean(noMinimize)
        })}
      >
        <UserComponent user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="space-y-1">
          <p>{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup onClick={handleClick}>
          <DropdownMenuItem>
            <Link href={routes.settings} className="flex w-full items-center">
              <User className="mr-2 size-4" />
              <span>Account Preferences</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={routes.comingSoon} className="flex w-full items-center">
              <FlaskConical className="mr-2 size-4" />
              <span>Feature Previews</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup onClick={handleClick}>
          <ThemeToggleSubMenu />
        </DropdownMenuGroup>

        <DropdownMenuGroup onClick={handleClick}>
          <DropdownMenuItem>
            <Link href={routes.logout} className="flex w-full items-center">
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
