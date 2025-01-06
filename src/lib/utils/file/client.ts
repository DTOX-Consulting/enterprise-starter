import { saveAs } from 'file-saver';
import JSZip from 'jszip';

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
) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return new File([blob], fileName, { type: mimeType, lastModified });
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
