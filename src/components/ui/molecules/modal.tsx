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
import type React from 'react';
import type { PropsWithChildren, ReactNode, MouseEventHandler, ButtonHTMLAttributes } from 'react';

const variants = {
  small: 'flex flex-col max-w-screen h-screen w-screen overflow-auto sm:max-w-[425px] sm:h-auto',
  large: 'flex flex-col max-w-screen h-screen w-screen overflow-auto lg:size-[98%] xl:size-[95%]'
};

type ButtonConfig = {
  props: ButtonHTMLAttributes<HTMLButtonElement>;
  content: ReactNode;
  variant: ButtonVariants;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

type ModalConfig = {
  dialog?: React.ComponentProps<typeof Dialog>;
  dialogContent?: React.ComponentProps<typeof DialogContent>;
  trigger?: Partial<ButtonConfig>;
  close?: Partial<ButtonConfig>;
  confirm?: Partial<ButtonConfig>;
};

type SimpleModalProps = {
  title: string;
  children?: ReactNode;
  description?: ReactNode;
  variant?: keyof typeof variants;
  showClose: boolean;
  showConfirm: boolean;
  showActions: boolean;
  triggerContent?: ReactNode;
  config?: ModalConfig;
  closeButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  closeButtonContent?: ReactNode;
  closeButtonVariant?: ButtonVariants;
  closeButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  closeButtonDisabled?: boolean;
  confirmButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  confirmButtonContent?: ReactNode;
  confirmButtonVariant?: ButtonVariants;
  confirmButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  confirmButtonDisabled?: boolean;
  dialogContentProps?: React.ComponentProps<typeof DialogContent>;
} & PropsWithChildren;

const ModalTriggerButton = ({
  props: triggerButtonProps,
  content: triggerButtonContent,
  variant: triggerButtonVariant,
  onClick: triggerButtonOnClick,
  disabled: triggerButtonDisabled,
  triggerContent
}: ButtonConfig & { triggerContent?: ReactNode }) => (
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
);

const ModalHeader = ({ title }: { title: string }) => (
  <DialogHeader>
    <DialogTitle className="mb-2 w-full">{title}</DialogTitle>
    <Separator />
  </DialogHeader>
);

const ModalDescription = ({ description }: { description: ReactNode }) =>
  G.isNotNullable(description) ? (
    <DialogDescription className="space-y-2">{description}</DialogDescription>
  ) : null;

const ModalFooterButton = ({
  show,
  buttonProps,
  buttonContent,
  buttonVariant,
  buttonOnClick,
  buttonDisabled,
  asChild = false
}: {
  show: boolean;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonContent: ReactNode;
  buttonVariant: ButtonVariants;
  buttonOnClick: MouseEventHandler<HTMLButtonElement>;
  buttonDisabled: boolean;
  asChild?: boolean;
}) => {
  if (!show) return null;
  const ButtonComponent = asChild ? DialogClose : Button;
  return (
    <ButtonComponent
      className="w-full whitespace-nowrap"
      {...buttonProps}
      variant={buttonVariant}
      onClick={buttonOnClick}
      disabled={buttonDisabled}
    >
      {buttonContent}
    </ButtonComponent>
  );
};

type ModalFooterProps = {
  showClose: boolean;
  showConfirm: boolean;
  closeButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  closeButtonContent?: ReactNode;
  closeButtonVariant?: ButtonVariants;
  closeButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  closeButtonDisabled?: boolean;
  confirmButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  confirmButtonContent?: ReactNode;
  confirmButtonVariant?: ButtonVariants;
  confirmButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  confirmButtonDisabled?: boolean;
  variant?: keyof typeof variants;
};

const ModalFooter = ({
  variant,
  showClose,
  showConfirm,
  closeButtonProps,
  closeButtonContent,
  closeButtonVariant,
  closeButtonOnClick,
  closeButtonDisabled,
  confirmButtonProps,
  confirmButtonContent,
  confirmButtonVariant,
  confirmButtonOnClick,
  confirmButtonDisabled
}: ModalFooterProps) =>
  showClose || showConfirm ? (
    <DialogFooter
      className={cn('mt-4 w-full space-y-2 self-end sm:w-fit sm:space-x-2 sm:space-y-0', {
        'mb-4': variant === 'large'
      })}
    >
      <ModalFooterButton
        show={showClose}
        buttonProps={closeButtonProps as ButtonHTMLAttributes<HTMLButtonElement>}
        buttonContent={closeButtonContent}
        buttonVariant={closeButtonVariant as ButtonVariants}
        buttonOnClick={closeButtonOnClick as MouseEventHandler<HTMLButtonElement>}
        buttonDisabled={closeButtonDisabled as boolean}
        asChild
      />
      <ModalFooterButton
        show={showConfirm}
        buttonProps={confirmButtonProps as ButtonHTMLAttributes<HTMLButtonElement>}
        buttonContent={confirmButtonContent}
        buttonVariant={confirmButtonVariant as ButtonVariants}
        buttonOnClick={confirmButtonOnClick as MouseEventHandler<HTMLButtonElement>}
        buttonDisabled={confirmButtonDisabled as boolean}
      />
    </DialogFooter>
  ) : null;

const ModalContent = ({
  title,
  description,
  children,
  variant,
  dialogContentProps,
  showActions,
  showClose,
  showConfirm,
  closeButtonProps,
  closeButtonContent,
  closeButtonVariant,
  closeButtonOnClick,
  closeButtonDisabled,
  confirmButtonProps,
  confirmButtonContent,
  confirmButtonVariant,
  confirmButtonOnClick,
  confirmButtonDisabled
}: SimpleModalProps) => (
  <DialogContent
    {...dialogContentProps}
    className={cn(
      {
        [variants.small]: variant === 'small',
        [variants.large]: variant === 'large'
      },
      dialogContentProps?.className
    )}
  >
    {title && <ModalHeader title={title} />}
    <ModalDescription description={description} />
    {G.isNotNullable(children) && children}
    {showActions && (
      <ModalFooter
        variant={variant}
        showClose={showClose}
        showConfirm={showConfirm}
        closeButtonProps={closeButtonProps}
        closeButtonContent={closeButtonContent}
        closeButtonVariant={closeButtonVariant}
        closeButtonOnClick={closeButtonOnClick}
        closeButtonDisabled={closeButtonDisabled}
        confirmButtonProps={confirmButtonProps}
        confirmButtonContent={confirmButtonContent}
        confirmButtonVariant={confirmButtonVariant}
        confirmButtonOnClick={confirmButtonOnClick}
        confirmButtonDisabled={confirmButtonDisabled}
      />
    )}
  </DialogContent>
);

const getDefaultConfigs = (): Record<
  'defaultTrigger' | 'defaultClose' | 'defaultConfirm',
  ButtonConfig
> => {
  const defaultTrigger: ButtonConfig = {
    content: 'Open',
    variant: 'default',
    onClick: noopSync,
    disabled: false,
    props: {}
  };

  const defaultClose: ButtonConfig = {
    content: 'Cancel',
    variant: 'outline',
    onClick: noopSync,
    disabled: false,
    props: {}
  };

  const defaultConfirm: ButtonConfig = {
    content: 'Confirm',
    variant: 'default',
    onClick: noopSync,
    disabled: false,
    props: {}
  };

  return { defaultTrigger, defaultClose, defaultConfirm };
};

const getMergedConfigs = (config: ModalConfig = {}) => {
  const {
    dialog: dialogProps = {},
    dialogContent: dialogContentProps = {},
    trigger = {},
    close = {},
    confirm = {}
  } = config;

  const { defaultTrigger, defaultClose, defaultConfirm } = getDefaultConfigs();

  return {
    dialogProps,
    dialogContentProps,
    triggerConfig: { ...defaultTrigger, ...trigger } as ButtonConfig,
    closeConfig: { ...defaultClose, ...close } as ButtonConfig,
    confirmConfig: { ...defaultConfirm, ...confirm } as ButtonConfig
  };
};

export function Modal({
  title,
  children,
  description,
  variant = 'small',
  showClose = true,
  showConfirm = true,
  showActions = false,
  triggerContent,
  config = {}
}: SimpleModalProps) {
  const { dialogProps, dialogContentProps, triggerConfig, closeConfig, confirmConfig } =
    getMergedConfigs(config);

  return (
    <Dialog {...dialogProps}>
      <ModalTriggerButton
        props={triggerConfig.props}
        content={triggerConfig.content}
        variant={triggerConfig.variant}
        onClick={triggerConfig.onClick}
        disabled={triggerConfig.disabled}
        triggerContent={triggerContent}
      />
      <ModalContent
        title={title}
        description={description}
        variant={variant}
        dialogContentProps={dialogContentProps}
        showActions={Boolean(showActions)}
        showClose={Boolean(showClose)}
        showConfirm={Boolean(showConfirm)}
        closeButtonProps={closeConfig.props}
        closeButtonContent={closeConfig.content}
        closeButtonVariant={closeConfig.variant}
        closeButtonOnClick={closeConfig.onClick}
        closeButtonDisabled={closeConfig.disabled}
        confirmButtonProps={confirmConfig.props}
        confirmButtonContent={confirmConfig.content}
        confirmButtonVariant={confirmConfig.variant}
        confirmButtonOnClick={confirmConfig.onClick}
        confirmButtonDisabled={confirmConfig.disabled}
      >
        {children}
      </ModalContent>
    </Dialog>
  );
}
