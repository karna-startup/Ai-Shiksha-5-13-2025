
import React from 'react';
import { Sparkle } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 font-bold ${className}`}>
      <Sparkle className="h-6 w-6 text-aishiksha-blue animate-pulse-gentle" />
      <div className="flex items-center">
        <span className="text-aishiksha-blue">AI</span>
        <span className="text-aishiksha-purple">-</span>
        <span className="bg-gradient-to-r from-aishiksha-purple to-aishiksha-blue bg-clip-text text-transparent">
          Shiksha
        </span>
      </div>
    </div>
  );
};

export default Logo;
