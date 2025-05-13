
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

interface UseSessionManagementProps {
  setUser: (user: UserProfile | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

export function useSessionManagement({
  setUser,
  setIsAuthenticated,
  setIsLoading
}: UseSessionManagementProps) {
  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Fetch the user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*, schools(*)')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            // Create user profile with default values for missing fields
            setUser({
              id: profile.id,
              display_name: profile.display_name || '',
              email: session.user.email,
              age_group: profile.age_preference || '',
              class_level: profile.class_level || '',
              points: profile.points || 0,
              level: profile.level || 1,
              role: (profile.role as 'student' | 'teacher' | 'guest' | 'school_admin') || 'student',
              school_id: profile.school_id || undefined,
              school_name: profile.schools?.name || undefined,
              badges: profile.badges || [],
              days_active: profile.days_active || 0,
              completed_levels: profile.completed_levels || [],
              avatar_url: profile.avatar_url || undefined
            });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_IN' && session) {
          try {
            // Fetch the user profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*, schools(*)')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setUser({
                id: profile.id,
                display_name: profile.display_name || '',
                email: session.user.email,
                age_group: profile.age_preference || '',
                class_level: profile.class_level || '',
                points: profile.points || 0,
                level: profile.level || 1,
                role: (profile.role as 'student' | 'teacher' | 'guest' | 'school_admin') || 'student',
                school_id: profile.school_id || undefined,
                school_name: profile.schools?.name || undefined,
                badges: profile.badges || [],
                days_active: profile.days_active || 0,
                completed_levels: profile.completed_levels || [],
                avatar_url: profile.avatar_url || undefined
              });
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error("Error fetching profile after sign in:", error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsAuthenticated, setIsLoading]);
}
