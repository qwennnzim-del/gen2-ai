import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Tag, Clock, Share2, Sparkles } from 'lucide-react';

interface BlogPageProps {
  onBack: () => void;
  onStart: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown-like string or HTML
  category: string;
  date: string;
  readTime: string;
  imageGradient: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onStart }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Introducing Gen2 v2.5: The Era of Ultra Memory',
      excerpt: 'We are proud to announce the biggest leap in our reasoning engine. v2.5 introduces "Ultra Memory", allowing for 1M+ token context windows with near-zero latency.',
      date: 'Feb 24, 2025',
      readTime: '4 min read',
      category: 'Release',
      imageGradient: 'from-cyan-900 via-blue-900 to-black',
      content: `
        <p class="mb-6 text-lg text-slate-300">Today marks a significant milestone in the evolution of Zent Technology. We are thrilled to unveil Gen2 v2.5, an update that fundamentally changes how AI processes long-form context.</p>
        
        <h3 class="text-2xl font-bold text-white mb-4">What is Ultra Memory?</h3>
        <p class="mb-6">Ultra Memory isn't just a bigger context window. It's a new architectural approach to information retrieval. Traditional models struggle with "lost in the middle" phenomena when processing large documents. Gen2 v2.5 utilizes a dynamic vector weighting system that ensures every detail—whether it's on page 1 or page 500—is recalled with equal precision.</p>

        <h3 class="text-2xl font-bold text-white mb-4">Benchmarks</h3>
        <ul class="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Code Analysis:</strong> 40% faster refactoring on codebases larger than 50 files.</li>
            <li><strong>Latency:</strong> Maintained under 500ms even at 80% context utilization.</li>
            <li><strong>Accuracy:</strong> 99.8% retrieval accuracy on the NIAH (Needle In A Haystack) test.</li>
        </ul>

        <p>This update is available immediately to all users. Launch the app to try it today.</p>
      `
    },
    {
      id: '2',
      title: 'Privacy First: Our "Zero-Retention" Architecture',
      excerpt: 'How Gen2 ensures your proprietary code and documents remain yours. A deep dive into our ephemeral processing pipelines.',
      date: 'Feb 20, 2025',
      readTime: '6 min read',
      category: 'Security',
      imageGradient: 'from-purple-900 via-indigo-900 to-black',
      content: `
        <p class="mb-6 text-lg text-slate-300">In an age where data is the new oil, privacy is the ultimate luxury. At Zent Technology, we believe privacy is a fundamental right, especially when dealing with intellectual property.</p>

        <h3 class="text-2xl font-bold text-white mb-4">Ephemeral Processing</h3>
        <p class="mb-6">Unlike other providers that may use user data for model training, Gen2 operates on a strict "Zero-Retention" architecture for Enterprise sessions. Once a session is closed, the cryptographic keys associated with that session's memory context are instantly shredded.</p>

        <h3 class="text-2xl font-bold text-white mb-4">End-to-End Encryption</h3>
        <p class="mb-6">From the moment you upload a PDF or paste a code snippet, it is encrypted using AES-256. The data remains encrypted at rest and in transit. Only the inference engine, running in a secure enclave, has temporary access to the decrypted tokens.</p>
      `
    },
    {
      id: '3',
      title: 'Mastering the Workflow: Gen2 for Developers',
      excerpt: 'Tips and tricks to maximize your coding efficiency using Gen2\'s multi-modal analysis capabilities.',
      date: 'Feb 15, 2025',
      readTime: '5 min read',
      category: 'Tutorial',
      imageGradient: 'from-emerald-900 via-teal-900 to-black',
      content: `
        <p class="mb-6 text-lg text-slate-300">Gen2 is more than just a chat bot; it's a pair programmer that never sleeps. Here is how senior engineers are using Gen2 to speed up their workflow.</p>

        <h3 class="text-2xl font-bold text-white mb-4">1. The "Architect" Prompt</h3>
        <p class="mb-6">Instead of asking for code immediately, ask Gen2 to act as a System Architect. Upload your database schema image and ask for a critique of potential bottlenecks. Our multi-modal vision engine can read ER diagrams directly.</p>

        <h3 class="text-2xl font-bold text-white mb-4">2. Doc-to-Code</h3>
        <p class="mb-6">Upload an API documentation PDF and ask Gen2 to generate a TypeScript SDK wrapper for it. This saves hours of boilerplate typing.</p>
      `
    }
  ];

  // --- DETAIL VIEW ---
  if (selectedPost) {
    return (
      <div className="h-full w-full bg-black text-slate-200 overflow-y-auto selection:bg-cyan-500/30 font-sans animate-fade-in">
         {/* Detail Nav */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </button>
                <div className="flex gap-2">
                     <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
                        <Share2 size={18} />
                     </button>
                </div>
            </div>
         </nav>

         <article className="pt-24 pb-20 max-w-3xl mx-auto px-6">
             {/* Header */}
             <div className="mb-8">
                <div className="flex gap-3 mb-4 text-xs font-medium">
                     <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                        {selectedPost.category}
                     </span>
                     <span className="flex items-center gap-1 text-slate-500">
                        <Calendar size={12} /> {selectedPost.date}
                     </span>
                     <span className="flex items-center gap-1 text-slate-500">
                        <Clock size={12} /> {selectedPost.readTime}
                     </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                    {selectedPost.title}
                </h1>
                
                {/* Hero Image Area */}
                <div className={`w-full aspect-video rounded-3xl mb-10 overflow-hidden relative border border-white/10 shadow-2xl`}>
                     <div className={`absolute inset-0 bg-gradient-to-br ${selectedPost.imageGradient} opacity-80`}></div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        {/* Optimized watermark logo: h-24 is fine for a watermark */}
                        <img src="/logoApp/logo-app.png" className="h-24 opacity-20" alt="Gen2" />
                     </div>
                </div>
             </div>

             {/* Content */}
             <div 
                className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
             />

             {/* CTA Bottom */}
             <div className="mt-16 pt-10 border-t border-white/10 text-center">
                 <h4 className="text-white font-bold text-xl mb-4">Ready to experience this?</h4>
                 <button 
                    onClick={onStart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-50 transition-colors"
                 >
                    Launch Gen2 App
                    <ArrowRight size={18} />
                 </button>
             </div>
         </article>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="h-full w-full bg-black text-slate-200 overflow-y-auto selection:bg-cyan-500/30 font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
             {/* Optimized Navbar Logo: h-8 (32px) matches Landing Page */}
             <img src="/logoApp/logo-app.png" alt="Gen2" className="h-8 w-auto object-contain" />
          </div>
          
          <div className="flex items-center gap-8">
             <button onClick={onBack} className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">
                Back to Home
             </button>
             <button 
                onClick={onStart}
                className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-black rounded-full font-semibold text-xs md:text-sm hover:bg-cyan-50 transition-all active:scale-95"
            >
                Launch App
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs mb-6">
            <Sparkles size={12} />
            <span>Gen2 Insider</span>
         </div>
         <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Insights</span>
         </h1>
         <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Latest updates, technology deep dives, and community stories from the Zent Technology team.
         </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 flex flex-col h-full"
                  >
                      {/* Image Thumbnail */}
                      <div className={`w-full aspect-[4/3] relative bg-gradient-to-br ${post.imageGradient}`}>
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
                          <div className="absolute bottom-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                  {post.category}
                              </span>
                          </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                              <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                          </div>
                          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                              {post.title}
                          </h2>
                          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                              {post.excerpt}
                          </p>
                          <div className="flex items-center text-cyan-400 text-sm font-medium gap-2 group-hover:gap-3 transition-all">
                              Read Article <ArrowRight size={14} />
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

       {/* Footer (Simplified) */}
       <footer className="border-t border-white/5 bg-black py-12 px-6 text-center text-xs text-slate-600">
             <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
                {/* Optimized Footer Logo: h-6 small & centered */}
                <img src="/logoApp/logo-app.png" alt="Gen2" className="h-6 w-auto object-contain" />
             </div>
             © 2025 Gen2, LLC. All rights reserved. Zent Technology.
       </footer>
    </div>
  );
};

export default BlogPage;