import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import LevelBreadcrumb from '@/components/level/LevelBreadcrumb';
import LevelProgress from '@/components/level/LevelProgress';
import LevelCompletion from '@/components/level/LevelCompletion';
import { ageGroupNames, getCompletedLevels, saveCompletedLevel } from '@/utils/levelUtils';
import ComputerPartsLearning from '@/components/learning/ComputerPartsLearning';

interface LevelContent {
  title: string;
  content: string;
  component?: React.ComponentType;
}

const LevelContent: React.FC = () => {
  const { groupId = '', levelId = '1' } = useParams<{ groupId: string; levelId: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const level = parseInt(levelId);
  const ageGroupDisplay = ageGroupNames[groupId] || groupId;
  const content = getLevelContent(groupId, level);
  
  const [progress, setProgress] = useState(20);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    const completedLevels = getCompletedLevels(groupId);
    setIsCompleted(completedLevels.includes(level));
    setProgress(isCompleted ? 100 : 20);
  }, [groupId, level, isCompleted]);

  const handleCompleteLevel = () => {
    setProgress(100);
    setIsCompleted(true);
    saveCompletedLevel(groupId, level);
    toast.success('Level completed! You earned a badge!');
  };

  const ContentComponent = content.component;
  
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50 ${isDarkMode ? 'dark' : ''}`}>
      <header className="p-4 md:p-6 relative z-10">
        <LevelBreadcrumb 
          ageGroup={groupId}
          ageGroupDisplay={ageGroupDisplay}
          level={level}
        />
      </header>

      <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/${groupId}`)}
                className="gap-1"
              >
                <ArrowLeft className="size-4" />
                Back to {ageGroupDisplay}
              </Button>
              
              <LevelProgress progress={progress} level={level} />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              {content.title}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>{content.content}</p>
            </div>

            <div className="my-6">
              {ContentComponent ? (
                <ContentComponent />
              ) : (
                <div className="my-8 p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Learning content for {ageGroupDisplay}, Level {level} would appear here.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center mt-8">
              <LevelCompletion
                isCompleted={isCompleted}
                ageGroup={groupId}
                ageGroupDisplay={ageGroupDisplay}
                onComplete={handleCompleteLevel}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const getLevelContent = (ageGroup: string, level: number): LevelContent => {
  const contents: Record<string, Record<number, LevelContent>> = {
    'early-learners': {
      1: { 
        title: 'Computer Parts', 
        content: 'Learn about different parts of a computer and what they do!',
        component: ComputerPartsLearning
      },
      2: { title: 'Mouse & Keyboard', content: 'Practice using a mouse and keyboard with interactive games.' },
      3: { title: 'Colors & Shapes', content: 'Learn about digital colors and shapes on the computer.' },
      4: { title: 'Simple Logic', content: 'Begin to understand how computers think with simple logic puzzles.' },
      5: { title: 'Digital Drawing', content: 'Create your first digital artwork!' },
      6: { title: 'Basic Patterns', content: 'Identify and create patterns just like a computer would.' },
    },
    'elementary': {
      1: { title: 'Computer Parts', content: 'Discover the main components of a computer system.' },
      2: { title: 'Algorithms Basics', content: 'Learn step-by-step instructions like a computer.' },
      3: { title: 'Intro to Coding', content: 'Write your first lines of code with block-based programming.' },
      4: { title: 'Variables & Data', content: 'Understand how computers store and use information.' },
      5: { title: 'Loops & Repetition', content: 'Make computers repeat tasks efficiently.' },
      6: { title: 'Problem Solving', content: 'Apply your coding skills to solve interesting problems.' },
    },
    'middle-school': {
      1: { title: 'Programming Basics', content: 'Learn the fundamentals of computer programming.' },
      2: { title: 'Logic & Decision Making', content: 'Explore how computers make decisions using conditionals.' },
      3: { title: 'Loops & Iterations', content: 'Master the concept of loops and repeating actions.' },
      4: { title: 'Data Structures', content: 'Introduction to organizing and storing data effectively.' },
      5: { title: 'Game Development', content: 'Build your first simple games and animations.' },
      6: { title: 'Web Design', content: 'Create your first web pages with HTML and CSS.' },
    },
    'high-school': {
      1: { title: 'Programming Fundamentals', content: 'Start your coding journey with core concepts.' },
      2: { title: 'Functions & Methods', content: 'Create reusable blocks of code for complex tasks.' },
      3: { title: 'Data Structures', content: 'Learn how to organize and manage data effectively.' },
      4: { title: 'Web Development', content: 'Build your first website with HTML, CSS, and JavaScript.' },
      5: { title: 'App Development', content: 'Create a simple mobile application.' },
      6: { title: 'Projects & Deployment', content: 'Complete a project and share it with the world.' },
    },
    'common': {
      1: { title: 'Digital Literacy', content: 'Essential digital skills for everyone.' },
      2: { title: 'Internet Safety', content: 'Stay safe online with these important guidelines.' },
      3: { title: 'Critical Thinking', content: 'Develop problem-solving skills for technology and beyond.' },
      4: { title: 'Creativity Tools', content: 'Explore digital tools for creative expression.' },
      5: { title: 'Collaboration', content: 'Learn to work together using digital platforms.' },
      6: { title: 'Future Technologies', content: 'Discover emerging technologies shaping our future.' },
    }
  };

  const defaultContent = { title: `Level ${level}`, content: 'Content coming soon!' };
  
  return contents[ageGroup]?.[level] || defaultContent;
};

export default LevelContent;
