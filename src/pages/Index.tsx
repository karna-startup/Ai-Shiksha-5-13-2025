
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/hero/HeroSection';
import AgeGroupGrid from '@/components/age-groups/AgeGroupGrid';
import Footer from '@/components/footer/Footer';
import VoiceButton from '@/components/VoiceButton';
import type { AgeRange } from '@/components/AgeToggle';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const [ageRange, setAgeRange] = useState<AgeRange>('middle');
  const { isDarkMode } = useTheme();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  // If user has a preferred age group, use that
  useEffect(() => {
    if (user?.age_group) {
      // Map user's age group to AgeRange
      const ageGroupMap: Record<string, AgeRange> = {
        "3-6": "young",
        "7-10": "middle", 
        "11-14": "middle",
        "15-18": "teen",
        "adult": "teen"
      };
      
      const preferredRange = ageGroupMap[user.age_group];
      if (preferredRange) {
        setAgeRange(preferredRange);
      }
    }
  }, [user]);
  
  const isYoungInterface = ageRange === 'young';
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500",
      isDarkMode ? "dark" : "",
      isYoungInterface ? "young-interface" : "",
      isPageLoaded ? "page-entry" : "opacity-0"
    )}>
      <AnimatedBackground numberOfElements={30} />
      
      <Header currentAgeRange={ageRange} onAgeChange={setAgeRange} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pb-24">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center space-y-12 px-4">
          <HeroSection />
          <AgeGroupGrid />
        </div>
        
        <VoiceButton isYoungInterface={isYoungInterface} />
      </main>
      
      <Footer isYoungInterface={isYoungInterface} />
    </div>
  );
};

export default Index;
