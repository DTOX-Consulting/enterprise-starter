const imagePrompt = () =>
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
${ImageMarkdown}
`.trim();

const imagePostPrompt = () =>
  `
All sections must be displayed.
Always display the {image url} as markdown.
Replace all whitespaces in the {image url} with %20.
Do not display the {image url} in code block or quotes.
Ensure the word/character count is within the specified range.
`.trim();

const imageResponse = (withText: boolean, imageOnly: boolean) =>
  imageOnly
    ? `${ImageMarkdown}`
    : `
Here are the sections needed:
${
  withText
    ? `Text:
{text}
`
    : ''
}
Image Description:
{text description}

Image:
{image url}
`.trim();

const imageGenerationPrefixReplacer = (withText = true, imageOnly = false) => {
  return [imagePrompt(), imageResponse(withText, imageOnly), imagePostPrompt()].join('\n\n').trim();
};

export const ImageMarkdown = `
![Image](https://image.pollinations.ai/prompt/{description1},%20{description2},%20{description3}?width=1920&height=1080&nologo=true)
`.trim();

export const Image = imageGenerationPrefixReplacer(false);
export const ImageWithText = imageGenerationPrefixReplacer(true);
export const ImageOnly = imageGenerationPrefixReplacer(false, true);
