import { createImageUpload } from 'novel/plugins';
import { toast } from 'sonner';

const onUpload = async (file: File) => {
  const promise = fetch('/api/upload', {
    method: 'POST',
    headers: {
      'content-type': file.type || 'application/octet-stream',
      'x-vercel-filename': file.name || 'image.png'
    },
    body: file
  });

  return new Promise((resolve, reject) => {
    const promiseFn = async () => {
      const res = await promise;

      // Successfully uploaded image
      if (res.status === 200) {
        const { url } = (await res.json()) as { url: string };
        // preload the image
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(url);
        };
        return url; // Return the URL
        // No blob store configured
      }

      if (res.status === 401) {
        resolve(file);
        throw new Error(
          '`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.'
        );
        // Unknown error
      }

      throw new Error('Error uploading image. Please try again.');
    };

    toast.promise(promiseFn(), {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully.',
      error: (err: Error) => {
        reject(err);
        return err.message;
      }
    });
  });
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
