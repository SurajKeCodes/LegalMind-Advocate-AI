import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A simple regex-based parser for basic markdown to avoid heavy dependencies
// Supports: **bold**, *italic*, # Headers, - Lists, `code`
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderLine = (line: string, index: number) => {
    // Headers
    if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-bold text-slate-200 mt-4 mb-2">{formatText(line.slice(4))}</h3>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold text-amber-500 mt-6 mb-3 border-b border-slate-700 pb-1">{formatText(line.slice(3))}</h2>;
    if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold text-amber-500 mt-6 mb-4">{formatText(line.slice(2))}</h1>;
    
    // Lists
    if (line.trim().startsWith('- ')) return <li key={index} className="ml-4 list-disc pl-2 mb-1">{formatText(line.trim().slice(2))}</li>;
    if (line.trim().match(/^\d+\. /)) return <li key={index} className="ml-4 list-decimal pl-2 mb-1">{formatText(line.trim().replace(/^\d+\. /, ''))}</li>;

    // Empty lines
    if (line.trim() === '') return <div key={index} className="h-2"></div>;

    // Paragraphs
    return <p key={index} className="mb-2 leading-relaxed">{formatText(line)}</p>;
  };

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-100 font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="text-slate-300 text-sm md:text-base">
      {content.split('\n').map((line, i) => renderLine(line, i))}
    </div>
  );
};

export default MarkdownRenderer;