import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  ArrowPathIcon,
  ArrowUpIcon,
  MicrophoneIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import PromptTemplates from '../components/PromptTemplates';
import Message from '../components/Message';
import { useAuth } from '../lib/auth';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const { auth, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await axios.get('/api/chat/history', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const formattedMessages = response.data.map((msg: any) => ({
          id: msg.id,
          content: msg.message,
          isUser: msg.isUserMessage,
          timestamp: new Date(msg.createdAt),
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };

    if (auth.isAuthenticated) {
      loadHistory();
    }
  }, [auth]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle voice input transcript
  useEffect(() => {
    if (transcript) {
      setInput((prev) => prev + ' ' + transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        '/api/chat',
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      const botMessage = {
        id: Date.now().toString() + '-bot',
        content: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setInput(template);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            ZeroCode Chat
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {auth.username}
            </div>
            <button
              onClick={logout}
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Start a conversation
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Type a message below or try one of our prompt templates
              </p>
              <PromptTemplates onSelect={handleTemplateSelect} />
            </div>
          ) : (
            messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={1}
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2 flex space-x-1">
                {hasRecognitionSupport && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    <MicrophoneIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-full text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowUpIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
