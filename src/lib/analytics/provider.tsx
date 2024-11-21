'use client';

import { G } from '@mobily/ts-belt';
import { usePathname } from 'next/navigation';
import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { useNavigation } from '@/config/navigation/use-navigation';
import { AnalyticsManager } from '@/lib/analytics/manager';
import { services } from '@/lib/analytics/services';
import { useAuth } from '@/lib/hooks/use-auth';

import type { GenericObject } from '@/lib/utils/object';

export const analyticsManager = new AnalyticsManager();
analyticsManager.addServices(services);

// Create a context for the provider
export const AnalyticsContext = createContext<AnalyticsManager | null>(null);

// Create a custom provider component
export function AnalyticsProvider({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const { user, subscription } = useAuth();
  const [identified, setIdentified] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    analyticsManager.init();
  }, [initialized]);

  useEffect(() => {
    if (!initialized || identified || G.isNullable(user?.id)) return;
    setIdentified(true);

    analyticsManager.identify(user.id, {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      avatar: user.image ?? null,
      subscription: subscription?.tier ?? 'none'
    });
  }, [user, subscription, initialized, identified]);

  if (!initialized) {
    // Render a loading state or null while initializing
    return null;
  }

  // Render the children components once initialized
  return (
    <AnalyticsContext.Provider value={analyticsManager}>
      <AnalyticsPageViewTracker />
      {children}
    </AnalyticsContext.Provider>
  );
}

export function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const analytics = useAnalytics();
  const { path } = useNavigation();

  useEffect(() => {
    if (!analytics['initialized']) return;
    analytics.trackEvent(
      {
        category: 'page_view',
        action: 'visit',
        object: 'page'
      },
      {
        pathname,
        ...Object.entries(path).reduce((acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          }
          return acc;
        }, {} as GenericObject)
      }
    );
  }, [path, pathname, analytics]);

  return null;
}

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  return analytics;
};
