
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LevelProgressProps {
  progress: number;
  level: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ progress, level }) => {
  return (
    <>
      <div className="text-sm font-medium text-muted-foreground">
        Level {level} of 6
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Progress value={progress} className="flex-1" />
        <span className="text-sm font-medium">{progress}%</span>
      </div>
    </>
  );
};

export default LevelProgress;
