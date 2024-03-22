'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/atoms/dropdown-menu';
import { footerNavigation, home, navigation } from '@/components/ui/organisms/navigation/constants';

function HomeLink({ width, height }: { width: number; height: number }) {
  return (
    <Link href="/" className="items-center p-4 align-middle text-lg hover:text-emerald-700">
      <Image src={home.src} alt="logo" width={width} height={height} className="inline-block" />
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Links({ WrapperComponent }: { WrapperComponent: any }) {
  return navigation.map((item) => (
    <WrapperComponent key={item.name}>
      <Link
        href={`/${item.href}`}
        className="inline-block items-center p-4 align-middle text-lg hover:text-emerald-700"
      >
        {item.icon && <span>{item.icon}</span>}
        &nbsp;
        {item.name && <span>{item.name}</span>}
      </Link>
    </WrapperComponent>
  ));
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex flex-1 items-center">
      <div className="hidden items-center space-x-2 md:flex">
        <HomeLink width={48} height={48} />
        <Links WrapperComponent={'div'} />
      </div>

      <DropdownMenu modal open={mobileMenuOpen}>
        <div className="flex flex-1 items-center md:hidden">
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

      <div className="flex flex-1 items-center justify-end gap-x-6" />
    </nav>
  );
}

export const FooterNavigation = () => {
  return (
    <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
      {footerNavigation.map((item) => (
        <div key={item.name} className="pb-6">
          <Link
            href={`/${item.href}`}
            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};
