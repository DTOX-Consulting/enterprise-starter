import { createImageUpload } from 'novel/plugins';
import { toast } from 'sonner';

const onUpload = async (file: File): Promise<string> => {
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'content-type': file?.type ?? 'application/octet-stream',
        'x-vercel-filename': file?.name ?? 'image.png'
      },
      body: file
    });

    if (res.status === 200) {
      const { url } = (await res.json()) as { url: string };

      const image = new Image();
      image.src = url;
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Image preload failed.'));
      });

      return url;
    }
    if (res.status === 401) {
      throw new Error(
        '`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.'
      );
    }
    throw new Error('Error uploading image. Please try again.');
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Unknown error occurred.');
    throw error;
  }
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.');
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).');
      return false;
    }
    return true;
  }
});
