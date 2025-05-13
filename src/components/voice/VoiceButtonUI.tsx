
import React from 'react';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceButtonUIProps {
  isActive: boolean;
  isYoungInterface?: boolean;
  onClick: () => void;
  className?: string;
}

const VoiceButtonUI: React.FC<VoiceButtonUIProps> = ({
  isActive,
  isYoungInterface = false,
  onClick,
  className
}) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300",
        isYoungInterface ? "w-24 h-24 md:w-28 md:h-28" : "w-20 h-20 md:w-24 md:h-24",
        isActive 
          ? "bg-primary text-white shadow-lg ring-4 ring-primary/30" 
          : "bg-white text-primary hover:bg-primary/10 shadow hover:shadow-lg",
        className
      )}
      aria-label="Talk to Saras"
    >
      <Mic className={cn(
        "transition-all duration-300",
        isYoungInterface ? "w-10 h-10" : "w-8 h-8",
        isActive ? "animate-pulse-gentle" : ""
      )} />
    </button>
  );
};

export default VoiceButtonUI;
