
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { trackUserAction } from '@/services/userTrackingService';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const { messages, inputValue, isLoading, setInputValue, sendMessage } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    trackUserAction({
      actionType: 'chat_toggle',
      elementId: 'chat-toggle',
      elementType: 'button',
      additionalData: {
        action: newIsOpen ? 'open_chat' : 'close_chat'
      }
    });
  };

  return (
    <div className="fixed bottom-[100px] left-4 z-50 flex flex-col">
      {isOpen ? (
        <div className={cn(
          "chat-container flex flex-col w-80 h-96 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300",
          "hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:scale-[1.02]",
          isDarkMode 
            ? "bg-slate-900/90 border border-slate-700/50" 
            : "bg-white/90 border border-slate-200/50"
        )}>
          <ChatHeader onClose={toggleChat} />
          <div className="chat-messages flex-1 p-4 overflow-y-auto space-y-4">
            <ChatMessages 
              messages={messages}
              messagesEndRef={messagesEndRef}
            />
          </div>
          <ChatInput 
            inputValue={inputValue}
            isLoading={isLoading}
            onInputChange={setInputValue}
            onSubmit={sendMessage}
          />
        </div>
      ) : (
        <button
          onClick={toggleChat}
          aria-label="Open chat"
          className={cn(
            "text-lg font-normal rounded-full p-4",
            "bg-primary/90 text-white shadow-lg",
            "hover:bg-primary hover:shadow-xl hover:scale-110",
            "transition-all duration-300"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBox;
