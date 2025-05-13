
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const SarasIntro: React.FC = () => {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🤖</span> Meet SARAS — Your Child's Learning Buddy
        </h2>
        <p className="mb-4">
          SARAS is not just an AI.<br />
          She's a gentle voice of encouragement, a storyteller from Indian history, a patient teacher, and a 
          motivator who believes in your child — always.
        </p>
      </CardContent>
    </Card>
  );
};
