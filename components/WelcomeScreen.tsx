import React from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in pb-20">
      {/* Logo Area */}
      <div className="w-28 h-28 mb-8 relative group cursor-pointer" onClick={onStartChat}>
        <div className="absolute inset-0 bg-violet-400/30 blur-2xl rounded-full group-hover:bg-violet-400/40 transition-all duration-500"></div>
        <div className="relative w-full h-full p-2 bg-white rounded-[2rem] shadow-xl shadow-violet-100 border border-white transform group-hover:scale-105 transition-transform duration-300">
           {/* Logo Image - Updated to PNG */}
           <img 
            src="/logoApp/logo-app.png" 
            alt="Gen2 Logo" 
            className="w-full h-full object-contain drop-shadow-sm"
            onError={(e) => {
              // Fallback styling if image missing
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-violet-500', 'to-fuchsia-500');
              e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl font-bold text-white">G2</span>';
            }}
           />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
        Gen2 Assistant
      </h1>

      {/* Subtitle */}
      <p className="text-slate-500 text-base md:text-lg max-w-lg mb-12 leading-relaxed">
        Experience the next generation of AI. Optimized for clarity, speed, and your daily workflow.
      </p>

      {/* CTA Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
        <button onClick={onStartChat} className="p-4 bg-white border border-slate-100 hover:border-violet-200 hover:shadow-md rounded-xl text-left transition-all group">
            <span className="block text-sm font-semibold text-slate-700 mb-1 group-hover:text-violet-600">✍️ Creative Writing</span>
            <span className="text-xs text-slate-400">Draft a blog post about AI</span>
        </button>
        <button onClick={onStartChat} className="p-4 bg-white border border-slate-100 hover:border-violet-200 hover:shadow-md rounded-xl text-left transition-all group">
            <span className="block text-sm font-semibold text-slate-700 mb-1 group-hover:text-violet-600">🧠 Brainstorming</span>
            <span className="text-xs text-slate-400">Ideas for a marketing campaign</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;