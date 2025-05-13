
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const MissionVisionCards: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🎯</span> Our Mission
          </h2>
          <p className="mb-4">
            To empower every child in India with a personal AI mentor — one who listens, speaks their language, 
            understands their pace, and teaches with empathy.
          </p>
          <p>
            We aim to reach 50 million students by 2030 — replacing isolation with guidance, confusion with curiosity, 
            and fear with confidence.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🌍</span> Our Vision
          </h2>
          <p className="mb-4">
            To create a world where no child is left waiting for help — where personalized, creative education 
            is not a luxury, but a right.
          </p>
          <p>
            We want to raise a generation that doesn't wait for opportunities — they create them.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
