import { useMDXComponent } from 'next-contentlayer/hooks';

import { Callout } from '@/components/ui/molecules/callout';
import { MdxCard } from '@/components/ui/molecules/mdx-card';
import { cn } from '@/lib/utils';

import type { MDXComponents } from 'mdx/types';
import type { ImgHTMLAttributes, HTMLAttributes } from 'react';

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  a: ({ className, children, ...props }) => (
    <a className={cn('font-medium underline underline-offset-4', className)} {...props}>
      {children}
    </a>
  ),
  // eslint-disable-next-line id-length
  p: ({ className, ...props }) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  // eslint-enable-next-line id-length
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn('mt-2', className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={cn('rounded-md border', className)} alt={alt} {...props} aria-label={alt} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <div className={cn('w-full grid', className)} role="grid" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn('mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4', className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn('relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
      {...props}
    />
  ),
  Callout,
  Card: MdxCard
};

type MdxProps = {
  code: string;
};

export function Mdx({ code }: Readonly<MdxProps>) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
