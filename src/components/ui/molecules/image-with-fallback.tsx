'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import fallbackImage from '@/assets/images/fallback.png';

type ImageWithFallbackProps = {
  fallbackSrc?: string;
  imgKey: string | number;
} & ImageProps;

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { imgKey, src, fallbackSrc = fallbackImage, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return <Image key={imgKey} {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />;
};
