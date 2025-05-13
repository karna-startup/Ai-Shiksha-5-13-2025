
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer/Footer';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = 'This page is under construction. Please check back soon for more information.',
  children
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500",
      isDarkMode ? "dark" : ""
    )}>
      <Header currentAgeRange="middle" onAgeChange={() => {}} />
      
      <main className="flex-1 flex flex-col p-6 relative z-10 container mx-auto max-w-5xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">{title}</h1>
          {!children && <p className="text-muted-foreground">{description}</p>}
        </div>
        
        <div className="animate-page-transition">
          {children}
        </div>
      </main>
      
      <Footer isYoungInterface={false} />
    </div>
  );
};

export default PlaceholderPage;
