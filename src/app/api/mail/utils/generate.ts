export const generateEmailBody = (
  emailContent: string,
  {
    url,
    documentBody,
    documentTitle
  }: {
    url: string;
    documentBody: string;
    documentTitle: string;
  }
) => {
  return emailContent
    .replace(/{{ \$url }}/gim, url)
    .replace(/{{ \$documentBody }}/gim, documentBody)
    .replace(/{{ \$documentTitle }}/gim, documentTitle);
};
