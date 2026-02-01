import React from 'react';
import { X, MessageSquare, Plus, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
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
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-[100dvh] w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
             {/* Updated to use PNG */}
             <img src="/logoApp/logo-app.png" alt="Logo" className="w-8 h-8 object-contain" />
             <h2 className="text-lg font-bold text-slate-800 tracking-tight">Gen2.ai</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 md:hidden">
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
            className="flex items-center justify-center gap-2 w-full p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span className="font-medium text-sm">New Chat</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3 mt-2">History</div>
          
          {sessions.length === 0 ? (
            <div className="px-4 text-sm text-slate-400 italic">No recent chats</div>
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
                    ? 'bg-violet-50 text-violet-700 font-medium' 
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <MessageSquare size={18} className={currentSessionId === session.id ? 'text-violet-500' : 'text-slate-400'} />
                <span className="truncate text-sm flex-1">{session.title}</span>
                {currentSessionId === session.id && (
                    <ChevronRight size={14} className="text-violet-400" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-1">
          <button 
            onClick={onOpenSettings}
            className="flex items-center gap-3 w-full p-3 hover:bg-white hover:shadow-sm rounded-xl text-slate-600 transition-all"
          >
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </button>
          <button 
            onClick={onOpenHelp}
            className="flex items-center gap-3 w-full p-3 hover:bg-white hover:shadow-sm rounded-xl text-slate-600 transition-all"
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