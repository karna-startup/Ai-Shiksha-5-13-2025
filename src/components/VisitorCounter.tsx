
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  // Function to get visitor's information
  const getVisitorInfo = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      
      // Use a more reliable free IP geolocation API
      const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
      const geoData = await geoResponse.json();
      
      return {
        ip_address: ipData.ip,
        country: geoData.country_name || 'Unknown',
        city: geoData.city || 'Unknown',
        browser: navigator.userAgent,
        device: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        page_url: window.location.pathname
      };
    } catch (error) {
      console.error('Error fetching visitor info:', error);
      // Return basic info even if geolocation fails
      return {
        ip_address: 'Unknown',
        country: 'Unknown',
        city: 'Unknown',
        browser: navigator.userAgent,
        device: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        page_url: window.location.pathname
      };
    }
  };

  // Query to get the total visitor count
  const { data: totalVisitors, isError } = useQuery({
    queryKey: ['visitorCount'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('visitor_analytics')
          .select('*', { count: 'exact', head: true });
          
        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        return 0;
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    // Fallback to previous data if query fails
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    // Update visitor count from the query result
    if (totalVisitors !== undefined && !isError) {
      setVisitorCount(totalVisitors);
    }

    // Log new visit
    const logVisit = async () => {
      try {
        const visitorInfo = await getVisitorInfo();
        if (visitorInfo) {
          await supabase
            .from('visitor_analytics')
            .insert([visitorInfo]);
        }
      } catch (err) {
        console.error('Error logging visit:', err);
      }
    };

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitor_analytics'
        },
        (payload) => {
          // Update count on realtime changes
          setVisitorCount(prev => prev + 1);
        }
      )
      .subscribe();

    // Log the visit
    logVisit();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [totalVisitors, isError]);

  return (
    <div className="flex items-center gap-1.5 text-foreground/70">
      <Users size={16} className="text-primary" />
      <span className="text-sm font-medium">
        {visitorCount.toLocaleString()} visitors
      </span>
    </div>
  );
};

export default VisitorCounter;
