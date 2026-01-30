/**
 * Example Component: GA4 Tracking Demo
 *
 * This component demonstrates how to use GA4 tracking functions
 * in your React components. You can use these patterns throughout
 * your landing page.
 */

import {
  ga4TrackButtonClick,
  ga4TrackFormSubmit,
  ga4Event,
  ga4TrackConversion,
  ga4TrackOutboundLink,
  ga4TrackDownload,
  ga4TrackVideo,
} from '@/lib/ga4';

export function GA4TrackingExample() {
  // Example 1: Track button clicks
  const handleCTAClick = () => {
    ga4TrackButtonClick('Primary CTA', 'Hero Section');
    console.log('GA4: CTA clicked and tracked');
  };

  // Example 2: Track form submissions
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ga4TrackFormSubmit('Demo Request Form', 'hero-form');
    console.log('GA4: Form submitted and tracked');
  };

  // Example 3: Track custom events
  const handleFeatureClick = (featureName: string) => {
    ga4Event('Feature', 'Click', featureName);
    console.log(`GA4: Feature ${featureName} clicked and tracked`);
  };

  // Example 4: Track conversions
  const handleSignup = () => {
    ga4TrackConversion('Newsletter Signup', 1);
    console.log('GA4: Conversion tracked');
  };

  // Example 5: Track outbound links
  const handleOutboundLink = () => {
    ga4TrackOutboundLink('https://example.com', 'Partner Website');
    console.log('GA4: Outbound link tracked');
  };

  // Example 6: Track downloads
  const handleDownload = () => {
    ga4TrackDownload('product-brochure.pdf', 'PDF');
    console.log('GA4: Download tracked');
  };

  // Example 7: Track video interactions
  const handleVideoPlay = () => {
    ga4TrackVideo('play', 'Product Demo Video');
    console.log('GA4: Video play tracked');
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">GA4 Tracking Examples</h2>

      {/* Example 1: Button Click Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">1. Button Click Tracking</h3>
        <button
          onClick={handleCTAClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Get Started (GA4 Tracked)
        </button>
      </div>

      {/* Example 2: Form Submit Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">2. Form Submit Tracking</h3>
        <form onSubmit={handleFormSubmit} className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit (GA4 Tracked)
          </button>
        </form>
      </div>

      {/* Example 3: Feature Click Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">3. Feature Click Tracking</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleFeatureClick('HR Management')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            HR Feature
          </button>
          <button
            onClick={() => handleFeatureClick('Payroll')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Payroll Feature
          </button>
        </div>
      </div>

      {/* Example 4: Conversion Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">4. Conversion Tracking</h3>
        <button
          onClick={handleSignup}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Newsletter Signup
        </button>
      </div>

      {/* Example 5: Outbound Link Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">5. Outbound Link Tracking</h3>
        <a
          href="https://example.com"
          onClick={handleOutboundLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Visit Partner Site
        </a>
      </div>

      {/* Example 6: Download Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">6. Download Tracking</h3>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Download Brochure
        </button>
      </div>

      {/* Example 7: Video Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">7. Video Interaction Tracking</h3>
        <button
          onClick={handleVideoPlay}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Play Video
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Open your browser console to see the tracking logs. Check Google
          Analytics Real-Time reports to see events in action.
        </p>
      </div>
    </div>
  );
}
