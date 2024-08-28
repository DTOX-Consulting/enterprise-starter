'use client';

import { useCompletion } from 'ai/react';
import { ArrowUp } from 'lucide-react';
import { useEditor } from 'novel';
import { addAIHighlight } from 'novel/extensions';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { toast } from 'sonner';

import { Button } from '@/components/ui/atoms/button';
import { Command, CommandInput } from '@/components/ui/atoms/command';
import { ScrollArea } from '@/components/ui/atoms/scroll-area';
import { AICompletionCommands } from '@/components/ui/organisms/editor/generative/ai-completion-commands';
import { AISelectorCommands } from '@/components/ui/organisms/editor/generative/ai-selector-commands';
import CrazySpinner from '@/components/ui/organisms/editor/icons/crazy-spinner';
import Magic from '@/components/ui/organisms/editor/icons/magic';

import type { Editor } from '@/components/ui/organisms/editor/types';

interface AISelectorProps {
  open: boolean;
  completionApi?: string;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange, completionApi }: AISelectorProps) {
  const { editor } = useEditor() as { editor: Editor | null };
  const [inputValue, setInputValue] = useState('');

  const { completion, complete, isLoading } = useCompletion({
    api: completionApi ?? '/api/generate',
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.');
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });

  const hasCompletion = completion.length > 0;

  if (!editor) return null;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose prose-sm p-2 px-4">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-purple-500">
          <Magic className="mr-2 size-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              autoFocus
              value={inputValue}
              onValueChange={setInputValue}
              placeholder={
                hasCompletion ? 'Tell AI what to do next' : 'Ask AI to edit or generate...'
              }
              onFocus={() => addAIHighlight(editor)}
            />
            <Button
              size="icon"
              className="absolute right-4 top-1/2 size-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
              onClick={async () => {
                const afterCompletion = async (text: string) => {
                  const body = { option: 'zap', command: inputValue };
                  await complete(text, { body });
                  setInputValue('');
                };

                if (completion) return afterCompletion(completion);
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(slice.content);
                return afterCompletion(text);
              }}
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor.chain().unsetHighlight?.().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={async (value, option) => complete(value, { body: { option } })}
            />
          )}
        </>
      )}
    </Command>
  );
}
