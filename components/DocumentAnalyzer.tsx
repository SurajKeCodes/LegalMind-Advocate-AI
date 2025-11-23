import React, { useState } from 'react';
import { analyzeDocument } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import { DISCLAIMER } from '../constants';

const DocumentAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('Summarize the key risks and obligations.');
  const [result, setResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(''); // Clear previous result
    
    try {
      const analysis = await analyzeDocument(text, prompt);
      setResult(analysis);
    } catch (error) {
        console.error("Analysis Error", error);
        setResult("Error: Could not analyze document. Please try again or reduce text length.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        
        <div className="flex flex-col gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Pro Document Analyzer
            </h2>
            <p className="text-sm text-slate-400 mt-1">Paste a contract, Terms of Service, or legal notice for deep analysis.</p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste legal text here..."
            className="flex-1 w-full bg-slate-950 text-slate-300 border border-slate-700 rounded-lg p-4 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent resize-none font-mono text-xs leading-relaxed"
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analysis Goal</label>
            <select 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
            >
                <option value="Summarize the key risks and obligations.">Summarize Risks & Obligations</option>
                <option value="Find loopholes that could disadvantage the signer.">Find Loopholes</option>
                <option value="Simplify this into plain English for a non-lawyer.">Translate to Plain English</option>
                <option value="Identify any missing standard clauses for this type of document.">Check for Missing Clauses</option>
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
          >
            {isAnalyzing ? (
                 <>
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                 Analyzing with Gemini 2.5 Pro...
               </>
            ) : (
                'Analyze Document'
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl overflow-y-auto relative">
           {!result && !isAnalyzing && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                   </svg>
                   <p className="text-lg font-medium">Results will appear here</p>
               </div>
           )}
           
           {isAnalyzing && !result && (
               <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-900/80 backdrop-blur-sm z-10">
                   <div className="relative w-20 h-20">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-700 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
                   </div>
                   <p className="text-emerald-400 font-medium animate-pulse">Reviewing clauses...</p>
               </div>
           )}

           {result && (
               <div className="animate-fade-in">
                   <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                       <h3 className="text-lg font-bold text-white">Analysis Report</h3>
                       <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded border border-emerald-700">AI Generated</span>
                   </div>
                   <div className="prose prose-invert prose-sm max-w-none">
                        <MarkdownRenderer content={result} />
                   </div>
                   <div className="mt-8 pt-4 border-t border-slate-800">
                        <p className="text-[10px] text-slate-500">{DISCLAIMER}</p>
                   </div>
               </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;