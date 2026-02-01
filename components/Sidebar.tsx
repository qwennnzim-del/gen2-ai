import React from 'react';
import { X, MessageSquare, Plus, Settings, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Gen2.ai</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <X size={20} />
            </button>
          </div>

          <button 
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="flex items-center gap-3 w-full p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-md shadow-violet-200 transition-all mb-6"
          >
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Recent</h3>
            {/* Mock History Items */}
            <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-xl text-slate-600 text-left transition-colors">
              <MessageSquare size={18} />
              <span className="truncate text-sm">Welcome to Gen2</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-xl text-slate-600 text-left transition-colors">
              <MessageSquare size={18} />
              <span className="truncate text-sm">Creative writing ideas</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-1">
            <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors">
              <HelpCircle size={18} />
              <span className="text-sm">Help & Support</span>
            </button>
             <button className="flex items-center gap-3 w-full p-3 hover:bg-red-50 text-red-500 rounded-xl transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;