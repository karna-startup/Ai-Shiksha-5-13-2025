
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import ComputerPartsLearning from '@/components/learning/ComputerPartsLearning';

// Define the type for the content object
interface LevelContent {
  title: string;
  content: string;
  component?: React.ComponentType; // Make component optional
}

// Mock data for level content - in a real app, this would come from a database
const getLevelContent = (ageGroup: string, level: number): LevelContent => {
  const contents: Record<string, Record<number, LevelContent>> = {
    'young': {
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
    'middle': {
      1: { title: 'Computer Parts', content: 'Discover the main components of a computer system.' },
      2: { title: 'Algorithms Basics', content: 'Learn step-by-step instructions like a computer.' },
      3: { title: 'Intro to Coding', content: 'Write your first lines of code with block-based programming.' },
      4: { title: 'Variables & Data', content: 'Understand how computers store and use information.' },
      5: { title: 'Loops & Repetition', content: 'Make computers repeat tasks efficiently.' },
      6: { title: 'Problem Solving', content: 'Apply your coding skills to solve interesting problems.' },
    },
    'teen': {
      1: { title: 'Programming Fundamentals', content: 'Start your coding journey with core concepts.' },
      2: { title: 'Functions & Methods', content: 'Create reusable blocks of code for complex tasks.' },
      3: { title: 'Data Structures', content: 'Learn how to organize and manage data effectively.' },
      4: { title: 'Web Development', content: 'Build your first website with HTML, CSS, and JavaScript.' },
      5: { title: 'App Development', content: 'Create a simple mobile application.' },
      6: { title: 'Projects & Deployment', content: 'Complete a project and share it with the world.' },
    }
  };

  // Default content if the level doesn't exist
  const defaultContent = { title: `Level ${level}`, content: 'Content coming soon!' };
  
  return contents[ageGroup]?.[level] || defaultContent;
};

// Function to get human-readable age group
const getAgeGroupDisplay = (groupId: string) => {
  switch(groupId) {
    case 'young': return '3-6 Years';
    case 'middle': return '7-13 Years';
    case 'teen': return '14-18 Years';
    default: return groupId;
  }
};

const LevelContentPage: React.FC = () => {
  const { groupId = '', levelId = '1' } = useParams<{ groupId: string, levelId: string }>();
  const navigate = useNavigate();
  const level = parseInt(levelId);
  const ageGroupDisplay = getAgeGroupDisplay(groupId);
  const content = getLevelContent(groupId, level);
  
  // Demo progress state - in a real app this would be stored/retrieved
  const [progress, setProgress] = React.useState(30);
  const [isCompleted, setIsCompleted] = React.useState(false);

  // Mock function to complete the level
  const handleCompleteLevel = () => {
    setProgress(100);
    setIsCompleted(true);
    // In a real app, you would save this to a database
  };

  // Dynamically render the content component if it exists
  const ContentComponent = content.component;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50">
      <header className="p-4 md:p-6 relative z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/age-group/${groupId}`}>
                  {ageGroupDisplay} Learning
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Level {level}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/age-group/${groupId}`)}
                className="gap-1"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
              
              <div className="text-sm font-medium text-muted-foreground">
                Level {level} of 6
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              {content.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <Progress value={progress} className="flex-1" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>{content.content}</p>
            </div>

            {/* Content Component */}
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
              {isCompleted ? (
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4 bg-gradient-to-r from-aishiksha-blue/20 to-aishiksha-purple/20 rounded-full animate-pulse-gentle">
                    <Trophy className="size-12 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Level Completed!</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    Great job! You've earned a badge for this level.
                  </p>
                  <Button 
                    onClick={() => navigate(`/age-group/${groupId}`)}
                    variant="outline"
                  >
                    Return to Levels
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleCompleteLevel}
                  className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple hover:from-aishiksha-purple hover:to-aishiksha-blue"
                >
                  Complete Level
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LevelContentPage;
