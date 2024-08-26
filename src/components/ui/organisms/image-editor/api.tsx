'use client';

import '@/styles/image-editor.css';

import { G } from '@mobily/ts-belt';
import { useCallback, useEffect, useState } from 'react';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';

import { getEnv } from '@/lib/env/env.mjs';

import type { ImageEditorInstance } from '@toast-ui/react-image-editor';

export const generateImagePath = (url: string) => {
  if (url.startsWith('https://dynamic.brandcrowd.com')) {
    return {
      name: new URLSearchParams(url).get('text') ?? 'Image',
      path: `${getEnv('NEXT_PUBLIC_APP_URL')}/api/proxy?url=${encodeURIComponent(url)}`
    };
  }

  // This needs to not need a proxy
  if (
    url.startsWith('https://user-generated.pulseline.io') ||
    url.startsWith('https://user-generated-temp.pulseline.io')
  ) {
    return {
      name: 'Image',
      path: `${getEnv('NEXT_PUBLIC_APP_URL')}/api/proxy?url=${encodeURIComponent(url)}`
    };
  }

  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return {
      name: 'Image',
      path: url
    };
  }

  return {
    name: 'Image',
    path: url
  };
};

export const useImageEditor = () => {
  const [instance, setInstance] = useState<ImageEditorInstance>(
    null as unknown as ImageEditorInstance
  );

  useEffect(() => {
    const virtualElement = document.createElement('div');
    const editor = new ImageEditor(virtualElement, {});
    setInstance(editor as ImageEditorInstance);

    return () => {
      virtualElement.remove();
      editor.destroy();
    };
  }, []);

  const flipImageX = useCallback(async () => instance.flipX(), [instance]);
  const flipImageY = useCallback(async () => instance.flipY(), [instance]);
  const rotateImage = useCallback(async (angle: number) => instance.rotate(angle), [instance]);

  const applyFilter = useCallback(
    async (filterType: string) => instance.applyFilter(filterType),
    [instance]
  );

  const resizeImage = useCallback(
    async (newWidth: number, newHeight: number, keepAspectRatio = false) => {
      const currentSize = instance.getCanvasSize();

      if (keepAspectRatio) {
        const currentAspectRatio = currentSize.width / currentSize.height;
        const newAspectRatio = newWidth / newHeight;

        let updatedWidth = newWidth;
        let updatedHeight = newHeight;

        if (currentAspectRatio) {
          if (newAspectRatio > currentAspectRatio) {
            updatedWidth = Math.round(newHeight * currentAspectRatio);
          } else {
            updatedHeight = Math.round(newWidth / currentAspectRatio);
          }
        }

        await instance.resizeCanvasDimension({ width: updatedWidth, height: updatedHeight });
        return instance.resize({ width: updatedWidth, height: updatedHeight });
      }

      await instance.resizeCanvasDimension({ width: newWidth, height: newHeight });
      return instance.resize({ width: newWidth, height: newHeight });
    },
    [instance]
  );

  const loadImage = useCallback(
    async (url: string) => {
      const { path, name } = generateImagePath(url);
      return instance.loadImageFromURL(path, name);
    },
    [instance]
  );

  const saveImage = useCallback(async () => {
    const data = instance.toDataURL();
    const blob = await fetch(data).then(async (res) => res.blob());
    const file = new File([blob], instance.getImageName(), { type: blob.type });

    const url = URL.createObjectURL(blob);
    return { url, blob, file, data };
  }, [instance]);

  const getImageUrl = useCallback(async () => {
    const data = instance.toDataURL();
    const blob = await fetch(data).then(async (res) => res.blob());
    return URL.createObjectURL(blob);
  }, [instance]);

  const loadAndResize = useCallback(
    async (value: string, width: number, height: number, setUrl?: (url: string) => void) => {
      await loadImage(value);
      await resizeImage(width, height);
      const url = await getImageUrl();
      setUrl?.(url);
    },
    [loadImage, resizeImage, getImageUrl]
  );

  if (G.isNullable(instance)) return null;

  return {
    instance,
    loadImage,
    saveImage,
    flipImageX,
    flipImageY,
    rotateImage,
    applyFilter,
    resizeImage,
    loadAndResize
  };
};
