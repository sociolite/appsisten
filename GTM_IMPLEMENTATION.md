# Google Tag Manager (GTM) Implementation Guide

## Overview

Google Tag Manager (GTM) has been successfully implemented in the Appsisten landing page. GTM allows you to manage and deploy marketing tags (snippets of code or tracking pixels) without modifying the code.

**GTM Container ID:** `GTM-KF7V6FQS`

## What's Implemented

### 1. GTM Base Installation
- GTM script added to `index.html` in the `<head>` section
- GTM noscript fallback added to `<body>` for users with JavaScript disabled
- Automatic page view tracking on route changes

### 2. Utility Functions (`src/lib/gtm.ts`)

The following helper functions are available for tracking:

#### `gtmEvent(event: string, data?: Record<string, unknown>)`
Push any custom event to the dataLayer.

```typescript
import { gtmEvent } from '@/lib/gtm';

gtmEvent('custom_event_name', {
  custom_param: 'value'
});
```

#### `gtmPageView(path: string, title?: string)`
Track page views manually.

```typescript
import { gtmPageView } from '@/lib/gtm';

gtmPageView('/about', 'About Us');
```

#### `gtmTrackEvent(category: string, action: string, label?: string, value?: number)`
Track custom events with category, action, label, and value.

```typescript
import { gtmTrackEvent } from '@/lib/gtm';

gtmTrackEvent('Video', 'Play', 'Homepage Hero Video', 1);
```

#### `gtmTrackButtonClick(buttonName: string, location?: string)`
Track button clicks.

```typescript
import { gtmTrackButtonClick } from '@/lib/gtm';

gtmTrackButtonClick('Sign Up', 'Header');
```

#### `gtmTrackFormSubmit(formName: string, formId?: string)`
Track form submissions.

```typescript
import { gtmTrackFormSubmit } from '@/lib/gtm';

gtmTrackFormSubmit('Contact Form', 'contact-form-1');
```

#### `gtmTrackConversion(conversionName: string, value?: number)`
Track conversions/goals.

```typescript
import { gtmTrackConversion } from '@/lib/gtm';

gtmTrackConversion('Newsletter Signup', 1);
```

### 3. Automatic Page Tracking

The `useGTMPageTracking` hook is already integrated into `App.tsx` and automatically tracks page views whenever the route changes.

## Usage Examples

### Track a Button Click

```tsx
import { gtmTrackButtonClick } from '@/lib/gtm';

function CTAButton() {
  const handleClick = () => {
    gtmTrackButtonClick('Get Started', 'Hero Section');
    // Your other click logic
  };

  return <button onClick={handleClick}>Get Started</button>;
}
```

### Track a Form Submission

```tsx
import { gtmTrackFormSubmit } from '@/lib/gtm';

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gtmTrackFormSubmit('Contact Form', 'contact-form');
    // Your form submission logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Custom Events

```tsx
import { gtmTrackEvent } from '@/lib/gtm';

function VideoPlayer() {
  const handlePlay = () => {
    gtmTrackEvent('Video', 'Play', 'Product Demo', 1);
  };

  const handlePause = () => {
    gtmTrackEvent('Video', 'Pause', 'Product Demo');
  };

  return <video onPlay={handlePlay} onPause={handlePause}>...</video>;
}
```

### Track Conversions

```tsx
import { gtmTrackConversion } from '@/lib/gtm';

function NewsletterSignup() {
  const handleSuccess = () => {
    gtmTrackConversion('Newsletter Signup', 1);
    // Show success message
  };

  return <form onSubmit={handleSuccess}>...</form>;
}
```

## Setting Up Google Analytics in GTM

To connect Google Analytics to your GTM container:

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container (GTM-KF7V6FQS)
3. Click **Tags** → **New**
4. Click **Tag Configuration** → **Google Analytics: GA4 Configuration**
5. Enter your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
6. Set the trigger to **All Pages**
7. Save and publish the container

## Testing GTM Implementation

### 1. Using GTM Preview Mode
1. Go to your GTM container
2. Click **Preview** in the top right
3. Enter your website URL
4. Navigate through your site and verify events are firing

### 2. Using Browser Console
Open your browser console and check the dataLayer:

```javascript
console.log(window.dataLayer);
```

### 3. Using Google Tag Assistant
Install the [Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) to debug your tags.

## Best Practices

1. **Event Naming**: Use consistent, descriptive event names
2. **Data Layer**: Keep your dataLayer clean and organized
3. **Testing**: Always test in Preview mode before publishing
4. **Documentation**: Document all custom events and their purposes
5. **Privacy**: Ensure compliance with GDPR/privacy regulations

## Troubleshooting

### GTM not loading
- Check browser console for errors
- Verify the GTM container ID is correct
- Ensure no ad blockers are interfering

### Events not firing
- Check the dataLayer in console: `window.dataLayer`
- Verify triggers are set up correctly in GTM
- Use GTM Preview mode to debug

### Page views not tracking
- The `useGTMPageTracking` hook should be in a component inside `BrowserRouter`
- Check that the hook is being called on route changes

## Additional Resources

- [GTM Documentation](https://developers.google.com/tag-manager)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Best Practices](https://www.simoahava.com/analytics/google-tag-manager-best-practices/)

## Note About @next/third-parties

The `@next/third-parties` package in your `package.json` is designed for Next.js applications only and won't work with Vite/React. This implementation uses the standard GTM approach which is framework-agnostic and works perfectly with React/Vite.

You can safely remove `@next/third-parties` from your dependencies if you're not planning to migrate to Next.js:

```bash
npm uninstall @next/third-parties
```
