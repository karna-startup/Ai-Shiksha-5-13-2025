
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { trackClick } from '@/services/userTrackingService';

interface LearningLevelProps {
  level: number;
  maxLevel: number;
  ageGroup: string;
  isCompleted?: boolean;
  className?: string;
}

// Map of age groups to routing paths
const ageGroupRoutes: Record<string, string> = {
  'young': 'early-learners',
  'middle': 'elementary',
  'teen': 'high-school',
  'common': 'common'
};

// Map of level names for each age group
const levelNames: Record<string, string[]> = {
  'young': [
    'Computer Parts',
    'Mouse & Keyboard',
    'Colors & Shapes',
    'Simple Logic',
    'Digital Drawing',
    'Basic Patterns'
  ],
  'elementary': [
    'Computer Parts',
    'Algorithms Basics',
    'Intro to Coding',
    'Variables & Data',
    'Loops & Repetition',
    'Problem Solving'
  ],
  'middle': [
    'Programming Basics',
    'Logic & Decisions',
    'Loops & Iterations',
    'Data Structures',
    'Game Development',
    'Web Design'
  ],
  'teen': [
    'Programming Fundamentals',
    'Functions & Methods',
    'Data Structures',
    'Web Development',
    'App Development',
    'Projects & Deployment'
  ],
  'common': [
    'Digital Literacy',
    'Internet Safety',
    'Critical Thinking',
    'Creativity Tools',
    'Collaboration',
    'Future Technologies'
  ]
};

const LearningLevel: React.FC<LearningLevelProps> = ({
  level,
  maxLevel,
  ageGroup,
  isCompleted = false,
  className
}) => {
  // Different badge colors based on age group
  const badgeColors = {
    'young': 'from-yellow-400 to-orange-400',
    'middle': 'from-blue-400 to-indigo-500',
    'teen': 'from-purple-500 to-pink-500',
    'common': 'from-green-400 to-teal-500'
  };

  const badgeColor = badgeColors[ageGroup as keyof typeof badgeColors] || badgeColors.middle;
  
  // Map the ageGroup to the correct route
  const routePath = ageGroupRoutes[ageGroup] || ageGroup;
  
  // Get the level name based on age group and level index
  const getLevelName = () => {
    const names = levelNames[ageGroup];
    if (!names || level > names.length) {
      return `Level ${level}`;
    }
    return names[level - 1];
  };
  
  const levelName = getLevelName();
  
  const handleClick = () => {
    // Track level selection
    trackClick(`level-${level}`, 'level-button', {
      action: 'select_level',
      level,
      levelName,
      ageGroup,
      isCompleted
    });
  };
  
  return (
    <div className={cn(
      "relative flex flex-col items-center p-2",
      className
    )}>
      <Link 
        to={`/${routePath}/level/${level}`}
        className="group relative"
        onClick={handleClick}
      >
        <div className={cn(
          "size-16 md:size-20 rounded-full flex items-center justify-center transition-all duration-300",
          "bg-white/80 dark:bg-slate-800/80 shadow-md hover:shadow-lg",
          "group-hover:scale-110 active:scale-95",
          "group-hover:bg-gradient-to-r group-hover:from-aishiksha-blue/90 group-hover:to-aishiksha-purple/90",
          "group-hover:shadow-aishiksha-purple/30 group-hover:shadow-lg",
          isCompleted ? "ring-2 ring-green-400 dark:ring-green-500" : ""
        )}>
          <Star 
            className={cn(
              "size-8 md:size-10 transition-colors",
              isCompleted ? "fill-green-400 text-green-500" : "fill-transparent",
              "group-hover:text-white"
            )}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="block font-medium">Level {level}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{levelName}</span>
        </div>
      </Link>
      
      {isCompleted && (
        <Badge 
          className={cn(
            "absolute -top-2 -right-2 animate-pulse-gentle",
            "bg-gradient-to-r", badgeColor,
            "text-white shadow-md"
          )}
        >
          <Award className="size-3 mr-1" />
          Completed
        </Badge>
      )}
    </div>
  );
};

export default LearningLevel;
