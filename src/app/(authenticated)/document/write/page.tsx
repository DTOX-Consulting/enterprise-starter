import { Editor } from '@/components/ui/organisms/editor';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writer'
};

export default function WritePage() {
  return (
    <div className="flex flex-col items-center sm:px-5 sm:pt-24">
      <h1 className="my-4 text-center text-4xl font-bold sm:mb-8">Writing Companion</h1>
      <div className="relative size-full max-w-screen-xl space-y-4 px-4 sm:space-y-8 sm:px-0">
        <div className="border-grey-100 flex h-[400px] w-full overflow-auto rounded-md border dark:border-gray-600  sm:h-[800px]">
          <Editor
            completionApi="/api/generator?document=writer"
            className="bg-inherit dark:bg-inherit"
            disableLocalStorage={true}
            storageKey="writer"
            defaultValue={''}
          />
        </div>
      </div>
    </div>
  );
}
