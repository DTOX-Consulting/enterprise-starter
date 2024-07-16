export const downloadResponse = async (response: Response, prompt: string, ext = 'pdf') => {
  const cd = response.headers.get('Content-Disposition');
  const fileName = cd?.split('filename=')[1] ?? `${prompt}.${ext}`;

  const url = await getBlobURL(response);
  const a = document.createElement('a');

  a.href = url;
  a.rel = 'noopener';
  a.download = fileName;
  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const downloadUrl = async (url: string, prompt: string, ext = 'png', cors = false) => {
  const _url = cors ? `https://corsproxy.io/?${encodeURIComponent(url)}` : url;
  const response = await fetch(_url);
  return downloadResponse(response, prompt, ext);
};

export const getBlobURL = async (response: Response) => {
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const getViewUrl = async (url: string) => {
  const response = await fetch(url);
  return getBlobURL(response);
};
