
import React from 'react';
import { cn } from '@/lib/utils';

interface VoiceHelperTextProps {
  isActive: boolean;
  isYoungInterface?: boolean;
}

const VoiceHelperText: React.FC<VoiceHelperTextProps> = ({ isActive, isYoungInterface = false }) => {
  return (
    <div className={cn("text-center mt-3 text-primary/80", isYoungInterface ? "text-lg" : "text-sm")}>
      {isActive ? "Saras is listening..." : "Talk to Saras...!"}
    </div>
  );
};

export default VoiceHelperText;
