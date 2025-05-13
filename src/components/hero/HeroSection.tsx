
import React from 'react';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  return (
    <div className="text-center">
      <div className="inline-block px-4 py-1 rounded-full glass mb-6 text-sm md:text-base font-medium text-primary">
        Welcome to AI-Shiksha
      </div>
      
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent md:text-5xl py-0 px-0 my-0 lg:text-4xl">
        Your AI Computer Science Teacher
      </h1>
    </div>
  );
};

export default HeroSection;
