import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, ChevronUp } from 'lucide-react';
import { ModelType } from '../types';

interface InputAreaProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 md:pb-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 px-4 py-3 flex items-end gap-2 transition-all focus-within:ring-2 focus-within:ring-violet-100 focus-within:border-violet-200">
          
          {/* Mobile/Desktop Layout Wrapper */}
          <div className="flex flex-col flex-1 gap-2">
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan ke Gen2..."
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none p-0 text-slate-800 placeholder:text-slate-400 resize-none min-h-[24px] max-h-[120px] py-1 text-base"
            />

            {/* Bottom Row inside the bubble: Model Selector & Icons */}
            <div className="flex items-center justify-between mt-1">
              
              {/* Model Selector Pill */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 rounded-full transition-colors group">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-400 opacity-30 blur-sm rounded-full"></div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative text-violet-600">
                     <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-violet-700">Gen2 Flash</span>
                <ChevronUp size={12} className="text-violet-400 group-hover:text-violet-600 transition-colors" />
              </button>

              <div className="flex items-center gap-2">
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
                   <Paperclip size={20} className="rotate-45" />
                 </button>
                 
                 <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${input.trim() && !isLoading 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 hover:scale-105 active:scale-95' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
                  `}
                 >
                   <ArrowUp size={20} />
                 </button>
              </div>
            </div>
          </div>

        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3">
          Gen2 can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default InputArea;