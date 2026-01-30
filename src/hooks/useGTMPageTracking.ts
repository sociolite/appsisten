import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gtmPageView } from '@/lib/gtm';

/**
 * Hook to automatically track page views with GTM
 * Add this hook to your App component or layout to track all route changes
 */
export const useGTMPageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    gtmPageView(location.pathname + location.search);
  }, [location]);
};
