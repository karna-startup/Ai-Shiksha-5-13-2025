
import React from 'react';
import { Sparkles } from '@/components/ui/sparkles-effect';

export const HeroIntro: React.FC = () => {
  return (
    <section className="text-center mb-8">
      <Sparkles>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent mb-4">
          🚀 A New Era of Learning Begins Here
        </h2>
      </Sparkles>
      <p className="text-lg max-w-3xl mx-auto">
        India has over 260 million students — a number no traditional classroom can fully serve alone.
      </p>
    </section>
  );
};
