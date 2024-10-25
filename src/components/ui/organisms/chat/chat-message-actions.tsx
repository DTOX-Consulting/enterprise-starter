'use client';

import { Button } from '@/components/ui/atoms/button';
import { IconCheck, IconCopy } from '@/components/ui/organisms/chat/icons';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

import type { Message } from 'ai';

type ChatMessageActionsProps = {
  message: Message;
} & React.ComponentProps<'div'>;

export function ChatMessageActions({ message, className, ...props }: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = async () => {
    if (isCopied) return;
    try {
      await copyToClipboard(message.content);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={() => void onCopy()}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  );
}
