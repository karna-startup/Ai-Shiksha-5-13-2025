
import React, { useEffect } from 'react';
import VoiceButtonUI from './voice/VoiceButtonUI';
import VoiceWaves from './voice/VoiceWaves';
import VoiceHelperText from './voice/VoiceHelperText';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';

interface VoiceButtonProps {
  onActivate?: () => void;
  isYoungInterface?: boolean;
  className?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({
  onActivate,
  isYoungInterface = false,
  className
}) => {
  const { isActive, isListening, toggleListening } = useVoiceRecording({ onActivate });

  // Clean up on unmount is handled inside the hook

  return (
    <div className="mx-0 my-[100px] rounded-none py-0 px-0">
      <VoiceButtonUI 
        isActive={isActive} 
        isYoungInterface={isYoungInterface} 
        onClick={toggleListening} 
        className={className} 
      />
      
      <VoiceWaves isActive={isActive} />
      
      <VoiceHelperText isActive={isActive} isYoungInterface={isYoungInterface} />
    </div>
  );
};

export default VoiceButton;
