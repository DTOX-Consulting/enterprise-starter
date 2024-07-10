import { SidebarMobile, SidebarDesktop } from '@/components/ui/layouts/dashboard/sidebar-content';
import { getUserSession } from '@/lib/sdks/kinde/api/session';

import type { PropsWithChildren } from 'react';

export async function Sidebar({
  children,
  sidebarWidth
}: PropsWithChildren & { sidebarWidth?: number }) {
  const { user } = await getUserSession();

  return (
    <>
      <SidebarMobile user={user}>{children}</SidebarMobile>
      <SidebarDesktop user={user} sidebarWidth={sidebarWidth}>
        {children}
      </SidebarDesktop>
    </>
  );
}
