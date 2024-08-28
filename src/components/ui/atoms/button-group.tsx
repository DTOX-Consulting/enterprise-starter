import Link from 'next/link';

import { cn } from '@/lib/utils';

type ButtonProps = {
  invert?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & {
      href?: undefined;
    })
);

export function Button({
  invert = false,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  className = cn(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-500'
      : 'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800'
  );

  const inner = <span className="relative top-px">{children}</span>;

  if (typeof props.href === 'undefined') {
    return (
      <button type={type} className={className} {...props}>
        {inner}
      </button>
    );
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  );
}
