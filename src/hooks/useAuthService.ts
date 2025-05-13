
import { useState } from 'react';
import { useSignUp } from './auth/useSignUp';
import { useSignIn } from './auth/useSignIn';
import { useSignOut } from './auth/useSignOut';
import { useProfileUpdate } from './auth/useProfileUpdate';
import { UserProfile } from '@/types/auth';

export function useAuthService() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Import auth functionality from specialized hooks
  const { signUp, isLoading: isSigningUp } = useSignUp();
  const { signIn, isLoading: isSigningIn } = useSignIn();
  const { signOut, isLoading: isSigningOut } = useSignOut();
  const { updateUserProfile, isLoading: isUpdatingProfile } = useProfileUpdate();
  
  // Combine loading states
  const isLoading = isSigningUp || isSigningIn || isSigningOut || isUpdatingProfile;

  // Wrapper function to update profile that passes the current user
  const handleUpdateUserProfile = async (data: Partial<UserProfile>) => {
    const success = await updateUserProfile(user, data);
    if (success) {
      // Update local state
      setUser(prev => prev ? { ...prev, ...data } : null);
    }
    return success;
  };

  return {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    signUp,
    signIn,
    signOut,
    updateUserProfile: handleUpdateUserProfile
  };
}
