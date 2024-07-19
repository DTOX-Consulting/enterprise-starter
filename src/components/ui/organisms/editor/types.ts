import type { EditorInstance, JSONContent } from 'novel';
import type { SetStateAction } from 'react';

type Fragment = ReturnType<EditorInstance['state']['selection']['content']>['content'];

type EditorStorage = {
  storage: {
    characterCount: {
      words: () => SetStateAction<number>;
    };
    markdown: {
      getMarkdown: () => string;
      serializer: {
        serialize: (content: Fragment) => string;
      };
    };
  };
};

export type Editor = EditorInstance & EditorStorage;

export type UpdateContent = {
  text: string;
  html: string;
  markdown: string;
  json: JSONContent;
};
