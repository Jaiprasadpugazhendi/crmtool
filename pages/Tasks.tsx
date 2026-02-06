
import React from 'react';
import { Task, TaskPriority } from '../types';

interface TasksPageProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, setTasks }) => {
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const getPriorityColor = (p: TaskPriority) => {
    switch(p) {
      case TaskPriority.HIGH: return 'text-rose-500 bg-rose-500/10';
      case TaskPriority.MEDIUM: return 'text-amber-500 bg-amber-500/10';
      case TaskPriority.LOW: return 'text-slate-400 bg-slate-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Tasks</h2>
          <p className="text-slate-500 text-sm">You have {pendingTasks.length} tasks pending for today.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          <span className="material-symbols-outlined text-lg">add</span>
          Create Task
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-8 border-b border-border-dark pb-1">
          <button className="border-b-2 border-primary pb-3 px-1 text-sm font-bold text-primary flex items-center gap-2">
            Today <span className="bg-primary/10 px-2 py-0.5 rounded text-[10px]">{pendingTasks.length}</span>
          </button>
          <button className="border-b-2 border-transparent pb-3 px-1 text-sm font-medium text-slate-500 hover:text-white transition-colors">
            Upcoming
          </button>
          <button className="border-b-2 border-transparent pb-3 px-1 text-sm font-medium text-slate-500 hover:text-white transition-colors">
            Completed <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] ml-1">{completedTasks.length}</span>
          </button>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div key={task.id} className="group flex items-center gap-4 bg-surface-dark p-4 rounded-xl border border-border-dark hover:border-primary/50 transition-all">
              <div 
                onClick={() => toggleTask(task.id)}
                className="size-5 rounded border border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                {task.completed && <span className="material-symbols-outlined text-primary text-[14px]">check</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{task.title}</h3>
                  {task.aiSuggested && (
                    <span className="material-symbols-outlined text-primary text-base" title="AI Suggested Action">psychology</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                    <span className={`size-1.5 rounded-full ${task.priority === TaskPriority.HIGH ? 'bg-rose-500' : task.priority === TaskPriority.MEDIUM ? 'bg-amber-500' : 'bg-slate-500'}`}></span>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[10px] font-bold uppercase ${task.dueDate === 'Today' ? 'text-rose-500' : 'text-slate-500'}`}>{task.dueDate}</p>
                <p className="text-xs text-slate-500">{task.dueTime}</p>
              </div>
            </div>
          ))}

          {pendingTasks.length === 0 && (
            <div className="py-20 text-center bg-surface-dark border border-dashed border-border-dark rounded-xl">
              <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">task_alt</span>
              <p className="text-slate-500 text-sm">All caught up! You've completed all your tasks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
