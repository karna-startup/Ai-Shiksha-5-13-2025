
import React from 'react';
import { Baby, GraduationCap, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { trackClick } from '@/services/userTrackingService';

export type AgeRange = 'young' | 'elementary' | 'middle' | 'teen';

interface AgeToggleProps {
  currentRange: AgeRange;
  onChange: (range: AgeRange) => void;
  className?: string;
}

const AgeToggle: React.FC<AgeToggleProps> = ({ 
  currentRange, 
  onChange,
  className
}) => {
  const navigate = useNavigate();

  const handleAgeChange = (range: AgeRange) => {
    // Track the age range selection
    trackClick(`age-toggle-${range}`, 'button', { 
      action: 'change_age_range', 
      selectedRange: range,
      previousRange: currentRange
    });
    
    onChange(range);
    
    // Navigate to the corresponding page based on the selected age range
    switch (range) {
      case 'young':
        navigate('/early-learners'); // 3-6 years
        break;
      case 'elementary':
        navigate('/elementary'); // 7-10 years
        break;
      case 'middle':
        navigate('/middle-school'); // 11-14 years
        break;
      case 'teen':
        navigate('/high-school'); // 15-18 years
        break;
    }
  };

  return (
    <div className={cn("flex rounded-full dark:bg-slate-800 bg-white/50 backdrop-blur-sm p-1 shadow-md age-toggle-buttons", className)}>
      <button
        onClick={() => handleAgeChange('young')}
        className={cn(
          "flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all", 
          currentRange === 'young' 
            ? "bg-primary text-white shadow" 
            : "text-primary dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-slate-700"
        )}
        aria-label="Ages 3-6"
      >
        <Baby className="h-3 w-3 md:h-4 md:w-4" />
        <span className="text-xs md:text-sm font-medium">3-6</span>
      </button>
      
      <button
        onClick={() => handleAgeChange('elementary')}
        className={cn(
          "flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all",
          currentRange === 'elementary' 
            ? "bg-primary text-white shadow" 
            : "text-primary dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-slate-700"
        )}
        aria-label="Ages 7-10"
      >
        <School className="h-3 w-3 md:h-4 md:w-4" />
        <span className="text-xs md:text-sm font-medium">7-10</span>
      </button>

      <button
        onClick={() => handleAgeChange('middle')}
        className={cn(
          "flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all",
          currentRange === 'middle' 
            ? "bg-primary text-white shadow" 
            : "text-primary dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-slate-700"
        )}
        aria-label="Ages 11-14"
      >
        <School className="h-3 w-3 md:h-4 md:w-4" />
        <span className="text-xs md:text-sm font-medium">11-14</span>
      </button>
      
      <button
        onClick={() => handleAgeChange('teen')}
        className={cn(
          "flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all",
          currentRange === 'teen' 
            ? "bg-primary text-white shadow"
            : "text-primary dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-slate-700"
        )}
        aria-label="Ages 15-18"
      >
        <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
        <span className="text-xs md:text-sm font-medium">15-18</span>
      </button>
    </div>
  );
};

export default AgeToggle;
