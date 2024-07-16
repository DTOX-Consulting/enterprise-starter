'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/atoms/dropdown-menu';
import { footerNavigation, home, navigation } from '@/config/navigation/routes';
import { useForceState } from '@/lib/hooks/use-force-rerender';

function HomeLink({ width, height }: { width: number; height: number }) {
  return (
    <Link href={home.href} className="items-center p-4 align-middle hover:text-emerald-700">
      <Image src={home.src} alt="logo" width={width} height={height} className="inline-block" />
    </Link>
  );
}

function Links({ WrapperComponent }: { WrapperComponent: any }) {
  return navigation.map((item) => (
    <WrapperComponent key={item.name}>
      <Link
        href={item.href}
        className="inline-block items-center p-4 align-middle hover:text-emerald-700"
      >
        {item.icon && <item.icon />}
        &nbsp;
        {item.name && <span>{item.name}</span>}
      </Link>
    </WrapperComponent>
  ));
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useForceState(false);

  return (
    <nav className="flex grow items-center">
      <div className="hidden items-center space-x-2 md:flex">
        <HomeLink width={48} height={48} />
        <Links WrapperComponent={'div'} />
      </div>

      <DropdownMenu modal open={mobileMenuOpen}>
        <div className="flex grow items-center md:hidden">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <span>☰</span>
            </button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent
          className="ml-4"
          hideWhenDetached
          onInteractOutside={() => setMobileMenuOpen(false)}
        >
          <button
            type="button"
            className="ml-4 mt-4 inline-flex items-center justify-center rounded-lg text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close main menu</span>
            <span>X</span>
          </button>

          <Links WrapperComponent={DropdownMenuItem} />
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center space-x-2 md:hidden">
        <HomeLink width={48} height={48} />
      </div>

      <div className="flex grow items-center justify-end gap-x-6" />
    </nav>
  );
}

export const FooterNavigation = () => {
  return (
    <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
      {footerNavigation.map((item) => (
        <div key={item.name} className="pb-6">
          <Link
            href={item.href}
            className="text-sm leading-6 text-gray-500 hover:text-gray-900 dark:text-neutral-400"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};
