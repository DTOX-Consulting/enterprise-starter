// Event categories
type EventCategory = 'feature' | 'user_meta' | 'notification' | 'upgrade' | 'page_view';

// Event actions
type EventAction =
  | 'create'
  | 'visit'
  | 'delete'
  | 'update'
  | 'select'
  | 'view'
  | 'share'
  | 'transfer'
  | 'click'
  | 'toggle'
  | 'change'
  | 'revert'
  | 'submit'
  | 'generate'
  | 'read';

// Event objects
type EventObject =
  | 'feature'
  | 'notification'
  | 'user_meta'
  | 'settings'
  | 'selector'
  | 'slug'
  | 'tab'
  | 'page'
  | 'notification_icon'
  | 'notification_item'
  | 'all_notifications';

// Main analytics event interface
export type AnalyticsEvent = {
  category: EventCategory;
  action: EventAction;
  object: EventObject;
  module?: string;
  feature?: string;
};

// Generic properties type
export type EventProperties = Record<string, string | number | boolean | Date | null>;
