import { SettingsHeader } from '@/components/ui/layouts/settings/components/header';
import { SettingsSidebar } from '@/components/ui/layouts/settings/components/sidebar';

const sidebarNavItems = [
  {
    title: 'General',
    href: ''
  }
];

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Readonly<SettingsLayoutProps>) {
  return (
    <div className="space-y-6 p-8 pb-16 md:p-12">
      <SettingsHeader />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
        <SettingsSidebar items={sidebarNavItems} />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
