import { shortName } from '@/app/metadata';
import { Button } from '@/components/ui/atoms/button';
import { ExternalLink } from '@/components/ui/atoms/external-link';
import { ButtonScrollToBottom } from '@/components/ui/organisms/chat/button-scroll-to-bottom';
import { IconRefresh, IconStop } from '@/components/ui/organisms/chat/icons';
import { PromptForm } from '@/components/ui/organisms/chat/prompt-form';
import { routes } from '@/config/navigation/routes';
import { cn } from '@/lib/utils';
import { AI_NAME } from '@/local/ai/constants';

import type { UseChatHelpers } from 'ai/react';

export type ChatPanelProps = {
  id?: string;
} & Pick<
  UseChatHelpers,
  'append' | 'isLoading' | 'reload' | 'messages' | 'stop' | 'input' | 'setInput'
>;

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const nonSystemMessages = messages.filter((message) => message.role !== 'system');

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-5xl sm:px-4">
        <div className="mb-4 flex h-10 items-center justify-center">
          {isLoading ? (
            <Button variant="outline" onClick={() => stop()} className="bg-background">
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            nonSystemMessages.length > 0 && (
              <Button variant="outline" onClick={() => void reload()} className="bg-background">
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              const content = value.trim();
              const role = 'user';

              await append({
                id,
                role,
                content
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <PanelFooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}

export function PanelFooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('px-2 text-center text-xs leading-normal text-muted-foreground', className)}
      {...props}
    >
      <ExternalLink href={routes.home}>{shortName}</ExternalLink> ({AI_NAME}) - Your Personal AI
      Assistant
    </p>
  );
}
