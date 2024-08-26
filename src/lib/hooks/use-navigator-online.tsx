import { type ReactNode, useCallback, useEffect, useState } from 'react';

interface IState {
  startOnline?: boolean;
  whenOnline?: ReactNode;
  whenOffline?: ReactNode;
}

const defaultState: IState = {
  startOnline: true,
  whenOnline: 'online',
  whenOffline: 'offline'
};

export function useNavigatorOnline(state: IState = {}) {
  const { whenOnline, whenOffline, startOnline } = { ...defaultState, ...state };
  const [previous, setPrevious] = useState<boolean>();
  const [value, setValue] = useState(startOnline);

  const handleOnlineStatus = useCallback(() => {
    setValue(window.navigator.onLine);
    setPrevious(value);
  }, [value]);

  useEffect(() => {
    if (window.navigator.onLine !== value) {
      return handleOnlineStatus();
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [value, handleOnlineStatus]);

  const isOnline = value === true;
  const isOffline = value === false;
  const status = isOnline ? whenOnline : whenOffline;
  const isReconnected = previous === false && value === true;

  return { status, previous, isOnline, isOffline, isReconnected };
}
