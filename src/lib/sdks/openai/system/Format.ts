export type FormatType = keyof typeof Formats;

export const Formats = {
  json: 'json',
  html: 'html',
  plain: 'plain text',
  markdown: 'markdown',
  codeRust: 'rust code',
  codeReact: 'react code',
  codePython: 'python code',
  codeJavascript: 'javascript code',
  codeTypescript: 'typescript code'
} as const;
