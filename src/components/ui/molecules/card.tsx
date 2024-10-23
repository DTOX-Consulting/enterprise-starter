import ReactMarkdown from 'react-markdown';

import type { ReactNode } from 'react';

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
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        Boolean(large) ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex h-60 items-center justify-center">{demo}</div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="prose-sm mt-3 leading-normal text-gray-500 [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: ({ ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ ...props }) => (
                <code
                  {...props}
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              )
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
