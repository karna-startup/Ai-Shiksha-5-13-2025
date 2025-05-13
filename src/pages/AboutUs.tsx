
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import AnimatedBackground from '@/components/AnimatedBackground';
import { HeroIntro } from '@/components/about/HeroIntro';
import { MissionCard } from '@/components/about/MissionCard';
import { MissionVisionCards } from '@/components/about/MissionVisionCards';
import { SarasIntro } from '@/components/about/SarasIntro';
import { ValuesTable } from '@/components/about/ValuesTable';
import { ChallengeSolution } from '@/components/about/ChallengeSolution';

const AboutUs: React.FC = () => {
  return (
    <PlaceholderPage title="About AI-Shiksha" description="">
      <AnimatedBackground numberOfElements={25} />
      
      <div className="space-y-8 relative z-10">
        <HeroIntro />
        <MissionCard />
        <MissionVisionCards />
        <SarasIntro />
        <ValuesTable />
        <ChallengeSolution />
      </div>
    </PlaceholderPage>
  );
};

export default AboutUs;
