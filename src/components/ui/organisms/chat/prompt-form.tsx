import { useRef, useEffect } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { TextareaAutosize } from '@/components/ui/atoms/textarea-autosize';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/atoms/tooltip';
import { IconArrowElbow, IconPlus } from '@/components/ui/organisms/chat/icons';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useRouter } from '@/lib/hooks/use-router';

import type { UseChatHelpers } from 'ai/react';

export type PromptProps = {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
} & Pick<UseChatHelpers, 'input' | 'setInput'>;

export function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (!input.trim()) {
          return;
        }
        setInput('');
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4"
                onClick={(event) => {
                  event.preventDefault();
                  router.refresh();
                }}
              >
                <IconPlus />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TextareaAutosize
          rows={1}
          tabIndex={0}
          value={input}
          maxHeight={120}
          spellCheck={true}
          onKeyDown={onKeyDown}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Send a message."
          className="w-full resize-none border-none bg-transparent px-4 py-[1.3rem] focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={isLoading || input === ''}>
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
}
