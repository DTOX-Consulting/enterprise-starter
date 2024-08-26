import {
  init,
  track,
  reset,
  people,
  identify,
  opt_in_tracking,
  opt_out_tracking
} from 'mixpanel-browser';

import { isLocalOrExternal } from '@/lib/utils/dom';

import type { AnalyticsEvent, EventProperties } from '@/lib/analytics/events';
import type { AnalyticsService, AnalyticsConfig } from '@/lib/analytics/manager';

const knownSpecialProperties = new Set([
  'email',
  'name',
  'first_name',
  'last_name',
  'phone',
  'avatar',
  'created',
  'last_seen'
]);

export class MixpanelAnalytics implements AnalyticsService {
  private isOptedOut = isLocalOrExternal() ?? false;

  constructor(private readonly config: AnalyticsConfig) {
    this.config = config;
  }

  init(): void {
    if (this.isOptedOut) return;
    const { token, debug, ...options } = this.config;
    init(token, { debug, ...options });
    track('app:loaded');
  }

  trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
    if (this.isOptedOut) return;
    const eventName = `${event.category}:${event.action}:${event.object}`;

    const fullProperties = {
      ...properties,
      module: event.module,
      feature: event.feature
    };

    track(eventName, fullProperties);
  }

  identify(userId: string, traits?: EventProperties): void {
    if (this.isOptedOut) return;
    identify(userId);
    if (traits) this.setUserProperties(traits);
  }

  setUserProperties(properties: EventProperties): void {
    if (this.isOptedOut) return;
    const processedProperties: Record<string, unknown> = {};

    Object.entries(properties).forEach(([key, value]) => {
      if (knownSpecialProperties.has(key)) {
        processedProperties[`$${key}`] = value;
      } else {
        processedProperties[key] = value;
      }
    });

    people.set(processedProperties);
  }

  optOut(): void {
    this.isOptedOut = true;
    opt_out_tracking();
  }

  optIn(): void {
    this.isOptedOut = false;
    opt_in_tracking();
  }

  reset(): void {
    reset();
  }
}
