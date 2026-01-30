/**
 * Google Analytics 4 (GA4) Configuration
 *
 * This file provides GA4 initialization and tracking utilities using react-ga4.
 * Measurement ID: G-CXD0JV8VPF
 */

import ReactGA from 'react-ga4';

// GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-CXD0JV8VPF';

/**
 * Initialize Google Analytics 4
 * Call this once when your app starts
 */
export const initGA4 = () => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        // Optional: Add custom configuration
        // cookieFlags: 'SameSite=None;Secure',
      },
      gtagOptions: {
        // Optional: Add custom gtag configuration
        // send_page_view: false, // Disable automatic page view if you want manual control
      },
    });

    console.log('GA4 initialized with ID:', GA_MEASUREMENT_ID);
  }
};

/**
 * Track page views
 * @param path - The page path
 * @param title - The page title (optional)
 */
export const ga4PageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

/**
 * Track custom events
 * @param category - Event category
 * @param action - Event action
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export const ga4Event = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Track button clicks
 * @param buttonName - Name of the button
 * @param location - Location where the button is (optional)
 */
export const ga4TrackButtonClick = (buttonName: string, location?: string) => {
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: location ? `${buttonName} - ${location}` : buttonName,
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param formId - ID of the form (optional)
 */
export const ga4TrackFormSubmit = (formName: string, formId?: string) => {
  ReactGA.event({
    category: 'Form',
    action: 'Submit',
    label: formId ? `${formName} (${formId})` : formName,
  });
};

/**
 * Track conversions/goals
 * @param conversionName - Name of the conversion
 * @param value - Conversion value (optional)
 * @param currency - Currency code (optional, default: IDR)
 */
export const ga4TrackConversion = (
  conversionName: string,
  value?: number,
  currency: string = 'IDR'
) => {
  ReactGA.event({
    category: 'Conversion',
    action: conversionName,
    value,
    // For enhanced ecommerce tracking
    ...(value && { currency }),
  });
};

/**
 * Track outbound links
 * @param url - The destination URL
 * @param label - Optional label for the link
 */
export const ga4TrackOutboundLink = (url: string, label?: string) => {
  ReactGA.event({
    category: 'Outbound Link',
    action: 'Click',
    label: label || url,
  });
};

/**
 * Track file downloads
 * @param fileName - Name of the file being downloaded
 * @param fileType - Type/extension of the file (optional)
 */
export const ga4TrackDownload = (fileName: string, fileType?: string) => {
  ReactGA.event({
    category: 'Download',
    action: fileType || 'File',
    label: fileName,
  });
};

/**
 * Track video interactions
 * @param action - Video action (play, pause, complete, etc.)
 * @param videoName - Name of the video
 * @param progress - Progress percentage (optional)
 */
export const ga4TrackVideo = (
  action: 'play' | 'pause' | 'complete' | 'progress',
  videoName: string,
  progress?: number
) => {
  ReactGA.event({
    category: 'Video',
    action: action.charAt(0).toUpperCase() + action.slice(1),
    label: videoName,
    value: progress,
  });
};

/**
 * Set user properties
 * @param properties - User properties to set
 */
export const ga4SetUserProperties = (properties: Record<string, string>) => {
  ReactGA.set(properties);
};

/**
 * Track exceptions/errors
 * @param description - Error description
 * @param fatal - Whether the error is fatal (optional)
 */
export const ga4TrackException = (description: string, fatal: boolean = false) => {
  ReactGA.event({
    category: 'Exception',
    action: fatal ? 'Fatal Error' : 'Error',
    label: description,
  });
};
