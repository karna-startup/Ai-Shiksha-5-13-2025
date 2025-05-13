
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelCompletionProps {
  isCompleted: boolean;
  ageGroup: string;
  ageGroupDisplay: string;
  onComplete: () => void;
}

const LevelCompletion: React.FC<LevelCompletionProps> = ({
  isCompleted,
  ageGroup,
  ageGroupDisplay,
  onComplete
}) => {
  const navigate = useNavigate();

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 p-4 bg-gradient-to-r from-aishiksha-blue/20 to-aishiksha-purple/20 rounded-full animate-pulse-gentle">
          <Trophy className="size-12 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold text-center mb-2">Level Completed!</h3>
        <p className="text-center text-muted-foreground mb-4">
          Great job! You've earned a badge for this level.
        </p>
        <Button 
          onClick={() => navigate(`/${ageGroup}`)}
          variant="outline"
        >
          Return to {ageGroupDisplay}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={onComplete}
      className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple hover:from-aishiksha-purple hover:to-aishiksha-blue"
    >
      Complete Level
    </Button>
  );
};

export default LevelCompletion;
