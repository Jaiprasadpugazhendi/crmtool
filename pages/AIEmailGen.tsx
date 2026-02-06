
import React, { useState } from 'react';
import { geminiService } from '../services/gemini';

const AIEmailGen: React.FC = () => {
  const [config, setConfig] = useState({
    name: 'Sarah Jenkins',
    context: 'VP of Engineering at TechFlow. Recently closed Series C and looking for security automation.',
    goal: 'Introduction',
    tone: 'Friendly & Conversational',
    length: 'Short'
  });
  const [draft, setDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await geminiService.generateEmail(config.name, config.context, config.goal, config.tone);
    setDraft(result || '');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">AI Email Generator</h1>
        <p className="text-slate-500">Craft personalized outreach in seconds using CRM context.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Configuration */}
        <div className="xl:col-span-4 bg-surface-dark border border-border-dark rounded-xl flex flex-col shadow-sm">
          <div className="p-5 border-b border-border-dark flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Configuration</h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lead Name</label>
              <input 
                type="text" 
                value={config.name} 
                onChange={(e) => setConfig({...config, name: e.target.value})}
                className="w-full bg-background-dark border-border-dark rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Context / Notes</label>
              <textarea 
                value={config.context} 
                onChange={(e) => setConfig({...config, context: e.target.value})}
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-white resize-none"
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Goal</label>
              <select 
                value={config.goal} 
                onChange={(e) => setConfig({...config, goal: e.target.value})}
                className="w-full bg-background-dark border-border-dark rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-white"
              >
                <option>Introduction</option>
                <option>Follow-up</option>
                <option>Meeting Request</option>
                <option>Closing Pitch</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tone</label>
              <select 
                value={config.tone} 
                onChange={(e) => setConfig({...config, tone: e.target.value})}
                className="w-full bg-background-dark border-border-dark rounded-lg py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary text-white"
              >
                <option>Friendly & Conversational</option>
                <option>Professional & Formal</option>
                <option>Urgent & Direct</option>
                <option>Helpful & Educational</option>
              </select>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all mt-4"
            >
              {isGenerating ? (
                <>
                  <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  Generate Draft
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-8 bg-surface-dark border border-border-dark rounded-xl flex flex-col shadow-sm min-h-[500px]">
          <div className="p-5 border-b border-border-dark flex justify-between items-center bg-background-dark/30">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Generated Draft</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(draft)}
                className="p-2 text-slate-500 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                <span className="material-symbols-outlined text-[20px]">content_copy</span>
              </button>
            </div>
          </div>
          <div className="flex-1 p-8 overflow-y-auto whitespace-pre-wrap leading-relaxed text-slate-300 font-medium">
            {draft || (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4">
                <span className="material-symbols-outlined text-6xl">edit_note</span>
                <p>Configure and generate to see your AI-powered outreach draft here.</p>
              </div>
            )}
          </div>
          {draft && (
            <div className="p-6 border-t border-border-dark bg-background-dark/30 rounded-b-xl flex justify-between items-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Highlight text to see AI rewrite suggestions (Coming Soon)</p>
              <button className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-blue-600 shadow-md">Send via CRM</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIEmailGen;
