import React from 'react';
import { Language } from '../types';

interface WelcomeScreenProps {
  onStartChat: () => void;
  language: Language;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat, language }) => {
  const t = {
    title: 'Gen2 Assistant',
    subtitle: language === 'id' 
      ? 'Rasakan pengalaman AI generasi berikutnya. Dioptimalkan untuk kejelasan, kecepatan, dan alur kerja harian Anda.'
      : 'Experience the next generation of AI. Optimized for clarity, speed, and your daily workflow.'
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in pb-10">
      {/* Logo Area - Clean & Transparent */}
      {/* Added mt-16 to shift visual center downwards as requested */}
      <div className="mb-8 mt-16 relative group cursor-pointer" onClick={onStartChat}>
        {/* Glow effect behind the logo */}
        <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/20 transition-all duration-500"></div>
        
        {/* Logo Image - Optimized Size (w-24 mobile, w-32 desktop) for better aesthetics */}
        <img 
          src="/logoApp/logo-app.png" 
          alt="Gen2 Logo" 
          className="relative w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
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
        {t.title}
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-base md:text-lg max-w-lg mb-12 leading-relaxed">
        {t.subtitle}
      </p>

    </div>
  );
};

export default WelcomeScreen;