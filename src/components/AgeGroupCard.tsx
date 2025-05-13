
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AgeGroupCardProps {
  ageRange: string;
  imageSrc: string;
  linkTo: string;
  className?: string;
}

const AgeGroupCard: React.FC<AgeGroupCardProps> = ({
  ageRange,
  imageSrc,
  linkTo,
  className
}) => {
  return (
    <Link 
      to={linkTo} 
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl", 
        "w-full mx-auto",
        // Increase size with 2:3 ratio (width:height)
        "h-[300px] md:h-[330px]", 
        // Ensure single row fit on desktop screens
        "md:max-w-[220px] lg:max-w-[240px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-lg"></div>
      
      <img 
        src={imageSrc} 
        alt={`${ageRange} age group`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 shadow-md text-center font-medium text-xs sm:text-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-aishiksha-blue/90 group-hover:to-aishiksha-purple/90 text-white group-hover:shadow-lg group-hover:shadow-aishiksha-purple/30 group-active:scale-95 sm:py-[10px] bg-transparent rounded-full sm:px-[12px]">
        {ageRange}
      </div>
    </Link>
  );
};

export default AgeGroupCard;
