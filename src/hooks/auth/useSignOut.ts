
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to sign out a user
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      navigate('/');
      
      toast({
        title: "Success!",
        description: "You have been signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error signing out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading
  };
}
