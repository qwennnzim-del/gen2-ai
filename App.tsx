import React, { useState } from 'react';
import { Menu, MessageSquarePlus } from 'lucide-react';
import { Message } from './types';
import { sendMessageToGemini } from './services/gemini';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (text: string) => {
    // Optimistic User Message
    const userMsg: Message = {
      role: 'user',
      text: text,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // API Call
      const responseText = await sendMessageToGemini(messages, text);

      const modelMsg: Message = {
        role: 'model',
        text: responseText,
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={startNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        
        {/* Header */}
        <header className="flex justify-between items-center p-4 md:p-6 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-200/50 rounded-xl text-slate-600 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <button 
            onClick={startNewChat}
            className="p-2 hover:bg-slate-200/50 rounded-full text-slate-600 transition-colors border border-slate-200 bg-white shadow-sm"
          >
             <MessageSquarePlus size={20} />
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {messages.length === 0 ? (
            <WelcomeScreen onStartChat={() => {
                // Focus input logic could go here, for now it just renders the view
            }} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </main>

        {/* Input Area */}
        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;