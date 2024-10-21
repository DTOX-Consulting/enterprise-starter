'use client';

import {
  Root as DropdownMenuRoot,
  Trigger as DropdownMenuTrigger,
  Group as DropdownMenuGroup,
  Portal as DropdownMenuPortal,
  Sub as DropdownMenuSub,
  RadioGroup as DropdownMenuRadioGroup,
  SubTrigger as RadixDropdownMenuSubTrigger,
  SubContent as RadixDropdownMenuSubContent,
  Content as RadixDropdownMenuContent,
  Item as RadixDropdownMenuItem,
  CheckboxItem as RadixDropdownMenuCheckboxItem,
  RadioItem as RadixDropdownMenuRadioItem,
  Label as RadixDropdownMenuLabel,
  Separator as RadixDropdownMenuSeparator,
  ItemIndicator as RadixDropdownMenuItemIndicator
} from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof RadixDropdownMenuSubTrigger>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset = false, children, ...props }, ref) => (
  <RadixDropdownMenuSubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset ? 'pl-8' : '',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </RadixDropdownMenuSubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof RadixDropdownMenuSubContent>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubContent>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenuSubContent
    ref={ref}
    className={cn(
      'text-on-popover z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdownMenuContent>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPortal>
    <RadixDropdownMenuContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenuItem>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuItem> & {
    inset?: boolean;
  }
>(({ className, inset = false, ...props }, ref) => (
  <RadixDropdownMenuItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset ? 'pl-8' : '',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof RadixDropdownMenuCheckboxItem>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <RadixDropdownMenuCheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <RadixDropdownMenuItemIndicator>
        <Check className="size-4" />
      </RadixDropdownMenuItemIndicator>
    </span>
    {children}
  </RadixDropdownMenuCheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadixDropdownMenuRadioItem>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuRadioItem>
>(({ className, children, ...props }, ref) => (
  <RadixDropdownMenuRadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <RadixDropdownMenuItemIndicator>
        <Circle className="size-2 fill-current" />
      </RadixDropdownMenuItemIndicator>
    </span>
    {children}
  </RadixDropdownMenuRadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof RadixDropdownMenuLabel>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuLabel> & {
    inset?: boolean;
  }
>(({ className, inset = false, ...props }, ref) => (
  <RadixDropdownMenuLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset ? 'pl-8' : '', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof RadixDropdownMenuSeparator>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSeparator>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenuSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
};
