'use client';

import { Root } from '@radix-ui/react-separator';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const Separator = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = Root.displayName;

export { Separator };
