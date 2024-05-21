'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/config/navigation';

const settingsRoutes = [
  { name: 'Account', href: routes.account },
  { name: 'Billing', href: routes.settings },
  { name: 'Workspaces', href: routes.settings },
  { name: 'Notifications', href: routes.settings }
];

export function Header() {
  const path = usePathname();
  const current = settingsRoutes.find((route) => route.href === path);

  return (
    <header className="border-b border-white/5">
      <nav className="flex overflow-x-auto py-4">
        <ul className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
          {settingsRoutes.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={item === current ? 'text-pulse' : ''}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
