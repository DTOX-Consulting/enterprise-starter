import { SidebarMobile, SidebarDesktop } from '@/components/ui/layouts/dashboard/sidebar-content';
import { authenticationRedirection } from '@/lib/auth/redirect';

import type { PropsWithChildren } from 'react';

export async function Sidebar({
  children,
  sidebarWidth
}: PropsWithChildren & { sidebarWidth?: number }) {
  const auth = await authenticationRedirection();
  const user = auth?.user;

  return (
    <>
      <SidebarMobile user={user}>{children}</SidebarMobile>
      <SidebarDesktop user={user} sidebarWidth={sidebarWidth}>
        {children}
      </SidebarDesktop>
    </>
  );
}
