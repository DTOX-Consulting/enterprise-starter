type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Readonly<LayoutProps>) {
  return children;
}
