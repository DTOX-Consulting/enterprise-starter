import { Separator } from '@/components/ui/atoms/separator';
import { ChatMessage } from '@/components/ui/organisms/chat/chat-message';

import type { Message } from 'ai';
import type { PropsWithChildren } from 'react';

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages, children }: PropsWithChildren<ChatList>) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto h-full max-w-5xl items-center overflow-y-auto overflow-x-hidden px-4 pt-4 md:pl-20 md:pr-8">
      {messages
        .filter(({ role }) => role !== 'system')
        .map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && <Separator className="my-4 md:my-8" />}
          </div>
        ))}
      {children}
    </div>
  );
}
