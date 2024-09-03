export type ImageUrlParams = {
  seed?: string;
  width?: string;
  height?: string;
  enhance?: boolean;
  showLogo?: boolean;
  description1: string;
  description2: string;
  description3: string;
  model?: 'flux' | 'flux-realism' | 'flux-anime' | 'flux-3d' | 'turbo';
};

type ImageResponseType = 'imageOnly' | 'withText';

export const generateImageUrl = ({
  description1,
  description2,
  description3,
  seed = '-1',
  model = 'flux',
  enhance = true,
  width = '1920',
  height = '1080',
  showLogo = false
}: ImageUrlParams) => {
  const url = new URL('https://image.pollinations.ai/prompt/');
  url.pathname += `${encodeURIComponent(description1)},${encodeURIComponent(description2)},${encodeURIComponent(description3)}`;

  url.searchParams.append('seed', seed);
  url.searchParams.append('model', model);
  url.searchParams.append('width', width);
  url.searchParams.append('height', height);
  url.searchParams.append('nologo', String(!showLogo));
  url.searchParams.append('enhance', String(enhance));

  return url.toString();
};

export const generateImageMarkdown = (
  params: ImageUrlParams = {
    description1: '{description1}',
    description2: '{description2}',
    description3: '{description3}'
  }
) => {
  return `![Image](${generateImageUrl(params)})`;
};

export const generateImagePromptBody = () =>
  `
Now act as a Pollinations image generator.
Use the {text description} of the accompanying image and convert it into a format readable by Pollinations.
Combine the descriptors based on my image request to complete the URL.

Do not ask me for additional details.
Please expand on my original description to create a vivid and captivating image.

Complete the following steps:
1. Fill in the following descriptors based on my request. descriptions will be extremely concise:
Expanded description = {description1}
Visual style = {description2}
Artistic style = {description3}

2. Display the following {image url} as markdown replacing the encoded descriptions in the
${generateImageMarkdown()}
`.trim();

const generateImagePromptResponse = (response?: ImageResponseType) => {
  if (response === 'imageOnly') {
    return generateImageMarkdown();
  }

  const image = 'Image:\n{image url}';
  const description = 'Image Description:\n{text description}';
  const text = response === 'withText' ? 'Text:\n{text}\n' : '';

  return ['Here are the sections needed:', text, description, image].join('\n');
};

const generateImagePromptPostBody = () =>
  `
All sections must be displayed.
Always display the {image url} as markdown.
Replace all white spaces in the {image url} with %20.
Do not display the {image url} in code block or quotes.
Ensure the word/character count is within the specified range.
`.trim();

export const generateImagePrompt = (responseType?: ImageResponseType) => {
  return [
    generateImagePromptBody(),
    generateImagePromptResponse(responseType),
    generateImagePromptPostBody()
  ]
    .join('\n\n')
    .trim();
};
