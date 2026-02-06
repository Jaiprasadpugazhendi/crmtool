
import React, { useState, useEffect, useMemo } from 'react';
import { Lead, Deal, Task, LeadStatus, DealStage, TaskPriority } from './types';
import { INITIAL_LEADS, INITIAL_DEALS, INITIAL_TASKS } from './mockData';

// Pages
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Deals from './pages/Deals';
import TasksPage from './pages/Tasks';
import AIEmailGen from './pages/AIEmailGen';
import AIAssistant from './pages/AIAssistant';
import Auth from './pages/Auth';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Global CRM State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // Simple CRUD helpers
  const addLead = (lead: Partial<Lead>) => {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: lead.name || 'New Lead',
      email: lead.email || '',
      company: lead.company || '',
      title: lead.title || '',
      status: LeadStatus.NEW,
      source: 'Manual Entry',
      aiScore: 50,
      lastActivity: 'Just now',
      avatar: `https://picsum.photos/seed/${Math.random()}/100/100`,
      ...lead
    };
    setLeads([newLead, ...leads]);
  };

  const addTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: task.title || 'New Task',
      priority: task.priority || TaskPriority.MEDIUM,
      dueDate: 'Today',
      dueTime: '9:00 AM',
      completed: false,
      ...task
    };
    setTasks([newTask, ...tasks]);
  };

  // Derived state for AI context
  const crmContext = useMemo(() => {
    return JSON.stringify({
      leads: leads.map(l => ({ name: l.name, company: l.company, status: l.status })),
      deals: deals.map(d => ({ title: d.title, value: d.value, stage: d.stage })),
      tasks: tasks.filter(t => !t.completed).map(t => ({ title: t.title, due: t.dueDate }))
    });
  }, [leads, deals, tasks]);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    if (selectedLeadId && activeTab === 'lead-detail') {
      const lead = leads.find(l => l.id === selectedLeadId);
      if (lead) return <LeadDetail lead={lead} onBack={() => setActiveTab('leads')} />;
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard leads={leads} deals={deals} tasks={tasks} onNavigate={setActiveTab} />;
      case 'leads': return <Leads leads={leads} onSelectLead={(id) => { setSelectedLeadId(id); setActiveTab('lead-detail'); }} />;
      case 'deals': return <Deals deals={deals} setDeals={setDeals} />;
      case 'tasks': return <TasksPage tasks={tasks} setTasks={setTasks} />;
      case 'email-gen': return <AIEmailGen />;
      case 'ai-assistant': return <AIAssistant crmContext={crmContext} />;
      default: return <Dashboard leads={leads} deals={deals} tasks={tasks} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-background-dark overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
