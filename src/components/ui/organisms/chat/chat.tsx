'use client';

import { type Message, useChat } from 'ai/react';

import { ChatList } from '@/components/ui/organisms/chat/chat-list';
import { ChatPanel } from '@/components/ui/organisms/chat/chat-panel';
import { ChatScrollAnchor } from '@/components/ui/organisms/chat/chat-scroll-anchor';
import { EmptyScreen } from '@/components/ui/organisms/chat/empty-screen';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { cn } from '@/lib/utils';

import type { ChatRequestBody } from '@/lib/sdks/openai/api';

export type ChatProps = {
  initialMessages?: Message[];
  isUnAuthenticated?: boolean;
  showBots?: boolean;
  id?: string;
} & React.ComponentProps<'div'>

export function Chat({ id, isUnAuthenticated, initialMessages, className }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    id,
    initialMessages,
    body: { id, isUnAuthenticated } as ChatRequestBody,
    onResponse(response) {
      if (response.status === 401) {
        toast({
          title: 'Unauthorized',
          description: 'You are not authorized to access this chat'
        });
      }
    }
  });

  const nonSystemMessages = messages.filter((message) => message.role !== 'system');

  return (
    <div className="relative flex size-full">
      <div className={cn('size-full overflow-y-hidden pb-[200px] pt-4 md:pt-10', className)}>
        {nonSystemMessages.length > 0 ? (
          <ChatList messages={messages}>
            <ChatScrollAnchor trackVisibility={isLoading} />
          </ChatList>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        stop={stop}
        input={input}
        append={append}
        reload={reload}
        messages={messages}
        setInput={setInput}
        isLoading={isLoading}
      />
    </div>
  );
}
