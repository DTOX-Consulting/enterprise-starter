'use client';

import { G } from '@mobily/ts-belt';
import hljs from 'highlight.js';
import {
  EditorRoot,
  EditorCommand,
  EditorContent,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  type JSONContent,
  type EditorInstance
} from 'novel';
import { ImageResizer, handleCommandNavigation } from 'novel/extensions';
import { handleImageDrop, handleImagePaste } from 'novel/plugins';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Separator } from '@/components/ui/atoms/separator';
import { defaultExtensions } from '@/components/ui/organisms/editor/extensions';
import GenerativeMenuSwitch from '@/components/ui/organisms/editor/generative/generative-menu-switch';
import { uploadFn } from '@/components/ui/organisms/editor/image-upload';
import { ColorSelector } from '@/components/ui/organisms/editor/selectors/color-selector';
import { LinkSelector } from '@/components/ui/organisms/editor/selectors/link-selector';
import { NodeSelector } from '@/components/ui/organisms/editor/selectors/node-selector';
import { TextButtons } from '@/components/ui/organisms/editor/selectors/text-buttons';
import { slashCommand, suggestionItems } from '@/components/ui/organisms/editor/slash-command';

const extensions = [...defaultExtensions, slashCommand];

export const Editor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    doc.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback((editor: EditorInstance) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    window.localStorage.setItem('html-content', highlightCodeblocks(editor.getHTML()));
    window.localStorage.setItem('novel-content', JSON.stringify(json));
    window.localStorage.setItem('markdown', editor.storage.markdown.getMarkdown());
    setSaveStatus('Saved');
  }, 500);

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content');
    if (content) setInitialContent(JSON.parse(content) as JSONContent);
    else setInitialContent({});
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full">
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            G.isNotNullable(charsCount) && charsCount > 0
              ? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'
              : 'hidden'
          }
        >
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          initialContent={initialContent}
          className="relative size-full min-h-[500px] border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none w-full h-full'
            }
          }}
          onUpdate={({ editor }) => {
            void debouncedUpdates(editor);
            setSaveStatus('Unsaved');
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex size-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
