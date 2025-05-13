
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthService } from '@/hooks/useAuthService';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    signUp,
    signIn,
    signOut,
    updateUserProfile
  } = useAuthService();

  // Initialize session management
  useSessionManagement({
    setUser,
    setIsAuthenticated,
    setIsLoading: () => {}, // We're not using setIsLoading from useSessionManagement anymore
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
