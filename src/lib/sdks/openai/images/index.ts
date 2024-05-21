import type { ImageGenerateParams } from 'openai/resources/images';

export const availableImageStyles: NonNullable<ImageGenerateParams['style']>[] = [
  'natural',
  'vivid'
];
export const availableImageQualities: NonNullable<ImageGenerateParams['quality']>[] = [
  'hd',
  'standard'
];
export const availableFImageormats: NonNullable<ImageGenerateParams['response_format']>[] = [
  'url',
  'b64_json'
];

export const availableImageDallE2Sizes: NonNullable<ImageGenerateParams['size']>[] = [
  '256x256',
  '512x512',
  '1024x1024'
];

export const availableImageDallE3Sizes: NonNullable<ImageGenerateParams['size']>[] = [
  '1024x1024',
  '1792x1024',
  '1024x1792'
];

export const availableImageDallE2N: NonNullable<ImageGenerateParams['n']>[] = [1, 2, 4];
export const availableImageDallE3N: NonNullable<ImageGenerateParams['n']>[] = [1];
