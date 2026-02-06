
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';

interface AIAssistantProps {
  crmContext: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ crmContext }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hello! I'm SalesAI, your personal CRM assistant. I've analyzed your pipeline. You have 3 high-priority leads that haven't been contacted recently. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const response = await geminiService.chatAssistant([], crmContext, userMsg);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "I encountered an error." }]);
  };

  const suggestions = [
    "Who should I call today?",
    "Summarize my best leads",
    "How many deals are in 'Proposal'?",
    "Analyze deal risk"
  ];

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pr-2" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`size-9 rounded-lg border flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-primary border-primary text-white' : 'bg-surface-dark border-border-dark text-primary'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {msg.role === 'user' ? 'person' : 'smart_toy'}
              </span>
            </div>
            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : ''}`}>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                {msg.role === 'user' ? 'You' : 'SalesAI'}
              </span>
              <div className={`p-4 rounded-xl text-sm leading-relaxed shadow-sm max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-surface-dark border border-border-dark text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-4">
            <div className="size-9 rounded-lg bg-surface-dark border border-border-dark flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div className="flex items-center gap-1.5 p-4 rounded-xl bg-surface-dark border border-border-dark">
              <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border-dark bg-background-dark/50 backdrop-blur-md rounded-xl space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setInput(s)}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-dark border border-border-dark text-xs font-medium text-slate-400 hover:border-primary/50 hover:text-primary transition-all"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <div className="flex items-center bg-surface-dark border border-border-dark rounded-xl px-4 py-2 focus-within:border-primary/50 transition-all shadow-xl">
            <span className="material-symbols-outlined text-slate-500 mr-3">attach_file</span>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-slate-500 py-3 text-sm" 
              placeholder="Ask anything about your leads, deals or tasks..." 
              type="text"
            />
            <button 
              onClick={handleSend}
              className="ml-4 px-6 py-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg flex items-center gap-2 transition-all"
            >
              Send
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
