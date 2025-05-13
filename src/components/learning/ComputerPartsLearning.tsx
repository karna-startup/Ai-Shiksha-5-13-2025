
import React from 'react';
import InteractiveComputer from './InteractiveComputer';
import { Card } from '@/components/ui/card';

const ComputerPartsLearning: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-white to-slate-50/50">
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
          Let's Learn About Computer Parts!
        </h2>
        
        <p className="text-center text-muted-foreground mb-8">
          Click on different parts of the computer to learn what they do!
        </p>

        <InteractiveComputer />
      </Card>
    </div>
  );
};

export default ComputerPartsLearning;
