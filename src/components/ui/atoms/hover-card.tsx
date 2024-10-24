'use client';

import {
  Root as HoverCardRoot,
  Trigger as HoverCardTrigger,
  Portal as HoverCardPortal,
  Content as RadixHoverCardContent
} from '@radix-ui/react-hover-card';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const HoverCardContent = forwardRef<
  ElementRef<typeof RadixHoverCardContent>,
  ComponentPropsWithoutRef<typeof RadixHoverCardContent>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPortal>
    <RadixHoverCardContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </HoverCardPortal>
));
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCardRoot as HoverCard, HoverCardTrigger, HoverCardContent };
