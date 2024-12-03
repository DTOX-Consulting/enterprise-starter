import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  invert?: boolean;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & React.ComponentPropsWithoutRef<typeof Link>)
  | ({
      href?: string;
      type?: 'button' | 'submit' | 'reset';
    } & React.ComponentPropsWithoutRef<'button'>)
);

export function Button({
  invert = false,
  type = 'button',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  className = cn(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-gray-4 dark:hover:bg-neutral-500'
      : 'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-neutral-500 dark:text-gray-4 dark:hover:bg-neutral-800'
  );

  const inner = <span className="relative top-px">{children}</span>;

  if (typeof href === 'undefined') {
    return (
      <button
        className={className}
        type={type as ButtonHTMLAttributes<'button'>['type']}
        {...(props as React.ComponentPropsWithoutRef<'button'>)}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
