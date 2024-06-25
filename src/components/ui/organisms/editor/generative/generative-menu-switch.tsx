import { EditorBubble, useEditor } from 'novel';
import { removeAIHighlight } from 'novel/extensions';
import { Fragment, type ReactNode, useEffect } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { AISelector } from '@/components/ui/organisms/editor/generative/ai-selector';
import Magic from '@/components/ui/organisms/editor/icons/magic';

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({ children, open, onOpenChange }: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [open, editor]);

  if (!editor) return null;

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        }
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            className="gap-1 rounded-none text-purple-500"
          >
            <Magic className="size-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
