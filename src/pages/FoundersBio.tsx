
import React from 'react';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sparkles } from '@/components/ui/sparkles-effect';
import AnimatedBackground from '@/components/AnimatedBackground';

const FoundersBio: React.FC = () => {
  return (
    <PlaceholderPage title="Meet Our Founder" description="">
      <AnimatedBackground numberOfElements={20} />
      
      <div className="space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            <Avatar className="w-56 h-56 border-4 border-primary/20 shadow-xl">
              <AvatarImage 
                src="/lovable-uploads/1e2d274c-0ac1-4c6a-82fe-6527f620fcae.png" 
                alt="Karunakar, Founder of AI-Shiksha"
                className="object-cover"
              />
              <AvatarFallback className="text-4xl">K</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="w-full md:w-2/3">
            <Sparkles>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
                By Karunakar
              </h2>
            </Sparkles>
            <p className="text-lg text-primary mb-4">Founder & CEO, AI-Shiksha</p>
            
            <div className="prose dark:prose-invert max-w-none">
              <p>
                I'm Karunakar, the founder of Ai-Shiksha, and my journey began with a simple yet powerful 
                belief — "Education is the key to shaping the future of INDIA. But it's not just about 
                teaching children — it's about helping them believe in their own potential".
              </p>
            </div>
          </div>
        </div>
        
        <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
              A Movement, Not Just a Startup
            </h3>
            <p className="mb-4">
              Ai-Shiksha isn't just a startup — it's a movement to reimagine how every child learns, dreams, 
              and builds. And like every meaningful revolution, it begins in India.
            </p>
            <p className="mb-4">
              India's story has always been one of thinkers, builders, and visionaries — a land where 
              innovation is rooted in spirit and culture. Ai-Shiksha is my contribution to that 
              legacy — a platform where children can explore Computer Science with curiosity, creativity, 
              and courage. It's about nurturing leaders, problem-solvers, and creators for the world of tomorrow.
            </p>
            <Separator className="my-6" />
            <p className="italic border-l-4 border-aishiksha-blue pl-4 py-2">
              "I believe education shouldn't be limited to memorizing facts or following fixed instructions. It 
              should help every child discover who they are, what they love, and how they can shape the 
              world around them."
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
                A Deeply Personal Mission
              </h3>
              <p className="mb-4">
                This journey is deeply personal. I wanted to create the kind of mentor and support system 
                I wish I had growing up — someone who believes in you, who understands your journey, 
                and who stays with you every step of the way. Ai-Shiksha is that voice, that guide, 
                and that friend for every child.
              </p>
              <p>
                Our mission is to make sure every child, no matter where they start from, has access to 
                the tools, confidence, and support to pursue their dreams — starting in India, and expanding beyond.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
                Freedom to Dream
              </h3>
              <p className="mb-4">
                I truly believe that every child deserves the freedom to dream with boldness and to build 
                with purpose. When a dream is rooted in passion and supported by the right tools, 
                it becomes unstoppable. That's the energy we want to ignite — in every classroom, 
                every home, and every curious young mind.
              </p>
              <div className="space-y-1 mt-6 font-medium">
                <p>Ai-Shiksha is not just a platform.</p>  
                <p>It's a movement.</p>  
                <p>A movement to unlock the potential of millions of children.</p>  
                <p>And it begins right here — with India.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PlaceholderPage>
  );
};

export default FoundersBio;
