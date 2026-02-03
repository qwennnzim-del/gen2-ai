import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, Globe, MessageCircle, Crown, Code, Palette, Terminal, Database, BarChart, PenTool, Cpu, Search, Layers, Briefcase, Share2, ShieldCheck, Gamepad2, Calendar, Clock } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onGoToBlog: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onGoToBlog }) => {

  const teamMembers = [
    { name: "M Fariz", role: "CEO & Leader Engineer", icon: <Crown size={32} /> },
    { name: "Aurel Putri", role: "UI/UX Designer", icon: <Palette size={32} /> },
    { name: "Rizky Pratama", role: "Full Stack Developer", icon: <Code size={32} /> },
    { name: "Nadia Kusuma", role: "AI Researcher", icon: <Cpu size={32} /> },
    { name: "Dimas Saputra", role: "Backend Specialist", icon: <Database size={32} /> },
    { name: "Tiara Andini", role: "Product Manager", icon: <Briefcase size={32} /> },
    { name: "Daffa Ardiansyah", role: "DevOps Engineer", icon: <Terminal size={32} /> },
    { name: "Siti Nurhaliza", role: "Data Scientist", icon: <BarChart size={32} /> },
    { name: "Bagus Santoso", role: "Frontend Developer", icon: <Code size={32} /> },
    { name: "Fika Azzahra", role: "QA Engineer", icon: <ShieldCheck size={32} /> },
    { name: "Kevin Wijaya", role: "Mobile Developer", icon: <Cpu size={32} /> },
    { name: "Hana Safitri", role: "Content Strategist", icon: <PenTool size={32} /> },
    { name: "Reza Mahendra", role: "Cloud Architect", icon: <Layers size={32} /> },
    { name: "Bella Puspita", role: "Creative Director", icon: <Palette size={32} /> },
    { name: "Aldi Nugraha", role: "Cyber Security", icon: <Shield size={32} /> },
    { name: "Citra Lestari", role: "HR & Culture", icon: <Globe size={32} /> },
    { name: "Gilang Ramadhan", role: "Blockchain Dev", icon: <Database size={32} /> },
    { name: "Vina Amalia", role: "Marketing Lead", icon: <Share2 size={32} /> },
    { name: "Satria Dewa", role: "Game Developer", icon: <Gamepad2 size={32} /> },
    { name: "Maya Indah", role: "Social Media Lead", icon: <MessageCircle size={32} /> },
    { name: "Bayu Pamungkas", role: "System Analyst", icon: <Search size={32} /> },
    { name: "Rina Wati", role: "Finance Lead", icon: <Briefcase size={32} /> },
    { name: "Eko Prasetyo", role: "Support Lead", icon: <MessageCircle size={32} /> },
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'Introducing Gen2 v2.5: The Era of Ultra Memory',
      excerpt: 'We are proud to announce the biggest leap in our reasoning engine. v2.5 introduces "Ultra Memory", allowing for 1M+ token context windows.',
      date: 'Feb 24, 2025',
      readTime: '4 min read',
      category: 'Release',
      imageGradient: 'from-cyan-900 via-blue-900 to-black',
    },
    {
      id: '2',
      title: 'Privacy First: Our "Zero-Retention" Architecture',
      excerpt: 'How Gen2 ensures your proprietary code and documents remain yours. A deep dive into our ephemeral processing pipelines.',
      date: 'Feb 20, 2025',
      readTime: '6 min read',
      category: 'Security',
      imageGradient: 'from-purple-900 via-indigo-900 to-black',
    },
    {
      id: '3',
      title: 'Mastering the Workflow: Gen2 for Developers',
      excerpt: 'Tips and tricks to maximize your coding efficiency using Gen2\'s multi-modal analysis capabilities for code refactoring.',
      date: 'Feb 15, 2025',
      readTime: '5 min read',
      category: 'Tutorial',
      imageGradient: 'from-emerald-900 via-teal-900 to-black',
    }
  ];

  return (
    // Changed min-h-screen to h-full w-full to ensure it fits within the #root 100dvh container
    // and handles its own scrolling via overflow-y-auto.
    <div className="h-full w-full bg-black text-slate-200 overflow-y-auto selection:bg-cyan-500/30 font-sans scroll-smooth">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             {/* Logo - Optimized: h-8 (32px) fits better in navbar */}
             <img src="/logoApp/logo-app.png" alt="Gen2" className="h-8 w-auto object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Capabilities</a>
            <a href="#team" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Team</a>
            <a href="#updates" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Updates</a>
          </div>

          <button 
            onClick={onStart}
            className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-black rounded-full font-semibold text-xs md:text-sm hover:bg-cyan-50 transition-all active:scale-95"
          >
            Launch App
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 space-y-24">
        
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in-text mt-4 md:mt-0 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="px-2 md:px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] md:text-xs font-medium tracking-wide">
              Gen2 v2.5 Released
            </span>
            <span className="px-2 md:px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-medium tracking-wide">
              Ultra Memory
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            How Gen2 AI Empowers <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Limitless Intelligence
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Experience the next evolution of reasoning. Gen2 combines Ultra Memory with multi-modal analysis to speed up your workflow, coding, and creative processes.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                    <Zap size={14} className="text-cyan-400" />
                </div>
                <div className="text-xs">
                    <div className="text-slate-200 font-medium">Fastest Response</div>
                    <div className="text-slate-500">Latency &lt; 500ms</div>
                </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10"></div>
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                    <Shield size={14} className="text-blue-400" />
                </div>
                <div className="text-xs">
                    <div className="text-slate-200 font-medium">Enterprise Security</div>
                    <div className="text-slate-500">End-to-End Encrypted</div>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div id="features" className="space-y-12 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="group cursor-pointer" onClick={onStart}>
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-900 to-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/30 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/30 blur-[100px] rounded-full"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                         <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white text-xs mb-3 inline-block">
                            Deep Reasoning
                         </span>
                         <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Analyze Complex Files Instantly</h3>
                    </div>
                </div>
                <div>
                     <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 text-[10px] md:text-xs border border-white/5">Production</span>
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 text-[10px] md:text-xs border border-white/5">Analysis</span>
                     </div>
                     <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                        Revolution in Document & Code Understanding
                     </h2>
                     <p className="text-sm md:text-base text-slate-400 leading-relaxed line-clamp-3">
                        Upload PDFs, Images, or Codebases. Gen2's vision and context capabilities allow it to understand, refactor, and summarize content with human-level precision.
                     </p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer" onClick={onStart}>
                 <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900 via-black to-slate-900 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                        <div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
                         <div className="absolute w-64 h-64 border border-cyan-500/20 rounded-full animate-pulse-slow"></div>
                         <div className="absolute w-48 h-48 border border-blue-500/20 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* TEAM SECTION */}
        <div id="team" className="pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Gen Z Team</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">The brilliant young minds behind Zent Technology & Gen2.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {teamMembers.map((member, index) => (
                    <div key={index} className="e-card playing">
                        <div className="image"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        
                        <div className="infotop">
                            <div className="icon">
                                {member.icon}
                            </div>
                            <div className="text-lg font-bold leading-tight mb-1">{member.role}</div>
                            <div className="name">{member.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* UPDATED: BLOG SECTION (Replaces old updates input) */}
        <div id="updates" className="pt-12 border-t border-white/5">
             <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                 <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs mb-4">
                        <Sparkles size={12} />
                        <span>Gen2 Insider</span>
                     </div>
                     <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Latest Updates</h3>
                     <p className="text-sm md:text-base text-slate-400">Fresh news, technology deep dives, and tutorials.</p>
                 </div>
                 <button 
                    onClick={onGoToBlog}
                    className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                 >
                    View all articles <ArrowRight size={16} />
                 </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <div 
                        key={post.id}
                        onClick={onGoToBlog}
                        className="group cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 flex flex-col"
                    >
                         {/* Image Thumbnail */}
                        <div className={`w-full h-40 relative bg-gradient-to-br ${post.imageGradient}`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
                            <div className="absolute bottom-3 left-3">
                                <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                                <span className="flex items-center gap-1"><Calendar size={10}/> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock size={10}/> {post.readTime}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center text-cyan-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                                Read Article <ArrowRight size={12} />
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* CTA Section */}
        <div className="relative w-full rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/10 p-8 md:p-16 text-center max-w-4xl mx-auto">
             {/* Bright Blue Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black"></div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
             
             {/* Particles/Stars Effect */}
             <div className="absolute top-10 left-10 w-1 h-1 bg-cyan-400 rounded-full opacity-70 animate-pulse"></div>
             <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 animate-pulse delay-700"></div>
             <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full opacity-40"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs md:text-sm mb-6">
                    <Sparkles size={14} />
                    <span>Try Gen2 for Free</span>
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    What are you waiting for?
                 </h2>
                 
                 <p className="text-slate-300 max-w-lg mx-auto mb-10 text-base md:text-lg leading-relaxed">
                    Gen2 is designed to empower you with exceptional capabilities, making the workflow more efficient, accurate, and enjoyable.
                 </p>
                 
                 <button 
                    onClick={onStart}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.6)] transition-all transform hover:scale-105 active:scale-95"
                 >
                    Get Started for Free
                 </button>
             </div>

             {/* Bottom Frequency Visual */}
             <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 opacity-20 pointer-events-none">
                 {[...Array(20)].map((_, i) => (
                     <div key={i} className="w-1 md:w-2 bg-cyan-500 rounded-t-sm" style={{ height: `${Math.random() * 100}%` }}></div>
                 ))}
             </div>
        </div>

      </div>

      {/* Footer */}
      <footer id="security" className="border-t border-white/5 bg-black py-12 px-6 pb-24 md:pb-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
             <div>
                 <div className="flex items-center gap-3 mb-4">
                    {/* Footer Logo - Optimized: h-7 matches text height better */}
                    <img src="/logoApp/logo-app.png" alt="Gen2" className="h-7 w-auto object-contain" />
                 </div>
                 <p className="text-slate-500 text-sm max-w-xs mb-8">
                     AI writing tool is designed to empower you with exceptional writing capabilities.
                 </p>
                 <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                        <Globe size={16} />
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                        <MessageCircle size={16} />
                     </div>
                 </div>
             </div>
             
             <div className="flex flex-wrap gap-12 md:gap-16">
                 <div>
                     <h4 className="text-white font-bold mb-4">Product</h4>
                     <ul className="space-y-2 text-sm text-slate-500">
                         <li className="hover:text-cyan-400 cursor-pointer">Features</li>
                         <li className="hover:text-cyan-400 cursor-pointer">Integration</li>
                         <li className="hover:text-cyan-400 cursor-pointer">Pricing</li>
                         <li className="hover:text-cyan-400 cursor-pointer">Changelog</li>
                     </ul>
                 </div>
                 <div>
                     <h4 className="text-white font-bold mb-4">Company</h4>
                     <ul className="space-y-2 text-sm text-slate-500">
                         <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
                         <li className="hover:text-cyan-400 cursor-pointer">Careers</li>
                         <li onClick={onGoToBlog} className="hover:text-cyan-400 cursor-pointer">Blog</li>
                         <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
                     </ul>
                 </div>
             </div>
         </div>
         <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center md:text-left text-xs text-slate-600">
             © 2025 Gen2, LLC. All rights reserved. Zent Technology.
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;