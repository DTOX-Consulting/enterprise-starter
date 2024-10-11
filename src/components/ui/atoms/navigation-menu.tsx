import {
  Root as NavigationMenuRoot,
  List as NavigationMenuListPrimitive,
  Item as NavigationMenuItemPrimitive,
  Trigger as NavigationMenuTriggerPrimitive,
  Content as NavigationMenuContentPrimitive,
  Link as NavigationMenuLinkPrimitive,
  Viewport as NavigationMenuViewportPrimitive,
  Indicator as NavigationMenuIndicatorPrimitive
} from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuRoot>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuRoot>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuRoot
    ref={ref}
    className={cn('relative z-10 flex grow items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuRoot>
));
NavigationMenu.displayName = NavigationMenuRoot.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuListPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuListPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuListPrimitive
    ref={ref}
    className={cn('group flex grow list-none items-center justify-center space-x-1', className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuListPrimitive.displayName;

const NavigationMenuItem = NavigationMenuItemPrimitive;

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuTriggerPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuTriggerPrimitive>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuTriggerPrimitive
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="relative top-px ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTriggerPrimitive>
));
NavigationMenuTrigger.displayName = NavigationMenuTriggerPrimitive.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuContentPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuContentPrimitive
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuContentPrimitive.displayName;

const NavigationMenuLink = NavigationMenuLinkPrimitive;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuViewportPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuViewportPrimitive>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuViewportPrimitive
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuViewportPrimitive.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuIndicatorPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuIndicatorPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuIndicatorPrimitive
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicatorPrimitive>
));
NavigationMenuIndicator.displayName = NavigationMenuIndicatorPrimitive.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport
};
