'use client';
// @refresh reset

import { each } from 'already';
import Image from 'next/image';
import { useCallback } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { Editor } from '@/components/ui/organisms/editor';
import { type SelectConfigItem, SelectGenerator } from '@/components/ui/organisms/select/generator';
import { useRef } from '@/lib/hooks/use-ref';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useSelector } from '@/lib/hooks/use-selector';
import {
  availableImageStyles,
  availableImageDallE2N,
  availableImageDallE3N,
  availableImageQualities,
  availableImageDallE2Sizes,
  availableImageDallE3Sizes,
  availableImageModelsValues as availableImageModels
} from '@/lib/sdks/openai';
import { State } from '@/lib/state';
import { cn } from '@/lib/utils';
import { downloadUrl } from '@/lib/utils/url';

import type { ImageOptions } from '@/lib/sdks/openai/helpers/prompt';
import type { NN } from '@/lib/types';

type Response = {
  error?: Error;
  loading?: boolean;
  data?: { url: string }[];
};

type Params = NN<ImageOptions> & {
  n: string;
};

const paramsState = new State<Params>();
const responseState = new State<Response>();

export const ImageEditor = () => {
  const searchParams = useSearchParams();
  const [ref, scrollToView] = useRef<HTMLDivElement>();
  const params = useSelector(() => paramsState.getState());
  const response = useSelector(() => responseState.getState());

  const isDallE2 = params.model === 'dall-e-2';
  const availableImagesN = isDallE2 ? availableImageDallE2N : availableImageDallE3N;
  const availableImageSizes = isDallE2 ? availableImageDallE2Sizes : availableImageDallE3Sizes;

  const onClickGenerate = useCallback(async () => {
    await handleOnClickGenerate();
    scrollToView();
  }, [scrollToView]);

  const onClickDownload = useCallback(async () => {
    await handleOnClickDownload();
  }, []);

  const selectConfig: SelectConfigItem<Params>[] = [
    {
      param: 'model',
      value: params.model,
      options: availableImageModels,
      placeholder: 'Select Model...',
      condition: searchParams.isNotFalse('model')
    },
    {
      param: 'size',
      value: params.size,
      options: availableImageSizes,
      placeholder: 'Select Size...',
      condition: searchParams.isNotFalse('size')
    },
    {
      param: 'n',
      value: params.n,
      placeholder: 'Select Number...',
      options: availableImagesN.map((i) => `${i}`),
      condition: isDallE2 && searchParams.isNotFalse('n')
    },
    {
      param: 'style',
      value: params.style,
      options: availableImageStyles,
      placeholder: 'Select Style...',
      condition: !isDallE2 && searchParams.isNotFalse('style')
    },
    {
      param: 'quality',
      value: params.quality,
      options: availableImageQualities,
      placeholder: 'Select Quality...',
      condition: !isDallE2 && searchParams.isNotFalse('quality')
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
            storageKey="image-prompt"
            disableLocalStorage={true}
            className="bg-inherit dark:bg-inherit"
            completionApi="/api/generator?document=writerShort"
            defaultValue={paramsState.getValue('prompt') ?? ''}
            onUpdate={(editor) => {
              const text = editor?.getText();
              text && paramsState.setValue('prompt', text);
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
          {handleResponse()}
        </div>

        <Button
          className="h-10 w-full place-self-end border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 sm:w-48"
          disabled={response.loading}
          onClick={onClickDownload}
        >
          {response.loading ? 'Loading...' : 'Download Image'}
        </Button>
      </div>
    </>
  );
};

const handleResponse = () => {
  const response = responseState.get();

  if (!response) {
    return;
  }

  if (response.error) {
    return (
      <div className="flex flex-col">
        <p className="text-center text-red-600">{response.error.message}</p>
      </div>
    );
  }

  const size = paramsState.getValue('size') ?? '1024x1024';
  const [width, height] = size.split('x').map((item) => Number.parseInt(item, 10));

  if (response.data) {
    return (
      <div
        className={cn('grid grid-cols-1 gap-4', response.data.length > 1 ? 'sm:grid-cols-2' : '')}
      >
        {response.data.map((item, index) => (
          <div key={`${index}-key`} className="flex h-auto w-full flex-col last:pb-6">
            <Image
              unoptimized
              width={width}
              height={height}
              src={item.url}
              alt="Dall-E generated image"
              className="h-auto w-full rounded-md"
            />
          </div>
        ))}
      </div>
    );
  }
};

const handleOnClickGenerate = async () => {
  const request = Object.assign({}, paramsState.get());

  if (!request.prompt) {
    return;
  }

  responseState.setValue('loading', true);
  const urlParams = new URLSearchParams(request).toString();

  try {
    const response = await fetch(`/api/generator/image?${urlParams}`);
    const json = (await response.json()) as { data: { url: string }[] };
    responseState.setValue('data', json.data);
  } catch (e) {
    const error = e as Error;
    responseState.setValue('error', error);
  } finally {
    responseState.setValue('loading', false);
  }
};

const handleOnClickDownload = async () => {
  const data = responseState.getValue('data');
  const prompt = paramsState.getValue('prompt');

  if (!data || !prompt) {
    return;
  }

  await each(data, async (item) => {
    const urlParams = new URLSearchParams(item).toString();
    await downloadUrl(`/api/proxy?${urlParams}`, prompt);
  });
};
