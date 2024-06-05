import { ImageEditor } from '@/app/(authenticated)/document/components/image-editor';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image'
};

export default function ImagePage() {
  return (
    <div className="flex flex-col items-center sm:px-5 sm:pt-24">
      <h1 className="my-4 text-center text-4xl font-bold sm:mb-8">Image Generator</h1>
      <div className="relative size-full max-w-screen-xl space-y-4 px-4 sm:space-y-8 sm:px-0">
        <ImageEditor />
      </div>
    </div>
  );
}
