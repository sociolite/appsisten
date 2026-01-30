/**
 * Google Tag Manager Utilities
 *
 * This file provides helper functions for tracking events with Google Tag Manager.
 * GTM is already initialized in index.html with container ID: GTM-KF7V6FQS
 */

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push an event to the GTM dataLayer
 * @param event - The event name
 * @param data - Additional event data
 */
export const gtmEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

/**
 * Track page views
 * @param path - The page path
 * @param title - The page title
 */
export const gtmPageView = (path: string, title?: string) => {
  gtmEvent('page_view', {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track custom events
 * @param category - Event category
 * @param action - Event action
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export const gtmTrackEvent = (category: string, action: string, label?: string, value?: number) => {
  gtmEvent('custom_event', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  });
};

/**
 * Track button clicks
 * @param buttonName - Name of the button clicked
 * @param location - Location/context where the button was clicked
 */
export const gtmTrackButtonClick = (buttonName: string, location?: string) => {
  gtmEvent('button_click', {
    button_name: buttonName,
    button_location: location,
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param formId - ID of the form (optional)
 */
export const gtmTrackFormSubmit = (formName: string, formId?: string) => {
  gtmEvent('form_submit', {
    form_name: formName,
    form_id: formId,
  });
};

/**
 * Track conversions/goals
 * @param conversionName - Name of the conversion
 * @param value - Conversion value (optional)
 */
export const gtmTrackConversion = (conversionName: string, value?: number) => {
  gtmEvent('conversion', {
    conversion_name: conversionName,
    conversion_value: value,
  });
};
