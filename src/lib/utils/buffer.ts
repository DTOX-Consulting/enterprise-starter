import { type ReadStream, createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';

export const bufferToString = (buffer: Buffer): string => buffer.toString('utf-8');

export const bufferSize = (buffer: Buffer): string => {
  const bufferSizeBytes = Buffer.byteLength(buffer);
  const bufferSizeMB = bufferSizeBytes / (1024 * 1024);
  return `${bufferSizeMB.toFixed(2)} MB`;
};

export const bufferToStreamFromTmp = async (buffer: Buffer): Promise<ReadStream> => {
  const filePath = await bufferToTmpDir(buffer, 'temp-file');
  return createReadStream(filePath, {
    highWaterMark: 1024 * 1024,
    emitClose: true,
    autoClose: true
  });
};

export const bufferToStreamPassThrough = async (buffer: Buffer): Promise<PassThrough> => {
  await Promise.resolve();
  const stream = new PassThrough();
  stream.end(buffer);
  return stream;
};

export const bufferToStream = async (
  buffer: Buffer | string,
  createTempFile = false
): Promise<ReadStream | PassThrough | string> => {
  if (typeof buffer === 'string') return buffer;
  return createTempFile ? bufferToStreamFromTmp(buffer) : bufferToStreamPassThrough(buffer);
};

export const bufferToTmpDir = async (buffer: Buffer, _fileName: string, extension = 'pdf') => {
  const fileName = ensureFileExtension(_fileName, extension);
  const filePath = join(tmpdir(), fileName);
  await writeFile(filePath, buffer);
  return filePath;
};

export const ensureFileExtension = (_fileName: string, ext: string): string => {
  const [fileName] = _fileName.split('.');
  return `${fileName}.${ext}`;
};
