'use client';

import '@/styles/image-editor.css';

import ReactImageEditor from '@toast-ui/react-image-editor';
import { useCallback, useRef } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';

import { Button } from '@/components/ui/atoms/button';

import type { ImageEditorInstance } from '@toast-ui/react-image-editor';

type ImageEditorOptions = {
  includeUI: {
    menu?: string[];
    initMenu?: string;
    menuBarPosition?: string;
    loadImage: {
      path: string;
      name: string;
    };
    uiSize: {
      width: string;
      height: string;
    };
  };
  cssMaxHeight: number;
  cssMaxWidth: number;
  selectionStyle: {
    cornerSize: number;
    rotatingPointOffset: number;
  };
  usageStatistics: boolean;
}

const defaultOptions: ImageEditorOptions = {
  includeUI: {
    initMenu: 'resize',
    menuBarPosition: 'bottom',
    loadImage: {
      path: '',
      name: 'Image'
    },
    uiSize: {
      width: '100%',
      height: '100%'
    }
  },
  cssMaxHeight: 1000,
  cssMaxWidth: 1000,
  selectionStyle: {
    cornerSize: 20,
    rotatingPointOffset: 70
  },
  usageStatistics: true
};

type Options = {
  ui: {
    path: string;
    name: string;
  };
  actions?: {
    upload?: (dataUrl: string) => Promise<void>;
    download?: (dataUrl: string) => Promise<void>;
  };
};

export const ImageEditor = ({ options }: { options: Options }) => {
  const editorRef = useRef<ImageEditorInstance>();

  const saveImage = useCallback(async () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const dataUrl = editorInstance.toDataURL();
    await options.actions?.upload?.(dataUrl);
  }, [options.actions]);

  const downloadImage = useCallback(async () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const dataUrl = editorInstance.toDataURL();
    await options.actions?.download?.(dataUrl);
  }, [options.actions]);

  const fullOptions = {
    ...defaultOptions,
    includeUI: {
      ...defaultOptions.includeUI,
      loadImage: options.ui
    }
  };

  return (
    <div className="flex size-full flex-col">
      <ReactImageEditor ref={editorRef} {...fullOptions} />
      <div className="mt-4 flex flex-col justify-end space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <Button onClick={downloadImage} disabled={!options.actions?.download}>
          Download Image
        </Button>
        <Button variant="pulse" onClick={saveImage} disabled={!options.actions?.upload}>
          Save Image
        </Button>
      </div>
    </div>
  );
};
