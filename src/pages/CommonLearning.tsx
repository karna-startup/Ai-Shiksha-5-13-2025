import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AccessibilityControls from '@/components/AccessibilityControls';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';
import LearningLevel from '@/components/LearningLevel';
const CommonLearning: React.FC = () => {
  const {
    isDarkMode
  } = useTheme();

  // Mock data for completed levels - in a real app this would come from a database or localStorage
  const completedLevels: number[] = []; // No levels completed in this example

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
      
      <main className="flex-1 container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
            Common Learning Resources
          </h1>
          
          <div className="rounded-xl overflow-hidden shadow-xl mb-8">
            <img src="/lovable-uploads/086b115e-2313-480b-aa6b-4711a42d74fc.png" alt="Common learning resources" className="w-full h-auto max-h-[40vh] object-contain" />
          </div>
          
          <p className="text-center mb-8">Universal computer science resources suitable for all age groups.</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Learning Levels</h2>
            <p className="text-center text-muted-foreground text-sm mb-6">Click on a star to start learning at that level</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
              {Array.from({
              length: 6
            }, (_, i) => <LearningLevel key={i + 1} level={i + 1} maxLevel={6} ageGroup="common" isCompleted={completedLevels.includes(i + 1)} />)}
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default CommonLearning;