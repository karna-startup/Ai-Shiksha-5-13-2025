import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Twitter, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
const SocialLinks: React.FC = () => {
  return <div className="flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium mb-3">Social Media</h3>
      <nav className="flex items-end justify-center h-16 gap-2 bg-background/80 backdrop-blur-sm border rounded-full py-[5px] my-[6px] mx-0 px-[36px]">
        {[{
        icon: Youtube,
        href: 'https://youtube.com',
        label: 'YouTube'
      }, {
        icon: Facebook,
        href: 'https://facebook.com',
        label: 'Facebook'
      }, {
        icon: Instagram,
        href: 'https://instagram.com',
        label: 'Instagram'
      }, {
        icon: Linkedin,
        href: 'https://linkedin.com',
        label: 'LinkedIn'
      }, {
        icon: Twitter,
        href: 'https://twitter.com',
        label: 'Twitter'
      }, {
        icon: MessageCircle,
        href: 'https://wa.me/+123456789',
        label: 'WhatsApp'
      }].map(({
        icon: Icon,
        href,
        label
      }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cn("relative flex items-center justify-center w-12 h-12", "transition-all duration-200 ease-out", "hover:w-16 hover:h-16 group")}>
            <Icon className={cn("w-6 h-6 transition-all", "group-hover:w-8 group-hover:h-8", "text-muted-foreground group-hover:text-primary")} />
            <span className="sr-only">{label}</span>
            <div className="absolute -bottom-4 scale-0 group-hover:scale-100 transition-transform">
              <div className="bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs">
                {label}
              </div>
            </div>
          </a>)}
      </nav>
    </div>;
};
export default SocialLinks;