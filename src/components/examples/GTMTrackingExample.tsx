/**
 * Example Component: GTM Tracking Demo
 *
 * This component demonstrates how to use GTM tracking functions
 * in your React components. You can use these patterns throughout
 * your landing page.
 */

import { gtmTrackButtonClick, gtmTrackFormSubmit, gtmTrackEvent } from '@/lib/gtm';

export function GTMTrackingExample() {
  // Example 1: Track button clicks
  const handleCTAClick = () => {
    gtmTrackButtonClick('Primary CTA', 'Hero Section');
    // Your navigation or action logic here
    console.log('CTA clicked and tracked');
  };

  // Example 2: Track form submissions
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gtmTrackFormSubmit('Demo Request Form', 'hero-form');
    // Your form submission logic here
    console.log('Form submitted and tracked');
  };

  // Example 3: Track custom interactions
  const handleFeatureClick = (featureName: string) => {
    gtmTrackEvent('Feature', 'Click', featureName);
    console.log(`Feature ${featureName} clicked and tracked`);
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">GTM Tracking Examples</h2>

      {/* Example 1: Button Click Tracking */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">1. Button Click Tracking</h3>
        <button
          onClick={handleCTAClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Get Started (Tracked)
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
            Submit (Tracked)
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
            HR Feature (Tracked)
          </button>
          <button
            onClick={() => handleFeatureClick('Payroll')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Payroll Feature (Tracked)
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Open your browser console and check{' '}
          <code className="bg-gray-200 px-1 rounded">window.dataLayer</code> to see the tracked
          events.
        </p>
      </div>
    </div>
  );
}
