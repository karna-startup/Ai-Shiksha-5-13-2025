
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'dark' : ''}`}>
      <AnimatedBackground numberOfElements={15} />
      
      <header className="p-4 flex justify-center relative z-10">
        <Link to="/" className="inline-block">
          <Logo className="text-xl" />
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg mx-auto bg-background/80 backdrop-blur-sm border border-border rounded-xl shadow-xl p-6 md:p-8">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
