'use client';

import {
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
  Portal as PopoverPortal,
  Content as PopoverContent
} from '@radix-ui/react-popover';
import { Drawer } from 'vaul';

import useMediaQuery from '@/lib/hooks/use-media-query';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

export default function Popover({
  content,
  children,
  openPopover,
  setOpenPopover,
  align = 'center'
}: Readonly<{
  children: ReactNode;
  mobileOnly?: boolean;
  openPopover: boolean;
  content: ReactNode | string;
  align?: 'center' | 'start' | 'end';
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}>) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
        <div className="sm:hidden">{children}</div>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100/10  backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white">
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>
            <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white pb-8 align-middle shadow-xl">
              {content}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <PopoverRoot open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger className="hidden sm:inline-flex" asChild>
        {children}
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          sideOffset={8}
          align={align}
          className="z-50 hidden animate-slide-up-fade items-center rounded-md border border-gray-200 bg-white drop-shadow-lg sm:block"
        >
          {content}
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
