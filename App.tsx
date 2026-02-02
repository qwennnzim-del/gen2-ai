import React, { useState, useEffect } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { Message, ChatSession, AppSettings, ModelType, Attachment } from './types';
import { sendMessageToGemini } from './services/gemini';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import LandingPage from './components/LandingPage';

const STORAGE_KEY = 'gen2_sessions';
const SETTINGS_KEY = 'gen2_settings';

const App: React.FC = () => {
  // View State: 'landing' | 'chat'
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');

  // State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  // Default to V3, but will be overwritten by local storage if exists
  const [settings, setSettings] = useState<AppSettings>({ 
    language: 'en', 
    model: ModelType.GEMINI_V3 
  });
  
  // Delete Confirmation State inside Settings
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        const parsed = JSON.parse(savedSettings);
        // Ensure robust fallback for model and language
        setSettings({
            language: parsed.language || 'en',
            model: parsed.model || ModelType.GEMINI_V3
        });
      } catch (e) {}
    }
  }, []);

  // Save Sessions whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Handle Model Change directly
  const handleModelChange = (newModel: ModelType) => {
    const newSettings = { ...settings, model: newModel };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const handleSendMessage = async (text: string, attachments: Attachment[] = []) => {
    let sessionId = currentSessionId;
    let newSession = false;

    // Create new session if none exists or we are on welcome screen
    if (!sessionId) {
      newSession = true;
      sessionId = Date.now().toString();
      const newSessionObj: ChatSession = {
        id: sessionId,
        title: text ? text.slice(0, 30) : `Attachment ${new Date().toLocaleTimeString()}`, // Generate title
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
      attachments: attachments // Store attachments locally
    };

    // Update local state and session storage
    setMessages((prev) => [...prev, userMsg]);
    updateSessionMessages(sessionId, userMsg);
    
    setIsLoading(true);

    try {
      // API Call
      // Pass the current messages as history context AND the selected model
      const responseText = await sendMessageToGemini(messages, text, settings.model, attachments);

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
          text: settings.language === 'id' ? "Maaf, terjadi kesalahan saat menghubungkan ke server Zent Technology." : "Sorry, I encountered an error connecting to the Zent Technology server.",
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

  // Delete All Logic
  const handleDeleteAllHistory = () => {
    setSessions([]);
    setMessages([]);
    setCurrentSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
    setShowDeleteConfirm(false);
    setShowSettings(false);
  };

  // Modals Components - Dark Mode Updated
  const Modal: React.FC<{title: string, onClose: () => void, children: React.ReactNode}> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl p-6 relative animate-fade-in-text">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            {children}
        </div>
    </div>
  );

  // Simple Translation Helpers
  const t = {
    settingsTitle: settings.language === 'id' ? 'Pengaturan' : 'Settings',
    helpTitle: settings.language === 'id' ? 'Tentang Gen2' : 'About Gen2',
    languageLabel: settings.language === 'id' ? 'Bahasa Aplikasi' : 'App Language',
    deleteLabel: settings.language === 'id' ? 'Hapus Semua Riwayat' : 'Delete All History',
    deleteDesc: settings.language === 'id' ? 'Tindakan ini akan menghapus semua percakapan secara permanen.' : 'This action will permanently delete all your conversations.',
    confirmTitle: settings.language === 'id' ? 'Apakah Anda yakin?' : 'Are you sure?',
    confirmDesc: settings.language === 'id' ? 'Tindakan ini tidak dapat dibatalkan.' : 'This action cannot be undone.',
    cancelBtn: settings.language === 'id' ? 'Batal' : 'Cancel',
    deleteBtn: settings.language === 'id' ? 'Hapus' : 'Delete',
    helpP1: settings.language === 'id' 
      ? 'Gen2 adalah asisten AI canggih yang dikembangkan oleh Zent Technology.' 
      : 'Gen2 is an advanced AI assistant developed by Zent Technology.',
    helpLi1: settings.language === 'id' ? 'Ultra Memory untuk konteks percakapan yang panjang.' : 'Ultra Memory for extensive conversation context.',
    helpLi2: settings.language === 'id' ? 'Analisis File (PDF, Gambar, Video, Kode).' : 'File Analysis (PDF, Images, Video, Code).',
    helpLi3: settings.language === 'id' ? 'Privasi dan keamanan terjamin.' : 'Privacy and security guaranteed.',
    contact: settings.language === 'id' ? 'Zent Technology' : 'Zent Technology'
  };

  // -------------------------------------------------------------------------
  // RENDER: LANDING PAGE
  // -------------------------------------------------------------------------
  if (currentView === 'landing') {
    return <LandingPage onStart={() => setCurrentView('chat')} />;
  }

  // -------------------------------------------------------------------------
  // RENDER: CHAT APP
  // -------------------------------------------------------------------------
  return (
    <div className="flex h-[100dvh] bg-black text-slate-200 font-sans overflow-hidden animate-fade-in">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={startNewChat}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={selectSession}
        onOpenSettings={() => {
            setShowSettings(true);
            setShowDeleteConfirm(false); // Reset confirm state
        }}
        onOpenHelp={() => setShowHelp(true)}
        language={settings.language}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        
        {/* Header - Dark Mode */}
        <header className="flex justify-between items-center p-4 md:p-5 bg-black/80 backdrop-blur-md sticky top-0 z-10 border-b border-transparent transition-all">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/10 hover:shadow-sm rounded-xl text-slate-400 hover:text-slate-200 transition-all active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/>
                </svg>
            </button>
          </div>
          
          <button 
            onClick={startNewChat}
            className="p-2 hover:bg-white/10 hover:shadow-sm rounded-full text-slate-400 hover:text-slate-200 transition-all border border-white/10 bg-black"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h8"/><path d="M12 8v8"/>
             </svg>
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full">
          {messages.length === 0 ? (
            <WelcomeScreen 
                onStartChat={() => {
                   // Trigger focus logic if needed
                }} 
                language={settings.language}
            />
          ) : (
            <MessageList 
                messages={messages} 
                isLoading={isLoading} 
                language={settings.language}
            />
          )}
        </main>

        {/* Input Area */}
        <InputArea 
            onSend={handleSendMessage} 
            isLoading={isLoading} 
            language={settings.language}
            modelType={settings.model}
            onModelChange={handleModelChange}
        />
      </div>

      {/* Settings Modal */}
      {showSettings && (
          <Modal title={t.settingsTitle} onClose={() => setShowSettings(false)}>
              <div className="space-y-6">
                  {/* Language Selector */}
                  <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">{t.languageLabel}</label>
                      <select 
                        value={settings.language}
                        onChange={(e) => {
                             const newSettings = { ...settings, language: e.target.value as any };
                             setSettings(newSettings);
                             localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
                        }}
                        className="w-full p-2.5 bg-black border border-white/20 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                      </select>
                  </div>
                  
                  {/* Delete History Section */}
                  <div className="pt-4 border-t border-white/10">
                    {!showDeleteConfirm ? (
                        <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full flex items-center justify-between p-3 bg-red-900/10 hover:bg-red-900/20 border border-red-500/20 rounded-xl text-red-400 transition-all group"
                        >
                            <span className="font-medium">{t.deleteLabel}</span>
                            <Trash2 size={18} className="group-hover:scale-110 transition-transform"/>
                        </button>
                    ) : (
                        <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 animate-fade-in-text">
                            <div className="flex items-center gap-2 text-red-400 mb-2">
                                <AlertTriangle size={18} />
                                <span className="font-bold text-sm">{t.confirmTitle}</span>
                            </div>
                            <p className="text-xs text-red-300/80 mb-4 leading-relaxed">
                                {t.confirmDesc}
                            </p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 py-2 px-3 bg-transparent border border-white/10 hover:bg-white/5 rounded-lg text-xs font-medium text-slate-400 transition-colors"
                                >
                                    {t.cancelBtn}
                                </button>
                                <button 
                                    onClick={handleDeleteAllHistory}
                                    className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium text-white shadow-lg shadow-red-900/20 transition-all active:scale-95"
                                >
                                    {t.deleteBtn}
                                </button>
                            </div>
                        </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mt-2 text-center">
                      Gen2 Assistant v2.5
                  </div>
              </div>
          </Modal>
      )}

      {/* Help Modal */}
      {showHelp && (
          <Modal title={t.helpTitle} onClose={() => setShowHelp(false)}>
             <div className="space-y-3 text-sm text-slate-300">
                 <p>{t.helpP1}</p>
                 <ul className="list-disc pl-5 space-y-1 text-slate-400">
                     <li>{t.helpLi1}</li>
                     <li>{t.helpLi2}</li>
                     <li>{t.helpLi3}</li>
                 </ul>
                 <div className="pt-4 border-t border-white/10">
                     <span className="text-violet-400 font-bold">{t.contact}</span>
                 </div>
             </div>
          </Modal>
      )}
    </div>
  );
};

export default App;