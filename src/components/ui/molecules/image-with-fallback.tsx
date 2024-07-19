'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import fallback from '@/assets/images/fallback.png';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
  imgKey: string | number;
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { imgKey, src, fallbackSrc = fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return <Image {...rest} key={imgKey} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />;
};
