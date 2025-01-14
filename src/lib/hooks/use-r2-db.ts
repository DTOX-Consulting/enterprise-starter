import { G } from '@mobily/ts-belt';
import { encode } from 'js-base64';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { fileToFormData } from '@/lib/utils/file/client';
import { api } from '@/trpc/react';

export type UseR2DBConfig = {
  bucket: string;
  dirPath: string;
  saveAsFile: boolean;
};

export type UploadResult = {
  success: boolean;
  error: string | null;
  data: {
    url: string;
    key: string;
    data?: unknown;
  } | null;
};

const useR2DB = <T extends string = string>(
  key: string,
  initialValue: T,
  config: UseR2DBConfig
): [T, (value: T) => Promise<void>, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const queryData = useMemo(
    () => ({
      name: key,
      bucket: config.bucket,
      dirPath: config.dirPath
    }),
    [key, config.bucket, config.dirPath]
  );

  const utils = api.useUtils();
  const { data: r2Data } = api.storage.retrieve.useQuery(queryData);
  const { mutateAsync: uploadBase64 } = api.storage.base64.useMutation();
  const { mutateAsync: uploadFormData } = api.storage.formData.useMutation();

  const createFormData = useCallback(
    (value: T) =>
      fileToFormData(new Blob([value]), key, {
        bucket: config.bucket,
        dirPath: config.dirPath
      }),
    [key, config.bucket, config.dirPath]
  );

  const createBase64 = useCallback(
    (value: string) => `data:application/json;base64,${encode(value)}`,
    []
  );

  useEffect(() => {
    const loadValue = () => {
      try {
        const result = r2Data;
        if (G.isNotNullable(result?.success) && G.isNotNullable(result.data)) {
          setStoredValue(result.data.data as unknown as T);
        }
      } catch (error) {
        console.error('Failed to load value from R2:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [r2Data]);

  const setValue = useCallback(
    async (value: T) => {
      if (isLoading) return;
      const prevValue = storedValue;

      try {
        setIsLoading(true);
        setStoredValue(value);
        let result: UploadResult;

        if (config.saveAsFile) {
          result = await uploadFormData(createFormData(value));
        } else {
          result = await uploadBase64({
            ...queryData,
            dataUrl: createBase64(value as unknown as string)
          });
        }

        if (!result.success) {
          console.error('Failed to save value to R2:', result.error);
          setStoredValue(prevValue);
        } else {
          await utils.storage.retrieve.invalidate(queryData);
        }
      } catch (error) {
        console.error('Failed to save value to R2:', error);
        setStoredValue(prevValue);
      } finally {
        setIsLoading(false);
      }
    },
    [
      isLoading,
      queryData,
      storedValue,
      uploadBase64,
      createBase64,
      uploadFormData,
      createFormData,
      config.saveAsFile,
      utils.storage.retrieve
    ]
  );

  return [storedValue, setValue, isLoading];
};

export default useR2DB;
