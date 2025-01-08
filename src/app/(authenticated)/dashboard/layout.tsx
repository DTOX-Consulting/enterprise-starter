import DashboardLayout from '@/components/ui/layouts/dashboard/layout';

export const runtime = 'edge';

type LayoutProps = {
  children: React.ReactNode;
};

const headerProps = () => ({
  showUser: false,
  showShare: true,
  showThemeToggle: false,
  showNotifications: true,
  showSwitcherNavigation: true
});

export default function Layout({ children }: LayoutProps) {
  return <DashboardLayout headerProps={headerProps()}>{children}</DashboardLayout>;
}
