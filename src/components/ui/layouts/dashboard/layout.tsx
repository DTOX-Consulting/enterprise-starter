import { G } from '@mobily/ts-belt';

import { Header } from '@/components/ui/layouts/dashboard/header';
import { Main } from '@/components/ui/layouts/dashboard/main';
import { Sidebar } from '@/components/ui/layouts/dashboard/sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  className?: string;
  sidebarWidth?: number;
  children: React.ReactNode;
  sidebarChildren?: React.ReactNode;
  headerChildren?: React.ReactNode;
}

export default function Layout({
  className,
  children,
  sidebarWidth,
  headerChildren,
  sidebarChildren
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar sidebarWidth={sidebarWidth}>{sidebarChildren}</Sidebar>

      <section
        className={cn(
          '-ml-96 flex max-h-screen w-full grow flex-col transition-all duration-150 ease-in md:ml-0',
          G.isNotNullable(sidebarWidth) && `-ml-${sidebarWidth}`,
          className
        )}
      >
        <Header>{headerChildren}</Header>
        <Main>{children}</Main>
      </section>
    </div>
  );
}
