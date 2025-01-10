import { Footer } from '@/components/ui/layouts/default/footer';
import { Header } from '@/components/ui/layouts/default/header';
import { Main } from '@/components/ui/layouts/default/main';
import Background from '@/components/ui/layouts/landing-page/components/background';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <>
      <Background />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
