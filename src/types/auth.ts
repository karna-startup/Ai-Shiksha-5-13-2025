
export interface UserProfile {
  id: string;
  display_name: string;
  email?: string;
  phone?: string;
  age_group: string;
  class_level: string;
  points: number;
  level: number;
  role?: 'student' | 'teacher' | 'guest' | 'school_admin';
  school_id?: string;
  school_name?: string;
  badges?: string[];
  days_active?: number;
  test_scores?: Record<string, any>;
  completed_levels?: number[];
  avatar_url?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, userData: Omit<UserProfile, 'id' | 'points' | 'level' | 'badges' | 'days_active' | 'completed_levels'>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>; // Updated return type to accept any return value
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}
