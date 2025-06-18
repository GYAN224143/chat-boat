import { useState, useCallback } from 'react';
import { sendMessage } from '../services/api';

type Message = {
  sender: 'user' | 'bot';
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const speechSupported =
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessage(input);
      const botMessage: Message = { sender: 'bot', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [input]);

  // ... other chat-related functions

  return {
    messages,
    input,
    loading,
    setInput,
    handleSendMessage,
    handleKeyDown,
    handleVoiceInput,
    handleExportChat,
    speechSupported,
  };
};
