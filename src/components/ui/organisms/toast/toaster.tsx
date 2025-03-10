'use client';

import { G } from '@mobily/ts-belt';
import { Fragment } from 'react';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/organisms/toast/toast';
import { useToast } from '@/components/ui/organisms/toast/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, viewportClassName, ...props }) => (
        <Fragment key={id}>
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {G.isNotNullable(title) && <ToastTitle>{title}</ToastTitle>}
              {G.isNotNullable(description) && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
          <ToastViewport className={viewportClassName} />
        </Fragment>
      ))}
    </ToastProvider>
  );
}
