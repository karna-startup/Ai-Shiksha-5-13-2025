import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useTheme } from '@/contexts/ThemeContext';
import LearningLevel from '@/components/LearningLevel';
const EarlyLearners: React.FC = () => {
  const {
    isDarkMode
  } = useTheme();

  // Mock data for completed levels - in a real app this would come from a database or localStorage
  const completedLevels = [1, 2]; // Example: levels 1 and 2 are completed

  return <div className={`min-h-screen flex flex-col relative overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      <AnimatedBackground numberOfElements={25} />
      
      <header className="p-4 flex items-center justify-between relative z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <AccessibilityControls />
      </header>
      
      <main className="flex-1 container mx-auto p-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
            Early Learners (3-6 Years)
          </h1>
          
          <div className="rounded-xl overflow-hidden shadow-xl mb-8">
            <img src="/lovable-uploads/4058de57-2746-44bd-ac99-16c9d2405170.png" alt="Early learners" className="w-full h-auto max-h-[40vh] object-contain" />
          </div>
          
          <p className="text-center mb-8">Fun and interactive computer science activities for our youngest learners!</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Learning Levels</h2>
            <p className="text-center text-muted-foreground text-sm mb-6">Click on a star to start learning at that level</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
              {Array.from({
              length: 6
            }, (_, i) => <LearningLevel key={i + 1} level={i + 1} maxLevel={6} ageGroup="young" isCompleted={completedLevels.includes(i + 1)} />)}
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default EarlyLearners;