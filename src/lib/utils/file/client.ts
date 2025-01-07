import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import { generateUUID } from '@/lib/utils/id';

export const fileToBase64 = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error as unknown as Error);
  });

export const base64ToFile = (
  base64: string,
  fileName: string,
  mimeType: string,
  lastModified: number
): File => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return new File([blob], fileName, { type: mimeType, lastModified });
};

export const urlToFile = async (url: string, name?: string, cors = false): Promise<File> => {
  const _url = cors ? `https://corsproxy.io/?${encodeURIComponent(url)}` : url;

  const response = await fetch(_url);
  const blob = await response.blob();

  const filename = name ?? url.split('/').pop() ?? 'file';
  return new File([blob], filename, { type: blob.type });
};

export const downloadFile = (file: File | Blob, fileName: string) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');

  a.href = url;
  a.rel = 'noopener';
  a.download = fileName;
  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

type ZipFileFn = (zip: JSZip) => void | Promise<void>;

export const zipFile = async (fn: ZipFileFn) => {
  const zip = new JSZip();
  await fn(zip);

  const [base64, blob] = await Promise.all([
    zip.generateAsync({ type: 'base64' }),
    zip.generateAsync({ type: 'blob' })
  ]);

  return { blob, base64 };
};

export const downloadZip = async (fn: ZipFileFn, fileName: string) => {
  const { blob } = await zipFile(fn);
  saveAs(blob, fileName);
};

export const fileToFormData = (
  file: File | Blob,
  name?: string,
  otherData?: Record<string, string>
) => {
  const uuid = generateUUID();
  const fileName = (name ?? file.name) ? `${uuid}-${file.name}` : `${uuid}.${file.type}`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', fileName);

  Object.entries(otherData ?? {}).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};
