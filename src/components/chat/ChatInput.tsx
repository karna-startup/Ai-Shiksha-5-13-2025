
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatInputProps {
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  isLoading,
  onInputChange,
  onSubmit
}) => {
  const { isDarkMode } = useTheme();

  return (
    <form onSubmit={onSubmit} className="chat-input p-4 border-t border-slate-200/20">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className={cn(
            "flex-1 p-2 rounded-xl border bg-transparent",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition-all duration-300",
            isDarkMode 
              ? "border-slate-700/50 placeholder:text-slate-500" 
              : "border-slate-200/50 placeholder:text-slate-400"
          )}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !inputValue.trim()}
          className="rounded-xl bg-primary/90 hover:bg-primary transition-all duration-300"
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
