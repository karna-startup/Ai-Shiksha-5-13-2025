
import React from 'react';
import AgeGroupCard from '@/components/AgeGroupCard';

const AgeGroupGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-[1400px] mx-auto">
      <AgeGroupCard ageRange="3-6 Years" imageSrc="/lovable-uploads/4058de57-2746-44bd-ac99-16c9d2405170.png" linkTo="/early-learners" className="h-[180px] sm:h-[200px]" />
      <AgeGroupCard ageRange="7-10 Years" imageSrc="/lovable-uploads/579d765c-58f8-454f-aa03-66f6557de94c.png" linkTo="/elementary" className="h-[180px] sm:h-[200px]" />
      <AgeGroupCard ageRange="11-14 Years" imageSrc="/lovable-uploads/d8c9136e-b4a4-4fc2-91e3-b553684e52a1.png" linkTo="/middle-school" className="h-[180px] sm:h-[200px]" />
      <AgeGroupCard ageRange="15-18 Years" imageSrc="/lovable-uploads/6f034866-9aa1-4b95-a121-9b3a6d46fbf0.png" linkTo="/high-school" className="h-[180px] sm:h-[200px]" />
      <AgeGroupCard ageRange="Common" imageSrc="/lovable-uploads/086b115e-2313-480b-aa6b-4711a42d74fc.png" linkTo="/common" className="h-[180px] sm:h-[200px]" />
    </div>
  );
};

export default AgeGroupGrid;
