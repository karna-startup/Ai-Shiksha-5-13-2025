
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface AccessibilityControlsProps {
  className?: string;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  className
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={cn("flex gap-2", className)}>
      <button
        onClick={toggleDarkMode}
        className={cn(
          "p-2 rounded-full transition-all",
          isDarkMode 
            ? "bg-primary/20 text-primary" 
            : "bg-white/50 backdrop-blur-sm text-primary hover:bg-primary/10"
        )}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default AccessibilityControls;
