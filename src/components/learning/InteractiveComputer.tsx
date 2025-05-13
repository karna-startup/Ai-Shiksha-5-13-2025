
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Monitor, Cpu, Keyboard, Mouse, Speaker } from 'lucide-react';
import { trackClick } from '@/services/userTrackingService';
import { cn } from '@/lib/utils';

interface ComputerPart {
  id: string;
  name: string;
  description: string;
  position: string;
  icon: React.ReactNode;
}

const computerParts: ComputerPart[] = [
  {
    id: 'monitor',
    name: 'Monitor',
    description: 'The monitor shows you pictures and text from the computer, like a TV screen!',
    position: 'top-[10%] left-[25%] w-[50%] h-[45%]',
    icon: <Monitor className="size-6" />
  },
  {
    id: 'cpu',
    name: 'CPU (Brain)',
    description: 'This is like the brain of the computer. It thinks and makes decisions very fast!',
    position: 'top-[60%] left-[25%] w-[20%] h-[35%]',
    icon: <Cpu className="size-6" />
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    description: 'The keyboard helps you type letters and numbers into the computer.',
    position: 'bottom-[5%] left-[20%] w-[45%] h-[15%]',
    icon: <Keyboard className="size-6" />
  },
  {
    id: 'mouse',
    name: 'Mouse',
    description: 'The mouse helps you point to and click on things on the screen.',
    position: 'bottom-[5%] right-[15%] w-[15%] h-[15%]',
    icon: <Mouse className="size-6" />
  },
  {
    id: 'speakers',
    name: 'Speakers',
    description: 'Speakers let you hear sounds and music from the computer!',
    position: 'top-[20%] right-[10%] w-[10%] h-[20%]',
    icon: <Speaker className="size-6" />
  }
];

const InteractiveComputer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [voiceResponse, setVoiceResponse] = useState<string>('Click on any computer part to learn about it!');

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    const part = computerParts.find(p => p.id === partId);
    
    if (part) {
      setVoiceResponse(part.description);
      trackClick(partId, 'computer-part', {
        partName: part.name,
        action: 'computer_part_click',
      });
      toast.success(`Great job! You found the ${part.name}!`);
    }

    setTimeout(() => setSelectedPart(null), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main computer display */}
      <div className="flex-1">
        <div className="relative aspect-video bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <img
            src="/lovable-uploads/ac8e1d91-48ff-4a80-a0b5-1b7c61aa4454.png"
            alt="Computer setup"
            className="w-full h-full object-contain"
          />
          
          {/* Clickable overlays */}
          {computerParts.map((part) => (
            <button
              key={part.id}
              onClick={() => handlePartClick(part.id)}
              onMouseEnter={() => setHoveredPart(part.id)}
              onMouseLeave={() => setHoveredPart(null)}
              className={cn(
                "absolute transition-all duration-300",
                part.position,
                "rounded-xl cursor-pointer",
                "hover:bg-aishiksha-blue/10 hover:ring-2 hover:ring-aishiksha-blue/30",
                selectedPart === part.id && "animate-bounce ring-4 ring-aishiksha-blue ring-opacity-50"
              )}
            >
              <span className="sr-only">{part.name}</span>
            </button>
          ))}
        </div>
        
        {/* Voice response bubble */}
        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-center text-lg font-medium">{voiceResponse}</p>
        </div>
      </div>

      {/* Right sidebar with part buttons */}
      <div className="flex flex-row md:flex-col gap-2 flex-wrap md:w-48">
        {computerParts.map((part) => (
          <button
            key={part.id}
            onClick={() => handlePartClick(part.id)}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            className={cn(
              "flex items-center gap-2 p-3 w-full",
              "rounded-full transition-all duration-300",
              "bg-white border border-slate-200 shadow-sm",
              "hover:scale-105 hover:shadow-md",
              "active:scale-95",
              (selectedPart === part.id || hoveredPart === part.id) && 
              "bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple text-white"
            )}
          >
            {part.icon}
            <span className="font-medium">{part.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveComputer;
