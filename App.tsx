import React, { useState } from 'react';
import { PERSONAS } from './constants';
import { AppMode, Persona } from './types';
import ChatInterface from './components/ChatInterface';
import DocumentAnalyzer from './components/DocumentAnalyzer';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [mode, setMode] = useState<AppMode>(AppMode.CHAT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
            fixed md:static inset-y-0 left-0 z-30 w-80 bg-[#0f172a] border-r border-slate-800/80 flex flex-col transition-transform duration-300 transform shadow-2xl
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-[#0f172a] to-[#0f172a]">
          <div className="flex items-center gap-3.5">
            <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg ring-1 ring-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                    </svg>
                </div>
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">LegalMind<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span></h1>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Pro Suite</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700">
            {/* Features Section */}
            <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    Tools
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => { setMode(AppMode.CHAT); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                            mode === AppMode.CHAT 
                            ? 'bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-300 border border-indigo-500/20' 
                            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                        }`}
                    >
                        <div className={`p-1.5 rounded-lg transition-colors ${mode === AppMode.CHAT ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800/50 text-slate-500 group-hover:text-indigo-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        AI Legal Counsel
                    </button>
                    <button
                        onClick={() => { setMode(AppMode.DOCUMENT_ANALYSIS); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                            mode === AppMode.DOCUMENT_ANALYSIS 
                            ? 'bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-300 border border-emerald-500/20' 
                            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                        }`}
                    >
                         <div className={`p-1.5 rounded-lg transition-colors ${mode === AppMode.DOCUMENT_ANALYSIS ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800/50 text-slate-500 group-hover:text-emerald-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clipRule="evenodd" />
                                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                            </svg>
                        </div>
                        Document Analyst
                        <span className="ml-auto text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">PRO</span>
                    </button>
                </div>
            </div>

            {/* Personas Section - Only active in chat mode */}
            {mode === AppMode.CHAT && (
                <div className="animate-fade-in">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2 flex items-center justify-between">
                        Specialized Counsel
                        <span className="text-[9px] bg-slate-800 px-1.5 rounded-full text-slate-500">{PERSONAS.length}</span>
                    </h3>
                    <div className="space-y-2">
                        {PERSONAS.map((persona, index) => (
                            <button
                                key={persona.id}
                                onClick={() => { setActivePersona(persona); setIsSidebarOpen(false); }}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className={`
                                    w-full text-left p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden flex items-center gap-3 animate-fade-in
                                    ${activePersona.id === persona.id 
                                        ? 'bg-slate-800/90 border-slate-700 shadow-xl ring-1 ring-white/5' 
                                        : 'border-transparent hover:bg-slate-800/50 hover:border-slate-800 text-slate-400 hover:text-slate-200'}
                                `}
                            >
                                {/* Active State Background Stripe */}
                                {activePersona.id === persona.id && (
                                    <div className={`absolute left-0 top-3 bottom-3 w-0.5 ${persona.color} rounded-full`}></div>
                                )}

                                <div className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-500
                                    ${activePersona.id === persona.id 
                                        ? `${persona.color} text-white shadow-lg scale-100` 
                                        : 'bg-slate-800/80 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-300 group-hover:scale-110'}
                                `}>
                                    {persona.icon}
                                </div>
                                
                                <div className="flex-1 min-w-0 z-10">
                                    <div className="flex items-center justify-between">
                                        <span className={`font-semibold text-sm truncate block transition-colors ${activePersona.id === persona.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                            {persona.name}
                                        </span>
                                        {activePersona.id === persona.id && (
                                            <span className="flex h-2 w-2 relative">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${persona.color}`}></span>
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${persona.color}`}></span>
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] opacity-60 truncate block mt-0.5 font-medium group-hover:opacity-80 transition-opacity">
                                        {persona.roleDescription}
                                    </span>
                                </div>

                                {/* Subtle Hover Glow */}
                                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-5 bg-gradient-to-r from-white/0 via-white to-white/0 pointer-events-none`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
        
        <div className="p-4 border-t border-slate-800/80 bg-[#0B1120] text-center">
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50 group hover:border-slate-700 transition-all cursor-help">
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest group-hover:text-slate-400 transition-colors">Supported Languages</p>
                <div className="flex justify-center items-center gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                     <span className="text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">EN</span>
                     <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                     <span className="text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">HI</span>
                     <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                     <span className="text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">MR</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-950">
        
        {/* Background Gradients for Main Area */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#131c31] to-transparent pointer-events-none"></div>

        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-slate-800/60 flex items-center justify-between px-4 bg-slate-900/90 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                    </svg>
                 </div>
                 <h1 className="text-lg font-bold text-white tracking-tight">LegalMind<span className="text-indigo-400">AI</span></h1>
            </div>
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-700 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-hidden h-full max-w-7xl mx-auto w-full z-0">
            {mode === AppMode.CHAT ? (
                <ChatInterface persona={activePersona} />
            ) : (
                <DocumentAnalyzer />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;