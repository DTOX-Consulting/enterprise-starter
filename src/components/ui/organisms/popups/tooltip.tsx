'use client';

import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent
} from '@radix-ui/react-tooltip';
import { Drawer } from 'vaul';

import useMediaQuery from '@/lib/hooks/use-media-query';

import type { ReactNode } from 'react';

export default function Tooltip({
  children,
  content,
  fullWidth
}: Readonly<{
  children: ReactNode;
  content: ReactNode | string;
  fullWidth?: boolean;
}>) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root>
        <Drawer.Trigger
          className={`${Boolean(fullWidth) ? 'w-full' : 'inline-flex'} md:hidden`}
          onClick={(err) => {
            err.stopPropagation();
          }}
        >
          {children}
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100/10  backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white">
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>
            <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white align-middle shadow-xl">
              {typeof content === 'string' ? (
                <span className="block text-center text-sm text-gray-700">{content}</span>
              ) : (
                content
              )}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <TooltipProvider delayDuration={100}>
      <TooltipRoot>
        <TooltipTrigger className="hidden md:inline-flex" asChild>
          {children}
        </TooltipTrigger>
        {/*
            We don't use TooltipPrimitive.Portal here because for some reason it
            prevents you from selecting the contents of a tooltip when used inside a modal
        */}
        <TooltipContent
          sideOffset={8}
          side="top"
          className="z-[99] hidden animate-slide-up-fade items-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-md md:block"
        >
          {typeof content === 'string' ? (
            <div className="block max-w-xs px-4 py-2 text-center text-sm text-gray-700">
              {content}
            </div>
          ) : (
            content
          )}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
