# Google Analytics 4 (GA4) Implementation Guide

## Overview

Google Analytics 4 has been successfully implemented in the Appsisten landing page using `react-ga4`. GA4 provides advanced analytics and insights about user behavior on your website.

**GA4 Measurement ID:** `G-CXD0JV8VPF`

## What's Implemented

### 1. GA4 Base Installation
- ✅ Installed `react-ga4` package
- ✅ GA4 initialized in `App.tsx` on app startup
- ✅ Automatic page view tracking on route changes
- ✅ Works seamlessly with GTM (both can run simultaneously)

### 2. Utility Functions (`src/lib/ga4.ts`)

The following helper functions are available for tracking:

#### `initGA4()`

Initialize Google Analytics 4. This is automatically called in `App.tsx`.

```typescript
import { initGA4 } from '@/lib/ga4';

initGA4();
```

#### `ga4PageView(path: string, title?: string)`

Track page views manually.

```typescript
import { ga4PageView } from '@/lib/ga4';

ga4PageView('/about', 'About Us');
```

#### `ga4Event(category: string, action: string, label?: string, value?: number)`

Track custom events with category, action, label, and value.

```typescript
import { ga4Event } from '@/lib/ga4';

ga4Event('Video', 'Play', 'Homepage Hero Video', 1);
```

#### `ga4TrackButtonClick(buttonName: string, location?: string)`

Track button clicks.

```typescript
import { ga4TrackButtonClick } from '@/lib/ga4';

ga4TrackButtonClick('Sign Up', 'Header');
```

#### `ga4TrackFormSubmit(formName: string, formId?: string)`

Track form submissions.

```typescript
import { ga4TrackFormSubmit } from '@/lib/ga4';

ga4TrackFormSubmit('Contact Form', 'contact-form-1');
```

#### `ga4TrackConversion(conversionName: string, value?: number, currency?: string)`

Track conversions/goals with optional value and currency.

```typescript
import { ga4TrackConversion } from '@/lib/ga4';

ga4TrackConversion('Newsletter Signup', 1, 'IDR');
```

#### `ga4TrackOutboundLink(url: string, label?: string)`

Track clicks on external links.

```typescript
import { ga4TrackOutboundLink } from '@/lib/ga4';

ga4TrackOutboundLink('https://partner.com', 'Partner Website');
```

#### `ga4TrackDownload(fileName: string, fileType?: string)`

Track file downloads.

```typescript
import { ga4TrackDownload } from '@/lib/ga4';

ga4TrackDownload('product-brochure.pdf', 'PDF');
```

#### `ga4TrackVideo(action, videoName: string, progress?: number)`

Track video interactions (play, pause, complete, progress).

```typescript
import { ga4TrackVideo } from '@/lib/ga4';

ga4TrackVideo('play', 'Product Demo Video');
ga4TrackVideo('progress', 'Product Demo Video', 50); // 50% progress
ga4TrackVideo('complete', 'Product Demo Video');
```

#### `ga4SetUserProperties(properties: Record<string, string>)`

Set user properties for segmentation.

```typescript
import { ga4SetUserProperties } from '@/lib/ga4';

ga4SetUserProperties({
  user_type: 'premium',
  industry: 'technology',
});
```

#### `ga4TrackException(description: string, fatal?: boolean)`

Track errors and exceptions.

```typescript
import { ga4TrackException } from '@/lib/ga4';

ga4TrackException('API call failed', false);
ga4TrackException('Critical error', true);
```

### 3. Automatic Page Tracking

The `useGA4PageTracking` hook is integrated into `App.tsx` and automatically tracks page views whenever the route changes.

## Usage Examples

### Track a Button Click

```tsx
import { ga4TrackButtonClick } from '@/lib/ga4';

function CTAButton() {
  const handleClick = () => {
    ga4TrackButtonClick('Get Started', 'Hero Section');
    // Your other click logic
  };

  return <button onClick={handleClick}>Get Started</button>;
}
```

### Track a Form Submission

```tsx
import { ga4TrackFormSubmit } from '@/lib/ga4';

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ga4TrackFormSubmit('Contact Form', 'contact-form');
    // Your form submission logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Custom Events

```tsx
import { ga4Event } from '@/lib/ga4';

function VideoPlayer() {
  const handlePlay = () => {
    ga4Event('Video', 'Play', 'Product Demo', 1);
  };

  const handlePause = () => {
    ga4Event('Video', 'Pause', 'Product Demo');
  };

  return <video onPlay={handlePlay} onPause={handlePause}>...</video>;
}
```

### Track Conversions with Value

```tsx
import { ga4TrackConversion } from '@/lib/ga4';

function PricingPage() {
  const handlePurchase = (plan: string, price: number) => {
    ga4TrackConversion(`Purchase - ${plan}`, price, 'IDR');
    // Process purchase
  };

  return (
    <button onClick={() => handlePurchase('Premium', 500000)}>
      Buy Premium
    </button>
  );
}
```

### Track Outbound Links

```tsx
import { ga4TrackOutboundLink } from '@/lib/ga4';

function ExternalLink() {
  const handleClick = () => {
    ga4TrackOutboundLink('https://partner.com', 'Partner Website');
  };

  return (
    <a 
      href="https://partner.com" 
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit Partner
    </a>
  );
}
```

### Track Downloads

```tsx
import { ga4TrackDownload } from '@/lib/ga4';

function DownloadButton() {
  const handleDownload = () => {
    ga4TrackDownload('company-brochure.pdf', 'PDF');
  };

  return (
    <a 
      href="/downloads/brochure.pdf" 
      onClick={handleDownload}
      download
    >
      Download Brochure
    </a>
  );
}
```

### Track Video Interactions

```tsx
import { ga4TrackVideo } from '@/lib/ga4';
import { useRef } from 'react';

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    ga4TrackVideo('play', 'Product Demo');
  };

  const handlePause = () => {
    ga4TrackVideo('pause', 'Product Demo');
  };

  const handleEnded = () => {
    ga4TrackVideo('complete', 'Product Demo');
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      // Track at 25%, 50%, 75% milestones
      if ([25, 50, 75].includes(Math.floor(progress))) {
        ga4TrackVideo('progress', 'Product Demo', Math.floor(progress));
      }
    }
  };

  return (
    <video
      ref={videoRef}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onTimeUpdate={handleTimeUpdate}
    >
      <source src="/videos/demo.mp4" type="video/mp4" />
    </video>
  );
}
```

### Set User Properties

```tsx
import { ga4SetUserProperties } from '@/lib/ga4';
import { useEffect } from 'react';

function UserProfile({ user }) {
  useEffect(() => {
    if (user) {
      ga4SetUserProperties({
        user_type: user.subscriptionType,
        industry: user.industry,
        company_size: user.companySize,
      });
    }
  }, [user]);

  return <div>...</div>;
}
```

### Track Errors

```tsx
import { ga4TrackException } from '@/lib/ga4';

function DataFetcher() {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('API call failed');
    } catch (error) {
      ga4TrackException(`API Error: ${error.message}`, false);
      console.error(error);
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}
```

## Integration with GTM

GA4 and GTM work together seamlessly:

- **GTM** handles tag management and can trigger multiple analytics platforms
- **GA4** provides direct analytics tracking with `react-ga4`
- Both track page views automatically
- You can use both tracking methods simultaneously

## Testing GA4 Implementation

### 1. Check Real-Time Reports

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (G-CXD0JV8VPF)
3. Navigate to **Reports** → **Real-time**
4. Interact with your site and watch events appear in real-time

### 2. Using Browser Console

Open your browser console and check for GA4 initialization:

```javascript
// You should see "GA4 initialized with ID: G-CXD0JV8VPF" in console
```

### 3. Using GA Debugger Extension

Install the [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) to see detailed GA4 events.

### 4. Using DebugView in GA4

1. Go to your GA4 property
2. Navigate to **Configure** → **DebugView**
3. Add `?debug_mode=true` to your URL
4. See events in real-time with detailed parameters

## Best Practices

### 1. Event Naming Conventions

Use consistent, descriptive names:
- **Good**: `ga4TrackButtonClick('Sign Up CTA', 'Hero Section')`
- **Bad**: `ga4TrackButtonClick('btn1', 'top')`

### 2. Track Meaningful Events

Focus on events that provide business value:
- User engagement (video plays, feature clicks)
- Conversions (signups, purchases, downloads)
- User journey (form starts, form completions)

### 3. Use Custom Dimensions

Set user properties for better segmentation:

```typescript
ga4SetUserProperties({
  user_type: 'premium',
  industry: 'technology',
  company_size: '50-100',
});
```

### 4. Track Errors

Monitor application health:

```typescript
window.addEventListener('error', (event) => {
  ga4TrackException(event.message, true);
});
```

### 5. Respect Privacy

- Implement cookie consent
- Don't track PII (Personally Identifiable Information)
- Follow GDPR/privacy regulations

## Common Use Cases for Appsisten

### Track Feature Interest

```tsx
import { ga4Event } from '@/lib/ga4';

function FeatureCard({ featureName }) {
  const handleLearnMore = () => {
    ga4Event('Feature Interest', 'Learn More', featureName);
  };

  return <button onClick={handleLearnMore}>Learn More</button>;
}
```

### Track Pricing Plan Selection

```tsx
import { ga4Event } from '@/lib/ga4';

function PricingCard({ planName, price }) {
  const handleSelectPlan = () => {
    ga4Event('Pricing', 'Plan Selected', planName, price);
  };

  return <button onClick={handleSelectPlan}>Choose {planName}</button>;
}
```

### Track Demo Requests

```tsx
import { ga4TrackConversion } from '@/lib/ga4';

function DemoRequestForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    ga4TrackConversion('Demo Request', 1);
    // Submit form
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Newsletter Signups

```tsx
import { ga4TrackConversion } from '@/lib/ga4';

function NewsletterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit to backend
    ga4TrackConversion('Newsletter Signup', 1);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Troubleshooting

### GA4 not tracking

**Check:**
- Browser console for initialization message
- Ad blockers aren't blocking GA4
- Measurement ID is correct (G-CXD0JV8VPF)
- Network tab shows requests to `google-analytics.com`

### Events not appearing in GA4

**Check:**
- Real-time reports (events can take 24-48 hours to appear in standard reports)
- Event parameters are correctly formatted
- GA4 property is active and properly configured

### Page views not tracking

**Check:**
- `useGA4PageTracking` hook is inside `BrowserRouter`
- Route changes are triggering the hook
- Check browser console for errors

## Additional Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [react-ga4 Documentation](https://github.com/codler/react-ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Best Practices](https://support.google.com/analytics/answer/9267735)

## GA4 + GTM Integration

Both GA4 (via react-ga4) and GTM are now active on your site:

- **Direct GA4**: Fast, direct tracking to Google Analytics
- **GTM**: Flexible tag management for multiple platforms

You can use both simultaneously for:
- Redundancy and data validation
- Different tracking needs (GA4 for analytics, GTM for marketing pixels)
- A/B testing different tracking approaches

## Summary

✅ GA4 is fully integrated with measurement ID: `G-CXD0JV8VPF`  
✅ Automatic page view tracking is enabled  
✅ Comprehensive tracking utilities are available  
✅ Works alongside GTM for complete analytics coverage  
✅ Ready to track user behavior and conversions  

Start tracking meaningful events on your landing page to gain insights into user behavior and optimize your conversion funnel!
