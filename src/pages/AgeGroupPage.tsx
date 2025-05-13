import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LearningLevel from '@/components/LearningLevel';
import { useTheme } from '@/contexts/ThemeContext';

interface AgeGroupContent {
  [key: string]: {
    title: string;
    imageSrc: string;
    description: string;
    levels: number;
    completedLevels?: number[];
  };
}

const ageGroupContent: AgeGroupContent = {
  'young': {
    title: '3-6 Years Learning',
    imageSrc: '/lovable-uploads/966d5b46-c0a8-4cc1-876f-0baf983c1dd8.png',
    description: 'Fun and interactive computer science activities for our youngest learners!',
    levels: 6,
    completedLevels: [1, 2] // Mock data - in a real app, this would come from a database
  },
  'middle': {
    title: '7-13 Years Learning',
    imageSrc: '/lovable-uploads/8686d14e-6381-42ff-a3df-7c0e0152aaf5.png',
    description: 'Explore coding concepts through engaging activities and challenges.',
    levels: 6,
    completedLevels: [1] // Mock data
  },
  'teen': {
    title: '14-18 Years Learning',
    imageSrc: '/lovable-uploads/8309baa1-b404-4abc-a4ce-b48d1ff56113.png',
    description: 'Advanced computer science topics and project-based learning for teenagers.',
    levels: 6,
    completedLevels: [] // Mock data
  }
};

const AgeGroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const content = groupId ? ageGroupContent[groupId] : null;
  const { isDarkMode } = useTheme();

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Age group not found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // Generate array of level numbers
  const levelNumbers = Array.from({ length: content.levels }, (_, i) => i + 1);

  return (
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'dark' : ''}`}>
      <div className="absolute inset-0 overflow-hidden z-0">
        <img src={content.imageSrc} alt={content.title} className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-10"></div>
      </div>
      
      <header className="relative z-20 flex items-center justify-between p-4 md:p-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>
      
      <main className="relative z-20 flex-1 flex flex-col items-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
            {content.title}
          </h1>
          
          <div className="rounded-2xl shadow-xl overflow-hidden mb-8">
            <img src={content.imageSrc} alt={content.title} className="w-full h-auto max-h-[40vh] object-fill" />
          </div>
          
          <p className="text-sm md:text-base mb-8">{content.description}</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Learning Levels</h2>
            <p className="text-muted-foreground text-sm mb-6">Click on a star to start learning at that level</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
              {levelNumbers.map(level => (
                <LearningLevel
                  key={level}
                  level={level}
                  maxLevel={content.levels}
                  ageGroup={groupId || ''}
                  isCompleted={content.completedLevels?.includes(level)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgeGroupPage;
