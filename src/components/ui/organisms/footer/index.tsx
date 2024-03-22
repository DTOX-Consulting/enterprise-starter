import Image from 'next/image';

import logo from '@/assets/images/logo.png';
import { FooterNavigation } from '@/components/ui/organisms/navigation';
import { Copyright, SocialMedia } from '@/components/ui/organisms/social/social-media';

import type { PropsWithChildren } from 'react';

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className="flex flex-1 flex-col">
      {children}
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="my-10 flex justify-center">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <FooterNavigation />
        <div className="my-10 flex justify-center">
          <SocialMedia />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};
