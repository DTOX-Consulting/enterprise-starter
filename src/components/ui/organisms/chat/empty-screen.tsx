import { shortName } from '@/app/metadata';
import { Button } from '@/components/ui/atoms/button';
import { IconArrowRight } from '@/components/ui/organisms/chat/icons';
import { AI_NAME } from '@/lib/sdks/openai/constants';

import type { UseChatHelpers } from 'ai/react';

const exampleMessages = [
  {
    heading: 'Explain "Seed Funding"',
    message:
      'Define the term "Seed Funding" in the context of startups. Explain how it typically works and why it\'s crucial for early-stage companies.'
  },
  {
    heading: 'Explain "Runway" in Startups',
    message:
      'Please provide a clear explanation of the term "Runway" as it pertains to startups. Describe what it represents and why it\'s a crucial metric for startup sustainability.'
  },
  {
    heading: 'Market analysis',
    message:
      'Conduct a brief market analysis for a new product or service in the tech industry.\n\nEnter Product Description: '
  },
  {
    heading: 'Create an elevator pitch',
    message: 'Craft a 30-second elevator pitch for my startup.\n\nEnter Product Description: '
  },
  {
    heading: 'Product feature prioritization',
    message:
      'You have limited resources. Prioritize the top three features to develop for your minimum viable product (MVP).\n\nEnter Product Description: '
  }
];

type EmptyScreenProps = Pick<UseChatHelpers, 'setInput'>;

export function EmptyScreen({ setInput }: Readonly<EmptyScreenProps>) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to {AI_NAME} - {shortName} AI!
        </h1>
        <p className="mb-6 leading-normal text-muted-foreground">
          Supercharge Your Start-Up Success with AI
        </p>

        <div>
          <p className="mt-2 leading-normal text-muted-foreground">
            Start a conversation or try one of the examples:
          </p>
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
