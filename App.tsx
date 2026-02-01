import React, { useState, useEffect } from 'react';
import { Menu, MessageSquarePlus, X } from 'lucide-react';
import { Message, ChatSession, AppSettings } from './types';
import { sendMessageToGemini } from './services/gemini';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';

const STORAGE_KEY = 'gen2_sessions';
const SETTINGS_KEY = 'gen2_settings';

const App: React.FC = () => {
  // State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({ language: 'en' });

  // Load History & Settings on Mount
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {}
    }
  }, []);

  // Save Sessions whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const handleSendMessage = async (text: string) => {
    let sessionId = currentSessionId;
    let newSession = false;

    // Create new session if none exists or we are on welcome screen
    if (!sessionId) {
      newSession = true;
      sessionId = Date.now().toString();
      const newSessionObj: ChatSession = {
        id: sessionId,
        title: text.slice(0, 30) + (text.length > 30 ? '...' : ''), // Generate title from first msg
        messages: [],
        updatedAt: Date.now()
      };
      setSessions(prev => [newSessionObj, ...prev]);
      setCurrentSessionId(sessionId);
    }

    // Optimistic User Message
    const userMsg: Message = {
      role: 'user',
      text: text,
      id: Date.now().toString(),
    };

    // Update local state and session storage
    setMessages((prev) => [...prev, userMsg]);
    updateSessionMessages(sessionId, userMsg);
    
    setIsLoading(true);

    try {
      // API Call
      // Pass the current messages as history context
      const responseText = await sendMessageToGemini(messages, text);

      const modelMsg: Message = {
        role: 'model',
        text: responseText,
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, modelMsg]);
      updateSessionMessages(sessionId, modelMsg);

    } catch (error) {
      console.error("Failed to send message", error);
      const errorMsg: Message = {
          role: 'model',
          text: "Sorry, I encountered an error connecting to the server.",
          id: Date.now().toString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSessionMessages = (sessionId: string, newMessage: Message) => {
    setSessions(prev => prev.map(session => {
        if (session.id === sessionId) {
            return {
                ...session,
                messages: [...session.messages, newMessage],
                updatedAt: Date.now()
            };
        }
        return session;
    }).sort((a, b) => b.updatedAt - a.updatedAt)); // Move active to top
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setIsSidebarOpen(false);
  };

  const selectSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
        setMessages(session.messages);
        setCurrentSessionId(id);
        setIsSidebarOpen(false);
    }
  };

  // Modals Components
  const Modal: React.FC<{title: string, onClose: () => void, children: React.ReactNode}> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 relative animate-fade-in-text">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>
            {children}
        </div>
    </div>
  );

  return (
    <div className="flex h-[100dvh] bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={startNewChat}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={selectSession}
        onOpenSettings={() => setShowSettings(true)}
        onOpenHelp={() => setShowHelp(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        
        {/* Header */}
        <header className="flex justify-between items-center p-4 md:p-5 bg-slate-50/90 backdrop-blur-md sticky top-0 z-10 border-b border-transparent transition-all">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-600 transition-all active:scale-95"
            >
                <Menu size={24} />
            </button>
            <span className="font-semibold text-slate-700 md:hidden">Gen2</span>
          </div>
          
          <button 
            onClick={startNewChat}
            className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-600 transition-all border border-slate-200 bg-slate-50"
          >
             <MessageSquarePlus size={20} />
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full">
          {messages.length === 0 ? (
            <WelcomeScreen onStartChat={() => {
                 // Trigger focus on input via DOM if needed, currently implicit
            }} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </main>

        {/* Input Area */}
        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Settings Modal */}
      {showSettings && (
          <Modal title="Settings" onClose={() => setShowSettings(false)}>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">App Language</label>
                      <select 
                        value={settings.language}
                        onChange={(e) => {
                             const newSettings = { ...settings, language: e.target.value as any };
                             setSettings(newSettings);
                             localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
                        }}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                      </select>
                  </div>
                  <div className="text-xs text-slate-400 mt-4">
                      Version 2.0.0 (Beta)
                  </div>
              </div>
          </Modal>
      )}

      {/* Help Modal */}
      {showHelp && (
          <Modal title="Help & Support" onClose={() => setShowHelp(false)}>
             <div className="space-y-3 text-sm text-slate-600">
                 <p><strong>Gen2 Assistant</strong> is designed to help you with creative tasks, coding, and general knowledge.</p>
                 <ul className="list-disc pl-5 space-y-1">
                     <li>Use clear prompts for better results.</li>
                     <li>Chat history is saved automatically to your browser.</li>
                     <li>Code blocks can be copied with one click.</li>
                 </ul>
                 <div className="pt-4 border-t border-slate-100">
                     <a href="#" className="text-violet-600 font-medium hover:underline">Contact Support</a>
                 </div>
             </div>
          </Modal>
      )}
    </div>
  );
};

export default App;