import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

// Orb Loader Component
const OrbLoader: React.FC = () => (
  <div className="w-10 h-10 flex items-center justify-center overflow-visible">
    <div className="loader" style={{ '--size': '0.35' } as React.CSSProperties}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="clipping">
            <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
            <polygon points="25,25 75,25 50,75" fill="white"></polygon>
            <polygon points="50,25 75,75 25,75" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
          </mask>
        </defs>
      </svg>
      <div className="box"></div>
    </div>
  </div>
);

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-8 pb-32">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar Area */}
          <div className="flex-shrink-0 mt-1 min-w-[2rem] flex justify-center">
            {msg.role === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User size={16} className="text-slate-600" />
              </div>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                  {/* Using the logo as avatar for the model - Updated to PNG */}
                  <img 
                    src="/logoApp/logo-app.png" 
                    alt="Gen2" 
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                    onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 select-none">AI</span>';
                    }}
                  />
              </div>
            )}
          </div>

          {/* Message Content */}
          <div className={`
            flex flex-col max-w-[85%] md:max-w-[88%]
            ${msg.role === 'user' ? 'items-end' : 'items-start'}
          `}>
            {msg.role === 'model' && (
               <span className="text-xs font-semibold text-slate-400 mb-1 ml-1">Gen2</span>
            )}
            
            <div className={`
              text-sm leading-relaxed overflow-hidden markdown-body
              ${msg.role === 'user' 
                ? 'bg-slate-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm' 
                : 'bg-white/50 text-slate-800 animate-fade-in-text p-1'}
            `}>
              <ReactMarkdown 
                components={{
                    pre: ({node, ...props}) => (
                        <div className="relative group my-3">
                            <div className="overflow-x-auto w-full bg-[#1e293b] rounded-lg p-4 text-slate-50 border border-slate-700/50 shadow-inner">
                                <pre {...props} />
                            </div>
                        </div>
                    ),
                    code: ({node, className, children, ...props}) => {
                         const match = /language-(\w+)/.exec(className || '')
                         const isInline = !match && !String(children).includes('\n');
                         return (
                            <code 
                                className={`${isInline ? 'bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200' : ''} ${className || ''}`} 
                                {...props}
                            >
                                {children}
                            </code>
                         )
                    },
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-3 space-y-1 marker:text-slate-400" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-3 space-y-1 marker:text-slate-400" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-violet-400 pl-4 py-1 italic text-slate-500 bg-slate-50 rounded-r my-3" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto w-full my-4 rounded-lg border border-slate-200"><table className="w-full text-left" {...props} /></div>,
                    a: ({node, ...props}) => <a className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                }}
              >
                  {msg.text}
              </ReactMarkdown>
            </div>
            
            {/* Actions for Model Messages */}
            {msg.role === 'model' && (
              <div className="flex items-center gap-1 mt-2 ml-1 opacity-0 animate-[fadeInText_1s_ease-out_0.5s_forwards]">
                <button 
                    onClick={() => copyToClipboard(msg.text)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" 
                    title="Copy"
                >
                  <Copy size={14} />
                </button>
                <div className="h-3 w-[1px] bg-slate-200 mx-1"></div>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                  <ThumbsUp size={14} />
                </button>
                 <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                  <ThumbsDown size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 items-center pl-1">
           <div className="flex-shrink-0 mt-1 min-w-[2rem] flex justify-center">
             <OrbLoader />
           </div>
           <span className="text-slate-400 text-sm font-medium animate-pulse-slow">
             Gen2 thinking...
           </span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;