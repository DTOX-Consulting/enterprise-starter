import { Footer } from '@/components/ui/organisms/footer';
import { Header } from '@/components/ui/organisms/header';
import { Main } from '@/components/ui/organisms/main';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
