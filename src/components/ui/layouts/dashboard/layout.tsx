import { G } from '@mobily/ts-belt';

import { Header, type HeaderProps } from '@/components/ui/layouts/dashboard/header';
import { Main } from '@/components/ui/layouts/dashboard/main';
import { Sidebar } from '@/components/ui/layouts/dashboard/sidebar';
import { cn } from '@/lib/utils';

type LayoutProps = {
  className?: string;
  sidebarWidth?: number;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  sidebarChildren?: React.ReactNode;
  headerProps?: HeaderProps;
}

export default function Layout({
  className,
  children,
  sidebarWidth,
  headerProps,
  headerChildren,
  sidebarChildren
}: LayoutProps) {
  return (
    <div className="flex min-h-dvh flex-row">
      <Sidebar sidebarWidth={sidebarWidth}>{sidebarChildren}</Sidebar>

      <section
        className={cn(
          '-ml-96 flex max-h-dvh w-full grow flex-col transition-all duration-150 ease-in md:ml-0',
          G.isNotNullable(sidebarWidth) && `-ml-${sidebarWidth}`,
          className
        )}
      >
        <Header {...headerProps}>{headerChildren}</Header>
        <Main>{children}</Main>
      </section>
    </div>
  );
}
