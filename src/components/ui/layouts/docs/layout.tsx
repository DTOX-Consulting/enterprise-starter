import { ContainerAnimated } from '@/components/ui/atoms/container';
import { Main } from '@/components/ui/layouts/dashboard/main';
import { Sidebar } from '@/components/ui/layouts/docs/sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ContainerAnimated className="mt-8 flex size-full gap-8">
      <Sidebar />

      <section
        className={cn(
          '-ml-96 flex max-h-dvh w-full grow flex-col transition-all duration-150 ease-in md:ml-0'
        )}
      >
        <Main>{children}</Main>
      </section>
    </ContainerAnimated>
  );
}
