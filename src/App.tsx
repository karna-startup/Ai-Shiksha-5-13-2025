
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import EarlyLearners from './pages/EarlyLearners';
import ElementaryLearners from './pages/ElementaryLearners';
import MiddleSchool from './pages/MiddleSchool';
import HighSchool from './pages/HighSchool';
import CommonLearning from './pages/CommonLearning';
import NotFound from './pages/NotFound';
import LevelContent from './pages/LevelContent';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './contexts/ThemeContext';
import ChatBox from './components/chat/ChatBox';
import usePageViewTracking from './hooks/useTracking';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import UserProfile from './pages/UserProfile';

// Footer pages
import AboutUs from './pages/AboutUs';
import FAQs from './pages/FAQs';
import FoundersBio from './pages/FoundersBio';
import PartnerWithUs from './pages/PartnerWithUs';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import LearningStories from './pages/LearningStories';
import PressKit from './pages/PressKit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ChildDataProtection from './pages/ChildDataProtection';

function App() {
  // Track page views
  usePageViewTracking();
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth routes */}
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          
          {/* User profile route */}
          <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
          
          {/* Age group landing pages - protected */}
          <Route path="/early-learners" element={<RequireAuth><EarlyLearners /></RequireAuth>} />
          <Route path="/elementary" element={<RequireAuth><ElementaryLearners /></RequireAuth>} />
          <Route path="/middle-school" element={<RequireAuth><MiddleSchool /></RequireAuth>} />
          <Route path="/high-school" element={<RequireAuth><HighSchool /></RequireAuth>} />
          <Route path="/common" element={<RequireAuth><CommonLearning /></RequireAuth>} />
          
          {/* Level content pages for each age group - protected */}
          <Route path="/early-learners/level/:levelId" element={<RequireAuth><LevelContent /></RequireAuth>} />
          <Route path="/elementary/level/:levelId" element={<RequireAuth><LevelContent /></RequireAuth>} />
          <Route path="/middle-school/level/:levelId" element={<RequireAuth><LevelContent /></RequireAuth>} />
          <Route path="/high-school/level/:levelId" element={<RequireAuth><LevelContent /></RequireAuth>} />
          <Route path="/common/level/:levelId" element={<RequireAuth><LevelContent /></RequireAuth>} />
          
          {/* Footer pages */}
          {/* Company */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/founders-bio" element={<FoundersBio />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Careers */}
          <Route path="/careers" element={<Careers />} />
          
          {/* Resources */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/learning-stories" element={<LearningStories />} />
          <Route path="/press-kit" element={<PressKit />} />
          
          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/child-data-protection" element={<ChildDataProtection />} />
          
          {/* Catch all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBox />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
