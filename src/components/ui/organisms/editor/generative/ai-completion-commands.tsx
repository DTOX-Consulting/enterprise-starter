import { Check, TextQuote, TrashIcon } from 'lucide-react';
import { useEditor } from 'novel';

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/atoms/command';

export const AICompletionCommands = ({
  completion,
  onDiscard
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useEditor();
  if (!editor) return null;

  return (
    <>
      <CommandGroup>
        <CommandList>
          <CommandItem
            className="gap-2 px-4"
            value="replace"
            onSelect={() => {
              const selection = editor.view.state.selection;

              editor
                .chain()
                .focus()
                .insertContentAt(
                  {
                    from: selection.from,
                    to: selection.to
                  },
                  completion
                )
                .run();
            }}
          >
            <Check className="size-4 text-muted-foreground" />
            Replace selection
          </CommandItem>
          <CommandItem
            className="gap-2 px-4"
            value="insert"
            onSelect={() => {
              const selection = editor.view.state.selection;
              editor
                .chain()
                .focus()
                .insertContentAt(selection.to + 1, completion)
                .run();
            }}
          >
            <TextQuote className="size-4 text-muted-foreground" />
            Insert below
          </CommandItem>
        </CommandList>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandList>
          <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
            <TrashIcon className="size-4 text-muted-foreground" />
            Discard
          </CommandItem>
        </CommandList>
      </CommandGroup>
    </>
  );
};
