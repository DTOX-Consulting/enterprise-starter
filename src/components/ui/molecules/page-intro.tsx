import { FadeIn } from '@/components/animations/fade-in';
import { Container } from '@/components/ui/atoms/container';
import { cn } from '@/lib/utils';

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <Container className={cn('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}>
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-semibold text-neutral-950">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={cn(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl',
              centered && 'mx-auto'
            )}
          >
            {title}
          </span>
        </h1>
        <div className={cn('mt-6 max-w-3xl text-xl text-neutral-600', centered && 'mx-auto')}>
          {children}
        </div>
      </FadeIn>
    </Container>
  );
}
