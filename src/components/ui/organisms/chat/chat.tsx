'use client';

import { type Message, useChat } from 'ai/react';
import { useCallback, useState } from 'react';

import { ChatList } from '@/components/ui/organisms/chat/chat-list';
import { ChatPanel } from '@/components/ui/organisms/chat/chat-panel';
import { ChatScrollAnchor } from '@/components/ui/organisms/chat/chat-scroll-anchor';
import { EmptyScreen } from '@/components/ui/organisms/chat/empty-screen';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { cn } from '@/lib/utils';
import { danglingPromise } from '@/lib/utils/promise';

import type { BotType, BotUIType } from '@/lib/sdks/openai';
import type { ChatRequestBody } from '@/lib/sdks/openai/helpers/prompt';

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[];
  isUnAuthenticated?: boolean;
  showBots?: boolean;
  id?: string;
}

export function Chat({ id, showBots, isUnAuthenticated, initialMessages, className }: ChatProps) {
  const [bot, setBot] = useState<BotType>();

  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    id,
    initialMessages,
    body: { id, bot, isUnAuthenticated } as ChatRequestBody,
    onResponse(response) {
      if (response.status === 401) {
        toast({
          title: 'Unauthorized',
          description: 'You are not authorized to access this chat'
        });
      }
    }
  });

  const startChat = useCallback(
    (botType: BotUIType) => {
      setTimeout(
        () =>
          danglingPromise(
            append({
              id,
              role: 'system',
              content: `Bot: ${botType.name}`
            })
          ),
        100
      );
    },
    [append, id]
  );

  const nonSystemMessages = messages.filter((message) => message.role !== 'system');

  return (
    <div className="relative flex size-full">
      <div className={cn('size-full overflow-y-hidden pb-[200px] pt-4 md:pt-10', className)}>
        {nonSystemMessages.length > 0 || bot ? (
          <ChatList messages={messages}>
            <ChatScrollAnchor trackVisibility={isLoading} />
          </ChatList>
        ) : (
          <EmptyScreen
            bot={bot}
            setBot={setBot}
            showBots={showBots}
            setInput={setInput}
            startChat={startChat}
          />
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
