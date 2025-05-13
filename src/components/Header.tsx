
import React from 'react';
import Logo from '@/components/Logo';
import AgeToggle, { AgeRange } from '@/components/AgeToggle';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  currentAgeRange: AgeRange;
  onAgeChange: (range: AgeRange) => void;
}

const Header: React.FC<HeaderProps> = ({ currentAgeRange, onAgeChange }) => {
  const { user, isAuthenticated, signOut } = useAuth();
  
  return (
    <header className="relative z-10 flex justify-between items-center p-4 md:p-6">
      <Logo className="text-xl md:text-2xl" />
      
      <div className="flex gap-3 md:gap-4 items-center">
        <AgeToggle currentRange={currentAgeRange} onChange={onAgeChange} />
        <AccessibilityControls />
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm">
              Hi, {user?.display_name}
            </span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to="/auth/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
