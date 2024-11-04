import { Header } from '@/components/ui/layouts/default/header';
import { Main } from '@/components/ui/layouts/default/main';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
