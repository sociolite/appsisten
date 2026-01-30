# Analytics Quick Reference Guide

## 🎯 Overview

Your Appsisten landing page now has **dual analytics tracking**:

- **Google Tag Manager (GTM)**: `GTM-KF7V6FQS`
- **Google Analytics 4 (GA4)**: `G-CXD0JV8VPF`

Both systems work together to provide comprehensive tracking and analytics.

---

## 🚀 Quick Start

### Import What You Need

```tsx
// For GTM tracking
import { 
  gtmTrackButtonClick, 
  gtmTrackFormSubmit, 
  gtmTrackEvent 
} from '@/lib/gtm';

// For GA4 tracking
import { 
  ga4TrackButtonClick, 
  ga4TrackFormSubmit, 
  ga4Event 
} from '@/lib/ga4';
```

### Track a Button Click

```tsx
function CTAButton() {
  const handleClick = () => {
    // Track with both GTM and GA4
    gtmTrackButtonClick('Get Started', 'Hero Section');
    ga4TrackButtonClick('Get Started', 'Hero Section');
  };

  return <button onClick={handleClick}>Get Started</button>;
}
```

### Track a Form Submission

```tsx
function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track with both GTM and GA4
    gtmTrackFormSubmit('Contact Form');
    ga4TrackFormSubmit('Contact Form');
    
    // Your form logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track a Conversion

```tsx
function SignupButton() {
  const handleSignup = () => {
    // Track with both GTM and GA4
    gtmTrackConversion('Newsletter Signup', 1);
    ga4TrackConversion('Newsletter Signup', 1);
  };

  return <button onClick={handleSignup}>Sign Up</button>;
}
```

---

## 📊 Common Tracking Patterns

### 1. Hero CTA Button

```tsx
import { gtmTrackButtonClick, ga4TrackButtonClick } from '@/lib/gtm';
import { ga4TrackButtonClick } from '@/lib/ga4';

<button 
  onClick={() => {
    gtmTrackButtonClick('Start Free Trial', 'Hero');
    ga4TrackButtonClick('Start Free Trial', 'Hero');
  }}
>
  Start Free Trial
</button>
```

### 2. Pricing Plan Selection

```tsx
import { gtmTrackEvent } from '@/lib/gtm';
import { ga4Event } from '@/lib/ga4';

const handlePlanSelect = (planName: string, price: number) => {
  gtmTrackEvent('Pricing', 'Plan Selected', planName, price);
  ga4Event('Pricing', 'Plan Selected', planName, price);
};

<button onClick={() => handlePlanSelect('Premium', 500000)}>
  Choose Premium
</button>
```

### 3. Feature Interest

```tsx
import { gtmTrackEvent } from '@/lib/gtm';
import { ga4Event } from '@/lib/ga4';

const handleFeatureClick = (featureName: string) => {
  gtmTrackEvent('Feature', 'Click', featureName);
  ga4Event('Feature', 'Click', featureName);
};

<button onClick={() => handleFeatureClick('HR Management')}>
  Learn More
</button>
```

### 4. Demo Request

```tsx
import { gtmTrackConversion } from '@/lib/gtm';
import { ga4TrackConversion } from '@/lib/ga4';

const handleDemoRequest = () => {
  gtmTrackConversion('Demo Request', 1);
  ga4TrackConversion('Demo Request', 1);
};

<button onClick={handleDemoRequest}>
  Request Demo
</button>
```

### 5. Newsletter Signup

```tsx
import { gtmTrackFormSubmit, gtmTrackConversion } from '@/lib/gtm';
import { ga4TrackFormSubmit, ga4TrackConversion } from '@/lib/ga4';

const handleNewsletterSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  gtmTrackFormSubmit('Newsletter Form');
  ga4TrackFormSubmit('Newsletter Form');
  
  gtmTrackConversion('Newsletter Signup', 1);
  ga4TrackConversion('Newsletter Signup', 1);
  
  // Submit to backend
};
```

### 6. Outbound Links

```tsx
import { ga4TrackOutboundLink } from '@/lib/ga4';
import { gtmEvent } from '@/lib/gtm';

const handleOutboundClick = (url: string, label: string) => {
  gtmEvent('outbound_link', { url, label });
  ga4TrackOutboundLink(url, label);
};

<a 
  href="https://partner.com" 
  onClick={() => handleOutboundClick('https://partner.com', 'Partner')}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Partner
</a>
```

### 7. File Downloads

```tsx
import { ga4TrackDownload } from '@/lib/ga4';
import { gtmEvent } from '@/lib/gtm';

const handleDownload = (fileName: string) => {
  gtmEvent('file_download', { file_name: fileName });
  ga4TrackDownload(fileName, 'PDF');
};

<a 
  href="/downloads/brochure.pdf" 
  onClick={() => handleDownload('brochure.pdf')}
  download
>
  Download Brochure
</a>
```

### 8. Video Interactions

```tsx
import { ga4TrackVideo } from '@/lib/ga4';
import { gtmEvent } from '@/lib/gtm';

const handleVideoPlay = (videoName: string) => {
  gtmEvent('video_play', { video_name: videoName });
  ga4TrackVideo('play', videoName);
};

<video onPlay={() => handleVideoPlay('Product Demo')}>
  <source src="/videos/demo.mp4" />
</video>
```

---

## 🎨 Recommended Tracking for Appsisten

### Landing Page Sections to Track

1. **Hero Section**
   - Primary CTA clicks
   - Secondary CTA clicks
   - Video play (if applicable)

2. **Features Section**
   - Feature card clicks
   - "Learn More" clicks
   - Feature comparison interactions

3. **Pricing Section**
   - Plan selection
   - Price toggle (monthly/yearly)
   - "Get Started" clicks per plan

4. **Testimonials/Social Proof**
   - Testimonial navigation
   - Case study clicks

5. **FAQ Section**
   - FAQ item expansions
   - "Contact Support" clicks

6. **Footer**
   - Social media links
   - Newsletter signup
   - Legal links (Privacy, Terms)

---

## 🔍 Testing Your Tracking

### 1. Browser Console

```javascript
// Check GTM dataLayer
console.log(window.dataLayer);

// You should see events like:
// { event: 'button_click', button_name: 'Get Started', ... }
```

### 2. GTM Preview Mode

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select container `GTM-KF7V6FQS`
3. Click **Preview**
4. Enter your website URL
5. Interact with your site and verify events

### 3. GA4 Real-Time Reports

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select property `G-CXD0JV8VPF`
3. Navigate to **Reports** → **Real-time**
4. Interact with your site and watch events appear

### 4. GA4 DebugView

1. Add `?debug_mode=true` to your URL
2. Go to GA4 → **Configure** → **DebugView**
3. See detailed event parameters in real-time

---

## 📝 Best Practices

### 1. Track Both Systems

For maximum reliability and flexibility, track events in both GTM and GA4:

```tsx
const trackEvent = (name: string, location: string) => {
  gtmTrackButtonClick(name, location);
  ga4TrackButtonClick(name, location);
};
```

### 2. Use Descriptive Names

```tsx
// ✅ Good
gtmTrackButtonClick('Start Free Trial', 'Hero Section');

// ❌ Bad
gtmTrackButtonClick('btn1', 'top');
```

### 3. Track User Journey

Track key steps in the user journey:
- Landing → Feature Interest → Pricing → Signup

### 4. Track Conversions

Define and track your key conversions:
- Demo requests
- Newsletter signups
- Trial starts
- Contact form submissions

### 5. Respect Privacy

- Implement cookie consent
- Don't track PII (emails, names, etc.)
- Follow GDPR/privacy regulations

---

## 📚 Full Documentation

- **GTM Implementation**: See `GTM_IMPLEMENTATION.md`
- **GA4 Implementation**: See `GA4_IMPLEMENTATION.md`
- **Example Components**: 
  - `src/components/examples/GTMTrackingExample.tsx`
  - `src/components/examples/GA4TrackingExample.tsx`

---

## 🛠️ Utility Functions Reference

### GTM Functions (`@/lib/gtm`)

| Function | Purpose | Example |
|----------|---------|---------|
| `gtmEvent()` | Custom event | `gtmEvent('custom', { key: 'value' })` |
| `gtmPageView()` | Page view | `gtmPageView('/about')` |
| `gtmTrackEvent()` | Event with category/action | `gtmTrackEvent('Video', 'Play', 'Demo')` |
| `gtmTrackButtonClick()` | Button click | `gtmTrackButtonClick('CTA', 'Hero')` |
| `gtmTrackFormSubmit()` | Form submission | `gtmTrackFormSubmit('Contact Form')` |
| `gtmTrackConversion()` | Conversion | `gtmTrackConversion('Signup', 1)` |

### GA4 Functions (`@/lib/ga4`)

| Function | Purpose | Example |
|----------|---------|---------|
| `ga4Event()` | Custom event | `ga4Event('Video', 'Play', 'Demo')` |
| `ga4PageView()` | Page view | `ga4PageView('/about')` |
| `ga4TrackButtonClick()` | Button click | `ga4TrackButtonClick('CTA', 'Hero')` |
| `ga4TrackFormSubmit()` | Form submission | `ga4TrackFormSubmit('Contact Form')` |
| `ga4TrackConversion()` | Conversion | `ga4TrackConversion('Signup', 1)` |
| `ga4TrackOutboundLink()` | External link | `ga4TrackOutboundLink('https://...', 'Partner')` |
| `ga4TrackDownload()` | File download | `ga4TrackDownload('file.pdf', 'PDF')` |
| `ga4TrackVideo()` | Video interaction | `ga4TrackVideo('play', 'Demo')` |
| `ga4SetUserProperties()` | User properties | `ga4SetUserProperties({ type: 'premium' })` |
| `ga4TrackException()` | Error tracking | `ga4TrackException('Error msg', false)` |

---

## ✅ Implementation Checklist

- [x] GTM installed in `index.html`
- [x] GA4 installed via `react-ga4`
- [x] Automatic page view tracking (both GTM & GA4)
- [x] Utility functions created
- [x] Example components created
- [x] Documentation written
- [ ] Add tracking to hero CTA buttons
- [ ] Add tracking to pricing plan selections
- [ ] Add tracking to form submissions
- [ ] Add tracking to feature interactions
- [ ] Test in GTM Preview mode
- [ ] Test in GA4 Real-time reports
- [ ] Set up conversion goals in GA4
- [ ] Implement cookie consent (if required)

---

## 🎯 Next Steps

1. **Add tracking to your components** using the patterns above
2. **Test thoroughly** using GTM Preview and GA4 Real-time
3. **Set up goals** in GA4 for your key conversions
4. **Monitor data** and optimize based on insights
5. **Implement cookie consent** if required by your region

---

**Need Help?** Check the full documentation files or the example components for detailed implementation guides.
