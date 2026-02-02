import React from 'react';
import { X, MessageSquare, Plus, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewChat, 
  sessions, 
  currentSessionId,
  onSelectSession,
  onOpenSettings,
  onOpenHelp
}) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel - Dark Mode */}
      <div className={`fixed top-0 left-0 h-[100dvh] w-[280px] bg-neutral-950 border-r border-white/5 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header - Logo Only (Optimized) */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center">
             {/* Logo enlarged and text removed as requested */}
             <img src="/logoApp/logo-app.png" alt="Gen2.ai" className="h-8 w-auto object-contain" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 pb-2">
          <button 
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="flex items-center justify-center gap-2 w-full p-3.5 bg-slate-100 hover:bg-white text-black rounded-xl shadow-lg shadow-white/5 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span className="font-semibold text-sm">New Chat</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3 mt-2">History</div>
          
          {sessions.length === 0 ? (
            <div className="px-4 text-sm text-slate-600 italic">No recent chats</div>
          ) : (
            sessions.map((session) => (
              <button 
                key={session.id}
                onClick={() => {
                  onSelectSession(session.id);
                  if (window.innerWidth < 768) onClose();
                }}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors group relative ${
                  currentSessionId === session.id 
                    ? 'bg-white/10 text-slate-200 font-medium' 
                    : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <MessageSquare size={18} className={currentSessionId === session.id ? 'text-violet-400' : 'text-slate-600'} />
                <span className="truncate text-sm flex-1">{session.title}</span>
                {currentSessionId === session.id && (
                    <ChevronRight size={14} className="text-violet-400" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 bg-black/50 space-y-1">
          <button 
            onClick={onOpenSettings}
            className="flex items-center gap-3 w-full p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
          >
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </button>
          <button 
            onClick={onOpenHelp}
            className="flex items-center gap-3 w-full p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
          >
            <HelpCircle size={18} />
            <span className="text-sm">Help & Support</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;