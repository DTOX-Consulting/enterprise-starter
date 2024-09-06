import { G } from '@mobily/ts-belt';

import { Button } from '@/components/ui/atoms/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter
} from '@/components/ui/atoms/dialog';
import { Separator } from '@/components/ui/atoms/separator';
import { cn } from '@/lib/utils';
import { noopSync } from '@/lib/utils/function';

import type { ButtonVariants } from '@/components/ui/atoms/button';
import type { PropsWithChildren, ReactNode, MouseEventHandler, ButtonHTMLAttributes } from 'react';

const variants = {
  small: 'flex flex-col max-w-screen h-screen w-screen overflow-auto sm:max-w-[425px] sm:h-auto',
  large: 'flex flex-col max-w-screen h-screen w-screen overflow-auto lg:size-[98%] xl:size-[95%]'
};

type ModalProps = {
  title: string;
  description?: ReactNode;
  variant?: keyof typeof variants;

  /* Dialog */
  dialogProps?: React.ComponentProps<typeof Dialog>;
  dialogContentProps?: React.ComponentProps<typeof DialogContent>;

  /* Actions */
  showClose?: boolean;
  showConfirm?: boolean;
  showActions?: boolean;

  /* Trigger */
  triggerContent?: ReactNode;

  /* Trigger Button */
  triggerButtonDisabled?: boolean;
  triggerButtonContent?: ReactNode;
  triggerButtonVariant?: ButtonVariants;
  triggerButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  triggerButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;

  /* Confirm Button */
  confirmButtonDisabled?: boolean;
  confirmButtonContent?: ReactNode;
  confirmButtonVariant?: ButtonVariants;
  confirmButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  confirmButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;

  /* Close Button */
  closeButtonDisabled?: boolean;
  closeButtonContent?: ReactNode;
  closeButtonVariant?: ButtonVariants;
  closeButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  closeButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
} & PropsWithChildren;

export function Modal({
  title,
  children,
  description,
  dialogProps = {},
  dialogContentProps = {},
  variant = 'small',
  showClose = true,
  showConfirm = true,
  showActions = false,
  triggerContent,
  triggerButtonProps = {},
  triggerButtonContent = 'Open',
  triggerButtonOnClick = noopSync,
  triggerButtonVariant = 'default',
  triggerButtonDisabled = false,
  closeButtonProps = {},
  closeButtonContent = 'Cancel',
  closeButtonOnClick = noopSync,
  closeButtonVariant = 'outline',
  closeButtonDisabled = false,
  confirmButtonProps = {},
  confirmButtonContent = 'Confirm',
  confirmButtonOnClick = noopSync,
  confirmButtonVariant = 'pulse',
  confirmButtonDisabled = false
}: ModalProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <span className="group relative block">
          <Button
            className="group relative flex size-full"
            {...triggerButtonProps}
            variant={triggerButtonVariant}
            onClick={triggerButtonOnClick}
            disabled={triggerButtonDisabled}
          >
            {triggerButtonContent}
          </Button>
          {triggerContent}
        </span>
      </DialogTrigger>
      <DialogContent
        {...dialogContentProps}
        className={cn({
          [variants.small]: variant === 'small',
          [variants.large]: variant === 'large'
        })}
      >
        {title && (
          <DialogHeader>
            <DialogTitle className="mb-2 w-full">{title}</DialogTitle>
            <Separator />
          </DialogHeader>
        )}
        {G.isNotNullable(description) && (
          <DialogDescription className="space-y-2">{description}</DialogDescription>
        )}

        {G.isNotNullable(children) && children}

        {showActions && (
          <DialogFooter
            className={cn('mt-4 w-full space-y-2 self-end sm:w-fit sm:space-x-2 sm:space-y-0', {
              'mb-4': variant === 'large'
            })}
          >
            {showClose && (
              <DialogClose asChild>
                <Button
                  className="w-full whitespace-nowrap"
                  {...closeButtonProps}
                  variant={closeButtonVariant}
                  onClick={closeButtonOnClick}
                  disabled={closeButtonDisabled}
                >
                  {closeButtonContent}
                </Button>
              </DialogClose>
            )}
            {showConfirm && (
              <Button
                className="w-full whitespace-nowrap"
                {...confirmButtonProps}
                variant={confirmButtonVariant}
                onClick={confirmButtonOnClick}
                disabled={confirmButtonDisabled}
              >
                {confirmButtonContent}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
