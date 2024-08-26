// Event categories
type EventCategory =
  | 'organization'
  | 'business'
  | 'feature'
  | 'user_meta'
  | 'notification'
  | 'history'
  | 'upgrade'
  | 'page_view';

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
  | 'organization'
  | 'business'
  | 'feature'
  | 'notification'
  | 'user_meta'
  | 'history'
  | 'settings'
  | 'selector'
  | 'module'
  | 'slug'
  | 'tab'
  | 'page'
  | 'pulse_score'
  | 'ai_suggestion'
  | 'image_style'
  | 'image_color'
  | 'pricing_page'
  | 'pricing_option'
  | 'notification_icon'
  | 'notification_item'
  | 'all_notifications';

// Main analytics event interface
export interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  object: EventObject;
  module?: string;
  feature?: string;
}

// Generic properties type
export type EventProperties = Record<string, string | number | boolean | Date | null>;
