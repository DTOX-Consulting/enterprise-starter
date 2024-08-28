import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

const sizes = {
  'no-padding': 'mx-auto md:max-w-2xl lg:max-w-7xl',
  xs: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2',
  sm: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12',
  md: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8',
  lg: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8'
};

export function Container({
  size = 'lg',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { size?: keyof typeof sizes }) {
  return <div className={cn(sizes[size], className)} {...props} />;
}

export function ContainerAnimated({
  size = 'lg',
  className,
  ...props
}: Parameters<typeof FadeIn>[0] & { size?: keyof typeof sizes }) {
  return <FadeIn className={cn(sizes[size], className)} {...props} />;
}
