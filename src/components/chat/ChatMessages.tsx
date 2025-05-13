
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import type { ChatMessage } from '@/hooks/useChat';

interface ChatMessagesProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, messagesEndRef }) => {
  const { isDarkMode } = useTheme();

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm animate-pulse">
          Send a message to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={cn(
            "max-w-[80%] transition-all duration-300",
            msg.isUser ? "ml-auto" : "mr-auto"
          )}
        >
          <div className={cn(
            "p-3 rounded-2xl backdrop-blur-sm",
            msg.isUser 
              ? "bg-primary/90 text-white" 
              : isDarkMode 
                ? "bg-slate-800/50 border border-slate-700/50" 
                : "bg-slate-50/50 border border-slate-200/50"
          )}>
            <p>{msg.text}</p>
          </div>
          <div className={cn(
            "text-xs mt-1 text-slate-400",
            msg.isUser ? "text-right" : ""
          )}>
            {msg.isUser ? 'You' : 'AI-Shiksha'}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
