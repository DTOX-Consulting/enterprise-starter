import { getWindow, isLocalOrExternal } from '@/lib/utils/dom';
import { noopSync } from '@/lib/utils/function';

import type { AnalyticsEvent, EventProperties } from '@/lib/analytics/events';
import type { AnalyticsService, AnalyticsConfig } from '@/lib/analytics/manager';

export function getGtag() {
  if (!getWindow()) return noopSync;

  function gtag(...args: unknown[]) {
    const dataLayer: unknown[] = window.dataLayer ?? ([] as unknown[]);
    (window as { dataLayer?: unknown[] }).dataLayer = dataLayer;
    dataLayer.push(args);
  }

  gtag('js', new Date());
  return gtag;
}

export class GoogleAnalytics implements AnalyticsService {
  private isOptedOut = isLocalOrExternal();
  private gtag = getGtag();

  constructor(private readonly config: AnalyticsConfig) {
    this.config = config;
  }

  init(): void {
    if (this.isOptedOut) return;
    const { token, debug, ...options } = this.config;
    this.gtag('config', token, { debug_mode: debug, ...options });
  }

  trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
    if (this.isOptedOut) return;
    this.gtag('event', `${event.category}:${event.action}:${event.object}`, {
      ...properties,
      module: event.module,
      feature: event.feature
    });
  }

  identify(userId: string, traits?: EventProperties): void {
    if (this.isOptedOut) return;
    this.gtag('set', 'user_id', userId);
    if (traits) {
      this.setUserProperties(traits);
    }
  }

  setUserProperties(properties: EventProperties): void {
    if (this.isOptedOut) return;
    this.gtag('set', 'user_properties', properties);
  }

  reset(): void {
    if (this.isOptedOut) return;
    this.gtag('set', 'user_id', null);
    this.gtag('set', 'user_properties', null);
  }

  optOut(): void {
    this.isOptedOut = true;
    this.gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied'
    });
  }

  optIn(): void {
    this.isOptedOut = false;
    this.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted'
    });
  }
}
