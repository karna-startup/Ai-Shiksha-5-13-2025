
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const ChallengeSolution: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🚨</span> The Challenge We're Solving
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <p className="font-medium">260M+</p>
            <p className="text-sm">students in India</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <p className="font-medium">1M+</p>
            <p className="text-sm">teachers, often overstretched</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Limited</p>
            <p className="text-sm">emotional support in classrooms</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Lack of</p>
            <p className="text-sm">personalized learning paths</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Post-school</p>
            <p className="text-sm">confusion: "What now?"</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
            💡 Our Answer
          </h3>
          <p className="text-lg">
            Ai-Shiksha turns every device into a voice-powered learning companion, bridging the gap with 
            empathy, storytelling, Indian values, and intelligent guidance.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
