// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import Image from 'next/image';
import remarkGfm from 'remark-gfm';

import { ChatMessageActions } from '@/components/ui/organisms/chat/chat-message-actions';
import { CodeBlock } from '@/components/ui/organisms/chat/codeblock';
import { IconOpenAI, IconUser } from '@/components/ui/organisms/chat/icons';
import { MemoizedReactMarkdown } from '@/components/ui/organisms/chat/markdown';
import { cn } from '@/lib/utils';

import type { Message } from 'ai';

export interface ChatMessageProps {
  message: Message;
  mdExtraClasses?: string;
}
const cleanUrl = (url: string) => {
  return decodeURIComponent(url).replace(/&amp;/g, '&').replace(/, /g, ',').replace(/ /g, '%20');
};

export function ChatMessage({ message, mdExtraClasses, ...props }: ChatMessageProps) {
  return (
    <div className={cn('group relative mb-4 flex items-start md:-ml-12')} {...props}>
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user' ? 'bg-background' : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className={cn(
            'prose max-w-5xl break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
            mdExtraClasses
          )}
          remarkPlugins={[remarkGfm]}
          components={{
            img: function Img({ className, ...props }: React.ComponentPropsWithoutRef<'img'>) {
              return (
                <span
                  className={cn(
                    'group isolate flex justify-center overflow-hidden rounded-xl max-sm:-mx-6',
                    className as string | undefined
                  )}
                >
                  <Image
                    unoptimized
                    width={200 as number}
                    height={200 as number}
                    {...props}
                    alt={props.alt as string}
                    src={cleanUrl(props.src as string)}
                    className="w-full rounded-xl object-contain"
                  />
                </span>
              );
            },
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            table({ children }) {
              return (
                <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                  {children}
                </table>
              );
            },
            th({ children }) {
              return (
                <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="break-words border border-black px-3 py-1 dark:border-white">
                  {children}
                </td>
              );
            },
            code({ node, className, children, ...props }) {
              if (typeof children === 'string') {
                if (children === '▍') {
                  return <span className="mt-1 animate-pulse cursor-default">▍</span>;
                }

                children = children.replace('`▍`', '▍');
              }

              const match = /language-(\w+)/.exec(className ?? '');

              return match && match.length > 0 ? (
                <CodeBlock
                  key={Math.random()}
                  language={match?.[1] ?? ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
