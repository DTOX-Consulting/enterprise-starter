import { G } from '@mobily/ts-belt';
import ReactMarkdown from 'react-markdown';

import type { ReactNode } from 'react';

const LinkComponent = ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    {...props}
    className="font-medium text-gray-8 underline transition-colors"
  >
    {children}
  </a>
);

const CodeComponent = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    {...props}
    className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-8"
  />
);

export default function Card({
  title,
  description,
  demo,
  large
}: Readonly<{
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}>) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-2 bg-white shadow-md ${
        G.isNotNullable(large) && large ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex h-60 items-center justify-center">{demo}</div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-5 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="prose-sm mt-3 leading-normal text-gray-5 [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: LinkComponent,
              code: CodeComponent
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
