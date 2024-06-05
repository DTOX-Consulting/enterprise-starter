import { DocumentEditor } from '@/app/(authenticated)/document/components/document-editor';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Document'
};

export default function DocumentPage() {
  return (
    <div className="flex flex-col items-center sm:px-5 sm:pt-24">
      <h1 className="my-4 text-center text-4xl font-bold sm:mb-8">Document Generator</h1>
      <div className="relative size-full max-w-screen-xl space-y-4 px-4 sm:space-y-8 sm:px-0">
        <DocumentEditor />
      </div>
    </div>
  );
}
