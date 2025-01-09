import { shortName, aiWelcomeTitle, aiDescription, exampleMessages } from '@/app/metadata';
import { Button } from '@/components/ui/atoms/button';
import { IconArrowRight } from '@/components/ui/organisms/chat/icons';
import { AI_NAME } from '@/lib/sdks/openai/constants';

import type { UseChatHelpers } from 'ai/react';

type EmptyScreenProps = Pick<UseChatHelpers, 'setInput'>;

export function EmptyScreen({ setInput }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to {AI_NAME} - {shortName} AI!
        </h1>
        <p className="mb-6 leading-normal text-muted-foreground">{aiWelcomeTitle}</p>

        <div>
          <p className="mt-2 leading-normal text-muted-foreground">{aiDescription}</p>
          <div className="mt-4 flex flex-col items-start space-y-2">
            {exampleMessages.map((message) => (
              <Button
                key={message.heading}
                variant="link"
                className="h-auto p-0 text-base"
                onClick={() => setInput(message.message)}
              >
                <IconArrowRight className="mr-2 text-muted-foreground" />
                {message.heading}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
