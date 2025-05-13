
import React from 'react';

interface VoiceWavesProps {
  isActive: boolean;
}

const VoiceWaves: React.FC<VoiceWavesProps> = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="voice-wave mt-4">
      <div className="voice-wave-bar h-3"></div>
      <div className="voice-wave-bar h-5"></div>
      <div className="voice-wave-bar h-8"></div>
      <div className="voice-wave-bar h-5"></div>
      <div className="voice-wave-bar h-3"></div>
    </div>
  );
};

export default VoiceWaves;
