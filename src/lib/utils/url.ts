import { getDocument } from '@/lib/utils/dom';

const createAndClickAnchor = (url: string, fileName: string) => {
  const document = getDocument();
  if (!document) {
    throw new Error('Document not found');
  }

  const a = document.createElement('a');
  a.href = url;
  a.rel = 'noopener';
  a.download = fileName;
  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const getBlobURL = async (response: Response | Blob) => {
  const blob = response instanceof Response ? await response.blob() : response;
  return URL.createObjectURL(blob);
};

const createObjectURLAndDownload = (blobOrBlobUrl: Blob | File | string, fileName: string) => {
  const url =
    typeof blobOrBlobUrl === 'string' ? blobOrBlobUrl : URL.createObjectURL(blobOrBlobUrl);
  createAndClickAnchor(url, fileName);
};

const downloadUrlProxy = async (url: string, fileName: string, ext = 'png', cors = false) => {
  const _url = cors ? `https://corsproxy.io/?${encodeURIComponent(url)}` : url;
  const response = await fetch(_url);
  return downloadResponse(response, fileName, ext);
};

const downloadBlob = (blobOrBlobUrl: Blob | File | string, fileName: string, ext = 'pdf') =>
  createObjectURLAndDownload(blobOrBlobUrl, `${fileName}.${ext}`);

export const downloadResponse = async (response: Response, fileName: string, ext = 'pdf') => {
  const cd = response.headers.get('Content-Disposition');
  const finalFileName = cd?.split('filename=')[1] ?? `${fileName}.${ext}`;
  const url = await getBlobURL(response);
  createAndClickAnchor(url, finalFileName);
};

export const downloadUrl = async (url: string, fileName: string, ext = 'png', cors = false) => {
  if (url.startsWith('blob:')) {
    downloadBlob(url, fileName, ext);
  } else if (url.startsWith('data:')) {
    createAndClickAnchor(url, fileName);
  } else {
    return downloadUrlProxy(url, fileName, ext, cors);
  }
};

export const parseDataURL = (dataURL: string) => {
  const matches = /^data:(.+);base64,(.+)$/.exec(dataURL);

  if (!matches) {
    throw new Error('Invalid data URL');
  }

  return {
    mimeType: matches[1],
    data: matches[2]
  };
};
