
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const MissionCard: React.FC = () => {
  return (
    <Card className="border-l-4 border-l-aishiksha-blue">
      <CardContent className="p-6">
        <p className="text-lg italic">
          But we're not just here to fill a gap.
          We're on a mission to change the very question every child asks after school.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="font-medium">Not:</p>
            <p className="text-xl">"What should I do next?"</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-md">
            <p className="font-medium">But:</p>
            <p className="text-xl font-semibold">"What should I build next?"</p>
          </div>
        </div>
        <p className="mt-6">
          AI-Shiksha is India's first voice-powered, emotionally intelligent AI tutor that grows with your child — 
          guiding them not just to memorize, but to imagine, invent, create, and build with confidence.
        </p>
      </CardContent>
    </Card>
  );
};
