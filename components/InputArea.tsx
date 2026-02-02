import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ChevronUp, X, FileText, Image as ImageIcon, Film, Code, FileSpreadsheet, Zap, Sparkles, Check, Brain } from 'lucide-react';
import { Language, ModelType, Attachment } from '../types';

interface InputAreaProps {
  onSend: (message: string, attachments: Attachment[]) => void;
  isLoading: boolean;
  language: Language;
  modelType: ModelType;
  onModelChange: (model: ModelType) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading, language, modelType, onModelChange }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    placeholder: language === 'id' ? 'Tanya Gen2 atau lampirkan file...' : 'Ask Gen2 or attach files...',
    footer: 'POWERED BY ZENT TECHNOLOGY • GEN2 ULTRA MEMORY'
  };

  const getModelLabel = (m: ModelType) => {
    switch (m) {
      case ModelType.GEMINI_V3_PRO: return 'Gen2 V3 Pro';
      case ModelType.GEMINI_V3: return 'Gen2 V3';
      case ModelType.GEMINI_V2: return 'Gen2 V2';
      default: return 'Gen2';
    }
  };

  const modelLabel = getModelLabel(modelType);

  const handleSend = () => {
    if ((input.trim() || attachments.length > 0) && !isLoading) {
      onSend(input, attachments);
      setInput('');
      setAttachments([]);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files: File[] = Array.from(e.target.files);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          let type: 'image' | 'video' | 'document' = 'document';
          
          if (file.type.startsWith('image/')) type = 'image';
          else if (file.type.startsWith('video/')) type = 'video';

          setAttachments(prev => [...prev, {
            file,
            previewUrl: type === 'image' ? base64 : '',
            base64,
            type
          }]);
        };
        reader.readAsDataURL(file);
      });
      
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon size={20} className="text-purple-400" />;
    if (file.type.startsWith('video/')) return <Film size={20} className="text-pink-400" />;
    if (file.name.endsWith('.pdf')) return <FileText size={20} className="text-red-400" />;
    if (file.name.match(/\.(xlsx|csv|xls)$/)) return <FileSpreadsheet size={20} className="text-green-400" />;
    if (file.name.match(/\.(js|ts|py|html|css|json)$/)) return <Code size={20} className="text-blue-400" />;
    return <FileText size={20} className="text-slate-400" />;
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
        
        {/* Main Wrapper - Replaced overflow-hidden with structure that allows popup overflow */}
        <div className={`
          relative rounded-[28px] transition-all duration-700 ease-out
          ${isFocused || attachments.length > 0
            ? 'shadow-[0_15px_40px_-10px_rgba(139,92,246,0.15)] translate-y-[-2px]' 
            : 'shadow-lg shadow-black/50'}
        `}>
          
          {/* 1. Glow/Border Background Layer (CLIPPED) */}
          <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
            {/* Glow Layer */}
            <div 
              className={`
                absolute top-1/2 left-1/2 w-[200%] h-[200%] blur-[25px]
                bg-[conic-gradient(from_0deg,transparent_0deg,#6d28d9_120deg,#be185d_180deg,transparent_360deg)]
                transition-all duration-1000
                ${isFocused ? 'opacity-40 spin-slow' : 'opacity-0'}
              `}
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            
            <div className={`absolute inset-0 bg-white/10 transition-opacity duration-700 ${isFocused ? 'opacity-0' : 'opacity-100'}`} />
          </div>

          {/* 2. Content Layer (VISIBLE OVERFLOW for Popup) */}
          {/* m-[1px] creates the gap for the "border" effect from the layer below */}
          <div className="relative mx-[1px] my-[1px] rounded-[27px] bg-[#0a0a0a]/90 backdrop-blur-xl flex flex-col w-[calc(100%-2px)]">
            
            {/* Attachment Preview Area */}
            {attachments.length > 0 && (
              <div className="flex gap-3 px-5 pt-4 overflow-x-auto no-scrollbar pb-2">
                {attachments.map((att, idx) => (
                  <div key={idx} className="relative flex-shrink-0 group animate-fade-in-text">
                    <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                      {att.type === 'image' ? (
                        <img src={att.previewUrl} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        getFileIcon(att.file)
                      )}
                    </div>
                    <button 
                      onClick={() => removeAttachment(idx)}
                      className="absolute -top-1.5 -right-1.5 bg-neutral-800 text-white rounded-full p-0.5 border border-white/10 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                    <div className="text-[9px] text-slate-400 mt-1 w-16 truncate text-center">
                      {att.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t.placeholder}
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none px-5 pt-4 pb-2 text-slate-100 placeholder:text-slate-500 resize-none min-h-[52px] max-h-[160px] text-[16px] leading-relaxed transition-all"
            />

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.js,.ts,.py,.json"
            />

            {/* Control Bar */}
            <div className="flex items-center justify-between px-3 pb-2.5 pt-1 relative">
              
              {/* Model Badge with Popup Menu */}
              <div className="relative">
                  <button 
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-full transition-all group/pill"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 transition-all duration-500 ${isFocused ? 'shadow-[0_0_10px_rgba(139,92,246,0.5)] scale-110' : 'opacity-70'}`}></div>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-[0.15em]">{modelLabel}</span>
                    <ChevronUp size={12} className={`text-slate-600 group-hover:text-slate-400 transition-transform duration-300 ${isModelMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Popup Menu */}
                  {isModelMenuOpen && (
                    <div className="absolute bottom-[calc(100%+8px)] left-0 w-64 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl animate-fade-in-text z-50 overflow-hidden ring-1 ring-white/5">
                        <div className="p-1 space-y-0.5">
                            
                            {/* Pro Model */}
                            <button
                                onClick={() => {
                                    onModelChange(ModelType.GEMINI_V3_PRO);
                                    setIsModelMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-lg text-left transition-all ${modelType === ModelType.GEMINI_V3_PRO ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
                                    <Brain size={14} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-200">Gen2 V3 Pro</div>
                                    <div className="text-[10px] text-slate-500">Reasoning • Best Quality</div>
                                </div>
                                {modelType === ModelType.GEMINI_V3_PRO && <Check size={14} className="text-indigo-500" />}
                            </button>

                            {/* Flash Model */}
                            <button
                                onClick={() => {
                                    onModelChange(ModelType.GEMINI_V3);
                                    setIsModelMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-lg text-left transition-all ${modelType === ModelType.GEMINI_V3 ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="p-1.5 rounded-md bg-violet-500/10 text-violet-400">
                                    <Sparkles size={14} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-200">Gen2 V3 Flash</div>
                                    <div className="text-[10px] text-slate-500">Balanced • Fast</div>
                                </div>
                                {modelType === ModelType.GEMINI_V3 && <Check size={14} className="text-violet-500" />}
                            </button>

                            {/* V2 Flash Model */}
                            <button
                                onClick={() => {
                                    onModelChange(ModelType.GEMINI_V2);
                                    setIsModelMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-lg text-left transition-all ${modelType === ModelType.GEMINI_V2 ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                                    <Zap size={14} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-200">Gen2 V2 Flash</div>
                                    <div className="text-[10px] text-slate-500">Legacy • Lightweight</div>
                                </div>
                                {modelType === ModelType.GEMINI_V2 && <Check size={14} className="text-amber-500" />}
                            </button>
                        </div>
                    </div>
                  )}
                  
                  {/* Backdrop to close menu when clicking outside */}
                  {isModelMenuOpen && (
                      <div className="fixed inset-0 z-40" onClick={() => setIsModelMenuOpen(false)}></div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-500 hover:text-violet-400 transition-colors rounded-full hover:bg-white/5 btn-pop" 
                    title="Attach Image, Video, PDF, Docs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
                        <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleSend}
                    disabled={(!input.trim() && attachments.length === 0) || isLoading}
                    className={`
                      p-2.5 rounded-full transition-all duration-500 btn-pop flex items-center justify-center
                      ${(input.trim() || attachments.length > 0) && !isLoading 
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

        <p className="text-center text-[10px] text-slate-600 mt-3 font-medium tracking-wide uppercase">
          {t.footer}
        </p>
      </div>
    </div>
  );
};

export default InputArea;