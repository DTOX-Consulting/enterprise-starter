import { G } from '@mobily/ts-belt';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { Route } from 'next';

type CardProps = {
  href?: Route<string>;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function MdxCard({ href, className, children, disabled, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg',
        Boolean(disabled) && 'cursor-not-allowed opacity-60',
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>
      {G.isNotNullable(href) && (
        <Link
          href={G.isNotNullable(disabled) && disabled ? '#' : href}
          className="absolute inset-0"
        >
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  );
}
