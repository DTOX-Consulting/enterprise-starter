import { G } from '@mobily/ts-belt';
import { useCallback, useEffect, useState } from 'react';

import { api } from '@/trpc/react';

export type UseRedisDBConfig = {
  prefix?: string;
  ttl?: number; // Time to live in seconds
};

const useRedisDB = <T extends string = string>(
  key: string,
  initialValue: T,
  config: UseRedisDBConfig = {}
): [T, (value: T) => Promise<void>, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const fullKey = G.isNotNullable(config.prefix) ? `${config.prefix}:${key}` : key;

  const utils = api.useUtils();
  const { mutateAsync: setRedisValue } = api.redis.set.useMutation();
  const { data: redisData } = api.redis.get.useQuery({ key: fullKey });

  useEffect(() => {
    const loadValue = () => {
      try {
        if (G.isNotNullable(redisData?.success) && G.isNotNullable(redisData.data)) {
          setStoredValue(redisData.data as T);
        }
      } catch (error) {
        console.error('Failed to load value from Redis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [redisData]);

  const setValue = useCallback(
    async (value: T) => {
      try {
        setIsLoading(true);
        setStoredValue(value);

        const result = await setRedisValue({
          key: fullKey,
          value: value as string,
          ttl: config.ttl
        });

        if (!result.success) {
          console.error('Failed to save value to Redis:', result.error);
          // Revert on failure
          setStoredValue(storedValue);
        } else {
          // Invalidate the query to trigger a refresh
          await utils.redis.get.invalidate({ key: fullKey });
        }
      } catch (error) {
        console.error('Failed to save value to Redis:', error);
        // Revert on error
        setStoredValue(storedValue);
      } finally {
        setIsLoading(false);
      }
    },
    [fullKey, storedValue, setRedisValue, config.ttl, utils.redis.get]
  );

  return [storedValue, setValue, isLoading];
};

export default useRedisDB;
