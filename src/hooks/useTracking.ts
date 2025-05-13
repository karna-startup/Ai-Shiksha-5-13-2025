
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/userTrackingService';

/**
 * Hook to track page views automatically
 */
export const usePageViewTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when location changes
    trackPageView();
  }, [location.pathname]);
};

export default usePageViewTracking;
