import React, { useState, useRef, useEffect } from 'react';
import { Chat, GenerateContentResponse } from '@google/genai';
import { createChatSession } from '../services/geminiService';
import { Message, Role, Persona } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { DISCLAIMER } from '../constants';

interface ChatInterfaceProps {
  persona: Persona;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [groundingSources, setGroundingSources] = useState<any[]>([]); // Store search sources
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize/Reset Chat on Persona Change
  useEffect(() => {
    const initChat = async () => {
      try {
        const useSearch = persona.id === 'researcher';
        const session = createChatSession(persona.systemInstruction, useSearch);
        setChatSession(session);
        setMessages([
          {
            id: 'intro',
            role: Role.MODEL,
            text: `Hello. I am the ${persona.name}. ${persona.roleDescription} How can I assist you today?`,
            timestamp: new Date(),
          },
        ]);
        setGroundingSources([]);
      } catch (error) {
        console.error("Failed to init chat", error);
      }
    };
    initChat();
  }, [persona]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || !chatSession || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setGroundingSources([]); // Reset sources for new turn

    try {
      const result = await chatSession.sendMessageStream({ message: userMsg.text });
      
      const botMsgId = (Date.now() + 1).toString();
      let fullText = '';
      
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: Role.MODEL, text: '', timestamp: new Date() },
      ]);

      for await (const chunk of result) {
        const chunkRes = chunk as GenerateContentResponse;
        
        // Check for grounding metadata (sources from Google Search)
        if (chunkRes.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            setGroundingSources(prev => [...prev, ...chunkRes.candidates![0].groundingMetadata!.groundingChunks!]);
        }

        const text = chunkRes.text;
        if (text) {
            fullText += text;
            setMessages((prev) => 
                prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg)
            );
        }
      }

    } catch (error) {
      console.error("Chat Error", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: Role.MODEL,
          text: "I encountered an error processing your legal query. Please try again.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick Action Buttons
  const QuickAction = ({ label, prompt, icon }: { label: string, prompt: string, icon?: string }) => (
    <button
        onClick={() => handleSend(prompt)}
        disabled={isLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-300 transition-all whitespace-nowrap shadow-sm"
    >
        {icon && <span>{icon}</span>}
        {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 right-0 w-96 h-96 ${persona.color} rounded-full blur-[128px] opacity-10 pointer-events-none`}></div>
      <div className={`absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-5 pointer-events-none`}></div>

      {/* Header */}
      <div className="p-4 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${persona.color} text-white shadow-lg ring-1 ring-white/10`}>
            {persona.icon}
            </div>
            <div>
                <h2 className="font-bold text-slate-100 flex items-center gap-2">
                    {persona.name}
                    {persona.id === 'researcher' && <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">WEB ENABLED</span>}
                </h2>
                <p className="text-xs text-slate-400 max-w-[200px] md:max-w-md truncate">{persona.roleDescription}</p>
            </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent z-10">
        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-xs text-amber-200/80 mb-4 text-center mx-auto max-w-2xl">
            {DISCLAIMER}
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-4 shadow-xl backdrop-blur-sm ${
                msg.role === Role.USER
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none border border-blue-500/30'
                  : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-bl-none'
              } ${msg.isError ? 'border-red-500 bg-red-900/20' : ''}`}
            >
              {msg.role === Role.MODEL ? (
                <MarkdownRenderer content={msg.text} />
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-slate-800/80 px-5 py-4 rounded-2xl rounded-bl-none border border-slate-700/50 flex space-x-2 items-center shadow-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
                </div>
            </div>
        )}

        {/* Search Sources Display (Only if sources exist) */}
        {!isLoading && groundingSources.length > 0 && (
            <div className="flex justify-start">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 max-w-md">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Sources Found</p>
                    <div className="flex flex-wrap gap-2">
                        {groundingSources.map((source: any, idx) => (
                             source.web?.uri ? (
                                <a 
                                    key={idx} 
                                    href={source.web.uri} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-indigo-400 hover:text-indigo-300 underline bg-indigo-900/20 px-2 py-1 rounded truncate max-w-[200px]"
                                >
                                    {source.web.title || source.web.uri}
                                </a>
                            ) : null
                        ))}
                    </div>
                </div>
            </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-md z-20">
        
        {/* Quick Actions Scroll View */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            <QuickAction label="🇮🇳 Translate to Hindi" prompt="Translate your last response to Hindi clearly." />
            <QuickAction label="🚩 Translate to Marathi" prompt="Translate your last response to Marathi clearly." />
            <QuickAction label="👶 Explain Simple" prompt="Explain this in very simple terms for a non-lawyer." />
            {persona.id === 'researcher' && (
                <QuickAction label="🏛 Find Case Law" prompt="Find relevant recent case law regarding this topic." icon="⚖️" />
            )}
            <QuickAction label="📝 Draft Summary" prompt="Draft a short summary of this legal situation." />
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
          <div className="relative flex items-end gap-2 bg-slate-950 rounded-xl border border-slate-700/50 p-2">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Ask ${persona.name} a legal question in any language...`}
                className="w-full bg-transparent text-slate-200 placeholder-slate-500/80 border-none focus:ring-0 resize-none h-12 max-h-32 py-3 px-2 scrollbar-hide"
            />
            <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="mb-1 p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/25"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-0">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;