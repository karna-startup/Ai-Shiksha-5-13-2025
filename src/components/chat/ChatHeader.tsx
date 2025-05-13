
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { trackUserAction } from '@/services/userTrackingService';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    trackUserAction({
      actionType: 'chat_toggle',
      elementId: 'chat-toggle',
      elementType: 'button',
      additionalData: {
        action: 'close_chat'
      }
    });
    onClose();
  };

  return (
    <div className="chat-header flex justify-between items-center p-4 border-b border-slate-200/20">
      <h3 className="font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        AI-Shiksha Chat
      </h3>
      <button 
        onClick={handleClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
      >
        &times;
      </button>
    </div>
  );
};

export default ChatHeader;
