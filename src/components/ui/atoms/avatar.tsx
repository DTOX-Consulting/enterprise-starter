'use client';

import { Root, Image, Fallback } from '@radix-ui/react-avatar';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const Avatar = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Root>>((props, ref) => (
  <Root
    ref={ref}
    className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', props.className)}
    {...props}
  />
));
Avatar.displayName = Root.displayName;

const AvatarImage = forwardRef<HTMLImageElement, ComponentPropsWithoutRef<typeof Image>>(
  ({ className, ...props }, ref) => (
    <Image ref={ref} className={cn('aspect-square size-full', className)} {...props} />
  )
);
AvatarImage.displayName = Image.displayName;

const AvatarFallback = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Fallback>>(
  ({ className, ...props }, ref) => (
    <Fallback
      ref={ref}
      className={cn('flex size-full items-center justify-center rounded-full bg-muted', className)}
      {...props}
    />
  )
);
AvatarFallback.displayName = Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
