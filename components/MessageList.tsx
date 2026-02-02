import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import { User, Copy, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

// Stable Orb Loader Component
const OrbLoader: React.FC = () => (
  <div className="w-12 h-12 flex items-center justify-center">
    <div className="loader" style={{ '--size': '0.35' } as React.CSSProperties}>
      <div className="box"></div>
      <svg width="0" height="0">
        <defs>
          <mask id="orb-mask">
            <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
            <polygon points="25,25 75,25 50,75" fill="white" className="shape"></polygon>
            <polygon points="50,25 75,75 25,75" fill="white" className="shape"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white" className="shape"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white" className="shape"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white" className="shape"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white" className="shape"></polygon>
          </mask>
        </defs>
      </svg>
    </div>
  </div>
);

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Local state for interactive feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [unlikedIds, setUnlikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string) => {
    setLikedIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
    // Remove from unlike if present
    setUnlikedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
    });
  };

  const handleUnlike = (id: string) => {
    setUnlikedIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
    // Remove from like if present
    setLikedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
    });
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-12 pb-32">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex w-full ${msg.role === 'user' ? 'flex-row-reverse gap-3 md:gap-4' : 'flex-col items-start gap-2'}`}
        >
          {/* Avatar Area - Logic split based on role */}
          {msg.role === 'user' ? (
            <div className="flex-shrink-0 mt-1 min-w-[2rem] flex justify-center">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shadow-inner">
                <User size={16} className="text-slate-400" />
              </div>
            </div>
          ) : (
            // MODEL: Logo placed ABOVE the answer
            <div className="flex items-center gap-2 mb-1">
               {/* Increased size from h-9 to h-12 (48px) */}
               <img 
                  src="/logoApp/logo-app.png" 
                  alt="Gen2" 
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-xs font-bold text-violet-500">AI</span>';
                  }}
               />
               {/* Optional: Status badge or just clean logo */}
            </div>
          )}

          {/* Message Content */}
          <div className={`
            flex flex-col
            ${msg.role === 'user' ? 'max-w-[85%] items-end' : 'w-full'}
          `}>
            
            <div className={`
              text-sm leading-relaxed overflow-hidden markdown-body
              ${msg.role === 'user' 
                ? 'bg-neutral-800 text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm' 
                : 'bg-transparent text-slate-200 animate-fade-in-text p-0'}
            `}>
              <ReactMarkdown 
                components={{
                    pre: ({node, ...props}) => (
                        <div className="relative group my-3">
                            <div className="overflow-x-auto w-full bg-[#0f172a] rounded-lg p-4 text-slate-200 border border-white/10 shadow-inner">
                                <pre {...props} />
                            </div>
                        </div>
                    ),
                    code: ({node, className, children, ...props}) => {
                         const match = /language-(\w+)/.exec(className || '')
                         const isInline = !match && !String(children).includes('\n');
                         return (
                            <code 
                                className={`${isInline ? 'bg-white/10 text-pink-400 px-1.5 py-0.5 rounded text-xs font-mono border border-white/5' : ''} ${className || ''}`} 
                                {...props}
                            >
                                {children}
                            </code>
                         )
                    },
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-3 space-y-1 marker:text-slate-500" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-3 space-y-1 marker:text-slate-500" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-violet-500 pl-4 py-1 italic text-slate-400 bg-white/5 rounded-r my-3" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto w-full my-4 rounded-lg border border-white/10"><table className="w-full text-left" {...props} /></div>,
                    a: ({node, ...props}) => <a className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                }}
              >
                  {msg.text}
              </ReactMarkdown>
            </div>
            
            {/* Actions for Model Messages */}
            {msg.role === 'model' && (
              <div className="flex items-center gap-1 mt-4 opacity-0 animate-[fadeInText_1s_ease-out_0.5s_forwards]">
                <button 
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-slate-300 transition-colors btn-pop" 
                    title="Copy"
                >
                  {copiedId === msg.id ? (
                      <Check size={14} className="text-green-500" />
                  ) : (
                      <Copy size={14} />
                  )}
                </button>
                <div className="h-3 w-[1px] bg-white/10 mx-1"></div>
                <button 
                    onClick={() => handleLike(msg.id)}
                    className={`p-1.5 rounded-lg transition-colors btn-pop ${likedIds.has(msg.id) ? 'bg-violet-900/50 text-violet-400' : 'hover:bg-white/10 text-slate-500 hover:text-slate-300'}`}
                >
                  <ThumbsUp size={14} className={likedIds.has(msg.id) ? 'fill-current' : ''} />
                </button>
                 <button 
                    onClick={() => handleUnlike(msg.id)}
                    className={`p-1.5 rounded-lg transition-colors btn-pop ${unlikedIds.has(msg.id) ? 'bg-white/10 text-slate-300' : 'hover:bg-white/10 text-slate-500 hover:text-slate-300'}`}
                 >
                  <ThumbsDown size={14} className={unlikedIds.has(msg.id) ? 'fill-current' : ''} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex flex-col gap-3 items-start w-full">
            {/* Logo during loading */}
            <div className="flex items-center gap-2 mb-1">
               <img src="/logoApp/logo-app.png" alt="Gen2" className="h-6 w-auto object-contain opacity-80" />
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 min-w-[2rem] flex justify-center">
                    <OrbLoader />
                </div>
                <span className="text-slate-500 text-sm font-medium animate-pulse-slow">
                    Thinking...
                </span>
            </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;