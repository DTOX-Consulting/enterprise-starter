import { Container } from '@/components/ui/atoms/container';
import { Header } from '@/components/ui/layouts/settings-old/header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container className="mt-8 flex size-full flex-col">
      <Header />
      {children}
    </Container>
  );
}
