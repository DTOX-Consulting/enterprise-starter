// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

'use client';

import { type FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button } from '@/components/ui/atoms/button';
import { IconCheck, IconCopy, IconDownload } from '@/components/ui/organisms/chat/icons';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';

type Props = {
  language: string;
  value: string;
};

type languageMap = Record<string, string | undefined>;

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = '';
  for (let index = 0; index < length; index++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const fileExtension = programmingLanguages[language] ?? '.file';
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt('Enter file name', suggestedFileName);

    if (!Boolean(fileName)) {
      // User pressed cancel on prompt.
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName as string;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onCopy = async () => {
    if (isCopied) return;
    await copyToClipboard(value);
  };

  return (
    <div className="codeblock relative w-full bg-zinc-950 font-sans">
      <div className="flex w-full items-center justify-between bg-zinc-800 px-6 py-2 pr-4 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={downloadAsFile}
            size="icon"
          >
            <IconDownload />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={onCopy}
          >
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
