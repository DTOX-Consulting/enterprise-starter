import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText
} from 'lucide-react';
import { useEditor } from 'novel';

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/atoms/command';

import type { Editor } from '@/components/ui/organisms/editor/types';

const options = [
  {
    value: 'Improve',
    label: 'Improve writing',
    icon: RefreshCcwDot
  },

  {
    value: 'Fix grammar',
    label: 'Fix grammar',
    icon: CheckCheck
  },
  {
    value: 'make text shorter',
    label: 'Make shorter',
    icon: ArrowDownWideNarrow
  },
  {
    value: 'Make text longer',
    label: 'Make longer',
    icon: WrapText
  }
];

const moreOptions = [
  {
    value: 'Continue writing by adding to the end of the text',
    label: 'Continue writing',
    icon: StepForward
  }
];

type AISelectorCommandsProps = {
  onSelect: (value: string, option: string) => void;
}

export const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor() as { editor: Editor | null };
  if (!editor) return null;

  return (
    <>
      <CommandGroup heading="Edit or review selection">
        <CommandList>
          {options.map((option) => (
            <CommandItem
              onSelect={(value) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(slice.content);
                onSelect(text, value);
              }}
              className="flex gap-2 px-4"
              key={option.value}
              value={option.value}
            >
              <option.icon className="size-4 text-purple-500" />
              {option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandList>
          {moreOptions.map((option) => (
            <CommandItem
              onSelect={(value) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(slice.content);
                onSelect(text, value);
              }}
              className="flex gap-2 px-4"
              key={option.value}
              value={option.value}
            >
              <option.icon className="size-4 text-purple-500" />
              {option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </>
  );
};
