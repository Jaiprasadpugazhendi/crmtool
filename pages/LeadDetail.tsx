
import React, { useState, useEffect } from 'react';
import { Lead, Activity } from '../types';
import { MOCK_ACTIVITIES } from '../mockData';
import { geminiService } from '../services/gemini';

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onBack }) => {
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES[lead.id] || []);
  const [newNote, setNewNote] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string>('Analyzing lead behavior...');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    const getAnalysis = async () => {
      setIsLoadingAi(true);
      const summary = await geminiService.summarizeLead(JSON.stringify({
        ...lead,
        activities: activities.map(a => a.content)
      }));
      setAiAnalysis(summary || 'No analysis available.');
      setIsLoadingAi(false);
    };
    getAnalysis();
  }, [lead.id]);

  const handlePostActivity = () => {
    if (!newNote.trim()) return;
    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'note',
      content: newNote,
      timestamp: 'Just now',
      author: 'Alex Rivera'
    };
    setActivities([activity, ...activities]);
    setNewNote('');
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg bg-surface-dark border border-border-dark text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-xl bg-cover bg-center border border-border-dark" style={{ backgroundImage: `url('${lead.avatar}')` }}></div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{lead.name}</h2>
            <p className="text-slate-500 text-sm">{lead.title} at {lead.company}</p>
          </div>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 bg-surface-dark border border-border-dark rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">Edit</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors">Convert to Deal</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Stats & Info */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background-dark/50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Score</p>
                <div className="flex items-end gap-2 mt-1">
                  <p className="text-2xl font-black text-white">{lead.aiScore}</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1">↑ 5%</span>
                </div>
              </div>
              <div className="p-4 bg-background-dark/50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</p>
                <div className="mt-1">
                  <span className="text-sm font-bold text-primary">{lead.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-border-dark pb-2">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-slate-500">mail</span>
                  <span className="text-slate-300">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-slate-500">link</span>
                  <a href="#" className="text-primary hover:underline">LinkedIn Profile</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-slate-500">location_on</span>
                  <span className="text-slate-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className={`material-symbols-outlined text-primary ${isLoadingAi ? 'animate-spin' : ''}`}>
                {isLoadingAi ? 'progress_activity' : 'auto_awesome'}
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Lead Analysis</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic relative z-10">
              {aiAnalysis}
            </p>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-4 shadow-xl shadow-black/20 focus-within:border-primary/50 transition-colors">
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-slate-200 resize-none min-h-[100px]" 
              placeholder="Add a note or log a call for this lead..."
            ></textarea>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-dark">
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-500 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">alternate_email</span></button>
                <button className="p-2 text-slate-500 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">attach_file</span></button>
              </div>
              <button 
                onClick={handlePostActivity}
                className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
              >
                Post Activity
              </button>
            </div>
          </div>

          <div className="space-y-8 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border-dark">
            {activities.length > 0 ? activities.map((activity) => (
              <div key={activity.id} className="relative group/item">
                <div className={`absolute -left-9 top-1 size-6 rounded-full flex items-center justify-center ring-4 ring-background-dark z-10 ${
                  activity.type === 'email' ? 'bg-blue-500 text-white' : 
                  activity.type === 'call' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {activity.type === 'email' ? 'mail' : activity.type === 'call' ? 'call' : 'notes'}
                  </span>
                </div>
                <div className="bg-surface-dark border border-border-dark rounded-xl p-5 shadow-sm group-hover/item:border-slate-500 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} logged by {activity.author}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{activity.content}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-12 bg-surface-dark rounded-xl border border-dashed border-border-dark">
                <p className="text-slate-500 text-sm">No activity logged yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
