
import React, { useState, useEffect } from 'react';
import { Lead, Deal, Task } from '../types';
import { geminiService } from '../services/gemini';

interface DashboardProps {
  leads: Lead[];
  deals: Deal[];
  tasks: Task[];
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ leads, deals, tasks, onNavigate }) => {
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      const summary = `
        Leads: ${leads.length} total, ${leads.filter(l => l.status === 'NEW').length} new.
        Deals: ${deals.length} active, Total Value: $${deals.reduce((acc, d) => acc + d.value, 0)}.
        Tasks: ${tasks.filter(t => !t.completed).length} pending.
      `;
      const suggestions = await geminiService.getAiSuggestions(summary);
      setAiInsights(suggestions);
      setIsLoadingInsights(false);
    };
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `$${deals.reduce((a, b) => a + b.value, 0).toLocaleString()}`, trend: '+12%', color: 'emerald' },
    { label: 'New Leads', value: leads.filter(l => l.status === 'NEW').length, trend: '+5%', color: 'emerald' },
    { label: 'Active Deals', value: deals.length, trend: '0%', color: 'slate' },
    { label: 'Tasks Pending', value: tasks.filter(t => !t.completed).length, trend: '-2%', color: 'rose' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Good morning, Alex</h1>
          <p className="text-slate-500">Here's what's happening with your pipeline today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">+ New Lead</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-dark border border-border-dark p-6 rounded-xl shadow-sm">
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <span className={`text-${stat.color}-500 text-sm font-bold flex items-center gap-1`}>
                {stat.trend !== '0%' && (
                  <span className="material-symbols-outlined text-[16px]">
                    {stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}
                  </span>
                )}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-bold">Deals Closing Soon</h2>
            <button onClick={() => onNavigate('deals')} className="text-primary text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-dark/50 border-b border-border-dark">
                  <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Deal Name</th>
                  <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Probability</th>
                  <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Expected Close</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {deals.slice(0, 3).map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 text-white text-sm font-semibold">{deal.title}</td>
                    <td className="px-6 py-5 text-slate-400 text-sm font-medium">${deal.value.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-[80px] h-1.5 rounded-full bg-background-dark overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${deal.probability}%` }}></div>
                        </div>
                        <span className="text-white text-sm font-bold">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-400 text-sm">{deal.expectedClose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-white text-lg font-bold">AI Insights</h2>
          <div className="space-y-4">
            {isLoadingInsights ? (
              <div className="bg-surface-dark border border-primary/20 rounded-xl p-5 space-y-3 animate-pulse">
                <div className="h-4 w-24 bg-slate-700 rounded"></div>
                <div className="h-12 w-full bg-slate-700 rounded"></div>
                <div className="h-8 w-full bg-slate-700 rounded"></div>
              </div>
            ) : aiInsights.length > 0 ? (
              aiInsights.map((insight, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative flex flex-col gap-3 rounded-xl p-5 bg-surface-dark border border-primary/20 shadow-lg">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{insight.priority} Priority</span>
                    </div>
                    <p className="text-white font-bold text-sm leading-tight">{insight.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-surface-dark border border-border-dark rounded-xl">
                <p className="text-slate-500 text-sm">No insights available right now.</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border-dark bg-surface-dark p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Priority Tasks</h3>
            <div className="space-y-3">
              {tasks.filter(t => !t.completed).slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-3 group">
                  <div className="size-5 rounded border border-slate-600 flex items-center justify-center group-hover:border-primary transition-colors cursor-pointer"></div>
                  <span className="text-sm text-slate-300">{task.title}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('tasks')} className="w-full pt-2 text-center text-primary text-xs font-medium hover:underline">View all tasks</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
