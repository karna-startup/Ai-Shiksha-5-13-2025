
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Sparkles } from '@/components/ui/sparkles-effect';

const LearningStories: React.FC = () => {
  return (
    <PlaceholderPage title="Learning Stories" description="">
      <AnimatedBackground numberOfElements={20} />
      
      <div className="space-y-8 relative z-10">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            At AI-Shiksha, we celebrate the learning journeys of our students across the globe. 
            Each story represents a unique path of discovery, growth, and achievement in computer science education.
          </p>
        </div>
        
        <Card className="p-12 border-primary/20 text-center">
          <CardContent className="flex flex-col items-center justify-center">
            <Sparkles>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent mb-4">
                Coming Soon
              </h2>
            </Sparkles>
            
            <div className="w-48 h-48 mb-6 flex items-center justify-center rounded-full bg-primary/10">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            
            <p className="text-xl mb-4">
              We're collecting inspiring stories from students around the world.
            </p>
            <p className="text-muted-foreground">
              Check back soon to read about real-life transformations through AI-Shiksha's computer science education.
            </p>
          </CardContent>
        </Card>
      </div>
    </PlaceholderPage>
  );
};

export default LearningStories;
