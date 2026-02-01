import React from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in">
      {/* Logo/Mascot */}
      <div className="w-24 h-24 mb-6 relative">
        <div className="absolute inset-0 bg-violet-400 opacity-20 blur-xl rounded-full"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full rounded-tr-[40%] flex items-center justify-center shadow-lg shadow-violet-200">
           {/* Simple winking face constructed with divs/svg */}
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
             <path d="M9 13.5C9 13.5 8 13.5 8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M15 13.5C15 13.5 16 12 17 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M8 17C8 17 9.5 19 12 19C14.5 19 16 17 16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           {/* Winking eye */}
           <div className="absolute top-[38%] left-[32%] w-2 h-2 bg-white rounded-full"></div>
           <div className="absolute top-[36%] right-[32%] w-3 h-1 bg-white rounded-full rotate-12"></div>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
        Selamat datang di Gen2.ai
      </h1>

      {/* Subtitle */}
      <p className="text-slate-500 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
        Your intelligent assistant for chat, creativity, and limitless productivity.
      </p>

      {/* CTA Button - Visual only as it often just directs to input */}
      <button 
        onClick={onStartChat}
        className="flex flex-col items-center justify-center gap-2 group"
      >
        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
          <Sparkles className="text-violet-600" size={28} />
        </div>
        <span className="text-sm font-medium text-slate-700">Chat AI</span>
      </button>
    </div>
  );
};

export default WelcomeScreen;