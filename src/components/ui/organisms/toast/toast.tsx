'use client';

import {
  Provider as RadixToastProvider,
  Viewport as RadixToastViewport,
  Root as RadixToastRoot,
  Action as RadixToastAction,
  Close as RadixToastClose,
  Title as RadixToastTitle,
  Description as RadixToastDescription
} from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ReactElement } from 'react';

import { cn } from '@/lib/utils';

const ToastViewport = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<typeof RadixToastViewport>
>(({ className, ...props }, ref) => (
  <RadixToastViewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-dvh w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-success bg-success text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const Toast = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<typeof RadixToastRoot> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <RadixToastRoot ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
));
Toast.displayName = RadixToastRoot.displayName;

const ToastAction = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixToastAction>
>(({ className, ...props }, ref) => (
  <RadixToastAction
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = RadixToastAction.displayName;

const ToastClose = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof RadixToastClose>>(
  ({ className, ...props }, ref) => (
    <RadixToastClose
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-3 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-4 group-[.destructive]:focus:ring-offset-red-6',
        className
      )}
      toast-close=""
      {...props}
    >
      <X className="size-4" />
    </RadixToastClose>
  )
);
ToastClose.displayName = RadixToastClose.displayName;

const ToastTitle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadixToastTitle>>(
  ({ className, ...props }, ref) => (
    <RadixToastTitle ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
  )
);
ToastTitle.displayName = RadixToastTitle.displayName;

const ToastDescription = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixToastDescription>
>(({ className, ...props }, ref) => (
  <RadixToastDescription ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = RadixToastDescription.displayName;

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  RadixToastProvider as ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastTitle,
  ToastDescription,
  ToastClose
};
