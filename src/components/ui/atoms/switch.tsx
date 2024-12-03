'use client';

import { Root, Thumb } from '@radix-ui/react-switch';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      className={cn(
        'peer inline-flex h-[16px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className
      )}
      {...props}
      ref={ref}
    >
      <Thumb
        className={cn(
          'pointer-events-none block size-3 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </Root>
  )
);
Switch.displayName = Root.displayName;

export { Switch };
