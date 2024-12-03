import { G } from '@mobily/ts-belt';
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react';
import { EditorBubbleItem, useEditor } from 'novel';

import { Button } from '@/components/ui/atoms/button';
import { cn } from '@/lib/utils';

import type { SelectorItem } from '@/components/ui/organisms/editor/selectors/node-selector';

export const TextButtons = () => {
  const { editor } = useEditor();
  if (G.isNullable(editor)) return null;

  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (ed) => ed.isActive('bold'),
      command: (ed) => ed.chain().focus().toggleBold().run(),
      icon: BoldIcon
    },
    {
      name: 'italic',
      isActive: (ed) => ed.isActive('italic'),
      command: (ed) => ed.chain().focus().toggleItalic().run(),
      icon: ItalicIcon
    },
    {
      name: 'underline',
      isActive: (ed) => ed.isActive('underline'),
      command: (ed) => ed.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon
    },
    {
      name: 'strike',
      isActive: (ed) => ed.isActive('strike'),
      command: (ed) => ed.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon
    },
    {
      name: 'code',
      isActive: (ed) => ed.isActive('code'),
      command: (ed) => ed.chain().focus().toggleCode().run(),
      icon: CodeIcon
    }
  ];
  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={() => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn('size-4', {
                'text-blue-5': item.isActive(editor)
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
