import { Header } from '@/components/ui/layouts/default/header';
import { Main } from '@/components/ui/layouts/default/main';
import { authenticationRedirection } from '@/lib/auth/redirect';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Readonly<LayoutProps>) {
  await authenticationRedirection();

  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
