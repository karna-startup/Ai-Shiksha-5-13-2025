
import { useState } from 'react';
import { trackUserAction } from '@/services/userTrackingService';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMessage: ChatMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setIsLoading(true);

    trackUserAction({
      actionType: 'chat_message',
      elementId: 'chat-input',
      elementType: 'form',
      additionalData: {
        action: 'send_message',
        messageLength: newMessage.text.length
      }
    });

    try {
      const response = await fetch('https://karna-devops1.app.n8n.cloud/webhook-test/chat-box', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'demo_user_001',
          source: 'chatbox',
          message: newMessage.text,
          timestamp: newMessage.timestamp.toISOString()
        })
      });
      if (!response.ok) {
        console.error('Failed to send message to webhook');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }

    setInputValue('');
  };

  return {
    messages,
    inputValue,
    isLoading,
    setInputValue,
    sendMessage
  };
};
