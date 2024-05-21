import { G } from '@mobily/ts-belt';

import { Header } from '@/components/ui/layouts/dashboard/header';
import { Main } from '@/components/ui/layouts/dashboard/main';
import { Sidebar } from '@/components/ui/layouts/docs/sidebar';
import { cn } from '@/lib/utils';
import { ContainerAnimated } from '@/components/ui/atoms/container';

interface LayoutProps {
  className?: string;
  sidebarWidth?: number;
  children: React.ReactNode;
}

export default function Layout({ className, sidebarWidth, children }: LayoutProps) {
  return (
    <ContainerAnimated className="size-full flex mt-8 gap-8">
      <Sidebar />

      <section
        className={cn(
          '-ml-96 flex max-h-screen w-full grow flex-col transition-all duration-150 ease-in md:ml-0',
          G.isNotNullable(sidebarWidth) && `-ml-${sidebarWidth}`,
          className
        )}
      >
        <Main>{children}</Main>
      </section>
    </ContainerAnimated>
  );
}
