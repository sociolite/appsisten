import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ga4PageView } from '@/lib/ga4';

/**
 * Hook to automatically track page views with GA4
 * Add this hook to your App component or layout to track all route changes
 */
export const useGA4PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    ga4PageView(location.pathname + location.search);
  }, [location]);
};
