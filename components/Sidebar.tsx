
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'leads', label: 'Leads', icon: 'group' },
    { id: 'deals', label: 'Deals', icon: 'handshake' },
    { id: 'tasks', label: 'Tasks', icon: 'task_alt' },
    { id: 'email-gen', label: 'Email Gen', icon: 'mail' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'smart_toy' },
  ];

  return (
    <aside className="w-64 border-r border-border-dark flex flex-col h-screen bg-background-dark shrink-0 hidden md:flex">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined font-bold">bolt</span>
          </div>
          <div>
            <h1 className="text-base font-black leading-none tracking-tight">SalesAI CRM</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Solo Edition</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-400 hover:text-white hover:bg-surface-dark'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab === item.id ? 'fill-[1]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border-dark space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="size-9 rounded-full bg-slate-700 bg-cover bg-center border border-border-dark" style={{ backgroundImage: `url('https://picsum.photos/seed/alex/100/100')` }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Freelancer</p>
            </div>
            <button onClick={onLogout} className="text-slate-500 hover:text-rose-400 transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
