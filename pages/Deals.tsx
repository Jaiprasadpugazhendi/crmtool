
import React from 'react';
import { Deal, DealStage } from '../types';

interface DealsProps {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
}

const Deals: React.FC<DealsProps> = ({ deals }) => {
  const stages: DealStage[] = [
    DealStage.QUALIFICATION,
    DealStage.DISCOVERY,
    DealStage.PROPOSAL,
    DealStage.NEGOTIATION,
    DealStage.WON
  ];

  const getStageTotal = (stage: DealStage) => {
    return deals.filter(d => d.stage === stage).reduce((acc, d) => acc + d.value, 0);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Deals Pipeline</h2>
          <p className="text-slate-500 text-sm">Track your deals and forecast revenue.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-lg">add</span>
          New Deal
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 h-full min-w-max">
          {stages.map((stage) => (
            <div key={stage} className="w-72 flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-slate-200 text-xs font-bold uppercase tracking-wider">{stage}</h3>
                  <span className="bg-surface-dark text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-border-dark">
                    {deals.filter(d => d.stage === stage).length}
                  </span>
                </div>
                <p className="text-slate-500 text-[10px] font-bold">${getStageTotal(stage).toLocaleString()}</p>
              </div>

              <div className="flex-1 bg-background-dark/30 rounded-xl border border-dashed border-border-dark p-2 flex flex-col gap-3">
                {deals.filter(d => d.stage === stage).map((deal) => (
                  <div key={deal.id} className="bg-surface-dark border border-border-dark p-4 rounded-xl shadow-sm hover:border-primary/50 cursor-pointer group transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        deal.probability > 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {deal.probability}% Prob.
                      </span>
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">{deal.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-bold">${deal.value.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border-dark/50 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-500 text-[14px]">calendar_today</span>
                      <span className="text-slate-500 text-[10px] font-medium uppercase">{deal.expectedClose}</span>
                    </div>
                  </div>
                ))}
                {deals.filter(d => d.stage === stage).length === 0 && (
                  <div className="flex-1 flex items-center justify-center p-8 opacity-20">
                    <span className="material-symbols-outlined text-4xl">inbox</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
