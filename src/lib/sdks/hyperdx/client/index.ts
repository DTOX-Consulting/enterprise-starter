'use client';

import HyperDX from '@hyperdx/browser';
import { useEffect } from 'react';

import { url } from '@/app/metadata';
import { useAuth } from '@/lib/hooks/use-auth';
import { config } from '@/lib/sdks/hyperdx/client/config';
import { isLocalHost } from '@/lib/utils/dom';

import type { SessionUser } from '@/lib/sdks/kinde/api/session';

const domain = url.replace(/https?:\/\//, '');
const tracePropagationTargets = [new RegExp(domain, 'i')];

export const init = () =>
  HyperDX.init({
    debug: false,
    consoleCapture: true,
    apiKey: config.apiKey,
    service: config.service,
    tracePropagationTargets,
    advancedNetworkCapture: false
  });

export const identify = (user: SessionUser) =>
  HyperDX.setGlobalAttributes({
    userEmail: user.email,
    userName: user.name,
    userId: user.id
  });

export const useHyperDxIdentify = () => {
  const { user } = useAuth();
  useEffect(() => (!isLocalHost() ? init() : undefined), []);
  useEffect(() => (shouldRun(user) ? identify(user) : undefined), [user]);
};

const shouldRun = (user?: SessionUser): user is SessionUser => {
  const hasUser = !!user?.email;
  return hasUser && !isLocalHost();
};
