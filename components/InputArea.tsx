import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, ChevronUp } from 'lucide-react';

interface InputAreaProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(48, Math.min(textareaRef.current.scrollHeight, 160))}px`;
    }
  }, [input]);

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 md:pb-8 bg-gradient-to-t from-black via-black to-transparent z-20">
      <div className="max-w-3xl mx-auto">
        
        {/* Outer Container - Soft Glow Style Dark Mode */}
        <div className={`
          relative rounded-[28px] overflow-hidden p-[1px] transition-all duration-700 ease-out
          ${isFocused 
            ? 'shadow-[0_15px_40px_-10px_rgba(139,92,246,0.15)] translate-y-[-2px]' 
            : 'shadow-lg shadow-black/50'}
        `}>
          
          {/* Fading Ambient Glow Layer - Diffused & Soft */}
          <div 
            className={`
              absolute top-1/2 left-1/2 w-[200%] h-[200%] blur-[25px]
              bg-[conic-gradient(from_0deg,transparent_0deg,#6d28d9_120deg,#be185d_180deg,transparent_360deg)]
              transition-all duration-1000
              ${isFocused ? 'opacity-40 spin-slow' : 'opacity-0'}
            `}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
          
          {/* Static Border (Clean/Minimal) */}
          <div className={`absolute inset-0 bg-white/10 transition-opacity duration-700 ${isFocused ? 'opacity-0' : 'opacity-100'}`} />
          
          {/* Inner Content Body */}
          <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[27px] flex flex-col w-full overflow-hidden">
            
            {/* 1. TOP: Comfortable Text Input Area */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Tulis pesan untuk Gen2..."
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none px-5 pt-4 pb-2 text-slate-100 placeholder:text-slate-500 resize-none min-h-[52px] max-h-[160px] text-[16px] leading-relaxed transition-all"
            />

            {/* 2. BOTTOM: Refined Control Bar */}
            <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
              
              {/* Model Badge - Minimalist & Soft */}
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-full transition-all group/pill">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 transition-all duration-500 ${isFocused ? 'shadow-[0_0_10px_rgba(139,92,246,0.5)] scale-110' : 'opacity-70'}`}></div>
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-[0.15em]">Gen2 Flash</span>
                <ChevronUp size={12} className="text-slate-600 group-hover:text-slate-400 transition-transform group-hover:-translate-y-0.5" />
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors rounded-full hover:bg-white/5 btn-pop" title="Lampirkan file">
                    <Paperclip size={18} className="rotate-45" />
                  </button>
                  
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={`
                      p-2.5 rounded-full transition-all duration-500 btn-pop flex items-center justify-center
                      ${input.trim() && !isLoading 
                        ? 'bg-slate-100 text-black shadow-lg shadow-white/10 hover:bg-white hover:scale-105 active:scale-95' 
                        : 'bg-white/5 text-slate-700 cursor-not-allowed'}
                    `}
                  >
                    <ArrowUp size={18} strokeWidth={2.5} />
                  </button>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-3 font-medium tracking-wide">
          GEN2 AI ASSISTANT • VERSION 2.5
        </p>
      </div>
    </div>
  );
};

export default InputArea;