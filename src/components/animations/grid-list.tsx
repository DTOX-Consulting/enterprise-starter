import { clsx } from 'clsx';

import { Border } from '@/components/animations/border';
import { FadeInStagger, FadeIn } from '@/components/animations/fade-in';

export function GridList({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <FadeInStagger>
      <ul className={clsx('grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {children}
      </ul>
    </FadeInStagger>
  );
}

export function GridListItem({
  title,
  children,
  className,
  invert = false
}: Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}>) {
  return (
    <li
      className={clsx(
        'text-base',
        invert
          ? 'text-gray-3 before:bg-white after:bg-white/10'
          : 'text-gray-6 before:bg-gray-10 after:bg-gray-100',
        className
      )}
    >
      <FadeIn>
        <Border position="left" className="pl-8" invert={invert}>
          <strong className={clsx('font-semibold', invert ? 'text-white' : 'text-gray-11')}>
            {title}.
          </strong>{' '}
          {children}
        </Border>
      </FadeIn>
    </li>
  );
}
