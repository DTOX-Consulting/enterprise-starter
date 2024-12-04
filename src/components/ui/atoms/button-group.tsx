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
      ? 'bg-white text-gray-11 hover:bg-gray-2 dark:bg-gray-8 dark:text-gray-4 dark:hover:bg-gray-5'
      : 'bg-gray-10 text-white hover:bg-gray-8 dark:bg-gray-5 dark:text-gray-4 dark:hover:bg-gray-8'
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
