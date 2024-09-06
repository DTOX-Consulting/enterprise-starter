import { getWindow } from '@/lib/utils/dom';

import type { AnalyticsEvent, EventProperties } from '@/lib/analytics/events';

// Analytics service interface
export type AnalyticsService = {
  trackEvent(event: AnalyticsEvent, properties?: EventProperties): void;
  identify(userId: string, traits?: EventProperties): void;
  setUserProperties(properties: EventProperties): void;
  optOut(): void;
  optIn(): void;
  reset(): void;
  init(): void;
}

export type AnalyticsConfig = {
  token: string;
  debug?: boolean;
  [key: string]: unknown; // Allow for additional service-specific config options
}

export class AnalyticsManager implements AnalyticsService {
  private services = new Map<string, AnalyticsService>();

  private initialized = false;

  getService(name: string): AnalyticsService | undefined {
    return this.services.get(name);
  }

  addService(name: string, service: AnalyticsService) {
    this.services.set(name, service);
  }

  addServices(services: Record<string, AnalyticsService>) {
    Object.entries(services).forEach(([name, service]) => this.addService(name, service));
  }

  init() {
    if (this.initialized || !getWindow()) return;
    this.services.forEach((service) => service.init());
    this.initialized = true;
  }

  trackEvent(event: AnalyticsEvent, properties?: EventProperties) {
    this.services.forEach((service) => service.trackEvent(event, properties));
  }

  identify(userId: string, traits?: EventProperties) {
    this.services.forEach((service) => service.identify(userId, traits));
  }

  setUserProperties(properties: EventProperties) {
    this.services.forEach((service) => service.setUserProperties(properties));
  }

  optOut() {
    this.services.forEach((service) => service.optOut());
  }

  optIn() {
    this.services.forEach((service) => service.optIn());
  }

  reset() {
    this.services.forEach((service) => service.reset());
  }
}
