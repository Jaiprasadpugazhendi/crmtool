
import React from 'react';
import { Lead } from '../types';

interface LeadsProps {
  leads: Lead[];
  onSelectLead: (id: string) => void;
}

const Leads: React.FC<LeadsProps> = ({ leads, onSelectLead }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Leads</h2>
          <p className="text-slate-500 text-sm">Manage and track your potential customer pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark bg-surface-dark font-semibold text-sm hover:bg-slate-800 transition-all">
            <span className="material-symbols-outlined text-lg">upload</span>
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-dark/50 border-b border-border-dark">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Source</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">AI Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="group hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onSelectLead(lead.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-cover bg-center border border-border-dark" style={{ backgroundImage: `url('${lead.avatar}')` }}></div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-500 text-lg">corporate_fare</span>
                      <span className="text-sm text-slate-300">{lead.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
                      lead.status === 'QUALIFIED' ? 'bg-emerald-500/10 text-emerald-400' : 
                      lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-400">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-background-dark rounded-full overflow-hidden">
                        <div className={`h-full ${lead.aiScore > 70 ? 'bg-primary' : 'bg-slate-600'} rounded-full`} style={{ width: `${lead.aiScore}%` }}></div>
                      </div>
                      <span className={`text-sm font-black ${lead.aiScore > 70 ? 'text-primary' : 'text-slate-500'}`}>{lead.aiScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-500">{lead.lastActivity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-background-dark/50 border-t border-border-dark flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-white">{leads.length}</span> leads
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-primary bg-primary text-white text-xs font-bold">1</button>
            <button className="px-3 py-1 rounded border border-border-dark hover:bg-surface-dark transition-colors text-xs font-bold">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
