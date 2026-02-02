import React from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in pb-20">
      {/* Logo Area - Clean & Transparent */}
      <div className="mb-8 relative group cursor-pointer" onClick={onStartChat}>
        {/* Glow effect behind the logo */}
        <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/20 transition-all duration-500"></div>
        
        {/* Logo Image - Increased size, removed white box container */}
        <img 
          src="/logoApp/logo-app.png" 
          alt="Gen2 Logo" 
          className="relative w-40 h-40 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback styling if image missing
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
            e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">G2</span>';
          }}
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">
        Gen2 Assistant
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-base md:text-lg max-w-lg mb-12 leading-relaxed">
        Experience the next generation of AI. Optimized for clarity, speed, and your daily workflow.
      </p>

      {/* Suggestion boxes removed as requested */}
    </div>
  );
};

export default WelcomeScreen;