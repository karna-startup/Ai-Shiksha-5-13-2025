
import React from 'react';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import SocialLinks from './SocialLinks';
import VisitorCounter from '@/components/VisitorCounter';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  isYoungInterface: boolean;
}

const Footer: React.FC<FooterProps> = ({ isYoungInterface }) => {
  return (
    <footer className={cn("relative z-10 py-8 px-4 bg-muted/30 backdrop-blur-sm text-foreground/80 text-sm w-full", isYoungInterface ? "hidden" : "")}>
      <div className="container mx-auto flex flex-col space-y-6">
        <SocialLinks />
        
        <div className="flex items-center justify-between pt-4 border-t border-muted">
          <div className="flex-1 flex justify-start">
            <VisitorCounter />
          </div>
          
          <div className="flex-1 flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Get in touch</DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pt-2">
          {/* Company Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/founders-bio" className="hover:text-primary transition-colors">Founder's Bio</Link></li>
              <li><Link to="/partner-with-us" className="hover:text-primary transition-colors">Partner with Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Careers Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Careers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/careers" className="hover:text-primary transition-colors">
                  Work with the Startup
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/learning-stories" className="hover:text-primary transition-colors">Learning Stories</Link></li>
              <li><Link to="/press-kit" className="hover:text-primary transition-colors">Press/Media Kit</Link></li>
            </ul>
          </div>
          
          {/* Social Media Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Social Media</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter (X)</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a></li>
            </ul>
          </div>
          
          {/* Legal Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link to="/child-data-protection" className="hover:text-primary transition-colors">Child Data Protection</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Centered copyright text */}
        <div className="text-center">
          <p className="font-medium">AI-Shiksha © 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
