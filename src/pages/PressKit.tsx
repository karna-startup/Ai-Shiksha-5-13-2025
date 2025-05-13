
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Mail } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Sparkles } from '@/components/ui/sparkles-effect';

const PressKit: React.FC = () => {
  return (
    <PlaceholderPage title="Press & Media Kit" description="">
      <AnimatedBackground numberOfElements={15} />
      
      <div className="space-y-8 relative z-10">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Welcome to the AI-Shiksha Press and Media Center. Here you'll find resources for journalists, 
            bloggers, and content creators interested in covering our educational platform.
          </p>
        </div>
        
        <Card className="border-primary/20">
          <CardContent className="p-12 text-center">
            <Sparkles>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent mb-4">
                Press Kit Coming Soon
              </h2>
            </Sparkles>
            
            <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary/10">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            
            <p className="text-xl mb-4">
              Our comprehensive press kit is currently being prepared.
            </p>
            <p className="text-muted-foreground mb-8">
              We're putting together high-quality resources for media professionals. In the meantime, if you need any information 
              for press purposes, please contact our media relations team.
            </p>
            
            <div className="flex justify-center">
              <Button className="flex items-center gap-2" variant="outline">
                <Mail size={16} />
                Contact Media Relations
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About AI-Shiksha</h2>
            <div className="prose dark:prose-invert">
              <p>
                AI-Shiksha is an innovative educational technology platform that uses artificial intelligence 
                to provide personalized computer science education for learners of all ages. Our mission is to make 
                quality computer science education accessible to everyone, regardless of their background or location.
              </p>
              
              <h3>Key Facts</h3>
              <ul>
                <li>Founded by: Karunakar</li>
                <li>Headquarters: Warangal, Telangana, India</li>
                <li>Focus: Computer Science education through AI-driven personalization</li>
                <li>Age groups: 3-18 years</li>
              </ul>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText size={16} />
                Basic Info Sheet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlaceholderPage>
  );
};

export default PressKit;
