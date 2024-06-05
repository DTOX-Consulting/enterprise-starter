'use client';
// @refresh reset

import { useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { ChatMessage } from '@/components/ui/organisms/chat/chat-message';
import { Editor } from '@/components/ui/organisms/editor';
import { type SelectConfigItem, SelectGenerator } from '@/components/ui/organisms/select/generator';
import { useRef } from '@/lib/hooks/use-ref';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useSelector } from '@/lib/hooks/use-selector';
import {
  type DocumentType,
  type PersonaType,
  type FormatType,
  type ToneType,
  availableFormats,
  availableDocuments,
  availableMinimalTones as availableTones,
  availableMinimalPersonas as availablePersonas
} from '@/lib/sdks/openai';
import { templates } from '@/lib/sdks/openai/templates';
import { State } from '@/lib/state';
import { downloadResponse } from '@/lib/utils/url';

import type { Message } from 'ai';

type Params = {
  topic: string;
  tone: ToneType;
  format: FormatType;
  persona: PersonaType;
  document: DocumentType;
};

type Response = {
  error?: Error;
  data?: string;
  loading?: boolean;
};

const paramsState = new State<Params>();
const responseState = new State<Response>();

export const DocumentEditor = () => {
  const searchParams = useSearchParams();
  const [ref, scrollToView] = useRef<HTMLDivElement>();
  const params = useSelector(() => paramsState.getState());
  const response = useSelector(() => responseState.getState());

  const message: Message = useMemo(
    () => ({
      id: '1',
      role: 'system',
      content: response.error?.message || response.data || ''
    }),
    [response]
  );

  const onClickGenerate = useCallback(async () => {
    await handleOnClickGenerate();
    scrollToView();
  }, [scrollToView]);

  const onClickDownload = useCallback(async () => {
    await handleOnClickDownload();
  }, []);

  const selectConfig: SelectConfigItem<Params>[] = [
    {
      param: 'document',
      value: params.document,
      options: availableDocuments,
      placeholder: 'Select Document...',
      condition: searchParams.isNotFalse('document'),
      onItemChange: (_, value) => setInitialValuesFromDocument(value)
    },
    {
      param: 'tone',
      value: params.tone,
      options: availableTones,
      placeholder: 'Select Tone...',
      condition: searchParams.isNotFalse('tone')
    },
    {
      param: 'format',
      value: params.format,
      options: availableFormats,
      placeholder: 'Select Format...',
      condition: searchParams.isNotFalse('format')
    },
    {
      param: 'persona',
      value: params.persona,
      options: availablePersonas,
      placeholder: 'Select Target...',
      condition: searchParams.isNotFalse('persona')
    }
  ];

  return (
    <>
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0">
        <SelectGenerator config={selectConfig} onChange={paramsState.setValue.bind(paramsState)} />
      </div>

      <div className="flex flex-col space-y-4 pb-4">
        <div className="border-grey-100 flex h-[17rem] w-full overflow-auto rounded-md border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 sm:h-56">
          <Editor
            completionApi="/api/generator?document=writerShort"
            onUpdate={(editor) => {
              const text = editor?.getText();
              text && paramsState.setValue('topic', text);
            }}
          />
        </div>

        <Button
          className="h-10 w-full place-self-end border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 sm:w-48"
          disabled={response.loading}
          onClick={onClickGenerate}
        >
          {response.loading ? 'Loading...' : 'Generate'}
        </Button>
        <div
          ref={ref}
          className="border-grey-100 flex h-[41rem] w-full overflow-auto rounded-md border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 md:px-16 md:py-6"
        >
          <ChatMessage message={message} mdExtraClasses={'max-w-full pb-4'} />
        </div>

        <Button
          className="h-10 w-full place-self-end border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 sm:w-48"
          disabled={response.loading}
          onClick={onClickDownload}
        >
          {response.loading ? 'Loading...' : 'Download PDF'}
        </Button>
      </div>
    </>
  );
};

const handleOnClickGenerate = async () => {
  const request = Object.assign({}, paramsState.get());

  if (!request.topic) {
    return;
  }

  const { topic, ...others } = request;
  responseState.setValue('loading', true);

  try {
    const response = await fetch('/api/generator', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.text();
    responseState.setValue('data', data);
  } catch (e) {
    const error = e as Error;
    responseState.setValue('error', error);
  } finally {
    responseState.setValue('loading', false);
  }
};

const handleOnClickDownload = async () => {
  const document = paramsState.getValue('document');
  const completion = responseState.getValue('data');

  if (!completion || !document) {
    return;
  }

  responseState.setValue('loading', true);

  try {
    const response = await fetch('/api/generator/pdf', {
      method: 'POST',
      body: JSON.stringify({
        completion,
        document
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await downloadResponse(response, document);
  } catch (e) {
    const error = e as Error;
    responseState.setValue('error', error);
  } finally {
    responseState.setValue('loading', false);
  }
};

const setInitialValuesFromDocument = (doc: string) => {
  const document = doc as DocumentType;
  const template = templates[document];
  const { tone, format, persona } = template;

  paramsState.set({
    tone,
    format,
    persona,
    document,
    topic: paramsState.getValue('topic')
  });
};
