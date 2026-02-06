
import React from 'react';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'leads': return 'Leads Management';
      case 'lead-detail': return 'Lead Context';
      case 'deals': return 'Deals Pipeline';
      case 'tasks': return 'Tasks List';
      case 'email-gen': return 'AI Outreach';
      case 'ai-assistant': return 'Assistant Chat';
      default: return 'SalesAI CRM';
    }
  };

  return (
    <header className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 shrink-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-white tracking-tight">{getTitle()}</h2>
      </div>
      
      <div className="flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search leads, deals, tasks..." 
            className="w-full bg-surface-dark border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary text-white placeholder:text-slate-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="size-9 flex items-center justify-center rounded-lg hover:bg-surface-dark text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
        </button>
        <button className="size-9 flex items-center justify-center rounded-lg hover:bg-surface-dark text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>
        <div className="md:hidden">
          <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
