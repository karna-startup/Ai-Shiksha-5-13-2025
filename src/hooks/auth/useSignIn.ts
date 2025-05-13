
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to sign in a user
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Authentication error:", error);
        throw error;
      }
      
      if (data.user) {
        console.log("User authenticated successfully:", data.user.id);
        // Check if profile exists, if not create it
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.log("Profile error or doesn't exist:", profileError);
          
          if (profileError.code === 'PGRST116') {
            console.log("Creating new profile from metadata");
            // Profile doesn't exist, create it using the metadata from signup
            const metadata = data.user.user_metadata;
            console.log("User metadata:", metadata);
            
            const { data: newProfile, error: insertError } = await supabase.from('profiles').upsert({
              id: data.user.id,
              display_name: metadata?.display_name || data.user.email?.split('@')[0] || '',
              age_preference: metadata?.age_group || '',
              class_level: metadata?.class_level || '',
              phone: metadata?.phone || '',
              points: 0,
              level: 1,
              role: metadata?.role || 'student',
              school_id: metadata?.school_id || null,
              badges: [],
              days_active: 1,
              completed_levels: []
            }, { onConflict: 'id' });
            
            if (insertError) {
              console.error("Error creating profile:", insertError);
              // Profile creation failed but user is still authenticated
              // We'll allow the login to continue but log the error
            } else {
              console.log("New profile created successfully");
            }
          } else {
            console.error("Error checking profile:", profileError);
          }
        } else {
          console.log("Existing profile found:", profile);
          
          // Update days_active counter
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              days_active: (profile.days_active || 0) + 1,
            })
            .eq('id', data.user.id);
            
          if (updateError) {
            console.error("Error updating days_active:", updateError);
          }
        }
        
        toast({
          title: "Success!",
          description: "You have successfully signed in.",
        });
      }
      
      return data;
    } catch (error: any) {
      console.error('Login error details:', error);
      
      toast({
        title: "Error",
        description: error.message || "There was an error signing in",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading
  };
}
