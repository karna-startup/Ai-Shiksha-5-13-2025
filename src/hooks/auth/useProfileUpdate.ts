
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/auth';

export function useProfileUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to update user profile
  const updateUserProfile = async (user: UserProfile | null, data: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error("No user logged in");
      
      setIsLoading(true);
      
      // Prepare the update data with the correct field names for Supabase
      const updateData: any = {
        display_name: data.display_name,
        age_preference: data.age_group,
      };
      
      // Only add these fields if they're defined in the update data
      if (data.class_level !== undefined) {
        updateData.class_level = data.class_level;
      }
      
      if (data.role !== undefined) {
        updateData.role = data.role;
      }
      
      if (data.school_id !== undefined) {
        updateData.school_id = data.school_id;
      }
      
      if (data.points !== undefined) {
        updateData.points = data.points;
      }
      
      if (data.level !== undefined) {
        updateData.level = data.level;
      }
      
      if (data.badges !== undefined) {
        updateData.badges = data.badges;
      }
      
      if (data.completed_levels !== undefined) {
        updateData.completed_levels = data.completed_levels;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error updating your profile",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserProfile,
    isLoading
  };
}
