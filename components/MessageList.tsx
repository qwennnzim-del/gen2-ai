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

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar Area */}
          <div className="flex-shrink-0 mt-1 min-w-[2rem] flex justify-center">
            {msg.role === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User size={16} className="text-slate-600" />
              </div>
            ) : (
              /* Display "Gen 2" text for finished messages */
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 pt-1 select-none whitespace-nowrap">
                Gen 2
              </span>
            )}
          </div>

          {/* Message Content */}
          <div className={`
            flex flex-col max-w-[85%] md:max-w-[85%]
            ${msg.role === 'user' ? 'items-end' : 'items-start'}
          `}>
            <div className={`
              text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-slate-800 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm' 
                : 'bg-transparent text-slate-800 animate-fade-in-text pl-0 py-2'}
            `}>
              <ReactMarkdown 
                components={{
                    pre: ({node, ...props}) => <div className="overflow-auto w-full my-4 bg-slate-900 rounded-lg p-3 text-slate-50" {...props} />,
                    code: ({node, ...props}) => <code className={`rounded px-1 py-0.5 text-xs font-mono ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-pink-600'}`} {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />
                }}
              >
                  {msg.text}
              </ReactMarkdown>
            </div>
            
            {/* Actions for Model Messages */}
            {msg.role === 'model' && (
              <div className="flex items-center gap-2 mt-1 ml-0 opacity-0 animate-[fadeInText_1s_ease-out_0.5s_forwards]">
                <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors" title="Copy">
                  <Copy size={14} />
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors" title="Good response">
                  <ThumbsUp size={14} />
                </button>
                 <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors" title="Bad response">
                  <ThumbsDown size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 items-center">
           <div className="flex-shrink-0 mt-1 min-w-[2rem] flex justify-center">
             <OrbLoader />
           </div>
           <span className="text-slate-400 text-sm font-medium animate-pulse-slow">
             thinking...
           </span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;