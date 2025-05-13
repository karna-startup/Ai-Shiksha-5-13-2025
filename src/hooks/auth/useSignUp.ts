
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/auth';

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to sign up a new user
  const signUp = async (email: string, password: string, userData: Omit<UserProfile, 'id' | 'points' | 'level' | 'badges' | 'days_active' | 'completed_levels'>) => {
    try {
      setIsLoading(true);
      
      // 1. Sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Store user metadata in the auth.users table
            display_name: userData.display_name,
            age_group: userData.age_group,
            class_level: userData.class_level,
            phone: userData.phone,
            role: userData.role || 'student',
            school_id: userData.school_id
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Success!",
          description: "Your account has been created. Please verify your email and then sign in.",
        });
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error creating your account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading
  };
}
