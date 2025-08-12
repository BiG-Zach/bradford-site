// GTM Event Tracking Utilities
export interface GTMEvent {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
}

export const trackEvent = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventData.event, {
      event_category: eventData.event_category,
      event_action: eventData.event_action,
      event_label: eventData.event_label,
      value: eventData.value,
    });
  }
};

// Predefined tracking events for homepage CTAs
export const GTM_EVENTS = {
  HERO_SCHEDULE_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'hero_schedule_consultation',
  },
  HERO_SEE_OPTIONS_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'hero_see_options',
  },
  HOW_IT_WORKS_CTA_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'how_it_works_start_step_1',
  },
  FAQ_CTA_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'faq_still_have_questions',
  },
  STICKY_CALL_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'sticky_call_now',
  },
  STICKY_QUOTE_CLICK: {
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'sticky_get_quote',
  },
  STATE_MAP_CLICK: {
    event: 'map_interaction',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'state_map_click',
  },
  TESTIMONIALS_VIEW: {
    event: 'testimonials_view',
    event_category: 'engagement',
    event_action: 'view',
    event_label: 'testimonials_carousel',
  },
} as const;

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}