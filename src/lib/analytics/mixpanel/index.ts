/* eslint-disable import-x/no-named-as-default-member */
import mixpanel from 'mixpanel-browser';

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
  private isOptedOut = isLocalOrExternal() || false;

  constructor(private readonly config: AnalyticsConfig) {
    this.config = config;
  }

  init(): void {
    if (this.isOptedOut) return;
    const { token, debug, ...options } = this.config;
    mixpanel.init(token, { debug, ...options });
    mixpanel.track('app:loaded');
  }

  trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
    if (this.isOptedOut) return;
    const eventName = `${event.category}:${event.action}:${event.object}`;

    const fullProperties = {
      ...properties,
      module: event.module,
      feature: event.feature
    };

    mixpanel.track(eventName, fullProperties);
  }

  identify(userId: string, traits?: EventProperties): void {
    if (this.isOptedOut) return;
    mixpanel.identify(userId);
    if (traits) this.setUserProperties(traits);
  }

  setUserProperties(properties: EventProperties): void {
    if (this.isOptedOut) return;
    const processedProperties: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(properties)) {
      if (knownSpecialProperties.has(key)) {
        processedProperties[`$${key}`] = value;
      } else {
        processedProperties[key] = value;
      }
    }

    mixpanel.people.set(processedProperties);
  }

  optOut(): void {
    this.isOptedOut = true;
    mixpanel.opt_out_tracking();
  }

  optIn(): void {
    this.isOptedOut = false;
    mixpanel.opt_in_tracking();
  }

  reset(): void {
    mixpanel.reset();
  }
}

/* eslint-enable import-x/no-named-as-default-member */
