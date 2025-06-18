import { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import Message from './Message';
import Input from './Input';
import { useAuth } from '../../context/AuthContext';

const Chat = () => {
  const { user, logout } = useAuth();
  const {
    messages,
    input,
    loading,
    handleSendMessage,
    handleKeyDown,
    handleVoiceInput,
    handleExportChat,
    speechSupported,
    setInput,
  } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold">ZeroCode Chat</h2>
        <div className="flex gap-4 items-center">
          <span className="text-sm">Welcome, {user}</span>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <Message key={`${msg.sender}-${idx}`} message={msg} />
        ))}
        {loading && (
          <div className="text-gray-500 dark:text-gray-400 animate-pulse">
            ZeroCode is thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <Input
        input={input}
        setInput={setInput}
        onSend={handleSendMessage}
        onKeyDown={handleKeyDown}
        onVoiceInput={handleVoiceInput}
        onExport={handleExportChat}
        speechSupported={speechSupported}
      />
    </div>
  );
};

export default Chat;